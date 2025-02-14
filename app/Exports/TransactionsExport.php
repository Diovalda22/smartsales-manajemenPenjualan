<?php

namespace App\Exports;

use App\Models\Sales;
use Illuminate\Contracts\View\View;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\Exportable;

class TransactionsExport implements FromView
{
    use Exportable;

    public function view(): View
    {
        return view('exports.transactions', [
            'sales' => Sales::with('customer', 'details.product')->where('user_id', Auth::id())->get(),
        ]);
    }
}
