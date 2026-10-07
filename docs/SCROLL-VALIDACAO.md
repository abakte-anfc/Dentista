# Experiência guiada pelo scroll — 07/10/2026

Registro da primeira versão. A revisão linear vigente está em [SCROLL-LINEAR.md](SCROLL-LINEAR.md), conforme AGENTS.md 6.3 e DESIGN.md 10.2.

Implementado em HTML/CSS e JavaScript puro, com um único model-viewer local.
Copy, fontes, cores, links, metadados e JSON-LD preservados. GLB e poster
não foram alterados: 116.960 bytes e 14.376 bytes, respectivamente.

## Trajetória final

Coordenadas do centro antes do clamp, em porcentagem do viewport visual:

| p | x | y desktop/tablet | y mobile |
|---|---:|---:|---:|
| 0 | 72 | 50 | 32 |
| 0,18 | 58 | 30 | 30 |
| 0,36 | 32 | 66 | 66 |
| 0,54 | 56 | 36 | 36 |
| 0,72 | 34 | 62 | 62 |
| 0,88 | 24 | 36 | 36 |
| 1 | 26 | 50 | 30 |

Interpolação smoothstep cúbica entre pontos; lerp 0,12; rotação de duas voltas
configurada por `turns`. Escala ±3,5%. O clamp reserva 4% nas quatro bordas
e considera o tamanho escalado, a altura visual e os offsets de zoom.
Os centros efetivos se aproximam do meio nas telas estreitas para acomodar
o dente inteiro. O texto acompanha o lado oposto ao centro efetivo;
no mobile fica sobre um cartão cream com 92% de opacidade.

## Medições

- Lighthouse mobile final: Performance **99**, Acessibilidade **100**, SEO **100**.
- LCP **2,0 s**, CLS **0**, TBT **60 ms**.
- Relatórios: `artifacts/validation/scroll-lighthouse-final.report.html` e `.json`.
- Scroll de 5 segundos, Chrome headless, viewport 390×844, DPR 3,
  CPU throttling 4×: **58,8 fps**, 294 intervalos rAF, p95 **16,8 ms**.
- Canvas observado: 562×562 para objeto de 280,8 CSS px, equivalente a DPR 2.
- Dados: `artifacts/validation/scroll-performance.json`; reprodução:
  `node tests/performance.cjs`, com servidor ativo.

O teste de rAF mede cadência no navegador, não frames efetivamente apresentados
pela GPU de um Android. Lighthouse mede a entrada com poster; o 3D mobile
é liberado na primeira interação. Não extrapolar essas medições para um
aparelho real. Não houve evidência suficiente para justificar Three.js;
model-viewer foi mantido. A meta física de 60 fps permanece por validar.

## Checklist 6.2

- [x] Bounding box inteira com margem em 360×800, 768×900, 1280×900,
  paisagem 800×360, layout 640×450 e zoom visual 200%.
- [x] Descida aumenta o ângulo; subida reduz; sem scroll o ângulo assenta e para.
- [x] Trajetória direita–esquerda, alternando lados; texto acompanha lado oposto.
- [x] Entrada/saída reversíveis, com data-reveal e --i; animações de transform/opacity.
- [x] Scroll nativo, sem GSAP, scroll snap, captura de wheel/touch ou preventDefault.
- [x] Âncoras do header; WhatsApp flutuante e CTAs acima da camada decorativa.
- [x] Sem JS/WebGL, erro do módulo/modelo e movimento reduzido mantêm poster
  estático e conteúdo visível. Mudança de preferência em sessão também testada.
- [x] Foco preserva visibilidade; poster reduzido permanece inteiro com zoom 200%.
- [x] Medidas de cenas cacheadas, recalculadas em resize e abertura do FAQ;
  rAF cessa ao assentar e pausa com document.hidden.
- [ ] 60 fps em celular intermediário físico: aparelho indisponível.

## Checklist 8 e limites

- [x] Layouts em 360/768/1280 e paisagem revisados por screenshots, sem overflow.
- [x] Lighthouse acessibilidade 100; pares principais de texto ≥4,5:1.
  Muted/cream 5,36:1, muted/blush 4,93:1, primary-dark/cream 5,50:1,
  texto/WhatsApp 6,83:1. Ícones decorativos não entram como texto.
- [x] Todos os links WhatsApp têm telefone e mensagem decodificada corretos.
  Não foi enviada mensagem nem validado o aplicativo externo em aparelho físico.
- [x] Lighthouse ≥90/95/95.
- [x] Sem lorem ipsum, depoimentos inventados, antes/depois ou promessa absoluta.
- [ ] Sem placeholders visíveis: exceção expressamente solicitada pelo usuário;
  CRO, bio/formação, horário, responsável técnica, razão social e CNPJ usam `[PREENCHER]`.
- [ ] Conformidade para divulgação depende dos dados profissionais/legais
  e da licença comercial do GLB. Pendências completas em `PENDENCIAS.md`.

`npm.cmd test` cobre a experiência e as duas regressões da revisão:
foco que ficava invisível na saída e poster reduzido que escapava no zoom.
Servidor: `npm.cmd start` em http://127.0.0.1:4173.
