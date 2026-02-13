<?php

namespace App\Console\Commands;

use App\Mail\InvoiceMail;
use App\Models\Invoice;
use App\Models\Subscription;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class RunBillingCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:run-billing';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate invoices for due subscriptions and send invoice emails.';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $dueSubscriptions = Subscription::query()
            ->with(['user:id,email,name', 'plan:id,price_xof'])
            ->where('status', 'active')
            ->where('next_billing_at', '<=', now())
            ->get();

        if ($dueSubscriptions->isEmpty()) {
            $this->info('No due subscriptions found.');

            return self::SUCCESS;
        }

        $processed = 0;

        foreach ($dueSubscriptions as $subscription) {
            DB::transaction(function () use ($subscription, &$processed): void {
                $invoice = Invoice::query()->create([
                    'user_id' => $subscription->user_id,
                    'amount' => $subscription->plan->price_xof,
                    'reference' => Invoice::generateReference(),
                    'billed_at' => now(),
                ]);

                $nextBillingAt = $subscription->billing_period === 'year'
                    ? $subscription->next_billing_at->copy()->addYearNoOverflow()
                    : $subscription->next_billing_at->copy()->addMonthNoOverflow();

                $subscription->update([
                    'next_billing_at' => $nextBillingAt->toDateTimeString(),
                ]);

                Mail::to($subscription->user->email)->send(new InvoiceMail(
                    userName: $subscription->user->name,
                    amount: $invoice->amount,
                    reference: $invoice->reference,
                    billedAt: $invoice->billed_at,
                ));

                $processed++;
            });
        }

        $this->info("Billing completed. {$processed} invoice(s) generated.");

        return self::SUCCESS;
    }
}
