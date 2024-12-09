<?php

use App\Http\Controllers\BayiController;
use App\Http\Controllers\CalendarController;
use App\Http\Controllers\IbuController;
use App\Http\Controllers\LansiaController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [CalendarController::class,"view"]);
Route::get('/bayi', [BayiController::class,"index"])->name("bayi");
Route::get('/ibu', [IbuController::class,"index"])->name("ibu");
Route::get('/lansia', [LansiaController::class,"index"])->name("lansia");
Route::get("/edit/bayi/{id}", [BayiController::class,"edit"]);
Route::get("/tambah/bayi", [BayiController::class,"create"]);
Route::post("/tambah/bayi", [BayiController::class,"store"])->name("tambahBayi");
Route::get("/tambah/ibu", [IbuController::class,"create"]);
Route::post("/tambah/ibu", [IbuController::class,"store"])->name("tambahIbu");
Route::get("/tambah/lansia", [LansiaController::class,"create"]);
Route::post("/tambah/lansia", [LansiaController::class,"store"])->name("tambahLansia");
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
