# Projet Sanofi

### Sujet

Le sujet du projet est laissé à votre choix tant qu’il a un lien avec les métiers de la santé.

#### Néanmoins voici une proposition de sujet

Application de suivi de patients dans le cadre d’essais cliniques.
L’application permettra de
créer des essais cliniques,
ajouter
des patients
des médecins chargés du suivi.  
des événements sur le carnet de suivi d’un patient.

Et permettre de suivre les progrès de l’essai clinique.
Rendu
Présentation orale le 16/12 en présence de membres de Sanofi

Préparer une présentation avec
contexte / problématique métier
Scénario utilisateurs principaux et workflows
diagramme d’architecture du système avec l’organisation des technologies utilisées
schémas de base de données (entité relation / schéma physique si relationnel, à adapter si non relationnel.)
démonstration de l’application

Grille d’évaluation

### Frontend ( 7 points)

Le frontend doit avoir au moins 3 écrans différents avec un framework front JS
Au moins un écran permettra d'effectuer une tâche qui met à jour des données dans la bdd en passant par le backend.
les composants sont de petite taille / ne font qu’une seule chose à la fois.
les composants sont rangés dans des sous dossiers par sous thème de manière cohérente
Sans être des oeuvre d’art les écrans devront avoir une présentation claire, aérée et moderne grâce à un framework de type bootstrap / tailwind
Au moins un test cypress tourne


### Backend ( 7 points)

un système d’authentification simple devra s’assurer qu’une personne ne peut accéder / modifier des ressource auquel il n’a pas le droit
Le backend devra être connecté à la base de données par l'intermédiaire d’une couche dédiée.
les différentes aspect (présentation, modèle, data) devront être séparés
les fichiers sont organisés dans des sous dossier (modules) cohérents

### Base de donnée ( 3 points)

le choix de la base de donnée est laissé libre
un script de migration permet de créer le schéma si on est dans une base relationnelle
un script permet d’insérer automatiquement des données simples (fixtures)

### Autres ( 3 points )
La première chose qui  devra être faite sera de faire un repository git et d’avoir un premier commit
les commits doivent être faits régulièrement et push





















Bonus :
une branche et une pull request (PR) a été faite lors du développement d’une feature
le ou les tests tournent dans la pipeline (github action / jenkins / gitlab ci)
l’application est dockerisée

Double bonus :
la pipeline est capable de build une image docker et la push sur un registry
l’application est en production sur une VM

Perfection suprême :
un script / ansible permet de déployer automatiquement l’application en production 



