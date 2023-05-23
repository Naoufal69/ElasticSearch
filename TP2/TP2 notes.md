# Notes cours

## Multi match

- `multi_match` permet de faire une recherche sur plusieurs champs avec des poids différents et de choisir le type de recherche (best_fields, most_fields, cross_fields, phrase, phrase_prefix)

- `best_fields` : recherche sur le champ qui match le mieux

- `most_fields` : recherche sur le champ qui match le plus

- `cross_fields` : recherche sur les champs comme s'ils étaient concaténés

- `phrase` : recherche sur une phrase

- `phrase_prefix` : recherche sur une phrase avec un préfixe

## Bool

- `bool` permet de faire des requêtes booléennes

- `must` : doit matcher

- `must_not` : ne doit pas matcher

- `should` : peut matcher

- `filter` : doit matcher mais n'a pas d'impact sur le score

## Aggregations

- `aggs` permet de faire des agrégations

- `terms` : permet de faire des agrégations sur des champs de type `keyword`

- `date_histogram` : permet de faire des agrégations sur des champs de type `date`


## Mapping

- `mapping` permet de définir le mapping d'un index (les types)

- `properties` permet de définir les propriétés d'un type

- `type` permet de définir le type d'une propriété

- `analyzer` permet de définir l'analyseur d'une propriété (standard,lowercase, french, ...)

- `fields` permet de définir plusieurs champs pour une même propriété (avec des analyseurs différents)

- `keyword` permet de définir une propriété de type `keyword`

- `text` permet de définir une propriété de type `text`

- `date` permet de définir une propriété de type `date`avec un format

- `format` permet de définir le format d'une propriété de type `date`


