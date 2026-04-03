import { MessageCircle, Phone } from 'lucide-react';
import type { Vehicle } from '@/lib/types';
import {
  generateWhatsAppLink,
  WHATSAPP_NUMBER,
  PHONE,
} from '@/lib/utils';

interface VehicleContactProps {
  vehicle: Vehicle;
}

export default function VehicleContact({ vehicle }: VehicleContactProps) {
  const whatsappMessage = `Olá! Tenho interesse no ${vehicle.brand} ${vehicle.model} ${vehicle.version} (${vehicle.year}) anunciado no site. Poderia me passar mais informações?`;
  const whatsappUrl = generateWhatsAppLink(WHATSAPP_NUMBER, whatsappMessage);

  return (
    <div className="space-y-3">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-whatsapp px-6 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:brightness-110 hover:shadow-lg"
      >
        <MessageCircle className="h-5 w-5" />
        Chamar no WhatsApp
      </a>

      <a
        href="tel:+554333213007"
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-primary bg-transparent px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
      >
        <Phone className="h-4 w-4" />
        {PHONE}
      </a>
    </div>
  );
}
