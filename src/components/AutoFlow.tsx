import { Textbox, ShieldCheck, CopySimple, Table, EnvelopeSimple, BellRinging, Warning } from '@/components/slab'

/**
 * AutoFlow - the Automation lane's header: the live lead catcher (v2) drawn as
 * a run. Six real steps, a dot travelling the cable, and the failure branch.
 * Step names come from the v2 case study; change them there first.
 * Pure CSS motion (francis.css, "Automation lane: the flow line").
 */
const STEPS = [
  { label: 'Website form', Icon: Textbox },
  { label: 'Bot check', Icon: ShieldCheck },
  { label: 'Duplicate check', Icon: CopySimple },
  { label: 'Lead saved to the sheet', Icon: Table },
  { label: 'Reply drafted for me to send', Icon: EnvelopeSimple },
  { label: 'New-lead ping', Icon: BellRinging },
] as const

export default function AutoFlow() {
  return (
    <figure className="aflow" aria-label="How the live lead catcher runs: website form, bot check, duplicate check, lead saved to the sheet, reply drafted for me to send, new-lead ping. If a step fails, it is logged and an alert email reaches me.">
      <figcaption className="aflow__cap">
        <span className="aflow__live" aria-hidden="true" />
        Running on this site’s contact form
      </figcaption>
      <ol className="aflow__steps" role="list">
        <span className="aflow__cable" aria-hidden="true"><span className="aflow__dot" /></span>
        {STEPS.map(({ label, Icon }, i) => (
          <li key={label} className="aflow__step" style={{ ['--i' as string]: i }}>
            <span className="aflow__node"><Icon size={20} weight="duotone" aria-hidden="true" /></span>
            <span className="aflow__label">{label}</span>
          </li>
        ))}
      </ol>
      <p className="aflow__fail">
        <Warning size={16} weight="fill" aria-hidden="true" />
        If a step fails: logged, and an alert email reaches me with the lead inside.
      </p>
    </figure>
  )
}

/** The lane's backdrop: faint cables on the dotted canvas, behind the cards. Decorative only. */
export function AutoCanvas() {
  return (
    <svg className="autolane__cables" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 30 C 22 30, 26 62, 50 62 S 78 38, 100 38" />
      <path d="M0 78 C 24 78, 30 50, 52 50 S 80 84, 100 84" />
    </svg>
  )
}
