import React from "react";
import { Link, useForm } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Textarea } from "@/Components/ui/textarea";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Checkbox } from "@/Components/ui/checkbox";
import AppLayout from "@/Layouts/AppLayout";
import { toast } from "@/hooks/use-toast";

interface Categories {
    id: number;
    name: string;
}

export default function Edit({ category }: { category: Categories }) {
    const { data, setData, put, processing, errors } = useForm({
        name: category?.name || "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/category/${category.id}`);
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
                        Edit Product Category
                    </h2>
                    <h2 className="text-1xl font-normal text-gray-600">
                        Update data kategori produk
                    </h2>
                </div>
                <Link href="/category">
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
                            <div className="flex justify-end ">
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-xl h-[50px] w-[150px]"
                                    onClick={() => {
                                        toast({
                                            title: "Update Product Category Successfully",
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
