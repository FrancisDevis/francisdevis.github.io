// Runs after `vite build` (package.json "build").
// GitHub Pages only knows the files in dist/. Every other address answers
// HTTP 404 and falls back to 404.html, which works in a browser but not for
// link previews (LinkedIn, Slack, WhatsApp): they see the 404 and the
// homepage's social tags. This writes a real HTML file for each page listed
// below, so that address answers 200 with its own title, description and image.
//
// To add a page: add one entry to PAGES. Text must match the live page
// (its headline and lede, word for word). Image: 1200 x 627 in public/og/.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'

const SITE = 'https://francisdevis.github.io'
const DIST = join(process.cwd(), 'dist')

const PAGES = [
  {
    path: '/projects/lead-catcher-v2',
    tabTitle: 'Website lead catcher v2 (sample) · Francis Rowenn Devis',
    title: 'Make said Success. A lead was missing. The alert is how I knew. (Sample build)',
    description:
      'I broke this system on purpose to see what would happen. Make marked the run as a success. The lead was never saved. The only thing that told me was an alert email I had built for exactly that moment.',
    image: '/og/lead-catcher-v2.jpg',
    imageAlt: 'The Make scenario for the website lead catcher v2, every route in one view.',
  },
  {
    path: '/projects/lead-catcher-v3',
    tabTitle: 'AI lead sorter in n8n (sample) · Francis Rowenn Devis',
    title: 'When the AI failed, the lead was still saved. (Sample build)',
    description:
      'The whole system in n8n. The top line is a normal lead. The bottom line runs only when the AI step fails: the lead is saved anyway, and I get an alert.',
    image: '/og/lead-catcher-v3.jpg',
    imageAlt: 'The n8n workflow: the AI sorting step with Gemini, the normal road to a reply draft, and the failure road that saves the lead and sends an alert.',
  },
  {
    path: '/projects/inbox-sorter-v4',
    tabTitle: 'AI Inbox Sorter (sample) · Francis Rowenn Devis',
    title: 'AI Inbox Sorter (Sample build)',
    description:
      'Gemini sorts every email, labels it in Gmail, logs it once, and pings my phone only when a human is needed.',
    image: '/og/inbox-sorter-v4.jpg',
    imageAlt: 'The n8n workflow for the inbox sorter: AI sorting with Gemini, the Gmail label and log, the Telegram alert and its failure road.',
  },
]

// A page with child pages (/projects/x) needs a folder in dist/. On GitHub
// Pages a folder can turn /projects into a redirect to /projects/, so the
// parent gets its own copy of the app too (unchanged homepage tags).
const PARENTS = ['/projects']

const base = readFileSync(join(DIST, 'index.html'), 'utf8')
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

function swap(html, re, value, label) {
  if (!re.test(html)) throw new Error(`og-pages: ${label} not found in dist/index.html`)
  return html.replace(re, value)
}

function write(path, html) {
  // Both forms, so /x and /x/ each answer 200 (x.html and x/index.html).
  for (const file of [join(DIST, `${path}.html`), join(DIST, path, 'index.html')]) {
    mkdirSync(dirname(file), { recursive: true })
    writeFileSync(file, html)
  }
}

for (const p of PARENTS) write(p, base)

for (const p of PAGES) {
  const url = SITE + p.path
  let h = base
  h = swap(h, /<title>[^<]*<\/title>/, `<title>${esc(p.tabTitle)}</title>`, 'title')
  h = swap(h, /<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${esc(p.description)}" />`, 'description')
  h = swap(h, /<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />`, 'canonical')
  h = swap(h, /<meta property="og:type" content="[^"]*" \/>/, '<meta property="og:type" content="article" />', 'og:type')
  h = swap(h, /<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${esc(p.title)}" />`, 'og:title')
  h = swap(h, /<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${esc(p.description)}" />`, 'og:description')
  h = swap(h, /<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${url}" />`, 'og:url')
  h = swap(
    h,
    /<meta property="og:image" content="[^"]*" \/>/,
    `<meta property="og:image" content="${SITE}${p.image}" />\n    <meta property="og:image:alt" content="${esc(p.imageAlt)}" />`,
    'og:image',
  )
  write(p.path, h)
}

console.log(`og-pages: ${PAGES.length} page(s) with their own tags, ${PARENTS.length} parent copy(ies)`)
