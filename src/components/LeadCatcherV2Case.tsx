import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, EnvelopeSimple } from '@/components/slab'
import ZoomFigure from '@/components/ZoomFigure'
import usePageTitle from '@/hooks/usePageTitle'

/**
 * The v2 website lead catcher case study (sample build, 11 Nov 2026).
 * Same layout as LeadCatcherCase.tsx; every figure opens full size.
 *
 * Headline, tag line, intro, section text and captions are WORD FOR WORD from the
 * Automation chat's handover (11 Nov 2026), with two caption edits it approved the same day.
 * Change the text there first, then this file. Claude's own words: the stat labels,
 * the facts sidebar, the short labels under each image in a pair, and the alt text.
 *
 * "the runbook" links to LeadCatcherV2Runbook.tsx (/projects/lead-catcher-v2/runbook, 11 Nov 2026).
 * Images in public/case/lead-catcher-v2/ were redacted before they reached this repo.
 */

const IMG = '/case/lead-catcher-v2/'

const STATS = [
  { value: '4 of 4', label: 'steps broken on purpose, each one caught' },
  { value: '13', label: 'ways it can break, each with a written guard' },
  { value: '0', label: 'replies sent to a lead without me' },
  { value: '5 credits', label: 'per normal lead, on Make’s free plan' },
]

const FACTS = [
  { k: 'Type', v: 'Sample build, real runs' },
  { k: 'Live since', v: '9 Nov 2026, on this site’s contact form' },
  { k: 'Year', v: '2026' },
]
const SERVICES = ['Lead capture', 'Bot check', 'Duplicate guard', 'Human review', 'Failure alerts']
const TOOLS = ['Make (free plan)', 'Google Sheets', 'Gmail']

const SECTIONS = [
  { id: 'cs-does', n: '01', t: 'What this system does' },
  { id: 'cs-why', n: '02', t: 'Why this setup works' },
  { id: 'cs-broke', n: '03', t: 'How it broke while I built it' },
  { id: 'cs-outcome', n: '04', t: 'Outcome: my week now' },
  { id: 'cs-try', n: '05', t: 'Try it' },
]

const STEPS = [
  { t: 'Bot check.', d: 'Real visitors never see a hidden box on the form. Bots fill it in. Anything that fills it is stopped at the door.' },
  { t: 'Duplicate check.', d: 'If the email is already in my lead list, the run stops. Nobody gets two rows or two replies.' },
  { t: 'Save.', d: 'A new lead becomes one row in a Google Sheet, with the time in Manila time and the status “New”.' },
  { t: 'Draft.', d: 'A reply is written into my Gmail Drafts. Nothing reaches the lead until I read it and click Send.' },
  { t: 'Ping.', d: 'I get a “🟢 New lead” email telling me who wrote and that the draft is waiting.' },
]

const WHY: { t: string; d: ReactNode }[] = [
  {
    t: 'Make’s history alone is not proof.',
    d: 'A step that fails and is skipped still shows “Success”. So every step that can fail has its own detour: it writes the failure to the Error log, then emails me.',
  },
  {
    t: 'When a lead is lost, the alert carries the lead.',
    d: 'If the save fails, the alert email holds the name, email and message, because at that moment it is the only copy.',
  },
  {
    t: 'A human sends every reply.',
    d: 'The system writes drafts, never emails, to leads. A wrong reply costs me a minute of editing instead of a client.',
  },
  {
    t: 'Bots cost almost nothing.',
    d: 'The bot check runs first, so spam stops before it touches the sheet.',
  },
  {
    t: 'Every guard was proven by breaking it.',
    d: 'I broke each of the four steps on purpose with a fresh test lead, then read the sheet and the inbox to confirm the detour ran. I found 13 ways this system can break, and each one has a written guard.',
  },
  {
    t: 'One thing it cannot catch:',
    d: (
      <>
        if an email address is real but wrong, Gmail sends the message anyway and Make reports success. The only guard is
        reading every typed address letter by letter. That is in <Link to="/projects/lead-catcher-v2/runbook">the runbook</Link>.
      </>
    ),
  },
]

export default function LeadCatcherV2Case() {
  usePageTitle('Website lead catcher v2 (sample) · Francis Rowenn Devis')

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
        <span className="pgrid__eyebrow">
          Sample build · Make (free plan) · Google Sheets · Gmail · Live on this site’s contact form since 9 Nov 2026
        </span>
        <h1 className="pgrid__title" id="cs-title">
          Make said Success. A lead was missing. The alert is how I knew.
        </h1>
        <p className="pgrid__lede">
          I broke this system on purpose to see what would happen. Make marked the run as a success. The lead was never
          saved. The only thing that told me was an alert email I had built for exactly that moment.
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
          </aside>

          <article className="cs__main">
            <div className="cs__pair">
              <ZoomFigure
                src={IMG + 'history-says-success.jpg'}
                alt="Make run history, 9 Nov 2026: three runs at 5:01 PM and 5:02 PM, all marked Success"
                caption="Make’s run history, 9 Nov 2026"
              />
              <ZoomFigure
                src={IMG + 'check-failed-alert.jpg'}
                alt="Alert email at 5:02 PM: Lead catcher failed, lead NOT saved (check failed), with the lead’s name, email and message"
                caption="The alert, 5:02 PM"
              />
            </div>
            <p className="cs__pair-cap">
              Left: Make&rsquo;s run history, 9 Nov 2026. All three runs say Success. The two Manual runs were my
              planted break: the lead check failed and the lead was not saved. Right: the alert that arrived at 5:02 PM
              with the lost lead&rsquo;s name, email and message.
            </p>

            <section id="cs-does" className="cs__sec">
              <span className="cs__n">01</span>
              <h2>What this system does</h2>
              <p>When someone sends a message through my contact form, five things happen in a few seconds:</p>
              <ol className="cs__list">
                {STEPS.map((s) => (
                  <li key={s.t}>
                    <strong>{s.t}</strong> {s.d}
                  </li>
                ))}
              </ol>
              <p>
                If the check, the save, the draft or the ping fails, the failure is written to an Error log tab. For the
                first three, I also get an alert email that says what broke and what to do next.
              </p>
              <ZoomFigure
                src={IMG + 'all-routes.jpg'}
                alt="The Make scenario: website contact form, Real person only, Find existing lead, New lead only, Save new lead, Draft reply to lead, Alert me: new lead, with a log, alert and skip detour off each step"
                caption="The whole system in Make. The main line runs left to right. Each detour off a step runs only when that step fails."
              />
              <div className="cs__pair">
                <ZoomFigure
                  src={IMG + 'new-lead-alert.jpg'}
                  alt="The 🟢 New lead email for a test lead: name, email, message, and Your reply draft is waiting in Drafts"
                  caption="The ping in my inbox"
                />
                <ZoomFigure
                  src={IMG + 'gmail-draft.jpg'}
                  alt="A Gmail reply draft to a test address, quoting the lead’s message and offering a 30-minute call"
                  caption="The reply draft, waiting for me"
                />
              </div>
              <p className="cs__pair-cap">
                A normal lead: the ping in my inbox, and the reply draft waiting for me to read and send (two different
                test leads).
              </p>
            </section>

            <section id="cs-why" className="cs__sec">
              <span className="cs__n">02</span>
              <h2>Why this setup works</h2>
              <ul className="cs__list">
                {WHY.map((w) => (
                  <li key={w.t}>
                    <strong>{w.t}</strong> {w.d}
                  </li>
                ))}
              </ul>
              {/* The Error log image is very wide, so it is stacked, not paired (Site SOP, wide sheet images). */}
              <ZoomFigure
                src={IMG + 'error-log-row.jpg'}
                alt="The Error log tab: five rows from 5 and 8 Nov 2026, four marked Fixed and the latest, a failed save for a test lead, marked Open"
                caption="The Error log tab"
              />
              <ZoomFigure
                src={IMG + 'alert-email.jpg'}
                alt="Alert email at 7:19 PM: Lead catcher failed, a lead was NOT saved, with the lead email, error and what to do"
                caption="The alert for a failed save"
              />
              <p className="cs__pair-cap">
                The Error log tab and the alert for a failed save. Each failure stays &ldquo;Open&rdquo; until I fix the
                cause and mark it &ldquo;Fixed&rdquo;.
              </p>
              <ZoomFigure
                src={IMG + 'alert-draft-not-created.jpg'}
                alt="Alert email: Lead catcher failed, reply draft NOT created, for a lead whose address ends in @example.com@example.com"
                caption="A lead with a broken email address. The lead was saved, the draft failed, and the alert said so."
              />
            </section>

            <section id="cs-broke" className="cs__sec">
              <span className="cs__n">03</span>
              <h2>How it broke while I built it (and the fix for each)</h2>
              <div className="cs__pair">
                <ZoomFigure
                  src={IMG + 'break-invisible-first-lead.jpg'}
                  alt="The Leads tab with row 2 looking empty"
                  caption="The first lead, invisible"
                />
                <ZoomFigure
                  src={IMG + 'break-utc-time.jpg'}
                  alt="The Leads tab: row 2 with the time as raw UTC text, row 3 as 23 Oct 2026, 6:57 PM"
                  caption="Raw UTC text, then a Manila date"
                />
              </div>
              <p className="cs__pair-cap">
                The first lead landed in the sheet in white text on a white background, so it looked empty. The time was
                also stored as raw UTC text. Fixed: row 2 is styled before the first run, and the time is written as a
                real Manila date.
              </p>
              <div className="cs__pair">
                <ZoomFigure
                  src={IMG + 'duplicate-blocked.jpg'}
                  alt="Make run: Real person only passed 1, New lead only passed 0, so Add a Row did not run"
                  caption="Stopped at “New lead only”"
                />
                <ZoomFigure
                  src={IMG + 'bot-blocked.jpg'}
                  alt="Make run: Real person only passed 0, so nothing after the webhook ran"
                  caption="Stopped at “Real person only”"
                />
              </div>
              <p className="cs__pair-cap">
                The same email sent twice: stopped at &ldquo;New lead only&rdquo;. A bot: stopped at &ldquo;Real person
                only&rdquo;. Taken 23 Oct, before the modules were renamed.
              </p>
              <ZoomFigure
                src={IMG + 'alert-typo-bounced.jpg'}
                alt="An alert email followed by a Mail Delivery Subsystem message: Address not found"
                caption="My own alert went nowhere because one letter was missing from my address. Gmail bounced it. Now every typed address is read letter by letter and proven with a test that lands in the inbox."
              />
            </section>

            <section id="cs-outcome" className="cs__sec">
              <span className="cs__n">04</span>
              <h2>Outcome: my week now</h2>
              <p>I do not watch Make. I watch my inbox.</p>
              <p>
                When a lead arrives, one email tells me who wrote, and a reply is already sitting in Drafts. I read it,
                adjust it, and send it within one business day.
              </p>
              <p>
                When something breaks, a ⚠️ email tells me which step failed and what to do. The failure stays on the
                Error log until I mark it Fixed, so nothing gets forgotten.
              </p>
              <p>Spam stops at the door. Someone who writes twice gets one reply, not two.</p>
              <p>
                It runs on Make&rsquo;s free plan. A normal lead uses 5 of the 1,000 free credits a month, so there is
                room for about 200 leads before it costs anything.
              </p>
            </section>

            <section id="cs-try" className="cs__sec">
              <span className="cs__n">05</span>
              <h2>Try it</h2>
              <div className="cs__cta">
                <p>
                  Send me a message on the contact page. It goes through this exact system, and I reply within one
                  business day.
                </p>
                <Link className="cs__book" to="/contact">
                  <EnvelopeSimple size={16} weight="bold" aria-hidden="true" />
                  Contact me
                </Link>
              </div>
            </section>
          </article>
        </div>
      </div>
    </section>
  )
}
