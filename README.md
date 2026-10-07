# Beliza Odontologia

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
