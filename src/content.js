// Everything the site says lives here, so wording changes never touch layout code.
// Empty contact fields are simply hidden.

export const site = {
  name: 'Utsab Shiwakoti',
  role: 'Junior full-stack developer',
  location: 'Halifax, Nova Scotia',
  availability: 'Open to junior developer roles, remote or hybrid, anywhere in Canada.',
  email: 'sutsab4321@gmail.com',
  linkedin: 'https://www.linkedin.com/in/utsab-shiwakoti',
  github: 'https://github.com/utsabshiwakoti',
}

export const intro = [
  'I build web applications end to end: Python and FastAPI on the back end, React on the front end, PostgreSQL underneath, and Docker and CI to ship them.',
  'I care about the parts that are easy to skip: tests for the tricky logic, errors that tell you what went wrong, and READMEs that explain why the code looks the way it does.',
]

export const projects = [
  {
    id: 'statday',
    name: 'StatDay',
    tagline: 'Public REST API for Canadian statutory holidays',
    image: 'projects/statday.webp',
    summary:
      'Holidays for every province and territory, the day off when one lands on a weekend, and business-day maths, behind an API built like a real public one.',
    highlights: [
      'Versioned API with optional self-serve keys, rate-limit headers, ETag caching, pagination and RFC 9457 errors',
      'Typed Python SDK generated from the OpenAPI spec; CI regenerates it and fails if it drifts',
      'Usage counted with an atomic Postgres upsert, tested with concurrent requests',
    ],
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'React', 'OpenAPI', 'Docker', 'GitHub Actions'],
    live: 'https://statday.onrender.com',
    code: 'https://github.com/utsabshiwakoti/statday',
  },
  {
    id: 'slotbook',
    name: 'SlotBook',
    tagline: 'Appointment booking for small businesses',
    image: 'projects/slotbook.webp',
    summary:
      'Any business gets its own booking page. Customers pick a service, staff member and time; owners manage hours, time off and bookings from a dashboard with stats.',
    highlights: [
      'Never double-books: row locks plus a Postgres exclusion constraint, proven by a test that fires 8 simultaneous bookings',
      'Time-zone and daylight-saving aware availability engine, unit-tested without a database',
      'Multi-tenant data isolation, emailed manage links stored as hashes, and a read-only demo login',
    ],
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'SQLAlchemy', 'React', 'Docker', 'GitHub Actions'],
    live: 'https://slotbook-n97p.onrender.com',
    code: 'https://github.com/utsabshiwakoti/slotbook',
  },
  {
    id: 'realtime-chat',
    name: 'Realtime Chat',
    tagline: 'Chat rooms and direct messages over WebSockets',
    image: 'projects/realtime-chat.webp',
    summary:
      'Multi-room chat with direct messages, unread counts, online presence, typing indicators and message history.',
    highlights: [
      'WebSocket auth with short-lived single-use tickets instead of tokens in the URL',
      'Cursor pagination for history, per-user rate limiting, and unread counts that stay correct',
      '42 tests, including real WebSocket flows for broadcast, presence and refused connections',
    ],
    stack: ['Python', 'FastAPI', 'WebSockets', 'PostgreSQL', 'React', 'Docker'],
    live: 'https://realtime-chat-ru2u.onrender.com',
    code: 'https://github.com/utsabshiwakoti/realtime-chat',
  },
  {
    id: 'job-tracker',
    name: 'Job Tracker',
    tagline: 'Job search dashboard with a Chrome extension',
    image: 'projects/job-tracker.webp',
    summary:
      'A Kanban board for job applications, plus a browser extension that captures jobs from LinkedIn and Indeed and logs applications automatically. Built for my own job search.',
    highlights: [
      'Chrome extension (Manifest V3) that detects submitted applications and saves them without a click',
      'Idempotent capture: canonical URLs, status only moves forward, and offline saves are queued and retried',
      'Per-user data isolation covered by tests; scrypt passwords and JWT sessions',
    ],
    stack: ['Python', 'FastAPI', 'SQLAlchemy', 'React', 'Chrome Extension', 'Docker'],
    live: 'https://job-tracker-ao85.onrender.com',
    code: 'https://github.com/utsabshiwakoti/job-tracker',
  },
]

// Real client work: shown separately from the portfolio projects.
export const clientWork = {
  name: 'UGEC Canada',
  tagline: 'Website and lead management for a Halifax education consultancy',
  image: 'projects/ugec.webp',
  summary:
    'The public website and a staff admin panel for an education consultancy: program catalogue, consultation booking, blog, a referral partner portal, and a CRM for the leads the site brings in.',
  highlights: [
    'Lead CRM for staff: pipeline, assignment, follow-up dates, notes, bulk actions, CSV export and a daily follow-up email',
    'Admin security: scrypt passwords, signed httpOnly cookies, server-checked roles, TOTP two-step sign-in, rate-limited logins',
    'Separate portal where referral partners sign in and see only their own referrals',
    'Server-rendered pages with SEO tags and a sitemap; MySQL in production, SQLite locally, scheduled backups',
  ],
  stack: ['Node.js', 'Express', 'MySQL', 'JavaScript', 'HTML/CSS'],
  live: 'https://ugec.ca',
}

export const skills = [
  ['Languages', ['Python', 'JavaScript', 'SQL', 'HTML', 'CSS']],
  ['Back end', ['FastAPI', 'Node.js / Express', 'SQLAlchemy', 'REST API design', 'WebSockets', 'JWT auth']],
  ['Front end', ['React', 'Vite', 'React Router', 'Responsive CSS', 'Chrome extensions']],
  ['Data', ['PostgreSQL', 'MySQL', 'SQLite']],
  ['Testing & DevOps', ['pytest', 'Docker', 'GitHub Actions', 'Render', 'Git']],
]

export const education = [
  {
    school: 'Seneca Polytechnic (formerly Seneca College), Toronto',
    credential: 'Computer Programming diploma',
    dates: 'Graduated April 2025',
  },
]
