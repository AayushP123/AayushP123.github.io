"use client";

import { type MouseEvent, useEffect, useMemo, useState } from "react";
import Starfield from "./starfield";

const experience = [
  {
    company: "Kinective",
    role: "Software Development Engineering Intern",
    date: "JUN 2026 / NOW",
    copy: "Build Java and Spring Boot integrations for Corelation KeyBridge, with Cucumber and Kotlin coverage across critical workflows, resilient GraphQL handling, and CI quality gates.",
    proof: ["20+ workflows", "80%+ coverage", "Java / Spring Boot"],
  },
  {
    company: "Future Today Inc.",
    role: "Software Engineer Intern",
    date: "AUG / DEC 2025",
    copy: "Shipped real-time content synchronization for HappyKids and built validation systems across Roku, Fire TV, mobile, and connected-TV releases.",
    proof: ["5M+ users", "100+ defects blocked", "10K+ records repaired"],
  },
  {
    company: "Arizona State University",
    role: "Software Engineer Researcher",
    date: "JAN / MAY 2024",
    copy: "Built deterministic ML research infrastructure across eight A100 GPUs, running thousands of experiments to characterize optimizer performance and accuracy.",
    proof: ["6,000 experiments", "84.3% throughput", "99% consistency"],
  },
];

const projects = [
  {
    number: "01",
    date: "FEB / MAY 2026",
    type: "Clinical research",
    title: "Gene Editing Trials",
    copy: "A clinical-trial intelligence platform that normalizes ClinicalTrials.gov data into fast, filterable research workflows with comparison and CSV export.",
    tags: ["Next.js", "AWS Lambda", "DynamoDB", "ClinicalTrials.gov"],
    outcome: "303+ trial records, 18 recruiting studies, and adoption by 100+ researchers.",
    links: [
      { label: "Open live platform", href: "https://crisprtrials.duckdns.org/" },
    ],
  },
  {
    number: "02",
    date: "APR 2026",
    type: "1st place / VillageHacks",
    title: "SlackDB",
    copy: "A Slack-native SQL approval system with AI risk scores, rollback plans, second-approver controls, and live migration metrics.",
    tags: ["FastAPI", "PostgreSQL", "Redis", "Slack Bolt"],
    outcome: "Won 1st place at VillageHacks; sustained 20 requests/sec with sub-500ms p95 latency.",
    links: [
      { label: "Open live demo", href: "https://slackdb.vercel.app/" },
      { label: "View source", href: "https://github.com/AayushP123/slackdb" },
    ],
  },
  {
    number: "03",
    date: "JUN 2026",
    type: "Merged open source",
    title: "Microsoft Kiota",
    copy: "Improved OpenAPI parsing diagnostics in Microsoft Kiota while preserving exception behavior, then added regression coverage for malformed enum flags.",
    tags: ["C#", ".NET", "xUnit", "OpenAPI"],
    outcome: "Merged into Microsoft Kiota after maintainer review and full regression validation.",
    links: [
      { label: "View merged PR", href: "https://github.com/microsoft/kiota/pull/7760" },
    ],
  },
  {
    number: "04",
    date: "JAN / APR 2026",
    type: "Systems programming",
    title: "NES 6502 Emulator",
    copy: "A cycle-aware Nintendo Entertainment System emulator implementing the 6502 CPU, PPU rendering, DMA stalls, memory-mapped I/O, and cartridge loading.",
    tags: ["Rust", "6502", "winit", "iNES"],
    outcome: "Runs Mapper 0 ROMs at 256x240 and validates CPU behavior against nestest traces.",
    links: [
      { label: "View source", href: "https://github.com/AayushP123/NES-Emulator" },
    ],
  },
  {
    number: "05",
    date: "AUG 2025 / MAY 2026",
    type: "ML research",
    title: "Modified DoWG",
    copy: "A custom PyTorch optimizer study combining adaptive step sizing, EMA weight swaps, deterministic training, and CUDA-accelerated convergence sweeps.",
    tags: ["PyTorch", "CUDA", "NumPy", "ResNet-18"],
    outcome: "Reproducible CIFAR-10 experiments made optimizer behavior measurable and comparable.",
    links: [
      { label: "Open notebook", href: "https://colab.research.google.com/drive/1Uv9eyc7KvKnYFxlBVmFXh9tQ3sQd-ddP?usp=sharing" },
    ],
  },
];

const skills = [
  { name: "Java", mark: "JV", category: "Languages" },
  { name: "Python", mark: "PY", category: "Languages" },
  { name: "Kotlin", mark: "KT", category: "Languages" },
  { name: "TypeScript", mark: "TS", category: "Languages" },
  { name: "JavaScript", mark: "JS", category: "Languages" },
  { name: "Rust", mark: "RS", category: "Languages" },
  { name: "C / C++", mark: "C++", category: "Languages" },
  { name: "SQL", mark: "SQL", category: "Languages" },
  { name: "C#", mark: "C#", category: "Languages" },
  { name: "React", mark: "RE", category: "Frontend" },
  { name: "Next.js", mark: "NX", category: "Frontend" },
  { name: "Spring Boot", mark: "SB", category: "Backend" },
  { name: "FastAPI", mark: "FA", category: "Backend" },
  { name: ".NET", mark: "NT", category: "Backend" },
  { name: "GraphQL", mark: "GQ", category: "Backend" },
  { name: "AWS", mark: "AWS", category: "Cloud" },
  { name: "Docker", mark: "DK", category: "Cloud" },
  { name: "GitHub Actions", mark: "CI", category: "Cloud" },
  { name: "Vercel", mark: "VC", category: "Cloud" },
  { name: "MySQL", mark: "MY", category: "Data / AI" },
  { name: "DynamoDB", mark: "DY", category: "Data / AI" },
  { name: "Redis", mark: "RD", category: "Data / AI" },
  { name: "PyTorch", mark: "PT", category: "Data / AI" },
];

const skillFilters = ["All", "Languages", "Frontend", "Backend", "Cloud", "Data / AI"];
const heroWords = ["ENGINEER", "BUILDER", "RESEARCHER", "SHIPPER"];

function navigateToSection(event: MouseEvent<HTMLAnchorElement>) {
  const hash = event.currentTarget.getAttribute("href");
  if (!hash?.startsWith("#")) return;

  const target = document.querySelector(hash);
  if (!(target instanceof HTMLElement)) return;

  event.preventDefault();
  const scrollOffset = Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
  const targetTop = target.getBoundingClientRect().top + window.scrollY - scrollOffset;

  window.scrollTo({ top: Math.max(0, targetTop), behavior: "auto" });
  window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
  event.currentTarget.blur();
}

export default function Home() {
  const [activeSkill, setActiveSkill] = useState("All");
  const [wordIndex, setWordIndex] = useState(0);
  const [introActive, setIntroActive] = useState(true);

  const visibleSkills = useMemo(
    () => skills.filter((skill) => activeSkill === "All" || skill.category === activeSkill),
    [activeSkill],
  );

  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const introSeen = window.sessionStorage.getItem("ap-intro-seen") === "true";
    let scrollFrame = 0;
    let pointerFrame = 0;

    const introTimer = window.setTimeout(() => {
      setIntroActive(false);
      window.sessionStorage.setItem("ap-intro-seen", "true");
    }, introSeen || reducedMotion ? 0 : 1850);

    const wordTimer = reducedMotion
      ? 0
      : window.setInterval(() => setWordIndex((current) => (current + 1) % heroWords.length), 2200);

    const updateScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      root.style.setProperty("--page-progress", String(maxScroll > 0 ? window.scrollY / maxScroll : 0));
      root.style.setProperty("--hero-drift", `${Math.min(window.scrollY * 0.08, 80)}px`);
      scrollFrame = 0;
    };

    const onScroll = () => {
      if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      cancelAnimationFrame(pointerFrame);
      pointerFrame = requestAnimationFrame(() => {
        root.style.setProperty("--cursor-x", `${event.clientX}px`);
        root.style.setProperty("--cursor-y", `${event.clientY}px`);
        root.classList.add("cursor-active");
      });
    };

    const hideSpotlight = () => root.classList.remove("cursor-active");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      }),
      { threshold: 0.12 },
    );

    document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));
    updateScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    if (!reducedMotion) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.addEventListener("pointerleave", hideSpotlight);
      window.addEventListener("blur", hideSpotlight);
    }

    return () => {
      window.clearTimeout(introTimer);
      if (wordTimer) window.clearInterval(wordTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", hideSpotlight);
      window.removeEventListener("blur", hideSpotlight);
      cancelAnimationFrame(scrollFrame);
      cancelAnimationFrame(pointerFrame);
      observer.disconnect();
    };
  }, []);

  return (
    <main>
      <Starfield />
      <div className="page-progress" aria-hidden="true" />
      <div className="cursor-spotlight" aria-hidden="true" />

      <div className={`boot-screen ${introActive ? "is-active" : "is-complete"}`} aria-hidden="true">
        <div className="boot-brand">Aayush <span>Pandey</span></div>
        <div className="boot-subtitle"><span /> Personal portfolio <span /></div>
        <div className="boot-line"><i /></div>
        <p>Ideate. Design. Develop. <strong>Innovate.</strong></p>
      </div>

      <header className="nav-shell">
        <a className="nav-brand" href="#home" onClick={navigateToSection} aria-label="Aayush Pandey, home">AP<span>.</span></a>
        <nav aria-label="Main navigation">
          <a href="#home" onClick={navigateToSection}>Home</a>
          <a href="#about" onClick={navigateToSection}>About</a>
          <a href="#experience" onClick={navigateToSection}>Experience</a>
          <a href="#projects" onClick={navigateToSection}>Projects</a>
          <a href="#skills" onClick={navigateToSection}>Skills</a>
          <a href="#contact" onClick={navigateToSection}>Contact</a>
        </nav>
        <a className="nav-status" href="mailto:apand121@asu.edu" aria-label="Email Aayush Pandey">
          <span aria-hidden="true" /> 2027 internships
        </a>
      </header>

      <section className="hero" id="home" aria-labelledby="hero-title">
        <div className="orbit orbit-code"><strong>5M+</strong><span>users reached</span></div>
        <div className="orbit orbit-ai"><strong>6K</strong><span>ML experiments</span></div>
        <div className="orbit orbit-win"><strong>1ST</strong><span>hackathon</span></div>
        <div className="orbit orbit-speed"><strong>84%</strong><span>faster</span></div>

        <div className="hero-content">
          <p className="hero-overline">You landed on the portfolio of</p>
          <h1 id="hero-title"><span>Aayush</span> <em>Pandey</em></h1>
          <div className="hero-word" key={heroWords[wordIndex]}>{heroWords[wordIndex]}</div>
          <p className="hero-role">Software engineer / Electrical engineering at ASU</p>
          <p className="hero-summary">Backend systems, cloud platforms, AI/ML, data infrastructure, and developer tooling built to hold up outside the demo.</p>
          <div className="hero-actions">
            <a href="#projects" onClick={navigateToSection}>View projects</a>
            <a href="/Aayush-Pandey-Resume-2026.pdf" target="_blank" rel="noreferrer">View resume</a>
          </div>
        </div>

        <a className="scroll-cue" href="#about" onClick={navigateToSection} aria-label="Scroll to about section"><span>Scroll</span><i aria-hidden="true">↓</i></a>
      </section>

      <section className="about panel-section" id="about" aria-labelledby="about-title">
        <div className="section-title reveal">
          <span>01 / ABOUT</span>
          <h2 id="about-title">About me <em>/ behind the systems.</em></h2>
        </div>
        <div className="about-grid">
          <p className="about-lead reveal">I turn ambitious ideas into <strong>reliable products</strong>, moving comfortably across full-stack development, cloud systems, machine learning, developer tools, and low-level engineering.</p>
          <div className="about-copy reveal">
            <p>I care about software that is observable, reviewable, reversible, and easy for the next engineer to understand.</p>
            <p>Currently an SDE Intern at Kinective and an Electrical Engineering student at Arizona State University, graduating May 2028.</p>
          </div>
          <div className="capability-grid reveal" aria-label="Engineering capabilities">
            <article><span>01</span><h3>Full-stack products</h3><p>Useful interfaces backed by thoughtful systems.</p></article>
            <article><span>02</span><h3>Backend and cloud</h3><p>Services, APIs, data flows, and infrastructure.</p></article>
            <article><span>03</span><h3>AI and data</h3><p>Experiments and evaluation that produce evidence.</p></article>
            <article><span>04</span><h3>Systems and tooling</h3><p>Low-level software and tools engineers can trust.</p></article>
          </div>
        </div>
      </section>

      <section className="experience panel-section" id="experience" aria-labelledby="experience-title">
        <div className="section-title reveal">
          <span>02 / EXPERIENCE</span>
          <h2 id="experience-title">Work experience <em>/ professional journey.</em></h2>
        </div>
        <div className="experience-timeline">
          <div className="timeline-spine" aria-hidden="true" />
          {experience.map((item, index) => (
            <article className="experience-entry reveal" key={item.company}>
              <div className="experience-index">0{index + 1}</div>
              <div className="experience-node" aria-hidden="true" />
              <div className="experience-card">
                <div className="experience-meta"><span>{item.date}</span><span>{item.company}</span></div>
                <h3>{item.role}</h3>
                <p>{item.copy}</p>
                <div className="proof-row">{item.proof.map((proof) => <span key={proof}>{proof}</span>)}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="projects panel-section" id="projects" aria-labelledby="projects-title">
        <div className="section-title reveal">
          <span>03 / PROJECTS</span>
          <h2 id="projects-title">Project showcase <em>/ what I&apos;ve built.</em></h2>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card reveal" key={project.title}>
              <div className="project-top"><span>{project.type}</span><strong>{project.date}</strong></div>
              <div className="project-number">{project.number}</div>
              <h3>{project.title}</h3>
              <p>{project.copy}</p>
              <div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <div className="project-outcome"><span>Impact</span><p>{project.outcome}</p></div>
              <div className="project-links" aria-label={`${project.title} links`}>
                {project.links.map((link) => (
                  <a key={link.href} href={link.href} target="_blank" rel="noreferrer">{link.label} <span aria-hidden="true">↗</span></a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="skills panel-section" id="skills" aria-labelledby="skills-title">
        <div className="section-title reveal">
          <span>04 / SKILLS</span>
          <h2 id="skills-title">Technical skills <em>/ core expertise.</em></h2>
        </div>
        <div className="skill-filters reveal" role="group" aria-label="Filter technical skills">
          {skillFilters.map((filter) => (
            <button key={filter} type="button" aria-pressed={activeSkill === filter} onClick={() => setActiveSkill(filter)}>{filter}</button>
          ))}
        </div>
        <div className="skill-grid" aria-live="polite">
          {visibleSkills.map((skill) => (
            <article className="skill-card" key={skill.name}>
              <strong>{skill.mark}</strong>
              <span>{skill.name}</span>
              <small>{skill.category}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="contact panel-section" id="contact" aria-labelledby="contact-title">
        <div className="contact-copy reveal">
          <span>05 / CONTACT</span>
          <h2 id="contact-title">Let&apos;s build something that matters.</h2>
          <p>I&apos;m open to 2027 software engineering internships, ambitious teams, and technical problems with real ownership.</p>
          <a className="email-cta" href="mailto:apand121@asu.edu">apand121@asu.edu <span aria-hidden="true">↗</span></a>
        </div>
        <div className="profile-grid reveal">
          <a href="https://github.com/AayushP123" target="_blank" rel="noreferrer"><span>GitHub</span><strong>Build in public</strong><i aria-hidden="true">↗</i></a>
          <a href="https://www.linkedin.com/in/aayush-pandey-511827378/" target="_blank" rel="noreferrer"><span>LinkedIn</span><strong>Connect</strong><i aria-hidden="true">↗</i></a>
          <a href="mailto:apand121@asu.edu"><span>Email</span><strong>Start a conversation</strong><i aria-hidden="true">↗</i></a>
        </div>
      </section>

      <footer>
        <a href="#home" onClick={navigateToSection}>AP<span>.</span></a>
        <p>Aayush Pandey / Software Engineer / Tempe, Arizona</p>
        <span>© 2026</span>
      </footer>
    </main>
  );
}
