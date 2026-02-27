# Conjectura de Collatz

Site interativo que explica e simula a Conjectura de Collatz — um dos problemas em aberto mais famosos da matemática.

## Sobre o projeto

A Conjectura de Collatz afirma que qualquer número inteiro positivo, seguindo uma regra simples, sempre chegará ao número 1. Proposta em 1937 pelo matemático alemão Lothar Collatz, ela permanece sem prova matemática geral até hoje.

A regra é:
- Se **n é par** → divida por 2
- Se **n é ímpar** → multiplique por 3 e some 1

## Funcionalidades

- Explicação didática da conjectura em 4 cards
- Visualização da fórmula matemática
- Simulador interativo com entrada de qualquer número até 99.999.999
- Gráfico da trajetória completa da sequência com marcação do valor de pico
- Estatísticas: número de passos, valor máximo e número inicial
- Sequência numérica completa com pares e ímpares coloridos
- Botão de número aleatório para exploração rápida

## Estrutura

```
/
├── index.html   # Estrutura e marcação HTML
├── style.css    # Estilos, variáveis e animações
├── script.js    # Lógica da conjectura e renderização do gráfico
└── README.md
```

## Como usar

Não há dependências ou instalação necessária. Basta abrir o `index.html` diretamente no navegador.

## Tecnologias

- HTML5, CSS3 e JavaScript puro (sem frameworks)
- Canvas API para o gráfico da sequência
- Google Fonts: Inter, IBM Plex Mono, Oswald

## Curiosidade

A conjectura foi verificada computacionalmente para todos os números até 2⁶⁸ (cerca de 295 quintilhões) — e todos chegaram ao 1. Mesmo assim, uma prova matemática formal ainda é um mistério completamente aberto. Paul Erdős, um dos maiores matemáticos do século XX, disse: *"A matemática ainda não está pronta para esse tipo de problema."*
