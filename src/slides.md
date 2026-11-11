---
marp: true
theme: default
paginate: true
title: Cheatsheets
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

# Cheatsheets

Maven / pnpm / Storybook / .NET

GitHub Actions / Azure DevOps / MUI

Commandes depuis la racine du projet concerne.
Noms de projets, workflows et identifiants a adapter.

---

## Maven : compiler et tester

**Prerequis :** JDK et Maven installes, projet avec `pom.xml`.

```shell
mvn --version
mvn clean compile
mvn test
mvn "-Dtest=UserServiceTest" test
mvn clean verify
mvn install
```

`verify` inclut les controles configures jusqu'a cette phase.
`install` ajoute les artefacts au depot Maven local.

---

## Maven : diagnostiquer

Dependances et configuration effective :

```shell
mvn dependency:tree
mvn help:effective-pom
mvn help:active-profiles
```

Module et profil a adapter ; derniere commande pour Spring Boot :

```shell
mvn -pl api -am verify
mvn -Pproduction package
mvn spring-boot:run
```

---

## pnpm : gerer les paquets

**Prerequis :** Node.js et pnpm installes.

```shell
pnpm --version
pnpm install
pnpm add axios
pnpm add -D typescript
pnpm remove axios
pnpm list --depth 0
pnpm why react
```

`add -D` declare une dependance de developpement.

---

## pnpm : scripts et workspace

Scripts a definir dans `package.json` :

```shell
pnpm run dev
pnpm run build
pnpm run test
```

CI, paquet du workspace et execution recursive :

```shell
pnpm install --frozen-lockfile
pnpm --filter mon-app run build
pnpm -r run test
pnpm exec tsc --noEmit
```

`tsc` necessite TypeScript et un `tsconfig.json` adapte.

---

## Storybook : initialiser

Depuis un projet frontend existant, avec Node.js et pnpm :

```shell
pnpm create storybook@latest
pnpm run storybook
```

Choisir le framework lors de l'initialisation.
Le serveur s'ouvre habituellement sur `http://localhost:6006`.

Port personnalise via le script genere :

```shell
pnpm run storybook --port 6007
```

---

## Storybook : exporter

Construire le catalogue statique :

```shell
pnpm run build-storybook
pnpm exec storybook build --output-dir dist/storybook
```

La premiere commande utilise le script genere.
La seconde est une alternative avec un dossier explicite.

Previsualiser la sortie par defaut :

```shell
pnpm dlx serve storybook-static --listen 6006
```

---

## .NET : creer et executer

**Prerequis :** SDK .NET installe.

```shell
dotnet --info
dotnet new list
dotnet new webapi -n Demo.Api
dotnet restore Demo.Api
dotnet build Demo.Api --no-restore
dotnet run --project Demo.Api
```

Rechargement pendant le developpement :

```shell
dotnet watch --project Demo.Api run
```

---

## .NET : tester et publier

Creer un projet xUnit et referencer l'API :

```shell
dotnet new xunit -n Demo.Tests
dotnet add Demo.Tests reference Demo.Api
dotnet test Demo.Tests
dotnet test Demo.Tests --filter "FullyQualifiedName~UserTests"
```

Publication Release et dependances obsoletes :

```shell
dotnet publish Demo.Api -c Release -o artifacts/api
dotnet list Demo.Api package --outdated
```

Le filtre suppose que des tests `UserTests` ont ete ajoutes.

---

## GitHub Actions : lancer

**Prerequis :** GitHub CLI (`gh`), acces au depot et workflow existant.

```shell
gh auth login
gh workflow list
gh workflow view ci.yml
gh workflow run ci.yml --ref main
gh run list --workflow ci.yml --limit 5
```

Executer depuis le clone du depot.
Le lancement manuel exige `workflow_dispatch` dans le workflow.

---

## GitHub Actions : suivre

Remplacer `123456789` par un identifiant retourne par `gh run list`.

```shell
gh run watch 123456789 --exit-status
gh run view 123456789 --log-failed
gh run rerun 123456789 --failed
gh run download 123456789 --dir artifacts
```

`watch --exit-status` signale un echec via le code de sortie.
Le telechargement suppose des artefacts publies par le workflow.

---

## Azure DevOps : configurer

**Prerequis :** Azure CLI et acces a l'organisation Azure DevOps.

```shell
az extension add --name azure-devops
az login
az devops configure --defaults organization=https://dev.azure.com/mon-org project=mon-projet
az pipelines list --output table
```

Lancer une pipeline existante sur une branche :

```shell
az pipelines run --name ma-pipeline --branch main
```

---

## Azure DevOps : suivre

Reprendre la configuration de la slide precedente.
Remplacer `42` par l'ID de pipeline et `1234` par l'ID d'execution.

```shell
az pipelines runs list --pipeline-ids 42 --top 5 -o table
az pipelines runs show --id 1234 --output table
az pipelines runs show --id 1234 --open
az pipelines runs artifact list --run-id 1234 -o table
az pipelines runs artifact download --run-id 1234 --artifact-name drop --path artifacts
```

`--open` ouvre le suivi et les logs dans le navigateur.
`drop` doit correspondre a un artefact publie par la pipeline.

---

## MUI : installer

Depuis une application React existante, avec pnpm :

```shell
pnpm add @mui/material @emotion/react @emotion/styled
pnpm add @mui/icons-material
```

Bibliotheques optionnelles pour tableaux et dates :

```shell
pnpm add @mui/x-data-grid
pnpm add @mui/x-date-pickers dayjs
```

Les selecteurs de date exigent un `LocalizationProvider`
et un adaptateur tel que `AdapterDayjs`.

---

## MUI : composants

Exemple React a placer dans un fichier `.tsx` ou `.jsx` :

```jsx
import { Button, Stack, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

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

Ajouter un gestionnaire `onSubmit` pour persister les donnees.
