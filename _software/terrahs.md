---
layout: page
title: TerraHS
description: A purely functional Haskell library for geospatial programming and map algebra, with no foreign dependencies.
img: https://img.shields.io/badge/Haskell-Map%20Algebra-5e5086?style=for-the-badge
importance: 3
category: Libraries
github: https://github.com/LambdaGeo/terrahs
---

## Overview

**Repository**: [https://github.com/LambdaGeo/terrahs](https://github.com/LambdaGeo/terrahs)

**TerraHS** is a from-scratch rewrite of the original TerraHS (2006–2009), a Haskell binding to the C++ GIS library TerraLib developed at Brazil's National Institute for Space Research (INPE). This version keeps the ideas — geometry, spatial predicates, and a generalized map algebra — while dropping the FFI dependency entirely: everything is plain Haskell, or built on well-established pure-Haskell libraries for file I/O.

It is the earliest link in the research trajectory that leads to [DisSModel](/software/dissmodel/): a 2005 exploration of scientific models as verifiable, executable artifacts, now revisited as a modern, dependency-free library.

The library serves two purposes at once:

1. **Teaching material** — each module illustrates a functional-programming concept applied to a real problem: algebraic data types, type classes for ad-hoc polymorphism, smart constructors for enforcing invariants, hand-written parser combinators, and a small map-algebra DSL built from first principles.
2. **A research tool** — the map algebra (`TerraHS.Algebra.Coverage`) is a faithful reconstruction of the algebra proposed in the original TerraHS Master's thesis (INPE, 2006), generalizing Tomlin's (1990) classic map algebra with arbitrary spatial predicates.

---

<div class="row justify-content-sm-center">
  <div class="col-sm-12 mt-3 mt-md-0">
    <img src="https://img.shields.io/badge/Language-Haskell-5e5086" alt="Haskell">
    <img src="https://img.shields.io/badge/Dependencies-No%20FFI-brightgreen" alt="No FFI">
    <img src="https://img.shields.io/badge/Cabal-%3E%3D3.0-blue" alt="Cabal">
  </div>
</div>

---

## Features

- **Geometry** — `Point`, `Line`, `Polygon`, bounding boxes, and a `Geometry` type class unifying area/perimeter/centroid/envelope across all three.
- **Topology** — bounding-box overlap, point-on-line, point-in-polygon (ray casting), and line-crosses-polygon predicates.
- **Simplification** — Ramer-Douglas-Peucker line/polygon simplification, pure arithmetic on coordinates, no extra dependency.
- **File I/O** — read/write WKT and GeoJSON; read ESRI Shapefiles (`.shp` + `.dbf`, UTF-8 or Latin-1), pairing geometry with attributes.
- **Map algebra** — two complementary implementations:
  - `TerraHS.Algebra.Coverage`, a direct reconstruction of the original thesis's algebra: a discrete `Coverage` (domain → values) with local, focal, and zonal operators generalized around arbitrary spatial predicates.
  - `TerraHS.Algebra.Funct` / `TerraHS.Algebra.Field`, a classic Tomlin-style raster algebra (local, focal, zonal, global operators over a 2D grid).
- **Dynamic spatial models** — `TerraHS.CA` (`terrahs-ca`), a small, generic cellular-automaton machine built on a `Store` comonad; demonstrated with Game of Life, diffusion, and forest-fire examples.
- **PNG rendering** — `TerraHS.Render.PNG` (`terrahs-render`, via `JuicyPixels`, pure Haskell/no FFI) draws any `Coverage` at its real geometric position.

---

## Installation

TerraHS is a standard Cabal package (`cabal-version: 3.0`), with no system dependencies beyond a working GHC and Cabal toolchain (GHC ≥ 8.10, Cabal ≥ 3.0 recommended). The recommended way to get that toolchain is [GHCup](https://www.haskell.org/ghcup/):

```bash
curl --proto '=https' --tlsv1.2 -sSf https://get-ghcup.haskell.org | sh
```

Then build the library and examples with Cabal:

```bash
git clone https://github.com/LambdaGeo/terrahs
cd terrahs
cabal build
```

---

## Part of the DisSModel Ecosystem

TerraHS traces the same research trajectory as [DisSModel](/software/dissmodel/) and [QGISSPARQL](/software/qgissparql/): geospatial models built for reuse, verification, and reproducibility — here worked out in a purely functional setting.
