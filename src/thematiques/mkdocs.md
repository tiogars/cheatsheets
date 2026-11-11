---
marp: true
theme: default
paginate: true
title: MkDocs
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

# MkDocs

Sites de documentation statiques à partir de fichiers Markdown.

---

## MkDocs : installer

Site : [MkDocs](https://www.mkdocs.org/)
Guide : [Getting Started with MkDocs](https://www.mkdocs.org/getting-started/)

**Version de référence (11 novembre 2026) :** MkDocs 1.6.1.
MkDocs nécessite Python 3.8 ou supérieur.

**Prérequis :** environnement virtuel Python activé (voir la fiche Python).

```shell
python -m pip install mkdocs
mkdocs --version
mkdocs --help
```

Sous Windows, utiliser `python -m mkdocs` si la commande `mkdocs` est introuvable.

---

## MkDocs : créer et prévisualiser

Créer un projet, puis lancer le serveur de développement :

```shell
mkdocs new mon-site
cd mon-site
mkdocs serve
```

`mkdocs new` crée la configuration `mkdocs.yml` et la page `docs/index.md`.

Le site est servi sur `http://127.0.0.1:8000/` et se recharge à chaque modification
de `docs/` ou de `mkdocs.yml`. Arrêter le serveur avec `Ctrl+C`.

---

## MkDocs : configurer

Fichier `mkdocs.yml` à la racine du projet :

```yaml
site_name: Mon projet
nav:
  - Accueil: index.md
  - À propos: about.md
theme: readthedocs
```

`site_name` est la seule option obligatoire.
Les pages listées dans `nav` doivent exister dans `docs/` : créer `docs/about.md` avant de l'ajouter.
Thèmes intégrés : `mkdocs` (par défaut) et `readthedocs`.

---

## MkDocs : générer et publier

Générer le site statique dans `site/`, en échouant au moindre avertissement :

```shell
mkdocs build --strict
```

Ajouter `site/` au `.gitignore` : ce dossier est régénéré à chaque build.

Publier sur GitHub Pages, dans la branche `gh-pages` du distant `origin` :

```shell
mkdocs gh-deploy
```

`gh-deploy` publie sans relecture et inclut les fichiers non suivis ou non validés :
vérifier le site avant, et ne jamais modifier la branche `gh-pages` à la main.
