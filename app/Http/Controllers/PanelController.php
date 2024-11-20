<?php

namespace App\Http\Controllers;

use App\Models\Modulo;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PanelController extends Controller {
  public function index() {
    $sensores = Modulo::all();

        $datos = [];
        foreach ($sensores as $sensor) {
            $dato = $sensor->modulo_datos->last()->getDatosArray();
            $datos[$sensor->nombre] = $dato;
        }

    return view('dashboard')->with('sensores', $datos);
  }
}
