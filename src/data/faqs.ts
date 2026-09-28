export type QA = { q: string; a: string }

/**
 * The questions people ask before they email. One list, used by the FAQ
 * accordion on the Contact view (and the legacy long-scroll FAQ section).
 * Five questions, two or three sentences each: the accordion sits in a
 * fixed panel and more than that pushes the email row off the plate.
 */
export const FAQS: QA[] = [
  {
    q: 'What do you do?',
    a: 'I build and fix Notion systems for small businesses: client hubs, CRMs, finance trackers, SOP libraries and team onboarding. I also do executive support: inbox, calendar and documentation.',
  },
  {
    q: 'Can I see your work first?',
    a: 'Yes. Nine Notion systems and one tested automation are live on the Projects page and open without a login. They run on invented businesses and invented data, so click anything you like.',
  },
  {
    q: 'How do you price?',
    a: 'Hourly, or a fixed price for a defined build. For a fixed price, we agree in writing on the scope, the number of revision rounds and how much data moves over before I start.',
  },
  {
    q: 'When can you start, and what hours?',
    a: 'Now. I am in the Philippines (GMT+8) and flexible to Australian, UK or US business hours. The first week is usually an audit: I map what you have before changing anything.',
  },
  {
    q: 'What happens after I write?',
    a: 'I reply with a few questions about your current setup. If it looks like a fit, we book a 30-minute call and look at it together.',
  },
]
