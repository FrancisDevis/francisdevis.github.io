import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, CalendarBlank } from '@/components/slab'
import { BOOKING_URL } from '@/data/profile'
import ZoomFigure from '@/components/ZoomFigure'
import usePageTitle from '@/hooks/usePageTitle'

/**
 * The executive travel booking check case study (sample build, 3 Nov 2026).
 * Same layout as RetreatPlannerCase.tsx; every figure opens full size.
 *
 * Section text, How to run, break modes, the test and the known limits are copied
 * WORD FOR WORD from the sheet's "Start here" tab (read 3 Nov 2026, break mode 6 included).
 * Change the sheet first, then this file.
 * A demonstration build for a fictional client with REAL prices as seen on 3 Nov 2026:
 * say so, never imply a client, never imply anything was booked or paid.
 * Headline, stat labels, captions and the Book a call line come from the EA chat's brief.
 */

const SHEET_URL =
  'https://docs.google.com/spreadsheets/d/1hJo34-yNFYZ55DcXcktXdwoTheynHu8UL8Nm8bzpGGY/edit?usp=sharing'
const IMG = '/case/travel-booking/'

const STATS = [
  { value: '5 → 0', label: 'booking problems, before and after' },
  { value: '4', label: 'real flights checked, 1 meets the brief' },
  { value: '4', label: 'real hotels checked, 1 meets the brief' },
  { value: 'A$7,738', label: 'trip total for the options that pass' },
  { value: '6', label: 'break modes, each with a guard' },
]

const FACTS = [
  { k: 'Client', v: 'Halden Ridge Holdings (fictional)' },
  { k: 'Type', v: 'Demonstration build, real prices' },
  { k: 'Review date', v: 'Tue 3 Nov 2026 (frozen)' },
  { k: 'Year', v: '2026' },
  { k: 'Timeline', v: 'Built November 2026' },
]
const SERVICES = ['Travel coordination', 'Approvals', 'Failure documentation']
const TOOLS = ['Google Sheets', 'Apps Script (one-time setup)']

const SECTIONS = [
  { id: 'cs-does', n: '01', t: 'What this system does' },
  { id: 'cs-why', n: '02', t: 'Why this setup works' },
  { id: 'cs-outcome', n: '03', t: 'Outcome' },
  { id: 'cs-run', n: '04', t: 'How to run this system' },
  { id: 'cs-breaks', n: '05', t: 'Break modes' },
]

const RUN = [
  'Update Brief for the new trip (dates, rules, review date).',
  'Paste 3 to 4 real flight options into Flights and 3 to 4 hotels into Hotels, prices as seen that day.',
  'Read the Result columns. Recommend only a “✓ Meets brief” option.',
  'Log it on Recommend & book: date sent for approval, then approved, booked, confirmation number.',
  'After booking: add the calendar invite and file the receipt, then mark both Yes.',
  'Open Check. Fix every line until Problems found reads 0.',
]

const BREAKS = [
  { t: 'Recommending an option that fails the brief.', g: 'Check: “Recommended option fails the brief”.' },
  { t: 'Waiting on approval while the fare is not held.', g: 'Check: “Waiting on approval n days, price not held”.' },
  { t: 'Name on the booking does not match the passport.', g: 'Check compares it to Brief.' },
  { t: 'Hotel booked from the wrong night, or a flight on the wrong day.', g: 'Check compares the date to the trip.' },
  { t: 'Booked, but no calendar invite or no receipt filed.', g: 'Check flags both.' },
  { t: 'A broken formula reads as “All clear”.', g: 'Check shows “Formula error” instead of a clean result.' },
]

export default function TravelBookingCase() {
  usePageTitle('Travel booking check (sample) · Francis Rowenn Devis')

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
          Four real flights, four real hotels, one trip that meets every rule.
        </h1>
        <p className="pgrid__lede">
          Sample build by Francis Devis. Fictional client, real prices as seen on 3 Nov 2026. Nothing was booked or paid.
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
                Turns a CEO&rsquo;s travel rules into a check. Every flight and hotel option is tested against her brief
                before anything goes for approval, and a booking log catches what goes wrong after the click.
              </p>
              <div className="cs__pair">
                <ZoomFigure
                  src={IMG + 'check-before.jpg'}
                  alt="Check on Tue 3 Nov 2026 (frozen): 5 problems found, three on the flight and two on the hotel, each with what to fix"
                  caption="Check before: 5 problems found, each with the fix"
                />
                <ZoomFigure
                  src={IMG + 'check-after.jpg'}
                  alt="Check after the fixes: 0 problems found, all clear"
                  caption="Check after: 0, all clear"
                />
              </div>
            </section>

            <section id="cs-why" className="cs__sec">
              <span className="cs__n">02</span>
              <h2>Why this setup works</h2>
              <p>
                The rules live in one place (Brief), so every option is judged the same way. The cheapest flight here
                fails (a stop in Manila, lands 11:45 PM) and the on-time Qantas flight is A$1,735 over the cap. Only one
                flight and one hotel pass every rule, and the sheet says why the others fail.
              </p>
              <ZoomFigure
                src={IMG + 'flights.jpg'}
                alt="Flights tab: Singapore Airlines, British Airways, Philippine Airlines and Qantas, Sydney to Singapore, checked for direct, landing before 6 PM and the A$7,000 fare cap"
                caption="Four real flights, only one meets the brief"
              />
              <ZoomFigure
                src={IMG + 'hotels.jpg'}
                alt="Hotels tab: QT Singapore, Dao by Dorsett, Pan Pacific and Wanderlust, checked for area, A$400 nightly cap, 8.5 rating and free cancellation"
                caption="Four real hotels, only one meets the brief"
              />
            </section>

            <section id="cs-outcome" className="cs__sec">
              <span className="cs__n">03</span>
              <h2>Outcome</h2>
              <p>
                Dana gets one recommendation per item that already meets her rules, with the reason, and a log that shows
                what is approved, booked, in her calendar and filed. Singapore Airlines (lands 5:35 PM, A$6,573) and QT
                Singapore (A$388 a night, free cancellation, 9.0). Trip total A$7,738.
              </p>
              <ZoomFigure
                src={IMG + 'book-before.jpg'}
                alt="Recommend & book before: British Airways recommended though it fails the brief, Dana Haldon on the ticket, no calendar invite, hotel waiting on approval and checking in 8 Dec"
                caption="Recommend & book before: wrong flight recommended, name typo, wrong check-in night"
              />
              <ZoomFigure
                src={IMG + 'book-after.jpg'}
                alt="Recommend & book after: Singapore Airlines and QT Singapore, both rows OK"
                caption="Recommend & book after: both rows OK"
              />
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
              <p>
                <strong>The test.</strong> Review date Tue 3 Nov 2026. BEFORE: 5 problems planted (British Airways
                recommended though it lands 9:25 PM; &ldquo;Dana Haldon&rdquo; on the ticket; no calendar invite; hotel
                approval waiting 2 days with no price held; hotel check-in on 8 Dec for a 7 Dec arrival). AFTER the 5
                fixes: 0.
              </p>
              <p className="cs__limit">
                <strong>Known limits:</strong> Prices change by the hour; re-check on the day you send the
                recommendation. The sheet books nothing and pays nothing. No passport numbers or card details are stored,
                by design. Free cancellation marked &ldquo;Not shown&rdquo; means the search page did not show it, not
                that the hotel refuses it.
              </p>
            </section>

            <div className="cs__cta">
              <p>Want every trip checked against the rules before anything is booked?</p>
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
