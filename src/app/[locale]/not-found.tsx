import { Link } from '@/lib/i18n/navigation';
import { Button } from '@/components/ui/button';
import { ArrowRight, Home, Search } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export default async function NotFound() {
  const t = await getTranslations('notFound');

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* Animated broken browser window SVG */}
        <div className="mb-8 mx-auto w-48 h-36 relative">
          <svg
            viewBox="0 0 200 150"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            aria-hidden="true"
            focusable="false"
          >
            {/* Browser window */}
            <rect x="10" y="10" width="180" height="130" rx="8" stroke="var(--foreground)" strokeWidth="2" fill="var(--card)" opacity="0.3" />
            {/* Chrome dots */}
            <circle cx="28" cy="24" r="4" fill="var(--destructive)" opacity="0.7" />
            <circle cx="42" cy="24" r="4" fill="var(--rose)" opacity="0.7" />
            <circle cx="56" cy="24" r="4" fill="var(--teal)" opacity="0.7" />
            {/* URL bar */}
            <rect x="70" y="19" width="110" height="10" rx="3" fill="var(--border)" opacity="0.5" />
            {/* 404 text */}
            <text x="100" y="90" textAnchor="middle" className="text-h1 font-semibold" fill="var(--teal)">404</text>
            {/* Crack lines */}
            <path d="M85 70 L92 80 L88 90 L95 100" stroke="var(--foreground)" strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />
            <path d="M115 65 L108 75 L112 85 L105 95" stroke="var(--foreground)" strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />
            {/* Wandering cursor */}
            <g>
              <circle cx="80" cy="110" r="3" fill="var(--teal)" opacity="0.6" />
            </g>
          </svg>
        </div>

        <h1 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
          {t('heading')}
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed mb-8">
          {t('body')}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg" className="bg-brand-serene-coral text-brand-charcoal hover:bg-brand-serene-coral-darken hover:text-white font-medium">
            <Link href="/">
              <Home className="size-4 mr-2" />
              {t('home')}
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-foreground/20 text-foreground">
            <Link href="/website-audits">
              <Search className="size-4 mr-2" />
              {t('audit')}
            </Link>
          </Button>
          <Button asChild variant="ghost" size="lg" className="text-muted-foreground">
            <Link href="/contact">
              {t('contact')}
              <ArrowRight className="size-4 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
