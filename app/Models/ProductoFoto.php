<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductoFoto extends Model {
    use HasFactory;

    public function producto() {
        // Relación de uno a muchos - belongsTo en el modelo con la llave foranea
        return $this->belongsTo(Producto::class);
    }
}
