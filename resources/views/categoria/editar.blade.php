@extends('plantillas.layout')

@section('titulo', 'Editar categoria')

@section('contenido')
    <h2 class="text-center font-extrabold text-3xl mb-8 mt-4">Editar categoría</h2>
    <div class="mt-4">
        <form action="/categoria/update/{{ $categoria->id }}" method="POST" enctype="multipart/form-data">
            @method('PUT')
            @csrf
            <div class="mb-5">
                <label for="nombre" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre *</label>
                <input type="text" id="nombre" name="nombre" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="John" required minlength="3" maxlength="50" value="{{ $categoria->nombre }}" />
            </div>
            <div class="mb-5">
                <label for="descripcion" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripción *</label>
                <textarea id="descripcion" name="descripcion" rows="5" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500" placeholder="Descripción..." minlength="3" required>{{ $categoria->descripcion }}</textarea>
            </div>

            <h2 class="font-bold text-2xl mt-5 mb-5 pb-4 border-b-2 border-quinary-700">Valores</h2>

            <div id="categoria-valores-contenedor" class="mb-2 flex flex-col gap-2">
                
                @foreach ($categoria->categoria_datos as $dato)
                    <div class="flex">
                        <input type="text" name="valores[]" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                            placeholder="Nombre" required minlength="3" maxlength="50" value="{{ $dato->nombre }}" />
                        
                        <button onclick="this.parentNode.remove();" type="button" class="bg-secondary-600 hover:bg-secondary-500 active:bg-secondary-700 px-4 rounded-r-lg text-white">
                            <i class="fa-regular fa-trash-can"></i>
                        </button>
                    </div>
                @endforeach

            </div>

            <button onclick="crearCategoriaValor();" type="button" class="mb-5 flex justify-center items-center gap-2 w-full text-white bg-tertiary-600 hover:bg-tertiary-500 focus:ring-4 focus:outline-none focus:ring-tertiary-400 font-bold rounded-lg text-sm px-5 py-2.5 text-center active:bg-tertiary-700">
                <i class="fa-solid fa-plus"></i>
                Añadir valor
            </button>
            

            <button type="submit" class="flex justify-center items-center gap-2 w-full text-white bg-primary-500 hover:bg-primary-400 focus:ring-4 focus:outline-none focus:ring-primary-400 font-bold rounded-lg text-sm px-5 py-2.5 text-center active:bg-primary-600">
                <i class="fa-solid fa-pen-to-square"></i>
                Editar categoría
            </button>
        </form>
    </div>







@endsection
