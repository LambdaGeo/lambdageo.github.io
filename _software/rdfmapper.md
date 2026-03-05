---
layout: page
title: rdfmapper
description: A declarative Object-RDF Mapper for Python to map classes to RDF graphs.
img: https://img.shields.io/pypi/v/rdfmapper-py?style=for-the-badge
importance: 2
category: Libraries
github: https://github.com/lambdageo/rdfmapper
---

## Overview

**Repository**: [https://github.com/lambdageo/rdfmapper](https://github.com/lambdageo/rdfmapper)

**Creators**: [Felipe Goiabeira](https://github.com/felipeguii) and [Sérgio Souza Costa](https://github.com/profsergiocosta)

**rdfmapper** is a declarative Object-RDF Mapper for Python. It allows you to map Python classes to RDF graphs using decorators, inspired by ORM frameworks such as JPA and SQLAlchemy, without requiring you to write SPARQL or manipulate triples manually.

---

<div class="row justify-content-sm-center">
  <div class="col-sm-12 mt-3 mt-md-0">
    <img src="https://img.shields.io/pypi/v/rdfmapper-py" alt="PyPI">
    <img src="https://img.shields.io/github/license/lambdageo/rdfmapper" alt="License">
    <img src="https://img.shields.io/pypi/pyversions/rdfmapper-py" alt="Python Versions">
    <img src="https://github.com/lambdageo/rdfmapper/actions/workflows/ci.yml/badge.svg" alt="Tests">
  </div>
</div>

---

## Features

* **Declarative Mapping:** Use decorators to map Python classes to RDF types and predicates.
* **Relationship Support:** Built-in support for `one-to-one` and `one-to-many` relationships.
* **Automatic Validation:** Generate SHACL shapes automatically from your class metadata.
* **Dynamic Queries:** Built-in `RDFRepository` for `find_by_*` and `count_by_*` queries without manual SPARQL.
* **Type Awareness:** Automatic conversion for `int`, `float`, `bool`, `date`, and `datetime`.

---

## Installation

You can install the package directly from PyPI:

```bash
pip install rdfmapper-py
