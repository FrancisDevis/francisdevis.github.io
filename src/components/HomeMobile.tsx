import { Link } from 'react-router-dom'
import { SealCheck, ArrowUpRight, Stack, Quotes, FolderOpen } from '@/components/slab'
import { profile } from '@/data/profile'
import ThemeButton from './ThemeButton'

/**
 * Home on a phone, the parts the rail and the bento used to carry:
 *
 *   HomeProfile  avatar, name, verified mark, handle and the theme switch -
 *                the rail's identity block, laid flat
 *   HomeStats    three proof facts (profile.stats)
 *   HomeExplore  one tile per rail view in a snap row, then the first
 *                testimonial as a proof card
 */

export function HomeProfile() {
  return (
    <header className="hprofile">
      <img className="hprofile__avatar" src={profile.avatarSrc} alt="" width={56} height={56} />
      <div className="hprofile__who">
        <span className="hprofile__name">
          {profile.name}
          <SealCheck size={16} weight="fill" className="hprofile__verified" aria-label={profile.verifiedLabel} />
        </span>
        <span className="hprofile__handle">
          {profile.handle} · {profile.role}
        </span>
      </div>
      <ThemeButton className="hprofile__theme" />
    </header>
  )
}

export function HomeStats() {
  return (
    <ul className="hstats" role="list">
      {profile.stats.map((s, i) => (
        <li key={i}>
          <b>{s.value}</b>
          <span>{s.label}</span>
        </li>
      ))}
    </ul>
  )
}

const TILES = [
  { n: '01', label: 'Projects', to: '/projects', title: 'Nine live Notion systems', desc: 'Each one opens on the problem it catches.', Icon: FolderOpen, dark: true, accent: true },
  { n: '02', label: 'Services', to: '/services', title: 'Notion systems and executive support', desc: 'Audit first, then build, then hand over.', Icon: Stack, dark: true },
  { n: '03', label: 'Testimonials', to: '/testimonials', title: 'Two LinkedIn recommendations', desc: 'Word for word, from the team I built for.', Icon: Quotes, dark: true },
  { n: '04', label: 'About', to: '/about', title: `Hi, I'm ${profile.firstName}.`, desc: 'I build Notion systems, then run them like an Executive VA.', img: profile.hero.portraitSrc },
] as const

export function HomeExplore() {
  return (
    <>
      <div className="hsec">
        <h2 className="hsec__title">Explore</h2>
        <span className="hsec__aside">Swipe</span>
      </div>
      <ul className="htiles" role="list">
        {TILES.map((t) => (
          <li key={t.to}>
            <Link to={t.to} className={`htile${'dark' in t && t.dark ? ' htile--dark' : ''}${'accent' in t && t.accent ? ' htile--accent' : ''}`}>
              <span className="htile__n">{t.n} {t.label}</span>
              {'img' in t ? (
                <img className="htile__img" src={t.img} alt="" loading="lazy" />
              ) : (
                <span className="htile__glyph"><t.Icon size={52} weight="duotone" aria-hidden="true" /></span>
              )}
              <span className="htile__body">
                <span className="htile__title">{t.title}</span>
                <span className="htile__desc">{t.desc}</span>
              </span>
              <span className="htile__go" aria-hidden="true"><ArrowUpRight size={16} weight="bold" /></span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="hsec">
        <h2 className="hsec__title">What clients say</h2>
        <Link to="/testimonials" className="hsec__aside">See all</Link>
      </div>
      <Link to="/testimonials" className="hproof">
        <span className="hproof__thumb hproof__thumb--quote">
          <Quotes size={30} weight="fill" aria-hidden="true" />
        </span>
        <span className="hproof__copy">
          <span className="hproof__kicker">LinkedIn recommendation</span>
          <span className="hproof__title">"...particularly for Notion and systems organisation."</span>
          <span className="hproof__meta">Kallista Cox, Business Manager, SheBuild Consulting</span>
        </span>
      </Link>
    </>
  )
}
