/**
 * EaBackdrop - the Executive support lane's backdrop: a faint week calendar
 * (five day columns, hour rows) and a "now" line that drifts down the lane the
 * way a calendar marks the current time. Decorative only: it claims nothing.
 * Styles in francis.css, "Executive support lane".
 */
export default function EaBackdrop() {
  return (
    <div className="ealane__cal" aria-hidden="true">
      <span className="ealane__now" />
    </div>
  )
}
