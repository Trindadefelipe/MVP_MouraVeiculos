import type { Vehicle } from './types';

// ── Constants ────────────────────────────────────────────────────────────────

export const WHATSAPP_NUMBER = '554333213007';
export const PHONE = '(43) 3321-3007';
export const ADDRESS = 'Av. Tiradentes, 980 - Centro, Londrina - PR, 86010-190';
export const BUSINESS_HOURS = {
  weekdays: '08:00 - 18:00',
  saturday: '08:00 - 13:00',
  sunday: 'Fechado',
};
export const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/mouraveiculos',
  facebook: 'https://www.facebook.com/mouraveiculos',
  whatsapp: `https://wa.me/${WHATSAPP_NUMBER}`,
};

// ── Formatting helpers ───────────────────────────────────────────────────────

/**
 * Format a number as Brazilian Real currency.
 * Example: 229900 → "R$ 229.900,00"
 */
export function formatPrice(price: number): string {
  return price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/**
 * Format mileage with dot separator and "km" suffix.
 * Example: 185600 → "185.600 km"
 */
export function formatMileage(km: number): string {
  return `${km.toLocaleString('pt-BR')} km`;
}

/**
 * Build a WhatsApp deep-link for the given phone number and pre-filled message.
 */
export function generateWhatsAppLink(phone: string, message: string): string {
  const cleanPhone = phone.replace(/\D/g, '');
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}

/**
 * Lightweight class-name joiner (similar to clsx / cn from shadcn).
 * Filters out falsy values and joins the rest with a space.
 */
export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Produce a URL-friendly slug from a vehicle's brand, model, year and id.
 * Example: "toyota-hilux-sw4-2019-abc123"
 */
export function createVehicleSlug(
  vehicle: Pick<Vehicle, 'brand' | 'model' | 'year' | 'id'>,
): string {
  const base = `${vehicle.brand} ${vehicle.model} ${vehicle.year}`
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // strip accents
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  // Append first 6 chars of the id for uniqueness
  return `${base}-${vehicle.id.slice(0, 6)}`;
}
