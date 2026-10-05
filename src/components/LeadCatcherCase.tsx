import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, CalendarBlank } from '@/components/slab'
import { BOOKING_URL } from '@/data/profile'

/**
 * The lead catcher case study, on the site itself (layout learned from
 * jepoy.dev, 5 Oct 2026): a stats strip, a facts sidebar, numbered sections.
 * The section his layout does not have is 05, How it breaks.
 *
 * Every line here comes from the Notion case study and claude/Mesa_Lead_Catcher_SOP.md.
 * It is a demonstration build for a fictional business: say so, never imply a client.
 * Images in public/case/lead-catcher/ are crops of real runs (no tokens, test
 * addresses on example.com only).
 */

const NOTION_URL = 'https://enormous-woolen-5f8.notion.site/3e99a4e52ba38193a811dff0cd2b4759'
const IMG = '/case/lead-catcher/'

const STATS = [
  { value: '1 lead', label: 'per person, even when they submit twice' },
  { value: '0 emails', label: 'sent without a person pressing Send' },
  { value: '4 of 4', label: 'checks passed on 27 and 28 Sept 2026' },
  { value: '4 breaks', label: 'caught while testing, each with a guard' },
]

const FACTS = [
  { k: 'Client', v: 'Mesa & Co, a fictional business' },
  { k: 'Type', v: 'Demonstration build, real runs' },
  { k: 'Year', v: '2026' },
  { k: 'Timeline', v: '3 days, 26 to 28 Sept' },
]
const SERVICES = ['Lead capture', 'Duplicate guard', 'Human review', 'Failure documentation']
const TOOLS = ['Tally', 'Make', 'Notion', 'Gmail']

const SECTIONS = [
  { id: 'cs-overview', n: '01', t: 'Overview' },
  { id: 'cs-challenge', n: '02', t: 'The challenge' },
  { id: 'cs-approach', n: '03', t: 'The approach' },
  { id: 'cs-built', n: '04', t: 'What I built' },
  { id: 'cs-breaks', n: '05', t: 'How it breaks' },
  { id: 'cs-result', n: '06', t: 'The result' },
]

const FLOW = [
  { t: 'Tally form', d: 'Someone asks for help' },
  { t: 'Check', d: 'Is this email already a lead?' },
  { t: 'Notion', d: 'New lead saved' },
  { t: 'Gmail draft', d: 'A person reads it and presses Send' },
]

const BREAKS = [
  {
    t: 'The same person submitted twice and became two leads with two replies.',
    g: 'Search the lead list by email first, and only let a "found 0" result through.',
    img: 'dup-two-leads.jpg',
    cap: 'Before: one person, two leads.',
  },
  {
    t: 'The first fix made it worse.',
    g: 'The search found both copies and sent every later step through twice. Now the search stops at one match, and the gate decides.',
    img: 'search-ran-twice.jpg',
    cap: 'First fix, worse result: create and draft each ran twice.',
  },
  {
    t: 'A blank message box produced a reply reading: We have your message about: "".',
    g: 'That line only appears when there is a message.',
  },
  {
    t: 'A renamed form question produced a reply starting "Hi ,".',
    g: 'Every answer is matched by the question’s hidden ID, not its wording. Two fields that had slipped back to matching by wording were found and moved.',
  },
]

export default function LeadCatcherCase() {
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
        <span className="pgrid__eyebrow">Case study · Automation · 2026</span>
        <h1 className="pgrid__title" id="cs-title">
          The form worked. It was quietly creating duplicate leads.
        </h1>
        <p className="pgrid__lede">
          A website form that saves every enquiry to a Notion lead list and drafts a personal reply in Gmail. Built in
          Make, broken on purpose, and fixed until it held.
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
            <a className="cs__notion" href={NOTION_URL} target="_blank" rel="noopener noreferrer">
              Open the Notion version
              <ArrowUpRight size={13} weight="bold" aria-hidden="true" />
            </a>
          </aside>

          <article className="cs__main">
            <section id="cs-overview" className="cs__sec">
              <span className="cs__n">01</span>
              <h2>Overview</h2>
              <p>
                Mesa & Co gets enquiries through a website form. This automation catches each one, saves it to their
                Notion lead list and drafts a personal reply in Gmail for a person to read and send. Nothing is sent
                automatically.
              </p>
            </section>

            <section id="cs-challenge" className="cs__sec">
              <span className="cs__n">02</span>
              <h2>The challenge</h2>
              <p>A form that works on the first try can still be wrong on the tenth.</p>
              <ul className="cs__list">
                <li>The same person can submit twice. Each submission became a new lead with a new reply.</li>
                <li>Every step in Make showed a green tick even when the reply that came out was wrong.</li>
                <li>Form questions get renamed, and anything matched by a question&rsquo;s wording quietly stops filling in.</li>
              </ul>
            </section>

            <section id="cs-approach" className="cs__sec">
              <span className="cs__n">03</span>
              <h2>The approach</h2>
              <p>Check before writing. Searching after saving would always find the row it had just made.</p>
              <ol className="cs__flow">
                {FLOW.map((f, i) => (
                  <li key={f.t}>
                    <span className="cs__flow-n">{i + 1}</span>
                    <strong>{f.t}</strong>
                    <span>{f.d}</span>
                  </li>
                ))}
              </ol>
            </section>

            <section id="cs-built" className="cs__sec">
              <span className="cs__n">04</span>
              <h2>What I built</h2>
              <ul className="cs__list">
                <li>
                  <strong>It checks before it writes.</strong> The lead list is searched by email first, and a gate
                  lets through only an email that was not found.
                </li>
                <li>
                  <strong>A person approves every reply.</strong> The last step creates a draft, never a sent email.
                </li>
                <li>
                  <strong>Renaming a form question cannot break it.</strong> Answers are matched by the question&rsquo;s
                  hidden ID, not its wording.
                </li>
                <li>
                  <strong>The reply adapts.</strong> If the lead skips the message box, the sentence about their message
                  disappears instead of showing empty quote marks.
                </li>
              </ul>
              <figure className="cs__fig">
                <img src={IMG + 'gate-new-lead-only.jpg'} alt="The Make scenario with a filter named New lead only: Total number of bundles equal to 0" loading="lazy" />
                <figcaption>The gate: only a lead the search did not find gets through.</figcaption>
              </figure>
            </section>

            <section id="cs-breaks" className="cs__sec">
              <span className="cs__n">05</span>
              <h2>How it breaks</h2>
              <p>What I caught while testing, and the guard on each. Every one came from a real run.</p>
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
                    {b.img && (
                      <figure className="cs__fig">
                        <img src={IMG + b.img} alt="" loading="lazy" />
                        <figcaption>{b.cap}</figcaption>
                      </figure>
                    )}
                  </li>
                ))}
              </ol>
            </section>

            <section id="cs-result" className="cs__sec">
              <span className="cs__n">06</span>
              <h2>The result</h2>
              <p>
                Every enquiry lands in the lead list within seconds, with a reply already written and waiting to be
                read. Someone who submits twice stays one lead with one reply. A lead who writes nothing gets a reply
                that still reads naturally. Nothing goes out until a person presses Send.
              </p>
              <p>
                Four checks prove it, run on 27 and 28 September 2026: an existing email was blocked, a new email was
                saved, a blank message was handled, and a typed message came through in the reply.
              </p>
              <figure className="cs__fig cs__fig--narrow">
                <img src={IMG + 'draft-with-message.jpg'} alt="A Gmail draft to a test address, greeting the lead by name and quoting their message" loading="lazy" />
                <figcaption>A new lead: one draft, message included, waiting for a person to send.</figcaption>
              </figure>
            </section>

            <div className="cs__cta">
              <p>Have an automation that runs green and still does the wrong thing?</p>
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
