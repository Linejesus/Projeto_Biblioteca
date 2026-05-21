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
- Bibliotecas
- Multas
- 
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
- Ano de publicação
- Autores
- Editora
- Edições
- Gêneros
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
- Pessoa → pegou → Livro
- Biblioteca → possui → Livro
- Livro → sequencia_de → Livro
- Pessoa → frequenta → Biblioteca

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

## ▶️ Como Executar o Projeto

Para executar o sistema corretamente, é necessário configurar o ambiente local do frontend e backend, além de garantir acesso aos bancos de dados utilizados no projeto.

---

### Pré-requisitos

Antes de iniciar, é necessário ter instalado na máquina:

- Java 17+
- Gradle
- Node.js
- Angular CLI
- PostgreSQL
- Git

Além disso, é necessário possuir acesso às instâncias online de:

- MongoDB Atlas
- Neo4j AuraDB

---

## 1. Clonar o Repositório

Clone o projeto utilizando o Git:

```bash
git clone <url-do-repositorio>
cd projeto-biblioteca
```

---

## 2. Configurar o Banco Relacional (PostgreSQL)

O PostgreSQL será executado localmente para armazenar dados relacionais e transacionais.

Criar um banco de dados com o nome:

```sql
biblioteca
```

Porta padrão utilizada:

```bash
5432
```

Após isso, configurar usuário, senha e URL de conexão no arquivo:

```bash
application.properties
```

Exemplo:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/biblioteca
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha
```

---

## 3. Configuração do MongoDB (Cloud)

O MongoDB será utilizado por meio de uma instância online no **MongoDB Atlas**, hospedada em conta externa da equipe.

Não é necessário instalar MongoDB localmente.

A conexão será configurada no backend via string de conexão no arquivo:

```bash
application.properties
```

Exemplo:

```properties
spring.data.mongodb.uri=mongodb+srv://usuario:senha@cluster.mongodb.net/biblioteca
```

---

## 4. Configuração do Neo4j (Cloud)

O banco Neo4j será utilizado através de uma instância online no **Neo4j AuraDB**, hospedada em conta externa da equipe.

Não é necessário instalar Neo4j localmente.

A conexão será configurada no backend via:

```bash
application.properties
```

Exemplo:

```properties
spring.neo4j.uri=bolt://<host>:7687
spring.neo4j.authentication.username=usuario
spring.neo4j.authentication.password=senha
```

---

## 5. Executar o Backend

O backend foi desenvolvido em **Java + Spring Boot**, com gerenciamento de dependências utilizando **Gradle**.

Entrar na pasta do backend:

```bash
cd api/api
```

Instalar dependências e compilar o projeto:

```bash
./gradlew build
```

Ou no Windows:

```bash
gradlew.bat build
```

Após isso, iniciar a aplicação:

```bash
./gradlew bootRun
```

Ou no Windows:

```bash
gradlew.bat bootRun
```

O backend será iniciado em:

```bash
http://localhost:8080
```

---

## 6. Executar o Frontend

O frontend foi desenvolvido em **Angular**.

Entrar na pasta do frontend:

```bash
cd Biblioteca
```

Instalar dependências:

```bash
npm install
```

Executar o projeto:

```bash
ng serve
```

A aplicação será iniciada em:

```bash
http://localhost:4200
```

---

## 🔧 Serviços Utilizados

| Serviço | Finalidade |
|------|------|
| PostgreSQL | Armazenamento de dados relacionais e transacionais |
| MongoDB Atlas | Armazenamento de documentos e informações flexíveis dos livros |
| Neo4j AuraDB | Gerenciamento de relacionamentos em grafos |
| Spring Boot | Desenvolvimento do backend |
| Gradle | Gerenciamento de dependências e build |
| Angular | Desenvolvimento do frontend |
| Node.js | Execução do ambiente frontend |
| TypeScript | Linguagem base do frontend |

---

## 📌 Fluxo de Execução

```bash
1. Clonar repositório
2. Configurar PostgreSQL local
3. Configurar credenciais do MongoDB Atlas
4. Configurar credenciais do Neo4j AuraDB
5. Rodar backend com Gradle
6. Rodar frontend com Angular
7. Acessar aplicação em localhost
```

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
