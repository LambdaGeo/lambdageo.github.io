---
layout: page
title: IntegrAI
description: A microservices architecture for maternal health decision support using LLMs and RAG.
img: /assets/img/integrai_arch.png
importance: 1
category: Team
---

## Overview

**IntegrAI** is a modern healthcare decision-support platform designed to assist health professionals in monitoring maternal health. The system combines structured clinical data, automated risk prediction, and AI-generated summaries (RAG + LLM) into a unified, scalable solution.

### Architecture Highlights

The platform is built on a **microservices architecture**, fully containerized with **Docker**, ensuring modular maintenance and simplified deployment.

* **Django & FastAPI:** Powering the core logic and AI services.
* **Asynchronous Processing:** Utilizing **Redis and RQ Worker** to handle long-running AI tasks without blocking the UI.
* **RAG (Retrieval-Augmented Generation):** Powered by **Qdrant** vector database to provide contextualized and accurate clinical explanations.
* **Scalability:** Orquestrated via **Docker Compose** with Nginx as a reverse proxy.

---

## Technical Workflow

1.  **Clinical Entry:** Professional fills the clinical form via the web interface.
2.  **Synchronous Prediction:** The **Prediction API** immediately returns the clinical risk level.
3.  **Asynchronous Insights:** A background job triggers **MarIA (LLM service)**, which performs a **RAG** search to generate clinical summaries and educational "pills."
4.  **Feedback Loop:** Results are persisted in **PostgreSQL** and displayed to the user via polling.

---

## Tech Stack

| Category | Technologies |
|:--- |:--- |
| **Backend** | Django, FastAPI |
| **AI & NLP** | External LLMs (Gemini/OpenAI) + RAG |
| **Databases** | PostgreSQL (Relational), Qdrant (Vector) |
| **Messaging** | Redis + RQ |
| **DevOps** | Docker, Nginx |

---

## Team & Contact

This project is developed by the **LambdaGEO** team at **Universidade Federal do Maranhão (UFMA)**, in collaboration with the Postgraduate Program in Collective Health.

| Role | Name |
|:--- |:--- |
| **Project Coordination** | Prof. Cecília C. C. Ribeiro |
| **Backend Development, Microservices & Deployment** | Sergio S. Costa |
| **Prompt Engineering** | Pedro A. F. França, João D. S. de Almeida, João O. B. Diniz |
| **Research & Health Domain** | Rafaela V. P. Sá, Silas Alves-Costa, Poliana C. de A. F. Viola, Bruno F. de Souza |

For collaborations or inquiries, reach out at [sergio.costa@ufma.br](mailto:sergio.costa@ufma.br).
