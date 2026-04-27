---
layout: about
title: About
permalink: /
subtitle: >
  <a href="https://www.ufma.br">UFMA</a> · Computer Engineering · 
  Geotechnology & Applied Computing · 
  <a href="https://github.com/DisSModel">DisSModel Ecosystem</a>

profile:
  align: right
  image: prof_pic.webp
  image_circular: true
  more_info: >
    <p>✉️ sergio.costa@ufma.br</p>
    <p>📍 UFMA — São Luís, MA, Brazil</p>
    <p><a href="https://lattes.cnpq.br/...">Lattes</a> · 
       <a href="https://scholar.google.com/...">Google Scholar</a></p>

selected_papers: true 
social: true 

announcements:
  enabled: true
  scrollable: true
  limit: 3
  heading: "📢 News & Opportunities"  

latest_posts:
  enabled: true
  scrollable: true
  limit: 3
  heading: "📝 Recent Updates"  
---

# 🛰️ LambdaGEO  
### Computing & Geotechnology Research Group

**LambdaGEO** is a research group at the **Federal University of Maranhão (UFMA)** working at the intersection of **Computer Engineering**, **Geosciences**, and **Open Science**.  

We develop reproducible, open-source tools for spatial simulation, semantic data integration, and environmental modeling — with a 20+ year research trajectory focused on one question:

> *How can geospatial models be built so that others can understand, reuse, and trust them?*

[→ Learn about our research trajectory](#-research-trajectory)

---

## 🌍 The DisSModel Ecosystem

Our flagship initiative is **DisSModel** — a modern, Python-native framework for discrete spatial simulation. To foster community-driven development, the ecosystem is hosted under its own organization:  
🔗 [**github.com/DisSModel**](https://github.com/DisSModel)

### 🛠️ Core Framework & Infrastructure

| Repository | Description | Status |
|------------|-------------|--------|
| **[dissmodel](https://github.com/DisSModel/dissmodel)** | Modular engine for CA & System Dynamics; dual-substrate (Vector/Raster) | ✅ PyPI · v0.4 |
| **[dissmodel-platform](https://github.com/DisSModel/dissmodel-platform)** | Scalable execution via FastAPI, Redis, MinIO; cloud-ready | 🚧 Beta |
| **[dissmodel-docs](https://github.com/DisSModel/dissmodel-docs)** | Documentation, tutorials, and API reference (MkDocs) | 📚 Live |

### 🧩 Domain Libraries

Specialized extensions for scientific applications:

| Repository | Domain | Key Models |
|------------|--------|-----------|
| **[dissmodel-ca](https://github.com/DisSModel/dissmodel-ca)** | Cellular Automata | Game of Life, Forest Fire, Growth |
| **[dissmodel-sysdyn](https://github.com/DisSModel/dissmodel-sysdyn)** | System Dynamics | SIR, Predator-Prey, Lorenz |
| **[coastal-dynamics](https://github.com/DisSModel/coastal-dynamics)** | Coastal Systems | Flood propagation, mangrove migration |
| **[DisSLUCC](https://github.com/DisSModel/DisSLUCC)** | Land Use Change | CLUE-inspired allocation, demand modeling |

💡 *All libraries follow the Executor Pattern: same model code runs locally or on cloud clusters without modification.*

---

## 🧠 Semantic Web & Geoinformatics

We bridge **Linked Open Data (LOD)** with **Geographic Information Systems (GIS)** to enable interoperable, FAIR-compliant spatial research:

| Project | Description | Link |
|---------|-------------|------|
| **rdfmapper** | Declarative Object-RDF Mapper for Python | [GitHub](https://github.com/LambdaGeo/rdfmapper) |
| **QGISSPARQL** | Bridge Triple Stores ↔ QGIS for semantic mapping | [GitHub](https://github.com/LambdaGeo/qgissparql) |
| **DBCells** | Publish spatial modeling data as Linked Data cubes | [GitHub](https://github.com/LambdaGeo/dbcells) |

> 🎯 *These projects feed into DisSModel's provenance layer: every experiment records SHA-256 checksums, TOML specs, and Git commits for full reproducibility.*

---

## 📖 Research Trajectory

DisSModel did not emerge from a blank slate. It synthesizes two decades of inquiry:

| Period | Project | Contribution |
|--------|---------|-------------|
| **2001–2002** | Terra Translator (XML, ontologies) | Foundation: semantics + open standards for geographic data |
| **2005** | TerraHS (Haskell + GIS) | Vision: scientific models as verifiable, executable artifacts |
| **2007–2010** | TerraME / LuccME (INPE) | Maturity: spatially explicit dynamic models as scientific objects |
| **2015–2024** | DbCells, Linked Data, QGIS plugins | Infrastructure: reproducibility via rich metadata  |
| **2024–2026** | **DisSModel** (Python, FAIR, cloud-native) | Synthesis: same code from CLI to distributed cluster |

Three principles unite this trajectory:  
🔓 **Openness as method** · 🧩 **Interoperability as architecture** · ♻️ **Reproducibility as requirement**

[→ Read the full research statement](#) *(link para PDF ou página dedicada)*

---

## 📚 Geospatial Modeling with Python *(The Book)*

We are writing an open-access book to empower researchers with modern Python tools for geographic data science and simulation.

📘 **[Read the book (Work in Progress)](https://lambdageo.github.io/geospatial-modeling-python/)**  
🛠️ *Contributions welcome! See the [repository](https://github.com/LambdaGeo/geospatial-modeling-python) for guidelines.*

---

## 👨‍🏫 Leadership & Mentorship

**Prof. Sérgio Souza Costa**  
*Associate Professor of Computer Engineering, UFMA*  
*Researcher, Graduate Program in Environmental Science & Technology (PPGC&TAmb)*  

🎓 **Background**: MSc & PhD in Remote Sensing (INPE); Data Processing Technology (UFMA)  
🔬 **Focus**: Reproducible geospatial modeling, functional programming, FAIR data infrastructure  

### 🎓 For Students & Collaborators

> We use **Notion** for mentorship, lecture materials, and project tracking:  
> 🔗 [profsergiocosta.notion.site](https://profsergiocosta.notion.site)

**Interested in joining LambdaGEO?**  
We welcome motivated **PIBIC**, and **master's** students with interest in:
- 🐍 Python for scientific computing
- 🗺️ GIS, remote sensing, and spatial analysis
- ♻️ Reproducibility, FAIR principles, and open science
- ⚙️ Software engineering for research software

📩 *Contact: sergio.costa@ufma.br with a brief note about your background and interests.*

---

## 🤝 Partners & Affiliations

- 🏛️ **UFMA** — Federal University of Maranhão
- 🛰️ **INPE** — National Institute for Space Research (Brazil)
- 🌐 **Brazil Data Cube** — Open Earth Observation platform
- 🎓 **PPGC&TAmb** — Graduate Program in Environmental Science & Technology

---

## 📬 Stay Connected

- 💻 **Code**: [github.com/LambdaGeo](https://github.com/LambdaGeo) · [github.com/DisSModel](https://github.com/DisSModel)  
- 📘 **Docs**: [lambdageo.github.io/dissmodel](https://lambdageo.github.io/dissmodel)  
- 📦 **PyPI**: `pip install dissmodel`  
- ✉️ **Email**: sergio.costa@ufma.br  

> *"A ciência não deve ser reescrita para ir para a produção."*  
> *("Science should not need to be rewritten to go into production.")*  
> — **DisSModel Design Principle**
