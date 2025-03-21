<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\PostController;
use App\Http\Controllers\PaymentController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('payments', PaymentController::class)->only([
        'index', /* 'create', 'store', 'edit', 'update', */ 'destroy'
    ]);
});

Route::resource('posts', PostController::class);

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
