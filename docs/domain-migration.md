# Domain Migration Notes

Old domain: `yourtimestudio.com`
New domain: `batumilighthouse.com`

## Required redirect

Set a permanent 301 redirect:

```text
yourtimestudio.com/* -> batumilighthouse.com/*
```

Keep the old domain active for at least 12 months after launch so search engines, backlinks, bookmarks, and existing customers can follow the redirect.

## Launch checklist

- Add both `yourtimestudio.com` and `batumilighthouse.com` to Google Search Console.
- Submit the new sitemap: `https://batumilighthouse.com/sitemap.xml`.
- Update Google Business Profile with the new website and email.
- Update social profiles with the new domain and brand name.
- Update public contact email to `hello@batumilighthouse.com`.
- Update Hostinger environment variables:
  - `NEXT_PUBLIC_SITE_URL=https://batumilighthouse.com`
  - `NEXT_PUBLIC_CONTACT_EMAIL=hello@batumilighthouse.com`
  - `NEXT_PUBLIC_ANALYTICS_DOMAIN=batumilighthouse.com`
