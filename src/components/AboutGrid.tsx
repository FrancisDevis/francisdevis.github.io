import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import AboutArt from './AboutArt'
import { ArrowUpRight, MapPin } from '@/components/slab'
import { profile } from '@/data/profile'
import { LinkedinLogo } from '@/components/slab'

/**
 * AboutGrid - the About view as a fixed viewport.
 *
 * One glass sheet, two columns: who you are on the left, the illustration
 * on the right. Sized to the panel, so nothing here scrolls.
 *
 * The left column is a ladder, not a paragraph block: one display statement,
 * one line of context, then the four things you do - each carrying the marks
 * of the tools it is built with. The tools are the proof, so they are the
 * visual. Swap the marks below for your own (any square SVG/PNG in public/).
 */

const NOTION = { src: '/icons/tools/notion.svg', name: 'Notion' }
const GMAIL = { src: '/icons/tools/gmail.svg', name: 'Gmail' }
const GCAL = { src: '/icons/tools/googlecalendar.svg', name: 'Google Calendar' }
const CALENDLY = { src: '/icons/tools/calendly.svg', name: 'Calendly' }
const GWS = { src: '/icons/googleworkspace.svg', name: 'Google Workspace' }
const FIREFLIES = { src: '/icons/ai/fireflies.png', name: 'Fireflies' }
const LOOM = { src: '/icons/tools/loom.svg', name: 'Loom' }
const CLAUDE = { src: '/icons/tools/claude.svg', name: 'Claude' }
const CHATGPT = { src: '/icons/openai.svg', name: 'ChatGPT' }
const GRAMMARLY = { src: '/icons/tools/grammarly.svg', name: 'Grammarly' }

type Capability = {
  index: string
  title: string
  marks: { src: string; name: string }[]
}

const CAPABILITIES: Capability[] = [
  { index: '01', title: 'Notion systems and audits', marks: [NOTION] },
  { index: '02', title: 'Inbox and calendar ownership', marks: [GMAIL, GCAL, CALENDLY] },
  { index: '03', title: 'Meetings and documentation', marks: [GWS, FIREFLIES, LOOM] },
  { index: '04', title: 'AI drafts, checked by hand', marks: [CLAUDE, CHATGPT, GRAMMARLY] },
]

export default function AboutGrid() {
  return (
    <section className="pgrid agrid" aria-labelledby="about-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">About</span>
        <h1 className="pgrid__title" id="about-title">
          {`Hi, I’m ${profile.firstName}.`}
        </h1>
        <p className="pgrid__lede">
          Notion Operations Specialist and Executive VA, based in Tarlac City, Philippines.
        </p>
      </header>

      <div className="home__glass agrid__glass">
        <div className="agrid__copy">
          <p className="agrid__lead">
            I build the systems a small business runs on.
            <span> Then I find the places they quietly break, and write them down.</span>
          </p>

          <p className="agrid__note">
            I have run a <strong>nonprofit founder's inbox</strong> from 6,081 conversations to zero, and built Notion
            workspaces for an Australian consultancy's clients, auditing 81 pages before handover. Nine of my own systems
            are{' '}
            <Link className="agrid__link" to="/projects">
              live on the Projects page
            </Link>
            .
          </p>

          <ul className="agrid__caps" role="list">
            {CAPABILITIES.map((c) => (
              <li key={c.index} className="agrid__cap">
                <span className="agrid__cap-marks">
                  {c.marks.map((m, i) => (
                    <span
                      key={m.name}
                      className="agrid__mark"
                      style={{ '--i': c.marks.length - i } as CSSProperties}
                    >
                      <img src={m.src} alt={m.name} loading="lazy" decoding="async" />
                    </span>
                  ))}
                </span>
                <span className="agrid__cap-title">{c.title}</span>
                <span className="agrid__cap-index" aria-hidden="true">
                  {c.index}
                </span>
              </li>
            ))}
          </ul>

          {/* One plate, two cells sharing a mark / title / meta anatomy. */}
          <div className="agrid__bar">
            <span className="agrid__cell">
              <span className="agrid__cell-mark agrid__cell-mark--img">
                <img src="/badge-pm.svg" alt="" loading="lazy" decoding="async" />
              </span>
              <span className="agrid__cell-copy">
                <span className="agrid__cell-title">Foundations of Project Management</span>
                <span className="agrid__cell-meta">Google / Coursera · 97.10%</span>
              </span>
            </span>

            <span className="agrid__cell">
              <span className="agrid__cell-mark">
                <MapPin size={16} weight="fill" aria-hidden="true" />
              </span>
              <span className="agrid__cell-copy">
                <span className="agrid__cell-title">{profile.location}</span>
                <span className="agrid__cell-meta">GMT+8 · flexible to AU, UK and US hours</span>
              </span>
            </span>

            <a className="agrid__cell agrid__cell--wide" href="https://www.linkedin.com/in/francisrowenndevis" target="_blank" rel="noopener noreferrer">
              <span className="agrid__cell-mark">
                <LinkedinLogo size={16} weight="fill" aria-hidden="true" />
              </span>
              <span className="agrid__cell-copy">
                <span className="agrid__cell-title">Two LinkedIn recommendations</span>
                <span className="agrid__cell-meta">From the team I built workspaces for</span>
              </span>
              <ArrowUpRight className="agrid__cell-go" size={15} weight="bold" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="agrid__portrait">
          <AboutArt />
        </div>
      </div>
    </section>
  )
}
