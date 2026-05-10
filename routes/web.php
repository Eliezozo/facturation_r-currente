<?php

use App\Http\Controllers\AdminSubscriptionController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SubscriptionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function (): void {
    Route::get('dashboard', DashboardController::class)->name('dashboard');
    Route::post('subscriptions', [SubscriptionController::class, 'store'])->name('subscriptions.store');
    Route::patch('subscriptions/cancel', [SubscriptionController::class, 'cancel'])->name('subscriptions.cancel');

    Route::get('admin/subscriptions', [AdminSubscriptionController::class, 'index'])
        ->middleware('admin')
        ->name('admin.subscriptions.index');
    Route::patch('admin/subscriptions/{subscription}/status', [AdminSubscriptionController::class, 'updateStatus'])
        ->middleware('admin')
        ->name('admin.subscriptions.updateStatus');
});

require __DIR__.'/settings.php';
