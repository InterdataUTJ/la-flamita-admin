@extends('plantillas.layout')

@section('titulo', 'Listar categorias')

@section('contenido')

<a class="block box-border mb-5 text-white font-bold bg-primary-500 hover:bg-primary-400 active:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-sm p-2 text-center" href="/categoria/crear">
    <i class="fa-solid fa-pen-to-square"></i>
    Crear
</a>

@if($categorias->isEmpty())   
    No existen categorias
@else
<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-quinary-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="text-center px-6 py-3">
                    #
                </th>
                <th scope="col" class="text-center px-6 py-3">
                    Nombre
                </th>
                <th scope="col" class="text-center px-6 py-3">
                    Valores (#)
                </th>
                <th scope="col" class="text-center px-6 py-3">
                    Acción
                </th>
            </tr>
        </thead>
        <tbody>
            @foreach($categorias as $categoria)
            <tr categoria="{{ $categoria->nombre }}" class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" class="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {{$categoria->id}}
                </th>
                <th campo="nombre" scope="row" class="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {{$categoria->nombre}}
                </th>
                <td class="text-center px-6 py-4">
                    {{ count($categoria->categoria_datos) }}
                </td>
                <td class="text-center px-6 py-4 flex gap-4 justify-center items-center">
                    <a href="/categoria/editar/{{$categoria->id}}">
                        <i class="fa-solid fa-pen-to-square fa-xl text-quinary-500 hover:scale-105"></i> <!--Botón de Editar-->
                    </a>
                    <a href="/categoria/mostrar/{{$categoria->id}}">
                        <i class="fa-regular fa-eye fa-lg text-quaternary-500 hover:scale-105"></i>
                    </a>
                    <form action="/categoria/borrar/{{ $categoria->id }}" method="POST">
                        @csrf
                        @method('DELETE')
                        <button class="hover:scale-105 text-primary-700 cursor-pointer" type="submit" onclick="return confirm('¿Desas eliminar este categoria?')">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </form>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
</div>
@endif
@endsection