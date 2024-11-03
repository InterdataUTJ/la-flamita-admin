<?php

use App\Http\Controllers\Auth\AuthEmpleadoController;
use App\Http\Controllers\Auth\AuthClienteController;
use App\Http\Controllers\Auth\GoogleController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClienteController;
use App\Models\Empleado;

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

// General nos manda a menu
Route::view('/', "menu")->name('menu');





// Clientes
Route::get('/login', [AuthClienteController::class, 'showForm'])->name('cliente.login');
Route::post('/login', [AuthClienteController::class, 'login'])->name('cliente.login');

Route::get('/singup', [AuthClienteController::class, 'showNewForm'])->name('cliente.singup');
Route::post('/singup', [AuthClienteController::class, 'create'])->name('cliente.singup');

Route::get("/auth/google/redirect", [GoogleController::class, "redirect"]);
Route::get("/auth/google/callback", [GoogleController::class, "callback"]);



// Clientes protegidos
Route::group(["middleware" => "auth:cliente", "as" => "cliente;"],function() {
    Route::post('/logout', [AuthClienteController::class, 'logout'])->name('logout');
});






// Empleados
Route::get('/empleado/login', [AuthEmpleadoController::class, 'showForm'])->name('empleado.login'); // Retorna la vista para logear el empleado
Route::post('/empleado/login', [AuthEmpleadoController::class, 'login'])->name('empleado.login');



// Empleados protegidos
Route::group(["middleware" => "auth:empleado", "as" => "empleado;"], function() {
    
    Route::view("/panel", "dashboard")->name("panel"); // Retorna la vista del panel de control
    Route::post('/empleado/logout', [AuthEmpleadoController::class, 'logout'])->name('logout');

    Route::get('/cliente/listar', [ClienteController::class, 'index'])->name('cliente.listar'); // Retorna la vista de todos los clientes
    
    Route::get('/cliente/crear', [ClienteController::class, 'create'])->name('cliente.crear'); // Retorna la vista del formulario de crear
    Route::post('/cliente/store', [ClienteController::class, 'store'])->name('cliente.store'); // El metodo post que envia los datos del cliente

    Route::get('/cliente/editar/{id}', [ClienteController::class, 'edit'])->name('cliente.editar'); // Retorna la vista del formulario para editar la informacion
    Route::put('/cliente/update/{id}', [ClienteController::class, 'update'])->name('cliente.update'); // El metodo put que actualiza los datos del cliente

    Route::get('/cliente/mostrar/{id}', [ClienteController::class, 'show'])->name('cliente.mostrar'); // Retorna la vista del cliente en particlar
    Route::delete('/cliente/borrar/{id}', [ClienteController::class, 'delete'])->middleware("can:eliminar_clientes,".Empleado::class)->name('cliente.delete'); // Retorna la vista del $id del cliente para eliminarlo 
});