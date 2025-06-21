<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('requests', function (Blueprint $table) {
            // Drop user_id column if it exists
            if (Schema::hasColumn('requests', 'user_id')) {
                $table->dropColumn('user_id');
            }

            // Add full_name column instead of user_id
            $table->string('full_name')->after('id_request');

            // Add printer_id column
            $table->unsignedBigInteger('printer_id')->after('full_name');

            // Add foreign key to printers.id_printer
            $table->foreign('printer_id')
                ->references('id_printer')
                ->on('printers')
                ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::table('requests', function (Blueprint $table) {
            $table->dropForeign(['printer_id']);
            $table->dropColumn('printer_id');
            $table->dropColumn('full_name');
            $table->unsignedBigInteger('user_id')->nullable();
        });
    }
};
