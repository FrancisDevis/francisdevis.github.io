/**
 * AboutArt - the illustration in the About panel.
 *
 * A person at a desk (dark hair, dark blazer, light blue shirt, like the
 * headshot in the rail) with the three kinds of work floating around him:
 *   top left   inbox at zero       executive support for a founder
 *   top right  calendar            executive support
 *   centre     workspace board, one broken card caught by a magnifier
 *                                  Notion systems + the break-finding signature
 *   right      form -> database -> review -> draft
 *                                  the automation that ran, with a human check
 *
 * No client names, no industries, no NDA terms. Colours are site tokens
 * (.art-* in francis.css) so it flips with light and dark mode.
 */
export default function AboutArt() {
  return (
    <svg
      className="art"
      viewBox="0 0 480 560"
      role="img"
      aria-label="Illustration: a person working at a laptop, surrounded by an empty inbox, a calendar, a workspace board with a broken link caught by a magnifying glass, and an automation chain with a human review step"
    >
      <defs>
        <radialGradient id="art-glow" cx="50%" cy="48%" r="55%">
          <stop offset="0%" stopColor="#FF7A1A" stopOpacity="0.2" />
          <stop offset="60%" stopColor="#6C8CFF" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#6C8CFF" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="240" cy="290" rx="240" ry="260" fill="url(#art-glow)" />
      <ellipse className="art-floor" cx="250" cy="538" rx="200" ry="10" />

      {/* ---------- floating work: inbox at zero (EVA) ---------- */}
      <g className="art-float art-float--slow">
        <rect className="art-card" x="28" y="40" width="112" height="78" rx="16" />
        <path className="art-stroke" d="M52 62h56v36h-56z M52 62l28 20 28-20" />
        <circle className="art-ok" cx="132" cy="46" r="14" />
        <text className="art-badge" x="132" y="51" textAnchor="middle">0</text>
      </g>

      {/* ---------- floating work: calendar (EVA) ---------- */}
      <g className="art-float">
        <rect className="art-card" x="356" y="26" width="100" height="92" rx="16" />
        <rect className="art-accent" x="356" y="26" width="100" height="22" rx="16" />
        <rect className="art-accent" x="356" y="38" width="100" height="10" />
        {[0, 1, 2, 3].map((c) =>
          [0, 1, 2].map((r) => (
            <rect key={`${c}-${r}`} className="art-line" x={370 + c * 20} y={60 + r * 16} width="12" height="9" rx="3" />
          )),
        )}
        <circle className="art-ok" cx="416" cy="81" r="8" />
        <path className="art-tick" d="M412 81l3 3 5-6" />
      </g>

      {/* ---------- floating work: the workspace board, broken card caught (Notion) ---------- */}
      <g className="art-float art-float--board">
        <rect className="art-card art-shadow" x="162" y="58" width="176" height="126" rx="16" />
        <circle className="art-dot" cx="178" cy="72" r="3.5" />
        <circle className="art-dot" cx="189" cy="72" r="3.5" />
        <circle className="art-dot" cx="200" cy="72" r="3.5" />
        {[176, 228, 280].map((x, col) =>
          [86, 134].map((y, row) => {
            const broken = col === 1 && row === 1
            return (
              <g key={`${x}-${y}`}>
                <rect className={broken ? 'art-card art-broken' : 'art-card art-cell'} x={x} y={y} width="44" height="38" rx="7" />
                {!broken && <rect className={['art-blue', 'art-accent', 'art-green'][col]} x={x + 6} y={y + 7} width="16" height="5" rx="2.5" />}
                {!broken && <rect className="art-line" x={x + 6} y={y + 17} width="32" height="5" rx="2.5" />}
                {!broken && <rect className="art-line" x={x + 6} y={y + 26} width="22" height="5" rx="2.5" />}
              </g>
            )
          }),
        )}
        {/* the broken link */}
        <path className="art-err-stroke art-thin" d="M243 157a6 6 0 0 1 0-9l4-4a6 6 0 0 1 9 0 M262 153a6 6 0 0 1 0 9l-4 4a6 6 0 0 1-9 0" />
        {/* the magnifier that catches it */}
        <line className="art-handle art-handle--sm" x1="273" y1="172" x2="296" y2="196" />
        <circle className="art-lens" cx="251" cy="153" r="27" />
        <circle className="art-lens-ring art-lens-ring--sm" cx="251" cy="153" r="27" />
      </g>

      {/* ---------- floating work: form -> database -> review -> draft (automation) ---------- */}
      <g className="art-float art-float--chain">
        <path className="art-flow" d="M262 232H452" />
        {[244, 296, 348, 400].map((x, i) => (
          <rect key={x} className={i === 2 ? 'art-card art-review' : 'art-card'} x={x} y="214" width="38" height="38" rx="10" />
        ))}
        {/* form */}
        <rect className="art-line" x="251" y="223" width="22" height="4" rx="2" />
        <rect className="art-line" x="251" y="231" width="16" height="4" rx="2" />
        <rect className="art-stroke-box" x="251" y="239" width="7" height="7" rx="2" />
        {/* database */}
        <ellipse className="art-stroke art-stroke--sm" cx="315" cy="224" rx="9" ry="3" />
        <path className="art-stroke art-stroke--sm" d="M306 224v15c0 2 4 3 9 3s9-1 9-3v-15 M306 231c0 2 4 3 9 3s9-1 9-3" />
        {/* review: a person with a tick - nothing sends without it */}
        <circle className="art-person" cx="367" cy="227" r="5" />
        <path className="art-person" d="M358 244c0-6 4-9 9-9s9 3 9 9z" />
        <circle className="art-ok" cx="384" cy="216" r="7" />
        <path className="art-tick art-tick--sm" d="M381 216l2 2 4-4" />
        {/* draft */}
        <path className="art-stroke art-stroke--sm" d="M408 223h22v16h-22z M408 223l11 8 11-8" />
      </g>

      {/* ---------- the desk scene ---------- */}
      {/* chair */}
      <rect className="art-chair" x="78" y="300" width="22" height="118" rx="10" />
      <rect className="art-chair" x="84" y="404" width="112" height="16" rx="8" />
      <rect className="art-chair-dim" x="134" y="420" width="8" height="84" rx="4" />
      <path className="art-chair-dim" d="M98 512h80" strokeWidth="8" strokeLinecap="round" />

      {/* legs: thigh forward under the desk, shin down */}
      <path className="art-pants" d="M126 404h118a14 14 0 0 1 14 14v6H126z" />
      <rect className="art-pants" x="232" y="410" width="26" height="104" rx="12" />
      <path className="art-shoe" d="M226 506h40a12 12 0 0 1 12 12v4h-52z" />

      {/* torso: dark blazer over a light blue shirt */}
      <path className="art-blazer" d="M112 318c0-18 14-30 32-30h16c18 0 32 12 32 30l6 92H108z" />
      <path className="art-shirt" d="M140 288h24l-12 40z" />
      <path className="art-shirt-line" d="M152 300v52" />
      <path className="art-lapel" d="M140 288l12 40-18-24z M164 288l-12 40 18-24z" />

      {/* neck and head, facing right toward the laptop */}
      <rect className="art-skin" x="143" y="266" width="18" height="26" rx="6" />
      <circle className="art-skin" cx="154" cy="246" r="28" />
      <path className="art-hair" d="M126 250c-4-26 12-42 32-42 18 0 30 10 30 26-10-4-20-4-28 2-6 4-6 12-8 22l-10 2c-6 0-12-4-16-10z" />
      <path className="art-hair" d="M126 244c-2 14 2 26 8 32 2-8 2-18 0-26z" />
      <circle className="art-eye" cx="171" cy="247" r="2.6" />
      <path className="art-mouth" d="M168 262c3 2 7 2 10-1" />
      <ellipse className="art-skin-shade" cx="142" cy="250" rx="5" ry="7" />

      {/* arm reaching to the keyboard */}
      <path className="art-blazer" d="M170 306c14 4 24 26 36 58l-18 8c-10-24-20-40-26-50z" />
      <path className="art-blazer" d="M190 364l62 24-6 16-66-20z" />
      <circle className="art-skin" cx="256" cy="397" r="9" />

      {/* desk */}
      <rect className="art-desk" x="196" y="408" width="248" height="14" rx="6" />
      <rect className="art-desk-dim" x="420" y="422" width="10" height="110" rx="4" />

      {/* laptop, screen showing a workspace */}
      <rect className="art-card art-shadow" x="278" y="302" width="138" height="96" rx="10" />
      <rect className="art-screen" x="286" y="310" width="122" height="80" rx="6" />
      {[296, 336, 376].map((x, i) => (
        <g key={x}>
          <rect className={['art-blue', 'art-accent', 'art-green'][i]} x={x} y="320" width="22" height="5" rx="2.5" />
          <rect className="art-card art-cell" x={x - 2} y="330" width="30" height="22" rx="4" />
          <rect className="art-card art-cell" x={x - 2} y="356" width="30" height="22" rx="4" />
        </g>
      ))}
      <path className="art-laptop-base" d="M262 398h170l-8 10H270z" />

      {/* sparkles */}
      <path className="art-spark" d="M46 176l4 10 10 4-10 4-4 10-4-10-10-4 10-4z" />
      <path className="art-spark art-spark--small" d="M452 160l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" />
    </svg>
  )
}
