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

Maven / pnpm / Vitest / Storybook / Marp

.NET / GitHub Actions / Azure DevOps / MUI

Commandes depuis la racine du projet concerné.
Noms de projets, workflows et identifiants à adapter.

---

## Maven : compiler et tester

**Versions de référence (11 novembre 2026) :** JDK 25.0.5 (LTS) et Apache Maven 3.10.0.

**Prérequis :** JDK et Maven installés, projet avec `pom.xml`.

```shell
mvn --version
mvn clean compile
mvn test
mvn "-Dtest=UserServiceTest" test
mvn clean verify
mvn install
```

`verify` inclut les contrôles configurés jusqu'à cette phase.
`install` ajoute les artefacts au dépôt Maven local.

---

## Maven : diagnostiquer

Dépendances et configuration effective :

```shell
mvn dependency:tree
mvn help:effective-pom
mvn help:active-profiles
```

Module et profil à adapter ; dernière commande pour Spring Boot :

```shell
mvn -pl api -am verify
mvn -Pproduction package
mvn spring-boot:run
```

---

## pnpm : gérer les paquets

**Versions de référence (11 novembre 2026) :** Node.js 26.13.0 (LTS) et pnpm 12.18.0.

**Prérequis :** Node.js et pnpm installés.
Documentation : [Fast, disk space efficient package manager | pnpm](https://pnpm.io/fr)
Exemples de paquets : Axios 1.21.1 et TypeScript 7.0.2.
Pourquoi pnpm : [Motivation | pnpm](https://pnpm.io/fr/motivation)

```shell
pnpm --version
pnpm install
pnpm add axios
pnpm add -D typescript
pnpm remove axios
pnpm list --depth 0
pnpm why react
```

`add -D` déclare une dépendance de développement.

---

## pnpm : scripts et workspace

Scripts à définir dans `package.json` :

```shell
pnpm run dev
pnpm run build
pnpm run test
```

CI, paquet du workspace et exécution récursive :

```shell
pnpm install --frozen-lockfile
pnpm --filter mon-app run build
pnpm -r run test
pnpm exec tsc --noEmit
```

`tsc` nécessite TypeScript et un `tsconfig.json` adapté.

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

---

## Storybook : initialiser

Documentation : [Storybook: Frontend workshop for UI development](https://storybook.js.org/)
**Versions de référence (11 novembre 2026) :** Storybook 10.6.7, Node.js 26.13.0 (LTS) et pnpm 12.18.0.
Depuis un projet frontend existant, avec Node.js et pnpm :

```shell
pnpm create storybook@latest
pnpm run storybook
```

Choisir le framework lors de l'initialisation.
Le serveur s'ouvre habituellement sur `http://localhost:6006`.

Port personnalisé via le script généré :

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

La première commande utilise le script généré.
La seconde est une alternative avec un dossier explicite.

Prévisualiser la sortie par défaut :

```shell
pnpm dlx serve storybook-static --listen 6006
```

---

## .NET : créer et exécuter

**Versions de référence (11 novembre 2026) :** SDK .NET 11.0.100 (STS) et 10.0.404 (LTS).

**Prérequis :** SDK .NET installé.

```shell
dotnet --info
dotnet new list
dotnet new webapi -n Demo.Api
dotnet restore Demo.Api
dotnet build Demo.Api --no-restore
dotnet run --project Demo.Api
```

Rechargement pendant le développement :

```shell
dotnet watch --project Demo.Api run
```

---

## .NET : tester et publier

Créer un projet xUnit et référencer l'API :

```shell
dotnet new xunit -n Demo.Tests
dotnet add Demo.Tests reference Demo.Api
dotnet test Demo.Tests
dotnet test Demo.Tests --filter "FullyQualifiedName~UserTests"
```

Publication Release et dépendances obsolètes :

```shell
dotnet publish Demo.Api -c Release -o artifacts/api
dotnet list Demo.Api package --outdated
```

Le filtre suppose que des tests `UserTests` ont été ajoutés.

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

## Azure DevOps : configurer

**Versions de référence (11 novembre 2026) :** Azure CLI 2.92.0, extension Azure DevOps 1.0.10.

**Prérequis :** Azure CLI et accès à l'organisation Azure DevOps.

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

Reprendre la configuration de la slide précédente.
Remplacer `42` par l'ID de pipeline et `1234` par l'ID d'exécution.

```shell
az pipelines runs list --pipeline-ids 42 --top 5 -o table
az pipelines runs show --id 1234 --output table
az pipelines runs show --id 1234 --open
az pipelines runs artifact list --run-id 1234 -o table
az pipelines runs artifact download --run-id 1234 --artifact-name drop --path artifacts
```

`--open` ouvre le suivi et les logs dans le navigateur.
`drop` doit correspondre à un artefact publié par la pipeline.

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
