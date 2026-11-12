import { useEffect, useState } from 'react'
import { clientWork, education, intro, practices, projects, site, skills, stats } from './content'
import { ArrowIcon, CheckIcon, CopyIcon, GitHubIcon, LinkedInIcon, MailIcon, MoonIcon, SunIcon } from './icons'
import LiveApi from './LiveApi'

const host = (url) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
const firstName = site.name.split(' ')[0]

export default function Home() {
  useReveal()
  return (
    <>
      <Header />
      <main id="main">
        <Hero />

        <section id="projects" className="section" aria-labelledby="projects-title">
          <SectionHead id="projects-title" kicker="01 / Projects" title="Things I've built">
            Each one started with a question, and ended live, tested and written up.
          </SectionHead>
          <div className="projects">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </section>

        <section id="client-work" className="section" aria-labelledby="client-title">
          <SectionHead id="client-title" kicker="02 / Work" title="Built for a real business">
            What I build and run as {clientWork.role} at {clientWork.name}.
          </SectionHead>
          <div className="projects">
            <ProjectCard project={clientWork} index={0} label={clientWork.role} />
          </div>
        </section>

        <section id="how" className="section" aria-labelledby="how-title">
          <SectionHead id="how-title" kicker="03 / How I work" title="The parts that are easy to skip" />
          <ul className="practices">
            {practices.map(([title, text], i) => (
              <li key={title} className="practice reveal" style={{ '--delay': `${i * 70}ms` }}>
                <span className="practice-num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="about" className="section" aria-labelledby="about-title">
          <SectionHead id="about-title" kicker="04 / About" title={`A bit about ${firstName}`} />
          <div className="about">
            <div className="reveal">
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
            <dl className="skills reveal">
              {skills.map(([group, items]) => (
                <div key={group}>
                  <dt>{group}</dt>
                  <dd>
                    <ul className="chips">{items.map((s) => <li key={s}>{s}</li>)}</ul>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="contact" className="section" aria-labelledby="contact-title">
          <div className="contact reveal">
            <p className="kicker">05 / Contact</p>
            <h2 id="contact-title">Let's build something.</h2>
            <p>{site.availability}</p>
            <div className="contact-actions">
              {site.email && <a className="button" href={`mailto:${site.email}`}><MailIcon /> {site.email}</a>}
              {site.email && <CopyButton text={site.email} />}
            </div>
            <SocialLinks />
          </div>
        </section>
      </main>
      <footer className="footer">
        <span>© {new Date().getFullYear()} {site.name}. Built with React and Vite.</span>
        <a href={`${site.github}/portfolio`}>Source for this site <ArrowIcon /></a>
      </footer>
    </>
  )
}

/** Fades sections in as they scroll into view. Skipped for people who ask for reduced motion. */
function useReveal() {
  useEffect(() => {
    const items = document.querySelectorAll('.reveal')
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach((el) => el.classList.add('in'))
      return
    }
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) { entry.target.classList.add('in'); observer.unobserve(entry.target) }
      }
    }, { rootMargin: '0px 0px -8% 0px' })
    items.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

function Header() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="header-inner">
        <a href="#top" className="brand" aria-label={`${site.name}, home`}>
          <span className="logo">{site.name.split(' ').map((w) => w[0]).join('')}</span>
          <span className="brand-name">{site.name}</span>
        </a>
        <nav aria-label="Sections">
          <a href="#projects">Projects</a>
          <a href="#how" className="nav-optional">How I work</a>
          <a href="#about" className="nav-optional">About</a>
          <a href="resume.html">Resume</a>
          <a href="#contact">Contact</a>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  )
}

/** Light/dark switch. The first paint is handled by a tiny script in the HTML so there is no flash. */
function ThemeToggle() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light')
  const next = theme === 'dark' ? 'light' : 'dark'
  const toggle = () => {
    document.documentElement.dataset.theme = next
    try { localStorage.setItem('theme', next) } catch { /* private mode: the choice just isn't remembered */ }
    setTheme(next)
  }
  return (
    <button type="button" className="icon-button" onClick={toggle} aria-label={`Switch to ${next} theme`}>
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}

function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero-text">
        <p className="status"><span className="dot" aria-hidden="true" /> Open to junior developer roles<span className="status-loc"> · {site.location}</span></p>
        <h1>
          Hi, I'm {firstName}. I build web apps that <span className="grad">hold up under real use.</span>
        </h1>
        {intro.map((p) => <p key={p} className="lead">{p}</p>)}
        <div className="actions">
          <a className="button" href="#projects">See my work <ArrowIcon down /></a>
          <a className="button secondary" href="resume.html">Resume</a>
        </div>
        <SocialLinks />
      </div>
      <LiveApi />
      <dl className="stats">
        {stats.map(([value, label]) => (
          <div key={label}>
            <dt>{value}</dt>
            <dd>{label}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

function SectionHead({ id, kicker, title, children }) {
  return (
    <div className="section-head reveal">
      <p className="kicker">{kicker}</p>
      <h2 id={id}>{title}</h2>
      {children && <p className="section-lead">{children}</p>}
    </div>
  )
}

function SocialLinks() {
  const links = [
    { label: 'GitHub', href: site.github, icon: <GitHubIcon /> },
    site.linkedin && { label: 'LinkedIn', href: site.linkedin, icon: <LinkedInIcon /> },
    site.email && { label: 'Email', href: `mailto:${site.email}`, icon: <MailIcon /> },
  ].filter(Boolean)
  return (
    <ul className="social">
      {links.map((l) => (
        <li key={l.label}><a href={l.href}>{l.icon} {l.label}</a></li>
      ))}
    </ul>
  )
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch { /* clipboard blocked: the mailto button next to it still works */ }
  }
  return (
    <button type="button" className="button secondary" onClick={copy}>
      {copied ? <><CheckIcon /> Copied</> : <><CopyIcon /> Copy email</>}
    </button>
  )
}

function ProjectCard({ project, index, label }) {
  const titleId = `${project.id}-title`
  return (
    <article className={`project reveal ${index % 2 ? 'flip' : ''}`} aria-labelledby={titleId}>
      <a href={project.live} className="shot" tabIndex={-1} aria-hidden="true">
        <span className="shot-bar">
          <i /><i /><i />
          <span className="shot-url">{host(project.live)}</span>
        </span>
        <img src={project.image} alt="" width="1200" height="750"
          loading={index === 0 && !label ? 'eager' : 'lazy'} decoding="async" />
      </a>
      <div className="project-body">
        {label && <span className="label">{label}</span>}
        <h3 id={titleId}>{project.name}</h3>
        <p className="tagline">{project.tagline}</p>
        <p className="question">{project.question}</p>
        <p>{project.summary}</p>
        <ul className="highlights">
          {project.highlights.map((h) => <li key={h}><CheckIcon /> <span>{h}</span></li>)}
        </ul>
        <ul className="proof" aria-label="At a glance">
          {project.proof.map((p) => <li key={p}>{p}</li>)}
        </ul>
        <ul className="chips" aria-label="Built with">
          {project.stack.map((t) => <li key={t}>{t}</li>)}
        </ul>
        <div className="project-links">
          <a className="button small" href={project.live}>Live site <ArrowIcon /></a>
          {project.code && <a className="button small secondary" href={project.code}><GitHubIcon /> Code</a>}
          {project.writeup && <a className="button small secondary" href={project.writeup}>How it works <ArrowIcon /></a>}
        </div>
      </div>
    </article>
  )
}
