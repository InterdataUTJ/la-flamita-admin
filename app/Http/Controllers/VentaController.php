<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use App\Models\Venta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VentaController extends Controller {
    //Listar las ventas 
    public function index() {
        $ventas = Venta::where([
            ["estado", "<>", "PENDIENTE"]
        ])->simplePaginate(8);
        
        return view("venta.listar")->with("ventas", $ventas);
    }

    //Funcion crear  
    public function create(){
        $productos = Producto::where("estado", true)->get();
        return view("venta.crear")->with("productos", $productos);
    }


    // Esta funcion recibe los datos del formulario y los guarda en la base de datos
    public function store(Request $request) {

        // Validaciones
        $request->validate([
            'metodo_pago' => 'required|string|in:EFECTIVO,TARJETA',
            'productos' => 'required|array|min:1',
            'cantidad' => 'required|array|min:1',
        ]);

        $productos = [];
        for ($i = 0; $i < count($request->productos); $i++) {
            if (!isset($productos[$request->productos[$i]]))
                $productos[$request->productos[$i]] = $request->cantidad[$i];
            else
                $productos[$request->productos[$i]] += $request->cantidad[$i];
        }


        foreach ($productos as $producto_id => $cantidad) {
            $producto = Producto::find($producto_id);
            if ($producto->existencias < $cantidad) {
                return back()->withErrors(["cantidad" => "No hay suficiente cantidad para el producto " . $producto->nombre]);
            }
        }

        $venta = new Venta();
        $venta->empleado_id = Auth::user()->id;
        $venta->fecha_venta = now();
        $venta->fecha_pago  = now();
        $venta->estado      = "COMPLETADO";
        $venta->metodo_pago = $request->metodo_pago;
        $venta->save();

        foreach ($productos as $producto_id => $cantidad) {
            $producto = Producto::find($producto_id);
            $producto->existencias -= $cantidad;
            $producto->save();

            $venta->productos()->attach($producto_id, [
                "cantidad" => $cantidad,
                "precio" => $producto->precio,
                "descuento" => $producto->descuento,
            ]);
        }

        return redirect()->route("venta.listar");
    }





    // Esta funcion devuelve el formulario de editar junto a los datos del producto
    public function edit($id) {
        $venta = Venta::find($id);
        return view("/venta/listar")->with("venta", $venta);
    }





    // Esta funcion recibe los datos del formulario y los actualiza en la base de datos
    public function update(Request $request, $id) {

        // Validaciones
        $request->validate([
            'metodo_pago' => 'required|string|in:EFECTIVO,TARJETA',
        ]);

        $venta = Venta::find($id);
        $venta->metodo_pago = $request->metodo_pago;
        $venta->save();
        return redirect()->route("venta.listar");
    }




    // Esta función devuelve el formulario para mostrar los datos
    public function show($id) {
        $venta = Venta::find($id);
        return view("venta.mostrar")->with("venta", $venta);
    }


    // Este metodo elimina el producto de la BD y redirige a listar
    public function destroy($id) {
        $venta = Venta::find($id);
        $venta->estado = false;
        $venta->save();
        return redirect()->route("venta.listar");
    }


    public function entregar() {
        return view("venta.entregar");
    }

    public function entregarValidar(Request $request) {
        $request->validate([
            "token" => "required|exists:ventas,token",
        ]);

        $venta = Venta::where("token", $request->token)->first();
        if (!$venta) {
            return back()->withErrors(["codigo" => "El codigo no es valido"]);
        }

        if ($venta->estado === "COMPLETADO") {
            return back()->withErrors(["codigo" => "La venta ya fue entregada"]);
        }

        if ($venta->estado === "PENDIENTE") {
            return back()->withErrors(["codigo" => "La venta no ha sido pagada"]);
        }

        $venta->estado = "COMPLETADO";
        $venta->save();
        return redirect()->route("venta.mostrar", $venta->id);
    }
}
