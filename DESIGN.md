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

- **Fotos reais** da Dra. Marcelle, equipe e consultório sempre têm prioridade sobre banco de imagens. Pedir ao cliente.
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

## 10.1 Dente gigante guiado pelo scroll (SUBSTITUI a composição e o movimento da seção 10)

A seção 10 continua valendo para o **visual do modelo** (esmalte branco, luz neutra e quente). A composição de hero e a rotação contínua foram substituídas por esta seção. Regras técnicas em `AGENTS.md` 6.2.

**Presença**
- O dente é o elemento mais marcante da página: **gigante** (desktop ≈ 60–85% da altura da tela, mobile ≈ 70% da largura), fixo, sempre inteiro dentro da tela.
- Atrás dele, uma forma orgânica em `--color-primary-soft` (blob/círculo) que o acompanha com leve atraso (parallax 0.9×), mais ícones de dente em linha (opacidade ≤ 6%) fixos no fundo.
- Sombra suave sob o dente que acompanha a trajetória (elipse borrada em `rgba(185,107,102,.18)`).
- Fundo da página contínuo, alternando suavemente entre `--color-cream` e `--color-blush` conforme a cena (transição de cor 600 ms), sem cortes duros entre seções.

**Movimento**
- Só se move enquanto há scroll. Parado, o dente fica parado, sem flutuação ou rotação automática.
- Rotação suave com inércia curta; trajetória em S da direita para a esquerda; variação leve de escala e inclinação. Nada de movimentos bruscos.

**Texto sobre a cena**
- Conteúdo no lado oposto ao dente. Largura de leitura 36–46 ch.
- Títulos grandes (H2 desktop até 48 px) e frases curtas; um bloco de informação por vez.
- Cartões de conteúdo: fundo `--color-cream` com 92% de opacidade, raio 20 px, `--shadow-soft`; no mobile podem cobrir parte do dente, sempre com contraste AA.
- Itens de lista numerados em círculos `--color-primary`, ícones em linha.

**Cascata**
- Entrada: de baixo para cima, 28 px, `opacity 0→1`, 500–600 ms, `cubic-bezier(.22,.8,.3,1)`, stagger 90–120 ms entre itens.
- Saída: para cima, 20 px, `opacity→0`, 300–400 ms, na mesma ordem. Reversível ao rolar para cima.

**Elementos fixos**
- Header compacto (logo + links + botão "Agendar") e botão flutuante de WhatsApp. O CTA nunca é coberto pelo dente.
- Indicador de progresso opcional: barra vertical fina de 3 px em `--color-primary`, na borda direita (ou esquerda quando o dente estiver à direita).

**Movimento reduzido**
- Sem rotação, trajetória nem cascata. Dente estático menor, cenas empilhadas e conteúdo visível.

**CSS de partida**
```css
.tooth-stage {
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}
.tooth-stage model-viewer {
  position: absolute;
  top: 0; left: 0;
  width: min(85vh, 60vw);
  height: min(85vh, 60vw);
  background: transparent;
  transform: translate3d(var(--tx, 60vw), var(--ty, 20vh), 0) scale(var(--ts, 1));
  will-change: transform;
}
@media (max-width: 767px) {
  .tooth-stage model-viewer { width: 72vw; height: 72vw; }
}
.scene { position: relative; z-index: 2; min-height: 120vh; padding-block: var(--space-8); }
[data-reveal] {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity .55s cubic-bezier(.22,.8,.3,1), transform .55s cubic-bezier(.22,.8,.3,1);
  transition-delay: calc(var(--i, 0) * 100ms);
}
[data-reveal].is-in  { opacity: 1; transform: none; }
[data-reveal].is-out { opacity: 0; transform: translateY(-20px); transition-duration: .35s; }
@media (prefers-reduced-motion: reduce) {
  [data-reveal] { opacity: 1; transform: none; transition: none; }
  .tooth-stage model-viewer { transform: none; position: relative; width: 50vw; height: 50vw; }
}
```
O `--tx/--ty/--ts` são definidos pelo JS a cada frame a partir da trajetória; ajustar os waypoints visualmente.

## 10.2 REVISÃO: dente linear, texto flutuante e fundo (PREVALECE sobre a 10.1)

**O que sai:** trajeto em S, cartões/caixas de texto, blob claro atrás do dente, variação de escala e inclinação.
**O que entra:** movimento linear e suave, texto flutuante, dente branco brilhante sobre fundo de contraste.

**Movimento**
- Dente em linha reta da direita para a esquerda, `y` fixo, rotação proporcional ao scroll, sem flutuar quando parado. Suavização longa e contínua (sensação de "deslizar", nunca de "pular").
- Cascata de texto mais calma: entrada 600–700 ms, stagger 110–140 ms, `translateY(24px)`; saída 350 ms.

**Texto flutuante (sem caixas)**
- Direto sobre o fundo, sem cartão, borda ou preenchimento. Títulos em serifada grande (desktop 44–56 px, mobile 30–34 px), corpo 17–18 px, linhas curtas (≤ 42 ch).
- Legibilidade por **contraste de cor + halo suave** (`text-shadow: 0 0 24px <cor do fundo>`), nunca por caixa.
- Hierarquia: etiqueta pequena em caixa-alta com tracking (ex.: "CUIDADO PARA CADA SORRISO"), título, 1–2 linhas, link/CTA. Listas curtas com marcadores em círculos finos.
- Posições: coluna esquerda quando o dente está à direita, coluna direita quando está à esquerda, faixa inferior quando está no centro (ver `AGENTS.md` 6.3).

**Fundo (recomendação, a confirmar com a imagem do cliente)**
- Preferir **terracota/rosé profundo**, coerente com os posts da Beliza: gradiente vertical muito suave de `#9A524E` (topo) a `#B25F5A` (base), com textura de ruído leve (≤ 4%) opcional. Dente branco e texto creme em destaque.
- Texto sobre esse fundo: `--color-cream` e `--color-white`. Conferir contraste: texto pequeno ≥ 4,5:1 (na dúvida, usar o lado escuro do gradiente); textos grandes ≥ 3:1.
- Detalhes de apoio: ícones de dente em linha com opacidade ≤ 5%, halo de luz radial discreto atrás do dente (`rgba(255,250,248,.14)`), sombra no chão suave.
- **Alternativa clara** (se o cliente preferir): fundo `--color-cream` com um degradê rosé na base e dente com sombra mais definida. Só usar se o dente continuar claramente destacado.
- Se o cliente enviar uma imagem de fundo: avaliar contraste, ruído visual e peso (≤ 200 KB, WebP), aplicar overlay para garantir AA e escolher entre fundo escuro, claro ou imagem, justificando por escrito.

**O dente**
- Branco-esmalte brilhante, sem cinza: `exposure` ≈ 1.3–1.6, `environment-image="neutral"`, sombra suave e curta. Conferir em todas as posições da rotação.

**Elementos fixos** (mantidos): header compacto com botão "Agendar", botão flutuante de WhatsApp, indicador de progresso opcional (barra fina creme).

**Movimento reduzido:** sem rotação, deslocamento nem cascata; dente estático e texto visível.

**CSS de partida (substitui o bloco da 10.1)**
```css
body { background: linear-gradient(180deg, #9A524E 0%, #B25F5A 100%) fixed; color: var(--color-cream); }
.scene { position: relative; z-index: 2; min-height: 120vh; padding-block: var(--space-8); }
.float-text { max-width: 42ch; text-shadow: 0 0 24px rgba(154, 82, 78, .75); }
.float-text--left  { margin-right: auto; margin-left: 6vw; }
.float-text--right { margin-left: auto;  margin-right: 6vw; }
.float-text--bottom { max-width: none; margin-inline: 6vw; align-self: end; }
.tooth-stage { position: fixed; inset: 0; z-index: 1; pointer-events: none; }
.tooth-stage model-viewer {
  position: absolute; top: 0; left: 0;
  width: min(72vh, 42vw); height: min(72vh, 42vw);
  background: transparent;
  transform: translate3d(var(--tx), var(--ty), 0);
  will-change: transform;
}
@media (max-width: 767px) {
  .tooth-stage model-viewer { width: 62vw; height: 62vw; }
}
[data-reveal] {
  opacity: 0; transform: translateY(24px);
  transition: opacity .65s cubic-bezier(.22,.8,.3,1), transform .65s cubic-bezier(.22,.8,.3,1);
  transition-delay: calc(var(--i, 0) * 120ms);
}
[data-reveal].is-in  { opacity: 1; transform: none; }
[data-reveal].is-out { opacity: 0; transform: translateY(-20px); transition-duration: .35s; }
@media (prefers-reduced-motion: reduce) {
  [data-reveal] { opacity: 1; transform: none; transition: none; }
  .tooth-stage model-viewer { position: relative; transform: none; width: 50vw; height: 50vw; }
}
```
Observação: `exposure` é um atributo da tag `<model-viewer>` (ex.: `exposure="1.4"`), não uma propriedade CSS.

## 10.3 Referência Behance: foto da Dra. Marcelle e dente nos benefícios

**Direção vigente, solicitada pelo cliente:** esta seção prevalece sobre a composição e o movimento das seções 10, 10.1 e 10.2. A foto da Dra. Marcelle passa a ser o principal elemento visual do hero. O dente 3D fica restrito à seção de benefícios; deixa de ser um elemento fixo que acompanha a página inteira. Os valores de trajetória global registrados abaixo são históricos e não devem orientar a próxima composição.

### Referência e análise

- **Projeto:** [Site — Dentista (Odontologia), de João Vitor Silva](https://www.behance.net/gallery/251340955/Site-Dentista-%28Odontologia%29), publicado em 18/06/2026. A apresentação identifica o projeto como um website para Karenn Rodrigues Odontologia.
- **Direção aproveitável:** o texto de apresentação articula autoridade profissional, tecnologia, proximidade humana e conversão. Para a Beliza, isso orienta uma apresentação centrada na profissional real, acompanhada de conteúdo acolhedor e caminho claro para agendar pelo WhatsApp.
- **Limite da análise:** foi possível consultar a apresentação textual, mas as imagens da landing page não ficaram acessíveis nas ferramentas de inspeção desta revisão. Cores, espaçamento, tipografia e composição específica do projeto não foram verificados visualmente. Essas decisões abaixo são adaptações propostas para a Beliza, não descrições da referência.
- Preservar a identidade terracota/rosé e creme, Playfair Display/Poppins, copy válida e dados da Beliza. Não importar especialidades, certificações, localização, resultados ou depoimentos da clínica apresentada no Behance. Não copiar suas imagens ou materiais sem licença.

### Hero: a profissional em primeiro plano

- Usar a foto fornecida pelo cliente em [`foto.jpg`](foto.jpg) como retrato principal da Dra. Marcelle. O rosto e a expressão acolhedora devem ser o primeiro foco visual, com título emocional, subtítulo curto e CTA “Agendar avaliação” próximos.
- Desktop: composição em duas colunas, com texto à esquerda e retrato em destaque à direita. Mobile: retrato e texto em fluxo natural, mantendo o CTA acessível cedo na página; evitar uma foto tão alta que empurre toda a mensagem para fora da primeira experiência de leitura.
- Preservar rosto, proporções, jaleco e identidade da imagem. Recortar com foco no rosto e parte superior do corpo, sem deformar ou cortar o rosto. O fundo preto existente pode permanecer no retrato e dialogar com uma área terracota profunda; a foto não deve virar um fundo atrás do texto.
- Guardar o original. Na implementação, gerar versões WebP/AVIF adequadas a mobile e desktop, declarar dimensões e reservar a proporção para evitar saltos. Carregar a imagem do hero com prioridade alta. Confirmar autorização de uso e crédito, se exigido.
- O dente não aparece no hero nem compete com o retrato. Manter header com âncoras, WhatsApp flutuante e CTA principal.

### Benefícios: o que faz um bom tratamento bucal

- Criar uma seção própria, com título sugerido **“O que faz um bom tratamento bucal”**, combinando o dente 3D com conteúdo educativo curto. Diferenciar esse conteúdo da lista de tratamentos e dos diferenciais da clínica.
- Organizar a mensagem em quatro pontos: **entender suas necessidades**, **planejar o cuidado para seu caso**, **orientar o cuidado no dia a dia** e **acompanhar conforme indicação profissional**. São pautas para a copy final, sem inventar protocolos ou credenciais da Beliza.
- Relacionar os benefícios ao cuidado individual e à avaliação profissional. Não prometer cura, resultado estético, ausência de dor ou prazo garantido. Não usar números, comparações de superioridade ou fotos de resultados sem conteúdo real autorizado.
- Desktop: dente de um lado e uma lista editorial legível do outro, sem cartões ou fundos individuais atrás de cada texto. Mobile: dente acima e conteúdo abaixo, sem sobreposição. A seção deve ter altura suficiente para a leitura, sem exigir rolagem artificialmente longa.
- Manter o dente branco e brilhante, sem blob/círculo atrás. Usar o mesmo `.glb`, poster e licença já registrados. A decoração não deve ser apresentada como resultado de tratamento.
- Um único `<model-viewer>`, contido nessa seção, sem `auto-rotate`, sem `camera-controls` e sem interceptar o scroll. Se houver rotação, vinculá-la apenas ao progresso local da seção, reversível, com suavização independente de FPS e parada ao assentar. Não reutilizar a trajetória global `x = 72 − 44p` da seção 10.2. Um eventual sticky deve ficar limitado ao contêiner de benefícios.
- Carregar o 3D quando a seção se aproximar da viewport. Manter poster, fallback sem WebGL/JS e `prefers-reduced-motion`; conteúdo sempre legível. Renderização e laço de movimento apenas quando necessários, pausados fora da seção ou com documento oculto.

### Ordem e critérios para a próxima implementação

1. Header fixo; hero com foto da Dra. Marcelle, mensagem e CTA.
2. Tratamentos.
3. Benefícios de um bom tratamento bucal, com o dente 3D localizado.
4. Diferenciais da Beliza.
5. Como funciona.
6. Sobre a Dra. Marcelle, com bio e CRO fornecidos pelo cliente.
7. FAQ compacto, localização, CTA final e rodapé legal.

Preservar SEO, JSON-LD e links de WhatsApp. Resultados e depoimentos continuam ocultos até haver material real autorizado. Conferir contraste AA, foco, scroll nativo, 360/768/1280 px, paisagem e zoom 200%. Medir novamente Lighthouse e fluidez após implementar: as medições da experiência global anterior não validam esta nova composição.

**Implementação 10.3:** retrato em WebP de 480 e 960 px (24 e 85 KB), hero em duas colunas no desktop e fluxo vertical no mobile. Benefícios com fundo `--benefits-background: #914D49`, retrato com `--portrait-background: #09090B`, divisórias `--benefits-divider: rgba(255,250,248,.25)`. Altura do retrato 340/540 px; viewer 300/460 px, limitado à largura disponível. Dente contido na seção, sem deslocamento global, órbita proporcional ao progresso local: 1,5 volta, k=6, limite 360°/s e exposure=1,45. Resolução efetiva limitada a DPR 2.

**Pendências:** autorização/crédito da foto; nome completo, CRO, bio e formação; cidade, razão social/CNPJ e horário. A imagem fornecida resolve a disponibilidade do retrato, mas não comprova esses dados.

### Revisão vigente: fundos claros, mapa e rodapé

Por solicitação do cliente, não usar terracota/rosé profundo como fundo em nenhuma seção. Alternar somente `--color-cream` e `--color-blush`; terracota permanece apenas em textos, ícones e detalhes. Esta regra substitui recomendações anteriores de fundo escuro. Benefícios com texto escuro sobre rosé claro, sem blob atrás do dente.

Substituir o CTA final selecionado pelo mapa incorporado do Google Maps, com carregamento lazy, título acessível, endereço e link para rotas. A Maps Embed API oficial exige chave; sem chave fornecida, usar incorporação pública por busca, sem inventar coordenadas. Confirmar o pin exato quando cidade ou Place ID forem fornecidos.

Rodapé independente, creme, com logo, contatos, endereço e dados legais, títulos compactos e alinhamento à esquerda. Dente responsivo: `min(78vw,360px,65svh)` no mobile, `min(38vw,460px,65svh)` no desktop, sempre limitado à coluna disponível. Tokens do mapa: altura 320/420 px. `--benefits-background` usa blush e `--benefits-divider` usa primary-soft.

### Ajustes de enquadramento, iluminação e chamadas

Nome corrigido pelo cliente: **Dra. Marcelle Beliza**. Retrato sem fundo preto, extraído com imagegen e salvo em `assets/img/dra-marcelle-cutout.png`, com variantes WebP transparentes 480/960 px; original preservado. Prompt: remover somente fundo preto, preservar identidade, pose, roupa e detalhes, com transparência real. Conferir fidelidade do retrato com a profissional antes da publicação.

Dente com viewer sem escala CSS e câmera a 145%, evitando recorte em mobile/DPR alto; exposure 1,1, base esmalte `[.95,.94,.92,1]`, roughness 0,32, iluminação neutral. Poster atualizado com os mesmos valores. A menor exposição substitui o valor anterior para recuperar volume no fundo claro. Mantida rotação local e respeito a movimento reduzido.

Agendamento concentrado no header, hero e botão flutuante; telefone no rodapé. Removidos links repetidos nos tratamentos, diferenciais, passos, sobre e FAQ. Removidos “Ver no Google Maps” e “Como chegar” da localização; mapa abaixo com endereço permanece.

## 11. Tokens CSS de partida

Valores da implementação 10.2: `--color-stage-top: #9A524E`,
`--color-stage-bottom: #B25F5A`, com overlay uniforme `rgb(59 42 41 / .06)`
para elevar o contraste mínimo do texto creme acima de 4,5:1 também na base.
Halo: `0 0 24px rgb(154 82 78 / .75)`. Entrada 650 ms, stagger 120 ms,
saída 350 ms, deslocamentos 24/-20 px. Corpo 17–18 px, leitura até 42 ch.
Desktop: centro `x=72−44p`, `y=40%` fixo; mobile/paisagem curta:
`x=60−20p`, `y=30%` fixo. Tamanho mobile `min(62vw,36vh)` para reservar
a metade inferior ao texto; desktop `min(72vh,42vw)`. Material branco
`[1,.99,.97,1]`, rugosidade 0,25, metálico 0, exposição 1,45.

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
