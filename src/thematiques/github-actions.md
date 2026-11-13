---
marp: true
theme: default
paginate: true
title: GitHub Actions
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

# GitHub Actions

Commandes depuis la racine du projet concerné.
Noms de workflows et identifiants à adapter.

---

## GitHub Actions : lancer

**Version de référence (11 novembre 2026) :** GitHub CLI (`gh`) 2.103.3.

**Prérequis :** GitHub CLI (`gh`), accès au dépôt et workflow existant.

```shell
gh auth login
gh workflow list
gh workflow view ci.yml
gh workflow run ci.yml --ref main
gh run list --workflow ci.yml --limit 5
```

Exécuter depuis le clone du dépôt.
Le lancement manuel exige `workflow_dispatch` dans le workflow.

---

## GitHub Actions : suivre

Remplacer `123456789` par un identifiant retourné par `gh run list`.

```shell
gh run watch 123456789 --exit-status
gh run view 123456789 --log-failed
gh run rerun 123456789 --failed
gh run download 123456789 --dir artifacts
```

`watch --exit-status` signale un échec via le code de sortie.
Le téléchargement suppose des artefacts publiés par le workflow.

---

## GitHub Actions : mettre à jour

Vérifier la version de GitHub CLI avec `gh --version`, puis la mettre à jour :

- Windows (WinGet) : `winget upgrade --id GitHub.cli --source winget`
- macOS (Homebrew) : `brew upgrade gh`
- Debian/Ubuntu (APT) : `sudo apt update && sudo apt install gh`

Faire proposer les nouvelles versions des actions (`uses:`) par Dependabot,
dans `.github/dependabot.yml` :

```yaml
version: 2
updates:
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"
```
