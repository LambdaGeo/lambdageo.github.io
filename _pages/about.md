---
layout: about
title: About
permalink: /
subtitle: >
  <a href="https://www.ufma.br">UFMA</a> · Computer Engineering · 
  Geotechnology & Applied Computing · 
  <a href="https://dissmodel.github.io/">DisSModel Ecosystem</a>

profile:
  align: right
  image: prof_pic.webp
  image_circular: true
  more_info: >
    <p>sergio.costa@ufma.br</p>
    <p>UFMA — São Luís, MA, Brazil</p>
    <p><a href="http://lattes.cnpq.br/2073311645132958">Lattes</a> · 
       <a href="https://scholar.google.com/citations?user=ggu2II0AAAAJ">Google Scholar</a> ·
       <a href="https://orcid.org/SEU-ORCID">ORCID</a></p>

selected_papers: true
social: true

announcements:
  enabled: true
  scrollable: true
  limit: 3
  heading: "News & Opportunities"

latest_posts:
  enabled: true
  scrollable: true
  limit: 3
  heading: "Recent Updates"
---

**LambdaGEO** is a research group at the **Federal University of Maranhão (UFMA)** working at the intersection of **Computer Engineering**, **Geosciences**, and **Open Science**.

We develop reproducible, open-source tools for spatial simulation, semantic data integration, and environmental modeling — and we publish all our teaching materials as free, open books.

> _How can geospatial models be built so that others can understand, reuse, and trust them?_

---

## 🌍 The DisSModel Ecosystem

Our flagship research initiative is **DisSModel** — a modern, Python-native framework for discrete spatial simulation (Cellular Automata, System Dynamics, and Land Use & Cover Change), designed as a modern alternative to TerraME/LUCCME (INPE).

**[🔗 dissmodel.github.io](https://dissmodel.github.io/)** · [GitHub Organization](https://github.com/DisSModel) · `pip install dissmodel`

_Built on the Executor Pattern: the same model code runs locally or on cloud clusters without modification. Every experiment records SHA-256 checksums, TOML specs, and Git commits for full reproducibility._

### Semantic Web & Geoinformatics

We bridge **Linked Open Data (LOD)** with **Geographic Information Systems (GIS)** to enable interoperable, FAIR-compliant spatial research:

| Project        | Description                                        | Link                                              |
| -------------- | -------------------------------------------------- | ------------------------------------------------- |
| **rdfmapper**  | Declarative Object-RDF Mapper for Python           | [GitHub](https://github.com/LambdaGeo/rdfmapper)  |
| **QGISSPARQL** | Bridge Triple Stores ↔ QGIS for semantic mapping   | [GitHub](https://github.com/LambdaGeo/qgissparql) |
| **DBCells**    | Publish spatial modeling data as Linked Data cubes | [GitHub](https://github.com/LambdaGeo/dbcells)    |

> _These projects feed into DisSModel's provenance layer._

---

## 📚 Open Books & Education

We maintain **10 open-access textbooks** published with [MkDocs + Material](https://squidfunk.github.io/mkdocs-material/) and hosted free on GitHub Pages. They cover **core topics** of an undergraduate Computer Science curriculum plus a specialized geospatial track.

### 🧭 Computing Track (8 books, organized by prerequisites)

| Series | Books | Audience |
| --- | --- | --- |
| 📘 **Fundamentos** | C para Programadores Python e VisuAlg · Introdução ao Computador | No CS prerequisites — entry point |
| 📙 **Núcleo** | Estrutura de Dados · Paradigmas de Programação (Java) · Programação Funcional (Haskell/Clojure/Elixir) | After an intro programming course |
| 📗 **Avançado** | Compiladores (estilo Nand2Tetris) · Engenharia de Software · Tutoriais (Docker, Clojure, Elixir, Haskell) | After Data Structures |

👉 **[Explore all books](/ebooks/)**

### 🌍 Geospatial Track (2 companion books)

A didactic textbook and a technical reference, designed to be read together:

| Book | Type | When to use |
| --- | --- | --- |
| **[Geospatial Modeling with Python](https://lambdageo.github.io/geospatial-modeling-python/)** | Didactic textbook (from scratch) | Learning geospatial Python. Chapters 1–13 are independent of DisSModel. |
| **[DisSModel Book](https://dissmodel.github.io/dissmodel-book/)** | Technical reference | Already know DisSModel or migrating from TerraME. API, architecture, migration guide. |

💡 **Recommended flow:** Read the textbook up to Chapter 14, then consult the DisSModel Book for framework details.

_Contributions welcome on both books — see each repository's guidelines._

---

## 🗺️ Research Trajectory

DisSModel did not emerge from a blank slate. It synthesizes two decades of inquiry:

| Period        | Project                                    | Contribution                                                      |
| ------------- | ------------------------------------------ | ----------------------------------------------------------------- |
| **2001–2002** | Terra Translator (XML, ontologies)         | Foundation: semantics + open standards for geographic data        |
| **2005**      | TerraHS (Haskell + GIS)                    | Vision: scientific models as verifiable, executable artifacts     |
| **2007–2010** | TerraME / LuccME (INPE)                    | Maturity: spatially explicit dynamic models as scientific objects |
| **2015–2024** | DbCells, Linked Data, QGIS plugins         | Infrastructure: reproducibility via rich metadata                 |
| **2024–2026** | **DisSModel** (Python, FAIR, cloud-native) | Synthesis: same code from CLI to distributed cluster              |

Three principles unite this trajectory:  
**Openness as method** · **Interoperability as architecture** · **Reproducibility as requirement**

---

## 👨‍🏫 Leadership & Mentorship

**Prof. Sérgio Souza Costa**  
_Associate Professor of Computer Engineering, UFMA_  
_Researcher, Graduate Program in Environmental Science & Technology (PPGC&TAmb)_

**Background**: **Background**: Applied Computing (UFMA); MSc & PhD in Applied Computing (INPE) — research in Geoprocessing & Dynamic Land-Use/Land-Cover Modeling 
**Focus**: Reproducible geospatial modeling, functional programming, FAIR data infrastructure

### Mentorship Workflow

> We use **Notion** for mentorship, lecture materials, and project tracking:  
> [profsergiocosta.notion.site](https://profsergiocosta.notion.site)

### Join LambdaGEO

We welcome motivated **PIBIC** and **master's** students interested in:

- Python for scientific computing
- GIS, remote sensing, and spatial analysis
- Reproducibility, FAIR principles, and open science
- Software engineering for research software

📧 _Contact: sergio.costa@ufma.br with a brief note about your background and interests._

---

## 🤝 Partners & Affiliations

- **[UFMA](https://www.ufma.br)** — Federal University of Maranhão
- **[INPE](http://www.inpe.br/)** — National Institute for Space Research (Brazil)
- **PPGC&TAmb** — Graduate Program in Environmental Science & Technology

---

## 📡 Stay Connected

- **Research code**: [github.com/LambdaGeo](https://github.com/LambdaGeo) · [github.com/DisSModel](https://github.com/DisSModel)
- **Documentation**: [dissmodel.github.io](https://dissmodel.github.io/)
- **Teaching materials**: [lambdageo.github.io/ebooks](/ebooks/)
- **PyPI**: `pip install dissmodel`
- **Email**: sergio.costa@ufma.br

> _"A ciência não deve ser reescrita para ir para a produção."_  
> _("Science should not need to be rewritten to go into production.")_  
> — **DisSModel Design Principle**
