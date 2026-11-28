import { Link } from 'react-router-dom'
import { ArrowLeft, CalendarBlank } from '@/components/slab'
import ZoomFigure from '@/components/ZoomFigure'
import usePageTitle from '@/hooks/usePageTitle'
import { BOOKING_URL } from '@/data/profile'

/**
 * The v4 Inbox Sorter case study (sample build, n8n + Gemini + Telegram, 28 Nov 2026).
 * Same layout as LeadCatcherV3Case.tsx; every figure opens full size.
 *
 * Section text, the Proof captions and the honest limits are WORD FOR WORD from the Automation
 * chat's draft (Documents/04_Upskilling/Lead Catcher Screenshot/v4/v4-case-study-and-runbook-DRAFT.md,
 * 28 Nov 2026). Change the draft there first, then this file. Claude's own words: the headline,
 * the eyebrow, the facts sidebar, the runbook link, the alt text and the Book a call line.
 * The runbook is InboxSorterV4Runbook.tsx (/projects/inbox-sorter-v4/runbook).
 */

const IMG = '/case/inbox-sorter-v4/'

const FACTS = [{ k: 'Type', v: 'Sample build, tested on emails sent to a test address' }]
const TOOLS = ['n8n', 'Gemini', 'Gmail', 'Google Sheets', 'Telegram API']

const SECTIONS = [
  { id: 'cs-does', n: '01', t: 'What This System Does' },
  { id: 'cs-why', n: '02', t: 'Why This Setup Works' },
  { id: 'cs-outcome', n: '03', t: 'Outcome' },
  { id: 'cs-proof', n: '04', t: 'Proof' },
  { id: 'cs-limits', n: '05', t: 'Honest limits' },
]

const WHY = [
  {
    t: 'Each email is handled once.',
    d: 'Before anything else, the workflow looks up the email’s Gmail ID in the log. If it is already there, the run stops. No double labels, no double rows.',
  },
  {
    t: 'When the AI is unsure, a human decides.',
    d: 'Gemini may only answer with one of the five labels, and the prompt tells it to use Needs you whenever it is not sure. If its answer matches no label, the email still gets Needs you.',
  },
  { t: 'The log is saved before the alert is sent.', d: 'A broken phone alert can never cost you the record of an email.' },
  {
    t: 'A failure is never silent.',
    d: 'n8n listed the failed Telegram run as “Succeeded”. That is why the error road writes its own row and sends its own email, so the owner hears about it either way.',
  },
  { t: 'Least access.', d: 'The Gmail connection can read and label email (gmail.modify). It cannot permanently delete anything.' },
]

const PROOF = [
  {
    f: 'canvas.jpg',
    alt: 'The n8n workflow: Gmail Trigger, Find email in log, New email only, AI sorts email with Gemini and an answer check, Label email, Save to inbox log, Needs you only, Alert me on Telegram, and from its Error exit Log failed Telegram alert and Alert me: Telegram failed',
    c: 'The workflow: Gmail in, duplicate check, Gemini sorts, label, log, Needs you alert, and the failure road. Telegram link blacked out.',
  },
  {
    f: 'gmail-labels.jpg',
    alt: 'Gmail: three test emails labelled Inbox sorter/Junk, Inbox sorter/Needs you and Inbox sorter/Invoice',
    c: 'Three test emails, each labelled by the AI in Gmail.',
  },
  {
    f: 'inbox-log.jpg',
    alt: 'The Inbox log sheet: three rows with Label Invoice, Needs you and Junk, Deadline 15 December, Friday 5 PM and none, Status New, and each Gmail ID',
    c: 'The same three emails in the log: label, deadline copied as written, Gmail ID. The promotion’s deadline reads “none”.',
  },
  {
    f: 'telegram-alert.jpg',
    alt: 'Telegram message from the bot Inbox Sorter Alerts: Needs you, the subject, the sender and the deadline',
    c: 'The Needs you alert on the phone.',
  },
  {
    f: 'error-road-run.jpg',
    alt: 'An n8n run listed as Succeeded: Alert me on Telegram took the Error exit to Log failed Telegram alert and Alert me: Telegram failed',
    c: 'Planted break: Telegram rejected the alert and the run took the Error exit.',
  },
  {
    f: 'error-log-row.jpg',
    alt: 'The Error log tab: Alert me on Telegram, Bad Request: chat not found, the Gmail ID, Status Open',
    c: 'The failure written to the Error log tab: “Bad Request: chat not found”.',
  },
  {
    f: 'alert-email.jpg',
    alt: 'Email: Inbox sorter: Telegram alert failed. The Telegram alert did not send. The email is still labelled and logged, with the subject, a blacked-out sender and the deadline',
    c: 'The alert email the owner received instead, from a second run of the same planted break, with the sender’s address (blacked out).',
  },
]

const LIMITS = [
  'Sample build, tested on emails I sent to a test address. Not running for a client.',
  'Attachments are not read. An email that only says “see attached” is judged on those words, so it usually lands in Needs you.',
  'The deadline is copied as text (“Friday 5 PM”), not turned into a calendar date.',
  'For a real client: their own labels, and Gemini’s paid tier or their own key (the free tier may use data to improve Google’s products).',
]

export default function InboxSorterV4Case() {
  usePageTitle('AI Inbox Sorter (sample) · Francis Rowenn Devis')

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
        <span className="pgrid__eyebrow">Sample build · n8n · Gemini · Gmail · Google Sheets · Telegram API</span>
        <h1 className="pgrid__title" id="cs-title">
          AI Inbox Sorter (Sample build)
        </h1>
      </header>

      {/* data-lenis-prevent: this box scrolls by itself (same as Projects). */}
      <div className="home__glass pgrid__glass pgrid__glass--scroll cs__box" data-lenis-prevent>
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
                <dt>Tools</dt>
                <dd className="cs__chips">
                  {TOOLS.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </dd>
              </div>
              <div>
                <dt>How to run it</dt>
                <dd>
                  <Link to="/projects/inbox-sorter-v4/runbook">Read the runbook</Link>
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
          </aside>

          <article className="cs__main">
            <section id="cs-does" className="cs__sec">
              <span className="cs__n">01</span>
              <h2>What This System Does</h2>
              <p>
                Every minute, n8n checks a Gmail inbox for new email. Gemini reads each one and picks one of five labels:
                Client request, Invoice, FYI, Junk or Needs you. It also copies a deadline only when the email states one.
                The email gets that label in Gmail and one row in a Google Sheet log. When the label is Needs you, the owner
                gets a Telegram message on their phone with the subject, sender and deadline.
              </p>
              <p>
                If Telegram fails, nothing is lost. The email is already labelled and logged. The failure is written to an
                Error log tab and the owner gets an alert email instead.
              </p>
            </section>

            <section id="cs-why" className="cs__sec">
              <span className="cs__n">02</span>
              <h2>Why This Setup Works</h2>
              <ul className="cs__list">
                {WHY.map((w) => (
                  <li key={w.t}>
                    <strong>{w.t}</strong> {w.d}
                  </li>
                ))}
              </ul>
            </section>

            <section id="cs-outcome" className="cs__sec">
              <span className="cs__n">03</span>
              <h2>Outcome</h2>
              <p>
                The owner stops scanning a full inbox to find the few emails that need them. Invoices, client requests, FYI
                notes and promotions are already labelled when they open Gmail. The emails that need a person reach their
                phone, with the deadline in the message. Every email has one row in a log they can sort, filter or hand to
                an assistant. And if the alert ever breaks, they get an email telling them which email was affected and
                where to look.
              </p>
            </section>

            <section id="cs-proof" className="cs__sec">
              <span className="cs__n">04</span>
              <h2>Proof</h2>
              {PROOF.map((p) => (
                <ZoomFigure key={p.f} src={IMG + p.f} alt={p.alt} caption={p.c} />
              ))}
            </section>

            <section id="cs-limits" className="cs__sec">
              <span className="cs__n">05</span>
              <h2>Honest limits</h2>
              <ul className="cs__list">
                {LIMITS.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
              <div className="cs__cta">
                <p>Want your inbox sorted like this?</p>
                <a className="cs__book" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                  <CalendarBlank size={16} weight="bold" aria-hidden="true" />
                  Book a 30-minute call
                </a>
              </div>
            </section>
          </article>
        </div>
      </div>
    </section>
  )
}
