<p align="center">
  <a href="" rel="noopener">
 <img src="https://d2bxzineatl84k.cloudfront.net/storage/files/logos/MwAtdRnZPfDeTxxFrOlufMEq0cADc9beBvtl3Kpf.png" alt="Logo da Thera Consulting" style="width: 400px; height: auto;">
</p>

<h3 align="center">Desafio Técnico - Thera Consulting</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

## 📝 Índice

- [Sobre a aplicação](#sobre)
- [Desafio](#desafio)
- [Por onde começar?](#inicio)
- [Como usar?](#como_usar)
- [Testes](#testes)
- [Swagger](#swagger)
- [Tecnologias utilizadas](#techs)
- [Requisitos](./REQUIREMENTS.md)
- [Autores](#autores)
- [Agradecimentos](#agradecimentos)

## 🧐 Sobre a aplicação&#x20;

O desafio consiste no desenvolvimento de uma API RESTful para o gerenciamento de pedidos e produtos. A aplicação foi construída utilizando **Node.js com NestJS**, seguindo as boas práticas de desenvolvimento, incluindo **SOLID**, **separação de camadas**, e **boas práticas de organização de código**.

### Estrutura do Projeto

A aplicação foi organizada na seguinte estrutura de pastas:

- **src/@core/domain**: contém as entidades de negócios e interfaces dos repositórios.
- **src/@core/application**: implementa os casos de uso específicos.
- **src/@core/infra**: responsável pela infraestrutura, como a comunicação com serviços externos.
- **src/app**: contém todas as funcionalidades que não fazem parte do negócio, como middlewares, controllers. Também possui as configurações do framework Nestjs.
- **src/main**: contém os pontos de entrada da aplicação, como inicialização e configurações.

### Funcionalidades Implementadas

#### 📦 Produtos

- Criar, listar, editar e deletar produtos.
- Cada produto contém:
  - id (autogerado)
  - nome
  - categoria
  - descrição
  - preço
  - quantidade em estoque

#### 🛒 Pedidos

- Criar e listar pedidos.
- Cada pedido contém:
  - id (autogerado)
  - lista de produtos (com quantidade de cada um)
  - total do pedido
  - status: "Pendente", "Concluído" ou "Cancelado"
- Validações ao criar um pedido:
  - Verificar se a quantidade dos produtos está disponível em estoque.
  - Atualizar o estoque caso o pedido seja concluído.

## 📄 Conhecendo o desafio&#x20;

O desafio pode ser acessado em: [Instruções do desafio](https://github.com/robertotics4/desafio-theraconsulting/blob/master/docs/desafio.docx)

## 🏁 Por onde começar?&#x20;

A aplicação foi desenvolvida com **NestJS**, utilizando **TypeScript** e um **banco de dados relacional**.

### Pré-requisitos

- Node.js (v18+)
- Yarn
- Docker

### Instalando as dependências

Para instalar as dependências, execute:

```bash
yarn install
```

## 🎈 Como usar?&#x20;

### Iniciar a API

```bash
yarn start
```

OBS: para iniciar a aplicação sem docker será necessário criar um arquivo `.env` com as seguintes variáveis de ambiente (exemplo):

```env
DATABASE_URL=postgres://thera_user:thera_password@localhost:5432/postgres_thera
SERVER_PORT=3000
JWT_HASH_MD5=5ef41c09829700e022099de37b96bff8
```


### Usando Docker

```bash
docker-compose up --build
```

## ✅ Testes&#x20;

Foram implementados **testes unitários** utilizando `Jest`.

```bash
yarn test
```

Para verificar a cobertura de código:

```bash
yarn test:cov
```

## 📚 Swagger&#x20;

A documentação da API está disponível em:

```
http://localhost:[PORTA]/api-docs
```

Exemplo: http://localhost:3000/api-docs

## ⛏️ Tecnologias utilizadas&#x20;

- [NestJS](https://nestjs.com/) - Framework Node.js para aplicações escaláveis
- [TypeScript](https://www.typescriptlang.org/) - Superset do JavaScript
- [Jest](https://jestjs.io/) - Testes unitários
- [Docker](https://www.docker.com/) - Containerização
- [Prisma](https://www.prisma.io/) - ORM


## 🔐 Extras Implementados

- Autenticação JWT
- Middleware para logs de requisições

## ✍️ Autores&#x20;

- [@robertotics4](https://github.com/robertotics4)

## 🎉 Agradecimentos&#x20;

Agradeço à equipe da Thera Consulting pela oportunidade de participar deste desafio técnico. Foi uma excelente experiência!

