# Fashion Trend Studio

**2026 Women's Fashion Trends** — a mobile-first, editorial-style static site built as a
Pinterest information source / landing page for a women's fashion content project.

## Live pages

| Page | Path |
| --- | --- |
| Home | `/` (`index.html`) |
| 2026 Trend Report | `/trends.html` |

## Content directions

Women's Fashion · Fashion Trends · Outfit Inspiration · Street Style ·
Spring Summer 2026 · Y2K · Minimalist Fashion · French Style · Vacation Style

## The six trends on `/trends.html`

1. French Minimalism
2. Y2K Revival
3. Romantic Dresses
4. Vacation Style
5. Street Style
6. Soft Feminine

Each trend card carries a title, a short intro, an image area and a CTA button.

## Structure

```
.
├── index.html                     # home / Pinterest landing page
├── trends.html                    # 2026 trend report (6 trend cards)
├── assets/
│   ├── css/styles.css             # mobile-first editorial stylesheet
│   └── js/main.js                 # image config, nav, reveal, Pinterest save, filters
├── .nojekyll                      # serve files as-is on GitHub Pages
├── robots.txt
├── sitemap.xml
└── .github/workflows/deploy-pages.yml
```

## Replacing images

All imagery is remote and **defined in one place** — `SITE_IMAGES` at the top of
`assets/js/main.js`. Change a URL there and the whole site updates. No local image
files are referenced anywhere. A secondary CDN fallback plus an elegant placeholder
handle any URL that fails to load.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy-pages.yml`, which uses
`actions/configure-pages@v5` with `enablement: true` — this switches GitHub Pages on
automatically (build type: GitHub Actions) and publishes the repository root.

## Pinterest notes

- Open Graph + Twitter card metadata on both pages for rich pins.
- Vertical 2:3 and 4:5 image ratios, which Pinterest favours.
- "Save" buttons build proper `pinterest.com/pin/create/button/` URLs at runtime.
