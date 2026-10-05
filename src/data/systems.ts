/**
 * The live samples: nine Notion systems and one tested automation. This is
 * the Projects page and the Home "Projects" card.
 *
 * Rules for this file:
 * - `title` is the page's LIVE title on notion.site. Never an internal name.
 * - `url` is the public enormous-woolen-5f8.notion.site link, or a path on
 *   this site starting with / (the lead catcher case study, 5 Oct),
 *   never an app.notion.com link and never with ?source=copy_link.
 * - `catches` says what the system flags. No day counts: those change every
 *   day on the live page and would stop matching what a visitor sees.
 * - Every system runs on invented data. The Projects page says so.
 */
export type NotionSystem = {
  id: string
  /** Business type, shown small above the title. */
  kind: string
  title: string
  catches: string
  url: string
  /** Card accent, matching the sample's own colour family. */
  tint: string
  /** Screenshot of the live page (light theme), in public/systems/. Captured 26 Sept 2026. */
  image?: string
  /** Carousel tag. Defaults to 'Notion system'. */
  tag?: 'Notion system' | 'Automation'
  /** Card link text. Defaults to 'Open the live system'. */
  cta?: string
}

const SITE = 'https://enormous-woolen-5f8.notion.site/'

export const systems: NotionSystem[] = [
  {
    id: '03',
    image: '/systems/03.jpg',
    kind: 'Sales pipeline',
    title: 'Qualified leads go quiet, and nobody notices until the quarter closes',
    catches: 'Flags every qualified lead nobody has contacted in a week, with the deal value at risk.',
    url: SITE + '3dd9a4e52ba3800eb584fbc483e58c89',
    tint: '#2869AA',
  },
  {
    id: '12',
    image: '/systems/12.jpg',
    kind: 'Lead capture automation',
    title: 'The form worked. It was quietly creating duplicate leads.',
    catches: 'Stops a lead who submits twice from becoming two leads, and drafts every reply for a person to send.',
    // On-site case study page (5 Oct). The Notion version is linked from it.
    url: '/projects/lead-catcher',
    tint: '#624CCC',
    tag: 'Automation',
    cta: 'Read the case study',
  },
  {
    id: '10',
    image: '/systems/10.jpg',
    kind: 'Studio finance',
    title: 'The invoice said Paid. $400 of it never arrived.',
    catches: 'Tracks $7,200 billed, $4,200 collected and $3,000 owed, client by client.',
    url: SITE + 'Larkspur-Studio-Finance-Hub-3e49a4e52ba38156846bd2f2ce1ec976',
    tint: '#BE781E',
  },
  {
    id: '04',
    image: '/systems/04.jpg',
    kind: 'Agency operations',
    title: 'Northbeam Creative Operations HQ',
    catches: 'Clients, projects, tasks, invoices and meetings on one screen, with overdue invoices and ownerless tasks flagged.',
    url: SITE + 'Northbeam-Creative-Operations-HQ-3df9a4e52ba3809da407fcdf8a9c3109',
    tint: '#475569',
  },
  {
    id: '09',
    image: '/systems/09.jpg',
    kind: 'SOPs and onboarding',
    title: 'The induction was complete. Two of its steps pointed at nothing.',
    catches: 'Catches required steps that link to no document, and SOPs overdue for review.',
    url: SITE + '3e29a4e52ba381a58053e8b8defd3bb1',
    tint: '#A8804A',
  },
  {
    id: '08',
    image: '/systems/08.jpg',
    kind: 'Request intake',
    title: 'The board looked full. Two requests had never reached a team.',
    catches: 'Shows requests sent to the wrong team, never sent to any team, or past their deadline.',
    url: SITE + '3e39a4e52ba3803cbaa1f98132f364ef',
    tint: '#0F766E',
  },
  {
    id: '11',
    image: '/systems/11.jpg',
    kind: 'Coaching practice',
    title: 'Her calendar was full. Two clients were booked past what they had paid for.',
    catches: 'Flags clients booked beyond their package, clients who still owe, and clients who have gone quiet.',
    url: SITE + '3e59a4e52ba38105b276e223f6d729a6',
    tint: '#B45309',
  },
  {
    id: '02',
    image: '/systems/02.jpg',
    kind: 'Team tasks',
    title: 'One database underneath, a separate view for every owner',
    catches: 'Each person sees their own late and blocked work. The old Today view had shown none of it.',
    url: SITE + '3d89a4e52ba3805c8874d1d8d1268be1',
    tint: '#7C5CBF',
  },
  {
    id: '01',
    image: '/systems/01.jpg',
    kind: 'Field service',
    title: 'Every job is tied to the machine it was done on',
    catches: 'Works out when each machine is next due from completed jobs only, and lists every late job.',
    url: SITE + '3d89a4e52ba380a4bb7dd7a51ffb3a55',
    tint: '#5B7F5E',
  },
  {
    id: '05',
    image: '/systems/05.jpg',
    kind: 'Content studio',
    title: 'A piece sitting with the client is not a piece in progress',
    catches: 'Separates work waiting on the client from work in progress, with approvals and a posting calendar.',
    url: SITE + '3e09a4e52ba3807daebaf9944366ff62',
    tint: '#BE4B6E',
  },
]

/** Real problems these builds were designed around. Each one is written up,
 *  with its guard, in the sample's How We Work page (the automation's is in
 *  its case study). */
export const breakPoints: string[] = [
  'A relation that only runs one way',
  'A rollup quietly reading 0',
  'A filter that widens by itself',
  'A days-late count gone negative',
  'A button that edits every page',
  'A step linking to a page in the Trash',
  'Money summed as an average',
  'Two column names swapped',
  'One lead saved twice',
]
