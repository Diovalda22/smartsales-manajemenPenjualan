<?php

namespace App\Http\Controllers;

use App\Models\Sales;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // Query untuk summary
        $totalSales = Sales::where('user_id', $user->id)->count();
        $totalPaid = Sales::where('user_id', $user->id)->where('payment_status', 'Paid')->count();
        $totalUnpaid = Sales::where('user_id', $user->id)->where('payment_status', 'Unpaid')->count();

        $salesSummary = [
            'total_sales' => $totalSales,
            'total_paid'  => $totalPaid,
            'total_unpaid'  => $totalUnpaid,
        ];

        // Query untuk latest transactions
        $latestTransactions = Sales::where('user_id', $user->id)
            ->with('customer')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($sale) {
                return [
                    'id' => $sale->id,
                    'customer' => [
                        'name' => $sale->customer->name,
                    ],
                    'total_price' => $sale->total_price,
                    'sales_date' => $sale->sales_date,
                    'payment_status' => $sale->payment_status,
                ];
            });

        // return response()->json(['salesSummary' => $salesSummary, 'latestTransactions' => $latestTransactions]);

        return Inertia::render('Dashboard', [
            'salesSummary' => $salesSummary,
            'latestTransactions' => $latestTransactions,
        ]);
    }
}
