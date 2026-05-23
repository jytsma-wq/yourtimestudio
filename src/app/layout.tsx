/**
 * Root layout — thin pass-through.
 *
 * The full HTML shell (<html>, <body>, fonts, providers) lives in
 * src/app/[locale]/layout.tsx so that next-intl can inject the correct
 * locale and messages per request.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
