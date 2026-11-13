---
marp: true
theme: default
paginate: true
title: Python
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

# Python

Exécuter des scripts, gérer les dépendances et tester.

---

## Python : exécuter

Documentation : [Documentation de Python 3.15.2](https://docs.python.org/3/)
Site de référence : [Python.org](https://www.python.org/)

**Version de référence (11 novembre 2026) :** Python 3.15.2.

**Prérequis :** Python 3 installé. Utiliser `python3` si nécessaire sous macOS/Linux.

```shell
python --version
python script.py
python -c "print('Bonjour !')"
```

`script.py` doit exister. `python` seul ouvre l'interpréteur interactif ;
`exit()` permet de le quitter.

---

## Python : isoler le projet

Créer et activer un environnement virtuel sous Windows (PowerShell) :

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

Sous macOS/Linux (bash, zsh) :

```shell
python3 -m venv .venv
source .venv/bin/activate
```

Une fois activé, `python` et `python -m pip` ciblent cet environnement.
`deactivate` permet d'en sortir. Ne pas versionner `.venv`.

---

## Python : gérer les paquets

Dans l'environnement virtuel activé :

```shell
python -m pip install requests
python -m pip install --upgrade requests
python -m pip list
python -m pip check
python -m pip uninstall requests
```

Installer les dépendances depuis un fichier `requirements.txt` existant :

```shell
python -m pip install -r requirements.txt
```

---

## Python : lancer les tests

**Prérequis :** des tests `unittest` existants dans le dossier `tests`.
`unittest` fait partie de la bibliothèque standard de Python.

Découvrir et exécuter tous les fichiers `test_*.py` :

```shell
python -m unittest discover -s tests -v
```

Cibler un fichier de tests :

```shell
python -m unittest discover -s tests -p "test_calcul.py" -v
```

Adapter `tests` et `test_calcul.py` au projet.
L'option `-v` affiche le détail des tests exécutés.

---

## Python : mettre à jour

Sous Windows, avec le gestionnaire d'installation Python :

```powershell
py list
py install --update
```

`--update` met à jour les versions gérées par `py` ; `py install 3.15` installe une version précise.
Sous macOS/Linux, utiliser l'installateur de python.org, Homebrew ou le gestionnaire de paquets.

Après un changement de version mineure, désactiver puis recréer `.venv`,
le réactiver et réinstaller les dépendances :

```shell
python -m venv --clear .venv
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```
