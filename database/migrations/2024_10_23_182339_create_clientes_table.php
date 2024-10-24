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
        Schema::create('clientes', function (Blueprint $table) {
            $table->id();
            $table->string('nombre',50);
            $table->string('apellido',50);
            $table->string('correo')->unique();
            $table->char('clave',60)->nullable();
            $table->text('avatar')->nullable();
            $table->boolean('estado')->default(true);
            $table->boolean('verificado')->default(false);
            $table->string('google_id',50)->nullable();
            $table->text('google_token')->nullable();
            $table->text('google_refresh_token')->nullable();
            $table->text('remember_token')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clientes');
    }
};
