import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, CalendarBlank } from '@/components/slab'
import { BOOKING_URL } from '@/data/profile'
import ZoomFigure from '@/components/ZoomFigure'

/**
 * The meeting to action tracker case study (sample build, 11 Oct 2026).
 * Same layout as RetreatPlannerCase.tsx; every figure opens full size.
 *
 * Section text is word for word from the EA chat's website brief (11 Oct), which
 * is taken from the sheet's "Start here" tab. "How to run" is word for word from
 * the live sheet's Start here tab (read 11 Oct). Change the sheet first, then this file.
 * A demonstration build for a fictional company: say so, never imply a client.
 * Images in public/case/meeting-tracker/ are crops of his PDF exports of real runs.
 */

const SHEET_URL =
  'https://docs.google.com/spreadsheets/d/1BENIDYpwvCwnBQ7GrTzh5CzBAcDqKUdw6lHag4QsTTo/edit?usp=sharing'
const IMG = '/case/meeting-tracker/'

const STATS = [
  { value: '11 → 0', label: 'planted problems, found and fixed in two rounds' },
  { value: '15 of 16', label: 'actions logged the same day as their meeting' },
  { value: '08:30', label: 'morning brief ready to paste into Slack (CET)' },
  { value: '2', label: `slips in the weekly roll-up, each with the owner's reason` },
]

const FACTS = [
  { k: 'Client', v: 'Lunea Skin (fictional)' },
  { k: 'Type', v: 'Demonstration build, real runs' },
  { k: 'Year', v: '2026' },
  { k: 'Timeline', v: 'Built October 2026' },
]
const SERVICES = ['Meeting follow-up', 'Task tracking', 'Failure documentation']
const TOOLS = ['Google Sheets', 'Apps Script (one-time setup)']

const SECTIONS = [
  { id: 'cs-does', n: '01', t: 'What this system does' },
  { id: 'cs-why', n: '02', t: 'Why this setup works' },
  { id: 'cs-outcome', n: '03', t: 'Outcome' },
  { id: 'cs-run', n: '04', t: 'How to run this system' },
  { id: 'cs-breaks', n: '05', t: 'Break modes' },
]

const WHY = [
  `Each action points back to the meeting it came from (Meeting ID), so anyone can trace why it exists.`,
  `Nothing is typed twice. Meeting date, due date, days left, the list and the message are all formulas.`,
  `The owner dropdown comes from one team list, so per-person counts stay right.`,
  `A written status or a new date is the only thing that clears an overdue flag. A tick does not.`,
]

const RUN = [
  `After every meeting, the same day: add the meeting on Meetings (ID, date, name, chair). Then add one row per commitment on Actions: Meeting ID, action, owner, due date, definition of done, status Not started, Logged on = today.`,
  `Every morning: on Check, set the review date (in real use it is =TODAY()). If Problems found is above 0, fix every row listed under FIX until it reads 0.`,
  `Open Chase list. Send each message in Slack, top to bottom: overdue first, then blocked, then due within 2 days.`,
  `When someone replies, paste their words into Written status, put the date in Status dated, and the new date in New due date if they gave one. Never change the original Due date.`,
  `When an action is finished and meets its definition of done, set Status to Done.`,
  `Before any call in the next 2 days: send the agenda, make the notes page, then set both to Yes on Meetings.`,
  `Friday: read Owners. Anyone with 2 or more overdue goes on the weekly review agenda.`,
]

const BREAKS = [
  { t: `An action with no owner.`, g: `Check flags "No owner"; the message column says "Assign an owner before chasing."` },
  { t: `A name typed slightly wrong ("Tomas" for "Tomás Rivera").`, g: `the dropdown warns, and Check flags "Owner not on the team list".` },
  { t: `No due date.`, g: `Check flags "No due date".` },
  { t: `A wrong date (2025 typed for 2026).`, g: `Check flags "Due date is before the meeting".` },
  { t: `No definition of done.`, g: `Check flags "No definition of done".` },
  { t: `A typo in the Meeting ID ("M-5").`, g: `Check flags "Meeting ID not found".` },
  { t: `Overdue and nobody asked.`, g: `flagged until a written status dated on or after the due date, or a new date, is entered.` },
  { t: `A call tomorrow with no agenda.`, g: `Check flags any call in the next 2 days without an agenda sent.` },
  { t: `Marked Done but never dated.`, g: `Check flags "Done with no status date".` },
  { t: `A new due date with no reason.`, g: `Check flags "New due date with no written reason".` },
  { t: `A status dated in the future.`, g: `Check flags "Status dated in the future".` },
]

const LIMITS = [
  `The sheet writes the chase messages. A person sends them; it does not post to Slack by itself.`,
  `Same-day logging is measured, not blocked (15 of 16 in the test).`,
  `A new team member must be added on Owners before getting an action.`,
]

export default function MeetingTrackerCase() {
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
        <Link to="/projects" className="cs__back">
          <ArrowLeft size={14} weight="bold" aria-hidden="true" />
          All projects
        </Link>
        <span className="pgrid__eyebrow">Case study · Sample build · 2026</span>
        <h1 className="pgrid__title" id="cs-title">
          Every commitment owned, dated and chased before it slips.
        </h1>
        <p className="pgrid__lede">
          Sample build by Francis Devis. Fictional company and people. A working system built to show how meetings turn
          into owned, dated tasks and how owners get chased before deadlines, not after.
        </p>
      </header>

      {/* data-lenis-prevent: this box scrolls by itself (same as Projects). */}
      <div className="home__glass pgrid__glass pgrid__glass--scroll cs__box" data-lenis-prevent>
        <ul className="cs__stats" role="list">
          {STATS.map((s) => (
            <li key={s.label}>
              <span className="cs__stat-v">{s.value}</span>
              <span className="cs__stat-l">{s.label}</span>
            </li>
          ))}
        </ul>

        <div className="cs__body">
          <aside className="cs__side" aria-label="Project facts">
            <dl className="cs__facts">
              {FACTS.map((f) => (
                <div key={f.k}>
                  <dt>{f.k}</dt>
                  <dd>{f.v}</dd>
                </div>
              ))}
              <div>
                <dt>Services</dt>
                <dd className="cs__chips">
                  {SERVICES.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </dd>
              </div>
              <div>
                <dt>Tools</dt>
                <dd className="cs__chips">
                  {TOOLS.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </dd>
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
            <a className="cs__notion" href={SHEET_URL} target="_blank" rel="noopener noreferrer">
              Open the live sheet
              <ArrowUpRight size={13} weight="bold" aria-hidden="true" />
            </a>
          </aside>

          <article className="cs__main">
            <section id="cs-does" className="cs__sec">
              <span className="cs__n">01</span>
              <h2>What this system does</h2>
              <p>
                Every meeting gets one row on Meetings. Every commitment made in it becomes one row on Actions the same
                day: an owner, a due date and a definition of done. The sheet works out what is overdue, what is blocked
                and what is due in the next 2 days, and writes the chase message for each person. Check counts every
                broken rule and lists the fix. Two more tabs turn the same rows into a morning brief and a weekly roll-up.
              </p>
              <div className="cs__pair">
                <ZoomFigure
                  src={IMG + 'check-before.jpg'}
                  alt="Check on Wed 14 Oct 2026: 8 problems found, including no owner, a due date before the meeting and a meeting ID not found"
                  caption="BEFORE · Check found 8 problems: missing owner, wrong date, a typo in a meeting ID"
                />
                <ZoomFigure
                  src={IMG + 'check-after.jpg'}
                  alt="Check after the 8 fixes: 0 problems found, nothing to fix"
                  caption="AFTER · 0 problems"
                />
              </div>
            </section>

            <section id="cs-why" className="cs__sec">
              <span className="cs__n">02</span>
              <h2>Why this setup works</h2>
              <ul className="cs__list">
                {WHY.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
              <ZoomFigure
                src={IMG + 'actions-before.jpg'}
                alt="Actions tab: 16 actions with owner, due date, definition of done, written status, a Check result and a message for each row"
                caption="Actions tab: empty required cells turn red, every row gets a Check result"
              />
              <ZoomFigure
                src={IMG + 'owners-before.jpg'}
                alt="Owners tab: open, overdue, blocked, due and done per person, with 1 action whose owner is not on the list"
                caption="Owners: a misspelled name hides open work, so the sheet counts it separately"
              />
            </section>

            <section id="cs-outcome" className="cs__sec">
              <span className="cs__n">03</span>
              <h2>Outcome</h2>
              <p>
                The COO opens one tab in the morning and sees who owes what, what slipped and what is about to. The chase
                messages are ready before 10:00. The Slack brief is ready at 08:30. Friday reviews start from the roll-up
                instead of from memory.
              </p>
              <ZoomFigure
                src={IMG + 'chase-after.jpg'}
                alt="Daily chase list for Wednesday 14 October 2026: overdue, blocked and due within 2 days, each with a message to send"
                caption="The daily chase list: overdue first, then blocked, then due within 2 days, each with a message ready to send"
              />
              <ZoomFigure
                src={IMG + 'brief-daily-after.jpg'}
                alt="Morning brief for Wednesday 14 October 2026: done since yesterday 1, overdue 1, blocked 1, due within 2 days 7, calls 1, and a Slack box"
                caption="Morning brief: five numbers and a ready-to-paste Slack message"
              />
              <ZoomFigure
                src={IMG + 'brief-weekly-after.jpg'}
                alt="Weekly roll-up for Mon 12 to Sun 18 Oct 2026: logged, done, slipped, overdue and open per person, and 2 slips with reasons"
                caption="Weekly roll-up: logged, done, slipped and overdue per person, with each slip's reason"
              />
            </section>

            <section id="cs-run" className="cs__sec">
              <span className="cs__n">04</span>
              <h2>How to run this system (10 minutes a day)</h2>
              <ol className="cs__list">
                {RUN.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ol>
              <p>
                Daily brief: 08:30 CET every weekday, open Daily brief, check the five numbers, copy the grey box into
                Slack. Friday, open Weekly roll-up before the review meeting and read the Slipped list out loud.
              </p>
              <p>
                Grey headers are formulas. Do not type in them. Navy headers are yours to fill. Teal headers hold the
                owner&rsquo;s reply.
              </p>
            </section>

            <section id="cs-breaks" className="cs__sec">
              <span className="cs__n">05</span>
              <h2>Break modes and the guard on each</h2>
              <ol className="cs__breaks">
                {BREAKS.map((b, i) => (
                  <li key={i}>
                    <p className="cs__break-t">
                      <span>{i + 1}</span>
                      {b.t}
                    </p>
                    <p className="cs__break-g">
                      <strong>Guard:</strong> {b.g}
                    </p>
                  </li>
                ))}
              </ol>
              <div className="cs__limit">
                <strong>Known limits:</strong>
                <ul className="cs__list">
                  {LIMITS.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              </div>
              <p>
                <strong>Test, review date Wed 14 Oct 2026.</strong> Round 1: 8 problems planted → 0 after 8 fixes. Round 2
                (brief and roll-up): 3 more planted → 0. &ldquo;Done since yesterday&rdquo; 0 → 1; the roll-up shows 2
                slips, each with the owner&rsquo;s reason.
              </p>
              <div className="cs__pair">
                <ZoomFigure
                  src={IMG + 'brief-check-before.jpg'}
                  alt="Round 2 check: 3 problems, a status dated in the future, Done with no status date and a new due date with no written reason"
                  caption="Round 2 BEFORE · 3 more problems: undated Done, a new date with no reason, a status dated in the future"
                />
                <ZoomFigure
                  src={IMG + 'brief-check-after.jpg'}
                  alt="Round 2 check after the 3 fixes: 0 problems found"
                  caption="Round 2 AFTER · 0 problems"
                />
              </div>
            </section>

            <div className="cs__cta">
              <p>Want every meeting to end with owners, dates and a chase list?</p>
              <a className="cs__book" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                <CalendarBlank size={16} weight="bold" aria-hidden="true" />
                Book a call
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
