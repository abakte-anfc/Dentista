# Carrossel de fotos — 07/10/2026

Cinco fotos fornecidas em `provas/`, com autorização de divulgação confirmada pelo cliente. Originais preservados. Conversão WebP em 480/960 px; enquadramentos completos e metadados removidos. Não foram atribuídos tratamentos ou prazos aos registros. Aviso de resultados variáveis junto à galeria.

Componente React Bits enviado pelo cliente adaptado para fotos, controles em pt-BR e movimento reduzido. React, React DOM e Motion empacotados localmente (353 KB sem compressão HTTP); módulo carregado apenas perto da seção. Autoplay desligado conforme DESIGN.md. Galeria horizontal nativa se JavaScript ou o módulo estiver indisponível.

## Verificação

- `node tests/carousel.cjs`: aprovado em 360, 768 e 1280 px. Verificadas setas, indicadores, loop de última para primeira, arrasto, ausência de overflow horizontal/erros JavaScript, fallback sem JS e navegação com movimento reduzido.
- `node tests/portrait.cjs`: aprovado para layout, dente localizado, rotação/parada, ausência de erros, fallback sem JS e movimento reduzido.
- Capturas inspecionadas: `artifacts/validation/carousel-360.png` e `carousel-1280.png`.
- Lighthouse mobile: desempenho 96, acessibilidade 100, SEO 100. CLS 0; LCP 2,6 s, ligeiramente acima da meta de 2,5 s. Relatório: `artifacts/validation/carousel-lighthouse.json`.
- `git diff --check`: sem erros de espaços.

Emulação em Chrome local; não houve teste em aparelho Android físico. Pendências profissionais e legais anteriores permanecem em PENDENCIAS.md.
