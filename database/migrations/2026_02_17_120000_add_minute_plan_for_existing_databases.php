<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $this->allowMinuteFrequency();
        $this->allowMinuteBillingPeriod();

        $exists = DB::table('plans')->where('frequency', 'minute')->exists();

        if (! $exists) {
            DB::table('plans')->insert([
                'name' => 'Minute',
                'price_xof' => 100,
                'frequency' => 'minute',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::table('plans')->where('frequency', 'minute')->delete();
    }

    private function allowMinuteFrequency(): void
    {
        if (DB::getDriverName() === 'sqlite') {
            DB::statement('PRAGMA foreign_keys = OFF');

            Schema::create('plans_tmp', function (Blueprint $table): void {
                $table->id();
                $table->string('name');
                $table->unsignedBigInteger('price_xof');
                $table->enum('frequency', ['minute', 'month', 'year']);
                $table->timestamps();
            });

            DB::statement('
                INSERT INTO plans_tmp (id, name, price_xof, frequency, created_at, updated_at)
                SELECT id, name, price_xof, frequency, created_at, updated_at
                FROM plans
            ');

            Schema::drop('plans');
            Schema::rename('plans_tmp', 'plans');

            DB::statement('PRAGMA foreign_keys = ON');

            return;
        }

        if (DB::getDriverName() === 'mysql') {
            DB::statement("ALTER TABLE plans MODIFY frequency ENUM('minute','month','year') NOT NULL");
        }
    }

    private function allowMinuteBillingPeriod(): void
    {
        if (DB::getDriverName() === 'sqlite') {
            DB::statement('PRAGMA foreign_keys = OFF');

            Schema::create('subscriptions_tmp', function (Blueprint $table): void {
                $table->id();
                $table->foreignId('user_id')->constrained()->cascadeOnDelete();
                $table->foreignId('plan_id')->constrained()->cascadeOnDelete();
                $table->enum('billing_period', ['minute', 'month', 'year']);
                $table->enum('status', ['active', 'cancelled'])->default('active');
                $table->timestamp('next_billing_at');
                $table->timestamps();
                $table->index(['status', 'next_billing_at']);
            });

            DB::statement('
                INSERT INTO subscriptions_tmp (
                    id, user_id, plan_id, billing_period, status, next_billing_at, created_at, updated_at
                )
                SELECT
                    id, user_id, plan_id, billing_period, status, next_billing_at, created_at, updated_at
                FROM subscriptions
            ');

            Schema::drop('subscriptions');
            Schema::rename('subscriptions_tmp', 'subscriptions');

            DB::statement('PRAGMA foreign_keys = ON');

            return;
        }

        if (DB::getDriverName() === 'mysql') {
            DB::statement("ALTER TABLE subscriptions MODIFY billing_period ENUM('minute','month','year') NOT NULL");
        }
    }
};
