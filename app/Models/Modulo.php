<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Modulo extends Model {
    use HasFactory;

    public function modulo_datos() {
        // Relacion uno a muchos - hasMany en el modelo que no tiene la clave foránea
        return $this->hasMany(ModuloDato::class);
    }


    // Metodos
    public function getUltimoDato() {
        if ($this->modulo_datos->last() == null) return "Sin registros";
        return $this->modulo_datos->last()->getDato();
    }

    public function getKeys() {
        if ($this->modulo_datos->last() == null) return [];
        return array_keys($this->modulo_datos->last()->getDatos());
    }

    public function getDias($tipo = "temperatura") {
        // Obtener todos

        $datos = [];
        foreach ($this->modulo_datos as $dato) {
            $datoFormateado = $dato->getFormat($tipo);
            $datos[$datoFormateado["fecha"]] = $datoFormateado["dato"];
        }
        return $datos;
    }
}
