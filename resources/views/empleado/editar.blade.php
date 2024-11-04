{{-- Ruta de la platilla base --}}
@extends('plantillas.layout')

{{-- Agregar una section por cada yield --}}
@section('titulo', 'Editar empleado')

{{-- @endsection --}}
{{-- Seccion para componentes o etiquetas --}}
@section('contenido')

    <h2 class="text-center font-extrabold text-3xl mb-8 mt-4">Editar empleado</h2>
    <div class="mt-4">
        <form action="/empleado/update/{{ $empleado->id }}" method="POST" enctype="multipart/form-data">
            @method('PUT')
            @csrf
            <div class="mb-5">
                <label for="nombre" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre *</label>
                <input type="text" id="nombre" name="nombre" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                    placeholder="John" required minlength="3" maxlength="50" value="{{ $empleado->nombre }}" />
            </div>
            <div class="mb-5">
                <label for="apellido" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Apellido *</label>
                <input type="text" id="apellido" name="apellido" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                    required placeholder="Doe" minlength="3" maxlength="50" value="{{ $empleado->apellido }}" />
            </div>
            <div class="mb-5">
                <label for="correo" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo *</label>
                <input type="text" id="correo" name="correo" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                    placeholder="ejemplo@gmail.com" required maxlength="255" minlength="5" value="{{ $empleado->correo }}" />
            </div>
            <div class="mb-5">
                <label for="clave" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Clave</label>
                <div class="mt-1 text-sm italic text-gray-500 mb-2" id="user_avatar_help">Sobrescribir la anterior</div>
                <x-password name="clave" required minlength="8" maxlength="255" placeholder="••••••••••••" />
            </div>
            <div class="mb-5">
                <label for="clave2" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Repetir clave</label>
                <x-password name="clave2" required minlength="8" maxlength="255" placeholder="••••••••••••" />
            </div>
            <div class="mb-5">
                <label for="rol" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rol *</label>
                <select name="rol" id="rol" required class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light">
                    <option {{ $empleado->rol === "ADMINISTRADOR" ? "selected" : "" }} value="ADMINISTRADOR">Administrador</option>
                    <option {{ $empleado->rol === "GERENTE" ? "selected" : "" }} value="GERENTE">Gerente</option>
                    <option {{ $empleado->rol === "EMPLEADO" ? "selected" : "" }} value="EMPLEADO">Empleado</option>
                </select>
            </div>
            <div class="mb-5">
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="user_avatar">Avatar</label>
                <input class="block mb-4 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50" id="user_avatar" name="avatar" type="file">
                <div class="my-1 italic text-sm text-gray-500" id="user_avatar_help">Avatar actual</div>
                <img class="w-20 h-20 rounded-full" src="{{ $empleado->avatar }}" alt="{{ $empleado->avatar }}">
            </div>
        
            <button type="submit" class="flex justify-center items-center gap-2 w-full text-white bg-primary-500 hover:bg-primary-400 focus:ring-4 focus:outline-none focus:ring-primary-400 font-bold rounded-lg text-sm px-5 py-2.5 text-center active:bg-primary-600">
                <i class="fa-solid fa-floppy-disk"></i>
                Guardar cambios
            </button>

        </form>
    </div>







@endsection
