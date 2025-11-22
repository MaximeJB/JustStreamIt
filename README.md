# JustStreamIt - Interface Web de Films

#### Description du Projet:  
**JustStreamIt** est une interface web développée dans le cadre d'une formation en développement front-end (**Projet #6 OpenClassroom**).  
Cette application permet aux utilisateurs de découvrir et explorer une vaste collection de films grâce à une interface responsive.
L'objectif principal était de créer une vitrine de films attractive qui présente les contenus les mieux notés selon différentes catégories, tout en offrant une expérience utilisateur fluide sur tous types d'appareils.

## Responsive Design
L'interface s'adapte intelligemment à différentes tailles d'écran :

Version Mobile : Affichage de 2 films par section avec possibilité de voir les 4 autres  
Version Tablette : Présentation de 4 films visibles avec 2 films masqués  
Version Ordinateur : Affichage complet des 6 films par catégorie

## Technologies Utilisées

HTML5 : Structure sémantique et accessible  
CSS3 : Styles personnalisés avec approche mobile-first  
JavaScript : Logique applicative sans framework externe  
API REST : Communication avec OCMovies-API via fetch()  

## 📦 Prérequis

- **Python 3.6+** (pour l'API backend uniquement)
- **Un navigateur web moderne** (Chrome, Firefox, Safari, Edge)

**Note importante :** JustStreamIt est un projet front-end **sans dépendances à installer**. Tous les fichiers sont statiques (HTML/CSS/JS) et Bootstrap est chargé via CDN.

---

## 🚀 Comment Démarrer le Projet

JustStreamIt utilise une **API backend séparée** (OCMovies-API) pour récupérer les données des films. L'API doit être clonée dans le dossier JustStreamIt et démarrée en parallèle.

**Structure finale du projet :**
```
JustStreamIt/
├── index.html
├── scripts.js
├── custom.css
├── ...
└── OCMovies-API-EN-FR/     ← API à cloner ici
    ├── manage.py
    ├── requirements.txt
    └── ...
```

---

### Étape 1 : Installer l'API Backend (OCMovies-API)

#### 1.1 Cloner l'API dans le dossier JustStreamIt

Ouvrez un terminal dans le dossier JustStreamIt, puis :

```bash
git clone https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR.git
```

Cela va créer un sous-dossier `OCMovies-API-EN-FR/` (déjà ignoré par Git grâce au `.gitignore`).

#### 1.2 Configurer et démarrer l'API

```bash
cd OCMovies-API-EN-FR
```

**Windows :**
```bash
python -m venv env
env\Scripts\activate
pip install -r requirements.txt
python manage.py create_db
python manage.py runserver
```

**macOS / Linux :**
```bash
python3 -m venv env
source env/bin/activate
pip install -r requirements.txt
python manage.py create_db
python manage.py runserver
```

✅ **Vérification :** L'API est prête quand vous voyez :
```
Starting development server at http://127.0.0.1:8000/
```

Testez en accédant à [http://localhost:8000/api/v1/titles](http://localhost:8000/api/v1/titles) dans votre navigateur.

⚠️ **Important :** Gardez ce terminal ouvert avec le serveur en cours d'exécution.

---

### Étape 2 : Lancer JustStreamIt

JustStreamIt est un projet **100% statique** - aucune installation requise !

#### 2.1 Ouvrir un nouveau terminal

Ouvrez un **nouveau terminal** dans le dossier JustStreamIt (pas dans OCMovies-API-EN-FR) :

```bash
cd ..
```

Si vous étiez dans `OCMovies-API-EN-FR/`, cette commande vous ramène dans `JustStreamIt/`.

#### 2.2 Démarrer l'application

**Option A : Ouverture directe (rapide mais peut causer des erreurs CORS)**

Double-cliquez sur `index.html` pour l'ouvrir dans votre navigateur.

**Option B : Serveur HTTP local (recommandé)**

Choisissez l'une des méthodes suivantes selon ce qui est installé sur votre machine :

**Avec Python :**
```bash
# Python 3
python -m http.server 8080

# Python 2
python -m SimpleHTTPServer 8080
```

**Avec Node.js :**
```bash
npx http-server -p 8080
```

**Avec PHP :**
```bash
php -S localhost:8080
```

**Avec VS Code :**
- Installez l'extension "Live Server"
- Clic droit sur `index.html` → "Open with Live Server"

Puis ouvrez votre navigateur à l'adresse : **http://localhost:8080**

🎉 **C'est prêt !** Les films devraient se charger automatiquement.

---

## 📂 Structure du Projet

```
JustStreamIt/
├── index.html          # Page principale
├── scripts.js          # Logique JavaScript (API calls, affichage)
├── custom.css          # Styles personnalisés et responsive
├── favicon.png         # Icône du site
├── logo.png            # Logo JustStreamIt
├── placeholder.png     # Image de remplacement
├── .gitignore          # Fichiers ignorés par Git
└── README.md           # Ce fichier
```

**Aucun fichier de configuration** (pas de package.json, pas de build, pas de node_modules).

---

## 🔧 Configuration

L'URL de l'API est définie dans `scripts.js` ligne 2 :

```javascript
const API_BASE = "http://localhost:8000/api/v1";
```

Si vous devez changer cette URL (autre port, déploiement distant), modifiez cette constante.

---

## 🐛 Dépannage

### ❌ Erreur : "Failed to fetch"

**Cause :** L'API n'est pas démarrée.

**Solution :** Vérifiez que le serveur API tourne sur http://localhost:8000

### ❌ Erreur : CORS / Cross-Origin

**Cause :** Vous avez ouvert `index.html` directement (protocole `file://`).

**Solution :** Utilisez un serveur HTTP local (voir Étape 2, Option B).

### ❌ Aucun film ne s'affiche

**Solutions :**
1. Ouvrez la console navigateur (F12)
2. Vérifiez l'onglet "Network" pour voir les requêtes
3. Testez manuellement l'API : http://localhost:8000/api/v1/titles

### ℹ️ Images manquantes

Les posters sont fournis par l'API. Si une image manque, un placeholder gris apparaît automatiquement.

---

## 📖 Utilisation

1. **Chargement initial** : Le meilleur film, films les mieux notés, Mystery et Fantasy s'affichent
2. **Détails d'un film** : Cliquez sur un film pour voir ses informations complètes
3. **Voir plus** : Cliquez sur "Voir plus" pour charger des films supplémentaires
4. **Catégorie personnalisée** : Sélectionnez un genre dans "Autres" et cliquez sur "Charger"

---

## 🌐 Compatibilité

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 📝 Contraintes Techniques Respectées

- Standards W3C (HTML sémantique)
- CSS moderne (Grid, Flexbox, media queries)
- JavaScript ES6+ (async/await, fetch API)
- Approche Mobile-First
- Accessibilité (alt, ARIA)
