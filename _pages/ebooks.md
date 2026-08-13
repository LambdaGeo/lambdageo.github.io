
---
layout: page
permalink: /ebooks/
title: ebooks
description: Collection of open-access textbooks covering core Computer Science topics and geospatial modeling, published with MkDocs + Material.
nav: true
nav_order: 5
dropdown: true
children:
  - title: Geospatial Modeling in Python
    permalink: https://lambdageo.github.io/geospatial-modeling-python/
  - title: DisSModel Book
    permalink: https://dissmodel.github.io/dissmodel-book/
  - title: Tutoriais
    permalink: https://lambdageo.github.io/tutoriais
  - title: C para Programadores Python e VisuAlg
    permalink: https://lambdageo.github.io/introducao-c/
  - title: Estrutura de Dados
    permalink: https://lambdageo.github.io/estrutura-dados/
  - title: Introdução à Programação Funcional (IPF)
    permalink: https://lambdageo.github.io/ipf/
  - title: Compiladores usando Nand2Tetris
    permalink: https://lambdageo.github.io/nand2tetris-compilador/
  - title: Paradigmas de Programação
    permalink: https://lambdageo.github.io/paradigmas-programacao/
  - title: Introdução ao Computador
    permalink: https://lambdageo.github.io/introducao-computador/
  - title: Engenharia de Software
    permalink: https://lambdageo.github.io/engenharia-software/
---

Open-access textbooks covering **core topics** of an undergraduate Computer Science curriculum plus a specialized geospatial track. All books are published with [MkDocs + Material](https://squidfunk.github.io/mkdocs-material/) and hosted free on GitHub Pages.

> 🌐 **Language note:** The books themselves are in Portuguese, as they were developed for Brazilian undergraduate courses. This index page is in English to align with the rest of the site.

---

## 🧭 Computing Track (8 books)

Textbooks for undergraduate Computer Science and Computer Engineering students, organized by prerequisites.

### 📘 Series: Foundations
*No CS prerequisites — entry point.*

- **[C para Programadores Python e VisuAlg](https://lambdageo.github.io/introducao-c/)** — C language leveling through comparative mapping with Python and VisuAlg. Prerequisite: already programming in Python and/or VisuAlg.

- **[Introdução ao Computador](https://lambdageo.github.io/introducao-computador/)** — Data representation, architecture, and operating systems, without programming. Designed for continuing education of teachers (PROFCOMP), not CS undergraduates.

### 📙 Series: Computing Core
*Requires an introductory programming course.*

- **[Estrutura de Dados](https://lambdageo.github.io/estrutura-dados/)** — Stacks, queues, lists, trees (BST/AVL), and sorting, in C. Prerequisite: C para Programadores Python e VisuAlg.

- **[Paradigmas de Programação](https://lambdageo.github.io/paradigmas-programacao/)** — Language paradigms and object-oriented programming in Java.

- **[Introdução à Programação Funcional (IPF)](https://lambdageo.github.io/ipf/)** — Haskell, Clojure, and Elixir.

### 📗 Series: Advanced / Applied
*Requires Data Structures and/or a consolidated language.*

- **[Compiladores — do zero ao Hack](https://lambdageo.github.io/nand2tetris-compilador/)** — Complete compiler construction (Jack → VM → Assembly), in the spirit of Nand2Tetris. Prerequisite: Estrutura de Dados.

- **[Engenharia de Software](https://lambdageo.github.io/engenharia-software/)** — Processes, requirements, architecture, testing, and CI/CD.

- **[Tutoriais](https://lambdageo.github.io/tutoriais)** — Guided practice in Docker, Clojure, Elixir, and Haskell; complements the assessment projects from the IPF book.

---

## 🌍 Geospatial Track (2 companion books)

A didactic textbook and a technical reference for geographic data science and discrete spatial simulation, designed to be read together.

| Book | Type | When to use |
| --- | --- | --- |
| **[Geospatial Modeling in Python](https://lambdageo.github.io/geospatial-modeling-python/)** | Didactic textbook (from scratch) | Learning geospatial Python. Chapters 1–13 are independent of DisSModel. |
| **[DisSModel Book](https://dissmodel.github.io/dissmodel-book/)** | Technical reference | Already know DisSModel or migrating from TerraME. API, architecture, migration guide. |

💡 **Recommended flow:** Read the textbook up to Chapter 14, then consult the DisSModel Book for framework details.

---

## 🤝 How to Use These Books

### For Students
- Follow the prerequisite chain within each series
- Use the books as primary material alongside your courses
- Check the "Tutoriais" book for hands-on practice with tools like Docker

### For Instructors
- All books are open-source and can be adapted for your courses
- Each book has its own GitHub repository — contributions welcome
- Feel free to use, modify, and redistribute (check individual licenses)

### For Self-Learners
- Start with **Introdução ao Computador** (no prerequisites)
- Or jump to **C para Programadores Python** if you already know Python
- For geospatial topics, begin with **Geospatial Modeling in Python**

---

## 📊 Overview

| Category | Books | Language | Format |
| --- | --- | --- | --- |
| Foundations | 2 | Portuguese | Web + Jupyter |
| Computing Core | 3 | Portuguese | Web + Jupyter |
| Advanced | 3 | Portuguese | Web + Jupyter |
| Geospatial | 2 | English/Portuguese | Web + Jupyter |

**Total: 10 open books** · All free · All on GitHub Pages · All with source code available

---

_Contributions welcome! See each book's repository for guidelines._