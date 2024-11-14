<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Models\CategoriaDato;
use App\Models\Producto;
use App\Models\ProductoFoto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductoController extends Controller {
    public function index() {
        //Con el paginate paginamos a 5 productos por pagina
        $productos = Producto::where('estado', 1)->simplePaginate(5);
        
        return view('producto.listar')->with('productos', $productos);
    }


    public function create() {
        $categorias = Categoria::all();
        return view('producto.crear')->with('categorias', $categorias);
    }

    public function store(Request $request) {
        $request->validate([
            'nombre' => 'required|string|max:50|min:3',
            'descripcion' => 'required|string|min:3',
            'precio' => 'required|numeric|min:0',
            'existencias' => 'required|integer|min:0',
            'descuento' => 'required|numeric|min:0',
            'fotos' => 'required|array',
            'fotos.*' => 'image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'categorias' => 'required|array',
            'categorias.*' => 'integer|exists:categoria_datos,id',
        ]);
        
        $producto = new Producto();
        $producto->nombre = $request->nombre;
        $producto->descripcion = $request->descripcion;
        $producto->precio = $request->precio;
        $producto->existencias = $request->existencias;
        $producto->descuento = $request->descuento;
        $producto->estado = true;
        $producto->save();

        $imagen = 1;
        foreach ($request->fotos as $foto) {
            $imagenNueva = "producto_{$imagen}_{$producto->id}.{$foto->extension()}";
            $ruta = $foto->storeAs('imagenes/productos', $imagenNueva, 'public');
            $productoFoto = new ProductoFoto();
            $productoFoto->producto_id = $producto->id;
            $productoFoto->url = asset("/storage/$ruta");
            $productoFoto->save();
            $imagen++;
        }

        foreach ($request->categorias as $categoriaId) {
            $producto->categoria_datos()->attach($categoriaId);
        }
        
        return redirect("/producto/listar");
    }

    public function edit($id){
        $categorias = Categoria::all();
        $producto = Producto::find($id);
        return view('producto.editar')->with('categorias', $categorias)->with('producto', $producto);
    }

    public function update(Request $request, $id){
        $request->validate([
            'nombre' => 'required|string|max:50|min:3',
            'descripcion' => 'required|string|min:3',
            'precio' => 'required|numeric|min:0',
            'existencias' => 'required|integer|min:0',
            'descuento' => 'required|numeric|min:0',
            'fotos' => 'nullable|array',
            'fotos.*' => 'image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'categorias' => 'required|array',
            'categorias.*' => 'integer|exists:categoria_datos,id',
        ]);
        
        $producto = Producto::find($id);
        $producto->nombre = $request->nombre;
        $producto->descripcion = $request->descripcion;
        $producto->precio = $request->precio;
        $producto->existencias = $request->existencias;
        $producto->descuento = $request->descuento;
        $producto->estado = true;
        $producto->save();

        $imagen = 1;
        if ($request->has('fotos')) {
            // Borrar imagenes antiguas
            $producto->producto_fotos->each(function ($foto) {
                $foto->delete();
            });

            // Guardar imagenes nuevas
            foreach ($request->fotos as $foto) {
                $imagenNueva = "producto_{$imagen}_{$producto->id}.{$foto->extension()}";
                $ruta = $foto->storeAs('imagenes/productos', $imagenNueva, 'public');
                $productoFoto = new ProductoFoto();
                $productoFoto->producto_id = $producto->id;
                $productoFoto->url = asset("/storage/$ruta");
                $productoFoto->save();
                $imagen++;
            }
        }

        // Eliminar categorias antiguas
        $producto->categoria_datos()->detach();

        // Agregar categorias nuevas
        foreach ($request->categorias as $categoriaId) {
            $producto->categoria_datos()->attach($categoriaId);
        }
        
        return redirect("/producto/listar");
    }


    public function show($id){
        $categorias = Categoria::all();
        $producto = Producto::find($id);
        return view('producto.mostrar')->with('categorias', $categorias)->with('producto', $producto);
    }

    public function delete($id) {
        //Busca la coincidencia del id
        $producto = Producto::find($id);
        $producto->estado = false;
        $producto->save();
        return redirect('/producto/listar');
    }
}