---
layout: software
title: DisSCube
description: Declarative spatial data cubes — describe sources, grid and derived variables in TOML and get a cataloged, reproducible cube.
importance: 3
category: Libraries
github: https://github.com/DisSModel/disscube
kind: "Python library"
img: "assets/img/software/disscube-cover.png"
doi: "10.5281/zenodo.23365403"
pypi: "https://pypi.org/project/disscube/"
docs: "https://dissmodel.github.io/disscube/"
citation: "Costa, S. S. (2026). <em>DisSCube: Declarative spatial data cubes</em> (Version v0.6.0) [Computer software]. Zenodo."
---

## Overview

**DisSCube** is the spatial data cube engine of the [DisSModel](/software/dissmodel/) ecosystem. It converts raw geospatial sources (rasters and vectors) into derived variables aligned to land use and cover change (LUCC) modeling grids, ready for cellular automata models and spatio-temporal analysis.

```
SpatialSource  →  Derivation  →  Variable  →  DerivedVariable (Zarr)
```

A **source** goes through a **derivation** that applies an **operator** (percentage, majority, mean, minimum distance, …) on a **grid**, producing a **derived variable** registered in a SQLite catalog and stored in Zarr.

---

## Pipeline files

A whole data preparation — grid, sources and derived variables — can be declared in one TOML file, the counterpart of a TerraME `fill` script, and run from the command line:

```toml
schema = 1
name = "Quickstart"

[grid]
name = "demo/300m"
crs = "EPSG:31983"
bbox = [570000.0, 9708000.0, 582000.0, 9720000.0]
resolution = 300

[[source]]
id = "landuse"
type = "file"
path = "../data/quickstart/landuse.tif"
crs = "EPSG:31983"

[[derive]]
target = "forest_pct"
source = "landuse"
operator = "percentage"
class_code = 3
```

```bash
disscube validate examples/pipelines/quickstart.toml
disscube run      examples/pipelines/quickstart.toml --workspace outputs/quickstart
```

---

## Key features

- **Declarative or direct API:** describe derivations in TOML or build them in Python.
- **Provenance by default:** every exported GeoTIFF band and netCDF variable records the specification hash, the content hash of the stored data and the checksum of the input it came from.
- **Standard outputs:** load results as `xarray` datasets, or export to GeoTIFF and CF-1.8 netCDF.
- **Independent of DisSModel:** DisSCube works on its own; with `disscube[dissmodel]`, `cube.to_raster_backend(...)` hands a cube directly to a DisSModel model.

---

## Installation

```bash
pip install disscube                 # from PyPI
pip install "disscube[dissmodel]"    # + hand-off of the cube to DisSModel models
```

> DisSCube is in **alpha**: the core pipeline API is stable, while declarative models are still evolving.
