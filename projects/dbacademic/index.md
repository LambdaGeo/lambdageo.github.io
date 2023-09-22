---
layout: default
title: DBAcademic
---

# DBAcademic

<div style="text-align: justify">
As instituições públicas detêm um grande volume de dados que poderiam ser usados para melhorar os seus serviços. Isso tem motivado um movimento denominado de dados abertos dados. Nesse sentido, o Brasil e outros países têm criado leis que incentivem e obriguem as instituições abrirem seus dados públicos. Um exemplo disso foi um decretou de 2016 que obrigou as instituições federais criarem seus Planos de Dados Abertos. Isso levou a criação de diversos portais de dados abertos. Porém, atualmente esses portais de dados abertos não estão conectados tornando impraticável a consulta de dados entre eles. A conexão destes dados pode ser realizado através de um conjunto de práticas denominadas de dados conectados. O objetivo desse trabalho é desenvolver um repositório de dados utilizando essas práticas denominado DBacademic. Com esse objetivo, os dados abertos de 25 instituições públicas de ensino foram extraídos, transformados e carregados para um repositório de dados conectados. Essa transformação resultou em quase 900 mil triplas que podem ser consultadas através do site dbacademic. 
</div>




## Conjunto de Dados

<div style="text-align: justify">
Neste trabalho identificou-se 45 instituições públicas de ensino com dados abertos, com em média 20 conjuntos de dados cada.

No entanto, para cumprir o propósito do projeto foram selecionados alguns conjuntos de dados pertinentes, estes listados abaixo. 
</div>


| Dados | Descrição |
| :------ | :------ |
| <i>Docente</i> | Informações de cada docente, como nome, descrição pessoal, código, e-email,  áreas de interesses, departamento e a URL para o currículo lattes. |
| <i>Curso</i> | Informações de cada curso, como nome,  área de conhecimento CNPQ, departamento, coordenador, modalidade do curso e título do profissional. |
| <i>Departamento</i> | Nas universidades, usualmente os docentes estão associados a um dado departamento. Então, usualmente essa base de dados tem dados como nome, localidade, chefe e o centro no qual ele está associado e código.|
| <i>Centro</i> | Muitas universidades, existe uma hierarquia superior aos departamentos, no qual eles são associados. Os dados são usualmente, nome, localidade e diretor. |
| <i>Grupos de Pesquisa</i> | Os grupos de pesquisa são grupos de docentes e discentes, que estudam um dado tema, e tem um docente como coordenador. Os dados são usualmente, nome, área de conhecimento e coordenador. |
| <i>Monografias (Trabalhos de Conclusão de Curso)</i> | Informações sobre as monografias (ou trabalho de conclusão) dos discentes, tais como  título, nome do aluno, nome do orientador, nome do curso, ano e data da defesa. |
| <i>Discente</i> | Este conjunto engloba as informações dos alunos ativos, por ingresso ou egressos da universidade. Usualmente, contém poucos atributos, como nome do aluno, matrícula, período de ingresso e nome do curso. |

## Modelagem

* [Acesse aqui a modelagem para cada conjunto de dados](modelagem)

## Dados Publicados

* [Acesse aqui os dados publicados no Data.world]((https://data.world/dbacademic/dbacademic))



## Exemplos de Consultas

* [Acesse aqui alguns exemplos de consultas](queryexamples)


## Publicações

- NAHUZ, Breno Baptista et al.. UMA ABORDAGEM BASEADA EM ENGENHARIA DE DADOS PARA EXTRAÇÃO, TRANSFORMAÇÃO E CARREGAMENTO DE DADOS DE INSTITUIÇÕES ACADÊMICAS.. In: III Simpósio REACT sobre Descarbonização: economia, energia e ambiente.. Anais...São Luís(MA) Online, 2023. Disponível em: https//www.even3.com.br/anais/Simposioreact2023/678111-UMA-ABORDAGEM-BASEADA-EM-ENGENHARIA-DE-DADOS-PARA-EXTRACAO-TRANSFORMACAO-E-CARREGAMENTO-DE-DADOS-DE-INSTITUICOES. Acesso em: 12/09/2023
- Costa, Sérgio Souza; DUARTE, M. V. ; Silva, Micael Lopes ; OLIVEIRA, E. C. ; GUIMARAES, J. V. M. . DBacademic: Conectando os dados abertos das instituições de ensino do Brasil.. CIÊNCIA DA INFORMAÇÃO (ONLINE), v. 49, p. 142-158, 2021.
- Costa, Sérgio; Sousa, Mateus ; da Silva, Micael . Os cinco passos para transformar qualquer site de dados públicos em uma API de dados abertos. Minicursos da ERCEMAPI e EAComp 2019. 1ed.: SBC, 2019, v. , p. 90-112.
- Costa, Sérgio; DUARTE, M. V. ; SILVA, M. L. ; OLIVEIRA, E. C. ; GUIMARAES, J. V. M. Uma solução semi-automática para extração, transformação e carga de dados conectados. In: III Workshop de Informação, Dados e Tecnologia (WIDaT 2019), 2019, Brasilia. Workshop de informação, dados e tecnologia (WIDAT 2019), 2019.
- GUIMARAES, J. V. M. ; OLIVEIRA, E. C. ; Costa, Sérgio Souza . Migrando dos dados abertos para dados conectados: uma proposta para a Universidade Federal do Maranhão. In: JIM 2018 - VII Jornada de Informática do Maranhão, 2018, São Luis - MA. JIM 2018 - VII Jornada de Informática do Maranhão, 2018.

## Orientações

1. Uma Solução Extensível Para Extração De Dados Públicos Para Dados Conectados, MATEUS VITOR DUARTE SOUSA , 07/2019
2. Migrando dos dados abertos para dados conectados: uma proposta para a Universidade Federal do Maranhão, JOSE VICTOR MEIRELES GUIMARAES , 12/2018
3. Um estudo exploratório sobre ferramentas para o armazenamento e a publicação de dados conectados, EDDYE CANDIDO DE OLIVEIRA , 07/2017
4. Abrindo os dados públicos da Universidade Federal do Maranhão, MICAEL LOPES DA SILVA , 01/2017



## Portais oficiais de dados abertos

1. [Instituto Federal de Ciência Tecnologia e Educação Catarinense - IFC](http://dadosabertos.ifc.edu.br/)
2. [Instituto Federal de Ciência Tecnologia e Educação Farroupilha - IFFAR](http://dadosabertos.ifc.edu.br/)
3. [Instituto Federal de Ciência Tecnologia e Educação do Maranhão - IFMA]()
4. [Instituto Federal de Ciência Tecnologia e Educação do Mato Grosso do Sul - IFMS](http://dados.ifms.edu.br/)
5. [Instituto Federal de Ciência Tecnologia e Educação do Pará - IFPA](http://pda.ifpa.edu.br/)
6. [Instituto Federal de Ciência Tecnologia e Educação da Paraíba - IFP](https://www.ifpb.edu.br/sic/acesso-a-informacao/dados-abertos)
7. [Instituto Federal de Ciência Tecnologia e Educação do Piauí - IFPI]()
8. [Instituto Federal de Ciência Tecnologia e Educação do Rio Grande do Norte - IFRN](https://dados.ifrn.edu.br/)
9. [Instituto Federal de Ciência Tecnologia e Educação de Sergipe - IFS](http://www.ifs.edu.br/pda)
10. [Universidade Federal do Cariri - UFCA](https://dados.ufca.edu.br)
11. [Universidade Federal de Ciências da Saúde de Porto Alegre - UFCSPA](https://dados.ufcspa.edu.br/)
12. [Universidade Federal Rural do Semi-Árido - UFERSA](http://dadosabertos.ufersa.edu.br/)
13. [Universidade Federal da Fronteira Sul - UFFS](https://dados.uffs.edu.br/)
14. [Universidade Federal do Maranhão - UFMA](http://dadosabertos.ufma.br/)
15. [Universidade Federal do Mato Grosso do Sul - UFMS](https://dadosabertos.ufms.br/)
16. [Universidade Federal do Oeste da Bahia - UFOB]()
17. [Universidade Federal do Ouro Preto - UFOP](http://dados.ufop.br/)
18. [Universidade Federal da Paraíba - UFPB](http://dadosabertos.ufpb.br/)
19. [Universidade Federal de Pelótas - UFPEL](http://dados.ufpel.edu.br/)
20. [Universidade Federal do Piauí - UFPI](https://dados.ufpi.br/)
21. [Universidade Federal do Rio Grande do Norte - UFRN](http://dados.ufrn.br/)
22. [Universidade Federal de São João del-Rei - UFSJ](http://dados.ufsj.edu.br)
23. [Universidade Federal de Viçosa - UFV](http://dados.ufv.br)
24. [Universidade Federal do Sul e Sudeste do Pará - UNIFESPA](http://ckan.unifesspa.edu.br/)
25. [Universidade Federal do Estado do Rio de Janeiro - UNIRIO](http://dados.unirio.br/)