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
        Schema::create('plans', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->unsignedBigInteger('price_xof');
            $table->enum('frequency', ['minute', 'month', 'year']);
            $table->timestamps();
        });

        DB::table('plans')->insert([
            [
                'name' => 'Minute',
                'price_xof' => 100,
                'frequency' => 'minute',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Basique',
                'price_xof' => 5000,
                'frequency' => 'month',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Premium',
                'price_xof' => 45000,
                'frequency' => 'year',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plans');
    }
};
