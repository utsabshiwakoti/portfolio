import { useEffect, useState } from 'react'

// A real request to my StatDay API, shown as a terminal. The API runs on a free host that sleeps
// when idle, so the first request can take a while: the card says so, and falls back to a sample
// response (clearly labelled) if the server doesn't answer in time.
const URL = 'https://statday.onrender.com/v1/regions/NS/holidays/next'
const TIMEOUT_MS = 60000
const SAMPLE = { name: 'Christmas Day', date: '2026-12-25', weekday: 'Friday' }

const daysUntil = (isoDate) => {
  const [y, m, d] = isoDate.split('-').map(Number)
  const today = new Date()
  return Math.round((Date.UTC(y, m - 1, d) - Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())) / 86400000)
}

export default function LiveApi() {
  const [state, setState] = useState({ status: 'loading' })

  useEffect(() => {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
    const started = performance.now()
    fetch(URL, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(res.status))))
      .then((body) => {
        const h = body.data[0]
        setState({
          status: 'live',
          holiday: { name: h.name, date: h.observed_date, weekday: h.weekday },
          ms: Math.round(performance.now() - started),
        })
      })
      .catch(() => { if (!controller.signal.aborted || performance.now() - started >= TIMEOUT_MS) setState({ status: 'sample', holiday: SAMPLE }) })
      .finally(() => clearTimeout(timer))
    return () => { clearTimeout(timer); controller.abort() }
  }, [])

  const { status, holiday, ms } = state
  const days = holiday ? daysUntil(holiday.date) : null
  return (
    <aside className="terminal" aria-label="Live request to my StatDay API">
      <div className="terminal-bar">
        <i /><i /><i />
        <span>statday api</span>
        <span className={`terminal-status ${status}`}>
          {status === 'live' ? `200 OK · ${ms} ms` : status === 'loading' ? 'requesting' : 'sample'}
        </span>
      </div>
      <pre className="terminal-body" aria-live="polite">
        <span className="t-dim">$</span> curl {URL.replace('https://', '')}{'\n\n'}
        {status === 'loading' ? (
          <span className="t-dim">waking the server (free hosting sleeps when idle)<span className="cursor">▍</span></span>
        ) : (
          <>
            {'{\n'}
            {'  '}<span className="t-key">"name"</span>: <span className="t-str">"{holiday.name}"</span>,{'\n'}
            {'  '}<span className="t-key">"date"</span>: <span className="t-str">"{holiday.date}"</span>,{'\n'}
            {'  '}<span className="t-key">"weekday"</span>: <span className="t-str">"{holiday.weekday}"</span>{'\n'}
            {'}'}
          </>
        )}
      </pre>
      <p className="terminal-note">
        {status === 'loading' && 'Asking my own API for the next holiday in Nova Scotia.'}
        {status === 'live' && <>Next holiday in Nova Scotia: <strong>{holiday.name}</strong>{days > 0 ? `, in ${days} day${days === 1 ? '' : 's'}` : days === 0 ? ', today' : ''}. Fetched just now from my <a href="https://statday.onrender.com">StatDay API</a>.</>}
        {status === 'sample' && <>The server didn't answer in time, so this is a sample response. Try the <a href="https://statday.onrender.com/docs">API docs</a>.</>}
      </p>
    </aside>
  )
}
