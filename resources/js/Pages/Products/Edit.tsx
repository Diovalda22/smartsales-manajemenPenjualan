import React from "react";
import { Link, useForm } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import AppLayout from "@/Layouts/AppLayout";
import { toast } from "@/hooks/use-toast";

interface Category {
    id: number;
    name: string;
}

interface Products {
    id: number;
    name: string;
    price: number;
    stock: number;
    category: Category | null;
}

export default function Edit({ product }: { product: Products }) {
    const { data, setData, put, processing, errors } = useForm({
        name: product.name,
        product_category_id: null as number | null,
        price: product.price,
        stock: product.stock,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/product/${product.id}`);
    };

    const getCurrentDateTime = () => {
        const now = new Date();
        return now.toLocaleString("id-ID", {
            weekday: "long", // Nama hari (e.g., "Jumat")
            year: "numeric", // Tahun (e.g., "2023")
            month: "long", // Nama bulan (e.g., "Februari")
            day: "numeric", // Tanggal (e.g., "10")
            hour: "numeric", // Jam (e.g., "17")
            minute: "numeric", // Menit (e.g., "57")
            second: "numeric", // Detik (e.g., "30")
            hour12: false, // Format 24 jam
        });
    };
    return (
        <AppLayout>
            <div className="p-2 m-2 flex justify-between">
                <div className="header">
                    <h2 className="text-2xl font-semibold">Tambahkan Task</h2>
                    <h2 className="text-1xl font-normal text-gray-600">
                        Menampilkan list pekerjaan
                    </h2>
                </div>
                <Link href="/product">
                    <Button className="p-6">← Kembali</Button>
                </Link>
            </div>
            <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-4">
                <div className="lg:py-8 md:py-8 border roundedborder border-gray-200 bg-white overflow-hidden shadow-sm rounded-lg">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />
                                {errors.name && (
                                    <div className="text-red-500">
                                        {errors.name}
                                    </div>
                                )}
                            </div>
                            <div className="mb-4">
                                <Label htmlFor="price">Harga</Label>
                                <Input
                                    id="price"
                                    type="text"
                                    value={data.price}
                                    onChange={(e) =>
                                        setData(
                                            "price",
                                            parseInt(e.target.value) || 0
                                        )
                                    }
                                />
                                {errors.price && (
                                    <div className="text-red-500">
                                        {errors.price}
                                    </div>
                                )}
                            </div>
                            <div className="mb-4">
                                <Label htmlFor="stock">Stok</Label>
                                <Input
                                    id="stock"
                                    type="number"
                                    value={data.stock}
                                    onChange={(e) =>
                                        setData(
                                            "stock",
                                            parseInt(e.target.value) || 0
                                        )
                                    }
                                />

                                {errors.stock && (
                                    <div className="text-red-500">
                                        {errors.stock}
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-end ">
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-xl h-[50px] w-[150px]"
                                    onClick={() => {
                                        toast({
                                            title: "Update Product Successfully",
                                            description: getCurrentDateTime(),
                                            variant: "secondary",
                                        });
                                    }}
                                >
                                    Update Task
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
