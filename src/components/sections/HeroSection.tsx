import { getTranslations } from 'next-intl/server';
import {
  ArrowRight,
  BedDouble,
  CalendarDays,
  Check,
  Code2,
  FileCode2,
  Gauge,
  Languages,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  type LucideIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@/lib/i18n/navigation';
import { type Locale } from '@/lib/i18n/config';

interface HeroSectionProps {
  locale: Locale;
}

interface BrowserFrameProps {
  title: string;
  subtitle: string;
  url: string;
  sector: string;
  children: React.ReactNode;
}

const proofKeys = ['proof_band.0', 'proof_band.1', 'proof_band.2', 'proof_band.3'] as const;

const techStack: { icon: LucideIcon; label: string }[] = [
  { icon: Code2, label: 'Next.js / React' },
  { icon: Search, label: 'Local SEO' },
  { icon: Gauge, label: 'Core Web Vitals' },
  { icon: FileCode2, label: 'Structured data' },
  { icon: Languages, label: 'Multilingual routes' },
];

function BrowserFrame({ title, subtitle, url, sector, children }: BrowserFrameProps) {
  return (
    <article
      aria-label={title}
      className="overflow-hidden rounded-md border border-hairline bg-surface"
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

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="text-sm font-semibold text-ink">{title}</h2>
            <p className="mt-1 text-xs leading-relaxed text-muted">{subtitle}</p>
          </div>
          <span className="rounded border border-sea/40 bg-sea/15 px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-sea-bright">
            System
          </span>
        </div>

        <div className="mt-4">{children}</div>
      </div>
    </article>
  );
}

function HotelBookingFrame() {
  return (
    <BrowserFrame
      title="Hotel Direct Booking System"
      subtitle="A booking-first hotel site with language routes and direct inquiry flow."
      url="batumi-hotel.ge/direct-booking"
      sector="Hospitality"
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
                <BedDouble className="size-3.5 text-sea-bright" />
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
            <CalendarDays className="size-3.5 text-oxide-hover" />
            <span>Direct booking flow</span>
          </div>
          <span className="rounded bg-oxide px-2.5 py-1 text-xs font-semibold text-white">Book direct</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 border-t border-hairline pt-3 text-xs text-muted">
          <MapPin className="size-3.5 text-sea-bright" />
          <span>Batumi location pages</span>
          <span className="hidden text-hairline-light sm:inline">/</span>
          <span>Trust and policy strip</span>
        </div>
      </div>
    </BrowserFrame>
  );
}

function ClinicTrustFrame() {
  return (
    <BrowserFrame
      title="Clinic Trust System"
      subtitle="A clinic website structure for treatments, doctors, intake, and patient questions."
      url="dental-clinic.ge/treatments"
      sector="Medical"
    >
      <div className="space-y-3">
        <div className="rounded border border-hairline bg-canvas p-3">
          <div className="flex items-start gap-2">
            <Stethoscope className="mt-0.5 size-4 text-sea-bright" />
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
          <ShieldCheck className="size-4 shrink-0 text-success" />
        </div>

        <div className="grid gap-2 sm:grid-cols-[1fr_auto] sm:items-center">
          <div className="rounded border border-hairline bg-canvas px-3 py-2">
            <p className="text-xs font-medium text-ink">FAQ and trust signal</p>
            <p className="mt-1 text-xs text-muted">Answers before the patient contacts the clinic.</p>
          </div>
          <span className="rounded bg-oxide px-3 py-2 text-center text-xs font-semibold text-white">
            Request consultation
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 border-t border-hairline pt-3 text-xs text-muted">
          <Languages className="size-3.5 text-sea-bright" />
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

function BeautyAppointmentFrame() {
  return (
    <BrowserFrame
      title="Beauty Appointment System"
      subtitle="A service menu, gallery, and appointment path for studios with social traffic."
      url="beauty-studio.ge/book"
      sector="Beauty"
    >
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-2" aria-label="Service menu row">
          {['Hair', 'Nails', 'Makeup'].map((service) => (
            <div key={service} className="rounded border border-hairline bg-canvas p-2 text-center">
              <Sparkles className="mx-auto size-3.5 text-oxide-hover" />
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

        <div className="grid grid-cols-4 gap-1.5" aria-label="Gallery strip">
          {['Look', 'Space', 'Result', 'Team'].map((label) => (
            <div key={label} className="aspect-[4/3] rounded border border-hairline bg-canvas p-1.5">
              <div className="h-full rounded-sm border border-sea/20 bg-surface-elevated" />
              <span className="sr-only">{label}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-hairline pt-3 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-sea-bright">
          Instagram to booking
        </div>
      </div>
    </BrowserFrame>
  );
}

function TechnicalPanel() {
  return (
    <aside
      aria-label="Technical delivery stack"
      className="rounded-md border border-hairline bg-canvas-soft p-4"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">
          Build layer
        </p>
        <span className="rounded border border-success/30 bg-success/10 px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-success">
          Production
        </span>
      </div>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {techStack.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-2 text-xs text-ink">
            <Icon className="size-3.5 shrink-0 text-sea-bright" aria-hidden="true" />
            <span>{label}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export async function HeroSection({ locale }: HeroSectionProps) {
  const t = await getTranslations('hero');

  return (
    <section id="hero" data-locale={locale} className="relative overflow-hidden bg-canvas">
      <div className="mx-auto w-full max-w-[var(--hero-max-width)] px-[var(--container-padding)] py-16 md:py-24 lg:py-28">
        <div className="mb-10 hidden items-center justify-between border-b border-hairline pb-4 md:flex">
          <span className="mono-label text-muted">Web Development Studio</span>
          <span className="mono-label text-muted">Batumi / Georgia</span>
          <span className="mono-label text-sea-bright">Available for projects</span>
        </div>

        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.02fr)_minmax(440px,0.98fr)] lg:gap-16">
          <div>
            <p className="mono-label mb-4 text-sea-bright">{t('sectionLabel')}</p>

            <h1 className="max-w-2xl text-balance text-display-xl text-ink">
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

          <div className="min-w-0" aria-label="Miniature website systems preview">
            <div className="space-y-3">
              <HotelBookingFrame />
              <ClinicTrustFrame />
              <BeautyAppointmentFrame />
            </div>
            <div className="mt-4">
              <TechnicalPanel />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
