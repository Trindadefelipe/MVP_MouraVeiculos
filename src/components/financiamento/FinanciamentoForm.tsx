'use client';

import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { generateWhatsAppLink, WHATSAPP_NUMBER } from '@/lib/utils';

const entradaOptions = [
  { value: '', label: 'Selecione uma faixa' },
  { value: 'Sem entrada', label: 'Sem entrada' },
  { value: 'Até R$ 5.000', label: 'Até R$ 5.000' },
  { value: 'R$ 5.000 a R$ 10.000', label: 'R$ 5.000 a R$ 10.000' },
  { value: 'R$ 10.000 a R$ 20.000', label: 'R$ 10.000 a R$ 20.000' },
  { value: 'R$ 20.000 a R$ 40.000', label: 'R$ 20.000 a R$ 40.000' },
  { value: 'Acima de R$ 40.000', label: 'Acima de R$ 40.000' },
];

export default function FinanciamentoForm() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [veiculo, setVeiculo] = useState('');
  const [entrada, setEntrada] = useState('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const message = [
      'Olá! Gostaria de simular um financiamento.',
      '',
      `*Nome:* ${nome}`,
      `*Telefone:* ${telefone}`,
      `*Veículo de interesse:* ${veiculo}`,
      `*Valor de entrada:* ${entrada}`,
    ].join('\n');

    const url = generateWhatsAppLink(WHATSAPP_NUMBER, message);
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      <h2 className="mb-10 text-center text-2xl font-bold text-foreground">
        Simule seu Financiamento
      </h2>

      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-2xl rounded-xl border border-border bg-card p-8 shadow-sm"
      >
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Nome completo */}
          <div className="sm:col-span-2">
            <label
              htmlFor="nome"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              Nome completo
            </label>
            <input
              id="nome"
              type="text"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome completo"
              className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Telefone */}
          <div>
            <label
              htmlFor="telefone"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              Telefone
            </label>
            <input
              id="telefone"
              type="tel"
              required
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              placeholder="(00) 00000-0000"
              className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Veículo de interesse */}
          <div>
            <label
              htmlFor="veiculo"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              Veículo de interesse
            </label>
            <input
              id="veiculo"
              type="text"
              required
              value={veiculo}
              onChange={(e) => setVeiculo(e.target.value)}
              placeholder="Ex: Toyota Corolla 2024"
              className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Valor de entrada */}
          <div className="sm:col-span-2">
            <label
              htmlFor="entrada"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              Valor de entrada aproximado
            </label>
            <select
              id="entrada"
              required
              value={entrada}
              onChange={(e) => setEntrada(e.target.value)}
              className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {entradaOptions.map((opt) => (
                <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-whatsapp px-8 py-4 text-base font-bold text-white shadow-lg transition-all hover:brightness-110 hover:shadow-xl"
        >
          <MessageCircle className="h-5 w-5" />
          Enviar simulação pelo WhatsApp
        </button>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Ao enviar, você será redirecionado para o WhatsApp com os dados preenchidos.
        </p>
      </form>
    </section>
  );
}
