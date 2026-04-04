'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { mockVehicles } from '@/lib/mock/vehicles';
import type { VehicleFilters as Filters } from '@/lib/types';
import VehicleFiltersComponent from '@/components/vehicles/VehicleFilters';
import VehicleGrid from '@/components/vehicles/VehicleGrid';

export default function EstoqueContent() {
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
