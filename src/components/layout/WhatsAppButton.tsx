"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const whatsappUrl =
    "https://wa.me/554333213007?text=Ol%C3%A1!%20Gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20os%20ve%C3%ADculos.";

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale conosco pelo WhatsApp"
      className="group fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg transition-transform duration-200 hover:scale-110 animate-pulse hover:animate-none"
    >
      <MessageCircle className="h-7 w-7" />

      {/* Tooltip */}
      <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md bg-foreground px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100">
        Fale conosco
      </span>
    </a>
  );
}
