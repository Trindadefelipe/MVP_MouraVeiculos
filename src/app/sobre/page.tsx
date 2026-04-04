import type { Metadata } from 'next';
import Link from 'next/link';
import { Heart, Target, Users, MapPin, Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sobre | Moura Ve\u00edculos',
  description:
    'Conhe\u00e7a a hist\u00f3ria da Moura Ve\u00edculos. H\u00e1 mais de 20 anos realizando o sonho do carro pr\u00f3prio em Londrina e regi\u00e3o.',
};

const values = [
  {
    icon: Heart,
    title: 'Confian\u00e7a',
    description: 'Mais de duas d\u00e9cadas de compromisso com nossos clientes',
  },
  {
    icon: Target,
    title: 'Qualidade',
    description: 'Ve\u00edculos selecionados e revisados para sua tranquilidade',
  },
  {
    icon: Users,
    title: 'Atendimento',
    description: 'Equipe dedicada a encontrar o ve\u00edculo ideal para voc\u00ea',
  },
];

const numbers = [
  { icon: Calendar, value: '20+', label: 'anos de mercado' },
  { icon: Users, value: 'Milhares', label: 'de clientes satisfeitos' },
  { icon: MapPin, value: 'Londrina', label: 'e regi\u00e3o' },
];

export default function SobrePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary-dark py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
          <h1 className="text-3xl font-extrabold sm:text-4xl">
            Sobre a Moura Ve\u00edculos
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/70">
            Tradi\u00e7\u00e3o e confian\u00e7a no mercado automotivo de Londrina
          </p>
        </div>
      </section>

      {/* History */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-foreground">
            Nossa Hist\u00f3ria
          </h2>
          <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-accent" />
          <div className="mt-8 space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Moura Ve\u00edculos atua no mercado de seminovos na regi\u00e3o de Londrina oferecendo sempre as melhores ofertas de seminovos para voc\u00ea. Trabalhamos somente com ve\u00edculos de proced\u00eancia que passam por um rigoroso controle de qualidade e checagem completa no hist\u00f3rico. Pensou em comprar seminovo em Londrina, pensou Moura Ve\u00edculos. Seu pr\u00f3ximo carro est\u00e1 aqui!
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-muted py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-center text-2xl font-bold text-foreground">
            Nossos Valores
          </h2>
          <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-accent" />

          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {values.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="flex flex-col items-center rounded-xl border border-border bg-card p-8 text-center shadow-sm"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary-light">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-foreground">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="border-y border-border py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-3">
            {numbers.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Icon className="h-6 w-6" />
                </div>
                <p className="mt-3 text-3xl font-extrabold text-primary">
                  {value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-dark py-16 text-white">
        <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Venha nos conhecer!
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/70">
            Estamos esperando sua visita. Venha tomar um caf\u00e9 conosco e
            encontrar o ve\u00edculo dos seus sonhos.
          </p>
          <Link
            href="/contato"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-8 py-4 text-base font-bold text-white transition-colors hover:bg-accent-dark"
          >
            Entre em Contato
          </Link>
        </div>
      </section>
    </>
  );
}
