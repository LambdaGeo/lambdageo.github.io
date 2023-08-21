# Grupo de Pesquisa

Classe: [https://purl.org/linked-data/ccso-dbacademic#ResearchGroup](https://purl.org/linked-data/ccso-dbacademic#ResearchGroup)

| Name | Tipo | Property | Descrição | Exemplo | Tipo de dado (range) |
| --- | --- | --- | --- | --- | --- |
| Nome | Data Property | http://schema.org/legalName | Essa propriedade indica o nome oficial de um grupo de pesquisa | Laboratório de Inteligência Artificial e Análise de Dados | http://www.w3.org/2000/01/rdf-schema#Literal |
| Lider | Object Property |  https://purl.org/linked-data/ccso-dbacademic#ResearchGroup#hasLeader | Ligar líder associado a grupo de pesquisa. | http://exemplo.org/leaders#mariaSantos | http://xmlns.com/foaf/0.1/Person |
| código | Data Property | http://schema.org/identifier/ | Essa propriedade indica um código ou identificador único associado ao grupo de pesquisa. | GRP2023-005 | http://www.w3.org/2000/01/rdf-schema#Literal |
| url | Data Property | http://schema.org/url | Essa propriedade indica o endereço da página web oficial do grupo de pesquisa. | http://www.universidadexyz.edu/laboratorio-ia-ad | http://www.w3.org/2001/XMLSchema#anyURI |
| Ano de formação | Data Property | http://schema.org/urlhttps://schema.org/foundingDate | Essa propriedade indica o ano de formação ou criação do grupo de pesquisa. | 2026 | https://www.notion.so<http://www.w3.org/2001/XMLSchema#date> |
| unidade | Object Property | https://schema.org/memberOf | Ligar unidade associado grupo de pequisa | https://purl.org/dbacademic/organization#dbGroup | http://schema.org/EducationalOrganization |
| instituição | Object Property | https://schema.org/memberOf | Propriedade representa a ligação da instituição e o grupo de pesquisa. | http://pt.dbpedia.org/resource/Universidade_Federal_do_Maranhão | http://schema.org/EducationalOrganization |
| área de conhecimento  | Data Property |  https://purl.org/linked-data/ccso-dbacademic#ResearchGroup#hasKnowledgeArea | Essa propriedade indica a área de conhecimento à qual o grupo de pesquisa está relacionado. | Inteligência Artificial e Ciência de Dados | https://www.notion.so<http://www.w3.org/2001/XMLSchema#string> |
| descrição | Data Property | https://schema.org/description | Essa propriedade contém uma descrição detalhada do foco e das atividades do grupo de pesquisa. | O Laboratório de Inteligência Artificial e Análise de Dados se dedica à pesquisa de algoritmos de aprendizado de máquina e técnicas avançadas de análise de dados para resolver problemas complexos em diversas áreas. | http://www.w3.org/2000/01/rdf-schema#Literal |