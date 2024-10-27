<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     */
    protected function redirectTo(Request $request): ?string {
        if ($request->expectsJson()) return null; 

        if (Route::is("empleado;*")) {
            if (auth()->guard('cliente')->check()) return route('menu');
            if (!auth()->guard('empleado')->check()) return route("empleado.login");
        }
        
        return route('cliente.login');
        
    }
}
