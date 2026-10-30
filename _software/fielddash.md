---
layout: software
title: fielddash
description: Schema-driven dashboards for field data collection with Epicollect5, configured with a single YAML file.
importance: 2
category: Tools
github: https://github.com/LambdaGeo/fielddash
kind: "Dashboard toolkit"
img: "assets/img/software/fielddash-cover.png"
doi: "10.5281/zenodo.23210904"
pypi: "https://pypi.org/project/fielddash/"
docs: "https://lambdageo.github.io/fielddash/"
citation: "Costa, S., Moura Lima, A., Luvizotto Santos, R., & Basso Jorge, M. (2026). <em>fielddash: Schema-driven dashboards for field data collection</em> (Version v0.1.1) [Computer software]. Zenodo."
---

## Overview

**Creators**: Sérgio Souza Costa, André Moura Lima, Ricardo Luvizotto Santos and Marianna Basso Jorge (UFMA)

**fielddash** builds interactive dashboards for **field data collection** (Epicollect5) directly from the **form schema**. Every question is identified by Epicollect's stable `ref`, and its input type (`radio`, `checkbox`, `integer`, `location`, …) automatically determines the filter, chart and map used to show it. Changing, adding or reordering questions in the form does not break the dashboard, and setting up a new survey requires only a YAML configuration file.

Ready-to-use pages:

- **Overview:** summary indicators, map, submissions over time and collectors.
- **Highlights:** curated charts configured in the YAML file.
- **Questions:** every question grouped by section, with search and dynamic cross-tabulation.
- **Data:** searchable table with CSV and Excel export.

---

## Configuration

```yaml
title: "My Field Survey"
source:
  type: epicollect
  project: ${PROJECT_MY_SURVEY}
  credentials: MY_SURVEY
filters: [created_at, neighborhood]
highlights:
  - { field: waste_dest, by: neighborhood, title: "Waste destination by neighborhood" }
map: { field: location, popup: [neighborhood] }
```

```bash
fielddash init my-survey        # scaffold project.yaml, requirements.txt, .env.example
fielddash fields project.yaml   # inspect the form fields
fielddash run project.yaml      # open the dashboard
```

Dashboards can also run inside your own Streamlit app (`fielddash.dashboard("projects/")`) and be deployed to Streamlit Community Cloud, with credentials kept out of the repository.

---

## Installation

```bash
python -m venv .venv && source .venv/bin/activate
pip install fielddash
fielddash init .
```

The repository includes an example built on anonymized household survey data on solid waste management in the Itaqui-Bacanga area (São Luís – MA).
