import type { CSSProperties } from 'react'
import { MagnifyingGlass, Hammer, Handshake, CheckCircle } from '@/components/slab'
import type { Icon } from '@/components/slab'

/**
 * ServicesGrid - the Services view on one glass sheet.
 *
 * Two bands: the three-step method on a dark plate, then the six services
 * as cards carrying the marks of what each one is built with. Automation
 * repair was added on 28 Sept 2026, once the lead catcher case study was
 * live. Its bullets say only what that case study proves. Same object language as Home and
 * Projects: the glass, the bento card, plated marks, orange for the index
 * and the accent.
 *
 */

/* ---------- The method ---------- */

type Stage = {
  index: string
  label: string
  body: string
  Icon: Icon
  chips: string[]
}

const STAGES: Stage[] = [
  {
    index: '01',
    label: 'Audit first',
    body: 'I change nothing on day one. I map what is built, what is half built and what is missing, then you confirm the gap list.',
    Icon: MagnifyingGlass,
    chips: ['Walkthrough', 'Gap list', 'Your sign-off'],
  },
  {
    index: '02',
    label: 'Build one area end to end',
    body: 'One department or workflow at a time, finished with its guide before the next one starts.',
    Icon: Hammer,
    chips: ['Notion', 'Real property types', 'Computed totals'],
  },
  {
    index: '03',
    label: 'Hand over',
    body: 'You get the system, a guide your team can follow on day one, and the ways it can break with the check for each.',
    Icon: Handshake,
    chips: ['SOP', 'Break points', 'Walkthrough'],
  },
]

/* ---------- The services ---------- */

// Only tools used in real work. Marks live in /public/icons/tools.
const NOTION = '/icons/tools/notion.svg'
const GMAIL = '/icons/tools/gmail.svg'
const GCAL = '/icons/tools/googlecalendar.svg'
const CALENDLY = '/icons/tools/calendly.svg'
const GWS = '/icons/googleworkspace.svg'
const LOOM = '/icons/tools/loom.svg'
const FIREFLIES = '/icons/ai/fireflies.png'
const MAKE = '/icons/tools/make.svg'
const TALLY = '/icons/tools/tally.svg'

type Service = {
  index: string
  title: string
  description: string
  chip: string
  logos: string[]
  bullets: string[]
}

const SERVICES: Service[] = [
  {
    index: '01',
    title: 'Notion system builds',
    description: 'Client hubs, CRMs, finance trackers and task systems, related the right way.',
    chip: 'Notion Operations',
    logos: [NOTION],
    bullets: ['Relations you can trace both ways', 'Totals computed, never typed', 'A view for each person'],
  },
  {
    index: '02',
    title: 'SOP libraries and onboarding',
    description: 'Written procedures and induction steps a new hire can follow alone.',
    chip: 'Notion Operations',
    logos: [NOTION, LOOM],
    bullets: ['Guides written for a stranger', 'Review dates that flag themselves', 'Steps that link to real documents'],
  },
  {
    index: '03',
    title: 'Workspace audits',
    description: 'A page-by-page check of what you already have, with every finding written up.',
    chip: 'Notion Operations',
    logos: [NOTION],
    bullets: ['Dead links and empty steps', 'Numbers that do not add up', 'Nothing changed without your OK'],
  },
  {
    index: '04',
    title: 'Inbox and calendar',
    description: 'Executive support that owns the inbox and the diary, not just sorts them.',
    chip: 'Executive VA',
    logos: [GMAIL, GCAL, CALENDLY],
    bullets: ['Inbox to zero, with a label system', 'Bookings that confirm themselves', 'Meeting notes captured'],
  },
  {
    index: '05',
    title: 'Documentation and handover',
    description: 'Policies, procedures and handover notes, so the work survives a change of hands.',
    chip: 'Executive VA',
    logos: [GWS, FIREFLIES],
    bullets: ['Policies localised per country', 'Handover notes written from scratch', 'Checked before sign-off'],
  },
  {
    index: '06',
    title: 'Automation repair',
    description: 'Lead automations in Make, checked for what quietly breaks, then fixed and tested.',
    chip: 'AI Automation',
    logos: [MAKE, TALLY, NOTION, GMAIL],
    bullets: ['Duplicate leads stopped before saving', 'A person approves every email', 'Every fix tested and written down'],
  },
]

/** The tool marks, stacked horizontally on white tiles (same as Projects). */
function Marks({ logos }: { logos: string[] }) {
  return (
    <span className="bento__logos" aria-hidden="true">
      {logos.map((src) => (
        <span key={src} className="bento__logo">
          <img src={src} alt="" width={22} height={22} decoding="async" />
        </span>
      ))}
    </span>
  )
}

/* ---------- The page ---------- */

export default function ServicesGrid() {
  return (
    <section className="pgrid sgrid" aria-labelledby="services-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">Services</span>
        <h1 className="pgrid__title" id="services-title">
          Notion systems, executive support and automation repair.
        </h1>
        <p className="pgrid__lede">
          For small businesses that have outgrown spreadsheets and sticky notes, and for founders who need their inbox and calendar owned.
        </p>
      </header>

      {/* data-lenis-prevent + pgrid__glass--scroll: on a laptop the six services run past the
          bottom of the screen; the box scrolls by itself, same as Projects (S11). */}
      <div className="home__glass sgrid__glass pgrid__glass--scroll" data-lenis-prevent>
        {/* One dark plate, the headline on the left, the three stages wired
            in order on the right with a signal running them. */}
        <div className="sgrid__method" aria-labelledby="method-title">
          <div className="sgrid__method-copy">
            <span className="sgrid__method-eyebrow">How I work</span>
            <h2 className="sgrid__method-title" id="method-title">
              Audit. Build. Hand over.
              <br />
              <span>In that order, every time.</span>
            </h2>
            <p className="sgrid__method-sub">
              Building before understanding is how a workspace ends up with three copies of everything.
            </p>
          </div>

          <ol className="sgrid__stages" role="list">
            {STAGES.map((s, i) => {
              const StageIcon = s.Icon
              return (
                <li key={s.index} className="sgrid__stage" style={{ '--i': i } as CSSProperties}>
                  <span className="sgrid__stage-ghost" aria-hidden="true">{s.index}</span>
                  <span className="sgrid__stage-icon" aria-hidden="true">
                    <StageIcon size={22} weight="duotone" />
                  </span>
                  <h3 className="sgrid__stage-label">{s.label}.</h3>
                  <p className="sgrid__stage-body">{s.body}</p>
                  <ul className="sgrid__stage-chips" role="list" aria-label={`${s.label} touches`}>
                    {s.chips.map((c) => (
                      <li key={c} className="sgrid__stage-chip">{c}</li>
                    ))}
                  </ul>
                </li>
              )
            })}
          </ol>
        </div>

        {/* Six cards, each carrying the marks of what it is built with. */}
        <div className="sgrid__offers">
          <div className="sgrid__offers-head">
            <h2 className="sgrid__offers-title">What I can take off your plate.</h2>
            <p className="sgrid__offers-sub">Nine real client jobs and fourteen sample builds are on the Projects page.</p>
          </div>
          <ul className="bento sgrid__services" role="list">
            {SERVICES.map((s) => (
              <li key={s.title} className="bento__card sgrid__service">
                <span className="bento__head">
                  <span className="sgrid__service-top">
                    <Marks logos={s.logos} />
                    <span className="sgrid__service-index" aria-hidden="true">{s.index} / 06</span>
                  </span>
                  <span className="bento__title">{s.title}</span>
                  <span className="bento__desc">{s.description}</span>
                </span>
                <span className="sgrid__chip" aria-hidden="true">{s.chip}</span>
                <ul className="sgrid__bullets" role="list">
                  {s.bullets.map((b) => (
                    <li key={b} className="sgrid__bullet">
                      <CheckCircle size={15} weight="duotone" aria-hidden="true" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  )
}
