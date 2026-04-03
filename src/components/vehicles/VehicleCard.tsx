import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Fuel, Gauge, Settings2 } from 'lucide-react';
import type { Vehicle } from '@/lib/types';
import { formatPrice, formatMileage } from '@/lib/utils';

interface VehicleCardProps {
  vehicle: Vehicle;
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  const displayPrice = vehicle.promotionPrice ?? vehicle.price;

  return (
    <Link
      href={`/estoque/${vehicle.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={vehicle.images[0] ?? '/images/placeholder-car.jpg'}
          alt={`${vehicle.brand} ${vehicle.model}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {vehicle.promotionPrice && (
          <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-bold text-white shadow">
            OFERTA
          </span>
        )}
        {vehicle.condition === 'Novo' && (
          <span className="absolute right-3 top-3 rounded-full bg-success px-3 py-1 text-xs font-bold text-white shadow">
            NOVO
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-sm font-bold text-foreground line-clamp-1">
          {vehicle.brand} {vehicle.model}
        </h3>
        <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
          {vehicle.version}
        </p>

        {/* Specs row */}
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {vehicle.fabricYear}/{vehicle.year}
          </span>
          <span className="flex items-center gap-1">
            <Gauge className="h-3.5 w-3.5" />
            {formatMileage(vehicle.mileage)}
          </span>
          <span className="flex items-center gap-1">
            <Fuel className="h-3.5 w-3.5" />
            {vehicle.fuel}
          </span>
          <span className="flex items-center gap-1">
            <Settings2 className="h-3.5 w-3.5" />
            {vehicle.transmission}
          </span>
        </div>

        {/* Price */}
        <div className="mt-4 border-t border-border pt-3">
          {vehicle.promotionPrice && (
            <p className="text-xs text-muted-foreground line-through">
              {formatPrice(vehicle.price)}
            </p>
          )}
          <p className="text-lg font-extrabold text-primary-light">
            {formatPrice(displayPrice)}
          </p>
        </div>
      </div>
    </Link>
  );
}
