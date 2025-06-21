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
        Schema::create('toners', function (Blueprint $table) {
            $table->id('id_toner');

            $table->unsignedBigInteger('printer_id')->nullable(); // make nullable
            $table->unsignedBigInteger('stock_id');

            $table->integer('yield_pages');
            $table->timestamps();

            // Foreign keys
            $table->foreign('printer_id')
                ->references('id_printer')
                ->on('printers')
                ->onDelete('set null'); // 👈 safer behavior

            $table->foreign('stock_id')
                ->references('id_stock')
                ->on('stocks')
                ->onDelete('cascade'); // this is okay since toner MUST belong to a stock type
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('toners');
    }
};
