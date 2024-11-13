<?php

namespace App\Policies;

use App\Models\Empleado;

class EmpleadoPolicy {

    // Clientes   ✔️
    // Empleados  ✔️
    // Categorias ✔️
    // Productos  ✔️
    // Ventas     
    // Sensores   


    // Permisos para modulo clientes
    public function eliminar_clientes(Empleado $e) {   // ADMINISTRADOR
        return in_array($e->rol, ['ADMINISTRADOR']);
    }

    public function interactuar_clientes(Empleado $e) {   // ADMINISTRADOR
        return in_array($e->rol, ['ADMINISTRADOR']);
    }

    public function ver_clientes(Empleado $e) {   // TODOS
        return in_array($e->rol, ['ADMINISTRADOR', 'GERENTE', 'EMPLEADO']);
    }



    // Permisos para modulo empleados
    public function eliminar_empleados(Empleado $e) {   // ADMINISTRADOR
        return in_array($e->rol, ['ADMINISTRADOR']);
    }

    public function interactuar_empleados(Empleado $e) {   // ADMINISTRADOR y GERENTE
        return in_array($e->rol, ['ADMINISTRADOR', 'GERENTE']); 
    }

    public function ver_empleados(Empleado $e) {   // ADMINISTRADOR y GERENTE
        return in_array($e->rol, ['ADMINISTRADOR', 'GERENTE']);
    }



    // Permisos para modulo categorias
    public function eliminar_categorias(Empleado $e) {   // ADMINISTRADOR y GERENTE
        return in_array($e->rol, ['ADMINISTRADOR', 'GERENTE']);
    }

    public function interactuar_categorias(Empleado $e) {   // ADMINISTRADOR y GERENTE
        return in_array($e->rol, ['ADMINISTRADOR', 'GERENTE']); 
    }

    public function ver_categorias(Empleado $e) {   // TODOS
        return in_array($e->rol, ['ADMINISTRADOR', 'GERENTE', 'EMPLEADO']);
    }



    // Permisos para modulo productos
    public function eliminar_productos(Empleado $e) {   // ADMINISTRADOR y GERENTE
        return in_array($e->rol, ['ADMINISTRADOR', 'GERENTE']);
    }

    public function interactuar_productos(Empleado $e) {   // ADMINISTRADOR y GERENTE
        return in_array($e->rol, ['ADMINISTRADOR', 'GERENTE']); 
    }

    public function ver_productos(Empleado $e) {   // TODOS
        return in_array($e->rol, ['ADMINISTRADOR', 'GERENTE', 'EMPLEADO']);
    }
}
