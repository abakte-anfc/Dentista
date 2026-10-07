# Validação da composição com retrato — DESIGN.md 10.3

Aplicação em 07/10/2026. A direção atual substitui a experiência global descrita em SCROLL-LINEAR.md. Hero com retrato fornecido, seções em fluxo normal e único model-viewer localizado nos benefícios. SEO, JSON-LD, copy anterior e links mantidos. Benefícios educativos adicionados sem promessas de resultado.

- Layout automatizado e screenshots: 360×800, 768×900, 1280×900, 800×360 e 640×450. Sem overflow horizontal. Inspeção visual em mobile e desktop.
- Zoom de conteúdo 200%: sem overflow horizontal. Sem JS, sem WebGL e movimento reduzido: poster e conteúdo legível.
- Rotação local, reversão proporcional ao scroll, parada após suavização e ausência de erros de página verificadas. Cache de medidas em resize/ResizeObserver; nenhum layout por frame. k=6, 1,5 volta, limite 360°/s, exposure 1,45. Canvas 600×600 para 300 px CSS em DPR 3, limitado efetivamente a DPR 2.
- Todos os links WhatsApp mantêm telefone e mensagem pré-preenchida. Não houve envio de mensagem.
- Lighthouse mobile: desempenho 98, acessibilidade 100, SEO 100. Relatório em artifacts/validation/portrait-lighthouse.json.
- Cadência rAF em Chrome headless, viewport 390×844 e CPU 4×: 58,0 fps, p95 16,8 ms, ao percorrer a página em 5 s. É medição sintética de cadência, não prova de renderização a 60 fps em Android físico. Mantido model-viewer, sem migração para Three.js.
- Retratos WebP: 23.960 e 85.476 bytes; original preservado em foto.jpg. Modelo e poster mantidos.

Os checklists antigos de trajetória fixa global e texto flutuante reversível foram substituídos pela seção 10.3 aprovada pelo usuário. Scroll nativo, acessibilidade, fallback e conservação dos ativos continuam aplicáveis e foram verificados acima. Dados legais e biografia permanecem [PREENCHER] conforme a instrução de não inventar informações; isso é exceção explícita ao item antigo de ausência de placeholders. Resultados/depoimentos omitidos.

Não validado: Android físico, autorização/crédito da foto, licença comercial definitiva do modelo e dados legais ainda pendentes. CRO, bio/formação, responsável técnica, razão social/CNPJ e horário precisam ser fornecidos; cidade também segue pendente para SEO.
