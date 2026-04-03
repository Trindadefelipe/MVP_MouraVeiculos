import {
  Calendar,
  Fuel,
  Gauge,
  Settings2,
  Paintbrush,
  DoorOpen,
  Car,
  Tag,
} from 'lucide-react';
import type { Vehicle } from '@/lib/types';
import { formatMileage } from '@/lib/utils';

interface VehicleSpecsProps {
  vehicle: Vehicle;
}

const getSpecs = (vehicle: Vehicle) => [
  {
    icon: Calendar,
    label: 'Ano',
    value: `${vehicle.fabricYear}/${vehicle.year}`,
  },
  {
    icon: Gauge,
    label: 'Quilometragem',
    value: formatMileage(vehicle.mileage),
  },
  { icon: Fuel, label: 'Combustível', value: vehicle.fuel },
  { icon: Settings2, label: 'Câmbio', value: vehicle.transmission },
  { icon: Paintbrush, label: 'Cor', value: vehicle.color },
  { icon: DoorOpen, label: 'Portas', value: `${vehicle.doors} portas` },
  { icon: Car, label: 'Carroceria', value: vehicle.bodyType },
  { icon: Tag, label: 'Condição', value: vehicle.condition },
];

export default function VehicleSpecs({ vehicle }: VehicleSpecsProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h2 className="mb-4 text-lg font-bold text-foreground">
        Ficha Técnica
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {getSpecs(vehicle).map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/5 text-primary-light">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className="text-sm font-semibold text-foreground">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
