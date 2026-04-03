import type { Vehicle } from '@/lib/types';
import VehicleCard from './VehicleCard';

interface VehicleGridProps {
  vehicles: Vehicle[];
}

export default function VehicleGrid({ vehicles }: VehicleGridProps) {
  if (vehicles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-lg font-semibold text-foreground">
          Nenhum veículo encontrado
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Tente ajustar os filtros para encontrar o veículo ideal.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {vehicles.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  );
}
