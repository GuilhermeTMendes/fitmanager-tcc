# Arquitetura do FitManager

A aplicação será organizada em três partes:

1. **Frontend:** interface acessada pelo navegador, construída com HTML, CSS e JavaScript.
2. **Backend:** processamento das solicitações e regras do sistema, utilizando PHP.
3. **Banco de dados:** armazenamento das informações em MySQL.

**Fluxo:** Navegador (Frontend) → PHP (Backend) → MySQL (Banco de dados).

O backend recebe as solicitações do frontend, valida os dados, consulta ou altera o banco e devolve uma resposta para a interface.
