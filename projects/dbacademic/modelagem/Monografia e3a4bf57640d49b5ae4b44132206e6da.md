# Monografia

Classe : [https://w3id.org/ccso/ccso#Resource](https://w3id.org/ccso/ccso#Resource)

| Atributo | Tipo | Descrição | Exemplo | Propriedade | Range |
| --- | --- | --- | --- | --- | --- |
| título | Data Property | O título da monografia | DESENVOLVIMENTO DE UM SISTEMA DE CHATBOT PARA PERGUNTAS FREQUENTES SOBRE A LEI DE DIREITO AUTORAL | http://purl.org/dc/elements/1.1/title | https://www.notion.so<http://www.w3.org/2001/XMLSchema#string> |
| aluno/autor | Object Property | Ligação para o recurso que representa o discente | https://purl.org/dbacademic/resource#00… | http://purl.org/dc/elements/1.1/creator | https://w3id.org/ccso/ccso#Student |
| orientador | Object Property | Ligação para o recurso que representa o orientador, um docente. | https://purl.org/dbacademic/resource#11… | http://purl.org/dc/elements/1.1/contributor |  https://w3id.org/ccso/ccso#Professor |
| curso | Object Property | Ligação para o recurso que representa o curso. | https://purl.org/dbacademic/resource#22… | http://purl.org/dc/elements/1.1/publisher | https://w3id.org/ccso/ccso#ProgramofStud |
| data  | Data Property | Data da defesa, ou cadastro | 29/07/2022 | http://purl.org/dc/elements/1.1/date | https://www.notion.so<http://www.w3.org/2001/XMLSchema#date> |
| palavras chaves | Data Property | Palavras chaves cadastradas | CHATBOT,  Direito Autoral, Inteligencia Artificial | http://purl.org/dc/elements/1.1/subject | https://www.notion.so<http://www.w3.org/2001/XMLSchema#string> |
| resumo | Data Property | O resumo da monografia | Chatbots existem há mais de 20 anos e são softwares baseados
em inteligência artificial… | http://purl.org/dc/elements/1.1/description | https://www.notion.so<http://www.w3.org/2001/XMLSchema#string> |
| url | Data Property | Endereço onde está publicado | https://sigaa.ufma.br/sigaa/public/curso/monografias_curso.jsf?&id=16822859 | http://purl.org/dc/elements/1.1/identifier | https://www.notion.so<http://www.w3.org/2001/XMLSchema#url> |
| tipo | Data Property | Uma monografia é do tipo BachelorThesis. Outros tipos que poderia ser considerado caso essa coleção não fosse apenas de monografia, seria  Article,  Chapter,  Paper, Booklet,  Poster,  Thesis (BachelorThesis, MasterThesis or DoctoralThesis),  Software,  Specification,  Report,  UnofficialPublication, etc.  | BachelorThesis | http://purl.org/dc/elements/1.1/type | https://www.notion.so<http://www.w3.org/2001/XMLSchema#string> |