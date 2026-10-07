# Landing page Beliza Odontologia — especificação

## Objetivo e fontes
Gerar agendamentos de avaliação pelo WhatsApp, principalmente em celulares de 360–390 px. AGENTS.md é a fonte técnica e DESIGN.md é a fonte visual. Implementação estática em HTML, CSS e JavaScript mínimo, sem frameworks.

## Composição
Header fixo com o arquivo original logo.jpeg e botão Agendar. Hero com título “Seu sorriso merece cuidado, atenção e respeito.”, texto acolhedor, CTA “Agendar minha avaliação” e dente à direita no desktop, abaixo do texto no celular. Paleta rosé/terracota e creme, títulos serifados, cards arredondados e espaçamento conforme DESIGN.md. Texto de CTA verde usará cor escura da paleta para cumprir contraste AA, pois branco sobre o verde especificado não atende AA.

Na sequência: seis tratamentos; diferenciais de acolhimento e respeito sem alegar condições ou estrutura não confirmadas; apresentação da Dra. Marcella Beliza com o nome conhecido, sem inventar formação ou foto; três passos do agendamento; FAQ sobre medo, crianças, pagamento e duração, com respostas informativas sem promessas; localização com endereço fornecido e link para rotas; CTA final e rodapé; WhatsApp flutuante.

Resultados e depoimentos serão omitidos enquanto não houver conteúdo real autorizado. Dados ausentes serão registrados como [PREENCHER] em PENDENCIAS.md. CRO, razão social e CNPJ são necessários antes da publicação; não serão inventados. A ausência desses dados impede considerar a página pronta para divulgação. Horários e biografia não terão placeholders visíveis.

## Arquivos e ativos
- index.html: estrutura semântica, conteúdo pt-BR, metadados e JSON-LD Dentist com dados conhecidos.
- assets/css/styles.css: tokens de DESIGN.md, estilos mobile first, foco e movimento reduzido.
- assets/js/main.js: carregamento adiado e estados de fallback do viewer.
- assets/js/vendor/: distribuição local de @google/model-viewer e licença.
- assets/3d/dente.glb: cópia otimizada do modelo fornecido, preservando o original.
- assets/3d/LICENSE.txt: origem do arquivo fornecido e pendência de comprovação de licença, sem atribuir licença fictícia.
- assets/img/: logo original, favicon derivado do logo sem redesenho e poster WebP renderizado do modelo.
- PENDENCIAS.md e README.md: conteúdo faltante, execução local e validações.

## 3D e falhas
Usar model-viewer local, com importação acionada por IntersectionObserver após o carregamento inicial. Poster com dimensões e prioridade alta, contêiner reservado e fundo transparente. Modelo com rotação lenta; sem rotação sob prefers-reduced-motion. Sem controles que prejudiquem rolagem mobile. Poster permanece se WebGL, importação ou modelo falharem. Meta do modelo ≤500 KB (máximo 1 MB), poster ≤100 KB. Se o modelo exigir ajustes incompatíveis com o material fornecido, registrar a limitação, sem trocar por outro modelo sem autorização.

## Integrações
Todos os CTAs de agendamento usam o link e a mensagem pré-preenchida de AGENTS.md. Instagram e rotas são links auxiliares. Sem formulário, pixels, cookies de rastreamento ou scripts remotos. Cidade e domínio dependem de confirmação; SEO não atribui localização não fornecida. Imagem de compartilhamento será derivada dos ativos fornecidos.

## Verificação
Verificar layout em 360, 768 e 1280 px, teclado, contraste AA, URLs de WhatsApp, ausência de overflow, fallback sem WebGL e movimento reduzido. Executar Lighthouse mobile buscando Performance ≥90, Acessibilidade ≥95 e SEO ≥95; relatar métricas reais e limitações. Teste físico em Android de entrada e confirmação de conteúdo/licença permanecem pendentes se não houver aparelho e documentação disponíveis.

## Ponto ainda aberto
A mensagem recebida termina em “Gere o poster estático (WebP) do modelo ou, se não for p”. A continuação pode definir o fallback autorizado e outras exigências de entrega.

## Ajuste durante a validação
O poster foi renderizado com sucesso. Para preservar o desempenho inicial, o celular exige primeira interação além da proximidade via IntersectionObserver para importar o viewer; desktop mantém início automático. Movimento reduzido mantém o poster. O modelo fornecido possui raízes aparentes, preservadas conforme a instrução de usar o arquivo. Licença e aprovação visual seguem em PENDENCIAS.md.
