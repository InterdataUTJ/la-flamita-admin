<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('empleados', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 50);
            $table->string('apellido', 50);
            $table->string('correo')->unique();
            $table->char('clave', 60)->nullable();
            $table->text('avatar')->default('/storage/avatar/default.svg');
            $table->boolean('estado')->default(true);
            $table->enum('rol', ['ADMINISTRADOR', 'GERENTE', 'EMPLEADO'])->default('EMPLEADO');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('empleados');
    }
};
