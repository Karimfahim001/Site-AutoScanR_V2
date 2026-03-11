# AutoScanR - Workflows et Logique de l'Application

Ce document détaille les flux logiques principaux et la gestion des données locales.

## 1. Vérifier mon véhicule
Ce flux permet à l'utilisateur de s'assurer que sa voiture est compatible.

1. **Saisie sur l'Accueil** : L'utilisateur entre sa plaque d'immatriculation.
2. **Recherche de bornes** : Utilisation de la carte interactive (Leaflet) pour localiser une station.
3. **Simulation de Scan** : Le clic sur une borne simule un diagnostic et redirige vers un rapport.

## 2. Choix du compte et Connexion
L'application propose deux espaces distincts accessibles via la navigation :

- **Espace Conducteur (Particulier)** :
  - **Login** : `demo@autoscanr.com` / `AutoScanR2026!`
  - **Fonctionnalités** : Historique des diagnostics, consultation des détails techniques, médiation simplifiée, prise de RDV.
- **Espace Pro (Garage)** :
  - **Login** : Tout identifiant (ex: `MecaExpert_83`)
  - **Fonctionnalités** : Réception des rapports envoyés par les clients, envoi de devis, gestion du planning et statistiques de conversion.

## 3. Utilisation du LocalStorage
Pour cette version de démonstration sans backend, le `localStorage` est utilisé pour simuler une persistance légère :

- `userRole` : Stocke le rôle actuel ('motorist' ou 'garage') pour maintenir la session ouverte au rafraîchissement.
- `currentView` : Permet de rester sur la vue actuelle après rechargement de la page.
- `diagnostics` : (Optionnel) Cache les résultats des derniers scans effectués pendant la session.

> [!TIP]
> Pour réinitialiser complètement la démo, videz le cache et le stockage local de votre navigateur (`localStorage.clear()`).
