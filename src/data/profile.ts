/**
 * YOUR IDENTITY - start here.
 *
 * Everything that says who you are lives in this file: name, handle, photo,
 * socials, email and the Home headline. Edit the values below.
 *
 * Page-specific copy (projects, services, testimonials, FAQs) lives in the
 * other files in src/data/ and at the top of each view component.
 */

import { EnvelopeSimple, ListChecks, Lightning, type Icon } from '@/components/slab'

export type SocialLink = {
  label: string
  href: string
  iconPath: string
}

/** A proof fact on the phone's Home: a glyph, a short value, a caption. */
export type Stat = { value: string; label: string; Icon: Icon }

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
  role: 'Executive VA · Notion · Automation',
  avatarSrc: '/francis-avatar.webp',
  verifiedLabel: 'Identity verified on Upwork',
  email: 'francisrowennd@gmail.com',
  location: 'Tarlac City, Philippines',
  stats: [
    { value: '6,081', label: 'Conversations to inbox zero', Icon: EnvelopeSimple },
    { value: '81', label: 'Client pages audited', Icon: ListChecks },
    { value: '4', label: 'Automations tested', Icon: Lightning },
  ],
  // The intro types this line, then flies it into the Home headline.
  displayName: { line1: 'I catch what', line2: 'quietly breaks.' },
  hero: {
    body: 'Executive support, Notion systems and lead automations for small businesses. Every build ships with a guide to run it and a written list of how it breaks.',
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

/** The three lane buttons under the Home headline. Each opens Projects on its lane. */
export const LANE_LINKS = [
  { label: 'Hire an assistant', to: '/projects?lane=ea' },
  { label: 'See Notion systems', to: '/projects?lane=notion' },
  { label: 'Fix an automation', to: '/projects?lane=auto' },
] as const
