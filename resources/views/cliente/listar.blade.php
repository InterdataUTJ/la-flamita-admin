{{-- Ruta de la platilla base --}}
@extends('plantillas.layout')

{{-- Agregar una section por cada yield --}}
@section('titulo', 'Listar clientes')

{{-- @endsection --}}
{{-- Seccion para componentes o etiquetas --}}
@section('contenido')

<a class="block box-border mb-5 text-white bg-primary-500 hover:bg-primary-400 active:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm p-2 text-center" href="/cliente/crear">Crear</a>

@if($clientes->isEmpty())   
    No Existen Clientes
@else
<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="text-center px-6 py-3">
                    #
                </th>
                <th scope="col" class="text-center px-6 py-3">
                    Avatar
                </th>
                <th scope="col" class="text-center px-6 py-3">
                    Nombre
                </th>
                <th scope="col" class="text-center px-6 py-3">
                    Apellido
                </th>
                <th scope="col" class="text-center px-6 py-3">
                    Correo
                </th>
                <th scope="col" class="text-center px-6 py-3">
                    Verificado
                </th>
                <th scope="col" class="text-center px-6 py-3">
                    Acción
                </th>
                <th scope="col" class="text-center px-6 py-3">
                    Eliminar
                </th>
            </tr>
        </thead>
        <tbody>
            @foreach($clientes as $cliente)
            <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" class="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {{$cliente->id}}
                </th>
                <td class="px-6 py-4">
                  <img src="{{$cliente->avatar}}" alt="imagen" class="w-10 h-10 rounded-full">
                </td>
                <th scope="row" class="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{$cliente->nombre}}
                </th>
                <td class="text-center px-6 py-4">
                    {{$cliente->apellido}}
                </td>
                <td class="text-center px-6 py-4">
                    {{$cliente->correo}}
                </td>
                <td class="text-center px-6 py-4">
                    {{ $cliente->verificado ? 'Verificado' : 'No verificado' }}
                </td>
                <td class="text-center px-6 py-4 flex gap-4">
                    <a href="/cliente/editar/{{$cliente->id}}">
                        <i class="fa-solid fa-pen-to-square fa-xl" style="color: #FFD43B;"></i> <!--Botón de Editar-->
                    </a>
                    <a href="/cliente/mostrar/{{$cliente->id}}" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                        <i class="fa-regular fa-eye fa-lg"></i>
                    </a>
                </td>
                <td class="text-center px-6 py-4">
                    <form action="{{URL('/cliente/borrar/'.$cliente->id)}}" method="POST">
                        @csrf
                        @method('DELETE')
                        <input style="cursor: pointer; color: red" type="submit" value="Eliminar" onclick="return confirm('¿Desas eliminar este Cliente?')" />
                    </form>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
</div>
@endif
@endsection