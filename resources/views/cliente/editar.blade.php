{{-- Ruta de la platilla base --}}
@extends('plantillas.layout')

@include("plantillas.error")

{{-- Agregar una section por cada yield --}}
@section('titulo', 'Editar cliente')

{{-- @endsection --}}
{{-- Seccion para componentes o etiquetas --}}
@section('contenido')

    <div class="mt-4">
        <form action="/cliente/update/{{ $cliente->id }}" method="POST" enctype="multipart/form-data">
            @method('PUT')
            @csrf
            <div class="mb-5">
                <label for="nombre" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                <input type="text" id="nombre" name="nombre" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                    placeholder="John" required minlength="3" maxlength="50" value="{{ $cliente->nombre }}" />
            </div>
            <div class="mb-5">
                <label for="apellido" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Apellido</label>
                <input type="text" id="apellido" name="apellido" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                    required placeholder="Doe" minlength="3" maxlength="50" value="{{ $cliente->apellido }}" />
            </div>
            <div class="mb-5">
                <label for="correo" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo</label>
                <input type="text" id="correo" name="correo" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                    placeholder="ejemplo@gmail.com" required maxlength="255" minlength="5" value="{{ $cliente->correo }}" />
            </div>
            <div class="mb-5">
                <label for="clave" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Clave</label>
                <input type="password" id="clave" name="clave" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                    placeholder="••••••••••••" minlength="8" maxlength="255" />
            </div>
            <div class="mb-5">
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="user_avatar">Avatar</label>
                <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50" id="user_avatar" name="avatar" type="file">
                <div class="mt-1 text-sm text-gray-500" id="user_avatar_help">Avatar actual</div>
                <img class="w-20 h-20 rounded-full" src="{{ $cliente->avatar }}" alt="{{ $cliente->avatar }}">
            </div>
        
                <button type="submit" class="block w-full text-white bg-primary-500 hover:bg-primary-400 focus:ring-4 focus:outline-none focus:ring-primary-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center active:bg-primary-600">Editar cliente</button>

        </form>
    </div>







@endsection
