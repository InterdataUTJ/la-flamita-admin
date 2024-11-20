@extends("plantillas.layout")

@section("titulo", "Editar Perfil")

@php
  $usuario = Auth::user();
@endphp

@section("contenido")
<h2 class="text-center font-extrabold text-3xl my-5">Editar Perfil</h2>

<div class="flex flex-col md:flex-row gap-4 justify-center items-center p-5 bg-quinary-300 rounded-lg shadow">
  <img class="w-20 h-20 rounded-full object-contain select-none bg-quinary-100" src="{{ $usuario->avatar }}" alt="avatar">
  <div class="flex flex-col gap-2">
    <p class="font-extrabold text-quinary-900">{{ $usuario->nombre }} {{ $usuario->apellido }}</p>
    <p class="font-bold text-gray-600">{{ $usuario->rol }}</p>
    <p class="font-semibold text-gray-600">{{ $usuario->correo }}</p>
  </div>
</div>

<form action="/perfil/editar" method="POST" class="my-8" enctype="multipart/form-data">
  @csrf
  @method("PUT")
    
  <div class="mb-5">
    <label for="nombre" class="block mb-2 text-sm font-semibold text-gray-900">Nombre *</label>
    <input type="text" id="nombre" name="nombre" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" required placeholder="Nombre" value="{{ $usuario->nombre }}" maxlength="50" minlength="3" />
  </div>
  <div class="mb-5">
    <label for="apellido" class="block mb-2 text-sm font-semibold text-gray-900">Apellido *</label>
    <input type="text" id="apellido" name="apellido" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" required placeholder="Apellido" value="{{ $usuario->apellido }}" maxlength="50" minlength="3" />
  </div>
  <div class="mb-5">
    <label for="correo" class="block mb-2 text-sm font-semibold text-gray-900">Correo *</label>
    <input type="email" id="correo" name="correo" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" required placeholder="Correo" value="{{ $usuario->correo }}" minlength="5" maxlength="255" />
  </div>
  
  <div class="mb-7">
    <label class="block text-sm font-medium text-gray-900 dark:text-white" for="user_avatar">Avatar</label>
    <p class="mt-1 text-sm text-gray-500 mb-2" id="user_avatar_help">Selecciona tu nuevo avatar</p>
    <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50" id="avatar" name="avatar" type="file" accept="image/jpeg, image/png, image/jpg, image/gif, image/svg, image/webp">
  </div>

  <div class="mb-5">
    <label for="clave" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nueva contraseña</label>
    <x-password :required="false" placeholder="Nueva contraseña" maxlength="50" name="clave" />
  </div>
  <div class="mb-5">
    <label for="clave2" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repetir contraseña</label>
    <x-password :required="false" placeholder="Repetir contraseña" maxlength="50" name="clave2" />
  </div>

  <button type="submit" class="mt-6 flex justify-center items-center gap-2 w-full text-white bg-primary-600 hover:bg-primary-500 focus:ring-4 focus:outline-none focus:ring-primary-400 font-bold rounded-lg text-sm px-5 py-2.5 text-center active:bg-primary-700">
    <i class="fa-solid fa-floppy-disk"></i>
    Guardar cambios
  </button>
</form>

@endsection