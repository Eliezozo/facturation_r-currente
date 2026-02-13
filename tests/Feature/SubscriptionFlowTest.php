<?php

use App\Models\Plan;
use App\Models\Subscription;
use App\Models\User;
use Carbon\Carbon;

test('subscription stores next billing one month ahead for monthly plan', function () {
    Carbon::setTestNow('2026-02-13 10:00:00');

    $user = User::factory()->create();
    $plan = Plan::query()->where('frequency', 'month')->firstOrFail();

    $this->actingAs($user)->post(route('subscriptions.store'), [
        'plan_id' => $plan->id,
        'billing_period' => 'month',
    ])->assertRedirect(route('dashboard'));

    $subscription = Subscription::query()->where('user_id', $user->id)->firstOrFail();

    expect($subscription->next_billing_at->toDateTimeString())->toBe('2026-03-13 10:00:00');
});

test('subscription stores next billing one year ahead for yearly plan', function () {
    Carbon::setTestNow('2026-02-13 10:00:00');

    $user = User::factory()->create();
    $plan = Plan::query()->where('frequency', 'year')->firstOrFail();

    $this->actingAs($user)->post(route('subscriptions.store'), [
        'plan_id' => $plan->id,
        'billing_period' => 'year',
    ])->assertRedirect(route('dashboard'));

    $subscription = Subscription::query()->where('user_id', $user->id)->firstOrFail();

    expect($subscription->next_billing_at->toDateTimeString())->toBe('2027-02-13 10:00:00');
});
