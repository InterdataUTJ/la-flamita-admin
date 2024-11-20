@foreach($datos as $nombre => $dato)
  <x-sensores nombre="{{ $nombre }}" :datos="$dato" />
@endforeach