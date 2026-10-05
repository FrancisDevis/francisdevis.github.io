import { useState } from 'react'
import { Quotes, ArrowUpRight, Buildings, EnvelopeSimple, Stack } from '@/components/slab'
import type { Icon } from '@/components/slab'

/**
 * TestimonialsGrid - the Testimonials view as a fixed viewport.
 *
 * Left: three testimonials, word for word, one at a time with a picker: the
 * two LinkedIn recommendations, then Alon Pearl's written testimonial (sent by
 * email 28 Sept; permission for the website, his name and title, 5 Oct). Right: where the work came from.
 *
 * Rules for this page (from the evidence log):
 * - Quote word for word. Kallista: sentences 2 and 3 only (sentence 1 carries
 *   a client's branded term). Oli: the whole quote, attributed exactly.
 * - Name no client in the ledger. The consultancy work is under NDA.
 */

type Quote = {
  id: string
  index: string
  text: string
  name: string
  role: string
  /** Where the quote lives. Only LinkedIn ones get the "See it on LinkedIn" link. */
  source: 'linkedin' | 'written'
}

const LINKEDIN_RECS = 'https://www.linkedin.com/in/francisrowenndevis'

const QUOTES: Quote[] = [
  {
    id: 'kallista',
    index: '01',
    text: "He's been reliable, efficient, and easy to work with, and has taken the time to understand what I needed and turn it into practical, well-organised systems. I'd happily recommend him to anyone looking for a skilled and dependable VA, particularly for Notion and systems organisation.",
    name: 'Kallista Cox',
    role: 'Business Manager, SheBuild Consulting',
    source: 'linkedin',
  },
  {
    id: 'oli',
    index: '02',
    text: "Francis was a pleasure to work with during his time with us. He was proficient across his tasks, consistently productive, and reliable in delivering quality work on time. We'd happily recommend him to any team looking for a diligent VA team member.",
    name: 'Oli Williams',
    role: 'SheBuild Consulting | Founder & CEO of Reportable Pty Ltd',
    source: 'linkedin',
  },
  {
    id: 'alon',
    index: '03',
    // Verbatim, hyphens as he wrote them.
    text: "Francis consistently delivers outstanding value to the clients he supports. His technical ability - especially in designing clean, scalable Notion systems - paired with his proactive approach and reliability make him a tremendous asset to any team. I strongly recommend him to anyone looking for high-caliber operational and executive support.",
    name: 'Alon Pearl',
    role: 'Co-Founder & CEO, VA Masters (the agency that placed me)',
    source: 'written',
  },
]

type Client = {
  index: string
  name: string
  role: string
  daily: string
  work: string[]
  Icon: Icon
}

const CLIENTS: Client[] = [
  {
    index: '01',
    name: 'Australian consultancy',
    role: 'Notion operations, via VA Masters · Jun to Aug 2026',
    daily:
      'Built four client workspaces end to end and audited three more. Wrote and localised 18 policies and audited 81 pages before handover. Delivered five days early.',
    work: ['Notion', 'SOPs', 'Audits'],
    Icon: Buildings,
  },
  {
    index: '02',
    name: 'Nonprofit founder',
    role: 'Executive and personal assistant · to Jul 2026',
    daily:
      'Took the inbox from 6,081 conversations to zero, with 4,879 filed. Moved 557 tasks into Notion and set bookings and meeting notes to run without manual steps.',
    work: ['Inbox', 'Calendar', 'Notion'],
    Icon: EnvelopeSimple,
  },
  {
    index: '03',
    name: 'Portfolio builds',
    role: 'Nine Notion systems · Sept 2026',
    daily:
      'Nine systems built from an empty page on invented data, each with a guide to run it and its break points written down.',
    work: ['Notion', 'SOPs', 'Break points'],
    Icon: Stack,
  },
]

export default function TestimonialsGrid() {
  const [active, setActive] = useState(0)
  const q = QUOTES[active]

  return (
    <section className="pgrid tgrid" aria-labelledby="testimonials-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">Testimonials</span>
        <h1 className="pgrid__title" id="testimonials-title">
          What the people I worked with say.
        </h1>
        <p className="pgrid__lede">
          Two public LinkedIn recommendations from the consultancy team I built Notion workspaces for, and one from the CEO of the agency that placed me there.
        </p>
      </header>

      <div className="home__glass tgrid__glass">
        <div className="tgrid__reel">
          <div className="tgrid__stage">
            <figure className="tquote" key={q.id}>
              <Quotes className="tquote__mark" size={34} weight="fill" aria-hidden="true" />
              <blockquote className="tquote__text">{q.text}</blockquote>
              <figcaption className="tquote__who">
                <span className="tquote__name">{q.name}</span>
                <span className="tquote__role">{q.role}</span>
              </figcaption>
              {q.source === 'linkedin' ? (
                <a className="tquote__link" href={LINKEDIN_RECS} target="_blank" rel="noopener noreferrer">
                  See it on LinkedIn
                  <ArrowUpRight size={13} weight="bold" aria-hidden="true" />
                </a>
              ) : (
                <span className="tquote__link tquote__link--static">Written testimonial, shared with permission</span>
              )}
            </figure>
          </div>

          <div className="tgrid__picker" role="group" aria-label="Choose a testimonial">
            {QUOTES.map((c, i) => (
              <button
                key={c.id}
                type="button"
                className={`tgrid__pick${i === active ? ' is-active' : ''}`}
                onClick={() => setActive(i)}
                aria-pressed={i === active}
              >
                <span className="tgrid__pick-copy">
                  <span className="tgrid__pick-kicker">{c.name}</span>
                  <span className="tgrid__pick-meta">{c.source === 'linkedin' ? 'LinkedIn' : 'Written'}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="tgrid__ledger">
          <div className="tgrid__ledger-head">
            <h2 className="tgrid__ledger-title">Where the work comes from.</h2>
            <p className="tgrid__ledger-sub">Client names stay private. The numbers are the delivered ones.</p>
          </div>

          <ul className="tgrid__clients" role="list">
            {CLIENTS.map((c) => {
              const ClientIcon = c.Icon
              return (
                <li key={c.index} className="tgrid__client">
                  <span className="tgrid__client-ghost" aria-hidden="true">{c.index}</span>
                  <span className="tgrid__client-mark" aria-hidden="true">
                    <ClientIcon size={22} weight="duotone" />
                  </span>
                  <span className="tgrid__client-body">
                    <span className="tgrid__client-head">
                      <span className="tgrid__client-name">{c.name}</span>
                      <span className="tgrid__client-role">{c.role}</span>
                    </span>
                    <span className="tgrid__client-daily">{c.daily}</span>
                    <ul className="tgrid__client-tags" role="list">
                      {c.work.map((w, i) => (
                        <li key={`${w}-${i}`} className="tgrid__client-tag">
                          {w}
                        </li>
                      ))}
                    </ul>
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
