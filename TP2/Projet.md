# Mise en place du projet

 - 1ère étape : Installer docker, kibana et elasticsearch sur un conteneur docker
 - 2ème étape : Dans le conteneur elasticsearch récupérer le fichier `/config/certs/http_ca.crt` et le mettre dans le dossier `/TP2` ; **Le renommer cert.crt**
 - 3ème étape : Dans le dossier `/TP2`, jouer la commande suivante :
    - <code>npm i</code>
 - 4ème étape : Dans le dossier `/TP2`, jouer la commande suivante :
    - <code>node index.js</code>
 - 5ème étape : Sur l'application, appuer sur le bouton `Choisir un fichier` et sélectionner le fichier `movies.xlsx` qui se trouve dans le dossier `/TP2/public/uploads`. C'est un jeux de données pour tester l'application.
 - 6ème étape: Profiter de l'application

# Explication de l'application

 - La recherche : Elle ce fait par multi-match, ce qui permet de chercher un mot clé parmis tous les films et ses attributs (titre, année et réalisateur). Ce qui différencie ce système de recherche d'une recherche via une BDD (EX : SQL) clasique est que en SQL, il faut voir si la variable est un chiffre pour l'année, si c'est une chaine de caractère, il faut la faire correspondre à chaque champs de la table. Ici, on peut chercher un mot clé dans tous les champs en même temps. De plus on peut chercher via un prefix (mot incomplet) ce qui propose une recherche pertinente.
 - La suppression : Elle ce fait par l'id du film, ce qui permet de supprimer un film en particulier.
 - La modification : Elle ce fait par l'id du film, ce qui permet de modifier un film en particulier.
 - L'ajout : Elle ce fait par un formulaire, ce qui permet d'ajouter un film en particulier. Il est aussi possible d'ajouter plusieurs films en même temps via un fichier CSV. Ce qui permet de gagner du temps et de ne pas avoir à ajouter les films un par un. Une template se trouve à la localisation suivante  : `./public/uploads/Template.xlsx`