# Plano da revisão linear

Brief vinculante: feedback do usuário, AGENTS.md 6.3 e DESIGN.md 10.2.
Execução autorizada em etapas, preservando copy, SEO, GLB e links.

- [x] Confirmar a ausência de uma imagem de fundo apropriada.
- [x] Teste inicial falhando: blob ainda presente e ordem antiga.
- [x] Reordenar sete cenas, incorporar FAQ e remover caixas/blob.
- [x] Implementar trajetória linear e área de texto separada do dente.
- [x] Aplicar suavização por tempo k=6, 1,5 volta e limite de 360°/s.
- [x] Clarear material, iluminar e renderizar o poster e oito ângulos.
- [x] Medir FPS/Lighthouse, verificar contraste e corrigir a base do gradiente.
- [x] Corrigir navegação por âncoras e foco de teclado com testes de regressão.
- [x] Registrar o resultado da suíte final e os limites físicos.

Decisões: y desktop constante em 40% para reservar a faixa inferior;
mobile/paisagem curta com y=30% e limite vertical de tamanho. Gradiente
recomendado com overlay de 6% para AA. Model-viewer mantido por medição;
sem evidencia de necessidade de Three.js em dispositivo real.

Resultado final: `npm.cmd test` passou, incluindo contraste mínimo 4,62:1,
limites de viewport/zoom, ausência de cobertura, suavização por tempo,
foco, âncoras, CTAs e cinco fallbacks. Lighthouse 98/100/100. Medições
e pendências físicas estão em `docs/SCROLL-LINEAR.md`.
