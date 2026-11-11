# Modelo do banco de dados
ALUNOS (id_aluno PK, nome, email, telefone, data_nascimento).
PLANOS (id_plano PK, nome, descricao, valor, duracao_dias).
MATRICULAS (id_matricula PK, id_aluno FK, id_plano FK, data_inicio, data_fim, status).
PAGAMENTOS (id_pagamento PK, id_matricula FK, valor, data_pagamento, vencimento, status).
TREINOS (id_treino PK, id_aluno FK, nome, descricao, data_criacao).
EXERCICIOS (id_exercicio PK, nome, grupo_muscular, descricao).
TREINO_EXERCICIOS (id_treino_exercicio PK, id_treino FK, id_exercicio FK, series, repeticoes).

Script de criação: `database/fitmanager.sql`.
