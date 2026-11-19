
<?php
header("Content-Type: application/json; charset=UTF-8");

require_once "conexao.php";

try {

    // EXCLUIR ALUNO
    if ($_SERVER["REQUEST_METHOD"] === "DELETE") {
        parse_str(file_get_contents("php://input"), $dados);

        $id = filter_var($dados["id"] ?? null, FILTER_VALIDATE_INT);

        if (!$id || $id <= 0) {
            http_response_code(400);
            echo json_encode(["erro" => "ID do aluno inválido."]);
            exit;
        }

        $sql = "DELETE FROM alunos WHERE id_aluno = :id";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([":id" => $id]);

        if ($stmt->rowCount() === 0) {
            http_response_code(404);
            echo json_encode(["erro" => "Aluno não encontrado."]);
            exit;
        }

        echo json_encode(["mensagem" => "Aluno excluído com sucesso!"]);
        exit;
    }

    // LISTAR ALUNOS
 
    // EDITAR ALUNO
    if ($_SERVER["REQUEST_METHOD"] === "PUT") {
        parse_str(file_get_contents("php://input"), $dados);

        $id = filter_var($dados["id"] ?? null, FILTER_VALIDATE_INT);
        $nome = trim($dados["nome"] ?? "");
        $email = trim($dados["email"] ?? "");
        $telefone = trim($dados["telefone"] ?? "");
        $nascimento = trim($dados["nascimento"] ?? "");

        if (!$id || $id <= 0 || $nome === "" || $email === "") {
            http_response_code(400);
            echo json_encode(["erro" => "Preencha os campos obrigatórios corretamente."]);
            exit;
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo json_encode(["erro" => "E-mail inválido."]);
            exit;
        }

        $dataNascimento = $nascimento !== "" ? $nascimento : null;

        if ($dataNascimento !== null) {
            $data = DateTime::createFromFormat("Y-m-d", $dataNascimento);

            if (!$data || $data->format("Y-m-d") !== $dataNascimento) {
                http_response_code(400);
                echo json_encode(["erro" => "Data de nascimento inválida."]);
                exit;
            }
        }

        $sql = "UPDATE alunos
                SET nome = :nome,
                    email = :email,
                    telefone = :telefone,
                    data_nascimento = :nascimento
                WHERE id_aluno = :id";

        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ":nome" => $nome,
            ":email" => $email,
            ":telefone" => $telefone,
            ":nascimento" => $dataNascimento,
            ":id" => $id
        ]);

        echo json_encode(["mensagem" => "Aluno atualizado com sucesso!"]);
        exit;
    }


    // CADASTRAR ALUNO
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $nome = trim($_POST["nome"] ?? "");
        $email = trim($_POST["email"] ?? "");
        $telefone = trim($_POST["telefone"] ?? "");
        $nascimento = trim($_POST["nascimento"] ?? "");

        if ($nome === "" || $email === "") {
            http_response_code(400);
            echo json_encode(["erro" => "Nome e e-mail são obrigatórios."]);
            exit;
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo json_encode(["erro" => "E-mail inválido."]);
            exit;
        }

        $dataNascimento = $nascimento !== "" ? $nascimento : null;

        if ($dataNascimento !== null) {
            $data = DateTime::createFromFormat("Y-m-d", $dataNascimento);

            if (!$data || $data->format("Y-m-d") !== $dataNascimento) {
                http_response_code(400);
                echo json_encode(["erro" => "Data de nascimento inválida."]);
                exit;
            }
        }

        $sql = "INSERT INTO alunos (nome, email, telefone, data_nascimento)
                VALUES (:nome, :email, :telefone, :nascimento)";

        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ":nome" => $nome,
            ":email" => $email,
            ":telefone" => $telefone,
            ":nascimento" => $dataNascimento
        ]);

        http_response_code(201);
        echo json_encode(["mensagem" => "Aluno cadastrado com sucesso!"]);
        exit;
    }

    http_response_code(405);
    echo json_encode(["erro" => "Método não permitido."]);

} catch (PDOException $erro) {
    if ($erro->getCode() === "23000") {
        http_response_code(409);
        echo json_encode(["erro" => "Este e-mail já está cadastrado."]);
    } else {
        error_log($erro->getMessage());
        http_response_code(500);
        echo json_encode(["erro" => "Não foi possível processar a solicitação."]);
    }
}
