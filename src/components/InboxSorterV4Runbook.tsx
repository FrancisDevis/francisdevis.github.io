import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { ArrowLeft } from '@/components/slab'
import usePageTitle from '@/hooks/usePageTitle'

/**
 * The public runbook for the v4 Inbox Sorter (n8n + Gemini + Telegram, 28 Nov 2026).
 * Same layout as LeadCatcherV3Runbook.tsx.
 *
 * Every line of text is WORD FOR WORD from the Automation chat's draft
 * (v4/v4-case-study-and-runbook-DRAFT.md, 28 Nov 2026). Change it there first, then here.
 * The break table is shown as one block per break (a five-row, three-column table does not fit a
 * phone); its column headers are the labels. Claude's own words: the eyebrow and the back link.
 */

const NEED = [
  'n8n with the workflow “v4 - Inbox sorter (n8n)”',
  'a Gmail credential with the gmail.modify scope only',
  'a Google Sheets credential',
  'a Gemini API key',
  'a Telegram bot and your chat ID',
  'five Gmail labels under “Inbox sorter”',
  'a sheet with two tabs, Inbox log and Error log',
]

const SECTIONS = [
  { id: 'rb-road', n: '01', t: 'The road, node by node' },
  { id: 'rb-daily', n: '02', t: 'Daily use' },
  { id: 'rb-test', n: '03', t: 'Testing a change' },
  { id: 'rb-breaks', n: '04', t: 'How it breaks' },
]

const ROAD: [string, string][] = [
  ['Gmail Trigger:', 'checks every minute for new email that matches the search filter.'],
  ['Find email in log:', 'looks up the email’s Gmail ID. Always Output Data is ON, so a new email does not stop the run.'],
  ['New email only:', 'continues only if the ID was not found.'],
  ['AI sorts email:', 'Gemini picks one of five labels and a deadline, or “none”. An output parser accepts only the five labels.'],
  ['Label email: AI’s pick:', 'adds the Gmail label. If the answer matches nothing, it uses Needs you.'],
  ['Save to inbox log:', 'one row: received time, sender, subject, label, deadline, status New, Gmail ID.'],
  ['Needs you only:', 'only Needs you emails go on to the alert.'],
  ['Alert me on Telegram:', 'sends subject, sender and deadline. Retries 3 times, 1 second apart. On failure it takes the Error exit.'],
  ['Log failed Telegram alert:', 'writes the time, the step, Telegram’s error message and the Gmail ID to Error log, status Open.'],
  ['Alert me: Telegram failed:', 'emails the owner which email was affected.'],
]

const DAILY = [
  'Open the Error log tab once a day. A row with status Open means an alert did not reach you. Read that email, then set the row to Fixed.',
  'Make sure notifications for the Telegram app are switched on. A message nobody sees is a silent failure too.',
]

const TEST = [
  'Send a new test email to the watched address.',
  'Gmail Trigger → Fetch Test Event. The subject must be the email you just sent.',
  'Execute the workflow. Then read the sheet row and the Gmail label yourself. Green ticks are not proof.',
]

const BREAKS: { b: string; d: ReactNode; saw: string; guard: ReactNode }[] = [
  {
    b: 'The alert fails silently.',
    d: 'Telegram rejects the message and n8n still lists the run as “Succeeded”.',
    saw: 'Planted break (wrong chat ID): Error log row “Bad Request: chat not found”, alert email received, no phone ping.',
    guard: 'Retry 3 times, then the Error exit: Error log row plus an alert email. The email was already logged before the alert ran.',
  },
  {
    b: 'The AI is confidently wrong.',
    d: 'A human-needed email filed as Junk, or a promotion’s “Offer ends tonight” logged as a deadline.',
    saw: 'An empty email went to Junk. A promotion was logged with the deadline “tonight”.',
    guard: 'Prompt rules: use Junk only when sure, otherwise Needs you; a Junk email’s deadline is always “none”. An output parser allows only the five labels. Fallback label is Needs you. Re-tested: Needs you, and “none”.',
  },
  {
    b: 'The same email is handled twice.',
    d: 'A second run labels and logs it again.',
    saw: 'A test run logged the same email twice.',
    guard: 'Look up the Gmail ID first and stop if it is already logged. Tested both ways: an old email stopped, a new one passed.',
  },
  {
    b: 'A test proves nothing.',
    d: 'The test email takes another road, so the planted break is never reached.',
    saw: 'A “call me back” test email was sorted as Client request and never reached the alert.',
    guard: 'Choose a test email that will take the road you are testing, and check which exit lit up before reading the results.',
  },
  {
    b: 'The sender’s address disappears from the alert email.',
    d: (
      <>
        In an HTML email, <code>&lt;address&gt;</code> is read as a tag.
      </>
    ),
    saw: 'The first alert showed only the sender’s name.',
    guard: (
      <>
        Use the address field itself (<code>from.value[0].address</code>). Re-tested: the full address shows.
      </>
    ),
  },
]

export default function InboxSorterV4Runbook() {
  usePageTitle('Runbook: AI Inbox Sorter (sample) · Francis Rowenn Devis')

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
        <Link to="/projects/inbox-sorter-v4" className="cs__back">
          <ArrowLeft size={14} weight="bold" aria-hidden="true" />
          Back to the case study
        </Link>
        <span className="pgrid__eyebrow">Runbook · Sample build · n8n · Gemini · Gmail · Google Sheets · Telegram API</span>
        <h1 className="pgrid__title" id="cs-title">
          How to run this system
        </h1>
      </header>

      {/* data-lenis-prevent: this box scrolls by itself (same as Projects). */}
      <div className="home__glass pgrid__glass pgrid__glass--scroll cs__box" data-lenis-prevent>
        <div className="cs__body">
          <aside className="cs__side" aria-label="What you need">
            <dl className="cs__facts">
              <div>
                <dt>You need</dt>
                {NEED.map((a) => (
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
            <section id="rb-road" className="cs__sec">
              <span className="cs__n">01</span>
              <h2>The road, node by node</h2>
              <ol className="cs__list">
                {ROAD.map(([n, d]) => (
                  <li key={n}>
                    <strong>{n}</strong> {d}
                  </li>
                ))}
              </ol>
            </section>

            <section id="rb-daily" className="cs__sec">
              <span className="cs__n">02</span>
              <h2>Daily use</h2>
              <ul className="cs__list">
                {DAILY.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </section>

            <section id="rb-test" className="cs__sec">
              <span className="cs__n">03</span>
              <h2>Testing a change</h2>
              <ol className="cs__list">
                {TEST.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ol>
            </section>

            <section id="rb-breaks" className="cs__sec">
              <span className="cs__n">04</span>
              <h2>How it breaks, and the guard on each (each one proven by a test)</h2>
              <div className="rb-breaks">
                {BREAKS.map((x) => (
                  <div key={x.b} className="rb-break">
                    <p>
                      <span className="rb-break__k">What breaks</span>
                      <strong>{x.b}</strong> {x.d}
                    </p>
                    <p>
                      <span className="rb-break__k">What I saw</span>
                      {x.saw}
                    </p>
                    <p>
                      <span className="rb-break__k">Guard</span>
                      {x.guard}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </article>
        </div>
      </div>
    </section>
  )
}
