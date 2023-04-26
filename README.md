# prompt!

## Uso

O nosso jogo já está lançado e pode ser acessado nesse link:

[https://prompt-ia.vercel.app/](https://prompt-ia.vercel.app/)

## Descrição

Projeto da disciplina de Multimidia que fizemos um jogo de navegador que, dada uma imagem gerada por inteligência artificial, o jogador precisa acertar o prompt que gerou ela. O jogo é inspirado no [Termo](https://term.ooo/).

O projeto é dividido em 3 frentes:

### Back-end

Nosso back foi feito em Nodejs e é responsável por pegar do banco de dados qual é o desafio do dia atual, em que o desafio é formado por uma imagem e um prompt. Ele então coloca em uma API para o front pegar esse desafio do dia atual.

### Geração de imagens e prompts

Essa frente foi feita utilizando a linguagem Python. Para a geração de imagens, utilizamos o OpenJourney, que é um Stable Diffusion modificado para ter gerações de imagens mais realistas. Optamos por ele por ter um resultado muito semelhante com o MidJourney e por ser gratuito. Já para os prompts, utilizamos a API da OpenAI e utilizamos o chatGPT para criar todos os prompts, com uma engenharia de prompt envolvida para que ele desse resultados satisfatórios.

### Front-end

O front é toda parte que o jogador vê e foi feito com a tecnologia Nextjs. No front, além do visual, implementamos toda a verificação de acertos e erros do usuário, a parte do usuário digitar na tela e os quadradinhos do dia serem de acordo com o prompt do dia, por exemplo.

## Grupo

Este projeto foi criado por [Gustavo Campos](https://github.com/gugaccampos), [Lucas Acioly](https://github.com/lucasacioly), [Lucas Melo](https://github.com/lucasgmelo), [Matheus Frej](https://github.com/Matheusfrej) e [Rodrigo Mesel](https://github.com/RodrigoMesel).
