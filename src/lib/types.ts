export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  version: string;
  year: number;
  fabricYear: number;
  price: number;
  promotionPrice?: number;
  mileage: number;
  fuel: 'Flex' | 'Gasolina' | 'Diesel' | 'Elétrico' | 'Híbrido';
  transmission: 'Automático' | 'Manual' | 'CVT' | 'Semi-automático';
  color: string;
  doors: number;
  bodyType: 'SUV' | 'Hatch' | 'Sedan' | 'Pickup' | 'Comercial' | 'Van' | 'Perua';
  condition: 'Novo' | 'Usado';
  plate?: string;
  description: string;
  accessories: string[];
  images: string[];
  featured: boolean;
  slug: string;
  createdAt: string;
}

export interface VehicleFilters {
  brand?: string;
  model?: string;
  yearMin?: number;
  yearMax?: number;
  priceMin?: number;
  priceMax?: number;
  fuel?: string;
  transmission?: string;
  bodyType?: string;
  sortBy?: 'price-asc' | 'price-desc' | 'year-desc' | 'mileage-asc';
}
