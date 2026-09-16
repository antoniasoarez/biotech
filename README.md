# Biomassa — Geração de energia elétrica

Apresentação escolar do SENAI em HTML, CSS e JavaScript puro. Identidade verde, planta e mapa ilustrativo preservados. Sem framework, backend, banco de dados ou instalação necessária.

## Abrir e hospedar

Abra `index.html` no navegador. O conteúdo e as interações funcionam offline; os links das referências precisam de internet. Compatível com GitHub Pages: publique a raiz da branch desejada, sem compilação.

## Arquivos

- `index.html`: conteúdo, apresentadores, fluxos, gráfico e bibliografia.
- `css/style.css`: identidade visual, componentes e responsividade.
- `js/script.js`: menu, seção atual, etapas e navegação da apresentação.
- `assets/plant.svg` e `assets/leaf.svg`: ilustrações originais preservadas.

## Apresentação

Use o menu, os links da equipe ou as setas da barra inferior para mudar de parte. A barra informa a seção e o apresentador. Na combustão, selecione uma etapa; no mapa, os links levam aos destaques regionais. Use Tab e Enter para operar os controles; Escape fecha o menu. A preferência por movimento reduzido é respeitada.

| Apresentador | Tema |
| --- | --- |
| Maria | O que é biomassa |
| Kauã | Fontes e usos |
| Jorge | Conversão em eletricidade e biogás |
| Lucas | Benefícios e desafios |
| Felipe | Biomassa no Brasil |
| Djalma | O Futuro da Biomassa |

Maria foi mantida porque já estava identificada na seção de conceito do projeto original. Cada integrante aparece uma única vez na equipe. A conclusão é coletiva.

## Dados e referências

O gráfico usa o **BEN 2026, Relatório Síntese, página 19, ano-base 2025**, da EPE:

- Biomassa da cana: **52,0 Mtep**.
- Lenha e carvão vegetal: **27,1 Mtep**.
- Licor preto e outras renováveis: **29,2 Mtep**.

São categorias da **oferta interna de energia**, não geração elétrica ou potência instalada. Mtep significa milhões de toneladas equivalentes de petróleo. A categoria agregada de licor preto não foi tratada como licor preto isolado nem somada para inventar uma participação total de biomassa.

Fontes oficiais e links estão em `#referencias`: EPE (BEN e conceitos), ANP, Embrapa e IBGE. Não foram utilizados percentuais regionais, previsões numéricas ou contagens de usinas. O mapa é conceitual e sem escala; os marcadores indicam posições aproximadas.

O PDF escolar citado no pedido não estava entre os arquivos fornecidos. O conteúdo foi organizado a partir das instruções, do site original e das fontes oficiais verificadas.

## Manutenção

Edite o conteúdo e os dados em `index.html`. As descrições das etapas ficam em `processDescriptions`, no JavaScript. Ao adicionar uma seção principal, o indicador e as setas atualizam a contagem automaticamente. Revise também o menu, a numeração editorial e as fontes. Não apresente dados de outro ano com o rótulo de 2025.

Sem JavaScript, o conteúdo, os links, os cards expansíveis e o gráfico continuam disponíveis; a barra e as explicações interativas dependem do script.
