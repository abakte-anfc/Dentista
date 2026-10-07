# Pendências antes da publicação

A implementação pode ser revisada localmente. Ainda não está liberada para divulgação: os dados legais e os direitos do modelo não foram fornecidos. Não há formulário, analytics, pixel ou cookies de rastreamento.

## Identificação e conteúdo
- [ ] Nome completo da profissional: [PREENCHER]. Nome fornecido: Dra. Marcelle Beliza.
- [ ] CRO e UF: [PREENCHER]. Inserir junto à apresentação da Dra. e no rodapé.
- [ ] Responsável técnica confirmada: [PREENCHER].
- [ ] Razão social e CNPJ: [PREENCHER]. Inserir no rodapé.
- [ ] Cidade e bairro: [PREENCHER]. Atualizar título “Dentista em [cidade] | Beliza Odontologia”, JSON-LD e destino preciso das rotas. Não deduzidos pelo DDD.
- [ ] Horários: [PREENCHER]. Enquanto ausentes, a página orienta consultar a equipe.
- [ ] Foto profissional autorizada, biografia e formação: [PREENCHER]. A seção Sobre usa a marca original, sem foto de banco de imagens.
- [ ] Confirmar lista final dos seis tratamentos, indicações do texto e formas de pagamento: [PREENCHER]. Sem alegações sobre preço, estrutura ou especialidades registradas.
- [ ] Logo vetorial original: [PREENCHER]. JPEG fornecido usado sem redesenho, com recorte apenas de margens brancas e conversão WebP.

## Resultados e depoimentos
- [ ] Depoimentos reais autorizados: [PREENCHER]. Seção omitida até recebê-los.
- [ ] Antes/depois e autorização escrita: [PREENCHER]. Seção omitida. Se adicionada, avisar que resultados variam.

## Ativos, domínio e operação
- [ ] Direitos comerciais do GLB fornecido: [PREENCHER]. Ver assets/3d/LICENSE.txt.
- [ ] Aprovar aparência do modelo: [PREENCHER]. Modelo fornecido tem raízes aparentes; mantido conforme pedido, diferente da preferência visual do DESIGN.md.
- [ ] Teste físico em Android de entrada: [PREENCHER]. Emulação e throttling não substituem teste real. Se houver travamentos, manter poster e desativar rotação.
- [ ] Domínio e hospedagem: [PREENCHER]. Antes da publicação, adicionar canonical, og:url e URL absoluta de og:image. A imagem já existe em assets/img/compartilhamento.webp.
- [ ] Google Meu Negócio e localização precisa: [PREENCHER]. Página usa links de busca e rotas com o endereço fornecido, sem inventar coordenadas.
- [ ] IDs Meta Pixel / GA4: [PREENCHER], apenas se houver solicitação de rastreamento. Nessa etapa implementar consentimento, política de privacidade e eventos de conversão.

## Validações disponíveis

Checklist vigente: [docs/SCROLL-LINEAR.md](docs/SCROLL-LINEAR.md).

- Trajetória linear, texto sem caixas, material branco e cascata reversível.
- Layouts em 360, 768 e 1280 px, paisagem e zoom 200%; sem overflow horizontal.
- Links WhatsApp com telefone e mensagem corretos; FAQ nativo e foco acessível.
- Cinco fallbacks e mudança de preferência para movimento reduzido.
- Dente decorativo sem foco (`inert`); scripts e ativos locais.
- Medições de Lighthouse e rAF em emulação registradas; Android físico ainda pendente.
- CRO, biografia/formação, horário e dados legais usam `[PREENCHER]` na revisão, conforme instrução do usuário. Preencher antes de divulgar.
