<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder {
    /**
     * Seed the application's database.
     */
    public function run(): void {
        // Drop and recreate database
        DB::table('empleados')->insert([
            'nombre' => 'root',
            'apellido' => 'root',
            'correo' => 'root@laflamita.com',
            'clave' => Hash::make('0123456789'),
            'estado' => true,
            'rol' => 'ADMINISTRADOR',
        ]);

        DB::table('clientes')->insert([
            'nombre' => 'Ismael',
            'apellido' => 'Cortés',
            'correo' => 'ismacortgtz@gmail.com',
            'clave' => Hash::make('0123456789'),
        ]);
    }
}
