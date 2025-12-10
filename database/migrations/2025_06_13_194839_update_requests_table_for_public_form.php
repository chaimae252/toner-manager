<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('requests', function (Blueprint $table) {

            // --- FIX 1: Drop the foreign key FIRST if it exists ---
            if (Schema::hasColumn('requests', 'user_id')) {
                // Drop foreign key safely
                $table->dropForeign(['user_id']);
                // Then drop the column
                $table->dropColumn('user_id');
            }

            // Add full_name column
            if (!Schema::hasColumn('requests', 'full_name')) {
                $table->string('full_name')->after('id_request');
            }

            // Add printer_id column
            if (!Schema::hasColumn('requests', 'printer_id')) {
                $table->unsignedBigInteger('printer_id')->after('full_name');
                $table->foreign('printer_id')
                    ->references('id_printer')
                    ->on('printers')
                    ->onDelete('cascade');
            }
        });
    }

    public function down(): void
    {
        Schema::table('requests', function (Blueprint $table) {

            // Drop printer foreign key + column
            if (Schema::hasColumn('requests', 'printer_id')) {
                $table->dropForeign(['printer_id']);
                $table->dropColumn('printer_id');
            }

            // Drop full_name
            if (Schema::hasColumn('requests', 'full_name')) {
                $table->dropColumn('full_name');
            }

            // Add back user_id
            if (!Schema::hasColumn('requests', 'user_id')) {
                $table->unsignedBigInteger('user_id')->nullable();
            }
        });
    }
};
