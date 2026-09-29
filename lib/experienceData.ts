import type { ExperienceEntry } from "./types";

export const experience: ExperienceEntry[] = [
  {
    type: "experience",
    title: "Backend Developer Intern",
    org: "Seratek Systems",
    period: "Feb 2026 – Present",
    description:
      "Architected and deployed a centralized cascading soft-delete mechanism across relational MongoDB entities. Implemented real-time Socket.IO room push notifications that reduced client polling load by 80%. Engineered an OTP-based authentication framework with request throttling and rate limiting, and built a resilient internal SMS gateway microservice from scratch.",
    tags: ["NestJS", "TypeScript", "Redis", "MongoDB", "Socket.IO", "BullMQ", "Agile / Scrum"],
  },
  {
    type: "experience",
    title: "Full-Stack & Android Developer (Sponsored Project)",
    org: "Local Business Organization (LBO)",
    period: "Jul 2025 – Present",
    description:
      "Building an Android and Spring Boot community service marketplace. Developed modular Spring Boot backend with Firebase Realtime Database and Admin SDK server-side auth, peer referrals, and 1-to-1 messaging, cutting marketing costs by 70%–90%.",
    tags: ["Spring Boot", "Java", "Android Studio", "Firebase", "MySQL", "JavaScript"],
  },
  {
    type: "experience",
    title: "Android Developer (Sponsored Project)",
    org: "Gurudatta Clinic",
    period: "Nov 2022 – Jan 2023",
    description:
      "Designed and developed an Android application for Gurudatta Clinic to manage doctor appointments, maintain patient records, and streamline login authentication with local SQLite storage, cutting paperwork by 95%.",
    tags: ["Java", "Android Studio", "SQLite", "XML", "PHP", "Local Storage", "UI/UX"],
  },
  {
    type: "experience",
    title: "IoT Application Developer Intern",
    org: "Softron, Kolhapur",
    period: "Jun 2022 – Aug 2022",
    description:
      "Programmed embedded firmware for ESP32, ESP8266, and Arduino microcontrollers. Captured and streamed real-time sensor telemetry over lightweight protocols into interactive monitoring dashboards.",
    tags: ["IoT", "ESP32", "ESP8266", "Arduino", "Sensors", "Dashboard"],
  },
  {
    type: "certification",
    title: "Cloud Computing",
    org: "NPTEL – IIT Kharagpur",
    period: "Certified",
    description:
      "Advanced certification in cloud computing architectures, virtualization, distributed storage systems, container orchestration, and multi-tenant resource scheduling.",
    tags: ["Cloud Computing", "Virtualization", "Distributed Systems"],
    certificateUrl: "https://drive.google.com/file/d/1A1F_-iPzlDAzUXJfev9cthcJa0_E6xj7/view?usp=drivesdk",
  },
  {
    type: "certification",
    title: "Introduction to Data Science",
    org: "Infosys SpringBoard",
    period: "Certified",
    description:
      "Comprehensive certification covering exploratory data analysis (EDA), data wrangling, statistical hypothesis testing, and machine learning pipelines with Python.",
    tags: ["Data Science", "Python", "EDA", "Statistics"],
    certificateUrl: "https://drive.google.com/file/d/1xTDGeHLkLlC5sS-OWbJJwzJrXAmRuklv/view?usp=drive_link",
  },
  {
    type: "certification",
    title: "Google Cloud Arcade Facilitator Program",
    org: "Google Cloud",
    period: "Certified",
    description:
      "Hands-on program mastering Google Cloud Platform infrastructure: IAM access controls, Cloud Storage lifecycle rules, and Docker container deployment with Cloud Run.",
    tags: ["GCP", "Cloud IAM", "Cloud Storage", "Containers"],
  },
];

