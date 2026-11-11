CREATE DATABASE IF NOT EXISTS fitmanager CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE fitmanager;
CREATE TABLE alunos (
 id_aluno INT AUTO_INCREMENT PRIMARY KEY,
 nome VARCHAR(120) NOT NULL,
 email VARCHAR(150) NOT NULL UNIQUE,
 telefone VARCHAR(20),
 data_nascimento DATE,
 criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE planos (
 id_plano INT AUTO_INCREMENT PRIMARY KEY,
 nome VARCHAR(80) NOT NULL,
 descricao VARCHAR(255),
 valor DECIMAL(10,2) NOT NULL,
 duracao_dias INT NOT NULL
);
CREATE TABLE matriculas (
 id_matricula INT AUTO_INCREMENT PRIMARY KEY,
 id_aluno INT NOT NULL,
 id_plano INT NOT NULL,
 data_inicio DATE NOT NULL,
 data_fim DATE,
 status ENUM('Ativa','Pendente','Encerrada') DEFAULT 'Ativa',
 FOREIGN KEY (id_aluno) REFERENCES alunos(id_aluno),
 FOREIGN KEY (id_plano) REFERENCES planos(id_plano)
);
CREATE TABLE pagamentos (
 id_pagamento INT AUTO_INCREMENT PRIMARY KEY,
 id_matricula INT NOT NULL,
 valor DECIMAL(10,2) NOT NULL,
 data_pagamento DATE,
 vencimento DATE NOT NULL,
 status ENUM('Pago','Pendente','Atrasado') DEFAULT 'Pendente',
 FOREIGN KEY (id_matricula) REFERENCES matriculas(id_matricula)
);
CREATE TABLE treinos (
 id_treino INT AUTO_INCREMENT PRIMARY KEY,
 id_aluno INT NOT NULL,
 nome VARCHAR(100) NOT NULL,
 descricao TEXT,
 data_criacao DATE,
 FOREIGN KEY (id_aluno) REFERENCES alunos(id_aluno)
);
CREATE TABLE exercicios (
 id_exercicio INT AUTO_INCREMENT PRIMARY KEY,
 nome VARCHAR(100) NOT NULL,
 grupo_muscular VARCHAR(80),
 descricao TEXT
);
CREATE TABLE treino_exercicios (
 id_treino_exercicio INT AUTO_INCREMENT PRIMARY KEY,
 id_treino INT NOT NULL,
 id_exercicio INT NOT NULL,
 series INT,
 repeticoes VARCHAR(40),
 FOREIGN KEY (id_treino) REFERENCES treinos(id_treino),
 FOREIGN KEY (id_exercicio) REFERENCES exercicios(id_exercicio)
);
