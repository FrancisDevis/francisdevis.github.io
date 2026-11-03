import { useEffect } from 'react'

/** Sets the browser tab title while a page is open, then restores the site title. */
export default function usePageTitle(title: string) {
  useEffect(() => {
    const before = document.title
    document.title = title
    return () => {
      document.title = before
    }
  }, [title])
}
