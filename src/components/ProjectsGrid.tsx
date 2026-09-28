import { lazy, Suspense } from 'react'
import { ArrowUpRight } from '@/components/slab'
import { systems } from '@/data/systems'
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
export default function ProjectsGrid() {
  const phone = useIsPhone()
  return (
    <section className="pgrid" aria-labelledby="projects-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">Projects</span>
        <h1 className="pgrid__title" id="projects-title">
          Ten live samples. Open any of them.
        </h1>
        <p className="pgrid__lede">
          Nine Notion systems and one tested automation, each built around a problem a small business misses until it
          costs money. Every one ships with a guide to run it and a written list of how it breaks.
        </p>
      </header>

      <div className="home__glass pgrid__glass pgrid__glass--scroll">
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
          {systems.map((s) => (
            <li key={s.id}>
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
          ))}
        </ul>
      </div>
    </section>
  )
}
