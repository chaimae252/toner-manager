<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class MoveYieldPagesToStocksTable extends Migration
{
    public function up()
    {
        // Add yield_pages to stocks
        Schema::table('stocks', function (Blueprint $table) {
            $table->integer('yield_pages')->default(0)->after('color');
        });

        // Migrate data from toners to stocks (you can customize if needed)
        // We'll update stocks yield_pages based on toners data for each stock

        // Use DB facade to run raw queries:
        $stocks = DB::table('stocks')->get();

        foreach ($stocks as $stock) {
            // Find a toner with this stock_id that has yield_pages (just take the first)
            $tonerYield = DB::table('toners')
                ->where('stock_id', $stock->id_stock)
                ->whereNotNull('yield_pages')
                ->value('yield_pages');

            if ($tonerYield) {
                DB::table('stocks')
                    ->where('id_stock', $stock->id_stock)
                    ->update(['yield_pages' => $tonerYield]);
            }
        }

        // Drop yield_pages from toners table
        Schema::table('toners', function (Blueprint $table) {
            $table->dropColumn('yield_pages');
        });
    }

    public function down()
    {
        // Add yield_pages back to toners
        Schema::table('toners', function (Blueprint $table) {
            $table->integer('yield_pages')->default(0)->after('stock_id');
        });

        // Copy yield_pages back from stocks to toners (simplified: set all toners for a stock to the stock's yield)
        $toners = DB::table('toners')->get();

        foreach ($toners as $toner) {
            $stockYield = DB::table('stocks')
                ->where('id_stock', $toner->stock_id)
                ->value('yield_pages');

            DB::table('toners')
                ->where('id_toner', $toner->id_toner)
                ->update(['yield_pages' => $stockYield ?? 0]);
        }

        // Drop yield_pages from stocks table
        Schema::table('stocks', function (Blueprint $table) {
            $table->dropColumn('yield_pages');
        });
    }
}
