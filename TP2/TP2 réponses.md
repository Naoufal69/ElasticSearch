# Réponses du TD2

## Tenter d’expliquer comment les données indexées sont analysées

- `Indexation des données`: Tout d'abord, les données doivent être indexées dans Elasticsearch. Cela implique de les ajouter à un index spécifique. (Index => BDD)

- `Requêtes de recherche` : Une fois les données indexées, On peut effectuer des requêtes de recherche pour récupérer et analyser les données. (Voir les différentes types de requêtes dans le fichier <code>TP2 notes.md</code>)

- `Agrégations`: Les agrégations sont une fonctionnalité puissante d'Elasticsearch pour analyser les données indexées. Les agrégations permettent de regrouper, de filtrer et de calculer des statistiques sur les données. Il existe différents types d'agrégations (Voir les différentes types de requêtes dans le fichier <code>TP2 notes.md</code>). 

- `Analyze (Analyseur de texte)`: Elasticsearch dispose d'un analyseur de texte intégré qui peut être appliqué aux champs textuels lors de l'indexation et de la recherche. L'analyseur de texte divise le texte en termes individuels en tokens, les normalise en minuscules, supprime les mots vides et applique d'autres traitements. Ça facilite la recherche de texte dans les données indexées, en prenant en compte la correspondance des mots.

- `Relevancy (pertinence)` : Elasticsearch utilise un algorithme de pertinence pour classer les résultats de recherche en fonction de leur pertinence par rapport à la requête effectuée. 

- `Visualisations` : Elasticsearch est souvent utilisé en combinaison avec Kibana, qui est une plateforme de visualisation de données. Kibana permet de créer des tableaux de bord interactifs, des graphiques et des visualisations basées sur les données indexées dans Elasticsearch.