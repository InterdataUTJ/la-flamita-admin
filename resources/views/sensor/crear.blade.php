{{-- Ruta de la platilla base --}}
@extends('plantillas.layout')

{{-- Agregar una section por cada yield --}}
@section('titulo', 'Crear sensores')

{{-- @endsection --}}
{{-- Seccion para componentes o etiquetas --}}

@section('contenido')
    <h2 class="text-center font-extrabold text-3xl mb-8 mt-4">Crear sensores</h2>
    <div class="mt-4">
        <form action="/sensor/store" method="POST" enctype="multipart/form-data">
            @csrf
            <div class="mb-5">
                <label for="nombre" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre *</label>
                <input type="text" id="nombre" name="nombre" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                    placeholder="Refrigerador 1" required minlength="3" maxlength="50" />
            </div>
            <button type="submit" class="flex justify-center items-center gap-2 w-full text-white bg-primary-500 hover:bg-primary-400 focus:ring-4 focus:outline-none focus:ring-primary-400 font-bold rounded-lg text-sm px-5 py-2.5 text-center active:bg-primary-600">
                <i class="fa-solid fa-pen-to-square"></i>
                Crear sensor
            </button>
        </form>
    </div>
@endsection
