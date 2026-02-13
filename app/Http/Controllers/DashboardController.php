<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $user = $request->user();
        $activeSubscription = $user->activeSubscription()->with('plan')->first();

        return Inertia::render('dashboard', [
            'plans' => Plan::query()->orderBy('price_xof')->get(['id', 'name', 'price_xof', 'frequency']),
            'activeSubscription' => $activeSubscription ? [
                'id' => $activeSubscription->id,
                'status' => $activeSubscription->status,
                'billing_period' => $activeSubscription->billing_period,
                'next_billing_at' => $activeSubscription->next_billing_at?->toIso8601String(),
                'plan' => [
                    'id' => $activeSubscription->plan->id,
                    'name' => $activeSubscription->plan->name,
                    'price_xof' => $activeSubscription->plan->price_xof,
                    'frequency' => $activeSubscription->plan->frequency,
                ],
            ] : null,
            'invoices' => $user->invoices()
                ->latest('billed_at')
                ->limit(20)
                ->get(['id', 'amount', 'reference', 'billed_at'])
                ->map(fn ($invoice) => [
                    'id' => $invoice->id,
                    'amount' => $invoice->amount,
                    'reference' => $invoice->reference,
                    'billed_at' => $invoice->billed_at?->toIso8601String(),
                ]),
        ]);
    }
}
