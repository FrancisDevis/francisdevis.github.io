export type FunnelTag = 'Lead Capture' | 'Booking' | 'Checkout' | 'Website' | 'Notion system' | 'Automation'

export type Funnel = {
  file: string
  label: string
  tag: FunnelTag
  desc: string
  /** Public subfolder the HTML + thumbnail live under. Default 'funnels'. */
  dir?: 'funnels' | 'samples'
  /** Direct image path; overrides the dir/thumbs convention. */
  thumb?: string
  /** Open this link in a new tab instead of the page modal. */
  href?: string
}

/**
 * Pages for the 3D carousel (FunnelBarrel). Empty until the nine Notion
 * systems are captured as images; the carousel is not shown while empty.
 */
export const gymFunnel: Funnel[] = []
export const bookingFunnel: Funnel[] = []
export const websiteFunnel: Funnel[] = []

/**
 * Tag -> color map. Brand-external colors that identify the page type, passed
 * to CSS via an inline --tag-color custom property.
 */
export const tagColors: Record<FunnelTag, string> = {
  'Lead Capture': '#8b5cf6',
  Booking: '#ec4899',
  Checkout: '#f59e0b',
  Website: '#FF7A1A',
  'Notion system': '#2869AA',
  Automation: '#624CCC',
}
