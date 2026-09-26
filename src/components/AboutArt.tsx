/**
 * AboutArt - the illustration in the About panel, in place of a photo.
 *
 * Three things, weighted the way the work is:
 *   big      a workspace board with one broken link, and the magnifier that
 *            catches it (Notion systems, and the break-finding signature)
 *   middle   form -> database -> review -> draft: the lead catcher that ran,
 *            with a person checking before anything is sent (AI automation)
 *   small    a calendar and an inbox at zero (executive support)
 *
 * Every colour is a site token (see .art-* in francis.css), so the drawing
 * flips with light and dark mode. Decorative: the page text says the same.
 */
export default function AboutArt() {
  return (
    <svg className="art" viewBox="0 0 480 560" role="img" aria-label="Illustration: a workspace board with a broken link caught by a magnifying glass, an automation chain with a human review step, and a calendar and empty inbox">
      <defs>
        <radialGradient id="art-glow" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#FF7A1A" stopOpacity="0.22" />
          <stop offset="60%" stopColor="#6C8CFF" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#6C8CFF" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="240" cy="270" rx="240" ry="250" fill="url(#art-glow)" />

      {/* ---------- EVA, small: calendar + inbox at zero ---------- */}
      <g className="art-float art-float--slow">
        <rect className="art-card" x="352" y="26" width="100" height="92" rx="16" />
        <rect className="art-accent" x="352" y="26" width="100" height="22" rx="16" />
        <rect className="art-accent" x="352" y="38" width="100" height="10" />
        {[0, 1, 2, 3].map((c) =>
          [0, 1, 2].map((r) => (
            <rect key={`${c}-${r}`} className="art-line" x={366 + c * 20} y={60 + r * 16} width="12" height="9" rx="3" />
          )),
        )}
        <circle className="art-ok" cx="412" cy="81" r="8" />
        <path className="art-tick" d="M408 81l3 3 5-6" />
      </g>
      <g className="art-float">
        <rect className="art-card" x="384" y="132" width="78" height="58" rx="14" />
        <path className="art-stroke" d="M398 148h50v30h-50z M398 148l25 17 25-17" />
        <circle className="art-ok" cx="458" cy="136" r="12" />
        <text className="art-badge" x="458" y="140.5" textAnchor="middle">0</text>
      </g>

      {/* ---------- Notion, big: the board ---------- */}
      <g>
        <rect className="art-card art-shadow" x="28" y="92" width="340" height="262" rx="20" />
        <circle className="art-dot" cx="50" cy="114" r="4.5" />
        <circle className="art-dot" cx="64" cy="114" r="4.5" />
        <circle className="art-dot" cx="78" cy="114" r="4.5" />
        <line className="art-hair" x1="28" y1="130" x2="368" y2="130" />
        {/* sidebar */}
        <line className="art-hair" x1="104" y1="130" x2="104" y2="354" />
        {[150, 170, 190, 210].map((y, i) => (
          <rect key={y} className={i === 1 ? 'art-accent-soft' : 'art-line'} x="42" y={y} width={i === 1 ? 50 : 44} height="8" rx="4" />
        ))}
        {/* three columns of cards */}
        {[118, 200, 282].map((x, col) =>
          [146, 214, 282].map((y, row) => {
            const broken = col === 1 && row === 1
            return (
              <g key={`${x}-${y}`}>
                <rect className={broken ? 'art-card art-broken' : 'art-card art-cell'} x={x} y={y} width="72" height="56" rx="10" />
                {!broken && <rect className={['art-blue', 'art-accent', 'art-green'][col]} x={x + 8} y={y + 9} width="24" height="6" rx="3" />}
                {!broken && <rect className="art-line" x={x + 8} y={y + 22} width="54" height="6" rx="3" />}
                {!broken && <rect className="art-line" x={x + 8} y={y + 34} width="38" height="6" rx="3" />}
              </g>
            )
          }),
        )}
        {/* the broken link inside the faulty card */}
        <path className="art-err-stroke" d="M221 244a9 9 0 0 1 0-13l6-6a9 9 0 0 1 13 0 M251 238a9 9 0 0 1 0 13l-6 6a9 9 0 0 1-13 0" />
        <path className="art-err-stroke art-thin" d="M234 229l2-6 M238 231l5-4 M232 253l-2 6 M228 251l-5 4" />
      </g>

      {/* the magnifier that catches it */}
      <g className="art-float art-float--glass">
        <line className="art-handle" x1="266" y1="276" x2="306" y2="318" />
        <circle className="art-lens" cx="236" cy="244" r="44" />
        <circle className="art-lens-ring" cx="236" cy="244" r="44" />
      </g>

      {/* ---------- AI automation, middle: form -> database -> review -> draft ---------- */}
      <g>
        <path className="art-flow" d="M86 452H406" />
        {[
          { x: 38, label: 'Form' },
          { x: 142, label: 'Database' },
          { x: 246, label: 'Review' },
          { x: 350, label: 'Draft' },
        ].map(({ x, label }) => (
          <g key={label}>
            <rect className={label === 'Review' ? 'art-card art-review' : 'art-card'} x={x} y="420" width="64" height="64" rx="16" />
            <text className="art-label" x={x + 32} y="506" textAnchor="middle">{label}</text>
          </g>
        ))}
        {/* form: lines + a ticked box */}
        <rect className="art-line" x="50" y="436" width="40" height="6" rx="3" />
        <rect className="art-line" x="50" y="448" width="30" height="6" rx="3" />
        <rect className="art-stroke-box" x="50" y="461" width="11" height="11" rx="3" />
        <path className="art-tick art-tick--blue" d="M52 466l2.5 2.5 4.5-5" />
        {/* database: a cylinder */}
        <ellipse className="art-stroke" cx="174" cy="440" rx="16" ry="5" />
        <path className="art-stroke" d="M158 440v24c0 3 7 5 16 5s16-2 16-5v-24 M158 452c0 3 7 5 16 5s16-2 16-5" />
        {/* review: a person, with a tick - nothing sends without it */}
        <circle className="art-person" cx="278" cy="443" r="8" />
        <path className="art-person" d="M263 470c0-9 7-14 15-14s15 5 15 14z" />
        <circle className="art-ok" cx="297" cy="428" r="9" />
        <path className="art-tick" d="M293 428l3 3 5-6" />
        {/* draft: an envelope */}
        <path className="art-stroke" d="M364 440h36v26h-36z M364 440l18 13 18-13" />
      </g>

      {/* sparkles */}
      <path className="art-spark" d="M60 52l4 10 10 4-10 4-4 10-4-10-10-4 10-4z" />
      <path className="art-spark art-spark--small" d="M330 384l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" />
    </svg>
  )
}
