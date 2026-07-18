// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "About",
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
        },{id: "nav-mentorship",
          title: "mentorship",
          description: "Over 13 years of fostering technical excellence and supervising undergraduate and graduate research.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/mentorship/";
          },
        },{id: "nav-presentations",
          title: "presentations",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/presentations/";
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
        },{id: "dropdown-c-para-programadores-python-e-visualg",
              title: "C para Programadores Python e VisuAlg",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "https://lambdageo.github.io/introducao-c/";
              },
            },{id: "dropdown-estrutura-de-dados",
              title: "estrutura de dados",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "https://lambdageo.github.io/estrutura-dados/";
              },
            },{id: "dropdown-introdução-à-programação-funcional-ipf",
              title: "introdução à programação funcional (IPF)",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "https://lambdageo.github.io/ipf/";
              },
            },{id: "dropdown-compiladores-usando-nand2tetris",
              title: "compiladores usando nand2tetris",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "https://lambdageo.github.io/nand2tetris-compilador/";
              },
            },{id: "dropdown-geospatial-modeling-in-python",
              title: "geospatial modeling in python",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "https://lambdageo.github.io/geospatial-modeling-python/";
              },
            },{id: "dropdown-paradigmas-de-programação",
              title: "paradigmas de programação",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "https://lambdageo.github.io/paradigmas-programacao/";
              },
            },{id: "dropdown-introdução-ao-computador",
              title: "introdução ao computador",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "https://lambdageo.github.io/introducao-computador/";
              },
            },{id: "dropdown-tutorial-docker",
              title: "tutorial docker",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "https://lambdageo.github.io/tutorial-docker/";
              },
            },{id: "dropdown-engenharia-de-software",
              title: "engenharia de software",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "https://lambdageo.github.io/engenharia-software/";
              },
            },{id: "nav-teaching",
          title: "teaching",
          description: "Core Courses (English Summaries).",
          section: "Navigation",
          handler: () => {
            window.location.href = "/teaching/";
          },
        },{id: "post-construindo-e-testando-uma-biblioteca-haskell-json-pretty-printing-e-quickcheck",
        
          title: "Construindo e Testando uma Biblioteca Haskell: JSON, Pretty Printing e QuickCheck",
        
        description: "Um guia prático e completo adaptado de Real World Haskell sobre módulos, tipos algébricos, design de bibliotecas e testes com QuickCheck e HPC.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/tutorial-haskell-json-quickcheck/";
          
        },
      },{id: "post-elixir-e-phoenix-liveview-construindo-uma-aplicação-todo-list-do-zero",
        
          title: "Elixir e Phoenix LiveView: Construindo uma Aplicação Todo List do Zero",
        
        description: "Um guia prático e completo do ecossistema Phoenix, explorando schemas, migrations, changesets e a reatividade em tempo real com LiveView.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/tutorial-elixir-phoenix-liveview-todo-list/";
          
        },
      },{id: "post-clojure-e-clojurescript-construindo-uma-aplicação-todo-list-do-zero",
        
          title: "Clojure e ClojureScript: Construindo uma Aplicação Todo List do Zero",
        
        description: "Um guia prático e completo de arquitetura funcional e reativa, cobrindo desde o backend Ring/Reitit até o frontend Reagent com SQLite.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/tutorial-clojure-clojurescript-todo-list/";
          
        },
      },{id: "post-two-ways-to-simulate-the-same-world-raster-and-vector-backends-in-dissmodel",
        
          title: "Two Ways to Simulate the Same World: Raster and Vector Backends in DisSModel...",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/raster-vs-vector-dissmodel/";
          
        },
      },{id: "post-revitalizing-lambdageo-from-student-projects-to-production-ready-software",
        
          title: "Revitalizing LambdaGEO: From Student Projects to Production-Ready Software",
        
        description: "How AI assisted in finishing, publishing, and documenting years of research group projects in record time.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/launching-lambdageo-site/";
          
        },
      },{id: "post-shipping-a-python-library-to-pypi-the-complete-checklist",
        
          title: "Shipping a Python Library to PyPI: The Complete Checklist",
        
        description: "Everything you need to take a Python library from research code to a production-grade PyPI package — packaging, testing, CI/CD, docs, and common pitfalls.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/publishing-research-python-library/";
          
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
          section: "News",},{id: "presentations-integration-of-functional-programming-and-spatial-databases-for-gis-application-development",
          title: 'Integration of Functional Programming and Spatial Databases for GIS Application Development',
          description: "Master thesis presentation introducing TerraHS, an integration of Haskell with spatial databases.",
          section: "Presentations",handler: () => {
              window.location.href = "/presentations/2006-11-01-master-thesis-presentation/";
            },},{id: "presentations-regional-scale-agent-based-modelling-of-land-change-evolving-institutional-arrangements-in-frontier-areas",
          title: 'Regional scale agent-based modelling of land change: evolving institutional arrangements in frontier areas...',
          description: "PhD thesis presentation focusing on spatial dynamic modeling and agent-based simulation of land-use change.",
          section: "Presentations",handler: () => {
              window.location.href = "/presentations/2012-10-30-doctorate-presentation/";
            },},{id: "presentations-dbcells-an-open-and-global-multi-scale-linked-cells",
          title: 'DBCells: An Open and Global Multi-Scale Linked Cells',
          description: "Presentation of the DBCells architecture for publishing global cellular spaces as Linked Data.",
          section: "Presentations",handler: () => {
              window.location.href = "/presentations/2017-05-15-dbcells-presentation/";
            },},{id: "presentations-building-open-and-reproducible-geospatial-simulations-with-python",
          title: 'Building Open and Reproducible Geospatial Simulations with Python',
          description: "A seminar presenting the DisSModel framework and its philosophy for open and reproducible geospatial science.",
          section: "Presentations",handler: () => {
              window.location.href = "/presentations/2026-05-07-inpe-seminar/";
            },},{id: "projects-dbacademic",
          title: 'DBAcademic',
          description: "Connecting open data from Brazilian public educational institutions using Linked Data.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/dbacademic/";
            },},{id: "projects-dbcells",
          title: 'DBCells',
          description: "An architecture for publishing and linking cellular space modeling data.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/dbcells/";
            },},{id: "projects-disslucc-discrete-spatial-simulation-for-lucc",
          title: 'DisSLUCC: Discrete Spatial Simulation for LUCC',
          description: "A Python framework for Land Use and Cover Change and coastal dynamics based on discrete event simulation.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/disslucc/";
            },},{id: "projects-integrai",
          title: 'IntegrAI',
          description: "A microservices architecture for maternal health decision support using LLMs and RAG.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/integrai/";
            },},{id: "software-dissmodel",
          title: 'DisSModel',
          description: "A Discrete Spatial Modeling framework for Python.",
          section: "Software",handler: () => {
              window.location.href = "/software/dissmodel/";
            },},{id: "software-integrai",
          title: 'IntegrAI',
          description: "A microservices architecture for maternal health decision support using LLMs and RAG.",
          section: "Software",handler: () => {
              window.location.href = "/software/integrai/";
            },},{id: "software-qgissparql-layer2triple",
          title: 'QGISSPARQL - Layer2Triple',
          description: "A QGIS plugin to export geographic layers as Linked Data (RDF/Turtle).",
          section: "Software",handler: () => {
              window.location.href = "/software/layer2triple/";
            },},{id: "software-rdfmapper",
          title: 'rdfmapper',
          description: "A declarative Object-RDF Mapper for Python to map classes to RDF graphs.",
          section: "Software",handler: () => {
              window.location.href = "/software/rdfmapper/";
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
