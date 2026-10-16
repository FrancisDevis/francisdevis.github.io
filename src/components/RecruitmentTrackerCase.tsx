import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, CalendarBlank } from '@/components/slab'
import { BOOKING_URL } from '@/data/profile'
import ZoomFigure from '@/components/ZoomFigure'

/**
 * The recruitment tracker case study (sample build, 16 Oct 2026).
 * Same layout as MeetingTrackerCase.tsx; every figure opens full size.
 *
 * Section text (01 to 05, known limits, the test) is word for word from the live sheet's
 * "Start here" tab (v2, read 16 Oct). Change the sheet first, then this file (S13).
 * Claude's own words: the headline, the lede, the stat labels, the captions, the Book a call line.
 * A demonstration build for a fictional company: say so, never imply a client.
 * Images in public/case/recruitment-tracker/ are his exports of the tested sheet (EA chat, v2).
 */

const SHEET_URL =
  'https://docs.google.com/spreadsheets/d/1DayCoepSOOMWfD9_KwENeF6KfiXXlkaFwVh1lt9QLfw/edit?usp=sharing'
const IMG = '/case/recruitment-tracker/'

const STATS = [
  { value: '7 → 0', label: 'planted problems, found and fixed' },
  { value: '11', label: 'candidates, each entered once' },
  { value: '2', label: 'roles hiring at the same time' },
  { value: '6', label: 'interviews, 5 scored and 1 upcoming' },
]

const FACTS = [
  { k: 'Client', v: 'Marlow Grove Coaching (fictional)' },
  { k: 'Type', v: 'Demonstration build, tested' },
  { k: 'Review date', v: 'Fri 16 Oct 2026 (frozen)' },
  { k: 'Timeline', v: 'Built October 2026' },
]
const SERVICES = ['Recruitment tracking', 'Hiring support', 'Failure documentation']
const TOOLS = ['Google Sheets', 'Apps Script (one-time setup)']

const SECTIONS = [
  { id: 'cs-does', n: '01', t: 'What this system does' },
  { id: 'cs-why', n: '02', t: 'Why this setup works' },
  { id: 'cs-outcome', n: '03', t: 'Outcome' },
  { id: 'cs-run', n: '04', t: 'How to run it' },
  { id: 'cs-breaks', n: '05', t: 'Break modes' },
]

const RUN = [
  `New role: add a row on Roles with an ID (R-03), a target hire date and status Open.`,
  `New applicant: add a row on Candidates, pick the Role ID, the source and Stage = Applied. Search the Email column first: the check flags a second row with the same email.`,
  `Every stage change: update Stage, set "In this stage since" to today and write the next step with a date.`,
  `Test task: fill "Test task sent" and "Test task due" together.`,
  `Interview: add a row on Interviews. Fill the score and tick "Score card done" the same day.`,
  `Offer: tick "References checked" BEFORE moving anyone to Offer. Rejection: send it, then tick "Rejection sent".`,
  `Every Friday: open Check. Fix each row until Problems found reads 0, then send the Weekly report tab to the founder.`,
]

const BREAKS = [
  { t: `A candidate sits in a stage for a week and nobody moves them.`, g: `7+ days with no next step is flagged, and so is any next step without a date.` },
  { t: `An interview happens and the notes live only in someone's head.`, g: `a past interview with no score card is flagged.` },
  { t: `A test task goes out with no deadline, so it never comes back.`, g: `"Test sent" without "Test due" is flagged.` },
  { t: `The same person applies twice from two job boards.`, g: `a repeated email is flagged against the first row.` },
  { t: `An offer goes out before references are checked.`, g: `Stage = Offer without "References checked = Yes" is flagged.` },
  { t: `A rejected applicant never hears back.`, g: `Stage = Rejected without "Rejection sent = Yes" is flagged.` },
  { t: `A role drifts past its target date and nobody notices.`, g: `an Open role past its target hire date is flagged; a new date needs a written reason.` },
]

export default function RecruitmentTrackerCase() {
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
          No candidate left waiting, no offer before references.
        </h1>
        <p className="pgrid__lede">
          Sample build by Francis Devis. Fictional company and people. A working system built to show how a two-role
          hiring round stays moving, with nothing sent before it is checked.
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
                One sheet holds every role, every candidate and every interview. A check reads all three and lists, in one
                place, the candidates stuck without a next step, interviews with no score card, test tasks with no due
                date, duplicate applicants, offers sent before references, rejections never sent, and roles past their
                target hire date.
              </p>
              <div className="cs__pair">
                <ZoomFigure
                  src={IMG + 'check-before.jpg'}
                  alt="Hiring check on Fri 16 Oct 2026: 7 problems found, five candidates, one interview and one role to fix"
                  caption="BEFORE: the check finds 7 problems across candidates, interviews and roles."
                />
                <ZoomFigure
                  src={IMG + 'check-after.jpg'}
                  alt="Hiring check after the fixes: 0 problems found, nothing to fix in candidates, interviews or roles"
                  caption="AFTER: every problem fixed, Problems found reads 0."
                />
              </div>
            </section>

            <section id="cs-why" className="cs__sec">
              <span className="cs__n">02</span>
              <h2>Why this setup works</h2>
              <p>
                Each candidate is entered once and linked to a role by its ID, so the role name, the pipeline counts and
                the weekly report all read from the same row. Every number is a formula, nothing is typed. The check runs
                on dates, so nothing has to be remembered: a candidate who sits still for 7 days shows up on their own.
              </p>
              <ZoomFigure
                src={IMG + 'candidates-before.jpg'}
                alt="Candidates tab before the fixes: 12 rows, five in red with the reason in the Check column"
                caption="BEFORE: the candidate pipeline, each problem row in red with the reason."
              />
              <ZoomFigure
                src={IMG + 'candidates-after.jpg'}
                alt="Candidates tab after the fixes: 11 rows, every one OK, every next step with a date"
                caption="AFTER: duplicate merged, references checked, rejection sent, test due date set, every next step dated."
              />
            </section>

            <section id="cs-outcome" className="cs__sec">
              <span className="cs__n">03</span>
              <h2>Outcome</h2>
              <p>
                On Monday the founder opens one tab and sees how many people are in each stage, what happens this week and
                what needs her decision. Nobody waits in silence, nobody is offered a job before their references are
                checked, and every rejected applicant hears back.
              </p>
              <ZoomFigure
                src={IMG + 'report-after.jpg'}
                alt="Weekly hiring report for the week ending Fri 16 Oct 2026: pipeline by stage for both roles, days to target hire 14 and 7, and nine dated next steps"
                caption="The weekly report: pipeline by stage, days to target hire, and what happens in the next 7 days."
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
                <strong>Known limits:</strong> the sheet does not send emails or messages, a person does. Duplicates are
                found by email only (a new email for the same person is not caught). Final hiring and pay decisions stay
                with the founder.
              </p>
              <p>
                <strong>The test.</strong> Review date frozen at Fri 16 Oct 2026. BEFORE: 7 problems planted, one of each
                break mode. AFTER the 7 fixes: 0.
              </p>
              <ZoomFigure
                src={IMG + 'interviews-before.jpg'}
                alt="Interviews tab before: I-03 for Rico Bautista held on Wed 14 Oct with no score card, flagged in red; I-06 upcoming"
                caption="Before"
              />
              <ZoomFigure
                src={IMG + 'interviews-after.jpg'}
                alt="Interviews tab after: I-03 scored 3 with the score card done; I-06 still upcoming"
                caption="After"
              />
              <p className="cs__pair-cap">An interview with no score card is flagged; an upcoming one is not.</p>
              <ZoomFigure
                src={IMG + 'roles-before.jpg'}
                alt="Roles tab before: R-02 Social Media Manager open past its target hire date of Fri 9 Oct 2026"
                caption="Before"
              />
              <ZoomFigure
                src={IMG + 'roles-after.jpg'}
                alt="Roles tab after: R-02 target hire date Fri 23 Oct 2026 with the reason written next to it"
                caption="After"
              />
              <p className="cs__pair-cap">A role past its target date is flagged; the new date carries a written reason.</p>
            </section>

            <div className="cs__cta">
              <p>Want every candidate tracked from application to offer?</p>
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
