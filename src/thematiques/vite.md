---
marp: true
theme: default
paginate: true
title: Vite
---

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&family=Fira+Code:wght@400;500;700&display=swap');

:root {
  --color-background: #0d1117;
  --color-foreground: #c9d1d9;
  --color-heading: #58a6ff;
  --color-accent: #7ee787;
  --color-code-bg: #161b22;
  --color-border: #30363d;
  --font-default: 'Noto Sans JP', 'Hiragino Kaku Gothic ProN', 'Meiryo', sans-serif;
  --font-code: 'Fira Code', 'Consolas', 'Monaco', monospace;
}

section {
  background-color: var(--color-background);
  color: var(--color-foreground);
  font-family: var(--font-default);
  font-weight: 400;
  box-sizing: border-box;
  border-left: 4px solid var(--color-accent);
  position: relative;
  line-height: 1.6;
  font-size: 20px;
  padding: 56px;
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 700;
  color: var(--color-heading);
  margin: 0;
  padding: 0;
  font-family: var(--font-code);
}

h1 {
  font-size: 52px;
  line-height: 1.3;
  text-align: left;
}

h1::before {
  content: '# ';
  color: var(--color-accent);
}

h2 {
  font-size: 38px;
  margin-bottom: 40px;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--color-border);
}

h2::before {
  content: '## ';
  color: var(--color-accent);
}

ul, ol {
  padding-left: 32px;
}

li {
  margin-bottom: 10px;
}

li::marker {
  color: var(--color-accent);
}

table {
  font-size: 18px;
  border-collapse: collapse;
}

th, td {
  border: 1px solid var(--color-border);
  padding: 8px 12px;
}

th {
  color: var(--color-heading);
  font-family: var(--font-code);
}

pre {
  background-color: var(--color-code-bg);
  border: 1px solid var(--color-border);
  border-radius: 6px;
  padding: 16px;
  overflow-x: auto;
  font-family: var(--font-code);
  font-size: 16px;
  line-height: 1.5;
}

code {
  background-color: var(--color-code-bg);
  color: var(--color-accent);
  padding: 2px 6px;
  border-radius: 3px;
  font-family: var(--font-code);
  font-size: 0.9em;
}

pre code {
  background-color: transparent;
  padding: 0;
  color: var(--color-foreground);
}

section.lead {
  border-left: 4px solid var(--color-accent);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

section.lead h1 {
  margin-bottom: 24px;
}

section.lead p {
  font-size: 22px;
  color: var(--color-foreground);
  font-family: var(--font-code);
}

strong {
  color: var(--color-accent);
  font-weight: 700;
}
</style>

<!-- _class: lead -->

# Vite

Développement et build d’applications web modernes.

---

## Vite : créer un projet

Site : [Vite](https://vite.dev/)
Guide : [Getting Started | Vite](https://vite.dev/guide/)

**Prérequis :** Node.js 20.19+ ou 22.12+, et pnpm installés.

Créer une application React avec TypeScript :

```shell
pnpm create vite mon-app --template react-ts
cd mon-app
pnpm install
```

Le guide officiel propose aussi des modèles JavaScript, Vue, Svelte et d’autres frameworks.

---

## Vite : développer

Depuis la racine du projet :

```shell
pnpm run dev
pnpm run dev -- --open
```

Le serveur démarre par défaut sur `http://localhost:5173`.

Vite recharge les modules modifiés pendant le développement. Arrêter le serveur avec `Ctrl+C`.

---

## Vite : compiler

Créer les fichiers optimisés pour la production :

```shell
pnpm run build
```

Vérifier localement le résultat généré dans `dist/` :

```shell
pnpm run preview
```

`preview` sert à contrôler le build localement ; ce n’est pas un serveur de production.

---

## Vite : configurer

Fichier `.env.local` :

```dotenv
VITE_API_URL=https://api.example.test
```

Lire la variable dans le code client :

```js
const apiUrl = import.meta.env.VITE_API_URL;
```

Toute variable `VITE_` est intégrée au code livré au navigateur : n’y placer aucun secret.
Le fichier `.env.local` est destiné aux réglages locaux et doit rester ignoré par Git.

---

## Vite : mettre à jour

Lire le [guide de migration](https://vite.dev/guide/migration) avant un changement de version majeure.

Depuis la racine du projet, vérifier Node.js, puis mettre à jour Vite et son plugin :

```shell
node --version
pnpm outdated vite @vitejs/plugin-react
pnpm update vite @vitejs/plugin-react --latest
pnpm run build
```

`@vitejs/plugin-react` correspond au modèle `react-ts` : adapter la liste aux plugins du projet.
Relancer ensuite `pnpm run dev` pour contrôler l'application.
