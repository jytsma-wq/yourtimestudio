'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
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

export function AuditRequestForm() {
  const t = useTranslations('auditPage.form');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [honeypot, setHoneypot] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const tSectors = useTranslations('contactPage');
  const sectors = [tSectors('sectors.0'), tSectors('sectors.1'), tSectors('sectors.2'), tSectors('sectors.3')] as const;
  const fieldClass = 'border-hairline bg-canvas/40 text-ink placeholder:text-copy-muted focus-visible:border-sea-bright focus-visible:ring-sea-bright/30';

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

    // Client-side validation
    if (!data.name || !data.businessName || !data.email || !data.sector || !data.websiteUrl) {
      return;
    }

    setStatus('sending');

    try {
      const res = await fetch('/api/audits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Request failed');

      trackEvent('Audit Form Submitted');
      setStatus('success');
      formRef.current?.reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-md border border-success/35 bg-success/10 p-8 text-center text-ink" role="status">
        <CheckCircle2 className="size-12 text-success mx-auto mb-4" />
        <p className="text-lg font-medium mb-2">{t('success')}</p>
      </div>
    );
  }

  return (
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
            autoComplete="name"
            placeholder="Mariam K."
            className={fieldClass}
          />
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
            className={fieldClass}
          />
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
            className={fieldClass}
          />
        </div>

        {/* Sector */}
        <div className="space-y-2">
          <Label htmlFor="audit-sector">{t('sector')} *</Label>
          <Select name="sector" required>
            <SelectTrigger id="audit-sector" className={`w-full ${fieldClass}`}>
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
          className={fieldClass}
        />
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
          <AlertCircle className="size-4 shrink-0" />
          <span>{t('error')}</span>
        </div>
      )}

      <Button
        type="submit"
        disabled={status === 'sending'}
        className="w-full rounded-md bg-oxide text-white hover:bg-oxide-hover hover:text-white font-medium text-base h-12"
      >
        {status === 'sending' ? (
          <>
            <Loader2 className="mr-2 size-4 animate-spin" />
            {t('sending')}
          </>
        ) : (
          t('submit')
        )}
      </Button>
    </form>
  );
}
