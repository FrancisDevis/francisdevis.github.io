import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, CalendarBlank } from '@/components/slab'
import { BOOKING_URL } from '@/data/profile'

/**
 * The multi-company expense tracker case study (sample build, 6 Oct 2026).
 * Same layout as the lead catcher page (LeadCatcherCase.tsx).
 *
 * Every section body is copied WORD FOR WORD from the sheet's "Start here" tab.
 * Change the sheet first, then this file. A demonstration build for a fictional
 * holding company: say so, never imply a client.
 * Images in public/case/expense-tracker/ are his screenshots of real runs.
 */

const SHEET_URL =
  'https://docs.google.com/spreadsheets/d/1s0RouHHplPjb2PzEbQ2fZme7T4AmfmTpx5eZjzrZWfU/edit?usp=sharing'
const IMG = '/case/expense-tracker/'

const STATS = [
  { value: '$412.30', label: 'receipt logged twice, caught' },
  { value: '$54.99', label: 'charge under the wrong company, caught' },
  { value: '3 of 3', label: 'companies matching their statements' },
  { value: '4 breaks', label: 'written down, each with a guard' },
]

const FACTS = [
  { k: 'Client', v: 'Halden Ridge Holdings, a fictional holding company' },
  { k: 'Type', v: 'Demonstration build, real runs' },
  { k: 'Year', v: '2026' },
  { k: 'Timeline', v: 'Built and tested 6 Oct 2026' },
]
const SERVICES = ['Expense tracking', 'Statement reconciliation', 'Failure documentation']
const TOOLS = ['Google Sheets', 'Apps Script']

const SECTIONS = [
  { id: 'cs-does', n: '01', t: 'What this system does' },
  { id: 'cs-why', n: '02', t: 'Why this setup works' },
  { id: 'cs-outcome', n: '03', t: 'Outcome' },
  { id: 'cs-run', n: '04', t: 'How to run this system' },
  { id: 'cs-breaks', n: '05', t: 'Where it breaks' },
]

const WHY = [
  'Company and category are dropdowns, so names never drift ("Halden Coffee" vs "Halden Coffee Co.").',
  'Every total is computed from the receipts, never typed.',
  'Statements compares the tracker with the real statement. A gap shows in red and must be found, never adjusted to match.',
  'The Check column catches duplicates and missing receipts the moment a row is entered.',
]

const RUN = [
  'Log each receipt on Expenses: date, company, vendor, category, amount, and the receipt file name (YYYY-MM-DD_Vendor.pdf).',
  'Clear anything the Check column marks red before month end.',
  'At month end, add one row per company on Statements: company, month (the 1st of the month), and the statement total.',
  'Every row must read ✓ Matches. A red gap means a receipt is missing, duplicated or under the wrong company. Find it. Never change the statement total to make it match.',
  'On Summary, change the month in B1 to see that month by company and category.',
]

const BREAKS = [
  {
    t: 'The same receipt logged twice.',
    g: 'Check flags any rows with the same date, company, vendor and amount.',
  },
  {
    t: 'A receipt filed under the wrong company.',
    g: 'that company shows a gap on Statements, and another company shows the same amount the other way.',
  },
  {
    t: 'A receipt saved without its file.',
    g: 'Check flags "No receipt".',
  },
  {
    t: 'A month entered as text, which happened during the build and dropped every total to $0.',
    g: 'the Month column is formatted as Date and only accepts real dates.',
  },
]

export default function ExpenseTrackerCase() {
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
          Three businesses, one sheet, every month checked against the bank.
        </h1>
        <p className="pgrid__lede">
          Demonstration build for a fictional holding company. Every number and screenshot comes from real runs of this
          sheet on 6 October 2026.
        </p>
      </header>

      {/* data-lenis-prevent: this box scrolls by itself (same as Projects). */}
      <div className="home__glass pgrid__glass pgrid__glass--scroll cs__box" data-lenis-prevent>
        <ul className="cs__stats" role="list">
          {STATS.map((s) => (
            <li key={s.value}>
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
                One founder, three businesses, one place to log every receipt. Each expense is tagged to its company and
                category, each month is checked against the bank or card statement, and the sheet flags anything that
                does not match.
              </p>
              <figure className="cs__fig">
                <img src={IMG + 'expenses.jpg'} alt="The Expenses tab: one row per receipt with date, company, vendor, category, amount, receipt file, month and a Check column reading OK" loading="lazy" />
                <figcaption>Expenses: one row per receipt, September 2026.</figcaption>
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
                <img src={IMG + 'summary.jpg'} alt="The Summary tab: September 2026 spend by category for each company, with totals and a stacked chart" loading="lazy" />
                <figcaption>Summary: September by company and category.</figcaption>
              </figure>
            </section>

            <section id="cs-outcome" className="cs__sec">
              <span className="cs__n">03</span>
              <h2>Outcome</h2>
              <p>
                At month end the founder opens one tab and sees three green &ldquo;Matches&rdquo;, or a red gap with the
                exact amount to look for. In the September test the sheet caught a $412.30 receipt logged twice, a
                $54.99 charge filed under the wrong company, and a receipt with no file. All three were found and fixed
                in one sitting.
              </p>
              <figure className="cs__fig">
                <img src={IMG + 'before.jpg'} alt="Statements before: Halden Coffee Co. minus $412.30, Ridge Property Group plus $54.99, Northfield Studio minus $54.99, each marked Gap: find it, never adjust" loading="lazy" />
                <figcaption>Before: three gaps on Statements.</figcaption>
              </figure>
              <figure className="cs__fig">
                <img src={IMG + 'after.jpg'} alt="Statements after: all three companies show a $0.00 difference and Matches" loading="lazy" />
                <figcaption>After: all three companies match their statements.</figcaption>
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
              <p>Running more than one business out of one set of receipts?</p>
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
