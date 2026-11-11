---
marp: true
theme: default
paginate: true
title: Snowflake
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

# Snowflake

Interroger et charger des données dans Snowflake.

---

## Snowflake : choisir le contexte

Site de référence : [Snowflake](https://www.snowflake.com/)
Documentation : [Documentation Snowflake](https://docs.snowflake.com/)

**Prérequis :** compte Snowflake, accès SQL via Snowsight et objets de test autorisés.

```sql
USE ROLE MON_ROLE;
USE WAREHOUSE MON_WH;
USE DATABASE MON_DB;
USE SCHEMA MON_SCHEMA;
SELECT CURRENT_ROLE(), CURRENT_WAREHOUSE(), CURRENT_DATABASE(), CURRENT_SCHEMA();
```

Adapter `MON_ROLE`, `MON_WH`, `MON_DB` et `MON_SCHEMA`
à des rôles et objets existants.

---

## Snowflake : explorer les données

Lister les objets visibles par le rôle actif :

```sql
SHOW DATABASES;
SHOW SCHEMAS IN DATABASE MON_DB;
SHOW TABLES IN SCHEMA MON_DB.MON_SCHEMA;
DESCRIBE TABLE MON_DB.MON_SCHEMA.MA_TABLE;
```

Lire un extrait d'une table existante :

```sql
SELECT * FROM MON_DB.MON_SCHEMA.MA_TABLE LIMIT 10;
```

Adapter `MA_TABLE` et vérifier les droits de lecture sur cette table.

---

## Snowflake : charger un CSV

**Prérequis :** `clients.csv` (en-tête `ID,NOM`) déposé dans le stage `MON_STAGE`,
avec les droits de lecture du stage et d'accès au schéma.

```sql
CREATE TEMP TABLE TMP_CLIENTS_DEMO (ID NUMBER, NOM VARCHAR);
COPY INTO TMP_CLIENTS_DEMO FROM @MON_STAGE
FILES = ('clients.csv')
FILE_FORMAT = (TYPE = CSV SKIP_HEADER = 1
               FIELD_OPTIONALLY_ENCLOSED_BY = '"')
ON_ERROR = 'ABORT_STATEMENT';
SELECT * FROM TMP_CLIENTS_DEMO LIMIT 10;
```

La table temporaire est limitée à la session courante.
Une erreur de chargement interrompt l'instruction `COPY INTO`.

---

## Snowflake : suivre le calcul

Consulter les dernières requêtes de la session (durées en millisecondes) :

```sql
SELECT QUERY_ID, EXECUTION_STATUS, TOTAL_ELAPSED_TIME
FROM TABLE(INFORMATION_SCHEMA.QUERY_HISTORY_BY_SESSION(RESULT_LIMIT => 5))
ORDER BY START_TIME DESC;
```

Sur un entrepôt de test, avec le droit `MODIFY` :

```sql
ALTER WAREHOUSE MON_WH SET AUTO_SUSPEND = 60 AUTO_RESUME = TRUE;
```

Auto-suspension après inactivité (seuil de 60 secondes), reprise au besoin.
Un entrepôt démarré consomme des crédits, même sans requête en cours.
