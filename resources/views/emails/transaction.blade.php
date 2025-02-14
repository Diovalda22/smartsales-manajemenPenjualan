<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Detail Transaksi Anda</title>
    <style>
        /* Reset dasar */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: Arial, sans-serif;
        }

        body {
            background-color: #f3f4f6;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }

        .container {
            max-width: 600px;
            width: 100%;
            background-color: white;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            overflow: hidden;
        }

        .header {
            background-color: #2563eb;
            color: white;
            text-align: center;
            padding: 20px;
        }

        .header h2 {
            margin-bottom: 5px;
        }

        .content {
            padding: 20px;
        }

        .content p {
            margin-bottom: 10px;
            color: #4b5563;
        }

        .status {
            display: inline-block;
            padding: 5px 10px;
            border-radius: 5px;
            color: white;
            font-weight: bold;
        }

        .paid {
            background-color: #16a34a;
        }

        .unpaid {
            background-color: #dc2626;
        }

        .total {
            font-size: 18px;
            font-weight: bold;
            margin-top: 15px;
            color: #1e40af;
        }

        .tax-disclaimer {
            font-size: 12px;
            color: rgba(250, 10, 10, 0.965);
        }

        .border-top {
            border-top: 1px solid #e5e7eb;
            padding: 20px;
        }

        .product-list {
            list-style: none;
            padding: 0;
        }

        .product-item {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #e5e7eb;
        }

        .product-item:last-child {
            border-bottom: none;
        }

        .product-name {
            font-weight: bold;
        }

        .product-price {
            font-weight: bold;
            color: #4b5563;
        }

        .footer {
            background-color: #f9fafb;
            text-align: center;
            padding: 15px;
            font-size: 14px;
            color: #6b7280;
        }

        .footer a {
            color: #2563eb;
            font-weight: bold;
            text-decoration: none;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h2>Terima Kasih, {{ $sales->customer->name }}!</h2>
            <p>Detail transaksi Anda telah tercatat.</p>
        </div>

        <div class="content">
            <p><strong>Tanggal:</strong> {{ $sales->sales_date }}</p>
            <p><strong>Metode Pembayaran:</strong> {{ $sales->payment_method }}</p>
            <p><strong>Status Pembayaran:</strong>
                <span class="status {{ $sales->payment_status === 'Paid' ? 'paid' : 'unpaid' }}">
                    {{ $sales->payment_status }}
                </span>
            </p>
            <p class="total">Total Harga: Rp {{ number_format($sales->total_price, 2, ',', '.') }}</p>
            <p style="color: #dc2626">*sudah termasuk pajak 10%</p>
        </div>

        <div class="border-top">
            <h3>Detail Produk</h3>
            <ul class="product-list">
                @foreach ($sales->details as $detail)
                    <li class="product-item">
                        <div>
                            <p class="product-name">{{ $detail->product->name }}</p>
                            <p class="text-sm">{{ $detail->quantity }} x Rp
                                {{ number_format($detail->unit_price, 2, ',', '.') }}</p>
                            <p class="product-price">
                                Rp {{ number_format($detail->unit_price * $detail->quantity, 2, ',', '.') }}
                            </p>
                        </div>
                    </li>
                @endforeach
            </ul>
        </div>

        <div class="footer">
            <p>Terima kasih telah berbelanja di toko kami.</p>
            <p>Jika ada pertanyaan, hubungi <a href="#">Customer Support</a>.</p>
        </div>
    </div>
</body>

</html>
