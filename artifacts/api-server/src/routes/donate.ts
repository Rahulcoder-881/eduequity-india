import { Router, type IRouter } from "express";
import { SubmitDonationBody, SubmitContactBody } from "@workspace/api-zod";
import { sanitizeText, sanitizeEmail } from "../lib/sanitize";
import {
  queueContactNotification,
  queueDonationNotification,
} from "../lib/email";

const router: IRouter = Router();

router.post("/donate", async (req, res): Promise<void> => {
  const parsed = SubmitDonationBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const name = sanitizeText(parsed.data.name);
  const email = sanitizeEmail(parsed.data.email);
  const { amount } = parsed.data;
  const currency = sanitizeText(parsed.data.currency);
  const message = parsed.data.message
    ? sanitizeText(parsed.data.message)
    : undefined;

  queueDonationNotification({
    name,
    email,
    amount,
    currency,
    message,
  });

  res.status(201).json({
    id: crypto.randomUUID(),
    message: `Thank you, ${name}! Your pledge of ${currency} ${amount} has been recorded. We will reach out to confirm your contribution.`,
    name,
    amount,
  });
});

router.post("/contact", async (req, res): Promise<void> => {
  const parsed = SubmitContactBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const name = sanitizeText(parsed.data.name);
  const email = sanitizeEmail(parsed.data.email);
  const subject = sanitizeText(parsed.data.subject);
  const message = sanitizeText(parsed.data.message);
  const type = sanitizeText(parsed.data.type);

  queueContactNotification({
    name,
    email,
    subject,
    message,
    type,
  });

  res.status(201).json({
    id: crypto.randomUUID(),
    message: `Thank you for reaching out, ${name}. We have received your inquiry and will respond within 2-3 business days.`,
  });
});

export default router;
