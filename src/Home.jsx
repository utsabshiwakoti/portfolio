import { clientWork, education, intro, projects, site, skills } from './content'

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <section id="projects" className="section" aria-labelledby="projects-title">
          <h2 id="projects-title">Projects</h2>
          <p className="section-lead">
            Each one is live, tested, and has a README that explains the design decisions.
          </p>
          <div className="projects">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} priority={i === 0} />
            ))}
          </div>
        </section>

        <section id="client-work" className="section" aria-labelledby="client-title">
          <h2 id="client-title">Client work</h2>
          <ProjectCard project={clientWork} label="Freelance" />
        </section>

        <section id="about" className="section about" aria-labelledby="about-title">
          <div>
            <h2 id="about-title">About</h2>
            <p>
              I'm a developer in {site.location}, with a Computer Programming diploma from Seneca. I like
              the problems behind ordinary-looking features: two people booking the same slot at the same
              second, a holiday that lands on a Saturday, a WebSocket that shouldn't accept a stale token.
            </p>
            <p>
              Each project here started with a question like that, and ended with tests that prove the answer.
              I'm looking for a team where I can keep learning that way, and ship things people use.
            </p>
            <h3>Education</h3>
            {education.map((e) => (
              <p key={e.school} className="education">
                <strong>{e.credential}</strong>
                <span>{e.school}</span>
                <span className="muted">{e.dates}</span>
              </p>
            ))}
          </div>
          <div>
            <h3 className="skills-title">Skills</h3>
            <dl className="skills">
              {skills.map(([group, items]) => (
                <div key={group}>
                  <dt>{group}</dt>
                  <dd>{items.join(' · ')}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="contact" className="section contact" aria-labelledby="contact-title">
          <h2 id="contact-title">Let's talk</h2>
          <p>{site.availability}</p>
          <ContactLinks />
        </section>
      </main>
      <footer className="footer">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <a href={`${site.github}/portfolio`}>Source for this site</a>
      </footer>
    </>
  )
}

function Header() {
  return (
    <header className="header">
      <a className="skip-link" href="#main">Skip to content</a>
      <a href="#top" className="logo" aria-label={`${site.name}, home`}>
        {site.name.split(' ').map((w) => w[0]).join('')}
      </a>
      <nav aria-label="Sections">
        <a href="#projects">Projects</a>
        <a href="#about">About</a>
        <a href="resume.html">Resume</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  )
}

function Hero() {
  return (
    <section id="top" className="hero">
      <p className="eyebrow">{site.role} · {site.location}</p>
      <h1>Hi, I'm {site.name.split(' ')[0]}. I build web apps that hold up under real use.</h1>
      {intro.map((p) => <p key={p} className="lead">{p}</p>)}
      <div className="actions">
        <a className="button" href="#projects">See my work</a>
        <a className="button secondary" href="resume.html">Resume</a>
      </div>
      <ContactLinks compact />
    </section>
  )
}

function ContactLinks({ compact = false }) {
  const links = [
    site.email && { label: compact ? 'Email' : site.email, href: `mailto:${site.email}` },
    site.linkedin && { label: 'LinkedIn', href: site.linkedin },
    { label: 'GitHub', href: site.github },
  ].filter(Boolean)
  return (
    <ul className={`contact-links ${compact ? 'compact' : ''}`}>
      {links.map((l) => (
        <li key={l.label}><a href={l.href}>{l.label}</a></li>
      ))}
    </ul>
  )
}

function ProjectCard({ project, priority = false, label }) {
  return (
    <article className="project" aria-labelledby={`${project.name}-title`}>
      <a href={project.live} className="shot" tabIndex={-1} aria-hidden="true">
        <img src={project.image} alt="" width="1200" height="750"
          loading={priority ? 'eager' : 'lazy'} decoding="async" />
      </a>
      <div className="project-body">
        {label && <span className="label">{label}</span>}
        <h3 id={`${project.name}-title`}>{project.name}</h3>
        <p className="tagline">{project.tagline}</p>
        <p>{project.summary}</p>
        <ul className="highlights">
          {project.highlights.map((h) => <li key={h}>{h}</li>)}
        </ul>
        <ul className="stack" aria-label="Built with">
          {project.stack.map((t) => <li key={t}>{t}</li>)}
        </ul>
        <div className="project-links">
          <a className="button small" href={project.live}>Live site</a>
          {project.code && <a className="button small secondary" href={project.code}>Code</a>}
        </div>
      </div>
    </article>
  )
}
