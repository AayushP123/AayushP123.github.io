"use client";

import { useEffect } from "react";

const experience = [
  {
    company: "Kinective",
    role: "Software Development Engineering Intern",
    date: "JUN 2026 — NOW",
    color: "lime",
    copy: "Own integration work across enterprise systems, turning ambiguous requirements into reliable services, automated tests, and delivery pipelines.",
    proof: ["20+ workflows", "80%+ coverage", "Java / Kotlin"],
  },
  {
    company: "Future Today Inc.",
    role: "Software Engineer Intern",
    date: "AUG — DEC 2025",
    color: "orange",
    copy: "Worked on high-scale content infrastructure for millions of users, improving data quality and release confidence across cloud and database workflows.",
    proof: ["5M+ users", "100+ defects blocked", "10K+ records fixed"],
  },
  {
    company: "Arizona State University",
    role: "Software Engineer Researcher",
    date: "AUG 2025 — APR 2026",
    color: "blue",
    copy: "Built repeatable ML research infrastructure for large-scale experimentation, parallel compute, and trustworthy performance comparisons.",
    proof: ["6,000 experiments", "84.3% throughput", "99% consistency"],
  },
];

const capabilities = [
  {
    title: "Product engineering",
    copy: "Turn fuzzy requirements into useful software, from the first technical decision through a polished release.",
    detail: "DISCOVER / DESIGN / SHIP",
  },
  {
    title: "Backend & cloud",
    copy: "Design APIs, services, data flows, and infrastructure that stay understandable as products and teams grow.",
    detail: "SYSTEMS / DATA / PLATFORM",
  },
  {
    title: "AI/ML systems",
    copy: "Build experiments, evaluation pipelines, and applied intelligence that produce evidence instead of demos.",
    detail: "RESEARCH / EVALUATE / APPLY",
  },
  {
    title: "Reliable delivery",
    copy: "Make releases observable, testable, and reversible so teams can move quickly without guessing.",
    detail: "TEST / OBSERVE / IMPROVE",
  },
];

const stack = [
  "Java",
  "Python",
  "Kotlin",
  "TypeScript",
  "C#",
  "Spring Boot",
  "FastAPI",
  ".NET",
  "GraphQL",
  "AWS",
  "Docker",
  "Terraform",
  "PostgreSQL",
  "Redis",
  "PyTorch",
];

export default function Home() {
  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let ticking = false;
    let cursorFrame = 0;

    const update = () => {
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      root.style.setProperty("--page-progress", String(maxScroll > 0 ? window.scrollY / maxScroll : 0));
      root.style.setProperty("--hero-shift", `${Math.min(window.scrollY * 0.19, 150)}px`);
      root.style.setProperty("--kinetic-shift", `${Math.min(window.scrollY * 0.045, 280)}px`);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      cancelAnimationFrame(cursorFrame);
      cursorFrame = requestAnimationFrame(() => {
        root.style.setProperty("--cursor-x", `${event.clientX}px`);
        root.style.setProperty("--cursor-y", `${event.clientY}px`);
        root.classList.add("cursor-active");
      });
    };

    const onPointerLeave = () => root.classList.remove("cursor-active");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.14 },
    );

    document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));
    if (reducedMotion) root.classList.add("reduce-motion");
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    if (!reducedMotion) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.addEventListener("pointerleave", onPointerLeave);
      window.addEventListener("blur", onPointerLeave);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("blur", onPointerLeave);
      cancelAnimationFrame(cursorFrame);
      observer.disconnect();
    };
  }, []);

  return (
    <main>
      <div className="progress" aria-hidden="true" />
      <div className="cursor-spotlight" aria-hidden="true" />

      <header className="topbar">
        <a className="monogram" href="#top" aria-label="Aayush Pandey, back to top">
          AP<span>.</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="availability" href="mailto:apand121@asu.edu">
          <span aria-hidden="true" /> Open to 2027 internships
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-kicker">
          <span>Software engineer</span>
          <span>Tempe, AZ / 33.4255° N</span>
        </div>
        <h1>
          <span>AAYUSH</span>
          <span className="outline">PANDEY</span>
        </h1>
        <div className="hero-bottom">
          <p>
            I design and ship software across backend systems, cloud platforms, data
            infrastructure, AI/ML, and developer tooling. I turn ambiguous problems into reliable products.
          </p>
          <a className="round-link" href="#projects" aria-label="See selected projects">
            <span aria-hidden="true">↓</span>
          </a>
        </div>
        <div className="hero-stamp" aria-hidden="true">
          <span>BUILD</span>
          <span>MEASURE</span>
          <span>SHIP</span>
        </div>
      </section>

      <section className="impact" aria-labelledby="impact-title">
        <div className="impact-heading">
          <span className="section-index">KEY IMPACT</span>
          <h2 id="impact-title">Results at a glance.</h2>
        </div>
        <div className="impact-grid">
          <article className="impact-lime">
            <strong>1ST</strong>
            <span>VillageHacks winner</span>
          </article>
          <article className="impact-orange">
            <strong>5M+</strong>
            <span>users reached</span>
          </article>
          <article className="impact-blue">
            <strong>6,000</strong>
            <span>ML experiments</span>
          </article>
          <article className="impact-cyan">
            <strong>84.3%</strong>
            <span>throughput gain</span>
          </article>
        </div>
      </section>

      <section className="intro section-pad" aria-labelledby="about-title">
        <div className="section-index reveal">01 / ABOUT</div>
        <h2 className="statement reveal" id="about-title">
          Good software is more than code that runs. It is <em>observable</em>, reviewable,
          reversible, and built around the people who have to trust it.
        </h2>
        <div className="intro-aside reveal">
          <span>Currently</span>
          <p>SDE Intern at Kinective + Electrical Engineering at ASU, graduating May 2028.</p>
        </div>
      </section>

      <section className="capabilities section-pad" aria-labelledby="capabilities-title">
        <div className="capabilities-head reveal">
          <span className="section-index">02 / CAPABILITIES</span>
          <h2 id="capabilities-title">What I can do.</h2>
        </div>
        <div className="capabilities-list">
          {capabilities.map((capability, index) => (
            <article className="capability-row reveal" key={capability.title}>
              <span className="capability-number">{String(index + 1).padStart(2, "0")}</span>
              <h3>{capability.title}</h3>
              <p>{capability.copy}</p>
              <span className="capability-detail">{capability.detail}</span>
            </article>
          ))}
        </div>
      </section>

      <div className="kinetic-band" aria-hidden="true">
        <div>PRODUCTS / SYSTEMS / INTELLIGENCE / SCALE / PRODUCTS / SYSTEMS</div>
        <div>BUILD / TEST / LEARN / SHIP / BUILD / TEST / LEARN / SHIP</div>
      </div>

      <section className="experience section-pad" id="experience">
        <div className="section-head reveal">
          <div>
            <span className="section-index">03 / EXPERIENCE</span>
            <h2>Experience.</h2>
          </div>
          <p>Software engineering roles across financial technology, streaming media, and university research.</p>
        </div>

        <div className="timeline">
          {experience.map((item, index) => (
            <article className={`timeline-row ${item.color} reveal`} key={item.company}>
              <div className="timeline-number">0{index + 1}</div>
              <div className="timeline-title">
                <span>{item.date}</span>
                <h3>{item.company}</h3>
                <p>{item.role}</p>
              </div>
              <p className="timeline-copy">{item.copy}</p>
              <div className="timeline-proof">
                {item.proof.map((proof) => <span key={proof}>{proof}</span>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="projects-stage" id="projects">
        <div className="projects-label reveal">
          <div>
            <span className="section-index">04 / PROJECTS</span>
            <h2>Selected projects.</h2>
          </div>
          <span className="projects-count">01 — 03</span>
        </div>
        <div className="project-track">
            <article className="project-card project-lime reveal">
              <div className="project-copy">
                <div className="project-meta"><span>01</span><span>1st place / VillageHacks</span></div>
                <h3>SlackDB</h3>
                <p>A Slack-native SQL approval system with AI risk scores, rollback plans, second-approver controls, and live migration metrics.</p>
                <div className="tags"><span>FastAPI</span><span>PostgreSQL</span><span>Redis</span><span>Slack Bolt</span></div>
              </div>
              <div className="project-visual slack-visual" aria-label="SlackDB product interface illustration">
                <div className="fake-window">
                  <div className="window-bar"><span /><span /><span /><b>SQL / APPROVAL_QUEUE</b></div>
                  <div className="slack-body">
                    <div className="channels"><b>SLACKDB</b><span># migrations</span><span># approvals</span><span># audit-log</span></div>
                    <div className="approval">
                      <small>AUTODB / 09:41</small>
                      <h4>ALTER TABLE users</h4>
                      <code>ADD COLUMN risk_score DECIMAL;</code>
                      <div className="risk"><span>RISK SCORE</span><strong>18 / 100</strong></div>
                      <div className="approve-row"><button>Approve</button><button>View rollback</button></div>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            <article className="project-card project-orange reveal">
              <div className="project-copy">
                <div className="project-meta"><span>02</span><span>Cloud automation</span></div>
                <h3>FinOps Agent</h3>
                <p>Finds AWS waste, checks reliability policy, then creates reviewable Terraform changes and approval trails instead of touching production directly.</p>
                <div className="tags"><span>AWS</span><span>Terraform</span><span>GitHub API</span><span>Docker</span></div>
              </div>
              <div className="project-visual finops-visual" aria-label="FinOps Agent cost report illustration">
                <div className="cost-heading"><small>POTENTIAL MONTHLY SAVINGS</small><strong>$12,480</strong></div>
                <div className="bars" aria-hidden="true">
                  <span style={{ height: "32%" }} /><span style={{ height: "58%" }} /><span style={{ height: "44%" }} /><span style={{ height: "81%" }} /><span style={{ height: "64%" }} /><span style={{ height: "92%" }} />
                </div>
                <div className="cost-row"><span>EC2 / us-west-2</span><strong>RIGHTSIZE</strong></div>
                <div className="cost-row"><span>RDS / us-east-1</span><strong>REVIEW</strong></div>
                <div className="pr-badge">PR #104 READY FOR REVIEW</div>
              </div>
            </article>

            <article className="project-card project-blue reveal">
              <div className="project-copy">
                <div className="project-meta"><span>03</span><span>Open source</span></div>
                <h3>Microsoft Kiota</h3>
                <p>Added OpenAPI webhook schema model generation to Microsoft&apos;s C# generator and shipped regression tests for referenced and inline schemas.</p>
                <div className="tags"><span>C#</span><span>.NET</span><span>xUnit</span><span>OpenAPI</span></div>
                <a className="text-link" href="https://github.com/microsoft/kiota/pull/7943" target="_blank" rel="noreferrer">View pull request <span aria-hidden="true">↗</span></a>
              </div>
              <div className="project-visual code-visual" aria-label="Kiota code contribution illustration">
                <div className="code-top"><span>KiotaBuilder.cs</span><span>+42 −3</span></div>
                <pre><code><span className="dim">// OpenAPI 3.1 webhooks</span>{"\n"}<span className="blue-code">foreach</span> (var webhook in webhooks) {"{"}{"\n"}  <span className="lime-code">CreateWebhookModels</span>(webhook);{"\n"}  stopwatch.Start();{"\n"}{"}"}</code></pre>
                <div className="tests"><span>✓ referenced schema</span><span>✓ inline schema</span><strong>2190 PASSED</strong></div>
              </div>
            </article>
        </div>
      </section>

      <section className="research section-pad">
        <div className="research-grid" aria-hidden="true" />
        <div className="section-index reveal">05 / ML RESEARCH</div>
        <div className="research-copy reveal">
          <span className="eyebrow">ASU / PyTorch / A100</span>
          <h2>Machine learning research.</h2>
          <p>Parallelized data work across 8+ A100 GPUs, raised throughput 84.3%, and built deterministic checks that kept optimizer comparisons at 99% consistency.</p>
        </div>
        <div className="research-readout reveal" aria-label="Research metrics">
          <div><strong>84.3%</strong><span>throughput gain</span></div>
          <div><strong>71.77%</strong><span>best accuracy</span></div>
          <div><strong>99%</strong><span>run consistency</span></div>
        </div>
      </section>

      <section className="stack section-pad">
        <div className="section-head reveal">
          <div><span className="section-index">06 / TECHNICAL STACK</span><h2>Tools &amp;{" "}<br />technologies.</h2></div>
          <p>I pick tools for the constraint, not the résumé keyword. These are the ones I can put to work.</p>
        </div>
        <div className="stack-list reveal">
          {stack.map((item, index) => <span key={item}><i>{String(index + 1).padStart(2, "0")}</i>{item}</span>)}
        </div>
      </section>

      <section className="poster reveal" aria-label="Aayush Pandey portfolio poster">
        <img src="/og.png" alt="Aayush Pandey portfolio poster highlighting backend systems, cloud infrastructure, machine learning, and open-source engineering" />
      </section>

      <footer id="contact">
        <div className="footer-top">
          <span className="section-index">07 / CONTACT</span>
          <p>Have a hard problem, an ambitious team, or an internship with real ownership?</p>
        </div>
        <a className="email-link" href="mailto:apand121@asu.edu">LET&apos;S BUILD<span>.</span></a>
        <div className="footer-bottom">
          <span>Aayush Pandey © 2026</span>
          <div>
            <a href="https://github.com/AayushP123" target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href="https://www.linkedin.com/in/aayush-pandey-511827378/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a href="mailto:apand121@asu.edu">Email ↗</a>
          </div>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </main>
  );
}
