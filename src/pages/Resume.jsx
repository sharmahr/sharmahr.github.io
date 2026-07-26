import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Seo from "../components/Seo.jsx";
import Reveal from "../components/Reveal.jsx";
import { ArrowBack } from "../components/icons.jsx";
import { listParent, listChild, VIEWPORT } from "../lib/motion.js";

export default function Resume() {
  return (
    <>
      <Seo
        title="Résumé — Hardik Sharma"
        description="Résumé of Hardik Sharma — software engineer with 6+ years across Microsoft, Harness and VMware building distributed systems and cloud infrastructure."
        path="/resume"
      />

      <main id="main" className="wrap">
        <Reveal className="pagehead">
          <Link className="back mono noprint" to="/">
            <ArrowBack />
            Back
          </Link>
          <h1>Hardik Sharma</h1>
          <p className="mono muted mt-md">Software Engineer · Hyderabad, India</p>
          <p className="mono mono--sent muted mt-sm">
            <a className="lnk" href="mailto:sharmahardik.mail@gmail.com">sharmahardik.mail@gmail.com</a> ·{" "}
            <a className="lnk" href="https://github.com/sharmahr" target="_blank" rel="noopener">github.com/sharmahr</a> ·{" "}
            <a className="lnk" href="https://www.linkedin.com/in/sharmahr/" target="_blank" rel="noopener">linkedin.com/in/sharmahr</a> ·{" "}
            <Link className="lnk" to="/">sharmahr.github.io</Link>
          </p>
          <div className="hero__cta noprint mt-2xl">
            <button className="btn btn--solid" type="button" onClick={() => window.print()}>Save as PDF</button>
            <a className="btn" href="mailto:sharmahardik.mail@gmail.com?subject=Role%20opportunity">Email me</a>
          </div>
        </Reveal>

        <div className="cv">
          <Reveal as="section" className="cv__sec">
            <h2 className="cv__h">Summary</h2>
            <p className="measure">
              Software engineer with 6+ years building large-scale distributed systems, cloud
              infrastructure platforms, AI-powered products and developer-productivity tooling.
              I have led end-to-end development of platforms serving enterprise and consumer
              workloads at Microsoft, Harness and VMware — designing scalable backend systems,
              cloud-native applications and automation platforms in Java, Python and Kubernetes.
            </p>
          </Reveal>

          <motion.section
            className="cv__sec"
            data-reveal
            variants={listParent(0.06, 0.03)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            <motion.h2 className="cv__h" variants={listChild}>Experience</motion.h2>

            <motion.article className="cv__job" variants={listChild}>
              <div className="cv__jobhead">
                <p className="cv__role">Software Engineer 2 — Microsoft</p>
                <span className="mono muted">10/2025 — Present</span>
              </div>
              <p className="cv__co">Frontier Foundry · Hyderabad, India</p>
              <ul className="bullets">
                <li>Built an AI-powered personalisation platform for Bing and OneDrive that adapts wallpapers based on season, time of day and contextual signals.</li>
                <li>Developed a real-time voice assistant that understands user intent, executes tasks across services and delivers low-latency conversational responses.</li>
              </ul>
            </motion.article>

            <motion.article className="cv__job" variants={listChild}>
              <div className="cv__jobhead">
                <p className="cv__role">Senior Software Engineer — Harness</p>
                <span className="mono muted">09/2024 — 06/2025</span>
              </div>
              <p className="cv__co">Cloud Cost Management · Bangalore, India</p>
              <ul className="bullets">
                <li>Led design and implementation of a seed-based Reserved Instance optimisation workflow that automatically provisions, expands and rebalances commitments while preserving expiration timelines and maximising coverage.</li>
                <li>Built a transaction execution accelerator for RI exchanges that reduced end-to-end execution time from 8 hours to under 20 minutes through workflow orchestration, resiliency improvements and parallelised processing.</li>
                <li>Integrated commitment and cluster optimisation engines to prioritise underutilised Reserved Instances and Savings Plans, improving commitment utilisation and reducing unnecessary cloud spend.</li>
                <li>Developed a commitment inventory platform providing real-time visibility into Reserved Instances and Savings Plans across cloud accounts.</li>
              </ul>
            </motion.article>

            <motion.article className="cv__job" variants={listChild}>
              <div className="cv__jobhead">
                <p className="cv__role">Member of Technical Staff 3 — VMware</p>
                <span className="mono muted">07/2020 — 08/2024</span>
              </div>
              <p className="cv__co">VMware Cloud Platform · Bangalore, India</p>
              <ul className="bullets">
                <li>Architected and delivered a large-scale vulnerability remediation platform that scanned and patched infrastructure across 4,000+ datacenters, reducing operational overhead and accelerating security response times.</li>
                <li>Led development of a distributed fleet execution platform enabling secure remote execution of automation workflows across thousands of datacenters, improving operational efficiency by over 50%.</li>
                <li>Built semantic search capabilities using transformer-based models, improving result relevance and helping engineers discover operational insights faster.</li>
                <li>Developed automated patch orchestration, incident escalation workflows and real-time operational dashboards.</li>
                <li>Built monitoring and reporting services that automated SLA computation and health tracking across critical infrastructure components.</li>
              </ul>
            </motion.article>

            <motion.article className="cv__job" variants={listChild}>
              <div className="cv__jobhead">
                <p className="cv__role">Software Engineering Intern — VMware</p>
                <span className="mono muted">01/2020 — 06/2020</span>
              </div>
              <p className="cv__co">VMware Cloud Platform · Bangalore, India</p>
              <ul className="bullets">
                <li>Built an intelligent recommendation service matching operational incidents with relevant remediation scripts, reducing average incident resolution time by 50%.</li>
                <li>Developed a cloud-based IDE using Eclipse Che and Theia that streamlined script development, testing and deployment for infrastructure automation engineers.</li>
              </ul>
            </motion.article>
          </motion.section>

          <motion.section
            className="cv__sec"
            data-reveal
            variants={listParent(0.06, 0.03)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            <motion.h2 className="cv__h" variants={listChild}>Projects</motion.h2>
            <motion.article className="cv__job" variants={listChild}>
              <div className="cv__jobhead">
                <p className="cv__role">AlgoRush — interactive coding-interview platform</p>
                <span className="mono muted"><a className="lnk" href="https://algorush.web.app/" target="_blank" rel="noopener">algorush.web.app</a></span>
              </div>
              <ul className="bullets">
                <li>Interview-prep platform with 1,500+ registered users, offering curated problem sets, customisable practice tracks and structured roadmaps. Built and operated solo.</li>
              </ul>
            </motion.article>
            <motion.article className="cv__job" variants={listChild}>
              <div className="cv__jobhead">
                <p className="cv__role">Smart Parking System — Smart India Hackathon 2019</p>
                <span className="mono muted">Top 4 of 314 teams</span>
              </div>
              <ul className="bullets">
                <li>Parking system using Mask R-CNN object detection to identify vacant bays from camera feeds, letting drivers reserve spots through an Android app. Led a team of five.</li>
              </ul>
            </motion.article>
            <motion.article className="cv__job" variants={listChild}>
              <div className="cv__jobhead">
                <p className="cv__role">MacStorage Studio &amp; zed-db — open source</p>
                <span className="mono muted"><a className="lnk" href="https://github.com/sharmahr" target="_blank" rel="noopener">github.com/sharmahr</a></span>
              </div>
              <ul className="bullets">
                <li>Native macOS disk-analysis app in Swift with an isolated scanner process and local SQLite metadata; and a persistent relational database engine in Python with a SQL parser, B-tree storage, indexes, joins and transactions.</li>
              </ul>
            </motion.article>
          </motion.section>

          <Reveal as="section" className="cv__sec">
            <h2 className="cv__h">Education</h2>
            <div className="cv__jobhead">
              <p className="cv__role">B.E. Computer Science &amp; Engineering — GPA 8.86/10</p>
              <span className="mono muted">08/2016 — 07/2020</span>
            </div>
            <p className="cv__co">Shri Ramdeobaba College of Engineering and Management · Nagpur, India</p>
            <p className="fineprint">
              Coursework: Data Structures &amp; Algorithms, Operating Systems, DBMS,
              System Design, Distributed Systems, Computer Networks.
            </p>
          </Reveal>

          <Reveal as="section" className="cv__sec">
            <h2 className="cv__h">Technical skills</h2>
            <dl className="tools">
              <div className="toolrow">
                <dt className="mono">Languages</dt>
                <dd><span className="chip">Java</span><span className="chip">Python</span><span className="chip">TypeScript</span><span className="chip">Swift</span><span className="chip">SQL</span></dd>
              </div>
              <div className="toolrow">
                <dt className="mono">Technologies</dt>
                <dd>
                  <span className="chip">Spring Boot</span><span className="chip">Angular</span><span className="chip">React</span>
                  <span className="chip">FastAPI</span><span className="chip">Flask</span><span className="chip">Docker</span>
                  <span className="chip">Kubernetes</span><span className="chip">Helm</span><span className="chip">PostgreSQL</span>
                  <span className="chip">MongoDB</span><span className="chip">Elasticsearch</span><span className="chip">StackStorm</span>
                  <span className="chip">Transformers</span><span className="chip">AWS</span><span className="chip">GCP</span><span className="chip">Git</span>
                </dd>
              </div>
              <div className="toolrow">
                <dt className="mono">Methodologies</dt>
                <dd><span className="chip">Agile</span><span className="chip">Scrum</span><span className="chip">TDD</span><span className="chip">REST APIs</span><span className="chip">Microservices</span></dd>
              </div>
            </dl>
          </Reveal>

          <Reveal as="section" className="cv__sec">
            <h2 className="cv__h">Awards</h2>
            <ul className="bullets">
              <li><b>Exceptional Mentorship Award</b>, VMware — mentored the winning team at VMware Bootcamp 2021.</li>
              <li><b>Spot Award</b>, VMware — fleet-wide scanning and patching during the Log4Shell response.</li>
              <li><b>At Our Best Award</b>, VMware — automated SLA service.</li>
              <li><b>Smart India Hackathon 2019</b> — top 4 of 314 teams, Smart Parking System.</li>
              <li><b>Winner, Escalade</b>, IIT Guwahati 2018 — first of 60 teams, wall-climbing robot.</li>
              <li><b>Third place, Meshmerize</b>, Techfest IIT Bombay — maze-solving robot.</li>
            </ul>
          </Reveal>
        </div>
      </main>
    </>
  );
}
