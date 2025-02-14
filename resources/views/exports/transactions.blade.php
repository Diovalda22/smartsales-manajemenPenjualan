<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    {{-- <style>
        body {
            font-family: Arial, sans-serif;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }

        th,
        td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }

        th {
            background-color: #f2f2f2;
            font-weight: bold;
        }

        tr:nth-child(even) {
            background-color: #f9f9f9;
        }

        tr:hover {
            background-color: #f1f1f1;
        }

        .total-row {
            background-color: #e8f5e9;
            font-weight: bold;
        }

        .header {
            text-align: center;
            margin-bottom: 20px;
        }

        .header h1 {
            margin: 0;
            font-size: 24px;
        }

        .header p {
            margin: 5px 0 0;
            font-size: 14px;
            color: #555;
        }
    </style> --}}
</head>

<body>
    <div class="header">
        <h1>Laporan Penjualan</h1>
    </div>

    <table>
        <thead>
            <tr>
                <th style="background-color: #26ff87">No</th>
                <th style="background-color: #26ff87">Customer</th>
                <th style="background-color: #26ff87">Tanggal</th>
                <th style="background-color: #26ff87">Metode Pembayaran</th>
                <th style="background-color: #26ff87">Status</th>
                <th style="background-color: #26ff87">Total</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($sales as $index => $sale)
                <tr>
                    <td style="background-color: #e3eab2">{{ $index + 1 }}</td>
                    <td style="background-color: #e3eab2">{{ $sale->customer->name ?? 'Unknown' }}</td>
                    <td style="background-color: #e3eab2">{{ $sale->sales_date }}</td>
                    <td style="background-color: #e3eab2">{{ $sale->payment_method }}</td>
                    <td style="background-color: #e3eab2">{{ $sale->payment_status }}</td>
                    <td style="background-color: #e3eab2">{{ number_format($sale->total_price, 2) }}</td>
                </tr>
            @endforeach
            <tr class="total-row">
                <td colspan="5" style="color: #FFFFFF;background-color: #0051ff">Total Penjualan:</td>
                <td style="color: #FFFFFF;background-color: #0051ff">{{ number_format($sales->sum('total_price'), 2) }}
                </td>
            </tr>
        </tbody>
    </table>

    <div class="footer">
        <p>Generated on: {{ now()->format('Y-m-d H:i:s') }}</p>
    </div>
</body>

</html>
