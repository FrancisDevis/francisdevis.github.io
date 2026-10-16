import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, CalendarBlank } from '@/components/slab'
import { BOOKING_URL } from '@/data/profile'
import ZoomFigure from '@/components/ZoomFigure'

/**
 * The website QA audit case study (sample audit, 17 Oct 2026).
 * Same layout as SalesTrackerCase.tsx; every figure opens full size.
 *
 * A REAL business: Fullers Bookshop did not ask for this audit and has not seen it.
 * Keep that sentence word for word. Never say or imply they are a client, asked for it, or approved it.
 * No logo and no screenshots of their site beyond what is inside the sheet images.
 * Section text (01 to 05, severity, known limits) is word for word from the live sheet's
 * "Start here" tab (read 17 Oct, 30 of 30 blocks). Change the sheet first, then this file (S13).
 * Headline, stat tiles and captions from the EA chat's brief. Claude's own words: the facts,
 * the alt text and the Book a call line. No before and after: this audit changes nothing on their site.
 */

const SHEET_URL =
  'https://docs.google.com/spreadsheets/d/1qPu_3jXje7s0HyvEG9htv0DgFOGSMXQ4JjJ3EQ_hqHQ/edit?usp=sharing'
const IMG = '/case/qa-audit/'

const STATS = [
  { value: '13', label: 'findings' },
  { value: '1', label: 'to fix today' },
  { value: '13 of 13', label: 'with proof and a fix' },
  { value: '5 · 3', label: 'passes, and 3 not tested (said plainly)' },
]

const FACTS = [
  { k: 'Business', v: 'Fullers Bookshop (real; did not ask for this audit)' },
  { k: 'Type', v: 'Sample audit, read-only' },
  { k: 'Read on', v: '17 Oct 2026' },
  { k: 'Scope', v: 'Information site and online shop' },
]
const SERVICES = ['Website QA', 'Failure documentation']
const TOOLS = ['Google Sheets', 'Apps Script (one-time setup)']

const SECTIONS = [
  { id: 'cs-does', n: '01', t: 'What this audit does' },
  { id: 'cs-why', n: '02', t: 'Why this setup works' },
  { id: 'cs-outcome', n: '03', t: 'Outcome' },
  { id: 'cs-run', n: '04', t: 'How to run it' },
  { id: 'cs-breaks', n: '05', t: 'Break modes' },
]

const RUN = [
  `Open the site in a normal browser window and write down the date.`,
  `Walk the menu from left to right. On each page check links, contact details, forms (read them, never submit), wording, and whether it agrees with the other pages.`,
  `Log each issue as one row on Audit log: short issue, page, address, what you saw, why a customer cares, severity, proof, fix, effort, date.`,
  `If it might be the owner's choice, set Severity to Question and write the fix as a question.`,
  `Screenshot it at the time and name the file with the finding ID. If the problem is invisible (a hidden link, a missing heading), write what the page code shows.`,
  `Read the Check column. Every row must say ✓ OK before the audit goes anywhere.`,
  `Fill Passes & not tested: what worked, and what you could not test.`,
  `Re-check every High and Medium on the day you send the audit. Sites change.`,
  `Open the main pages on a real phone. Some problems only show there.`,
]

const BREAKS = [
  { t: `A finding with no proof.`, g: `Check shows "⚠ No proof".` },
  { t: `A finding with no fix, so the owner is left with a complaint.`, g: `Check shows "⚠ No fix".` },
  { t: `The owner's deliberate choice logged as a defect.`, g: `the Question level, counted apart from defects.` },
  {
    t: `The same issue logged twice from two pages.`,
    g: `Check shows "⚠ Logged twice" (same address, same opening words).`,
  },
  { t: `The site changes after the audit.`, g: `a Checked on date on every row, and step 8.` },
  {
    t: `The auditor overloads the site. On 17 Oct the shop's server refused requests (HTTP 429) after 51 quick link checks.`,
    g: `one page at a time, a pause between requests, stop at the first 429.`,
  },
  { t: `Claiming something was tested when it was not.`, g: `the Not tested rows on Passes & not tested.` },
]

export default function QaAuditCase() {
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
        <span className="pgrid__eyebrow">Sample audit · real public website</span>
        <h1 className="pgrid__title" id="cs-title">
          Every problem on a real website, with proof and a fix.
        </h1>
        <p className="pgrid__lede">
          SAMPLE AUDIT. Fullers Bookshop did not ask for this audit and has not seen it. Public pages only, read on 17 Oct
          2026. Nothing was submitted, bought or signed up for.
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
              <h2>What this audit does</h2>
              <p>
                A read-only check of a real independent bookshop's public website (the information site and the online
                shop), done the way an assistant checks a site before a busy season. Every finding carries the page, the
                proof, why it matters to a customer, and a fix the owner can hand straight to their web person.
              </p>
              <ZoomFigure
                src={IMG + 'summary.jpg'}
                alt="Summary tab of the sample audit: 13 findings, 1 High, 4 Medium, 6 Low, 2 Questions, 0 log problems, the fix-first list and a count by area"
                caption="SUMMARY · 13 findings sorted by severity, with the fix-first list and a count by area."
              />
              <ZoomFigure
                src={IMG + 'log-findings.jpg'}
                alt="Audit log, findings F-01 to F-13: issue, page, address, area, what was found and why it matters to a customer"
                caption="AUDIT LOG, WHAT I FOUND · Page, address, what was seen, and why it matters to a customer."
              />
            </section>

            <section id="cs-why" className="cs__sec">
              <span className="cs__n">02</span>
              <h2>Why this setup works</h2>
              <p>
                One row per issue, with a severity a busy owner can sort by. A Question level for anything that might be
                the owner's own choice, so it is asked about, not called a mistake. A Check column that will not pass a
                finding without proof and a fix, and that catches the same issue logged twice. A Passes tab that says what
                was checked and found fine, and what was not tested.
              </p>
              <p>
                <strong>Severity.</strong> High: a customer cannot finish a task. Medium: misleads customers or shuts some
                of them out. Low: polish; costs trust, not sales. Question: may be deliberate; ask before calling it a
                defect.
              </p>
              <ZoomFigure
                src={IMG + 'log-fixes.jpg'}
                alt="Audit log, fixes F-01 to F-13: severity, proof, suggested fix, effort, checked on date, status, and a Check column reading OK on every row"
                caption="AUDIT LOG, THE FIX · Severity, proof, suggested fix and effort. Every row passes the Check."
              />
            </section>

            <section id="cs-outcome" className="cs__sec">
              <span className="cs__n">03</span>
              <h2>Outcome</h2>
              <p>
                Instead of "the website feels off", the owner gets one sorted list: 1 thing to fix today (the Email Us
                link that loops back to the Contact page), 4 for this month, 6 for when there is time, and 2 questions only
                the owner can answer. The Summary tab shows the fix-first list.
              </p>
              <ZoomFigure
                src={IMG + 'passes.jpg'}
                alt="Passes and not tested tab: five checks passed (images, links, about pages, book clubs, policies) and three not tested (the rest of the link check, phone width, forms and checkout)"
                caption="PASSES & NOT TESTED · What was checked and fine, and what was not tested."
              />
            </section>

            <section id="cs-run" className="cs__sec">
              <span className="cs__n">04</span>
              <h2>How to run this audit</h2>
              <ol className="cs__list">
                {RUN.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ol>
              <ZoomFigure
                src={IMG + 'start-here.jpg'}
                alt="Start here tab of the sheet: the sample audit note, what it does, why it works, outcome, severity, how to run it, the seven break modes and known limits"
                caption="START HERE · Case study, how to run the audit, and how it breaks."
              />
            </section>

            <section id="cs-breaks" className="cs__sec">
              <span className="cs__n">05</span>
              <h2>How this audit breaks, and the guard on each</h2>
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
                <strong>Known limits:</strong> Phone width, forms, and checkout were not tested (see Passes & not tested).
                F-04 was confirmed on an iPhone on 17 Oct 2026. Findings are as read on 17 Oct 2026.
              </p>
            </section>

            <div className="cs__cta">
              <p>Want your website checked the same way, with proof and a fix for every finding?</p>
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
