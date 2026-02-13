import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import AppLogo from '@/components/app-logo';
import type { Auth, BillingInvoice, BillingPlan, BillingSubscription } from '@/types';

interface DashboardProps {
    plans: BillingPlan[];
    activeSubscription: BillingSubscription | null;
    invoices: BillingInvoice[];
}

interface SubscriptionForm {
    plan_id: number;
    billing_period: 'month' | 'year';
}

const formatMoney = (value: number) =>
    `${new Intl.NumberFormat('fr-FR').format(value)} FCFA`;

const periodLabel = (period: 'month' | 'year') =>
    period === 'year' ? 'ans' : 'mois';

export default function Dashboard({
    plans,
    activeSubscription,
    invoices,
}: DashboardProps) {
    const page = usePage<{
        auth: Auth;
        errors: Record<string, string>;
        flash?: {
            success?: string | null;
        };
    }>();
    const errors = page.props.errors ?? {};
    const successMessage = page.props.flash?.success;

    const defaultPlan = plans[0];
    const { data, setData, post, processing } = useForm<SubscriptionForm>({
        plan_id: defaultPlan?.id ?? 0,
        billing_period: 'month',
    });

    const selectedPlan = plans.find((plan) => plan.id === data.plan_id) ?? defaultPlan;
    const billingPrice = selectedPlan?.price_xof ?? 0;

    const submit = () => {
        post('/subscriptions');
    };

    const cancelSubscription = () => {
        router.patch('/subscriptions/cancel');
    };

    const logout = () => {
        router.post('/logout');
    };

    return (
        <>
            <Head title="Dashboard BillApp" />
            <div className="min-h-screen bg-[#050505] text-white">
                <header className="border-b border-white/10 bg-[#0b0b0b]/95">
                    <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
                        <div className="flex items-center gap-3">
                            <Link
                                href="/"
                                className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold tracking-wide text-zinc-200 transition hover:border-white/40 hover:bg-white/10"
                            >
                                RETOUR ACCUEIL
                            </Link>
                            <div className="rounded-full border border-white/15 px-3 py-1.5">
                                <AppLogo />
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link
                                href="/settings/profile"
                                className="rounded-full border border-[#E50914]/45 px-4 py-2 text-xs font-semibold tracking-wide text-red-200 transition hover:border-[#E50914] hover:bg-[#E50914]/15"
                            >
                                MON PROFIL
                            </Link>
                            <button
                                type="button"
                                onClick={logout}
                                className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold tracking-wide text-zinc-200 transition hover:border-white/40 hover:bg-white/10"
                            >
                                DECONNEXION
                            </button>
                        </div>
                    </div>
                </header>

                <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10">
                    {successMessage && (
                        <section className="rounded-xl border border-emerald-400/35 bg-emerald-500/10 p-4">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <p className="text-sm font-medium text-emerald-200">
                                    {successMessage}
                                </p>
                                <button
                                    type="button"
                                    onClick={() => window.history.back()}
                                    className="rounded-lg border border-emerald-300/35 bg-emerald-500/10 px-3 py-2 text-xs font-semibold tracking-wide text-emerald-100 transition hover:bg-emerald-500/20"
                                >
                                    RETOUR PAGE PRECEDENTE
                                </button>
                            </div>
                        </section>
                    )}

                    {!activeSubscription ? (
                        <section className="rounded-2xl border border-white/10 bg-[#141414] p-8 shadow-2xl shadow-black/40">
                            <h2 className="text-3xl font-bold">Configurez votre facturation</h2>
                            <p className="mt-2 text-sm text-zinc-400">
                                Choisissez votre plan et votre periode de facturation.
                            </p>

                            <div className="mt-8 grid gap-4 md:grid-cols-2">
                                {plans.map((plan) => {
                                    const isSelected = data.plan_id === plan.id;

                                    return (
                                        <button
                                            key={plan.id}
                                            type="button"
                                            onClick={() => {
                                                setData('plan_id', plan.id);
                                                setData('billing_period', plan.frequency);
                                            }}
                                            className={`rounded-xl border p-5 text-left transition ${
                                                isSelected
                                                    ? 'border-[#E50914] bg-[#1d1d1d] shadow-lg shadow-[#E50914]/20'
                                                    : 'border-white/10 bg-[#0f0f0f] hover:border-white/25'
                                            }`}
                                        >
                                            <p className="text-lg font-semibold">{plan.name}</p>
                                            <p className="mt-3 text-2xl font-bold">
                                                {formatMoney(plan.price_xof)}
                                            </p>
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="mt-8">
                                <label className="mb-2 block text-sm font-medium text-zinc-300">
                                    Periode
                                </label>
                                <select
                                    value={data.billing_period}
                                    onChange={(event) =>
                                        setData('billing_period', event.target.value as 'month' | 'year')
                                    }
                                    className="w-full rounded-lg border border-white/15 bg-[#0b0b0b] px-4 py-3 text-white focus:border-[#E50914] focus:outline-none"
                                >
                                    <option value="month">Mensuel</option>
                                    <option value="year">Annuel</option>
                                </select>
                            </div>

                            <div className="mt-8 rounded-xl border border-[#E50914]/40 bg-[#110809] p-5">
                                <p className="text-sm text-zinc-300">
                                    Vous allez etre facture{' '}
                                    <span className="font-semibold text-white">
                                        {formatMoney(billingPrice)}
                                    </span>{' '}
                                    tous les{' '}
                                    <span className="font-semibold text-white">
                                        {periodLabel(data.billing_period)}
                                    </span>
                                    .
                                </p>
                            </div>

                            {errors.subscription && (
                                <p className="mt-4 text-sm text-red-400">{errors.subscription}</p>
                            )}
                            {errors.billing_period && (
                                <p className="mt-2 text-sm text-red-400">{errors.billing_period}</p>
                            )}

                            <button
                                type="button"
                                onClick={submit}
                                disabled={processing || !selectedPlan}
                                className="mt-8 w-full rounded-xl bg-[#E50914] px-6 py-4 text-base font-extrabold tracking-wide text-white transition hover:bg-[#f30f1a] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                CONFIRMER L&apos;ABONNEMENT
                            </button>
                        </section>
                    ) : (
                        <section className="rounded-2xl border border-white/10 bg-[#141414] p-8">
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div>
                                    <p className="text-sm text-zinc-400">Votre abonnement</p>
                                    <h2 className="mt-2 text-3xl font-bold">
                                        {activeSubscription.plan.name}
                                    </h2>
                                    <p className="mt-2 text-zinc-300">
                                        {formatMoney(activeSubscription.plan.price_xof)} /{' '}
                                        {periodLabel(activeSubscription.billing_period)}
                                    </p>
                                    <p className="mt-1 text-sm text-zinc-500">
                                        Prochaine facturation:{' '}
                                        {new Date(activeSubscription.next_billing_at).toLocaleString(
                                            'fr-FR',
                                        )}
                                    </p>
                                </div>
                                <span className="inline-flex items-center rounded-full border border-emerald-400/50 bg-emerald-500/15 px-4 py-2 text-sm font-semibold text-emerald-300">
                                    Actif
                                </span>
                            </div>
                            <div className="mt-6">
                                <button
                                    type="button"
                                    onClick={cancelSubscription}
                                    className="rounded-lg border border-[#E50914]/60 bg-[#2b0b0e] px-4 py-2 text-sm font-semibold text-red-200 transition hover:bg-[#3b0d12]"
                                >
                                    Annuler l&apos;abonnement
                                </button>
                            </div>
                        </section>
                    )}

                    <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#141414]">
                        <div className="border-b border-white/10 px-6 py-4">
                            <h3 className="text-xl font-semibold">Historique des factures</h3>
                        </div>
                        <table className="w-full text-left">
                            <thead className="bg-[#0f0f0f] text-xs uppercase tracking-wider text-zinc-400">
                                <tr>
                                    <th className="px-6 py-3">Reference</th>
                                    <th className="px-6 py-3">Montant</th>
                                    <th className="px-6 py-3">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoices.length === 0 ? (
                                    <tr>
                                        <td className="px-6 py-6 text-zinc-400" colSpan={3}>
                                            Aucune facture pour le moment.
                                        </td>
                                    </tr>
                                ) : (
                                    invoices.map((invoice) => (
                                        <tr
                                            key={invoice.id}
                                            className="border-t border-white/10 text-sm"
                                        >
                                            <td className="px-6 py-4 font-medium">
                                                {invoice.reference}
                                            </td>
                                            <td className="px-6 py-4">
                                                {formatMoney(invoice.amount)}
                                            </td>
                                            <td className="px-6 py-4 text-zinc-300">
                                                {new Date(invoice.billed_at).toLocaleString('fr-FR')}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </section>
                </main>
            </div>
        </>
    );
}
