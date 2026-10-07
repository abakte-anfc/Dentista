# AGENTS.md — Landing page Beliza Odontologia

Instruções para agentes de IA que trabalham neste projeto. Leia também o `DESIGN.md` antes de mexer em qualquer interface.

## 1. Contexto do projeto

- **Cliente:** Beliza Odontologia, consultório da Dra. Marcella Beliza.
- **Instagram:** @belizaodontologia
- **Endereço:** Av. Getúlio Vargas, 330, Shopping das Fábricas, Sala 18.
- **WhatsApp:** (75) 98122-0711 → link `https://wa.me/5575981220711`
- **Objetivo da página:** gerar agendamentos de avaliação via WhatsApp. É a única conversão que importa.
- **Público:** pessoas da região, adultos e pais de crianças, classe média, sensíveis a preço e com medo de dentista. Chegam principalmente pelo Instagram, no celular.
- **Idioma:** português do Brasil (pt-BR). Todo o texto da página, comentários de UI e mensagens de erro em pt-BR.

## 2. Princípios

1. **Mobile first.** Projete para 360–390 px de largura e depois expanda. Mais de 80% do tráfego virá do celular.
2. **Uma ação principal:** "Agendar avaliação" abrindo o WhatsApp com mensagem pré-preenchida. Todo CTA leva ao mesmo destino.
3. **Tom acolhedor e humano**, nunca clínico ou assustador. Mensagem central: "sorria sem medo".
4. **Rápida e leve.** Meta: LCP < 2,5 s em 4G, imagens em WebP/AVIF, sem bibliotecas pesadas.
5. **Não inventar informação.** Preços, depoimentos, números de pacientes, CRO, convênios e resultados só entram se o cliente fornecer. Use `[PREENCHER]` e liste em "Pendências".

## 3. Conformidade (odontologia no Brasil)

Publicidade de saúde é regulada pelo CFO (Código de Ética Odontológica e normas de publicidade). Siga sempre:

- Exibir o nome da profissional e o **número do CRO** (e especialidade só se registrada). Pendente: obter com o cliente.
- **Não prometer resultado** nem usar "garantido", "100%", "o melhor", "sem dor" como promessa absoluta.
- **Antes e depois:** só com autorização escrita do paciente e com aviso de que os resultados variam. Não usar fotos de pacientes sem confirmar a autorização.
- **Não divulgar preço como isca** nem "promoção" agressiva. Condições de pagamento podem ser citadas de forma informativa.
- Fotos de banco de imagem não podem ser apresentadas como pacientes reais.
- Incluir rodapé com razão social, CNPJ, endereço, responsável técnica e CRO (pendente).
- Se houver formulário ou pixel de rastreamento, incluir **política de privacidade (LGPD)** e aviso de cookies.

## 4. Estrutura da página (ordem das seções)

1. **Header fixo:** logo + botão "Agendar" (WhatsApp).
2. **Hero:** título emocional, subtítulo, CTA principal e **dente 3D giratório** (ver seção 6.1; a foto da Dra. Marcella vai na seção "Sobre" ou como alternativa ao 3D se o cliente preferir).
3. **Tratamentos:** cards para Implantes, Aparelho ortodôntico, Clareamento, Limpeza/Profilaxia, Odontopediatria, Estética do sorriso (facetas/lentes).
4. **Por que a Beliza:** 3–4 diferenciais (acolhimento, tratamentos que cabem no bolso, atendimento com paciência e respeito, estrutura moderna).
5. **Sobre a Dra. Marcella:** foto, mini bio, CRO, formação (conteúdo a ser fornecido).
6. **Antes e depois / resultados:** apenas com autorização. Caso contrário, omitir a seção.
7. **Depoimentos:** reais e fornecidos pelo cliente. Sem depoimento inventado.
8. **Como funciona:** 3 passos (chama no WhatsApp → agenda a avaliação → recebe o plano de tratamento).
9. **Dúvidas frequentes:** dor, primeira consulta de criança, formas de pagamento, duração de tratamentos.
10. **Localização:** endereço, mapa incorporado, horário de funcionamento, link para rotas.
11. **CTA final + rodapé:** WhatsApp, Instagram, dados legais.
12. **Botão flutuante de WhatsApp** em todas as telas.

## 5. Stack e convenções técnicas

- **Padrão:** HTML5 + CSS (variáveis CSS) + JavaScript mínimo, em um único projeto estático. Se o cliente exigir framework, usar Astro ou Next.js estático. Evitar dependências desnecessárias.
- **Estrutura sugerida:**
  ```
  /index.html
  /assets/css/styles.css
  /assets/js/main.js
  /assets/img/        (WebP/AVIF, com versões 1x e 2x)
  /assets/fonts/      (self-hosted, se possível)
  ```
- Semântica correta: `header`, `main`, `section`, `footer`, um único `h1`, hierarquia de títulos sem pular níveis.
- Tokens de design apenas via variáveis CSS definidas no `DESIGN.md`. Nada de cores ou tamanhos "soltos".
- CSS com abordagem mobile first (`min-width` nos media queries).
- Nomes de classe em inglês, no padrão BEM ou equivalente; textos em pt-BR.
- Imagens: `alt` descritivo em pt-BR, `width`/`height` definidos, `loading="lazy"` abaixo da dobra, hero com `fetchpriority="high"`.
- Sem JavaScript para o que CSS resolve (animações simples, FAQ com `<details>`).
- Links externos com `rel="noopener"`.

## 6. Integrações

- **WhatsApp (CTA):** `https://wa.me/5575981220711?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20quero%20agendar%20uma%20avalia%C3%A7%C3%A3o.`
  - Se houver mais de um tratamento em destaque, permitir mensagem específica por tratamento (parâmetro `text`).
- **Rastreamento:** disparar evento de conversão ao clicar em qualquer botão de WhatsApp (Meta Pixel / GA4), apenas após configurar IDs fornecidos pelo cliente. Não adicionar scripts de terceiros sem solicitação.
- **Mapa:** Google Maps incorporado (iframe com `loading="lazy"`) ou link para rotas.
- **Open Graph / SEO:** título, descrição, imagem de compartilhamento e `LocalBusiness` / `Dentist` em JSON-LD com endereço e telefone.

## 6.1 Dente 3D giratório (hero)

**Decisão:** usar `<model-viewer>` (Google) com um modelo `.glb`. Não usar Spline (runtime pesado, dependência externa) nem Three.js puro (excesso de código para um único objeto). Reavaliar só se o cliente pedir cenas 3D complexas.

**Plano de implementação**

1. **Obter o modelo.** Opções, em ordem de preferência: (a) modelar/ajustar no Blender; (b) modelo licenciado no Sketchfab ou similar com licença que permita uso comercial (CC0/CC-BY, guardar a atribuição se exigida); (c) comprar um modelo low-poly. Um molar ou incisivo estilizado e limpo, sem raízes expostas ou aspecto "médico/assustador".
2. **Otimizar o `.glb`.** Meta: **≤ 500 KB** (máx. 1 MB). Reduzir polígonos (≈ 5–15 mil), texturas ≤ 1024 px, compressão Draco ou Meshopt e WebP/KTX2 (ex.: `gltf-transform optimize`). Salvar em `/assets/3d/dente.glb`.
3. **Criar o poster.** Renderizar uma imagem do dente (WebP, ≈ 600 px) em `/assets/img/dente-poster.webp`. O poster é o **elemento de LCP**: aparece imediatamente enquanto o 3D carrega, e é o fallback se o WebGL falhar.
4. **Instalar o componente.** Preferir **self-host** (`@google/model-viewer` via npm, arquivo em `/assets/js/vendor/`) para não depender de CDN. Carregar com `<script type="module">` **somente quando a seção estiver perto da viewport** (IntersectionObserver) ou após `load`, para não atrasar o primeiro carregamento.
5. **Inserir no hero.**
   ```html
   <model-viewer
     src="/assets/3d/dente.glb"
     poster="/assets/img/dente-poster.webp"
     alt="Dente 3D girando, ilustração decorativa"
     auto-rotate rotation-per-second="25deg"
     camera-controls disable-zoom disable-pan
     interaction-prompt="none"
     camera-orbit="0deg 75deg 105%"
     shadow-intensity="0.6" shadow-softness="1"
     exposure="1.05" environment-image="neutral"
     loading="lazy" reveal="auto">
   </model-viewer>
   ```
6. **Estilizar** conforme a seção 10 do `DESIGN.md` (tamanho, fundo, sombra, cores).
7. **Acessibilidade e movimento.** Com `prefers-reduced-motion: reduce`, remover `auto-rotate` e deixar apenas o poster/arrasto manual. O 3D é decorativo: o conteúdo e o CTA nunca dependem dele.
8. **Fallback.** Se `WebGL` não estiver disponível ou o `.glb` falhar, exibir o poster estático (`<img>`) no lugar.
9. **Opcional (fase 2):** girar o dente conforme o scroll, atualizando `camera-orbit` via JS leve (`requestAnimationFrame`, throttle). Só fazer se Lighthouse continuar ≥ 90.

**Regras**
- O poster é a imagem de LCP: `fetchpriority="high"`, dimensões definidas, sem layout shift (reservar altura do contêiner com `aspect-ratio`).
- Mobile: altura do viewer ≈ 260–300 px; sem `camera-controls` se atrapalhar a rolagem da página (usar `touch-action: pan-y`).
- Não exibir o dente 3D como se fosse resultado de tratamento ou promessa clínica; é elemento de marca.
- Verificar a licença do modelo e registrar a fonte em `/assets/3d/LICENSE.txt`.
- Teste obrigatório em celular Android de entrada: se travar, desativar a rotação automática e manter só o poster.

**Checklist 3D**
- [ ] `.glb` ≤ 500 KB e poster ≤ 100 KB
- [ ] Script do viewer carregado de forma adiada
- [ ] Sem layout shift ao carregar o 3D
- [ ] `prefers-reduced-motion` respeitado
- [ ] Fallback com poster testado (WebGL desligado)
- [ ] Licença do modelo registrada

## 7. SEO local

- Título: "Dentista em [cidade] | Beliza Odontologia" (cidade a confirmar).
- Palavras-chave naturais no texto: dentista, implante dentário, clareamento dental, aparelho ortodôntico, odontopediatria.
- Dados NAP (nome, endereço, telefone) idênticos aos do Instagram e do Google Meu Negócio.

## 8. Qualidade e entrega

Antes de considerar uma tarefa concluída:

- [ ] Testado em 360 px, 768 px e 1280 px.
- [ ] Contraste mínimo WCAG AA em todo o texto.
- [ ] Todos os botões de WhatsApp abrem a conversa com a mensagem correta.
- [ ] Lighthouse mobile: Performance ≥ 90, Acessibilidade ≥ 95, SEO ≥ 95.
- [ ] Nenhum texto "lorem ipsum" ou placeholder visível.
- [ ] Itens de conformidade (seção 3) revisados.

## 9. Como agir

- Ao receber uma tarefa, leia primeiro este arquivo e o `DESIGN.md`.
- Faça mudanças pequenas e focadas; não reescreva partes que não foram pedidas.
- Quando faltar informação, use `[PREENCHER]` e registre abaixo, sem inventar.
- Responda ao usuário em português, de forma direta.

## 10. Pendências (conteúdo a pedir ao cliente)

- [ ] Nome completo da Dra., CRO e especialidades registradas
- [ ] Cidade/bairro para SEO e razão social + CNPJ
- [ ] Logo em vetor (SVG) e arquivos originais da identidade visual
- [ ] Fotos profissionais da Dra., equipe e consultório (alta resolução)
- [ ] Horário de funcionamento
- [ ] Lista final de tratamentos e formas de pagamento/parcelamento
- [ ] Depoimentos reais autorizados e fotos de antes/depois com termo de autorização
- [ ] IDs de Meta Pixel / GA4 e perfil do Google Meu Negócio
- [ ] Domínio e hospedagem
- [ ] Aprovação do cliente para o dente 3D e definição do modelo (criar, adaptar ou licenciar)
