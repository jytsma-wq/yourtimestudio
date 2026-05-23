import { Link } from '@/lib/i18n/navigation';
import { getTranslations } from 'next-intl/server';
import { Instagram, Linkedin, Facebook } from 'lucide-react';
import Image from 'next/image';
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
    { label: nav('insights'), href: '/insights' },
  ];

  const legalLinks = [
    { label: t('privacy'), href: '/privacy' },
    { label: t('terms'), href: '/terms' },
  ];

  const socialLinks = [
    { label: t('instagram'), href: siteConfig.social.instagram, icon: Instagram },
    { label: t('linkedin'), href: siteConfig.social.linkedin, icon: Linkedin },
    { label: t('facebook'), href: siteConfig.social.facebook, icon: Facebook },
  ].filter((link) => link.href);

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-[var(--container-max-width)] px-[var(--container-padding)] py-12 md:py-16">
        {/* Logo + Tagline */}
        <div className="mb-10">
          <Image
            src="/brand/yourtimestudio-logo.png"
            alt="Yourtimestudio logo"
            width={180}
            height={212}
            className="mb-4 h-auto w-36"
          />
          <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
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
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              {t('solutions')}
            </h3>
            <ul className="space-y-3">
              {solutionsLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-teal"
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
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              {t('company')}
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-teal"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              {t('legal')}
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-teal"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {socialLinks.length > 0 && (
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
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
                        className="flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-teal"
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
        <div className="mt-12 flex flex-col items-start gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Yourtimestudio. {t('copyright')}
          </p>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {launchLocales.map((loc, i) => (
              <span key={loc} className="flex items-center gap-3">
                {i > 0 && <span className="text-border">|</span>}
                <Link
                  href="/"
                  locale={loc}
                  className={`transition-colors hover:text-teal ${locale === loc ? 'text-teal font-semibold' : ''}`}
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
