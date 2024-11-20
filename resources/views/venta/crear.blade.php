@extends("plantillas.layout")

@section("titulo", "Listar ventas")

@section("contenido")
  <h1 class="text-center font-bold text-3xl mb-5">Nueva venta</h1>

  <form action="/venta/store" method="POST">
    @csrf
    <div class="mb-5">
      <label for="metodo_pago" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Método de Pago: </label>
      <select name="metodo_pago" id="metodo_pago" required class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
        <option value="EFECTIVO">Efectivo</option>
        <option value="TARJETA">Tarjeta</option>
      </select>
    </div>
    

    <h3 class="font-bold text-xl mt-5 py-2">Productos</h3>
    <div id="productos-container">
    </div>

    <script>
      window.onload = () => {
        agregarProducto(@json($productos));
      }
    </script>

    <button type="button" class="mb-5 flex justify-center items-center gap-2 w-full text-white bg-quinary-600 hover:bg-quinary-500 focus:ring-4 focus:outline-none focus:ring-quinary-700 font-bold rounded-lg text-sm px-5 py-2.5 text-center active:bg-quinary-700" onclick='agregarProducto(@json($productos))'>
      <i class="fa-solid fa-plus"></i>
      Añadir producto
    </button>

    <button type="submit" class="flex justify-center items-center gap-2 w-full text-white bg-primary-500 hover:bg-primary-400 focus:ring-4 focus:outline-none focus:ring-primary-400 font-bold rounded-lg text-sm px-5 py-2.5 text-center active:bg-primary-600">
        <i class="fa-solid fa-pen-to-square"></i>
        Crear nueva Venta
    </button>

  </form>
@endsection