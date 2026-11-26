import { Link } from 'react-router-dom'
import { ArrowLeft, CalendarBlank } from '@/components/slab'
import ZoomFigure from '@/components/ZoomFigure'
import usePageTitle from '@/hooks/usePageTitle'
import { BOOKING_URL } from '@/data/profile'

/**
 * The v3 lead catcher case study (sample build, n8n + Gemini, 26 Nov 2026).
 * Same layout as LeadCatcherV2Case.tsx; every figure opens full size.
 *
 * Headline, section text, captions and the call to action are WORD FOR WORD from the
 * Automation chat's text, approved by him 26 Nov 2026. Change the text there first, then
 * this file. Claude's own words: the eyebrow, the stat labels, the facts sidebar, the
 * runbook link in the sidebar, and the alt text.
 *
 * The runbook is LeadCatcherV3Runbook.tsx (/projects/lead-catcher-v3/runbook).
 * Images in public/case/lead-catcher-v3/ come from his folder
 * Documents/04_Upskilling/Lead Catcher Screenshot/v3/ (the alert email was redacted there).
 */

const IMG = '/case/lead-catcher-v3/'

const STATS = [
  { value: '5', label: 'labels the AI may choose, and nothing else' },
  { value: '3', label: 'tries before a lead takes the failure road' },
  { value: '15', label: 'ways it can break, each with a written guard' },
  { value: '0', label: 'replies sent to a lead without me' },
]

const FACTS = [
  { k: 'Type', v: 'Sample build, tested with made-up leads' },
  { k: 'Runs', v: 'n8n on my own computer' },
  { k: 'Year', v: '2026' },
]
const SERVICES = ['AI sorting', 'Duplicate guard', 'Human review', 'Failure alerts']
const TOOLS = ['n8n', 'Gemini (free tier)', 'Google Sheets', 'Gmail']

const SECTIONS = [
  { id: 'cs-does', n: '01', t: 'What this system does' },
  { id: 'cs-why', n: '02', t: 'Why this setup works' },
  { id: 'cs-broke', n: '03', t: 'How it broke while I built it' },
  { id: 'cs-outcome', n: '04', t: 'Outcome: what changes for the owner' },
  { id: 'cs-limits', n: '05', t: 'Built, tested, and honest about limits' },
]

const STEPS = [
  { t: 'Required fields.', d: 'The form will not send until name, email and message are filled in.' },
  { t: 'Duplicate check.', d: 'If the email is already in my lead list, the run stops.' },
  {
    t: 'AI sorting.',
    d: 'Gemini reads the message and picks one label: Hot, Warm, Not a fit, Spam, or Needs you. It follows rules I wrote, and when it is unsure it must choose “Needs you”. It never guesses.',
  },
  { t: 'Label check.', d: 'A second step checks that the answer is exactly one of those five words. Anything else is rejected.' },
  { t: 'Save.', d: 'The lead becomes one row in a Google Sheet, with its label in colour.' },
  {
    t: 'Draft.',
    d: 'Hot, Warm and Needs you leads get a reply drafted in my Gmail. Spam and Not a fit get none. Nothing reaches a lead until I read it and click Send.',
  },
]

const WHY = [
  {
    t: 'The AI follows written rules, not a feeling.',
    d: '“Hot” means a clear need plus a deadline, a budget, or a request to talk. A client changes the rules to fit their business without touching the workflow.',
  },
  { t: 'When unsure, a human decides.', d: 'Unclear or mixed messages go to “Needs you”. The AI is not allowed to guess.' },
  {
    t: 'The AI step can fail without losing a lead.',
    d: 'If Gemini is busy, it tries again up to 3 times. If it still fails, the lead takes a second road: it is saved with “Needs you” and I get an email with the lead’s name, email and message.',
  },
  { t: 'Spam gets no reply.', d: 'The draft step only runs for leads worth answering.' },
  {
    t: 'Every guard was proven by breaking it.',
    d: 'I made the AI fail on purpose with a fake model name, sent a test lead, and checked the sheet and my inbox. I documented 15 ways this system can break, each with a written guard.',
  },
]

const BROKE = [
  'A form with no message made the AI hang, and the lead was never saved. Fixed: every field is required, and the AI step now has its own failure road.',
  'When the AI failed, the lead was saved with an empty label. The failure step was copied from the normal save step and still pointed at the AI’s answer, which did not exist. Fixed: it now writes “Needs you” every time. Found by a planted break, not by a client.',
  'Spam got a polite reply. Fixed: a check before the draft step lets only Hot, Warm and Needs you through.',
  'A new sheet column broke the Status dropdown. Fixed, and now part of the runbook: check every dropdown after any column change.',
]

export default function LeadCatcherV3Case() {
  usePageTitle('AI lead sorter in n8n (sample) · Francis Rowenn Devis')

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
        <span className="pgrid__eyebrow">Sample build · n8n · Gemini (free tier) · Google Sheets · Gmail · Tested with made-up leads</span>
        <h1 className="pgrid__title" id="cs-title">
          When the AI failed, the lead was still saved. (Sample build)
        </h1>
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
              <div>
                <dt>How to run it</dt>
                <dd>
                  <Link to="/projects/lead-catcher-v3/runbook">Read the runbook</Link>
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
            <ZoomFigure
              src={IMG + 'ai-failure-road.jpg'}
              alt="The n8n workflow: On form submission, Find existing lead, New lead only, Sort lead with AI with Gemini and Check label, then Save new lead, Reply-worthy leads only and Draft reply to lead on top, and Save lead (AI failed) and Alert me: AI step failed below; the Gemini step shows an error"
              caption="The whole system in n8n. The top line is a normal lead. The bottom line runs only when the AI step fails: the lead is saved anyway, and I get an alert."
            />

            <section id="cs-does" className="cs__sec">
              <span className="cs__n">01</span>
              <h2>What this system does</h2>
              <p>When someone fills in the contact form, this happens in a few seconds:</p>
              <ol className="cs__list">
                {STEPS.map((s) => (
                  <li key={s.t}>
                    <strong>{s.t}</strong> {s.d}
                  </li>
                ))}
              </ol>
              {/* The sheet image is very wide, so it is stacked, not paired (Site SOP, wide sheet images). */}
              <ZoomFigure
                src={IMG + 'sheet-ai-labels.jpg'}
                alt="The Leads sheet, rows 6 to 12: seven test leads at example.com addresses with AI labels Spam, Needs you, Spam, Hot, blank, Needs you and Warm, every Status New"
                caption="Seven test leads, sorted by the AI. An n8n workflow request with a deadline and a budget: Hot. A question about my Notion services: Warm. Backlink and follower ads: Spam. “Can u do the thing we talked about?”: Needs you. Row 10 is blank: that was the planted break in section 03, before the fix. Row 11 is the same test after the fix."
              />
              <ZoomFigure
                src={IMG + 'form-required-fields.jpg'}
                alt="The n8n test form “Get in touch with Francis” with First name and Last name filled in, and Email and Message marked This field is required"
                caption="The form will not send with empty fields."
              />
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
              <ZoomFigure
                src={IMG + 'reply-gate.jpg'}
                alt="An n8n run where every step is green: the lead passed Reply-worthy leads only and Draft reply to lead ran"
                caption="A normal run. The lead passed “Reply-worthy leads only”, so a draft was made."
              />
              <ZoomFigure
                src={IMG + 'alert-ai-step-failed.jpg'}
                alt="Alert email: Lead catcher: AI step failed, lead saved as Needs you, with the test lead’s name, email and message"
                caption="The alert when the AI step failed. The lead’s details are in the email, so nothing is lost."
              />
            </section>

            <section id="cs-broke" className="cs__sec">
              <span className="cs__n">03</span>
              <h2>How it broke while I built it (and the fix for each)</h2>
              <ul className="cs__list">
                {BROKE.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <ZoomFigure
                src={IMG + 'ai-step-first-run.jpg'}
                alt="The first n8n run with the AI step: Basic LLM Chain with Google Gemini Chat Model and Structured Output Parser, every step green"
                caption="The first run of the AI step."
              />
            </section>

            <section id="cs-outcome" className="cs__sec">
              <span className="cs__n">04</span>
              <h2>Outcome: what changes for the owner</h2>
              <p>
                You do not read every message to find the ones that matter. Hot leads are marked in red. Spam is labelled
                and gets no reply. The unclear ones are flagged &ldquo;Needs you&rdquo; so a person reads them first.
              </p>
              <p>
                If the AI goes down, nothing is lost. The lead is in the sheet, and an alert says which one needs a reply by
                hand.
              </p>
            </section>

            <section id="cs-limits" className="cs__sec">
              <span className="cs__n">05</span>
              <h2>Built, tested, and honest about limits</h2>
              <p>
                This is a sample build. It runs in n8n on my own computer and was tested with made-up leads. It was built
                and tested on Gemini&rsquo;s free tier, which lets Google use the data, so a real client&rsquo;s version
                would use a paid key or the client&rsquo;s own. The same pattern also runs live on my website in Make (see
                the <Link to="/projects/lead-catcher-v2">v2 case study</Link>).
              </p>
              <div className="cs__cta">
                <p>Want leads sorted like this in your business?</p>
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
