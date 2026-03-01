---
layout: page
permalink: /publications/
title: publications
description: publications by categories in reversed chronological order.
nav: true
nav_order: 2
---

{% include bib_search.liquid %}

<div class="publications">

  <h2 class="category">Journals</h2>
  {% bibliography -f papers -q @article %}

  <h2 class="category">Book Chapters</h2>
  {% bibliography -f papers -q @incollection %}

  <h2 class="category">Conferences</h2>
  {% bibliography -f papers -q @inproceedings %}

</div>