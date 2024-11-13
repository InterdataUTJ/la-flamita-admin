@extends("plantillas.layout")

@section("titulo", "Dashboard")

@php
    $empleado = auth()->guard("empleado")->user();
@endphp

@section("contenido")
<h2 class="text-center font-extrabold text-3xl mb-8">Panel de Control</h2>
<div class="flex flex-col gap-4">

    <h2 class="font-bold text-2xl mb-2 pb-4 border-b-2 border-quinary-700">Módulos</h2>
    <div class="flex gap-4 flex-wrap w-full">

        @can("ver_empleados", $empleado)
        <div class="bg-white grow rounded shadow p-4 min-w-64 flex flex-col">
            <h3 class="font-bold mb-1">Empleados</h3>
            <p class="mb-1">Tienes permiso para:</p>
            <ol class="list-decimal pl-7 text-sm grow">
                <li>Listar empleados</li>
                <li>Mostrar empleados</li>
                @can("interactuar_empleados", $empleado) 
                <li>Crear empleados</li>
                <li>Editar empleados</li>
                @endcan
                @can("eliminar_empleados", $empleado)
                <li>Borrar empleados</li>
                @endcan
            </ol>
            <a href="/empleado/listar" class="box-border p-1 flex gap-2 items-center justify-center w-full my-2 text-white rounded bg-primary-500 hover:bg-primary-400 active:bg-primary-600">
                <i class="fa-solid fa-share"></i>
                Ir
            </a>
        </div>
        @endcan

        @can("ver_clientes", $empleado)
        <div class="bg-white grow rounded shadow p-4 min-w-64 flex flex-col">
            <h3 class="font-bold mb-1">Clientes</h3>
            <p class="mb-1">Tienes permiso para:</p>
            <ol class="list-decimal pl-7 text-sm grow">
                <li>Listar clientes</li>
                <li>Mostrar clientes</li>
                @can("interactuar_clientes", $empleado) 
                <li>Crear clientes</li>
                <li>Editar clientes</li>
                @endcan
                @can("eliminar_clientes", $empleado)
                <li>Borrar clientes</li>
                @endcan
            </ol>
            <a href="/cliente/listar" class="box-border p-1 flex gap-2 items-center justify-center w-full my-2 text-white rounded bg-primary-500 hover:bg-primary-400 active:bg-primary-600">
                <i class="fa-solid fa-share"></i>
                Ir
            </a>
        </div>
        @endcan

        @can("ver_categorias", $empleado)
        <div class="bg-white grow rounded shadow p-4 min-w-64 flex flex-col">
            <h3 class="font-bold mb-1">Categorías</h3>
            <p class="mb-1">Tienes permiso para:</p>
            <ol class="list-decimal pl-7 text-sm grow">
                <li>Listar categorías</li>
                <li>Mostrar categorías</li>
                @can("interactuar_categorias", $empleado) 
                <li>Crear categorías</li>
                <li>Editar categorías</li>
                @endcan
                @can("eliminar_categorias", $empleado)
                <li>Borrar categorías</li>
                @endcan
            </ol>
            <a href="/categoria/listar" class="box-border p-1 flex gap-2 items-center justify-center w-full my-2 text-white rounded bg-primary-500 hover:bg-primary-400 active:bg-primary-600">
                <i class="fa-solid fa-share"></i>
                Ir
            </a>
        </div>
        @endcan

        @can("ver_productos", $empleado)
        <div class="bg-white grow rounded shadow p-4 min-w-64 flex flex-col">
            <h3 class="font-bold mb-1">Productos</h3>
            <p class="mb-1">Tienes permiso para:</p>
            <ol class="list-decimal pl-7 text-sm grow">
                <li>Listar productos</li>
                <li>Mostrar productos</li>
                @can("interactuar_productos", $empleado) 
                <li>Crear productos</li>
                <li>Editar productos</li>
                @endcan
                @can("eliminar_productos", $empleado)
                <li>Borrar productos</li>
                @endcan
            </ol>
            <a href="/producto/listar" class="box-border p-1 flex gap-2 items-center justify-center w-full my-2 text-white rounded bg-primary-500 hover:bg-primary-400 active:bg-primary-600">
                <i class="fa-solid fa-share"></i>
                Ir
            </a>
        </div>
        @endcan

    </div>

    <h2 class="font-bold text-2xl mt-5 mb-2 pb-4 border-b-2 border-quinary-700">Sensores</h2>
    <div class="flex gap-4 flex-wrap w-full">
        <div class="bg-white grow rounded shadow p-4 min-w-64 flex flex-col">h</div>
        <div class="bg-white grow rounded shadow p-4 min-w-64 flex flex-col">h</div>
    </div>

</div>
@endsection