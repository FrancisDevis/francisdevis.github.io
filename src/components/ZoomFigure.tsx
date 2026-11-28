import { useRef, useState } from 'react'

/**
 * A case-study figure that opens full size in a popup when tapped (7 Oct 2026).
 * Same popup look as the Executive support cards (.eadlg in francis.css).
 * On a phone the popup image keeps a readable minimum width and scrolls sideways
 * inside the popup, so wide calendar and sheet screenshots stay legible.
 * 28 Nov 2026 (his pick): on a phone the popup opens with the whole picture fitted to the
 * screen, like the Executive support popups; tapping the picture (or the chip) switches to
 * the readable zoom (900 px, swipe sideways) and back. Only wide pictures (1.6 : 1 or wider)
 * get the switch: a near-square one is already readable fitted. Laptop is unchanged (no chip).
 */
export default function ZoomFigure({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  const dlg = useRef<HTMLDialogElement>(null)
  const [zoomed, setZoomed] = useState(false)
  const [wide, setWide] = useState(false)
  const toggle = () => wide && setZoomed((z) => !z)
  return (
    <figure className="cs__fig cs__fig--zoom">
      <button type="button" className="cs__zoom" onClick={() => dlg.current?.showModal()} aria-label={`Open full size: ${caption}`}>
        <img src={src} alt={alt} loading="lazy" />
        <span className="cs__zoom-hint">Open full size</span>
      </button>
      <figcaption>{caption}</figcaption>
      <dialog
        ref={dlg}
        className={`eadlg eadlg--zoom${zoomed ? ' is-zoomed' : ''}`}
        data-lenis-prevent
        onClick={(e) => e.target === dlg.current && dlg.current?.close()}
        onClose={() => setZoomed(false)}
      >
        <figure className="eadlg__fig">
          <div className="eadlg__scroll">
            <img
              src={src}
              alt={alt}
              onClick={toggle}
              onLoad={(e) => setWide(e.currentTarget.naturalWidth / e.currentTarget.naturalHeight >= 1.6)}
            />
          </div>
          {wide && (
            <button type="button" className="eadlg__zoomchip" onClick={toggle} aria-pressed={zoomed}>
              {zoomed ? 'Tap to fit' : 'Tap to zoom'}
            </button>
          )}
          <figcaption>
            <span>{caption}</span>
          </figcaption>
        </figure>
        <button type="button" className="eadlg__close" onClick={() => dlg.current?.close()} aria-label="Close">
          Close
        </button>
      </dialog>
    </figure>
  )
}
