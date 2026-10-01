import { lazy, Suspense, useRef, useState } from 'react'
import { ArrowUpRight } from '@/components/slab'
import { systems, type NotionSystem } from '@/data/systems'
import { eaWork, type EaWork } from '@/data/eaWork'
import type { Funnel } from '@/data/funnels'
import { useIsPhone } from '@/hooks/useMediaQuery'

const FunnelBarrel = lazy(() => import('./FunnelBarrel'))

/** The samples as carousel cards: screenshot in, live page out. */
const BARREL: Funnel[] = systems
  .filter((s) => s.image)
  .map((s) => ({ file: `${s.id}.html`, label: s.title, tag: s.tag ?? 'Notion system', desc: s.catches, thumb: s.image, href: s.url }))

const openLive = (f: Funnel) => {
  if (f.href) window.open(f.href, '_blank', 'noopener,noreferrer')
}

/**
 * Projects: nine live Notion systems and one tested automation, one card each. Every card opens
 * the live page on notion.site in a new tab: the proof is the system itself,
 * not a picture of it.
 *
 * To change a card, edit src/data/systems.ts. Nothing here needs touching.
 */
function SystemCard({ s }: { s: NotionSystem }) {
  return (
    <li>
      <a
        className="syscard"
        href={s.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ ['--tint' as string]: s.tint }}
      >
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
          <ArrowUpRight size={13} weight="bold" aria-hidden="true" />
        </span>
      </a>
    </li>
  )
}

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
          Executive support I delivered for a real client, nine Notion systems and one tested automation. Every system
          ships with a guide to run it and a written list of how it breaks.
        </p>
      </header>

      <div className="home__glass pgrid__glass pgrid__glass--scroll">
        <nav className="lanejump" aria-label="Jump to a section">
          <a href="#lane-ea">Executive support</a>
          <a href="#lane-notion">Notion systems</a>
          <a href="#lane-auto">Automation</a>
        </nav>

        <h2 className="lane__title" id="lane-ea">Executive support</h2>
        <p className="sysnote">
          Real client work for a Sydney nonprofit CEO running four ventures, June to July 2026. Names and private
          details are redacted.
        </p>
        <ul className="sysgrid" role="list">
          {eaWork.map((w) => (
            <li key={w.id}>
              <button type="button" className="syscard eacard" onClick={() => show(w)}>
                <span className="syscard__shot eacard__shot">
                  <img src={w.thumb} alt="" loading="lazy" decoding="async" />
                </span>
                <span className="syscard__kind">{w.kind}</span>
                <span className="syscard__title">{w.title}</span>
                <span className="syscard__catches">{w.caption}</span>
                <span className="syscard__go">View the full image</span>
              </button>
            </li>
          ))}
        </ul>

        <h2 className="lane__title" id="lane-notion">Notion systems</h2>
        {!phone && BARREL.length > 0 && (
          <div className="sysbarrel">
            <Suspense fallback={<div className="funnels__barrel-skeleton" aria-hidden="true" />}>
              <FunnelBarrel funnels={BARREL} onOpen={openLive} />
            </Suspense>
          </div>
        )}
        <p className="sysnote">
          Demonstration systems I built from an empty page. The businesses and all the data are invented, so you can
          click anything.
        </p>
        <ul className="sysgrid" role="list">
          {notion.map((s) => (
            <SystemCard key={s.id} s={s} />
          ))}
        </ul>

        <h2 className="lane__title" id="lane-auto">Automation</h2>
        <p className="sysnote">A tested build for a fictional business. Every screenshot in it comes from a real run.</p>
        <ul className="sysgrid" role="list">
          {automation.map((s) => (
            <SystemCard key={s.id} s={s} />
          ))}
        </ul>
      </div>

      <dialog ref={dlg} className="eadlg" onClose={() => setOpen(null)} onClick={(e) => e.target === dlg.current && dlg.current?.close()}>
        {open && (
          <figure className="eadlg__fig">
            <img src={open.image} alt={open.title} />
            <figcaption>
              <strong>{open.title}</strong>
              <span>{open.caption}</span>
            </figcaption>
          </figure>
        )}
        <button type="button" className="eadlg__close" onClick={() => dlg.current?.close()} aria-label="Close">
          Close
        </button>
      </dialog>
    </section>
  )
}
