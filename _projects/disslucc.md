---
layout: page
title: "DisSLUCC: Discrete Spatial Simulation for LUCC"
description: "A Python framework for Land Use and Cover Change and coastal dynamics based on discrete event simulation."
importance: 1
category: Research
---

## 🛰️ Overview

[span_0](start_span)[span_1](start_span)The **DisSLUCC** (Discrete Spatial Simulation for Land Use and Cover Change) project aims to develop an extensible Python framework for simulating environmental changes[span_0](end_span)[span_1](end_span). [span_2](start_span)[span_3](start_span)It is built upon the **DisSModel** engine, currently under development by the **LambdaGEO** group at UFMA[span_2](end_span)[span_3](end_span).

[span_4](start_span)[span_5](start_span)The project addresses a critical gap: providing a modern, Python-based alternative to established but aging modeling infrastructures[span_4](end_span)[span_5](end_span).

---

## 🛠️ Technological Transition

The core of DisSLUCC is a strategic mapping and evolution of two major scientific models into the Python ecosystem:

* **[span_6](start_span)[span_7](start_span)[span_8](start_span)From LuccME (Lua/TerraME) to Python:** We are implementing the state-of-the-art modular architecture of **LuccME**—originally developed by INPE in Lua—into a flexible Python environment[span_6](end_span)[span_7](end_span)[span_8](end_span). [span_9](start_span)[span_10](start_span)This includes both discrete (neighborhood rules) and continuous (CLUE-S approach) allocation algorithms[span_9](end_span)[span_10](end_span).
* **[span_11](start_span)[span_12](start_span)[span_13](start_span)Integrating BR-MANGUE:** The project will incorporate the biophysical rules of the **BR-MANGUE** model to simulate coastal dynamics, such as sea-level rise, sediment accretion, and mangrove vegetation migration[span_11](end_span)[span_12](end_span)[span_13](end_span).

---

## 🔬 Methodology & Infrastructure

[span_14](start_span)[span_15](start_span)The development follows an iterative approach across three phases[span_14](end_span)[span_15](end_span):
1.  **[span_16](start_span)[span_17](start_span)Discrete Models:** Validation of categorical land-use states[span_16](end_span)[span_17](end_span).
2.  **[span_18](start_span)[span_19](start_span)Continuous Models:** Implementation of spatial regression and iterative allocation[span_18](end_span)[span_19](end_span).
3.  **[span_20](start_span)[span_21](start_span)[span_22](start_span)Coastal Dynamics:** Real-world experiments using data from the **Maranhão coast** under IPCC climate scenarios[span_20](end_span)[span_21](end_span)[span_22](end_span).

[span_23](start_span)[span_24](start_span)The framework leverages the **Salabim** discrete event engine and supports both vector (**GeoPandas**) and matrix (**NumPy**) substrates[span_23](end_span)[span_24](end_span).

---

## 🌍 Sustainable Development Goals (SDGs)

[span_25](start_span)This research contributes directly to several United Nations SDGs[span_25](end_span):

* **[span_26](start_span)[span_27](start_span)[span_28](start_span)SDG 4 (Quality Education):** Training students in Geographic Data Science and scientific software engineering[span_26](end_span)[span_27](end_span)[span_28](end_span).
* **[span_29](start_span)[span_30](start_span)SDG 13 (Climate Action):** Modeling carbon sequestration and climate change impacts[span_29](end_span)[span_30](end_span).
* **[span_31](start_span)[span_32](start_span)SDG 14 (Life Below Water):** Protecting coastal and marine ecosystems like mangroves[span_31](end_span)[span_32](end_span).
* **[span_33](start_span)[span_34](start_span)SDG 15 (Life on Land):** Managing sustainable land use and halting biodiversity loss[span_33](end_span)[span_34](end_span).

---

## 📘 Key Information

* **Principal Investigator:** [Prof. [span_35](start_span)[span_36](start_span)Sérgio Souza Costa](http://lattes.cnpq.br/2073311645132958)[span_35](end_span)[span_36](end_span)
* **[span_37](start_span)[span_38](start_span)Period:** August 2026 – September 2028[span_37](end_span)[span_38](end_span)
* **[span_39](start_span)Collaborating Researcher:** Prof. Denilson da Silva Bezerra[span_39](end_span)
* **[span_40](start_span)[span_41](start_span)[span_42](start_span)Open Science:** All results will be published as open-source code and featured in the upcoming book *Geospatial Modeling with Python*[span_40](end_span)[span_41](end_span)[span_42](end_span).

---

> **Get Involved:** We are training four undergraduate fellows in **Geographic Data Science**. [span_43](start_span)[span_44](start_span)[span_45](start_span)Check our [GitHub repository](https://github.com/LambdaGeo) for interactive Jupyter Notebooks and framework updates[span_43](end_span)[span_44](end_span)[span_45](end_span).
