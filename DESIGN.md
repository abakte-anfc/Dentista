# DESIGN.md — Landing page Beliza Odontologia

Guia de design da landing page. Baseado na identidade visual observada no Instagram @belizaodontologia. **Os valores de cor e fonte são aproximações visuais dos posts: confirme com o logo original e ajuste os tokens se necessário.**

## 1. Conceito

**"Sorria sem medo."** Visual acolhedor, feminino, limpo e confiável. A página deve passar cuidado e proximidade, não frieza de clínica. Evitar o azul-hospital clássico: a marca é rosé/terracota.

Palavras-chave de estilo: acolhedor, delicado, profissional, claro, humano.

## 2. Cores

Definir como variáveis CSS em `:root`.

| Token | Uso | Valor aproximado |
|---|---|---|
| `--color-primary` | Fundos de destaque, títulos, ícones | `#B96B66` (rosé/terracota) |
| `--color-primary-dark` | Hover, textos sobre fundo claro | `#9A524E` |
| `--color-primary-soft` | Fundos suaves de seção | `#F4DEDB` |
| `--color-blush` | Fundo alternativo, cards | `#FBEFED` |
| `--color-coral` | Acentos pontuais e avisos (usar pouco) | `#E8605F` |
| `--color-cream` | Fundo base da página | `#FFFAF8` |
| `--color-white` | Cards, textos sobre cor | `#FFFFFF` |
| `--color-text` | Texto principal | `#3B2A29` |
| `--color-text-muted` | Texto secundário | `#7A6361` |
| `--color-whatsapp` | **Apenas** botão/ícone de WhatsApp | `#25D366` (hover `#1EBE5A`) |

Regras:
- Fundo predominante: `--color-cream` e `--color-blush`. Seções de destaque em `--color-primary`.
- Texto branco só sobre `--color-primary-dark` ou fundos que garantam contraste AA (≥ 4,5:1). Verificar `#FFFFFF` sobre `#B96B66`: usar texto grande/negrito ou escurecer o fundo.
- O verde do WhatsApp é a única cor "fora da paleta" e só aparece no CTA principal e no botão flutuante.
- Sem gradientes pesados. Gradiente permitido: `--color-primary-soft` → `--color-cream`, sutil.

## 3. Tipografia

Combinação sugerida (Google Fonts, self-hosted se possível, `font-display: swap`):

- **Títulos:** `Playfair Display` ou `Cormorant Garamond` (serifada elegante, peso 600–700). Alternativa mais moderna: `Poppins` 600.
- **Texto e UI:** `Poppins` ou `Montserrat` (400, 500, 600).
- **Destaque manuscrito opcional** (uma palavra no hero, por exemplo): `Dancing Script` ou `Great Vibes`, em uso mínimo para lembrar o logo manuscrito.

Escala (mobile → desktop):

| Elemento | Mobile | Desktop |
|---|---|---|
| H1 | 32 px / 1.15 | 56 px / 1.1 |
| H2 | 26 px / 1.2 | 40 px / 1.2 |
| H3 | 20 px / 1.3 | 24 px / 1.3 |
| Corpo | 16 px / 1.6 | 18 px / 1.6 |
| Legenda/legal | 13 px / 1.5 | 14 px / 1.5 |

Nunca usar corpo de texto abaixo de 16 px no celular (exceto textos legais).

## 4. Espaçamento, grid e forma

- Escala de espaço (múltiplos de 4/8): `4, 8, 12, 16, 24, 32, 48, 64, 96`.
- Padding vertical de seção: 64 px (mobile) / 96 px (desktop).
- Container: largura máx. `1120px`, margem lateral 20 px no mobile.
- Grid: 1 coluna no mobile, 2–3 colunas em cards a partir de 768 px.
- **Raio:** cards `20px`, botões `999px` (pílula), imagens `24px`. Formas arredondadas e suaves, como as artes do perfil.
- **Sombras:** suaves e tintadas, ex.: `0 10px 30px rgba(185,107,102,.15)`.
- Detalhe de marca: formas orgânicas (círculos/ondas em `--color-primary-soft`) ao fundo das seções e o ícone de dente em linha como padrão decorativo sutil (opacidade ≤ 8%).

## 5. Componentes

**Botão primário (CTA WhatsApp)**
- Pílula, fundo `--color-whatsapp`, texto branco 600, ícone do WhatsApp à esquerda, altura mínima 52 px.
- Texto: "Agendar minha avaliação" (variações: "Falar no WhatsApp").
- Hover: escurece levemente e sobe 2 px. Foco visível (outline 3 px `--color-primary-dark`).

**Botão secundário:** pílula com borda `--color-primary`, texto `--color-primary-dark`, fundo transparente.

**Card de tratamento:** fundo branco, raio 20 px, sombra suave, ícone/ilustração de dente no topo, título (H3), 1–2 linhas de descrição e link "Saber mais / Agendar". Sem promessas de resultado.

**Cabeçalho:** fixo, fundo `--color-cream` com leve blur, logo à esquerda, botão "Agendar" à direita. Altura 64 px.

**Botão flutuante de WhatsApp:** círculo 56–60 px no canto inferior direito, com margem de 16 px, sempre visível.

**FAQ:** `<details>/<summary>` estilizado, fundo `--color-blush`, ícone `+` que gira ao abrir.

**Depoimentos:** cards com aspas, nome e tratamento. Somente depoimentos reais e autorizados.

**Selo de confiança (faixa):** ícones em linha: "Atendimento humanizado", "Primeira avaliação", "Estrutura moderna". Só incluir o que for verdadeiro.

## 6. Imagens e ícones

- **Fotos reais** da Dra. Marcella, equipe e consultório sempre têm prioridade sobre banco de imagens. Pedir ao cliente.
- Fotos de pessoas sorrindo (banco de imagens) só como apoio e sem sugerir que são pacientes.
- Tratamento de imagem coerente: tons quentes, leve saturação, cantos arredondados.
- Ícones: estilo linha (outline), traço de 1.5–2 px, cor `--color-primary`. Conjunto sugerido: Lucide ou Phosphor.
- Formatos WebP/AVIF; hero máx. ~150 KB no mobile.

## 7. Movimento

- Animações discretas: fade-in/slide de 12–16 px ao rolar (200–400 ms, `ease-out`).
- Respeitar `prefers-reduced-motion`: desligar animações.
- Sem carrosséis automáticos, parallax pesado ou vídeo em autoplay com som.

## 8. Voz e copy

- Segunda pessoa ("você"), frases curtas, calorosas, sem jargão técnico.
- Evitar medo e culpa ("você vai perder o dente"). Preferir cuidado e tranquilidade.
- Sem promessas absolutas (ver conformidade no `AGENTS.md`).

Exemplos de microcopy:
- H1: "Seu sorriso merece cuidado, atenção e respeito."
- Subtítulo: "Atendimento humanizado e tratamentos que cabem no seu bolso. Agende sua avaliação e comece sem medo."
- CTA: "Agendar minha avaliação"
- Pós-hero: "Dor de dente não dá aviso. Cuide do seu sorriso antes que ele reclame."
- FAQ: "Tenho medo de dentista, e agora?" → resposta acolhedora sobre conversar com a Dra. e ir no seu ritmo.
- Rodapé: "Beliza Odontologia · Av. Getúlio Vargas, 330, Shopping das Fábricas, Sala 18"

## 9. Acessibilidade

- Contraste AA mínimo; alvo de toque ≥ 48×48 px.
- Foco visível em todos os elementos interativos; navegação por teclado completa.
- `alt` em todas as imagens informativas; ícones decorativos com `aria-hidden="true"`.
- Botão de WhatsApp com `aria-label` claro: "Agendar avaliação pelo WhatsApp".
- `lang="pt-BR"` no `<html>`.

## 10. Dente 3D giratório (elemento de marca)

Peça central do hero. Implementação técnica na seção 6.1 do `AGENTS.md`.

**Visual do modelo**
- Dente branco, brilho suave de esmalte (rugosidade ≈ 0.25–0.35), forma estilizada e simpática, sem raízes aparentes ou aspecto clínico. Pode ter leve "carinha" ou ser neutro, como nos posts do perfil, mas manter coerência com a marca.
- Iluminação neutra e quente (`environment-image="neutral"`, `exposure` ≈ 1.05) para o branco não "estourar" sobre o fundo rosé.

**Composição**
- Fundo do viewer **transparente**, sobre uma forma orgânica em `--color-primary-soft` (círculo/blob) atrás do dente, com ícones de dente em linha ao fundo (≤ 8% de opacidade).
- Sombra de contato suave no chão (`shadow-intensity` 0.6) ou leve "flutuação" (animação vertical de 6–8 px, 4 s, `ease-in-out`).
- Mobile: dente centralizado abaixo do título, altura 260–300 px. Desktop: à direita do texto, altura 460–560 px.
- O CTA do WhatsApp continua sendo o elemento de maior contraste da tela; o dente nunca compete com ele.

**Movimento**
- Rotação contínua lenta (≈ 25°/s). Sem movimentos bruscos nem efeitos de zoom.
- Com `prefers-reduced-motion`, sem rotação nem flutuação: apenas o poster ou arrasto manual.
- Opcional: dica visual discreta "arraste para girar" (texto pequeno em `--color-text-muted`) que some após a primeira interação.

**Estados**
- **Carregando:** poster estático (mesma posição e escala do modelo, para não "pular").
- **Erro/sem WebGL:** poster permanece como imagem final.

**Tokens**
```css
.hero-3d {
  --hero-3d-bg: var(--color-primary-soft);
  aspect-ratio: 1 / 1;
  max-height: 560px;
  background: radial-gradient(circle at 50% 45%, var(--hero-3d-bg) 0 58%, transparent 59%);
  touch-action: pan-y;
}
.hero-3d model-viewer {
  width: 100%;
  height: 100%;
  background: transparent;
  --poster-color: transparent;
}
@media (prefers-reduced-motion: reduce) {
  .hero-3d model-viewer { animation: none; }
}
```

## 11. Tokens CSS de partida

```css
:root {
  --color-primary: #B96B66;
  --color-primary-dark: #9A524E;
  --color-primary-soft: #F4DEDB;
  --color-blush: #FBEFED;
  --color-coral: #E8605F;
  --color-cream: #FFFAF8;
  --color-white: #FFFFFF;
  --color-text: #3B2A29;
  --color-text-muted: #7A6361;
  --color-whatsapp: #25D366;

  --font-heading: "Playfair Display", Georgia, serif;
  --font-body: "Poppins", system-ui, sans-serif;

  --radius-card: 20px;
  --radius-image: 24px;
  --radius-pill: 999px;
  --shadow-soft: 0 10px 30px rgba(185, 107, 102, 0.15);

  --space-1: 4px;  --space-2: 8px;  --space-3: 12px;
  --space-4: 16px; --space-5: 24px; --space-6: 32px;
  --space-7: 48px; --space-8: 64px; --space-9: 96px;
}
```

## 12. Tokens complementares da implementação

Os tamanhos específicos de componentes também ficam em `:root` em `assets/css/styles.css`, sem valores independentes nas regras. Complementam a escala acima:

- `--font-ui: 16px`, `--font-nav: 14px`, `--font-body-desktop: 18px`; títulos intermediários `--font-h1-tablet: 48px`, `--font-h2-tablet: 36px`.
- Títulos desktop: `--font-h1-desktop: 56px`, `--font-h2-desktop: 40px`, `--font-h3-desktop: 24px`.
- `--button-height: 52px`, `--brand-width: 80px`, `--footer-logo-width: 120px`.
- `--about-logo-width: 240px`, `--about-logo-width-desktop: 280px`, `--about-panel-height: 460px`, `--location-card-height: 360px`.
- `--container-width: 1120px`, `--container-gutter: 20px`, `--header-height: 64px`.
- `--viewer-mobile: 300px`, `--viewer-desktop: 500px`, `--floating-size: 56px`, `--touch-target: 48px`.
- `--focus-offset: 4px`; linhas e detalhes usam `--hairline: 1px` e movimento de hover usa `--hover-lift: -2px`.
- Comprimento das linhas: `--measure-body: 48ch`, `--measure-heading: 40ch`, `--measure-reasons: 42ch`, `--measure-step: 30ch`, `--measure-location: 38ch`, `--measure-hero-desktop: 43ch`.
- `--color-whatsapp-hover: #1EBE5A`, conforme a seção 2. O texto escuro do CTA usa `--color-text`, para atingir AA sobre o verde original.

Breakpoints de 768 e 1024 px organizam a expansão do layout; porcentagens e proporções definem a geometria das formas orgânicas.
