<?php

namespace App\Http\Controllers;

use App\Models\Empleado;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class PerfilController extends Controller {
    public function index() {
        return view('perfil.index');
    }

    public function editar() {
        return view('perfil.editar');
    }

    public function update(Request $request) {
        $id = auth()->user()->id;
        $request->validate([
            'nombre' => 'required|string|max:50|min:3',
            'apellido' => 'required|string|max:50|min:3',
            'correo' => "required|email|unique:empleados,correo,{$id}|max:255|min:5",
            'clave' => "nullable|min:8|max:255",
            'clave2' => "nullable|min:8|max:255|same:clave",
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
        ]);

        $empleado = Empleado::find(auth()->user()->id);
        $empleado-> nombre = $request->nombre;
        $empleado->apellido = $request->apellido;
        $empleado->correo = $request->correo;
        
        if ($request->has("clave") && $request->clave != null) {
            $empleado->clave = Hash::make($request->clave);
        }
        
        if ($request->hasFile("avatar") && $request->avatar != null) {
            $image = $request->avatar;
            $imagennueva = "empleado_{$empleado->id}.{$image->extension()}";
            $ruta = $image->storeAs('imagenes/empleados/', $imagennueva, 'public');
            $empleado->avatar = "/storage/$ruta";
        }
        
        $empleado->save();
        return redirect()->route('perfil.index');
    }
}
