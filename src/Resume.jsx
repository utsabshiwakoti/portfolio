import { clientWork, education, projects, site, skills } from './content'

// A one-page resume built from the same content as the home page. "Save as PDF" in the
// browser's print dialog produces the downloadable version, so the two never disagree.
const host = (url) => url.replace(/^https?:\/\//, '').replace(/\/$/, '')

export default function Resume() {
  const contact = [
    site.location,
    site.email && <a href={`mailto:${site.email}`}>{site.email}</a>,
    site.linkedin && <a href={site.linkedin}>{host(site.linkedin)}</a>,
    <a href={site.github}>{host(site.github)}</a>,
  ].filter(Boolean)

  return (
    <>
      <nav className="resume-bar no-print" aria-label="Resume actions">
        <a href="./">← Back to the site</a>
        <a className="button small" href="Utsab-Shiwakoti-Resume.pdf" download>Download PDF</a>
      </nav>
      <main className="resume">
        <header>
          <h1>{site.name}</h1>
          <p className="resume-role">{site.role}</p>
          <p className="resume-contact">
            {contact.map((item, i) => <span key={i}>{item}</span>)}
          </p>
        </header>

        <section>
          <h2>Summary</h2>
          <p>
            Full-stack developer with a Computer Programming diploma from Seneca. I build and deploy complete web
            applications with Python (FastAPI), React and PostgreSQL, with automated tests and CI. Four live projects
            and one client website, each documented with its design decisions.
          </p>
        </section>

        <section>
          <h2>Education</h2>
          {education.map((e) => (
            <div className="entry-head" key={e.school}>
              <h3>{e.credential}, {e.school}</h3>
              <span>{e.dates}</span>
            </div>
          ))}
        </section>
        <section>
          <h2>Skills</h2>
          <dl className="resume-skills">
            {skills.map(([group, items]) => (
              <div key={group}><dt>{group}</dt><dd>{items.join(', ')}</dd></div>
            ))}
          </dl>
        </section>

        <section>
          <h2>Experience</h2>
          <div className="entry">
            <div className="entry-head">
              <h3>Freelance web developer, {clientWork.name}</h3>
              <span>Halifax, NS · 2026</span>
            </div>
            <p className="entry-sub">{clientWork.tagline} · <a href={clientWork.live}>{host(clientWork.live)}</a></p>
            <ul>{clientWork.highlights.slice(0, 2).map((h) => <li key={h}>{h}</li>)}</ul>
          </div>
        </section>

        <section>
          <h2>Projects</h2>
          {projects.map((p) => (
            <div className="entry" key={p.id}>
              <div className="entry-head">
                <h3>{p.name}: {p.tagline}</h3>
                <a href={p.live}>{host(p.live)}</a>
              </div>
              <p className="entry-sub">{p.stack.join(', ')}</p>
              <ul>{p.highlights.slice(0, 2).map((h) => <li key={h}>{h}</li>)}</ul>
            </div>
          ))}
        </section>

      </main>
    </>
  )
}
