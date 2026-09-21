---
layout: page
title: QGISSPARQL
description: A QGIS plugin for bidirectional integration between Linked Data (RDF/SPARQL) and GIS.
img: https://github.com/LambdaGeo/qgissparql/raw/main/docs/images/dock_triple2layer.png
importance: 1
category: Tools
github: https://github.com/LambdaGeo/qgissparql
---

## Overview

**Repository**: [https://github.com/LambdaGeo/qgissparql](https://github.com/LambdaGeo/qgissparql)

**Creators**: [Sérgio Souza Costa](https://github.com/profsergiocosta), [Nerval de Jesus Santos Junior](https://github.com/nervaljunior), Felipe Martins Sousa, José Magno Pinheiro Alves, and Denilson da Silva Bezerra

**QGISSPARQL** is a QGIS plugin that enables bidirectional integration between **Linked Data (RDF/SPARQL)** and **Geographic Information Systems (GIS)**. It unifies the former Triple2Layer and Layer2Triple plugins into a single package with one dock interface:

- 🔽 **Triple → Layer (Import):** query a SPARQL endpoint (Virtuoso, Apache Jena Fuseki) or a data.world dataset and load the results directly as a QGIS vector layer.
- 🔼 **Layer → Triple (Export):** convert a vector layer (point, line, or polygon) into RDF triples, serialized as Turtle (`.ttl`), following GeoSPARQL/Data Cube vocabularies.

---

<div class="row justify-content-sm-center">
  <div class="col-sm-12 mt-3 mt-md-0">
    <img src="https://joss.theoj.org/papers/6a9a1eff32b69c18a8a6d42e76bd60c8/status.svg" alt="JOSS">
    <img src="https://img.shields.io/badge/Compiler-QGIS-brightgreen" alt="QGIS">
    <img src="https://img.shields.io/badge/Language-Python-blue" alt="Python">
    <img src="https://img.shields.io/badge/Environment-Windows%20%7C%20Linux-purple" alt="Windows | Linux">
  </div>
</div>

---

## Features

### 🔽 Triple → Layer (Import)

- Query any SPARQL 1.1 endpoint, with integration for data.world datasets.
- Background execution (non-blocking tasks).
- Automatic geometry detection from WKT.
- Dynamic attribute mapping.

### 🔼 Layer → Triple (Export)

- Convert vector layers (point, line, polygon) to RDF, with Turtle serialization.
- URI generation strategies (UUID or attribute-based).
- Mapping of attributes to RDF vocabularies (GeoSPARQL, SKOS, Data Cube).
- Searchable, autocompleting URI selection.

### 🧠 Shared Interface

- Unified dock with Import / Export tabs.
- Vocabulary loading (GeoSPARQL, DataCube, SKOS, FOAF).
- Persistent configuration, including data.world API tokens.

---

## Interface

<div class="row justify-content-sm-center">
  <div class="col-sm-10 mt-3 mt-md-0">
    {% include figure.liquid loading="eager"
       path="https://github.com/LambdaGeo/qgissparql/raw/main/docs/images/dock_triple2layer.png"
       title="Triple → Layer dock"
       class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  Triple → Layer (Import): query a SPARQL endpoint and load results as a QGIS layer.
</div>

<div class="row justify-content-sm-center">
  <div class="col-sm-10 mt-3 mt-md-0">
    {% include figure.liquid loading="eager"
       path="https://github.com/LambdaGeo/qgissparql/raw/main/docs/images/dock_layer2triple.png"
       title="Layer → Triple dock"
       class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  Layer → Triple (Export): map layer attributes to RDF and export to .ttl.
</div>

---

## Installation

> ⚠️ Requires **QGIS 3.4 or later**.

### 1. Install the plugin

```bash
git clone https://github.com/LambdaGeo/qgissparql
```

Copy the folder to your QGIS plugins directory:

- **Linux:** `~/.local/share/QGIS/QGIS3/profiles/default/python/plugins/`
- **Windows:** `%APPDATA%\QGIS\QGIS3\profiles\default\python\plugins\`

Restart QGIS and enable it via **Plugins → Manage and Install Plugins**.

### 2. Install Python dependencies

```bash
# Linux
pip install pandas setuptools --break-system-packages
pip install datadotworld SPARQLWrapper rdflib --break-system-packages

# Windows (OSGeo4W Shell)
pip install pandas setuptools datadotworld SPARQLWrapper rdflib
```

---

## How to Use

Both directions are reached from **Vector → QGISSPARQL → Open Dock**.

**Import (Triple → Layer):**
1. Select the source type (SPARQL endpoint or data.world).
2. Write or load a SPARQL query.
3. Define the geometry column (WKT).
4. Execute the import — the layer appears in your QGIS workspace.

**Export (Layer → Triple):**
1. Select a vector layer and load a vocabulary (e.g. GeoSPARQL).
2. Map each attribute to a constant, a layer attribute, or a vocabulary concept.
3. Configure the Base URL, Prefix, and RDF Type.
4. Export to `.ttl`.

---

## Part of the DisSModel Ecosystem

QGISSPARQL is one of the companion tools in LambdaGeo's broader research trajectory toward reproducible, interoperable spatial modeling — alongside [DisSModel](/software/dissmodel/) and [TerraHS](/software/terrahs/).
