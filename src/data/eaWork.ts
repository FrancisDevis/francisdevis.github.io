/**
 * Executive support: real client work for a Sydney nonprofit CEO, June to July 2026.
 *
 * Rules for this file:
 * - Real work, so every image is redacted: names, the organisation, private
 *   calendar categories, candidates. Check a new image for names and for
 *   Francis's own rate before adding it.
 * - Never quote the client and never name her or the organisation.
 * - Two groups, in this order: real client work first, then sample builds
 *   (kind 'Sample build'). ProjectsGrid splits them by kind.
 */
export type EaWork = {
  id: string
  /** Image in public/ea/, burned-in headline included. Not used when url is set. */
  image?: string
  /** A page on this site (starts with /). Set: the card opens that page instead of the popup. */
  url?: string
  /** Tool chip for a sample build, shown after the kind label ("Sample build · Google Sheets"). */
  tools?: string
  kind: string
  title: string
  caption: string
  /** Card thumbnail: a 16:9 crop of the screen itself, without the burned-in headline. */
  thumb: string
}

export const eaWork: EaWork[] = [
  {
    // REAL client work, added 8 Oct 2026. Text his; title and second sentence softened 8 Oct to match his report ("may be the reason").
    id: '13',
    image: '/ea/13.jpg',
    thumb: '/ea/thumb-13.jpg',
    kind: 'Inbox recovery',
    title: 'Found what may have stalled a payment since May',
    caption:
      'While recovering files from an old mailbox, I found an internal request that was written but never sent. It may be why a project payment had been stuck since May. I also flagged a missing vendor quote and mapped duplicate folders without moving anything, so the founder could decide.',
  },
  {
    id: '01',
    // 8 Oct 2026: real screenshots, THE MAILBOX (6,081 in All Mail, taken 23 Aug) and AFTER (inbox zero), redacted by him.
    // Earlier versions kept: 01.jpg (original), 01b.jpg (rebuilt 7 Oct).
    image: '/ea/01c.jpg',
    thumb: '/ea/thumb-01c.jpg',
    kind: 'Inbox management',
    title: '6,081 conversations to inbox zero',
    caption:
      'Nothing deleted. 4,879 filed into five labels that sort in the order to act: urgent, follow up, waiting, completed, read later. The inbox was then monitored every day.',
  },
  {
    id: '06',
    // 8 Oct 2026: left the founder’s written brief, right the live calendar. Legend and headline
    // carried over from 06.jpg unchanged (layer count being confirmed). Old image kept: 06.jpg.
    image: '/ea/06b.jpg',
    thumb: '/ea/thumb-06b.jpg',
    kind: 'Calendar management',
    title: 'Every commitment on one calendar, in layers',
    caption:
      'Rest blocked overnight, buffers and recaps around meetings. Left: the founder’s written brief. Right: the calendar I built from it, private titles removed. The full system version is in the sample builds below.',
  },
  {
    id: '04',
    // 8 Oct 2026: the June folder, unblurred; organisation and founder name boxed. Old image kept: 04.jpg.
    image: '/ea/04b.jpg',
    thumb: '/ea/thumb-04b.jpg',
    kind: 'Daily reporting',
    title: 'End of day, every day, filed by month',
    caption: 'The same three parts every time: what closed, what I corrected, and what is still open.',
  },
  {
    id: '03',
    // 8 Oct 2026: the 13 folders, then inside SOPs & Processes. Old image kept: 03.jpg.
    image: '/ea/03b.jpg',
    thumb: '/ea/thumb-03b.jpg',
    kind: 'Filing',
    title: 'Thirteen folders, one place to look',
    caption: 'Named for what someone goes looking for, so a new hire finds any file without asking.',
  },
  {
    id: '10',
    // 8 Oct 2026: previews unblurred, candidate names, organisation and founder name boxed. Old image kept: 10.jpg.
    image: '/ea/10b.jpg',
    thumb: '/ea/thumb-10b.jpg',
    kind: 'Hiring support',
    title: 'Hiring support, job post to shortlist',
    caption:
      'Job post written, candidates researched, interview questions for each one, and a shortlist with my recommendation. Candidate names redacted.',
  },
  {
    // REAL client work. Image rebuilt 7 Oct 2026 as a summary of his original sheet:
    // same six tools, prices and discounts, nothing added. Original screenshot: 11.jpg.
    id: '11',
    image: '/ea/11b.jpg',
    thumb: '/ea/thumb-11b.jpg',
    kind: 'Tool research',
    title: 'Six tools priced before anything was bought',
    caption:
      "Normal versus nonprofit pricing, how to apply, and what was urgent. 1Password's 25% discount confirmed with their support. The full register version is in the sample builds below.",
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
    id: '12',
    image: '/ea/12.jpg',
    thumb: '/ea/thumb-12.jpg',
    kind: 'Email campaign',
    title: 'First email campaign: 193 sent, 97.9% delivered, 28.6% opened',
    caption: 'Built, sent, and the report read back after five days. Campaign name and audience redacted.',
  },
  {
    // SAMPLE BUILD, not client work (7 Oct 2026). Copy is his, word for word.
    id: 'executive-calendar',
    url: '/projects/executive-calendar',
    thumb: '/case/executive-calendar/thumb.jpg',
    kind: 'Sample build',
    tools: 'Google Calendar · Google Sheets · Apps Script',
    title: "A founder's week that checks itself",
    caption:
      'Grew out of the calendar I ran for a real client. A colour-coded Google Calendar for a three-company founder, plus a check that reads the live calendar against six rules. Test week: 7 broken rules found and fixed to 0.',
  },
  {
    // SAMPLE BUILD, not client work (7 Oct 2026). Copy is his, word for word.
    id: 'tool-register',
    url: '/projects/tool-register',
    thumb: '/case/tool-register/thumb.jpg',
    kind: 'Sample build',
    tools: 'Google Sheets',
    title: 'Every subscription on one sheet, every renewal decided',
    caption:
      'Grew out of the tool research I did for a real client. A software register for a three-company founder. It caught a tool paid twice, two apps doing one job and six unused seats: $220.62 a month saved.',
  },
  {
    // SAMPLE BUILD, not client work (6 Oct 2026). Copy is his, word for word.
    id: 'expense-tracker',
    url: '/projects/expense-tracker',
    thumb: '/case/expense-tracker/thumb.jpg',
    kind: 'Sample build',
    tools: 'Google Sheets',
    title: 'Multi-company expense tracker (sample build)',
    caption:
      'A founder with three businesses logs every receipt in one Google Sheet, and each month is checked against the bank statement. In testing it caught a $412.30 receipt logged twice, a $54.99 charge filed under the wrong company, and a receipt with no file.',
  },
  {
    // SAMPLE BUILD, not client work (7 Oct 2026). Title and line are his, word for word.
    id: 'retreat-planner',
    url: '/projects/retreat-planner',
    thumb: '/case/retreat-planner/thumb.jpg',
    kind: 'Sample build',
    tools: 'Google Sheets',
    title: 'Retreat Itinerary & Run of Show',
    caption:
      'A 4-day leadership retreat for 8 guests flying in from 4 cities: flights, pickups, rooms, dietary needs, an hour-by-hour run of show and a vendor budget, with a check that found 6 problems a week out and closed them to 0.',
  },
]
