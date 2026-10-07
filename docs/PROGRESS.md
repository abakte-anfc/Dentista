# Progresso — plano: docs/superpowers/plans/2026-10-07-beliza.md

Especificação e plano aprovados. Execução direta na pasta C:\DENTISTA, sem subagentes e sem commits, conforme plano aprovado. Repositório ainda sem commits; ferramentas de ledger baseadas em intervalos git não se aplicam. Registro mantido neste arquivo.

Interfaces: Task 1 produz assets/3d/dente.glb, assets/img/dente-poster.webp e assets/js/vendor/model-viewer.min.js; Task 2 consome esses caminhos. Task 3 verifica a página via HTTP. Sem conflitos.

Decisão: manter trabalho na pasta solicitada e usar revisão própria, pois o plano aprovado pede execução sem subagentes. Validação browser substitui testes espelhados de HTML/CSS; comportamento de fallback será testado em navegador real.

Task 1: em andamento. Original GLB 17.574.824 bytes, 501.298 triângulos; gerador Tripo. Logo JPEG 1.021.078 bytes. Documentação de otimização: https://gltf-transform.dev/cli e https://gltf-transform.dev/modules/functions/functions/simplify. API de poster/decoders: https://modelviewer.dev/docs/index.html.

Task 1: complete. Modelo 116.960 bytes, 12.532 triângulos, WebP 512 px; poster 14.376 bytes. Script optimize-model.mjs reproduziu o mesmo tamanho usando bibliotecas diretas. CLI removida para eliminar dependências vulneráveis; npm reportou zero vulnerabilidades.

Task 2: complete. Suite browser falhou antes da implementação (h1 ausente), depois passou. Regressões foco/inert e carregamento mobile foram observadas falhar antes das correções. Page errors e pedidos externos vazios. Logo recortado novamente após inspeção identificar que a imagem original era 2048 px, não os 1600 px da visualização redimensionada.

Decisão: no celular, liberar 3D apenas após primeira interação e proximidade via IntersectionObserver; em movimento reduzido conservar poster. Motivo: importação imediata produziu Lighthouse Performance 47, LCP 7 s e TBT 2.410 ms. Custo: visitante sem interação vê poster em vez de rotação. Após correção: Performance/Acessibilidade/SEO 100/100/100, LCP 1,7 s, CLS 0, TBT 0 ms. Desktop mantém importação automática.

Task 3: em andamento. README e PENDENCIAS documentam conteúdos ausentes, licença, domínio e teste físico Android. Revisão própria conforme execução sem subagentes aprovada; nenhuma publicação ou commit.

Task 3: validação final ampliada. Suite anterior passou; npm.cmd audit --omit=dev: zero vulnerabilidades. Lighthouse final medido após ajustes de CSS e ativos; relatórios e screenshots em artifacts/validation/. Teste adicional de mudança de movimento reduzido aguardará evento matchMedia antes de avaliar atributo: primeira execução mostrou uma condição de corrida no teste, pois o evento é assíncrono. Sem alteração no código de produção.

Revisão visual identificou substituição parcial indevida de 1024px e 280px na normalização de tokens. Teste de número de cards por linha reproduziu falha (2 em vez de 3 no desktop); breakpoint e largura do logo corrigidos. Suite final ampliada inclui teclado, alteração de movimento reduzido e grids de 1/2/3 colunas.

Task 3: complete. Última execução de npm.cmd test: PASS, incluindo grids 1/2/3, teclado, movimento reduzido em tempo real, poster sem JS/WebGL/modelo/módulo, carregamento após interação e ausência de requisições externas/erros. Screenshots finais inspecionadas em 360/768/1280 px. Sintaxe JavaScript validada. Nenhum achado de implementação pendente; publicação e teste físico Android seguem em PENDENCIAS.md.

Lighthouse da árvore final: Performance 99, Acessibilidade 100, SEO 100; LCP 1,8 s, CLS 0, TBT 0 ms. Relatório final substitui o anterior (100/100/100); pequenas variações de medição são esperadas.

Revisão final própria: conteúdo e ordem de seções conferidos, resultado/depoimentos omitidos com fundamento nas instruções, dados desconhecidos registrados fora da UI, caminhos locais e URLs revisados. Não há achados críticos de implementação; dados legais e licença bloqueiam publicação e estão documentados. Teste físico Android não realizado. Sem revisão independente, conforme plano aprovado sem subagentes. Decisões e custos estão registrados acima; arquivos preservados na pasta solicitada.
