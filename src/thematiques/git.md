---
marp: true
theme: default
paginate: true
title: Git
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

# Git

Suivre les modifications, gérer les branches et collaborer.

---

## Git : examiner un dépôt

Site de référence : [Git](https://git-scm.com/)
Documentation : [Documentation Git](https://git-scm.com/docs)

**Prérequis :** Git 2.23+, dépôt local existant et identité de commit configurée.

```shell
git --version
git status --short
git --no-pager diff
git --no-pager log --oneline -5
```

`status` inclut les fichiers non suivis ; `diff` montre les modifications
non indexées des fichiers suivis.

---

## Git : créer une branche et valider

Depuis la branche de départ choisie, avec `README.md` modifié :

```shell
git switch -c feature/ma-fonctionnalite
git add README.md
git --no-pager diff --cached
git commit -m "Décrire la modification"
```

`add` prépare le contenu du prochain commit.
Vérifier `diff --cached` avant de valider.

Adapter le nom de la branche, le fichier et le message de commit.

---

## Git : synchroniser

**Prérequis :** dépôt distant `origin` configuré et accessible.
Publier la branche et définir son suivi :

```shell
git remote -v
git push -u origin feature/ma-fonctionnalite
```

Ensuite, sur cette branche et avec un arbre de travail propre :

```shell
git pull --ff-only
git push
```

`--ff-only` refuse une mise à jour si les historiques ont divergé :
analyser la situation plutôt que forcer le push.

---

## Git : préserver les modifications

Retirer un fichier de l'index sans modifier son contenu :

```shell
git restore --staged README.md
```

Mettre des modifications en cours de côté, puis les réappliquer :

```shell
git stash push -u -m "Travail en cours"
git stash list
git stash apply "stash@{0}"
```

`-u` inclut les fichiers non suivis, mais pas les fichiers ignorés.
`apply` conserve le stash ; résoudre les conflits avant de continuer.

---

## Git : mettre à jour

Vérifier la version installée avec `git --version`, puis la mettre à jour selon l'installation :

- Git for Windows : `git update-git-for-windows`
- macOS (Homebrew) : `brew upgrade git`
- Debian/Ubuntu (APT) : `sudo apt update && sudo apt install --only-upgrade git`

Sous Windows, fermer les terminaux et éditeurs qui utilisent Git avant la mise à jour.
Les dépôts locaux et la configuration (`~/.gitconfig`) sont conservés.
