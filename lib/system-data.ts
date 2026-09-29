export type AudienceMode = "developer" | "recruiter" | "researcher";

export interface SystemProfile {
  name: string;
  role: string;
  title: string;
  status: string;
  location: string;
  email: string;
  phone: string;
  phoneHref: string;
  github: string;
  linkedin: string;
  resume: string;
  education: {
    degree: string;
    major: string;
    institution: string;
    cgpa: string;
    timeline: string;
  };
}

export const PROFILE: SystemProfile = {
  name: "Pramod Margudre",
  role: "Backend / Full-Stack Developer + AI/ML Researcher",
  title: "Backend Engineer · Distributed Systems & AI Pipelines",
  status: "SYSTEMS OPERATIONAL // AVAILABLE FOR SDE OPPORTUNITIES",
  location: "Pune, Maharashtra, India",
  email: "margudrep@gmail.com",
  phone: "+91 8149716897",
  phoneHref: "tel:+918149716897",
  github: "https://github.com/smpramod",
  linkedin: "https://www.linkedin.com/in/pramod-margudre-4235452a5",
  resume: "/pramod_sde.pdf",
  education: {
    degree: "B.Tech",
    major: "Computer Science & Business Systems",
    institution: "KIT Kolhapur",
    cgpa: "8.4 / 10.0",
    timeline: "2023 – 2026",
  },
};

export interface SystemNode {
  id: string;
  label: string;
  category: "backend" | "data" | "infra" | "ai" | "research";
  summary: string;
  evidence: string[];
  projects: string[];
  highlight: string;
  modeAffinity: AudienceMode[];
}

export const SYSTEM_NODES: SystemNode[] = [
  {
    id: "nestjs",
    label: "NestJS",
    category: "backend",
    summary: "Primary backend framework for enterprise REST APIs and modular microservices.",
    evidence: [
      "Engineered Academics and Scholarship allocation modules in live College ERP at Seratek Systems.",
      "Architected centralized cascading soft-delete hooks to preserve referential consistency across MongoDB collections.",
      "Built custom ValidationPipes, global exception filters, and role-based guards (RBAC).",
    ],
    projects: ["College ERP", "Black & White Cafe"],
    highlight: "Enterprise modularity & dependency injection",
    modeAffinity: ["developer", "recruiter"],
  },
  {
    id: "redis",
    label: "Redis",
    category: "data",
    summary: "In-memory datastore for low-latency caching, session management, and distributed locks.",
    evidence: [
      "Cache-aside layer for frequently accessed student and course master registries (<2ms RTT).",
      "Distributed locks with atomic 'SET NX EX' preventing duplicate webhook execution in payment & SMS callbacks.",
      "Token blacklisting and rate-limiting buckets for high-traffic authentication endpoints.",
    ],
    projects: ["College ERP", "Black & White Cafe"],
    highlight: "<2ms cache RTT & atomic locking",
    modeAffinity: ["developer", "recruiter"],
  },
  {
    id: "bullmq",
    label: "BullMQ & Queues",
    category: "backend",
    summary: "Redis-backed background worker queue system for asynchronous job orchestration.",
    evidence: [
      "Offloaded CPU-heavy semester marksheet PDF generation from Node.js event loop into isolated worker processes.",
      "Asynchronous SMS OTP dispatch with retry backoff schedules and Dead Letter Queues (DLQ).",
      "Scheduled cron jobs for daily attendance summaries and batch scholarship disbursement checks.",
    ],
    projects: ["College ERP"],
    highlight: "Zero event-loop blocking for compute jobs",
    modeAffinity: ["developer"],
  },
  {
    id: "mongodb",
    label: "MongoDB",
    category: "data",
    summary: "Document database powering multi-tenant ERP entities and flexible schemas.",
    evidence: [
      "Designed schemas for academic student masters, fee structures, and examination records.",
      "Built aggregation pipelines for multi-department statistical reports.",
      "Optimized compound indexes reducing query latency across large collections.",
    ],
    projects: ["College ERP", "Black & White Cafe", "SmartCrop AI"],
    highlight: "Multi-tenant collection modeling & aggregation",
    modeAffinity: ["developer", "recruiter"],
  },
  {
    id: "springboot",
    label: "Spring Boot & Java",
    category: "backend",
    summary: "Enterprise Java backend engineering with modular architecture and Firebase Admin integration.",
    evidence: [
      "Engineered modular REST backend and service layers for Local Business Organization (LBO) community marketplace.",
      "Integrated Firebase Realtime Database with backend caching and Firebase Admin SDK server-side authentication.",
      "Designed clean modular services with externalized configuration and cloud deployment readiness.",
    ],
    projects: ["Local Business Organization (LBO)", "Gurudatta Clinic"],
    highlight: "Modular Java architecture & Firebase Admin SDK",
    modeAffinity: ["developer", "recruiter"],
  },
  {
    id: "sql",
    label: "PostgreSQL / MySQL",
    category: "data",
    summary: "Relational database management for ACID transactions and structured clinical records.",
    evidence: [
      "HackerRank 4★ SQL certified; complex joins, window functions, and indexing strategies.",
      "Structured SQLite relational schemas in Android Clinic app managing 200+ patient records.",
      "Engineered MySQL relational schemas for community marketplace member profiles and referral feeds.",
    ],
    projects: ["Local Business Organization (LBO)", "Gurudatta Clinic", "Database Masters"],
    highlight: "ACID consistency & relational indexing",
    modeAffinity: ["developer", "recruiter"],
  },
  {
    id: "socketio",
    label: "Socket.IO",
    category: "backend",
    summary: "Bi-directional event engine for real-time state synchronization.",
    evidence: [
      "Replaced HTTP polling on cafe orders with scoped Socket rooms, cutting socket server overhead by 80%.",
      "Live kitchen dispatch notifications with acknowledgment events.",
      "Immediate UI state updates across concurrent web and mobile sessions.",
    ],
    projects: ["Black & White Cafe", "College ERP"],
    highlight: "80% reduction in client connection polling",
    modeAffinity: ["developer"],
  },
  {
    id: "docker-infra",
    label: "Docker & CI/CD",
    category: "infra",
    summary: "Containerization and automated continuous delivery pipelines.",
    evidence: [
      "Multi-stage Dockerfiles optimizing Node.js production image sizes.",
      "Automated CI/CD pipelines deploying frontend to Vercel and backend services to Railway.",
      "Isolated environment configs with zero drift between local and production.",
    ],
    projects: ["Black & White Cafe", "Universal RAG"],
    highlight: "Deterministic container environments",
    modeAffinity: ["developer", "recruiter"],
  },
  {
    id: "universal-rag",
    label: "Universal RAG Engine",
    category: "ai",
    summary: "Modular Retrieval-Augmented Generation engine for high-accuracy document QA.",
    evidence: [
      "Multi-format document ingestion pipeline with structural boundary parsing.",
      "Semantic chunking preserving contextual sentence coherence over naive window splitting.",
      "Hybrid search fusing dense vector similarity with BM25 lexical retrieval + Cross-Encoder reranker.",
    ],
    projects: ["Universal RAG Engine"],
    highlight: "Hybrid dense/sparse retrieval with reranking",
    modeAffinity: ["researcher", "developer"],
  },
  {
    id: "ueba-research",
    label: "Adaptive UEBA System",
    category: "research",
    summary: "Machine learning research on User & Entity Behavior Analytics for insider threat detection.",
    evidence: [
      "Feature engineering across temporal (working hours), behavioral (resource access), and peer baselines.",
      "Unsupervised anomaly detection via Isolation Forest & One-Class SVM paired with XGBoost risk scoring.",
      "Strict chronological evaluation methodology preventing future lookahead data leakage in sequential audit logs.",
    ],
    projects: ["UEBA Research Lab"],
    highlight: "Chronological ML evaluation & risk fusion",
    modeAffinity: ["researcher"],
  },
  {
    id: "python-ml",
    label: "Python & Machine Learning",
    category: "ai",
    summary: "Core language for ML research, dataset augmentation, and neural modeling.",
    evidence: [
      "Trained CNN classifier on 8,000 images achieving 88% accuracy for SmartCrop disease diagnosis.",
      "Data wrangling with NumPy and Pandas for feature normalization and statistical validation.",
      "Infosys Springboard certified in Data Science (EDA, statistics, modeling).",
    ],
    projects: ["SmartCrop AI", "UEBA Research Lab"],
    highlight: "88% CNN accuracy across 8,000 image dataset",
    modeAffinity: ["researcher", "recruiter"],
  },
];

export interface PipelineStage {
  step: number;
  id: string;
  name: string;
  layer: string;
  stack: string;
  roleDescription: string;
  mechanism: string;
  failureGuard: string;
  codeSnippet: string;
}

export const PIPELINE_STAGES: PipelineStage[] = [
  {
    step: 1,
    id: "request-ingress",
    name: "Client Ingress & API Gateway",
    layer: "Network Edge",
    stack: "NestJS / Express / CORS / Rate Limiting",
    roleDescription: "Receives raw HTTP/S request, validates transport protocols, and applies request throttling.",
    mechanism: "Enforces strict payload size limits, inspects origin headers, and enforces IP-based rate limiting buckets via Redis memory counters.",
    failureGuard: "HTTP 429 Too Many Requests sent before compute or database layers are touched.",
    codeSnippet: `@UseGuards(ThrottlerGuard)\n@Post('orders')\nasync createOrder(@Body() dto: CreateOrderDto) {\n  return this.orderService.dispatch(dto);\n}`,
  },
  {
    step: 2,
    id: "auth-guards",
    name: "Authentication & Role Guards",
    layer: "Security & Identity",
    stack: "JWT / OTP Framework / Redis Blacklist / RBAC",
    roleDescription: "Validates caller credentials, verifies OTP signatures, and validates role permissions.",
    mechanism: "Decodes JWT payload, checks JTI against Redis revoked token blacklist, and verifies user permission scopes against required route decorators.",
    failureGuard: "Unauthorized 401 / Forbidden 403 returned with zero exposure of underlying internal services.",
    codeSnippet: `@Roles('FACULTY', 'ADMIN')\n@UseGuards(JwtAuthGuard, RolesGuard)\n@Get('admissions/pending')\nasync getPending() { ... }`,
  },
  {
    step: 3,
    id: "service-layer",
    name: "Domain Services & Orchestration",
    layer: "Business Logic",
    stack: "NestJS Service Classes / Dependency Injection",
    roleDescription: "Executes business validation, coordinates state changes, and enforces domain rules.",
    mechanism: "Ensures referential validity (e.g. verifying student enrollment eligibility before scholarship allocation) and orchestrates database transactions.",
    failureGuard: "Custom domain exceptions mapped by GlobalExceptionFilter into standardized JSON error envelopes.",
    codeSnippet: `async allocateScholarship(studentId: string, schemeId: string) {\n  const student = await this.studentRepo.findActive(studentId);\n  if (!student) throw new NotFoundException('Active student required');\n  return this.txManager.run(async (session) => { ... });\n}`,
  },
  {
    step: 4,
    id: "cache-layer",
    name: "High-Speed Cache & Locks",
    layer: "Memory Acceleration",
    stack: "Redis / Cache-Aside / Distributed Locks",
    roleDescription: "Bypasses primary database reads for hot data and ensures mutation idempotency.",
    mechanism: "Checks Redis for key; if present, returns in <2ms. On write, invalidates scoped tag keys. Employs 'SET key val NX EX 60' distributed lock to prevent duplicate webhook runs.",
    failureGuard: "Graceful cache degradation: if Redis is momentarily unreachable, queries fail over directly to primary DB.",
    codeSnippet: `const cached = await this.redis.get(\`master:\${code}\`);\nif (cached) return JSON.parse(cached);\nconst fresh = await this.db.fetchMaster(code);\nawait this.redis.setex(\`master:\${code}\`, 3600, JSON.stringify(fresh));`,
  },
  {
    step: 5,
    id: "persistence-layer",
    name: "Persistence & Referential Integrity",
    layer: "Storage Engine",
    stack: "MongoDB (Replica Sets) / PostgreSQL / SQLite",
    roleDescription: "Persists entity mutations with transactional consistency and indexed lookups.",
    mechanism: "Executes atomic writes. In document collections without native foreign keys, invokes custom cascading soft-delete hooks to cleanly mark related children.",
    failureGuard: "Database transaction abort and automatic rollback on partial write failures.",
    codeSnippet: `// Centralized Cascading Soft Delete Hook\nconst session = await this.connection.startSession();\nsession.startTransaction();\nawait this.deptModel.updateOne({ _id: id }, { $set: { isDeleted: true } }, { session });\nawait this.courseModel.updateMany({ deptId: id }, { $set: { isDeleted: true } }, { session });\nawait session.commitTransaction();`,
  },
  {
    step: 6,
    id: "queue-worker",
    name: "Async Queues & Background Workers",
    layer: "Decoupled Processing",
    stack: "BullMQ / Redis Queue / Worker Threads",
    roleDescription: "Offloads CPU-intensive and third-party I/O tasks away from the main HTTP thread.",
    mechanism: "Pushes job payloads (PDF generation, bulk SMS delivery, payment reconciliation) into BullMQ. Responds immediately with Job ID.",
    failureGuard: "Automatic exponential backoff retries (3x) before routing unrecoverable jobs to Dead Letter Queue (DLQ).",
    codeSnippet: `await this.marksheetQueue.add('generate-marksheet', {\n  semesterId,\n  batchYear\n}, { attempts: 3, backoff: { type: 'exponential', delay: 1000 } });`,
  },
  {
    step: 7,
    id: "telemetry-response",
    name: "Telemetry, Observability & Response",
    layer: "Egress & Monitoring",
    stack: "Socket.IO / Pino Logger / HTTP Response Interceptor",
    roleDescription: "Packages formatted response, emits real-time room notifications, and logs metrics.",
    mechanism: "Formats response payload, emits state event to relevant Socket.IO room (e.g. order tracking), and records RTT latency into telemetry logs.",
    failureGuard: "Zero-leak sanitization: strips stack traces and internal identifiers before output reaches the public client.",
    codeSnippet: `this.socketGateway.server.to(\`order:\${id}\`).emit('statusUpdated', {\n  status: 'PREPARING',\n  timestamp: Date.now()\n});`,
  },
];

export interface IncidentPostMortem {
  id: string;
  title: string;
  system: string;
  symptom: string;
  investigation: string;
  rootCause: string;
  solution: string;
  prevention: string;
  metricsResult: string;
  tags: string[];
}

export const INCIDENTS: IncidentPostMortem[] = [
  {
    id: "cascading-soft-delete",
    title: "The Cascade Dilemma: Referential Integrity in Document Stores",
    system: "College ERP / Academics & Master Registry",
    symptom: "When a department was marked inactive, child courses and student registrations remained active, causing orphaned foreign references in marksheets.",
    investigation: "Profiled collection operations in MongoDB. MongoDB lacks native relational 'ON DELETE CASCADE' foreign key constraints across collections.",
    rootCause: "Individual delete operations were performed in isolated service calls without an atomic multi-collection coordination contract.",
    solution: "Designed and implemented a centralized Cascading Soft-Delete interceptor in NestJS that wraps multi-collection updates inside an atomic MongoDB ClientSession transaction.",
    prevention: "Engineered pre-delete integrity guards and automated schema relationship linters that catch orphaned reference risks during development.",
    metricsResult: "100% elimination of orphaned student records; zero dangling references across 4 interconnected academic modules.",
    tags: ["MongoDB", "NestJS", "Transactions", "Data Integrity"],
  },
  {
    id: "socket-avalanche",
    title: "The Socket Connection Avalanche: Polling vs Event Rooms",
    system: "Black & White Cafe Platform",
    symptom: "During peak lunch hours, concurrent users checking order statuses caused HTTP response latencies to double.",
    investigation: "Log analysis showed client mobile apps and web frontends were polling '/api/orders/:id/status' every 2 seconds, generating 1,200 redundant queries per minute for unchanged states.",
    rootCause: "Client-driven polling created linear backend load scaling with active users, overwhelming database read pools.",
    solution: "Migrated order tracking to an event-driven architecture using Socket.IO event rooms. Clients join a room keyed to their unique order ID; backend emits deltas only when state actually transitions.",
    prevention: "Established an event-driven standard for all live tracking features; introduced heartbeat health checks and automatic disconnect on inactivity.",
    metricsResult: "80% reduction in server request load; instant sub-100ms status reflections in mobile & web clients.",
    tags: ["Socket.IO", "Redis", "Event-Driven", "High Concurrency"],
  },
  {
    id: "webhook-idempotency",
    title: "Webhook Duplicate Delivery & Distributed Idempotency",
    system: "SMS Gateway & Payment Notification Services",
    symptom: "A single OTP verification or payment confirmation intermittently generated double credit increments and duplicate SMS dispatches.",
    investigation: "Discovered carrier networks triggered automatic retry backoffs when network acknowledgment delayed past 400ms, sending identical payloads within 600ms.",
    rootCause: "The callback handler was non-idempotent and lacked a shared state lock across concurrent server worker processes.",
    solution: "Implemented a distributed Redis locking mechanism with unique idempotency keys using atomic 'SET key token NX EX 60'. If a duplicate payload arrives while processing or within the TTL window, it returns cached 200 OK immediately.",
    prevention: "Mandatory idempotency key validation on all external webhooks and state-mutating payment callbacks.",
    metricsResult: "Zero duplicate state mutations across thousands of OTP and gateway notifications.",
    tags: ["Redis", "Distributed Locks", "Idempotency", "Security"],
  },
  {
    id: "pdf-event-loop-block",
    title: "API Latency Spike Under Heavy Marksheet Rendering",
    system: "College ERP Examination & Report Subsystem",
    symptom: "When administrators initiated bulk semester marksheet PDF exports, standard student login endpoints spiked from 150ms to 6+ seconds.",
    investigation: "Node.js CPU profiling indicated the single main event loop was completely blocked while PDF generation libraries compiled layouts and image assets.",
    rootCause: "CPU-intensive vector graphics and document compilation was running synchronously inside the HTTP controller thread.",
    solution: "Extracted PDF generation into dedicated BullMQ background worker queues backed by Redis. HTTP endpoints immediately return a 202 Accepted with a Job UUID, allowing workers to process PDFs asynchronously.",
    prevention: "Architectural mandate: any computation exceeding 50ms must be delegated to background BullMQ queues with job polling or socket notification.",
    metricsResult: "Main API latency remained rock-solid at <120ms during concurrent bulk marksheet exports.",
    tags: ["BullMQ", "Node.js Event Loop", "Redis", "Performance"],
  },
];

export interface ProjectCaseStudy {
  id: string;
  title: string;
  type: "PRODUCTION" | "RESEARCH";
  summary: string;
  problem: string;
  architecture: string;
  contribution: string[];
  decisions: string[];
  challenges: string;
  result: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  badges: string[];
}

export const CASE_STUDIES: ProjectCaseStudy[] = [
  {
    id: "college-erp",
    title: "College ERP & Webdesk Ecosystem",
    type: "PRODUCTION",
    summary: "Large-scale multi-tenant academic and institutional ERP platform serving student administration, faculty workflows, and examination governance.",
    problem: "Academic operations were historically fragmented across disparate paper files, spreadsheets, and unlinked databases, creating administrative overhead and frequent data desynchronization.",
    architecture: "Modular NestJS microservice backend with MongoDB multi-tenant collections, Redis caching layer, BullMQ asynchronous job queues, and fine-grained Role-Based Access Control (RBAC).",
    contribution: [
      "Engineered Academics and Scholarship modules covering student lifecycle records, course catalogs, and scholarship disbursements.",
      "Developed admin master modules (departments, degrees, configurations) and the automated online Admission workflow.",
      "Architected a centralized cascading soft-delete mechanism in NestJS to preserve referential integrity across related collections.",
      "Integrated SMS gateway and OTP authentication pipeline with throttling and rate limits.",
      "Offloaded marksheet generation and batch notification processing to BullMQ worker threads.",
    ],
    decisions: [
      "Used MongoDB embedded documents for immutable historical transcripts while referencing active student masters to balance query speed with consistency.",
      "Implemented BullMQ over standalone cron scripts to ensure retries, exponential backoffs, and centralized job visibility.",
    ],
    challenges: "Handling referential integrity without relational database foreign key cascades. Solved by writing transactional pre-delete interceptors in NestJS.",
    result: "Live production ERP operating at Seratek Systems (2026), powering academic operations across administrative departments.",
    tech: ["NestJS", "TypeScript", "MongoDB", "Redis", "BullMQ", "Socket.IO", "Agile / Scrum"],
    badges: ["PRODUCTION", "LIVE ERP", "SERATEK SYSTEMS (2026)"],
  },
  {
    id: "lbo-marketplace",
    title: "Local Business Organization (LBO) Marketplace",
    type: "PRODUCTION",
    summary: "Sponsored dual-platform community marketplace (July 2025 – Present) combining a Spring Boot full-stack web application and native Android app for automated member referrals, 1-to-1 messaging, and targeted business branding.",
    problem: "Local communities and small businesses lacked a trusted referral ecosystem, spending exorbitant budgets on traditional marketing with low conversion and disconnected customer communications.",
    architecture: "Modular Spring Boot (Java) REST backend with externalized configuration, Firebase Realtime Database with server-side Admin SDK auth, backend caching, MySQL relational persistence (via XAMPP), and native Android Studio (Java & XML) client.",
    contribution: [
      "Developed a full-stack web application using Spring Boot (Java) and JavaScript/HTML5, following clean code practices and modular architecture.",
      "Built an Android-based service marketplace in Java and Android Studio (XML) to connect and refer people within the community based on preferences, search, and location.",
      "Integrated Firebase Realtime Database with backend caching and server-side authentication using Firebase Admin SDK to secure data access and improve API performance.",
      "Implemented core features including member referrals, one-to-one messaging, and special thank-you notes using asynchronous data handling.",
      "Optimized backend APIs and database queries to efficiently manage hundreds of user records with low-latency responses.",
      "Designed the application with cloud deployment readiness, adhering to stateless service principles and externalized configuration.",
      "Practiced Agile methodology with iterative development cycles and continuous user feedback to ensure a user-centric design.",
    ],
    decisions: [
      "Utilized Firebase Admin SDK on the backend to enforce server-side validation and authorization rather than delegating security entirely to mobile client rules.",
      "Engineered an automated matching and referral algorithm driven by user preferences, location, and service categories to maximize local transaction velocity.",
    ],
    challenges: "Synchronizing real-time referral feeds and asynchronous 1-to-1 messaging between Android mobile and web sessions while maintaining high API throughput and low latency.",
    result: "Achieved prototype deployment for the sponsored organization, enabling grouped and individual member branding while reducing traditional marketing costs by 70%–90%.",
    tech: ["Spring Boot", "Java", "Android Studio", "Firebase Realtime DB", "Firebase Admin SDK", "MySQL", "JavaScript", "HTML5/CSS3", "XAMPP", "Agile / Scrum"],
    badges: ["PRODUCTION", "SPONSORED", "FULL-STACK & ANDROID"],
  },
  {
    id: "cafe-platform",
    title: "Black & White Cafe Platform",
    type: "PRODUCTION",
    summary: "Dual-platform cafe management and ordering ecosystem spanning Flutter mobile app and Next.js web application with real-time kitchen event routing.",
    problem: "Traditional cafe counters experience high ordering congestion, customer friction during guest ordering, and kitchen miscommunication during peak rush hours.",
    architecture: "High-throughput NestJS REST & WebSocket API, MongoDB persistence, Flutter mobile client, Next.js web client, and Socket.IO room management deployed on Railway and Vercel.",
    contribution: [
      "Architected dual-platform ecosystem handling dynamic menu exploration, guest checkout, loyalty reward points, and table bookings.",
      "Built high-throughput NestJS APIs with JWT authentication, guest session tokens, input validation pipes, and idempotency.",
      "Replaced HTTP polling with Socket.IO event rooms scoped to order IDs, cutting connection overhead by 80%.",
      "Automated CI/CD pipelines deploying frontend web to Vercel and backend services to Railway.",
    ],
    decisions: [
      "Supported frictionless guest sessions with signed temporary tokens so users can order without initial registration while still maintaining order ownership.",
      "Used WebSocket event rooms instead of broadcast channels to guarantee zero data leakage between different customers.",
    ],
    challenges: "Synchronizing cart and real-time order states seamlessly across mobile and web interfaces under fluctuating mobile network conditions.",
    result: "Deployed and operating with live ordering capabilities, instant kitchen ticket dispatch, and automated loyalty point accumulation.",
    tech: ["Flutter", "NestJS", "React", "Next.js", "MongoDB", "Socket.IO", "JWT", "Railway", "Vercel"],
    liveUrl: "https://blackandwhitecafe.vercel.app/",
    badges: ["PRODUCTION", "SHIPPED", "DUAL-PLATFORM"],
  },
  {
    id: "clinic-management",
    title: "Gurudatta Clinic Management System",
    type: "PRODUCTION",
    summary: "Officially sponsored native Android application (November 2022 – January 2023) managing doctor appointments, patient records, and authenticated workflows with local data storage.",
    problem: "A busy community clinic relied on physical paper registries, causing lost patient histories, slow appointment retrievals, and manual paperwork errors in daily operations.",
    architecture: "Native Android application built with Java in Android Studio (XML) with structured SQLite local storage, backup support, PHP utilities, and doctor-role tailored dashboards.",
    contribution: [
      "Designed and developed an Android application for Gurudatta Clinic to manage doctor appointments, maintain patient records, and streamline login authentication.",
      "Built a tailored interface specifically for the doctor role, focusing on ease of use and efficiency in daily operations.",
      "Implemented local data storage with backup support to ensure uninterrupted access to patient information regardless of network availability.",
      "Guided the full SDLC from clinical requirement gathering with the doctor to on-site testing and operational deployment.",
    ],
    decisions: [
      "Selected on-device SQLite with local backup support over cloud-only backends to ensure zero dependency on erratic clinic broadband connections.",
      "Engineered role-specific views and indexing allowing the doctor to retrieve complete medical histories in under two taps.",
    ],
    challenges: "Designing intuitive touch layouts on tablet screens that minimize physician data entry time during fast-paced physical consultations.",
    result: "Officially sponsored and adopted by Gurudatta Clinic, significantly reducing manual paperwork by 95% and promoting digital adoption in a small healthcare setup.",
    tech: ["Java", "Android Studio", "SQLite", "XML", "PHP", "Local Storage", "UI/UX", "SDLC"],
    githubUrl: "https://github.com/smpramod/hospital_mngt",
    badges: ["PRODUCTION", "SPONSORED", "ADOPTED"],
  },
];

export interface RagPipelineLayer {
  step: number;
  name: string;
  title: string;
  role: string;
  engineeringDetails: string;
  tradeoffs: string;
}

export const RAG_LAYERS: RagPipelineLayer[] = [
  {
    step: 1,
    name: "INGESTION & PARSING",
    title: "Structural Document Ingestion",
    role: "Extracts raw text, table structures, and metadata headers from PDF, Markdown, and Docx sources.",
    engineeringDetails: "Cleans unprintable control characters, preserves section hierarchy, and generates immutable document hash IDs to prevent re-ingestion duplication.",
    tradeoffs: "High-accuracy layout parsing increases ingestion latency but eliminates chunk fragmentation across headers.",
  },
  {
    step: 2,
    name: "SEMANTIC CHUNKING",
    title: "Context-Aware Chunk Segmentation",
    role: "Divides long documents into semantically coherent text segments rather than arbitrary token character counts.",
    engineeringDetails: "Identifies sentence boundaries and paragraph topic shifts. Employs 10-15% sliding window overlap to preserve semantic context across adjacent chunk edges.",
    tradeoffs: "Smaller chunks (256 tokens) yield precise vector retrieval; larger chunks (1024 tokens) provide richer synthesis context. 512 tokens with 50-token overlap selected as sweet spot.",
  },
  {
    step: 3,
    name: "EMBEDDING ENGINE",
    title: "Dense Vector Generation",
    role: "Transforms text chunks into high-dimensional vector representations capturing deep semantic relationships.",
    engineeringDetails: "Embeds chunks using dense representation models. Embeddings are normalized to unit length so dot product operations are mathematically equivalent to cosine similarity.",
    tradeoffs: "Higher vector dimensionality increases memory footprint in vector stores but preserves nuanced domain distinction.",
  },
  {
    step: 4,
    name: "VECTOR STORAGE",
    title: "Indexed Similarity Store",
    role: "Stores and indexes vector embeddings with associated document metadata payloads.",
    engineeringDetails: "Utilizes Hierarchical Navigable Small World (HNSW) indexing for approximate nearest neighbor (ANN) lookups with sub-10ms query execution across thousands of vectors.",
    tradeoffs: "HNSW builds faster search graphs at the expense of increased RAM consumption during index construction.",
  },
  {
    step: 5,
    name: "HYBRID RETRIEVAL",
    title: "Dense Vector + BM25 Lexical Fusion",
    role: "Retrieves top-k candidate chunks combining semantic understanding with exact keyword match precision.",
    engineeringDetails: "Executes reciprocal rank fusion (RRF) between dense vector similarity (for conceptual match) and BM25 sparse lexical search (for acronyms, part numbers, and proper nouns).",
    tradeoffs: "Pure vector search frequently misses exact SKU or student ID numbers; hybrid retrieval guarantees both conceptual and literal recall.",
  },
  {
    step: 6,
    name: "CROSS-ENCODER RERANKING",
    title: "Hallucination Elimination & Scoring",
    role: "Evaluates full query-passage interaction to reorder top-k retrieved chunks before prompt injection.",
    engineeringDetails: "Passes top 20 candidate chunks through a Cross-Encoder reranker. The joint self-attention mechanism scores exact relevance, discarding irrelevant or false-positive context chunks.",
    tradeoffs: "Cross-encoding introduces 20-40ms computation per query but drastically cuts LLM hallucination by ensuring only top 3-5 verified facts reach the context window.",
  },
  {
    step: 7,
    name: "PROMPT SYNTHESIS & LLM",
    title: "Context Window Packing & Streamed Generation",
    role: "Constructs constrained prompt with citation tags and streams generated response to client.",
    engineeringDetails: "Packs reranked chunks into LLM prompt with strict system instructions: answer solely using provided citations; if information is absent, explicitly state unknown.",
    tradeoffs: "Enforces deterministic factuality over creative speculation, essential for enterprise documentation QA.",
  },
];

export interface UebaResearchModule {
  title: string;
  status: "AI RESEARCH / EXPERIMENTAL PROTOTYPE";
  abstract: string;
  featurePillars: {
    name: string;
    description: string;
    features: string[];
  }[];
  modelPipeline: {
    model: string;
    type: string;
    purpose: string;
  }[];
  methodology: string;
  credibilityNotice: string;
}

export const UEBA_RESEARCH: UebaResearchModule = {
  title: "Adaptive AI-Powered UEBA System",
  status: "AI RESEARCH / EXPERIMENTAL PROTOTYPE",
  abstract: "An anomaly detection and insider-threat research system analyzing enterprise audit logs using behavioral, temporal, and peer-group feature embeddings to flag high-risk anomalies.",
  featurePillars: [
    {
      name: "Temporal Dynamics",
      description: "Measures deviations in operational timing baselines.",
      features: [
        "Login hour variance from individual median",
        "Weekend vs weekday activity velocity",
        "Inter-event time delta compression (scripted bot activity)",
      ],
    },
    {
      name: "Behavioral Access Volume",
      description: "Tracks volume and sensitivity of accessed enterprise assets.",
      features: [
        "Read vs export ratio on confidential tables",
        "File download count spikes in 15-minute rolling windows",
        "Elevated privilege command invocation frequency",
      ],
    },
    {
      name: "Peer-Group Baseline Deviation",
      description: "Compares individual activity against statistical norms of their assigned role group.",
      features: [
        "Accessing modules outside department peer centroid",
        "Abnormal IP subnet and geolocation hops",
        "Query result volume standard deviations above team mean",
      ],
    },
  ],
  modelPipeline: [
    {
      model: "Isolation Forest",
      type: "Unsupervised Tree Ensemble",
      purpose: "Isolates rare anomalies in high-dimensional continuous feature spaces without requiring labelled threat datasets.",
    },
    {
      model: "One-Class SVM",
      type: "Non-Linear Support Vector Machine",
      purpose: "Constructs a tight decision boundary around normal user baseline clusters using RBF kernel.",
    },
    {
      model: "XGBoost Classifier",
      type: "Gradient Boosted Trees",
      purpose: "Scores known synthetic attack vectors and evaluates feature importance weights.",
    },
    {
      model: "Risk Score Fusion",
      type: "Ensemble Calibrator",
      purpose: "Aggregates model confidence outputs into an intuitive risk score (0-100) with explainable feature contributions.",
    },
  ],
  methodology: "Chronological Evaluation: To guarantee scientific validity, audit logs are split along strict temporal lines (training on prior historical time blocks and evaluating strictly on subsequent time intervals) to prevent lookahead data leakage in sequential user behavior.",
  credibilityNotice: "Note: This is an academic research prototype exploring anomaly detection and behavioral modeling, distinguished from live enterprise deployments.",
};

export interface CareerMilestone {
  year: string;
  type: "PRODUCTION" | "INTERNSHIP" | "CREDENTIAL" | "EDUCATION";
  role: string;
  organization: string;
  period: string;
  summary: string;
  achievements: string[];
  technologies: string[];
  credentialUrl?: string;
}

export const MILESTONES: CareerMilestone[] = [
  {
    year: "Feb 2026 – Present",
    type: "INTERNSHIP",
    role: "Backend Developer Intern",
    organization: "Seratek Systems",
    period: "Feb 2026 – Present",
    summary: "Shipping production backend features in a live multi-tenant College ERP product.",
    achievements: [
      "Engineered Academics and Scholarship allocation modules in live College ERP at Seratek Systems.",
      "Architected centralized cascading soft-delete mechanism across relational MongoDB collections to eliminate orphaned records.",
      "Implemented Socket.IO event room notifications reducing client connection polling load by 80%.",
      "Built OTP authentication framework with request throttling and an internal SMS gateway microservice.",
      "Offloaded CPU-heavy report calculations and marksheet exports to BullMQ Redis queues.",
      "Developed REST APIs with NestJS validation pipes for student registration and admission workflows.",
    ],
    technologies: ["NestJS", "TypeScript", "Redis", "MongoDB", "Socket.IO", "BullMQ", "Agile / Scrum"],
  },
  {
    year: "2025 – Present",
    type: "PRODUCTION",
    role: "Full-Stack & Android Developer (Sponsored Project)",
    organization: "Local Business Organization (LBO)",
    period: "July 2025 – Present",
    summary: "Building an Android and Spring Boot community service marketplace and referral platform.",
    achievements: [
      "Developed a full-stack web application using Spring Boot (Java) and JavaScript/HTML5 following clean modular architecture.",
      "Built an Android-based service marketplace in Java and Android Studio (XML) to connect and refer people within the community based on preferences, search, and location.",
      "Integrated Firebase Realtime Database with backend caching and server-side authentication using Firebase Admin SDK.",
      "Implemented core features including member referrals, one-to-one messaging, and special thank-you notes using asynchronous data handling.",
      "Practiced Agile methodology with continuous user feedback, reducing community marketing costs by 70%–90%.",
    ],
    technologies: ["Spring Boot", "Java", "Android Studio", "Firebase", "MySQL", "JavaScript", "XAMPP"],
  },
  {
    year: "2022 – 2023",
    type: "PRODUCTION",
    role: "Android Developer (Sponsored Project)",
    organization: "Gurudatta Clinic",
    period: "Nov 2022 – Jan 2023",
    summary: "Designed and developed an officially sponsored Android clinical management system.",
    achievements: [
      "Designed and developed Android application for Gurudatta Clinic to manage doctor appointments, maintain patient records, and streamline login authentication.",
      "Built a tailored interface specifically for the doctor role, focusing on ease of use and efficiency in daily operations.",
      "Implemented local data storage with backup support to ensure uninterrupted access to patient information regardless of network availability.",
      "Officially sponsored and adopted by Gurudatta Clinic, significantly reducing manual paperwork by 95% and promoting digital adoption in a small healthcare setup.",
    ],
    technologies: ["Java", "Android Studio", "SQLite", "XML", "PHP", "Local Storage", "UI/UX"],
  },
  {
    year: "2022",
    type: "INTERNSHIP",
    role: "IoT Application Developer Intern",
    organization: "Softron, Kolhapur",
    period: "Jun 2022 – Aug 2022",
    summary: "Embedded systems firmware programming and live sensor telemetry ingestion.",
    achievements: [
      "Programmed firmware for ESP32, ESP8266, and Arduino microcontrollers.",
      "Ingested real-time sensor streams over lightweight protocols into monitoring dashboards.",
      "Diagnosed hardware communication latencies and calibrated analog sensor inputs.",
    ],
    technologies: ["IoT", "ESP32", "ESP8266", "Arduino", "Sensors", "Telemetry"],
  },
  {
    year: "CERTIFIED",
    type: "CREDENTIAL",
    role: "Cloud Computing",
    organization: "NPTEL – IIT Kharagpur",
    period: "Verified Examination Credential",
    summary: "Advanced coursework in cloud virtualization, distributed systems, and resource scheduling.",
    achievements: [
      "Demonstrated proficiency in multi-tenant cloud storage, serverless patterns, and container orchestration.",
    ],
    technologies: ["Cloud Computing", "Virtualization", "Distributed Systems"],
    credentialUrl: "https://drive.google.com/file/d/1A1F_-iPzlDAzUXJfev9cthcJa0_E6xj7/view?usp=drivesdk",
  },
  {
    year: "CERTIFIED",
    type: "CREDENTIAL",
    role: "Introduction to Data Science",
    organization: "Infosys SpringBoard",
    period: "Verified Credential",
    summary: "Statistical analysis, exploratory data analysis (EDA), and machine learning pipelines in Python.",
    achievements: [
      "Completed hands-on statistical hypothesis testing, data wrangling, and predictive modeling.",
    ],
    technologies: ["Data Science", "Python", "EDA", "Statistics"],
    credentialUrl: "https://drive.google.com/file/d/1xTDGeHLkLlC5sS-OWbJJwzJrXAmRuklv/view?usp=drive_link",
  },
  {
    year: "2023 – 2026",
    type: "EDUCATION",
    role: "B.Tech in Computer Science & Business Systems",
    organization: "KIT Kolhapur",
    period: "2023 – 2026 · CGPA 8.4 / 10.0",
    summary: "Undergraduate curriculum bridging deep software engineering with quantitative business systems.",
    achievements: [
      "B.Tech Computer Science & Business Systems (2023 – 2026) maintaining 8.4 CGPA across advanced computing and algorithmic coursework.",
      "Direct Second Year admission following Diploma in Computer Engineering at GP Miraj (2020 – 2023, 88.63%).",
      "Elected Vice President & Event Head for COMPESA Tech Fest.",
      "Solved 180+ Data Structures & Algorithms problems; HackerRank 4★ in Java and 4★ in SQL.",
    ],
    technologies: ["DSA", "OOP", "DBMS", "Operating Systems", "Computer Networks"],
  },
];

export interface CuratedQA {
  id: string;
  question: string;
  answer: string;
  targetSectionId: string;
  category: "backend" | "architecture" | "ai" | "incidents" | "profile";
}

export const CURATED_QA: CuratedQA[] = [
  {
    id: "qa-redis",
    question: "Where has Pramod used Redis?",
    answer: "At Seratek Systems, Pramod utilized Redis for three critical architectural patterns: (1) Cache-aside layer for frequently accessed student and course master registries (<2ms RTT); (2) Distributed atomic locks via 'SET key token NX EX' preventing duplicate webhook and payment callback runs; and (3) As the backing queue engine for BullMQ asynchronous job orchestration.",
    targetSectionId: "architecture",
    category: "backend",
  },
  {
    id: "qa-nestjs",
    question: "What is his NestJS and ERP experience?",
    answer: "Pramod worked as a Backend Developer Intern at Seratek Systems in 2026, shipping production features in a live College ERP. He engineered Academics, Scholarships, and Admissions modules, built custom ValidationPipes and Role-Based Access Guards (RBAC), and designed a centralized cascading soft-delete mechanism to enforce data integrity across MongoDB collections.",
    targetSectionId: "projects",
    category: "backend",
  },
  {
    id: "qa-rag",
    question: "Tell me about his Universal RAG architecture.",
    answer: "Pramod's Universal RAG engine is a modular document QA pipeline that avoids naive vector search. It implements structural document parsing, semantic sentence-boundary chunking, hybrid retrieval (dense vector similarity + BM25 keyword matching), and a Cross-Encoder reranker that scores relevance before synthesis to eliminate hallucinations.",
    targetSectionId: "rag-engine",
    category: "ai",
  },
  {
    id: "qa-ueba",
    question: "What is the UEBA research about?",
    answer: "His User and Entity Behavior Analytics research tackles insider threat detection. It extracts behavioral, temporal, and peer-group baseline deviations from enterprise audit logs, feeding an ensemble of Isolation Forest, One-Class SVM, and XGBoost. Crucially, it uses strict chronological evaluation to prevent future-data leakage.",
    targetSectionId: "research-lab",
    category: "ai",
  },
  {
    id: "qa-incidents",
    question: "What production problems has he solved?",
    answer: "Pramod documents real engineering post-mortems: (1) Resolving orphaned records in document stores with transactional cascading soft-deletes; (2) Cutting socket connection overhead by 80% replacing client polling with Socket.IO rooms; (3) Enforcing idempotency against duplicate SMS webhooks via Redis locks; and (4) Eliminating Node.js event-loop blocks during marksheet PDF exports via BullMQ queues.",
    targetSectionId: "incidents",
    category: "incidents",
  },
  {
    id: "qa-education",
    question: "What are his educational credentials and CGPA?",
    answer: "Pramod completed his B.Tech in Computer Science & Business Systems at KIT Kolhapur (2023 – 2026) with an 8.4 CGPA. Prior to B.Tech, he completed a Diploma in Computer Engineering from GP Miraj (2020 – 2023, 88.63%) and SSC from New Highschool Sangli (90.00%). He is also HackerRank 4★ in Java and 4★ in SQL with 180+ solved DSA problems.",
    targetSectionId: "milestones",
    category: "profile",
  },
];
