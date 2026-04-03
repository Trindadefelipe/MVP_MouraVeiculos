import type { Metadata } from 'next';
import {
  Clock,
  Percent,
  Banknote,
  ShieldCheck,
  MessageCircle,
  Phone,
} from 'lucide-react';
import { generateWhatsAppLink, WHATSAPP_NUMBER, PHONE } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Financiamento | Moura Ve\u00edculos',
  description:
    'Simule seu financiamento com as melhores taxas do mercado. Aprova\u00e7\u00e3o r\u00e1pida e condi\u00e7\u00f5es especiais na Moura Ve\u00edculos em Londrina/PR.',
};

const benefits = [
  {
    icon: Clock,
    title: 'Aprova\u00e7\u00e3o R\u00e1pida',
    description: 'Resposta em at\u00e9 24 horas',
  },
  {
    icon: Percent,
    title: 'Melhores Taxas',
    description: 'Taxas a partir de 0,99% ao m\u00eas',
  },
  {
    icon: Banknote,
    title: 'Entrada Facilitada',
    description: 'Condi\u00e7\u00f5es especiais de entrada',
  },
  {
    icon: ShieldCheck,
    title: 'Seguran\u00e7a',
    description: 'Processo 100% seguro e transparente',
  },
];

export default function FinanciamentoPage() {
  const whatsappUrl = generateWhatsAppLink(
    WHATSAPP_NUMBER,
    'Ol\u00e1! Gostaria de simular um financiamento.',
  );

  return (
    <>
      {/* Hero */}
      <section className="bg-primary-dark py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
          <h1 className="text-3xl font-extrabold sm:text-4xl">
            Financie seu Ve\u00edculo
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/70">
            Na Moura Ve\u00edculos, facilitamos a conquista do seu carro. Trabalhamos
            com os principais bancos e financeiras para oferecer as melhores
            condi\u00e7\u00f5es do mercado.
          </p>
        </div>
      </section>

      {/* Benefits grid */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <h2 className="mb-10 text-center text-2xl font-bold text-foreground">
          Por que financiar conosco?
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex flex-col items-center rounded-xl border border-border bg-card p-8 text-center shadow-sm transition-shadow hover:shadow-md"
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
      </section>

      {/* CTA Section */}
      <section className="bg-muted py-16">
        <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Entre em contato para simular seu financiamento
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Nossa equipe est\u00e1 pronta para encontrar a melhor condi\u00e7\u00e3o de
            pagamento para voc\u00ea. Simule agora mesmo pelo WhatsApp!
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-whatsapp px-8 py-4 text-base font-bold text-white shadow-lg transition-all hover:brightness-110 hover:shadow-xl"
            >
              <MessageCircle className="h-5 w-5" />
              Simular pelo WhatsApp
            </a>

            <a
              href="tel:+554333213007"
              className="inline-flex items-center gap-2 rounded-lg border border-primary bg-white px-8 py-4 text-base font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
            >
              <Phone className="h-5 w-5" />
              {PHONE}
            </a>
          </div>

          <p className="mt-6 text-xs text-muted-foreground">
            * Financiamento sujeito a an\u00e1lise de cr\u00e9dito. Taxas e condi\u00e7\u00f5es
            podem variar de acordo com o perfil do cliente e o ve\u00edculo
            escolhido.
          </p>
        </div>
      </section>
    </>
  );
}
