import localFont from 'next/font/local';

export const geistSans = localFont({
  src: './fonts/geist-latin.woff2',
  weight: '100 900',
  display: 'swap',
  variable: '--font-geist-sans',
});

export const geistMono = localFont({
  src: './fonts/geist-mono-latin.woff2',
  weight: '100 900',
  display: 'swap',
  variable: '--font-geist-mono',
});
