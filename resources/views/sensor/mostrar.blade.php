{{-- Ruta de la platilla base --}}
@extends('plantillas.layout')

{{-- Agregar una section por cada yield --}}
@section('titulo', 'Mostrar sensor')

{{-- @endsection --}}
{{-- Seccion para componentes o etiquetas --}}

@section('contenido')
    <h2 class="text-center font-extrabold text-3xl mb-8 mt-4">Mostrar sensor #{{ $sensor->id }}</h2>
    <div class="mt-4">
        <form action="/sensor/borrar/{{ $sensor->id }}" method="POST" enctype="multipart/form-data">
            @csrf
            @method('DELETE')
            <div class="mb-5">
                <label for="nombre" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre *</label>
                <input type="text" id="nombre" name="nombre" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                    placeholder="Refrigerador 1" disabled minlength="3" maxlength="50" value="{{ $sensor->nombre }}" />
            </div>
            <div class="mb-5">
                <label for="token" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Token *</label>
                <x-password name="token" disabled value="{{ $sensor->token }}" />
            </div>

            <h2 class="font-bold text-2xl mt-8 mb-5 pb-4 border-b-2 border-quinary-700">Datos capturados</h2>

            <section class="flex flex-wrap items-center justify-center mb-5 gap-4">
                @foreach ($sensor->getKeys() as $key)
                    <div class="shadow rounded p-3 w-full max-w-prose aspect-[2/1] bg-white">
                        <canvas class="w-full h-full" id="sensor-grafica-{{ $key }}">
                    </div>
                @endforeach
            </section>

            @can("eliminar_sensores", auth()->guard("empleado")->user())
            <button onclick="return confirm('¿Desas eliminar este Sensor?')" type="submit" class="flex w-full text-white bg-red-500 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-red-400 font-semibold rounded-lg text-sm px-5 py-2.5 text-center active:bg-red-600 justify-center items-center gap-2">
                <i class="fa-solid fa-trash-can"></i>
                Eliminar sensor
            </button>
            @endcan
        </form>
    </div>

    <script>
        const datos = [
            @foreach ($sensor->getKeys() as $key)
                { 
                    canvasId: "sensor-grafica-{{ $key }}", 
                    options: {    
                        title: "{{ $key }}", 
                        data: {!! json_encode($sensor->getDias($key)) !!} 
                    },
                },
            @endforeach
        ];
        document.body.onload = () => {
            ChartJS.createMultiLine(datos);
        };
    </script>

@endsection
