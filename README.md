# Birthday Magic ✨

Site d'anniversaire interactif, immersif et animé avec React, Vite, Tailwind CSS, Framer Motion, GSAP et `canvas-confetti`.

## Installation & Lancement

```bash
npm install
npm run dev
```

Pour générer la version de production :

```bash
npm run build
```

## Personnalisation

Toute la configuration est centralisée dans `src/data/birthdayData.js` :

1. **Prénom, date et textes** : modifiez `birthdayName`, `birthdayDate`, `heroMessage`, `specialMessage` et `finalMessage`.
2. **Photos** : placez vos images (`.jpg`, `.png`, `.webp`) dans `public/photos/` puis mettez à jour `mainPhoto`, `galleryPhotos` et `memories` dans `src/data/birthdayData.js`.
3. **Couleurs** : ajustez la palette `magic` dans `tailwind.config.js` et le fond principal dans `src/index.css`.
4. **Musique de fond** : placez un fichier audio local dans `public/music/birthday-theme.mp3` (ou modifiez `backgroundMusic.src` dans `src/data/birthdayData.js`). La musique ne démarre jamais automatiquement.

## Déploiement sur Vercel

Le projet inclut `vercel.json`. Connectez simplement votre dépôt GitHub à Vercel (framework preset : **Vite**, build command : `npm run build`, output directory : `dist`).
