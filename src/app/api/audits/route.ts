import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { readJsonObjectBody, validateApiRequestMetadata } from '@/lib/api-request';
import { getAuditSchema, isFormInboxReady } from '@/lib/form-validation';
import { checkRateLimit } from '@/lib/rate-limit';

type ApiLocale = 'en' | 'ka' | 'ru' | 'tr';

const apiLocales = ['en', 'ka', 'ru', 'tr'] as const;

const apiMessages = {
  en: {
    nameRequired: 'Name is required',
    businessRequired: 'Business name is required',
    emailRequired: 'Email is required',
    emailInvalid: 'Invalid email address',
    sectorRequired: 'Sector is required',
    websiteRequired: 'Website URL is required',
    websiteInvalid: 'Invalid URL',
    botDetected: 'Bot detected',
    rateLimited: 'Too many requests. Please try again later.',
    validationFailed: 'Validation failed',
    formNotConfigured: 'Form submissions are not configured. Please email hello@batumilighthouse.com directly.',
    internalError: 'Internal server error',
  },
  ka: {
    nameRequired: 'სახელი აუცილებელია',
    businessRequired: 'ბიზნესის სახელი აუცილებელია',
    emailRequired: 'ელფოსტა აუცილებელია',
    emailInvalid: 'ელფოსტის მისამართი არასწორია',
    sectorRequired: 'სფერო აუცილებელია',
    websiteRequired: 'ვებსაიტის URL აუცილებელია',
    websiteInvalid: 'URL არასწორია',
    botDetected: 'ბოტი დაფიქსირდა',
    rateLimited: 'ძალიან ბევრი მოთხოვნაა. სცადეთ მოგვიანებით.',
    validationFailed: 'შემოწმება ვერ დასრულდა',
    formNotConfigured: 'ფორმის გაგზავნა ჯერ არ არის კონფიგურირებული. გთხოვთ, პირდაპირ მოგვწეროთ მისამართზე hello@batumilighthouse.com.',
    internalError: 'შიდა სერვერის შეცდომა',
  },
  ru: {
    nameRequired: 'Укажите имя',
    businessRequired: 'Укажите название бизнеса',
    emailRequired: 'Укажите адрес электронной почты',
    emailInvalid: 'Некорректный адрес электронной почты',
    sectorRequired: 'Укажите сферу бизнеса',
    websiteRequired: 'Укажите URL сайта',
    websiteInvalid: 'Некорректный URL',
    botDetected: 'Обнаружен бот',
    rateLimited: 'Слишком много запросов. Попробуйте позже.',
    validationFailed: 'Проверка не пройдена',
    formNotConfigured: 'Отправка форм не настроена. Пожалуйста, напишите напрямую на hello@batumilighthouse.com.',
    internalError: 'Внутренняя ошибка сервера',
  },
  tr: {
    nameRequired: 'Ad gerekli',
    businessRequired: 'İşletme adı gerekli',
    emailRequired: 'E-posta gerekli',
    emailInvalid: 'Geçersiz e-posta adresi',
    sectorRequired: 'Sektör gerekli',
    websiteRequired: 'Web sitesi URL’si gerekli',
    websiteInvalid: 'Geçersiz URL',
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
      keyPrefix: 'audit',
      maxRequests: 3,
      windowMs: 15 * 60 * 1000,
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

    const parsed = getAuditSchema(messages).safeParse(bodyResult.data);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      const firstError = Object.values(fieldErrors).flat()[0] || messages.validationFailed;
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const data = parsed.data;

    // Silently accept known honeypot submissions without storing them.
    if (data.website_check) {
      return NextResponse.json({ success: true }, { status: 201 });
    }

    if (!isFormInboxReady()) {
      return NextResponse.json(
        { error: messages.formNotConfigured },
        { status: 503 }
      );
    }

    const audit = await db.auditRequest.create({
      data: {
        name: data.name,
        businessName: data.businessName,
        email: data.email,
        phone: data.phone || null,
        sector: data.sector,
        websiteUrl: data.websiteUrl,
        message: data.message || null,
      },
    });

    return NextResponse.json({ success: true, id: audit.id }, { status: 201 });
  } catch (error) {
    console.error('Audit request failed');
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
