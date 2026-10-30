# Gestion de chantier

Application web de gestion de chantiers pour les entreprises du BTP : suivi des chantiers, affectation des équipes, pointage, demandes de congé, habilitations et plans.

## Fonctionnalités

- **Chantiers** : création, modification, localisation sur carte, plans et autorisations associés
- **Équipes** : gestion des utilisateurs et de leurs rôles (administrateur, collaborateur)
- **Affectations** : affectation des collaborateurs aux chantiers sur une période donnée
- **Pointage** : suivi de la présence quotidienne
- **Congés** : demande, validation, refus et annulation
- **Habilitations** : dépôt des documents d'habilitation de chaque collaborateur
- **Notifications** par chantier
- **Sécurité** : authentification par jeton JWT, toutes les routes de l'API sont protégées sauf la connexion

## Stack technique

| Partie | Technologies |
|---|---|
| Backend | PHP 8.2, Laravel 11, API REST, JWT (`tymon/jwt-auth`) |
| Frontend | React, React Router, Axios, Material UI |
| Base de données | MySQL |

## Structure

```
backend/    API Laravel
frontend/   Application React
```

## Installation

### Prérequis

PHP 8.2+, Composer, Node.js 18+, MySQL.

### Backend

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan jwt:secret
```

Dans `.env`, configurer la base de données MySQL :

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=gestion_chantier
DB_USERNAME=...
DB_PASSWORD=...
```

Puis créer les tables, le compte de démonstration, et lancer le serveur :

```bash
php artisan migrate --seed
php artisan storage:link
php artisan serve
```

L'API est disponible sur `http://localhost:8000/api`.

### Frontend

```bash
cd frontend
npm install
npm start
```

L'application est disponible sur `http://localhost:3000`.

## Compte de démonstration

La commande `php artisan migrate --seed` crée un administrateur, défini par `ADMIN_EMAIL` et `ADMIN_PASSWORD` dans `.env` (par défaut `admin@example.com` / `admin1234`). À n'utiliser qu'en local.

## Auteur

Amine CHIBOUB · [LinkedIn](https://www.linkedin.com/in/mohamed-amine-chiboub/) · [GitHub](https://github.com/AmineCHIBOUB)
