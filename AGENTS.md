# AGENTS.md — Landing page Beliza Odontologia

Instruções para agentes de IA que trabalham neste projeto. Leia também o `DESIGN.md` antes de mexer em qualquer interface.

## 1. Contexto do projeto

- **Cliente:** Beliza Odontologia, consultório da Dra. Marcelle Beliza.
- **Instagram:** @belizaodontologia
- **Endereço:** Av. Getúlio Vargas, 330, Shopping das Fábricas, Sala 18.
- **WhatsApp:** (75) 98122-0711 → link `https://wa.me/5575981220711`
- **Objetivo da página:** gerar agendamentos de avaliação via WhatsApp. É a única conversão que importa.
- **Público:** pessoas da região, adultos e pais de crianças, classe média, sensíveis a preço e com medo de dentista. Chegam principalmente pelo Instagram, no celular.
- **Idioma:** português do Brasil (pt-BR). Todo o texto da página, comentários de UI e mensagens de erro em pt-BR.

## 2. Princípios

1. **Mobile first.** Projete para 360–390 px de largura e depois expanda. Mais de 80% do tráfego virá do celular.
2. **Uma ação principal:** "Agendar avaliação" abrindo o WhatsApp com mensagem pré-preenchida. Todo CTA leva ao mesmo destino.
3. **Tom acolhedor e humano**, nunca clínico ou assustador. Mensagem central: "sorria sem medo".
4. **Rápida e leve.** Meta: LCP < 2,5 s em 4G, imagens em WebP/AVIF, sem bibliotecas pesadas.
5. **Não inventar informação.** Preços, depoimentos, números de pacientes, CRO, convênios e resultados só entram se o cliente fornecer. Use `[PREENCHER]` e liste em "Pendências".

## 3. Conformidade (odontologia no Brasil)

Publicidade de saúde é regulada pelo CFO (Código de Ética Odontológica e normas de publicidade). Siga sempre:

- Exibir o nome da profissional e o **número do CRO** (e especialidade só se registrada). Pendente: obter com o cliente.
- **Não prometer resultado** nem usar "garantido", "100%", "o melhor", "sem dor" como promessa absoluta.
- **Antes e depois:** só com autorização escrita do paciente e com aviso de que os resultados variam. Não usar fotos de pacientes sem confirmar a autorização.
- **Não divulgar preço como isca** nem "promoção" agressiva. Condições de pagamento podem ser citadas de forma informativa.
- Fotos de banco de imagem não podem ser apresentadas como pacientes reais.
- Incluir rodapé com razão social, CNPJ, endereço, responsável técnica e CRO (pendente).
- Se houver formulário ou pixel de rastreamento, incluir **política de privacidade (LGPD)** e aviso de cookies.

## 4. Estrutura da página (ordem das seções)

1. **Header fixo:** logo + botão "Agendar" (WhatsApp).
2. **Hero:** título emocional, subtítulo, CTA principal e **dente 3D giratório** (ver seção 6.1; a foto da Dra. Marcelle vai na seção "Sobre" ou como alternativa ao 3D se o cliente preferir).
3. **Tratamentos:** cards para Implantes, Aparelho ortodôntico, Clareamento, Limpeza/Profilaxia, Odontopediatria, Estética do sorriso (facetas/lentes).
4. **Por que a Beliza:** 3–4 diferenciais (acolhimento, tratamentos que cabem no bolso, atendimento com paciência e respeito, estrutura moderna).
5. **Sobre a Dra. Marcelle:** foto, mini bio, CRO, formação (conteúdo a ser fornecido).
6. **Antes e depois / resultados:** apenas com autorização. Caso contrário, omitir a seção.
7. **Depoimentos:** reais e fornecidos pelo cliente. Sem depoimento inventado.
8. **Como funciona:** 3 passos (chama no WhatsApp → agenda a avaliação → recebe o plano de tratamento).
9. **Dúvidas frequentes:** dor, primeira consulta de criança, formas de pagamento, duração de tratamentos.
10. **Localização:** endereço, mapa incorporado, horário de funcionamento, link para rotas.
11. **CTA final + rodapé:** WhatsApp, Instagram, dados legais.
12. **Botão flutuante de WhatsApp** em todas as telas.

## 5. Stack e convenções técnicas

- **Padrão:** HTML5 + CSS (variáveis CSS) + JavaScript mínimo, em um único projeto estático. Se o cliente exigir framework, usar Astro ou Next.js estático. Evitar dependências desnecessárias.
- **Estrutura sugerida:**
  ```
  /index.html
  /assets/css/styles.css
  /assets/js/main.js
  /assets/img/        (WebP/AVIF, com versões 1x e 2x)
  /assets/fonts/      (self-hosted, se possível)
  ```
- Semântica correta: `header`, `main`, `section`, `footer`, um único `h1`, hierarquia de títulos sem pular níveis.
- Tokens de design apenas via variáveis CSS definidas no `DESIGN.md`. Nada de cores ou tamanhos "soltos".
- CSS com abordagem mobile first (`min-width` nos media queries).
- Nomes de classe em inglês, no padrão BEM ou equivalente; textos em pt-BR.
- Imagens: `alt` descritivo em pt-BR, `width`/`height` definidos, `loading="lazy"` abaixo da dobra, hero com `fetchpriority="high"`.
- Sem JavaScript para o que CSS resolve (animações simples, FAQ com `<details>`).
- Links externos com `rel="noopener"`.

## 6. Integrações

- **WhatsApp (CTA):** `https://wa.me/5575981220711?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20quero%20agendar%20uma%20avalia%C3%A7%C3%A3o.`
  - Se houver mais de um tratamento em destaque, permitir mensagem específica por tratamento (parâmetro `text`).
- **Rastreamento:** disparar evento de conversão ao clicar em qualquer botão de WhatsApp (Meta Pixel / GA4), apenas após configurar IDs fornecidos pelo cliente. Não adicionar scripts de terceiros sem solicitação.
- **Mapa:** Google Maps incorporado (iframe com `loading="lazy"`) ou link para rotas.
- **Open Graph / SEO:** título, descrição, imagem de compartilhamento e `LocalBusiness` / `Dentist` em JSON-LD com endereço e telefone.

## 6.1 Dente 3D giratório (hero)

**Decisão:** usar `<model-viewer>` (Google) com um modelo `.glb`. Não usar Spline (runtime pesado, dependência externa) nem Three.js puro (excesso de código para um único objeto). Reavaliar só se o cliente pedir cenas 3D complexas.

**Plano de implementação**

1. **Obter o modelo.** Opções, em ordem de preferência: (a) modelar/ajustar no Blender; (b) modelo licenciado no Sketchfab ou similar com licença que permita uso comercial (CC0/CC-BY, guardar a atribuição se exigida); (c) comprar um modelo low-poly. Um molar ou incisivo estilizado e limpo, sem raízes expostas ou aspecto "médico/assustador".
2. **Otimizar o `.glb`.** Meta: **≤ 500 KB** (máx. 1 MB). Reduzir polígonos (≈ 5–15 mil), texturas ≤ 1024 px, compressão Draco ou Meshopt e WebP/KTX2 (ex.: `gltf-transform optimize`). Salvar em `/assets/3d/dente.glb`.
3. **Criar o poster.** Renderizar uma imagem do dente (WebP, ≈ 600 px) em `/assets/img/dente-poster.webp`. O poster é o **elemento de LCP**: aparece imediatamente enquanto o 3D carrega, e é o fallback se o WebGL falhar.
4. **Instalar o componente.** Preferir **self-host** (`@google/model-viewer` via npm, arquivo em `/assets/js/vendor/`) para não depender de CDN. Carregar com `<script type="module">` **somente quando a seção estiver perto da viewport** (IntersectionObserver) ou após `load`, para não atrasar o primeiro carregamento.
5. **Inserir no hero.**
   ```html
   <model-viewer
     src="/assets/3d/dente.glb"
     poster="/assets/img/dente-poster.webp"
     alt="Dente 3D girando, ilustração decorativa"
     auto-rotate rotation-per-second="25deg"
     camera-controls disable-zoom disable-pan
     interaction-prompt="none"
     camera-orbit="0deg 75deg 105%"
     shadow-intensity="0.6" shadow-softness="1"
     exposure="1.05" environment-image="neutral"
     loading="lazy" reveal="auto">
   </model-viewer>
   ```
6. **Estilizar** conforme a seção 10 do `DESIGN.md` (tamanho, fundo, sombra, cores).
7. **Acessibilidade e movimento.** Com `prefers-reduced-motion: reduce`, remover `auto-rotate` e deixar apenas o poster/arrasto manual. O 3D é decorativo: o conteúdo e o CTA nunca dependem dele.
8. **Fallback.** Se `WebGL` não estiver disponível ou o `.glb` falhar, exibir o poster estático (`<img>`) no lugar.
9. **Opcional (fase 2):** girar o dente conforme o scroll, atualizando `camera-orbit` via JS leve (`requestAnimationFrame`, throttle). Só fazer se Lighthouse continuar ≥ 90.

**Regras**
- O poster é a imagem de LCP: `fetchpriority="high"`, dimensões definidas, sem layout shift (reservar altura do contêiner com `aspect-ratio`).
- Mobile: altura do viewer ≈ 260–300 px; sem `camera-controls` se atrapalhar a rolagem da página (usar `touch-action: pan-y`).
- Não exibir o dente 3D como se fosse resultado de tratamento ou promessa clínica; é elemento de marca.
- Verificar a licença do modelo e registrar a fonte em `/assets/3d/LICENSE.txt`.
- Teste obrigatório em celular Android de entrada: se travar, desativar a rotação automática e manter só o poster.

**Checklist 3D**
- [ ] `.glb` ≤ 500 KB e poster ≤ 100 KB
- [ ] Script do viewer carregado de forma adiada
- [ ] Sem layout shift ao carregar o 3D
- [ ] `prefers-reduced-motion` respeitado
- [ ] Fallback com poster testado (WebGL desligado)
- [ ] Licença do modelo registrada

## 6.2 Experiência "dente guiado pelo scroll" (SUBSTITUI o hero e a rotação automática da 6.1)

**Esta seção tem prioridade sobre a seção 4 (layout em seções empilhadas), sobre a 6.1 (auto-rotate, hero com dente ao lado do texto) e sobre o item 12 da seção 4 (o botão flutuante continua).** A 6.1 continua valendo para otimização do `.glb`, poster, fallback e licença.

### Conceito
Um **dente gigante fixo na tela** (nunca sai do viewport) acompanha a rolagem. Ele **só gira enquanto o usuário rola** (para baixo ou para cima), percorre a tela **da direita para a esquerda em trajeto de S/zigue-zague** e as informações da clínica **entram e saem em cascata**, em cena por cena. A rolagem é sempre a nativa do navegador: **proibido sequestrar o scroll** (nada de `preventDefault` na roda/touch, nem scroll snap forçado).

### Arquitetura
- Um único `<model-viewer>` com `position: fixed`, tamanho gigante (desktop ≈ `min(85vh, 60vw)`; mobile ≈ `70vw`), `pointer-events: none`, sem `auto-rotate`, sem `camera-controls`, `z-index` abaixo do texto e acima do fundo.
- Página alta e normal (cenas empilhadas em `<section>`s de ≈ 100–140 vh). O conteúdo continua sendo DOM real e legível, na ordem correta, mesmo sem JS.
- **Progresso global** `p = scrollY / (scrollHeight - innerHeight)`, de 0 a 1, lido em `scroll` (passivo) e aplicado em um laço `requestAnimationFrame` com suavização (lerp ≈ 0.08–0.12). O laço **para quando o valor assenta** (dente parado = rotação parada) e é retomado no próximo scroll.
- **Rotação:** `ângulo = p * N voltas` (começar com 2 voltas, ajustar). Aplicar via `cameraOrbit`/`orientation` do model-viewer, só se o valor mudou mais que ~0,1°. Subir o scroll gira ao contrário, parar o scroll para a rotação (a inércia do lerp dura poucos décimos de segundo).
- **Trajetória em S:** interpolar suavemente (spline/Catmull-Rom ou cubic) entre waypoints em % do viewport (posição do **centro** do dente), aplicados por `transform: translate3d()` (nunca `left/top`). Waypoints de partida, para ajustar visualmente:

  | p | x (%) | y (%) | cena |
  |---|---|---|---|
  | 0.00 | 72 | 50 | Hero (direita) |
  | 0.18 | 58 | 30 | Tratamentos |
  | 0.36 | 32 | 66 | Diferenciais |
  | 0.54 | 56 | 36 | Sobre a Dra. |
  | 0.72 | 34 | 62 | Como funciona |
  | 0.88 | 24 | 36 | Localização |
  | 1.00 | 26 | 50 | CTA final (esquerda) |

  Pode ter leve variação de escala (±8%) e inclinação (±6°) para dar vida. **Regra dura:** o dente inteiro permanece dentro do viewport em qualquer largura (clamp com margem de 4%), inclusive com a barra do navegador mobile.
- **Texto sempre no lado oposto ao dente** em cada cena (dente à direita → texto à esquerda e vice-versa). Em telas estreitas, o texto fica em cartões com fundo `--color-cream` ~92% por cima do dente, mantendo contraste AA.

### Cenas (mapeamento das seções)
1. **Hero:** título, subtítulo, CTA WhatsApp. Dente grande à direita.
2. **Tratamentos:** implantes, ortodontia, clareamento, limpeza, odontopediatria, estética.
3. **Diferenciais:** acolhimento, "cabe no bolso", paciência e respeito, estrutura.
4. **Sobre a Dra. Marcelle** (CRO e bio como `[PREENCHER]` até ter dados).
5. **Como funciona:** 3 passos até a avaliação.
6. **Localização:** endereço, mapa (link/iframe leve), horário `[PREENCHER]`.
7. **CTA final + rodapé compacto:** dente à esquerda, CTA à direita, dados legais. FAQ pode virar cena própria (entre 5 e 6) ou lista compacta; resultados e depoimentos seguem **ocultos** até haver conteúdo real.

### Cascata de conteúdo
- Cada cena tem itens com `data-reveal` e ordem (`--i`). O estado de cada item é **função do progresso local da cena** (via `IntersectionObserver` + classes, ou cálculo no mesmo laço), não animação de uma vez só.
- **Entrada:** itens surgem um após o outro (stagger 90–120 ms), de baixo para cima (`translateY(28px)→0`, `opacity 0→1`, 500–600 ms, `cubic-bezier(.22,.8,.3,1)`).
- **Saída:** ao passar da cena, os itens saem em cascata na mesma ordem (`translateY(-20px)`, `opacity→0`, 300–400 ms).
- **Reversível:** rolar para cima refaz o caminho inverso.
- Só animar `transform` e `opacity`; `will-change` apenas no dente e na cena ativa.

### Navegação e CTA
- Header fixo com links âncora para as cenas (rolagem suave nativa `scroll-behavior: smooth`, desligada em `prefers-reduced-motion`).
- Botão flutuante de WhatsApp e CTA do hero permanecem como definido. O CTA nunca fica coberto pelo dente.
- Indicador de progresso discreto (barra fina ou pontos laterais), opcional.

### Fallbacks e acessibilidade
- `prefers-reduced-motion: reduce`: **sem** rotação, trajetória ou cascata. Dente estático (poster) em posição fixa menor, cenas empilhadas normais, conteúdo todo visível.
- Sem JS ou sem WebGL: poster estático e página legível.
- O dente é decorativo (`aria-hidden` no contêiner, ou `alt` curto); nada essencial depende dele. Ordem de tabulação segue o DOM, foco visível, sem armadilhas de foco.
- Testar zoom 200% e rotação do celular (paisagem): o dente continua dentro da tela.

### Performance (crítico: dente gigante + scroll)
- Meta: **60 fps** em celular Android intermediário e Lighthouse mobile ≥ 90. Ler o scroll sem forçar layout (nada de `getBoundingClientRect` por frame em dezenas de elementos; cachear medidas e recalcular só em `resize`).
- Limitar a resolução de renderização em celulares (menor escala do canvas / DPR máx. 2) e pausar o laço com `document.hidden`.
- Poster continua sendo o LCP; o 3D carrega depois, com troca sem salto.
- **Plano B:** se o `<model-viewer>` não sustentar fluidez com o dente gigante em movimento, migrar o dente para **Three.js** (self-host, mesmo `.glb`, mesma lógica de progresso). Decidir só após medir; registrar o resultado no resumo final.

### Checklist 6.2
- [ ] Dente nunca sai do viewport (mobile, tablet, desktop, paisagem, zoom 200%)
- [ ] Gira só durante o scroll, nos dois sentidos; para quando o scroll para
- [ ] Trajetória direita → esquerda em S; texto sempre no lado oposto
- [ ] Cascata de entrada/saída reversível, só com `transform`/`opacity`
- [ ] Scroll nativo, sem sequestro; âncoras do header funcionam
- [ ] `prefers-reduced-motion`, sem JS e sem WebGL testados
- [ ] CTA WhatsApp nunca coberto; contraste AA nos cartões sobre o dente
- [ ] 60 fps medido em celular intermediário e Lighthouse mobile ≥ 90

## 6.3 REVISÃO da experiência do dente (PREVALECE sobre a 6.2 onde houver conflito)

Feedback do cliente após a primeira versão: o trajeto em S ficou "desengonçado", as caixas de texto atrapalhavam a visão do dente e o movimento precisa ser **mais suave**. Mudanças obrigatórias:

### 1. Trajetória LINEAR (acabou o S/zigue-zague)
- O dente anda em **linha reta horizontal**, da direita para a esquerda, proporcional ao scroll: `x = 72 − 44·p` (em % do viewport, centro do dente), `y` **constante** (≈ 48%) no desktop. Sem curvas, sem subir e descer, sem variação de escala.
- Rotação em torno do próprio eixo vertical, proporcional ao scroll: `ângulo = p × 1,5 volta` (ajustável). Só gira durante o scroll, nos dois sentidos.
- Tamanho gigante, mas que permita texto ao lado: desktop `min(72vh, 42vw)`; o dente **sempre inteiro** na tela.

### 2. Texto FLUTUANTE, sem caixas
- **Proibido** cartões, caixas, fundos ou bordas atrás do texto. O texto flutua direto sobre o fundo da página.
- Para legibilidade: tipografia grande e contrastada, sombra de texto suave (halo na cor do fundo, ex.: `0 0 24px`) e blocos curtos (título + 1–2 linhas, ou lista curta).
- Lado do texto é função de onde o dente está (`x` do dente):
  - `x > 58%` (dente à direita) → texto na **coluna esquerda** (≈ 6–36% da largura)
  - `x < 42%` (dente à esquerda) → texto na **coluna direita** (≈ 64–94%)
  - `42% ≤ x ≤ 58%` (dente no centro) → texto na **faixa inferior**, largura total, em linha (ex.: 3 passos lado a lado), com o dente um pouco mais alto (`y ≈ 40%`).
- Cenas, na nova ordem: **1 Hero** (p 0) · **2 Tratamentos** (p ≈ .15) · **3 Diferenciais** (p ≈ .30) · **4 Como funciona** (p ≈ .50, dente central, 3 passos em linha embaixo) · **5 Sobre a Dra. Marcelle** (p ≈ .65) · **6 Localização** (p ≈ .82) · **7 CTA final + rodapé compacto** (p 1, dente à esquerda). Resultados/depoimentos seguem ocultos até haver conteúdo real. Ajustar os `p` de cada cena conforme a altura real das cenas.
- A cascata continua (itens em sequência, entrada de baixo para cima, saída para cima, reversível), agora **sem caixas**: só `opacity` + `transform`.
- **Mobile:** dente na metade superior da tela (≈ 62vw, centro em `y ≈ 30%`), andando levemente da direita para a esquerda (`x` de 60% a 40%); texto flutuante na metade inferior (terço final da tela), centralizado ou alinhado à esquerda. O dente nunca é coberto por texto.

### 3. Movimento mais suave
- Suavização **independente de FPS**: `atual += (alvo − atual) × (1 − exp(−dt × k))`, com `k ≈ 5–7` (mais baixo = mais suave). Usar o `dt` real do `requestAnimationFrame`, não um lerp fixo por frame.
- Limitar a velocidade angular máxima (ex.: 360°/s) para que um "fling" no celular não gere giro frenético.
- Só `transform: translate3d()` no dente (nunca `left/top`); rotação via `orientation`/`cameraOrbit` com atualização **uma vez por frame**, sem recriar atributos desnecessariamente.
- Nada de `scroll-behavior` ou animações CSS concorrentes mexendo no dente. Uma única fonte de verdade (o laço rAF).
- Se mesmo assim não ficar "manteiga" em celular intermediário, **migrar o dente para Three.js** (mesmo `.glb`, mesmo progresso, `rotation.y` e `position.x` direto no objeto, renderização sob demanda só enquanto há movimento). Decidir por medição e registrar no resumo final.

### 4. Aparência do dente e fundo
- No print atual o dente aparece **acinzentado e opaco**. Corrigir a iluminação: aumentar `exposure` (≈ 1.3–1.6), manter `environment-image="neutral"` ou usar um HDRI de estúdio leve, clarear o material base (branco-esmalte, sem cinza) e dar brilho suave. O dente deve parecer **branco brilhante**, não cinza.
- O fundo atual (rosa claro liso com círculo claro) dá pouco contraste ao dente branco. **Recomendação:** fundo em **terracota/rosé escuro** (como nos posts da clínica), com o dente branco em destaque e texto claro por cima. Ver `DESIGN.md` seção 10.2. **A decisão final do fundo depende da imagem que o cliente enviará; se houver imagem de referência na pasta, avaliar e justificar a escolha.**
- Remover o "círculo/blob" claro atrás do dente. Se houver forma de apoio, usar halo de luz suave (radial-gradient) bem discreto.

### Checklist 6.3
- [ ] Trajeto reto, `y` constante, sem S nem variação de escala
- [ ] Nenhum texto dentro de caixa/cartão; legível sobre o fundo (AA)
- [ ] Texto troca de lado conforme o `x` do dente; no centro vai para a faixa inferior
- [ ] Dente nunca coberto por texto (principalmente no mobile)
- [ ] Movimento independente de FPS, sem tranco ao parar/retomar o scroll
- [ ] Dente branco/brilhante (não acinzentado) em todas as cenas
- [ ] Medição de 60 fps registrada (ou migração para Three.js documentada)

## 7. SEO local

- Título: "Dentista em [cidade] | Beliza Odontologia" (cidade a confirmar).
- Palavras-chave naturais no texto: dentista, implante dentário, clareamento dental, aparelho ortodôntico, odontopediatria.
- Dados NAP (nome, endereço, telefone) idênticos aos do Instagram e do Google Meu Negócio.

## 8. Qualidade e entrega

Antes de considerar uma tarefa concluída:

- [ ] Testado em 360 px, 768 px e 1280 px.
- [ ] Contraste mínimo WCAG AA em todo o texto.
- [ ] Todos os botões de WhatsApp abrem a conversa com a mensagem correta.
- [ ] Lighthouse mobile: Performance ≥ 90, Acessibilidade ≥ 95, SEO ≥ 95.
- [ ] Nenhum texto "lorem ipsum" ou placeholder visível.
- [ ] Itens de conformidade (seção 3) revisados.

## 9. Como agir

- Ao receber uma tarefa, leia primeiro este arquivo e o `DESIGN.md`.
- Faça mudanças pequenas e focadas; não reescreva partes que não foram pedidas.
- Quando faltar informação, use `[PREENCHER]` e registre abaixo, sem inventar.
- Responda ao usuário em português, de forma direta.

## 10. Pendências (conteúdo a pedir ao cliente)

- [ ] Nome completo da Dra., CRO e especialidades registradas
- [ ] Cidade/bairro para SEO e razão social + CNPJ
- [ ] Logo em vetor (SVG) e arquivos originais da identidade visual
- [ ] Fotos profissionais da Dra., equipe e consultório (alta resolução)
- [ ] Horário de funcionamento
- [ ] Lista final de tratamentos e formas de pagamento/parcelamento
- [ ] Depoimentos reais autorizados e fotos de antes/depois com termo de autorização
- [ ] IDs de Meta Pixel / GA4 e perfil do Google Meu Negócio
- [ ] Domínio e hospedagem
- [ ] Aprovação do cliente para o dente 3D e definição do modelo (criar, adaptar ou licenciar)
