{{-- Ruta de la platilla base --}}
@extends('plantillas.layout')

{{-- Agregar una section por cada yield --}}
@section('titulo', 'Listar empleados')

{{-- @endsection --}}
{{-- Seccion para componentes o etiquetas --}}
@section('contenido')

@can("interactuar_empleados", auth()->guard('empleado')->user())
<a class="block box-border mb-5 text-white font-bold bg-primary-500 hover:bg-primary-400 active:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-sm p-2 text-center" href="/empleado/crear">
    <i class="fa-solid fa-pen-to-square"></i>
    Crear
</a>
@endcan

@if($empleados->isEmpty())   
    No Existen Empleados
@else
<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-quinary-100 dark:bg-gray-700 dark:text-gray-400">
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
                    Rol
                </th>
                <th scope="col" class="text-center px-6 py-3">
                    Acción
                </th>
            </tr>
        </thead>
        <tbody>
            @foreach($empleados as $empleado)
            <tr empleado="{{ $empleado->correo }}" class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" class="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{$empleado->id}}
                </th>
                <td class="px-6 py-4">
                    <img src="{{$empleado->avatar}}" alt="imagen" class="w-10 h-10 rounded-full">
                </td>
                <th campo="nombre" scope="row" class="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{$empleado->nombre}}
                </th>
                <td class="text-center px-6 py-4">
                    {{$empleado->apellido}}
                </td>
                <td class="text-center px-6 py-4">
                    {{$empleado->correo}}
                </td>
                <td class="text-center px-6 py-4">
                    {{ $empleado->rol }}
                </td>
                <td class="text-center px-6 py-4 flex gap-4 justify-center items-center">
                    @can("interactuar_empleados", auth()->guard('empleado')->user())
                    <a href="/empleado/editar/{{$empleado->id}}">
                        <i class="fa-solid fa-pen-to-square fa-xl text-quinary-500 hover:scale-105"></i> <!--Botón de Editar-->
                    </a>
                    @endcan
                    <a href="/empleado/mostrar/{{$empleado->id}}">
                        <i class="fa-regular fa-eye fa-lg text-quaternary-500 hover:scale-105"></i>
                    </a>
                    @can("eliminar_empleados", auth()->guard('empleado')->user())
                    <form action="/empleado/borrar/{{ $empleado->id }}" method="POST">
                        @csrf
                        @method('DELETE')
                        <button class="hover:scale-105 text-primary-700 cursor-pointer" type="submit" onclick="return confirm('¿Desas eliminar este Empleado?')">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </form>
                    @endcan
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
</div>
<div class="grid justify-items-center gap-4 mt-4">
    {{ $empleados->links() }}
</div>
@endif
@endsection