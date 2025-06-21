<?php

namespace App\Http\Controllers;

use App\Models\Printer;
use App\Models\Stock;
use App\Models\Request as TonerRequest;
use Illuminate\Http\Request;

class RequestTonerController extends Controller
{
    public function create()
    {
        $printers = Printer::with('location')->get();
        $stock = Stock::all();

        return inertia('RequestToner', [
            'printers' => $printers,
            'stock' => $stock,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'printer_id' => 'required|exists:printers,id_printer',
            'stock_id' => 'required|exists:stocks,id_stock',
            'full_name' => 'required|string|max:255',
            'note' => 'nullable|string|max:1000',
        ]);

        TonerRequest::create([
            'printer_id' => $request->printer_id,
            'stock_id' => $request->stock_id, // <-- here, use stock_id to match form
            'full_name' => $request->full_name,
            'note' => $request->note,
        ]);

        return redirect()->route('request.toner')->with('success', 'Toner request submitted!');
    }
}
