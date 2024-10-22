<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categoria extends Model {
    use HasFactory;

    public function productos() {
        // Muchos a muchos - belongsToMany en ambos modelos
        return $this->belongsToMany(Producto::class);
    }
}
