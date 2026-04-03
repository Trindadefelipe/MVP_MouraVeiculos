# MVP Moura Veículos - Plano de Desenvolvimento

## Visão Geral

**Objetivo:** Criar um MVP de site para a garagem Moura Veículos (Londrina/PR) que demonstre como o projeto final poderia ficar, com integração preparada para a API da RevendaMais.

**Prazo:** Até 05/04/2026 (3 dias)
**Hospedagem:** Vercel
**Stack:** Next.js 15 (App Router) + TypeScript + Tailwind CSS 4

---

## Arquitetura Técnica

### Stack Completa
| Camada | Tecnologia | Justificativa |
|--------|-----------|---------------|
| Framework | Next.js 15 (App Router) | SSR/SSG, rotas dinâmicas, API routes, deploy fácil na Vercel |
| Linguagem | TypeScript | Tipagem forte, menos bugs, melhor DX |
| Estilização | Tailwind CSS 4 | Produtividade, responsividade, design system rápido |
| UI Components | shadcn/ui | Componentes acessíveis, customizáveis, sem lock-in |
| Ícones | Lucide React | Leve, consistente, open source |
| Galeria de Fotos | Embla Carousel | Leve, performático, touch-friendly |
| Formulários | React Hook Form + Zod | Validação robusta, performance |
| Maps | Google Maps Embed (iframe) | Simples, sem API key necessária para embed |
| Deploy | Vercel | CI/CD automático via GitHub, preview deploys |

### Estrutura de Pastas
```
src/
├── app/                    # App Router (páginas)
│   ├── layout.tsx          # Layout raiz (header + footer)
│   ├── page.tsx            # Home
│   ├── estoque/
│   │   ├── page.tsx        # Listagem de veículos
│   │   └── [slug]/
│   │       └── page.tsx    # Detalhe do veículo
│   ├── financiamento/
│   │   └── page.tsx        # Formulário de financiamento
│   ├── sobre/
│   │   └── page.tsx        # Sobre nós
│   ├── contato/
│   │   └── page.tsx        # Contato + Google Maps
│   └── api/
│       └── vehicles/
│           └── route.ts    # API route (proxy para RevendaMais)
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── layout/
│   │   ├── Header.tsx      # Navbar responsiva
│   │   ├── Footer.tsx      # Footer com links e contato
│   │   └── WhatsAppButton.tsx  # Botão flutuante WhatsApp
│   ├── home/
│   │   ├── HeroBanner.tsx      # Banner principal
│   │   ├── FeaturedVehicles.tsx # Veículos em destaque
│   │   ├── BrandShowcase.tsx    # Grid de marcas
│   │   └── CTASection.tsx       # Call to action
│   ├── vehicles/
│   │   ├── VehicleCard.tsx     # Card de veículo na listagem
│   │   ├── VehicleGrid.tsx     # Grid de cards
│   │   ├── VehicleFilters.tsx  # Barra de filtros
│   │   ├── VehicleGallery.tsx  # Galeria de fotos (detalhe)
│   │   ├── VehicleSpecs.tsx    # Tabela de especificações
│   │   └── VehicleContact.tsx  # CTA de contato no detalhe
│   └── shared/
│       ├── SectionTitle.tsx    # Título de seção reutilizável
│       └── LoadingSpinner.tsx  # Loading state
├── lib/
│   ├── api/
│   │   ├── revendamais.ts     # Client da API RevendaMais
│   │   └── types.ts           # Types dos veículos
│   ├── mock/
│   │   └── vehicles.ts        # Dados mockados (MVP sem API key)
│   └── utils.ts               # Helpers (formatação de preço, etc.)
├── hooks/
│   └── useVehicles.ts         # Hook para buscar veículos
└── styles/
    └── globals.css            # Estilos globais + Tailwind
```

### Integração RevendaMais (Arquitetura)
```
[Browser] → [Next.js API Route] → [Cache Layer] → [RevendaMais API]
                                        ↓
                                  [Local JSON Cache]
```

**Estratégia de Cache (crítico - limite de 300 req/mês):**
- API Route `/api/vehicles` funciona como proxy
- Cache em memória com revalidação a cada 4h (máx ~180 req/mês)
- Fallback para dados mockados quando API indisponível
- No MVP: usa dados mockados; quando tiver API key, basta configurar env var

---

## Páginas e Funcionalidades

### 1. Home (`/`)
- **Hero Banner:** Imagem de destaque com headline "Moura Veículos - Seu próximo carro está aqui"
- **Veículos em Destaque:** Grid com 6-8 veículos (cards com foto, modelo, ano, km, preço)
- **Seção de Marcas:** Grid de logos das marcas disponíveis (Fiat, VW, Chevrolet, etc.)
- **CTA Financiamento:** Banner com call-to-action para a página de financiamento
- **Sobre resumido:** Breve texto sobre a Moura Veículos com link para página completa
- **Localização:** Mini mapa + endereço

### 2. Estoque (`/estoque`)
- **Filtros:** Marca, Modelo, Ano (de/até), Preço (de/até), Combustível, Câmbio
- **Ordenação:** Menor preço, Maior preço, Mais recente
- **Grid responsivo:** 3 colunas (desktop), 2 (tablet), 1 (mobile)
- **Card do veículo:** Foto principal, marca, modelo, ano, km, câmbio, combustível, preço
- **Paginação:** Simples com "Carregar mais" ou paginação numérica

### 3. Detalhe do Veículo (`/estoque/[slug]`)
- **Galeria de fotos:** Carousel com thumbnails
- **Informações principais:** Marca, modelo, ano, preço (destaque)
- **Especificações:** Tabela com km, combustível, câmbio, cor, portas, motor
- **Botão WhatsApp:** "Tenho interesse neste veículo" (pré-preenche mensagem)
- **Formulário de contato rápido:** Nome, telefone, mensagem
- **Veículos similares:** Sugestão de 3-4 veículos da mesma faixa

### 4. Financiamento (`/financiamento`)
- **Headline:** "Financie seu veículo"
- **Benefícios:** Cards com vantagens (aprovação rápida, melhores taxas, etc.)
- **Formulário:** Nome, telefone, veículo de interesse, valor de entrada
- **CTA WhatsApp:** Botão direto para conversar sobre financiamento

### 5. Sobre (`/sobre`)
- **História:** Texto sobre os 20+ anos de Moura Veículos em Londrina
- **Missão/Valores:** Cards com ícones
- **Números:** 20+ anos, X veículos vendidos, localização privilegiada
- **Equipe:** Foto da loja/equipe (placeholder no MVP)

### 6. Contato (`/contato`)
- **Informações:** Endereço, telefone, WhatsApp, horário de funcionamento
- **Google Maps:** Embed com localização (Rua Santa Catarina, 491, Londrina/PR)
- **Formulário:** Nome, email, telefone, assunto, mensagem
- **Redes sociais:** Links para Instagram e Facebook

### Componentes Globais
- **Header:** Logo + navegação responsiva (hamburger no mobile)
- **Footer:** Links, contato, redes sociais, copyright
- **WhatsApp Flutuante:** Botão fixo no canto inferior direito (em todas as páginas)

---

## Design e Identidade Visual

### Paleta de Cores (baseada no site atual)
| Uso | Cor | Hex |
|-----|-----|-----|
| Primária | Azul escuro | `#1a2332` |
| Secundária | Azul | `#2563eb` |
| Accent | Laranja/Dourado | `#f59e0b` |
| Background | Branco | `#ffffff` |
| Background Alt | Cinza claro | `#f8fafc` |
| Texto | Cinza escuro | `#1e293b` |
| Texto secundário | Cinza | `#64748b` |

> **Nota:** As cores serão ajustadas após confirmação visual do site atual.

### Tipografia
- **Headings:** Inter (bold/semibold)
- **Body:** Inter (regular)
- **Preços:** Tabular nums, bold, cor de destaque

### Princípios de UI/UX
1. **Mobile-first:** 70%+ do tráfego de sites automotivos vem do mobile
2. **Foco em conversão:** Cada página direciona para WhatsApp ou formulário
3. **Performance:** Imagens otimizadas (next/image), lazy loading
4. **Confiança:** Mostrar anos de mercado, endereço físico, avaliações
5. **Simplicidade:** Menos cliques até o contato = mais leads

---

## Dados Mockados (MVP)

Baseado no estoque real da Moura Veículos, criaremos mock data com ~30 veículos incluindo:
- Marcas: Fiat, Chevrolet, Volkswagen, Jeep, Honda, Hyundai, Toyota, BMW, Audi, Renault, Citroën, Peugeot
- Faixa de preço: R$ 34.900 a R$ 299.900
- Anos: 2009 a 2025
- Tipos: SUV, Hatch, Sedan, Pickup, Comercial
- Com fotos placeholder (unsplash ou imagens genéricas de veículos)

A estrutura dos dados mockados seguirá exatamente o schema da API RevendaMais para facilitar a migração.

---

## Cronograma (3 dias)

### Dia 1 - 02/04 (Quinta) - Fundação
- [x] Planejamento e definição do escopo ← **Estamos aqui**
- [ ] Setup do projeto (Next.js, Tailwind, shadcn/ui, TypeScript)
- [ ] Configuração do Tailwind com design tokens (cores, fontes)
- [ ] Layout base: Header + Footer + WhatsApp Button
- [ ] Dados mockados dos veículos
- [ ] Types TypeScript para Vehicle (compatível com RevendaMais)
- [ ] Página Home (Hero + Destaques + Marcas + CTA)

### Dia 2 - 03/04 (Sexta) - Core
- [ ] Página Estoque (listagem completa com filtros e ordenação)
- [ ] Página Detalhe do Veículo (galeria, specs, CTAs)
- [ ] Componente VehicleCard reutilizável
- [ ] Sistema de filtros (marca, preço, ano, combustível, câmbio)
- [ ] API Route `/api/vehicles` (com mock data, pronto para RevendaMais)
- [ ] Página Financiamento (formulário + benefícios)

### Dia 3 - 04/04 (Sábado) - Finalização
- [ ] Página Sobre Nós
- [ ] Página Contato (formulário + Google Maps)
- [ ] Responsividade completa (mobile/tablet/desktop)
- [ ] Ajustes de UI/UX, micro-interações
- [ ] Testes gerais e correções
- [ ] Deploy na Vercel
- [ ] Revisão final

### Buffer - 05/04 (Domingo)
- [ ] Hotfixes e ajustes finais
- [ ] Entrega

---

## Preparação para Produção (Pós-MVP)

Quando a API key da RevendaMais estiver disponível:
1. Configurar `REVENDAMAIS_API_KEY` nas env vars da Vercel
2. Ativar o client real em `lib/api/revendamais.ts`
3. O sistema automaticamente troca de mock data para dados reais
4. Configurar cache de 4h para respeitar limite de 300 req/mês

### Backlog (futuras iterações)
- [ ] Integração real com API RevendaMais
- [ ] SEO completo (meta tags, sitemap, structured data)
- [ ] Página de Consignação
- [ ] Google Analytics + Facebook Pixel
- [ ] Tour 360 virtual da loja
- [ ] Simulador de financiamento real (integração bancária)
- [ ] Blog/conteúdo para SEO
- [ ] PWA (Progressive Web App)
- [ ] Sistema de favoritos
- [ ] Comparador de veículos
- [ ] Notificações de novos veículos

---

## Variáveis de Ambiente

```env
# RevendaMais API (quando disponível)
REVENDAMAIS_API_KEY=
REVENDAMAIS_API_URL=https://api.revendamais.com.br

# Contato
NEXT_PUBLIC_WHATSAPP_NUMBER=554333213007
NEXT_PUBLIC_PHONE_NUMBER=(43) 3321-3007
NEXT_PUBLIC_ADDRESS=Rua Santa Catarina, 491, Centro - Londrina/PR
NEXT_PUBLIC_INSTAGRAM=https://www.instagram.com/mouraveiculos/
NEXT_PUBLIC_FACEBOOK=https://www.facebook.com/MouraVeiculos/

# Google Maps (embed, sem API key)
NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL=https://www.google.com/maps/embed?pb=...

# Feature Flags
NEXT_PUBLIC_USE_MOCK_DATA=true
```

---

## Definição de Pronto (DoD)

O MVP estará pronto quando:
- ✅ Todas as 6 páginas estiverem funcionais e responsivas
- ✅ Navegação fluida entre todas as páginas
- ✅ Filtros de estoque funcionando com dados mockados
- ✅ WhatsApp integrado em todos os CTAs
- ✅ Google Maps na página de contato
- ✅ Design profissional e consistente
- ✅ Deploy funcionando na Vercel
- ✅ Performance: Lighthouse > 80 em todas as métricas
- ✅ Arquitetura preparada para plug-and-play da API RevendaMais
