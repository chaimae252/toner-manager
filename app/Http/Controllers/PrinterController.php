<?php

namespace App\Http\Controllers;

use App\Models\Location;
use App\Models\Printer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PrinterController extends Controller
{
    // Example: PrinterController.php
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'serial_number' => 'required|string|max:255',
            'type' => 'required|string',
            'location_id' => 'required|exists:locations,id_location',
        ]);

        Printer::create($validated);

        return redirect()->back()->with('success', 'Printer added successfully!');
    }

    public function index()
    {
        $printers = Printer::with('location')->get(); // eager load location
        $locations = Location::all(); // used for the modal select

        return Inertia::render('Printers', [
            'printers' => $printers,
            'locations' => $locations,
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'serial_number' => 'required|string|max:255',
            'type' => 'required|string',
            'location_id' => 'required|exists:locations,id_location',
        ]);

        $printer = Printer::where('id_printer', $id)->firstOrFail();
        $printer->update($validated);

        return redirect()->back()->with('success', 'Printer updated successfully!');
    }
    public function destroy($id)
    {
        $printer = Printer::where('id_printer', $id)->first();

        if (!$printer) {
            return response()->json(['message' => 'Printer not found'], 404);
        }

        $printer->delete();

        return redirect()->back()->with('success', 'Printer deleted successfully');
    }
}
