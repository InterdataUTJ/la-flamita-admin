<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Empleado;
use Illuminate\Support\Facades\Hash;

class EmpleadoController extends Controller {
    public function index() {
        $empleados = Empleado::where('estado', true)->get();
        return view('empleado.listar')->with('empleados', $empleados);
    }


    public function create() {
        return view('empleado.crear');
    }

    public function store(Request $request) {
        $request->validate([
            'nombre' => 'required|string|max:50|min:3',
            'apellido' => 'required|string|max:50|min:3',
            'correo' => 'required|email|unique:empleados,correo|max:255|min:5',
            'clave' => "required|min:8|max:255",
            'clave2' => "required|min:8|max:255|same:clave",
            'avatar' => 'image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'rol' => 'required|in:ADMINISTRADOR,GERENTE,EMPLEADO',
        ]);
        
        $empleado = new Empleado();
        $empleado-> nombre = $request->nombre;
        $empleado->apellido = $request->apellido;
        $empleado->correo = $request->correo;
        $empleado->clave = Hash::make($request->clave);
        $empleado->avatar = '/storage/avatar/default.svg';
        $empleado->estado = true;
        $empleado->rol = $request->rol;
        
        if ($request->hasFile("avatar")) {
            //Descargar de una variable 
            $image = $request->avatar;
            $imagennueva = "empleado_{$empleado->id}.{$image->extension()}";
            $ruta = $image->storeAs('imagenes/empleados/', $imagennueva, 'public');
            $empleado->avatar = "/storage/$ruta";
        }
        
        $empleado->save();
        return redirect("/empleado/listar");
    }

    public function edit($id){
        $empleado = Empleado::find($id);
        return view('empleado.editar')->with('empleado', $empleado);
    }

    public function update(Request $request, $id){
        $request->validate([
            'nombre' => 'required|string|max:50|min:3',
            'apellido' => 'required|string|max:50|min:3',
            'correo' => "required|email|unique:empleados,correo,$id|max:255|min:5",
            'clave' => "nullable|min:8|max:255",
            'clave2' => "nullable|min:8|max:255|same:clave",
            'avatar' => 'image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'rol' => 'required|in:ADMINISTRADOR,GERENTE,EMPLEADO',
        ]);
        
        $empleado = Empleado::find($id);
        $empleado-> nombre = $request->nombre;
        $empleado->apellido = $request->apellido;
        $empleado->correo = $request->correo;
        $empleado->rol = $request->rol;

        if ($request->has("clave")) {
            $empleado->clave = Hash::make($request->clave);
        }
        
        if ($request->hasFile("avatar")) {
            $image = $request->avatar;
            $imagennueva = "empleado_{$empleado->id}.{$image->extension()}";
            $ruta = $image->storeAs('imagenes/empleados/', $imagennueva, 'public');
            $empleado->avatar = "/storage/$ruta";
        }
        
        $empleado->save();
        return redirect("/empleado/listar");
    }


    public function show($id){
        $empleado = Empleado::find($id);
        return view('empleado.mostrar')->with('empleado', $empleado);
    }

    public function delete($id) {

        //Busca la coincidencia del id
        $empleado = Empleado::find($id);
        
        //Pone el estado del empleado en false
        $empleado->estado = false;
        $empleado->save();
        return redirect('/empleado/listar');
    }    

}
