# BillApp - Guide Architecture et Implementation

## 1. Vision produit

BillApp est une application SaaS de facturation recurrente avec une experience utilisateur moderne (theme Netflix Dark), permettant:

- l'abonnement a un plan
- la generation de factures a l'inscription puis a chaque echeance
- l'envoi d'emails de facture
- le suivi de l'historique des paiements

## 2. Architecture technique

### Backend

- Framework: Laravel 12
- Pattern: MVC + Eloquent ORM
- Auth: Fortify
- Scheduling: Laravel Scheduler
- Mail: Laravel Mail (`Mailable` + template Blade)

### Frontend

- Inertia.js pour la liaison backend/frontend
- React + TypeScript pour les pages
- Tailwind CSS pour le styling

### Donnees

- Base locale: SQLite (en dev)
- Relations principales: User -> Subscriptions / Invoices

## 3. Modele de donnees

### `plans`

- `id`
- `name`
- `price_xof`
- `frequency` (`month|year`)
- `timestamps`

### `subscriptions`

- `id`
- `user_id`
- `plan_id`
- `billing_period` (`month|year`)
- `status` (`active|cancelled`)
- `next_billing_at`
- `timestamps`

### `invoices`

- `id`
- `user_id`
- `amount`
- `reference` (unique, format `INV-XXXX`)
- `billed_at`
- `timestamps`

## 4. Logique metier

### 4.1 Souscription (`SubscriptionController@store`)

- Valide `plan_id` et `billing_period`
- Verifie l'absence d'abonnement actif
- Verifie coherence `plan.frequency == billing_period`
- Cree l'abonnement + facture initiale dans une transaction DB
- Calcule `next_billing_at` avec:
  - `addMonthNoOverflow()`
  - `addYearNoOverflow()`
- Tente l'envoi de l'email facture (`try/catch` pour eviter 500 HTTP)

### 4.2 Annulation (`SubscriptionController@cancel`)

- Recuperation de l'abonnement actif
- Passage du statut a `cancelled`

### 4.3 Billing recurrent (`RunBillingCommand`)

- Recherche abonnements actifs arrives a echeance (`next_billing_at <= now()`)
- Cree une nouvelle facture pour chaque abonnement du
- Met a jour `next_billing_at` selon la recurrence (sans overflow)
- Envoie l'email facture (protege par `try/catch` + log)

## 5. UX et pages

### 5.1 Welcome (`resources/js/pages/welcome.tsx`)

- Landing streaming premium
- Animations modernes
- Hero video + carrousel

### 5.2 Dashboard (`resources/js/pages/dashboard.tsx`)

- Etat non-abonne:
  - formulaire de souscription
  - recapitulatif dynamique
- Etat abonne:
  - badge actif
  - details plan
  - annulation abonnement
- Historique des factures visible dans tous les cas
- Actions UI:
  - retour accueil
  - mon profil
  - deconnexion
  - retour page precedente apres confirmation

### 5.3 Auth

- Pages login/register redesign en dark premium
- Pages auth traduites en francais

### 5.4 Profil utilisateur

- Edition du profil sur `/settings/profile`
- Accessible depuis le Dashboard via `MON PROFIL`

## 6. Identite visuelle et logo

- Logo unique centralise via:
  - `resources/js/components/app-logo-icon.tsx`
  - `resources/js/components/app-logo.tsx`
- Meme logo applique aux pages principales
- Email facture harmonise avec logo inline SVG

## 7. Emailing

### Mailable

- Classe: `app/Mail/InvoiceMail.php`
- Type date: `CarbonInterface` (compatible mutable/immutable)

### Template

- `resources/views/emails/invoice.blade.php`
- HTML dark mode, montant FCFA, reference facture, date, branding BillApp

### Config locale conseillee

```env
MAIL_MAILER=smtp
MAIL_HOST=127.0.0.1
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
```

Important:

- `MAIL_MAILER=log` n'envoie pas de vrais emails
- ne jamais mettre le port dans `MAIL_HOST`

## 8. Scheduling et exploitation

### En dev

- Commande manuelle:

```bash
php artisan app:run-billing
```

### En production

- Cron minute:

```cron
* * * * * php /path/to/project/artisan schedule:run
```

## 9. Qualite et tests

Tests utilises:

- Auth (connexion, inscription, reset, verification)
- Dashboard
- Profile settings
- Flux souscription/date (`SubscriptionFlowTest`)

Commandes utiles:

```bash
php artisan test
npm run build
```

## 10. Conventions implementation

- TypeScript pour les types des props/donnees frontend
- Format montant frontend:

```ts
new Intl.NumberFormat('fr-FR').format(value)
```

- Transactions DB pour operations sensibles (souscription + facture)
- Gestion defensive du mail (pas de crash utilisateur si SMTP indisponible)
- Respect strict de la recurrence calendrier (NoOverflow)

## 11. Roadmap recommandee

1. Ajouter dashboard analytics (MRR, total facture, churn)
2. Introduire queue worker pour mails async en prod
3. Ajouter webhooks provider mail (bounce, deliverability)
4. Ajouter tests E2E sur flux complet souscription -> facture -> email
5. Mettre en place RBAC admin pour gestion des plans
