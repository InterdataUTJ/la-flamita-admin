<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthClienteController extends Controller {
    public function showForm() {
        return view("auth.cliente.login");
    }

    public function showNewForm() {
        return view("auth.cliente.create");
    }

    public function login(Request $request) {
        $credenciales = $request->validate([
            "correo" => "required|email|max:255|min:5",
            "clave" => "required|min:8|max:255",
        ]);

        if (Auth::guard("empleado")->attempt([
            "password" => $credenciales["clave"],
            "correo" => $credenciales["correo"],
            "estado" => true
        ])) {
            $request->session()->regenerate();
            return redirect()->intended("/");
        }

        return back()->withErrors([
            "msg" => "Las credenciales proporcionadas no son correctas.",
        ])->onlyInput("correo");
    }

    public function logout(Request $request) {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerate();
        return redirect("/");
    }
}
