---
layout: page
permalink: /ebooks/
title: e-books
description: Collection of open-access textbooks covering core Computer Science topics, geoprocessing and remote sensing, and geospatial modeling, published with MkDocs + Material.
nav: true
nav_order: 5
dropdown: true
children:
  - title: Geoprocessamento e Sensoriamento Remoto
    permalink: https://lambdageo-edu.github.io/book-geoprocessamento-e-sensoriamento-remoto/
  - title: Geospatial Modeling in Python
    permalink: https://lambdageo.github.io/geospatial-modeling-python/
  - title: Tutoriais LambdaGeo
    permalink: https://lambdageo-edu.github.io/lambdageo-tutorials/
  - title: C para Programadores Python e VisuAlg
    permalink: https://lambdageo-edu.github.io/book-introducao-a-programacao-c/
  - title: Estrutura de Dados
    permalink: https://lambdageo-edu.github.io/book-estrutura-de-dados/
  - title: Introdução à Programação Funcional (IPF)
    permalink: https://lambdageo-edu.github.io/book-introducao-a-programacao-funcional/
  - title: Compiladores com Nand2Tetris
    permalink: https://lambdageo-edu.github.io/book-compiladores-com-nand2tetris/
  - title: Paradigmas de Programação
    permalink: https://lambdageo-edu.github.io/book-paradigmas-de-programacao/
  - title: Introdução ao Computador
    permalink: https://lambdageo-edu.github.io/book-introducao-ao-computador/
  - title: Engenharia de Software
    permalink: https://lambdageo-edu.github.io/book-engenharia-de-software/
---

Open-access textbooks covering **core topics** of an undergraduate Computer Science curriculum, plus a specialized geospatial track. All books are published with [MkDocs + Material](https://squidfunk.github.io/mkdocs-material/) and hosted for free on GitHub Pages.

> 🌐 **Language note:** The books themselves are in Portuguese, as they were developed for Brazilian undergraduate and graduate courses. This index page is in English to align with the international standards of the LambdaGeo research group.

---

## 🧭 Computing Track (8 books)

Textbooks for undergraduate Computer Science and Computer Engineering students, organized by prerequisites.

### 📘 Series: Foundations
*No CS prerequisites — entry point.*

- **[C para Programadores Python e VisuAlg](https://lambdageo-edu.github.io/book-introducao-a-programacao-c/)** — A C language primer through comparative mapping with Python and VisuAlg. Prerequisite: basic proficiency in Python and/or VisuAlg.

- **[Introdução ao Computador](https://lambdageo-edu.github.io/book-introducao-ao-computador/)** — Data representation, computer architecture, and operating systems fundamentals, without programming. Designed primarily for the continuing education of in-service teachers (PROFCOMP).

### 📙 Series: Computing Core
*Requires an introductory programming course.*

- **[Estrutura de Dados](https://lambdageo-edu.github.io/book-estrutura-de-dados/)** — Stacks, queues, linked lists, trees (BST/AVL), and sorting algorithms, implemented in C. Prerequisite: *C para Programadores Python e VisuAlg*.

- **[Paradigmas de Programação](https://lambdageo-edu.github.io/book-paradigmas-de-programacao/)** — Programming paradigms and object-oriented programming using Java.

- **[Introdução à Programação Funcional (IPF)](https://lambdageo-edu.github.io/book-introducao-a-programacao-funcional/)** — Concepts and practical applications in Haskell, Clojure, and Elixir.

### 📗 Series: Advanced / Applied
*Requires Data Structures and/or proficiency in a consolidated language.*

- **[Compiladores com Nand2Tetris: do zero ao Hack](https://lambdageo-edu.github.io/book-compiladores-com-nand2tetris/)** — Complete compiler construction (Jack → VM → Assembly), inspired by the Nand2Tetris curriculum. Prerequisite: *Estrutura de Dados*.

- **[Engenharia de Software](https://lambdageo-edu.github.io/book-engenharia-de-software/)** — Software processes, requirements engineering, architecture, testing, and CI/CD pipelines.

- **[Tutoriais LambdaGeo](https://lambdageo-edu.github.io/lambdageo-tutorials/)** — Guided hands-on practice with Docker, Clojure, Elixir, and Haskell; complements the assessment projects from the IPF book.

---

## 🌍 Geospatial Track (2 books)

An introductory course textbook and a hands-on book on geographic data science and discrete spatial simulation, meant to be read in sequence.

| Book | Type | When to use |
| --- | --- | --- |
| **[Introdução ao Geoprocessamento e Sensoriamento Remoto](https://lambdageo-edu.github.io/book-geoprocessamento-e-sensoriamento-remoto/)** | Course textbook (30 h, no prerequisites) | First contact with geoinformation: cartography basics, remote sensing with Google Earth Engine, and spatial databases with PostGIS and QGIS. |
| **[Geospatial Modeling in Python](https://lambdageo.github.io/geospatial-modeling-python/)** | Didactic textbook (from scratch) | Learning geospatial Python. Chapters 1–16 are independent of DisSModel. |

💡 **Recommended flow:** Start with *Introdução ao Geoprocessamento e Sensoriamento Remoto* for the concepts (objects × fields, vector × raster, CRS, spatial operations). Then move on to *Geospatial Modeling in Python* and read it through Chapter 16; after that, consult the DisSModel documentation for specific framework details.

---

## 🤝 How to Use These Books

### For Students
- Follow the prerequisite chain within each series.
- Use the books as primary study material alongside your university courses.
- Check the **Tutoriais** repository for hands-on practice with tools like Docker.

### For Instructors
- All books are open-source and can be adapted for your syllabus.
- Each book has its own GitHub repository — contributions and forks are welcome.
- Feel free to use, modify, and redistribute (please check individual licenses).

### For Self-Learners
- Start with **Introdução ao Computador** (no prerequisites).
- Or jump to **C para Programadores Python** if you already have basic programming knowledge.
- For geospatial topics, begin with **Introdução ao Geoprocessamento e Sensoriamento Remoto** (no programming required), then **Geospatial Modeling in Python**.

---

## 📊 Overview

| Category | Books | Language | Format |
| --- | --- | --- | --- |
| Foundations | 2 | Portuguese | Web + Jupyter |
| Computing Core | 3 | Portuguese | Web + Jupyter |
| Advanced | 3 | Portuguese | Web + Jupyter |
| Geospatial | 2 | Portuguese | Web + Jupyter |

**Total: 10 open books** · All free · All on GitHub Pages · All with source code available.

---

_Contributions are welcome! Please see each book's repository for specific guidelines._
