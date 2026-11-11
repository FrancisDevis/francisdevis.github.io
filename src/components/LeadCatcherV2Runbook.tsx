import { Link } from 'react-router-dom'
import { ArrowLeft } from '@/components/slab'
import usePageTitle from '@/hooks/usePageTitle'

/**
 * The public runbook for the v2 website lead catcher (11 Nov 2026).
 * Same layout as the case study pages, without stats or figures.
 *
 * Every line of text is WORD FOR WORD from the Automation chat's handover (11 Nov 2026).
 * Change it there first, then here. Claude's own words: the eyebrow, the sidebar labels,
 * the back link. Linked from LeadCatcherV2Case.tsx ("That is in the runbook").
 */

const ACCESS = [
  'The owner’s Gmail: the inbox and Drafts',
  'The Google Sheet “v2 - Website leads”, tabs Leads and Error log',
  'The Make scenario “v2 - Website lead catcher” (view access is enough for the daily and weekly checks)',
]

const SECTIONS = [
  { id: 'rb-day', n: '01', t: 'Every day' },
  { id: 'rb-alert', n: '02', t: 'When a ⚠️ alert arrives' },
  { id: 'rb-cause', n: '03', t: 'Finding the cause' },
  { id: 'rb-week', n: '04', t: 'Every week' },
  { id: 'rb-rules', n: '05', t: 'Rules that keep it working' },
  { id: 'rb-test', n: '06', t: 'Testing safely' },
  { id: 'rb-not', n: '07', t: 'What this system does not catch' },
]

const ALERTS = [
  {
    t: '“⚠️ Lead catcher failed: lead NOT saved (check failed)”',
    h: 'the system could not check the lead list, so the lead was saved nowhere. This email is the only copy.',
    d: 'copy the name, email and message from the alert into a new row on Leads (Status New). Write the reply by hand. Then fix the cause (section 3).',
  },
  {
    t: '“⚠️ Lead catcher failed: a lead was NOT saved”',
    h: 'the lead could not be written to the Sheet. The alert holds the lead’s email.',
    d: 'add a row on Leads with that email (Status New), reply by hand, then fix the cause.',
  },
  {
    t: '“⚠️ Lead catcher failed: reply draft NOT created”',
    h: 'the lead IS on Leads, but Gmail could not write the draft. Most often the visitor typed a broken email address.',
    d: 'read the email address in the alert. If it is real, reply by hand. If it is broken (for example, two @ signs), set the lead’s Status to Spam or Not a fit.',
  },
  {
    t: 'No 🟢 email, but a new Error log row with Module “Alert me: new lead”',
    h: 'only the ping failed. The lead and the draft are fine.',
    d: 'go to Drafts and reply as usual.',
  },
]

const CAUSES = [
  {
    t: '“Unable to parse range: ‘...’”',
    d: 'A tab in the Sheet was renamed or deleted. The tabs must be named exactly Leads and Error log.',
  },
  {
    t: '“Validation failed for 1 parameter(s)” on the reply draft',
    d: 'The visitor’s email address is broken. Nothing to fix in Make.',
  },
  {
    t: 'Every alert and every 🟢 email stops at once',
    d: 'The Gmail connection in Make has expired. Make shows the deadline on the connection itself (currently 25 March 2027). Reconnect it a week before.',
  },
]

export default function LeadCatcherV2Runbook() {
  usePageTitle('Runbook: Website lead catcher v2 (sample) · Francis Rowenn Devis')

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
        <Link to="/projects/lead-catcher-v2" className="cs__back">
          <ArrowLeft size={14} weight="bold" aria-hidden="true" />
          Back to the case study
        </Link>
        <span className="pgrid__eyebrow">Runbook · Sample build · Make · Google Sheets · Gmail</span>
        <h1 className="pgrid__title" id="cs-title">
          How to run this system: Website lead catcher v2
        </h1>
        <p className="pgrid__lede">
          This is the runbook for the lead catcher on my contact form. Anyone who looks after the leads can follow it.
          Daily use needs no Make skills. Fixing a failure needs edit access in Make.
        </p>
      </header>

      {/* data-lenis-prevent: this box scrolls by itself (same as Projects). */}
      <div className="home__glass pgrid__glass pgrid__glass--scroll cs__box" data-lenis-prevent>
        <div className="cs__body">
          <aside className="cs__side" aria-label="What you need">
            <dl className="cs__facts">
              <div>
                <dt>You need access to</dt>
                {ACCESS.map((a) => (
                  <dd key={a}>{a}</dd>
                ))}
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
          </aside>

          <article className="cs__main">
            <section id="rb-day" className="cs__sec">
              <span className="cs__n">01</span>
              <h2>Every day (5 minutes)</h2>
              <ol className="cs__list">
                <li>Check the inbox for two kinds of email: &ldquo;🟢 New lead&rdquo; and &ldquo;⚠️ Lead catcher failed&rdquo;.</li>
                <li>
                  For each 🟢 New lead: open Drafts and find &ldquo;Thanks for reaching out, [first name]&rdquo;. Read the
                  whole draft, edit it if needed, and click Send within one business day.
                </li>
                <li>On the Leads tab, set that lead&rsquo;s Status to Replied. Use Spam or Not a fit when they apply.</li>
              </ol>
              <p className="cs__limit">
                <strong>Never send a draft you have not read. Never delete a row on Leads.</strong>
              </p>
            </section>

            <section id="rb-alert" className="cs__sec">
              <span className="cs__n">02</span>
              <h2>When a ⚠️ alert arrives</h2>
              <ul className="cs__breaks">
                {ALERTS.map((a) => (
                  <li key={a.t}>
                    <p>
                      <strong>{a.t}</strong>
                    </p>
                    <p>
                      <strong>What happened:</strong> {a.h}
                    </p>
                    <p>
                      <strong>What you do:</strong> {a.d}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="cs__limit">
                After every failure: once the cause is fixed, set that row&rsquo;s Status on the Error log tab to Fixed.
                An Open row means a failure is still unfixed.
              </p>
            </section>

            <section id="rb-cause" className="cs__sec">
              <span className="cs__n">03</span>
              <h2>Finding the cause</h2>
              <p>Read the &ldquo;Error message&rdquo; in the alert or on the Error log row.</p>
              <ul className="cs__breaks">
                {CAUSES.map((c) => (
                  <li key={c.t}>
                    <p>
                      <strong>{c.t}</strong>
                    </p>
                    <p>{c.d}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section id="rb-week" className="cs__sec">
              <span className="cs__n">04</span>
              <h2>Every week (10 minutes)</h2>
              <ol className="cs__list">
                <li>Error log tab: is any row still Open? Fix it or close it.</li>
                <li>
                  Every 🟢 New lead email from the week should have a matching row on Leads. A missing row is a failure to
                  look into. Make&rsquo;s run history can say &ldquo;Success&rdquo; on a run that lost a lead, so compare
                  the inbox with the Sheet, not with Make.
                </li>
                <li>
                  Leads tab: row 2 must be readable. If it looks empty, click a cell: if the formula bar shows text, the
                  row&rsquo;s text colour is white. Paint it from row 3 with the Paint format tool.
                </li>
                <li>Make&rsquo;s free plan gives 1,000 credits a month. A normal lead uses 5.</li>
              </ol>
            </section>

            <section id="rb-rules" className="cs__sec">
              <span className="cs__n">05</span>
              <h2>Rules that keep it working</h2>
              <ul className="cs__list">
                <li>
                  Do not rename the Sheet, its two tabs, or any column header. The system finds each column by its header
                  text.
                </li>
                <li>Type Status values exactly as the dropdown lists them: New, Replied, Spam, Not a fit.</li>
                <li>
                  To clear test rows, select the cells and press Delete. Never use &ldquo;Delete rows&rdquo;. Afterwards,
                  send one test lead and check that row 2 is readable.
                </li>
                <li>
                  Never change an email address typed into an alert without reading it letter by letter, then sending one
                  test. A wrong but real address fails silently.
                </li>
                <li>Change one thing at a time in Make, then test (section 6).</li>
              </ul>
            </section>

            <section id="rb-test" className="cs__sec">
              <span className="cs__n">06</span>
              <h2>Testing safely (after any change)</h2>
              <ol className="cs__list">
                <li>
                  Send a message through the live contact form with a made-up address ending in @example.com. Those
                  addresses never reach anyone.
                </li>
                <li>Expect: a new row on Leads, a draft in Drafts, and a 🟢 New lead email.</li>
                <li>Send the same address again. Expect nothing new: the duplicate check stops it.</li>
                <li>
                  Clean up: clear the test row&rsquo;s cells (Delete key) and delete the test draft. Never send a test
                  draft.
                </li>
              </ol>
            </section>

            <section id="rb-not" className="cs__sec">
              <span className="cs__n">07</span>
              <h2>What this system does not catch</h2>
              <ul className="cs__list">
                <li>
                  A real but wrong address typed into an alert: the email bounces quietly and Make still reports success.
                  Guard: the letter-by-letter rule in section 5.
                </li>
                <li>
                  A failed 🟢 ping sends no email, because Gmail is the thing that failed. Guard: the weekly check in
                  section 4.
                </li>
                <li>
                  A fake lead typed by a real person passes the bot check. Guard: you read every draft before sending.
                  Mark the lead Spam.
                </li>
              </ul>
            </section>
          </article>
        </div>
      </div>
    </section>
  )
}
