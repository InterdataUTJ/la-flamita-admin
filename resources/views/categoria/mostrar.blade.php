@extends('plantillas.layout')

@section('titulo', 'Mostrar categoria')

@section('contenido')
    <h2 class="text-center font-extrabold text-3xl mb-8 mt-4">Mostrar categoría</h2>
    <div class="mt-4">
        <form action="/categoria/borrar/{{ $categoria->id }}" method="POST" enctype="multipart/form-data">
            @method('DELETE')
            @csrf
            <div class="mb-5">
                <label for="nombre" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre *</label>
                <input type="text" id="nombre" name="nombre" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" disabled value="{{ $categoria->nombre }}" />
            </div>
            <div class="mb-5">
                <label for="descripcion" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripción *</label>
                <textarea id="descripcion" name="descripcion" rows="5" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500" disabled>{{ $categoria->descripcion }}</textarea>
            </div>

            <h2 class="font-bold text-2xl mt-5 mb-5 pb-4 border-b-2 border-quinary-700">Valores</h2>

            <div class="mb-2 flex flex-col gap-2">
                @foreach ($categoria->categoria_datos as $dato)
                    <div class="flex">
                        <input type="text" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" disabled value="{{ $dato->nombre }}" />
                    </div>
                @endforeach

            </div>
            
            @can("eliminar_categorias", auth()->guard('empleado')->user())
            <button onclick="return confirm('¿Desas eliminar este categoría?')" type="submit" class="flex w-full text-white bg-red-500 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-red-400 font-semibold rounded-lg text-sm px-5 py-2.5 text-center active:bg-red-600 justify-center items-center gap-2">
                <i class="fa-solid fa-trash-can"></i>
                Eliminar categoría
            </button>
            @endcan
        </form>
    </div>







@endsection
