<?php

namespace App\Http\Controllers;

use App\Mail\TransactionMail;
use App\Models\Sales;
use App\Models\Customers;
use App\Models\Products;
use App\Models\SalesDetails;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use App\Exports\TransactionsExport;
use Maatwebsite\Excel\Facades\Excel;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        $query = Sales::where('user_id', Auth::id())->with('customer', 'details.product');

        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('payment_status', 'like', '%' . $request->search . '%')
                    ->orWhere('sales_date', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->filled('payment_status') && $request->payment_status !== 'all') {
            $query->where('payment_status', $request->payment_status);
        }

        if ($request->filled('sales_date')) {
            $query->whereDate('sales_date', $request->sales_date);
        }

        $sales = $query->latest()->paginate(5)->appends($request->query());

        return Inertia::render('Transactions/Index', [
            'sales' => $sales,
            'filters' => $request->only(['search', 'payment_status', 'sales_date']),
        ]);
    }

    public function export()
    {
        return Excel::download(new TransactionsExport, 'transactions.xlsx');
    }

    public function create()
    {
        return Inertia::render('Transactions/Create', [
            'customers' => Customers::where('user_id', Auth::id())->get(),
            'products' => Products::where('user_id', Auth::id())->get()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'sales_date' => 'required|date',
            'payment_method' => 'required|string',
            'payment_status' => 'required|in:Paid,Unpaid',
            'products' => 'required|array',
            'products.*.product_id' => 'required|exists:products,id',
            'products.*.quantity' => 'required|integer|min:1',
        ]);

        DB::beginTransaction();

        try {
            $subtotal = 0;
            $tax = 0;
            $totalPrice = 0;

            // Validasi stok produk
            foreach ($request->products as $product) {
                $productData = Products::findOrFail($product['product_id']);

                // Cek apakah stok cukup
                if ($product['quantity'] > $productData->stock) {
                    return response()->json([
                        'error' => "Stok produk '{$productData->name}' tidak mencukupi! Stok tersedia: {$productData->stock}"
                    ], 400);
                }

                // Hitung subtotal
                $subtotal += $productData->price * $product['quantity'];
            }

            $tax = $subtotal * 0.10;
            $totalPrice = $subtotal + $tax;

            // Simpan transaksi
            $sale = Sales::create([
                'user_id' => Auth::id(),
                'customer_id' => $request->customer_id,
                'sales_date' => $request->sales_date,
                'payment_method' => $request->payment_method,
                'payment_status' => $request->payment_status,
                'subtotal' => $subtotal,
                'tax' => $tax,
                'total_price' => $totalPrice,
            ]);

            // Simpan detail transaksi dan update stok
            foreach ($request->products as $product) {
                $productModel = Products::findOrFail($product['product_id']);
                $unit_price = $productModel->price;
                $item_subtotal = $unit_price * $product['quantity'];

                SalesDetails::create([
                    'sales_id' => $sale->id,
                    'user_id' => Auth::id(),
                    'product_id' => $product['product_id'],
                    'quantity' => $product['quantity'],
                    'unit_price' => $unit_price,
                    'subtotal' => $item_subtotal,
                ]);

                // Kurangi stok
                $productModel->decrement('stock', $product['quantity']);
            }

            DB::commit();

            // Kirim email jika customer memiliki email
            if ($sale->customer && $sale->customer->email) {
                Mail::to($sale->customer->email)->send(new TransactionMail($sale));
            }
            return Inertia::location(route('transaction.index'));
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['error' => 'Terjadi kesalahan: ' . $e->getMessage()], 500);
        }
    }


    /**
     * Tampilkan detail transaksi.
     */
    public function show($id)
    {
        $sale = Sales::where('user_id', Auth::id())->with('customer', 'details.product')->findOrFail($id);

        // Hitung subtotal & pajak jika belum tersimpan di DB
        $subtotal = $sale->details->sum(fn($item) => $item->subtotal);
        $tax = $subtotal * 0.10;
        $totalPrice = $subtotal + $tax;

        return Inertia::render('Transactions/Detail', [
            'sale' => [
                'id' => $sale->id,
                'customer' => $sale->customer,
                'sales_date' => $sale->sales_date,
                'payment_method' => $sale->payment_method,
                'payment_status' => $sale->payment_status,
                'subtotal' => $subtotal,
                'tax' => $tax,
                'total_price' => $totalPrice,
                'details' => $sale->details,
            ],
        ]);
    }

    public function update(Request $request, $id)
    {
        $transaction = Sales::where('user_id', Auth::id())->findOrFail($id);
        $transaction->update(['payment_status' => $request->payment_status]);

        return redirect()->back()->with('success', 'Status pembayaran diperbarui.');
    }

    public function destroy($id)
    {
        $sale = Sales::where('user_id', Auth::id())->findOrFail($id);

        DB::beginTransaction();

        try {
            foreach ($sale->details as $detail) {
                $product = Products::findOrFail($detail->product_id);
                $product->increment('stock', $detail->quantity);
            }

            $sale->details()->delete();
            $sale->delete();

            DB::commit();
            return redirect()->route('transactions.index')->with('success', 'Transaksi berhasil dihapus');
        } catch (\Exception $e) {
            DB::rollback();
            return back()->withErrors(['error' => 'Terjadi kesalahan: ' . $e->getMessage()]);
        }
    }
}
