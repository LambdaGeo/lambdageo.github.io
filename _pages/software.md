---
layout: page
title: software
permalink: /software/
description: Open-source tools and libraries developed by LambdaGEO.
nav: true
nav_order: 4
display_categories: [Libraries, Tools]
horizontal: false
---

<div class="projects">
{% if site.enable_project_categories and page.display_categories %}
  {% for category in page.display_categories %}
  <a id="{{ category }}" href=".#{{ category }}">
    <h2 class="category">{{ category }}</h2>
  </a>
  {% assign categorized_software = site.software | where: "category", category %}
  {% assign sorted_software = categorized_software | sort: "importance" %}

  <div class="row row-cols-1 row-cols-md-3">
    {% for item in sorted_software %}
      {% include software.liquid %}
    {% endfor %}
  </div>
  {% endfor %}

{% else %}
  {% assign sorted_software = site.software | sort: "importance" %}
  <div class="row row-cols-1 row-cols-md-3">
    {% for item in sorted_software %}
      {% include software.liquid %}
    {% endfor %}
  </div>
{% endif %}
</div>