import type { Vehicle, VehicleFilters } from '../types';
import { mockVehicles } from '../mock/vehicles';

// ── Cache configuration ──────────────────────────────────────────────────────

const CACHE_TTL_MS = 4 * 60 * 60 * 1000; // 4 hours

let cachedVehicles: Vehicle[] | null = null;
let cacheTimestamp = 0;

function isCacheValid(): boolean {
  return cachedVehicles !== null && Date.now() - cacheTimestamp < CACHE_TTL_MS;
}

function setCache(vehicles: Vehicle[]): void {
  cachedVehicles = vehicles;
  cacheTimestamp = Date.now();
}

// ── API helpers ──────────────────────────────────────────────────────────────

const API_BASE_URL = 'https://api.revendamais.com.br';

/**
 * Map the raw RevendaMais API response to our Vehicle interface.
 * Adjust field names here once the real API contract is confirmed.
 */
function mapApiVehicle(raw: Record<string, unknown>): Vehicle {
  return {
    id: String(raw.id ?? ''),
    brand: String(raw.brand ?? raw.marca ?? ''),
    model: String(raw.model ?? raw.modelo ?? ''),
    version: String(raw.version ?? raw.versao ?? ''),
    year: Number(raw.year ?? raw.ano ?? 0),
    fabricYear: Number(raw.fabricYear ?? raw.anoFabricacao ?? 0),
    price: Number(raw.price ?? raw.preco ?? 0),
    promotionPrice: raw.promotionPrice
      ? Number(raw.promotionPrice)
      : undefined,
    mileage: Number(raw.mileage ?? raw.quilometragem ?? 0),
    fuel: String(raw.fuel ?? raw.combustivel ?? 'Flex') as Vehicle['fuel'],
    transmission: String(
      raw.transmission ?? raw.cambio ?? 'Manual',
    ) as Vehicle['transmission'],
    color: String(raw.color ?? raw.cor ?? ''),
    doors: Number(raw.doors ?? raw.portas ?? 4),
    bodyType: String(
      raw.bodyType ?? raw.carroceria ?? 'Sedan',
    ) as Vehicle['bodyType'],
    condition: String(
      raw.condition ?? raw.condicao ?? 'Usado',
    ) as Vehicle['condition'],
    plate: raw.plate ? String(raw.plate) : undefined,
    description: String(raw.description ?? raw.descricao ?? ''),
    accessories: Array.isArray(raw.accessories)
      ? (raw.accessories as string[])
      : Array.isArray(raw.acessorios)
        ? (raw.acessorios as string[])
        : [],
    images: Array.isArray(raw.images)
      ? (raw.images as string[])
      : Array.isArray(raw.fotos)
        ? (raw.fotos as string[])
        : [],
    featured: Boolean(raw.featured ?? raw.destaque ?? false),
    slug: String(raw.slug ?? ''),
    createdAt: String(raw.createdAt ?? raw.criadoEm ?? new Date().toISOString()),
  };
}

/**
 * Fetch vehicles from the RevendaMais API.
 * Throws if the request fails.
 */
async function fetchFromApi(): Promise<Vehicle[]> {
  const apiKey = process.env.REVENDAMAIS_API_KEY;
  if (!apiKey) {
    throw new Error('REVENDAMAIS_API_KEY is not set');
  }

  const response = await fetch(`${API_BASE_URL}/inventory`, {
    headers: {
      'x-api-key': apiKey,
      Accept: 'application/json',
    },
    next: { revalidate: CACHE_TTL_MS / 1000 },
  });

  if (!response.ok) {
    throw new Error(
      `RevendaMais API error: ${response.status} ${response.statusText}`,
    );
  }

  const data = (await response.json()) as Record<string, unknown>[];
  const vehicles = (Array.isArray(data) ? data : []).map(mapApiVehicle);
  return vehicles;
}

/**
 * Load all vehicles — from API when a key is present, otherwise from mock data.
 * Results are cached in-memory for CACHE_TTL_MS.
 */
async function loadVehicles(): Promise<Vehicle[]> {
  if (isCacheValid()) {
    return cachedVehicles!;
  }

  const apiKey = process.env.REVENDAMAIS_API_KEY;

  if (apiKey) {
    try {
      const vehicles = await fetchFromApi();
      setCache(vehicles);
      return vehicles;
    } catch (error) {
      console.error('[RevendaMais] API fetch failed, falling back to mock data:', error);
      // Fall through to mock data
    }
  }

  setCache(mockVehicles);
  return mockVehicles;
}

// ── Filter & sort helpers ────────────────────────────────────────────────────

function applyFilters(vehicles: Vehicle[], filters: VehicleFilters): Vehicle[] {
  let result = [...vehicles];

  if (filters.brand) {
    const brand = filters.brand.toLowerCase();
    result = result.filter((v) => v.brand.toLowerCase() === brand);
  }

  if (filters.model) {
    const model = filters.model.toLowerCase();
    result = result.filter((v) => v.model.toLowerCase().includes(model));
  }

  if (filters.yearMin) {
    result = result.filter((v) => v.year >= filters.yearMin!);
  }

  if (filters.yearMax) {
    result = result.filter((v) => v.year <= filters.yearMax!);
  }

  if (filters.priceMin) {
    result = result.filter((v) => v.price >= filters.priceMin!);
  }

  if (filters.priceMax) {
    result = result.filter((v) => v.price <= filters.priceMax!);
  }

  if (filters.fuel) {
    const fuel = filters.fuel.toLowerCase();
    result = result.filter((v) => v.fuel.toLowerCase() === fuel);
  }

  if (filters.transmission) {
    const tx = filters.transmission.toLowerCase();
    result = result.filter((v) => v.transmission.toLowerCase() === tx);
  }

  if (filters.bodyType) {
    const bt = filters.bodyType.toLowerCase();
    result = result.filter((v) => v.bodyType.toLowerCase() === bt);
  }

  // Sorting
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'year-desc':
        result.sort((a, b) => b.year - a.year);
        break;
      case 'mileage-asc':
        result.sort((a, b) => a.mileage - b.mileage);
        break;
    }
  }

  return result;
}

// ── Public API ───────────────────────────────────────────────────────────────

/**
 * Get vehicles with optional filters.
 */
export async function getVehicles(
  filters: VehicleFilters = {},
): Promise<Vehicle[]> {
  const all = await loadVehicles();
  return applyFilters(all, filters);
}

/**
 * Get a single vehicle by its slug.
 * Returns `null` if not found.
 */
export async function getVehicleBySlug(
  slug: string,
): Promise<Vehicle | null> {
  const all = await loadVehicles();
  return all.find((v) => v.slug === slug) ?? null;
}

/**
 * Get featured vehicles (for homepage highlights).
 */
export async function getFeaturedVehicles(): Promise<Vehicle[]> {
  const all = await loadVehicles();
  return all.filter((v) => v.featured);
}

/**
 * Get the list of unique brands available in the inventory.
 */
export async function getBrands(): Promise<string[]> {
  const all = await loadVehicles();
  const brands = [...new Set(all.map((v) => v.brand))];
  return brands.sort((a, b) => a.localeCompare(b, 'pt-BR'));
}
