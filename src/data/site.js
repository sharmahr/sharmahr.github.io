/* Content lives here rather than inside JSX so the pages stay about
   structure and motion, and so the résumé and the home page can never
   drift out of sync with each other. */

export const PROFILE = {
  name: "Hardik Sharma",
  role: "Software Engineer 2",
  company: "Microsoft",
  team: "Frontier Foundry",
  location: "Hyderabad, India",
  email: "sharmahardik.mail@gmail.com",
  github: "https://github.com/sharmahr",
  linkedin: "https://www.linkedin.com/in/sharmahr/"
};

export const EXPERIENCE = [
  {
    company: "Microsoft",
    when: "10/2025 — Present",
    where: "Hyderabad, India",
    role: "Software Engineer 2",
    team: "Frontier Foundry",
    bullets: [
      "Built an <b>AI personalisation platform for Bing and OneDrive</b> that adapts wallpapers to season, time of day and contextual signals, making the surface feel responsive to the person using it rather than static.",
      "Developed a <b>real-time voice assistant</b> that infers user intent, executes tasks across services and returns conversational responses at low latency."
    ]
  },
  {
    company: "Harness",
    when: "09/2024 — 06/2025",
    where: "Bangalore, India",
    role: "Senior Software Engineer",
    team: "Cloud Cost Management",
    bullets: [
      "Led design and implementation of a <b>seed-based Reserved Instance optimisation workflow</b> that automatically provisions, expands and rebalances commitments while preserving expiration timelines and maximising coverage.",
      "Built a transaction execution accelerator for RI exchanges that took end-to-end execution from <b>eight hours to under twenty minutes</b>, through workflow orchestration, resiliency work and parallelised processing.",
      "Integrated commitment and cluster optimisation engines to prioritise underutilised Reserved Instances and Savings Plans, reducing wasted cloud spend.",
      "Developed a <b>commitment inventory platform</b> giving customers real-time visibility into RIs and Savings Plans across cloud accounts."
    ]
  },
  {
    company: "VMware",
    when: "07/2020 — 08/2024",
    where: "Bangalore, India",
    role: "Member of Technical Staff 3",
    team: "VMware Cloud Platform",
    bullets: [
      "Architected and delivered a <b>vulnerability remediation platform</b> that scanned and patched infrastructure across <b>4,000+ datacenters</b>, cutting operational overhead and shortening security response times.",
      "Led development of a <b>distributed fleet execution platform</b> for secure remote execution of automation workflows across thousands of datacenters, improving operational efficiency by <b>over 50%</b>.",
      "Built semantic search over operational data using <b>transformer-based models</b>, so engineers could find insights by meaning rather than exact keyword.",
      "Developed automated patch orchestration, incident escalation workflows and real-time operational dashboards.",
      "Built monitoring and reporting services that automated <b>SLA computation</b> and health tracking across critical infrastructure, removing manual reporting entirely."
    ]
  },
  {
    company: "VMware",
    when: "01/2020 — 06/2020",
    where: "Bangalore, India",
    role: "Software Engineering Intern",
    team: "VMware Cloud Platform",
    bullets: [
      "Built an intelligent recommendation service matching operational incidents to relevant remediation scripts, cutting <b>mean resolution time by 50%</b>.",
      "Developed a cloud-based IDE on <b>Eclipse Che and Theia</b> for infrastructure automation engineers to write, test and deploy scripts in one place."
    ]
  }
];

export const ALSO_BUILT = [
  {
    n: "03",
    href: "https://github.com/sharmahr/macstorage-studio",
    external: true,
    title: "MacStorage Studio",
    note: "Native macOS disk analyser. Scanner runs out-of-process so a crash never takes the UI with it.",
    meta: "Swift · GitHub ↗"
  },
  {
    n: "04",
    href: "https://github.com/sharmahr/zed-db",
    external: true,
    title: "zed-db",
    note: "A relational database built from scratch: SQL parser, B-tree storage, query planner, transactions.",
    meta: "Python · GitHub ↗"
  },
  {
    n: "05",
    href: "https://github.com/sharmahr/High-Level-System-Design",
    external: true,
    title: "High-Level System Design",
    note: "Working notes on scaling, sharding and consistency. 9 stars.",
    meta: "GitHub ↗"
  },
  {
    n: "06",
    href: "https://github.com/sharmahr/Low-Level-System-Design",
    external: true,
    title: "Low-Level System Design",
    note: "Design patterns and OO modelling worked through in Java. 5 stars.",
    meta: "Java · GitHub ↗"
  },
  {
    n: "07",
    href: "/lab/flappy-bird",
    title: "Neuroevolution of Flappy Bird",
    note: "Neural networks evolved by genetic algorithm until the bird stops dying.",
    meta: "Playable"
  },
  {
    n: "08",
    href: "/lab/smart-rockets",
    title: "Smart Rockets",
    note: "Genetic algorithm navigating obstacles to a target. 5 stars on GitHub.",
    meta: "Playable"
  },
  {
    n: "09",
    href: "/archive",
    title: "Robotics, simulations and the rest",
    note: "Wall-climbing robot, maze solver, CNC portrait plotter, quadcopter, p5.js games.",
    meta: "Full archive →"
  }
];

export const TOOLKIT = [
  { label: "Languages", items: ["Java", "Python", "TypeScript", "Swift", "SQL"] },
  {
    label: "Backend",
    items: ["Spring Boot", "FastAPI", "Flask", "REST", "Microservices", "StackStorm"]
  },
  { label: "Data", items: ["PostgreSQL", "MongoDB", "Elasticsearch", "Transformers"] },
  {
    label: "Cloud & infra",
    items: ["Kubernetes", "Docker", "Helm", "AWS", "GCP", "GitLab CI/CD"]
  },
  { label: "Frontend", items: ["Angular", "React", "HTML/CSS"] },
  { label: "Practice", items: ["Agile", "Scrum", "TDD", "Mentoring"] }
];

export const AWARDS = [
  {
    year: "2021",
    title: "Exceptional Mentorship Award",
    by: "VMware — for mentoring the winning team at VMware Bootcamp 2021."
  },
  {
    year: "2021",
    title: "Spot Award",
    by: "VMware — for scanning and patching the fleet during the Log4Shell response."
  },
  {
    year: "2021",
    title: "At Our Best Award",
    by: "VMware — for building the automated SLA service."
  },
  {
    year: "2019",
    title: "Smart India Hackathon — finalist",
    to: "/credentials/sih-2019",
    by: "Government of India — top 4 of 314 teams, leading a team of five with the Smart Parking System."
  },
  {
    year: "2018",
    title: "Winner, Escalade",
    to: "/credentials/iit-guwahati",
    by: "IIT Guwahati — first of 60 teams, wall-climbing robot."
  },
  {
    year: "2018",
    title: "Best Innovation Award, RoboCup",
    to: "/credentials/vnit",
    by: "Axis'18, VNIT Nagpur — among 120 teams."
  },
  {
    year: "2018",
    title: "Third place, Meshmerize",
    to: "/credentials/iit-bombay",
    by: "Techfest, IIT Bombay — maze-solving robot, 314 teams."
  }
];

export const PERSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Hardik Sharma",
  url: "https://sharmahr.github.io/",
  image: "https://sharmahr.github.io/assets/images/Hardik_Sharma.jpeg",
  jobTitle: "Software Engineer 2",
  email: "mailto:sharmahardik.mail@gmail.com",
  address: { "@type": "PostalAddress", addressLocality: "Hyderabad", addressCountry: "IN" },
  worksFor: { "@type": "Organization", name: "Microsoft" },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Shri Ramdeobaba College of Engineering and Management"
  },
  sameAs: ["https://github.com/sharmahr", "https://www.linkedin.com/in/sharmahr/"],
  knowsAbout: [
    "Distributed Systems",
    "Cloud Infrastructure",
    "Kubernetes",
    "Java",
    "Python",
    "Applied Machine Learning"
  ]
};
