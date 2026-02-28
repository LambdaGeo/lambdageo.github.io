---
layout: page
title: DisSModel
description: A Discrete Spatial Modeling framework for Python.
#img: assets/img/software/dissmodel_preview.jpg # Sugestão: use o print da arquitetura ou do Streamlit
importance: 1
category: Libraries
github: https://github.com/LambdaGeo/dissmodel
---

# DisSModel: Discrete Spatial Modeling in Python

**DisSModel** is a modular, open-source framework designed for spatially explicit dynamic modeling. Developed within the **LambdaGeo** research group at UFMA, it serves as a modern, Pythonic successor to the TerraME framework.

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="https://raw.githubusercontent.com/LambdaGeo/dissmodel/main/docs/images/arquitetura_dissmodel.png" title="DisSModel Architecture" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The four-module architecture: Core, Geo, Models, and Visualization.
</div>

### Why DisSModel?
While traditional tools often rely on specialized stacks, DisSModel is built directly on top of the standard Python geospatial ecosystem, leveraging **GeoPandas**, **PySAL**, and **Salabim**. It provides a unified environment for building:

* **Cellular Automata (CA):** Spatial grid models with configurable neighborhood strategies (Queen, Rook, KNN).
* **System Dynamics (SysDyn):** Compartmental models with automatic live plotting.

### Key Features
* **Flexible Execution:** Run models via CLI scripts, Jupyter notebooks, or as interactive **Streamlit** web apps.
* **Reactive UI:** Use `@display_inputs` to automatically generate sidebar widgets from model attributes.
* **Geospatial Integration:** Seamlessly generate grids from dimensions, bounds, or existing GeoDataFrames.

### Quick Example (SIR Model)
```python
from dissmodel.core import Environment
from dissmodel.models.sysdyn import SIR
from dissmodel.visualization import Chart

env = Environment()
SIR(susceptible=9998, infected=2, recovered=0, duration=2)
Chart(show_legend=True)
env.run(30)