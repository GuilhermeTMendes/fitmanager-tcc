
const API = "../backend/alunos.php";

// ELEMENTOS DA PÁGINA
const buttons = document.querySelectorAll("[data-page]");
const pages = document.querySelectorAll(".page");
const title = document.getElementById("title");

const form = document.getElementById("form");
const list = document.getElementById("list");
const total = document.getElementById("total");
const count = document.getElementById("count");

const names = {
    inicio: "Visão geral",
    alunos: "Alunos",
    planos: "Planos",
    mensalidades: "Mensalidades",
    treinos: "Treinos"
};

// NAVEGAÇÃO
buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        pages.forEach(page => {
            page.classList.toggle("active", page.id === btn.dataset.page);
        });

        buttons.forEach(button => {
            button.classList.toggle("selected", button === btn);
        });

        title.textContent = names[btn.dataset.page];

        if (btn.dataset.page === "alunos") {
            carregarAlunos();
        }
    });
});

// FUNÇÃO PARA MOSTRAR ALUNOS
function mostrarAlunos(alunos) {
    total.textContent = alunos.length;

    count.textContent =
        `${alunos.length} aluno(s) cadastrado(s) no banco de dados.`;

    list.replaceChildren();

    alunos.forEach(aluno => {
        const item = document.createElement("article");
        const info = document.createElement("span");
        const botaoEditar = document.createElement("button");
        const botaoExcluir = document.createElement("button");

        info.textContent =
            `${aluno.nome} — ${aluno.email} — ${aluno.telefone || "Sem telefone"}`;

        // BOTÃO EDITAR
        botaoEditar.textContent = "Editar";
        botaoEditar.className = "primary";

        botaoEditar.addEventListener("click", () => editarAluno(aluno));

        // BOTÃO EXCLUIR
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.className = "delete";

        botaoExcluir.addEventListener("click", () => excluirAluno(aluno));

        item.append(info, botaoEditar, botaoExcluir);
        list.appendChild(item);
    });
}

// LISTAR ALUNOS
async function carregarAlunos() {
    try {
        const resposta = await fetch(API);

        if (!resposta.ok) {
            throw new Error("Erro ao consultar alunos.");
        }

        const alunos = await resposta.json();

        mostrarAlunos(alunos);

    } catch (erro) {
        console.error(erro);
        alert("Não foi possível carregar os alunos.");
    }
}

// CADASTRAR ALUNO
form.addEventListener("submit", async evento => {
    evento.preventDefault();

    const dados = new URLSearchParams(new FormData(form));

    try {
        const resposta = await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: dados
        });

        const resultado = await resposta.json();

        if (!resposta.ok) {
            alert(resultado.erro || "Não foi possível cadastrar.");
            return;
        }

        alert(resultado.mensagem);

        form.reset();
        await carregarAlunos();

    } catch (erro) {
        console.error(erro);
        alert("Erro ao conectar com o servidor.");
    }
});

// EDITAR ALUNO
async function editarAluno(aluno) {
    const nome = prompt("Nome completo:", aluno.nome);
    if (nome === null) return;

    const email = prompt("E-mail:", aluno.email);
    if (email === null) return;

    const telefone = prompt("Telefone:", aluno.telefone || "");
    if (telefone === null) return;

    const nascimento = prompt(
        "Data de nascimento (AAAA-MM-DD):",
        aluno.data_nascimento || ""
    );

    if (nascimento === null) return;

    const dados = new URLSearchParams({
        id: aluno.id_aluno,
        nome: nome.trim(),
        email: email.trim(),
        telefone: telefone.trim(),
        nascimento: nascimento.trim()
    });

    try {
        const resposta = await fetch(API, {
            method: "PUT",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: dados
        });

        const resultado = await resposta.json();

        if (!resposta.ok) {
            alert(resultado.erro || "Não foi possível editar o aluno.");
            return;
        }

        alert(resultado.mensagem);
        await carregarAlunos();

    } catch (erro) {
        console.error(erro);
        alert("Erro ao editar aluno.");
    }
}

// EXCLUIR ALUNO
async function excluirAluno(aluno) {
    const confirmar = confirm(
        `Deseja realmente excluir ${aluno.nome}?`
    );

    if (!confirmar) return;

    const dados = new URLSearchParams({
        id: aluno.id_aluno
    });

    try {
        const resposta = await fetch(API, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: dados
        });

        const resultado = await resposta.json();

        if (!resposta.ok) {
            alert(resultado.erro || "Não foi possível excluir o aluno.");
            return;
        }

        alert(resultado.mensagem);
        await carregarAlunos();

    } catch (erro) {
        console.error(erro);
        alert("Erro ao excluir aluno.");
    }
}

// CARREGAR DADOS INICIAIS
carregarAlunos();
