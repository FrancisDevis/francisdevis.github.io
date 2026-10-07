import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, CalendarBlank } from '@/components/slab'
import { BOOKING_URL } from '@/data/profile'
import ZoomFigure from '@/components/ZoomFigure'

/**
 * The retreat itinerary and run of show case study (sample build, 7 Oct 2026).
 * Same layout as ExecutiveCalendarCase.tsx; every figure opens full size.
 *
 * Section text is copied WORD FOR WORD from the sheet's "Start here" tab
 * (read 7 Oct 2026). Change the sheet first, then this file.
 * A demonstration build for a fictional client: say so, never imply a client.
 * Images in public/case/retreat-planner/ are his screenshots of real runs.
 */

const SHEET_URL =
  'https://docs.google.com/spreadsheets/d/1RvcUb0I1i_2XYk8BMYLXMEWPX6PkEvrU80x4d558kX0/edit?usp=sharing'
const IMG = '/case/retreat-planner/'

const STATS = [
  { value: '6 → 0', label: 'problems found a week out, before and after' },
  { value: '$670 → $200', label: 'over budget before, under budget after' },
  { value: '8', label: 'guests flying in from 4 cities' },
  { value: '7', label: 'vendor bookings, each with quote and deposit' },
  { value: '17', label: 'run-of-show items, one owner each' },
]

const FACTS = [
  { k: 'Client', v: 'Halden Ridge Holdings (fictional)' },
  { k: 'Type', v: 'Demonstration build, real runs' },
  { k: 'Year', v: '2026' },
  { k: 'Timeline', v: 'Built October 2026' },
]
const SERVICES = ['Travel coordination', 'Event planning', 'Failure documentation']
const TOOLS = ['Google Sheets', 'Apps Script (one-time setup)']

const SECTIONS = [
  { id: 'cs-does', n: '01', t: 'What this system does' },
  { id: 'cs-why', n: '02', t: 'Why this setup works' },
  { id: 'cs-outcome', n: '03', t: 'Outcome' },
  { id: 'cs-run', n: '04', t: 'How to run this system' },
  { id: 'cs-breaks', n: '05', t: 'Break modes' },
]

const WHY = [
  'Flight time is computed from the times typed in, so a landing time typed in the wrong time zone shows up at once.',
  "Pickups, check-in dates and the chef's dietary list are checked against each guest's landing, not against memory.",
  'Every vendor is checked against a review date: anything still unconfirmed in the last 7 days is flagged.',
  'The budget total is computed from the vendor quotes. Nobody types it.',
  'No passport numbers or card details are stored here. Those stay with the airline and the payment provider.',
]

const RUN = [
  "Travellers: add each guest once the flight is booked. Departure and landing in local time, the origin's UTC offset, and the airline's scheduled flight time.",
  'Book the pickup at least 45 minutes after landing. Set the check-in date to the landing date.',
  'Type any dietary need, send it to the chef, then tick Sent to chef.',
  'Vendors & budget: add every vendor with quote, deposit, due date and Confirmed.',
  'Run of show: one row per item, with an owner and a vendor named.',
  'Seven days before the event, set the review date on Check. Fix every FIX line until Problems found reads 0.',
  'Send the executive the link. Nothing goes to guests until Check reads 0.',
]

const BREAKS = [
  {
    t: "Landing time typed in the departure city's time.",
    g: 'computed flight time vs scheduled flight time, flagged when they differ by more than 30 minutes.',
  },
  { t: 'Pickup booked before the guest lands.', g: 'pickup must be 45 minutes or more after landing.' },
  { t: 'Room booked from the wrong night.', g: 'check-in date must equal the landing date.' },
  { t: 'Dietary need on the guest list but never sent to the chef.', g: 'the Sent to chef tick, flagged while empty.' },
  { t: 'Vendor still unconfirmed in the last 7 days.', g: 'Days to service counted from the review date.' },
  { t: 'Spend creeping over budget one quote at a time.', g: 'Check totals every quote against the budget.' },
]

export default function RetreatPlannerCase() {
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
          Eight guests, four cities, six problems caught a week out.
        </h1>
        <p className="pgrid__lede">
          Sample build by Francis Devis. Fictional client, illustrative prices in USD. Bali, Thu 12 to Sun 15 Nov 2026, 8
          guests flying in from 4 cities.
        </p>
      </header>

      {/* data-lenis-prevent: this box scrolls by itself (same as Projects). */}
      <div className="home__glass pgrid__glass pgrid__glass--scroll cs__box" data-lenis-prevent>
        <ul className="cs__stats cs__stats--5" role="list">
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
              Open the live sheet
              <ArrowUpRight size={13} weight="bold" aria-hidden="true" />
            </a>
          </aside>

          <article className="cs__main">
            <section id="cs-does" className="cs__sec">
              <span className="cs__n">01</span>
              <h2>What this system does</h2>
              <p>
                One sheet holds every guest&rsquo;s flight, pickup, room and dietary need, the hour-by-hour run of show,
                and every vendor with quote, deposit and confirmation. The Check tab reads all of it and lists each problem
                with what to fix, before the executive or a guest finds it.
              </p>
              <div className="cs__pair">
                <ZoomFigure
                  src={IMG + 'check-before.jpg'}
                  alt="Retreat check on Thu 5 Nov 2026: 6 problems found, four traveller fixes, one unconfirmed vendor and the budget $670 over"
                  caption="Before"
                />
                <ZoomFigure
                  src={IMG + 'check-after.jpg'}
                  alt="Retreat check after the fixes: 0 problems found and the budget $200 under"
                  caption="After"
                />
              </div>
              <p className="cs__pair-cap">Review a week out: 6 problems found, 0 left.</p>
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
                src={IMG + 'flights-before.jpg'}
                alt="Travellers tab before the fix: Tom Reyes landing at 16:45 gives 9.50 hours computed against 6.50 hours scheduled"
                caption="Tom's landing was typed in Sydney time: 9.50 h computed vs 6.50 h scheduled."
              />
              <div className="cs__pair">
                <ZoomFigure
                  src={IMG + 'ground-before.jpg'}
                  alt="Pickups, check-in dates, rooms and dietary needs before the fix, with four FIX lines"
                  caption="Before"
                />
                <ZoomFigure
                  src={IMG + 'ground-after.jpg'}
                  alt="Pickups, check-in dates, rooms and dietary needs after the fix, every guest OK"
                  caption="After"
                />
              </div>
              <p className="cs__pair-cap">Pickup, room night and chef brief checked against each landing.</p>
            </section>

            <section id="cs-outcome" className="cs__sec">
              <span className="cs__n">03</span>
              <h2>Outcome</h2>
              <p>
                The executive opens one link and sees who lands when, who collects them, what happens every hour and what
                is still open. The review a week out took the retreat from 6 problems to 0: a guest who would have landed
                with no driver, a flight landing three hours late on paper, a guest with no room on arrival night, a
                gluten-free guest the chef never heard about, an unconfirmed photographer, and a budget $670 over.
              </p>
              <div className="cs__pair">
                <ZoomFigure
                  src={IMG + 'vendors-before.jpg'}
                  alt="Vendors before: Frame & Field Photography pending 7 days out, sunset dinner at Kelapa Beach Club for $1,250"
                  caption="Before"
                />
                <ZoomFigure
                  src={IMG + 'vendors-after.jpg'}
                  alt="Vendors after: photographer confirmed, sunset dinner with the villa chef for $380"
                  caption="After"
                />
              </div>
              <p className="cs__pair-cap">Photographer confirmed; sunset dinner moved to the villa chef, saving $870.</p>
            </section>

            <section id="cs-run" className="cs__sec">
              <span className="cs__n">04</span>
              <h2>How to run this system</h2>
              <ol className="cs__list">
                {RUN.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ol>
              <ZoomFigure
                src={IMG + 'run-of-show.jpg'}
                alt="Run of show from Thu 12 to Sun 15 Nov: 17 items, each with an owner, vendor, location and notes"
                caption="Hour by hour, one owner and one vendor per item."
              />
            </section>

            <section id="cs-breaks" className="cs__sec">
              <span className="cs__n">05</span>
              <h2>Break modes and the guard on each</h2>
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
              <p className="cs__limit">
                <strong>Known limit:</strong> a guest landing after midnight needs the night before booked. The check-in
                rule assumes daytime arrivals, so check overnight flights by hand.
              </p>
              <ZoomFigure
                src={IMG + 'start-here.jpg'}
                alt="The Start here tab: what the system does, why it works, the outcome, how to run it and the break modes"
                caption="The Start here tab, written so anyone can run it."
              />
            </section>

            <div className="cs__cta">
              <p>Planning an offsite and want nothing to slip?</p>
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
