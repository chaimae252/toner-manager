<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('toners', function (Blueprint $table) {
            // 💣 Drop the old foreign key
            $table->dropForeign(['printer_id']);

            // 🛠 Make the column nullable
            $table->unsignedBigInteger('printer_id')->nullable()->change();

            // 🪄 Add the new foreign key with "set null" behavior
            $table->foreign('printer_id')
                ->references('id_printer')
                ->on('printers')
                ->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('toners', function (Blueprint $table) {
            $table->dropForeign(['printer_id']);

            $table->unsignedBigInteger('printer_id')->nullable(false)->change();

            $table->foreign('printer_id')
                ->references('id_printer')
                ->on('printers')
                ->onDelete('cascade');
        });
    }
};
