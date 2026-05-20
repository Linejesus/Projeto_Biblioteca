# 📚 Projeto Biblioteca

## 📖 Sobre o Projeto

O **Projeto Biblioteca** consiste no desenvolvimento de um sistema de gerenciamento de bibliotecas utilizando uma abordagem **multibanco de dados (polyglot persistence)**, combinando diferentes modelos de armazenamento para atender às necessidades específicas de cada tipo de informação.

O sistema terá como principais funcionalidades:

- Cadastro e gerenciamento de usuários;
- Cadastro, consulta e organização de livros;
- Gerenciamento de bibliotecas;
- Controle de empréstimos e devoluções;
- Registro de multas e histórico de empréstimos;
- Análise de relações entre usuários, livros e bibliotecas;
- Consulta de disponibilidade de livros em diferentes unidades.

A escolha desse tema se justifica pela complexidade e variedade dos dados presentes em sistemas de biblioteca. Esse cenário permite explorar diferentes formas de modelagem, armazenamento e consulta, aproveitando as vantagens de bancos de dados relacionais e não relacionais dentro de uma única aplicação.

---

## 🛠️ Tecnologias Utilizadas

O projeto será desenvolvido utilizando uma arquitetura separada entre **backend**, **frontend** e **bancos de dados**.

### Backend
- Java
- Spring Boot
- Spring Data JPA
- Hibernate
- Spring Data MongoDB
- Spring Data Neo4j

O backend será responsável pela lógica de negócio e integração com os diferentes bancos de dados, garantindo organização, escalabilidade e manutenção simplificada.

### Frontend
- Angular
- TypeScript

O frontend será desenvolvido para fornecer uma interface intuitiva e eficiente para gerenciamento das informações da biblioteca.

---

## 🗄️ Banco de Dados

O sistema utilizará três bancos de dados distintos, cada um escolhido com base nas características dos dados armazenados e no tipo de consulta necessária.

### 1. PostgreSQL (Relacional)

O **PostgreSQL** será responsável pelo armazenamento de dados estruturados e transacionais, como:

- Usuários
- Empréstimos
- Devoluções
- Multas
- Histórico de empréstimos
- Controle de bibliotecas

#### Motivos da escolha:
- Alta consistência e integridade dos dados;
- Uso de chaves primárias e estrangeiras;
- Excelente suporte a transações;
- Ideal para dados altamente estruturados.

---

### 2. MongoDB (Banco Orientado a Documentos)

O **MongoDB** será utilizado para armazenar informações relacionadas aos livros, que possuem estrutura mais flexível e semiestruturada.

Exemplos de dados armazenados:
- Título
- Autores
- Categorias
- Edições
- ISBN
- Tags
- Informações complementares

#### Motivos da escolha:
- Flexibilidade no schema;
- Melhor adaptação para dados variáveis;
- Alta escalabilidade;
- Facilidade de manipulação de documentos complexos.

---

### 3. Neo4j (Banco Orientado a Grafos)

O **Neo4j** será utilizado para representar e consultar relações complexas entre entidades do sistema.

Exemplos de relações:
- Usuário → emprestou → Livro
- Livro → pertence à → Biblioteca
- Livro → relacionado com → Livro
- Usuário → frequenta → Biblioteca

#### Motivos da escolha:
- Alta performance em consultas relacionais complexas;
- Excelente modelagem de conexões;
- Ideal para grafos e análises de relacionamento;
- Facilita recomendações e consultas avançadas.

---

## 🏗️ Arquitetura da Aplicação

O sistema seguirá uma arquitetura baseada em camadas:

```bash
Frontend (Angular + TypeScript)
        ↓
Backend (Spring Boot + Java)
        ↓
├── PostgreSQL → Dados estruturados e transacionais
├── MongoDB   → Dados flexíveis e documentos de livros
└── Neo4j     → Relacionamentos e grafos
```

Essa abordagem permite utilizar cada banco de dados de acordo com sua principal especialidade, tornando o sistema mais escalável, organizado e eficiente.

---

## 🎯 Objetivos do Projeto

- Aplicar conceitos de **polyglot persistence**;
- Explorar integração entre múltiplos bancos de dados;
- Desenvolver uma aplicação escalável e modular;
- Comparar vantagens e limitações de diferentes modelos de armazenamento;
- Realizar consultas relacionais e analíticas mais avançadas;
- Consolidar conhecimentos em desenvolvimento full stack.

---

## 👥 Equipe

| Nome | RA |
|------|------|
| **Aline Rocha de Jesus** | 22.123.106-1 |
| **Bianca Silva Oliveira** | 22.123.113-7 |
| **Leonardo Souza de Castro** | 22.123.114-5 |

---

## 🚀 Considerações Finais

Este projeto busca unir conceitos de **engenharia de software**, **desenvolvimento full stack** e **modelagem de dados híbrida**, aplicando diferentes paradigmas de persistência dentro de um único sistema. Além de atender às funcionalidades de um sistema de biblioteca, o projeto também servirá como estudo prático sobre desempenho, escalabilidade e organização de dados em aplicações modernas.
