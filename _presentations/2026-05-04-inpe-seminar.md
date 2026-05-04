---
layout: page
title: "Building Open and Reproducible Geospatial Simulations with Python"
date: 2026-05-07
event: "Seminar at INPE - CAP"
location: "Remote"
slides: /assets/pdf/dissmodel_presentation_english.pdf

---



### Abstract

This presentation introduces the **DisSModel [(Discrete Spatial Modeling Framework)](https://dissmodel.github.io/)**, a Python-native ecosystem designed to address the reproducibility crisis in geospatial simulations. The framework bridges the gap between scientific experimentation and scale production, allowing researchers to develop dynamic models—such as Cellular Automata and System Dynamics—with full traceability and native cloud integration.

### Key Takeaways

* **"Science-to-Production" Philosophy:** The core principle of DisSModel is that scientific code should not require rewriting to run in production environments or high-performance clusters.
* **Evidence-Based Architecture:** Each simulation run generates an immutable and auditable record (SHA-256), ensuring computational reproducibility aligned with Open Science and FAIR principles.
* **Spatial Duality:** Native support for both vector (via GeoPandas) and raster (via NumPy) substrates, featuring performance gains of up to 39x in raster optimizations.
* **Empirical Modeling:** Proven effectiveness in real-world scenarios, including the **br-mangue** study for coastal mangrove migration and **DisSLUCC** for land use and cover change (LUCC) modeling.

### Ecosystem Structure

The project is organized into independent modules under the **@dissmodel** organization:
1. **Core Framework (`dissmodel`):** The central simulation engine.
2. **Laboratory Models:** Implementations of classic models (e.g., Game of Life, SIR, Predator-Prey) for educational purposes and benchmarking.
3. **Empirical Models:** High-fidelity models tailored for real-world decision-making scenarios.
4. **Platform & Configs:** Cloud-native infrastructure (FastAPI, Docker, MinIO) and a centralized model catalog using TOML manifests.

---
*Presented by **Sérgio Souza Costa** (LambdaGeo / UFMA).*
