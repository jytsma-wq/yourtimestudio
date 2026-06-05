---
# DESIGN.md — Black Sea Digital Systems
# Design constitution for Batumi Lighthouse website
# All future edits must follow this document.

version: "2.0"
direction: "Black Sea Digital Systems"

identity:
  description: "A founder-led web development studio for hotels, clinics, beauty studios, and local service businesses in Batumi. The site must feel like a serious website developer, not a soft beauty/wellness brand."
  personality:
    - technical
    - editorial
    - high-contrast
    - developer-led
    - commercially sharp
    - confident
    - structured
    - premium but not flashy
    - local Batumi presence with international discipline

colors:
  canvas: "#0B0D0E"
  canvas-soft: "#111416"
  surface: "#15191B"
  surface-elevated: "#1C2225"
  paper: "#F4EFE7"
  paper-soft: "#E8DED1"
  ink: "#F7F3EA"
  ink-dark: "#151515"
  muted: "#A7A29A"
  muted-dark: "#625B52"
  hairline: "#2A3033"
  hairline-light: "#D8CEC0"
  sea: "#12343B"
  sea-bright: "#1F6F78"
  oxide: "#A4472A"
  oxide-hover: "#C45A35"
  success: "#2D9B6F"
  warning: "#C68A2E"

typography:
  display-xl:
    size: "clamp(3rem, 7vw, 4.5rem)"
    weight: 600
    tracking: "-0.02em"
    line-height: 1.05
  display-lg:
    size: "clamp(2.5rem, 5.5vw, 3.5rem)"
    weight: 600
    tracking: "-0.015em"
    line-height: 1.1
  heading-lg:
    size: "clamp(2rem, 4vw, 2.5rem)"
    weight: 600
    tracking: "-0.01em"
    line-height: 1.2
  heading-md:
    size: "clamp(1.5rem, 3vw, 1.75rem)"
    weight: 600
    tracking: "0"
    line-height: 1.3
  body-lg:
    size: "1.1875rem"
    weight: 400
    tracking: "0"
    line-height: 1.65
  body:
    size: "1rem"
    weight: 400
    tracking: "0"
    line-height: 1.6
  body-sm:
    size: "0.875rem"
    weight: 400
    tracking: "0"
    line-height: 1.5
  mono-label:
    size: "0.6875rem"
    weight: 600
    tracking: "0.12em"
    line-height: 1.4
    transform: uppercase
  font-families:
    sans: "Geist Sans, ui-sans-serif, system-ui, sans-serif"
    mono: "Geist Mono, ui-monospace, monospace"

layout:
  max-content-width: 1280px
  wide-hero-max: 1440px
  grid: 12-column desktop
  container-padding: 24px
  section-padding-vertical: 96px
  section-padding-mobile: 64px
  approach: "fewer card grids, more differentiated section compositions"

components:
  buttons:
    radius: "6px"
    approach: "minimal, technical, no rounded-none"
  cards:
    approach: "hairline borders, low/no shadow, dark panels or warm paper panels"
  hero:
    approach: "must show website/development systems, not only stock photography"
  audit:
    approach: "must look like a diagnostic product"
  pricing:
    approach: "calm comparison system"
  case-studies:
    approach: "must show screens/mockups/process, not fake generic cards"
  nav:
    approach: "simplified, clean, technical authority"

motion:
  rules:
    - "no decorative motion for its own sake"
    - "remove magnetic gimmicks unless they serve clear UX"
    - "use subtle reveal, opacity, transform, and purposeful microinteractions"
    - "respect prefers-reduced-motion"

dos:
  - "Use high-contrast dark-first design"
  - "Show website screens, code, performance, multilingual architecture, booking flows, SEO, and conversion systems"
  - "Prioritize contrast, typography, hierarchy, and conversion"
  - "Use warm paper as contrast against dark canvas sections"
  - "Keep motion minimal and purposeful"
  - "Show technical competence visually"

donts:
  - "Do not use pale coral/sage as core identity"
  - "Do not use floating AI-style badges everywhere"
  - "Do not overuse linen textures"
  - "Do not use generic SaaS gradients"
  - "Do not create fake client claims or metrics"
  - "Do not use system fonts when custom fonts are available"
  - "Do not use decorative motion without UX purpose"
  - "Do not repeat identical section patterns"
  - "Do not use vague marketing language"
  - "Do not use Inter, Roboto, or other generic AI-default fonts"
---

# DESIGN.md — Black Sea Digital Systems

## Direction

This website represents a **founder-led web development studio** in Batumi, Georgia. The visual identity must communicate technical authority, editorial precision, and commercial clarity — not soft boutique aesthetics.

## Color Architecture

The site is **dark-first** with warm paper contrast sections.

- **Canvas** (`#0B0D0E`): Primary dark background for hero, CTA, and key sections
- **Surface** (`#15191B`): Elevated dark panels, cards, and code blocks
- **Paper** (`#F4EFE7`): Warm contrast sections for readability — audit, pricing, content
- **Sea** (`#12343B` / `#1F6F78`): Brand accent — Black Sea identity, technical credibility
- **Oxide** (`#A4472A` / `#C45A35`): Secondary accent — warm, assertive, conversion CTA
- **Hairline** (`#2A3033`): Borders and dividers on dark surfaces

### Token Naming Rules

- Token names MUST match their actual visual value (no `--teal` pointing to rust)
- Use descriptive names: `--canvas`, `--surface`, `--paper`, `--sea`, `--oxide`, `--hairline`
- Dark mode tokens MUST flip `--ink` and `--paper` correctly

## Typography

Use **Geist Sans** for body and **Geist Mono** for labels and code. Font files exist in `/public/fonts/` — they MUST be wired through `next/font/local`.

### Scale

The typography scale uses CSS custom properties with clamp-based responsive sizing. Display headings are significantly larger than body text to create dramatic hierarchy.

### Rules

- Display headings: tight tracking, high weight, dramatic scale
- Body text: comfortable line-height (1.6+), regular weight
- Mono labels: uppercase, wide tracking, small size — for category tags and technical metadata
- Never use system fonts when Geist is available

## Layout Principles

1. Dark-first homepage with warm paper contrast sections
2. Product/mockup visual language instead of generic lifestyle images
3. Differentiated section compositions — not repeated grid patterns
4. Maximum content width: 1280px
5. Wide hero: 1440px
6. Strict vertical rhythm with generous whitespace

## Component Rules

### Buttons
- 6px border-radius (technical, not rounded-none or pill)
- High contrast text
- Minimal hover effects

### Cards
- Hairline borders on dark surfaces
- Low or no shadows
- Dark panels (`surface`) or warm paper panels

### Hero
- Must show website/development systems
- Include browser mockups, code panels, multilingual route chips
- No stock-photo-first hero

### Navigation
- Clean, calm, technical
- Remove scroll progress bar
- Remove theme toggle (dark-first)
- Show nav at `lg:` breakpoint (1024px), not `xl:`

## Motion Rules

1. Keep only motion that improves comprehension or interaction
2. Subtle fade-in and transform reveals only
3. Remove: magnetic buttons, floating chips, typewriter effects, count-up animations on weak numbers
4. Global `prefers-reduced-motion` support required
5. No decorative background numbers or section decorations

## Content Rules

1. No fake client numbers or metrics
2. Use "concept systems" or "example builds" for case studies if real clients are few
3. Position as developer + conversion systems, not boutique creative
4. Pragmatic, direct, commercially sharp copy
5. Show technical deliverables: booking flows, SEO, multilingual architecture, performance

## What Not To Touch

- Prisma schema and API routes
- i18n message file structure (keys can be updated, structure preserved)
- Database logic
- Rate limiting
- Cookie consent
- WhatsApp FAB
