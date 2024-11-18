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
            $table->foreignId('empleado_id')->constrained()->onDelete('cascade')->nullable();
            $table->foreignId('cliente_id')->constrained()->onDelete('cascade')->nullable();
            $table->date('fecha_venta');
            $table->date('fecha_pago');
            $table->enum('estado', ["PENDIENTE", "PAGADO", "COMPLETADO"]);
            $table->text("token")->nullable();
            $table->string('metodo_pago', 50);
            $table->text('paypal_id')->nullable()->unique();
            $table->timestamps();
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
