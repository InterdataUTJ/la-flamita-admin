@extends("plantillas.layout")

@section("titulo", "Dashboard")

@section("contenido")
<h2 class="text-center font-extrabold text-3xl mb-8">Panel de Control</h2>
<div class="flex flex-col gap-4">

    <h2 class="font-bold text-2xl mb-2 pb-4 border-b-2 border-quinary-700">Módulos</h2>
    <div class="flex gap-4 flex-wrap w-full">
        @can("modulo_empleados", auth()->guard("empleado")->user())
            <div class="bg-white grow rounded shadow p-4 min-w-64">
                <h3 class="font-bold mb-1">Empleados</h3>
                <p class="mb-1">Tienes permiso para:</p>
                <ol class="list-decimal pl-7 text-sm">
                    <li>Listar empleados</li>
                    <li>Crear empleados</li>
                    <li>Editar empleados</li>
                    <li>Borrar empleados</li>
                </ol>
                <a href="/empleado/listar" class="box-border p-1 flex gap-2 items-center justify-center w-full my-2 text-white rounded bg-primary-500 hover:bg-primary-400 active:bg-primary-600">
                    <i class="fa-solid fa-share"></i>
                    Ir
                </a>
            </div>
        @endcan

        <div class="bg-white grow rounded shadow p-4 min-w-64">
            <h3 class="font-bold mb-1">Clientes</h3>
            <p class="mb-1">Tienes permiso para:</p>
            <ol class="list-decimal pl-7 text-sm">
                <li>Listar clientes</li>
                <li>Crear clientes</li>
                <li>Editar clientes</li>
                @can("eliminar_clientes", auth()->guard("empleado")->user()) 
                    <li>Borrar clientes</li> 
                @endcan
            </ol>
            <a href="/cliente/listar" class="box-border p-1 flex gap-2 items-center justify-center w-full my-2 text-white rounded bg-primary-500 hover:bg-primary-400 active:bg-primary-600">
                <i class="fa-solid fa-share"></i>
                Ir
            </a>
        </div>
    </div>

    <h2 class="font-bold text-2xl mt-5 mb-2 pb-4 border-b-2 border-quinary-700">Sensores</h2>
    <div class="flex gap-4 flex-wrap w-full">
        <div class="bg-white grow rounded shadow p-4 min-w-64">h</div>
        <div class="bg-white grow rounded shadow p-4 min-w-64">h</div>
    </div>

</div>
@endsection