'use client';

import { useState } from 'react';
import Script from 'next/script';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';
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
import { trackEvent } from '@/lib/analytics';
import { getRecaptchaToken, recaptchaScriptSrc } from '@/lib/recaptcha-client';

const fieldClass =
  'min-h-11 rounded-md border-hairline bg-canvas text-ink placeholder:text-muted focus-visible:border-sea-bright focus-visible:ring-sea-bright/30';
const selectContentClass = 'border-hairline bg-surface text-ink shadow-none';
const labelClass = 'text-sm font-semibold text-ink';
const messageClass = 'text-sm text-oxide-hover';

export function ContactForm() {
  const t = useTranslations('contactPage');
  const legal = useTranslations('legalNotice');
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSchema = z.object({
    name: z.string().min(1, t('form.name_required')),
    email: z.string().min(1, t('form.email_required')).email(t('form.email_invalid')),
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
    projectGoal: z.string().optional(),
    budgetRange: z.string().optional(),
    timeline: z.string().optional(),
    message: z.string().min(1, t('form.message_required')),
    honeypot: z.string().max(0),
  });

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      sector: '',
      websiteUrl: '',
      projectGoal: '',
      budgetRange: '',
      timeline: '',
      message: '',
      honeypot: '',
    },
  });

  async function onSubmit(data: FormValues) {
    if (data.honeypot) return;

    setSubmitError(null);
    setIsSubmitting(true);

    const intakeMessage = [
      data.projectGoal ? `${t('form.project_goal')}: ${data.projectGoal}` : null,
      data.timeline ? `${t('form.timeline')}: ${data.timeline}` : null,
      data.message ? `${t('form.message')}: ${data.message}` : null,
    ].filter(Boolean).join('\n\n');

    try {
      const recaptchaToken = await getRecaptchaToken('contact');

      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          sector: data.sector || undefined,
          websiteUrl: data.websiteUrl || undefined,
          budgetRange: data.budgetRange || undefined,
          message: intakeMessage,
          source: 'contact_form',
          recaptchaToken,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || t('form.error_default'));
      }

      trackEvent('Contact Form Submitted');
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : t('form.error_default'));
    } finally {
      setIsSubmitting(false);
    }
  }

  const sectors = [0, 1, 2, 3].map((index) => t(`sectors.${index}`));
  const budgets = [0, 1, 2, 3].map((index) => t(`budgets.${index}`));
  const projectGoals = [0, 1, 2].map((index) => t(`project_goals.${index}`));
  const timelines = [0, 1, 2, 3].map((index) => t(`timelines.${index}`));

  if (submitted) {
    return (
      <div
        className="rounded-md border border-success/35 bg-success/10 p-6 text-left"
        role="status"
        aria-live="polite"
      >
        <div className="mb-5 flex size-12 items-center justify-center rounded-md border border-success/35 bg-canvas">
          <CheckCircle2 className="size-6 text-success" aria-hidden="true" />
        </div>
        <h3 className="text-heading-md text-ink">{t('form.success_title')}</h3>
        <p className="mt-3 max-w-xl text-body-sm leading-[1.75] text-muted">{t('form.success_body')}</p>
        <p className="mt-5 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-sea-bright">
          {t('form.success_meta')}
        </p>
      </div>
    );
  }

  return (
    <>
      {recaptchaScriptSrc && (
        <Script src={recaptchaScriptSrc} strategy="afterInteractive" />
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <div className="absolute -left-[9999px]" aria-hidden="true" tabIndex={-1}>
          <FormField
            control={form.control}
            name="honeypot"
            render={({ field }) => (
              <Input {...field} tabIndex={-1} autoComplete="off" />
            )}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass}>
                  {t('form.name')} <span className="text-oxide-hover">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    className={fieldClass}
                    placeholder={t('form.name_placeholder')}
                    autoComplete="name"
                    {...field}
                  />
                </FormControl>
                <FormMessage className={messageClass} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass}>
                  {t('form.email')} <span className="text-oxide-hover">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    className={fieldClass}
                    type="email"
                    placeholder={t('form.email_placeholder')}
                    autoComplete="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage className={messageClass} />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="sector"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass}>{t('form.business_type')}</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className={`w-full ${fieldClass}`}>
                      <SelectValue placeholder={t('form.business_type_placeholder')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className={selectContentClass}>
                    {sectors.map((sector) => (
                      <SelectItem key={sector} value={sector}>
                        {sector}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className={messageClass} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="websiteUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass}>{t('form.website')}</FormLabel>
                <FormControl>
                  <Input
                    className={fieldClass}
                    type="url"
                    placeholder="https://example.com"
                    autoComplete="url"
                    {...field}
                  />
                </FormControl>
                <FormMessage className={messageClass} />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="projectGoal"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>{t('form.project_goal')}</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className={`w-full ${fieldClass}`}>
                    <SelectValue placeholder={t('form.project_goal_placeholder')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className={selectContentClass}>
                  {projectGoals.map((goal) => (
                    <SelectItem key={goal} value={goal}>
                      {goal}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className={messageClass} />
            </FormItem>
          )}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="budgetRange"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass}>{t('form.budget')}</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className={`w-full ${fieldClass}`}>
                      <SelectValue placeholder={t('form.budget_placeholder')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className={selectContentClass}>
                    {budgets.map((budget) => (
                      <SelectItem key={budget} value={budget}>
                        {budget}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className={messageClass} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="timeline"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass}>{t('form.timeline')}</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className={`w-full ${fieldClass}`}>
                      <SelectValue placeholder={t('form.timeline_placeholder')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className={selectContentClass}>
                    {timelines.map((timeline) => (
                      <SelectItem key={timeline} value={timeline}>
                        {timeline}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className={messageClass} />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>
                {t('form.message')} <span className="text-oxide-hover">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  className={`${fieldClass} min-h-36 resize-y py-3`}
                  placeholder={t('form.message_placeholder')}
                  {...field}
                />
              </FormControl>
              <FormMessage className={messageClass} />
            </FormItem>
          )}
        />

        {submitError && (
          <div
            className="grid grid-cols-[auto_1fr] gap-3 rounded-md border border-oxide/35 bg-oxide/10 p-4 text-sm text-ink"
            role="alert"
          >
            <AlertCircle className="mt-0.5 size-5 shrink-0 text-oxide-hover" aria-hidden="true" />
            <div>
              <p className="font-semibold text-ink">{t('form.error_title')}</p>
              <p className="mt-1 leading-[1.6] text-muted">{submitError}</p>
            </div>
          </div>
        )}

        <p className="max-w-2xl text-xs leading-relaxed text-muted">
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
          size="lg"
          className="h-12 w-full rounded-md bg-oxide px-6 text-base font-semibold text-white hover:bg-oxide-hover hover:text-white sm:w-auto"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" aria-hidden="true" />
              {t('form.sending')}
            </>
          ) : (
            t('form.submit')
          )}
        </Button>
        </form>
      </Form>
    </>
  );
}
