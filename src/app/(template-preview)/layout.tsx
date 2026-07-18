import type { ReactNode } from "react";

import "@/app/globals.css";

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
