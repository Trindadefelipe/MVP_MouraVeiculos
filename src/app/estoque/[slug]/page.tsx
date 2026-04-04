import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ChevronRight,
  ArrowLeft,
  Share2,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { mockVehicles } from '@/lib/mock/vehicles';
import { formatPrice } from '@/lib/utils';
import VehicleGallery from '@/components/vehicles/VehicleGallery';
import VehicleSpecs from '@/components/vehicles/VehicleSpecs';
import VehicleContact from '@/components/vehicles/VehicleContact';
import VehicleCard from '@/components/vehicles/VehicleCard';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = mockVehicles.find((v) => v.slug === slug);

  if (!vehicle) {
    return { title: 'Ve\u00edculo n\u00e3o encontrado | Moura Ve\u00edculos' };
  }

  return {
    title: `${vehicle.brand} ${vehicle.model} ${vehicle.year} | Moura Ve\u00edculos`,
    description: `${vehicle.brand} ${vehicle.model} ${vehicle.version} - ${vehicle.year} - ${vehicle.fuel} - ${vehicle.transmission}. ${formatPrice(vehicle.promotionPrice ?? vehicle.price)}. Confira na Moura Ve\u00edculos em Londrina/PR.`,
  };
}

export default async function VehicleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const vehicle = mockVehicles.find((v) => v.slug === slug);

  if (!vehicle) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <h1 className="text-3xl font-extrabold text-foreground">
          Ve\u00edculo n\u00e3o encontrado
        </h1>
        <p className="mt-3 text-muted-foreground">
          O ve\u00edculo que voc\u00ea procura n\u00e3o est\u00e1 mais dispon\u00edvel ou o link est\u00e1 incorreto.
        </p>
        <Link
          href="/estoque"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar ao Estoque
        </Link>
      </div>
    );
  }

  const displayPrice = vehicle.promotionPrice ?? vehicle.price;

  const similar = mockVehicles
    .filter((v) => v.id !== vehicle.id)
    .filter(
      (v) =>
        v.brand === vehicle.brand ||
        Math.abs((v.promotionPrice ?? v.price) - displayPrice) < 30000,
    )
    .slice(0, 3);

  return (
    <>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="border-b border-border bg-muted/50">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-sm text-muted-foreground lg:px-8">
          <Link href="/" className="transition-colors hover:text-primary-light">
            In\u00edcio
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/estoque" className="transition-colors hover:text-primary-light">
            Estoque
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-medium text-foreground">
            {vehicle.brand} {vehicle.model}
          </span>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        {/* Back + Share */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/estoque"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary-light"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao estoque
          </Link>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted"
            aria-label="Compartilhar"
          >
            <Share2 className="h-4 w-4" />
            Compartilhar
          </button>
        </div>

        {/* Main Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left column - 2/3 */}
          <div className="space-y-6 lg:col-span-2">
            <VehicleGallery
              images={vehicle.images}
              alt={`${vehicle.brand} ${vehicle.model}`}
            />

            {/* Title - mobile */}
            <div className="lg:hidden">
              <h1 className="text-xl font-extrabold text-foreground">
                {vehicle.brand} {vehicle.model}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {vehicle.version}
              </p>
            </div>

            <VehicleSpecs vehicle={vehicle} />

            {vehicle.description && (
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="mb-3 text-lg font-bold text-foreground">
                  Descri\u00e7\u00e3o
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {vehicle.description}
                </p>
              </div>
            )}

            {vehicle.accessories.length > 0 && (
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="mb-4 text-lg font-bold text-foreground">
                  Acess\u00f3rios e Equipamentos
                </h2>
                <div className="flex flex-wrap gap-2">
                  {vehicle.accessories.map((acc) => (
                    <span
                      key={acc}
                      className="inline-flex items-center gap-1.5 rounded-full bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                      {acc}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right column - 1/3 (sticky price card) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6 rounded-xl border border-border bg-card p-6 shadow-sm">
              <div className="hidden lg:block">
                <p className="text-xl font-extrabold text-foreground">
                  {vehicle.brand} {vehicle.model}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {vehicle.version}
                </p>
              </div>

              <div>
                {vehicle.promotionPrice && (
                  <p className="text-sm text-muted-foreground line-through">
                    {formatPrice(vehicle.price)}
                  </p>
                )}
                <p className="text-3xl font-extrabold text-primary-light">
                  {formatPrice(displayPrice)}
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-lg bg-success/10 px-4 py-2.5">
                <ShieldCheck className="h-5 w-5 text-success" />
                <span className="text-xs font-medium text-success">
                  Ve\u00edculo revisado e com proced\u00eancia verificada
                </span>
              </div>

              <VehicleContact vehicle={vehicle} />

              <Link
                href="/financiamento"
                className="block w-full rounded-lg border border-accent bg-accent/10 px-4 py-3 text-center text-sm font-semibold text-accent-dark transition-colors hover:bg-accent/20"
              >
                Simular Financiamento
              </Link>
            </div>
          </div>
        </div>

        {/* Similar vehicles */}
        {similar.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 text-xl font-bold text-foreground">
              Ve\u00edculos Similares
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((v) => (
                <VehicleCard key={v.id} vehicle={v} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
