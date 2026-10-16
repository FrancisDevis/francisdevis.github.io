import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, CalendarBlank } from '@/components/slab'
import { BOOKING_URL } from '@/data/profile'
import ZoomFigure from '@/components/ZoomFigure'

/**
 * The sales pipeline & commission tracker case study (sample build, 17 Oct 2026).
 * Same layout as RecruitmentTrackerCase.tsx; every figure opens full size.
 *
 * Section text (01 to 05, known limits, the test) is word for word from the live sheet's
 * "Start here" tab (read 17 Oct). Change the sheet first, then this file (S13).
 * Claude's own words: the headline, the lede, the stat labels, the captions, the Book a call line.
 * A demonstration build for a fictional company: say so, never imply a client.
 * He has not worked in sales operations: never describe this as client work.
 * Every website in the sheet ends in .example (reserved); never swap in a real domain.
 */

const SHEET_URL =
  'https://docs.google.com/spreadsheets/d/1FtR2sx9XeSU39O0myqx_KlrfFrwGFdQaYnldDWVJr5U/edit?usp=sharing'
const IMG = '/case/sales-tracker/'

const STATS = [
  { value: '7 → 0', label: 'planted problems, found and fixed' },
  { value: '11', label: 'deals, each one row' },
  { value: '3', label: 'sales reps on the Team tab' },
  { value: '$6,085', label: 'weighted pipeline, each open deal × its stage probability' },
]

const FACTS = [
  { k: 'Client', v: 'Kestrel Lane Outreach (fictional)' },
  { k: 'Type', v: 'Demonstration build, tested' },
  { k: 'Review date', v: 'Fri 16 Oct 2026 (frozen)' },
  { k: 'Timeline', v: 'Built October 2026' },
]
const SERVICES = ['Sales reporting', 'Commission tracking', 'Failure documentation']
const TOOLS = ['Google Sheets', 'Apps Script (one-time setup)']

const SECTIONS = [
  { id: 'cs-does', n: '01', t: 'What this system does' },
  { id: 'cs-why', n: '02', t: 'Why this setup works' },
  { id: 'cs-outcome', n: '03', t: 'Outcome' },
  { id: 'cs-run', n: '04', t: 'How to run it' },
  { id: 'cs-breaks', n: '05', t: 'Break modes' },
]

const RUN = [
  `New sales rep: add them on the Team tab first. The check flags any deal under a name that is not there.`,
  `New deal: add a row on Deals with the company, its website, the rep, Stage = Meeting booked and the meeting date. Search the Website column first: the check flags a second row for the same company.`,
  `After every meeting: set Meeting outcome (Held or No-show) the same day, move the Stage, and write the next step with a date.`,
  `Won: set Stage = Won and the close date. Lost: set Stage = Lost and write the reason.`,
  `Commission: set Commission status to "Paid out" only after "First invoice paid" says Yes.`,
  `Every Friday: open Check. Fix each row until Problems found reads 0, then read the Dashboard.`,
]

const BREAKS = [
  { t: `A follow-up date passes and the deal goes quiet.`, g: `an open deal with no next step, no date, or an overdue date is flagged.` },
  { t: `A meeting happens and nobody logs how it went, so the rep is not paid and the deal does not move.`, g: `a past meeting with no outcome is flagged.` },
  { t: `Two reps chase the same company.`, g: `a second row with the same website is flagged against the first.` },
  { t: `A deal is marked Won with no close date, so the month's numbers are wrong.`, g: `Won with no close date is flagged.` },
  { t: `A commission is paid out before the client pays.`, g: `"Paid out" while "First invoice paid" is not Yes is flagged.` },
  { t: `A deal is lost and nobody learns why.`, g: `Lost with no reason is flagged.` },
  { t: `A rep's name is typed slightly wrong, so their deals drop out of their numbers.`, g: `a name not on the Team tab is flagged and counted on the Dashboard.` },
]

export default function SalesTrackerCase() {
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
        <span className="pgrid__eyebrow">Sample build · fictional client</span>
        <h1 className="pgrid__title" id="cs-title">
          No deal goes quiet, no commission paid before the client pays.
        </h1>
        <p className="pgrid__lede">
          Sample build by Francis Devis. Fictional company and people. A working system built to show how a three-rep
          sales team keeps its pipeline honest, with no commission paid before the client pays.
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
              Open the live sheet
              <ArrowUpRight size={13} weight="bold" aria-hidden="true" />
            </a>
          </aside>

          <article className="cs__main">
            <section id="cs-does" className="cs__sec">
              <span className="cs__n">01</span>
              <h2>What this system does</h2>
              <p>
                One tab holds every deal from booked meeting to won or lost. A dashboard turns it into the weighted
                pipeline, win rate and each rep's meetings and commission. A check lists every deal with no dated next
                step, a meeting with no outcome, a duplicate company, a win with no close date, a loss with no reason, a
                rep not on the team list, and any commission paid out before the client paid.
              </p>
              <div className="cs__pair">
                <ZoomFigure
                  src={IMG + 'check-before.jpg'}
                  alt="Pipeline check on Fri 16 Oct 2026: 7 problems found across seven deals, including a commission paid out before the client paid"
                  caption="BEFORE: the check finds 7 problems in 12 deals."
                />
                <ZoomFigure
                  src={IMG + 'check-after.jpg'}
                  alt="Pipeline check after the fixes: 0 problems found, nothing to fix"
                  caption="AFTER: every problem fixed, Problems found reads 0."
                />
              </div>
            </section>

            <section id="cs-why" className="cs__sec">
              <span className="cs__n">02</span>
              <h2>Why this setup works</h2>
              <p>
                Each deal is one row, so the pipeline, the per-rep numbers and the commission all read from the same
                place. Probability comes from the stage, commission from the rules on the Team tab, and nothing on the
                dashboard is typed. The check runs on dates, so an overdue follow-up shows up without anyone remembering
                it.
              </p>
              <ZoomFigure
                src={IMG + 'deals-before.jpg'}
                alt="Deals tab before the fixes: 12 deals, seven rows in red with the reason in the Check column"
                caption="BEFORE: each problem deal in red with the reason, including a commission paid out before the client paid."
              />
              <ZoomFigure
                src={IMG + 'deals-after.jpg'}
                alt="Deals tab after the fixes: 11 deals, every row OK"
                caption="AFTER: duplicate merged, meeting logged, close date and lost reason filled, rep name corrected, commission held back until the invoice is paid."
              />
              <ZoomFigure
                src={IMG + 'team.jpg'}
                alt="Team tab: three appointment setters and the commission rules, $50 per meeting held and 10% of the first month on a won deal"
                caption="The commission rules live in two cells on the Team tab: $50 per meeting held, 10% of the first month on a won deal."
              />
            </section>

            <section id="cs-outcome" className="cs__sec">
              <span className="cs__n">03</span>
              <h2>Outcome</h2>
              <p>
                On Monday the owner sees what the pipeline is really worth, which rep needs help, and exactly what
                commission is owed. No rep is paid for a client who has not paid, and no deal goes quiet because nobody
                set the next step.
              </p>
              <ZoomFigure
                src={IMG + 'dashboard-before.jpg'}
                alt="Sales dashboard before the fixes: one deal counted under Not on the Team tab, 7 problems open"
                caption="BEFORE: one deal sits under a misspelled rep name, so it drops out of that rep's numbers."
              />
              <ZoomFigure
                src={IMG + 'dashboard-after.jpg'}
                alt="Sales dashboard after the fixes: 7 open deals, $14,900 open pipeline, $6,085 weighted, 75% win rate, and each rep's meetings and commission"
                caption="AFTER: weighted pipeline, win rate, and each rep's meetings, commission earned and commission waiting on client payment."
              />
            </section>

            <section id="cs-run" className="cs__sec">
              <span className="cs__n">04</span>
              <h2>How to run it</h2>
              <ol className="cs__list">
                {RUN.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ol>
              <ZoomFigure
                src={IMG + 'start-here.jpg'}
                alt="Start here tab of the sheet: what it does, why it works, outcome, how to run it, the seven break modes and the test"
                caption="The Start here tab: case study, how to run it, and the seven break modes."
              />
            </section>

            <section id="cs-breaks" className="cs__sec">
              <span className="cs__n">05</span>
              <h2>How this system breaks, and the guard on each</h2>
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
                <strong>Known limits:</strong> deals are typed or pasted from the CRM, the sheet does not sync with one.
                The commission rules are an example; a real plan replaces the two numbers on the Team tab. The sheet pays
                nobody, a person does.
              </p>
              <p>
                <strong>The test.</strong> Review date frozen at Fri 16 Oct 2026. BEFORE: 7 problems planted, one of each
                break mode. AFTER the 7 fixes: 0.
              </p>
            </section>

            <div className="cs__cta">
              <p>Want every deal and every commission on one sheet you can trust?</p>
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
