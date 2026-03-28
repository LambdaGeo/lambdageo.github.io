---
layout: page
title: "DisSLUCC: Discrete Spatial Simulation for LUCC"
description: "A Python framework for Land Use and Cover Change and coastal dynamics based on discrete event simulation."
importance: 1
category: Research
---

## 🛰️ Overview

The **DisSLUCC** (Discrete Spatial Simulation for Land Use and Cover Change) project aims to develop an extensible Python framework for simulating environmental changes. It is built upon the **DisSModel** engine, currently under development by the **LambdaGEO** group at UFMA.

The project addresses a critical gap: providing a modern, Python-based alternative to established but aging modeling infrastructures.

---

## 🛠️ Technological Transition

The core of DisSLUCC is a strategic mapping and evolution of two major scientific models into the Python ecosystem:

* **From LuccME (Lua/TerraME) to Python:** We are implementing the state-of-the-art modular architecture of **LuccME**—originally developed by INPE in Lua—into a flexible Python environment. This includes both discrete (neighborhood rules) and continuous (CLUE-S approach) allocation algorithms.

* **Integrating BR-MANGUE:** The project will incorporate the biophysical rules of the **BR-MANGUE** model to simulate coastal dynamics, such as sea-level rise, sediment accretion, and mangrove vegetation migration.

---

## 🔬 Methodology & Infrastructure

The development follows an iterative approach across three phases:

1. **Discrete Models:** Validation of categorical land-use states.  
2. **Continuous Models:** Implementation of spatial regression and iterative allocation.  
3. **Coastal Dynamics:** Real-world experiments using data from the **Maranhão coast** under IPCC climate scenarios.

The framework leverages the **Salabim** discrete event engine and supports both vector (**GeoPandas**) and matrix (**NumPy**) substrates.

---

## 🌍 Sustainable Development Goals (SDGs)

This research contributes directly to several United Nations SDGs:

* **SDG 4 (Quality Education):** Training students in Geographic Data Science and scientific software engineering.  
* **SDG 13 (Climate Action):** Modeling carbon sequestration and climate change impacts.  
* **SDG 14 (Life Below Water):** Protecting coastal and marine ecosystems like mangroves.  
* **SDG 15 (Life on Land):** Managing sustainable land use and halting biodiversity loss.

---

## 📘 Key Information

* **Principal Investigator:** [Prof. Sérgio Souza Costa](http://lattes.cnpq.br/2073311645132958)  
* **Period:** August 2026 – September 2028  
* **Collaborating Researcher:** Prof. Denilson da Silva Bezerra  
* **Open Science:** All results will be published as open-source code and featured in the upcoming book *Geospatial Modeling with Python*.

---

> **Get Involved:** We are training four undergraduate fellows in **Geographic Data Science**. Check our [GitHub repository](https://github.com/LambdaGeo) for interactive Jupyter Notebooks and framework updates.