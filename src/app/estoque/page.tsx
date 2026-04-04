import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Car } from 'lucide-react';
import EstoqueContent from '@/components/vehicles/EstoqueContent';

export const metadata: Metadata = {
  title: 'Estoque | Moura Veículos',
  description:
    'Confira nosso estoque de veículos seminovos em Londrina/PR. Encontre o carro ideal com as melhores condições.',
};

export default function EstoquePage() {
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

      <Suspense
        fallback={
          <div className="flex min-h-[50vh] items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-light border-t-transparent" />
          </div>
        }
      >
        <EstoqueContent />
      </Suspense>
    </>
  );
}
