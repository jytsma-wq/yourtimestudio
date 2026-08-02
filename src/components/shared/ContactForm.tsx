'use client';

import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations, useLocale } from 'next-intl';
import { Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import type { Locale } from '@/lib/i18n/config';
import { trackEvent } from '@/lib/analytics';
import { Link } from '@/lib/i18n/navigation';

type ContactFormProps = {
  templateInterest?: {
    id: string;
    label: string;
  };
};

export function ContactForm({ templateInterest }: ContactFormProps) {
  const t = useTranslations('contactPage');
  const templates = useTranslations('templatesCatalog');
  const ui = useTranslations('ui');
  const footer = useTranslations('footer');
  const locale = useLocale() as Locale;
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const formSchema = z.object({
    name: z.string().min(1, t('form.name_required')),
    businessName: z.string().optional(),
    email: z.string().min(1, t('form.email_required')).email(t('form.email_invalid')),
    phone: z.string().optional(),
    sector: z.string().optional(),
    websiteUrl: z.string().optional().refine(
      (val) => {
        if (!val || val.trim() === '') return true;
        try {
          const url = new URL(val);
          return url.protocol === 'http:' || url.protocol === 'https:';
        } catch {
          return false;
        }
      },
      { message: t('form.website_invalid') }
    ),
    budgetRange: z.string().optional(),
    preferredLanguage: z.string().optional(),
    message: z.string().min(1, t('form.message_required')),
    honeypot: z.string(),
  });

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      businessName: '',
      email: '',
      phone: '',
      sector: '',
      websiteUrl: '',
      budgetRange: '',
      preferredLanguage: '',
      message: '',
      honeypot: '',
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (submitted) successRef.current?.focus();
  }, [submitted]);

  async function onSubmit(data: FormValues) {
    const source = templateInterest ? `template:${templateInterest.id}` : 'contact_form';
    trackEvent('contact_form_submit_attempt', { source });
    setSubmitError(null);
    setIsSubmitting(true);
    let failureTracked = false;

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-locale': locale,
        },
        body: JSON.stringify({
          name: data.name,
          businessName: data.businessName || undefined,
          email: data.email,
          phone: data.phone || undefined,
          sector: data.sector || undefined,
          websiteUrl: data.websiteUrl || undefined,
          budgetRange: data.budgetRange || undefined,
          preferredLanguage: data.preferredLanguage || undefined,
          message: data.message,
          honeypot: data.honeypot,
          source,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        trackEvent('contact_form_submit_failure', { reason: 'server_response' });
        failureTracked = true;
        throw new Error(errorData.error || t('form.error_default'));
      }

      // Show in-place success state
      trackEvent('contact_form_submit_success', { source });
      setSubmitted(true);
    } catch (err) {
      if (!failureTracked) {
        trackEvent('contact_form_submit_failure', { reason: 'request_error' });
      }
      setSubmitError(err instanceof Error ? err.message : t('form.error_default'));
    } finally {
      setIsSubmitting(false);
    }
  }

  function onInvalid() {
    trackEvent('contact_form_submit_attempt', {
      source: templateInterest ? `template:${templateInterest.id}` : 'contact_form',
    });
    trackEvent('contact_form_submit_failure', { reason: 'client_validation' });
  }

  const sectors = [
    t('sectors.0'),
    t('sectors.1'),
    t('sectors.2'),
    t('sectors.3'),
  ];

  const budgets = [
    t('budgets.0'),
    t('budgets.1'),
    t('budgets.2'),
    t('budgets.3'),
  ];

  const languages = [
    t('languages.0'),
    t('languages.1'),
    t('languages.2'),
    t('languages.3'),
  ];

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          ref={successRef}
          key="success"
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.95 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
          className="py-12 text-center outline-none"
          role="status"
          aria-live="polite"
          aria-atomic="true"
          tabIndex={-1}
        >
          <div className="mx-auto mb-6 w-20 h-20">
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <circle cx="40" cy="40" r="36" stroke="var(--navy)" strokeWidth="3" fill="var(--navy)" opacity="0.1" />
              <path
                d="M24 42 L34 52 L56 30"
                stroke="var(--navy)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                style={{
                  strokeDasharray: 60,
                  strokeDashoffset: shouldReduceMotion ? 0 : 60,
                  animation: shouldReduceMotion ? 'none' : 'draw-check 0.6s ease-out 0.2s forwards',
                }}
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-3">{t('form.success_title')}</h3>
          <p className="text-muted-foreground leading-[1.75] max-w-md mx-auto mb-2">
            {t('form.success_body')}
          </p>
          <p className="text-sm text-brand-serene-coral-darken font-medium">{t('form.success_meta')}</p>
        </motion.div>
      ) : (
        <motion.div
          key="form"
          initial={{ opacity: 1 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0, y: -10 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, onInvalid)}
              className="space-y-6"
              aria-busy={isSubmitting}
              noValidate
            >
              {templateInterest ? (
                <div className="border border-brand-serene-coral/40 bg-brand-serene-coral/10 p-4 text-sm leading-6 text-foreground">
                  {templates('contactInterest', { name: templateInterest.label })}
                </div>
              ) : null}

              {/* Honeypot - hidden from users, bots will fill it */}
              <div className="absolute -left-[9999px]" aria-hidden="true" tabIndex={-1}>
                <FormField
                  control={form.control}
                  name="honeypot"
                  render={({ field }) => (
                    <Input {...field} tabIndex={-1} autoComplete="off" />
                  )}
                />
              </div>

              {/* Name & Business Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t('form.name')} <span aria-hidden="true" className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t('form.name')}
                          autoComplete="name"
                          required
                          aria-required="true"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="businessName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t('form.business')}{' '}
                        <span className="text-muted-foreground text-xs">({t('form.business_optional')})</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t('form.business')}
                          autoComplete="organization"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t('form.email')} <span aria-hidden="true" className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder={t('form.email')}
                          autoComplete="email"
                          required
                          aria-required="true"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t('form.phone')}{' '}
                        <span className="text-muted-foreground text-xs">({t('form.phone_optional')})</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="+995 XXX XXX XXX"
                          autoComplete="tel"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Sector & Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="sector"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t('form.sector')}{' '}
                        <span className="text-muted-foreground text-xs">({t('form.sector_optional')})</span>
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder={t('form.sector_placeholder')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {sectors.map((sector) => (
                            <SelectItem key={sector} value={sector}>
                              {sector}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="budgetRange"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t('form.budget')}{' '}
                        <span className="text-muted-foreground text-xs">({t('form.budget_optional')})</span>
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder={t('form.budget_placeholder')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {budgets.map((budget) => (
                            <SelectItem key={budget} value={budget}>
                              {budget}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Website & Language */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="websiteUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t('form.website')}{' '}
                        <span className="text-muted-foreground text-xs">({t('form.website_optional')})</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="https://example.com"
                          autoComplete="url"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="preferredLanguage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t('form.language')}{' '}
                        <span className="text-muted-foreground text-xs">({t('form.language_optional')})</span>
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder={t('form.language_placeholder')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {languages.map((lang) => (
                            <SelectItem key={lang} value={lang}>
                              {lang}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Message */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t('form.message')} <span aria-hidden="true" className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t('form.message')}
                        rows={4}
                        className="resize-y"
                        required
                        aria-required="true"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Error state */}
              {submitError && (
                <div
                  className="flex items-start gap-3 p-4 rounded-none bg-destructive/10 border border-destructive/20 text-destructive text-sm"
                  role="alert"
                >
                  <AlertCircle className="size-5 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-medium">{t('form.error_title')}</p>
                    <p>{submitError}</p>
                  </div>
                </div>
              )}

              <p className="text-xs leading-relaxed text-muted-foreground">
                {ui('formPrivacyNotice')}{' '}
                <Link
                  href="/privacy"
                  className="font-semibold text-foreground underline underline-offset-4 hover:text-brand-serene-coral-darken"
                >
                  {footer('privacy')}
                </Link>
              </p>

              {/* Submit */}
              <Button
                type="submit"
                size="lg"
                className="w-full sm:w-auto rounded-none bg-brand-serene-coral text-brand-charcoal hover:bg-brand-serene-coral-darken hover:text-white min-w-[180px]"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4 mr-2 animate-spin motion-reduce:animate-none" aria-hidden="true" />
                    {t('form.sending')}
                  </>
                ) : (
                  t('form.submit')
                )}
              </Button>
            </form>
          </Form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
