import Link from 'next/link';
import {
  Car,
  Shield,
  BadgeCheck,
  Wallet,
  Headset,
  MapPin,
  Phone,
  Clock,
  MessageCircle,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import { mockVehicles } from '@/lib/mock/vehicles';
import { PHONE, WHATSAPP_NUMBER, generateWhatsAppLink } from '@/lib/utils';
import VehicleCard from '@/components/vehicles/VehicleCard';
import SectionTitle from '@/components/shared/SectionTitle';

/* ─── Data preparation ─────────────────────────────────────────────────────── */

const featuredVehicles = mockVehicles.filter((v) => v.featured).slice(0, 6);

const brandCounts = mockVehicles.reduce<Record<string, number>>((acc, v) => {
  acc[v.brand] = (acc[v.brand] || 0) + 1;
  return acc;
}, {});

const uniqueBrands = Object.entries(brandCounts).sort((a, b) =>
  a[0].localeCompare(b[0]),
);

const whatsappLink = generateWhatsAppLink(
  WHATSAPP_NUMBER,
  'Olá! Gostaria de mais informações sobre os veículos disponíveis.',
);

const differentials = [
  {
    icon: Shield,
    title: 'Confiança',
    description: 'Mais de 20 anos de tradição no mercado de Londrina',
  },
  {
    icon: BadgeCheck,
    title: 'Qualidade',
    description: 'Veículos revisados e com procedência garantida',
  },
  {
    icon: Wallet,
    title: 'Financiamento',
    description: 'As melhores condições de financiamento do mercado',
  },
  {
    icon: Headset,
    title: 'Atendimento',
    description: 'Equipe especializada pronta para te atender',
  },
];

/* ─── Page ─────────────────────────────────────────────────────────────────── */

export default function Home() {
  return (
    <>
      {/* ── 1. Hero Banner ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-primary-light">
        {/* Decorative background elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <Car className="absolute -right-10 top-10 h-64 w-64 rotate-12 text-white/[0.04]" />
          <Car className="absolute -left-8 bottom-10 h-48 w-48 -rotate-12 text-white/[0.04]" />
          <Car className="absolute right-1/3 bottom-1/4 h-36 w-36 rotate-6 text-white/[0.03]" />
          <div className="absolute -left-20 top-1/2 h-80 w-80 rounded-full bg-white/[0.03]" />
          <div className="absolute -bottom-20 right-1/4 h-60 w-60 rounded-full bg-accent/[0.06]" />
        </div>

        <div className="relative mx-auto flex min-h-[70vh] max-w-7xl flex-col items-center justify-center px-4 py-20 text-center sm:py-28 lg:px-8">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm">
            <Car className="h-4 w-4" />
            Londrina e Região
          </span>

          <h1 className="max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            Seu próximo carro está na{' '}
            <span className="text-accent">Moura Veículos</span>
          </h1>

          <p className="mt-5 max-w-xl text-base text-white/80 sm:text-lg md:text-xl">
            Há mais de 20 anos realizando o sonho do carro próprio em Londrina e
            região
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/estoque"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-colors hover:bg-accent-dark sm:text-base"
            >
              Ver Estoque
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-whatsapp px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-colors hover:brightness-110 sm:text-base"
            >
              <MessageCircle className="h-4 w-4" />
              Fale pelo WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── 2. Featured Vehicles ────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
        <SectionTitle
          title="Veículos em Destaque"
          subtitle="Confira nossas melhores ofertas"
          centered
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/estoque"
            className="inline-flex items-center gap-2 rounded-lg border-2 border-primary px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
          >
            Ver todo o estoque
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ── 3. Brand Showcase ───────────────────────────────────────────── */}
      <section className="border-y border-border bg-muted/50 px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionTitle title="Marcas Disponíveis" centered />

          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            {uniqueBrands.map(([brand, count]) => (
              <Link
                key={brand}
                href={`/estoque?brand=${encodeURIComponent(brand)}`}
                className="flex flex-col items-center justify-center gap-1 rounded-xl border border-border bg-card px-3 py-4 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <span className="text-sm font-bold text-primary">{brand}</span>
                <span className="text-xs text-muted-foreground">
                  {count} {count === 1 ? 'veículo' : 'veículos'}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Why Choose Us ────────────────────────────────────────────── */}
      <section className="bg-muted px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            title="Por que escolher a Moura Veículos?"
            centered
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {differentials.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex flex-col items-center rounded-xl bg-card p-6 text-center shadow-sm"
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
                    <Icon className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="mb-2 text-base font-bold text-primary">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 5. CTA Financing ────────────────────────────────────────────── */}
      <section className="bg-primary-light px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Financie seu veículo
          </h2>
          <p className="mt-3 text-base text-white/80 sm:text-lg">
            Encontre as melhores condições de financiamento. Aprovação rápida!
          </p>
          <Link
            href="/financiamento"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-8 py-3.5 text-sm font-bold text-white shadow-lg transition-colors hover:bg-accent-dark sm:text-base"
          >
            Simular Financiamento
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ── 6. Location Preview ─────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
        <SectionTitle title="Venha nos Visitar" centered />

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Info column */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-primary">Endereço</h3>
                <p className="text-sm text-muted-foreground">
                  Rua Santa Catarina, 491, Centro - Londrina/PR
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-primary">Telefone</h3>
                <a
                  href="tel:+554333213007"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary-light"
                >
                  (43) 3321-3007
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-primary">
                  Horário de Funcionamento
                </h3>
                <ul className="mt-1 space-y-0.5 text-sm text-muted-foreground">
                  <li>Seg - Sex: 08:00 - 18:00</li>
                  <li>Sábado: 08:00 - 13:00</li>
                  <li>Domingo: Fechado</li>
                </ul>
              </div>
            </div>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex w-fit items-center gap-2 rounded-lg bg-whatsapp px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:brightness-110"
            >
              <MessageCircle className="h-4 w-4" />
              Fale Conosco pelo WhatsApp
            </a>
          </div>

          {/* Map column */}
          <div className="overflow-hidden rounded-xl border border-border shadow-sm">
            <iframe
              title="Localização Moura Veículos"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3661.9!2d-51.1628!3d-23.3045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sRua+Santa+Catarina+491+Londrina+PR!5e0!3m2!1sen!2sbr!4v1"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
