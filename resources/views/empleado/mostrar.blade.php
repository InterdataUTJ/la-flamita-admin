{{-- Ruta de la platilla base --}}
@extends('plantillas.layout')

{{-- Agregar una section por cada yield --}}
@section('titulo', 'Mostrar empleado')

{{-- @endsection --}}
{{-- Seccion para componentes o etiquetas --}}
@section('contenido')

    <h2 class="text-center font-extrabold text-3xl mb-8 mt-4">Ver empleado</h2>
    <div class="mt-4">
        <form action="/empleado/borrar/{{ $empleado->id }}" method="POST" enctype="multipart/form-data">
            @method('DELETE')
            @csrf
            <div class="mb-5">
                <label for="nombre" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                <input type="text" id="nombre"
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    value="{{ $empleado->nombre }}" placeholder="name@flowbite.com" disabled />
            </div>
            <div class="mb-5">
                <label for="apellido" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Apellido</label>
                <input type="text" id="apellido" value="{{ $empleado->apellido }}"
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    disabled/>
            </div>
            <div class="mb-5">
                <label for="correo" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo</label>
                <input type="text" id="correo" value="{{ $empleado->correo }}"
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    disabled />
            </div>
            <div class="mb-5">
                <label for="rol" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rol *</label>
                <select name="rol" id="rol" disabled class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light">
                    <option {{ $empleado->rol === "ADMINISTRADOR" ? "selected" : "" }} value="ADMINISTRADOR">Administrador</option>
                    <option {{ $empleado->rol === "GERENTE" ? "selected" : "" }} value="GERENTE">Gerente</option>
                    <option {{ $empleado->rol === "EMPLEADO" ? "selected" : "" }} value="EMPLEADO">Empleado</option>
                </select>
            </div>
            <div class="mb-5">
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="user_avatar">Avatar</label>
                <img class="w-20 h-20 rounded-full" src="{{ $empleado->avatar }}" alt="{{ $empleado->apellido }}">
            </div>
            
            @can("eliminar_empleados", auth()->guard("empleado")->user())
            <button onclick="return confirm('¿Desas eliminar este Empleado?')" type="submit" class="flex w-full text-white bg-red-500 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-red-400 font-semibold rounded-lg text-sm px-5 py-2.5 text-center active:bg-red-600 justify-center items-center gap-2">
                <i class="fa-solid fa-trash-can"></i>
                Eliminar empleado
            </button>
            @endcan
        </form>
    </div>







@endsection