'use client';

import { useState, useRef } from 'react';
import Script from 'next/script';
import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Link } from '@/lib/i18n/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import { getRecaptchaToken, recaptchaScriptSrc } from '@/lib/recaptcha-client';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';
type AuditField = 'name' | 'businessName' | 'email' | 'sector' | 'websiteUrl';
type ValidationErrors = Partial<Record<AuditField, string>>;

export function AuditRequestForm() {
  const t = useTranslations('auditPage.form');
  const legal = useTranslations('legalNotice');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [honeypot, setHoneypot] = useState('');
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const formRef = useRef<HTMLFormElement>(null);

  const tSectors = useTranslations('contactPage');
  const sectors = [tSectors('sectors.0'), tSectors('sectors.1'), tSectors('sectors.2'), tSectors('sectors.3')] as const;
  const fieldClass = 'border-hairline bg-canvas/40 text-ink placeholder:text-copy-muted focus-visible:border-sea-bright focus-visible:ring-sea-bright/30';
  const errorClass = 'text-sm text-oxide-hover';

  function clearValidationError(field: AuditField) {
    setValidationErrors((current) => {
      if (!current[field]) return current;

      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  function validateData(data: Record<AuditField, string>): ValidationErrors {
    const errors: ValidationErrors = {};

    if (!data.name.trim()) errors.name = t('name_required');
    if (!data.businessName.trim()) errors.businessName = t('business_required');
    if (!data.email.trim()) {
      errors.email = t('email_required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      errors.email = t('email_invalid');
    }

    if (!data.sector.trim()) errors.sector = t('sector_required');

    if (!data.websiteUrl.trim()) {
      errors.websiteUrl = t('website_required');
    } else {
      try {
        const url = new URL(data.websiteUrl);
        if (url.protocol !== 'http:' && url.protocol !== 'https:') {
          errors.websiteUrl = t('website_invalid');
        }
      } catch {
        errors.websiteUrl = t('website_invalid');
      }
    }

    return errors;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Honeypot check
    if (honeypot) return;

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      businessName: formData.get('businessName') as string,
      email: formData.get('email') as string,
      sector: formData.get('sector') as string,
      websiteUrl: formData.get('websiteUrl') as string,
      message: formData.get('message') as string,
    };

    const errors = validateData(data);
    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setStatus('sending');

    try {
      const recaptchaToken = await getRecaptchaToken('audit');

      const res = await fetch('/api/audits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, recaptchaToken }),
      });

      if (!res.ok) throw new Error('Request failed');

      trackEvent('Audit Form Submitted');
      setValidationErrors({});
      setStatus('success');
      formRef.current?.reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-md border border-success/35 bg-success/10 p-8 text-center text-ink" role="status">
        <CheckCircle2 className="size-12 text-success mx-auto mb-4" aria-hidden="true" />
        <p className="text-lg font-medium mb-2">{t('success')}</p>
      </div>
    );
  }

  return (
    <>
      {recaptchaScriptSrc && (
        <Script src={recaptchaScriptSrc} strategy="afterInteractive" />
      )}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="relative space-y-5 rounded-md border border-hairline bg-surface p-5 text-ink md:p-6"
        noValidate
      >
      {/* Honeypot — hidden from real users, visible to bots */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="audit-website-check">Website</label>
        <input
          id="audit-website-check"
          name="website_check"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="audit-name">{t('name')} *</Label>
          <Input
            id="audit-name"
            name="name"
            required
            aria-invalid={Boolean(validationErrors.name)}
            aria-describedby={validationErrors.name ? 'audit-name-error' : undefined}
            autoComplete="name"
            placeholder="Mariam K."
            className={fieldClass}
            onChange={() => clearValidationError('name')}
          />
          {validationErrors.name && (
            <p id="audit-name-error" className={errorClass}>
              {validationErrors.name}
            </p>
          )}
        </div>

        {/* Business Name */}
        <div className="space-y-2">
          <Label htmlFor="audit-business">{t('business')} *</Label>
          <Input
            id="audit-business"
            name="businessName"
            required
            aria-invalid={Boolean(validationErrors.businessName)}
            aria-describedby={validationErrors.businessName ? 'audit-business-error' : undefined}
            autoComplete="organization"
            placeholder="Seafront Rooms"
            className={fieldClass}
            onChange={() => clearValidationError('businessName')}
          />
          {validationErrors.businessName && (
            <p id="audit-business-error" className={errorClass}>
              {validationErrors.businessName}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="audit-email">{t('email')} *</Label>
          <Input
            id="audit-email"
            name="email"
            type="email"
            required
            aria-invalid={Boolean(validationErrors.email)}
            aria-describedby={validationErrors.email ? 'audit-email-error' : undefined}
            autoComplete="email"
            placeholder="mariam@example.com"
            className={fieldClass}
            onChange={() => clearValidationError('email')}
          />
          {validationErrors.email && (
            <p id="audit-email-error" className={errorClass}>
              {validationErrors.email}
            </p>
          )}
        </div>

        {/* Sector */}
        <div className="space-y-2">
          <Label htmlFor="audit-sector">{t('sector')} *</Label>
          <Select name="sector" required onValueChange={() => clearValidationError('sector')}>
            <SelectTrigger
              id="audit-sector"
              className={`w-full ${fieldClass}`}
              aria-invalid={Boolean(validationErrors.sector)}
              aria-describedby={validationErrors.sector ? 'audit-sector-error' : undefined}
            >
              <SelectValue placeholder={t('sector')} />
            </SelectTrigger>
            <SelectContent className="border-hairline bg-surface text-ink shadow-none">
              {sectors.map((sector) => (
                <SelectItem key={sector} value={sector} className="focus:bg-surface-elevated focus:text-ink">
                  {sector}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {validationErrors.sector && (
            <p id="audit-sector-error" className={errorClass}>
              {validationErrors.sector}
            </p>
          )}
        </div>
      </div>

      {/* Website URL */}
      <div className="space-y-2">
        <Label htmlFor="audit-website">{t('website')} *</Label>
        <Input
          id="audit-website"
          name="websiteUrl"
          type="url"
          required
          aria-invalid={Boolean(validationErrors.websiteUrl)}
          aria-describedby={validationErrors.websiteUrl ? 'audit-website-error' : undefined}
          autoComplete="url"
          placeholder="https://yourwebsite.com"
          className={fieldClass}
          onChange={() => clearValidationError('websiteUrl')}
        />
        {validationErrors.websiteUrl && (
          <p id="audit-website-error" className={errorClass}>
            {validationErrors.websiteUrl}
          </p>
        )}
      </div>

      {/* Message */}
      <div className="space-y-2">
        <Label htmlFor="audit-message">{t('message')}</Label>
        <Textarea
          id="audit-message"
          name="message"
          rows={3}
          placeholder=""
          className={fieldClass}
        />
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-2 text-destructive text-sm" role="alert">
          <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
          <span>{t('error')}</span>
        </div>
      )}

      <p className="text-xs leading-relaxed text-muted">
        {legal('formText')}{' '}
        <Link href="/privacy" className="font-semibold text-sea-bright transition-colors hover:text-oxide">
          {legal('privacy')}
        </Link>{' '}
        {legal('and')}{' '}
        <Link href="/terms" className="font-semibold text-sea-bright transition-colors hover:text-oxide">
          {legal('terms')}
        </Link>
        .
      </p>

      <Button
        type="submit"
        disabled={status === 'sending'}
        className="w-full rounded-md bg-oxide text-white hover:bg-oxide-hover hover:text-white font-medium text-base h-12"
      >
        {status === 'sending' ? (
          <>
            <Loader2 className="mr-2 size-4 animate-spin" aria-hidden="true" />
            {t('sending')}
          </>
        ) : (
          t('submit')
        )}
      </Button>
      </form>
    </>
  );
}
