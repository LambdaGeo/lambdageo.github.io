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

O guia completo — com todas as fases, do setup do ambiente ao CRUD completo com Reagent e SQLite — está no site de Tutoriais, dividido em páginas por fase para facilitar a navegação e a consulta:

## [👉 Acessar o tutorial completo](https://lambdageo.github.io/tutoriais/clojure/)