# JustStreamIt - Interface Web de Films

Description du Projet
JustStreamIt est une interface web développée dans le cadre d'une formation en développement front-end (Projet #6). Cette application permet aux utilisateurs de découvrir et explorer une vaste collection de films grâce à une interface responsive.
L'objectif principal était de créer une vitrine de films attractive qui présente les contenus les mieux notés selon différentes catégories, tout en offrant une expérience utilisateur fluide sur tous types d'appareils.

## Responsive Design
L'interface s'adapte intelligemment à différentes tailles d'écran :

Version Mobile : Affichage de 2 films par section avec possibilité de voir les 4 autres
Version Tablette : Présentation de 4 films visibles avec 2 films masqués
Version Ordinateur : Affichage complet des 6 films par catégorie

## Technologies Utilisées
Stack Technique

HTML5 : Structure sémantique et accessible
CSS3 : Styles personnalisés avec approche mobile-first
JavaScript : Logique applicative sans framework externe
API REST : Communication avec OCMovies-API via fetch()

## Installation

Cette API exécutable localement peut être installée en suivant les étapes décrites ci-dessous.

### Installation et exécution de l'application

1. Clonez ce dépôt de code à l'aide de la commande `$ git clone https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR.git` (vous pouvez également télécharger une [archive zip](https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR/archive/refs/heads/master.zip))
2. Rendez-vous depuis un terminal à la racine du répertoire ocmovies-api-fr avec la commande `$ cd OCMovies-API-EN-FR`
3. Créez un environnement virtuel pour le projet avec `$ python -m venv env` sous windows ou `$ python3 -m venv env` sous macos ou linux.
4. Activez l'environnement virtuel avec `$ env\Scripts\activate` sous windows ou `$ source env/bin/activate` sous macos ou linux.
5. Installez les dépendances du projet avec la commande `$ pip install -r requirements-dev.txt`
6. Créez et alimentez la base de données avec la commande `$ python manage.py create_db`
7. Démarrez le serveur avec `$ python manage.py runserver`

Lorsque le serveur fonctionne, après l'étape 7 de la procédure, l'API OCMovies peut être interrogée à partir des points d'entrée commençant par l'url de base [http://localhost:8000/api/v1/](http://localhost:8000/api/v1/). 
Le point d'entrée principal permettant de consulter les films est [http://localhost:8000/api/v1/titles](http://localhost:8000/api/v1/titles/). Si vous accédez à cette url depuis un navigateur, ce dernier vous présentera une interface navigable servant de documentation et de laboratoire d'expérimentation. 

### Contraintes Techniques Respectées
Standards Web
Le projet respecte les standards du W3C avec un code HTML sémantiquement correct et accessible. Le CSS utilise les dernières fonctionnalités pour assurer la compatibilité avec les navigateurs modernes.
