<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ModuloDato  extends Model {
    use HasFactory;

    protected $fillable = [
      'modulo_id', 
      'datos', 
    ];

    public function modulos() {
      // Uno a muchos - belongsTo en el modelo que tiene la clave foránea
        return $this->belongsTo(Modulo::class);
    }

    public function getDatos() {
      return json_decode($this->datos, true);
    }

    public function getDato() {
      $datos = $this->getDatos();
      if (count($datos) == 0) return "Sin datos";
      if (isset($datos["temperatura"])) return "Temperatura: " . $datos["temperatura"] . "°C";
      if (isset($datos["humedad"])) return "Humedad: " . $datos["humedad"] . "%";
      return "Sin datos";
    }

    public function get($tipo) {
      $datos = $this->getDatos();
      if (isset($datos[$tipo])) return $datos[$tipo];
      return "Sin datos";
    }

    public function format($tipo, $value) {
      if ($tipo == "temperatura") return "$value °C";
      if ($tipo == "humedad") return "$value%";
      return $value;
    }

    public function getFormat($tipo) {
      $datos = $this->getDatos();
      if (isset($datos[$tipo])) return [ "fecha" => $this->created_at->format('d/m/Y h:i:s a'), "dato" => $datos[$tipo]];
      return "Sin datos";
    }

    public function getDatosArray() {
      $datos = $this->getDatos();
      $result = [
        "fecha" => $this->created_at->format('d/m/Y h:i:s a'),
        "datos" => []
      ];

      foreach ($datos as $key => $value) {
        $result["datos"][ucfirst($key)] = $this->format($key, $value);
      }
      return $result;
    }
}
