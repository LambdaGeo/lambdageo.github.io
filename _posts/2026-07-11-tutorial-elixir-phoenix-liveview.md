---
layout: post
title: "Elixir e Phoenix LiveView: Construindo uma Aplicação Todo List do Zero"
date: 2026-07-11 10:01:00 -0300
description: "Um guia prático e completo do ecossistema Phoenix, explorando schemas, migrations, changesets e a reatividade em tempo real com LiveView."
tags: [elixir, phoenix, liveview, ecto, sqlite, functional-programming]
categories: tutorial
permalink: /blog/tutorial-elixir-phoenix-liveview-todo-list/
---

Este é um tutorial completo e guiado para construir uma aplicação de **Lista de Tarefas (Todo List)** do zero, usando a stack moderna de **Elixir com Phoenix LiveView** — um framework funcional e reativo para o desenvolvimento web full-stack.

Mas há um diferencial: este guia é o **segundo lado de uma mesma jornada**.

No outro tutorial — [Clojure/ClojureScript: Construindo uma Aplicação Persistente e Reativa](/blog/tutorial-clojure-clojurescript-todo-list/) — resolvemos o mesmo problema usando a stack **Clojure + Reagent + next.jdbc**, explorando o modelo de atualização reativa no navegador e a comunicação via API REST.

Aqui, faremos o mesmo **conceitualmente**, mas com **Elixir e LiveView**, onde **frontend e backend se fundem** em um único processo funcional e altamente performático.

---

### 🎯 Objetivo Pedagógico

O propósito deste tutorial não é apenas "fazer funcionar", mas **entender o porquê**. Cada comando, cada função e cada módulo será explicado com contexto e analogia. Você aprenderá:

- Como o Phoenix organiza um projeto web;
- O que são **schemas**, **migrations** e **changesets** (e como se relacionam com os _models_ dos ORMs tradicionais);
- Como o **LiveView** elimina a separação rígida entre frontend e backend, permitindo **interações em tempo real** sem escrever uma linha de JavaScript;
- E, claro, como criar, listar, marcar e excluir tarefas com atualização instantânea na interface.

---

### ⚙️ A Stack que Vamos Usar

- **Linguagem:** Elixir (baseada em Erlang, funcional e concorrente);
- **Framework Web:** Phoenix 1.8 + LiveView 1.1;
- **Banco de Dados:** SQLite (via Ecto);
- **Estilo:** Tailwind CSS v4 + daisyUI (já integrados ao Phoenix).

### 📌 Versões Utilizadas (Importante!)

Para que o tutorial seja reprodutível, estas são as versões de referência:

| Ferramenta / Biblioteca | Versão    |
| ----------------------- | --------- |
| Erlang/OTP              | 26+       |
| Elixir                  | 1.17+     |
| Node.js                 | 18+ (LTS) |
| Phoenix (`phx_new`)     | 1.8.x     |
| Phoenix LiveView        | 1.1.x     |
| `ecto_sql`              | ~> 3.10   |
| `ecto_sqlite3`          | ~> 0.12   |

<aside>
⚠️ **Atenção especial ao Phoenix 1.8.** Muitos tutoriais e respostas antigas na internet (e em IAs!) referem-se ao Phoenix **1.7**, que usava Tailwind v3 com `tailwind.config.js` e componentes ligeiramente diferentes. O Phoenix **1.8** mudou várias dessas coisas. Este tutorial está inteiramente alinhado ao 1.8 — se algo que você encontrar por aí divergir daqui, desconfie da versão.
</aside>

---

### 🔁 Um Mesmo Problema, Dois Caminhos Funcionais

| Aspecto      | Clojure                                  | Elixir                                            |
| ------------ | ---------------------------------------- | ------------------------------------------------- |
| Paradigma    | Funcional puro (imutabilidade explícita) | Funcional concorrente (processos leves)           |
| Renderização | Frontend reativo com Reagent (React)     | LiveView (renderização no servidor em tempo real) |
| Comunicação  | API REST + JSON                          | Canal WebSocket interno (phx)                     |
| Persistência | next.jdbc + SQLite                       | Ecto + SQLite                                     |
| Reatividade  | `r/atom` (frontend)                      | Estado do socket (`assigns`)                      |

Ambos ensinam o mesmo princípio:

> **como o estado flui em uma aplicação funcional e reativa.**

---

### 🧾 Os Marcos do Git (Seu Histórico Final)

Este tutorial também é um exercício de **desenvolvimento incremental com Git**. Cada fase termina em um commit; ao final, seu `git log --oneline` deve contar esta história (do mais recente para o mais antigo):

```
Fase 8: Atualiza README com instruções de execução
Fase 7: Ajusta o tema e personaliza o visual (Tailwind/daisyUI)
Fase 6: Implementa conclusão de tarefas (toggle_complete)
Fase 5: Implementa exclusão de tarefas (delete)
Fase 4: Refatora TodoLive para usar Ecto, Repo e to_form()
Fase 3: Persistência - Configura Ecto, Repo, Migrations e Task Schema
Fase 2: Lógica em Memória - Implementa adição de tarefas
Fase 1: Prova de Vida - Substitui a rota raiz por TodoLive
Fase 0: Gera o esqueleto do Phoenix com LiveView (sem Ecto)
Fase 0: Inicializa o repositório e .gitignore
```

---

### 📚 Índice das Fases

- **⚙️ Fase 0:** Setup (Ambiente, Git e o Esqueleto do Projeto)
- **🏃 Fase 1:** "Hello World" — Prova de Vida
- **🧠 Fase 2:** Lógica em Memória
- **🧱 Fase 3:** Persistência — A Camada de Dados (Ecto, Repo, Migration e Schema)
- **🫀 Fase 4:** O "Transplante" — Conectando o LiveView ao Banco
- **🗑️ Fase 5:** Refinamento — Excluindo Tarefas
- **✅ Fase 6:** Refinamento — Concluindo Tarefas (Toggle)
- **🎨 Fase 7:** Personalizando o Design (Tailwind CSS v4 e daisyUI)
- **📄 Fase 8:** README e Entrega

---

### 💡 Um Tutorial a Duas Mãos

Assim como o tutorial em Clojure, este também é fruto de uma construção colaborativa — unindo clareza didática com profundidade técnica.

Prepare seu ambiente, abra o terminal e venha ver como **Elixir + LiveView** transforma o jeito de pensar aplicações web. 🚀

---

# ⚙️ Fase 0: Setup (Ambiente, Git e o Esqueleto do Projeto)

**Objetivo:** Preparar o ambiente, instalar as ferramentas e gerar o esqueleto do projeto. Mas antes, vamos entender o que é essa stack.

### A Stack: Phoenix LiveView

Antes de começar, é crucial entender por que o **LiveView** é uma abordagem diferente — e por que ela vem ganhando tanto destaque entre desenvolvedores acostumados a React, Vue ou Next.js.

### O Modo Tradicional (React / Next.js)

Em um modelo tradicional baseado em frameworks JavaScript, a aplicação é dividida em **duas camadas independentes**:

1. **Backend (API)** — armazena e serve dados, geralmente em **JSON**.
2. **Frontend (SPA ou SSR)** — construído em JavaScript, responsável pela interface, pelo estado e pela renderização dos componentes.

No **React puro**, o navegador recebe um HTML básico e depois baixa e executa o JavaScript que monta toda a interface (renderização no cliente). O **Next.js** otimiza isso com **SSR/SSG**, renderizando o HTML inicial no servidor — mas, após o carregamento, o React ainda assume o controle no cliente, "reidratando" a página.

Apesar de eficiente, esse modelo **mantém o estado do aplicativo no navegador**, exigindo sincronização constante com o backend via AJAX ou GraphQL. Isso significa **duas fontes de verdade** (cliente e servidor), **gerenciamento de estado complexo** e **múltiplas camadas de código** para manter tudo sincronizado.

### O Modo LiveView (Estado no Servidor)

O **Phoenix LiveView** propõe algo radicalmente diferente:

👉 **toda a lógica de estado e renderização vive no servidor.**

O navegador abre uma **conexão WebSocket** — um "túnel" bidirecional e contínuo — com o servidor Phoenix. A partir daí, toda interação do usuário (como clicar em "Adicionar Tarefa") envia apenas uma **mensagem leve** para o servidor: `"o evento 'save_task' aconteceu"`.

O **servidor Elixir** processa o evento, atualiza o estado (a lista de tarefas) e re-renderiza o HTML **no próprio servidor**. Em seguida, calcula o que mudou (o _diff_) e envia apenas os fragmentos atualizados de volta. Um **JavaScript minúsculo**, incluído automaticamente pelo LiveView, faz o "remendo" na página — sem recarregar, sem sincronizar estados, sem React Hooks, sem Redux.

### A Vantagem

- O **estado vive em um só lugar** — no servidor.
- Você escreve **quase zero JavaScript**.
- A interface é **reativa em tempo real** por padrão.
- A performance surpreende: o Elixir lida com **milhares de conexões simultâneas** graças ao modelo de concorrência leve da **BEAM VM**.

O LiveView traz a **simplicidade do desenvolvimento tradicional (HTML + servidor)** com a **interatividade do front moderno (SPA)** — sem manter duas aplicações separadas.

---

### 🧰 Passo 0.1: Instalar as Ferramentas

Precisamos de três coisas:

1. **Node.js** — o Phoenix o usa para compilar assets (CSS/JS);
2. **Erlang** — a máquina virtual (BEAM) sobre a qual o Elixir roda;
3. **Elixir** — a linguagem de programação.

**1. Node.js:** baixe e instale a versão **LTS** no [site oficial](https://nodejs.org/).

**2. Elixir e Erlang (via script oficial):** a maneira mais confiável, com controle exato das versões.

- **Linux/macOS (Bash):**

  ```bash
  # Baixa e executa o script, fixando as versões
  curl -fsSO https://elixir-lang.org/install.sh
  sh install.sh elixir@1.17.2 otp@26.2.2 installs_dir=$HOME/.elixir-install/installs

  # Adicione ao seu PATH (ex: no ~/.bashrc ou ~/.zshrc)
  # export PATH=$HOME/.elixir-install/installs/otp/26.2.2/bin:$PATH
  # export PATH=$HOME/.elixir-install/installs/elixir/1.17.2-otp-26/bin:$PATH
  ```

- **Windows (PowerShell):**

  ```powershell
  # Baixa e executa o script
  curl.exe -fsSO https://elixir-lang.org/install.bat
  .\install.bat elixir@1.17.2 otp@26.2.2

  # Adicione os diretórios ao seu PATH de Ambiente de Usuário
  # (ex: %USERPROFILE%\.elixir-install\installs\otp\26.2.2\bin)
  # (ex: %USERPROFILE%\.elixir-install\installs\elixir\1.17.2-otp-26\bin)
  ```

**Verificação:** feche e reabra o terminal, e confirme que tudo respondeu com uma versão:

```bash
elixir --version   # Elixir 1.17.x (compiled with Erlang/OTP 26)
node -v            # v18 ou superior
git --version
```

_(Se `elixir` não for encontrado, o `PATH` não foi configurado permanentemente — revise o passo acima antes de prosseguir.)_

### 🧱 Passo 0.2: Instalar o Hex e o Gerador do Phoenix

O **Mix** é a ferramenta de build do Elixir — algo como o **npm** (Node.js), o **pip** (Python) ou o **Maven** (Java). Com ele, gerenciamos dependências, rodamos tarefas, executamos testes e criamos projetos. Ele já vem instalado junto com o Elixir.

**O que é o Hex?** O **Hex** é o **gerenciador de pacotes oficial do Elixir** — o papel que o npm faz para o JavaScript. Quando usarmos bibliotecas externas (como o Ecto), é o Hex quem as baixa. Instale-o com:

```bash
mix local.hex
```

**O que é o Phoenix?** O **Phoenix** é o principal **framework web** do ecossistema Elixir — comparável ao **Django** (Python), **Rails** (Ruby) ou **Express** (Node.js), mas construído para aproveitar ao máximo a **concorrência** e o **tempo real** da BEAM VM. Ele vem com o **LiveView**, que permite construir interfaces reativas **sem JavaScript manual**.

Instale o gerador de projetos:

```bash
mix archive.install hex phx_new
```

✅ **Resumo:**

- **Mix** → ferramenta de build e tarefas (como `npm` ou `pip`);
- **Hex** → gerenciador de pacotes (como o registro do `npm`);
- **Phoenix** → framework web completo, com foco em performance e tempo real.

### 📁 Passo 0.3: O Diretório e o Git

O `Git` é nosso sistema de controle de versão. Vamos usá-lo desde o início para salvar o progresso em "checkpoints" (commits).

**1. Crie o diretório do projeto:**

```bash
mkdir elixir_todo_list
cd elixir_todo_list
```

<aside>
⚠️ **O nome da pasta importa!** O Phoenix vai derivar o nome da aplicação (`:elixir_todo_list`) e o prefixo de **todos os módulos** (`ElixirTodoList...`) do nome desta pasta. Se você usar outro nome, terá que adaptar todos os nomes de módulo do tutorial. Recomendamos usar exatamente `elixir_todo_list`.
</aside>

**2. Inicialize o Git:**

```bash
git init
git branch -m main
```

**3. Crie um `.gitignore` inicial.**

Antes de gerar qualquer código, vamos garantir que o repositório só contenha o que é realmente necessário. O `.gitignore` diz ao Git o que **não** versionar — dependências, arquivos compilados, configurações locais e **o arquivo do banco de dados** (que criaremos na Fase 3: ele é _resultado_ da aplicação, não código-fonte).

Crie o arquivo `.gitignore` (atenção à grafia: **ponto + gitignore**, sem letras faltando!) com o conteúdo:

```gitignore
/_build
/deps
/priv/static/assets
/node_modules
/assets/node_modules
*.log
/config/dev.secret.exs
.DS_Store
.vscode/

# --- Banco de Dados (SQLite, usado a partir da Fase 3) ---
*.db
*.db-shm
*.db-wal
```

### 💾 Passo 0.4: O Commit Inicial

```bash
git add .
git commit -m "Fase 0: Inicializa o repositório e .gitignore"
```

<aside>
💡 **Se o Git reclamar de identidade** (`Please tell me who you are`), configure uma vez:

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"
```

e repita o commit.

</aside>

### 🧩 Passo 0.5: Gerar o Esqueleto do Projeto

Com o Mix e o gerador Phoenix instalados, vamos criar a estrutura da aplicação **dentro do diretório atual**:

```bash
mix phx.new . --no-ecto
```

**🔍 Analisando o comando:**

- `.` → o projeto será criado **no diretório atual**. (Se quiséssemos uma pasta nova, seria `mix phx.new minha_app`.)
- `--no-ecto` → evita instalar o **Ecto** (a camada de banco de dados) por enquanto. Vamos **adiar essa parte** para a Fase 3, pois queremos primeiro entender o funcionamento **"em memória"** do LiveView.

<aside>
💡 E o LiveView? Desde o Phoenix 1.7, o **LiveView já vem incluído por padrão** — não é preciso nenhuma flag para ativá-lo (existe apenas `--no-live` para quem quiser removê-lo, o que não é o nosso caso).
</aside>

**💡 Comparando com outras stacks:**

- No **Django**: `django-admin startproject nome_do_projeto`.
- No **Rails**: `rails new nome_do_projeto`.
- No **Node.js**: `npx create-next-app` ou `express-generator`.

Assim como nesses casos, o Phoenix gera **um esqueleto completo** de aplicação web, com pastas organizadas para templates, rotas, assets e (opcionalmente) banco de dados.

**⚠️ Atenção às perguntas do gerador!** Como a pasta não está vazia, o Phoenix fará algumas perguntas:

1. `The directory ... already exists. Are you sure you want to continue?` → responda **Y**.
2. `.gitignore already exists, overwrite?` → responda **Y** (sim!). O `.gitignore` do Phoenix é mais completo que o nosso — vamos aceitá-lo e **recolocar nossas regras do banco em seguida**.
3. `Fetch and install dependencies? [Yn]` → responda **Y**.

O Phoenix irá baixar todas as **dependências Elixir** (pelo Hex) e configurar os **assets** (Tailwind/esbuild), deixando o projeto pronto para rodar.

### ✂️ Passo 0.6: Reaplicar as Regras do Banco no `.gitignore`

Como aceitamos o `.gitignore` do Phoenix (que não conhece nosso futuro banco SQLite), abra o `.gitignore` e **acrescente ao final**:

```gitignore
# --- Banco de Dados (SQLite, usado a partir da Fase 3) ---
*.db
*.db-shm
*.db-wal
```

<aside>
⚠️ **Por que os três padrões?** O SQLite, no modo padrão do Ecto, cria três arquivos: o banco em si (`.db`) e dois auxiliares de escrita (`.db-shm` e `.db-wal` — este último pode crescer para centenas de KB!). Nenhum deles deve ir para o GitHub. Esquecer isso é um dos erros mais comuns — e mais feios — em repositórios de alunos.
</aside>

### 💾 Passo 0.7: O Commit do Esqueleto

Agora que temos a estrutura gerada (e o `.gitignore` completo), vamos versionar o ponto de partida:

```bash
git add .
git commit -m "Fase 0: Gera o esqueleto do Phoenix com LiveView (sem Ecto)"
```

Esse commit marca o início oficial do projeto: um esqueleto Phoenix totalmente funcional, com LiveView configurado, mas sem banco de dados — perfeito para explorar a lógica do LiveView em tempo real.

---

**Fim da Fase 0!** 🏁

---

# 🏃 Fase 1: "Hello World" — Prova de Vida

**Objetivo:** ligar o servidor Phoenix e verificar se tudo está funcionando — o primeiro "sinal de vida" do projeto. Em seguida, substituir a página padrão pelo **nosso** LiveView.

### 🔌 Passo 1.1: Ligar o Servidor

```bash
mix phx.server
```

O servidor será iniciado e exibirá mensagens no terminal. Na primeira execução, o projeto será compilado — pode demorar um pouco.

Abra o navegador e visite: 👉 **http://localhost:4000**

Se tudo deu certo, você verá a **página de boas-vindas do Phoenix** (com o logo e links para a documentação).

<aside>
⚠️ **Aviso comum no Linux:** se aparecer uma mensagem mencionando **inotify-tools**, o *live reload* (atualização automática do navegador quando os arquivos mudam) não está funcionando. Pare o servidor (`Ctrl+C` duas vezes) e instale:

```bash
sudo apt-get install inotify-tools
```

Depois rode `mix phx.server` novamente.

</aside>

<aside>
💡 **Deixe este terminal rodando.** Diferente do tutorial de Clojure (que precisava de dois servidores), aqui **um único processo** cuida de tudo: backend, frontend e a compilação dos assets. Abra um **segundo terminal** para os comandos de Git e Mix daqui em diante.
</aside>

### 🧭 Passo 1.2: Alterar o Roteador

O Phoenix está exibindo a página padrão (controlada pelo `PageController`). Vamos trocá-la pelo nosso próprio **LiveView**, que será o coração da aplicação.

Abra o arquivo:

```
lib/elixir_todo_list_web/router.ex
```

Encontre o escopo principal e substitua a rota raiz `/`.

_De:_

```elixir
scope "/", ElixirTodoListWeb do
  pipe_through :browser

  get "/", PageController, :home
end
```

_Para:_

```elixir
scope "/", ElixirTodoListWeb do
  pipe_through :browser

  live "/", TodoLive, :index
end
```

A diferença está na palavra-chave **`live`**:

- `get` → responde com uma página renderizada **uma única vez** por um controller tradicional.
- `live` → mantém uma **conexão em tempo real** (WebSocket), capaz de atualizar o conteúdo dinamicamente.

### 💥 Passo 1.3: O Primeiro Erro (e por que ele é bom)

Salve o arquivo e recarregue a página no navegador. Você verá um erro como:

```
** (UndefinedFunctionError) ... ElixirTodoListWeb.TodoLive ... is undefined
   (module ElixirTodoListWeb.TodoLive is not available)
```

Excelente! 🎉 Isso significa que o Phoenix **entendeu a nova rota**, mas não encontrou o módulo `TodoLive`. Ou seja: a configuração está correta — só falta criarmos o módulo. Esse tipo de erro é um ótimo sinal no Phoenix: o compilador está te guiando sobre o que precisa existir.

### 🧱 Passo 1.4: Criar o LiveView

<aside>
⚠️ **Atenção — nomes de módulos no Elixir**

O Elixir segue uma convenção rígida: o **nome dos módulos** deve corresponder à **estrutura de diretórios** do projeto. Como nosso projeto foi criado na pasta `elixir_todo_list`, o prefixo dos módulos é `ElixirTodoList` (e, para a camada web, `ElixirTodoListWeb`).

| Diretório                        | Arquivo        | Módulo                       |
| -------------------------------- | -------------- | ---------------------------- |
| `lib/elixir_todo_list_web/live/` | `todo_live.ex` | `ElixirTodoListWeb.TodoLive` |

Se o nome for diferente (por exemplo, `TodoListWeb.TodoLive`), o compilador **não encontrará o módulo** e você verá exatamente o erro do passo anterior — só que dessa vez sem solução à vista. Em resumo: **use o nome do diretório raiz do projeto como base** para os módulos.

</aside>

Crie o arquivo:

```
lib/elixir_todo_list_web/live/todo_live.ex
```

E adicione o seguinte código:

```elixir
defmodule ElixirTodoListWeb.TodoLive do
  use ElixirTodoListWeb, :live_view

  # mount/3 é o "construtor" do LiveView — chamado quando a página é carregada
  @impl true
  def mount(_params, _session, socket) do
    {:ok, socket}
  end

  # render/1 define o HTML que será exibido
  @impl true
  def render(assigns) do
    ~H"""
    <div class="p-12">
      <h1 class="text-3xl font-bold">Meu Todo List (Hello LiveView!)</h1>
    </div>
    """
  end
end
```

O que está acontecendo aqui:

- `use ElixirTodoListWeb, :live_view` → diz ao Phoenix que este módulo é um **LiveView** (e já traz, de brinde, os componentes de UI e helpers que usaremos nas próximas fases).
- `mount/3` → chamado quando a página é carregada; é o ponto de inicialização do "estado".
- `render/1` → retorna o HTML a ser exibido.
- `~H""" ... """` → é o **HEEx** (HTML + Embedded Elixir), uma versão do HTML com suporte a expressões Elixir — similar ao JSX do React, mas processado **no servidor** e **verificado em tempo de compilação**.

Salve o arquivo e observe: o servidor recompila automaticamente, o erro desaparece e o navegador atualiza sozinho mostrando:

> **Meu Todo List (Hello LiveView!)**

Isso confirma que o LiveView está funcionando: você acabou de renderizar sua primeira página dinâmica em tempo real, **sem escrever uma linha de JavaScript**.

### 💾 Passo 1.5: Commit

No **segundo terminal** (deixe o servidor rodando no primeiro):

```bash
git add .
git commit -m "Fase 1: Prova de Vida - Substitui a rota raiz por TodoLive"
```

Pronto! 🎯 Nosso projeto Phoenix com LiveView está oficialmente "vivo".

---

## 🧠 Pausa Didática — Entendendo `use`, `@impl true`, `mount` e `render`

### 1. O que faz o `use`

A linha:

```elixir
use ElixirTodoListWeb, :live_view
```

é uma forma especial de **trazer comportamentos e configurações** para o módulo atual — uma **injeção de código** feita durante a compilação.

💡 **Em termos simples:** o `use` importa automaticamente todas as funções, macros e configurações necessárias para que o módulo se comporte como um LiveView.

| Linguagem  | Equivalente aproximado              | O que faz                                      |
| ---------- | ----------------------------------- | ---------------------------------------------- |
| **Java**   | `extends BaseView`                  | Herda métodos e atributos de uma classe base   |
| **Python** | `class MyView(BaseView):`           | Cria uma subclasse com comportamento herdado   |
| **Elixir** | `use ElixirTodoListWeb, :live_view` | Injeta código e comportamentos no módulo atual |

➡️ O `use` **não é herança**, mas **geração de código**: ele deixa o módulo pronto para o ecossistema Phoenix. No nosso projeto, ele também já **importa os componentes de UI** (`<.form>`, `<.input>`, `<.button>`) e disponibiliza o alias `Layouts` — vamos usá-los a partir da Fase 4.

### 2. O papel do `@impl true`

O marcador `@impl true` vem antes de funções que **implementam callbacks** de um **comportamento** (_behaviour_). Um _behaviour_ em Elixir é parecido com uma **interface** em linguagens orientadas a objetos: ele define **quais funções um módulo deve implementar**.

O LiveView espera que cada módulo tenha, no mínimo, `mount/3` e `render/1`. Quando você escreve `@impl true`, está dizendo ao compilador: _"esta função é a implementação esperada pelo comportamento do LiveView"_.

| Linguagem  | Anotação equivalente | Finalidade                                                     |
| ---------- | -------------------- | -------------------------------------------------------------- |
| **Java**   | `@Override`          | Indica que o método sobrescreve outro da interface/classe pai  |
| **Elixir** | `@impl true`         | Indica que a função implementa um callback de um comportamento |

Isso ajuda o compilador a verificar se o nome da função, a quantidade de parâmetros e o contrato do framework estão corretos.

### 3. Entendendo `mount/3` e `render/1`

**`mount/3`** — chamado quando o LiveView é carregado pela primeira vez. É como o **construtor** de uma classe: inicializa o estado (socket) e prepara dados.

```elixir
@impl true
def mount(_params, _session, socket) do
  {:ok, assign(socket, tarefas: [])}
end
```

**`render/1`** — gera o HTML da página a partir das variáveis (`assigns`):

```elixir
@impl true
def render(assigns) do
  ~H"""
  <div>
    <h1>Minhas Tarefas</h1>
    <ul>
      <li :for={tarefa <- @tarefas}>{tarefa}</li>
    </ul>
  </div>
  """
end
```

### 4. O paralelo completo

| Conceito     | Em Elixir (Phoenix)               | Analogia em OO            | Finalidade                  |
| ------------ | --------------------------------- | ------------------------- | --------------------------- |
| `use`        | Injeta código e macros            | `extends` + `import`      | Reutilização de lógica base |
| `@impl true` | Declara implementação de callback | `@Override`               | Validação e clareza         |
| `mount/3`    | Inicializa o LiveView             | Construtor da classe      | Configura o estado inicial  |
| `render/1`   | Retorna o HTML dinâmico           | `render()` / `toString()` | Define a interface visual   |

---

**Fim da Fase 1!** 🏁

---

# 🧠 Fase 2: Lógica em Memória

**Objetivo:** construir a lógica que permite adicionar tarefas, **sem ainda usar banco de dados**.

Nesta fase, o foco é compreender **como o Phoenix LiveView mantém o estado da interface em tempo real**, usando apenas o **socket** — o elo entre cliente e servidor.

### 🧩 O que é o "estado" no LiveView?

No modelo LiveView, **o estado da aplicação vive no servidor**. Sempre que o usuário interage com a interface (digita, clica, envia um formulário), o navegador envia um pequeno evento via WebSocket. O servidor processa o evento, **atualiza o estado** e devolve o HTML atualizado.

Esse "estado" é armazenado no **socket**, uma estrutura que representa a sessão daquele usuário. Tudo o que a tela precisa saber — tarefas, campos de formulário, filtros — é guardado ali.

```
Socket = "memória viva" do LiveView
assign(socket, chave: valor)  ➜  grava ou atualiza o estado
@chave                        ➜  acessa o valor no render
```

> 💡 **Conexão com o tutorial de Clojure:** o socket cumpre aqui o papel que o `r/atom` cumpria no Reagent — a "caixa" observada cuja mudança redesenha a interface. A diferença: lá a caixa vivia **no navegador**; aqui, ela vive **no servidor**.

## ⚙️ Passo 2.1: O Estado Inicial (`mount/3`)

Quando o usuário abre a página, o LiveView chama `mount/3`. É aqui que criamos o estado inicial — uma mini "memória RAM" para aquele cliente.

Abra o arquivo:

```
lib/elixir_todo_list_web/live/todo_live.ex
```

e substitua o `mount/3` atual por:

```elixir
  # @impl true → indicamos que esta função faz parte do comportamento LiveView
  @impl true
  def mount(_params, _session, socket) do
    # Nossa "memória" inicial: duas tarefas de exemplo
    tasks = [
      %{id: 1, title: "Comprar leite", completed: false},
      %{id: 2, title: "Aprender LiveView", completed: true}
    ]

    # assign/2 coloca dados no socket (nosso estado de interface)
    socket =
      assign(socket,
        tasks: tasks,
        new_task_title: "" # o campo de texto começa vazio
      )

    # {:ok, socket} → retorna o estado inicial ao LiveView
    {:ok, socket}
  end
```

## 🎨 Passo 2.2: Mostrando o Estado (`render/1`)

A função `render/1` é o "desenhista" da interface: recebe os dados do socket (via `assigns`) e devolve o HTML dinâmico.

Substitua o `render/1` por:

```elixir
  @impl true
  def render(assigns) do
    ~H"""
    <div class="w-full max-w-lg mx-auto mt-12 p-6 bg-white rounded-lg shadow-md">
      <h1 class="text-3xl font-bold mb-6 text-center text-gray-800">
        Minha Lista de Tarefas
      </h1>

      <%!-- FORMULÁRIO DE ENTRADA --%>
      <form phx-submit="save_task" phx-change="update_form" class="flex gap-2 mb-6">
        <input
          type="text"
          name="title"
          value={@new_task_title}
          placeholder="O que precisa ser feito?"
          class="flex-grow p-2 border rounded"
          autofocus
        />
        <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Adicionar
        </button>
      </form>

      <%!-- LISTA DE TAREFAS --%>
      <div class="mt-8">
        <ul id="task-list">
          <li :for={task <- @tasks} class="flex justify-between items-center p-3 border-b">
            <span class={if task.completed, do: "line-through text-gray-500", else: "text-gray-900"}>
              {task.title}
            </span>
          </li>
        </ul>
      </div>
    </div>
    """
  end
```

### 🧭 Entendendo os atributos "mágicos"

| Atributo                   | Função                                                        |
| -------------------------- | ------------------------------------------------------------- |
| `phx-submit="save_task"`   | Dispara o evento `"save_task"` quando o formulário é enviado. |
| `phx-change="update_form"` | Dispara o evento `"update_form"` a cada tecla digitada.       |
| `value={@new_task_title}`  | Liga o campo de texto ao estado do socket.                    |
| `:for={task <- @tasks}`    | Repete o `<li>` para cada tarefa (o "for" do HEEx).           |

## ⚠️ Passo 2.3: O "Aha!" — o texto que desaparece

Salve o arquivo e recarregue a página. Você verá o formulário e as duas tarefas de exemplo.

Agora **digite algo no campo**. Percebeu? **O texto desaparece a cada letra!**

Isso acontece porque o evento `"update_form"` é disparado, mas **ainda não existe uma função para tratá-lo** (`handle_event`). O processo LiveView falha, o supervisor o **reinicia automaticamente** (é assim que a BEAM lida com erros!), e o `mount/3` roda de novo — limpando o campo. Dê uma olhada no terminal do servidor: o erro está registrado lá.

Essa é uma lição dupla: (1) todo evento `phx-*` precisa de um `handle_event` correspondente; (2) quando um processo LiveView "morre", ele renasce do estado inicial.

## 🧩 Passo 2.4: Tratando a Digitação (`update_form`)

Vamos criar a função que captura o evento `"update_form"`. Adicione **entre o `mount/3` e o `render/1`**:

```elixir
  # Captura o evento de digitação no campo
  @impl true
  def handle_event("update_form", %{"title" => new_title}, socket) do
    # Atualiza o valor do campo no estado
    socket = assign(socket, new_task_title: new_title)
    {:noreply, socket} # retorna o socket atualizado, sem recarregar a página
  end
```

Salve e teste: agora o texto digitado **permanece**. O estado está sendo atualizado **a cada tecla** — e o LiveView reflete isso no HTML.

## 🧱 Passo 2.5: Tratando o Envio (`save_task`)

O próximo passo é realmente **adicionar a nova tarefa** à lista quando o usuário clicar em "Adicionar". Adicione esta função **logo abaixo da anterior**:

```elixir
  # Captura o evento de envio do formulário
  @impl true
  def handle_event("save_task", %{"title" => title}, socket) do
    if String.trim(title) != "" do
      # Cria uma nova tarefa "em memória"
      new_task = %{
        id: System.unique_integer([:positive]),
        title: title,
        completed: false
      }

      # Atualiza a lista de tarefas e limpa o campo
      socket =
        socket
        |> update(:tasks, fn tasks -> tasks ++ [new_task] end)
        |> assign(:new_task_title, "")

      {:noreply, socket}
    else
      # Ignora caso o campo esteja vazio
      {:noreply, socket}
    end
  end
```

| Função                    | Explicação                                                                     |
| ------------------------- | ------------------------------------------------------------------------------ |
| `System.unique_integer/1` | Gera um ID único (suficiente para uso "em memória").                           |
| `update/3`                | Atualiza um valor existente no socket aplicando uma função (a lista `:tasks`). |
| `assign/3`                | Redefine `new_task_title` para limpar o input.                                 |

## 🎉 Resultado

Você tem um **Todo List funcional**, mesmo sem banco de dados! Adicione algumas tarefas e veja a lista crescer instantaneamente.

**O teste da verdade:** agora **recarregue a página (F5)**. As tarefas que você adicionou sumiram — só as duas de exemplo voltaram. E se você reiniciar o servidor, o mesmo acontece.

Isso é esperado: as tarefas viviam **apenas na memória daquele socket**. Cada F5 abre uma conexão nova, e o `mount/3` recomeça do zero. Você acabou de ganhar a **motivação** para a Fase 3: persistência de verdade.

O que aprendemos — o **coração do LiveView**:

- O **estado** mora no **socket**;
- Cada **evento** é tratado por um `handle_event/3`;
- O **`render/1`** reflete o estado atual em HTML, sem recarregar a página.

### 💾 Passo 2.6: Commit

```bash
git add .
git commit -m "Fase 2: Lógica em Memória - Implementa adição de tarefas"
```

---

## 🧠 Pausa Didática — Entendendo o Estilo Elixir

Antes de continuar, vamos fazer uma pausa estratégica para compreender **a estrutura e o estilo da linguagem** que aparecem no nosso código. Mesmo com poucas linhas, o `todo_live.ex` já demonstra vários conceitos centrais: módulos, funções, imutabilidade, pattern matching e o pipe.

Este é o estado atual do nosso arquivo (confira se o seu está igual):

```elixir
defmodule ElixirTodoListWeb.TodoLive do
  use ElixirTodoListWeb, :live_view

  @impl true
  def mount(_params, _session, socket) do
    tasks = [
      %{id: 1, title: "Comprar leite", completed: false},
      %{id: 2, title: "Aprender LiveView", completed: true}
    ]

    socket =
      assign(socket,
        tasks: tasks,
        new_task_title: ""
      )

    {:ok, socket}
  end

  @impl true
  def handle_event("update_form", %{"title" => new_title}, socket) do
    socket = assign(socket, new_task_title: new_title)
    {:noreply, socket}
  end

  @impl true
  def handle_event("save_task", %{"title" => title}, socket) do
    if String.trim(title) != "" do
      new_task = %{
        id: System.unique_integer([:positive]),
        title: title,
        completed: false
      }

      socket =
        socket
        |> update(:tasks, fn tasks -> tasks ++ [new_task] end)
        |> assign(:new_task_title, "")

      {:noreply, socket}
    else
      {:noreply, socket}
    end
  end

  @impl true
  def render(assigns) do
    ~H"""
    ... (o HTML completo do Passo 2.2) ...
    """
  end
end
```

### 1️⃣ Módulos — a "caixa" do código

Em Elixir, tudo vive dentro de um **módulo** (`defmodule`). Um módulo é como uma caixa que organiza funções relacionadas — parecido com uma _classe_, mas com uma diferença fundamental: 👉 **módulos não possuem estado interno nem herança**. Eles apenas **agrupam funções**. O estado vive em estruturas como o **socket** ou em **processos** — nunca no módulo em si.

### 2️⃣ Funções e Aridade

Funções são definidas com `def` (públicas) ou `defp` (privadas). O número após a barra é a **aridade** — quantos parâmetros a função recebe:

- `mount/3` → 3 parâmetros;
- `render/1` → 1 parâmetro;
- `handle_event/3` → 3 parâmetros.

Em Elixir, a aridade **faz parte do nome da função**: `handle_event/2` e `handle_event/3` são funções _diferentes_, e não sobrecargas como em Java ou C#.

### 3️⃣ Pattern Matching — a escolha automática

Observe:

```elixir
def handle_event("update_form", %{"title" => new_title}, socket) do ... end
def handle_event("save_task",   %{"title" => title},     socket) do ... end
```

Temos **duas funções com o mesmo nome e aridade**, e o Elixir **decide qual chamar** pelo **padrão dos argumentos**: se o primeiro argumento for `"update_form"`, executa a primeira; se for `"save_task"`, a segunda. Isso é o **pattern matching** — um dos pilares do paradigma funcional.

Em Python, escreveríamos:

```python
def handle_event(event_name, payload, socket):
    if event_name == "update_form":
        ...
    elif event_name == "save_task":
        ...
```

Em Elixir, **a própria definição da função já é o "if"**.

### 4️⃣ Tuplas — a maneira Elixir de retornar

Em vez de retornar valores "crus", o Elixir usa **tuplas etiquetadas**:

```elixir
{:ok, socket}
{:noreply, socket}
{:error, "algo deu errado"}
```

A primeira posição é sempre um **átomo** (`:ok`, `:noreply`, `:error`) descrevendo o status. Essa convenção vem do Erlang e facilita o controle de fluxo entre processos.

### 5️⃣ O Socket — nosso "estado vivo"

```elixir
socket = assign(socket, tasks: tasks, new_task_title: "")
```

- O `socket` é a "caixa de estado" daquela sessão;
- `assign` **não muta** a caixa: cria uma **nova versão** dela (imutabilidade!);
- Cada atualização do socket dispara uma **nova renderização** automática.

### 6️⃣ O Operador Pipe (`|>`) — elegância funcional

```elixir
socket
|> update(:tasks, fn tasks -> tasks ++ [new_task] end)
|> assign(:new_task_title, "")
```

Lê-se: _"pegue o socket, atualize as tarefas e depois limpe o campo de texto"_. O pipe passa o resultado de cada linha como **primeiro argumento** da próxima, eliminando variáveis intermediárias — como uma receita passo a passo.

### 📘 Recapitulando

| Conceito            | Significado                                 | Analogia                 |
| ------------------- | ------------------------------------------- | ------------------------ |
| `defmodule`         | Agrupa funções relacionadas                 | Classe sem estado        |
| `def` / `defp`      | Funções públicas / privadas                 | Métodos                  |
| Aridade             | Nº de parâmetros (parte do nome)            | —                        |
| Pattern Matching    | Escolhe a função pelo padrão dos argumentos | Substitui `if`/`switch`  |
| Tuplas `{:ok, ...}` | Retornos estruturados                       | `return (status, valor)` |
| `\|>` (pipe)        | Encadeia transformações                     | Fluent interface         |
| `socket`            | Estado imutável da interface                | Store/State no React     |

---

**Fim da Fase 2!** 🏁

Agora estamos prontos para conectar nossa lógica em memória a um **banco de dados real com Ecto**.

---

# 🧱 Fase 3: Persistência — A Camada de Dados (Ecto, Repo, Migration e Schema)

Na fase anterior, nossa aplicação mantinha as tarefas apenas **em memória**. Agora daremos um passo importante: **armazenar os dados de forma permanente** usando o **Ecto**, a biblioteca de persistência do Elixir.

Optamos por **não incluir o Ecto desde o início** (`--no-ecto`) para que você entendesse primeiro a lógica interna do LiveView. Agora veremos **como adicionar novas dependências** a um projeto existente e configurar o banco de dados real.

Nesta fase, montamos **apenas a camada de dados** (dependências, Repo, migration e schema) e a testamos isoladamente. O "transplante" — trocar o coração em memória do `TodoLive` pelo banco — fica para a **Fase 4**.

### ⚙️ Passo 3.1: Adicionar as Dependências do Ecto

Pare o servidor (`Ctrl+C` duas vezes) e abra o arquivo `mix.exs`, o equivalente ao `package.json` (JavaScript) ou `requirements.txt` (Python). É nele que declaramos as **dependências do projeto**, dentro da função `defp deps do`.

<aside>
⚠️ **NÃO substitua a lista de dependências!** O `phx.new` já gerou uma lista grande (phoenix, phoenix_html, live_view, tailwind, esbuild, bandit e mais uma dúzia) — **todas são necessárias**. Nossa tarefa é apenas **acrescentar quatro linhas** a essa lista. Substituir a lista inteira por uma menor quebraria o projeto por completo.
</aside>

**Ação:** localize `defp deps do` no `mix.exs` e **adicione** estas quatro linhas em qualquer ponto da lista (por exemplo, logo após a linha do `{:phoenix_live_view, ...}`), mantendo tudo o que já existe:

```elixir
  defp deps do
    [
      {:phoenix, "~> 1.8.1"},
      # ... (todas as dependências que o phx.new gerou — NÃO apague nada!) ...

      # --- ADICIONE ESTAS 4 LINHAS (suporte ao Ecto) ---
      {:ecto, "~> 3.11"},
      {:phoenix_ecto, "~> 4.4"},
      {:ecto_sql, "~> 3.10"},
      {:ecto_sqlite3, "~> 0.12"}, # SQLite: banco leve, baseado em arquivo
      # --------------------------------------------------

      # ... (o restante das dependências geradas) ...
    ]
  end
```

O que cada uma faz:

| Dependência    | Papel                                                                           |
| -------------- | ------------------------------------------------------------------------------- |
| `ecto`         | O núcleo: schemas, changesets e queries.                                        |
| `ecto_sql`     | A camada SQL do Ecto (migrations, adaptadores).                                 |
| `ecto_sqlite3` | O "driver" específico do SQLite.                                                |
| `phoenix_ecto` | A cola entre o Phoenix e o Ecto (ex: integração de changesets com formulários). |

Em seguida, baixe as dependências:

```bash
mix deps.get
```

### 🧩 Passo 3.2: Configurar o "Repo" — o Agente do Banco de Dados

O **Repo** (de _repository_) é o módulo que representa a **conexão com o banco**. É como o `settings.py` do Django ou o `database.yml` do Rails: ele sabe **onde está o banco e como acessá-lo**.

**Ação 1:** crie o arquivo `lib/elixir_todo_list/repo.ex`:

```elixir
defmodule ElixirTodoList.Repo do
  use Ecto.Repo,
    otp_app: :elixir_todo_list,
    adapter: Ecto.Adapters.SQLite3
end
```

**Ação 2:** agora precisamos **supervisionar** o Repo — garantir que ele seja iniciado (e reiniciado, se cair) junto com a aplicação. Abra `lib/elixir_todo_list/application.ex` e adicione o Repo **no início** da lista de processos supervisionados:

```elixir
    children = [
      ElixirTodoList.Repo, # 👈 ADICIONE ESTA LINHA (antes dos demais)
      ElixirTodoListWeb.Telemetry,
      {DNSCluster, query: Application.get_env(:elixir_todo_list, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: ElixirTodoList.PubSub},
      # ...
      ElixirTodoListWeb.Endpoint
    ]
```

<aside>
💡 Essa lista `children` é a **árvore de supervisão** — um dos superpoderes do Elixir. Cada item é um processo que a aplicação inicia e vigia. Se o Repo travar, o supervisor o reinicia automaticamente. É o mesmo mecanismo que "ressuscitou" nosso LiveView na Fase 2!
</aside>

**Ação 3:** por fim, configure o Repo no arquivo `config/config.exs`. Adicione (por exemplo, logo após a linha `import Config` no topo):

```elixir
config :elixir_todo_list, ElixirTodoList.Repo,
  database: "elixir_todo_list.db",
  priv: "priv/repo"

config :elixir_todo_list, ecto_repos: [ElixirTodoList.Repo]
```

Entendendo as opções:

- `database:` → o **arquivo** onde o SQLite salvará tudo. Com esse valor, ele será criado na **raiz do projeto** (`elixir_todo_list.db`).
- `priv:` → onde ficam os arquivos de apoio do Repo — em especial, as **migrations** (`priv/repo/migrations/`). _Atenção: isso não muda o local do banco!_
- `ecto_repos:` → informa às tarefas do Mix (`mix ecto.create`, `mix ecto.migrate`) quais Repos existem.

<aside>
💡 Lembra do `.gitignore` da Fase 0? As regras `*.db`, `*.db-shm` e `*.db-wal` foram escritas exatamente para este momento: o banco (e seus arquivos auxiliares de escrita) vão aparecer na raiz do projeto e **não devem** ser versionados.
</aside>

### 🏗️ Passo 3.3: Criar o Banco de Dados

O banco ainda não existe. Crie-o com:

```bash
mix ecto.create
```

**Resultado Esperado:**

```
The database for ElixirTodoList.Repo has been created
```

Olhe a raiz do projeto: o arquivo `elixir_todo_list.db` apareceu. (E rode `git status` para confirmar que ele **não** aparece para o Git — obrigado, `.gitignore`!)

### 🧬 Passo 3.4: Migrations — a "Planta Baixa" do Banco

Em praticamente todos os frameworks modernos (Django, Rails, Laravel), usamos **migrations** para versionar e aplicar mudanças no banco. Cada migration é um pequeno "passo evolutivo": criar uma tabela, adicionar uma coluna, etc.

**Ação 1:** gere a migration da nossa tabela de tarefas:

```bash
mix ecto.gen.migration create_tasks_table
```

Isso cria um arquivo dentro de `priv/repo/migrations/` (o nome começa com um _timestamp_ — é assim que o Ecto sabe a ordem de aplicação).

**Ação 2:** abra o arquivo gerado e complete a função `change`:

```elixir
defmodule ElixirTodoList.Repo.Migrations.CreateTasksTable do
  use Ecto.Migration

  def change do
    create table(:tasks) do
      add :title, :string
      add :completed, :boolean, default: false

      timestamps() # Adiciona as colunas inserted_at e updated_at
    end
  end
end
```

**Ação 3:** aplique a migration:

```bash
mix ecto.migrate
```

**Saída esperada:**

```
[info] == Running ... ElixirTodoList.Repo.Migrations.CreateTasksTable.change/0 forward
[info] create table tasks
[info] == Migrated ... in 0.0s
```

### 📘 Passo 3.5: Conceitos-Chave — Schema, Changeset e Form

Para conectar o código à tabela recém-criada, precisamos de três peças:

| Conceito        | O que é                                                                  | Analogia                                        |
| --------------- | ------------------------------------------------------------------------ | ----------------------------------------------- |
| **Schema**      | Define a estrutura da tabela e cria uma struct `%Task{}` correspondente. | O "model" do Django ou o ActiveRecord do Rails. |
| **Changeset**   | Um conjunto de regras para validar e transformar dados antes de salvar.  | O `ModelForm` do Django.                        |
| **`to_form/1`** | Converte o changeset para o formato que o LiveView usa no `<.form>`.     | Um _form object_ no MVC.                        |

### 🧩 Passo 3.6: Criar o Schema `Task`

Crie o arquivo `lib/elixir_todo_list/task.ex`:

```elixir
defmodule ElixirTodoList.Task do
  use Ecto.Schema
  import Ecto.Changeset

  # "schema" espelha a tabela "tasks" no banco
  schema "tasks" do
    field :title, :string
    field :completed, :boolean, default: false
    timestamps(type: :utc_datetime)
  end

  # Define como validar os dados antes de salvar
  def changeset(task_struct, attrs) do
    task_struct
    |> cast(attrs, [:title, :completed])
    |> validate_required([:title])
  end
end
```

- `cast/3` → filtra os dados de entrada, aceitando **apenas** os campos listados (`:title`, `:completed`) — proteção contra dados indesejados;
- `validate_required/2` → garante que `:title` não está vazio. É esta linha que fará o formulário exibir _"can't be blank"_ na Fase 4.

### 🧪 Passo 3.7: Testando a Camada de Dados no IEx (sem o LiveView!)

Assim como fizemos no REPL do Clojure, vamos **provar** que a camada de dados funciona **antes** de conectá-la à interface. A versão Elixir do REPL é o **IEx** (Interactive Elixir), e podemos iniciá-lo **com o projeto carregado**:

```bash
iex -S mix
```

No prompt `iex(1)>`, experimente:

```elixir
# Atalhos para digitar menos
iex> alias ElixirTodoList.{Repo, Task}

# 1. O banco está vazio?
iex> Repo.all(Task)
[]

# 2. Crie uma tarefa (validando com o changeset)
iex> %Task{} |> Task.changeset(%{title: "Testar o IEx"}) |> Repo.insert()
{:ok, %ElixirTodoList.Task{id: 1, title: "Testar o IEx", completed: false, ...}}

# 3. E uma inválida? (sem título)
iex> %Task{} |> Task.changeset(%{}) |> Repo.insert()
{:error, #Ecto.Changeset<..., errors: [title: {"can't be blank", ...}], valid?: false>}

# 4. Confira a lista
iex> Repo.all(Task)
[%ElixirTodoList.Task{id: 1, title: "Testar o IEx", ...}]
```

**Momento "Aha!":** repare nas tuplas `{:ok, ...}` e `{:error, changeset}` — são exatamente os dois casos que trataremos com `case` no LiveView, na próxima fase. E a tarefa inválida **não foi salva**: o changeset barrou antes de chegar ao banco.

Saia do IEx com `Ctrl+C` duas vezes.

### 💾 Passo 3.8: Commit (Camada de Dados)

```bash
git add .
git commit -m "Fase 3: Persistência - Configura Ecto, Repo, Migrations e Task Schema"
```

---

**Fim da Fase 3!** 🏁

Agora temos a estrutura completa:

- **O banco de dados** criado e versionado por migrations;
- **O `Repo`** gerenciando conexões e consultas (supervisionado!);
- **O schema `Task`** refletindo nossa tabela, com validação via changeset — tudo testado no IEx.

Falta o passo mais gratificante: trocar o "coração" em memória do `TodoLive` por esse novo, persistente.

---

# 🫀 Fase 4: O "Transplante" — Conectando o LiveView ao Banco

Já temos o banco criado, o schema configurado e o `Repo` operacional (Fase 3). Chegou o momento de **conectar tudo ao nosso LiveView**.

Chamamos esta etapa de "transplante" porque substituímos o coração antigo (estado em memória) por um novo (persistência real) — **sem mudar o corpo** (a estrutura mount/eventos/render permanece a mesma).

### 🔍 Visão Geral: o que vai mudar?

**Antes**, nossa aplicação:

- Mantinha as tarefas apenas no **socket** (memória);
- Cada F5 apagava tudo;
- O formulário era um `<form>` "cru", com o estado do campo gerenciado manualmente (`update_form`).

**Agora**:

- O **`Repo`** vira a ponte entre o LiveView e o banco;
- O **schema `Task`** substitui os mapas manuais;
- O **changeset + `to_form/1`** cuidam da validação e da integração com o formulário;
- E as mensagens de sucesso aparecerão via **flash**.

### 1️⃣ Passo 4.1: O Setup do Módulo (aliases)

Abra `lib/elixir_todo_list_web/live/todo_live.ex` e ajuste o **topo** do módulo:

```elixir
defmodule ElixirTodoListWeb.TodoLive do
  use ElixirTodoListWeb, :live_view

  # Atalhos (aliases) para não digitar o nome completo toda hora
  alias ElixirTodoList.Repo
  alias ElixirTodoList.Task
```

- `alias` permite escrever `Repo.all(...)` em vez de `ElixirTodoList.Repo.all(...)`.

<aside>
💡 **E os componentes de UI (`<.form>`, `<.input>`, `<.button>`)?** Você **não** precisa importar nada: o `use ElixirTodoListWeb, :live_view` (lá do topo) já importa o `CoreComponents` e disponibiliza o alias `Layouts` para todos os LiveViews. É uma das "injeções" que a Pausa Didática da Fase 1 explicou.
</aside>

### 2️⃣ Passo 4.2: O "Construtor" — Carregamento Inicial (`mount/3`)

Substitua o `mount/3` por:

```elixir
  @impl true
  def mount(_params, _session, socket) do
    tasks = Repo.all(Task)                     # Lê as tarefas do banco de dados
    changeset = Task.changeset(%Task{}, %{})   # Cria um "molde" vazio
    form = to_form(changeset)                  # Converte para o formulário de UI

    socket =
      assign(socket,
        tasks: tasks,
        form: form
      )

    {:ok, socket}
  end
```

**O que mudou?**

| Antes                                    | Agora                                                        |
| ---------------------------------------- | ------------------------------------------------------------ |
| Lista fixa de tarefas escrita no código. | Tarefas reais do banco, via `Repo.all(Task)`.                |
| Um simples `new_task_title` no estado.   | Um `changeset` convertido em `form` — validável e integrado. |

> 💡 O `mount/3` é como o `get()` de uma view do Django ou o `index()` de um controller Rails: define o estado inicial da página.

### 3️⃣ Passo 4.3: O "Coração" — Salvando no Banco (`handle_event/3`)

Agora, **remova as duas funções `handle_event`** da Fase 2 (`"update_form"` e `"save_task"`) e coloque no lugar esta única função:

```elixir
  @impl true
  def handle_event("save_task", %{"task" => task_params}, socket) do
    # 1. Cria um changeset com os dados do formulário
    changeset = Task.changeset(%Task{}, task_params)

    # 2. Tenta inserir no banco — e trata os DOIS resultados possíveis
    socket_atualizado =
      case Repo.insert(changeset) do
        # 2A. SUCESSO!
        {:ok, _new_task} ->
          novo_changeset_vazio = Task.changeset(%Task{}, %{})

          socket
          |> assign(:tasks, Repo.all(Task))              # Recarrega as tarefas
          |> assign(:form, to_form(novo_changeset_vazio)) # Reseta o formulário
          |> put_flash(:info, "Tarefa salva com sucesso!")

        # 2B. FALHA! (validação — ex: título em branco)
        {:error, failed_changeset} ->
          # Re-atribui o formulário *com os erros* para exibi-los
          assign(socket, form: to_form(failed_changeset))
      end

    # 3. Retorna o socket atualizado
    {:noreply, socket_atualizado}
  end
```

**Mudanças-chave:**

- Antes, adicionávamos a tarefa direto na lista do socket → agora, `Repo.insert(changeset)` **salva no banco**.
- As tuplas `{:ok, ...}` / `{:error, ...}` que vimos no IEx (Fase 3) reaparecem aqui, tratadas pelo `case`.
- `put_flash/3` prepara uma **mensagem amigável** (como o `messages.success()` do Django).

> 💡 Repare que **não existe mais** o `handle_event("update_form", ...)`. Por quê? Ao trocar o `<form>` cru pelo componente `<.form>` com `to_form` (próximo passo), quem passa a controlar o valor do campo é o próprio mecanismo de formulários do Phoenix — não precisamos mais rastrear cada tecla.

<aside>
⚠️ **Por que o `case` precisa "devolver" o socket?** Note que atribuímos o resultado do `case` a `socket_atualizado` e retornamos **ele**. Um erro clássico é chamar `Repo.insert` e esquecer de usar o socket que saiu do `case` — aí a UI nunca reflete a mudança. Em Elixir, dados são imutáveis: o socket "novo" é um **valor retornado**, nunca um efeito colateral.
</aside>

### 4️⃣ Passo 4.4: O "Desenhista" — Renderização com `<.form>` e `Layouts.app`

Substitua o `render/1` por:

```elixir
  @impl true
  def render(assigns) do
    ~H"""
    <Layouts.app flash={@flash}>
      <div class="w-full max-w-lg mx-auto mt-12 p-6 bg-white rounded-lg shadow-md">
        <h1 class="text-3xl font-bold mb-6 text-center text-gray-800">
          Minha Lista de Tarefas (com DB!)
        </h1>

        <%!-- O formulário agora usa @form --%>
        <.form for={@form} id="task-form" phx-submit="save_task">
          <.input
            field={@form[:title]}
            type="text"
            label="Nova Tarefa"
            placeholder="O que precisa ser feito?"
          />
          <.button variant="primary" phx-disable-with="Salvando...">Adicionar Tarefa</.button>
        </.form>

        <%!-- A LISTA DE TAREFAS --%>
        <div class="mt-8">
          <ul id="task-list">
            <li :for={task <- @tasks} class="flex justify-between items-center p-3 border-b">
              <span class={if task.completed, do: "line-through text-gray-500", else: "text-gray-900"}>
                {task.title}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </Layouts.app>
    """
  end
```

**Destaques:**

- **`<Layouts.app flash={@flash}>`** — este envelope é **essencial**: no Phoenix 1.8, é dentro dele que vivem o cabeçalho padrão da aplicação e o **`flash_group`** — o componente que **exibe** as mensagens do `put_flash`. Sem esse envelope, o `put_flash(:info, "Tarefa salva...")` do passo anterior rodaria... e a mensagem **nunca apareceria na tela**.
- **`<.form for={@form}>`** — o componente de formulário integrado ao changeset. Repare que os campos agora chegam ao servidor "embrulhados": `%{"task" => %{"title" => "..."}}` — por isso o pattern do `handle_event` mudou para `%{"task" => task_params}`.
- **`<.input field={@form[:title]}>`** — o campo integrado: exibe o valor, o label **e as mensagens de erro de validação**, tudo automaticamente.
- **`<.button variant="primary">`** — o botão estilizado do daisyUI; `phx-disable-with` troca o texto enquanto o envio está em andamento.

### 🧪 Passo 4.5: Testando Tudo

Suba o servidor (`mix phx.server`) e acesse `http://localhost:4000`:

1. **Sucesso:** adicione "Tarefa 1" → ela aparece na lista, o formulário limpa e a mensagem _"Tarefa salva com sucesso!"_ surge no topo. ✅
2. **Falha (validação):** clique em "Adicionar Tarefa" com o campo em branco → aparece o erro **"can't be blank"** junto ao campo. ✅
3. **O teste que falhava na Fase 2:** adicione "Tarefa 2" e **recarregue a página (F5)** → as tarefas **continuam lá**. ✅
4. **A prova final:** **pare o servidor** (`Ctrl+C` duas vezes) e suba de novo (`mix phx.server`) → F5 → **tudo continua lá.** Persistência real! 🎉

### 💾 Passo 4.6: Commit

```bash
git add .
git commit -m "Fase 4: Refatora TodoLive para usar Ecto, Repo e to_form()"
```

---

**Fim da Fase 4!** 🏁

Com essa refatoração, nosso app deixou de ser um protótipo volátil e virou uma aplicação completa, com:

- **Banco de dados real** (Ecto + SQLite);
- **Validação automática** via changeset;
- **Formulário dinâmico** com `to_form()` e mensagens de flash funcionando;
- **Interface reativa** com Phoenix LiveView.

### 🔮 Próximos desafios

1. Adicionar o botão de **excluir** (`phx-click="delete"`) → **Fase 5**;
2. Adicionar o **checkbox de conclusão** (`phx-change="toggle_complete"`) → **Fase 6**.

---

# 🗑️ Fase 5: Refinamento — Excluindo Tarefas

### 🎯 Objetivo

Adicionar um **botão "X"** ao lado de cada tarefa para que, ao ser clicado, ela seja **removida permanentemente do banco de dados e da interface**, sem recarregar a página.

### 💡 O que você aprenderá aqui

- Como **disparar eventos de clique** com `phx-click` (sem formulários);
- Como **enviar dados específicos** para o servidor (o ID da tarefa) com `phx-value-*`;
- Como **interagir com o banco** via `Repo.get` e `Repo.delete`;
- E, de quebra, um pouco mais da linguagem de template do LiveView — o **HEEx**.

## 🧱 Passo 5.1: Atualizando a Interface (o botão "X")

Abra o arquivo:

```
lib/elixir_todo_list_web/live/todo_live.ex
```

Na função `render/1`, localize o bloco `<ul>...</ul>` que exibe as tarefas. Dentro do `<li>`, adicione um botão ao lado do título.

_Antes:_

```elixir
<li :for={task <- @tasks} class="flex justify-between items-center p-3 border-b">
  <span class={if task.completed, do: "line-through text-gray-500", else: "text-gray-900"}>
    {task.title}
  </span>
</li>
```

_Depois (com o botão de exclusão):_

```elixir
<li :for={task <- @tasks} class="flex justify-between items-center p-3 border-b">
  <span class={if task.completed, do: "line-through text-gray-500", else: "text-gray-900"}>
    {task.title}
  </span>

  <%!-- NOVO BOTÃO EXCLUIR --%>
  <.button
    type="button"
    phx-click="delete"
    phx-value-id={task.id}
    class="!p-2 !bg-red-600 hover:!bg-red-700 text-white font-bold rounded-full"
  >
    &times; <%!-- Renderiza um "X" --%>
  </.button>
</li>
```

### 🧠 Entendendo o Template (HEEx)

O Phoenix usa o **HEEx** (_HTML + Embedded Elixir Extended_) — parecido com os templates do Django (Jinja), o ERB do Rails —, mas com uma diferença marcante: **tudo é verificado em tempo de compilação**, inclusive atributos e componentes.

| Sintaxe                 | Função                                                          |
| ----------------------- | --------------------------------------------------------------- |
| `{task.title}`          | Interpola um valor Elixir no HTML, com escape seguro.           |
| `<%!-- ... --%>`        | Comentário do HEEx (não vai para o navegador).                  |
| `<.button>`             | Um **componente** do Phoenix — uma função Elixir que gera HTML. |
| `:for={task <- @tasks}` | Estrutura de repetição do HEEx.                                 |

### ⚡ Entendendo os Atributos do Botão

| Atributo                       | Significado                                                                                       |
| ------------------------------ | ------------------------------------------------------------------------------------------------- |
| `phx-click="delete"`           | Ao clicar, envia o evento **`"delete"`** para o servidor (via WebSocket).                         |
| `phx-value-id={task.id}`       | Envia o **ID da tarefa** junto — o servidor o recebe como `%{"id" => "1"}` (repare: **string!**). |
| `class="!p-2 !bg-red-600 ..."` | Classes Tailwind; o `!` força prioridade sobre o estilo padrão do componente.                     |
| `&times;`                      | Entidade HTML do símbolo "×".                                                                     |

### 🧩 Comparando com outros frameworks

| Framework            | Como enviaria o ID no evento?                                                       |
| -------------------- | ----------------------------------------------------------------------------------- |
| **Django**           | Formulário `<form>` ou JavaScript + `fetch()`                                       |
| **Rails**            | `link_to "X", task_path(task), method: :delete, remote: true`                       |
| **Flask**            | Formulário POST + rota `/delete/<id>`                                               |
| **Phoenix LiveView** | Apenas: `phx-click="delete" phx-value-id={task.id}` — o resto viaja pelo WebSocket. |

## 💥 Passo 5.2: Hora do Erro (e da Descoberta)

Salve o arquivo. Os botões "X" aparecem. Agora **clique em um deles** e olhe o terminal:

> ❌ `** (UndefinedFunctionError) ... no function clause matching in ElixirTodoListWeb.TodoLive.handle_event/3` (ou erro similar)

O Phoenix está certo: enviamos o evento `"delete"`, mas **nenhuma cláusula de `handle_event` combina com ele** — o pattern matching não encontrou destino. Igualzinho ao "texto que desaparece" da Fase 2: evento sem tratador derruba (e reinicia) o processo.

## ⚙️ Passo 5.3: Implementando o `handle_event("delete", ...)`

Adicione esta função **logo abaixo** do `handle_event("save_task", ...)`:

```elixir
  @impl true
  def handle_event("delete", %{"id" => id}, socket) do
    # 1. Busca a tarefa correspondente no banco
    #    (se o id não existir, Repo.get retorna nil)
    task = Repo.get(Task, id)

    # 2. Remove a tarefa (apenas se ela existir)
    if task do
      Repo.delete(task)
    end

    # 3. Atualiza a lista de tarefas na tela e avisa o usuário
    socket =
      socket
      |> assign(:tasks, Repo.all(Task))
      |> put_flash(:info, "Tarefa removida com sucesso!")

    # 4. Retorna o novo estado
    {:noreply, socket}
  end
```

### 🧠 Explicando em detalhes

| Etapa                                               | Descrição                                                                                              |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `def handle_event("delete", %{"id" => id}, socket)` | O pattern matching "escuta" o evento `"delete"`; o segundo parâmetro traz o mapa com o `phx-value-id`. |
| `Repo.get(Task, id)`                                | Busca a tarefa pelo ID (o Ecto converte a string para o tipo da chave). Retorna `nil` se não existir.  |
| `if task do ... end`                                | Defesa contra cliques em botões "velhos" (ex: a tarefa já foi removida em outra aba).                  |
| `Repo.delete(task)`                                 | Exclui o registro do banco.                                                                            |
| `assign(socket, :tasks, Repo.all(Task))`            | Recarrega a lista — a UI re-renderiza sem a tarefa excluída.                                           |
| `put_flash(:info, ...)`                             | A mensagem de confirmação — exibida pelo `Layouts.app` que adicionamos na Fase 4.                      |

<aside>
💡 **Alternativa mais "estrita":** `Repo.get!(Task, id)` (com `!`) **lança uma exceção** se o ID não existir, em vez de retornar `nil`. É uma convenção do Ecto: funções com `!` falham "alto". Aqui preferimos a versão defensiva, mas você encontrará o `get!` com frequência por aí.
</aside>

### 🧩 O ciclo completo do evento

1. Usuário clica no botão "X" →
2. O navegador envia `"delete"` com `%{"id" => "3"}` pelo WebSocket →
3. O servidor executa `handle_event("delete", ...)` →
4. O LiveView atualiza o estado (`assign/3`) →
5. O template HEEx é **re-renderizado automaticamente** →
6. A lista aparece na tela **já sem a tarefa** — em tempo real!

## 🔍 Passo 5.4: Testando

1. Salve o arquivo (o servidor recompila sozinho).
2. Acesse `http://localhost:4000`.
3. Crie algumas tarefas e clique no "X" vermelho de uma delas.

✅ A lista se atualiza imediatamente, com o aviso: _"Tarefa removida com sucesso!"_

🔁 Recarregue a página (F5): a tarefa continua excluída — o `DELETE` persistiu no banco.

## 💾 Passo 5.5: Commit

```bash
git add .
git commit -m "Fase 5: Implementa exclusão de tarefas (delete)"
```

---

**Fim da Fase 5!** 🏁

Seu `TodoLive` agora **cria, valida, lista e exclui** tarefas em tempo real — usando apenas Elixir + LiveView, sem JavaScript.

Falta o "U" do CRUD: marcar tarefas como concluídas.

---

# ✅ Fase 6: Refinamento — Concluindo Tarefas (Toggle)

### 🎯 Objetivo

Adicionar um **checkbox** ao lado de cada tarefa. Ao clicar, ele deve marcar a tarefa como **concluída** (ou não concluída) **no banco de dados**, atualizando a interface em tempo real — aplicando ou removendo o estilo "riscado".

### 💡 Por que isso é importante?

Este passo ensina a:

- Criar formulários dinâmicos **dentro de loops** (`:for`);
- Usar `phx-change` para reagir instantaneamente a um checkbox;
- **Atualizar** registros existentes com `Repo.get` + `Repo.update`;
- Reutilizar o `Task.changeset/2` para validação e atualização;
- E a decifrar uma pegadinha clássica dos checkboxes HTML. 🕵️

## 🧩 Passo 6.1: A Interface (adicionando o checkbox)

A maneira mais robusta de lidar com checkboxes no LiveView é criar **um pequeno `<.form>` por tarefa** — assim cada item da lista tem seu próprio estado independente.

Abra `lib/elixir_todo_list_web/live/todo_live.ex`, encontre o loop `<li :for={task <- @tasks}>` no `render/1` e substitua o `<span>` do título por um formulário com checkbox. O bloco da lista **completo** fica assim:

```elixir
        <%!-- A LISTA DE TAREFAS --%>
        <div class="mt-8">
          <ul id="task-list">
            <li
              :for={task <- @tasks}
              id={"task-#{task.id}"}
              class="flex justify-between items-center p-3 border-b"
            >
              <% task_form = Task.changeset(task, %{}) |> to_form() %>

              <.form
                for={task_form}
                phx-change="toggle_complete"
                phx-value-id={task.id}
                class="flex-grow"
              >
                <div class="flex items-center space-x-4">
                  <.input
                    type="checkbox"
                    field={task_form[:completed]}
                    class="flex-shrink-0"
                  />

                  <%!-- Um <label> separado para controle total do estilo --%>
                  <label class={if task.completed, do: "line-through text-gray-500", else: "text-gray-900"}>
                    {task.title}
                  </label>
                </div>
              </.form>

              <.button
                type="button"
                phx-click="delete"
                phx-value-id={task.id}
                class="!p-2 !bg-red-600 hover:!bg-red-700 text-white font-bold rounded-full"
              >
                &times;
              </.button>
            </li>
          </ul>
        </div>
```

### 🧠 Explicação didática

| Elemento                                                 | Função                                                                                                                                              |
| -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<% task_form = ... %>`                                  | Cria uma variável temporária: o formulário individual **daquela** tarefa (um changeset "vazio" sobre a tarefa existente, convertido com `to_form`). |
| `id={"task-#{task.id}"}`                                 | Um `id` único por `<li>` — ajuda o LiveView a rastrear cada item.                                                                                   |
| `phx-change="toggle_complete"`                           | Evento disparado automaticamente ao marcar/desmarcar o checkbox.                                                                                    |
| `phx-value-id={task.id}`                                 | Envia o **ID da tarefa** junto ao evento.                                                                                                           |
| `<.input type="checkbox" field={task_form[:completed]}>` | O checkbox integrado ao campo `completed` do schema (já renderiza marcado/desmarcado conforme o banco).                                             |
| `<label class={...}>`                                    | Aplica o "riscado" quando a tarefa está concluída.                                                                                                  |

💥 **Erro esperado:** salve o arquivo e clique em um checkbox. Como na Fase 5, o terminal mostrará um erro — o evento `"toggle_complete"` ainda não tem tratador. Já sabemos o remédio.

## 🕵️ Passo 6.2: A Pegadinha do Checkbox (leia antes de codar!)

Antes de escrever o `handle_event`, precisamos entender **o que exatamente chega ao servidor** quando o checkbox muda. E aqui mora uma pegadinha dupla:

**1. HTML puro:** um checkbox **desmarcado não é enviado** em formulários HTML. Se dependêssemos disso, "desmarcar" não geraria dado nenhum.

**2. A solução do Phoenix:** para contornar isso, o componente `<.input type="checkbox">` renderiza, escondido, um segundo campo:

```html
<input type="hidden" name="task[completed]" value="false" /> <input type="checkbox" name="task[completed]" value="true" ... />
```

Graças ao campo oculto, o servidor **sempre** recebe a chave `"completed"`:

- Checkbox **marcado** → `%{"task" => %{"completed" => "true"}}`
- Checkbox **desmarcado** → `%{"task" => %{"completed" => "false"}}`

<aside>
⚠️ **A consequência prática:** como a chave `"completed"` **sempre existe**, testar sua *presença* (por exemplo, com `Map.has_key?`) **não funciona** — daria `true` nos dois casos, e a tarefa, uma vez marcada, **nunca mais desmarcaria**! O teste correto é sobre o **valor**: `task_params["completed"] == "true"`. Guarde essa: é um dos bugs mais sorrateiros do LiveView.
</aside>

## ⚙️ Passo 6.3: Implementando o `handle_event("toggle_complete", ...)`

Adicione a função **logo abaixo** do `handle_event("delete", ...)`:

```elixir
  @impl true
  def handle_event("toggle_complete", %{"id" => id, "task" => task_params}, socket) do
    # 1. Busca a tarefa correspondente no banco
    task = Repo.get!(Task, id)

    # 2. Lê o novo estado do checkbox
    #    (graças ao campo oculto, "completed" é sempre "true" ou "false")
    completed_status = task_params["completed"] == "true"

    # 3. Cria um changeset de ATUALIZAÇÃO (repare: partimos de 'task',
    #    a struct vinda do banco — não de %Task{} vazio!)
    changeset = Task.changeset(task, %{completed: completed_status})

    # 4. Atualiza o registro no banco de dados
    Repo.update(changeset)

    # 5. Recarrega a lista para atualizar a UI
    socket = assign(socket, tasks: Repo.all(Task))
    {:noreply, socket}
  end
```

### 🧩 O fluxo, passo a passo

1. **Evento recebido** — ao clicar no checkbox, o navegador envia:

   ```elixir
   %{"id" => "1", "task" => %{"completed" => "true"}}  # marcou
   %{"id" => "1", "task" => %{"completed" => "false"}} # desmarcou
   ```

2. **Busca** — `Repo.get!` localiza a tarefa (aqui usamos a versão com `!`: se o ID sumiu, algo está muito errado e preferimos o erro explícito).
3. **Conversão** — `task_params["completed"] == "true"` transforma a _string_ do formulário em um _booleano_ de verdade. (Ecoa a lição do tutorial de Clojure, onde convertíamos o 0/1 do SQLite — formulários e bancos adoram fingir que booleanos são outra coisa!)
4. **Atualização** — `Task.changeset(task, ...)` + `Repo.update` aplicam a mudança. É o mesmo `changeset/2` da criação: como ele parte da struct recebida, serve tanto para `insert` quanto para `update`.
5. **Re-render** — o `assign` atualiza `@tasks`, e o LiveView redesenha o template.

## 🧪 Passo 6.4: Teste Final (o CRUD completo)

Com o servidor rodando, em `http://localhost:4000`:

1. **Create:** adicione duas ou três tarefas. ✅
2. **Read:** F5 — continuam lá. ✅
3. **Update:** marque o checkbox de uma → ela risca imediatamente. **Desmarque** → o risco some (se não sumir, revise o Passo 6.2!). F5 → o estado persiste. ✅
4. **Delete:** clique no "X" de outra → some. F5 → continua fora. ✅
5. **A prova final:** pare o servidor, suba de novo, F5 → **tudo exatamente como você deixou.** ✅

## 💾 Passo 6.5: Commit

```bash
git add .
git commit -m "Fase 6: Implementa conclusão de tarefas (toggle_complete)"
```

---

## 📄 O Código Completo (para conferência)

Se algo não funcionou, compare seu `lib/elixir_todo_list_web/live/todo_live.ex` com o estado final:

```elixir
defmodule ElixirTodoListWeb.TodoLive do
  use ElixirTodoListWeb, :live_view

  alias ElixirTodoList.Repo
  alias ElixirTodoList.Task

  @impl true
  def mount(_params, _session, socket) do
    tasks = Repo.all(Task)
    changeset = Task.changeset(%Task{}, %{})
    form = to_form(changeset)

    socket =
      assign(socket,
        tasks: tasks,
        form: form
      )

    {:ok, socket}
  end

  @impl true
  def handle_event("save_task", %{"task" => task_params}, socket) do
    changeset = Task.changeset(%Task{}, task_params)

    socket_atualizado =
      case Repo.insert(changeset) do
        {:ok, _new_task} ->
          novo_changeset_vazio = Task.changeset(%Task{}, %{})

          socket
          |> assign(:tasks, Repo.all(Task))
          |> assign(:form, to_form(novo_changeset_vazio))
          |> put_flash(:info, "Tarefa salva com sucesso!")

        {:error, failed_changeset} ->
          assign(socket, form: to_form(failed_changeset))
      end

    {:noreply, socket_atualizado}
  end

  @impl true
  def handle_event("delete", %{"id" => id}, socket) do
    task = Repo.get(Task, id)

    if task do
      Repo.delete(task)
    end

    socket =
      socket
      |> assign(:tasks, Repo.all(Task))
      |> put_flash(:info, "Tarefa removida com sucesso!")

    {:noreply, socket}
  end

  @impl true
  def handle_event("toggle_complete", %{"id" => id, "task" => task_params}, socket) do
    task = Repo.get!(Task, id)
    completed_status = task_params["completed"] == "true"
    changeset = Task.changeset(task, %{completed: completed_status})
    Repo.update(changeset)

    socket = assign(socket, tasks: Repo.all(Task))
    {:noreply, socket}
  end

  @impl true
  def render(assigns) do
    ~H"""
    <Layouts.app flash={@flash}>
      <div class="w-full max-w-lg mx-auto mt-12 p-6 bg-white rounded-lg shadow-md">
        <h1 class="text-3xl font-bold mb-6 text-center text-gray-800">
          Minha Lista de Tarefas (com DB!)
        </h1>

        <.form for={@form} id="task-form" phx-submit="save_task">
          <.input
            field={@form[:title]}
            type="text"
            label="Nova Tarefa"
            placeholder="O que precisa ser feito?"
          />
          <.button variant="primary" phx-disable-with="Salvando...">Adicionar Tarefa</.button>
        </.form>

        <div class="mt-8">
          <ul id="task-list">
            <li
              :for={task <- @tasks}
              id={"task-#{task.id}"}
              class="flex justify-between items-center p-3 border-b"
            >
              <% task_form = Task.changeset(task, %{}) |> to_form() %>

              <.form
                for={task_form}
                phx-change="toggle_complete"
                phx-value-id={task.id}
                class="flex-grow"
              >
                <div class="flex items-center space-x-4">
                  <.input
                    type="checkbox"
                    field={task_form[:completed]}
                    class="flex-shrink-0"
                  />

                  <label class={if task.completed, do: "line-through text-gray-500", else: "text-gray-900"}>
                    {task.title}
                  </label>
                </div>
              </.form>

              <.button
                type="button"
                phx-click="delete"
                phx-value-id={task.id}
                class="!p-2 !bg-red-600 hover:!bg-red-700 text-white font-bold rounded-full"
              >
                &times;
              </.button>
            </li>
          </ul>
        </div>
      </div>
    </Layouts.app>
    """
  end
end
```

---

**Fim da Fase 6!** 🏁

Você agora tem um aplicativo **CRUD completo** em Elixir + Phoenix LiveView:

- **Criar** novas tarefas (com validação);
- **Listar** as existentes;
- **Atualizar** (marcar/desmarcar como concluída);
- **Excluir** tarefas.

Tudo com **atualização em tempo real** e sem escrever uma linha de JavaScript. 💪

---

# 🎨 Fase 7: Personalizando o Design (Tailwind CSS v4 e daisyUI)

Até aqui, construímos uma aplicação funcional e interativa. Agora vamos entender **como o visual é definido** e **como personalizá-lo**.

O Phoenix 1.8 vem configurado com o **Tailwind CSS v4**, um framework CSS baseado em **classes utilitárias**, e com o **daisyUI**, um plugin que fornece componentes prontos (botões, alertas, inputs) e **temas** pré-configurados.

<aside>
⚠️ **Atenção à versão!** Se você pesquisar por "configurar tema daisyUI Phoenix", encontrará muitos guias mandando editar o arquivo `assets/tailwind.config.js`. **Esse arquivo não existe mais**: o Tailwind **v4** (usado pelo Phoenix 1.8) abandonou a configuração em JavaScript — agora tudo é configurado **dentro do próprio CSS**, no arquivo `assets/css/app.css`. Guias baseados no Phoenix ≤ 1.7 não se aplicam aqui.
</aside>

### 🔧 Passo 7.1: Como o Tailwind funciona

O Tailwind é diferente de frameworks tradicionais como o Bootstrap. Em vez de classes de componentes prontos, ele oferece pequenas classes **de propósito único**:

| Propósito           | Classe Tailwind | Efeito             |
| ------------------- | --------------- | ------------------ |
| Cor de fundo        | `bg-blue-500`   | Fundo azul médio   |
| Cor do texto        | `text-gray-800` | Texto cinza escuro |
| Tamanho do texto    | `text-3xl`      | Texto grande       |
| Espaçamento interno | `p-4`           | Padding de 1rem    |
| Bordas arredondadas | `rounded-lg`    | Cantos suavizados  |
| Sombra              | `shadow-md`     | Sombra média       |

Essas classes se combinam livremente — é o padrão usado em todo o nosso `TodoLive`:

```elixir
<div class="w-full max-w-lg mx-auto mt-12 p-6 bg-white rounded-lg shadow-md">
  <h1 class="text-3xl font-bold mb-6 text-center text-gray-800">
    Minha Lista de Tarefas (com DB!)
  </h1>
```

- `w-full max-w-lg mx-auto` centraliza o bloco com largura máxima;
- `bg-white rounded-lg shadow-md` cria um "cartão" branco com sombra;
- `text-3xl font-bold text-gray-800` formata o título.

### 🌈 Passo 7.2: daisyUI — o "tema visual" do Tailwind

O **daisyUI** adiciona classes mais semânticas para componentes comuns. Observe o componente `<.button>` no arquivo `lib/elixir_todo_list_web/components/core_components.ex`:

```elixir
variants = %{"primary" => "btn-primary", nil => "btn-primary btn-soft"}
```

As classes `btn`, `btn-primary` e `btn-soft` vêm do **daisyUI** — é por isso que escrevemos `<.button variant="primary">` na Fase 4. Outros exemplos no mesmo arquivo: `alert-info`/`alert-error` (mensagens flash), `checkbox` e `input` (formulários).

A grande vantagem: esses componentes **obedecem ao tema ativo** (claro, escuro, etc.) sem que você redefina cores manualmente.

### 🌗 Passo 7.3: Os Temas (e um mistério resolvido)

Faça um teste: se o seu sistema operacional estiver no **modo escuro**, abra a aplicação. Notou que partes da página (o fundo, o cabeçalho do `Layouts.app`, os inputs) ficam **escuras**, enquanto o nosso "cartão" continua branco (`bg-white`)? O contraste fica estranho.

**O que está acontecendo?** O Phoenix 1.8 já vem com **dois temas daisyUI** (um claro e um escuro) definidos no `assets/css/app.css`:

```css
@plugin "../vendor/daisyui" {
  themes: false;
}

@plugin "../vendor/daisyui-theme" {
  name: "dark";
  default: false;
  prefersdark: true;   /* 👈 segue a preferência do sistema! */
  ...
}

@plugin "../vendor/daisyui-theme" {
  name: "light";
  default: true;
  ...
}
```

E o `root.html.heex` inclui um pequeno script que aplica o tema conforme o atributo `data-theme` (ou a preferência do sistema, por causa do `prefersdark: true`).

**Como forçar o tema claro** (a opção mais simples para o nosso visual): abra

```
lib/elixir_todo_list_web/components/layouts/root.html.heex
```

e adicione `data-theme="light"` ao `<body>`:

_Mude:_

```html
<body>
  {@inner_content}
</body>
```

_Para:_

```html
<body data-theme="light">
  {@inner_content}
</body>
```

Pronto: a aplicação fica no tema claro para todos, independentemente da preferência do sistema.

<aside>
💡 **Alternativa avançada:** em vez de forçar o claro, você pode abraçar o modo escuro trocando as classes "fixas" do nosso card (`bg-white`, `text-gray-800`) por classes **semânticas** do daisyUI, que mudam com o tema: `bg-base-100`, `text-base-content`, etc. Fica como exercício!
</aside>

### 💡 Passo 7.4: Exemplos práticos de personalização

**Quer destacar mais as tarefas concluídas?** Ajuste a classe condicional no `TodoLive`:

```elixir
<label class={
  if task.completed,
    do: "line-through text-gray-400 italic",
    else: "text-gray-900 font-medium"
}>
  {task.title}
</label>
```

**Quer um botão de exclusão mais discreto?** É só trocar as classes:

```elixir
<.button
  type="button"
  phx-click="delete"
  phx-value-id={task.id}
  class="!p-1 !bg-red-500 hover:!bg-red-700"
>
  &times;
</.button>
```

(O `!` prefixando a classe força a prioridade sobre o estilo padrão do componente `<.button>`.)

Sem tocar em arquivos CSS, você molda toda a interface.

### 💾 Passo 7.5: Commit

```bash
git add .
git commit -m "Fase 7: Ajusta o tema e personaliza o visual (Tailwind/daisyUI)"
```

---

**Fim da Fase 7!** 🏁

O Tailwind (com daisyUI) é o que dá ao Phoenix sua **agilidade visual**: elimina o CSS manual, mantém o template declarativo e ainda permite personalização total. A partir daqui, você pode experimentar temas, criar componentes próprios e dar identidade à sua aplicação.

Falta um último passo para o projeto ficar apresentável ao mundo: a **📄 Fase 8: README e Entrega**.

---

# 📄 Fase 8: README e Entrega

**Objetivo:** transformar o `README.md` padrão do Phoenix em uma documentação de verdade e fazer o checklist final do repositório.

**Por que fazemos isso?**
O README é a porta de entrada de qualquer repositório — o primeiro (às vezes o único) arquivo que um colega, recrutador ou avaliador vai ler. O critério de qualidade é simples: _alguém conseguiria clonar e rodar seu projeto lendo apenas o README?_

### 📝 Passo 8.1: Atualizar o `README.md`

O `phx.new` já gerou um `README.md` genérico na raiz do projeto. Vamos substituí-lo por um personalizado. Adapte o modelo (nome, links, o que quiser):

````markdown
# Todo List — Elixir + Phoenix LiveView

**Aluno(a):** Seu Nome Completo Aqui

**Tutorial original:** [Como Criar um App "Todo List" com Elixir e LiveView
do Zero](https://profsergiocosta.notion.site/Como-Criar-um-App-Todo-List-com-Elixir-e-LiveView-do-Zero-2a8cce97509380eba53fc82bbeb08435)

## Descrição

Aplicação de lista de tarefas (Todo List) construída de forma incremental
para estudar a arquitetura **full-stack funcional reativa** do
[Phoenix LiveView](https://hexdocs.pm/phoenix_live_view):

- **Framework:** Phoenix 1.8 + LiveView 1.1 — o estado vive no servidor e a
  interface atualiza em tempo real via WebSocket, sem JavaScript manual;
- **Persistência:** [Ecto](https://hexdocs.pm/ecto) + SQLite (schema,
  migrations e validação com changesets);
- **Visual:** Tailwind CSS v4 + daisyUI.

Funcionalidades: criar tarefas (com validação), listar, marcar como
concluída (toggle) e excluir — tudo com atualização instantânea.

## Pré-requisitos

| Ferramenta | Versão    |
| ---------- | --------- |
| Erlang/OTP | 26+       |
| Elixir     | 1.17+     |
| Node.js    | 18+ (LTS) |

## Como Rodar

```bash
git clone https://github.com/SEU-USUARIO/SEU-REPO.git
cd SEU-REPO

# Instala dependências e prepara os assets
mix setup

# Cria o banco SQLite e aplica as migrations
mix ecto.create
mix ecto.migrate

# Sobe o servidor
mix phx.server
```

Depois, abra [http://localhost:4000](http://localhost:4000) no navegador.

## Estrutura Principal

| Arquivo                                      | Papel                               |
| -------------------------------------------- | ----------------------------------- |
| `lib/elixir_todo_list_web/live/todo_live.ex` | O LiveView (estado, eventos e HTML) |
| `lib/elixir_todo_list/task.ex`               | O schema `Task` e seu changeset     |
| `lib/elixir_todo_list/repo.ex`               | A conexão com o banco (Ecto.Repo)   |
| `priv/repo/migrations/`                      | As migrations do banco              |
````

### 🧪 Passo 8.2: O Teste do "Colega"

Faça de conta que você é outra pessoa: clone o seu repositório em uma **pasta nova** (ex: `/tmp/teste-todo`) e siga o seu próprio README, literalmente. A aplicação subiu? O CRUD funciona? Os dados persistem após reiniciar o servidor?

Esse teste revela os dois vacilos clássicos:

1. **Banco commitado**: se `git status`/a página do GitHub mostrar `elixir_todo_list.db` (ou `.db-shm`/`.db-wal`), o `.gitignore` da Fase 0 não foi aplicado antes do commit. Corrija com:

   ```bash
   git rm --cached elixir_todo_list.db elixir_todo_list.db-shm elixir_todo_list.db-wal
   git commit -m "Remove arquivos de banco do versionamento"
   ```

2. **Passo de setup faltando** no README (ex: esquecer o `mix ecto.migrate` — sem ele, a aplicação sobe mas quebra ao carregar as tarefas).

### 💾 Passo 8.3: Commit Final

```bash
git add README.md
git commit -m "Fase 8: Atualiza README com instruções de execução"
```

### ✅ Passo 8.4: Checklist Final

Confira o histórico:

```bash
git log --oneline
```

Esperado (de cima para baixo):

```
Fase 8: Atualiza README com instruções de execução
Fase 7: Ajusta o tema e personaliza o visual (Tailwind/daisyUI)
Fase 6: Implementa conclusão de tarefas (toggle_complete)
Fase 5: Implementa exclusão de tarefas (delete)
Fase 4: Refatora TodoLive para usar Ecto, Repo e to_form()
Fase 3: Persistência - Configura Ecto, Repo, Migrations e Task Schema
Fase 2: Lógica em Memória - Implementa adição de tarefas
Fase 1: Prova de Vida - Substitui a rota raiz por TodoLive
Fase 0: Gera o esqueleto do Phoenix com LiveView (sem Ecto)
Fase 0: Inicializa o repositório e .gitignore
```

**Checklist:**

- [ ] O repositório no GitHub é público e o `git push` foi feito?
- [ ] Nenhum arquivo `*.db`, `*.db-shm` ou `*.db-wal` aparece no GitHub?
- [ ] As pastas `_build/` e `deps/` também não aparecem?
- [ ] O README tem nome, link do tutorial, descrição e instruções que funcionam?
- [ ] O CRUD completo funciona e os dados sobrevivem ao restart do servidor?

---

## 🚀 Tutorial Concluído!

**Parabéns!** 🥳 Você construiu uma aplicação web **full-stack funcional e reativa** — e, se fez também o tutorial de Clojure, agora viu **o mesmo problema resolvido por duas filosofias**:

|                                 | Clojure                  | Elixir                         |
| ------------------------------- | ------------------------ | ------------------------------ |
| Onde vive o estado reativo      | No navegador (`r/atom`)  | No servidor (socket/`assigns`) |
| Como a UI conversa com os dados | API REST + JSON + CORS   | WebSocket interno (`phx-*`)    |
| Onde a validação acontece       | No handler, "à mão"      | No changeset, declarativa      |
| Quantos servidores em dev       | Dois (API + shadow-cljs) | Um (`mix phx.server`)          |

**Quer ir além?** Algumas extensões (opcionais):

- Um filtro "Todas / Ativas / Concluídas" (um `assign` + cláusulas de `handle_event`);
- Edição do título de uma tarefa (outro pequeno `<.form>` por item);
- Um contador "X de Y concluídas" no topo;
- Trocar o SQLite por PostgreSQL (`ecto_sqlite3` → `postgrex`, e o adapter no Repo);
- Explorar o **Phoenix PubSub** para que duas abas do navegador vejam as mudanças uma da outra em tempo real — a "mágica" concorrente da BEAM em ação.
