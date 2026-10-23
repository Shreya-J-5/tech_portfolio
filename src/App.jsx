import { useEffect, useRef, useState } from 'react';

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
    href: 'https://github.com/Shreya-J-5/Fyro',
    title: 'Fyro (Discord Bot)',
    description: 'Feature-rich Discord music bot with Spotify integration, interactive player controls, mood-based playlists, and queue management.',
    tags: ['TypeScript', 'discord.js', 'PostgreSQL', 'Redis'],
    delay: 0,
  },
  {
    href: 'https://github.com/Shreya-J-5/PaletteLens',
    title: 'PaletteLens',
    description: 'Visual color analysis engine extracting harmonic color palettes, testing WCAG contrast ratios, and analyzing image palettes in real time.',
    tags: ['React', 'TypeScript', 'Vite', 'Canvas API'],
    delay: 1,
  },
  {
    href: 'https://github.com/Shreya-J-5/scamshield',
    title: 'ScamShield (Chrome Extension)',
    description: 'AI-powered cybersecurity browser extension and FastAPI backend for real-time phishing detection, link safety scoring, and credential protection.',
    tags: ['Chrome Extension', 'Python', 'FastAPI', 'AI / Security'],
    delay: 2,
  },
  {
    href: 'https://github.com/Shreya-J-5/ValoRa---Valorant-Tracker',
    title: 'ValoRa',
    description: 'Valorant companion platform tracking live player stats, agent tiers, patch notes, weapon skins, and tactical guides.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'API'],
    delay: 0,
  },
  {
    href: 'https://github.com/Shreya-J-5/Cattle.ai',
    title: 'Cattle.ai',
    description: 'AI/ML cattle monitoring platform predicting milk yields and detecting early disease indicators from sensor and feed data.',
    tags: ['Python', 'Machine Learning', 'TypeScript', 'FastAPI'],
    delay: 1,
  },
  {
    href: 'https://github.com/Shreya-J-5/windows_theme_portfolio',
    title: 'Windows 11 Web OS',
    description: 'Interactive Windows 11 desktop experience in the browser with authentic window management, multitasking, and fluent UI.',
    tags: ['Next.js', 'TypeScript', 'Zustand', 'Framer Motion'],
    delay: 2,
  },
  {
    href: 'https://github.com/Shreya-J-5/IP4-detector',
    title: 'IP4 Detector',
    description: 'Network diagnostic tool calculating connection health scores, WebRTC leak exposure, and geolocation routing latency.',
    tags: ['TypeScript', 'Networking', 'WebRTC', 'APIs'],
    delay: 3,
  },
  {
    href: 'https://github.com/Shreya-J-5/PyConnect',
    title: 'PyConnect',
    description: 'Lightweight, asynchronous networking and communication framework built in Python for distributed systems.',
    tags: ['Python', 'Networking', 'AsyncIO', 'Sockets'],
    delay: 4,
  },
  {
    href: 'https://github.com/Shreya-J-5/PyCall',
    title: 'PyCall',
    description: 'Python communication module enabling programmatic audio streaming, voice handling, and telephony integrations.',
    tags: ['Python', 'Audio Processing', 'Streaming', 'APIs'],
    delay: 5,
  },
  {
    href: 'https://github.com/Shreya-J-5/object-detection',
    title: 'Object Detection System',
    description: 'Computer vision pipeline detecting and classifying objects in images and live video streams with high accuracy.',
    tags: ['Python', 'OpenCV', 'Deep Learning', 'PyTorch'],
    delay: 6,
  },
  {
    href: 'https://github.com/Shreya-J-5/Spendly-Expense-Tracker',
    title: 'Spendly Expense Tracker',
    description: 'Personal financial tracking web application for categorizing daily expenses, budget forecasting, and monthly spending insights.',
    tags: ['JavaScript', 'HTML5', 'CSS3', 'Local Storage'],
    delay: 7,
  },
  {
    href: 'https://github.com/Shreya-J-5/National_Job_Market_Demand_Forecaster',
    title: 'Job Market Demand Forecaster',
    description: 'Data analytics platform analyzing hiring trends and forecasting employment demand across technical job markets.',
    tags: ['JavaScript', 'Data Analytics', 'Forecasting', 'Charts'],
    delay: 8,
  },
  {
    href: 'https://github.com/Shreya-J-5/QR-Code-Generator-API-using-Python-and-Docker',
    title: 'QR Code Generator API',
    description: 'Containerized microservice API built with Python and Docker for generating customizable dynamic QR codes on demand.',
    tags: ['Python', 'Docker', 'REST API', 'Microservices'],
    delay: 9,
  },
  {
    href: 'https://github.com/Shreya-J-5/weather-app',
    title: 'Weather App',
    description: 'Modern weather dashboard delivering real-time forecasts, atmospheric conditions, and location-based meteorological data.',
    tags: ['JavaScript', 'REST API', 'CSS3', 'Weather API'],
    delay: 10,
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
  const [showAllProjects, setShowAllProjects] = useState(false);
  const nameRef = useRef(null);
  const bgRef = useRef(null);

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
      const currentTheme = root.getAttribute('data-theme');
      const isDark = currentTheme ? currentTheme === 'dark' : true;
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
    const bgNode = bgRef.current;
    if (!bgNode) return;

    // Check for user reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      bgNode.style.setProperty('--glow-x', '0px');
      bgNode.style.setProperty('--glow-y', '0px');
      bgNode.style.setProperty('--glow-scale', '1');
      bgNode.style.setProperty('--glow-opacity', '0.78');
      bgNode.style.setProperty('--glow-color', '#7078FA');
      bgNode.style.setProperty('--glow-mid', '#484CAC');
      return;
    }

    let targetProgress = 0;
    let currentProgress = 0;
    let rafId = null;
    let isRunning = false;

    // Updates CSS custom properties with eased progress
    // Blend colors: #7078FA (112, 120, 250) <-> #8E96FF (142, 150, 255)
    // Mid glow:     #484CAC (72, 76, 172)   <-> #5D63C4 (93, 99, 196)
    const updateCSS = (p) => {
      const glowX = ((p - 0.5) * 80).toFixed(2);
      const glowY = ((p - 0.5) * -140).toFixed(2);
      const scale = (1 + Math.sin(p * Math.PI) * 0.12).toFixed(3);
      const opacity = (0.72 + Math.sin(p * Math.PI) * 0.16).toFixed(3);

      const r = Math.round(112 + (142 - 112) * p);
      const g = Math.round(120 + (150 - 120) * p);
      const b = Math.round(250 + (255 - 250) * p);

      const mr = Math.round(72 + (93 - 72) * p);
      const mg = Math.round(76 + (99 - 76) * p);
      const mb = Math.round(172 + (196 - 172) * p);

      bgNode.style.setProperty('--glow-x', `${glowX}px`);
      bgNode.style.setProperty('--glow-y', `${glowY}px`);
      bgNode.style.setProperty('--glow-scale', scale);
      bgNode.style.setProperty('--glow-opacity', opacity);
      bgNode.style.setProperty('--glow-color', `rgb(${r}, ${g}, ${b})`);
      bgNode.style.setProperty('--glow-mid', `rgb(${mr}, ${mg}, ${mb})`);
    };

    const tick = () => {
      // Smooth lerp easing toward target
      currentProgress += (targetProgress - currentProgress) * 0.08;
      updateCSS(currentProgress);

      if (Math.abs(targetProgress - currentProgress) > 0.0005) {
        rafId = requestAnimationFrame(tick);
      } else {
        currentProgress = targetProgress;
        updateCSS(currentProgress);
        isRunning = false;
        rafId = null;
      }
    };

    const onScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      targetProgress = scrollHeight > 0 ? Math.min(Math.max(window.scrollY / scrollHeight, 0), 1) : 0;

      if (!isRunning) {
        isRunning = true;
        rafId = requestAnimationFrame(tick);
      }
    };

    onScroll();
    currentProgress = targetProgress;
    updateCSS(currentProgress);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
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
      <div className="bg-gradient-wrap" aria-hidden="true" ref={bgRef}>
        <div className="bg-glow-shape" />
      </div>
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
            {(showAllProjects ? projects : projects.slice(0, 3)).map((project) => (
              <a
                key={project.title}
                className="proj rv"
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
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

            <div className="see-more-wrap">
              <button
                type="button"
                className="see-more-btn"
                onClick={() => setShowAllProjects((prev) => !prev)}
                aria-expanded={showAllProjects}
              >
                <span>
                  {showAllProjects
                    ? 'Show less'
                    : `See more (${projects.length - 3} repositories)`}
                </span>
                <svg
                  className={`see-more-icon ${showAllProjects ? 'open' : ''}`}
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            </div>
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
            <a className="ln"target="_blank"  href="https://cal.com/shreya.j">
              Book a call
            </a>
            <a className="ln" target="_blank" href="https://github.com/Shreya-J-5">
              GitHub
            </a>
            <a className="ln" target="_blank" href="https://www.linkedin.com/in/shreya-jolapara-4b2358354">
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
