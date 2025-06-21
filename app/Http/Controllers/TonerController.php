<?php

namespace App\Http\Controllers;

use App\Models\Location;
use App\Models\Printer;
use App\Models\Stock;
use App\Models\Toner;
use Inertia\Inertia;
use Illuminate\Http\Request;

class TonerController extends Controller
{
    // Controller method (Laravel)
    public function index()
    {
        $toners = Toner::with(['stock', 'printer.location'])->get();
        $locations = Location::all();
        $stocks = Stock::all(); // ✅ Fetch all stocks

        return Inertia::render('Toners', [
            'toners' => $toners,
            'locations' => $locations,
            'stocks' => $stocks,
            'printers' => Printer::with('location')->get(), // ✅ Pass it to the frontend
        ]);
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'stock_id' => 'required|exists:stocks,id_stock',
            'quantity' => 'required|integer|min:1',
        ]);

        $stock = Stock::findOrFail($validated['stock_id']);

        // Create multiple toner rows
        for ($i = 0; $i < $validated['quantity']; $i++) {
            Toner::create([
                'stock_id' => $validated['stock_id'],
                // Add other default fields if needed
            ]);
        }

        // Optional: update stock quantity
        $stock->increment('quantity', $validated['quantity']);

        return redirect()->back()->with('success', 'Toners added!');
    }


    public function assign(Request $request, $id_toner)
    {
        $toner = Toner::findOrFail($id_toner);

        // 💣 Check if already assigned
        if ($toner->printer_id !== null) {
            return response()->json([
                'message' => 'This toner is already assigned to a printer.'
            ], 400); // You can return a redirect with errors too
        }

        $request->validate([
            'printer_id' => 'required|exists:printers,id_printer',
        ]);

        $toner->printer_id = $request->printer_id;
        $toner->save();

        return redirect()->back()->with('success', 'Toner assigned successfully.');
    }
    public function destroy(Toner $toner)
    {
        $toner->delete();

        return redirect()->back()->with('success', 'Toner deleted successfully.');
    }
}
