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
        Schema::create('producto_venta', function (Blueprint $table) {
            $table->integer('venta_id');
            $table->integer('producto_id');
            $table->decimal('precio', 10, 2);
            $table->decimal('descuento', 10, 2);
            $table->decimal('impuesto', 10, 2);
            $table->integer('cantidad');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('producto_venta');
    }
};
