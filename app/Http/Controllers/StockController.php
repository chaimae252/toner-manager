<?php

namespace App\Http\Controllers;

use App\Models\Stock;
use Illuminate\Http\Request;

class StockController extends Controller
{
    // Show the Inertia Stocks page
    public function index()
    {
        return inertia('Stocks', [
            'stocks' => Stock::withCount(['availableToners'])->get(),
        ]);
    }

    public function list()
    {
        $stocks = Stock::withCount(['availableToners'])->get();
        return response()->json(['stocks' => $stocks]);
    }


    // Create new stock
    public function store(Request $request)
    {
        $request->validate([
            'code' => 'required|string',
            'color' => 'required|string',
            'quantity' => 'required|integer|min:1',
        ]);

        // Create stock
        $stock = Stock::create([
            'code' => $request->code,
            'color' => $request->color,
            'quantity' => $request->quantity,
        ]);

        // Add toner units linked to this stock
        for ($i = 0; $i < $request->quantity; $i++) {
            \App\Models\Toner::create([
                'stock_id' => $stock->id_stock,
                'printer_id' => null, // Optional: set to a default if you want
            ]);
        }

        return response()->json($stock);
    }


    // Restock a stock entry
    public function restock(Request $request, $id)
    {
        $request->validate([
            'amount' => 'required|integer|min:1',
        ]);

        $stock = Stock::findOrFail($id);

        // Update stock quantity
        $stock->quantity += $request->amount;
        $stock->save();

        // Add toner units to the toners table
        for ($i = 0; $i < $request->amount; $i++) {
            \App\Models\Toner::create([
                'stock_id' => $stock->id_stock,
                'printer_id' => null, // or default if needed
            ]);
        }

        return response()->json($stock);
    }

    // Delete a stock entry
    public function destroy($id)
    {
        $stock = Stock::findOrFail($id);
        $stock->delete();

        return response()->json(['message' => 'Stock deleted']);
    }
}
