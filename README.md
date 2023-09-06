# Mechaquest

## Description du projet

Mechaquest est un jeu captivant de combat de robots au tour par tour. Le joueur est immergé dans un univers où il peut explorer divers environnements, améliorer ses robots et en acquérir de nouveaux pour renforcer son arsenal. Les actions des robots pendant le combat sont déterminées par le lancer d'un dé, introduisant une dimension de hasard et de suspense dans chaque confrontation.

Au fur et à mesure de l'avancement, le joueur accumule de l'expérience permettant de renforcer les statistiques du robot. Plus le robot est fort, plus il est capable de relever des défis complexes et de remporter des récompenses substantielles. Actuellement, le jeu propose du contenu solo, où le joueur peut se mesurer à une intelligence artificielle.

## Technologies utilisées

- Laravel
- React Native
- Java
- MySQL
- Expo

Voici comment vous pourriez décrire l'installation pour un projet Laravel et un projet React Native avec Expo :

## Installation

Pour installer et exécuter ce projet localement, vous devrez suivre ces étapes :

### Prérequis

Assurez-vous d'avoir déjà installé [PHP](https://www.php.net/downloads.php), [Composer](https://getcomposer.org/download/) pour Laravel, et [Node.js](https://nodejs.org/en/download/), [Expo CLI](https://expo.dev/tools) pour React Native.

### Installation de Laravel

1. Cloner le dépôt à l'aide de `git clone https://github.com/JB-Doffemont/MechaQuest.git`
2. Aller dans le répertoire du projet avec `cd MechaQuest_back`
3. Installer les dépendances nécessaires avec `composer install`
4. Copiez le fichier .env.example en .env avec `cp .env.example .env`
5. Générer une nouvelle clé d'application avec `php artisan key:generate`
6. Démarrer le serveur de développement avec `php artisan serve`

A ce stade, vous devriez pouvoir accéder à l'application Laravel sur http://localhost:8000 (ou l'URL que vous a fourni la commande `php artisan serve`).

### Installation de React Native avec Expo

1. Assurez-vous d'être dans le répertoire du projet React Native. Si nécessaire, utilisez `cd Mechaquest_front`
2. Installer les dépendances nécessaires avec `npm install`
3. Démarrer le projet avec `expo start`

Une fois que vous avez démarré le projet avec Expo, vous devriez voir un QR code dans votre terminal. Scannez ce QR code avec l'application Expo Go sur votre téléphone pour voir votre projet s'exécuter sur votre appareil.
