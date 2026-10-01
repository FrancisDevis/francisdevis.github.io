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
  /** Image in public/ea/, burned-in headline included. */
  image: string
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
      'Nothing deleted. Every message filed into five numbered labels, so the list sorts itself into the order to act on it: urgent, follow up, waiting, completed, read later.',
  },
  {
    id: '11',
    image: '/ea/11.jpg',
    thumb: '/ea/thumb-11.jpg',
    kind: 'Tool research',
    title: 'Six tools compared on normal versus charity pricing',
    caption:
      'Before anything was bought: what each tool costs, the nonprofit discount, how to apply for it, and which ones were urgent. Organisation name redacted.',
  },
  {
    id: '06',
    image: '/ea/06.jpg',
    thumb: '/ea/thumb-06.jpg',
    kind: 'Calendar management',
    title: 'Every commitment on one calendar, in layers',
    caption:
      'Rest blocked overnight, a buffer before and a recap after every meeting, and protected time nothing lands on. The left side is an illustration of a typical week; the right is the live calendar with names redacted.',
  },
  {
    id: '02',
    image: '/ea/02.jpg',
    thumb: '/ea/thumb-02.jpg',
    kind: 'Task management',
    title: 'One flat import, split into a board per owner',
    caption:
      'A CSV import where every deadline said ASAP became linked boards filtered by owner. Same database underneath, so nothing has to be updated twice.',
  },
  {
    id: '03',
    image: '/ea/03.jpg',
    thumb: '/ea/thumb-03.jpg',
    kind: 'Filing',
    title: 'Thirteen folders, one place to look',
    caption:
      'Named for what someone would go looking for, not what created them, so every new file has one obvious home and the filing survives the person who set it up.',
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
    id: '05',
    image: '/ea/05.jpg',
    thumb: '/ea/thumb-05.jpg',
    kind: 'Daily driver',
    title: 'A Today view that answers one question',
    caption: 'Priority sorted, due today, not yet done. Three filters on one database, so the list is already the day.',
  },
  {
    id: '09',
    image: '/ea/09.jpg',
    thumb: '/ea/thumb-09.jpg',
    kind: 'Calendar management',
    title: 'Eleven layers, not eleven colours',
    caption:
      'Each category is its own calendar, so one click shows the week as work only or life only without deleting anything. Private categories redacted.',
  },
  {
    id: '12',
    image: '/ea/12.jpg',
    thumb: '/ea/thumb-12.jpg',
    kind: 'Email campaign',
    title: "The organisation's first email campaign, sent and measured",
    caption:
      '193 recipients, 97.9% delivered and 28.6% opened, with the report read back after five days. Campaign name and audience redacted.',
  },
  {
    id: '10',
    image: '/ea/10.jpg',
    thumb: '/ea/thumb-10.jpg',
    kind: 'Hiring support',
    title: 'Sourced, screened and shortlisted a hire',
    caption:
      'Job post written, candidates researched, interview questions prepared for each one, and a shortlist with a recommendation. Candidate names redacted.',
  },
]
