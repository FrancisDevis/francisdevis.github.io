import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, CalendarBlank } from '@/components/slab'
import { BOOKING_URL } from '@/data/profile'

/**
 * The software and subscription register case study (sample build, 7 Oct 2026).
 * Same layout as ExpenseTrackerCase.tsx and LeadCatcherCase.tsx.
 *
 * Every word on this page is his, sent 7 Oct from the EA chat. It is a shorter
 * version of the sheet's "Start here" tab: change the sheet and this file together.
 * A demonstration build for a fictional holding company: say so, never imply a client.
 * Images in public/case/tool-register/ are his screenshots of real runs.
 */

const SHEET_URL =
  'https://docs.google.com/spreadsheets/d/1CDX6ha1HHhRbalAFvzwgN0_Ef4JyiFHFEpZRYE5TKhE/edit?usp=sharing'
const IMG = '/case/tool-register/'

const STATS = [
  { value: '$220.62', label: 'saved per month after one review' },
  { value: '9 → 0', label: 'rows needing a decision, before and after' },
  { value: '6', label: 'unused seats found' },
  { value: '0', label: 'passwords stored in the sheet' },
]

const FACTS = [
  { k: 'Client', v: 'Halden Ridge Holdings, a fictional holding company' },
  { k: 'Type', v: 'Demonstration build, real runs' },
  { k: 'Year', v: '2026' },
  { k: 'Timeline', v: 'Built and tested 7 Oct 2026' },
]
const SERVICES = ['Software audit', 'Renewal tracking', 'Failure documentation']
const TOOLS = ['Google Sheets']

const SECTIONS = [
  { id: 'cs-does', n: '01', t: 'What this system does' },
  { id: 'cs-why', n: '02', t: 'Why this setup works' },
  { id: 'cs-outcome', n: '03', t: 'Outcome' },
  { id: 'cs-run', n: '04', t: 'How to run this system' },
  { id: 'cs-breaks', n: '05', t: 'Where it breaks' },
]

const WHY = [
  'No passwords in the sheet. One column says where each login lives: the password manager or Google sign-in.',
  'Every cost is computed from price, seats and billing cycle. Nobody types a total.',
  'Company, category, status and decision are dropdowns, so names never split.',
  'Separate companies keep separate books, so Xero twice is correct. The sheet only flags a tool that is also on the shared plan.',
]

const RUN = [
  'Add each new tool as a row: company, owner, plan, billing, price per seat, seats paid and used, renewal date, where the login lives. Leave Decision blank.',
  'First working day of each month, set the review date on Summary to today.',
  'Every red row gets a decision: Keep, Cut, Remove unused seats or Review.',
  'Do it in the tool itself, then update Status and Seats paid here.',
  'Summary shows cost per company, the saving and every renewal due in 30 days.',
]

const BREAKS = [
  {
    t: 'The same tool bought twice, once on the shared plan and once by one company.',
    g: 'Check says "Already on the shared plan".',
  },
  { t: 'Two tools doing one job in one company.', g: '"Overlap with ..." until one is marked Cut.' },
  { t: 'Seats paid for people who left.', g: '"Unused seats: n".' },
  { t: 'A renewal goes through because nobody decided.', g: '"Renews in n days, no decision" from 30 days out.' },
  { t: 'A tool replaced but never cancelled.', g: '"Billed but not in use".' },
  { t: 'Passwords pasted into a shared sheet.', g: 'no password column exists.' },
]

export default function ToolRegisterCase() {
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
          Twenty subscriptions, three companies, one review that pays for itself.
        </h1>
        <p className="pgrid__lede">
          Demonstration build for a fictional holding company. Prices are illustrative; every flag and total comes from
          real runs of this sheet on 7 October 2026.
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
                One founder, three companies, 20 software subscriptions. Every tool sits on one row: who owns it, what it
                costs per month and per year, seats paid versus seats used, when it renews, and where its login lives.
                The Check column reads each row and says what needs a decision.
              </p>
              <figure className="cs__fig">
                <img src={IMG + 'before.jpg'} alt="Summary before the review: rows needing a decision 9, saving found per year $0.00, and renewals in the next 30 days with most decisions blank" loading="lazy" />
                <figcaption>Before the review: nine rows needing a decision.</figcaption>
              </figure>
            </section>

            <section id="cs-why" className="cs__sec">
              <span className="cs__n">02</span>
              <h2>Why this setup works</h2>
              <ul className="cs__list">
                {WHY.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
              <figure className="cs__fig">
                <img src={IMG + 'chart.jpg'} alt="Bar chart of monthly software cost by category, split into Shared, Halden Coffee Co., Ridge Property Group and Northfield Studio" loading="lazy" />
                <figcaption>Monthly cost by category and company.</figcaption>
              </figure>
            </section>

            <section id="cs-outcome" className="cs__sec">
              <span className="cs__n">03</span>
              <h2>Outcome</h2>
              <p>
                At each monthly review the founder sees every renewal in the next 30 days and every row that needs a call.
                In the October test the sheet flagged Zoom paid twice, Asana and monday.com doing one job, six unused
                seats, five renewals nobody had decided on and Hootsuite still billed after it was replaced. One review
                cleared all nine rows and saves $220.62 a month, $2,647.40 a year.
              </p>
              <figure className="cs__fig">
                <img src={IMG + 'after.jpg'} alt="Summary after the review: rows needing a decision 0, saving found per year $2,647.40, and renewals in the next 30 days with a decision on each" loading="lazy" />
                <figcaption>After: zero rows waiting, $2,647.40 a year saved.</figcaption>
              </figure>
              <figure className="cs__fig">
                <img src={IMG + 'register.jpg'} alt="The Register: each tool with monthly and annual cost, renewal date, where the login lives, status, decision, saving and the Check column" loading="lazy" />
                <figcaption>Every row decided.</figcaption>
              </figure>
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
              <p>Paying for software nobody has checked in months?</p>
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
