import { Link } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import AppLayout from "@/Layouts/AppLayout";
import { Card, CardContent } from "@/Components/ui/card";
import {
    CreditCard,
    Calendar,
    User,
    CheckCircle,
    XCircle,
    FileText,
} from "lucide-react";
import jsPDF from "jspdf";

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
    const formatRupiah = (angka: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(angka);
    };
    const exportToPDF = () => {
        const doc = new jsPDF({ unit: "mm", format: "a6" });
        doc.setFont("courier");
        doc.setFontSize(14);
        doc.text("================================", 5, 10);
        doc.text("       STRUK PEMBELIAN", 10, 16);
        doc.text("================================", 5, 22);

        doc.setFontSize(10);
        doc.text(`ID Transaksi : #${sale.id}`, 10, 30);
        doc.text(`Nama Pelanggan : ${sale.customer.name}`, 10, 36);
        doc.text(`Tanggal : ${sale.sales_date}`, 10, 42);
        doc.text(`Metode Pembayaran : ${sale.payment_method}`, 10, 48);
        doc.text(`Status Pembayaran : ${sale.payment_status}`, 10, 54);

        let y = 60;
        doc.text("================================", 10, y);
        doc.text("Produk", 10, y + 6);
        doc.text("Qty    Harga      Subtotal", 10, y + 12);
        doc.text("================================", 10, y + 18);
        y += 24;

        sale.details.forEach((item) => {
            doc.text(`${item.product.name}`, 10, y);
            y += 6;
            doc.text(
                `${item.quantity} x ${formatRupiah(
                    item.unit_price
                )} = ${formatRupiah(item.subtotal)}`,
                10,
                y
            );
            y += 6;
        });

        y += 6;
        doc.text("================================", 10, y);
        doc.text(`Subtotal : ${formatRupiah(sale.subtotal)}`, 10, y + 6);
        doc.text(`Pajak (10%) : ${formatRupiah(sale.tax)}`, 10, y + 12);
        doc.text(`Total Harga : ${formatRupiah(sale.total_price)}`, 10, y + 18);
        doc.text("================================", 10, y + 24);

        doc.save(`Struk_Transaksi_${sale.id}.pdf`);
    };

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
                    <div className="flex gap-2">
                        <Button onClick={exportToPDF}>
                            <FileText className="mr-2" size={16} /> Download
                            Struk
                        </Button>
                        <Link href="/transaction">
                            <Button>← Kembali</Button>
                        </Link>
                    </div>
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
