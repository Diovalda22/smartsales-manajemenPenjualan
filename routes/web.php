<?php

use App\Exports\TransactionsExport;
use App\Http\Controllers\CustomersController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProductCategoriesController;
use App\Http\Controllers\ProductImportController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TransactionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

Route::get('/', function () {
    return Inertia::render('LandingPage/Index', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('category', ProductCategoriesController::class);
    Route::resource('product', ProductsController::class);
    Route::resource('customer', CustomersController::class);
    Route::resource('transaction', TransactionController::class);

    Route::patch('/sales/{id}', [TransactionController::class, 'updatePaymentStatus']);

    Route::get('/export-transactions', function () {
        return Excel::download(new TransactionsExport, 'transactions.xlsx');
    })->name('transactions.export');
});

Route::middleware('auth')->group(function () {});

require __DIR__ . '/auth.php';
