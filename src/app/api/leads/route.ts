import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
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
    formNotConfigured: 'Form submissions are not configured. Please email me directly.',
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
    formNotConfigured: 'ფორმის გაგზავნა ჯერ არ არის კონფიგურირებული. გთხოვთ, პირდაპირ მომწეროთ ელფოსტაზე.',
    internalError: 'შიდა სერვერის შეცდომა',
  },
  ru: {
    nameRequired: 'Укажите имя',
    emailRequired: 'Укажите email',
    emailInvalid: 'Некорректный email',
    websiteInvalid: 'Некорректный URL',
    messageRequired: 'Укажите сообщение',
    botDetected: 'Обнаружен бот',
    rateLimited: 'Слишком много запросов. Попробуйте позже.',
    validationFailed: 'Проверка не пройдена',
    formNotConfigured: 'Отправка форм не настроена. Пожалуйста, напишите мне напрямую на email.',
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
    formNotConfigured: 'Form gönderimleri yapılandırılmamış. Lütfen bana doğrudan e-posta gönderin.',
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

function getLeadSchema(messages: (typeof apiMessages)[ApiLocale]) {
  return z.object({
    name: z.string().min(1, messages.nameRequired).max(200),
    businessName: z.string().max(200).optional(),
    email: z.string().min(1, messages.emailRequired).email(messages.emailInvalid).max(300),
    phone: z.string().max(50).optional(),
    sector: z.string().max(100).optional(),
    websiteUrl: z.string().url(messages.websiteInvalid).optional().or(z.literal('')),
    budgetRange: z.string().max(100).optional(),
    preferredLanguage: z.string().max(50).optional(),
    message: z.string().min(1, messages.messageRequired).max(5000),
    source: z.string().max(50).optional(),
    honeypot: z.string().max(0, messages.botDetected).optional(),
  });
}

export async function POST(request: NextRequest) {
  const messages = apiMessages[getApiLocale(request)];

  try {
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

    const body = await request.json();

    // Honeypot check — bots fill this field
    if (body.honeypot) {
      return NextResponse.json({ success: true }, { status: 201 });
    }

    const parsed = getLeadSchema(messages).safeParse(body);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      const firstError = Object.values(fieldErrors).flat()[0] || messages.validationFailed;
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const data = parsed.data;

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
    console.error('Lead creation error:', error);
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
