# Réponses du TP1

## Installer Elasticsearch et Kibana en local

 - 1ère étape : télécharger Docker Desktop pour Windows
 - 2ème étape : Suivre les commandes suivantes : 
    > Les commandes suivantes communique les mots de passes et token nécessaires à la connexion à Kibana

    - <code> docker network create elastic </code>

    - <code> docker pull docker.elastic.co/elasticsearch/elasticsearch:8.7.1 </code>

    - <code> docker run --name es-node01 --net elastic -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" -t docker.elastic.co/elasticsearch/elasticsearch:8.7.1 </code>

    - <code> docker pull docker.elastic.co/kibana/kibana:8.7.1 </code>

    - <code> docker run --name kib-01 --net elastic -p 5601:5601 docker.elastic.co/kibana/kibana:8.7.1 </code>

## Indexer un document

<code>
POST /michelin/_doc

{"name": "Kilian Stuba",

 "year": "2019",

 "pin": {

   "location": {
     "lat": "47.34858",
     "lon": "10.17114"
     }

   },

  "city": "Kleinwalsertal",

  "region": "Austria",

  "zipCode": "87568",

  "cuisine": "Creative",

  "price": "$$$$$",

  "url": "https://guide.michelin.com/at/en/vorarlberg/kleinwalsertal/restaurant/kilian-stuba",

  "star": "1"}
</code>

## Lire tous les documents

<code> GET /michelin/_search </code>

## Indexer plusieurs documents (bulk)

<code>

POST _bulk

{"index":{"_index":"michelin"}}
{"name": "Kilian Stuba","year": "2019", "pin": {"location": {"lat": "47.34858","lon": "10.17114"}}, "city": "Kleinwalsertal",  "region": "Austria",  "zipCode": "87568",  "cuisine": "Creative",  "price": "$$$$$",  "url": "https://guide.michelin.com/at/en/vorarlberg/kleinwalsertal/restaurant/kilian-stuba",  "star": "1"}
{"index":{"_index":"michelin"}}
{"name": "Test","year": "1999", "pin": {"location": {"lat": "47.34858","lon": "10.17114"}}, "city": "Kleinwalsertal",  "region": "Austria",  "zipCode": "87568",  "cuisine": "Creative",  "price": "$$$$$",  "url": "https://fake.fr",  "star": "1"}

</code>

## Recherche un document par son année

<code> 
GET /michelin/_search
{
    "query": {
        "match": {
        "year": "2019"
        }
    }
}
</code>

## Modifier la config d'un index

<code>
PUT /michelin/_mapping
{
  "properties": {
    "url": { "type": "text" }
  }
}
</code>

## Comment Elasticsearch procède-t-il au mapping ?

- Lorsqu'un document est indexé, Elasticsearch détermine automatiquement le type de données de chaque champ. C'est le mapping dynamique. Le mapping static est une autre façon de définir le mapping. Il permet de définir le type de données de chaque champ avant l'indexation des documents.

## Définir Tokenisation et Normalisation

- Pour permettre d'analyser les données textuelles, Elasticsearch utilise un analyseur de texte intégré. L'analyseur de texte divise le texte en termes individuels en tokens, les normalise en minuscules, supprime les mots vides et applique d'autres traitements. Cela facilite la recherche de texte dans les données indexées, en prenant en compte la correspondance des mots.

- Tokenisation : La tokenisation est le processus de division d'une chaîne de caractères en une liste de tokens. Les tokens sont des unités de texte individuelles, telles que des mots ou des nombres. La tokenisation est généralement le premier étape du processus d'analyse de texte. Exemple : "Hello World" => ["Hello" ; "World"]

- Normalisation : La normalisation est le processus de conversion de chaînes de caractères en une forme standardisée. La normalisation est généralement effectuée après la tokenisation. Exemple : "Hello World" => ["hello" ; "world"]