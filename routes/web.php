<?php

use App\Http\Controllers\BayiController;
use App\Http\Controllers\CalendarController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\IbuController;
use App\Http\Controllers\LansiaController;
use App\Http\Controllers\LaporanPosyandu;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware("auth")->group(function () {
    Route::get('/', [EventController::class,"index"])->name("dashboard");
    Route::post('/tambah/event', [EventController::class,"store"])->name("tambah.event");
    Route::delete('/hapus/event/{id}', [EventController::class,"destroy"])->name("hapus.event");
    Route::get('/bayi', [BayiController::class,"index"])->name("bayi");
    Route::get('/ibu', [IbuController::class,"index"])->name("ibu");
    Route::get('/lansia', [LansiaController::class,"index"])->name("lansia");
    Route::put("/edit/bayi/{id}", [BayiController::class,"update"])->name("bayi.update");
    Route::delete("/delete/bayi/{id}", [BayiController::class,"destroy"])->name("bayi.delete");
    Route::get("/tambah/bayi", [BayiController::class,"create"]);
    Route::post("/tambah/bayi", [BayiController::class,"store"])->name("tambahBayi");
    Route::get("/tambah/ibu", [IbuController::class,"create"]);
    Route::put("/edit/ibu/{id}", [IbuController::class,"update"])->name("ibu.update");
    Route::delete("/delete/ibu/{id}", [IbuController::class,"destroy"])->name("ibu.delete");
    Route::post("/tambah/ibu", [IbuController::class,"store"])->name("tambahIbu");
    Route::get("/tambah/lansia", [LansiaController::class,"create"]);
    Route::post("/tambah/lansia", [LansiaController::class,"store"])->name("tambahLansia");
    Route::delete("/delete/lansia/{id}", [LansiaController::class,"destroy"])->name("lansia.delete");
    Route::put("/edit/lansia/{id}", [LansiaController::class,"update"])->name("lansia.update");
    Route::get("/laporan-posyandu",[LaporanPosyandu::class,'index'])->name("laporan");
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
