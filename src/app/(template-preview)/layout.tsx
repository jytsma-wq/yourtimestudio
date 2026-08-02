import type { ReactNode } from "react";
import type { Metadata } from "next";

import "@/app/globals.css";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
};

export default function TemplatePreviewLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <style>{`h1, h2, h3, h4 { color: inherit !important; }`}</style>
      </head>
      <body className="template-preview-root">{children}</body>
    </html>
  );
}
