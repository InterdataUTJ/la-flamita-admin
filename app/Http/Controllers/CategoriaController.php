<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Models\CategoriaDato;
use Illuminate\Http\Request;

class CategoriaController extends Controller {
    public function index() {
        $categorias = Categoria::simplePaginate(5);
        return view('categoria.listar')->with('categorias', $categorias);
    }


    public function create() {
        return view('categoria.crear');
    }

    public function store(Request $request) {
        $request->validate([
            'nombre' => 'required|string|max:50|min:3',
            'descripcion' => 'required|string|min:3',
            'valores' => 'nullable|array',
        ]);
        
        $categoria = new Categoria();
        $categoria->nombre = $request->nombre;
        $categoria->descripcion = $request->descripcion;
        $categoria->save();

        foreach ($request->valores as $valor) {
            $categoriaDato = new CategoriaDato();
            $categoriaDato->categoria_id = $categoria->id;
            $categoriaDato->nombre = $valor;
            $categoriaDato->save();
        }
        
        return redirect("/categoria/listar");
    }

    public function edit($id){
        $categoria = Categoria::find($id);
        return view('categoria.editar')->with('categoria', $categoria);
    }

    public function update(Request $request, $id){
        $request->validate([
            'nombre' => 'required|string|max:50|min:3',
            'descripcion' => 'required|string|min:3',
            'valores' => 'nullable|array',
        ]);
        
        $categoria = Categoria::find($id);
        $categoria->nombre = $request->nombre;
        $categoria->descripcion = $request->descripcion;
        $categoria->save();

        $guardados = $categoria->categoria_datos->pluck('nombre')->toArray();
        $nuevos = $request->valores;

        $toDelete = array_diff($guardados, $nuevos);
        $toAdd = array_diff($nuevos, $guardados);

        foreach ($toDelete as $valor) {
            $categoriaDato = CategoriaDato::where('categoria_id', $categoria->id)->where('nombre', $valor)->first();
            $categoriaDato->delete();
        }

        foreach ($toAdd as $valor) {
            $categoriaDato = new CategoriaDato();
            $categoriaDato->categoria_id = $categoria->id;
            $categoriaDato->nombre = $valor;
            $categoriaDato->save();
        }
        
        return redirect("/categoria/listar");
    }


    public function show($id){
        $categoria = Categoria::find($id);
        return view('categoria.mostrar')->with('categoria', $categoria);
    }

    public function delete($id) {
        //Busca la coincidencia del id
        $categoria = Categoria::find($id);
        $categoria->delete();
        return redirect('/categoria/listar');
    }    

}
