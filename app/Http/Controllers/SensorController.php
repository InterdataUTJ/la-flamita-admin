<?php

namespace App\Http\Controllers;

use App\Models\Modulo;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class SensorController extends Controller {
    public function index() {
        $sensores = Modulo::simplePaginate(10);
        return view('sensor.listar')->with('sensores', $sensores);
    }


    public function create() {
        return view('sensor.crear');
    }

    public function store(Request $request) {
        $request->validate([
            'nombre' => 'required|string|max:50|min:3'
        ]);
        
        $sensor = new Modulo();
        $sensor-> nombre = $request->nombre;
        $sensor->token = "PENDIENTE";
        $sensor->save();
        $sensor->token = $sensor->id . date_create()->format('Uv') . Str::random(10);
        $sensor->save();
        
        return redirect("/sensor/listar");
    }

    public function edit($id){
        $sensor = Modulo::find($id);
        return view('sensor.editar')->with('sensor', $sensor);
    }

    public function update(Request $request, $id){
        $request->validate([
            'nombre' => 'required|string|max:50|min:3'
        ]);
        
        $sensor = Modulo::find($id);
        $sensor-> nombre = $request->nombre;
        $sensor->save();
        return redirect("/sensor/listar");
    }


    public function show($id){
        $sensor = Modulo::find($id);
        return view('sensor.mostrar')->with('sensor', $sensor);
    }

    public function delete($id) {
        //Busca la coincidencia del id
        $sensor = Modulo::find($id);
        $sensor->delete();
        return redirect('/sensor/listar');
    }


    public function recibir(Request $request) {
        $header = $request->header('Authorization');
        if (!$header) {
            return response()->json([
                'message' => 'No se ha proporcionado un token de autorización.'
            ], 401);
        }

        $token = substr($header, 7);
        $sensor = Modulo::where('token', $token)->first();
        if (!$sensor) {
            return response()->json([
                'message' => 'Token de autorización inválido.'
            ], 401);
        }

        $sensor->modulo_datos()->create([
            'datos' => json_encode($request->all())
        ]);

        return response()->json([
            'message' => 'Dato recibido correctamente.'
        ]);
    }

    public function datos() {
        $sensores = Modulo::all();

        $datos = [];
        foreach ($sensores as $sensor) {
            $dato = $sensor->modulo_datos->last()->getDatosArray();
            $datos[$sensor->nombre] = $dato;
        }

        return view('sensor.panel')->with('datos', $datos);
    }
}
