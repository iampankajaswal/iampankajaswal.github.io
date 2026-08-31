# Portfolio — Pankaj Aswal

Static portfolio site for senior DevOps / SRE / platform engineering applications in Europe.
No framework, no build step, no dependencies. Three files do the work.

```
portfolio/
├── index.html                     # the portfolio
├── privacy.html                   # GDPR Art. 13/14 notice
├── assets/
│   ├── css/style.css              # all styling, incl. dark mode + print stylesheet
│   └── js/main.js                 # theme toggle, mobile nav, scroll highlight
└── .github/workflows/deploy.yml   # validate + deploy to GitHub Pages
```

## Run it locally

```bash
cd portfolio
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy to GitHub Pages

The recommended setup is a dedicated repo named `iampankajaswal.github.io`, which
publishes at that domain with no path prefix.

```bash
# 1. create the repo on GitHub, then from this directory:
cd portfolio
git init -b main
git add .
git commit -m "Add portfolio site"
git remote add origin git@github.com:iampankajaswal/iampankajaswal.github.io.git
git push -u origin main
```

Then in the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
The workflow validates the HTML and internal links before it deploys, so a broken
link fails the build rather than shipping.

If you deploy into a subdirectory repo instead (e.g. `github.com/iampankajaswal/portfolio`),
update the `<link rel="canonical">` and `og:url` values in both HTML files.

## Attach your CV

Both the hero button and the contact list link to `Pankaj_Aswal_DevOps_CloudNative.pdf`.
Copy your preferred PDF from the parent directory into `portfolio/` under that name:

```bash
cp ../Pankaj_Aswal_DevOps_CloudNative.pdf .
```

Or point the two `href` values at whichever generated PDF you want to serve. Note that
the site's own print stylesheet already produces a clean CV via ⌘P → Save as PDF, so
the download is a convenience rather than a requirement.

## Design and content decisions

These were deliberate. Change them knowingly.

**English only.** German is listed honestly at A2. A German-language site implies
conversational German and would create a mismatch in a screening call. English is the
working language of EU tech hiring.

**No photograph.** EU anti-discrimination practice (and Dutch, Irish, Nordic and UK
norms in particular) discourages photos on applications. German employers are more
tolerant of them, but omitting one is never penalised while including one can be.

**Certifications and Courses are separate sections.** AWS Certified Solutions Architect
is a certification. *Claude Code in Action* is a certificate of completion — a course.
EU recruiters do verify credentials, and conflating the two reads as padding. The course
carries its verification link so the claim is checkable.

**Work eligibility stated up front.** European recruiters screen on eligibility, location
and notice period before they read anything technical. Burying it wastes their time and
yours. The EU Blue Card framing is accurate — a recognised engineering degree plus 10+ years
of relevant experience — and signals that sponsorship is a known, routine path rather than
an open question.

**GDPR-clean by construction.** Zero cookies, zero analytics, zero third-party requests,
no external fonts. The privacy notice is therefore short and truthful instead of
boilerplate. This also makes the site fast and keeps it working offline.

**Metric-first, understated tone.** European CV convention rewards evidence over
self-description. Every number on the page carries the context that makes it meaningful —
`<50 min downtime` is unremarkable until you know it covered regulated banking workloads.

**Print stylesheet.** ⌘P produces a clean, ATS-parseable CV with expanded link targets
and no page-break orphans. Recruiters do print.

## Colour

Light and dark palettes are both explicitly selected, not derived by inverting one from
the other. Dark values are declared under both `prefers-color-scheme` and `[data-theme]`
so the on-page toggle wins over the OS setting in either direction.

Stat tile values sit in primary ink rather than the accent hue — colour is not encoding
anything on those tiles, so using it there would be decoration masquerading as meaning.

## Before you publish — check these

- [ ] Copy a CV PDF into `portfolio/` (see above) or repoint the two links
- [ ] Confirm the exact AWS certification name matches your credential, and consider
      adding the credential ID and issue date the way the course entry does
- [ ] Update the `canonical` and `og:url` URLs to your real domain
- [ ] Update the German level if it moves past A2
- [ ] Revise the two `Last updated` dates when you next edit content
- [ ] Optional: add a custom domain via `Settings → Pages → Custom domain` plus a `CNAME` file
