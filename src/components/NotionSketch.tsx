/**
 * Notion lane sketch (21 Nov): hand-drawn databases that talk to each other.
 * Original drawing for this site (not Notion artwork). The labels are generic
 * database names, not any client's.
 */
type Card = { x: number; y: number; label: string; icon: 'person' | 'folder' | 'check' | 'coin' | 'list' }
type Link = [number, number, number, number, number, number] // from x,y · bend x,y · to x,y

const W_CARDS: Card[] = [
  { x: 24, y: 46, label: 'Clients', icon: 'person' },
  { x: 262, y: 108, label: 'Projects', icon: 'folder' },
  { x: 500, y: 18, label: 'Tasks', icon: 'check' },
  { x: 520, y: 128, label: 'Invoices', icon: 'coin' },
  { x: 770, y: 70, label: 'SOPs', icon: 'list' },
]
const W_LINKS: Link[] = [
  [176, 96, 220, 150, 262, 150],
  [414, 140, 460, 70, 500, 62],
  [414, 162, 470, 176, 520, 170],
  [652, 64, 720, 80, 770, 108],
  [672, 172, 730, 150, 770, 126],
]

const T_CARDS: Card[] = [
  { x: 14, y: 14, label: 'Clients', icon: 'person' },
  { x: 196, y: 14, label: 'Projects', icon: 'folder' },
  { x: 14, y: 140, label: 'Tasks', icon: 'check' },
  { x: 196, y: 140, label: 'Invoices', icon: 'coin' },
  { x: 105, y: 262, label: 'SOPs', icon: 'list' },
]
const T_LINKS: Link[] = [
  [166, 58, 182, 48, 196, 58],
  [250, 106, 200, 130, 140, 140],
  [272, 106, 276, 124, 272, 140],
  [90, 232, 110, 252, 140, 262],
  [272, 232, 256, 252, 230, 262],
]

const CW = 152
const CH = 92

function Icon({ kind, x, y }: { kind: Card['icon']; x: number; y: number }) {
  switch (kind) {
    case 'person':
      return (
        <g transform={`translate(${x} ${y})`}>
          <circle cx="12" cy="9" r="6" />
          <path d="M1 28c2-8 7-11 11-11s9 3 11 11" />
        </g>
      )
    case 'folder':
      return <path transform={`translate(${x} ${y})`} d="M1 8h9l3 4h14v15H1z" />
    case 'check':
      return (
        <g transform={`translate(${x} ${y})`}>
          <rect x="1" y="2" width="9" height="9" rx="1.5" />
          <path d="M3 6.5l2 2 4-5" />
          <rect x="1" y="17" width="9" height="9" rx="1.5" />
        </g>
      )
    case 'coin':
      return (
        <g transform={`translate(${x} ${y})`}>
          <circle cx="13" cy="14" r="12" />
          <path d="M17 9c-1-2-7-2-8 1s8 3 8 6-6 4-8 1M13 6v16" />
        </g>
      )
    default:
      return (
        <g transform={`translate(${x} ${y})`}>
          <path d="M1 5h3M1 14h3M1 23h3" />
          <path d="M9 5h16M9 14h13M9 23h15" />
        </g>
      )
  }
}

function Sketch({ cards, links, vb, id }: { cards: Card[]; links: Link[]; vb: string; id: string }) {
  return (
    <svg className={`nsketch__svg nsketch__svg--${id}`} viewBox={vb} role="img" aria-label="Sketch: Clients, Projects, Tasks, Invoices and SOPs databases, each linked to the next">
      <defs>
        <filter id={`wob-${id}`} x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7" />
          <feDisplacementMap in="SourceGraphic" scale="3" />
        </filter>
      </defs>
      <g className="nsketch__links" filter={`url(#wob-${id})`}>
        {links.map(([a, b, c, d, e, f], i) => (
          <g key={i}>
            <path d={`M${a} ${b}Q${c} ${d} ${e} ${f}`} />
            <circle cx={a} cy={b} r="3.5" />
            <circle cx={e} cy={f} r="3.5" />
          </g>
        ))}
      </g>
      {cards.map((c) => (
        <g key={c.label} className="nsketch__card">
          <g filter={`url(#wob-${id})`}>
            <rect className="nsketch__shadow" x={c.x + 5} y={c.y + 5} width={CW} height={CH} rx="6" />
            <rect className="nsketch__face" x={c.x} y={c.y} width={CW} height={CH} rx="6" />
            <g className="nsketch__ink">
              <Icon kind={c.icon} x={c.x + 14} y={c.y + 44} />
              <path d={`M${c.x + 54} ${c.y + 52}h80M${c.x + 54} ${c.y + 64}h62M${c.x + 54} ${c.y + 76}h72`} />
            </g>
          </g>
          <text className="nsketch__label" x={c.x + 14} y={c.y + 30}>
            {c.label}
          </text>
        </g>
      ))}
    </svg>
  )
}

export default function NotionSketch() {
  return (
    <figure className="nsketch" aria-hidden="false">
      <Sketch cards={W_CARDS} links={W_LINKS} vb="0 0 940 232" id="w" />
      <Sketch cards={T_CARDS} links={T_LINKS} vb="0 0 362 366" id="t" />
      <figcaption className="nsketch__cap">Every database linked to the next, so a record traces back to where it came from.</figcaption>
    </figure>
  )
}
