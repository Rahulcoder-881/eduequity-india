const TAG_RE = /<[^>]*>/g;
const CONTROL_RE = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g;

export function sanitizeText(value: string): string {
  return value.replace(TAG_RE, "").replace(CONTROL_RE, "").trim();
}

export function sanitizeEmail(value: string): string {
  return value.trim().toLowerCase();
}
