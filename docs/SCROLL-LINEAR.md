# Revisão linear — Beliza Odontologia

Requisitos vigentes: AGENTS.md 6.3 e DESIGN.md 10.2. Revisão de 07/10/2026.

## Valores finais e composição

| Parâmetro | Desktop | Mobile e paisagem curta |
|---|---|---|
| Centro horizontal | `x = 72 − 44p` | `x = 60 − 20p` |
| Centro vertical | `y = 40%`, constante | `y = 30%`, constante |
| Tamanho | `min(72vh,42vw)` | `min(62vw,36vh)` |
| Rotação | 1,5 volta / 540° | 1,5 volta / 540° |
| Suavização | `1 − exp(−dt×6)` | igual |
| Velocidade angular máxima | 360°/s | igual |
| Exposure | 1,45 | igual |

Não há variação de escala, inclinação, trajetória curva, blob ou animação CSS
no objeto em movimento. O y de 40% foi escolhido para permanecer constante
também no trecho central, liberando a faixa inferior. A geometria usa o
viewport visual, offsets de zoom e margem de 4%. Paisagens abaixo de 600 px
de altura adotam a composição compacta para manter o dente acima do texto.

Texto direto sobre o fundo, sem caixas, bordas ou preenchimentos. Desktop:
coluna esquerda quando x>58%, direita quando x<42%, faixa inferior entre
42% e 58%. Mobile: texto sempre abaixo do dente. A janela de apresentação
recorta o conteúdo somente fora da área de leitura; o scroll da página é
nativo, sem captura de wheel/touch, preventDefault, snap ou biblioteca de
rolagem. O foco de teclado traz links/FAQ para a área legível.

Cenas: Hero → Tratamentos → Diferenciais → Como funciona → Sobre a Dra.
→ Localização → CTA final/rodapé. O FAQ original permanece como lista
compacta dentro de Sobre, preservando a copy. As alturas reais determinam
os pontos de entrada das cenas, sem forçar os p aproximados do briefing.

Cascata: entrada 650 ms, stagger 120 ms, saída 350 ms, movimentos 24/-20 px;
somente opacity/transform. Cache de medidas por variante de layout,
recalculado em resize e ao abrir FAQ. Um rAF controla progresso, posição
e ângulo, para ao assentar e pausa com document.hidden. DPR efetivo ≤2;
a ampliação estática do canvas é apenas um ajuste de resolução, sem
modificar a escala do dente ao longo do trajeto.

## Dente e fundo

O GLB e sua geometria foram preservados. Em tempo de execução, a textura
cinza do material é removida e o esmalte recebe base `[1,.99,.97,1]`,
metálico 0, rugosidade 0,25, iluminação neutral e exposure 1,45.
O poster foi renderizado novamente com esses parâmetros: 9.146 bytes.
Foram conferidos oito ângulos, de 0° a 315° em passos de 45°:
`artifacts/validation/linear-angles.png`.

Não há imagem de fundo fornecida. A pasta contém logo, ícones, poster e
imagem de compartilhamento; nenhum deles serve como fundo da experiência.
Foi escolhido o gradiente recomendado #9A524E → #B25F5A, sem ruído ou
textura e sem downloads adicionais. Como creme sobre a base original
atingia apenas 4,34:1, foi aplicado overlay uniforme da cor da marca
`rgb(59 42 41 / .06)`. O contraste mínimo calculado é **4,62:1**.
O halo suave é `0 0 24px rgb(154 82 78 / .75)`.

## Medições e decisão do renderer

- Lighthouse mobile final: Performance **98**, Acessibilidade **100**, SEO **100**.
- LCP **2,0 s**, CLS **0**, TBT **100 ms**.
- Relatórios: `artifacts/validation/linear-lighthouse-final.report.html` e `.json`.
- Chrome headless, viewport 390×844, DPR 3, CPU throttling 4×,
  scroll de 5 segundos: **59,4 fps**, p95 de intervalo rAF **16,8 ms**.
- Canvas observado: **484×484** para objeto de 241,8 CSS px, equivalente a DPR 2.
- Dados: `artifacts/validation/linear-performance.json`.

Model-viewer mantido. A primeira medição foi 57,4 fps; após remover
atribuições redundantes de layout em cada frame, a cadência chegou a
59,4 fps na emulação. Não houve evidência suficiente para justificar
a migração para Three.js. Esses números medem cadência rAF, não frames
efetivamente apresentados pela GPU de um Android. A meta de 60 fps
em aparelho físico intermediário permanece **sem validar**.

Lighthouse cobre o carregamento inicial com poster; o renderer mobile
continua adiado até a primeira interação. A interface já usa scroll
nativo e poster durante o carregamento. Sem JS/WebGL, com erro do módulo
ou modelo ou movimento reduzido, o poster é estático, o conteúdo fica
visível e a área de leitura usa sua própria rolagem nativa para manter
o texto separado do dente. Não há loop de animação nesse fallback.

## Checklists 6.2, 6.3 e 8

- [x] Dente inteiro em 360×800, 768×900, 1280×900, 800×360 e 640×450.
- [x] Zoom visual 200%, incluindo poster com movimento reduzido.
- [x] Descida/subida em sentidos opostos, parada sem rotação automática.
- [x] Trajetória linear, y fixo e tamanho constante; S/escala da 6.2 substituídos.
- [x] Texto sem caixas e sem cobertura do dente; cartões da 6.2 substituídos.
- [x] Troca de coluna/faixa inferior conforme x; mobile em faixa separada.
- [x] Suavização por tempo equivalente em 30/60/120 fps e limite angular.
- [x] Cascata reversível; scroll nativo e âncoras funcionais.
- [x] CTA, FAQ e último tratamento acessíveis por foco em mobile e desktop.
- [x] Sem JS, sem WebGL, erro do módulo, erro do modelo e movimento reduzido.
- [x] Branco-esmalte conferido nos oito ângulos representativos.
- [x] Lighthouse ≥90/95/95 e contraste mínimo AA calculado.
- [x] Todos os hrefs WhatsApp com telefone e mensagem fornecidos.
- [x] Copy/SEO/JSON-LD mantidos, sem depoimento inventado ou promessa absoluta.
- [ ] 60 fps em Android físico: aparelho indisponível.
- [ ] Abrir o aplicativo WhatsApp em celular real: não validado; nenhuma mensagem enviada.
- [ ] Ausência de placeholders: exceção expressa; CRO, bio/formação, horário,
  responsável técnica, razão social e CNPJ permanecem `[PREENCHER]`.
- [ ] Conformidade para divulgação: depende dos dados legais/profissionais
  e da comprovação dos direitos comerciais do GLB, conforme PENDENCIAS.md.

Reprodução: `npm.cmd start`, `npm.cmd test` e `node tests/performance.cjs`.
Screenshots e relatórios ficam em `artifacts/validation/`.
