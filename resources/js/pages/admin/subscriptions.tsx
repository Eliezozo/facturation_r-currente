import { Head, Link, router, usePage } from '@inertiajs/react';
import { ArrowRight, BarChart3, Layers, Users } from 'lucide-react';

interface AdminSubscription {
    id: number;
    status: 'active' | 'cancelled';
    billing_period: 'minute' | 'month' | 'year';
    next_billing_at: string | null;
    created_at: string | null;
    user: {
        id: number;
        name: string;
        email: string;
    };
    plan: {
        id: number;
        name: string;
        price_xof: number;
        frequency: 'minute' | 'month' | 'year';
    };
}

interface PlanBreakdown {
    name: string;
    count: number;
    total: number;
}

interface RevenueTrendPoint {
    period: string;
    amount: number;
}

interface AdminSubscriptionsProps {
    subscriptions: AdminSubscription[];
    summary: {
        total: number;
        active: number;
        cancelled: number;
        activeShare: number;
        cancelledShare: number;
        revenue: number;
    };
    planBreakdown: PlanBreakdown[];
    revenueTrend: RevenueTrendPoint[];
}

const formatMoney = (value: number) =>
    `${new Intl.NumberFormat('fr-FR').format(value)} FCFA`;

const periodLabel = (period: 'minute' | 'month' | 'year') =>
    period === 'year' ? 'Annuel' : period === 'month' ? 'Mensuel' : 'Minute';

export default function AdminSubscriptions({
    subscriptions,
    summary,
    planBreakdown,
    revenueTrend,
}: AdminSubscriptionsProps) {
    const page = usePage<{ flash?: { success?: string } }>();
    const successMessage = page.props.flash?.success;

    const maxRevenue = Math.max(
        ...revenueTrend.map((point) => point.amount),
        1,
    );

    const updateStatus = (subscriptionId: number, status: 'active' | 'cancelled') => {
        router.patch(`/admin/subscriptions/${subscriptionId}/status`, { status });
    };

    return (
        <>
            <Head title="Admin Abonnements" />

            <div className="min-h-screen bg-[#050505] text-white">
                <header className="border-b border-white/10 bg-[#0b0b0b]/95">
                    <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
                        <div className="flex items-center gap-3">
                            <Link
                                href="/dashboard"
                                className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold tracking-wide text-zinc-200 transition hover:border-white/40 hover:bg-white/10"
                            >
                                RETOUR DASHBOARD
                            </Link>
                            <span className="inline-flex items-center gap-2 rounded-full border border-[#E50914]/40 bg-[#1b0508] px-4 py-2 text-xs font-semibold text-red-200">
                                <BarChart3 className="h-4 w-4" />
                                Administration des abonnements
                            </span>
                        </div>
                        <Link
                            href="/settings/profile"
                            className="rounded-full border border-[#E50914]/45 px-4 py-2 text-xs font-semibold tracking-wide text-red-200 transition hover:border-[#E50914] hover:bg-[#E50914]/15"
                        >
                            Mon profil
                        </Link>
                    </div>
                </header>

                <main className="mx-auto w-full max-w-6xl space-y-6 px-6 py-10">
                    {successMessage && (
                        <section className="rounded-xl border border-emerald-400/35 bg-emerald-500/10 p-4">
                            <p className="text-sm font-medium text-emerald-200">
                                {successMessage}
                            </p>
                        </section>
                    )}

                    <section className="grid gap-4 md:grid-cols-4">
                        <div className="rounded-3xl border border-white/10 bg-[#111111] p-6">
                            <div className="flex items-center gap-3 text-zinc-300">
                                <Users className="h-5 w-5 text-[#E50914]" />
                                <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">Abonnements</p>
                            </div>
                            <p className="mt-6 text-4xl font-bold text-white">{summary.total}</p>
                            <p className="mt-2 text-sm text-zinc-400">Total des abonnements</p>
                        </div>
                        <div className="rounded-3xl border border-white/10 bg-[#111111] p-6">
                            <div className="flex items-center gap-3 text-zinc-300">
                                <Layers className="h-5 w-5 text-emerald-400" />
                                <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">Actifs</p>
                            </div>
                            <p className="mt-6 text-4xl font-bold text-white">{summary.active}</p>
                            <p className="mt-2 text-sm text-zinc-400">Abonnements en cours</p>
                        </div>
                        <div className="rounded-3xl border border-white/10 bg-[#111111] p-6">
                            <div className="flex items-center gap-3 text-zinc-300">
                                <Layers className="h-5 w-5 text-red-400" />
                                <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">Annulés</p>
                            </div>
                            <p className="mt-6 text-4xl font-bold text-white">{summary.cancelled}</p>
                            <p className="mt-2 text-sm text-zinc-400">Abonnements annulés</p>
                        </div>
                        <div className="rounded-3xl border border-white/10 bg-[#111111] p-6">
                            <div className="flex items-center gap-3 text-zinc-300">
                                <ArrowRight className="h-5 w-5 text-[#E50914]" />
                                <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">Revenu</p>
                            </div>
                            <p className="mt-6 text-4xl font-bold text-white">{formatMoney(summary.revenue)}</p>
                            <p className="mt-2 text-sm text-zinc-400">Revenu total estimé</p>
                        </div>
                    </section>

                    <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                        <div className="rounded-3xl border border-white/10 bg-[#111111] p-6">
                            <h2 className="text-xl font-semibold">Répartition des abonnements</h2>
                            <p className="mt-2 text-sm text-zinc-400">
                                Visualisation de l’état des abonnements et des plans les plus utilisés.
                            </p>

                            <div className="mt-6 space-y-4">
                                <div>
                                    <div className="flex items-center justify-between text-sm text-zinc-400">
                                        <span>Actifs</span>
                                        <span>{summary.activeShare}%</span>
                                    </div>
                                    <div className="mt-2 h-3 overflow-hidden rounded-full bg-white/10">
                                        <div
                                            className="h-full rounded-full bg-emerald-500"
                                            style={{ width: `${summary.activeShare}%` }}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between text-sm text-zinc-400">
                                        <span>Annulés</span>
                                        <span>{summary.cancelledShare}%</span>
                                    </div>
                                    <div className="mt-2 h-3 overflow-hidden rounded-full bg-white/10">
                                        <div
                                            className="h-full rounded-full bg-red-500"
                                            style={{ width: `${summary.cancelledShare}%` }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 space-y-4">
                                {planBreakdown.map((plan) => {
                                    const width = summary.revenue > 0
                                        ? Math.round((plan.total / summary.revenue) * 100)
                                        : 0;
                                    return (
                                        <div key={plan.name}>
                                            <div className="flex items-center justify-between text-sm text-zinc-300">
                                                <span>{plan.name}</span>
                                                <span>{plan.count} abos</span>
                                            </div>
                                            <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                                                <div
                                                    className="h-full rounded-full bg-[#E50914]"
                                                    style={{ width: `${width}%` }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="rounded-3xl border border-white/10 bg-[#111111] p-6">
                            <h2 className="text-xl font-semibold">Tendance des revenus</h2>
                            <p className="mt-2 text-sm text-zinc-400">
                                Montant facturé par période de facturation.
                            </p>

                            <div className="mt-6 flex items-end gap-3">
                                {revenueTrend.length === 0 ? (
                                    <p className="text-sm text-zinc-500">Aucun revenu facturé.</p>
                                ) : (
                                    revenueTrend.map((point) => {
                                        const height = Math.round((point.amount / maxRevenue) * 100) || 4;

                                        return (
                                            <div
                                                key={point.period}
                                                className="flex min-w-[64px] flex-col items-center gap-2"
                                            >
                                                <div className="flex h-40 w-full items-end">
                                                    <div
                                                        className="w-full rounded-t-2xl bg-[#E50914]"
                                                        style={{ height: `${height}%` }}
                                                    />
                                                </div>
                                                <span className="text-xs text-zinc-400 text-center">
                                                    {point.period}
                                                </span>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </section>

                    <section className="overflow-hidden rounded-3xl border border-white/10 bg-[#111111]">
                        <div className="border-b border-white/10 px-6 py-5">
                            <h2 className="text-xl font-semibold">Liste des abonnements</h2>
                            <p className="mt-1 text-sm text-zinc-400">
                                Gérer les abonnements de la plateforme et changer leur statut.
                            </p>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-white/10 text-left text-sm">
                                <thead className="bg-[#0f0f0f] text-xs uppercase tracking-[0.24em] text-zinc-500">
                                    <tr>
                                        <th className="px-5 py-4">Client</th>
                                        <th className="px-5 py-4">Plan</th>
                                        <th className="px-5 py-4">Période</th>
                                        <th className="px-5 py-4">Statut</th>
                                        <th className="px-5 py-4">Prochaine facturation</th>
                                        <th className="px-5 py-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/10">
                                    {subscriptions.map((subscription) => (
                                        <tr key={subscription.id} className="border-b border-white/5">
                                            <td className="px-5 py-4">
                                                <div className="font-medium text-white">
                                                    {subscription.user.name}
                                                </div>
                                                <div className="text-xs text-zinc-500">
                                                    {subscription.user.email}
                                                </div>
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="font-medium text-white">
                                                    {subscription.plan.name}
                                                </div>
                                                <div className="text-xs text-zinc-500">
                                                    {formatMoney(subscription.plan.price_xof)}
                                                </div>
                                            </td>
                                            <td className="px-5 py-4 text-zinc-300">
                                                {periodLabel(subscription.billing_period)}
                                            </td>
                                            <td className="px-5 py-4">
                                                <span
                                                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${subscription.status === 'active'
                                                            ? 'bg-emerald-500/15 text-emerald-300'
                                                            : 'bg-red-500/15 text-red-300'
                                                        }`}
                                                >
                                                    {subscription.status}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4 text-zinc-300">
                                                {subscription.next_billing_at
                                                    ? new Date(subscription.next_billing_at).toLocaleDateString('fr-FR')
                                                    : 'N/A'}
                                            </td>
                                            <td className="px-5 py-4">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        updateStatus(
                                                            subscription.id,
                                                            subscription.status === 'active' ? 'cancelled' : 'active',
                                                        )
                                                    }
                                                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/10"
                                                >
                                                    {subscription.status === 'active'
                                                        ? 'Annuler'
                                                        : 'Réactiver'}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
}
