<?php

use App\Http\Controllers\Auth\AuthEmpleadoController;
use App\Http\Controllers\Auth\AuthClienteController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// General
Route::view('/', "menu")->name('menu');

// Clientes
Route::get('/login', [AuthClienteController::class, 'showForm'])->name('cliente.login');
Route::get('/singup', [AuthClienteController::class, 'showNewForm'])->name('cliente.singup');

// Empleados
Route::get('/empleado/login', [AuthEmpleadoController::class, 'showForm'])->name('empleado.login');
Route::post('/empleado/login', [AuthEmpleadoController::class, 'login'])->name('empleado.login');

// Empleados protegidos
Route::middleware(['auth:empleado'])->group(function() {
    Route::post('/empleado/logout', [AuthEmpleadoController::class, 'logout'])->name('empleado.logout');
});

// Clientes protegidos
Route::middleware(['auth:cliente'])->group(function() {
    Route::post('/logout', [AuthClienteController::class, 'logout'])->name('cliente.logout');
});