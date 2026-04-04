'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Car } from 'lucide-react';
import { mockVehicles } from '@/lib/mock/vehicles';
import type { VehicleFilters as Filters } from '@/lib/types';
import VehicleFiltersComponent from '@/components/vehicles/VehicleFilters';
import VehicleGrid from '@/components/vehicles/VehicleGrid';

function EstoqueContent() {
  const searchParams = useSearchParams();
  const initialBrand = searchParams.get('brand') ?? undefined;

  const [filters, setFilters] = useState<Filters>({
    brand: initialBrand,
    sortBy: 'price-asc',
  });

  const brands = useMemo(() => {
    const set = new Set(mockVehicles.map((v) => v.brand));
    return Array.from(set).sort();
  }, []);

  const filteredVehicles = useMemo(() => {
    let result = [...mockVehicles];

    // Brand
    if (filters.brand) {
      result = result.filter((v) => v.brand === filters.brand);
    }

    // Price range
    if (filters.priceMin) {
      result = result.filter((v) => (v.promotionPrice ?? v.price) >= filters.priceMin!);
    }
    if (filters.priceMax) {
      result = result.filter((v) => (v.promotionPrice ?? v.price) <= filters.priceMax!);
    }

    // Year range
    if (filters.yearMin) {
      result = result.filter((v) => v.year >= filters.yearMin!);
    }
    if (filters.yearMax) {
      result = result.filter((v) => v.year <= filters.yearMax!);
    }

    // Fuel
    if (filters.fuel) {
      result = result.filter((v) => v.fuel === filters.fuel);
    }

    // Transmission
    if (filters.transmission) {
      result = result.filter((v) => v.transmission === filters.transmission);
    }

    // Sort
    switch (filters.sortBy) {
      case 'price-asc':
        result.sort((a, b) => (a.promotionPrice ?? a.price) - (b.promotionPrice ?? b.price));
        break;
      case 'price-desc':
        result.sort((a, b) => (b.promotionPrice ?? b.price) - (a.promotionPrice ?? a.price));
        break;
      case 'year-desc':
        result.sort((a, b) => b.year - a.year);
        break;
      case 'mileage-asc':
        result.sort((a, b) => a.mileage - b.mileage);
        break;
    }

    return result;
  }, [filters]);

  return (
    <>
      {/* Hero header */}
      <section className="bg-primary-dark py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex items-center gap-3">
            <Car className="h-8 w-8 text-accent" />
            <div>
              <h1 className="text-2xl font-extrabold sm:text-3xl">
                Nosso Estoque
              </h1>
              <p className="mt-1 text-sm text-white/70">
                Encontre o veículo ideal para você
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <VehicleFiltersComponent
          filters={filters}
          brands={brands}
          onFilterChange={setFilters}
        />

        <div className="mt-6 mb-4">
          <p className="text-sm font-medium text-muted-foreground">
            <span className="font-bold text-foreground">
              {filteredVehicles.length}
            </span>{' '}
            veículo{filteredVehicles.length !== 1 ? 's' : ''} encontrado
            {filteredVehicles.length !== 1 ? 's' : ''}
          </p>
        </div>

        <VehicleGrid vehicles={filteredVehicles} />
      </section>
    </>
  );
}

export default function EstoquePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-light border-t-transparent" />
        </div>
      }
    >
      <EstoqueContent />
    </Suspense>
  );
}
