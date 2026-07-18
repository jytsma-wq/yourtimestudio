'use client';

import { useState, useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';
type FieldErrors = Partial<
  Record<'name' | 'businessName' | 'email' | 'sector' | 'websiteUrl', string>
>;

export function AuditRequestForm() {
  const t = useTranslations('auditPage.form');
  const locale = useLocale();
  const [status, setStatus] = useState<FormStatus>('idle');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const tSectors = useTranslations('contactPage');
  const tContactForm = useTranslations('contactPage.form');
  const sectors = [tSectors('sectors.0'), tSectors('sectors.1'), tSectors('sectors.2'), tSectors('sectors.3')] as const;

  function validateFields(data: {
    name: string;
    businessName: string;
    email: string;
    sector: string;
    websiteUrl: string;
  }): FieldErrors {
    const errors: FieldErrors = {};

    if (!data.name.trim()) errors.name = tContactForm('name_required');
    if (!data.businessName.trim()) errors.businessName = tContactForm('business_required');
    if (!data.email.trim()) {
      errors.email = tContactForm('email_required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      errors.email = tContactForm('email_invalid');
    }
    if (!data.sector.trim()) errors.sector = tContactForm('sector_required');
    if (!data.websiteUrl.trim()) {
      errors.websiteUrl = t('website_required');
    } else {
      try {
        const url = new URL(data.websiteUrl);
        if (url.protocol !== 'http:' && url.protocol !== 'https:') {
          errors.websiteUrl = tContactForm('website_invalid');
        }
      } catch {
        errors.websiteUrl = tContactForm('website_invalid');
      }
    }

    return errors;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Honeypot check
    if (honeypot) return;

    trackEvent('audit_form_submit_attempt', { source: 'audit_form' });
    const formData = new FormData(e.currentTarget);
    const data = {
      name: String(formData.get('name') || ''),
      businessName: String(formData.get('businessName') || ''),
      email: String(formData.get('email') || ''),
      sector: String(formData.get('sector') || ''),
      websiteUrl: String(formData.get('websiteUrl') || ''),
      message: String(formData.get('message') || ''),
    };

    const errors = validateFields(data);
    setFieldErrors(errors);
    setSubmitError(null);

    if (Object.keys(errors).length > 0) {
      trackEvent('audit_form_submit_failure', { reason: 'client_validation' });
      setStatus('idle');
      return;
    }

    setStatus('sending');
    let failureTracked = false;

    try {
      const res = await fetch('/api/audits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-locale': locale,
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        trackEvent('audit_form_submit_failure', { reason: 'server_response' });
        failureTracked = true;
        throw new Error(errorData.error || t('error'));
      }

      trackEvent('audit_form_submit_success', { source: 'audit_form' });
      setStatus('success');
      setFieldErrors({});
      setSubmitError(null);
      formRef.current?.reset();
    } catch (error) {
      if (!failureTracked) {
        trackEvent('audit_form_submit_failure', { reason: 'request_error' });
      }
      setSubmitError(error instanceof Error ? error.message : t('error'));
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-card border border-border rounded-none p-8 text-center" role="status">
        <CheckCircle2 className="size-12 text-brand-sage-green-darken mx-auto mb-4" aria-hidden="true" />
        <p className="text-lg font-medium mb-2">{t('success')}</p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="bg-card border border-border rounded-none p-6 md:p-8 space-y-5"
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
            autoComplete="name"
            placeholder="Mariam K."
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? 'audit-name-error' : undefined}
          />
          {fieldErrors.name && (
            <p id="audit-name-error" className="text-sm text-destructive" role="alert">
              {fieldErrors.name}
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
            autoComplete="organization"
            placeholder="Seafront Rooms"
            aria-invalid={Boolean(fieldErrors.businessName)}
            aria-describedby={fieldErrors.businessName ? 'audit-business-error' : undefined}
          />
          {fieldErrors.businessName && (
            <p id="audit-business-error" className="text-sm text-destructive" role="alert">
              {fieldErrors.businessName}
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
            autoComplete="email"
            placeholder="mariam@example.com"
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? 'audit-email-error' : undefined}
          />
          {fieldErrors.email && (
            <p id="audit-email-error" className="text-sm text-destructive" role="alert">
              {fieldErrors.email}
            </p>
          )}
        </div>

        {/* Sector */}
        <div className="space-y-2">
          <Label htmlFor="audit-sector">{t('sector')} *</Label>
          <Select name="sector" required>
            <SelectTrigger
              id="audit-sector"
              className="w-full"
              aria-invalid={Boolean(fieldErrors.sector)}
              aria-describedby={fieldErrors.sector ? 'audit-sector-error' : undefined}
            >
              <SelectValue placeholder={t('sector')} />
            </SelectTrigger>
            <SelectContent>
              {sectors.map((sector) => (
                <SelectItem key={sector} value={sector}>
                  {sector}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {fieldErrors.sector && (
            <p id="audit-sector-error" className="text-sm text-destructive" role="alert">
              {fieldErrors.sector}
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
          autoComplete="url"
          placeholder="https://yourwebsite.com"
          aria-invalid={Boolean(fieldErrors.websiteUrl)}
          aria-describedby={fieldErrors.websiteUrl ? 'audit-website-error' : undefined}
        />
        {fieldErrors.websiteUrl && (
          <p id="audit-website-error" className="text-sm text-destructive" role="alert">
            {fieldErrors.websiteUrl}
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
        />
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-2 text-destructive text-sm" role="alert">
          <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
          <span>{submitError || t('error')}</span>
        </div>
      )}

      <Button
        type="submit"
        disabled={status === 'sending'}
        className="w-full rounded-none bg-brand-serene-coral text-brand-charcoal hover:bg-brand-serene-coral-darken hover:text-white font-medium text-base h-12"
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
  );
}
