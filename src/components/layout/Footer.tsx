import Link from "next/link";
import { MapPin, Phone, Clock, Mail } from "lucide-react";

const quickLinks = [
  { href: "/", label: "Início" },
  { href: "/estoque", label: "Estoque" },
  { href: "/financiamento", label: "Financiamento" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company info */}
          <div>
            <h3 className="text-lg font-extrabold tracking-tight">
              MOURA <span className="text-accent">VEÍCULOS</span>
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Há mais de 20 anos realizando o sonho do carro próprio em Londrina
              e região.
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href="https://www.instagram.com/mouraveiculos"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-accent"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.97.24 2.43.403a4.088 4.088 0 011.47.958c.453.453.78.898.958 1.47.163.46.35 1.26.403 2.43.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.24 1.97-.403 2.43a4.088 4.088 0 01-.958 1.47 4.088 4.088 0 01-1.47.958c-.46.163-1.26.35-2.43.403-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.97-.24-2.43-.403a4.088 4.088 0 01-1.47-.958 4.088 4.088 0 01-.958-1.47c-.163-.46-.35-1.26-.403-2.43C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.054-1.17.24-1.97.403-2.43a4.088 4.088 0 01.958-1.47 4.088 4.088 0 011.47-.958c.46-.163 1.26-.35 2.43-.403C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.333.014 7.053.072 5.775.13 4.902.333 4.14.63a6.21 6.21 0 00-2.245 1.462A6.21 6.21 0 00.433 4.337C.136 5.1-.067 5.972.01 7.25.068 8.53.082 8.938.082 12.197c0 3.259.014 3.668.072 4.948.058 1.277.261 2.15.558 2.913a6.21 6.21 0 001.462 2.245 6.21 6.21 0 002.245 1.462c.763.297 1.636.5 2.913.558C8.333 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.277-.058 2.15-.261 2.913-.558a6.21 6.21 0 002.245-1.462 6.21 6.21 0 001.462-2.245c.297-.763.5-1.636.558-2.913.058-1.28.072-1.689.072-4.948s-.014-3.668-.072-4.948c-.058-1.277-.261-2.15-.558-2.913a6.21 6.21 0 00-1.462-2.245A6.21 6.21 0 0019.86.433C19.1.136 18.227-.067 16.95.01 15.668.068 15.26.082 12 .082zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/></svg>
              </a>
              <a
                href="https://www.facebook.com/MouraVeiculos"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-accent"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-accent">
              Links Rápidos
            </h4>
            <ul className="mt-4 space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-accent">
              Contato
            </h4>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-2 text-sm text-white/70">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>
                  Rua Santa Catarina, 491
                  <br />
                  Centro - Londrina/PR
                  <br />
                  CEP 86010-470
                </span>
              </li>
              <li>
                <a
                  href="tel:+554333213007"
                  className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4 shrink-0 text-accent" />
                  (43) 3321-3007
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/554333213007?text=Ol%C3%A1!%20Gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20os%20ve%C3%ADculos."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4 shrink-0 text-accent" />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Business hours */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-accent">
              Horário de Funcionamento
            </h4>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center gap-2 text-sm text-white/70">
                <Clock className="h-4 w-4 shrink-0 text-accent" />
                <span>Seg - Sex: 08:00 - 18:00</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/70">
                <Clock className="h-4 w-4 shrink-0 text-accent" />
                <span>Sáb: 08:00 - 13:00</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-4 lg:px-8">
          <p className="text-center text-xs text-white/50">
            &copy; 2026 Moura Veículos. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
