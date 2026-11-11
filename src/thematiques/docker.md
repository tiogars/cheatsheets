---
marp: true
theme: default
paginate: true
title: Docker
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

# Docker

Exécuter des conteneurs, construire des images et utiliser Docker Compose.

---

## Docker : démarrer

Site de référence : [Docker](https://www.docker.com/)
Documentation : [Documentation Docker](https://docs.docker.com/)

**Prérequis :** Docker installé, moteur démarré et conteneurs Linux activés.

```shell
docker version
docker pull nginx:alpine
docker run --name demo-web -d -p 127.0.0.1:8080:80 nginx:alpine
```

Le site est accessible sur `http://localhost:8080`, uniquement depuis l'hôte.
Adapter le nom du conteneur et le port s'ils sont déjà utilisés.

---

## Docker : suivre un conteneur

Lister les conteneurs, lire les journaux et ouvrir un shell :

```shell
docker ps -a
docker logs --tail 50 demo-web
docker exec -it demo-web sh
```

Quitter le shell avec `exit`, puis arrêter ou relancer le conteneur :

```shell
docker stop demo-web
docker start demo-web
```

`stop` et `start` réutilisent le même conteneur sans le supprimer.

---

## Docker : construire une image

**Prérequis :** `Dockerfile` existant à la racine du projet ;
application écoutant sur `0.0.0.0:8080` dans le conteneur.

```shell
docker build -t mon-app:dev .
docker image ls
docker run --rm -p 127.0.0.1:8081:8080 mon-app:dev
```

`--rm` supprime le conteneur à son arrêt.
Conserver les données persistantes dans un volume.

Utiliser `.dockerignore` pour exclure les fichiers inutiles et les secrets
du contexte de construction.

---

## Docker : utiliser Compose

**Prérequis :** Docker Compose installé et fichier `compose.yaml` existant.
Exécuter les commandes depuis le dossier contenant ce fichier :

```shell
docker compose config --quiet
docker compose up -d --build
docker compose ps
docker compose logs --tail 50
docker compose down
```

**Attention :** `down` supprime les conteneurs et réseaux du projet.
Les volumes nommés sont conservés, mais pas les données stockées uniquement
dans les conteneurs.
