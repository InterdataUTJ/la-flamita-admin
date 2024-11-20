@props(['nombre', 'datos' => []])

<div id="panel-sensor-{{ $nombre }}-contenedor" class="bg-white grow rounded shadow p-4 min-w-64 flex flex-col gap-2">
  <p id="panel-sensor-{{ $nombre }}-titulo" class="text-center font-bold text-xl">{{ $nombre }}</p>
  <section id="panel-sensor-{{ $nombre }}-section" class="flex justify-center items-center gap-2">
    @foreach ($datos["datos"] as $key => $dato)
      <div class="shadow border rounded p-3 w-60 aspect-square gap-2 flex flex-col justify-center items-center">
        <span class="font-bold text-xl">{{ $key }}</span>
        <span class="font-bold text-6xl mb-4">{{ $dato }}</span>
        <span class="italic">{{ $datos["fecha"] }}</span>
      </div>
    @endforeach  
  </section>
</div>