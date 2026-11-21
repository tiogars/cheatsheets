---
marp: true
theme: default
paginate: true
title: Restic
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

# Restic

Sauvegarder, chiffrer et restaurer des données avec Restic.

---

## Restic : installer

Documentation : [Installation](https://restic.readthedocs.io/en/stable/020_installation.html)

Restic peut être installé avec le gestionnaire de paquets ou depuis une archive
contenant l'exécutable officiel.

```shell
# Debian/Ubuntu
sudo apt update
sudo apt install restic

# Windows
winget install restic.restic

# macOS
brew install restic
```

Vérifier l'exécutable avant la configuration :

```shell
restic version
```

---

## Restic : préparer un dépôt

Documentation : [Préparer un dépôt](https://restic.readthedocs.io/en/stable/030_preparing_a_new_repo.html)

Créer un dossier dédié, puis initialiser le dépôt avec un mot de passe :

```shell
mkdir -p /srv/restic-repo
export RESTIC_PASSWORD="mot-de-passe-long-et-secret"
export RESTIC_REPOSITORY="/srv/restic-repo"
restic init
```

Conserver le mot de passe hors du dépôt. Sans lui, les données ne peuvent pas être déchiffrées.
Pour un stockage distant, adapter `RESTIC_REPOSITORY`, par exemple `sftp:user@host:/srv/restic-repo`.

---

## Restic : sauvegarder

Créer une première sauvegarde et observer les instantanés :

```shell
restic backup /srv/data
restic backup --exclude-caches --exclude-file .restic-excludes /srv/data
restic snapshots
```

Exemple de fichier `.restic-excludes` :

```text
/srv/data/cache
*.tmp
*.log
```

Les sauvegardes suivantes ne transmettent que les blocs modifiés.
Ajouter des balises pour retrouver facilement les sauvegardes :

```shell
restic backup --tag documents /srv/data/documents
```

---

## Restic : restaurer

Lister les instantanés, choisir son ID, puis restaurer :

```shell
restic snapshots
restic restore latest --target /tmp/restic-restore
restic restore <snapshot-id> --target /srv/restore
```

Pour restaurer seulement un chemin :

```shell
restic restore latest --target /tmp/restic-restore \
  --include /srv/data/documents
```

Ne pas restaurer par-dessus les données actives sans vérification préalable.
Comparer le contenu restauré avant remplacement.

---

## Restic : contrôler et nettoyer

Vérifier la structure du dépôt sans lire tous les blocs :

```shell
restic check
restic check --read-data
```

Afficher les règles de conservation puis supprimer les instantanés obsolètes :

```shell
restic forget --dry-run \
  --keep-daily 7 --keep-weekly 5 --keep-monthly 12
restic forget --keep-daily 7 --keep-weekly 5 --keep-monthly 12 --prune
```

Toujours tester `--dry-run`, puis conserver une sauvegarde hors ligne
pour la récupération après perte ou panne du dépôt.

---

## Restic : automatiser sans secret

Conserver le mot de passe dans un gestionnaire de secrets ou un fichier protégé :

```shell
export RESTIC_PASSWORD_FILE="/root/.config/restic/password"
export RESTIC_REPOSITORY="/srv/restic-repo"

restic backup /srv/data
restic check
restic forget --keep-daily 7 --keep-weekly 5 --keep-monthly 12 --prune
```

Réserver `chmod 600` au fichier du mot de passe et ne pas inclure de secret
dans un script versionné ou un fichier de planification.

Exemple de planification quotidienne avec cron :

```cron
0 2 * * * RESTIC_PASSWORD_FILE=/root/.config/restic/password RESTIC_REPOSITORY=/srv/restic-repo restic backup /srv/data
```
