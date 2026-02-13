<?php

namespace App\Http\Controllers;

use App\Mail\InvoiceMail;
use App\Models\Invoice;
use App\Models\Plan;
use App\Models\Subscription;
use Carbon\CarbonInterface;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;

class SubscriptionController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'plan_id' => ['required', 'integer', 'exists:plans,id'],
            'billing_period' => ['required', 'in:month,year'],
        ]);

        $user = $request->user();
        if (! $user) {
            abort(403);
        }

        if ($user->activeSubscription()->exists()) {
            return back()->withErrors([
                'subscription' => 'Un abonnement actif existe deja.',
            ]);
        }

        $plan = Plan::query()->findOrFail($validated['plan_id']);
        $billingPeriod = $validated['billing_period'];

        if ($plan->frequency !== $billingPeriod) {
            throw ValidationException::withMessages([
                'billing_period' => 'La periode selectionnee ne correspond pas a ce plan.',
            ]);
        }

        $nextBillingAt = $this->nextBillingAtFromPeriod($billingPeriod)->toDateTimeString();

        $invoice = DB::transaction(function () use ($user, $plan, $billingPeriod, $nextBillingAt): Invoice {
            Subscription::query()->create([
                'user_id' => $user->id,
                'plan_id' => $plan->id,
                'billing_period' => $billingPeriod,
                'status' => 'active',
                'next_billing_at' => $nextBillingAt,
            ]);

            return Invoice::query()->create([
                'user_id' => $user->id,
                'amount' => $plan->price_xof,
                'reference' => Invoice::generateReference(),
                'billed_at' => now(),
            ]);
        });

        Mail::to($user->email)->send(new InvoiceMail(
            userName: $user->name,
            amount: $invoice->amount,
            reference: $invoice->reference,
            billedAt: $invoice->billed_at,
        ));

        return redirect()->route('dashboard')->with('success', 'Abonnement active avec succes.');
    }

    public function cancel(Request $request): RedirectResponse
    {
        $user = $request->user();
        if (! $user) {
            abort(403);
        }

        $subscription = $user->activeSubscription()->first();

        if (! $subscription) {
            return back()->withErrors([
                'subscription' => 'Aucun abonnement actif a annuler.',
            ]);
        }

        $subscription->update([
            'status' => 'cancelled',
        ]);

        return redirect()->route('dashboard')->with('success', 'Abonnement annule avec succes.');
    }

    private function nextBillingAtFromPeriod(string $billingPeriod): CarbonInterface
    {
        return $billingPeriod === 'year'
            ? now()->addYearNoOverflow()
            : now()->addMonthNoOverflow();
    }
}
