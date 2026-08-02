import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { readJsonObjectBody, validateApiRequestMetadata } from '@/lib/api-request';
import { getLeadSchema, isFormInboxReady } from '@/lib/form-validation';
import { checkRateLimit } from '@/lib/rate-limit';

type ApiLocale = 'en' | 'ka' | 'ru' | 'tr';

const apiLocales = ['en', 'ka', 'ru', 'tr'] as const;

const apiMessages = {
  en: {
    nameRequired: 'Name is required',
    emailRequired: 'Email is required',
    emailInvalid: 'Invalid email address',
    websiteInvalid: 'Invalid URL',
    messageRequired: 'Message is required',
    botDetected: 'Bot detected',
    rateLimited: 'Too many requests. Please try again later.',
    validationFailed: 'Validation failed',
    formNotConfigured: 'Form submissions are not configured. Please email hello@batumilighthouse.com directly.',
    internalError: 'Internal server error',
  },
  ka: {
    nameRequired: 'სახელი აუცილებელია',
    emailRequired: 'ელფოსტა აუცილებელია',
    emailInvalid: 'ელფოსტის მისამართი არასწორია',
    websiteInvalid: 'URL არასწორია',
    messageRequired: 'შეტყობინება აუცილებელია',
    botDetected: 'ბოტი დაფიქსირდა',
    rateLimited: 'ძალიან ბევრი მოთხოვნაა. სცადეთ მოგვიანებით.',
    validationFailed: 'შემოწმება ვერ დასრულდა',
    formNotConfigured: 'ფორმის გაგზავნა ჯერ არ არის კონფიგურირებული. გთხოვთ, პირდაპირ მოგვწეროთ მისამართზე hello@batumilighthouse.com.',
    internalError: 'შიდა სერვერის შეცდომა',
  },
  ru: {
    nameRequired: 'Укажите имя',
    emailRequired: 'Укажите адрес электронной почты',
    emailInvalid: 'Некорректный адрес электронной почты',
    websiteInvalid: 'Некорректный URL',
    messageRequired: 'Укажите сообщение',
    botDetected: 'Обнаружен бот',
    rateLimited: 'Слишком много запросов. Попробуйте позже.',
    validationFailed: 'Проверка не пройдена',
    formNotConfigured: 'Отправка форм не настроена. Пожалуйста, напишите напрямую на hello@batumilighthouse.com.',
    internalError: 'Внутренняя ошибка сервера',
  },
  tr: {
    nameRequired: 'Ad gerekli',
    emailRequired: 'E-posta gerekli',
    emailInvalid: 'Geçersiz e-posta adresi',
    websiteInvalid: 'Geçersiz URL',
    messageRequired: 'Mesaj gerekli',
    botDetected: 'Bot algılandı',
    rateLimited: 'Çok fazla istek gönderildi. Lütfen daha sonra tekrar deneyin.',
    validationFailed: 'Doğrulama başarısız oldu',
    formNotConfigured: 'Form gönderimleri yapılandırılmamış. Lütfen doğrudan hello@batumilighthouse.com adresine e-posta gönderin.',
    internalError: 'Sunucu hatası',
  },
} satisfies Record<ApiLocale, Record<string, string>>;

function getApiLocale(request: NextRequest): ApiLocale {
  const requestedLocale =
    request.headers.get('x-locale') ??
    request.headers.get('accept-language')?.slice(0, 2);

  return apiLocales.includes(requestedLocale as ApiLocale)
    ? (requestedLocale as ApiLocale)
    : 'en';
}

export async function POST(request: NextRequest) {
  const messages = apiMessages[getApiLocale(request)];

  try {
    const requestError = validateApiRequestMetadata(request);
    if (requestError) {
      return NextResponse.json(
        { error: messages.validationFailed },
        { status: requestError.status }
      );
    }

    const rateLimit = checkRateLimit(request, {
      keyPrefix: 'lead',
      maxRequests: 5,
      windowMs: 10 * 60 * 1000,
    });

    if (rateLimit.limited) {
      return NextResponse.json(
        { error: messages.rateLimited },
        {
          status: 429,
          headers: { 'Retry-After': String(rateLimit.retryAfter) },
        }
      );
    }

    const bodyResult = await readJsonObjectBody(request);
    if (!bodyResult.ok) {
      return NextResponse.json(
        { error: messages.validationFailed },
        { status: bodyResult.error.status }
      );
    }

    const parsed = getLeadSchema(messages).safeParse(bodyResult.data);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      const firstError = Object.values(fieldErrors).flat()[0] || messages.validationFailed;
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const data = parsed.data;

    // Silently accept known honeypot submissions without storing them.
    if (data.honeypot) {
      return NextResponse.json({ success: true }, { status: 201 });
    }

    if (!isFormInboxReady()) {
      return NextResponse.json(
        { error: messages.formNotConfigured },
        { status: 503 }
      );
    }

    const lead = await db.lead.create({
      data: {
        name: data.name,
        businessName: data.businessName || null,
        email: data.email,
        phone: data.phone || null,
        sector: data.sector || null,
        websiteUrl: data.websiteUrl || null,
        budgetRange: data.budgetRange || null,
        preferredLanguage: data.preferredLanguage || null,
        message: data.message,
        source: data.source || 'contact_form',
      },
    });

    return NextResponse.json({ success: true, id: lead.id }, { status: 201 });
  } catch (error) {
    console.error('Lead creation failed');
    const message = error instanceof Error ? error.message : '';
    if (message.includes('DATABASE_URL')) {
      return NextResponse.json(
        {
          error: messages.formNotConfigured,
        },
        { status: 503 }
      );
    }
    return NextResponse.json({ error: messages.internalError }, { status: 500 });
  }
}
