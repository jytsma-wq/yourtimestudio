import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { checkRateLimit } from '@/lib/rate-limit';
import {
  isAllowedHttpUrl,
  readApiJsonBody,
  validateApiRequestHeaders,
  type ApiRequestErrorCode,
} from '@/lib/api-request';
import { siteConfig } from '@/lib/site-config';

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
    originNotAllowed: 'Request origin is not allowed.',
    unsupportedMediaType: 'Content-Type must be application/json.',
    payloadTooLarge: 'Request is too large.',
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
    originNotAllowed: 'მოთხოვნის წყარო დაშვებული არ არის.',
    unsupportedMediaType: 'Content-Type უნდა იყოს application/json.',
    payloadTooLarge: 'მოთხოვნა ძალიან დიდია.',
    validationFailed: 'შემოწმება ვერ დასრულდა',
    formNotConfigured: 'ფორმის გაგზავნა ჯერ არ არის კონფიგურირებული. გთხოვთ, პირდაპირ მომწეროთ ელფოსტაზე.',
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
    originNotAllowed: 'Источник запроса не разрешён.',
    unsupportedMediaType: 'Content-Type должен быть application/json.',
    payloadTooLarge: 'Запрос слишком большой.',
    validationFailed: 'Проверка не пройдена',
    formNotConfigured: 'Отправка форм не настроена. Пожалуйста, напишите мне напрямую по электронной почте.',
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
    originNotAllowed: 'İstek kaynağına izin verilmiyor.',
    unsupportedMediaType: 'Content-Type application/json olmalıdır.',
    payloadTooLarge: 'İstek çok büyük.',
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
    name: z.string().trim().min(1, messages.nameRequired).max(200),
    businessName: z.string().trim().max(200).optional(),
    email: z.string().trim().min(1, messages.emailRequired).email(messages.emailInvalid).max(300),
    phone: z.string().trim().max(50).optional(),
    sector: z.string().trim().max(100).optional(),
    websiteUrl: z.string()
      .trim()
      .max(500, messages.websiteInvalid)
      .refine((value) => value === '' || isAllowedHttpUrl(value), messages.websiteInvalid)
      .optional(),
    budgetRange: z.string().trim().max(100).optional(),
    preferredLanguage: z.string().trim().max(50).optional(),
    message: z.string().trim().min(1, messages.messageRequired).max(5000),
    source: z.string()
      .trim()
      .max(50)
      .refine(
        (value) => /^(?:contact_form|audit_form|cta|template:[a-z0-9-]{1,40})$/.test(value),
        messages.validationFailed,
      )
      .optional(),
    honeypot: z.string().trim().max(0, messages.botDetected).optional(),
  }).strict();
}

function requestErrorMessage(
  messages: (typeof apiMessages)[ApiLocale],
  code: ApiRequestErrorCode,
) {
  if (code === 'origin_not_allowed') return messages.originNotAllowed;
  if (code === 'unsupported_media_type') return messages.unsupportedMediaType;
  if (code === 'payload_too_large') return messages.payloadTooLarge;
  return messages.validationFailed;
}

export async function POST(request: NextRequest) {
  const messages = apiMessages[getApiLocale(request)];

  try {
    const headerValidation = validateApiRequestHeaders(request, {
      allowedOrigins: [siteConfig.url],
      allowRequestOrigin: true,
    });
    if (!headerValidation.ok) {
      return NextResponse.json(
        { error: requestErrorMessage(messages, headerValidation.code) },
        { status: headerValidation.status },
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

    const bodyResult = await readApiJsonBody(request);
    if (!bodyResult.ok) {
      return NextResponse.json(
        { error: requestErrorMessage(messages, bodyResult.code) },
        { status: bodyResult.status },
      );
    }
    const body = bodyResult.body;

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
