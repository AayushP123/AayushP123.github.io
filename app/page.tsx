"use client";

import { useEffect, useMemo, useState } from "react";
import Starfield from "./starfield";

const experience = [
  {
    company: "Kinective",
    role: "Software Development Engineering Intern",
    date: "JUN 2026 / NOW",
    copy: "Own integration work across enterprise systems, turning ambiguous requirements into reliable services, automated tests, and delivery pipelines.",
    proof: ["20+ workflows", "80%+ coverage", "Java / Kotlin"],
  },
  {
    company: "Future Today Inc.",
    role: "Software Engineer Intern",
    date: "AUG / DEC 2025",
    copy: "Improved high-scale content infrastructure for millions of users, strengthening data quality and release confidence across cloud and database workflows.",
    proof: ["5M+ users", "100+ defects blocked", "10K+ records fixed"],
  },
  {
    company: "Arizona State University",
    role: "Software Engineer Researcher",
    date: "AUG 2025 / APR 2026",
    copy: "Built repeatable ML research infrastructure for large-scale experimentation, parallel compute, and trustworthy performance comparisons.",
    proof: ["6,000 experiments", "84.3% throughput", "99% consistency"],
  },
];

const projects = [
  {
    number: "01",
    date: "VILLAGEHACKS",
    type: "1st place winner",
    title: "SlackDB",
    copy: "A Slack-native SQL approval system with AI risk scores, rollback plans, second-approver controls, and live migration metrics.",
    tags: ["FastAPI", "PostgreSQL", "Redis", "Slack Bolt"],
    outcome: "SQL changes become reviewable, reversible, and visible to the whole team.",
  },
  {
    number: "02",
    date: "CLOUD AUTOMATION",
    type: "FinOps system",
    title: "FinOps Agent",
    copy: "Finds AWS waste, checks reliability policy, then creates reviewable Terraform changes and approval trails instead of touching production directly.",
    tags: ["AWS", "Terraform", "GitHub API", "Docker"],
    outcome: "$12,480 in modeled monthly savings, with humans kept in control.",
  },
  {
    number: "03",
    date: "OPEN SOURCE",
    type: "Microsoft Kiota",
    title: "Webhook Models",
    copy: "Added OpenAPI webhook schema model generation to Microsoft's C# generator and shipped regression tests for referenced and inline schemas.",
    tags: ["C#", ".NET", "xUnit", "OpenAPI"],
    outcome: "Merged contribution backed by 2,190 passing tests.",
    href: "https://github.com/microsoft/kiota/pull/7943",
  },
];

const skills = [
  { name: "Java", mark: "JV", category: "Languages" },
  { name: "Python", mark: "PY", category: "Languages" },
  { name: "Kotlin", mark: "KT", category: "Languages" },
  { name: "TypeScript", mark: "TS", category: "Languages" },
  { name: "C#", mark: "C#", category: "Languages" },
  { name: "Spring Boot", mark: "SB", category: "Backend" },
  { name: "FastAPI", mark: "FA", category: "Backend" },
  { name: ".NET", mark: "NT", category: "Backend" },
  { name: "GraphQL", mark: "GQ", category: "Backend" },
  { name: "AWS", mark: "AWS", category: "Cloud" },
  { name: "Docker", mark: "DK", category: "Cloud" },
  { name: "Terraform", mark: "TF", category: "Cloud" },
  { name: "PostgreSQL", mark: "PG", category: "Data / AI" },
  { name: "Redis", mark: "RD", category: "Data / AI" },
  { name: "PyTorch", mark: "PT", category: "Data / AI" },
];

const skillFilters = ["All", "Languages", "Backend", "Cloud", "Data / AI"];
const heroWords = ["ENGINEER", "BUILDER", "RESEARCHER", "SHIPPER"];

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

    if (introSeen || reducedMotion) {
      setIntroActive(false);
    }

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
        <a className="nav-brand" href="#home" aria-label="Aayush Pandey, home">AP<span>.</span></a>
        <nav aria-label="Main navigation">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
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
            <a href="#projects">View projects</a>
            <a href="https://www.linkedin.com/in/aayush-pandey-511827378/" target="_blank" rel="noreferrer">Let&apos;s connect</a>
          </div>
        </div>

        <a className="scroll-cue" href="#about" aria-label="Scroll to about section"><span>Scroll</span><i aria-hidden="true">↓</i></a>
      </section>

      <section className="about panel-section" id="about" aria-labelledby="about-title">
        <div className="section-title reveal">
          <span>01 / ABOUT</span>
          <h2 id="about-title">About me <em>/ behind the systems.</em></h2>
        </div>
        <div className="about-grid">
          <p className="about-lead reveal">I turn ambiguous problems into <strong>reliable products</strong>, moving comfortably from architecture and APIs to cloud infrastructure, ML experiments, and polished delivery.</p>
          <div className="about-copy reveal">
            <p>I care about software that is observable, reviewable, reversible, and easy for the next engineer to understand.</p>
            <p>Currently an SDE Intern at Kinective and an Electrical Engineering student at Arizona State University, graduating May 2028.</p>
          </div>
          <div className="capability-grid reveal" aria-label="Engineering capabilities">
            <article><span>01</span><h3>Product engineering</h3><p>Discover, design, and ship useful software.</p></article>
            <article><span>02</span><h3>Backend and cloud</h3><p>Services, APIs, data flows, and infrastructure.</p></article>
            <article><span>03</span><h3>AI/ML systems</h3><p>Experiments and evaluation that produce evidence.</p></article>
            <article><span>04</span><h3>Reliable delivery</h3><p>Testable, observable, reversible releases.</p></article>
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
              {project.href && <a className="project-link" href={project.href} target="_blank" rel="noreferrer">View contribution <span aria-hidden="true">↗</span></a>}
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
        <a href="#home">AP<span>.</span></a>
        <p>Aayush Pandey / Software Engineer / Tempe, Arizona</p>
        <span>© 2026</span>
      </footer>
    </main>
  );
}
