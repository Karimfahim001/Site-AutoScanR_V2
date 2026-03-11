# AutoScanR - Guide des Routes (Vues)

L'application est une Single-Page Application (SPA) utilisant un système d'états interne pour la navigation (via `ViewState`). Voici les différentes vues disponibles :

| Identifiant Vue | Description |
| :--- | :--- |
| `HOME` | **Accueil** : Présentation, vérification de plaque et carte des bornes. |
| `MOTORIST_LOGIN` | **Connexion Conducteur** : Interface de login pour les particuliers. |
| `MOTORIST_DASHBOARD` | **Espace Conducteur** : Gestion des rapports OBD, devis et RDV. |
| `GARAGE_LOGIN` | **Connexion Pro** : Interface de login pour les garages partenaires. |
| `GARAGE_DASHBOARD` | **Espace Pro** : Gestion des leads, prises de RDV et statistiques. |
| `MEDIATION_CENTER` | **Médiation & Conseils** : Centre d'aide pour comprendre les pannes courantes. |
| `ABOUT_US` | **Qui sommes-nous ?** : Présentation de l'équipe et de la mission AutoScanR. |
| `CONTACT` | **Contact** : Formulaire de contact et support client. |

## Gestion de la Navigation
La navigation est pilotée par le composant racine `App.tsx` via le hook `useState`. 
L'état de la vue actuelle (`currentView`) détermine le contenu rendu par la fonction `renderContent()`.

> [!NOTE]
> En mode démo, la validation des formulaires de connexion redirige directement vers les tableaux de bord correspondants sans authentification backend réelle.
