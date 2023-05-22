# ElasticSearch

**Eastic Search**

NoSQL

ElasticSearch :

- Indexation,Normalisation, tokenisation,…
- Analyse de texte
- Opération CRUD avec l’API REst
- Index
- 

La data visalutaion avec Kibana

Installation et configuration

Découverte des données et construction des requêtes

ETL (Exctract transform Load)

Le rôle et fonctionnement des outils du stack

Ce qu’est la data visualisation

Être capable :

- Mettre en place chacun des outils de la stack
- Configurer chaque outil
- Se repérer dans la documentation technique
- Déployer la stack Elastic

1er diapo :

Anciennement ELK

- Elasticsearch
- Logstach
- Kibana
- Beats

ETL : Logstash

Moteur de recherche : Elastisearch

Outil de visualisation : Kibana

Collecte de données : Beats

Moteur de recherche:

- Rechercher des données
- Principalemtn par mot-clés
    - Mais aussi par filtres,catégories, image
- Complexe à faire via des bases de données classiques
- Indexation de documents  (NoSql)
    - Pas de relations pour la performance
    

NoSQL : 

- Bases de données
    - Non relationelles
- Peuvent être
    - Orientées document ← Elasticsearch
    - Orientées Graphe (triplestores et RDF)
    - avec ou sans schéma
- Duplication : mais c’est pas grave
- Collections de données
- Exemple:
    - MongoDB
    - Cassandra
    - DynamoDB
    - Neo4j
    - Elasticsearch

Elasticsearch c’est quoi ?

- Moteur de recherche d’entreprise
    - Distribué et multi-tenant, scalable
    - Open-source SSPL, écrit en JAVA
- Première version en 2010
- Utilise Apache Lucene
    - Aussi à la base de Apache Solr
- Maintenu par l’entreprise Elastic
    - Et la communauté open-source

Elasticsearch - historiquement

- Dun’ outil technique d’analyse de logs
    - avec Logstach
    - Puis Kibana
- Au moteur de recherche d’entreprise le plus utilisé
    - Des mises à jour très régulières
- Histoire

Schéma :

Alimentation                                                               Consommation

- Beats                                                                           Kibana
- Logstach                                                Api REST
- Base de données      →     Elasticsearch ←                  Applications
- Documents (ETL)

La suite Elastic :

                                    Kibana

Elastic Stack            Elastic Search

Terminologie Elasticsearch

- Node /nœud  : une instance d’Elastisearch
- Cluster : groupe de noeuds
- Index : groupe de données indexées, équivalent à une table
- Mapping : correspondance types/champs pour index

Notion avancées :

- Shard : une partie d’un index
- Replica : copie d’un shard / index / noeud

Terminologie Kibana, Logstash et Beats

- Data visualisation (dataviz) : visualiser de la données au moyen de graphes
- Discover : la partie “exploration” de données, un aperçu des docs
- Visualisation : un graphique dans Kibana
- Dahsboard : un regroupement de visualisations
- ETL : Extract Transforl Load, un Logiciel d’extraction et de transformation de la donnée (comme Logstach)
- Plugin : input, filter ou output, sous-programme configurable dans Logstash
- Agent Beats : programme en Go de collecte de données ( à installer sur la source)

Elasticsearch REST API

- Elasticsearch expoe une API REST
    - méthodes d’indexation, de recherche, de configuration
    - et beaucoup

Petit rappel d’architecture applicative

- Respecter l’architecture trois-tiers (ou n-tiers)
- Elasticsearch doit être abrité de derrière une API de façade
    - un backend intermédiaire entre le frontend et Elasticsearch
    - Pour contrôler
    - Exposer une Api
    - Comme pour l’a
        - One ne requête pas

Fonctionnement

- Ingestion des données
    - Via Logstach, Beats, API REST , API de haut niveau
- Indexation ← En détail
- Recherche
- Visualisation
    - Kibana ou API REST

Indexation 

- Classement des données dans des index
- Dans des collections de documents
    - Optimisées pour la recherche
- But : récupération rapide de contenus
- Même fonctionnement qu’une bibliothèque
    - On indexe pour mieux s’y retrouver

Mapping

- le typage des champs
- Dynamique (sans configuration)
    - les nouveaux champs ont un type de déduit
- Explicite ( via configuration)
    - les champs doivent respecter les types définis

Type des champs

- les champs indexés sont typés
    - Soit explicitement, soit dynamiquement
- Liste des types
    - [https://Wwww.elastic.co/guide/en/elasticsearch/reference/current/mapping-types.html](https://wwww.elastic.co/guide/en/elasticsearch/reference/current/mapping-types.html)
- text : analysé, pour la recherche full-text
- keyword: non analysé, recherche exacte
- Comparaison avec les types SQL
    - [https://Wwww.elastic.co/guide/en/elasticsearch/reference/current/sql-data-types.html](https://wwww.elastic.co/guide/en/elasticsearch/reference/current/sql-data-types.html)