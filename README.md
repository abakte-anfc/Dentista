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

## Carregamento do 3D

O poster aparece imediatamente, com dimensões reservadas e prioridade alta. Após o evento `load`, IntersectionObserver observa o hero. No desktop, o viewer é importado quando o hero está próximo. No celular, a primeira interação também é necessária: a inicialização de WebGL não compete com a primeira exibição nem bloqueia o CTA. Com movimento reduzido, o poster permanece estático. Sem WebGL adequado ou em caso de erro, o poster permanece visível. Não há controles de arrasto que capturem a rolagem.

## Lighthouse mobile

Medição local no Chrome, perfil mobile padrão do Lighthouse, em 07/10/2026:

| Métrica | Resultado |
|---|---:|
| Performance | 99 |
| Acessibilidade | 100 |
| SEO | 100 |
| LCP | 1,8 s |
| CLS | 0 |
| Total Blocking Time | 0 ms |

Relatório HTML: artifacts/validation/lighthouse-mobile.report.html. A medição cobre o carregamento inicial com poster; o teste de interação confirma o 3D separadamente. As notas não garantem resultados iguais em hospedagem e aparelhos reais. Teste físico em Android de entrada ainda pendente. Configurar compressão HTTP e cache de assets na hospedagem.

## Publicação

Consultar **PENDENCIAS.md** antes de divulgar. Faltam CRO, razão social/CNPJ, cidade, direitos de uso do modelo e outros conteúdos do cliente. Resultados e depoimentos foram omitidos por falta de autorização. Não inserir placeholders visíveis nem inventar dados. Atualizar URLs SEO absolutas quando o domínio for definido. Para hospedar, basta publicar index.html e assets/; scripts, node_modules, docs, tests, model e arquivos originais não precisam ser enviados.
