import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowUpRight, ArrowRight } from '@/components/slab'
import { systems, type NotionSystem } from '@/data/systems'
import { eaWork, type EaWork } from '@/data/eaWork'
import type { Funnel } from '@/data/funnels'
import { useIsPhone } from '@/hooks/useMediaQuery'
import AutoFlow, { AutoCanvas } from './AutoFlow'
import EaBackdrop from './EaBackdrop'
import NotionSketch from './NotionSketch'
import { BOOKING_URL } from '@/data/profile'

const FunnelBarrel = lazy(() => import('./FunnelBarrel'))

/** The samples as carousel cards: screenshot in, live page out. */
const BARREL: Funnel[] = systems
  .filter((s) => s.image)
  .map((s) => ({ file: `${s.id}.html`, label: s.title, tag: s.tag ?? 'Notion system', desc: s.catches, thumb: s.image, href: s.url }))

const openLive = (f: Funnel) => {
  if (!f.href) return
  // A path on this site (the case study) opens in place; Notion opens in a new tab.
  if (f.href.startsWith('/')) window.location.assign(f.href)
  else window.open(f.href, '_blank', 'noopener,noreferrer')
}

/**
 * Projects: nine live Notion systems and three tested automations, one card each. Every card opens
 * the live page on notion.site in a new tab: the proof is the system itself,
 * not a picture of it.
 *
 * To change a card, edit src/data/systems.ts. Nothing here needs touching.
 */
function SystemCard({ s }: { s: NotionSystem }) {
  const inner = (
    <>
      {s.image && (
        <span className="syscard__shot">
          <img src={s.image} alt="" loading="lazy" decoding="async" />
        </span>
      )}
      <span className="syscard__kind">{s.kind}</span>
      <span className="syscard__title">{s.title}</span>
      <span className="syscard__catches">{s.catches}</span>
      <span className="syscard__go">
        {s.cta ?? 'Open the live system'}
        {s.url.startsWith('/') ? (
          <ArrowRight size={13} weight="bold" aria-hidden="true" />
        ) : (
          <ArrowUpRight size={13} weight="bold" aria-hidden="true" />
        )}
      </span>
    </>
  )
  const style = { ['--tint' as string]: s.tint }
  return (
    <li>
      {s.url.startsWith('/') ? (
        <Link className="syscard" to={s.url} style={style}>
          {inner}
        </Link>
      ) : (
        <a className="syscard" href={s.url} target="_blank" rel="noopener noreferrer" style={style}>
          {inner}
        </a>
      )}
    </li>
  )
}

/** Executive support in two groups: real client work first, then the labelled sample builds. */
const EA_GROUPS = [
  {
    heading: 'Delivered for a real client',
    note: 'Sydney nonprofit founder, June to September 2026. Real screenshots, names and private details removed.',
    list: eaWork.filter((w) => !w.kind.startsWith('Sample')),
  },
  {
    heading: 'Sample builds you can open',
    note: "Fictional clients, real working systems, each tested with planted mistakes and fixed to zero. The website audit is the exception: a real business's public site, read only, and the business did not ask for it.",
    list: eaWork.filter((w) => w.kind.startsWith('Sample')),
  },
]

/** Notion lane, real client work. Numbers from the Evidence Log, section 4. No client name, no screenshots (NDA). */
const NOTION_PROOF = [
  { n: '4', label: 'Client workspaces built end to end' },
  { n: '3', label: 'More audited' },
  { n: '18', label: 'Policies written and localised' },
  { n: '81', label: 'Pages audited before handover' },
  { n: '5', label: 'Days early' },
]

const notion = systems.filter((s) => (s.tag ?? 'Notion system') === 'Notion system')
const automation = systems.filter((s) => s.tag === 'Automation')

/**
 * Projects, in three lanes: executive support (real client work, redacted),
 * the nine live Notion systems, and automation. Notion and automation cards
 * open the live page; an executive support card opens its full image here,
 * because the client's systems are private.
 *
 * To change a card, edit src/data/systems.ts or src/data/eaWork.ts.
 */
export default function ProjectsGrid() {
  const phone = useIsPhone()
  const dlg = useRef<HTMLDialogElement>(null)
  const [open, setOpen] = useState<EaWork | null>(null)
  const box = useRef<HTMLDivElement>(null)
  /** Scroll the box to a section. Buttons, not #links: the page's smooth-scroll
   *  hijacks #links and tries to scroll the page, which does not move. */
  const jump = (id: string) => {
    const el = document.getElementById(id)
    const b = box.current
    if (!el) return
    if (b && b.scrollHeight > b.clientHeight) {
      b.scrollTo({ top: b.scrollTop + el.getBoundingClientRect().top - b.getBoundingClientRect().top - 8, behavior: 'smooth' })
    } else {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
  /** A Home lane button arrives as /projects?lane=ea|notion|auto: open on that lane. */
  const [params] = useSearchParams()
  const lane = params.get('lane')
  useEffect(() => {
    if (lane !== 'ea' && lane !== 'notion' && lane !== 'auto') return
    // The barrel above loads late and pushes the lanes down, so one jump can land
    // short. Jump once, then hold the lane at the top for 4 s unless the visitor scrolls.
    const id = `lane-${lane}`
    const t = window.setTimeout(() => jump(id), 350)
    let stop = false
    const cancel = () => { stop = true }
    window.addEventListener('wheel', cancel, { passive: true })
    window.addEventListener('touchstart', cancel, { passive: true })
    window.addEventListener('keydown', cancel)
    const started = Date.now()
    const iv = window.setInterval(() => {
      const el = document.getElementById(id)
      const b = box.current
      if (stop || !el || Date.now() - started > 4000) return window.clearInterval(iv)
      if (Date.now() - started < 1300) return
      if (b && b.scrollHeight > b.clientHeight) {
        const off = el.getBoundingClientRect().top - b.getBoundingClientRect().top - 8
        if (Math.abs(off) > 4) b.scrollTop += off
      } else {
        const off = el.getBoundingClientRect().top - 8
        if (Math.abs(off) > 60) el.scrollIntoView({ block: 'start' })
      }
    }, 250)
    return () => {
      window.clearTimeout(t)
      window.clearInterval(iv)
      window.removeEventListener('wheel', cancel)
      window.removeEventListener('touchstart', cancel)
      window.removeEventListener('keydown', cancel)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lane])
  const show = (w: EaWork) => {
    setOpen(w)
    dlg.current?.showModal()
  }
  return (
    <section className="pgrid" aria-labelledby="projects-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">Projects</span>
        <h1 className="pgrid__title" id="projects-title">
          Client work and live systems. Open any of them.
        </h1>
        <p className="pgrid__lede">
          Ten pieces of executive support I delivered for a real client, nine executive support sample builds (marked as
          samples), nine Notion systems and three tested automations. Every system ships with a guide to run it and a written
          list of how it breaks.
        </p>
      </header>

      {/* data-lenis-prevent: this box scrolls by itself; without it the page's smooth-scroll swallows the wheel. */}
      <div className="home__glass pgrid__glass pgrid__glass--scroll" ref={box} data-lenis-prevent>
        <nav className="lanejump" aria-label="Jump to a section">
          <button type="button" onClick={() => jump('lane-ea')}>Executive support</button>
          <button type="button" onClick={() => jump('lane-notion')}>Notion systems</button>
          <button type="button" onClick={() => jump('lane-auto')}>Automation</button>
        </nav>

        <div className="ealane">
          <EaBackdrop />
        <h2 className="lane__title" id="lane-ea">Executive support</h2>
        {EA_GROUPS.map(({ heading, note, list }) => (
          <div key={heading}>
            <h3 className="lane__group">{heading}</h3>
            <p className="sysnote">{note}</p>
            <ul className="sysgrid" role="list">
              {list.map((w) => {
                const inner = (
                  <>
                    <span className="syscard__shot eacard__shot">
                      <img src={w.thumb} alt="" loading="lazy" decoding="async" />
                    </span>
                    <span className="syscard__kind">
                      {w.kind}
                      {w.tools && ` · ${w.tools}`}
                    </span>
                    <span className="syscard__title">{w.title}</span>
                    <span className="syscard__catches">{w.caption}</span>
                    <span className="syscard__go">
                      {w.url ? 'Read the case study' : 'View the full image'}
                      {w.url && <ArrowRight size={13} weight="bold" aria-hidden="true" />}
                    </span>
                  </>
                )
                return (
                  <li key={w.id}>
                    {w.url ? (
                      <Link className="syscard eacard" to={w.url}>
                        {inner}
                      </Link>
                    ) : (
                      <button type="button" className="syscard eacard" onClick={() => show(w)}>
                        {inner}
                      </button>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
        </div>

        <div className="nlane">
        <h2 className="lane__title" id="lane-notion">Notion systems</h2>
        <div className="nproof">
          <h3 className="lane__group">Delivered for a real client</h3>
          <p className="sysnote">
            Australian consultancy, June to August 2026, through the agency that placed me. Their workspaces stay private, so
            the numbers stand in for screenshots.
          </p>
          <ul className="nproof__tiles" role="list">
            {NOTION_PROOF.map((t) => (
              <li key={t.label} className="nproof__tile">
                <span className="nproof__n">{t.n}</span>
                <span className="nproof__label">{t.label}</span>
              </li>
            ))}
          </ul>
          <Link className="nproof__link" to="/testimonials">
            Read what their team said
            <ArrowRight size={13} weight="bold" aria-hidden="true" />
          </Link>
        </div>
        <h3 className="lane__group">Sample systems you can open</h3>
        <p className="sysnote">
          Demonstration systems I built from an empty page. The businesses and all the data are invented, so you can
          click anything.
        </p>
        <NotionSketch />
        <ul className="sysgrid" role="list">
          {notion.map((s) => (
            <SystemCard key={s.id} s={s} />
          ))}
        </ul>
        {!phone && BARREL.length > 0 && (
          <>
            <p className="sysnote">Every build in one view. Drag to spin, click a page to open it.</p>
            <div className="sysbarrel">
              <Suspense fallback={<div className="funnels__barrel-skeleton" aria-hidden="true" />}>
                <FunnelBarrel funnels={BARREL} onOpen={openLive} />
              </Suspense>
            </div>
          </>
        )}
        </div>

        <div className="autolane">
          <AutoCanvas />
        <h2 className="lane__title" id="lane-auto">Automation</h2>
        <p className="sysnote">Three tested builds: one for a fictional business, one live on this site’s contact form, and one that sorts test leads with AI in n8n. Every screenshot in them comes from a real run.</p>
        <AutoFlow />
        <ul className="sysgrid" role="list">
          {automation.map((s) => (
            <SystemCard key={s.id} s={s} />
          ))}
        </ul>
        </div>
      </div>

      {/* data-lenis-prevent: without it the smooth scroll swallows the wheel and a tall image cannot be scrolled (S11). */}
      <dialog ref={dlg} className="eadlg" data-lenis-prevent onClose={() => setOpen(null)} onClick={(e) => e.target === dlg.current && dlg.current?.close()}>
        {open && (
          <figure className="eadlg__fig">
            <img src={open.image ?? open.thumb} alt={open.title} />
            <figcaption>
              <strong>{open.title}</strong>
              <span>{open.caption}</span>
            </figcaption>
          </figure>
        )}
        <div className="eadlg__foot">
          <p className="eadlg__ask">Want this done in your business?</p>
          <a className="eadlg__book" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
            Book a 30-min call
            <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
          </a>
          <button type="button" className="eadlg__close" onClick={() => dlg.current?.close()} aria-label="Close">
            Close
          </button>
        </div>
      </dialog>
    </section>
  )
}
