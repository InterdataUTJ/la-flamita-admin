@extends('plantillas.layout')

@section('titulo', 'Editar producto')


@section('contenido')
    <h2 class="text-center font-extrabold text-3xl mb-8 mt-4">Editar producto</h2>
    <div class="mt-4">
        <form action="/producto/update/{{ $producto->id }}" method="POST" enctype="multipart/form-data">
            @method('PUT')
            @csrf
            <div class="mb-5">
                <label for="nombre" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre *</label>
                <input type="text" id="nombre" name="nombre" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Taco" required minlength="3" maxlength="50" value="{{ $producto->nombre }}" />
            </div>
            <div class="mb-5">
                <label for="descripcion" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripción *</label>
                <textarea id="descripcion" name="descripcion" rows="3" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500" placeholder="Descripción..." minlength="3" required>{{ $producto->descripcion }}</textarea>
            </div>
            <div class="mb-5">
                <label for="precio" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Precio (MXN) *</label>
                <input type="number" id="precio" name="precio" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" required placeholder="Pesos mexicanos" min="0" step="0.1" value="{{ $producto->precio }}" />
            </div>
            <div class="mb-5">
                <label for="existencias" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Existencias *</label>
                <input type="number" id="existencias" name="existencias" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Unidades" required min="0" value="{{ $producto->existencias }}" />
            </div>
            <div class="mb-5">
                <label for="descuento" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descuento (%) *</label>
                <input type="number" id="descuento" name="descuento" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" required placeholder="Porcentaje" min="0" step="0.1" value="{{ $producto->descuento }}" />
            </div>
            <div class="mb-5">
                <label for="clave" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Imagenes</label>
                <p class="mb-2 italic">Las imagenes remplazaran a las anteriores.</p>
                <div class="mb-2 flex gap-4 flex-wrap">
                    @foreach ($producto->producto_fotos as $foto)
                        <img class="h-48 w-auto rounded" src="{{ $foto->url }}" alt="">
                    @endforeach
                </div>
                <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:ring-primary-500 focus:border-primary-500" id="fotos" name="fotos[]" type="file" multiple accept="image/jpeg, image/png, image/jpg, image/gif, image/svg, image/webp">
            </div>

            
            <h2 class="font-bold text-2xl mt-8 mb-5 pb-4 border-b-2 border-quinary-700">Categorías</h2>


            @foreach ($categorias as $categoria)
                <h2 class="font-semibold text-lg mt-4 mb-2 pb-1 border-b-2 border-primary-700 max-w-prose">{{ $categoria->nombre }}</h2>

                @foreach ($categoria->categoria_datos as $dato)
                    <div class="flex items-center mb-1">
                        <input name="categorias[{{ $categoria->nombre }}]" id="{{ $categoria->nombre }}-{{ $dato->nombre }}" value="{{ $dato->id }}" type="radio" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-primary-500 focus:border-primary-400 accent-primary-500 text-primary-500" {{ $producto->categoria_datos->contains($dato->id) ? "checked" : "" }} >
                        <label for="{{ $categoria->nombre }}-{{ $dato->nombre }}" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{ $dato->nombre }}</label>
                    </div>
                @endforeach
            @endforeach



            <button type="submit" class="mt-6 flex justify-center items-center gap-2 w-full text-white bg-primary-500 hover:bg-primary-400 focus:ring-4 focus:outline-none focus:ring-primary-400 font-bold rounded-lg text-sm px-5 py-2.5 text-center active:bg-primary-600">
                <i class="fa-solid fa-pen-to-square"></i>
                Editar producto
            </button>
        </form>
    </div>







@endsection
