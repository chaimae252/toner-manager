<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session; // Import Session facade

class AdminController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $credentials = $request->only('email', 'password');

        if (Auth::guard('admin')->attempt(credentials: $credentials)) {
            $admin = Auth::guard('admin')->user(); // Get the authenticated admin
            Session::put('admin_id', $admin->id); // Store admin ID in session
            Session::put('admin_name', $admin->name); // Store admin name in session
            Session::put('admin_email', $admin->email); // Store admin email in session

            return response()->json(['message' => 'Login successful', 'admin_id' => $admin->id, 'admin_name' => $admin->name, 'admin_email' => $admin->email], 200);
        }

        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    public function logout(Request $request)
    {
        Auth::guard('admin')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/admin-login');
    }
    // AdminController.php
    public function notifications()
    {
        $lowStockCount = \App\Models\Stock::where('quantity', '<=', 0)->count();
        $pendingRequests = \App\Models\Request::where('status', 'pending')->count();

        return response()->json([
            'lowStock' => $lowStockCount,
            'pendingRequests' => $pendingRequests,
            'total' => $lowStockCount + $pendingRequests,
        ]);
    }
}
