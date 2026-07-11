---
layout: post
title: "Clojure e ClojureScript: Construindo uma Aplicação Todo List do Zero"
date: 2026-07-11 10:00:00 -0300
description: "Um guia prático e completo de arquitetura funcional e reativa, cobrindo desde o backend Ring/Reitit até o frontend Reagent com SQLite."
tags: [clojure, clojurescript, reagent, shadow-cljs, ring, reitit, sqlite, functional-programming]
categories: tutorial
permalink: /blog/tutorial-clojure-clojurescript-todo-list/
---

Olá e bem-vindo(a) a este guia prático.

O objetivo aqui é construir juntos uma aplicação **Todo List completa**, indo de um repositório Git vazio até um **projeto full-stack funcional**, usando o ecossistema **Clojure** moderno.

Mais do que um simples tutorial de "copiar e colar", este guia foi pensado para **ensinar arquitetura** — passo a passo, com atenção ao raciocínio funcional e à depuração de problemas reais.

Não vamos apenas construir uma aplicação: vamos entender **por que ela funciona** e **por que ela quebra**, explorando erros típicos (como CORS, formatos de dados incompatíveis e sincronização de estado) e aprendendo a corrigi-los com clareza.

Usaremos o clássico aplicativo **Todo List** como exemplo, pois sua simplicidade nos permite concentrar no que realmente importa: **a arquitetura e a interação entre as partes de um sistema reativo**.

---

### 🧱 O que Vamos Construir

- **Backend:** Clojure, com **Ring**, **Reitit** e **next.jdbc**;
- **Frontend:** ClojureScript, com **Reagent 2.0 (React 19)** e **Shadow-CLJS**;
- **Banco de Dados:** **SQLite**, para persistência real.

Seguiremos uma jornada incremental:

1. **Fundação:** verificação do ambiente, Git e `.gitignore`.
2. **Backend mínimo:** um servidor "Hello World".
3. **Banco em memória:** criando e lendo tarefas com um `atom`.
4. **Frontend reativo isolado:** interface dinâmica com Reagent.
5. **Integração full-stack:** comunicação via API REST, lidando com CORS e formato de dados.
6. **Banco real:** migrando para SQLite com `next.jdbc`.
7. **CRUD completo:** marcar tarefas como concluídas (**Update**) e removê-las (**Delete**), com um visual melhorado.
8. **Documentação:** um `README.md` profissional e a preparação para a entrega.

Ao final, você compreenderá **como os componentes de um sistema Clojure moderno se encaixam**, dominando o fluxo entre estado, renderização e persistência.

---

### 🗺️ A Arquitetura (Mapa Mental)

Durante quase todo o tutorial, você trabalhará com **dois terminais abertos ao mesmo tempo**:

| Terminal                  | Comando                     | O que roda                                      | Porta  |
| ------------------------- | --------------------------- | ----------------------------------------------- | ------ |
| **Terminal 1 (Backend)**  | `clj -M:run`                | A API REST (Jetty + Reitit)                     | `3000` |
| **Terminal 2 (Frontend)** | `npx shadow-cljs watch app` | O compilador CLJS + servidor de desenvolvimento | `8000` |

O navegador acessa sempre o **frontend** (`http://localhost:8000`), e o frontend conversa com o **backend** (`http://localhost:3000/api/...`) via `fetch`.

<aside markdown="1">
💡 Guarde esta tabela. A confusão mais comum do tutorial é acessar a porta errada ou esquecer que um dos dois servidores precisa estar rodando (ou precisa ser **reiniciado** após mudar o `deps.edn`).
</aside>

---

### 📌 Versões Utilizadas (Importante!)

Para garantir que o tutorial seja reprodutível, **fixamos todas as versões**. Use exatamente estas — misturar versões (principalmente do `shadow-cljs`) é a causa nº 1 de erros difíceis de diagnosticar.

| Ferramenta / Biblioteca              | Versão                                    |
| ------------------------------------ | ----------------------------------------- |
| Java (JDK)                           | 11 ou superior (17 ou 21 recomendado)     |
| Clojure CLI (`clj` / `clojure`)      | 1.11+                                     |
| Node.js                              | 18 ou superior                            |
| `shadow-cljs` (npm **e** `deps.edn`) | `2.28.23` — **a mesma nos dois lugares!** |
| `reagent/reagent`                    | `2.0.0`                                   |
| `react` / `react-dom` (npm)          | `19.2.0`                                  |
| `ring` / `ring-jetty-adapter`        | `1.12.2`                                  |
| `metosin/reitit-ring`                | `0.7.0`                                   |
| `ring/ring-json`                     | `0.5.1`                                   |
| `ring-cors/ring-cors`                | `0.1.13`                                  |
| `seancorfield/next.jdbc`             | `1.2.659`                                 |
| `org.xerial/sqlite-jdbc`             | `3.45.3.0`                                |

> [!NOTE]
> Em sistemas operacionais onde a ferramenta `rlwrap` não estiver instalada, o comando de atalho `clj` pode falhar com o erro: `Please install rlwrap for command editing or use "clojure" instead.`
> Se isso acontecer no seu ambiente, basta substituir todas as chamadas a `clj` do tutorial pela palavra `clojure` (ex: use `clojure -M:run` em vez de `clj -M:run`, e `clojure` para abrir o REPL). Ambos executam exatamente a mesma engine Clojure CLI, mas o comando `clojure` funciona sem depender do editor de linha de comando `rlwrap`.

---

### 🧾 Os Marcos do Git (Seu Histórico Final)

Este tutorial é também um exercício de **desenvolvimento incremental com Git**. Ao final, seu `git log --oneline` deve contar esta história (do mais recente para o mais antigo):

```
docs: adiciona README com instruções de execução
feat(crud): implementa funcionalidades de toggle e delete
refactor(db): substitui banco em memória por persistência SQLite
feat: conecta frontend com API do backend (CORS corrigido)
feat: implementa UI do frontend com estado local (sem API)
feat: implementa API REST de 'todos' com banco em memória
feat: implementa servidor 'Hello World' com Jetty e Reitit
feat: setup inicial do projeto com .gitignore
```

Cada fase termina com um **Git Checkpoint** que gera exatamente um desses commits.

---

### 📚 Índice das Fases

- **Fase 0:** A Fundação (Ambiente, Setup e Git)
- **Fase 1:** O Backend Mínimo (Servidor "Hello World")
- **Fase 2:** O Backend Funcional (API com Banco em Memória)
- **Fase 3:** Introdução ao Frontend (Reagent e Shadow-CLJS)
- **Fase 4:** Conectando o Frontend ao Backend (CORS e `fetch`)
- **Fase 5:** Persistência Real (SQLite com `next.jdbc`)
- **Fase 6:** 🏆 CRUD Completo — "Marcar como Feito", "Deletar" e o Visual Final
- **Fase 7:** README e Entrega

Boa jornada! 🚀

---

# Fase 0: A Fundação (Ambiente, Setup e Git)

**Objetivo:** Garantir que sua máquina tem todas as ferramentas necessárias, criar a pasta do projeto e iniciar o controle de versão com um `.gitignore` correto.

### Passo 0.1: Verificar o Ambiente (Pré-requisitos)

**Por que fazemos isso?**
Nada é mais frustrante do que descobrir, no meio da Fase 3, que o Node.js não está instalado. Vamos verificar tudo **agora**, em 30 segundos.

**Ação:** Abra seu terminal e execute os comandos abaixo, um por um:

```bash
java -version         # Precisa ser 11 ou superior (17 ou 21 recomendado)
clj --version         # O Clojure CLI (qualquer versão 1.11+).
                      # Se falhar reclamando de rlwrap, use: clojure --version
node -v               # Precisa ser 18 ou superior
git --version         # Qualquer versão recente
```

> [!NOTE]
> **Sobre o clj vs. clojure:**
> O utilitário `clj` é apenas um script wrapper que tenta executar o Clojure em conjunto com a ferramenta de edição de linha de comando `rlwrap`. Em alguns sistemas, se o `rlwrap` não estiver instalado, rodar `clj` resultará em um erro como:
> `Please install rlwrap for command editing or use "clojure" instead.`
> Se for o seu caso, não se preocupe! Você não precisa instalar nada a mais. Basta usar o comando `clojure` no lugar de `clj` em todo este tutorial (ex: `clojure --version` para testar a versão, `clojure -M:run` para rodar o backend e `clojure` para REPL). Ambos executam exatamente o mesmo compilador.

**Resultado Esperado:** Cada comando deve imprimir uma versão. Se algum deles der `command not found`:

- **Java:** instale um JDK (ex: [Adoptium/Temurin](https://adoptium.net/)).
- **Clojure CLI:** siga o guia oficial em [clojure.org/guides/install_clojure](https://clojure.org/guides/install_clojure).
- **Node.js:** instale a versão LTS em [nodejs.org](https://nodejs.org/).
- **Git:** [git-scm.com](https://git-scm.com/).

<aside markdown="1">
💡 O `npm` (gerenciador de pacotes do Node) vem junto com o Node.js. Você pode confirmar com `npm -v`.
</aside>

### Passo 0.2: Criar a Estrutura de Pastas

Primeiro, vamos criar um diretório principal para o projeto e navegar para dentro dele.

**Ação:** No seu terminal, execute:

```bash
mkdir todo-app
cd todo-app
```

Agora, você deve estar dentro da pasta `todo-app/`. Esta será a "raiz" (root) de todo o nosso projeto, onde colocaremos o `deps.edn`, o `.gitignore` e tudo mais.

<aside markdown="1">
⚠️ **Todos os comandos deste tutorial são executados a partir desta pasta raiz** (`todo-app/`), a menos que digamos o contrário. Se um comando falhar com "arquivo não encontrado", a primeira coisa a verificar é: *estou na pasta certa?* (use `pwd` para conferir).
</aside>

### Passo 0.3: Iniciar o Git

**Por que fazemos isso?**
O Git é nosso sistema de controle de versão. Pense nele como uma "máquina do tempo" para o nosso código. Ele nos permite salvar "fotos" (chamadas _commits_) do nosso projeto à medida que avançamos. Se algo quebrar, podemos facilmente voltar para uma versão que funcionava.

**Ação:** Dentro da pasta `todo-app/`, execute:

```bash
git init
git branch -m main
```

**O que vai acontecer?** Você verá uma resposta parecida com:
`Initialized empty Git repository in /path/to/your/todo-app/.git/`

O Git criou um subdiretório oculto chamado `.git`. É ali que ele armazena todo o histórico. Você não precisa (e geralmente não deve) mexer nesse diretório diretamente. O segundo comando apenas renomeia a branch principal para `main` (o padrão moderno).

### Passo 0.4: Criar o `.gitignore`

**Por que fazemos isso?**
O Git agora está observando _tudo_ em sua pasta. Mas não queremos salvar tudo. Existem arquivos que **não** devem ir para o controle de versão:

1. **Dependências:** pastas como `node_modules/` podem ter milhares de arquivos. Elas podem ser reinstaladas a qualquer momento.
2. **Arquivos compilados:** o Clojure e o shadow-cljs criam pastas de "saída" (como `target/` ou `resources/public/js/`). Nosso código-fonte é o que importa; o código compilado é apenas um resultado.
3. **Arquivos de sistema/IDE:** seu sistema operacional ou sua IDE podem criar "lixo" (como `.DS_Store` ou `.calva/`).
4. **Dados gerados pela aplicação:** na Fase 5, nossa aplicação criará um arquivo de banco de dados (`prod.db`). Ele é _resultado_ da aplicação rodando, não código-fonte — já vamos deixá-lo ignorado desde agora.
5. **Segredos:** se um dia você tiver uma chave de API ou senha, ela também iria para o `.gitignore` para _nunca_ ser enviada ao GitHub.

**Ação:** Crie um novo arquivo na raiz do projeto chamado `.gitignore` (começando com um ponto) e cole o seguinte conteúdo:

```gitignore
# --- Geral ---
# Arquivos de sistema operacional
.DS_Store
Thumbs.db
*.log

# --- Dependências ---
# Dependências do Node.js (para shadow-cljs)
/node_modules/

# --- Clojure & Java ---
# Pasta de build padrão
/target/

# Cache de dependências do Clojure CLI
.cpcache/
.clj-kondo/
.cider-repl-history

# --- shadow-cljs (Frontend) ---
# Saída do build do frontend
/resources/public/js/

# Cache do shadow-cljs
.shadow-cljs/

# --- IDEs ---
# VS Code
.vscode/

# Emacs
*~
\#*\#

# Calva (VS Code Clojure)
.calva/

# --- Banco de Dados (usado a partir da Fase 5) ---
*.db
*.sqlite
*.sqlite3
```

### O que fizemos?

Instruímos o Git a ignorar as pastas e arquivos mais comuns de um projeto Clojure/ClojureScript — **incluindo, desde já, o arquivo do banco de dados** que só aparecerá na Fase 5. Assim ninguém commita o `prod.db` por acidente.

Agora, quando você executar `git status`, verá seu novo arquivo `.gitignore`, mas não verá nenhuma das pastas listadas (mesmo que elas existam).

### Passo 0.5: O Primeiro Commit

**Por que fazemos isso?**
Até agora, criamos um arquivo (`.gitignore`) e o Git sabe que ele existe, mas ele não foi "salvo" na nossa linha do tempo.

O processo no Git é sempre em duas etapas:

1. **Stage (Preparar):** você diz ao Git quais arquivos quer incluir na próxima "foto". O comando é `git add`.
2. **Commit (Salvar):** você tira a "foto" de todos os arquivos preparados e anexa uma mensagem. O comando é `git commit`.

**Ação:** Execute estes dois comandos, um após o outro:

```bash
# 1. Adiciona TODOS os arquivos novos ou modificados na área de "Stage"
#    (neste caso, apenas o .gitignore)
git add .

# 2. Salva (faz o commit) os arquivos que estão em "Stage"
#    -m "..." é a mensagem que descreve o que fizemos
git commit -m "feat: setup inicial do projeto com .gitignore"
```

**Resultado Esperado:**

```
[main (root-commit) a1b2c3d] feat: setup inicial do projeto com .gitignore
 1 file changed, 40 insertions(+)
 create mode 100644 .gitignore
```

<aside markdown="1">
💡 **Se o Git reclamar de identidade** (`Please tell me who you are`), configure uma vez:

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"
```

e repita o `git commit`.

</aside>

### O que fizemos?

Salvamos a "Versão Zero" do nosso projeto. Você pode executar `git log` a qualquer momento para ver o histórico.

**Sobre a Mensagem de Commit (`feat: ...`):**
A mensagem `feat: setup inicial...` segue uma convenção chamada **Conventional Commits**:

- `feat:` significa _feature_ (uma nova funcionalidade — neste caso, o próprio setup).
- Outros prefixos comuns: `fix:` (corrige um bug), `docs:` (documentação), `refactor:` (muda o código sem mudar o comportamento) e `style:` (formatação/visual).
- Usar isso torna seu histórico Git muito fácil de ler — e é **exatamente o que será avaliado** no seu repositório.

---

**Fim da Fase 0!** 🏁

Temos uma fundação sólida: ambiente verificado, uma pasta de projeto limpa, um repositório Git rastreando nossas mudanças e um `.gitignore` para manter o "lixo" do lado de fora.

---

# Fase 1: O Backend Mínimo (Servidor "Hello World")

**Objetivo:** Fazer um servidor web subir, rodar na sua máquina e responder "Hello, World!" quando acessado por uma URL. Isso prova que nossa configuração base está correta.

### Passo 1.1: O `deps.edn` (A "Lista de Compras" do Backend)

**O que é o `deps.edn`?**
Pense neste arquivo como a "lista de compras" do seu projeto. Ele diz ao Clojure (`clj`) quais bibliotecas (dependências) ele precisa baixar da internet para o projeto funcionar.

Ele também define "apelidos" (_aliases_), que são atalhos para comandos que usamos com frequência, como "rodar o servidor".

**Ação:** Crie o arquivo `deps.edn` na raiz do projeto (`todo-app/`) e cole o seguinte conteúdo:

```clojure
{:paths ["src" "resources"] ;; 1. Onde nosso código-fonte vai ficar

 :deps ;; 2. Nossa "lista de compras" de bibliotecas
 {;; O próprio Clojure
  org.clojure/clojure {:mvn/version "1.11.1"}

  ;; --- Dependências do Backend (API REST) ---
  ;; O "motor" do servidor web (Jetty) e as bibliotecas base do Ring
  ring/ring-core          {:mvn/version "1.12.2"}
  ring/ring-jetty-adapter {:mvn/version "1.12.2"}

  ;; A biblioteca de roteamento (para definir as URLs)
  metosin/reitit-ring     {:mvn/version "0.7.0"}}

 :aliases ;; 3. Nossos "atalhos" de comando
 {;; O alias que usaremos para iniciar o servidor
  :run
  {:main-opts ["-m" "todo.backend.core"]}}}
```

### O que fizemos?

1. **`:paths`**: dissemos ao Clojure para procurar nosso código nas pastas `src` e `resources` (que ainda vamos criar).
2. **`:deps`**: pedimos _apenas_ as bibliotecas essenciais do backend:
   - `ring/ring-jetty-adapter`: o servidor web que vai "ouvir" na `localhost:3000`.
   - `metosin/reitit-ring`: o "roteador" que olha a URL (ex: `/api/hello`) e decide qual função Clojure deve ser chamada.
   - **Nota:** ainda _não_ adicionamos `shadow-cljs` ou `reagent`. Faremos isso só na Fase 3, para manter o backend limpo.
3. **`:aliases`**: criamos o atalho `:run`. Quando rodarmos `clj -M:run`, ele executará a função principal (`-main`) do namespace `todo.backend.core` (que vamos criar a seguir).

### Passo 1.2: O Handler Mínimo (`handler.clj`)

**O que é um "Handler"?**
No mundo do **Ring** (a biblioteca base da web em Clojure), um _handler_ é simplesmente uma **função** que segue um contrato:

1. Ela recebe **um** argumento: um mapa `request` (com todos os dados da requisição HTTP que chegou).
2. Ela retorna **um** valor: um mapa `response` (que descreve a resposta que queremos enviar de volta).

Nosso objetivo é criar a `hello-handler` mais simples possível.

**Ação 1: Criar os diretórios**

O `deps.edn` diz ao Clojure para procurar código na pasta `src/`. Em Clojure, os namespaces são mapeados diretamente para a estrutura de pastas: `todo.backend.handler` deve viver no arquivo `src/todo/backend/handler.clj`.

No seu terminal (dentro de `todo-app/`), execute:

```bash
mkdir -p src/todo/backend
```

- `mkdir` cria diretórios; a flag `-p` cria todos os "diretórios pais" necessários no caminho, sem dar erro.

<aside markdown="1">
💡 **O que é um Namespace (`ns`)?**

Em Clojure, não "importamos arquivos", nós "requeremos namespaces". Um namespace é um nome para um grupo de códigos, diretamente ligado à estrutura de pastas e ao nome do arquivo:

| **Caminho do Arquivo**         | **Declaração de Namespace (no topo do arquivo)** |
| ------------------------------ | ------------------------------------------------ |
| `src/todo/backend/db.clj`      | `(ns todo.backend.db ...)`                       |
| `src/todo/backend/handler.clj` | `(ns todo.backend.handler ...)`                  |

Quando, em outro arquivo, quisermos usar as funções do `db.clj`, vamos "requerer" o namespace `todo.backend.db`, geralmente com um apelido (_alias_):

```clojure
(ns todo.backend.handler
  (:require [todo.backend.db :as db])) ;; "db" agora é o apelido
```

⚠️ **Atenção a um detalhe que pega muita gente:** se o namespace tem um hífen no nome (ex: `db-config`), o **arquivo** usa _underscore_ (`db_config.clj`). Hífen no `ns`, underscore no nome do arquivo.

</aside>

**Ação 2: Criar o arquivo do handler**

Crie o arquivo `src/todo/backend/handler.clj` e cole o seguinte código:

```clojure
(ns todo.backend.handler
  "Este namespace define nossas 'funções de resposta' (Handlers).")

(defn hello-handler
  "Nosso primeiro handler. Ele apenas diz 'Olá, Mundo!'"

  [_request] ;; 1. O handler recebe a 'request' como argumento.
             ;;    Usamos '_' para sinalizar que, nesta função,
             ;;    vamos ignorar esse argumento.

  ;; 2. O handler retorna um mapa de 'response'.
  {:status 200            ;; :status 200 é o código HTTP para "OK"
   :body "Hello, World!"}) ;; :body é o conteúdo enviado ao navegador
```

### O que fizemos?

Criamos nossa primeira peça de lógica: uma função pura e simples que atende ao contrato do Ring — ignora a entrada e retorna um mapa de resposta com status `200` e o texto "Hello, World!".

No entanto, essa função não faz nada sozinha. Precisamos de duas coisas:

1. Um **Servidor** (Jetty) para "ouvir" na `localhost:3000`.
2. Um **Roteador** (Reitit) para dizer: "quando chegar um `GET` em `/api/hello`, execute a `hello-handler`".

### Passo 1.3: O Servidor e o Roteador (`core.clj`)

O `core.clj` é o "cérebro" que junta todas as peças:

1. **Inicia o servidor** (Jetty), que escuta na porta `3000`.
2. **Define o roteador** (Reitit), que mapeia URLs para handlers.
3. É o **ponto de entrada** que o comando `clj -M:run` (definido no `deps.edn`) executa.

**Ação:** Crie o arquivo `src/todo/backend/core.clj` (na mesma pasta do `handler.clj`) e cole:

```clojure
(ns todo.backend.core
  (:require [ring.adapter.jetty :as jetty]       ;; 1. O software do Servidor (Jetty)
            [reitit.ring :as ring]               ;; 2. O Roteador (Reitit)
            [todo.backend.handler :as handler])  ;; 3. Nossas funções (handler.clj)
  (:gen-class))

;; --- 1. Definição das Rotas ---
;; A URL "/api/hello", quando acessada com o método :get,
;; deve executar nossa função handler/hello-handler.
(def app-routes
  (ring/router
   [["/api/hello" {:get {:handler handler/hello-handler}}]]))

;; --- 2. Definição da Aplicação (App) ---
;; O 'app' final é a função Ring principal.
(def app
  (ring/ring-handler
   app-routes                     ;; Nossas rotas
   (ring/create-default-handler))) ;; Um handler padrão para 404 (Not Found)

;; --- 3. Função para Iniciar o Servidor ---
(defn start-server [port]
  (println (str "Servidor iniciado na porta " port))
  ;; #'app passa a "var" da nossa app para o Jetty (útil no desenvolvimento)
  ;; :join? false evita que o servidor bloqueie a thread principal.
  (jetty/run-jetty #'app {:port port :join? false}))

;; --- 4. Ponto de Entrada Principal (-main) ---
;; Esta é a função que o alias :run (do deps.edn) procura.
(defn -main [& args]
  ;; Permite passar a porta como argumento (ex: clj -M:run 8080)
  ;; ou usa "3000" como padrão.
  (let [port (Integer/parseInt (or (first args) "3000"))]
    (start-server port)))
```

### O que fizemos?

1. **`(:require ...)`**: importamos nossas "ferramentas": Jetty, Reitit e nosso próprio `handler.clj`.
2. **`(:gen-class)`**: prepara este namespace para ser compilado como uma classe Java. Não é estritamente obrigatório para rodar com `clj -M:run`, mas é a convenção para namespaces com `-main` e será necessário se um dia você quiser empacotar a aplicação em um `.jar` executável. Vamos mantê-lo como boa prática.
3. **`app-routes`**: nosso "mapa do site". Por enquanto, com uma única rota.
4. **`app`**: a aplicação Ring principal, que "entrega" nossas rotas ao Jetty.
5. **`-main`**: a função que o `deps.edn` chama; pega a porta (ou usa `3000`) e chama `start-server`.

Neste ponto, temos as três peças: `deps.edn` (1.1), `handler.clj` (1.2) e `core.clj` (1.3). Vamos ver a mágica acontecer.

### Passo 1.4: Teste (Navegador e Terminal)

**Ação 1: Inicie o servidor**

No terminal, na raiz do projeto (onde está o `deps.edn`), execute:

```bash
clj -M:run
```

**Resultado Esperado:** Na primeira vez, o Clojure vai **baixar todas as dependências** (pode demorar um pouco — várias linhas de download aparecerão). Em seguida:

```
Servidor iniciado na porta 3000
```

**Importante:** este terminal agora está "ocupado" rodando o servidor. Deixe-o rodando.

**Ação 2: Teste no navegador**

1. Abra o navegador.
2. Digite a URL exata da nossa rota: `http://localhost:3000/api/hello`
3. Pressione Enter.

**Resultado Esperado:** a página deve mostrar apenas o texto do `:body` do nosso handler:

```
Hello, World!
```

**Ação 3: Teste no terminal com `curl`**

Para o restante do tutorial, usaremos bastante o `curl`, pois ele nos permite testar _todos_ os métodos HTTP (`GET`, `POST`, `DELETE`, etc.).

1. Abra um **novo** terminal (deixe o servidor rodando no primeiro).
2. Execute:

```bash
curl http://localhost:3000/api/hello
```

**Resultado Esperado:** o `curl` imprime o `:body` diretamente no terminal:

```
Hello, World!
```

### Se algo deu errado…

| Sintoma                                 | Causa provável                                                                                                           |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `Connection refused`                    | O servidor não está rodando no Terminal 1 (ou caiu com erro).                                                            |
| `404 Not Found`                         | Erro de digitação na URL ou na rota do `core.clj` (`/api/hello`).                                                        |
| `Could not locate todo/backend/core...` | O caminho do arquivo não bate com o namespace (confira `src/todo/backend/core.clj`) ou você não está na raiz do projeto. |
| Erro de sintaxe ao iniciar              | Algum parêntese a mais/menos ao colar. Compare com o código acima com calma.                                             |

### Passo 1.5: Git Checkpoint ("Hello World")

**Por que fazemos isso?**
Se, na próxima fase, ao adicionar a lógica do banco, quebrarmos tudo acidentalmente, teremos um "ponto seguro" para o qual podemos voltar.

**Ação 1:** No terminal do servidor, pare-o (`Ctrl+C`). Agora, veja o que o Git enxerga:

```bash
git status
```

**Resultado Esperado:** o Git mostrará os arquivos novos ("Untracked files"): `deps.edn` e `src/`.

**Ação 2:** Prepare e salve:

```bash
git add .
git commit -m "feat: implementa servidor 'Hello World' com Jetty e Reitit"
```

**Resultado Esperado:**

```
[main 1a2b3c4] feat: implementa servidor 'Hello World' com Jetty e Reitit
 3 files changed, ...
 create mode 100644 deps.edn
 create mode 100644 src/todo/backend/core.clj
 create mode 100644 src/todo/backend/handler.clj
```

---

**Fim da Fase 1!** 🏁

Temos um projeto Git limpo, com um servidor web "Hello World" totalmente funcional e testado. Agora estamos prontos para construir a lógica de negócios real: a API, começando pelo "banco de dados em memória" (`atom`).

---

# Fase 2: O Backend Funcional (API com Banco em Memória)

**Objetivo:** Construir a lógica de negócios da nossa API. Antes de nos preocuparmos com um banco de dados real, vamos criar um "banco de dados" que vive _apenas na memória_.

### Passo 2.1: O Conceito (Imutabilidade e por que precisamos de `atom`s)

Em muitas linguagens, se você tem uma lista de "todos", você simplesmente "adiciona" (push/append) um novo item, e a lista original é _modificada_.

Em Clojure, as estruturas de dados (como mapas `{}` e vetores `[]`) são **imutáveis**: uma vez criado, um valor **nunca** pode ser alterado.

Vamos ver um exemplo rápido. `conj` é a função para "adicionar" a um vetor:

```clojure
;; 1. Criamos um vetor chamado 'meu-vetor'
user=> (def meu-vetor [1 2])
#'user/meu-vetor

;; 2. "Adicionamos" o número 3 a ele
user=> (conj meu-vetor 3)
[1 2 3]

;; 3. Agora, vamos checar o 'meu-vetor' original
user=> meu-vetor
[1 2]
```

Veja! O `meu-vetor` original **não mudou**. A função `(conj meu-vetor 3)` não _modificou_ o vetor; ela _retornou um novo vetor_ com o item adicionado.

**Isso cria um problema para nós:** se nosso banco fosse `(def todos-db {})`, ele seria um mapa vazio _para sempre_. Como "salvar" um novo todo?

**A Solução: o `atom` (a "caixa" segura)**

Nós colocamos nosso valor imutável (um mapa `{}`) dentro de uma "caixa" de referência: um **`atom`**.

- O **valor dentro da caixa** (o mapa) é imutável.
- O **`atom` é a caixa** em si.
- Nós não _mudamos_ o valor: nós **trocamos** (_swap_) o valor antigo por um valor _totalmente novo_ dentro da caixa.

Para trabalhar com `atom`s, usamos três coisas:

1. **`(atom {...})`**: o **construtor** — cria a caixa com um valor inicial dentro.
2. **`@`** (lê-se "deref"): o **leitor** — "olha dentro" da caixa e vê o valor atual.
3. **`(swap! ...)`**: o **escritor** — troca o conteúdo da caixa aplicando uma função ao valor antigo. Ele é "atômico" (daí o nome): mesmo que 1000 requisições tentem criar um todo ao mesmo tempo, nenhuma escrita é perdida.

### Passo 2.2: O Banco (`db.clj`)

**Ação:** Crie o arquivo `src/todo/backend/db.clj` (ao lado de `core.clj` e `handler.clj`) e cole:

```clojure
(ns todo.backend.db
  "Este namespace gerencia os dados dos 'todos' em memória.")

;; (def) cria uma 'var' global.
;; (atom {}) cria nossa "caixa" (atom) e coloca
;; um mapa imutável vazio {} dentro dela.
(def todos-db (atom {}))
;; Nosso banco terá a forma: {1 {:id 1, :title "..."}, 2 {:id 2, ...}}

;; Uma "caixa" separada para o contador de IDs.
(def next-id (atom 1))

;; --- Nossas Funções de Acesso ao Banco ---

(defn get-all-todos
  "Retorna uma lista com todos os 'todos' no banco."
  []
  ;; @todos-db: "olha dentro" da caixa (lê o valor).
  ;; (vals): pega apenas os valores do mapa (ignora as chaves/IDs).
  (vec (vals @todos-db)))

(defn create-todo
  "Cria um novo 'todo', salva no banco e o retorna."
  [todo-data] ;; ex: {:title "Minha tarefa"}
  (let [;; 1. Lê o ID atual (ex: 1) usando '@'
        id @next-id

        ;; 2. Cria um NOVO mapa imutável com os dados completos
        new-todo (assoc todo-data
                        :id id
                        :completed false
                        :created-at (str (java.time.Instant/now)))]

    ;; 3. (swap!): "troca" o conteúdo da caixa 'todos-db',
    ;;    aplicando 'assoc' ao mapa antigo para criar um novo.
    (swap! todos-db assoc id new-todo)

    ;; 4. Incrementa o contador na caixa 'next-id'.
    (swap! next-id inc)

    ;; 5. Retorna o 'todo' recém-criado.
    new-todo))
```

### O que fizemos?

- **`todos-db` e `next-id`**: dois `atom`s (caixas) para guardar nosso "banco" e nosso contador de IDs.
- **`get-all-todos`**: uma função que _lê_ o atom (`@`).
- **`create-todo`**: uma função que _escreve_ no atom (`swap!`), adicionando um todo e incrementando o ID.

Agora temos a lógica do banco. Mas, como bons engenheiros, não vamos _assumir_ que funciona. Vamos _provar_.

### Passo 2.3: Teste no REPL

**O que é o REPL?**
REPL significa **Read-Eval-Print-Loop** (Ler-Avaliar-Imprimir-Repetir). É um terminal interativo do Clojure: você digita uma expressão, o Clojure a executa e imprime o resultado. É a ferramenta número um do desenvolvimento em Clojure.

**Ação 1: Inicie o REPL**

Na raiz do projeto:

```bash
clj
```

Você verá um prompt `user=>`. Agora você está "dentro" do Clojure.

**Ação 2: Carregue seu namespace**

```clojure
user=> (require '[todo.backend.db :as db])
```

O REPL deve responder `nil`. Isso é **bom**: significa que o Clojure encontrou e leu seu `db.clj` sem erros. Agora as funções públicas estão disponíveis com o prefixo `db/`.

**Ação 3: Teste as funções!**

```clojure
;; 1. Veja se o banco está vazio
user=> (db/get-all-todos)
[]

;; 2. Crie um 'todo'
user=> (db/create-todo {:title "Testar o REPL"})
{:title "Testar o REPL", :id 1, :completed false, :created-at "2026-..."}

;; 3. Veja se foi salvo!
user=> (db/get-all-todos)
[{:title "Testar o REPL", :id 1, :completed false, :created-at "..."}]

;; 4. Crie mais um
user=> (db/create-todo {:title "Aprender Clojure" :description "É divertido"})
{:title "Aprender Clojure", :description "É divertido", :id 2, ...}

;; 5. Veja a lista completa
user=> (db/get-all-todos)
[{:title "Testar o REPL", :id 1, ...}
 {:title "Aprender Clojure", :description "É divertido", :id 2, ...}]
```

**Ação 4 (Opcional): olhe "dentro" das caixas**

```clojure
;; O mapa completo de 'todos'
user=> @db/todos-db
{1 {:title "Testar o REPL", ...}, 2 {:title "Aprender Clojure", ...}}

;; O contador de ID (deve ser 3 agora)
user=> @db/next-id
3
```

### O que fizemos?

Validamos **100%** da lógica de banco sem tocar em servidor, navegador ou rota. Temos confiança total de que o `db.clj` funciona.

**Para sair do REPL:** pressione `Ctrl+D` (ou digite `(System/exit 0)`).

<aside markdown="1">
⚠️ Não existe um comando `(exit)` no REPL do `clj` — se você tentar, verá um erro `Unable to resolve symbol: exit`. Use `Ctrl+D`.
</aside>

### Passo 2.4: Atualização Incremental (Handlers)

Nosso `db.clj` está testado. Agora vamos "conectá-lo" ao servidor web em duas etapas: primeiro ensinamos o `handler.clj` a chamar o `db.clj`; depois ensinamos o `core.clj` (o roteador) a chamar os novos handlers.

**Ação 1: Adicionar os `require`s**

Abra `src/todo/backend/handler.clj`. _Substitua_ a declaração do namespace:

```clojure
(ns todo.backend.handler
  "Este namespace define nossas 'funções de resposta' (Handlers).")
```

por esta:

```clojure
(ns todo.backend.handler
  "Este namespace define nossas 'funções de resposta' (Handlers)."
  (:require [todo.backend.db :as db]     ;; <- ADICIONE ISTO
            [clojure.string :as str]))   ;; <- E ISTO (para validação)
```

**Ação 2: Adicionar os novos handlers**

Agora, _abaixo_ da função `hello-handler` existente, adicione estas duas funções. Note como elas são a "ponte" entre o HTTP e o nosso `db.clj`:

```clojure
;; --- Handler para Listar Todos ---
(defn list-todos-handler
  "Handler para a rota GET /api/todos."
  [_request]
  ;; Chama nossa função de banco e a coloca no 'body'
  {:status 200
   :body {:todos (db/get-all-todos)}})

;; --- Handler para Criar um Todo ---
(defn create-todo-handler
  "Handler para a rota POST /api/todos."
  [request]
  ;; :body é um mapa Clojure que o *middleware*
  ;; (que adicionaremos no próximo passo) vai criar para nós
  ;; a partir do JSON que o cliente enviar.
  (let [todo-data (:body request)
        title (:title todo-data)]

    ;; É uma boa prática validar os dados que chegam.
    (if (and title (not (str/blank? title)))
      ;; Sucesso! Os dados são válidos.
      (let [new-todo (db/create-todo todo-data)]
        ;; :status 201 = "Created"
        {:status 201
         :body new-todo})

      ;; Erro de validação.
      {:status 400 ;; "Bad Request"
       :body {:error "O 'título' (title) é obrigatório"}})))
```

**Importante:** o servidor ainda não sabe sobre essas funções. Se você rodar agora, `/api/todos` ainda dará `404`.

### Passo 2.5: Atualizar o `deps.edn` (JSON)

Nosso `create-todo-handler` precisa receber JSON, e o `list-todos-handler` quer _enviar_ JSON. Quem faz essas conversões são os **middlewares** da biblioteca `ring-json`, que ainda não está na nossa "lista de compras".

**Ação:** Abra o `deps.edn` e adicione a linha do `ring/ring-json` ao bloco `:deps`:

```clojure
 :deps
 {org.clojure/clojure {:mvn/version "1.11.1"}

  ;; --- Dependências do Backend (API REST) ---
  ring/ring-core          {:mvn/version "1.12.2"}
  ring/ring-jetty-adapter {:mvn/version "1.12.2"}

  ring/ring-json          {:mvn/version "0.5.1"} ;; <- ADICIONE ESTA LINHA

  metosin/reitit-ring     {:mvn/version "0.7.0"}}
```

<aside markdown="1">
💡 **Regra de ouro:** sempre que o `deps.edn` mudar, o servidor precisa ser **parado e reiniciado** para baixar/carregar a nova dependência. Mudanças no `deps.edn` nunca são aplicadas "a quente".
</aside>

### Passo 2.6: Atualizar o `core.clj` (Rotas e Middlewares)

**O que é Middleware?**
Pense em middlewares como "assistentes" que "envelopam" seu handler. Eles rodam **antes** e **depois** dele, para fazer tarefas comuns:

- `Request (JSON)` → **Middleware (converte JSON → mapa)** → `Seu Handler`
- `Seu Handler` → **Middleware (converte mapa → JSON)** → `Response (JSON)`

**Ação 1: Adicionar os `require`s de middleware**

No topo do `src/todo/backend/core.clj`:

```clojure
(ns todo.backend.core
  (:require [ring.adapter.jetty :as jetty]
            [reitit.ring :as ring]
            ;; --- ADICIONE ESTAS 3 LINHAS ---
            [ring.middleware.json :refer [wrap-json-response wrap-json-body]]
            [ring.middleware.params :refer [wrap-params]]
            [ring.middleware.keyword-params :refer [wrap-keyword-params]]
            ;; --------------------------------
            [todo.backend.handler :as handler])
  (:gen-class))
```

**Ação 2: Atualizar as rotas (`app-routes`)**

Vamos adicionar `GET /api/todos` e `POST /api/todos`, aninhando todas as rotas sob o prefixo comum `/api`:

```clojure
(def app-routes
  (ring/router
   ;; Aninhamos tudo sob "/api"
   ["/api"
    ["/hello" {:get {:handler handler/hello-handler}}]

    ["/todos"
     {:get  {:handler handler/list-todos-handler}      ;; GET  chama 'list'
      :post {:handler handler/create-todo-handler}}]])) ;; POST chama 'create'
```

**Ação 3: Substituir o `def app` (adicionar os middlewares)**

Nosso `def app` atual é muito simples. Substitua-o por esta versão:

```clojure
(def app
  (ring/ring-handler
   app-routes                     ;; Nossas rotas
   (ring/create-default-handler)  ;; Handler padrão para 404 (Not Found)

   ;; --- A "Linha de Montagem" de Middlewares ---
   ;; A requisição percorre o vetor DE CIMA PARA BAIXO até chegar
   ;; ao handler; a resposta volta DE BAIXO PARA CIMA.
   {:middleware [;; 1. Converte a *resposta* (nosso mapa) em JSON
                 wrap-json-response

                 ;; 2. Converte o *corpo* da requisição (JSON)
                 ;;    em um mapa Clojure e o coloca em :body
                 [wrap-json-body {:keywords? true}]

                 ;; 3. Lê parâmetros de URL (ex: /user?id=1)
                 ;;    e os coloca em :query-params (chaves string)
                 wrap-params

                 ;; 4. Converte as chaves-string dos parâmetros
                 ;;    em keywords ("id" -> :id).
                 ;;    Precisa vir DEPOIS do wrap-params!
                 wrap-keyword-params]}))
```

As funções `start-server` e `-main` no final do arquivo ficam exatamente como estão.

- **Vamos entender melhor o novo `(def app ...)`?**

  Pense no `:middleware` como uma **Linha de Montagem** (um _pipeline_):
  - A **Requisição** entra no topo (item 1 do vetor) e desce até o seu handler.
  - A **Resposta** sai do handler e sobe do fundo (item 4) até o topo.

  Vamos seguir uma requisição `POST /api/todos?debug=true` com o corpo `{"title": "Meu Todo"}`:

  **O Caminho da Requisição (Descendo ⬇️)**
  1. **⬇️ `wrap-json-response`** — só se importa com a _resposta_; na requisição, apenas passa adiante.
  2. **⬇️ `wrap-json-body`** — vê que o `Content-Type` é `application/json`, lê o corpo, converte a string JSON em um mapa Clojure e (graças a `{:keywords? true}`) converte as chaves em keywords. Adiciona à requisição: `{:body {:title "Meu Todo"}}`.
  3. **⬇️ `wrap-params`** — a "estação criadora": olha a URL, vê `?debug=true` e adiciona `{:query-params {"debug" "true"}}` (chaves **string**).
  4. **⬇️ `wrap-keyword-params`** — a "estação conversora": encontra os parâmetros criados no passo anterior e converte as chaves para keywords: `{:query-params {:debug "true"}}`.
  5. **⬇️ Handler** — recebe a requisição "enriquecida":

  ```clojure
  {...
   :body {:title "Meu Todo"}
   :query-params {:debug "true"}}
  ```

  **O Caminho da Resposta (Subindo ⬆️)**
  1. **⬆️ Handler** retorna um mapa Clojure puro: `{:status 201 :body {:id 1, ...}}`.
  2. **⬆️ `wrap-keyword-params`** e **⬆️ `wrap-params`** — não se importam com respostas; passam adiante.
  3. **⬆️ `wrap-json-body`** — só se importa com o _corpo da requisição_; passa adiante.
  4. **⬆️ `wrap-json-response`** — vê que o `:body` é um mapa Clojure, converte-o em uma _string JSON_ e adiciona o header `Content-Type: application/json`.

  É por isso que a **ordem é crucial**: o `wrap-params` precisa **criar** os parâmetros _antes_ que o `wrap-keyword-params` possa convertê-los — por isso, no vetor, `wrap-params` vem **antes** de `wrap-keyword-params` (a requisição percorre o vetor de cima para baixo).

### Passo 2.7: Teste (API Completa com `curl`)

**Ação 1: Reinicie o servidor**

Pare o servidor (`Ctrl+C`, se estiver rodando) e inicie de novo, para carregar a nova dependência e o novo código:

```bash
clj -M:run
```

O `clj` vai baixar o `ring/ring-json` e então: `Servidor iniciado na porta 3000`. Deixe rodando.

**Ação 2: Teste em um novo terminal**

**Teste 1 — Listar todos (deve estar vazio):**

```bash
curl http://localhost:3000/api/todos
```

**Resultado Esperado:** uma string JSON com um array vazio. Isso prova que `list-todos-handler` e `wrap-json-response` funcionam:

```json
{ "todos": [] }
```

**Teste 2 — Criar um todo:**

```bash
curl -X POST http://localhost:3000/api/todos \
     -H "Content-Type: application/json" \
     -d '{"title": "Testar a API", "description": "com curl"}'
```

**Resultado Esperado** (o ID pode variar):

```json
{ "title": "Testar a API", "description": "com curl", "id": 1, "completed": false, "created-at": "..." }
```

**Teste 3 — Listar novamente:**

```bash
curl http://localhost:3000/api/todos
```

**Resultado Esperado** (o todo criado agora aparece):

```json
{ "todos": [{ "title": "Testar a API", "description": "com curl", "id": 1, "completed": false, "created-at": "..." }] }
```

**Teste 4 — Validação (título vazio):**

```bash
curl -X POST http://localhost:3000/api/todos \
     -H "Content-Type: application/json" \
     -d '{"title": ""}'
```

**Resultado Esperado:**

```json
{ "error": "O 'título' (title) é obrigatório" }
```

<aside markdown="1">
💡 **Prefere uma interface gráfica?** Ferramentas como **Insomnia** ou **Postman** fazem o mesmo que o `curl`: crie uma requisição, escolha o método (GET/POST), digite a URL e, no caso do POST, selecione *Body → JSON* e cole o corpo. O resultado deve ser idêntico.
</aside>

<aside markdown="1">
⚠️ **Erro comum no Windows:** o `curl` do PowerShell trata aspas de forma diferente. Se o POST falhar com erro de JSON, use o *Prompt de Comando* (cmd), o Git Bash, ou o Insomnia/Postman.
</aside>

### O que fizemos?

Se você viu esses resultados, **parabéns!** 🥳 Você construiu uma API REST funcional em Clojure, que:

1. Recebe e entende JSON (`POST`);
2. Usa o `atom` para salvar dados na memória;
3. Retorna dados como JSON (`GET`);
4. Valida entradas e responde com códigos HTTP corretos (`201`, `400`).

### Passo 2.8: Git Checkpoint (API Funcional)

**Ação 1:** Pare o servidor (`Ctrl+C`) e verifique:

```bash
git status
```

Ele deve listar `db.clj` (novo), e `deps.edn`, `core.clj`, `handler.clj` (modificados).

**Ação 2:** Prepare e salve:

```bash
git add .
git commit -m "feat: implementa API REST de 'todos' com banco em memória"
```

<aside markdown="1">
💡 Se você usa o **VS Code**, essa operação também pode ser feita pela aba *Source Control* da interface — inclusive a publicação no GitHub ("Publish to GitHub"), que criará o repositório remoto para você. Lembre-se: o repositório da entrega deve ser **público**.
</aside>

---

**Fim da Fase 2!** 🏁

Nosso backend tem um histórico limpo: setup → Hello World → API REST funcional. Ele está pronto e esperando por requisições. Agora, vamos construir algo para _usá-lo_.

---

# Fase 3: Introdução ao Frontend (Reagent e Shadow-CLJS)

**Objetivo:** Aprender os fundamentos do ClojureScript e do Reagent. Vamos construir uma UI interativa que gerencia seu _próprio_ estado (na memória do navegador), **sem** se comunicar com a API ainda.

<aside markdown="1">
💡 **Nesta fase, o servidor de backend (porta 3000) não é necessário.** Pode deixá-lo desligado. Vamos trabalhar apenas com o frontend (porta 8000).
</aside>

### Passo 3.1: Setup do Ambiente Node.js (`npm`)

O `shadow-cljs` (nosso compilador de frontend) é uma ferramenta "híbrida": ele é uma biblioteca Clojure (que entrará no `deps.edn`), mas também é uma ferramenta de linha de comando que roda em **Node.js**. Além disso, o React será instalado via `npm`.

**Ação:** Na raiz do projeto (`todo-app/`), execute estes dois comandos:

```bash
# 1. Cria o package.json (o "deps.edn" do mundo Node.js)
npm init -y

# 2. Instala as ferramentas, com versões FIXADAS
npm install shadow-cljs@2.28.23 react@19.2.0 react-dom@19.2.0
```

**O que esses comandos fazem?**

1. **`npm init -y`** cria o arquivo `package.json`, que rastreia as dependências de JavaScript do projeto (o `-y` aceita todas as respostas padrão).
2. **`npm install ...`** baixa as ferramentas para a pasta `node_modules/` (que nosso `.gitignore` da Fase 0 já está, corretamente, ignorando) e as registra no `package.json`.

<aside markdown="1">
⚠️ **Por que fixamos as versões?** O `shadow-cljs` existe em **dois lugares**: como pacote `npm` (a linha de comando) e como biblioteca Maven no `deps.edn` (o compilador em si). **As duas versões precisam ser idênticas.** Se você rodar apenas `npm install shadow-cljs` (sem versão), o npm instalará a versão mais recente (3.x), que não vai bater com a que colocaremos no `deps.edn` — e você verá avisos de *"version mismatch"* e erros estranhos de compilação. Fixar `2.28.23` nos dois lugares elimina esse problema pela raiz.
</aside>

### Passo 3.2: Configurar as Bibliotecas do Frontend (`deps.edn`)

**O que é o Reagent?**
O Reagent é uma biblioteca que nos permite usar o **React** (a popular biblioteca de UI) de uma forma muito limpa e "Clojure-nativa". Escrevemos vetores simples (chamados **Hiccup**), e o Reagent os transforma em componentes React super rápidos.

**Ação:** Abra o `deps.edn` e adicione as duas linhas do frontend ao bloco `:deps`:

```clojure
{:paths ["src" "resources"]

 :deps
 {org.clojure/clojure {:mvn/version "1.11.1"}

  ;; --- Dependências do Backend (API REST) ---
  ring/ring-core          {:mvn/version "1.12.2"}
  ring/ring-jetty-adapter {:mvn/version "1.12.2"}
  ring/ring-json          {:mvn/version "0.5.1"}
  metosin/reitit-ring     {:mvn/version "0.7.0"}

  ;; --- Dependências do Frontend ---
  ;; ADICIONE ESTAS DUAS LINHAS:
  ;; (a versão do shadow-cljs é a MESMA que instalamos via npm!)
  thheller/shadow-cljs    {:mvn/version "2.28.23"}
  reagent/reagent         {:mvn/version "2.0.0"}}

 :aliases
 {:run
  {:main-opts ["-m" "todo.backend.core"]}}}
```

### O que fizemos?

Nossa "lista de compras" Clojure agora inclui:

1. **`thheller/shadow-cljs`** `2.28.23`: o compilador — na mesma versão do pacote npm.
2. **`reagent/reagent`** `2.0.0`: a biblioteca de UI, na versão moderna que funciona com React 18/19.

### Passo 3.3: Configurar o Compilador (`shadow-cljs.edn`)

Temos as bibliotecas, mas precisamos de um arquivo para dizer ao `shadow-cljs` _como_ compilar nosso frontend. Este arquivo é o "cérebro" do shadow-cljs.

**Ação:** Crie um arquivo **novo** chamado `shadow-cljs.edn` na **raiz** do projeto (ao lado do `deps.edn`) e cole:

```clojure
{:deps true ;; 1. Informa ao shadow-cljs para usar o deps.edn

 :builds
 {:app ;; Damos ao nosso "build" (processo) o nome de ":app"
  {;; :browser = o destino do nosso código é um navegador web
   :target :browser

   ;; Onde o JavaScript compilado deve ser salvo
   :output-dir "resources/public/js"

   ;; O caminho que o navegador usará para acessar esses arquivos
   :asset-path "/js"

   ;; O "ponto de entrada" do nosso código.
   ;; Diz ao shadow-cljs para compilar o namespace 'todo.frontend.core'
   ;; e, quando a página carregar, chamar a função 'init'.
   :modules {:main {:init-fn todo.frontend.core/init}}

   ;; Configurações do servidor de desenvolvimento
   :devtools
   {;; O servidor serve os arquivos estáticos (como o index.html)
    ;; desta pasta:
    :http-root "resources/public"

    ;; O servidor roda na porta 8000 (diferente da API, na 3000)
    :http-port 8000}}}}
```

### O que fizemos?

1. **`:deps true`**: o shadow-cljs vai usar as dependências do nosso `deps.edn` (por isso as versões precisam bater!).
2. **`:output-dir`**: o JavaScript final irá para `resources/public/js` (pasta que o `.gitignore` já ignora).
3. **`:modules`**: o "ponto de partida" é a função `init` no namespace `todo.frontend.core` (que ainda não existe — criaremos já já).
4. **`:devtools`**: o servidor de desenvolvimento roda na **porta 8000** e serve os arquivos de `resources/public`.

### Passo 3.4: Criar o HTML Base

O shadow-cljs precisa de um `index.html` para servir ao navegador. Este arquivo é a "concha" onde nossa aplicação ClojureScript será carregada.

**Ação 1:** Crie a pasta que o servidor de desenvolvimento usa:

```bash
mkdir -p resources/public
```

**Ação 2:** Crie o arquivo `resources/public/index.html` e cole:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Todo App (CLJS)</title>
  </head>
  <body>
    <div id="app">Carregando...</div>

    <script src="/js/main.js"></script>
  </body>
</html>
```

### O que fizemos?

1. **`<div id="app">`**: o "ponto de montagem" **crucial**. Quando nossa aplicação iniciar, ela vai procurar este `div` e injetar toda a interface dentro dele.
2. **`<script src="/js/main.js">`**: carrega o JavaScript compilado que o shadow-cljs vai gerar (o nome `main.js` vem do módulo `:main` do `shadow-cljs.edn`).

### Passo 3.5: "Olá, Reagent!" (UI Estática)

**Objetivo:** provar que o compilador consegue ler nosso arquivo `.cljs`, transformá-lo em JavaScript e injetá-lo no `index.html`. Sem estado, sem botões — apenas um "Olá".

**Ação 1:** Crie a pasta do frontend:

```bash
mkdir -p src/todo/frontend
```

**Ação 2:** Crie o arquivo `src/todo/frontend/core.cljs` e cole:

```clojure
(ns todo.frontend.core
  ;; Requeremos o "coração" do Reagent (para 'r/atom' e 'r/as-element')
  (:require [reagent.core :as r]
            ;; E o DOM do Reagent (para 'create-root', API do React 18+)
            [reagent.dom.client :as rdom]))

;; --- 1. O Componente ---
;; Um componente em Reagent é apenas uma função
;; que retorna "Hiccup" (HTML escrito como vetores CLJS).
;;
;; [:h1 "Olá"] -> <h1>Olá</h1>
(defn hello-world []
  [:div
   [:h1 "Olá, Alunos!"]
   [:p "Nossa aplicação ClojureScript está funcionando."]])

;; --- 2. A Inicialização (React 18+) ---
;; Esta é a função que o shadow-cljs.edn chama.
;; Ela "monta" nosso componente [hello-world]
;; no <div id="app"> do nosso index.html.
(defn ^:export init []
  (println "Frontend inicializado...")
  (let [root (rdom/create-root (js/document.getElementById "app"))]
    (.render root (r/as-element [hello-world]))))
```

**Ação 3: Compile e rode**

No terminal (pode ser o mesmo de antes, já que o backend está desligado):

```bash
npx shadow-cljs watch app
```

- Na **primeira vez**, o shadow-cljs vai baixar várias dependências — pode demorar alguns minutos. Espere até ver algo como `Build completed`.
- O comando `watch` fica **observando** seus arquivos: cada vez que você salvar um `.cljs`, ele recompila automaticamente (_hot-reload_). Deixe este terminal rodando — ele será o nosso **Terminal 2 (Frontend)** daqui em diante.

**Ação 4: Abra o navegador em** `http://localhost:8000`

**Resultado Esperado:** a página não deve mais mostrar "Carregando...". Em vez disso:

> **Olá, Alunos!**
> Nossa aplicação ClojureScript está funcionando.

### Se algo deu errado…

| Sintoma                                     | Causa provável                                                                                                                               |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `shadow-cljs - dependency version mismatch` | A versão do shadow-cljs no `npm` é diferente da do `deps.edn`. Confira o Passo 3.1/3.2: ambas devem ser `2.28.23`.                           |
| Página continua em "Carregando..."          | O build falhou. Olhe o terminal do `watch`: haverá um erro de compilação apontando arquivo e linha. Console do navegador (F12) também ajuda. |
| `port 8000 already in use`                  | Outro processo está usando a porta. Pare-o ou mude o `:http-port` no `shadow-cljs.edn`.                                                      |
| `Cannot find module 'react'`                | O `npm install` do Passo 3.1 não foi executado (ou foi executado em outra pasta).                                                            |

### Passo 3.6: O "Cérebro" Reativo (o `r/atom`)

**A ligação: `atom` (Backend) vs. `r/atom` (Frontend)**

Na **Fase 2**, aprendemos o `atom` do Clojure:

- **O problema:** a imutabilidade — não podíamos "mudar" um mapa.
- **A solução:** uma "caixa" segura onde _trocamos_ (`swap!`) o valor antigo por um novo.

No **frontend**, temos um problema parecido: como a UI (o HTML) vai "saber" quando um valor muda? A solução do Reagent é a sua própria versão do atom: `reagent.core/atom` (que apelidamos de `r/atom`).

**Qual é a diferença?**

1. **Sintaxe:** nenhuma! Você usa `@` para ler, `swap!` para atualizar e `reset!` para substituir — exatamente como aprendeu.
2. **A "mágica":** o `r/atom` é uma caixa que **"toca um sino"**. Qualquer componente que "lê" um `r/atom` (usando `@`) está "ouvindo" esse sino. Quando você usa `swap!` ou `reset!`, o sino toca, e o Reagent redesenha automaticamente _apenas_ os componentes que estavam ouvindo.

Vamos provar isso com um contador.

**Ação 1:** _Substitua_ todo o conteúdo do `src/todo/frontend/core.cljs` por:

```clojure
(ns todo.frontend.core
  (:require [reagent.core :as r]
            [reagent.dom.client :as rdom]))

;; --- 1. O "Cérebro" (o r/atom) ---
;;
;; (defonce) garante que o valor (o 0) NÃO seja resetado
;; toda vez que o "hot-reload" do shadow-cljs recompilar.
(defonce app-state (r/atom 0))

;; --- 2. O Componente ---
(defn counter-app []
  [:div
   [:h1 "Entendendo o 'r/atom'"]

   ;; (Leitura): "lemos" o valor dentro da caixa usando '@'
   [:p "O valor atual do contador é: " @app-state]

   [:button
    ;; (Escrita): no clique, usamos 'swap!' para "trocar"
    ;; o valor na caixa, aplicando a função 'inc'.
    {:on-click #(swap! app-state inc)}
    "Clique para Incrementar"]

   [:button
    {:on-click #(reset! app-state 0)}
    "Resetar"]])

;; --- 3. A Inicialização ---
(defn ^:export init []
  (println "Frontend 'Contador' inicializado...")
  (let [root (rdom/create-root (js/document.getElementById "app"))]
    (.render root (r/as-element [counter-app]))))
```

**Ação 2 (Teste):**

1. Salve o arquivo. O shadow-cljs (Terminal 2) recompila sozinho.
2. Vá ao navegador em `http://localhost:8000`.
3. **Teste a mágica:** clique nos botões. O número muda instantaneamente, sem recarregar a página.

**A lição:** você acabou de aprender o "coração" do Reagent: `(defonce app-state (r/atom ...))` (o cérebro), `@app-state` (leitura) e `swap!`/`reset!` (escrita).

### Passo 3.7: A UI Estática do Todo (com dados falsos)

**Objetivo:** agora que sabemos _como_ o Reagent funciona, vamos construir o _visual_ (estático) do Todo App. Ele não vai funcionar ainda — apenas parecer correto.

**Ação:** _Substitua_ o conteúdo do `core.cljs` (o contador) por este, agora separado em componentes:

```clojure
(ns todo.frontend.core
  (:require [reagent.core :as r]
            [reagent.dom.client :as rdom]))

;; --- 1. Nossos Componentes (Estáticos) ---

;; O Formulário (não faz nada ainda)
(defn todo-form []
  [:div.todo-input
   [:input {:type "text" :placeholder "O que precisa ser feito?"}]
   [:button "Adicionar (Desligado)"]])

;; A Lista (recebe uma lista de "todos" como argumento)
(defn todo-list [todos] ;; "todos" é um argumento!
  [:ul.todo-list
   (for [todo todos]
     ^{:key (:id todo)}
     [:li.todo-item
      (:title todo)])])

;; O App Principal (que monta tudo)
(defn app []
  [:div.todo-app
   [:h1 "Todo App (Estático)"]
   [:p "Isto é apenas o visual. Nada funciona ainda."]

   ;; 1. Renderiza o formulário
   [todo-form]

   ;; 2. Renderiza a lista, passando "dados falsos"
   [todo-list [{:id 1 :title "Meu primeiro item (falso)"}
               {:id 2 :title "Meu segundo item (falso)"}]]])

;; --- 2. A Inicialização ---
(defn ^:export init []
  (println "Frontend 'Todo Estático' inicializado...")
  (let [root (rdom/create-root (js/document.getElementById "app"))]
    (.render root (r/as-element [app]))))
```

<aside markdown="1">
💡 **O que é o `^{:key ...}`?** Quando renderizamos uma lista com `for`, o React precisa de uma "identidade" para cada item, para saber o que mudou entre uma renderização e outra. O metadado `^{:key (:id todo)}` fornece essa identidade. Sem ele, o console mostra o aviso *"Every element in a seq should have a unique :key"*. **Guarde esse detalhe: ele vai reaparecer na Fase 5.**
</aside>

**Teste:** salve e veja no navegador. Você deve ver a UI completa, com os dois todos falsos listados. O campo e o botão estão lá, mas clicar não faz nada.

### Passo 3.8: Conectando a UI ao `r/atom` (Tornando Interativo)

Agora vamos fazer o formulário funcionar de verdade — mas ainda **100% local**, sem API.

**Ação 1: Adicionar o `clojure.string`**

No `ns` do `core.cljs`, precisamos do `clojure.string` para checar se o input está em branco. _Mude isto:_

```clojure
(ns todo.frontend.core
  (:require [reagent.core :as r]
            [reagent.dom.client :as rdom]))
```

_Para isto:_

```clojure
(ns todo.frontend.core
  (:require [reagent.core :as r]
            [reagent.dom.client :as rdom]
            [clojure.string :as str])) ;; <- ADICIONE ESTA LINHA
```

**Ação 2: Adicionar o "Cérebro" (`app-state`) e a lógica local**

Logo abaixo do `ns`, **adicione** este bloco. Este é o `r/atom` central e a função local que o modifica:

```clojure
;; --- O "Cérebro" Reativo ---
(defonce app-state (r/atom {:next-id 1
                            :input-text ""
                            :todos []}))

;; --- A Lógica de Negócios (Local) ---
(defn adicionar-todo-local []
  (swap! app-state
         (fn [estado-atual]
           (let [novo-titulo (:input-text estado-atual)
                 novo-id (:next-id estado-atual)]
             (if (str/blank? novo-titulo)
               estado-atual ;; Não faz nada se vazio
               ;; Retorna um NOVO estado
               {:next-id (inc novo-id)
                :input-text "" ;; Limpa o input
                :todos (conj (:todos estado-atual)
                             {:id novo-id
                              :title novo-titulo})})))))
```

**Ação 3: Modificar o `todo-form`**

Encontre a função `todo-form` e conecte-a ao `app-state`. _Mude esta versão (estática):_

```clojure
(defn todo-form []
  [:div.todo-input
   [:input {:type "text" :placeholder "O que precisa ser feito?"}]
   [:button "Adicionar (Desligado)"]])
```

_Para esta versão (conectada):_

```clojure
(defn todo-form []
  [:div.todo-input
   [:input
    {:type "text"
     :placeholder "O que precisa ser feito?"
     ;; (Leitura): o valor do input vem do app-state
     :value (:input-text @app-state)
     ;; (Escrita): o on-change atualiza o app-state a cada tecla
     :on-change #(swap! app-state assoc :input-text (-> % .-target .-value))}]

   [:button
    ;; (Ação): o on-click chama nossa lógica local
    {:on-click adicionar-todo-local}
    "Adicionar (Local)"]])
```

**Ação 4: Modificar o `todo-list`**

Vamos remover o argumento `[todos]` e fazê-la ler diretamente do `app-state`. _Mude esta versão:_

```clojure
(defn todo-list [todos] ;; <-- Recebe "todos" como argumento
  [:ul.todo-list
   (for [todo todos]
     ^{:key (:id todo)}
     [:li.todo-item
      (:title todo)])])
```

_Para esta versão:_

```clojure
(defn todo-list [] ;; <-- Argumento "todos" REMOVIDO
  [:ul.todo-list
   ;; (Leitura): o 'for' agora observa o @app-state
   (for [todo (:todos @app-state)]
     ^{:key (:id todo)}
     [:li.todo-item
      (:title todo)])])
```

**Ação 5: Modificar o `app` (remover os dados falsos)**

_Mude esta versão:_

```clojure
(defn app []
  [:div.todo-app
   [:h1 "Todo App (Estático)"]
   [:p "Isto é apenas o visual. Nada funciona ainda."]

   [todo-form]

   [todo-list [{:id 1 :title "Meu primeiro item (falso)"}
               {:id 2 :title "Meu segundo item (falso)"}]]])
```

_Para esta versão (limpa e interativa):_

```clojure
(defn app []
  [:div.todo-app
   [:h1 "Todo App (Somente Frontend)"]
   [:p "Isto é 100% local. Recarregue (F5) para ver os dados sumirem."]

   ;; Os componentes agora se viram sozinhos!
   [todo-form]
   [todo-list]])
```

### Teste (A "Lição")

1. Salve o `core.cljs`. O shadow-cljs recompila.
2. Vá ao navegador em `http://localhost:8000`.

**Teste a interatividade:**

1. A lista deve estar vazia.
2. Digite "Meu primeiro todo" e clique em "Adicionar (Local)".
3. **Mágica:** o todo aparece na lista _instantaneamente_, e o input é limpo.

**O "Aha!":** agora, **recarregue a página (F5)**.

_Todos os todos que você adicionou desapareceram._

Isso prova que o estado vivia apenas na memória do navegador. Agora temos uma **motivação** clara para a próxima fase: como fazer essa lista persistir? A resposta é a nossa API do backend.

### Passo 3.9: Git Checkpoint

**Por que fazemos isso?**
Acabamos de construir uma "mini-aplicação" de frontend completa: `npm`, `shadow-cljs`, `react` e a reatividade do Reagent. É o ponto de salvamento perfeito antes de misturar a complexidade da API.

**Ação 1:** Pare o `shadow-cljs` (`Ctrl+C` no Terminal 2) e verifique:

```bash
git status
```

Você deve ver os novos arquivos e modificações: `package.json`, `package-lock.json`, `shadow-cljs.edn`, `resources/public/index.html`, `src/todo/frontend/core.cljs` e o `deps.edn` modificado. (Repare que `node_modules/` e `resources/public/js/` **não aparecem** — obrigado, `.gitignore`!)

**Ação 2:** Prepare e salve — este é **um único commit**, com exatamente esta mensagem (ela é um dos marcos avaliados):

```bash
git add .
git commit -m "feat: implementa UI do frontend com estado local (sem API)"
```

---

**Fim da Fase 3!** 🏁

Temos um backend funcional (Fase 2) e um frontend funcional (Fase 3), em commits separados. Eles ainda não se "conhecem".

---

# Fase 4: Conectando o Frontend ao Backend

**Objetivo:** Substituir o estado local "de mentira" do frontend por chamadas reais à nossa API — e, no caminho, encontrar (de propósito!) e corrigir o famoso erro de **CORS**.

### Passo 4.1: Adicionar o `core.async` ao `deps.edn`

Para conversar com a API, o frontend fará requisições **assíncronas** (`fetch`). Em ClojureScript, a forma idiomática de lidar com assincronia é a biblioteca `core.async` (com os blocos `go` e o operador `<p!`, que "espera" uma Promise do JavaScript).

**Ação:** Abra o `deps.edn` e adicione o `core.async` ao bloco `:deps`:

```clojure
  ;; --- Dependências do Frontend ---
  thheller/shadow-cljs    {:mvn/version "2.28.23"}
  reagent/reagent         {:mvn/version "2.0.0"}
  org.clojure/core.async  {:mvn/version "1.6.681"} ;; <- ADICIONE ESTA LINHA
```

<aside markdown="1">
⚠️ **Lembre-se da regra de ouro:** mudou o `deps.edn`, **reinicie** o que estiver rodando. Se o `npx shadow-cljs watch app` estiver ativo, pare-o (`Ctrl+C`) e suba de novo — só assim ele enxerga a nova dependência.
</aside>

### Passo 4.2: O Primeiro `fetch` — e o Erro CORS (Intencional)

**Objetivo:** vamos tentar buscar a lista de todos do backend. Vamos _esperar_ que isso falhe, para ver _por que_ o CORS existe.

**Ação 1: Adicionar os `require`s de assincronia**

No `ns` do `src/todo/frontend/core.cljs`:

```clojure
(ns todo.frontend.core
  (:require [reagent.core :as r]
            [reagent.dom.client :as rdom]
            [clojure.string :as str]
            ;; --- ADICIONE ESTAS DUAS LINHAS ---
            [cljs.core.async :refer [go]]
            [cljs.core.async.interop :refer-macros [<p!]]))
```

**Ação 2: Adicionar as funções da API**

Abaixo do `defonce app-state`, adicione o `api-url` e as funções `fetch-json` e `get-todos`:

```clojure
;; --- A URL base da nossa API (o backend, porta 3000) ---
(def api-url "http://localhost:3000/api")

;; Função auxiliar: faz o fetch e converte a resposta JSON
;; em dados Clojure (mapas com keywords).
(defn fetch-json [url options]
  (-> (js/fetch url (clj->js options))
      (.then (fn [response]
               (when-not (.-ok response)
                 (throw (js/Error. (str "HTTP error: " (.-status response)))))
               (.json response)))
      ;; Converte o objeto JS em dados Clojure com chaves keyword
      (.then #(js->clj % :keywordize-keys true))))

;; Busca todos os "todos" da API
(defn get-todos []
  (swap! app-state assoc :loading true :error nil)
  (go
    (try
      (let [response (<p! (fetch-json (str api-url "/todos") {:method "GET"}))]
        (swap! app-state assoc :todos (:todos response) :loading false))
      (catch js/Error e
        (swap! app-state assoc :error (.-message e) :loading false)))))
```

<aside markdown="1">
💡 **Como ler o `go` + `<p!`:** o bloco `(go ...)` cria um "processo" assíncrono. Dentro dele, `(<p! promise)` significa "pause aqui até a Promise resolver e me dê o valor". É o equivalente do `async/await` do JavaScript, em ClojureScript.
</aside>

**Ação 3: Chamar `get-todos` na inicialização**

Encontre a função `init` no final do arquivo e adicione a chamada:

```clojure
(defn ^:export init []
  (println "Frontend inicializado...")
  (let [root (rdom/create-root (js/document.getElementById "app"))]
    (.render root (r/as-element [app])))

  ;; --- ADICIONE ESTA LINHA ---
  ;; Ao carregar a página, busca os todos da API
  (get-todos))
```

**Ação 4: Teste (A Falha Intencional)**

Agora, sim, vamos rodar **ambos** os servidores:

1. **Terminal 1 (Backend):**

   ```bash
   clj -M:run
   ```

   (Deve dizer `Servidor iniciado na porta 3000`. Este servidor ainda _não_ sabe nada sobre CORS.)

2. **Terminal 2 (Frontend):**

   ```bash
   npx shadow-cljs watch app
   ```

   (Espere o `Build completed`.)

3. **Navegador:** abra `http://localhost:8000`.

**Resultado Esperado:** a página carrega, mas a lista de todos **não** aparece.

**A "Lição" (O "Aha!"):**

1. Abra o **Console do Desenvolvedor** (`F12`, aba _Console_).
2. Você verá um **erro vermelho** bem claro:

```
Access to fetch at 'http://localhost:3000/api/todos' from origin
'http://localhost:8000' has been blocked by CORS policy...
```

### O que aprendemos

Você acabou de descobrir o **CORS** (_Cross-Origin Resource Sharing_). O navegador, por segurança, impediu que o `localhost:8000` (o frontend) fizesse uma requisição para o `localhost:3000` (o backend), porque eles são "origens" diferentes (portas diferentes contam como origens diferentes!).

Importante: **quem bloqueia é o navegador**, não o servidor. É por isso que o `curl` funcionava — ele não é um navegador e não aplica a política de CORS. A correção, porém, é feita **no servidor**: é ele quem precisa declarar "eu confio na origem `localhost:8000`".

### Passo 4.3: Corrigir o CORS (no Backend)

**Ação 1: Adicionar a dependência**

Abra o `deps.edn` e adicione o `ring-cors` ao bloco `:deps` (junto às dependências do backend):

```clojure
  ;; --- Dependências do Backend (API REST) ---
  ring/ring-core          {:mvn/version "1.12.2"}
  ring/ring-jetty-adapter {:mvn/version "1.12.2"}
  ring/ring-json          {:mvn/version "0.5.1"}
  metosin/reitit-ring     {:mvn/version "0.7.0"}
  ring-cors/ring-cors     {:mvn/version "0.1.13"} ;; <- ADICIONE ESTA LINHA
```

<aside markdown="1">
⚠️ Atenção ao nome: é `ring-cors/ring-cors` (grupo e artefato iguais). Escrever `ring/ring-cors` fará o download falhar.
</aside>

**Ação 2: Adicionar o middleware ao `core.clj`**

Abra `src/todo/backend/core.clj`:

1. **Requeira** o `wrap-cors` no `ns`:

   ```clojure
   (ns todo.backend.core
     (:require [ring.adapter.jetty :as jetty]
               [reitit.ring :as ring]
               [ring.middleware.json :refer [wrap-json-response wrap-json-body]]
               [ring.middleware.params :refer [wrap-params]]
               [ring.middleware.keyword-params :refer [wrap-keyword-params]]
               ;; --- ADICIONE ESTA LINHA ---
               [ring.middleware.cors :refer [wrap-cors]]
               [todo.backend.handler :as handler])
     (:gen-class))
   ```

2. **Adicione o `wrap-cors` como o PRIMEIRO middleware** da "linha de montagem" no `(def app ...)`:

   ```clojure
   (def app
     (ring/ring-handler
      app-routes
      (ring/create-default-handler)
      {:middleware [;; --- ADICIONE ESTE VETOR (o primeiro da lista!) ---
                    [wrap-cors
                     ;; Em quais origens o backend confia:
                     :access-control-allow-origin [#"http://localhost:8000"]
                     ;; Quais métodos HTTP são permitidos:
                     :access-control-allow-methods [:get :post :put :delete]
                     ;; Quais headers o frontend pode enviar:
                     ;; (necessário para o POST com Content-Type: application/json)
                     :access-control-allow-headers ["Content-Type"]]

                    ;; O resto dos middlewares (como antes)...
                    wrap-json-response
                    [wrap-json-body {:keywords? true}]
                    wrap-params
                    wrap-keyword-params]}))
   ```

<aside markdown="1">
💡 **Por que o `wrap-cors` precisa ser o primeiro?** Além das requisições normais, o navegador envia uma requisição extra de "sondagem" chamada **preflight**: um `OPTIONS` perguntando *"posso fazer um POST com o header Content-Type para você?"*. Nós não temos nenhuma rota `OPTIONS` — quem responde a essa pergunta é o próprio `wrap-cors`. Sendo o primeiro (o mais "externo") da linha de montagem, ele intercepta o preflight **antes** de o roteador procurar (e não achar) uma rota.

E é por isso que declaramos `:access-control-allow-headers ["Content-Type"]`: um `GET` simples não dispara preflight, mas o nosso `POST` com JSON dispara — e o navegador só o libera se o servidor disser explicitamente que aceita esse header. Sem essa linha, você cairia na situação mais confusa possível: _o GET funciona, mas o POST continua bloqueado por CORS_.

</aside>

**Ação 3: Teste (A Correção)**

1. **Terminal 1 (Backend):** **pare** (`Ctrl+C`) e **reinicie** (`clj -M:run`) — crucial para baixar o `ring-cors`.
2. **Terminal 2 (Frontend):** pode deixar rodando.
3. **Navegador:** volte a `http://localhost:8000` e recarregue (F5).

**Resultado Esperado:** o erro de CORS no console (F12) desapareceu! A página ainda estará vazia (não há todos no banco em memória), mas sem erros. Seu frontend agora pode "falar" com o backend.

### Passo 4.4: Conectar a Criação (`POST`)

O `GET` funciona. Agora vamos fazer o botão "Adicionar" parar de usar a função local (`adicionar-todo-local`) e usar a API de verdade.

**Ação 1: Adicionar a função `create-todo`**

No `src/todo/frontend/core.cljs`, logo **abaixo** da função `get-todos`, adicione:

```clojure
;; --- Cria um "todo" via API (POST) ---
(defn create-todo [todo-data]
  (swap! app-state assoc :loading true :error nil)
  (go
    (try
      (<p! (fetch-json (str api-url "/todos")
                       {:method "POST"
                        :headers {"Content-Type" "application/json"}
                        ;; Converte o mapa Clojure em uma string JSON
                        :body (js/JSON.stringify (clj->js todo-data))}))

      ;; Se o POST funcionou, recarregamos a lista
      (get-todos)
      (catch js/Error e
        (swap! app-state assoc :error (.-message e) :loading false)))))
```

**Ação 2: Modificar o `todo-form`**

Agora temos duas funções de "adicionar": a antiga `adicionar-todo-local` (de mentira) e a nova `create-todo` (da API). Vamos ligar o formulário na nova.

_Mude esta versão:_

```clojure
(defn todo-form []
  [:div.todo-input
   [:input
    {:type "text"
     :placeholder "O que precisa ser feito?"
     :value (:input-text @app-state)
     :on-change #(swap! app-state assoc :input-text (-> % .-target .-value))}]

   [:button
    {:on-click adicionar-todo-local} ;; <-- MUDE AQUI
    "Adicionar (Local)"]])           ;; <-- E AQUI
```

_Para esta versão:_

```clojure
(defn todo-form []
  [:div.todo-input
   [:input
    {:type "text"
     :placeholder "O que precisa ser feito?"
     :value (:input-text @app-state)
     :on-change #(swap! app-state assoc :input-text (-> % .-target .-value))}]

   [:button
    {:on-click (fn []
                 (create-todo {:title (:input-text @app-state)})
                 (swap! app-state assoc :input-text ""))} ;; Limpa o input
    "Adicionar"]])
```

**Ação 3: Limpar o código**

Duas pequenas faxinas para o código não "mentir":

1. **Delete** a função `adicionar-todo-local` — ela não é mais usada. (Como consequência, a chave `:next-id` do `app-state` também ficou sem uso; pode removê-la do `defonce`, deixando `{:input-text "" :todos []}`.)
2. No componente `app`, **atualize o texto**, que ainda dizia que os dados somem no F5:

_Mude:_

```clojure
   [:h1 "Todo App (Somente Frontend)"]
   [:p "Isto é 100% local. Recarregue (F5) para ver os dados sumirem."]
```

_Para:_

```clojure
   [:h1 "Todo App"]
   [:p "Conectado à API. Os dados sobrevivem ao F5!"]
```

<aside markdown="1">
💡 Depois de deletar o `defonce` antigo com `:next-id`, o *hot-reload* pode manter o valor antigo na memória (é justamente o que o `defonce` faz!). Se algo parecer estranho, um simples **F5** recarrega tudo do zero.
</aside>

### Passo 4.5: Teste Final (Full-Stack)

**Ação 1:** confira que os dois servidores estão de pé:

1. **Terminal 1:** `clj -M:run` → `Servidor iniciado na porta 3000` (com a correção do CORS).
2. **Terminal 2:** `npx shadow-cljs watch app` → `Build completed`.

**Ação 2: Teste no navegador**

1. Abra a URL do **frontend**: `http://localhost:8000`.
2. Confira o console (F12): **sem erros de CORS**. Lista vazia.
3. Digite um todo (ex: "Testar a API completa") e clique em "Adicionar".

**O que acontece agora (a mágica):**

- O `core.cljs` chama `create-todo` (o `POST` para a porta 3000);
- O navegador dispara antes um **preflight** `OPTIONS`, que o `wrap-cors` responde;
- O backend cria o todo no `atom`;
- O `create-todo` chama `get-todos` (o `GET`);
- O `@app-state` é atualizado com a nova lista;
- O Reagent redesenha a UI → **seu todo aparece na lista!**

**Ação 3: O "Aha!" (a persistência da API)**

Faça o teste que falhou na Fase 3: **recarregue a página (F5)**.

- O `init` roda de novo e chama `get-todos`;
- O backend (que **não** foi reiniciado) ainda tem o todo no seu `atom` e o devolve;
- **Resultado:** o todo **continua lá!**

A aplicação agora é _full-stack_: a UI está desacoplada dos dados, e os dados sobrevivem ao recarregamento da página (por enquanto, na memória do backend).

### Passo 4.6: Git Checkpoint

**Ação 1:** pare os servidores e verifique:

```bash
git status
```

Você deve ver: `deps.edn` (core.async + ring-cors), `src/todo/backend/core.clj` (wrap-cors) e `src/todo/frontend/core.cljs` (funções de API + limpeza).

**Ação 2:** prepare e salve:

```bash
git add .
git commit -m "feat: conecta frontend com API do backend (CORS corrigido)"
```

---

**Fim da Fase 4!** 🏁

Temos uma aplicação full-stack funcional, com o histórico salvo no Git.

Mas ela ainda tem uma grande limitação: se você parar e reiniciar o servidor de **backend** (`clj -M:run`), os todos desaparecem — eles vivem em um `atom`, que é memória volátil. Faça o teste, se quiser: pare o backend, suba de novo, dê F5… lista vazia. 😢

A próxima fase resolve isso trocando o `db.clj` por um banco de dados **real**.

---

# Fase 5: Persistência Real (Banco de Dados)

**Objetivo:** Substituir nosso `db.clj` "de mentira" (o `atom`) por um `db.clj` "de verdade", que usa um banco de dados **SQLite**.

**Por que SQLite?** É o banco mais simples de usar: não requer um servidor separado (como o PostgreSQL) e armazena o banco inteiro em um único arquivo (`prod.db`) na pasta do projeto.

**Nossa "Cirurgia":**
A parte mais legal desta fase é o quão pouco código vamos mudar. Graças à forma como estruturamos o aplicativo, **só precisamos mudar o `db.clj`**.

Os arquivos `handler.clj` e `core.clj` não se importam com _como_ os dados são armazenados; eles apenas chamam funções como `(db/get-all-todos)`. Vamos reescrever o _interior_ dessas funções para falar SQL em vez de mexer em um `atom`.

### Passo 5.1: Adicionar as Dependências do Banco

- **`next.jdbc`**: a biblioteca moderna de Clojure para "falar" com bancos SQL.
- **`org.xerial/sqlite-jdbc`**: o "driver" que permite ao `next.jdbc` se comunicar especificamente com o SQLite.

**Ação:** Abra o `deps.edn` e adicione estas duas linhas ao bloco `:deps`:

```clojure
  ;; --- Banco de Dados ---
  ;; ADICIONE ESTAS DUAS LINHAS:
  seancorfield/next.jdbc  {:mvn/version "1.2.659"}
  org.xerial/sqlite-jdbc  {:mvn/version "3.45.3.0"}
```

### Passo 5.2: Entendendo o `next.jdbc` (Laboratório no REPL)

**Objetivo:** aprender como o `next.jdbc` funciona **em isolamento**, antes de integrá-lo. Vamos criar um banco, inserir e ler dados, tudo a partir do REPL — sem tocar em nenhum arquivo do projeto.

**Ação 1: Inicie um REPL novo**

1. **Pare** todos os servidores.
2. Na raiz do projeto:

   ```bash
   clj
   ```

   (O `clj` lerá o `deps.edn` e baixará as novas bibliotecas na primeira vez.)

**Ação 2: Carregue a biblioteca e defina a conexão**

Digite no prompt `user=>`:

```clojure
user=> (require '[next.jdbc :as jdbc])
nil

;; A "especificação" do banco: um simples mapa Clojure
;; que diz ao next.jdbc como se conectar.
user=> (def db-spec {:dbtype "sqlite"    ;; o tipo de banco
                     :dbname "lab.db"})  ;; o arquivo onde tudo será salvo
#'user/db-spec
```

(Estamos usando `lab.db` como "banco de laboratório" descartável — o banco de verdade da aplicação, `prod.db`, será criado no próximo passo.)

**Ação 3: Execute SQL!** A principal função é `jdbc/execute!`:

```clojure
;; --- 1. CRIAR UMA TABELA (CREATE) ---
;; (execute! recebe um vetor cujo primeiro item é a string SQL)
user=> (jdbc/execute! db-spec ["
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    completed BOOLEAN
  )
"])
[#:next.jdbc{:update-count 0}]

;; --- 2. INSERIR DADOS (INSERT) ---
;; (Passamos os valores como '?' para prevenir "SQL Injection".
;;  O next.jdbc cuida da substituição com segurança.)
user=> (jdbc/execute! db-spec
         ["INSERT INTO todos (title, completed) VALUES (?, ?)"
          "Aprender next.jdbc" false])
[#:next.jdbc{:update-count 1}]

user=> (jdbc/execute! db-spec
         ["INSERT INTO todos (title, completed) VALUES (?, ?)"
          "Integrar com a API" false])
[#:next.jdbc{:update-count 1}]

;; --- 3. LER OS DADOS (SELECT) ---
;; ESTE É O MOMENTO "AHA!":
;; o next.jdbc executa o SQL e retorna... DADOS CLOJURE!
;; (Um vetor de mapas — exatamente o que nossa API precisa.)
user=> (jdbc/execute! db-spec ["SELECT * FROM todos"])
[{:todos/id 1, :todos/title "Aprender next.jdbc", :todos/completed 0}
 {:todos/id 2, :todos/title "Integrar com a API", :todos/completed 0}]

;; --- 4. LER UM ITEM (SELECT com WHERE) ---
user=> (jdbc/execute! db-spec ["SELECT * FROM todos WHERE id = ?" 2])
[{:todos/id 2, :todos/title "Integrar com a API", :todos/completed 0}]
```

**Pare e observe duas coisas no resultado do SELECT:**

1. **As chaves vêm "qualificadas"**: não é `:id`, é **`:todos/id`** — o `next.jdbc` prefixa cada coluna com o nome da tabela. Guarde isso: **vai causar um bug no nosso frontend daqui a pouco** (e vamos corrigi-lo de propósito, no Passo 5.5).
2. **Booleanos viram números**: o SQLite armazena `true`/`false` como `1`/`0`. Isso também reaparecerá na Fase 6.

Saia do REPL com `Ctrl+D`. Olhe a pasta do projeto: há um novo arquivo `lab.db`. Nosso banco é real! Como foi só um laboratório, pode apagá-lo:

```bash
rm lab.db
```

- **A Lição: `next.jdbc` vs. o resto (o "porquê")**

  **1. `next.jdbc` vs. ORMs (Django, GORM, SQLAlchemy):**
  - **ORMs (mundo Objeto):** tentam **esconder** o SQL. Você lida com objetos e métodos (`user.save()`), e o ORM _adivinha_ o SQL. Fácil no começo, difícil de otimizar depois.
  - **`next.jdbc` (mundo Funcional/Dados):** **abraça** o SQL. Você escreve o SQL exato que quer, e a biblioteca é só uma **função**: `(função ["SQL..." dados]) → dados-clojure`. Transparente e focado em **transformação de dados**.

  **2. `next.jdbc` vs. Java JDBC (o "antes e depois"):**

  Para um simples `SELECT *` em Java JDBC puro, você escreveria toda esta "cerimônia":

  ```java
  Connection conn = null;
  PreparedStatement ps = null;
  ResultSet rs = null;
  List<Map<String, Object>> results = new ArrayList<>();

  try {
      conn = DriverManager.getConnection("jdbc:sqlite:prod.db");
      ps = conn.prepareStatement("SELECT * FROM todos");
      rs = ps.executeQuery();
      while (rs.next()) {
          Map<String, Object> row = new HashMap<>();
          row.put("id", rs.getInt("id"));
          row.put("title", rs.getString("title"));
          results.add(row);
      }
  } catch (SQLException e) {
      e.printStackTrace();
  } finally {
      if (rs != null) { rs.close(); }
      if (ps != null) { ps.close(); }
      if (conn != null) { conn.close(); }
  }
  return results;
  ```

  Com `next.jdbc`:

  ```clojure
  (jdbc/execute! db-spec ["SELECT * FROM todos"])
  ;;=> [{:todos/id 1, :todos/title "Aprender next.jdbc", ...}]
  ```

  O `next.jdbc` cuida de **toda** a cerimônia: abrir a conexão, criar o _statement_, executar, iterar o `ResultSet`, construir os mapas e fechar tudo com segurança.

### Passo 5.3: O Novo `db.clj` (com SQL)

Agora vamos usar o que aprendemos para **substituir permanentemente** o `db.clj` antigo. O objetivo: trocar o "motor" do carro sem que o motorista (o `handler.clj`) perceba.

**Ação:** **Apague todo o conteúdo** de `src/todo/backend/db.clj` e substitua por:

```clojure
(ns todo.backend.db
  "Este namespace gerencia os dados dos 'todos'
   usando um banco de dados persistente SQLite."
  (:require [next.jdbc :as jdbc]))

;; --- 1. A Configuração (Especificação do Banco) ---
;; O banco será salvo em um arquivo chamado "prod.db",
;; criado automaticamente na raiz do projeto.
(def db-spec {:dbtype "sqlite"
              :dbname "prod.db"})

;; --- 2. Função de Inicialização ---
;; Cria a tabela "todos" se ela ainda não existir.
;; Vamos chamá-la no 'core.clj' quando o servidor iniciar.
(defn initialize-database!
  "Cria a tabela 'todos' no banco de dados se ela não existir."
  []
  (jdbc/execute! db-spec ["
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      description TEXT,
      completed BOOLEAN DEFAULT 0,
      created_at TEXT
    )
  "]))

;; --- 3. As Novas Funções (substituindo os 'atoms') ---

(defn get-all-todos
  "Retorna uma lista com todos os 'todos' no banco."
  []
  ;; O 'execute!' roda o SQL e já retorna mapas Clojure!
  (jdbc/execute! db-spec ["SELECT * FROM todos ORDER BY created_at DESC"]))

(defn create-todo
  "Cria um novo 'todo', salva no banco e o retorna."
  [todo-data] ;; ex: {:title "Minha tarefa", :description "..."}
  ;; A cláusula 'RETURNING *' pede ao SQLite para devolver
  ;; a linha recém-inserida (com o id gerado, o completed, etc.).
  ;; 'execute-one!' retorna esse único resultado como um mapa.
  (jdbc/execute-one! db-spec ["
    INSERT INTO todos (title, description, completed, created_at)
    VALUES (?, ?, ?, ?)
    RETURNING *"
    (:title todo-data)
    (:description todo-data)
    0 ;; completed = falso (lembre-se: SQLite usa 0/1)
    (str (java.time.Instant/now))]))
```

### O que fizemos?

1. **Removemos os `atom`s**: `todos-db` e `next-id` desapareceram.
2. **`(:require [next.jdbc :as jdbc])` dentro do `ns`**: exatamente o padrão que aprendemos na Fase 1 — os `require`s de um arquivo sempre vivem na declaração do namespace.
3. **`initialize-database!`**: o `CREATE TABLE IF NOT EXISTS` configura o banco na primeira execução e não faz nada nas seguintes.
4. **`get-all-todos`**: substituímos `(vals @todos-db)` por um `SELECT`.
5. **`create-todo`**: substituímos o `swap!` por um `INSERT ... RETURNING *`.

<aside markdown="1">
💡 **O que é o `RETURNING *`?** É uma cláusula SQL (suportada pelo SQLite desde a versão 3.35) que faz o comando `INSERT`/`UPDATE`/`DELETE` **devolver as linhas afetadas**, como se fosse um `SELECT`. Sem ela, um `INSERT` retornaria apenas `{:next.jdbc/update-count 1}` ("1 linha afetada") — e nosso handler responderia o objeto errado ao cliente. Com ela, `execute-one!` nos entrega o todo completo, com o `id` que o banco acabou de gerar. Usaremos o mesmo truque no `UPDATE` e no `DELETE` da Fase 6.
</aside>

**A "Mágica":** os _nomes_ das funções (`get-all-todos`, `create-todo`) e o formato do que elas retornam (lista de mapas / mapa) são **os mesmos** de antes. Por isso o `handler.clj` **não precisa de nenhuma modificação** — ele nem vai "saber" que trocamos um `atom` por SQL.

### Passo 5.4: A Modificação no `core.clj`

Nosso novo `db.clj` tem a função `initialize-database!`, mas ela nunca é chamada. Precisamos executá-la **uma vez**, quando o servidor de backend iniciar.

**Ação 1: O `require`**

No topo do `src/todo/backend/core.clj`, adicione o `todo.backend.db` à lista de `require`s (atenção aos parênteses — o `(:gen-class)` continua _dentro_ do `ns`, como sempre esteve):

```clojure
(ns todo.backend.core
  (:require [ring.adapter.jetty :as jetty]
            [reitit.ring :as ring]
            [ring.middleware.json :refer [wrap-json-response wrap-json-body]]
            [ring.middleware.params :refer [wrap-params]]
            [ring.middleware.keyword-params :refer [wrap-keyword-params]]
            [ring.middleware.cors :refer [wrap-cors]]
            [todo.backend.handler :as handler]
            ;; --- ADICIONE ESTA LINHA ---
            [todo.backend.db :as db])
  (:gen-class))
```

**Ação 2: Chamar a inicialização no `-main`**

Encontre a função `-main` no final do arquivo. _Mude esta versão:_

```clojure
(defn -main [& args]
  (let [port (Integer/parseInt (or (first args) "3000"))]
    (start-server port)))
```

_Para esta:_

```clojure
(defn -main [& args]
  (let [port (Integer/parseInt (or (first args) "3000"))]
    ;; --- ADICIONE ESTA LINHA ---
    (db/initialize-database!) ;; Garante que a tabela exista
    ;; ---------------------------
    (start-server port)))
```

Na primeira execução, isso criará o `prod.db` e a tabela `todos`. Nas seguintes, o `CREATE TABLE IF NOT EXISTS` simplesmente não fará nada — exatamente o que queremos.

### Passo 5.5: A Correção de Acoplamento (Frontend)

**Objetivo:** antes de testar, precisamos corrigir uma incompatibilidade de "dialeto" entre o backend e o frontend — aquela que você viu nascer no laboratório do REPL.

**A Lição (o "porquê"):**

1. **Nosso backend (`next.jdbc`)** agora retorna _keywords qualificadas_ ("namespaced"): `:todos/id`, `:todos/title`, `:todos/completed`.
2. **Nosso frontend** espera _keywords simples_: `(:id todo)` e `(:title todo)`.

Se não corrigirmos, o frontend tentará ler `(:id todo)` de um mapa `{:todos/id 1, ...}`, receberá `nil`, e a UI quebrará: a lista mostrará _bullet points_ sem texto, e o console exibirá avisos de `:key`.

**A solução (deste tutorial):** corrigir o **frontend** para entender o "dialeto" do backend.

**A consequência (o "acoplamento"):** é a solução mais rápida, mas cria **acoplamento**: o frontend agora "sabe" que os dados vêm de uma tabela chamada `todos`. Se um dia a tabela for renomeada para `tasks`, o backend continuaria funcionando, mas o frontend quebraria. _(A solução "desacoplada" seria configurar o `next.jdbc` no backend para retornar keywords simples — fica como exercício para os curiosos: procure por `next.jdbc.result-set/as-unqualified-maps`.)_

**Ação:** Abra `src/todo/frontend/core.cljs` e encontre o componente `todo-list`.

<aside markdown="1">
⚠️ **Atenção: são DOIS lugares para corrigir, não um!** O erro mais comum deste passo é corrigir o `(:title ...)` (porque o texto sumido é visível) e **esquecer o `^{:key ...}`** (porque o aviso fica escondido no console). Se a key ficar errada, o app até "funciona", mas o React perde a identidade dos itens da lista — e isso causará bugs visuais reais na Fase 6 (checkboxes marcando o item errado!). Corrija os dois.
</aside>

_Mude esta versão:_

```clojure
(defn todo-list []
  [:ul.todo-list
   (for [todo (:todos @app-state)]
     ^{:key (:id todo)}        ;; <-- Bug 1 aqui
     [:li.todo-item
      (:title todo)])])        ;; <-- Bug 2 aqui
```

_Para esta versão (corrigida nos dois lugares):_

```clojure
(defn todo-list []
  [:ul.todo-list
   (for [todo (:todos @app-state)]
     ^{:key (:todos/id todo)}  ;; <-- CORRIGIDO (1/2)
     [:li.todo-item
      (:todos/title todo)])])  ;; <-- CORRIGIDO (2/2)
```

Salve o arquivo.

### Passo 5.6: O Teste Final (A Persistência Real)

**Ação 1: Limpe qualquer banco antigo (recomendado)**

Para garantir que estamos começando do zero:

```bash
rm -f prod.db
```

**Ação 2: Inicie os dois servidores**

1. **Terminal 1 (Backend):**

   ```bash
   clj -M:run
   ```

   (O `prod.db` e a tabela `todos` serão criados. `Servidor iniciado na porta 3000`.)

2. **Terminal 2 (Frontend):**

   ```bash
   npx shadow-cljs watch app
   ```

**Ação 3: Teste a aplicação**

1. Abra `http://localhost:8000`.
2. A lista deve estar vazia — **e sem erros no console (F12)**.
3. Adicione um todo (ex: "Testar o banco SQLite").
4. Ele deve aparecer na lista, **com o texto visível**.

**Ação 4: O "Aha!" Final (o teste de persistência)**

Agora, o teste que **falhava** no fim da Fase 4:

1. Vá ao **Terminal 1 (Backend)** e **pare o servidor** (`Ctrl+C`).
2. **Reinicie-o**: `clj -M:run`.
3. No navegador, **recarregue a página (F5)**.

**Resultado Esperado:** o todo **continua lá!** O backend reiniciado leu o arquivo `prod.db` do disco e devolveu os dados. Persistência real. 🎉

### Passo 5.7: Git Checkpoint

**Ação 1:** pare os servidores e verifique:

```bash
git status
```

Você deve ver modificados: `deps.edn`, `src/todo/backend/core.clj`, `src/todo/backend/db.clj` e `src/todo/frontend/core.cljs`.

Note que o `prod.db` **não aparece** na lista — o `.gitignore` que escrevemos lá na Fase 0 (regra `*.db`) já está fazendo o trabalho dele. O arquivo de banco é _resultado_ da aplicação, não código-fonte, e jamais deve ir para o GitHub.

**Ação 2:** prepare e salve:

```bash
git add .
git commit -m "refactor(db): substitui banco em memória por persistência SQLite"
```

(Usamos `refactor:` porque mudamos a _implementação_ do banco sem mudar o comportamento externo da API.)

---

**Fim da Fase 5!** 🏁

Você tem uma aplicação full-stack completa, moderna e **persistente**. Mas nosso Todo List ainda só _cria_ e _lista_. Na próxima (e última) fase de código, completaremos o CRUD: marcar como feito (**U**pdate) e deletar (**D**elete) — com um visual decente.

---

# 🏆 Fase 6: CRUD Completo — "Marcar como Feito", "Deletar" e o Visual Final

Você tem uma aplicação **C**reate/**R**ead funcional e persistente. Agora vamos completar o CRUD:

- o **U** (Update): marcar um todo como feito/não feito (_toggle_);
- o **D** (Delete): remover um todo.

Você verá que o padrão é _exatamente_ o mesmo que usamos até aqui, repetido duas vezes: **função no `db.clj` → handler no `handler.clj` → rota no `core.clj` → função de API e evento no `core.cljs`**.

---

## ⚙️ Parte 1: O Toggle (Update) no Backend

### Passo 6.1: A Lógica no `db.clj`

Precisamos de uma função que receba um `id` e "vire" o valor de `completed` no banco.

**Ação:** Abra `src/todo/backend/db.clj` e adicione no final:

```clojure
(defn toggle-todo!
  "Alterna o status 'completed' de um todo no banco."
  [id]
  ;; (1 - completed) é um truque SQL para inverter: 0 -> 1 e 1 -> 0.
  ;; RETURNING * devolve a linha já atualizada (ou nada, se o id não existir).
  (jdbc/execute-one! db-spec ["
    UPDATE todos
    SET completed = (1 - completed)
    WHERE id = ?
    RETURNING *"
    id]))
```

<aside markdown="1">
💡 O `!` no final de `toggle-todo!` é uma convenção Clojure: sinaliza que a função tem *efeitos colaterais* (ela muda o mundo — neste caso, o banco). Já vínhamos usando isso no `initialize-database!` e no `swap!`.
</aside>

### Passo 6.2: O Handler no `handler.clj`

**Ação:** Abra `src/todo/backend/handler.clj` e adicione no final:

```clojure
;; --- Handler para Alternar (toggle) um Todo ---
(defn toggle-todo-handler
  "Handler para a rota POST /api/todos/:id/toggle."
  [request]
  ;; O Reitit coloca os parâmetros da URL (o :id de "/todos/:id/toggle")
  ;; em :path-params, sempre como STRINGS. Convertemos para inteiro.
  (let [id (Integer/parseInt (get-in request [:path-params :id]))]
    ;; execute-one! retorna nil se nenhuma linha foi afetada
    ;; (id inexistente) -> respondemos 404.
    (if-let [updated-todo (db/toggle-todo! id)]
      {:status 200 :body updated-todo}
      {:status 404 :body {:error "Todo não encontrado"}})))
```

### Passo 6.3: A Rota no `core.clj`

**Ação:** Abra `src/todo/backend/core.clj` e adicione a nova rota. Para não haver dúvida de **onde** ela entra, aqui está o `app-routes` **completo** como deve ficar:

```clojure
(def app-routes
  (ring/router
   ["/api"
    ["/hello" {:get {:handler handler/hello-handler}}]

    ["/todos"
     {:get  {:handler handler/list-todos-handler}
      :post {:handler handler/create-todo-handler}}]

    ;; --- NOVA ROTA ---
    ["/todos/:id/toggle"
     {:post {:handler handler/toggle-todo-handler}}]]))
```

**✅ Backend do toggle concluído!** Pare e **reinicie o servidor de backend** (`clj -M:run`).

**Teste rápido com `curl`** (supondo que exista um todo de id 1):

```bash
curl -X POST http://localhost:3000/api/todos/1/toggle
```

**Resultado Esperado:** o todo com `"completed":1`. Rode de novo e ele volta para `0`. E um id inexistente:

```bash
curl -X POST http://localhost:3000/api/todos/999/toggle
```

deve responder `{"error":"Todo não encontrado"}`.

---

## ⚡️ Parte 2: O Toggle (Update) no Frontend

### Passo 6.4: A Função de API no `core.cljs`

**Ação:** Abra `src/todo/frontend/core.cljs` e adicione esta função junto às outras (`get-todos`, `create-todo`):

```clojure
(defn toggle-todo
  "Chama a API para alternar o status de um todo."
  [id]
  (go
    (try
      (<p! (fetch-json (str api-url "/todos/" id "/toggle")
                       {:method "POST"}))
      ;; Se funcionou, recarrega a lista inteira
      (get-todos)
      (catch js/Error e
        (swap! app-state assoc :error (.-message e) :loading false)))))
```

### Passo 6.5: O Checkbox no `todo-list` (e a Conversão 0/1)

**Atenção: por que `(not= 0 ...)` é necessário?**

O SQLite armazena `true` como o número **1** e `false` como **0**. Mas o atributo `checked` de um checkbox HTML só aceita booleanos de verdade (`true`/`false`).

- Se usarmos apenas `:checked (:todos/completed todo)`, o valor seria `1` ou `0`.
- A expressão `(not= 0 (:todos/completed todo))` **converte explicitamente**: `1` → `true` e `0` → `false`.

**Ação:** Modifique a função `todo-list` do `core.cljs`. _Mude esta versão:_

```clojure
(defn todo-list []
  [:ul.todo-list
   (for [todo (:todos @app-state)]
     ^{:key (:todos/id todo)}
     [:li.todo-item
      (:todos/title todo)])])
```

_Para esta versão:_

```clojure
(defn todo-list []
  [:ul.todo-list
   (for [todo (:todos @app-state)]
     ^{:key (:todos/id todo)}

     ;; 1. Classe CSS 'completed' quando o status for 1
     [:li.todo-item {:class (when (= 1 (:todos/completed todo)) "completed")}

      ;; 2. O Checkbox
      [:input.todo-checkbox
       {:type "checkbox"
        ;; 3. A CONVERSÃO: 0/1 -> booleano de verdade
        :checked (not= 0 (:todos/completed todo))
        ;; 4. O evento chama nossa nova função de API
        :on-change #(toggle-todo (:todos/id todo))}]

      ;; 5. O título (agora dentro de um span, para o CSS)
      [:span.todo-title (:todos/title todo)]])])
```

**Teste intermediário:**

1. Com os dois servidores rodando, vá a `http://localhost:8000`.
2. Adicione um todo e **clique no checkbox**. Ele deve marcar.
3. Recarregue (F5): o item **continua marcado** — o `UPDATE` persistiu! 🎉

---

## 🗑️ Parte 3: O Delete — Backend

O padrão se repete pela última vez. Você já sabe a receita: `db` → `handler` → `rota` → `frontend`.

### Passo 6.6: A Lógica no `db.clj`

**Ação:** Adicione ao final de `src/todo/backend/db.clj`:

```clojure
(defn delete-todo!
  "Remove um todo do banco. Retorna o todo removido, ou nil se não existir."
  [id]
  ;; RETURNING * aqui nos devolve a linha que acabou de ser apagada.
  ;; É perfeito para o handler saber se o id existia (nil = não existia).
  (jdbc/execute-one! db-spec ["
    DELETE FROM todos
    WHERE id = ?
    RETURNING *"
    id]))
```

### Passo 6.7: O Handler no `handler.clj`

**Ação:** Adicione ao final de `src/todo/backend/handler.clj`:

```clojure
;; --- Handler para Deletar um Todo ---
(defn delete-todo-handler
  "Handler para a rota DELETE /api/todos/:id."
  [request]
  (let [id (Integer/parseInt (get-in request [:path-params :id]))]
    (if-let [deleted-todo (db/delete-todo! id)]
      {:status 200 :body deleted-todo}
      {:status 404 :body {:error "Todo não encontrado"}})))
```

(Compare com o `toggle-todo-handler`: é o mesmo esqueleto. Isso não é preguiça — é **arquitetura**. Padrões repetíveis são fáceis de escrever, ler e testar.)

### Passo 6.8: A Rota no `core.clj`

**Ação:** O `app-routes` **completo e final** fica assim:

```clojure
(def app-routes
  (ring/router
   ["/api"
    ["/hello" {:get {:handler handler/hello-handler}}]

    ["/todos"
     {:get  {:handler handler/list-todos-handler}
      :post {:handler handler/create-todo-handler}}]

    ["/todos/:id/toggle"
     {:post {:handler handler/toggle-todo-handler}}]

    ;; --- NOVA ROTA ---
    ["/todos/:id"
     {:delete {:handler handler/delete-todo-handler}}]]))
```

<aside markdown="1">
💡 Repare que usamos o **método HTTP** `DELETE` na URL "canônica" do recurso (`/todos/:id`), em vez de inventar uma URL como `/todos/:id/delete`. Essa é a convenção REST: a URL identifica *o recurso*, e o método diz *o que fazer* com ele. (E lembre-se: lá na Fase 4, nosso `wrap-cors` já incluiu `:delete` nos métodos permitidos — por isso o navegador vai deixar essa chamada passar.)
</aside>

**✅ Backend completo!** Pare e **reinicie** o backend (`clj -M:run`), e teste com `curl`:

```bash
curl -X DELETE http://localhost:3000/api/todos/1
```

**Resultado Esperado:** o JSON do todo removido. Chame de novo com o mesmo id: `{"error":"Todo não encontrado"}` — ele já foi.

---

## 🗑️ Parte 4: O Delete — Frontend

### Passo 6.9: A Função de API e o Botão

**Ação 1:** No `src/todo/frontend/core.cljs`, adicione junto às outras funções de API:

```clojure
(defn delete-todo
  "Chama a API para remover um todo."
  [id]
  (go
    (try
      (<p! (fetch-json (str api-url "/todos/" id)
                       {:method "DELETE"}))
      ;; Se funcionou, recarrega a lista
      (get-todos)
      (catch js/Error e
        (swap! app-state assoc :error (.-message e) :loading false)))))
```

**Ação 2:** Adicione o botão de deletar ao `todo-list`. A versão **final** do componente:

```clojure
(defn todo-list []
  [:ul.todo-list
   (for [todo (:todos @app-state)]
     ^{:key (:todos/id todo)}
     [:li.todo-item {:class (when (= 1 (:todos/completed todo)) "completed")}

      [:input.todo-checkbox
       {:type "checkbox"
        :checked (not= 0 (:todos/completed todo))
        :on-change #(toggle-todo (:todos/id todo))}]

      [:span.todo-title (:todos/title todo)]

      ;; --- O BOTÃO DE DELETAR (agora de verdade!) ---
      [:button.delete-btn
       {:on-click #(delete-todo (:todos/id todo))}
       "X"]])])
```

**Teste intermediário:** adicione alguns todos e clique no "X" de um deles. Ele some da lista. Recarregue (F5): continua fora — o `DELETE` persistiu.

<aside markdown="1">
💡 **Extensão opcional:** quer pedir confirmação antes de apagar? Troque o `:on-click` por:

```clojure
{:on-click #(when (js/confirm "Remover esta tarefa?")
              (delete-todo (:todos/id todo)))}
```

</aside>

---

## 🎨 Parte 5: O Visual Final (CSS)

Nossa aplicação funciona, mas está com cara de 1996. Vamos dar um banho de loja.

**Ação:** Abra `resources/public/index.html` e adicione o bloco `<style>` dentro do `<head>` (depois do `<title>`):

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Todo App (CLJS)</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f5f5f5;
        display: flex;
        justify-content: center;
        padding: 50px 20px;
      }
      .todo-app {
        width: 100%;
        max-width: 600px;
        background: white;
        padding: 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }
      h1 {
        color: #333;
        text-align: center;
        margin-bottom: 25px;
      }
      .todo-input {
        display: flex;
        gap: 10px;
        margin-bottom: 20px;
      }
      .todo-input input[type="text"] {
        flex: 1;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 16px;
      }
      .todo-list {
        list-style: none;
        padding: 0;
      }
      .todo-item {
        display: flex;
        align-items: center;
        padding: 12px;
        margin-bottom: 8px;
        background-color: #f8f9fa;
        border-radius: 4px;
        transition: background-color 0.3s;
      }
      /* O título ocupa todo o espaço entre o checkbox e o botão X */
      .todo-title {
        flex: 1;
      }
      /* O botão "Adicionar" */
      button {
        padding: 10px 15px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
        transition: background-color 0.2s;
      }
      button:hover {
        background-color: #0056b3;
      }
      /* O botão de deletar (X) */
      .delete-btn {
        background-color: #dc3545;
        font-size: 12px;
        padding: 5px 10px;
      }
      .delete-btn:hover {
        background-color: #c82333;
      }
      /* Item concluído */
      .completed {
        opacity: 0.6;
        background-color: #f1f1f1;
        text-decoration: line-through;
      }
      .todo-checkbox {
        margin-right: 10px;
        cursor: pointer;
      }
    </style>
  </head>
  <body>
    <div id="app">Carregando...</div>

    <script src="/js/main.js"></script>
  </body>
</html>
```

<aside markdown="1">
💡 Mudou o `index.html` e não viu diferença? O servidor de desenvolvimento às vezes mantém o HTML em cache — um **F5** (ou Ctrl+F5) resolve.
</aside>

---

## 🎉 Teste Final (o CRUD completo)

Com os dois servidores rodando, em `http://localhost:8000`:

1. **Create:** adicione dois ou três todos. ✅
2. **Read:** recarregue (F5) — todos continuam lá. ✅
3. **Update:** clique no checkbox de um deles — ele fica riscado e opaco. F5 — continua marcado. ✅
4. **Delete:** clique no "X" de outro — ele some. F5 — continua fora. ✅
5. **A prova final:** pare o backend (`Ctrl+C`), reinicie (`clj -M:run`), F5 no navegador — **tudo exatamente como você deixou.** ✅

Se os cinco passaram, você tem um CRUD full-stack completo e persistente.

## Passo 6.10: Git Checkpoint

**Ação:**

```bash
git add .
git commit -m "feat(crud): implementa funcionalidades de toggle e delete"
```

---

**Fim da Fase 6!** 🏁

Você finalizou o desenvolvimento de uma aplicação full-stack completa, moderna e robusta:

- **Backend:** Clojure, Ring e Reitit expondo uma API REST completa (CRUD).
- **Banco de Dados:** persistência real com SQLite e `next.jdbc`.
- **Frontend:** ClojureScript e Reagent (com o padrão moderno do React) para uma UI reativa.
- **Prática profissional:** `git` incremental, `npm`, depuração de CORS (incluindo _preflight_), dados assíncronos (`go`/`<p!`) e o uso correto de `atom` vs. `r/atom`.

Falta só uma coisa para o projeto estar pronto para o mundo (e para a entrega): a **documentação**.

---

# Fase 7: README e Entrega

**Objetivo:** Escrever um `README.md` claro — a "porta de entrada" de qualquer repositório — e fazer o checklist final antes da entrega.

**Por que fazemos isso?**
Um projeto sem README é um projeto que ninguém consegue rodar. No mundo real, o README é o primeiro (e às vezes o único) arquivo que um colega, recrutador ou avaliador vai ler. Na avaliação desta disciplina, ele vale nota — e o critério é simples: _um colega conseguiria clonar e rodar seu projeto lendo apenas o README?_

### Passo 7.1: Criar o `README.md`

**Ação:** Crie o arquivo `README.md` na **raiz** do projeto e adapte o modelo abaixo (troque o nome, o link do repositório e o que mais quiser personalizar):

````markdown
# Todo List — Clojure/ClojureScript

**Aluno(a):** Seu Nome Completo Aqui

**Tutorial original:** [Tutorial Clojure/ClojureScript: Construindo uma Aplicação
Persistente e Reativa](https://profsergiocosta.notion.site/Tutorial-Clojure-ClojureScript-Construindo-uma-Aplica-o-Persistente-e-Reativa-2a5cce975093807aa9f0f0cb0cf69645)

## Descrição

Aplicação full-stack de lista de tarefas (Todo List), construída de forma
incremental para estudar a arquitetura de aplicações funcionais modernas:

- **Backend:** Clojure, com [Ring](https://github.com/ring-clojure/ring)
  (servidor Jetty) e [Reitit](https://github.com/metosin/reitit) (roteamento),
  expondo uma API REST com CRUD completo.
- **Banco de dados:** SQLite, acessado via
  [next.jdbc](https://github.com/seancorfield/next-jdbc), com persistência
  real em disco (`prod.db`).
- **Frontend:** ClojureScript com
  [Reagent](https://github.com/reagent-project/reagent) (React) e
  [Shadow-CLJS](https://github.com/thheller/shadow-cljs), consumindo a API
  via `fetch`.

## Pré-requisitos

| Ferramenta                                                        | Versão mínima |
| ----------------------------------------------------------------- | ------------- |
| Java (JDK)                                                        | 11+           |
| [Clojure CLI](https://clojure.org/guides/install_clojure) (`clj`) | 1.11+         |
| Node.js (`node` / `npm`)                                          | 18+           |

## Como Rodar

1. **Clone o repositório e instale as dependências do frontend:**

   ```bash
   git clone https://github.com/SEU-USUARIO/SEU-REPO.git
   cd SEU-REPO
   npm install
   ```

2. **Terminal 1 — Backend (API na porta 3000):**

   ```bash
   clj -M:run
   ```

   Na primeira execução, as dependências Clojure serão baixadas e o banco
   `prod.db` será criado automaticamente.

3. **Terminal 2 — Frontend (porta 8000):**

   ```bash
   npx shadow-cljs watch app
   ```

   Aguarde a mensagem `Build completed`.

4. **Abra o navegador em:** [http://localhost:8000](http://localhost:8000)

## Endpoints da API

| Método   | Rota                    | Descrição                            |
| -------- | ----------------------- | ------------------------------------ |
| `GET`    | `/api/todos`            | Lista todas as tarefas               |
| `POST`   | `/api/todos`            | Cria uma tarefa (`{"title": "..."}`) |
| `POST`   | `/api/todos/:id/toggle` | Alterna o status feito/não feito     |
| `DELETE` | `/api/todos/:id`        | Remove uma tarefa                    |
````

<aside markdown="1">
💡 O modelo acima usa blocos de código aninhados dentro de uma lista — se o seu editor "quebrar" a renderização, simplifique: o importante é que as informações (nome, link, descrição, pré-requisitos e os comandos dos dois terminais) estejam lá e corretas.
</aside>

### Passo 7.2: O Teste do "Colega"

**Ação:** Faça de conta que você é outra pessoa. Siga o **seu próprio README**, literalmente, do zero:

1. Clone seu repositório em uma **pasta nova** (ex: `/tmp/teste-todo`).
2. Execute exatamente os comandos do README, na ordem.
3. A aplicação subiu? O CRUD funciona? Os dados persistem após reiniciar o backend?

Se algo falhou, é o README (ou o repositório) que precisa de ajuste — melhor descobrir agora do que o avaliador descobrir depois. Um problema clássico revelado por esse teste: esquecer o passo `npm install` (a pasta `node_modules/` não vai para o Git!).

### Passo 7.3: Commit Final

```bash
git add README.md
git commit -m "docs: adiciona README com instruções de execução"
```

### Passo 7.4: Checklist de Entrega

Antes de enviar, confira o histórico:

```bash
git log --oneline
```

Você deve ver (de cima para baixo, do mais novo para o mais antigo):

```
docs: adiciona README com instruções de execução
feat(crud): implementa funcionalidades de toggle e delete
refactor(db): substitui banco em memória por persistência SQLite
feat: conecta frontend com API do backend (CORS corrigido)
feat: implementa UI do frontend com estado local (sem API)
feat: implementa API REST de 'todos' com banco em memória
feat: implementa servidor 'Hello World' com Jetty e Reitit
feat: setup inicial do projeto com .gitignore
```

(Commits extras no meio não são problema — o que importa é que os **marcos** estejam lá e na ordem certa.)

**Checklist final:**

- [ ] O repositório no GitHub é **público**?
- [ ] O `git push` foi feito? (O que está só na sua máquina não conta!)
- [ ] O README tem: nome completo, link do tutorial, descrição e instruções de execução?
- [ ] `prod.db` e `node_modules/` **não** estão no repositório (confira na página do GitHub)?
- [ ] O CRUD completo funciona e os dados persistem após reiniciar o backend?
- [ ] **SIGAA:** link público do repositório na caixa de **Comentários** + o **ZIP** (GitHub → botão _Code_ → _Download ZIP_) no **Anexo**.

---

## 🚀 Tutorial Concluído!

**Parabéns!** 🥳 Você construiu, passo a passo, uma aplicação web full-stack, moderna e persistente, depurando e corrigindo erros do mundo real ao longo do caminho — CORS, formatos de dados, keywords qualificadas, versões de ferramentas.

Mais importante do que o Todo List em si é o **padrão arquitetural** que você agora domina: estado imutável em caixas (`atom`/`r/atom`), funções puras como handlers, dados fluindo como mapas do banco ao navegador, e um histórico Git que conta a história do projeto.

**Quer ir além?** Algumas ideias de extensão (opcionais):

- Um campo de **edição** do título (o "U" completo do CRUD);
- Filtros "Todas / Ativas / Concluídas" no frontend;
- Exibir o `:error` e o `:loading` do `app-state` na interface;
- Trocar o SQLite por PostgreSQL (só muda o `db-spec` e o driver!);
- Refazer o mesmo problema em [Elixir/Phoenix LiveView](/blog/tutorial-elixir-phoenix-liveview-todo-list/), no tutorial complementar da série.
