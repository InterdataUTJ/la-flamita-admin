@extends("plantillas.layout")

@section("titulo", "Entregar pedido")

@section("contenido")
  <h1 class="text-center font-bold text-3xl mb-5">Entregar pedido</h1>

  <form action="/venta/entregar" method="POST">
    @csrf
    <div class="mb-5">
      <label for="token" class="block mb-2 text-sm font-semibold text-gray-900">Código de entrega *</label>
      <input type="text" id="token" name="token" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" required placeholder="Token" minlength="22" />
    </div>

    <button type="submit" class="flex justify-center items-center gap-2 w-full text-white bg-primary-500 hover:bg-primary-400 focus:ring-4 focus:outline-none focus:ring-primary-400 font-bold rounded-lg text-sm px-5 py-2.5 text-center active:bg-primary-600">
        <i class="fa-solid fa-pen-to-square"></i>
        Marcar como entregado
    </button>

  </form>
@endsection