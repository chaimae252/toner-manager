<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\PrinterController;
use App\Http\Controllers\RequestController;
use App\Http\Controllers\RequestTonerController;
use App\Http\Controllers\StatisticsController;
use App\Http\Controllers\StockController;
use App\Http\Controllers\TonerController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
Route::get('/', function () {
    return Inertia::render('Home'); // You'll create this file soon
});

Route::get('/admin-login', function () {
    return Inertia::render('AdminLogin');
});

Route::post('/admin/login', action: [AdminController::class, 'login'])->name('admin.login');

Route::get('/api/admin/session', function (Request $request) {
    if (Session::has('admin_id')) {
        return response()->json([
            'admin' => [
                'admin_id' => Session::get('admin_id'),
                'admin_name' => Session::get('admin_name'),
                'admin_email' => Session::get('admin_email'),
            ]
        ]);
    }
    return response()->json(['admin' => null]);
});
 // Ensure this route is protected by auth and admin middleware
Route::post('/logout', function () {
    Auth::logout();
    return redirect('/');
})->name('logout');

Route::post('/admin/logout', [AdminController::class, 'logout'])->name('admin.logout');
    
Route::get('/admin-dashboard', function () {
    return Inertia::render('AdminDashboard');
});

Route::get('/printers', function () {
    return Inertia::render('Printers');
});

Route::get('/toners', function () {
    return Inertia::render('Toners');
});

Route::get('/stock', function () {
    return Inertia::render('Stocks');
});

Route::get('/requests', function () {
    return Inertia::render('Requests');
});

Route::get('/locations', function () {
    return Inertia::render('Locations');
});

Route::get('/request-toner', function () {
    return Inertia::render('RequestToner');
});
Route::get('/statistics', [StatisticsController::class, 'index']);

Route::get('/toner-usage', [StatisticsController::class, 'tonerUsage']);

Route::get('/inventory-health', [StatisticsController::class, 'inventoryHealth']);

Route::post('/printers', [PrinterController::class, 'store'])->name('printers.store');

Route::get('/printers', [PrinterController::class, 'index'])->name('printers.index');

Route::put('/printers/{printer}', [PrinterController::class, 'update']);

Route::delete('/printers/{id}', [PrinterController::class, 'destroy']);

Route::get('/toners', [TonerController::class, 'index'])->name('toners.index');

Route::post('/toners', [TonerController::class, 'store'])->name('toners.store');

Route::post('/toners/{toner}/assign', [TonerController::class, 'assign'])->name('toners.assign');

Route::delete('/toners/{toner}', [TonerController::class, 'destroy'])->name('toners.destroy');

Route::get('/stocks', [StockController::class, 'index'])->name('stocks.index');

Route::get('/api/stocks', [StockController::class, 'list'])->name('stocks.list');

Route::post('/stocks', [StockController::class, 'store'])->name('stocks.store');

Route::post('/stocks/{id}/restock', [StockController::class, 'restock'])->name('stocks.restock');

Route::delete('/stocks/{id}', [StockController::class, 'destroy'])->name('stocks.destroy');

Route::get('/locations', [LocationController::class, 'index'])->name('locations.index');

Route::post('/locations', [LocationController::class, 'store'])->name('locations.store');

Route::delete('/locations/{id}', [LocationController::class, 'destroy'])->name('locations.destroy');

// Show request form
Route::get('/request-toner', [RequestTonerController::class, 'create'])->name('request.toner');

// Handle form submission
Route::post('/request-toner', [RequestTonerController::class, 'store'])->name('request.toner.submit');

Route::get('/requests', [RequestController::class, 'index'])->name('requests.index');

Route::post('/requests/{id}/fulfill', [RequestController::class, 'fulfill'])->name('requests.fulfill');

// routes/web.php
Route::get('/admin/notifications', [AdminController::class, 'notifications']);
