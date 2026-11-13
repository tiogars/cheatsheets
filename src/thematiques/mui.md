---
marp: true
theme: default
paginate: true
title: MUI
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

# MUI

Commandes depuis la racine du projet concerné.

---

## MUI : installer

**Versions de référence (11 novembre 2026) :** Node.js 26.13.0 (LTS), pnpm 12.18.0, React 19.3.1, `@mui/material` et `@mui/icons-material` 9.5.0, MUI X 9.17.0.
Dépendances de l'exemple : Emotion (`@emotion/react` 11.14.0, `@emotion/styled` 11.14.1) et Day.js 1.11.23.

Depuis une application React existante, avec pnpm :

```shell
pnpm add @mui/material @emotion/react @emotion/styled
pnpm add @mui/icons-material
```

Bibliothèques optionnelles pour tableaux et dates :

```shell
pnpm add @mui/x-data-grid
pnpm add @mui/x-date-pickers dayjs
```

Les sélecteurs de date exigent un `LocalizationProvider`
et un adaptateur tel que `AdapterDayjs`.

---

## MUI : composants

Exemple React à placer dans un fichier `.tsx` ou `.jsx` :

```jsx
import { Button, Stack, TextField } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

export default function Formulaire() {
  return (
    <Stack component="form" spacing={2} sx={{ maxWidth: 360 }}>
      <TextField name="nom" label="Nom" required fullWidth />
      <Button type="submit" variant="contained" startIcon={<SaveIcon />}>
        Enregistrer
      </Button>
    </Stack>
  );
}
```

Ajouter un gestionnaire `onSubmit` pour persister les données.

---

## MUI : mettre à jour

Avant un changement de version majeure, remplacer les API dépréciées,
puis suivre le [guide de migration](https://mui.com/material-ui/migration/upgrade-to-v9/) :

```shell
pnpm dlx @mui/codemod@latest deprecations/all src
```

Mettre à jour ensemble les paquets MUI du projet :

```shell
pnpm outdated "@mui/*"
pnpm update "@mui/*" --latest
```

Vérifier le diff avec Git, puis lancer les tests et le build.
