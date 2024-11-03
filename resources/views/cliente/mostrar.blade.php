{{-- Ruta de la platilla base --}}
@extends('plantillas.layout')

{{-- Agregar una section por cada yield --}}
@section('titulo', 'Mostrar cuenta')

{{-- @endsection --}}
{{-- Seccion para componentes o etiquetas --}}
@section('contenido')

    <div class="mt-4">
        <form action="/cliente/borrar/{{ $cliente->id }}" method="POST" enctype="multipart/form-data">
            @method('DELETE')
            @csrf
            <div class="mb-5">
                <label for="nombre" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                <input type="text" id="nombre"
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    value="{{ $cliente->nombre }}" placeholder="name@flowbite.com" disabled />
            </div>
            <div class="mb-5">
                <label for="apellido" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Apellido</label>
                <input type="text" id="apellido" value="{{ $cliente->apellido }}"
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    disabled/>
            </div>
            <div class="mb-5">
                <label for="correo" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo</label>
                <input type="text" id="correo" value="{{ $cliente->correo }}"
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    disabled />
            </div>
            <div class="mb-5">
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="user_avatar">Avatar</label>
                <img class="w-20 h-20 rounded-full" src="{{ $cliente->avatar }}" alt="{{ $cliente->apellido }}">
            </div>
            
            @can("eliminar_clientes", Empleados::class)
                <button onclick="return confirm('¿Desas eliminar este Cliente?')" type="submit" class="flex w-full text-white bg-red-500 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-red-400 font-semibold rounded-lg text-sm px-5 py-2.5 text-center active:bg-red-600 justify-center items-center gap-2">
                    <i class="fa-solid fa-trash-can"></i>
                    Eliminar cliente
                </button>
            @endcan
        </form>
    </div>







@endsection