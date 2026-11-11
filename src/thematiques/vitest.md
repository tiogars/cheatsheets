---
marp: true
theme: default
paginate: true
title: Vitest
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

# Vitest

Tests JavaScript et TypeScript avec Vite.

---

## Vitest : installer

Site : [Vitest | Next Generation testing framework](https://vitest.dev/)
Guide : [Getting Started | Guide | Vitest](https://vitest.dev/guide/)

**Versions de référence (11 novembre 2026) :** Vitest et `@vitest/coverage-v8` 5.1.0, Node.js 26.13.0 (LTS).
Vitest nécessite Node.js 22.12.0 ou supérieur et Vite 6.4.0 ou supérieur.

Installer Vitest comme dépendance de développement :

```shell
pnpm add -D vitest
```

Ajouter le script de test à `package.json` :

```json
{
  "scripts": {
    "test": "vitest"
  }
}
```

---

## Vitest : écrire un test

Fonction à tester dans `src/sum.js` :

```js
export function sum(a, b) {
  return a + b;
}
```

Test dans `src/sum.test.js` :

```js
import { expect, test } from "vitest";
import { sum } from "./sum.js";

test("additionne deux nombres", () => {
  expect(sum(1, 2)).toBe(3);
});
```

---

## Vitest : lancer les tests

Depuis la racine du projet :

```shell
pnpm exec vitest run
pnpm exec vitest
pnpm exec vitest run src/sum.test.js
pnpm run test
node --run test
```

`vitest run` lance les tests une seule fois ; `vitest` les relance à chaque modification.
`node --run test` exécute le script `test` de `package.json` avec Node.js 22.13.0 ou supérieur.

Couverture de code avec le fournisseur V8 :

```shell
pnpm add -D @vitest/coverage-v8
pnpm exec vitest run --coverage
```

Garder `@vitest/coverage-v8` sur la même version majeure que Vitest.
