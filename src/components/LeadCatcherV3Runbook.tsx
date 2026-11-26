import { Link } from 'react-router-dom'
import { ArrowLeft } from '@/components/slab'
import usePageTitle from '@/hooks/usePageTitle'

/**
 * The public runbook for the v3 lead catcher (n8n + Gemini, 26 Nov 2026).
 * Same layout as LeadCatcherV2Runbook.tsx, without stats or figures.
 *
 * Every line of text is WORD FOR WORD from the Automation chat's text, approved by him
 * 26 Nov 2026. Change it there first, then here. Claude's own words: the eyebrow, the
 * sidebar label and its three lines (taken from the steps below), the back link.
 */

const ACCESS = ['The Leads Google Sheet', 'Gmail: the inbox and Drafts', 'n8n: Executions and Credentials']

const SECTIONS = [
  { id: 'rb-day', n: '01', t: 'Every day' },
  { id: 'rb-alert', n: '02', t: 'When an alert arrives' },
  { id: 'rb-week', n: '03', t: 'Every week' },
  { id: 'rb-rules', n: '04', t: 'Rules' },
  { id: 'rb-test', n: '05', t: 'Testing safely' },
  { id: 'rb-limits', n: '06', t: 'Limits' },
]

const BLOCKS: { id: string; n: string; h: string; ordered: boolean; items: string[] }[] = [
  {
    id: 'rb-day',
    n: '01',
    h: 'Every day',
    ordered: true,
    items: [
      'Open the Leads sheet. Read every Hot and Needs you lead first.',
      'Open Gmail Drafts. Read each reply, adjust it, and send it within one business day.',
      'Change the lead’s Status to Replied, Spam or Not a fit.',
    ],
  },
  {
    id: 'rb-alert',
    n: '02',
    h: 'When an alert arrives (“AI step failed”)',
    ordered: true,
    items: [
      'The lead is already in the sheet, labelled Needs you, with no reply draft.',
      'Read the message in the alert, choose the right label yourself, and reply by hand.',
      'If several alerts arrive in a row, the AI step is down. Check the AI provider’s status page and the key in n8n’s credentials.',
    ],
  },
  {
    id: 'rb-week',
    n: '03',
    h: 'Every week',
    ordered: true,
    items: [
      'Open n8n, then Executions, and look for any red runs.',
      'Reconnect the Google login if n8n asks (a Google app in Testing mode signs out after 7 days).',
    ],
  },
  {
    id: 'rb-rules',
    n: '04',
    h: 'Rules',
    ordered: false,
    items: [
      'Never let the system send to a lead by itself. It only writes drafts.',
      'After adding or moving a sheet column, check every dropdown and refresh the Save step’s columns.',
      'After copying a step, open every field and re-point it.',
      'Use made-up test leads only on the free AI tier. Real client data needs a paid key.',
    ],
  },
  {
    id: 'rb-test',
    n: '05',
    h: 'Testing safely',
    ordered: false,
    items: [
      'Use example.com addresses. Never send a test draft.',
      'To test the failure road: change the AI model name to a fake one without saving, send one lead, check the sheet and inbox, then put the real name back and save.',
    ],
  },
  {
    id: 'rb-limits',
    n: '06',
    h: 'Limits',
    ordered: false,
    items: [
      'It runs only while the computer and n8n are on.',
      'If Google itself is down, the sheet and the alert email fail too. That case is not covered yet.',
      'The AI can still pick the wrong label. Unclear messages go to Needs you, but a clear-sounding message can be mislabelled, so read before you reply.',
    ],
  },
]

export default function LeadCatcherV3Runbook() {
  usePageTitle('Runbook: AI lead sorter in n8n (sample) · Francis Rowenn Devis')

  const jump = (id: string) => {
    const el = document.getElementById(id)
    const box = document.querySelector<HTMLElement>('.cs__box')
    if (!el) return
    if (box && box.scrollHeight > box.clientHeight) {
      box.scrollTo({ top: box.scrollTop + el.getBoundingClientRect().top - box.getBoundingClientRect().top - 8, behavior: 'smooth' })
    } else {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section className="pgrid cs" aria-labelledby="cs-title">
      <header className="pgrid__head">
        <Link to="/projects/lead-catcher-v3" className="cs__back">
          <ArrowLeft size={14} weight="bold" aria-hidden="true" />
          Back to the case study
        </Link>
        <span className="pgrid__eyebrow">Runbook · Sample build · n8n · Gemini · Google Sheets · Gmail</span>
        <h1 className="pgrid__title" id="cs-title">
          How to run this system (v3 lead catcher, n8n + Gemini)
        </h1>
      </header>

      {/* data-lenis-prevent: this box scrolls by itself (same as Projects). */}
      <div className="home__glass pgrid__glass pgrid__glass--scroll cs__box" data-lenis-prevent>
        <div className="cs__body">
          <aside className="cs__side" aria-label="What you need">
            <dl className="cs__facts">
              <div>
                <dt>You need access to</dt>
                {ACCESS.map((a) => (
                  <dd key={a}>{a}</dd>
                ))}
              </div>
            </dl>
            <nav className="cs__toc" aria-label="Sections">
              {SECTIONS.map((s) => (
                <button key={s.id} type="button" onClick={() => jump(s.id)}>
                  <span>{s.n}</span>
                  {s.t}
                </button>
              ))}
            </nav>
          </aside>

          <article className="cs__main">
            {BLOCKS.map((b) => {
              const List = b.ordered ? 'ol' : 'ul'
              return (
                <section key={b.id} id={b.id} className="cs__sec">
                  <span className="cs__n">{b.n}</span>
                  <h2>{b.h}</h2>
                  <List className="cs__list">
                    {b.items.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </List>
                </section>
              )
            })}
          </article>
        </div>
      </div>
    </section>
  )
}
