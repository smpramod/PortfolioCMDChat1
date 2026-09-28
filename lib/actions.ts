"use server";

import { Resend } from "resend";
import { SITE } from "./site";
import type { ContactFormState } from "./types";
import { headers } from "next/headers";
import fs from "node:fs";
import path from "node:path";

function getEnvVar(key: string, defaultValue = ""): string {
  if (process.env[key]) {
    return process.env[key]!;
  }
  try {
    const envPath = path.resolve(process.cwd(), ".env.local");
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf-8");
      for (const line of content.split("\n")) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) continue;
        const eqIdx = trimmed.indexOf("=");
        if (eqIdx !== -1) {
          const k = trimmed.slice(0, eqIdx).trim();
          let v = trimmed.slice(eqIdx + 1).trim();
          if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
            v = v.slice(1, -1);
          }
          if (k === key) {
            return v;
          }
        }
      }
    }
  } catch {
    // fallback gracefully
  }
  return defaultValue;
}

const NAME_MIN_LENGTH = 2;
const NAME_MAX_LENGTH = 80;
const MESSAGE_MIN_LENGTH = 10;
const MESSAGE_MAX_LENGTH = 5000;
const EMAIL_MAX_LENGTH = 254;

const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 3;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return false;
  }
  if (now - record.lastReset > RATE_LIMIT_WINDOW_MS) {
    record.count = 1;
    record.lastReset = now;
    return false;
  }
  record.count++;
  return record.count > MAX_REQUESTS_PER_WINDOW;
}

export async function submitContact(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") || "unknown";

  if (isRateLimited(ip)) {
    return { ok: false, error: `Too many requests. Please email ${SITE.emailWork} directly.` };
  }

  const rawName = String(formData.get("name") ?? "").trim();
  const name = rawName.replace(/[\r\n]/g, " "); // Prevent header injection
  const email = String(formData.get("email") ?? "").trim();
  const rawMessage = String(formData.get("message") ?? "").trim();
  const message = rawMessage.replace(/[\0\u200B-\u200D\uFEFF]/g, ""); // Strip null bytes and zero-width chars
  const company = String(formData.get("company") ?? "").trim();

  if (company) {
    return { ok: false, error: "Submission rejected." };
  }

  if (!name || !email || !message) {
    return { ok: false, error: "Please fill in name, email, and message." };
  }

  if (name.length < NAME_MIN_LENGTH || name.length > NAME_MAX_LENGTH) {
    return {
      ok: false,
      error: `Name must be between ${NAME_MIN_LENGTH} and ${NAME_MAX_LENGTH} characters.`,
    };
  }

  if (email.length > EMAIL_MAX_LENGTH) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  if (message.length < MESSAGE_MIN_LENGTH || message.length > MESSAGE_MAX_LENGTH) {
    return {
      ok: false,
      error: `Message must be between ${MESSAGE_MIN_LENGTH} and ${MESSAGE_MAX_LENGTH} characters.`,
    };
  }

  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  const resendApiKey = getEnvVar("RESEND_API_KEY");
  const contactToEmail = getEnvVar("CONTACT_TO_EMAIL", "lbo.org.ask@gmail.com");
  const resendFromEmail = getEnvVar("RESEND_FROM_EMAIL", "onboarding@resend.dev");

  if (!resendApiKey) {
    return {
      ok: false,
      error: `Service currently offline. Please email ${SITE.emailWork} directly.`,
    };
  }

  const resend = new Resend(resendApiKey);

  try {
    const { error } = await resend.emails.send({
      from: resendFromEmail,
      to: [contactToEmail],
      replyTo: email,
      subject: `New contact form message from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        "",
        message,
      ].join("\n"),
      html: `
        <h2>New contact form message</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return {
        ok: false,
        error: `Failed to deliver message. Please email ${SITE.emailWork} directly.`,
      };
    }

    return { ok: true, error: "" };
  } catch (err) {
    console.error("Resend catch error:", err);
    return {
      ok: false,
      error: `Something went wrong. Please email ${SITE.emailWork} directly.`,
    };
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
