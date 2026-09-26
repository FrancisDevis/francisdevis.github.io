/**
 * YOUR IDENTITY - start here.
 *
 * Everything that says who you are lives in this file: name, handle, photo,
 * socials, email and the Home headline. Edit the values below.
 *
 * Page-specific copy (projects, services, testimonials, FAQs) lives in the
 * other files in src/data/ and at the top of each view component.
 */

export type SocialLink = {
  label: string
  href: string
  iconPath: string
}

export type Stat = { value: string; label: string }

export type Profile = {
  name: string
  /** First name, used in "Hi, I'm ___." on About. */
  firstName: string
  handle: string
  /** Short role line under the handle on phones. */
  role: string
  /** Square image. An SVG, WebP or PNG with a transparent background looks best. */
  avatarSrc: string
  /** Tooltip / screen-reader label on the verified tick next to your name. */
  verifiedLabel: string
  email: string
  location: string
  /** Three short proof facts shown on phones under the Home lede. */
  stats: Stat[]
  displayName: { line1: string; line2: string }
  hero: {
    body: string
    portraitSrc: string
    portraitAlt: string
  }
  socials: SocialLink[]
}

export const profile: Profile = {
  name: 'Francis Rowenn Devis',
  firstName: 'Francis',
  handle: '@francisrowenndevis',
  role: 'Notion Operations Specialist',
  avatarSrc: '/francis-avatar.webp',
  verifiedLabel: 'Identity verified on Upwork',
  email: 'francisrowennd@gmail.com',
  location: 'Tarlac City, Philippines',
  stats: [
    { value: '9', label: 'Live Notion systems' },
    { value: '81', label: 'Client pages audited' },
    { value: 'GMT+8', label: 'Philippines' },
  ],
  // The intro types this line, then flies it into the Home headline.
  displayName: { line1: 'Built to work.', line2: 'Tested to break.' },
  hero: {
    body: 'Notion Operations Specialist and Executive VA. I build client hubs, CRMs, finance trackers and SOP libraries for small businesses, each with a guide to run it and a written list of how it breaks.',
    portraitSrc: '/francis-cutout.webp',
    portraitAlt: 'Francis Rowenn Devis',
  },
  socials: [
    { label: 'LinkedIn profile', href: 'https://www.linkedin.com/in/francisrowenndevis', iconPath: '/icons/linkedin.svg' },
    { label: 'Upwork profile', href: 'https://www.upwork.com/freelancers/~01e85dade831ed464a', iconPath: '/icons/tools/upwork.svg' },
    { label: 'Contra profile', href: 'https://contra.com/francis_rowenn_devis_1nlajugu', iconPath: '/icons/tools/contra-mask.svg' },
  ],
}

/** Booking link for the Get in touch button and the Contact page. */
export const BOOKING_URL = 'https://calendly.com/francisrowennd/30min'
