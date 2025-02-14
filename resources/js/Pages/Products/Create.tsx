import React, { useEffect, useRef, useState } from "react";
import { Link, useForm } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { Label } from "@/Components/ui/label";
import AppLayout from "@/Layouts/AppLayout";
import { toast } from "@/hooks/use-toast";
import { ComboboxCategory } from "./Components/ComboboxCategory";
import PriceInput from "@/Components/PriceInput";

interface Category {
    id: number;
    name: string;
}

interface CreateProps {
    categories: Category[];
}

export default function Create({ categories }: CreateProps) {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        product_category_id: null as number | null,
        price: 0,
        stock: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/product");
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
                    <h2 className="text-2xl font-semibold">
                        Tambahkan Product
                    </h2>
                    <h2 className="text-1xl font-normal text-gray-600">
                        Menambahkan produk
                    </h2>
                </div>
                <Link href="/product">
                    <Button className="p-4">← Kembali</Button>
                </Link>
            </div>
            <div className="grid lg:grid-cols-2 gap-4">
                <div className="lg:py-8 md:py-8 border roundedborder border-gray-200 bg-white overflow-hidden shadow-sm rounded-lg">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <form onSubmit={handleSubmit} className="p-4 md:p-0">
                            <div className="mb-4">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Nama Produk"
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
                                <Label htmlFor="category" className="me-5">
                                    Product Category
                                </Label>
                                <ComboboxCategory
                                    categories={categories}
                                    selected={data.product_category_id}
                                    setSelected={(value) =>
                                        setData("product_category_id", value)
                                    }
                                />
                                {errors.product_category_id && (
                                    <div className="text-red-500">
                                        {errors.product_category_id}
                                    </div>
                                )}
                            </div>
                            <PriceInput
                                data={data}
                                setData={setData}
                                errors={errors}
                            />
                            <div className="mb-4">
                                <Label htmlFor="stock">Stock</Label>
                                <Input
                                    id="stock"
                                    type="number"
                                    placeholder="Jumlah stok produk"
                                    value={data.stock}
                                    onChange={(e) =>
                                        setData("stock", e.target.value)
                                    }
                                />
                                {errors.name && (
                                    <div className="text-red-500">
                                        {errors.price}
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-end">
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-xl h-[50px] w-[150px]"
                                    onClick={() => {
                                        toast({
                                            title: "Created Task Successfully",
                                            description: getCurrentDateTime(),
                                            variant: "success",
                                        });
                                    }}
                                >
                                    Save
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
