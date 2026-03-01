---
layout: page
title: QGISSPARQL - Layer2Triple
description: A QGIS plugin to export geographic layers as Linked Data (RDF/Turtle).
img: https://github.com/LambdaGeo/qgisparql-layer2triple/assets/108685222/231f97b8-c03f-410c-a078-d673b40e3394
importance: 2
category: Tools
github: https://github.com/LambdaGeo/qgisparql-Layer2Triple/
---

## Overview

**Repository**: [https://github.com/LambdaGeo/qgisparql-Layer2Triple/](https://github.com/LambdaGeo/qgisparql-Layer2Triple/)

**Creators**: [Sérgio Souza Costa](https://github.com/profsergiocosta) and [Nerval Junior](https://github.com/nervaljunior)

**Layer2Triple** is a QGIS plugin that exports vector geographic layers into RDF (Resource Description Framework) files in Turtle (`.ttl`) format. It allows users to convert spatial data — points, lines, or polygons — into RDF triples following the Terse Triple Language (TTL) specification, enabling the creation of ontologies for specific domains.

<div class="row justify-content-sm-center">
  <div class="col-sm-12 mt-3 mt-md-0">
    <img src="https://img.shields.io/badge/Language-Python-blue" alt="Python">
    <img src="https://img.shields.io/badge/Compiler-QGIS-brightgreen" alt="QGIS">
    <img src="https://img.shields.io/badge/IDE-VS%202022-blue" alt="VS 2022">
    <img src="https://img.shields.io/badge/Environment-Windows-red" alt="Windows">
    <img src="https://img.shields.io/badge/Environment-Linux-purple" alt="Linux">
    <img src="https://img.shields.io/badge/UI-GUI%20%2B%20CLI-yellowgreen" alt="GUI + CLI">
  </div>
</div>

---

## Interface

The plugin opens a dialog window with an attribute table where users select layer attributes and define their corresponding RDF mappings. The interface (Figure 1) is divided into two main areas: layer/endpoint information at the top, and the attribute mapping table below.

<div class="row justify-content-sm-center">
  <div class="col-sm-10 mt-3 mt-md-0">
    {% include figure.liquid loading="eager"
       path="https://github.com/LambdaGeo/qgisparql-layer2triple/assets/108685222/231f97b8-c03f-410c-a078-d673b40e3394"
       title="Figure 1: Initial Interface of Layer2Triple"
       class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  Figure 1: Initial interface of the Layer2Triple plugin.
</div>

<div class="row justify-content-sm-center">
  <div class="col-sm-10 mt-3 mt-md-0">
    {% include figure.liquid loading="eager"
       path="https://github.com/LambdaGeo/qgisparql-layer2triple/assets/108685222/b4a9d031-fbf3-4581-8389-af8594b1f36a"
       title="Figure 2: Subdivision of the plugin"
       class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  Figure 2: Plugin subdivisions — Base URL, RDF Type, Prefix, constant aggregations, vocabulary options, and attribute table.
</div>

---

## How to Use

> 💡 Screenshots were taken in QGIS 3.26.3 on Windows. Screens may look slightly different depending on your setup, but all buttons remain available across operating systems. **QGIS 3.4 or later** is required.

> ⚠️ The **Layer2Triple** plugin must be installed before starting. See the [installation guide](https://github.com/LambdaGeo/qgisparql-layer2triple/blob/documentation/instalando%20complementos.md) and [environment setup](https://github.com/LambdaGeo/qgisparql-layer2triple/blob/documentation/preparando%20o%20ambiente.md).

### Step 1: Load a Vector Layer

Open a QGIS project containing vector layers via **File > Open Project** (or <kbd>Ctrl+O</kbd>). Once loaded, the layers appear in the **Layers** panel and are ready to be used with Layer2Triple.

Then, access the plugin from the menu bar: **Vector > QGISPARQL > Layer2Triple**.

### Step 2: Load Vocabulary

With the layer open, go to **Vocabulary > Load Vocabulary**. In the dialog, enter the prefix, namespace URL, and format (TTL or XML). After confirming, attributes will be automatically populated in the mapping table with a success message.

### Step 3: Attribute Mapping

In the attribute table, map each concept by selecting:

- **Constant Value** — a fixed literal value.
- **Layer Attribute** — a field from the loaded vector layer.
- **Vocabulary** — a concept from the loaded vocabulary.

Use the built-in filter to quickly locate specific attributes in large layers.

### Step 4: Settings

Configurations (vocabularies and mappings) can be saved as a JSON file via **Settings > Save**, and reloaded in future sessions via **Settings > Open**. Before exporting, configure the **Base URL**, **Prefix**, and **RDF Type** (e.g., `qb:Observation`) in the top section of the plugin.

### Step 5: Data Export

Click **Save/Export** to generate the `.ttl` file. The output follows the RDF Data Cube vocabulary structure. For example, a dataset of pasture mean observations produces:

```turtle
@prefix dbc-measure: <http://purl.org/linked-data/dbcells/measure#> .
@prefix obs:         <https://purl.org/dbcells/observation#> .
@prefix qb:          <http://purl.org/linked-data/cube#> .
@prefix sdmx-dimension: <http://purl.org/linked-data/sdmx/2009/dimension#> .

obs:00000703-6e8b-4840-8c77-ec83f8d8ba41 a qb:Observation ;
    qb:DataSet ds:f77ce462-8b99-48b8-b628-cc9d6d6c6c5a ;
    dbc-measure:mean 0e+00 ;
    sdmx-dimension:refArea
        <https://purl.org/dbcells/epsg4326#R0_0830Cx-59_3750Cy-1_7214> .
```

The dataset block closes the file with metadata such as feature type, associated scripts, source files, and reference period:

```turtle
ds:f77ce462-8b99-48b8-b628-cc9d6d6c6c5a a qb:dataSet ;
    dbc-attribute:feature      dbc-code:landcover-pastp ;
    dbc-attribute:scriptFile   <https://github.com/LambdaGeo/brlucc-database/...> ;
    dbc-attribute:sourceFile   <https://github.com/LambdaGeo/brlucc-database/...> ;
    sdmx-dimension:refPeriod   2010 .
```