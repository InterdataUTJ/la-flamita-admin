@extends('/plantillas/layout')

@section('titulo', 'Iniciar sesión')

@section("contenido")
<main class="w-11/12 max-w-screen-sm mx-auto pt-5">
    <h1 class="mb-5 text-center mb-4 text-3xl font-extrabold text-gray-900 dark:text-white">
        Iniciar sesión como Empleado
    </h1>
    
    <form class="mb-10" action="/empleado/login" method="POST" enctype="multipart/form-data">
        @csrf
        <div class="mb-5">
            <label for="correo" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo electrónico</label>
            <input type="email" name="correo" id="correo" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" placeholder="ejemplo@ejemplo.com" maxlength="50" required />
        </div>

        <div class="mb-5">
            <label for="clave" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
            <x-password placeholder="Contraseña" maxlength="50" required name="clave" />
        </div>

        <button type="submit" class="w-full text-black font-bold rounded-lg text-sm px-5 py-2.5 text-center inline-flex flex items-center justify-center gap-2 hover:bg-gray-100 active:bg-gray-200 text-white bg-primary-500 hover:bg-primary-400 active:bg-primary-600">
            <svg  xmlns="http://www.w3.org/2000/svg"  width="16"  height="16"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-user"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>
            Iniciar sesión
        </button>
    </form>

    <hr class="h-px my-8 bg-gray-300 border-0">

    <div class="flex flex-col gap-3">
        <a href="/login" class="w-full text-fifth font-bold rounded-lg text-sm px-5 py-2.5 text-center inline-flex flex items-center justify-center gap-2 border border-quaternary-700 text-quaternary-700 hover:bg-gray-100 active:bg-gray-200 cursor-pointer select-none">
            <svg  xmlns="http://www.w3.org/2000/svg"  width="16"  height="16"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-user"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>
            Iniciar sesión como cliente
        </a>
    </div>

</main>
@endsection