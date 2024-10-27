<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cliente;
use Illuminate\Support\Facades\Hash;

class ClienteController extends Controller {
    public function index() {
        $clientes = Cliente::where('estado', true)->get();
        return view('cliente.listar')->with('clientes', $clientes);
    }


    public function create() {
        return view('cliente.crear');
    }

    public function store(Request $request) {
        $request->validate([
            'nombre' => 'required|string|max:50|min:3',
            'apellido' => 'required|string|max:50|min:3',
            'correo' => 'required|email|unique:clientes,correo|max:255|min:5',
            'clave' => "required|min:8|max:255",
            'avatar' => 'image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
        ]);
        
        $cliente = new Cliente();
        $cliente-> nombre = $request->nombre;
        $cliente->apellido = $request->apellido;
        $cliente->correo = $request->correo;
        $cliente->clave = Hash::make($request->clave);
        $cliente->avatar = '/storage/avatar/default.svg';
        $cliente->estado = true;
        $cliente->verificado = false;
        $cliente->save();
        
        if ($request->hasFile("avatar")) {
            //Descargar de una variable 
            $image = $request->avatar;
            $imagennueva = "cliente_{$cliente->id}.{$image->extension()}";
            $ruta = $image->storeAs('imagenes/clientes/', $imagennueva, 'public');
            $cliente->avatar = "/storage/$ruta";
            $cliente->save();
        }
        
        return redirect("/cliente/listar");
    }

    public function edit($id){
        $cliente = Cliente::find($id);
        return view('cliente.editar')->with('cliente', $cliente);
    }

    public function update(Request $request, $id){
        $request->validate([
            'nombre' => 'required|string|max:50|min:3',
            'apellido' => 'required|string|max:50|min:3',
            'correo' => "required|email|unique:clientes,correo,$id|max:255|min:5",
            'clave' => "nullable|min:8|max:255",
            'avatar' => 'image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
        ]);
        
        $cliente = Cliente::find($id);
        $cliente-> nombre = $request->nombre;
        $cliente->apellido = $request->apellido;
        $cliente->correo = $request->correo;

        if ($request->has("clave")) {
            $cliente->clave = Hash::make($request->clave);
        }
        
        if ($request->hasFile("avatar")) {
            $image = $request->avatar;
            $imagennueva = "cliente_{$cliente->id}.{$image->extension()}";
            $ruta = $image->storeAs('imagenes/clientes/', $imagennueva, 'public');
            $cliente->avatar = "/storage/$ruta";
        }
        
        $cliente->save();
        return redirect("/cliente/listar");
    }


    public function show($id){
        $cliente = Cliente::find($id);
        return view('cliente.mostrar')->with('cliente', $cliente);
    }

    public function delete($id) {

        //Busca la coincidencia del id
        $cliente = Cliente::find($id);
        
        //Pone el estado del cliente en false
        $cliente->estado = false;
        $cliente->save();
        return redirect('/cliente/listar');
    }    

}
