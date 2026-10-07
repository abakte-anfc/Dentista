# Beliza Odontologia

## Correção vigente das animações

O efeito por palavras foi retirado após feedback do cliente. Ele criava spans que recebiam regras de legendas (nome da Dra. caía de 20 para 13 px) e aplicava blur separado a cada palavra. Agora o HTML e a tipografia permanecem intactos; IntersectionObserver nativo anima blocos inteiros apenas com opacity/transform. Nenhum GSAP ou módulo ScrollReveal é carregado pela página. O componente experimental em src permanece como histórico, sem uso no site.

Verificação `npm.cmd run test:scroll-reveal`: fontes e HTML preservados, sem spans de palavras/blur, entrada/saída/reversão, FAQ, movimento reduzido e ausência de overflow em 360/768/1280 px; fallback sem JS aprovado. Testes do carrossel e retrato aprovados. Capturas do hero e tratamentos em 360 px inspecionadas. Relatório de desempenho vigente: `artifacts/validation/block-motion-lighthouse.json`.

## Animações ampliadas

ScrollReveal aplicado aos títulos e textos informativos do site: parágrafos, legendas, FAQ, endereço, horários e rodapé, preservando o HTML e seus elementos. As palavras entram, ficam nítidas e saem ao passar pelo topo; o caminho é reversível. Ícones e galeria têm entrada/saída suave. Hero e retrato recebem entrada inicial; botões e contatos permanecem legíveis. No rodapé, apenas entrada, para garantir leitura completa no fim da página.

Teste `npm.cmd run test:scroll-reveal`: aprovado em 360/768/1280 px, com entrada/saída/reversão de parágrafos, abertura do FAQ, preservação de negritos, legibilidade do rodapé, movimento reduzido e fallback sem JS. Testes de carrossel e retrato também aprovados. Lighthouse mobile: desempenho 98, acessibilidade 100, SEO 100, LCP 2,2 s e CLS 0 (`artifacts/validation/full-motion-lighthouse.json`). Medição feita em Chrome emulado, sem teste em aparelho físico.

## ScrollReveal nos títulos

O componente React Bits enviado pelo cliente foi adaptado em `src/ScrollReveal.jsx`: palavras com opacidade e blur vinculados à rolagem, rotação desligada e tipografia preservada. Aplicado aos h2 das seções principais, mantendo os títulos nativos e seus nomes acessíveis. Limpeza de animações limitada a cada componente.

Carrega após a primeira rolagem e perto dos títulos. React compartilhado com o carrossel; GSAP local. Sem JavaScript ou falha de importação, o texto original permanece. Movimento reduzido mantém texto visível, inclusive ao alterar a preferência durante a navegação.

Compilar ambos os componentes: `npm.cmd run build:carousel`. Verificar: `npm.cmd run test:scroll-reveal` com servidor ativo. Lighthouse mobile após adiar o carregamento: desempenho 97, acessibilidade 100, SEO 100; LCP 2,3 s, CLS 0. Relatório em `artifacts/validation/scroll-reveal-lighthouse.json`. Verificações do carrossel e retrato também passaram; captura mobile inspecionada em `artifacts/validation/scroll-reveal-mobile.png`.

## Fotos autorizadas e carrossel

Cinco imagens de `provas/` foram integradas à seção `#resultados`, com autorização confirmada pelo cliente em 07/10/2026. Originais preservados; versões WebP em 480/960 px sem recorte e sem metadados pessoais. A seção informa que os resultados variam. Dados de CRO e identificação legal continuam pendentes.

O Carousel do React Bits enviado pelo cliente foi adaptado em `src/Carousel.jsx`: fotos, textos acessíveis em pt-BR, arrasto horizontal, setas, indicadores, loop e movimento reduzido. Reprodução automática desligada conforme DESIGN.md. React/Motion ficam em um módulo local carregado perto da seção; sem JS ou falha no módulo, as cinco imagens continuam em galeria horizontal HTML.

Reproduzir: `npm.cmd run assets:provas`, `npm.cmd run build:carousel`, `npm.cmd run test:carousel` (servidor local ativo).

Landing page estática em pt-BR. Abra por HTTP; o 3D usa um módulo local e não funciona corretamente por `file://`.

## Executar

Com Node.js instalado:

```powershell
npm.cmd start
```

Abra **http://127.0.0.1:4173**. Não é necessário instalar dependências para servir a página: todos os ativos de produção já estão em assets/. Em outro sistema, `npm start` também funciona.

## Desenvolvimento e verificações

```powershell
npm.cmd ci
# Em outro terminal, manter npm.cmd start em execução.
npm.cmd test
```

Os testes usam Chrome instalado no caminho padrão do Windows. Ajuste `tests/browser.cjs` e `scripts/render-poster.cjs` se necessário. Verificam layout, URLs do WhatsApp, fallback, movimento reduzido, carregamento após interação no celular, ausência de erros e requisições externas. Screenshots ficam em artifacts/validation/.

## Ativos

- Modelo original preservado em model/tooth 3d model.glb.
- Cópia otimizada: aproximadamente 117 KB, 12.532 triângulos e texturas WebP de até 512 px.
- Poster: WebP de 600 × 600 px, aproximadamente 14 KB, renderizado do modelo.
- Logo original preservado em logo.jpeg; versões WebP 1x/2x e favicon são derivados sem redesenho.
- Fontes Playfair Display e Poppins locais, com `font-display: swap` e licenças em assets/fonts/.
- model-viewer e decoder locais, com licenças em assets/js/vendor/. Nenhum CDN, framework, formulário ou rastreamento.

Para reproduzir os ativos, execute nesta ordem com o servidor ativo:

```powershell
npm.cmd run assets:prepare
npm.cmd run assets:optimize
npm.cmd run assets:poster
npm.cmd run assets:prepare
```

`assets:prepare` também copia os arquivos vendor e as fontes; a primeira execução prepara a renderização e a última atualiza a imagem de compartilhamento. Os ativos já entregues evitam essa etapa inicial.

## Experiência guiada pelo scroll

Um único dente fixo percorre uma linha horizontal, com 1,5 volta ligada ao scroll nativo. O texto flutua sobre o gradiente terracota, sem caixas. No desktop, ocupa a coluna oposta ou a faixa inferior central; no mobile, fica abaixo do dente. O rAF usa tempo real, para ao assentar e pausa em document.hidden. O canvas tem DPR efetivo máximo 2. O GLB foi preservado; material e poster foram clareados.

Sem JS/WebGL, com falha do modelo/módulo ou movimento reduzido, o poster fica estático e o conteúdo permanece visível. Esse modo usa a rolagem nativa da área de leitura para manter o texto separado do poster. Na experiência animada, a rolagem é a nativa da página, sem captura de wheel/touch.

Validação, decisões, medições e limitações: [docs/SCROLL-LINEAR.md](docs/SCROLL-LINEAR.md). Reproduzir com o servidor ativo: `npm.cmd test` e `node tests/performance.cjs`. Relatório Lighthouse: `artifacts/validation/linear-lighthouse-final.report.html`.

## Publicação

Consultar [PENDENCIAS.md](PENDENCIAS.md). Faltam dados profissionais e legais, cidade, domínio e comprovação dos direitos do modelo. Os campos ausentes usam `[PREENCHER]` durante a revisão; preencher antes de divulgar. Resultados e depoimentos continuam omitidos. Não há formulário, pixel, analytics ou scripts de terceiros. Para publicar, enviar `index.html` e `assets/`; configurar compressão e cache na hospedagem e URLs SEO absolutas quando o domínio for confirmado.
# Direção visual atual

A composição vigente segue DESIGN.md 10.3: foto da Dra. Marcelle no hero e dente 3D restrito aos benefícios. Validação em [docs/PORTRAIT-VALIDACAO.md](docs/PORTRAIT-VALIDACAO.md). Os relatórios da experiência de dente global descrevem versões anteriores.
