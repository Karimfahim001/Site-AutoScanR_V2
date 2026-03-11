# AutoScanR - Documentation du Projet

## Présentation
**AutoScanR** est une plateforme innovante de diagnostic automobile en libre-service. Elle permet aux automobilistes de reprendre le contrôle sur l'entretien de leur véhicule grâce à des bornes de diagnostic autonomes installées dans des lieux publics (parkings, centres commerciaux, stations-service).

Le projet offre une interface claire qui traduit les codes d'erreur complexes (OBD-II) en langage compréhensible, fournit des conseils de réparation et facilite la mise en relation avec des garages partenaires certifiés.

## Stack Technique
Le projet est développé avec les technologies modernes suivantes :
- **Framework** : [React 19](https://react.dev/)
- **Outil de Build** : [Vite](https://vitejs.dev/)
- **Langage** : [TypeScript](https://www.typescriptlang.org/)
- **Styling** : [Tailwind CSS](https://tailwindcss.com/)
- **Icônes** : [Lucide React](https://lucide.dev/)
- **Cartographie** : [Leaflet](https://leafletjs.com/) & [React Leaflet](https://react-leaflet.js.org/)

## Installation & Lancement
Pour faire fonctionner le projet localement :

1. **Installation des dépendances** :
   ```bash
   npm install
   ```

2. **Lancement du serveur de développement** :
   ```bash
   npm run dev
   ```
   L'application sera accessible par défaut sur `http://localhost:5173`.

## Structure des Dossiers
L'arborescence simplifiée du projet est la suivante :
```text
autoscanr/
├── docs/               # Documentation du projet
├── public/             # Assets statiques (images, logos)
├── src/
│   ├── components/     # Composants réutilisables (Navbar, etc.)
│   ├── pages/          # Pages principales (Home, Dashboards, etc.)
│   ├── App.tsx         # Point d'entrée principal et gestion des vues
│   ├── index.tsx       # Montage de l'application React
│   ├── types.ts        # Définitions des types TypeScript
│   └── constants.ts    # Constantes globales
├── package.json        # Dépendances et scripts
└── vite.config.ts      # Configuration Vite
```

## Parcours Utilisateur Principal
1. **Accueil** : L'utilisateur vérifie la compatibilité de son véhicule.
2. **Localisation** : Recherche de la borne la plus proche sur la carte.
3. **Médiation** : Consultation du centre de médiation pour comprendre les pannes.

## Identifiants de Démo
Pour tester les différents espaces de la plateforme (Mode Démo) :
- **Email** : `demo@autoscanr.com`
- **Mot de passe** : `AutoScanR2026!`

## Déploiement
Pour partager un lien de démonstration, vous pouvez déployer le projet sur l'une de ces plateformes :

### Vercel (Recommandé)
1. Installez la CLI Vercel : `npm i -g vercel`.
2. Lancez `vercel` à la racine du projet.
3. Suivez les instructions pour lier votre dépôt GitHub.

### Netlify
1. Créez un compte sur [Netlify](https://www.netlify.com/).
2. Faites glisser le dossier `dist` (généré par `npm run build`) sur l'interface de Netlify ou liez votre dépôt Git.
