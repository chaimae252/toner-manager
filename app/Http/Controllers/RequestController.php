<?php

namespace App\Http\Controllers;

use App\Models\Request as TonerRequest; // ✅ Alias your model to avoid conflict
use Illuminate\Http\RedirectResponse; // Optional: helpful for return types

class RequestController extends Controller
{
    // ✅ List all requests with related printer and stock info
    public function index()
    {
        $requests = TonerRequest::with(['printer', 'stock'])
            ->orderBy('created_at', 'desc')
            ->get();

        return inertia('Requests', [
            'requests' => $requests,
        ]);
    }

    // ✅ Fulfill a toner request and decrement stock quantity
    public function fulfill($id): RedirectResponse
    {
        $request = TonerRequest::findOrFail($id);

        if ($request->status === 'fulfilled') {
            return back()->with('error', 'Request already fulfilled.');
        }

        $stock = $request->stock;

        if ($stock->quantity < 1) {
            return back()->with('error', 'Not enough toner in stock.');
        }

        // Find an available toner unit linked to the stock that isn't assigned to a printer yet
        $availableToner = \App\Models\Toner::where('stock_id', $stock->id_stock)
            ->whereNull('printer_id')
            ->first();

        if (!$availableToner) {
            return back()->with('error', 'No available toner units to assign.');
        }

        // Assign toner to the printer from the request
        $availableToner->printer_id = $request->printer_id;
        $availableToner->save();

        // Decrement stock quantity
        $stock->decrement('quantity');

        // Mark request as fulfilled
        $request->status = 'approved';
        $request->save();

        return back()->with('success', 'Request fulfilled, toner assigned to printer, and stock updated.');
    }
}
