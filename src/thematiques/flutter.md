---
marp: true
theme: default
paginate: true
title: Flutter
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

# Flutter

Créer des applications multiplateformes avec Flutter et Dart.

---

## Flutter : démarrer

Site de référence : [Flutter](https://flutter.dev/)
Documentation : [Documentation Flutter](https://docs.flutter.dev/)

**Prérequis :** SDK Flutter installé (Dart inclus) et outils de la plateforme ciblée.

```shell
flutter --version
flutter doctor
flutter create mon_app
cd mon_app
```

Corriger les prérequis signalés par `flutter doctor` pour la plateforme visée.
Les commandes suivantes s'exécutent depuis la racine du projet.

---

## Flutter : exécuter

Avec un appareil connecté ou un émulateur lancé :

```shell
flutter devices
flutter run
```

Alternative web, avec Chrome installé :

```shell
flutter run -d chrome
```

En mode débogage : `r` recharge à chaud, `R` redémarre
et `q` arrête l'exécution.

---

## Flutter : dépendances et tests

Ajouter un paquet, récupérer les dépendances et vérifier les mises à jour :

```shell
flutter pub add http
flutter pub get
flutter pub outdated
```

Formater le code, l'analyser et lancer les tests unitaires et de widgets :

```shell
dart format .
flutter analyze
flutter test
```

---

## Flutter : compiler

Choisir la commande correspondant à la plateforme ciblée :

```shell
flutter build apk --release
flutter build appbundle --release
flutter build web --release
flutter build ipa --release
```

- **Android :** SDK Android requis ; configurer la signature avant publication.
- **Web :** les fichiers générés se trouvent dans `build/web`.
- **iOS :** macOS, Xcode et une configuration de signature sont nécessaires.

---

## Flutter : mettre à jour

Mettre à jour le SDK Flutter, Dart inclus, sur le canal courant :

```shell
flutter channel
flutter upgrade
```

Puis, depuis la racine du projet :

```shell
flutter pub upgrade
flutter pub upgrade --major-versions
dart fix --apply
flutter test
```

`--major-versions` modifie les contraintes de `pubspec.yaml`.
Consulter les [changements incompatibles](https://docs.flutter.dev/release/breaking-changes)
et vérifier les modifications de `dart fix` avant de les valider.
