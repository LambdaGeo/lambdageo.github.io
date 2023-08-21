# Projeto de Pesquisa

Classe: [https://purl.org/linked-data/ccso-dbacademic#ResearchProject](https://purl.org/linked-data/ccso-dbacademic#)

| Name | Tipo | Property | Descrição | Exemplo | Tipo de dado  |
| --- | --- | --- | --- | --- | --- |
| nome | Data Property | http://schema.org/legalName | Essa propriedade indica o nome oficial de um projeto de pesquisa | Desenvolvimento de Algoritmos de Aprendizado de Máquina para Detecção de Anomalias em Redes de Computadores | http://www.w3.org/2000/01/rdf-schema#Literal |
| codigo | Data Property | http://schema.org/identifier/ | Essa propriedade indica um código ou identificador único associado ao projeto de pesquisa | PICET1888-2023 | http://www.w3.org/2000/01/rdf-schema#Literal |
| instituição | Object Property | https://schema.org/memberOf | Ligado recurso que representa a instituição associado a projeto de pequisa. | http://pt.dbpedia.org/resource/Universidade_Federal_do_Maranhão | http://schema.org/EducationalOrganization |
| coordenador | Object Property | csoacad:hasLeader | Ligado a propriedade que representa o coordenador associado ao projeto | http://exemplo.org/coordinators#joaoSilva |  |
| área de conhecimento | Data Property | ccsoacad:hasKnowledgeArea | Essa propriedade indica a área de conhecimento à qual o projeto de pesquisa está relacionado. | Inteligência Artificial e Aprendizado de Máquina | http://www.w3.org/2001/XMLSchema#string |
| ano de conclusao | Data Property | ccsoacad:startDate | Essa propriedade indica o ano de conclusão do projeto de pesquisa. | 2025 | https://www.notion.so<http://www.w3.org/2001/XMLSchema#date> |
| ano de inicio | Data Property | ccsoacad:endDate | Essa propriedade indica o ano de início do projeto de pesquisa | 2023 | https://www.notion.so<http://www.w3.org/2001/XMLSchema#date> |
| grupo de pesquisa | Object Property | https://schema.org/memberOf | Ligar membros associados ao projeto | https://purl.org/dbacademic/organization#dbGroup | https://purl.org/linked-data/ccso-dbacademic#ResearchGroup |