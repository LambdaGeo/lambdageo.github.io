---
layout: software
title: disslucc
description: Land use and cover change (LUCC) modeling — continuous and discrete allocation — on top of DisSModel.
importance: 2
category: Libraries
github: https://github.com/DisSModel/disslucc
kind: "Python library"
img: "assets/img/software/disslucc-cover.png"
doi: "10.5281/zenodo.23219338"
pypi: "https://pypi.org/project/disslucc/"
docs: "https://dissmodel.github.io/disslucc/"
citation: "Costa, S. S. (2026). <em>disslucc: Land Use and Cover Change Modeling on top of DisSModel</em> (Version v0.5.0) [Computer software]. Zenodo."
---

## Overview

**disslucc** brings land use and cover change (LUCC) modeling to Python, on top of [DisSModel](/software/dissmodel/). It implements the components of INPE's LuccME — **demand**, **potential** and **allocation** — in a raster-only, script-first package:

- **Continuous allocation** (CLUE-like) and **discrete allocation** (CLUE-S-like).
- Spatial-lag potential, saturation, and demand computed from land-use layers.
- Validation shared across both paradigms.

It is an alternative that runs next to TerraME/LuccME, not a replacement for them. Agreement with TerraME/LuccME — iteration counts, per-year error and timings — is checked in [LambdaGeo/disslucc-benchmark](https://github.com/LambdaGeo/disslucc-benchmark), which pins the disslucc release it ran against.

---

## Quick example

```python
from dissmodel.core import Environment
from disslucc import DemandInline, PotentialLinearRegression, AllocationClueLike

demand = DemandInline(values=[...], land_use_types=["forest", "urban"])
potential = PotentialLinearRegression(backend=backend, demand=demand, ...)
allocation = AllocationClueLike(backend=backend, demand=demand, potential=potential, ...)

Environment(end_time=7).run()
```

The script is the complete experiment — reproducible with `git clone`, `pip install` and `python script.py`. When automatic provenance matters more than simplicity (production, CI), `disslucc.executors` provides `ModelExecutor` and `ExperimentRecord` as a second entry point, with the same math and identical results.

---

## One repository for both paradigms

disslucc consolidates the former `disslucc-continuous` and `disslucc-discrete` repositories into a single package, mirroring how the original LuccME keeps continuous and discrete components side by side. Once the migration completes, the previous repositories will be archived and remain citable. See the [DisSLUCC research project](/projects/disslucc/) for the broader context.

---

## Installation

```bash
pip install disslucc                 # from PyPI
pip install "disslucc[examples]"     # + matplotlib, for the examples
```
