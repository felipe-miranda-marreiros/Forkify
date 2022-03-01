![image](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)![image](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)![image](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)![image](https://img.shields.io/badge/json-5E5C5C?style=for-the-badge&logo=json&logoColor=white)![image](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)![image](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)

# Forkify

Forkify faz parte do repositório [JavaScript](https://github.com/felipe-miranda-marreiros/JavaScript) e é também parte do projeto final do curso [The Complete JavaScript Course 2022: From Zero to Expert!](https://www.udemy.com/course/the-complete-javascript-course/).

![screencapture-forkify-fmm-netlify-app-2022-02-28-22_15_18](https://user-images.githubusercontent.com/91689754/156086205-42f07b33-07c4-418c-9af2-1bb2f8f59095.png)

## Sobre

O intuito do projeto é aplicar os seguintes conceitos:

* ES6 Classes;
* Programação Orientada a Objetos - Abstração, Herança, Polimorfismo, Encapsulamento, Proteção de métodos e propriedades, Herança entre Classes;
* Fetch API - Try, Catch, Await, Throw, SetTimeout;
* Arquitetura MVC - Model, View, Control;
* Document Object Model - Event Propagation, Event Handlers, Event Delegation;
* Searching;
* Bookmarking;
* Paginação
* Upload - a API do Forkify permite que o usuário faça upload de receitas que poderão ser guardadas no LocalStorage;

## Como funciona

### Searching

Forkify é uma SPA (Single Page Application) que permite que o usuário busque por receitas pesquisando por palavras-chaves (em inglês).

![ezgif-1-998ad0b252](https://user-images.githubusercontent.com/91689754/156085122-85d4797b-ae86-45f9-92bc-0df93c3688ba.gif)

### Page View
Além de pesquisa, o usuário também pode ver a receita completa - quantidade de ingredientes e porções, por exemplo. Os ingredientes mudam dinamicamente.

![ezgif-1-95001aeae3](https://user-images.githubusercontent.com/91689754/156085696-81f340cb-e377-40fd-934b-c88da8f1031a.gif)

### Bookmark

Usuário pode adicionar a receita em Bookmarking. A receita será salva em LocalStorage. Dessa forma quando houver reload na página, ela continuará na aba de Bookmarking.
![ezgif-1-3391c5c666](https://user-images.githubusercontent.com/91689754/156085948-bba80977-e8dc-4658-89f3-f074a5191bea.gif)

## API

API foi criada por [Jonas Schmedtmann](https://mobile.twitter.com/jonasschmedtman?lang=en). Então, se você quiser ter acesso a ela, compre o curso dele. Foi utilizado Fetch API para receber o conteúdo remoto e então transformado em JSON. Parte do projeto Template Literals foi necessário para pegar a API do Forkify e inserir dinamicamente no HTML.

## Parcel

Não foi utilizado nenhuma framework nesse projeto, portanto [Parcel](https://parceljs.org/) foi fundamental para criação da build final. Então, se você quiser utilizar esse repositório, utilize:

```
npm install --save-dev parcel
```

Para iniciar o ambiente, utilize:

```
npm run start
```

Para fazer uma nova build:

```
npm run build
```

## Deploy

Foi utilizado Netlify. Você pode ter acesso a minha versão no link abaixo.

```url
https://forkify-fmm.netlify.app/
```


