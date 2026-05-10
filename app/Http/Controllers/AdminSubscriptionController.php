<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\Subscription;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class AdminSubscriptionController extends Controller
{
    public function index(Request $request): Response
    {
        $subscriptions = Subscription::with(['user', 'plan'])
            ->latest('created_at')
            ->get();

        $subscriptionCount = $subscriptions->count();
        $activeCount = $subscriptions->where('status', 'active')->count();
        $cancelledCount = $subscriptions->where('status', 'cancelled')->count();
        $activeShare = $subscriptionCount > 0
            ? round(($activeCount / $subscriptionCount) * 100)
            : 0;
        $cancelledShare = $subscriptionCount > 0
            ? round(($cancelledCount / $subscriptionCount) * 100)
            : 0;

        $planBreakdown = $subscriptions
            ->groupBy(fn (Subscription $subscription) => $subscription->plan->name)
            ->map(fn ($items, $planName) => [
                'name' => $planName,
                'count' => $items->count(),
                'total' => $items->sum(fn (Subscription $item) => $item->plan->price_xof),
            ])
            ->values();

        $totalRevenue = $planBreakdown->sum('total');

        $revenueTrend = Invoice::query()
            ->orderBy('billed_at')
            ->get(['amount', 'billed_at'])
            ->groupBy(fn (Invoice $invoice) => $invoice->billed_at?->format('Y-m'))
            ->map(fn ($items, $period) => [
                'period' => $period,
                'amount' => $items->sum('amount'),
            ])
            ->values();

        return Inertia::render('admin/subscriptions', [
            'subscriptions' => $subscriptions->map(fn (Subscription $subscription) => [
                'id' => $subscription->id,
                'status' => $subscription->status,
                'billing_period' => $subscription->billing_period,
                'next_billing_at' => $subscription->next_billing_at?->toIso8601String(),
                'created_at' => $subscription->created_at?->toIso8601String(),
                'user' => [
                    'id' => $subscription->user->id,
                    'name' => $subscription->user->name,
                    'email' => $subscription->user->email,
                ],
                'plan' => [
                    'id' => $subscription->plan->id,
                    'name' => $subscription->plan->name,
                    'price_xof' => $subscription->plan->price_xof,
                    'frequency' => $subscription->plan->frequency,
                ],
            ]),
            'summary' => [
                'total' => $subscriptionCount,
                'active' => $activeCount,
                'cancelled' => $cancelledCount,
                'activeShare' => $activeShare,
                'cancelledShare' => $cancelledShare,
                'revenue' => $totalRevenue,
            ],
            'planBreakdown' => $planBreakdown,
            'revenueTrend' => $revenueTrend,
        ]);
    }

    public function updateStatus(Request $request, Subscription $subscription): RedirectResponse
    {
        $validated = $request->validate([
            'status' => ['required', Rule::in(['active', 'cancelled'])],
        ]);

        $subscription->update([
            'status' => $validated['status'],
        ]);

        return Redirect::route('admin.subscriptions.index')
            ->with('success', 'Statut de l\'abonnement mis à jour.');
    }
}
