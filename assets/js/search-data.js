// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-publications",
          title: "publications",
          description: "publications by categories in reversed chronological order.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-projects",
          title: "projects",
          description: "A growing collection of your cool projects.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-software",
          title: "software",
          description: "Open-source tools and libraries developed by LambdaGEO.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/software/";
          },
        },{id: "nav-teaching",
          title: "teaching",
          description: "Core Courses (English Summaries).",
          section: "Navigation",
          handler: () => {
            window.location.href = "/teaching/";
          },
        },{id: "post-shipping-a-python-library-to-pypi-the-complete-checklist",
        
          title: "Shipping a Python Library to PyPI: The Complete Checklist",
        
        description: "Everything you need to take a Python library from research code to a production-grade PyPI package — packaging, testing, CI/CD, docs, and common pitfalls.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/publishing-research-python-library/";
          
        },
      },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather/";
            },},{id: "news-a-simple-inline-announcement",
          title: 'A simple inline announcement.',
          description: "",
          section: "News",},{id: "news-a-long-announcement-with-details",
          title: 'A long announcement with details',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/announcement_2/";
            },},{id: "news-a-simple-inline-announcement-with-markdown-emoji-sparkles-smile",
          title: 'A simple inline announcement with Markdown emoji! :sparkles: :smile:',
          description: "",
          section: "News",},{id: "projects-dbacademic",
          title: 'DBAcademic',
          description: "Connecting open data from Brazilian public educational institutions using Linked Data.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/dbacademic/";
            },},{id: "projects-dbcells",
          title: 'DBCells',
          description: "An architecture for publishing and linking cellular space modeling data.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/dbcells/";
            },},{id: "software-dissmodel",
          title: 'DisSModel',
          description: "A Discrete Spatial Modeling framework for Python.",
          section: "Software",handler: () => {
              window.location.href = "/software/dissmodel/";
            },},{id: "software-qgissparql-layer2triple",
          title: 'QGISSPARQL - Layer2Triple',
          description: "A QGIS plugin to export geographic layers as Linked Data (RDF/Turtle).",
          section: "Software",handler: () => {
              window.location.href = "/software/layer2triple/";
            },},{id: "software-qgissparql-triple2layer",
          title: 'QGISSPARQL - Triple2Layer',
          description: "A QGIS plugin to import Linked Data into geographic layers.",
          section: "Software",handler: () => {
              window.location.href = "/software/triple2layer/";
            },},{id: "teachings-data-science-fundamentals",
          title: 'Data Science Fundamentals',
          description: "This course covers the foundational aspects of data science, including data collection, cleaning, analysis, and visualization. Students will learn practical skills for working with real-world datasets.",
          section: "Teachings",handler: () => {
              window.location.href = "/teachings/data-science-fundamentals/";
            },},{id: "teachings-introduction-to-machine-learning",
          title: 'Introduction to Machine Learning',
          description: "This course provides an introduction to machine learning concepts, algorithms, and applications. Students will learn about supervised and unsupervised learning, model evaluation, and practical implementations.",
          section: "Teachings",handler: () => {
              window.location.href = "/teachings/introduction-to-machine-learning/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%73%65%72%67%69%6F.%63%6F%73%74%61@%75%66%6D%61.%62%72", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=ggu2II0AAAAJ", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/profsergiocosta", "_blank");
        },
      },{
        id: 'social-medium',
        title: 'Medium',
        section: 'Socials',
        handler: () => {
          window.open("https://medium.com/@sergiocosta", "_blank");
        },
      },{
        id: 'social-youtube',
        title: 'YouTube',
        section: 'Socials',
        handler: () => {
          window.open("https://youtube.com/@UCbchwyilbYF8AptP4ZIXMFg", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/profsergiocosta", "_blank");
        },
      },{
        id: 'social-gitlab',
        title: 'GitLab',
        section: 'Socials',
        handler: () => {
          window.open("https://gitlab.com/profsergiocosta", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
