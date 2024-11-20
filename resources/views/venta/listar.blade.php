@extends("plantillas.layout")

@section("titulo", "Listar ventas")

@section("contenido")

@can("interactuar_ventas", auth()->guard('empleado')->user())
<div class="flex gap-4 w-full">
    <a class="grow block box-border mb-5 font-bold border border-4 border-primary-500 bg-transparent hover:bg-primary-400 active:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-sm p-2 text-center text-primary-500 hover:text-white" href="/venta/entregar">
        <i class="fa-solid fa-pen-to-square"></i>
        Entregar
    </a>
    <a class="grow block box-border mb-5 text-white font-bold bg-primary-500 hover:bg-primary-400 active:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-sm p-2 text-center" href="/venta/crear">
        <i class="fa-solid fa-pen-to-square"></i>
        Crear
    </a>
</div>
@endcan
  
@if($ventas->isEmpty())   
  No existen ventas
@else
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-quinary-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="text-center px-6 py-3">
                    #
                </th>
                <th scope="col" class="text-center px-6 py-3">
                    Fecha
                </th>
                <th scope="col" class="text-center px-6 py-3">
                    Metodo de pago
                </th>
                <th scope="col" class="text-center px-6 py-3">
                    Total
                </th>
                <th scope="col" class="text-center px-6 py-3">
                    Productos
                </th>
                <th scope="col" class="text-center px-6 py-3">
                    Estado
                </th>
                <th scope="col" class="text-center px-6 py-3">
                    Acción
                </th>
            </tr>
        </thead>
        <tbody>
            @foreach($ventas as $venta)
            <tr venta="{{ $venta->id }}" class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" class="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {{$venta->id}}
                </th>
                <th campo="nombre" scope="row" class="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{$venta->fecha_venta}}
                </th>
                <td class="text-center px-6 py-4">
                    {{$venta->metodo_pago}}
                </td>
                <td class="text-center px-6 py-4">
                    ${{$venta->getTotal()}} MXN
                </td>
                <td class="text-center px-6 py-4">
                    {{$venta->getNumeroProductos()}}
                </td>
                <td class="text-center px-6 py-4">
                    {{ $venta->estado === "COMPLETADO" ? "Completado" : "Por recoger" }}
                </td>
                <td class="text-center px-6 py-4 flex gap-4 justify-center items-center">
                  <a href="/venta/mostrar/{{$venta->id}}">
                    <i class="fa-regular fa-eye fa-lg text-quaternary-500 hover:scale-105"></i>
                  </a>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
  </div>
  <div class="grid justify-items-center gap-4 mt-4">
      {{ $ventas->links() }}
  </div>
@endif
@endsection