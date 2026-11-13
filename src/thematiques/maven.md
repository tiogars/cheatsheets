---
marp: true
theme: default
paginate: true
title: Maven
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

# Maven

Commandes depuis la racine du projet concerné.

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

## Maven : mettre à jour

Mettre à jour l'installation locale de Maven :

- SDKMAN! (macOS, Linux, WSL) : `sdk upgrade maven`
- macOS (Homebrew) : `brew upgrade maven`
- Archive (Windows) : extraire la nouvelle archive et mettre à jour `PATH`

Fixer la version du Maven Wrapper, puis repérer les plugins et dépendances obsolètes :

```shell
mvn wrapper:wrapper "-Dmaven=3.10.0"
mvn versions:display-plugin-updates
mvn versions:display-dependency-updates
```

`wrapper:wrapper` met à jour `.mvn/wrapper/maven-wrapper.properties` : versionner ce fichier.
