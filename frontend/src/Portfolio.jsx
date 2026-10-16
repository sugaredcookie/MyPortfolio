import React, { useState, useEffect } from "react";

// Fonts: assumes "JetBrains Mono" and "Inter" are loaded in index.html.
// Add once if missing:
// <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">

const COLORS = {
  bg: "#0A1929",
  panel: "#0E2038",
  line: "#2A4A6B",
  lineDim: "#1B334F",
  paper: "#E8EDF2",
  dim: "#7C93AC",
  accent: "#F2A93C",
};

const MONO = "'JetBrains Mono', ui-monospace, monospace";
const SANS = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [navbarScrolled, setNavbarScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setNavbarScrolled(window.scrollY > 20);
      const sections = document.querySelectorAll("section[id]");
      let current = "home";
      sections.forEach((section) => {
        if (window.scrollY >= section.offsetTop - 120) current = section.id;
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const EMAIL = "sanidhyaverma.dev@gmail.com`";
  const LINKEDIN = "https://www.linkedin.com/in/sanidhya-verma-106622310/";
  const GITHUB = "https://github.com/sugaredcookie";
  const RESUME =
    "https://drive.google.com/file/d/1ayHkdKX-1rSfVat1ktcXc60FC3Qb4O1u/view?usp=sharing";

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  const experience = [
    {
      role: "Platform Architect Intern",
      company: "Linedata",
      team: "Platform Development Team",
      period: "Jun 2026 – Jul 2026",
      points: [
        "Designed and implemented CI/CD pipelines with GitHub Actions and Docker, automating builds, testing, and deployments across multiple environments.",
        "Built and maintained an internal MERN web application that was later adopted company-wide.",
        "Supported deployment automation, configuration management, and release workflows alongside senior engineers.",
        "Worked within an Agile process — sprint planning, code reviews, and production deployments.",
      ],
    },
    {
      role: "Freelance Full-Stack Developer",
      company: "Independent Clients",
      period: "Jun 2025 – Present",
      points: [
        "Delivered 3+ end-to-end MERN stack applications, owning the full lifecycle from requirements through deployment and maintenance.",
        "Deployed backend services on Vercel with sub-200ms API response times and 99%+ uptime.",
        "Maintained ongoing client communication and documentation with 100% retention across active engagements.",
      ],
    },
  ];

  const projects = [
    {
      title: "justAsk",
      subtitle: "Founder · Platform Architect · AI Developer",
      desc: "AI-powered student platform for VIT-AP, in daily use across the campus network. I founded it and own product architecture and technical direction.",
      points: [
        "Led a 7-member engineering team across frontend, backend, AI/ML, infra, and product.",
        "Architected a Spring Boot / Java backend with a modular, service-oriented design on PostgreSQL.",
        "Built the AI pipeline for recommendations and content analysis, integrated into the core platform.",
        "Engineered CI/CD, infra, and observability using Docker, Terraform, GitHub Actions, Prometheus, and Grafana.",
      ],
      tags: [
        "Spring Boot",
        "Java",
        "React",
        "Python",
        "PostgreSQL",
        "Docker",
        "Terraform",
        "GitHub Actions",
      ],
      spec: "SYS-01",
    },
    {
      title: "AI-Powered Intrusion Detection System",
      subtitle: "ML · Backend · Dashboard",
      desc: "End-to-end ML pipeline on NSL-KDD network traffic data, serving real-time predictions through a REST API with a live Flutter dashboard.",
      points: [
        "Detected 5+ categories of cyberattacks with 96%+ accuracy via hyperparameter tuning and cross-validation.",
        "Reduced false positives by ~30%.",
        "Built Node.js/Express REST APIs to serve real-time predictions, with MongoDB for persistent threat logging.",
        "Developed a Flutter dashboard visualizing live threat scores and automated alerts.",
      ],
      tags: [
        "Python",
        "scikit-learn",
        "XGBoost",
        "Node.js",
        "Express",
        "MongoDB",
        "Flutter",
      ],
      spec: "SYS-02",
    },
  ];

  const certifications = [
    "Complete Data Science, ML, Deep Learning & NLP Bootcamp — Krish Naik (Udemy)",
    "Node.js, Express & MongoDB Backend Bootcamp — Jonas Schmedtmann (Udemy)",
    "Java (Intermediate) — HackerRank Certified",
    "150+ DSA problems solved on LeetCode & GeeksforGeeks (Java)",
  ];

  const stats = [
    { value: "7", label: "Engineers led on justAsk" },
    { value: "96%", label: "IDS detection accuracy" },
    { value: "3+", label: "Client apps shipped" },
    { value: "150+", label: "DSA problems (Java)" },
  ];

  return (
    <div
      className="relative min-h-screen antialiased"
      style={{ background: COLORS.bg, color: COLORS.paper, fontFamily: SANS }}
    >
      {/* Blueprint grid ground */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(${COLORS.lineDim} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.lineDim} 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
          opacity: 0.4,
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(${COLORS.lineDim} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.lineDim} 1px, transparent 1px)`,
          backgroundSize: "16px 16px",
          opacity: 0.12,
        }}
      />

      {/* Navbar */}
      <nav
        className="fixed top-0 left-0 right-0 z-40 transition-colors duration-200"
        style={{
          borderBottom: navbarScrolled
            ? `1px solid ${COLORS.line}`
            : "1px solid transparent",
          background: navbarScrolled ? "rgba(10,25,41,0.9)" : "transparent",
          backdropFilter: navbarScrolled ? "blur(8px)" : "none",
        }}
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <button
            onClick={() => scrollTo("home")}
            aria-label="Scroll to top"
            className="flex items-center gap-2 text-sm tracking-tight"
            style={{ fontFamily: MONO, color: COLORS.paper }}
          >
            <Crosshair size={14} color={COLORS.accent} />
            SV / PORTFOLIO
          </button>

          <ul className="hidden items-center gap-7 md:flex">
            {navItems.map((item, i) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(item.id);
                  }}
                  className="group relative text-sm transition-colors"
                  style={{
                    fontFamily: MONO,
                    color:
                      activeSection === item.id ? COLORS.paper : COLORS.dim,
                  }}
                >
                  <span className="mr-1.5 opacity-50">
                    {String(i).padStart(2, "0")}
                  </span>
                  {item.label}
                  <span
                    className="absolute -bottom-1.5 left-0 h-[2px] transition-all duration-300"
                    style={{
                      width: activeSection === item.id ? "100%" : "0%",
                      background: COLORS.accent,
                    }}
                  />
                </a>
              </li>
            ))}
          </ul>

          <a
            href={`mailto:${EMAIL}`}
            className="hidden border px-3 py-1.5 text-xs transition-colors sm:inline-flex"
            style={{
              fontFamily: MONO,
              borderColor: COLORS.line,
              color: COLORS.dim,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = COLORS.accent;
              e.currentTarget.style.color = COLORS.accent;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = COLORS.line;
              e.currentTarget.style.color = COLORS.dim;
            }}
          >
            Email me
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section
        id="home"
        className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 pt-24 pb-24"
        style={{ scrollMarginTop: "80px" }}
      >
        <HeroReveal>
          <div
            className="mb-6 inline-flex w-fit items-center gap-2 border px-3 py-1 text-xs"
            style={{
              borderColor: COLORS.line,
              color: COLORS.accent,
              fontFamily: MONO,
            }}
          >
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: COLORS.accent }}
            />
            Open for internships &amp; research collabs
          </div>

          <h1
            className="mb-6 text-5xl font-semibold leading-[1.05] sm:text-6xl"
            style={{ color: COLORS.paper, letterSpacing: "-0.01em" }}
          >
            Sanidhya Verma
          </h1>

          <p
            className="mb-3 max-w-2xl text-lg leading-relaxed"
            style={{ color: COLORS.dim }}
          >
            Software engineer building AI/ML systems end-to-end — models, the
            apps around them, and the infrastructure that keeps both running.
          </p>

          <div
            className="mb-10 flex items-center gap-2 text-sm"
            style={{ fontFamily: MONO, color: COLORS.dim }}
          >
            <DimensionTick color={COLORS.line} />
            B.Tech CS, VIT-AP University — Mumbai, India
          </div>

          <div className="mb-10 flex flex-wrap gap-3">
            <button
              onClick={() => scrollTo("projects")}
              className="px-5 py-2.5 text-sm font-medium transition-transform hover:-translate-y-0.5"
              style={{ background: COLORS.accent, color: COLORS.bg }}
            >
              View projects
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="border px-5 py-2.5 text-sm font-medium transition-colors"
              style={{ borderColor: COLORS.line, color: COLORS.paper }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = COLORS.accent)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = COLORS.line)
              }
            >
              Get in touch
            </button>
          </div>

          <div
            className="flex items-center gap-5 text-sm"
            style={{ color: COLORS.dim }}
          >
            <a
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              GitHub
            </a>
            <span style={{ color: COLORS.line }}>/</span>
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              LinkedIn
            </a>
            <span style={{ color: COLORS.line }}>/</span>
            <a
              href={RESUME}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              Resume
            </a>
          </div>
        </HeroReveal>
      </section>

      {/* About */}
      <Panel id="about" fig="FIG. 01" title="About" colors={COLORS}>
        <div className="grid gap-12 md:grid-cols-5">
          <div
            className="space-y-4 leading-relaxed md:col-span-3"
            style={{ color: COLORS.dim }}
          >
            <p>
              I'm a Computer Science undergraduate at VIT-AP University,
              graduating in 2028. My main interests are AI/ML and software
              engineering — I like working across the whole stack, from
              training and evaluating models to shipping the apps and infra
              that run them.
            </p>
            <p>
              Most of what I know comes from building. I founded{" "}
              <span style={{ color: COLORS.paper }}>justAsk</span>, an
              AI-powered student platform now in daily use across the VIT-AP
              network, and led a 7-member team to ship it. I'd rather do that
              than follow ten tutorials.
            </p>
            <p>
              My problem-solving foundation comes from 150+ DSA problems in
              Java on LeetCode and GeeksforGeeks. I'm currently looking for
              internships and research collaborations where I can work on real
              systems with real users.
            </p>

            <div
              className="grid grid-cols-2 gap-x-6 gap-y-6 border-t pt-6 sm:grid-cols-4"
              style={{ borderColor: COLORS.line }}
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <div
                    className="text-2xl font-semibold"
                    style={{ color: COLORS.paper, fontFamily: MONO }}
                  >
                    {s.value}
                  </div>
                  <div
                    className="mt-1 text-xs leading-snug"
                    style={{ color: COLORS.dim }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-start justify-center md:col-span-2 md:justify-end">
            <div className="relative">
              <CornerFrame color={COLORS.line} />
              <div
                className="relative h-48 w-48 overflow-hidden"
                style={{ background: COLORS.panel }}
              >
                <img
                  src="/portfolioPhoto.jpeg"
                  alt="Sanidhya Verma"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.nextSibling.style.display = "flex";
                  }}
                />
                <div
                  className="hidden h-full w-full items-center justify-center"
                  style={{ color: COLORS.line }}
                >
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Panel>

      {/* Experience */}
      <Panel id="experience" fig="FIG. 02" title="Experience" colors={COLORS}>
        <div className="space-y-10">
          {experience.map((job) => (
            <div
              key={job.role}
              className="grid gap-4 border-t pt-8 sm:grid-cols-3 sm:gap-8"
              style={{ borderColor: COLORS.line }}
            >
              <div className="sm:col-span-1">
                <h3
                  className="text-base font-medium"
                  style={{ color: COLORS.paper }}
                >
                  {job.role}
                </h3>
                <p className="mt-1 text-sm" style={{ color: COLORS.dim }}>
                  {job.company}
                </p>
                {job.team && (
                  <p className="text-xs" style={{ color: COLORS.line }}>
                    {job.team}
                  </p>
                )}
                <p
                  className="mt-3 text-xs"
                  style={{ fontFamily: MONO, color: COLORS.accent }}
                >
                  {job.period}
                </p>
              </div>
              <ul className="space-y-2.5 sm:col-span-2">
                {job.points.map((pt) => (
                  <li
                    key={pt}
                    className="flex items-start gap-3 text-sm leading-relaxed"
                    style={{ color: COLORS.dim }}
                  >
                    <span
                      className="mt-2 h-px w-3 flex-shrink-0"
                      style={{ background: COLORS.line }}
                    />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Panel>

      {/* Projects */}
      <Panel id="projects" fig="FIG. 03" title="Projects" colors={COLORS}>
        <div className="space-y-16">
          {projects.map((p) => (
            <article
              key={p.title}
              className="group relative border-t pt-8"
              style={{ borderColor: COLORS.line }}
            >
              <span
                className="absolute -top-3 right-0 px-2 text-[11px]"
                style={{
                  background: COLORS.bg,
                  color: COLORS.line,
                  fontFamily: MONO,
                }}
              >
                {p.spec}
              </span>
              <div className="grid gap-6 sm:grid-cols-3 sm:gap-8">
                <div className="sm:col-span-1">
                  <h3
                    className="text-lg font-medium transition-colors"
                    style={{ color: COLORS.paper }}
                  >
                    {p.title}
                  </h3>
                  <p className="mt-1 text-sm" style={{ color: COLORS.dim }}>
                    {p.subtitle}
                  </p>
                </div>
                <div className="sm:col-span-2">
                  <p
                    className="mb-4 text-sm leading-relaxed"
                    style={{ color: COLORS.dim }}
                  >
                    {p.desc}
                  </p>
                  <ul className="mb-5 space-y-2.5">
                    {p.points.map((pt) => (
                      <li
                        key={pt}
                        className="flex items-start gap-3 text-sm leading-relaxed"
                        style={{ color: COLORS.dim }}
                      >
                        <span
                          className="mt-2 h-px w-3 flex-shrink-0"
                          style={{ background: COLORS.line }}
                        />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="border px-2 py-0.5 text-xs"
                        style={{
                          borderColor: COLORS.line,
                          color: COLORS.dim,
                          fontFamily: MONO,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div
          className="mt-20 border-t pt-8"
          style={{ borderColor: COLORS.line }}
        >
          <h3
            className="mb-6 text-sm font-medium"
            style={{ color: COLORS.paper }}
          >
            Certifications &amp; achievements
          </h3>
          <ul className="space-y-3">
            {certifications.map((c) => (
              <li
                key={c}
                className="flex items-start gap-3 text-sm"
                style={{ color: COLORS.dim }}
              >
                <span
                  className="mt-2 h-px w-3 flex-shrink-0"
                  style={{ background: COLORS.line }}
                />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </Panel>

      {/* Contact */}
      <Panel id="contact" fig="FIG. 04" title="Contact" colors={COLORS}>
        <div className="max-w-2xl">
          <p className="mb-8 leading-relaxed" style={{ color: COLORS.dim }}>
            I'm open to internships, research collaborations, and interesting
            engineering problems. Email is the fastest way to reach me.
          </p>
          <a
            href={`mailto:${EMAIL}?subject=Hello`}
            className="inline-block px-5 py-2.5 text-sm font-medium transition-transform hover:-translate-y-0.5"
            style={{ background: COLORS.accent, color: COLORS.bg }}
          >
            {EMAIL}
          </a>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <ContactItem
              label="Email"
              value={EMAIL}
              href={`mailto:${EMAIL}`}
              colors={COLORS}
            />
            <ContactItem
              label="LinkedIn"
              value="sanidhya-verma"
              href={LINKEDIN}
              colors={COLORS}
            />
            <ContactItem
              label="GitHub"
              value="sugaredcookie"
              href={GITHUB}
              colors={COLORS}
            />
          </div>
        </div>
      </Panel>

      {/* Footer */}
      <footer
        className="relative z-10 border-t px-6 py-8"
        style={{ borderColor: COLORS.lineDim }}
      >
        <div
          className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-2 text-xs sm:flex-row"
          style={{ color: COLORS.line, fontFamily: MONO }}
        >
          <p>© {new Date().getFullYear()} Sanidhya Verma</p>
          <p>Mumbai, India</p>
        </div>
      </footer>
    </div>
  );
};

/* ---------- Helpers ---------- */

const Panel = ({ id, fig, title, children, colors }) => (
  <section
    id={id}
    className="relative z-10 mx-auto max-w-5xl px-6 py-24"
    style={{ scrollMarginTop: "80px" }}
  >
    <div className="mb-12 flex items-end justify-between">
      <h2 className="text-xl font-medium" style={{ color: colors.paper }}>
        {title}
      </h2>
      <span
        className="text-xs"
        style={{ fontFamily: MONO, color: colors.line }}
      >
        {fig}
      </span>
    </div>
    {children}
  </section>
);

const HeroReveal = ({ children }) => {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShown(true), 60);
    return () => clearTimeout(t);
  }, []);
  return (
    <div
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(12px)",
        transition:
          "opacity 700ms ease, transform 700ms cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {children}
    </div>
  );
};

const Crosshair = ({ size = 14, color = "#F2A93C" }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="5.5" stroke={color} strokeWidth="1" />
    <path d="M8 0V4M8 12V16M0 8H4M12 8H16" stroke={color} strokeWidth="1" />
  </svg>
);

const DimensionTick = ({ color }) => (
  <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
    <path d="M1 1V11M19 1V11M1 6H19" stroke={color} strokeWidth="1" />
  </svg>
);

const CornerFrame = ({ color }) => {
  const corners = [
    "-top-2 -left-2 border-t border-l",
    "-top-2 -right-2 border-t border-r",
    "-bottom-2 -left-2 border-b border-l",
    "-bottom-2 -right-2 border-b border-r",
  ];
  return (
    <>
      {corners.map((pos) => (
        <span
          key={pos}
          className={`pointer-events-none absolute h-4 w-4 ${pos}`}
          style={{ borderColor: color }}
        />
      ))}
    </>
  );
};

const ContactItem = ({ label, value, href, colors }) => (
  <a
    href={href}
    target={href.startsWith("http") ? "_blank" : undefined}
    rel="noopener noreferrer"
    className="block border-t pt-4 transition-colors"
    style={{ borderColor: colors.line }}
    onMouseEnter={(e) =>
      (e.currentTarget.style.borderColor = colors.accent)
    }
    onMouseLeave={(e) => (e.currentTarget.style.borderColor = colors.line)}
  >
    <div
      className="mb-1 text-[10px]"
      style={{ fontFamily: MONO, color: colors.line }}
    >
      {label}
    </div>
    <div className="truncate text-sm" style={{ color: colors.paper }}>
      {value}
    </div>
  </a>
);

export default Portfolio;