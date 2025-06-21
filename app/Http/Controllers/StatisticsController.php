<?php

namespace App\Http\Controllers;

use App\Models\Printer;
use App\Models\Toner;
use App\Models\Stock;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class StatisticsController extends Controller
{
    public function index()
    {
        $totalPrinters = Printer::count();
        $totalToners = Toner::count();
        $tonersInStock = Stock::sum('quantity'); // Assuming 'quantity' is in the 'stocks' table
        $lowStockToners = Stock::where('quantity', '<=', 5)->count(); // Adjust the threshold as needed

        return response()->json([
            'totalPrinters' => $totalPrinters,
            'totalToners' => $totalToners,
            'tonersInStock' => $tonersInStock,
            'lowStockToners' => $lowStockToners,
        ]);
    }
    public function tonerUsage()
    {
        // Get toner usage for the 4 first printers with toner data, ordered by ID
        $tonerUsage = DB::table('printers')
            ->select('printers.name as printer_name', DB::raw('count(toners.id_toner) as toner_count')) // Use toners.toner_id
            ->leftJoin('toners', 'printers.id_printer', '=', 'toners.printer_id')
            ->groupBy('printers.name')
            ->having('toner_count', '>', 0) // Filter out printers with no toner usage
            ->orderBy('printers.id_printer', 'asc') // Order by printer ID in ascending order
            ->take(4) // Limit to 4 printers
            ->get();

        // Prepare data for the chart
        $labels = $tonerUsage->pluck('printer_name');
        $data = $tonerUsage->pluck('toner_count');

        return response()->json([
            'labels' => $labels,
            'data' => $data,
        ]);
    }
    public function inventoryHealth()
    {
        $goodStock = Stock::where('quantity', '>', 10)->count(); // Adjust threshold as needed
        $nearReorder = Stock::where('quantity', '>', 0)
                            ->where('quantity', '<=', 10)->count(); // Adjust threshold as needed
        $outOfStock = Stock::where('quantity', '=', 0)->count();
        $total = $goodStock + $nearReorder + $outOfStock;
                $inventory = [
            [
                'label' => 'Toners in Good Stock',
                'count' => $goodStock,
                'color' => 'bg-green-500',
                'percentage' => $total > 0 ? round(($goodStock / $total) * 100) : 0,
            ],
            [
                'label' => 'Toners Near Reorder Point',
                'count' => $nearReorder,
                'color' => 'bg-yellow-400',
                'percentage' => $total > 0 ? round(($nearReorder / $total) * 100) : 0,
            ],
            [
                'label' => 'Toners Out of Stock',
                'count' => $outOfStock,
                'color' => 'bg-red-500',
                'percentage' => $total > 0 ? round(($outOfStock / $total) * 100) : 0,
            ],
        ];
        Log::info('Inventory Data:', ['inventory' => $inventory]); // Debug: Log the inventory data on the server
        return response()->json($inventory);
    }
}
