import { Link } from '@/lib/i18n/navigation';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { ArrowRight, Facebook, Instagram, Linkedin, Mail, MapPin, MessageCircle } from 'lucide-react';
import { LighthouseBeam, NavigationChart } from '@/components/brand';
import { launchLocales, localeLabels, type Locale } from '@/lib/i18n/config';
import { siteConfig } from '@/lib/site-config';
import { sectors, sectorKeys } from '@/lib/sector-config';

interface SiteFooterProps {
  locale: Locale;
}

export default async function SiteFooter({ locale }: SiteFooterProps) {
  const t = await getTranslations('footer');
  const nav = await getTranslations('nav');

  const keyRoutes = [
    { label: nav('home'), href: '/' },
    { label: nav('work'), href: '/work' },
    { label: nav('audits'), href: '/website-audits' },
    { label: nav('pricing'), href: '/pricing' },
    { label: nav('about'), href: '/about' },
    { label: nav('contact'), href: '/contact' },
  ];

  const sectorLinks = sectorKeys.map(key => ({
    label: nav(key),
    href: sectors[key].href,
    color: sectors[key].dotClass,
  }));

  const legalLinks = [
    { label: t('privacy'), href: '/privacy' },
    { label: t('terms'), href: '/terms' },
  ];

  const socialLinks = [
    { label: t('instagram'), href: siteConfig.social.instagram, icon: Instagram },
    { label: t('linkedin'), href: siteConfig.social.linkedin, icon: Linkedin },
    { label: t('facebook'), href: siteConfig.social.facebook, icon: Facebook },
  ].filter((link) => link.href.trim());

  const hasWhatsApp = Boolean(siteConfig.contact.whatsappHref);
  const whatsappDisplay = siteConfig.contact.whatsapp || t('whatsapp');
  const year = new Date().getFullYear();

  return (
    <footer className="relative isolate overflow-hidden border-t border-hairline bg-canvas">
      <NavigationChart variant="footer" className="!absolute opacity-[0.32]" />
      <LighthouseBeam className="!absolute opacity-35" />
      <div className="pointer-events-none absolute inset-0 bl-noise" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-2 hidden select-none text-center font-mono text-[clamp(3.5rem,11vw,10rem)] font-black uppercase leading-none tracking-[0.08em] text-ink/[0.03] lg:block" aria-hidden="true">
        Batumi Lighthouse
      </div>

      <div className="relative z-10 mx-auto max-w-[var(--container-max-width)] px-[var(--container-padding)] py-8 md:py-14">
        <div className="grid gap-6 border-b border-hairline pb-6 md:gap-8 md:pb-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(22rem,0.9fr)] lg:items-end">
          <div>
            <Link href="/" className="group inline-flex items-center gap-3 text-ink transition-colors hover:text-sea-bright">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-md border border-hairline bg-paper p-0.5">
                <span className="relative size-10 overflow-hidden rounded-sm">
                  <Image
                    src={siteConfig.brand.markSrc}
                    alt={siteConfig.brand.markAlt}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </span>
              </span>
              <span className="leading-none">
                <span className="block text-base font-semibold tracking-[0.04em] text-ink">
                  {siteConfig.brand.displayName}
                </span>
                <span className="mt-1.5 block font-mono text-[0.68rem] font-semibold uppercase leading-none tracking-[0.12em] text-muted transition-colors group-hover:text-ink/80">
                  {t('brand_descriptor')}
                </span>
              </span>
            </Link>
            <p className="mt-4 max-w-xl text-body-sm leading-relaxed text-muted">
              {t('tagline')}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-muted">
              <span className="inline-flex items-center gap-2 rounded-md border border-hairline bg-surface/70 px-3 py-2">
                <MapPin className="size-3.5 text-sea-bright" aria-hidden="true" />
                {t('basedIn')}
              </span>
              <span className="bl-coordinates rounded-md border border-sea-bright/15 bg-sea-bright/5 px-3 py-2">
                {t('coordinates')}
              </span>
            </div>
          </div>

          <div className="rounded-md border border-hairline bg-surface/70 p-4 backdrop-blur-sm">
            <p className="mono-label text-sea-bright">{t('contactHeading')}</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="group rounded-md border border-hairline bg-canvas/70 p-3 transition-colors hover:border-sea-bright/30"
              >
                <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-muted">
                  <Mail className="size-3.5 text-sea-bright" aria-hidden="true" />
                  {t('email')}
                </span>
                <span className="mt-2 block text-sm font-semibold text-ink transition-colors group-hover:text-sea-bright">
                  {siteConfig.contact.email}
                </span>
              </a>
              {hasWhatsApp && (
                <a
                  href={siteConfig.contact.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-md border border-hairline bg-canvas/70 p-3 transition-colors hover:border-sea-bright/30"
                >
                  <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-muted">
                    <MessageCircle className="size-3.5 text-sea-bright" aria-hidden="true" />
                    {t('whatsapp')}
                  </span>
                  <span className="mt-2 block text-sm font-semibold text-ink transition-colors group-hover:text-sea-bright">
                    {whatsappDisplay}
                  </span>
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 py-6 md:gap-8 md:py-8 sm:grid-cols-3 lg:grid-cols-[1.15fr_1fr_1fr_1fr] lg:gap-12">
          <div>
            <h3 className="mb-4 mono-label text-muted">
              {t('keyRoutes')}
            </h3>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {keyRoutes.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-sea-bright"
                  >
                    <ArrowRight className="size-3 text-sea-bright/70" aria-hidden="true" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 mono-label text-muted">
              {t('sectorRoutes')}
            </h3>
            <ul className="space-y-3">
              {sectorLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-sea-bright"
                  >
                    <span className={`inline-block size-1.5 rounded-full ${link.color}`} aria-hidden="true" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 mono-label text-muted">
              {t('legal')}
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-sea-bright"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 hidden sm:col-span-1 sm:block">
            <h3 className="mb-4 mono-label text-muted">
              {t('navigationSignal')}
            </h3>
            <div className="rounded-md border border-hairline bg-canvas/65 p-3">
              <p className="text-sm leading-relaxed text-muted">
                {t('positioning')}
              </p>
              <div className="mt-4 bl-signal-line h-4" aria-hidden="true" />
              {socialLinks.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {socialLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex size-9 items-center justify-center rounded-md border border-hairline text-muted transition-colors hover:border-sea-bright/30 hover:text-sea-bright"
                        aria-label={link.label}
                      >
                        <Icon className="size-4" aria-hidden="true" />
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start gap-4 border-t border-hairline pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">
            &copy; {year} Batumi Lighthouse. {t('copyright')}
          </p>
          <div className="flex flex-wrap items-center gap-3 pl-10 text-xs text-muted sm:pl-0">
            {launchLocales.map((loc, i) => (
              <span key={loc} className="flex items-center gap-3">
                {i > 0 && <span className="text-hairline" aria-hidden="true">|</span>}
                <Link
                  href="/"
                  locale={loc}
                  className={`transition-colors hover:text-sea-bright ${locale === loc ? 'text-sea-bright font-semibold' : ''}`}
                >
                  {localeLabels[loc]}
                </Link>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
