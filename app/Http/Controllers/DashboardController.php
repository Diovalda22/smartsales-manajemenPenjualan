<?php

namespace App\Http\Controllers;

use App\Models\Sales;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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

        $totalRevenue = Sales::where('user_id', $user->id)->where('payment_status', 'Paid')->sum('total_price');

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

        $topProducts = DB::table('sales_details')
            ->join('products', 'sales_details.product_id', '=', 'products.id')
            ->whereIn('sales_id', Sales::where('user_id', $user->id)->pluck('id'))
            ->selectRaw('products.name, SUM(sales_details.quantity) as total_sold')
            ->groupBy('products.name')
            ->orderByDesc('total_sold')
            ->limit(5)
            ->get();

        return Inertia::render('Dashboard', [
            'salesSummary' => $salesSummary,
            'totalRevenue' => $totalRevenue,
            'topProducts' => $topProducts,
            'latestTransactions' => $latestTransactions,
        ]);
    }
}
