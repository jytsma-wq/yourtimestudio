import { getTranslations } from 'next-intl/server';
import {
  ArrowRight,
  BedDouble,
  CalendarDays,
  Check,
  Languages,
  MapPin,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from 'lucide-react';
import { LighthouseBeam, NavigationChart, RadarPanel, SignalBadge } from '@/components/brand';
import { Button } from '@/components/ui/button';
import { Link } from '@/lib/i18n/navigation';
import { type Locale } from '@/lib/i18n/config';
import { cn } from '@/lib/utils';

interface HeroSectionProps {
  locale: Locale;
}

interface BrowserFrameProps {
  title: string;
  subtitle: string;
  url: string;
  sector: string;
  signalLabel: string;
  signalTone?: 'sea' | 'oxide' | 'success' | 'muted';
  scale?: 'primary' | 'secondary';
  className?: string;
  children: React.ReactNode;
}

const proofKeys = ['proof_band.0', 'proof_band.1', 'proof_band.2', 'proof_band.3'] as const;

function BrowserFrame({
  title,
  subtitle,
  url,
  sector,
  signalLabel,
  signalTone = 'sea',
  scale = 'secondary',
  className,
  children,
}: BrowserFrameProps) {
  return (
    <article
      aria-label={title}
      className={cn(
        'group relative overflow-hidden rounded-md border border-hairline bg-surface shadow-[0_24px_120px_rgba(0,0,0,0.26)]',
        'transition-[background-color,border-color,transform] duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:border-sea/35 motion-safe:hover:bg-surface-elevated',
        scale === 'primary' && 'bg-surface',
        className
      )}
    >
      <div className="flex min-w-0 items-center gap-2 border-b border-hairline px-3 py-2">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-2 rounded-full bg-hairline-light/70" />
          <span className="size-2 rounded-full bg-hairline-light/50" />
          <span className="size-2 rounded-full bg-hairline-light/30" />
        </div>
        <div className="min-w-0 flex-1 rounded bg-canvas px-2 py-1 font-mono text-[10px] text-muted">
          <span className="block truncate">{url}</span>
        </div>
        <span className="hidden shrink-0 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-sea-bright sm:inline">
          {sector}
        </span>
      </div>
      <div className="bl-signal-line h-3" aria-hidden="true" />

      <div className={cn('p-4', scale === 'primary' && 'md:p-5')}>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className={cn('font-semibold text-ink', scale === 'primary' ? 'text-base md:text-lg' : 'text-sm')}>
              {title}
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-muted">{subtitle}</p>
          </div>
          <SignalBadge label={signalLabel} tone={signalTone} className="hidden shrink-0 sm:inline-flex" />
        </div>

        <div className="mt-4">{children}</div>
      </div>
    </article>
  );
}

interface SystemCopy {
  title: string;
  subtitle: string;
  sector: string;
  signal: string;
}

function HotelBookingFrame({ copy, className }: { copy: SystemCopy; className?: string }) {
  return (
    <BrowserFrame
      title={copy.title}
      subtitle={copy.subtitle}
      url="batumi-hotel.ge/direct-booking"
      sector={copy.sector}
      signalLabel={copy.signal}
      signalTone="oxide"
      scale="primary"
      className={className}
    >
      <div className="space-y-3">
        <div className="flex flex-wrap gap-1.5" aria-label="Language switcher options">
          {['EN', 'KA', 'RU', 'TR'].map((language) => (
            <span
              key={language}
              className="rounded border border-hairline bg-canvas px-2 py-1 font-mono text-[10px] font-semibold text-muted"
            >
              {language}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2" aria-label="Booking date selector preview">
          {['Check-in', 'Nights', 'Guests'].map((label) => (
            <div key={label} className="rounded border border-hairline bg-canvas p-2">
              <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted">{label}</p>
              <div className="mt-2 h-1.5 w-10 rounded bg-sea-bright/70" />
            </div>
          ))}
        </div>

        <div className="grid gap-2 sm:grid-cols-2" aria-label="Room card row">
          {['Sea view room', 'Family stay'].map((room) => (
            <div key={room} className="rounded border border-hairline bg-surface-elevated p-2.5">
              <div className="flex items-center gap-2 text-xs font-medium text-ink">
                <BedDouble className="size-3.5 text-sea-bright" aria-hidden="true" />
                <span>{room}</span>
              </div>
              <div className="mt-2 flex gap-1.5">
                <span className="h-1.5 flex-1 rounded bg-hairline-light/50" />
                <span className="h-1.5 w-8 rounded bg-hairline-light/30" />
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between gap-3 rounded border border-oxide/40 bg-oxide/15 px-3 py-2">
          <div className="flex items-center gap-2 text-xs text-ink">
            <CalendarDays className="size-3.5 text-oxide-hover" aria-hidden="true" />
            <span>Direct booking flow</span>
          </div>
          <span className="rounded bg-oxide px-2.5 py-1 text-xs font-semibold text-white">Book direct</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 border-t border-hairline pt-3 text-xs text-muted">
          <MapPin className="size-3.5 text-sea-bright" aria-hidden="true" />
          <span>Batumi location pages</span>
          <span className="hidden text-hairline-light sm:inline">/</span>
          <span>Trust and policy strip</span>
        </div>
      </div>
    </BrowserFrame>
  );
}

function ClinicTrustFrame({ copy, className }: { copy: SystemCopy; className?: string }) {
  return (
    <BrowserFrame
      title={copy.title}
      subtitle={copy.subtitle}
      url="dental-clinic.ge/treatments"
      sector={copy.sector}
      signalLabel={copy.signal}
      signalTone="success"
      className={className}
    >
      <div className="space-y-3">
        <div className="rounded border border-hairline bg-canvas p-3">
          <div className="flex items-start gap-2">
            <Stethoscope className="mt-0.5 size-4 text-sea-bright" aria-hidden="true" />
            <div>
              <p className="text-xs font-semibold text-ink">Treatment category</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">Overview, eligibility, preparation, aftercare.</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded border border-hairline bg-surface-elevated p-3">
          <div className="flex size-8 items-center justify-center rounded bg-sea/30 font-mono text-xs font-semibold text-sea-bright">
            DR
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-ink">Doctor profile row</p>
            <p className="truncate text-xs text-muted">Credentials, languages, consultation path</p>
          </div>
          <ShieldCheck className="size-4 shrink-0 text-success" aria-hidden="true" />
        </div>

        <div className="flex flex-wrap items-center gap-2 border-t border-hairline pt-3 text-xs text-muted">
          <Languages className="size-3.5 text-sea-bright" aria-hidden="true" />
          <span>Multilingual intake</span>
          {['EN', 'KA', 'RU'].map((language) => (
            <span key={language} className="rounded border border-hairline px-1.5 py-0.5 font-mono text-[10px]">
              {language}
            </span>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}

function BeautyAppointmentFrame({ copy, className }: { copy: SystemCopy; className?: string }) {
  return (
    <BrowserFrame
      title={copy.title}
      subtitle={copy.subtitle}
      url="beauty-studio.ge/book"
      sector={copy.sector}
      signalLabel={copy.signal}
      signalTone="sea"
      className={className}
    >
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-2" aria-label="Service menu row">
          {['Hair', 'Nails', 'Makeup'].map((service) => (
            <div key={service} className="rounded border border-hairline bg-canvas p-2 text-center">
              <Sparkles className="mx-auto size-3.5 text-oxide-hover" aria-hidden="true" />
              <p className="mt-1 text-xs font-medium text-ink">{service}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2" aria-label="Price and time row">
          {['Price visible', 'Time visible', 'Specialist'].map((detail) => (
            <div key={detail} className="rounded border border-hairline bg-surface-elevated px-2 py-2">
              <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted">{detail}</p>
              <div className="mt-2 h-1.5 rounded bg-hairline-light/40" />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between gap-3 rounded border border-oxide/40 bg-oxide/15 px-3 py-2">
          <span className="text-xs font-medium text-ink">Appointment flow</span>
          <span className="rounded bg-oxide px-2.5 py-1 text-xs font-semibold text-white">Book appointment</span>
        </div>

      </div>
    </BrowserFrame>
  );
}

function HeroSystemStack({
  systems,
  coordinates,
  location,
}: {
  systems: {
    hotel: SystemCopy;
    clinic: SystemCopy;
    beauty: SystemCopy;
  };
  coordinates: string;
  location: string;
}) {
  return (
    <div className="relative mx-auto w-full max-w-[640px] lg:min-h-[760px]" aria-label="Miniature website systems preview">
      <div className="pointer-events-none absolute -inset-x-8 -inset-y-6 bl-grid opacity-30" aria-hidden="true" />
      <div className="pointer-events-none absolute left-4 top-8 h-[76%] w-px bg-gradient-to-b from-transparent via-sea-bright/25 to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute right-2 top-24 hidden h-[68%] w-px bg-gradient-to-b from-transparent via-oxide-hover/30 to-transparent lg:block" aria-hidden="true" />

      <div className="relative z-20 lg:w-[88%]">
        <HotelBookingFrame copy={systems.hotel} />
      </div>

      <RadarPanel className="z-30 mx-auto mt-4 w-40 sm:w-44 lg:absolute lg:right-[-4rem] lg:top-[292px] lg:mt-0" />

      <div className="relative z-10 mt-4 ml-auto w-[94%] lg:absolute lg:right-0 lg:top-[372px] lg:mt-0 lg:w-[78%]">
        <ClinicTrustFrame copy={systems.clinic} />
      </div>

      <div className="relative z-10 mt-4 w-[94%] lg:absolute lg:left-6 lg:top-[548px] lg:mt-0 lg:w-[73%]">
        <BeautyAppointmentFrame copy={systems.beauty} />
      </div>

      <div className="relative z-20 mt-5 grid gap-2 text-xs text-muted sm:grid-cols-[auto_1fr_auto] sm:items-center lg:absolute lg:bottom-0 lg:left-0 lg:right-8 lg:mt-0">
        <span className="bl-coordinates">{coordinates}</span>
        <div className="bl-signal-line hidden h-3 sm:block" aria-hidden="true" />
        <span className="bl-coordinates">{location}</span>
      </div>
    </div>
  );
}

export async function HeroSection({ locale }: HeroSectionProps) {
  const t = await getTranslations('hero');

  return (
    <section id="hero" data-locale={locale} className="bl-soft-vignette relative isolate overflow-hidden bg-canvas">
      <NavigationChart variant="hero" />
      <LighthouseBeam className="opacity-90" />
      <div className="pointer-events-none absolute inset-0 bl-noise" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-[var(--hero-max-width)] px-[var(--container-padding)] py-12 md:py-24 lg:py-28">
        <div className="mb-10 grid gap-3 border-b border-hairline pb-4 sm:grid-cols-[auto_auto_1fr] sm:items-center">
          <span className="bl-coordinates">{t('command.coordinates')}</span>
          <span className="bl-coordinates">{t('command.location')}</span>
          <SignalBadge label={t('command.signal')} tone="oxide" className="justify-self-start sm:justify-self-end" />
        </div>

        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(500px,1.08fr)] lg:gap-14 xl:gap-18">
          <div>
            <p className="mono-label mb-4 text-sea-bright">{t('sectionLabel')}</p>

            <h1 className="max-w-2xl text-balance text-display-lg text-ink md:text-display-xl">
              {t('title1')}{' '}
              <span className="text-sea-bright">{t('title2')}</span>
            </h1>

            <p className="mt-6 max-w-xl text-body-lg leading-[1.75] text-muted">
              {t('subtitle')}
            </p>

            <ul className="mt-8 grid max-w-lg gap-3 sm:grid-cols-2" aria-label="Project delivery proof points">
              {proofKeys.map((key) => (
                <li key={key} className="flex items-center gap-2 text-sm text-muted">
                  <Check className="size-4 shrink-0 text-sea-bright" aria-hidden="true" />
                  <span>{t(key)}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-md bg-oxide px-6 text-base font-semibold text-white transition-colors hover:bg-oxide-hover"
              >
                <Link href="/website-audits">
                  {t('cta_primary')}
                  <ArrowRight className="ml-1.5 size-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 rounded-md border-hairline bg-transparent px-6 text-base text-ink transition-colors hover:bg-surface hover:text-ink"
              >
                <Link href="/pricing">{t('cta_secondary')}</Link>
              </Button>
            </div>
          </div>

          <HeroSystemStack
            coordinates={t('command.coordinates')}
            location={t('command.location')}
            systems={{
              hotel: {
                title: t('systems.hotel.title'),
                subtitle: t('systems.hotel.subtitle'),
                sector: t('systems.hotel.sector'),
                signal: t('signals.booking'),
              },
              clinic: {
                title: t('systems.clinic.title'),
                subtitle: t('systems.clinic.subtitle'),
                sector: t('systems.clinic.sector'),
                signal: t('signals.trust'),
              },
              beauty: {
                title: t('systems.beauty.title'),
                subtitle: t('systems.beauty.subtitle'),
                sector: t('systems.beauty.sector'),
                signal: t('signals.multilingual'),
              },
            }}
          />
        </div>
      </div>
    </section>
  );
}
