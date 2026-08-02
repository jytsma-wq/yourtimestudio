import Image from 'next/image';
import { Facebook, Instagram, Linkedin, MapPin } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/lib/i18n/navigation';
import { launchLocales, localeLabels, type Locale } from '@/lib/i18n/config';
import { siteConfig } from '@/lib/site-config';
import { sectors, sectorKeys } from '@/lib/sector-config';

interface SiteFooterProps {
  locale: Locale;
}

export default async function SiteFooter({ locale }: SiteFooterProps) {
  const t = await getTranslations('footer');
  const nav = await getTranslations('nav');
  const ui = await getTranslations('ui');

  const solutionsLinks = [
    ...sectorKeys.map((key) => ({ label: nav(key), href: sectors[key].href })),
    { label: nav('audits'), href: '/website-audits' },
    { label: nav('photography'), href: '/photography' },
  ];

  const companyLinks = [
    { label: nav('about'), href: '/about' },
    { label: nav('templates'), href: '/templates' },
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

  const linkClass =
    'inline-flex min-h-10 items-center py-1 text-sm text-brand-cream/68 transition-colors hover:text-brand-serene-coral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-serene-coral';

  return (
    <footer className="relative overflow-hidden bg-[#173c3e] text-brand-cream">
      <svg
        className="absolute left-0 top-0 h-24 w-full text-background"
        viewBox="0 0 1440 180"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path fill="currentColor" d="M0 0H1440V45C1187 139 958 39 719 110C462 186 246 45 0 126Z" />
      </svg>

      <div className="relative mx-auto max-w-[80rem] px-[var(--container-padding)] pb-10 pt-36 md:pb-12 md:pt-44">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1.35fr)] lg:gap-20">
          <div>
            <Image
              src={siteConfig.assets.logo}
              alt=""
              width={1360}
              height={520}
              className="h-auto w-full max-w-sm invert mix-blend-screen"
              aria-hidden="true"
            />
            <p className="mt-6 max-w-md text-sm leading-relaxed text-brand-cream/72">
              {t('tagline')}
            </p>

            <div className="mt-8 flex max-w-md items-start gap-3 border-t border-brand-cream/20 pt-5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand-serene-coral" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-brand-cream">{ui('location')}</p>
                <p className="mt-1 text-xs leading-relaxed text-brand-cream/62">
                  {ui('locationArea')}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
            <div>
              <h3 className="font-serif text-xl font-medium text-brand-cream">{t('solutions')}</h3>
              <ul className="mt-4 space-y-1">
                {solutionsLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={linkClass}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-serif text-xl font-medium text-brand-cream">{t('company')}</h3>
              <ul className="mt-4 space-y-1">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={linkClass}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-serif text-xl font-medium text-brand-cream">{t('legal')}</h3>
              <ul className="mt-4 space-y-1">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={linkClass}>{link.label}</Link>
                  </li>
                ))}
              </ul>

              {socialLinks.length > 0 && (
                <ul className="mt-5 flex gap-2">
                  {socialLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="grid size-11 place-items-center rounded-full border border-brand-cream/22 text-brand-cream/72 transition-colors hover:border-brand-serene-coral hover:text-brand-serene-coral"
                          aria-label={link.label}
                        >
                          <Icon className="size-4" aria-hidden="true" />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-brand-cream/20 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-brand-cream/55">
            &copy; {new Date().getFullYear()} {siteConfig.name}. {t('copyright')}
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
            {launchLocales.map((loc) => (
              <Link
                key={loc}
                href="/"
                locale={loc}
                className={`min-h-10 py-3 transition-colors hover:text-brand-serene-coral ${
                  locale === loc ? 'font-semibold text-brand-serene-coral' : 'text-brand-cream/58'
                }`}
              >
                {localeLabels[loc]}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
