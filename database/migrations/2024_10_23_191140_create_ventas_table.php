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
        Schema::create('ventas', function (Blueprint $table) {
            $table->id();
            $table->integer('empleado_id');
            $table->integer('cliente_id')->nullable();
            $table->date('fecha_venta');
            $table->date('fecha_pago');
            $table->boolean('estado');
            $table->string('metodo_pago', 50);
            $table->decimal('impuestos', 10, 2);
            $table->timestamps();
            $table->foreign('empleado_id')->references('id')->on('empleados');
            $table->foreign('cliente_id')->references('id')->on('clientes');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ventas');
    }
};
