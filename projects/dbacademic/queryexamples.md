# Exemplos de consultas

## Retornando todos os cursos com um dado nome

Com o uso de expressoes regulares (_regex_), a consulta do Código a seguir irá trazer tanto os cursos que tenham Engenharias 'De' quanto os 'Da' Computação no nome.

```python
import datadotworld as dw
sparql = '''
prefix ccso: <https://w3id.org/ccso/ccso#>

SELECT ?name ?u

WHERE {
      ?cursos a ccso:ProgramofStudy.
      ?cursos  ccso:psName ?name.
      ?cursos ccso:belongsTo ?u.

      FILTER regex(?name, "ENGENHARIA D. COMPUTAÇÃO", "i" )

 }
'''
results = dw.query('dbacademic/dbacademic', sparql, query_type='sparql')
df = results.dataframe
df
```
Executando em um Python Notebook, como o Google Colab, teriamos a seguinte saída:

![image](https://github.com/LambdaGeo/dbacademic/assets/86836/f96b4c39-06a6-4879-98bf-44088e206cc1)

## Contando a quantidade de docentes por estado

Direto do Google Colab, poderiamos fazer uma consulta que carregue os docentes de todas as universidade. Porém, como cada universidade tem um link para o repositório DBpedia, podemos pegar outras informações que estao conectadas a universidade. Como o estado que esta localizado aquela universidade, e então a partir disso contar a quantidade de docentes por estado. 

```python
import matplotlib.pyplot as plt
import seaborn as sns

sparql = '''
prefix CCSO: <https://w3id.org/ccso/ccso#>
PREFIX dbp: <http://pt.dbpedia.org/property/>
PREFIX dbo: <http://dbpedia.org/ontology/>
prefix foaf: <http://xmlns.com/foaf/0.1/>

SELECT ?Estado (count (DISTINCT ?s) as ?Docentes) where {

   service <http://pt.dbpedia.org/sparql> {
        ?o dbp:nome ?nomeuniv.
        ?o dbo:state ?state.
        ?state dbp:nome ?Estado.
    }

    ?s a CCSO:Professor.
    ?s CCSO:worksFor ?o.
}
GROUP BY ?Estado
ORDER BY DESC (?Docentes)
'''

results = dw.query('dbacademic/dbacademic', sparql, query_type='sparql')
df = results.dataframe

sns.set(style="whitegrid")

# Plotando o gráfico de barras
sns.barplot(x='Estado', y='Docentes', data=df)


# Configurando os rótulos dos eixos
plt.xlabel('Estado')
plt.ylabel('Docentes')

# Configurando o título do gráfico
plt.title('Docentes por Estado')


# Rotacionando os rótulos na vertical
plt.xticks(rotation='vertical')

# Exibindo o gráfico
plt.show()
```

![image](https://github.com/LambdaGeo/dbacademic/assets/86836/9a0a306c-0f84-4aa2-93d6-ea3481c5d31a)

## Contando a quantidade de Universidades por estado

Lembrando que estes resultados estão sendo executados em uma base de dados incompleta e possivelmente desatualizada.

Para contar as instituições por estado, usaremos uma consulta muito parecido. Mudará a variável que será usada para contar:

```python
import matplotlib.pyplot as plt
import seaborn as sns

sparql = '''
prefix CCSO: <https://w3id.org/ccso/ccso#>
PREFIX dbp: <http://pt.dbpedia.org/property/>
PREFIX dbo: <http://dbpedia.org/ontology/>
prefix foaf: <http://xmlns.com/foaf/0.1/>

SELECT ?Estado (count (DISTINCT ?o) as ?Instituicoes) where {

   service <http://pt.dbpedia.org/sparql> {
        ?o dbp:nome ?nomeuniv.
        ?o dbo:state ?state.
        ?state dbp:nome ?Estado.
    }

    ?s a CCSO:Professor.
    ?s CCSO:worksFor ?o.
}
GROUP BY ?Estado
ORDER BY DESC (?Instituicoes)
'''

results = dw.query('dbacademic/dbacademic', sparql, query_type='sparql')
df = results.dataframe

sns.set(style="whitegrid")

# Plotando o gráfico de barras
sns.barplot(x='Estado', y='Instituicoes', data=df)


# Configurando os rótulos dos eixos
plt.xlabel('Estado')
plt.ylabel('Instituições')

# Configurando o título do gráfico
plt.title('Instituições por Estado')


# Rotacionando os rótulos na vertical
plt.xticks(rotation='vertical')

# Exibindo o gráfico
plt.show()
```
![image](https://github.com/LambdaGeo/dbacademic/assets/86836/d508b726-d3da-428d-9ebd-51b8f307e7e7)
