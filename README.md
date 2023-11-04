# SocialPet

Projeto em desenvolvimento para a disciplina de Engenharia de Software II - DCC/UFMG.

## Equipe

* Diego Pereira - Back-End e Banco de Dados
* Julia Guerreiro - UI/UX e Front-End

## O Projeto

Este projeto é a implementação de uma rede social personalizada para postar conteúdo relacionado a pets, inicialmente, com ênfase em gatos. 
O objetivo é oferecer uma plataforma onde os usuários podem criar perfis para seus pets felinos e compartilhar fotos e vídeos relacionadas aos seus bichinhos com outros entusiastas de gatos, além de explorar 
conteúdo compartilhado por outros usuários. Atualmente, não há a funcionalidade de cadastro e login para os tutores, no entanto, os mesmos podem cadastrar seus bichanos e acessar a plataforma livremente. Em resumo, o objetivo é oferecer um espaço dedicado para amantes de gatos celebrarem seus animais de estimação e consumirem conteúdos relacionados aos bichanos.

## Features

* Cadastrar pet no sistema;
* Adicionar/compartilhar fotos e vídeos;
* Visualizar conteúdo relacionado aos felinos.

## Tecnologias Utilizadas

* Typescript: Utilizou-se a linguagem Typescript para desenvolvimento tanto do back-end como do front-end, que é uma extnsão do Javascript com suporte a tipos.
* NodeJS: Utilizou-se o compilador de Javascript node tanto no back-end como no front-end.
* Github Actions: Utizamos a ferramenta de CI do Github para rodar testes básicos e acusar quando algum commit pode ter causado um problema, foram criadas actions separadas para o back e para o front.
* Render: Utilizou-se a ferramenta Render para realizar o deploy do sistema, com um endereço para a API do back-end e outro para a página do front-end

### Back-End

* ExpressJS: Utilizamos a biblioteca do Express para desenvolver o backend do sistema.
* Jest: Utilizamos a ferramenta Jest para escrever os testes para o backend.
* Mongoose: Utilizamos o ODM do Mongoose para manipular o banco de dados no backend.

### Front-End

* CSS: Utilizamos CSS para estilizar a interface do usuário, garantindo uma experiência visual agradável e responsiva.
* React: Implementamos a interface do usuário usando a biblioteca React, que permite a criação de componentes reutilizáveis e a construção de interfaces dinâmicas.

### Banco de Dados

* MongoDB: Utilizamos o banco de dados NOSQL MongoDB para armazenar os dados do sistema, com uma solucão de banco de dados em nuvem.
