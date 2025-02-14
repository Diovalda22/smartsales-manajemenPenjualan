import React from "react";
import { Link } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import AppLayout from "@/Layouts/AppLayout";
import { Card, CardContent } from "@/Components/ui/card";
import { CreditCard, Calendar, User, CheckCircle, XCircle } from "lucide-react";

interface Product {
    id: number;
    name: string;
}

interface SalesDetail {
    id: number;
    product: Product;
    unit_price: number;
    quantity: number;
    subtotal: number;
}

interface Customer {
    id: number;
    name: string;
}

interface Sale {
    id: number;
    customer: Customer;
    sales_date: string;
    payment_method: string;
    payment_status: string;
    subtotal: number;
    total_price: number;
    tax: number;
    details: SalesDetail[];
}

interface DetailProps {
    sale: Sale;
}

export default function Detail({ sale }: DetailProps) {
    return (
        <AppLayout>
            <div className="p-4">
                <div className="flex justify-between mb-4">
                    <div>
                        <h2 className="text-2xl font-semibold">
                            Detail Transaksi
                        </h2>
                        <p className="text-gray-600">
                            ID Transaksi: #{sale.id}
                        </p>
                    </div>
                    <Link href="/transaction">
                        <Button>← Kembali</Button>
                    </Link>
                </div>

                <Card className="p-6 mb-6 shadow-lg border border-gray-200 rounded-xl bg-white">
                    <CardContent>
                        <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
                            Informasi Pelanggan
                        </h3>
                        <div className="text-gray-600">
                            {/* Nama Pelanggan */}
                            <div className="flex items-center gap-3 py-2">
                                <User className="text-gray-500" size={20} />
                                <strong className="w-36">Nama</strong>
                                <span className="text-gray-800">
                                    {sale.customer.name}
                                </span>
                            </div>
                            <hr className="border-gray-200 my-1" />

                            {/* Tanggal Transaksi */}
                            <div className="flex items-center gap-3 py-2">
                                <Calendar className="text-gray-500" size={20} />
                                <strong className="w-36">Tanggal</strong>
                                <span className="text-gray-800">
                                    {sale.sales_date}
                                </span>
                            </div>
                            <hr className="border-gray-200 my-1" />

                            {/* Metode Pembayaran */}
                            <div className="flex items-center gap-3 py-2">
                                <CreditCard
                                    className="text-gray-500"
                                    size={20}
                                />
                                <strong className="w-36">
                                    Metode Pembayaran
                                </strong>
                                <span className="text-gray-800">
                                    {sale.payment_method}
                                </span>
                            </div>
                            <hr className="border-gray-200 my-1" />

                            {/* Status Pembayaran */}
                            <div className="flex items-center gap-3 py-2">
                                {sale.payment_status === "Paid" ? (
                                    <CheckCircle
                                        className="text-green-500"
                                        size={20}
                                    />
                                ) : (
                                    <XCircle
                                        className="text-red-500"
                                        size={20}
                                    />
                                )}
                                <strong className="w-36">
                                    Status Pembayaran
                                </strong>
                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                                        sale.payment_status === "Paid"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                    }`}
                                >
                                    {sale.payment_status}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="p-4">
                    <CardContent>
                        <h3 className="text-lg font-semibold mb-2">
                            Detail Produk
                        </h3>
                        <table className="w-full border-collapse border border-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border p-2">Produk</th>
                                    <th className="border p-2">Harga Satuan</th>
                                    <th className="border p-2">Jumlah</th>
                                    <th className="border p-2">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sale.details.map((item) => (
                                    <tr key={item.id} className="text-center">
                                        <td className="border p-2">
                                            {item.product.name}
                                        </td>
                                        <td className="border p-2">
                                            {new Intl.NumberFormat("id-ID", {
                                                style: "currency",
                                                currency: "IDR",
                                            }).format(item.unit_price)}
                                        </td>
                                        <td className="border p-2">
                                            {item.quantity}
                                        </td>
                                        <td className="border p-2">
                                            {new Intl.NumberFormat("id-ID", {
                                                style: "currency",
                                                currency: "IDR",
                                            }).format(item.subtotal)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
                <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                    <p className="text-lg">
                        <strong>Subtotal:</strong> Rp
                        {sale.subtotal?.toLocaleString()}
                    </p>
                    <p className="text-lg">
                        <strong>Pajak (10%):</strong> Rp
                        {sale.tax?.toLocaleString()}
                    </p>
                    <p className="text-xl font-bold">
                        <strong>Total Harga:</strong> Rp
                        {sale.total_price?.toLocaleString()}
                    </p>
                </div>
            </div>
        </AppLayout>
    );
}
