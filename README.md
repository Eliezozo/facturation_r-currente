# BillApp

SaaS de facturation recurrente avec interface Inertia + React + TypeScript, design Netflix Dark.

## Stack

- Laravel 12
- Inertia.js
- React + TypeScript
- Tailwind CSS
- Fortify (auth)
- SQLite (local)

## Fonctionnalites principales

- Gestion des plans de facturation (`month` / `year`)
- Souscription utilisateur
- Generation automatique de facture
- Historique de facturation
- Annulation d'abonnement
- Edition du profil utilisateur
- Commande de billing recurrent (`app:run-billing`)
- Email de facture HTML dark mode

## Demarrage local

1. Installer les dependances:

```bash
composer install
npm install
```

2. Configurer l'environnement:

```bash
cp .env.example .env
php artisan key:generate
```

3. Migrer la base:

```bash
php artisan migrate
```

4. Lancer l'app:

```bash
npm run dev
php artisan serve
```

## Email en local (Mailpit)

Configurer `.env`:

```env
MAIL_MAILER=smtp
MAIL_HOST=127.0.0.1
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
```

Puis lancer Mailpit (ou equivalent) pour capturer les emails en local.

## Billing automatique

Commande manuelle:

```bash
php artisan app:run-billing
```

Scheduler (production):

```cron
* * * * * php /path/to/project/artisan schedule:run
```

## Documentation complete

Voir `docs/ARCHITECTURE.md` pour la description detaillee des modules, flux et conventions du projet.
