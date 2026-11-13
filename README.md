# Portfólio — Samuel Santos

## Estrutura do projeto

```text
Portfólio/
├── index.html
├── README.md
└── src/
    ├── images/       # Imagens do projeto, separadas por seção/uso
    ├── scripts/
    │   └── main.js   # Interações e comportamentos JavaScript
    └── styles/
        └── main.css  # Estilos e responsividade
```

## Como executar

Abra `index.html` no navegador. Para desenvolvimento, recomenda-se usar a extensão Live Server do VS Code.

## Padrões adotados

- Classes CSS renomeadas com padrão BEM (`portfolio__elemento`).
- Variáveis CSS no padrão `kebab-case` com prefixo `--`.
- Arquivos separados por responsabilidade: HTML, CSS, JavaScript e imagens.
- Comentários em formato de banner para facilitar a localização das seções.
- Imagens incorporadas em Base64 extraídas para `src/images/` e referenciadas localmente.
