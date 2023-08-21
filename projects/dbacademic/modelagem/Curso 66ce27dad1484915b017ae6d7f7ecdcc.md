# Curso

Classe: [https://w3id.org/ccso/ccso#ProgramofStudy](https://w3id.org/ccso/ccso#ProgramofStudy)

| Name | Tipo | Property | Descrição  | Exemplo | Tipo de dado (range) |
| --- | --- | --- | --- | --- | --- |
| Nome | Data Property | https://w3id.org/ccso/ccso#psName | Essa propriedade indica o nome oficial de um curso | Engenharia da Computação | http://www.w3.org/2000/01/rdf-schema#Literal |
| Campus | Data Property | http://schema.org/location | Essa propriedade indica o campus onde o curso é ministrado. | Cidade Universitária, São Luís-MA | https://www.notion.so<http://www.w3.org/2001/XMLSchema#string> |
| Departamento | Object Property | https://w3id.org/ccso/ccso#providedBy | Ligado para recurso que representa organização educacional associado ao curso | https://purl.org/dbacademic/resource#UniversidadeFederalMaranhao | https://w3id.org/ccso/ccso#Department |
| Website | Data Property | http://schema.org/url | Essa propriedade indica o endereço do site oficial do curso | http://www.ecp.ufma.br/ | http://www.w3.org/2001/XMLSchema#anyURI |
| Código | Data Property | https://w3id.org/ccso/ccso#code | Essa propriedade indica um código ou identificador único associado ao curso | EECP00010 | http://www.w3.org/2000/01/rdf-schema#Literal |
| Grau | Data Property | https://w3id.org/ccso/ccso#degreeType | Essa propriedade indica o tipo de grau que o curso oferece | Bacharelado | http://www.w3.org/2001/XMLSchema#string |
| Instituicao | Object Property | https://w3id.org/ccso/ccso#providedBy | Ligado para recurso que representa Instituição | http://pt.dbpedia.org/resource/Universidade_Federal_do_Maranhão | http://schema.org/EducationalOrganization |
| Descrição | Data Property | rdfs:comment | Essa propriedade contém uma descrição textual do curso. | É o ramo da engenharia que combina Ciências da Computação e EngenhariaElétrica a avanços adicionais em tecnologia digital, redes de computadores e sistemas de computares. Integrando perfeitamente as mais recentes inovações, os profissionais da engenharia da computação desenvolvem novos hardwares de computadores, projetam e implementam aplicativos de software, aprimorando os recursos de redes e sistemas de comunicação. | http://www.w3.org/2000/01/rdf-schema#Literal |
| Area do Curso | Data Property | https://w3id.org/ccso/ccso#focusIn | Essa propriedade indica a área de foco ou especialização do curso | Sistemas de Computação e Redes | https://www.notion.so<http://www.w3.org/2001/XMLSchema#string> |
| PPC | Object Property | https://w3id.org/ccso/ccso#hasSyllabus | Lidado ao Plano de Curso ou Plano de Ensino para o curso | https://w3id.org/ccso/ccso#courseURL | https://w3id.org/ccso/ccso#Syllabus |
| Coordenador | Object Property | https://w3id.org/ccso/ccso#assistsInCourse | Ligado para propriedade que representa coordenador de curso. | https://purl.org/linked-data/ccso-dbacademic#hasCoordinator | http://schema.org/EducationalOrganization |
| Turno | X |  |  |  |  |
| Turma | X |  |  |  |  |
| Modalidade  | X | LINK  |  |  |  |
| Ano | X |  |  | course ou seja disciplina | https://w3id.org/ccso/ccso#academicYear |
| Ingresso | X |  |  |  | https://w3id.org/ccso/ccso#academicYear |
| Semestre | X | x att |  |  |  |
| Município | X |  |  |  |  |