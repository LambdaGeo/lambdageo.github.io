---
layout: page
title: presentations
permalink: /presentations/
nav: true
nav_order: 3
---

<div class="presentations">
  {% assign presentations = site.presentations | sort: 'date' | reverse %}
  {% for talk in presentations %}
    <div class="talk-item" style="margin-bottom: 30px;">
      <h3 style="margin-bottom: 5px;">{{ talk.title }}</h3>
      <p class="talk-metadata" style="font-style: italic; color: var(--global-tip-color); margin-bottom: 10px;">
        {{ talk.event }} • {{ talk.date | date: "%B %d, %Y" }} • {{ talk.location }}
      </p>

      <div class="talk-links" style="margin-bottom: 20px;">
        {% if talk.slides %}
          <a href="{{ talk.slides | relative_url }}" class="btn btn-sm z-depth-0" role="button" style="border: 1px solid var(--global-theme-color);">
            <i class="fa-solid fa-file-pdf"></i> Slides (PDF)
          </a>
        {% endif %}
        {% if talk.video %}
          <a href="{{ talk.video }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="border: 1px solid var(--global-theme-color);">
            <i class="fa-solid fa-video"></i> Video
          </a>
        {% endif %}
      </div>
      
      <div class="talk-content" style="margin-bottom: 15px;">
        {{ talk.content }}
      </div>
    </div>
    {% unless forloop.last %}<hr>{% endunless %}
  {% endfor %}
</div>
