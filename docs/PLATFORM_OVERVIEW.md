# BillApp — Documentation technique et utilisateur

## 1. Vue d'ensemble

BillApp est une application SaaS de facturation récurrente construite avec :
- **Laravel 12** pour le backend
- **Inertia.js + React + TypeScript** pour l'interface utilisateur
- **Tailwind CSS** pour le design
- **Fortify** pour l'authentification et la sécurité

La plateforme gère :
- plans de tarification (`minute`, `month`, `year`)
- souscriptions utilisateur
- facturation automatique
- envoi d'emails de facture
- administration des abonnements

## 2. Architecture technique

### 2.1 Structure principale

- `routes/web.php` : routes utilisateur et administrateur
- `app/Http/Controllers/` : logique de contrôleurs
  - `DashboardController` : charge les plans, l'abonnement actif et les factures d'un utilisateur
  - `SubscriptionController` : création et annulation d'abonnement
  - `AdminSubscriptionController` : interface d'administration des abonnements
- `resources/js/pages/` : pages Inertia / React
  - `dashboard.tsx` : interface client
  - `admin/subscriptions.tsx` : interface d'administration
- `resources/views/app.blade.php` : template Inertia principal
- `bootstrap/app.php` : configuration middleware et routes

### 2.2 Données et modèles

- `app/Models/User.php` : utilisateur authentifié
  - relations : `subscriptions()`, `invoices()`
  - méthode `isAdmin()` pour vérifier le rôle administrateur
- `app/Models/Subscription.php` : abonnement utilisateur
  - champs : `user_id`, `plan_id`, `billing_period`, `status`, `next_billing_at`
- `app/Models/Invoice.php` : facture générée
- `app/Models/Plan.php` : plan de facturation

### 2.3 Middleware admin

Un middleware `App\Http\Middleware\EnsureAdmin` a été ajouté pour restreindre l'accès aux pages administrateur.
La route admin est maintenant protégée par le middleware `admin`.

### 2.4 Authentification et sécurité

- Fortify gère les pages de login, enregistrement, mot de passe oublié, validation d'email et 2FA.
- Les pages protégées utilisent le middleware `auth` et `verified`.
- La page d'administration ajoute `admin` pour restreindre l'accès uniquement aux administrateurs.

## 3. Flux fonctionnel

### 3.1 Création d'un abonnement

1. L'utilisateur se connecte.
2. Il choisit un plan dans `dashboard.tsx`.
3. La page envoie `POST /subscriptions`.
4. `SubscriptionController::store()` valide le plan et crée un abonnement actif.
5. Une facture (`Invoice`) est créée et un email de facturation est envoyé.

### 3.2 Annulation d'un abonnement

1. L'utilisateur clique sur le bouton d'annulation.
2. La page envoie `PATCH /subscriptions/cancel`.
3. `SubscriptionController::cancel()` met à jour le statut en `cancelled`.

### 3.3 Administration des abonnements

1. L'administrateur se connecte.
2. Il accède à `/admin/subscriptions`.
3. `AdminSubscriptionController::index()` charge :
   - la liste de tous les abonnements
   - les informations utilisateur et plan
   - les statistiques et tendances de revenus
4. L'administrateur peut changer le statut d'un abonnement avec `PATCH /admin/subscriptions/{subscription}/status`.

## 4. Base de données

### 4.1 Tables principales

- `users`
  - champ ajouté : `is_admin` (booléen)
- `plans`
- `subscriptions`
- `invoices`

### 4.2 Migration d'administration

Une migration `2026_05_10_000000_add_is_admin_to_users_table.php` a été ajoutée pour créer le champ `is_admin`.

## 5. Utilisation

### 5.1 Lancement en local

```bash
composer install
npm install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed
npm run dev
php artisan serve
```

### 5.2 Compte administrateur

Le seeder crée un compte administrateur par défaut :
- email : `admin@example.com`
- rôle : `is_admin = true`

### 5.3 Accès administrateur

- URL admin : `/admin/subscriptions`
- Cette page n'est accessible qu'aux utilisateurs avec `is_admin = true`.

## 6. Points importants

- La page `dashboard` reste accessible à tous les utilisateurs authentifiés.
- L'administration est uniquement visible si l'utilisateur a le rôle admin.
- Les graphiques de la page admin calculent les parts d'abonnements et le revenu par période.

## 7. Pistes d'amélioration

- Ajouter un rôle plus complet (`roles` / `permissions`).
- Créer un panneau admin global avec statistiques utilisateurs.
- Ajouter pagination et filtres sur la liste d'abonnements.
- Gérer l'expiration des souscriptions et la facturation récurrente automatique.
