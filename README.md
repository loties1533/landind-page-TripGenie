# TripGenie — Landing Page

Landing page statique (HTML/CSS/JS, sans build) pour [TripGenie](https://github.com/loties1533/tripgenie-app), le générateur de pack de voyage par IA.

## Aperçu

```
tripgenie-landing/
├── index.html      # Structure de la page
├── css/style.css   # Design system (couleurs, typo, layout)
├── js/script.js    # Animations : flip headline, boarding pass, scroll reveal
└── README.md
```

Aucune dépendance, aucun build : ouvre `index.html` dans un navigateur, ou sers le dossier avec n'importe quel serveur statique.

## Développement local

```bash
# Avec Python
python3 -m http.server 8080

# Ou avec Node (npx serve)
npx serve .
```

Puis ouvre `http://localhost:8080`.

## Déploiement

Le site est 100% statique — il se déploie n'importe où :

- **Vercel / Netlify** : connecte le repo, aucune config de build nécessaire (dossier racine = `/`).
- **GitHub Pages** : Settings → Pages → Deploy from branch → `main` / `/ (root)`.

## Personnalisation

- Couleurs, typographies et rayons de bordure : variables CSS en haut de `css/style.css` (`:root`).
- Textes du "flip" du titre et des voyages exemples de la boarding pass : tableaux `flipMessages` et `trips` dans `js/script.js`.
- Liens vers l'app et le repo GitHub : à mettre à jour dans `index.html` si l'URL de démo change.
