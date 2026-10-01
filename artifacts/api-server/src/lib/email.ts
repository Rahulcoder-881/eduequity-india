import { ReplitConnectors } from "@replit/connectors-sdk";
import { logger } from "./logger";

const notificationEmail = process.env.NOTIFICATION_EMAIL?.trim();
const fromAddress =
  process.env.EMAIL_FROM?.trim() ?? "EduEquity India <onboarding@resend.dev>";

type SubmissionEmail = {
  subject: string;
  replyTo: string;
  text: string;
  html: string;
};

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function row(label: string, value: string): string {
  return `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</p>`;
}

async function sendSubmissionEmail({
  subject,
  replyTo,
  text,
  html,
}: SubmissionEmail): Promise<void> {
  if (!notificationEmail) {
    logger.error(
      "Submission email skipped because NOTIFICATION_EMAIL is not configured",
    );
    return;
  }

  const connectors = new ReplitConnectors();
  const response = await connectors.proxy("resend", "/emails", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      from: fromAddress,
      to: [notificationEmail],
      reply_to: replyTo,
      subject,
      text,
      html,
    }),
  });

  if (!response.ok) {
    logger.error(
      { statusCode: response.status, subject },
      "Submission notification email was rejected by Resend",
    );
    return;
  }

  logger.info({ subject }, "Submission notification email sent");
}

export function queueDonationNotification(input: {
  name: string;
  email: string;
  amount: number;
  currency: string;
  message?: string | null;
}): void {
  const message = input.message?.trim() || "(No message provided)";
  const subject = `New donation pledge from ${input.name}`;
  const text = [
    "New donation pledge",
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Amount: ${input.currency} ${input.amount}`,
    `Message: ${message}`,
  ].join("\n");
  const html = [
    "<h2>New donation pledge</h2>",
    row("Name", input.name),
    row("Email", input.email),
    row("Amount", `${input.currency} ${input.amount}`),
    row("Message", message),
  ].join("");

  void sendSubmissionEmail({
    subject,
    replyTo: input.email,
    text,
    html,
  }).catch((error: unknown) => {
    logger.error({ err: error, subject }, "Failed to send donation notification");
  });
}

export function queueContactNotification(input: {
  name: string;
  email: string;
  subject: string;
  message: string;
  type: string;
}): void {
  const subject = `New ${input.type} inquiry from ${input.name}`;
  const text = [
    "New contact inquiry",
    `Type: ${input.type}`,
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Subject: ${input.subject}`,
    `Message: ${input.message}`,
  ].join("\n");
  const html = [
    "<h2>New contact inquiry</h2>",
    row("Type", input.type),
    row("Name", input.name),
    row("Email", input.email),
    row("Subject", input.subject),
    row("Message", input.message),
  ].join("");

  void sendSubmissionEmail({
    subject,
    replyTo: input.email,
    text,
    html,
  }).catch((error: unknown) => {
    logger.error({ err: error, subject }, "Failed to send contact notification");
  });
}