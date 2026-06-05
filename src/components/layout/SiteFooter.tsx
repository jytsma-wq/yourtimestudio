import { Link } from '@/lib/i18n/navigation';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Instagram, Linkedin, Facebook } from 'lucide-react';
import { launchLocales, localeLabels, type Locale } from '@/lib/i18n/config';
import { siteConfig } from '@/lib/site-config';
import { sectors, sectorKeys } from '@/lib/sector-config';
import { LocationCard } from '@/components/shared/LocationCard';

interface SiteFooterProps {
  locale: Locale;
}

export default async function SiteFooter({ locale }: SiteFooterProps) {
  const t = await getTranslations('footer');
  const nav = await getTranslations('nav');

  const solutionsLinks: { label: string; href: string; color?: string }[] = [
    ...sectorKeys.map(key => ({ label: nav(key), href: sectors[key].href, color: sectors[key].dotClass })),
    { label: nav('audits'), href: '/website-audits' },
  ];

  const companyLinks = [
    { label: nav('about'), href: '/about' },
    { label: nav('pricing'), href: '/pricing' },
    { label: nav('contact'), href: '/contact' },
  ];

  const legalLinks = [
    { label: t('privacy'), href: '/privacy' },
    { label: t('terms'), href: '/terms' },
  ];

  const socialLinks = [
    { label: t('instagram'), href: siteConfig.social.instagram, icon: Instagram },
    { label: t('linkedin'), href: siteConfig.social.linkedin, icon: Linkedin },
    { label: t('facebook'), href: siteConfig.social.facebook, icon: Facebook },
  ].filter((link) => link.href.trim());

  return (
    <footer className="border-t border-hairline bg-canvas">
      <div className="mx-auto max-w-[var(--container-max-width)] px-[var(--container-padding)] py-12 md:py-16">
        {/* Logo + Tagline */}
        <div className="mb-10">
          <Link href="/" className="group inline-flex items-center gap-3 text-ink transition-colors hover:text-sea-bright">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-md border border-hairline bg-paper p-0.5">
              <Image
                src={siteConfig.brand.markSrc}
                alt={siteConfig.brand.markAlt}
                width={40}
                height={40}
                sizes="44px"
                className="size-10 rounded-sm object-cover"
              />
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
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
            {t('tagline')}
          </p>
          <div className="mt-4 max-w-sm">
            <LocationCard />
          </div>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 md:gap-12">
          {/* Solutions */}
          <div>
            <h3 className="mb-4 mono-label text-muted">
              {t('solutions')}
            </h3>
            <ul className="space-y-3">
              {solutionsLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-ink transition-colors hover:text-sea-bright"
                  >
                    {link.color && (
                      <span className={`inline-block size-1.5 rounded-full ${link.color}`} />
                    )}
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 mono-label text-muted">
              {t('company')}
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
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

          {/* Legal */}
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

          {socialLinks.length > 0 && (
            <div>
              <h3 className="mb-4 mono-label text-muted">
                {t('social_heading')}
              </h3>
              <ul className="space-y-3">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2.5 text-sm text-muted transition-colors hover:text-sea-bright"
                      >
                        <Icon className="size-4" aria-hidden="true" />
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-start gap-4 border-t border-hairline pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Batumi Lighthouse. {t('copyright')}
          </p>
          <div className="flex items-center gap-3 text-xs text-muted">
            {launchLocales.map((loc, i) => (
              <span key={loc} className="flex items-center gap-3">
                {i > 0 && <span className="text-hairline">|</span>}
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
