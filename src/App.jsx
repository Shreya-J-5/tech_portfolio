import { useEffect, useRef } from 'react';

const services = [
  {
    title: 'Backend architecture',
    description: 'Describe what you design and the outcome it gives, in two lines.',
    tags: ['Node.js', 'TypeScript', 'Go'],
  },
  {
    title: 'Infrastructure and delivery',
    description: 'Another core skill, written so a non-engineer understands it.',
    tags: ['Docker', 'PostgreSQL', 'CI/CD'],
    delay: 1,
  },
  {
    title: 'Leadership',
    description: 'Optional. Delete it if you only have two areas.',
    tags: ['Architecture review', 'Mentoring'],
    delay: 2,
  },
];

const projects = [
  {
    href: 'https://github.com/yourhandle/one',
    title: 'Project one',
    description: 'What it is, what is notable about how it works, where it is used.',
    tags: ['C++', 'PostgreSQL'],
    delay: 0,
  },
  {
    href: 'https://github.com/yourhandle/two',
    title: 'Project two',
    description: 'Lead with results, not features. Keep to three or four projects.',
    tags: ['Python', 'API'],
    delay: 1,
  },
  {
    href: 'https://github.com/yourhandle/three',
    title: 'Project three',
    description: 'Link every project to a repo, demo or write-up.',
    tags: ['TypeScript'],
    delay: 2,
  },
];

const jobs = [
  {
    period: 'Oct 2025 – Present',
    title: 'Lead Graphic Designer,',
    company: 'Cocomo Media',
    companyHref: 'https://cocomomedia.in',
    description: 'What you owned and the measurable result.',
  },
  {
    period: 'Sept 2026 - Dec 2026',
    title: 'AIML Intern,',
    company: 'Aascent Info Solutions',
    companyHref: 'https://aascentinfo.solutions/',
    description: "Newest first. Drop roles that don't support your story.",
    delay: 1,
  },
  {
    period: '2025 – Present',
    title: 'Freelance',
    description: 'Group short engagements into one entry.',
    delay: 2,
  },
];

const marqueeOne = ['React', 'Python', 'Next.js', 'Java', 'MySql','JavaScript'];
const marqueeTwo = ['Node.js', 'PostgreSQL', 'Flask', 'Django', 'Django Rest'];

function App() {
  const nameRef = useRef(null);

  const handleProjectMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPct = ((x / rect.width) * 100).toFixed(1);
    const yPct = ((y / rect.height) * 100).toFixed(1);
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
    e.currentTarget.style.setProperty('--mouse-x-pct', `${xPct}%`);
    e.currentTarget.style.setProperty('--mouse-y-pct', `${yPct}%`);
  };

  const handleProjectMouseLeave = (e) => {
    e.currentTarget.style.removeProperty('--mouse-x');
    e.currentTarget.style.removeProperty('--mouse-y');
    e.currentTarget.style.removeProperty('--mouse-x-pct');
    e.currentTarget.style.removeProperty('--mouse-y-pct');
  };

  useEffect(() => {
    const node = nameRef.current;
    if (!node) return;

    const lines = node.querySelectorAll('.l');
    lines.forEach((line) => {
      const text = line.textContent;
      line.textContent = '';
      line.setAttribute('aria-hidden', 'true');

      text.split('').forEach((character, index) => {
        const span = document.createElement('span');
        span.className = 'c';
        span.style.setProperty('--i', index);
        span.textContent = character;
        line.appendChild(span);
      });
    });
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const themeButton = document.getElementById('theme');

    try {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        root.setAttribute('data-theme', savedTheme);
      }
    } catch (error) {
      // Ignore storage access errors in restricted browsers.
    }

    const toggleTheme = () => {
      const isDark =
        root.getAttribute('data-theme') === 'dark' ||
        (!root.getAttribute('data-theme') && matchMedia('(prefers-color-scheme: dark)').matches);
      const nextTheme = isDark ? 'light' : 'dark';
      root.setAttribute('data-theme', nextTheme);

      try {
        localStorage.setItem('theme', nextTheme);
      } catch (error) {
        // Ignore storage access errors in restricted browsers.
      }
    };

    themeButton?.addEventListener('click', toggleTheme);

    return () => {
      themeButton?.removeEventListener('click', toggleTheme);
    };
  }, []);

  useEffect(() => {
    const year = document.getElementById('yr');
    if (year) {
      year.textContent = new Date().getFullYear();
    }

    const clock = document.getElementById('clock');
    const tick = () => {
      if (clock) {
        clock.textContent = new Date().toLocaleTimeString('en-GB');
      }
    };

    tick();
    const intervalId = setInterval(tick, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const bar = document.getElementById('bar');
    const updateBar = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${total > 0 ? window.scrollY / total : 0})`;
    };

    updateBar();
    window.addEventListener('scroll', updateBar, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateBar);
    };
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('.sec');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleCopy = () => {
    const button = document.getElementById('copy');
    const email = document.getElementById('mail').textContent;

    const copy = navigator.clipboard
      ? navigator.clipboard.writeText(email)
      : Promise.reject(new Error('Clipboard unavailable'));

    copy
      .then(() => {
        button.textContent = 'Copied';
      })
      .catch(() => {
        button.textContent = 'Copy failed';
      })
      .finally(() => {
        setTimeout(() => {
          button.textContent = 'Copy email';
        }, 1800);
      });
  };

  return (
    <>
      <div id="bar" />
      <header>
        <div className="wrap">
          <a href="#top" className="ln">
            @SJ
          </a>
          <nav>
            <a className="ln h" href="#work">
              Work
            </a>
            <a className="ln h" href="#experience">
              Experience
            </a>
            <a className="ln h" href="#stack">
              Stack
            </a>
            <a className="ln" href="#contact">
              Contact
            </a>
            <button id="theme" type="button" aria-label="Switch theme" />
          </nav>
        </div>
      </header>

      <main id="top" className="wrap">
        <section className="hero">
          <h1 aria-label="Your Name" id="name" ref={nameRef}>
            <span className="l">Shreya</span>
            <span className="l">Jolapara</span>
          </h1>
          <div className="meta">
            <div className="role">
              Full Stack Engineer
              <br />
              @ Company
            </div>
            <div>
              <p className="lead">
                One or two sentences on the problem you solve and who you solve it for. Specific beats clever.
              </p>
              <div className="status">
                <span>
                  <i className="dot" />
                  Open to new work
                </span>
                <span>Ahmedabad,India</span>
                <span id="clock">--:--:--</span>
              </div>
            </div>
          </div>
        </section>

        <section className="sec" id="about">
          <h2>What I do</h2>
          <div>
            {services.map((service, index) => (
              <div
                key={service.title}
                className="svc rv"
                style={index === 0 ? undefined : { '--d': service.delay ?? index }}
              >
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <div className="tg">
                  {service.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="sec" id="work">
          <h2>Selected work</h2>
          <div>
            {projects.map((project) => (
              <a
                key={project.title}
                className="proj rv"
                href={project.href}
                onMouseMove={handleProjectMouseMove}
                onMouseLeave={handleProjectMouseLeave}
                style={project.delay ? { '--d': project.delay } : undefined}
              >
                <div className="proj-glass-layer" aria-hidden="true">
                  <div className="proj-glass-caustic" />
                  <div className="proj-glass-rim" />
                </div>
                <div className="proj-body">
                  <h3 className="proj-title">{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tg">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="proj-arrow" aria-hidden="true">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="sec" id="experience">
          <h2>Experience</h2>
          <div>
            {jobs.map((job) => (
              <div
                key={`${job.period}-${job.title}`}
                className="job rv"
                style={job.delay ? { '--d': job.delay } : undefined}
              >
                <div className="w">{job.period}</div>
                <div>
                  <h3>
                    {job.company ? (
                      <>
                        {job.title}{' '}
                        <a href={job.companyHref}>{job.company}</a>
                      </>
                    ) : (
                      job.title
                    )}
                  </h3>
                  <p>{job.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <section id="stack" style={{ padding: '0 0 70px' }}>
        <div className="wrap" style={{ marginBottom: '26px' }}>
          <div className="sec" style={{ padding: '46px 0 0', display: 'block' }}>
            <h2 style={{ position: 'static' }}>Stack</h2>
          </div>
        </div>
        <div className="wrap">
          <div className="stack-list" aria-hidden="true">
            <div className="stack-items">
              {marqueeOne.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
          <div className="stack-list reverse" aria-hidden="true">
            <div className="stack-items">
              {marqueeTwo.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="wrap sec" id="contact" style={{ paddingTop: '60px' }}>
        <h2>Contact</h2>
        <div className="rv">
          <p style={{ marginBottom: '22px' }}>
            One sentence on what you want to hear about: roles, freelance work, collaboration.
          </p>
          <a className="mail" id="mail" href="mailto:shreya051006@gmail.com">
            shreya051006@gmail.com
          </a>
          <div className="acts">
            <a className="ln" href="https://cal.com/shreya.j">
              Book a call
            </a>
            <a className="ln" href="https://github.com/Shreya-J-5">
              GitHub
            </a>
            <a className="ln" href="https://www.linkedin.com/in/shreya-jolapara-4b2358354">
              LinkedIn
            </a>
            <button className="ln" id="copy" type="button" onClick={handleCopy}>
              Copy email
            </button>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <span>
            © <span id="yr" /> Your Name
          </span>
          <a className="ln" href="#top">
            Back to top
          </a>
        </div>
      </footer>
    </>
  );
}

export default App;
