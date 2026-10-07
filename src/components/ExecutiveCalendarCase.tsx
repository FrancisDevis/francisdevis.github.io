import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, CalendarBlank } from '@/components/slab'
import { BOOKING_URL } from '@/data/profile'
import ZoomFigure from '@/components/ZoomFigure'

/**
 * The executive calendar case study (sample build, 7 Oct 2026).
 * Same layout as ExpenseTrackerCase.tsx and ToolRegisterCase.tsx; every figure
 * opens full size (ZoomFigure) because the week views are wide.
 *
 * Every word on this page is his, sent 7 Oct from the EA chat. It is a shorter
 * version of the check sheet's "Start here" tab: change the sheet and this file together.
 * A demonstration build for a fictional founder: say so, never imply a client.
 * Images in public/case/executive-calendar/ are his screenshots of real runs.
 */

const SHEET_URL =
  'https://docs.google.com/spreadsheets/d/13rS2uAT0p0Rbz_a4aeBsqxfXp3dspjfe2UU4S1gu1cM/edit?usp=sharing'
const IMG = '/case/executive-calendar/'

const STATS = [
  { value: '7 → 0', label: 'rules broken in the test week, before and after' },
  { value: '6', label: 'rules checked automatically' },
  { value: '15 min', label: 'buffer after every meeting' },
  { value: '4', label: 'maximum calls a day, never exceeded after the fix' },
]

const FACTS = [
  { k: 'Client', v: 'Dana Halden, Halden Ridge Holdings (fictional)' },
  { k: 'Type', v: 'Demonstration build, real runs' },
  { k: 'Year', v: '2026' },
  { k: 'Timeline', v: 'Built and tested 7 Oct 2026' },
]
const SERVICES = ['Calendar management', 'Scheduling rules', 'Failure documentation']
const TOOLS = ['Google Calendar', 'Google Sheets', 'Apps Script']

const SECTIONS = [
  { id: 'cs-does', n: '01', t: 'What this system does' },
  { id: 'cs-why', n: '02', t: 'Why this setup works' },
  { id: 'cs-outcome', n: '03', t: 'Outcome' },
  { id: 'cs-run', n: '04', t: 'How to run this system' },
  { id: 'cs-breaks', n: '05', t: 'Where it breaks' },
]

const WHY = [
  'The colour is the type. The check reads colours, so a glance and the rules always agree.',
  'Buffers are real events, so nobody books into them by accident.',
  'Agendas live in the invite. The founder opens the event and knows why the meeting exists.',
  'The check reads the live calendar. Nothing is typed twice.',
]

const RUN = [
  'Every new meeting: colour it by type, paste the agenda template into the description, add a 15-minute buffer after it.',
  'Thursday afternoon: set the check to next Monday and run it.',
  'Fix every row it lists: move, recolour or add the agenda in Google Calendar.',
  'Run it again until it reads "No rule broken this week".',
]

const BREAKS = [
  { t: 'Two meetings booked at the same time.', g: '"Double-booked with ...".' },
  { t: 'Back-to-back calls with no time for notes.', g: '"Less than 15 minutes after ...".' },
  { t: 'A day packed with calls.', g: '"5 calls, the maximum is 4".' },
  { t: 'A meeting slips outside hours or onto Friday.', g: '"Outside 10:00 to 16:00" and "Meeting on a Friday".' },
  { t: 'An event with no colour is invisible to the rules.', g: '"No colour, so the rules cannot see what type it is".' },
  { t: 'A meeting nobody prepared for.', g: '"No agenda".' },
]

export default function ExecutiveCalendarCase() {
  const jump = (id: string) => {
    const el = document.getElementById(id)
    const box = document.querySelector<HTMLElement>('.cs__box')
    if (!el) return
    if (box && box.scrollHeight > box.clientHeight) {
      box.scrollTo({ top: box.scrollTop + el.getBoundingClientRect().top - box.getBoundingClientRect().top - 8, behavior: 'smooth' })
    } else {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section className="pgrid cs" aria-labelledby="cs-title">
      <header className="pgrid__head">
        <Link to="/projects" className="cs__back">
          <ArrowLeft size={14} weight="bold" aria-hidden="true" />
          All projects
        </Link>
        <span className="pgrid__eyebrow">Case study · Sample build · 2026</span>
        <h1 className="pgrid__title" id="cs-title">
          One calendar, six rules, a week that checks itself.
        </h1>
        <p className="pgrid__lede">
          Demonstration build for a fictional founder. The calendar is a real Google Calendar; every result comes from
          the check reading it on 7 October 2026.
        </p>
      </header>

      {/* data-lenis-prevent: this box scrolls by itself (same as Projects). */}
      <div className="home__glass pgrid__glass pgrid__glass--scroll cs__box" data-lenis-prevent>
        <ul className="cs__stats" role="list">
          {STATS.map((s) => (
            <li key={s.label}>
              <span className="cs__stat-v">{s.value}</span>
              <span className="cs__stat-l">{s.label}</span>
            </li>
          ))}
        </ul>

        <div className="cs__body">
          <aside className="cs__side" aria-label="Project facts">
            <dl className="cs__facts">
              {FACTS.map((f) => (
                <div key={f.k}>
                  <dt>{f.k}</dt>
                  <dd>{f.v}</dd>
                </div>
              ))}
              <div>
                <dt>Services</dt>
                <dd className="cs__chips">
                  {SERVICES.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </dd>
              </div>
              <div>
                <dt>Tools</dt>
                <dd className="cs__chips">
                  {TOOLS.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </dd>
              </div>
            </dl>
            <nav className="cs__toc" aria-label="Sections">
              {SECTIONS.map((s) => (
                <button key={s.id} type="button" onClick={() => jump(s.id)}>
                  <span>{s.n}</span>
                  {s.t}
                </button>
              ))}
            </nav>
            <a className="cs__notion" href={SHEET_URL} target="_blank" rel="noopener noreferrer">
              Open the live check sheet
              <ArrowUpRight size={13} weight="bold" aria-hidden="true" />
            </a>
          </aside>

          <article className="cs__main">
            <section id="cs-does" className="cs__sec">
              <span className="cs__n">01</span>
              <h2>What this system does</h2>
              <p>
                One founder running three companies. Every commitment sits on one calendar, coloured by type, with a
                15-minute buffer after every meeting and an agenda in every invite. A check reads a week of the live
                calendar against six rules and lists anything that breaks them, with the fix.
              </p>
              <ZoomFigure
                src={IMG + 'month.jpg'}
                alt="October 2026 month view of the calendar, every event coloured by type"
                caption="The whole month, colour-coded by type."
              />
              <ZoomFigure
                src={IMG + 'event-detail.jpg'}
                alt="Event detail for Proposal call: Harbourline Gyms with a three-point agenda, attendees, prep and video link"
                caption="Every meeting carries its agenda, attendees and prep."
              />
            </section>

            <section id="cs-why" className="cs__sec">
              <span className="cs__n">02</span>
              <h2>Why this setup works</h2>
              <ul className="cs__list">
                {WHY.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
              <ZoomFigure
                src={IMG + 'start-here.jpg'}
                alt="The Start here tab: what the system does, the rules, the colour key, why it works, how to run it and where it breaks"
                caption="The rules and the colour key, written so anyone can run it."
              />
            </section>

            <section id="cs-outcome" className="cs__sec">
              <span className="cs__n">03</span>
              <h2>Outcome</h2>
              <p>
                In the test week of 19 October the check found 7 broken rules across all five days: a call after hours,
                five calls on Tuesday, a double booking, a meeting with no colour, back-to-back calls with no buffer, and
                a Friday investor call with no agenda. Five moves, one recolour and one agenda later, the check reads 0, no day has more
                than 4 calls and Friday is free of meetings.
              </p>
              <div className="cs__pair">
                <ZoomFigure
                  src={IMG + 'week-before.jpg'}
                  alt="The week of 19 October as booked, with overlapping events, a call after 4pm and a meeting on Friday"
                  caption="Before: the week as booked."
                />
                <ZoomFigure
                  src={IMG + 'week-after.jpg'}
                  alt="The same week after the fixes, with no overlaps and no meetings on Friday"
                  caption="After: five moves, one recolour, one agenda."
                />
              </div>
              <div className="cs__pair">
                <ZoomFigure
                  src={IMG + 'check-before.jpg'}
                  alt="Calendar check before: 7 rules broken, each listed with the event, the rule and how to fix it"
                  caption="Before: 7 rules broken, each with its fix."
                />
                <ZoomFigure
                  src={IMG + 'check-after.jpg'}
                  alt="Calendar check after: rules broken 0, every day green, No rule broken this week"
                  caption="After: no rule broken this week."
                />
              </div>
            </section>

            <section id="cs-run" className="cs__sec">
              <span className="cs__n">04</span>
              <h2>How to run this system</h2>
              <ol className="cs__list">
                {RUN.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ol>
            </section>

            <section id="cs-breaks" className="cs__sec">
              <span className="cs__n">05</span>
              <h2>Where it breaks, and the guard on each</h2>
              <ol className="cs__breaks">
                {BREAKS.map((b, i) => (
                  <li key={i}>
                    <p className="cs__break-t">
                      <span>{i + 1}</span>
                      {b.t}
                    </p>
                    <p className="cs__break-g">
                      <strong>Guard:</strong> {b.g}
                    </p>
                  </li>
                ))}
              </ol>
            </section>

            <div className="cs__cta">
              <p>Calendar running you instead of the other way round?</p>
              <a className="cs__book" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                <CalendarBlank size={16} weight="bold" aria-hidden="true" />
                Book a call
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
