<?php

namespace App\Policies;

use App\Models\Empleado;

class EmpleadoPolicy {

    // Categorias 
    // Clientes   ✔️
    // Empleados  ✔️
    // Productos  
    // Ventas     
    // Sensores   

    // Permisos para modulo clientes
    public function eliminar_clientes(Empleado $e) {   // ADMINISTRADOR y GERENTE
        return in_array($e->rol, ['ADMINISTRADOR', 'GERENTE']); 
    }

    // Permisos para modulo empleados
    public function modulo_empleados(Empleado $e) {  // ADMINISTRADOR
        return $e->rol === 'ADMINISTRADOR';
    }
}
