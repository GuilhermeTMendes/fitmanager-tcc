# 🟠 FitManager — Sistema de Gerenciamento de Academias

## 📌 Sobre o projeto

O **FitManager** é um sistema web desenvolvido como Trabalho de Conclusão de Curso (TCC) do curso Técnico em Desenvolvimento de Sistemas da Proz Educação.

O objetivo do projeto é facilitar o gerenciamento de academias, centralizando informações de alunos, planos, mensalidades e treinos em uma única plataforma.

## 🎯 Objetivos

- Facilitar o cadastro e gerenciamento de alunos.
- Organizar os planos oferecidos pela academia.
- Permitir o controle de mensalidades e pagamentos.
- Organizar informações relacionadas aos treinos.
- Oferecer uma interface simples, intuitiva e responsiva.

## 🛠️ Tecnologias utilizadas

- HTML5 — estrutura das páginas.
- CSS3 — estilização e responsividade.
- JavaScript — interatividade e comunicação com o back-end.
- PHP — processamento das informações no servidor.
- MySQL — armazenamento dos dados.
- PDO — conexão e consultas ao banco de dados.
- Git e GitHub — versionamento e armazenamento do projeto.

## 📂 Estrutura do projeto

```text
FitManager/
│
├── app/
│
├── backend/
│   ├── alunos.php
│   ├── conexao.example.php
│   └── conexao.php (arquivo local, não publicado)
│
├── database/
│   └── fitmanager.sql
│
├── docs/
│   ├── arquitetura.md
│   ├── arquitetura.png
│   ├── banco-der.md
│   ├── banco-der.png
│   └── requisitos.md
│
├── frontend/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── script.js
│   └── index.html
│
├── prototipos/
│
└── README.md
```

## ⚙️ Funcionalidades desenvolvidas

### Cadastro e gerenciamento de alunos

- Cadastro de alunos.
- Consulta e listagem de alunos.
- Edição de informações cadastradas.
- Exclusão de alunos.
- Validação de campos obrigatórios.
- Verificação de e-mail válido e duplicado.

### Interface do sistema

- Painel principal com indicadores.
- Navegação entre as áreas do sistema.
- Área de alunos.
- Área de planos.
- Área de mensalidades.
- Área de treinos.

### Banco de dados

O banco de dados MySQL possui sete tabelas:

1. `alunos`
2. `planos`
3. `matriculas`
4. `pagamentos`
5. `treinos`
6. `exercicios`
7. `treino_exercicios`

As tabelas possuem chaves primárias e estrangeiras para organizar os relacionamentos entre os dados.

## 🗄️ Arquitetura do sistema

O sistema utiliza uma arquitetura dividida em três partes:

- **Front-end:** interface desenvolvida com HTML, CSS e JavaScript.
- **Back-end:** processamento das requisições utilizando PHP.
- **Banco de dados:** armazenamento das informações utilizando MySQL.

A comunicação acontece entre o navegador, o servidor PHP e o banco de dados.

## 🚀 Como executar o projeto

### Requisitos

- XAMPP instalado.
- Apache e MySQL ativos.
- Navegador web.

### 1. Baixar o projeto

Faça o download do repositório pelo GitHub e extraia os arquivos.

### 2. Colocar na pasta do servidor

Copie a pasta `FitManager` para:

```text
C:\xampp\htdocs\fitmanager\
```

### 3. Configurar o banco de dados

Acesse:

```text
http://localhost/phpmyadmin/
```

Importe o arquivo:

```text
FitManager/database/fitmanager.sql
```

### 4. Configurar a conexão

Na pasta `backend`, copie o arquivo `conexao.example.php` e renomeie a cópia para `conexao.php`.

Configure os dados de acesso ao MySQL conforme o ambiente local.

**Importante:** o arquivo `conexao.php` contém configurações locais e não deve ser publicado no GitHub.

### 5. Executar o sistema

Abra no navegador:

```text
http://localhost/fitmanager/FitManager/frontend/
```

## 📅 Desenvolvimento por etapas

| Semana | Atividades |
|---|---|
| Semana 1 | Definição da proposta e planejamento do projeto. |
| Semana 2 | Requisitos, protótipos, DER, arquitetura e repositório GitHub. |
| Semana 3 | Desenvolvimento das interfaces, JavaScript e banco de dados MySQL. |
| Semana 4 | Desenvolvimento do back-end PHP, conexão com MySQL e CRUD completo de alunos. |

## 🔒 Segurança

- Validação de informações recebidas pelo servidor.
- Utilização de consultas preparadas com PDO.
- Tratamento básico de erros.
- Proteção das configurações locais de conexão.
- Mensagens de erro sem exposição de informações internas do banco de dados.

## 👨‍💻 Desenvolvedor

**Guilherme Tolentino Mendes**

Curso Técnico em Desenvolvimento de Sistemas — Proz Educação.

Turma: 251BTTDS

Professor: Luciano Rocha.

## 📌 Status do projeto

Em desenvolvimento — etapas 1 a 4 concluídas.

O sistema já possui integração funcional entre front-end, back-end e banco de dados para o gerenciamento de alunos. As demais áreas serão desenvolvidas nas próximas etapas.
