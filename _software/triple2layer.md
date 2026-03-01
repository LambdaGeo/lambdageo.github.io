---
layout: page
title: QGISSPARQL - Triple2Layer
description: A QGIS plugin to import Linked Data into geographic layers.
img: https://github.com/LambdaGeo/qgisparql-triple2layer/assets/108685222/3984ccb8-02cd-457e-9369-02f25f823dd7
importance: 1
category: Tools
github: https://github.com/LambdaGeo/qgisparql-triple2layer/
---

## Overview

**Repository**: [https://github.com/LambdaGeo/qgisparql-triple2layer/](https://github.com/LambdaGeo/qgisparql-triple2layer/)

**Creators**: [Sérgio Souza Costa](https://github.com/profsergiocosta) and [Nerval Junior](https://github.com/nervaljunior)

This plugin aims to import data from a connected database and convert it into a geographic data layer in the QGIS geographic information system (GIS).

---

<div class="row justify-content-sm-center">
  <div class="col-sm-12 mt-3 mt-md-0">
    <img src="https://img.shields.io/badge/Language-Python-blue" alt="Python">
    <img src="https://img.shields.io/badge/Compiler-QGIS-brightgreen" alt="QGIS">
    <img src="https://img.shields.io/badge/IDE-VS%202022-blue" alt="VS 2022">
    <img src="https://img.shields.io/badge/Environment-Windows-red" alt="Windows">
    <img src="https://img.shields.io/badge/Environment-Linux-purple" alt="Linux">
  </div>
</div>

---

## How to Use

> 💡 The screenshots for this documentation were taken in QGIS 3.26.3 running on Windows. Depending on your setup, the screens you encounter might look a bit different. However, all the same buttons will still be available, and the instructions will work on any operating system. You will need **QGIS 3.4 or later** to use this plugin.

> ⚠️ Before starting, the **Triple2Layer** plugin must be installed on your computer.

### Interface and Access

To use **Triple2Layer**, open **QGIS** and navigate to the **Vector** menu. You will be able to access the plugins of **DBCells** in the QGISPARQL cell.

<div class="row justify-content-sm-center">
  <div class="col-sm-10 mt-3 mt-md-0">
    {% include figure.liquid loading="eager"
       path="https://github.com/LambdaGeo/qgisparql-triple2layer/assets/108685222/bac31c85-387e-49ac-aefb-9795fa5e5b3c"
       title="Figure 1: Tool menu"
       class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  Figure 1: Tool menu showing the Triple2Layer access.
</div>

The initial interface (Figure 2) is divided into two main parts: information about the loaded file/endpoint and a table for attribute mapping.

<div class="row justify-content-sm-center">
  <div class="col-sm-10 mt-3 mt-md-0">
    {% include figure.liquid loading="eager"
       path="https://github.com/LambdaGeo/qgisparql-triple2layer/assets/108685222/3984ccb8-02cd-457e-9369-02f25f823dd7"
       title="Figure 2: Initial Interface"
       class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  Figure 2: Initial interface of the Triple2Layer plugin.
</div>

---

## Importing Data

### Step 1: Defining the Layer Name

Enter the name for the new geographic layer (e.g., `"ACRE"`).

### Step 2: Defining the Source (Linked Data)

The plugin supports two sources:

- **Triple Store Endpoints** (Virtuoso, Apache Jena Fuseki)
- **Data.world Datasets**

Data must include a geometric attribute, typically using the `geo:asWKT` predicate. Example:

```turtle
@prefix cells: <https://purl.org/linked-data/dbcells#> .
@prefix geo:   <http://www.opengis.net/ont/geosparql#> .

<https://purl.org/dbcells/epsg4326#R0_0830Cx-34_7917Cy-6_9714>
    a cells:Cell ;
    geo:asWKT "Polygon ((-34.833 -6.929, ...))" .
```

### Step 3: SPARQL Query

Load a `.sparql` file to filter the triples you need. For example:

```sparql
SELECT ?cell ?resolution ?wkt
WHERE {
  ?cell geo:asWKT ?wkt .
  ?cell dbc:resolution ?resolution .
  ?cell sdmx-dimension:refArea "AC" .
}
```

### Step 4: Attribute Mapping

Define which SPARQL variables correspond to:

- **Geometry** — WKT format supported
- **Identifier** — Primary key
- **Attributes** — String, Int, or Double

### Step 5: Execution

Click **"Import"**. Once the process finishes, the layer will appear in your QGIS workspace. You can open the attribute table (<kbd>F6</kbd>) to verify the imported data.