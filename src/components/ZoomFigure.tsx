import { useRef } from 'react'

/**
 * A case-study figure that opens full size in a popup when tapped (7 Oct 2026).
 * Same popup look as the Executive support cards (.eadlg in francis.css).
 * On a phone the popup image keeps a readable minimum width and scrolls sideways
 * inside the popup, so wide calendar and sheet screenshots stay legible.
 */
export default function ZoomFigure({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  const dlg = useRef<HTMLDialogElement>(null)
  return (
    <figure className="cs__fig cs__fig--zoom">
      <button type="button" className="cs__zoom" onClick={() => dlg.current?.showModal()} aria-label={`Open full size: ${caption}`}>
        <img src={src} alt={alt} loading="lazy" />
        <span className="cs__zoom-hint">Open full size</span>
      </button>
      <figcaption>{caption}</figcaption>
      <dialog
        ref={dlg}
        className="eadlg eadlg--zoom"
        data-lenis-prevent
        onClick={(e) => e.target === dlg.current && dlg.current?.close()}
      >
        <figure className="eadlg__fig">
          <div className="eadlg__scroll">
            <img src={src} alt={alt} />
          </div>
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
