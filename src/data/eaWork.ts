/**
 * Executive support: real client work for a Sydney nonprofit CEO, June to July 2026.
 *
 * Rules for this file:
 * - Real work, so every image is redacted: names, the organisation, private
 *   calendar categories, candidates. Check a new image for names and for
 *   Francis's own rate before adding it.
 * - Never quote the client and never name her or the organisation.
 * - The calendar "before" is an illustration he drew; its caption says so.
 */
export type EaWork = {
  id: string
  /** Image in public/ea/, burned-in headline included. Not used when url is set. */
  image?: string
  /** A page on this site (starts with /). Set: the card opens that page instead of the popup. */
  url?: string
  kind: string
  title: string
  caption: string
  /** Card thumbnail: a 16:9 crop of the screen itself, without the burned-in headline. */
  thumb: string
}

export const eaWork: EaWork[] = [
  {
    id: '01',
    image: '/ea/01.jpg',
    thumb: '/ea/thumb-01.jpg',
    kind: 'Inbox management',
    title: '6,081 conversations to inbox zero',
    caption:
      'Nothing deleted. 4,879 filed into five labels that sort in the order to act: urgent, follow up, waiting, completed, read later.',
  },
  {
    id: '12',
    image: '/ea/12.jpg',
    thumb: '/ea/thumb-12.jpg',
    kind: 'Email campaign',
    title: 'First email campaign: 193 sent, 97.9% delivered, 28.6% opened',
    caption: 'Built, sent, and the report read back after five days. Campaign name and audience redacted.',
  },
  {
    id: '06',
    image: '/ea/06.jpg',
    thumb: '/ea/thumb-06.jpg',
    kind: 'Calendar management',
    title: 'Every commitment on one calendar, in layers',
    caption:
      'Rest blocked overnight, a buffer before and a recap after every meeting. Left: an illustration of a typical week. Right: the live calendar, redacted.',
  },
  {
    id: '11',
    image: '/ea/11.jpg',
    thumb: '/ea/thumb-11.jpg',
    kind: 'Tool research',
    title: 'Six tools priced before anything was bought',
    caption:
      "Normal versus nonprofit pricing, how to apply, and what was urgent. 1Password's 25% discount confirmed with their support.",
  },
  {
    id: '02',
    image: '/ea/02.jpg',
    thumb: '/ea/thumb-02.jpg',
    kind: 'Task management',
    title: 'One CSV import, a board per owner',
    caption: 'Each person opens one filtered board on the same database, so nothing is updated twice.',
  },
  {
    id: '03',
    image: '/ea/03.jpg',
    thumb: '/ea/thumb-03.jpg',
    kind: 'Filing',
    title: 'Thirteen folders, one place to look',
    caption: 'Named for what someone goes looking for, so a new hire finds any file without asking.',
  },
  {
    id: '04',
    image: '/ea/04.jpg',
    thumb: '/ea/thumb-04.jpg',
    kind: 'Daily reporting',
    title: 'End of day, every day, filed by month',
    caption: 'The same three parts every time: what closed, what I corrected, and what is still open.',
  },
  {
    id: '10',
    image: '/ea/10.jpg',
    thumb: '/ea/thumb-10.jpg',
    kind: 'Hiring support',
    title: 'Hiring support, job post to shortlist',
    caption:
      'Job post written, candidates researched, interview questions for each one, and a shortlist with my recommendation. Candidate names redacted.',
  },
  {
    // SAMPLE BUILD, not client work (6 Oct 2026). Copy is his, word for word.
    id: 'expense-tracker',
    url: '/projects/expense-tracker',
    thumb: '/case/expense-tracker/thumb.jpg',
    kind: 'Sample build',
    title: 'Multi-company expense tracker (sample build)',
    caption:
      'A founder with three businesses logs every receipt in one Google Sheet, and each month is checked against the bank statement. In testing it caught a $412.30 receipt logged twice, a $54.99 charge filed under the wrong company, and a receipt with no file.',
  },
]
