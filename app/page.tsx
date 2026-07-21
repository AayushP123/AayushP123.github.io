"use client";

import { useEffect } from "react";

const experience = [
  {
    company: "Kinective",
    role: "Software Development Engineering Intern",
    date: "JUN 2026 — NOW",
    color: "lime",
    copy: "Building Java and Spring Boot integrations for credit-union banking workflows, then making them harder to break with Kotlin, Cucumber, GraphQL validation, and CI/CD gates.",
    proof: ["20+ workflows", "80%+ coverage", "Java / Kotlin"],
  },
  {
    company: "Future Today Inc.",
    role: "Software Engineer Intern",
    date: "AUG — DEC 2025",
    color: "orange",
    copy: "Kept content moving for HappyKids across connected-TV platforms, built a Pytest release gate, and cleaned the data path from MySQL to Redis to AWS delivery.",
    proof: ["5M+ users", "100+ defects blocked", "10K+ records fixed"],
  },
  {
    company: "Arizona State University",
    role: "Software Engineer Researcher",
    date: "AUG 2025 — APR 2026",
    color: "blue",
    copy: "Parallelized PyTorch workloads across A100 GPUs and built deterministic experiment logging for a serious optimizer search, not a one-off notebook demo.",
    proof: ["6,000 experiments", "84.3% throughput", "99% consistency"],
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
    const projectStage = document.querySelector<HTMLElement>(".projects-stage");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let ticking = false;

    const update = () => {
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      root.style.setProperty("--page-progress", String(maxScroll > 0 ? window.scrollY / maxScroll : 0));
      root.style.setProperty("--hero-shift", `${Math.min(window.scrollY * 0.19, 150)}px`);

      if (projectStage && window.innerWidth > 820) {
        const rect = projectStage.getBoundingClientRect();
        const distance = projectStage.offsetHeight - window.innerHeight;
        const progress = Math.min(1, Math.max(0, -rect.top / distance));
        root.style.setProperty("--project-progress", String(progress));
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

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

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <main>
      <div className="progress" aria-hidden="true" />

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
            I build backend systems that survive contact with reality. Banking integrations,
            cloud automation, ML infrastructure, and open-source tooling.
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

      <section className="signal" aria-label="Selected impact metrics">
        <div className="signal-track">
          <span><strong>5M+</strong> users served</span>
          <i>×</i>
          <span><strong>6K</strong> ML experiments</span>
          <i>×</i>
          <span><strong>1ST</strong> at VillageHacks</span>
          <i>×</i>
          <span><strong>20+</strong> banking workflows</span>
          <i>×</i>
          <span><strong>5M+</strong> users served</span>
          <i>×</i>
          <span><strong>6K</strong> ML experiments</span>
        </div>
      </section>

      <section className="intro section-pad">
        <div className="section-index reveal">01 / OPERATING PRINCIPLE</div>
        <p className="statement reveal">
          Good software is more than code that runs. It is <em>observable</em>, reviewable,
          reversible, and built around the people who have to trust it.
        </p>
        <div className="intro-aside reveal">
          <span>Currently</span>
          <p>SDE Intern at Kinective + Electrical Engineering at ASU, graduating May 2028.</p>
        </div>
      </section>

      <section className="experience section-pad" id="experience">
        <div className="section-head reveal">
          <div>
            <span className="section-index">02 / FIELD NOTES</span>
            <h2>Work that moved<br />the needle.</h2>
          </div>
          <p>Three roles. Different domains. Same obsession: make the system clearer, faster, and safer to ship.</p>
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
        <div className="projects-sticky">
          <div className="projects-label">
            <span className="section-index">03 / SELECTED BUILDS</span>
            <span className="projects-count">01 — 03</span>
          </div>
          <div className="project-track">
            <article className="project-card project-lime">
              <div className="project-copy">
                <div className="project-meta"><span>01</span><span>Hackathon winner</span></div>
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

            <article className="project-card project-orange">
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

            <article className="project-card project-blue">
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
        </div>
      </section>

      <section className="research section-pad">
        <div className="research-grid" aria-hidden="true" />
        <div className="section-index reveal">04 / RESEARCH MODE</div>
        <div className="research-copy reveal">
          <span className="eyebrow">ASU / PyTorch / A100</span>
          <h2>6,000 runs.<br />One honest result.</h2>
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
          <div><span className="section-index">05 / TOOLBOX</span><h2>Built across<br />the stack.</h2></div>
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
          <span className="section-index">06 / SAY HELLO</span>
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
