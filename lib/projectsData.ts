import type { Project } from "./types";

export const projects: Project[] = [
  {
    id: "cafe-platform",
    title: "Black & White Cafe Platform",
    description:
      "Full-stack cafe management and ordering platform across Flutter mobile and React/Next.js web, featuring live order tracking, guest checkout, and reward mechanics.",
    bullets: [
      "Architected a dual-platform cafe ecosystem (Flutter mobile + React/Next.js web) handling dynamic menu browsing, guest/authenticated ordering, rewards, and bookings",
      "Built high-throughput NestJS & MongoDB APIs with JWT authentication, guest sessions, throttling, validation, and idempotency",
      "Engineered real-time order tracking and kitchen notifications using Socket.IO event rooms",
      "Automated production deployments and CI/CD pipelines across Vercel (web) and Railway (backend)",
    ],
    tech: ["Flutter", "NestJS", "React", "Next.js", "MongoDB", "Socket.IO", "JWT", "Railway", "Vercel"],
    image: "/projects/cafe.svg",
    status: "shipped",
    liveUrl: "https://blackandwhitecafe.vercel.app/",
  },
  {
    id: "lbo-marketplace",
    title: "Local Business Organization (LBO) Marketplace",
    description:
      "Sponsored dual-platform community marketplace combining a Spring Boot web app and native Android app for automated member referrals, 1-to-1 messaging, and targeted business branding.",
    bullets: [
      "Developed a full-stack web application using Spring Boot (Java) and JavaScript/HTML5 following clean modular architecture",
      "Building an Android-based service marketplace in Java and Android Studio (XML) to connect and refer people within the community based on preferences, search, and location",
      "Integrated Firebase Realtime Database with backend caching and server-side authentication using Firebase Admin SDK",
      "Implemented core features including member referrals, one-to-one messaging, and special thank-you notes using asynchronous data handling",
      "Practiced Agile methodology with continuous user feedback, reducing community marketing costs by 70%–90%",
    ],
    tech: ["Spring Boot", "Java", "Android Studio", "Firebase", "MySQL", "JavaScript", "XAMPP"],
    image: "/projects/erp.svg",
    status: "in-progress",
  },
  {
    id: "clinic-management",
    title: "Gurudatta Clinic Management System",
    description:
      "Officially sponsored native Android application (November 2022 – January 2023) managing doctor appointments, patient medical records, and authenticated workflows with local storage.",
    bullets: [
      "Designed and developed an Android application for Gurudatta Clinic to manage doctor appointments, maintain patient records, and streamline login authentication",
      "Built a tailored interface specifically for the doctor role, focusing on ease of use and efficiency in daily operations",
      "Implemented local data storage with backup support to ensure uninterrupted access to patient information",
      "Officially sponsored and adopted by Gurudatta Clinic, significantly reducing manual paperwork by 95% and promoting digital adoption",
    ],
    tech: ["Java", "Android Studio", "SQLite", "XML", "PHP", "Local Storage", "UI/UX"],
    image: "/projects/clinic.svg",
    status: "shipped",
    githubUrl: "https://github.com/smpramod/hospital_mngt",
  },
  {
    id: "smartcrop-ai",
    title: "SmartCrop — AI Crop Disease Prediction",
    description:
      "Deep learning crop disease classifier achieving 88% accuracy across 8,000 images with Python, TensorFlow, and full-stack web dashboard.",
    bullets: [
      "Programmed a CNN-based crop disease classifier achieving 88% accuracy on a dataset of 8,000 images using TensorFlow/PyTorch",
      "Processed and augmented datasets using Python, NumPy, and Pandas for model training, statistical analysis, and prediction optimization",
      "Introduced validation checks, debugging workflows, and performance tracking with disciplined Git version control",
      "Integrated model inference into a React.js & Node.js dashboard with automated PDF diagnostic generation via PDFKit",
    ],
    tech: ["Python", "TensorFlow", "PyTorch", "React.js", "Node.js", "MongoDB", "NumPy", "Pandas"],
    image: "/projects/smartcrop.svg",
    status: "shipped",
    githubUrl: "https://github.com/smpramod/DiseasePredicition",
  },
];

