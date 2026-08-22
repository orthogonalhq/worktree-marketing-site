# SEO release verification

## Local release contract

Run a production build, start it locally, then run:

```sh
npm run check:routes -- http://127.0.0.1:3100
```

The check verifies direct permanent redirects, the unknown-route 404, manifest static-route status/canonicals/H1 counts, concrete noindex pages, the published blog index and article URLs, sitemap inclusion/exclusions, and a server-rendered `/blog` navigation link.

## Post-deploy manual verification

- Compare production route status, canonical metadata, robots directives, sitemap and social metadata with the local contract.
- Confirm preview deployments return `X-Robots-Tag: noindex, nofollow` and preview `robots.txt` disallows crawling.
- Verify ownership in Google Search Console and Bing Webmaster Tools, then submit `https://worktree.agency/sitemap.xml` to both.
- Review crawler logs where they are available to confirm expected search-engine access, redirects and 404 handling.
- Record an initial baseline for branded and non-branded search visibility, indexed pages and AI-answer/referral visibility before interpreting changes over time.

This project intentionally does not add analytics instrumentation, IndexNow, `llms.txt`, or a monitoring system as part of this release contract.
