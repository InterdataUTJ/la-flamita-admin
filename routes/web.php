<?php

use App\Http\Controllers\Auth\AuthEmpleadoController;
use App\Http\Controllers\Auth\AuthClienteController;
use App\Http\Controllers\Auth\GoogleController;
use App\Http\Controllers\CategoriaController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\EmpleadoController;
use App\Http\Controllers\ProductoController;
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



Route::redirect("/", "/panel");

// Empleados
Route::get('/empleado/login', [AuthEmpleadoController::class, 'showForm'])->name('empleado.login'); // Retorna la vista para logear el empleado
Route::post('/empleado/login', [AuthEmpleadoController::class, 'login'])->name('empleado.login');



// Empleados protegidos
Route::group(["middleware" => "auth:empleado", "as" => "empleado;"], function() {
    
    Route::view("/panel", "dashboard")->name("panel"); // Retorna la vista del panel de control
    Route::post('/empleado/logout', [AuthEmpleadoController::class, 'logout'])->name('logout');




    // ===== Modulo de CLIENTES =====

    Route::middleware("can:ver_clientes,".Empleado::class)->group(function() {

        Route::get('/cliente/listar', [ClienteController::class, 'index'])->name('cliente.listar');
    
        Route::middleware("can:interactuar_clientes,".Empleado::class)->group(function() {
            Route::get('/cliente/crear', [ClienteController::class, 'create'])->name('cliente.crear');
            Route::post('/cliente/store', [ClienteController::class, 'store'])->name('cliente.store');
        
            Route::get('/cliente/editar/{id}', [ClienteController::class, 'edit'])->name('cliente.editar');
            Route::put('/cliente/update/{id}', [ClienteController::class, 'update'])->name('cliente.update');
        });
    
        Route::get('/cliente/mostrar/{id}', [ClienteController::class, 'show'])->name('cliente.mostrar'); // Retorna la vista del cliente en particlar
        Route::delete('/cliente/borrar/{id}', [ClienteController::class, 'delete'])->middleware("can:eliminar_clientes,".Empleado::class)->name('cliente.delete'); // Retorna la vista del $id del cliente para eliminarlo 
    
    });
    


    

    // ===== Modulo de CATEGORIAS =====

    Route::middleware("can:ver_categorias,".Empleado::class)->group(function() {

        Route::get("/categoria/listar", [CategoriaController::class, "index"])->name("categoria.listar");

        Route::middleware("can:interactuar_categorias,".Empleado::class)->group(function() {
            Route::get("/categoria/crear", [CategoriaController::class, "create"])->name("categoria.crear");
            Route::post("/categoria/store", [CategoriaController::class, "store"])->name("categoria.crear");

            Route::get('/categoria/editar/{id}', [CategoriaController::class, 'edit'])->name('categoria.editar');
            Route::put('/categoria/update/{id}', [CategoriaController::class, 'update'])->name('categoria.update');
        });

        Route::get('/categoria/mostrar/{id}', [CategoriaController::class, 'show'])->name('categoria.mostrar');
        Route::delete('/categoria/borrar/{id}', [CategoriaController::class, 'delete'])->middleware("can:eliminar_categorias,".Empleado::class)->name('categoria.delete');
    
    });




    // ===== Modulo de PRODUCTOS =====
    
    Route::middleware("can:ver_productos,".Empleado::class)->group(function() {
        Route::get("/producto/listar", [ProductoController::class, "index"])->name("producto.listar");

        Route::middleware("can:interactuar_productos,".Empleado::class)->group(function() {
            Route::get("/producto/crear", [ProductoController::class, "create"])->name("producto.crear");
            Route::post("/producto/store", [ProductoController::class, "store"])->name("producto.crear");

            Route::get('/producto/editar/{id}', [ProductoController::class, 'edit'])->name('producto.editar');
            Route::put('/producto/update/{id}', [ProductoController::class, 'update'])->name('producto.update');
        });

        Route::get('/producto/mostrar/{id}', [ProductoController::class, 'show'])->name('producto.mostrar');
        Route::delete('/producto/borrar/{id}', [ProductoController::class, 'delete'])->middleware("can:eliminar_productos,".Empleado::class)->name('producto.delete');
    });




    // ===== Modulo de EMPLEADOS =====
    
    Route::middleware("can:ver_empleados,".Empleado::class)->group(function() {
        Route::get('/empleado/listar', [EmpleadoController::class, 'index'])->name('empleado.listar'); // Retorna la vista de todos los clientes
        
        Route::middleware("can:interactuar_empleados,".Empleado::class)->group(function() {
            Route::get('/empleado/crear', [EmpleadoController::class, 'create'])->name('empleado.crear'); // Retorna la vista del formulario de crear
            Route::post('/empleado/store', [EmpleadoController::class, 'store'])->name('empleado.store'); // El metodo post que envia los datos del cliente

            Route::get('/empleado/editar/{id}', [EmpleadoController::class, 'edit'])->name('empleado.editar'); // Retorna la vista del formulario para editar la informacion
            Route::put('/empleado/update/{id}', [EmpleadoController::class, 'update'])->name('empleado.update'); // El metodo put que actualiza los datos del cliente
        });

        Route::get('/empleado/mostrar/{id}', [EmpleadoController::class, 'show'])->name('empleado.mostrar'); // Retorna la vista del cliente en particlar
        Route::delete('/empleado/borrar/{id}', [EmpleadoController::class, 'delete'])->middleware("can:eliminar_empleados,".Empleado::class)->name('empleado.delete'); // Retorna la vista del $id del cliente para eliminarlo
    });

});