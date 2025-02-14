import React, { useState } from "react";
import { Link, useForm } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import AppLayout from "@/Layouts/AppLayout";
import { toast } from "@/hooks/use-toast";
import { ComboboxCustomer } from "./Components/ComboboxCustomer";
import { Trash } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";

interface Customer {
    id: number;
    name: string;
}

interface Product {
    id: number;
    name: string;
    price: number;
    stock: number; // Tambahkan stok produk
}

export default function Create({
    customers,
    products,
}: {
    customers: Customer[];
    products: Product[];
}) {
    const { data, setData, post, processing, errors, setError } = useForm({
        customer_id: null as number | null,
        sales_date: new Date().toISOString().slice(0, 10),
        payment_method: "",
        payment_status: "Unpaid",
        products: [] as { product_id: string; quantity: number }[],
    });

    const [selectedProducts, setSelectedProducts] = useState<
        { product_id: string; quantity: number }[]
    >([]);

    const handleAddProduct = () => {
        setSelectedProducts([
            ...selectedProducts,
            { product_id: "", quantity: 1 },
        ]);
    };

    const handleProductChange = (
        index: number,
        field: "product_id" | "quantity",
        value: string | number
    ) => {
        const newProducts = [...selectedProducts];
        newProducts[index] = { ...newProducts[index], [field]: value };
        setSelectedProducts(newProducts);
        setData("products", newProducts);
    };

    const handleRemoveProduct = (index: number) => {
        const newProducts = selectedProducts.filter((_, i) => i !== index);
        setSelectedProducts(newProducts);
        setData("products", newProducts);
    };

    const calculateTotal = () => {
        const subtotal = selectedProducts.reduce((total, item) => {
            const product = products.find(
                (p) => p.id.toString() === item.product_id
            );
            return total + (product ? product.price * item.quantity : 0);
        }, 0);

        const tax = subtotal * 0.1;
        return subtotal + tax;
    };

    const validateForm = () => {
        let isValid = true;

        // Validasi Customer
        if (!data.customer_id) {
            setError("customer_id", "Customer harus dipilih!");
            isValid = false;
        }

        // Validasi Metode Pembayaran
        if (!data.payment_method) {
            setError("payment_method", "Metode pembayaran harus dipilih!");
            isValid = false;
        }

        // Validasi Status Pembayaran
        if (!data.payment_status) {
            setError("payment_status", "Status pembayaran harus dipilih!");
            isValid = false;
        }

        // Validasi Produk
        if (selectedProducts.length === 0) {
            toast({
                title: "Gagal",
                description: "Setidaknya pilih satu produk!",
                variant: "destructive",
            });
            isValid = false;
        }

        // Validasi Stok Produk
        selectedProducts.forEach((item) => {
            const product = products.find(
                (p) => p.id.toString() === item.product_id
            );
            if (product && item.quantity > product.stock) {
                toast({
                    title: "Stok tidak mencukupi",
                    description: `Stok produk "${product.name}" hanya tersedia ${product.stock}!`,
                    variant: "destructive",
                });
                isValid = false;
            }
        });

        return isValid;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        post("/transaction", {
            onSuccess: () => {
                toast({
                    title: "Transaksi Berhasil Dibuat",
                    description: `Total: ${new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                    }).format(calculateTotal())}`,
                    variant: "success",
                });
            },
        });
    };

    return (
        <AppLayout>
            <div className="p-2 m-2 flex justify-between">
                <div className="header">
                    <h2 className="text-2xl font-semibold">Buat Transaksi</h2>
                    <h2 className="text-1xl font-normal text-gray-600">
                        Menambahkan transaksi penjualan
                    </h2>
                </div>
                <Link href="/transaction">
                    <Button className="p-4">← Kembali</Button>
                </Link>
            </div>

            <div className="grid lg:grid-cols-2 gap-4">
                <div className="lg:py-8 md:py-8 border border-gray-200 bg-white overflow-hidden shadow-sm rounded-lg">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <form onSubmit={handleSubmit} className="p-4 md:p-0">
                            {/* Customer */}
                            <div className="mb-4 flex flex-col">
                                <Label className="my-4">Customers</Label>
                                <ComboboxCustomer
                                    customers={customers}
                                    selected={data.customer_id}
                                    setSelected={(value) =>
                                        setData("customer_id", value)
                                    }
                                />
                                {errors.customer_id && (
                                    <div className="text-red-500">
                                        {errors.customer_id}
                                    </div>
                                )}
                            </div>

                            {/* Metode Pembayaran */}
                            <div className="mb-4">
                                <Label>Metode Pembayaran</Label>
                                <Select
                                    onValueChange={(value) =>
                                        setData("payment_method", value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih Metode Pembayaran" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Cash">
                                            Cash
                                        </SelectItem>
                                        <SelectItem value="Credit Card">
                                            Credit Card
                                        </SelectItem>
                                        <SelectItem value="Bank Transfer">
                                            Bank Transfer
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.payment_method && (
                                    <div className="text-red-500">
                                        {errors.payment_method}
                                    </div>
                                )}
                            </div>

                            {/* Produk */}
                            <div className="mb-4">
                                <Label className="me-4">Produk</Label>
                                {selectedProducts.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex gap-2 items-center mb-2"
                                    >
                                        <Select
                                            onValueChange={(value) =>
                                                handleProductChange(
                                                    index,
                                                    "product_id",
                                                    value
                                                )
                                            }
                                        >
                                            <SelectTrigger className="w-[200px]">
                                                <SelectValue placeholder="Pilih Produk" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {products.map((product) => (
                                                    <SelectItem
                                                        key={product.id}
                                                        value={product.id.toString()}
                                                    >
                                                        {product.name} (Stok:{" "}
                                                        {product.stock})
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <Input
                                            type="number"
                                            className="w-[100px]"
                                            min="1"
                                            value={item.quantity}
                                            onChange={(e) =>
                                                handleProductChange(
                                                    index,
                                                    "quantity",
                                                    Number(e.target.value)
                                                )
                                            }
                                        />
                                        <Button
                                            type="button"
                                            onClick={() =>
                                                handleRemoveProduct(index)
                                            }
                                        >
                                            <Trash className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))}
                                <Button
                                    type="button"
                                    onClick={handleAddProduct}
                                    className="mt-2"
                                >
                                    + Tambah Produk
                                </Button>
                            </div>

                            {/* Total Harga */}
                            <div className="mb-4 text-lg font-semibold">
                                Total Harga:{" "}
                                {new Intl.NumberFormat("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                }).format(calculateTotal())}
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                disabled={processing}
                                className="w-full"
                            >
                                Simpan
                            </Button>
                        </form>
                    </div>
                </div>
                <div className="lg:py-8 md:py-8 border border-gray-200 bg-white overflow-hidden shadow-sm rounded-lg p-4">
                    <h3 className="text-xl font-semibold mb-4">
                        Detail Produk
                    </h3>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Produk</TableHead>
                                <TableHead>Harga</TableHead>
                                <TableHead>Jumlah</TableHead>
                                <TableHead>Subtotal</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {selectedProducts.map((item, index) => {
                                const product = products.find(
                                    (p) => p.id.toString() === item.product_id
                                );
                                return (
                                    <TableRow key={index}>
                                        <TableCell>
                                            {product?.name || "-"}
                                        </TableCell>
                                        <TableCell>
                                            {product
                                                ? new Intl.NumberFormat(
                                                      "id-ID",
                                                      {
                                                          style: "currency",
                                                          currency: "IDR",
                                                      }
                                                  ).format(product.price)
                                                : "-"}
                                        </TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell>
                                            {product
                                                ? new Intl.NumberFormat(
                                                      "id-ID",
                                                      {
                                                          style: "currency",
                                                          currency: "IDR",
                                                      }
                                                  ).format(
                                                      product.price *
                                                          item.quantity
                                                  )
                                                : "-"}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                    <div className="mt-4 text-xl font-semibold">
                        Total Harga:{" "}
                        {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                        }).format(calculateTotal())}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
