'use client';

import { SlidersHorizontal, X } from 'lucide-react';
import type { VehicleFilters as Filters } from '@/lib/types';

interface VehicleFiltersProps {
  filters: Filters;
  brands: string[];
  onFilterChange: (filters: Filters) => void;
}

export default function VehicleFilters({
  filters,
  brands,
  onFilterChange,
}: VehicleFiltersProps) {
  const update = (partial: Partial<Filters>) => {
    onFilterChange({ ...filters, ...partial });
  };

  const clearFilters = () => {
    onFilterChange({ sortBy: 'price-asc' });
  };

  const hasActiveFilters =
    filters.brand ||
    filters.priceMin ||
    filters.priceMax ||
    filters.yearMin ||
    filters.yearMax ||
    filters.fuel ||
    filters.transmission;

  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <SlidersHorizontal className="h-4 w-4" />
          Filtros
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-xs text-primary-light hover:underline"
          >
            <X className="h-3 w-3" />
            Limpar filtros
          </button>
        )}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {/* Brand */}
        <select
          value={filters.brand ?? ''}
          onChange={(e) => update({ brand: e.target.value || undefined })}
          className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary-light focus:outline-none focus:ring-1 focus:ring-primary-light"
        >
          <option value="">Todas as marcas</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>

        {/* Fuel */}
        <select
          value={filters.fuel ?? ''}
          onChange={(e) => update({ fuel: e.target.value || undefined })}
          className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary-light focus:outline-none focus:ring-1 focus:ring-primary-light"
        >
          <option value="">Combustível</option>
          <option value="Flex">Flex</option>
          <option value="Gasolina">Gasolina</option>
          <option value="Diesel">Diesel</option>
          <option value="Elétrico">Elétrico</option>
          <option value="Híbrido">Híbrido</option>
        </select>

        {/* Transmission */}
        <select
          value={filters.transmission ?? ''}
          onChange={(e) => update({ transmission: e.target.value || undefined })}
          className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary-light focus:outline-none focus:ring-1 focus:ring-primary-light"
        >
          <option value="">Câmbio</option>
          <option value="Automático">Automático</option>
          <option value="Manual">Manual</option>
          <option value="CVT">CVT</option>
          <option value="Semi-automático">Semi-automático</option>
        </select>

        {/* Year Min */}
        <select
          value={filters.yearMin ?? ''}
          onChange={(e) =>
            update({ yearMin: e.target.value ? Number(e.target.value) : undefined })
          }
          className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary-light focus:outline-none focus:ring-1 focus:ring-primary-light"
        >
          <option value="">Ano mín.</option>
          {Array.from({ length: 10 }, (_, i) => 2026 - i).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        {/* Price Max */}
        <select
          value={filters.priceMax ?? ''}
          onChange={(e) =>
            update({ priceMax: e.target.value ? Number(e.target.value) : undefined })
          }
          className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary-light focus:outline-none focus:ring-1 focus:ring-primary-light"
        >
          <option value="">Preço até</option>
          <option value={80000}>R$ 80.000</option>
          <option value={100000}>R$ 100.000</option>
          <option value={130000}>R$ 130.000</option>
          <option value={160000}>R$ 160.000</option>
          <option value={200000}>R$ 200.000</option>
          <option value={300000}>R$ 300.000</option>
        </select>

        {/* Sort */}
        <select
          value={filters.sortBy ?? 'price-asc'}
          onChange={(e) => update({ sortBy: e.target.value as Filters['sortBy'] })}
          className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary-light focus:outline-none focus:ring-1 focus:ring-primary-light"
        >
          <option value="price-asc">Menor preço</option>
          <option value="price-desc">Maior preço</option>
          <option value="year-desc">Mais recente</option>
          <option value="mileage-asc">Menor km</option>
        </select>
      </div>
    </div>
  );
}
