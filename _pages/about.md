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
       <a href="https://orcid.org/0000-0002-0232-4549">ORCID</a></p>

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

## 🔬 Research Areas

### 🌍 Dynamic Spatial Modelling

Our flagship research area — modern, Python-native tools for discrete spatial simulation (Cellular Automata, System Dynamics, and Land Use & Cover Change).

**Main project: [DisSModel](https://dissmodel.github.io/)** — a modern alternative to TerraME/LuccME (INPE).

**[🔗 dissmodel.github.io](https://dissmodel.github.io/)** · [GitHub Organization](https://github.com/DisSModel) · `pip install dissmodel`

_Built on the Executor Pattern: the same model code runs locally or on cloud clusters without modification. Every experiment records SHA-256 checksums, TOML specs, and Git commits for full reproducibility._

**Textbooks** (open-access, in Portuguese — see the [Geospatial Track](/ebooks/)):

- **[Introdução ao Geoprocessamento e Sensoriamento Remoto](https://lambdageo.github.io/book-geoprocessamento-e-sensoriamento-remoto/)** — the entry point: remote sensing with Google Earth Engine and spatial databases with PostGIS and QGIS.
- **[Geospatial Modeling with Python](https://lambdageo.github.io/geospatial-modeling-python/)** — a didactic textbook covering geospatial Python from scratch; chapters 1–16 are independent of DisSModel.

> DisSModel builds on two decades of prior work: **TerraTranslator** (Lima Júnior, 2002; with Gilberto Câmara) → **TerraHS** (2005, models as verifiable artifacts) → **TerraME / LuccME** (2007–10, INPE, spatially explicit dynamic models) → **DisSModel** (2024–26, Python, FAIR, cloud-native).

---

## 🌱 Other Areas of Interest

Ongoing interests with less active focus today, but part of the group's intellectual lineage.

### 🔗 Semantic Web & Geoinformatics

We bridge **Linked Open Data (LOD)** with **Geographic Information Systems (GIS)** to enable interoperable, FAIR-compliant spatial research:

| Project        | Description                                        | Link                                              |
| -------------- | -------------------------------------------------- | -------------------------------------------------- |
| **rdfmapper**  | Declarative Object-RDF Mapper for Python           | [GitHub](https://github.com/LambdaGeo/rdfmapper)  |
| **QGISSPARQL** | Bridge Triple Stores ↔ QGIS for semantic mapping   | [GitHub](https://github.com/LambdaGeo/qgissparql) |
| **DBCells**    | Publish spatial modeling data as Linked Data cubes | [GitHub](https://github.com/LambdaGeo/dbcells)    |

> _These projects feed into DisSModel's provenance layer._

_Roots trace back to **TerraTranslator** (Lima Júnior, 2002; with Gilberto Câmara), a tool for converting geographic data formats. Rovedy A. B. Silva's 2003 master's dissertation (INPE, advised by Antônio Miguel Monteiro) extended it to export to **GeoBR** and **GML 3.0** — early work on ontologies and interoperable semantics for geographic data in Brazil, predating today's widespread use of GML._

### λ Functional Programming

**[TerraHS](https://github.com/LambdaGeo/terrahs)** (2005–2009) — an early vision of scientific models as verifiable, executable artifacts in Haskell. Now fully **rewritten in pure Haskell**, dropping the original FFI dependency on TerraLib: same geometry, spatial predicates, and generalized map algebra, built from scratch with no system dependencies. Used as teaching material for both **functional programming** and **GIS** courses.



**[PlayReg](https://github.com/LambdaGeo/playreg)** — a regex engine built on Brzozowski derivatives, following the *"A Play on Regular Expressions"* functional pearl, generalized via a Semiring abstraction to compute acceptance, match counts, or submatch positions.

**Textbook**: **[Introdução à Programação Funcional](https://lambdageo.github.io/book-introducao-a-programacao-funcional/)** (Haskell/Clojure/Elixir) — part of the Computing Core series in our open-access [Computing Track](/ebooks/).

---

## 👨‍🏫 Leadership & Mentorship

**Prof. Sérgio Souza Costa**  
_Associate Professor of Computer Engineering, UFMA_  
_Researcher, Graduate Program in Environmental Science & Technology (PPGC&TAmb)_

**Background**: Applied Computing (UFMA); MSc & PhD in Applied Computing (INPE) — research in Geoprocessing & Dynamic Land-Use/Land-Cover Modeling 
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
- **PPGC&TAmb** — [Graduate Program in Environmental Science & Technology](https://ppgctamb.ufma.br/)

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