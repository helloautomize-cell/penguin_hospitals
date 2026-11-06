import { site } from "./site-config";

/**
 * WhatsApp deep link with a per-page prefill.
 * Format from content 00-plan.md 0.5:
 * "Hello Penguin Hospital, I would like to ask about [page topic]."
 */
export function whatsappLink(topic: string): string {
  const text = `Hello Penguin Hospital, I would like to ask about ${topic}.`;
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(text)}`;
}
