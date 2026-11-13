---
marp: true
theme: default
paginate: true
title: Marp
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

# Marp

Créer et exporter des présentations avec Markdown.

---

## Marp : écrire des diapositives

Site : [Marp | The Markdown Presentation Ecosystem](https://marp.app/)
CLI : [marp-team/marp-cli](https://github.com/marp-team/marp-cli)
Directives : [Marpit Directives](https://marpit.marp.app/directives)

**Version de référence (11 novembre 2026) :** Marp CLI 4.5.1 et Node.js 26.13.0 (LTS).
Marp CLI nécessite Node.js 18 ou supérieur.

En-tête YAML et séparation des diapositives :

```markdown
---
marp: true
theme: default
paginate: true
---

# Titre

---

## Diapositive suivante
```

---

## Marp : exporter

Installer le CLI dans le projet :

```shell
pnpm add -D @marp-team/marp-cli
```

Exporter en HTML, PDF et PowerPoint :

```shell
pnpm exec marp src/presentation.md --html --output dist/presentation.html
pnpm exec marp src/presentation.md --html --pdf --pdf-outlines --output dist/presentation.pdf
pnpm exec marp src/presentation.md --html --pptx --output dist/presentation.pptx
pnpm exec marp src/presentation.md --html --images png --output dist/presentation.png
```

L'export PDF, PPTX et images nécessite Chrome, Edge ou Firefox.

---

## Marp : prévisualiser

Prévisualiser un dossier ou surveiller une source :

```shell
pnpm exec marp --server src
pnpm exec marp --watch src/presentation.md
```

Dans ce dépôt :

```shell
pnpm run dev
make build
```

`make build` génère les exports HTML, PDF et PPTX des thématiques.

Thèmes intégrés : `default`, `gaia` et `uncover`.
`<!-- _class: lead -->` applique une classe à la diapositive courante.

---

## Marp : mettre à jour

Vérifier, puis mettre à jour Marp CLI dans le projet :

```shell
pnpm exec marp --version
pnpm outdated @marp-team/marp-cli
pnpm update @marp-team/marp-cli --latest
```

Dans ce dépôt, régénérer ensuite les exports pour contrôler le rendu :

```shell
make build
```

L'extension **Marp for VS Code** se met à jour depuis la vue Extensions.
Consulter les [notes de version](https://github.com/marp-team/marp-cli/releases).
