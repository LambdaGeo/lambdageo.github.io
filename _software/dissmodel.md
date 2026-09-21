---
layout: page
title: DisSModel
description: A Discrete Spatial Modeling framework for Python.
img: https://github.com/LambdaGeo/dissmodel/raw/main/docs/images/streamlit_ca_all.png
importance: 1
category: Libraries
github: https://github.com/LambdaGeo/dissmodel
---

## DisSModel: Discrete Spatial Modeling in Python

**DisSModel** is a modular, open-source framework designed for spatially explicit dynamic modeling. Developed within the **LambdaGeo** research group at UFMA, it serves as a modern, Pythonic successor to the TerraME framework.

<div class="row justify-content-sm-center">
  <div class="col-sm-8 mt-3 mt-md-0">
    {% include figure.liquid
       path="assets/img/software/arquitetura_dissmodel.png"
       title="DisSModel Architecture"
       class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  The four-module architecture: Core, Geo, Models, and Visualization.
</div>

---

## Why DisSModel?

While traditional tools often rely on specialized stacks, DisSModel is built directly on top of the standard Python geospatial ecosystem, leveraging **GeoPandas**, **PySAL**, and **Salabim**. It provides a unified environment for building:

- **Cellular Automata (CA):** Spatial grid models with configurable neighborhood strategies (Queen, Rook, KNN).
- **System Dynamics (SysDyn):** Compartmental models with automatic live plotting.

---

## 🧩 Ecosystem

**DisSModel** is the core framework — a clean, specialized package for the simulation engine itself. Models, domain applications, and companion tools live in their own repositories, each installable independently:

| Package | Description | Install |
|---|---|---|
| [`dissmodel-ca`](https://github.com/DisSModel/dissmodel-ca) | Classic Cellular Automata (Game of Life, Forest Fire, Growth) | `pip install "git+https://github.com/DisSModel/dissmodel-ca.git"` |
| [`dissmodel-sysdyn`](https://github.com/DisSModel/dissmodel-sysdyn) | System Dynamics (SIR, Predator-Prey, Lorenz) | `pip install "git+https://github.com/DisSModel/dissmodel-sysdyn.git"` |
| [`brmangue-dissmodel`](https://github.com/DisSModel/brmangue-dissmodel) | BR-MANGUE coastal flooding and mangrove succession model, validated against TerraME | `pip install "git+https://github.com/DisSModel/brmangue-dissmodel.git"` |
| [`disslucc-continuous`](https://github.com/DisSModel/disslucc-continuous) | Land Use and Cover Change models, continuous allocation (CLUE-inspired) | `pip install "git+https://github.com/DisSModel/disslucc-continuous.git"` |
| [`disslucc-discrete`](https://github.com/DisSModel/disslucc-discrete) | Land Use and Cover Change models, discrete allocation (CLUE-inspired) | `pip install "git+https://github.com/DisSModel/disslucc-discrete.git"` |

DisSModel is also the current chapter of a longer LambdaGeo research trajectory on reproducible, interoperable spatial modeling — alongside tools such as [QGISSPARQL](/software/qgissparql/) (Linked Data ↔ GIS integration) and [TerraHS](/software/terrahs/) (a from-scratch, pure-Haskell rewrite of the original TerraHS map-algebra library).

---

## Key Features

- **Flexible Execution:** Run models via CLI scripts, Jupyter notebooks, or as interactive **Streamlit** web apps.
- **Reactive UI:** Use `@display_inputs` to automatically generate sidebar widgets from model attributes.
- **Geospatial Integration:** Seamlessly generate grids from dimensions, bounds, or existing GeoDataFrames.

---

## Quick Example — SIR Model

```python
from dissmodel.core import Environment
from dissmodel.models.sysdyn import SIR
from dissmodel.visualization import Chart

env = Environment()
SIR(susceptible=9998, infected=2, recovered=0, duration=2)
Chart(show_legend=True)
env.run(30)
```

---

## Research & Citation

If you use DisSModel in your research, please cite:

> Costa, S. & Santos Junior, N. (2025). _DisSModel: A Discrete Spatial Modeling Framework for Python_. LambdaGeo, Federal University of Maranhão (UFMA).

[View on GitHub](https://github.com/LambdaGeo/dissmodel) · [Full Documentation](https://github.com/LambdaGeo/dissmodel)
