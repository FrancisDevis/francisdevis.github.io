import type React from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  FolderOpen,
  User,
  Bug,
  Medal,
  Stack,
  Quotes,
  AddressBook,
  MagnifyingGlass,
  EnvelopeSimple,
  FileText,
  SealCheck,
} from '@/components/slab'
import { systems, breakPoints } from '@/data/systems'
import { profile } from '@/data/profile'

/**
 * Home's showcase: one card per rail view, each an index of what that view
 * holds. Nothing here invents a fact: the systems, the break points, the
 * testimonials and the credential are the same records the views render.
 *
 * Motion is transform-only on a clipped inner track, so a card never adds
 * height and Home stays a single viewport.
 */

const OFFERS = [
  { Icon: Stack, title: 'Notion system builds', note: 'Client hubs, CRMs, finance trackers' },
  { Icon: AddressBook, title: 'SOPs and onboarding', note: 'Guides a new hire can follow' },
  { Icon: MagnifyingGlass, title: 'Workspace audits', note: 'Dead links, wrong totals, missing steps' },
  { Icon: EnvelopeSimple, title: 'Inbox and calendar', note: 'Executive support, owned end to end' },
  { Icon: FileText, title: 'Docs and handover', note: 'Policies, SOPs, handover notes' },
] as const

const CLIENTS = [
  { name: 'Kallista Cox', role: 'Business Manager, SheBuild Consulting', work: '"...particularly for Notion and systems organisation"' },
  { name: 'Oli Williams', role: 'SheBuild Consulting | Founder & CEO of Reportable Pty Ltd', work: '"...reliable in delivering quality work on time"' },
  { name: 'Alon Pearl', role: 'Co-Founder & CEO, VA Masters', work: '"...designing clean, scalable Notion systems"' },
]

const PHOTOS = [profile.hero.portraitSrc, profile.avatarSrc, profile.hero.portraitSrc + '?b']

const half = Math.ceil(breakPoints.length / 2)
const BREAK_ROWS = [breakPoints.slice(0, half), breakPoints.slice(half)]

function CardHead({
  Icon,
  title,
  desc,
}: {
  Icon: typeof FolderOpen
  title: string
  desc: string
}) {
  return (
    <header className="bento__head">
      <span className="bento__label">
        <span className="bento__icon">
          <Icon size={20} weight="fill" aria-hidden="true" />
        </span>
        <h3 className="bento__title">{title}</h3>
      </span>
      <p className="bento__desc">{desc}</p>
      <ArrowUpRight size={15} weight="bold" aria-hidden="true" className="bento__arrow" />
    </header>
  )
}

export default function HomeBento() {
  const shots = [...systems, ...systems]
  return (
    <nav className="bento" aria-label="Explore the portfolio">
      {/* Projects: the nine live systems drift upward as title tiles. */}
      <Link to="/projects" className="bento__card bento__card--projects">
        <CardHead Icon={FolderOpen} title="Projects" desc="Nine live Notion systems and one tested automation. Each opens on the problem it catches." />
        <div className="bento__media bento__reel" aria-hidden="true">
          <div className="bento__reel-track">
            {shots.map((sys, i) => (
              <span key={i} className="bento__shot bento__systile" style={{ ['--tint' as string]: sys.tint }}>
                {sys.image ? (
                  <img src={sys.image} alt="" loading="lazy" decoding="async" />
                ) : (
                  <>
                    <span className="bento__systile-kind">{sys.kind}</span>
                    <span className="bento__systile-title">{sys.title}</span>
                  </>
                )}
              </span>
            ))}
          </div>
        </div>
      </Link>

      {/* About: a fanned stack of photos. */}
      <Link to="/about" className="bento__card bento__card--about">
        <CardHead Icon={User} title="About" desc="I build Notion systems, then run them like an Executive VA." />
        <div className="bento__media bento__fan" aria-hidden="true">
          {PHOTOS.map((src, i) => (
            <span key={src} className="bento__photo" style={{ ['--i' as string]: i }}>
              <img src={src} alt="" loading="lazy" decoding="async" />
            </span>
          ))}
        </div>
      </Link>

      {/* Break points: the failure modes each build documents, two chip rows
          scrolling against each other. */}
      <Link to="/projects" className="bento__card bento__card--ai">
        <CardHead Icon={Bug} title="Break points" desc="Every build ships with the ways it breaks and the guard on each." />
        <div className="bento__media bento__chips" aria-hidden="true">
          {BREAK_ROWS.map((row, r) => (
            <div key={r} className="bento__chip-row" data-dir={r ? 'right' : 'left'}>
              <div className="bento__chip-track">
                {[...row, ...row].map((name, i) => (
                  <span key={`${name}-${i}`} className="bento__chip">
                    <Bug size={15} weight="duotone" />
                    {name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Link>

      {/* Credentials: the certificate, on its plate. */}
      <Link to="/about" className="bento__card bento__card--creds">
        <CardHead Icon={Medal} title="Credentials" desc="Google Foundations of Project Management, scored 97.10%." />
        <div className="bento__media bento__badge" aria-hidden="true">
          <span className="bento__badge-ring">
            <img src="/badge-pm.svg" alt="" width={72} height={72} />
          </span>
          <span className="bento__badge-tag">
            <SealCheck size={14} weight="fill" />
            Google · Coursera
          </span>
        </div>
      </Link>

      {/* Services: the five offers as a compact index. */}
      <Link to="/services" className="bento__card bento__card--services">
        <CardHead Icon={Stack} title="Services" desc="Notion systems, executive support and automation repair." />
        <ul className="bento__media bento__offers" role="list">
          {OFFERS.map(({ Icon, title, note }, i) => (
            <li key={title} className="bento__offer" style={{ '--i': i } as React.CSSProperties}>
              <span className="bento__offer-tile">
                <Icon size={15} weight="duotone" aria-hidden="true" />
              </span>
              <span className="bento__offer-text">
                <span className="bento__offer-title">{title}</span>
                <span className="bento__offer-note">{note}</span>
              </span>
              <span className="bento__offer-num" aria-hidden="true">
                0{i + 1}
              </span>
            </li>
          ))}
        </ul>
      </Link>

      {/* Testimonials: the three testimonials drifting up a clipped column. */}
      <Link to="/testimonials" className="bento__card bento__card--quotes">
        <CardHead Icon={Quotes} title="Testimonials" desc="Three testimonials: two public LinkedIn recommendations and one from the CEO of the agency that placed me." />
        <div className="bento__media bento__reviews" aria-hidden="true">
          <div className="bento__reviews-track">
            {[...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS].map((c, i) => (
              <span key={i} className="bento__review">
                <span className="bento__review-top">
                  <Quotes size={14} weight="fill" />
                  <b>{c.name}</b>
                </span>
                <span className="bento__review-role">{c.role}</span>
                <span className="bento__review-work">{c.work}</span>
              </span>
            ))}
          </div>
        </div>
      </Link>
    </nav>
  )
}
