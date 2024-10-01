@extends('/plantillas/layout')

@section("titulo", "La Flamita")

@section("contenido")
<main>
    {{-- Banner --}}
    <div class="flex justify-center items-center relative w-full h-56 overflow-hidden mb-5">
        <h3 class="relative z-10 text-first text-5xl font-extrabold">La Flamita</h3>
        <img class="brightness-50 blur-sm absolute inset-0 object-cover" src="{{ URL("/images/banner.jpg") }}" alt="Banner">
    </div>

    <section class="max-w-screen-lg w-11/12 mx-auto">

        <h2 class="text-center text-4xl font-extrabold mb-6">Menú</h2>

        {{-- Contenedor de productos --}}
        <div class="flex flex-wrap gap-5 justify-center">

            <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex p-4 items-center">
                <img class="object-cover w-32 rounded-t-lg" src="{{ URL("/storage/products/coca-cola.webp") }}" alt="product image" />
                <div class="flex flex-col gap flex-1">
                    <h5 class="text-lg font-bold text-gray-900 dark:text-white">Coca-Cola</h5>
                    <p>Coca-Cola de vidrio de 600 ml.</p>
                    <div class="flex items-center mt-2">
                        <span class="text-xl font-bold text-gray-900 mr-4 flex-1">$599</span>
                        <a href="#" class="text-white bg-fifth/95 hover:bg-fifth/90 active:bg-fifth focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">Añadir al carrito</a>
                    </div>
                </div>
            </div>
    

    
        </div>
    </section>
</main>
@endsection