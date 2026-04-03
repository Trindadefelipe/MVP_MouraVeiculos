import type { Metadata } from 'next';
import {
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  AtSign,
  ExternalLink,
} from 'lucide-react';
import {
  generateWhatsAppLink,
  WHATSAPP_NUMBER,
  PHONE,
  ADDRESS,
  BUSINESS_HOURS,
  SOCIAL_LINKS,
} from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Contato | Moura Ve\u00edculos',
  description:
    'Entre em contato com a Moura Ve\u00edculos. Visite nossa loja na Rua Santa Catarina, 491, Centro, Londrina/PR ou fale conosco pelo WhatsApp.',
};

export default function ContatoPage() {
  const whatsappUrl = generateWhatsAppLink(
    WHATSAPP_NUMBER,
    'Ol\u00e1! Gostaria de mais informa\u00e7\u00f5es sobre os ve\u00edculos.',
  );

  return (
    <>
      {/* Hero */}
      <section className="bg-primary-dark py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
          <h1 className="text-3xl font-extrabold sm:text-4xl">
            Entre em Contato
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/70">
            Estamos prontos para atender voc\u00ea. Visite nossa loja ou entre em
            contato pelos canais abaixo.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Left - Contact info */}
          <div className="space-y-6">
            {/* Address */}
            <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-6 shadow-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary-light">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">Endere\u00e7o</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Rua Santa Catarina, 491
                  <br />
                  Centro - Londrina/PR
                  <br />
                  CEP 86010-470
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-6 shadow-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary-light">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">Telefone</h3>
                <a
                  href="tel:+554333213007"
                  className="mt-1 block text-sm text-muted-foreground transition-colors hover:text-primary-light"
                >
                  {PHONE}
                </a>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-6 shadow-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-whatsapp/10 text-whatsapp">
                <MessageCircle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">WhatsApp</h3>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 block text-sm text-muted-foreground transition-colors hover:text-whatsapp"
                >
                  {PHONE}
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-6 shadow-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary-light">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">
                  Hor\u00e1rio de Funcionamento
                </h3>
                <div className="mt-1 space-y-1 text-sm text-muted-foreground">
                  <p>Segunda a Sexta: {BUSINESS_HOURS.weekdays}</p>
                  <p>S\u00e1bado: {BUSINESS_HOURS.saturday}</p>
                  <p>Domingo: {BUSINESS_HOURS.sunday}</p>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-6 shadow-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary-light">
                <AtSign className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">Redes Sociais</h3>
                <div className="mt-2 flex flex-wrap gap-3">
                  <a
                    href={SOCIAL_LINKS.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <AtSign className="h-4 w-4" />
                    @mouraveiculos
                  </a>
                  <a
                    href={SOCIAL_LINKS.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <ExternalLink className="h-4 w-4" />
                    /MouraVeiculos
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Map */}
          <div className="overflow-hidden rounded-xl border border-border shadow-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3661.9!2d-51.1628!3d-23.3045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sRua+Santa+Catarina+491+Londrina+PR!5e0!3m2!1sen!2sbr!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '500px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localiza\u00e7\u00e3o Moura Ve\u00edculos"
            />
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="bg-whatsapp/10 py-12">
        <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
          <h2 className="text-2xl font-bold text-foreground">
            Fale conosco pelo WhatsApp
          </h2>
          <p className="mt-3 text-muted-foreground">
            Tire suas d\u00favidas, agende uma visita ou solicite mais informa\u00e7\u00f5es
            sobre nossos ve\u00edculos.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-whatsapp px-8 py-4 text-base font-bold text-white shadow-lg transition-all hover:brightness-110 hover:shadow-xl"
          >
            <MessageCircle className="h-5 w-5" />
            Iniciar Conversa no WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
