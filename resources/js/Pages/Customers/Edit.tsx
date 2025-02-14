import React from "react";
import { Link, useForm } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Textarea } from "@/Components/ui/textarea";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Checkbox } from "@/Components/ui/checkbox";
import AppLayout from "@/Layouts/AppLayout";
import { toast } from "@/hooks/use-toast";

interface Customers {
    id: number;
    name: string;
    address: string;
    city: string;
    state: string;
    phone_number: number;
    email: string;
}

export default function Edit({ customer }: { customer: Customers }) {
    const { data, setData, put, processing, errors } = useForm({
        name: customer?.name || "",
        address: customer?.address || "",
        city: customer?.city || "",
        state: customer?.state || "",
        phone_number: customer?.phone_number || "",
        email: customer?.email || "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/customer/${customer.id}`);
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
                    <h2 className="text-2xl font-semibold">Edit Customer</h2>
                    <h2 className="text-1xl font-normal text-gray-600">
                        Update data pelanggan
                    </h2>
                </div>
                <Link href="/customer">
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
                                    placeholder="Nama Pelanggan"
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
                                <Label htmlFor="address">Address</Label>
                                <Input
                                    id="address"
                                    type="text"
                                    placeholder="Alamat"
                                    value={data.address}
                                    onChange={(e) =>
                                        setData("address", e.target.value)
                                    }
                                />
                                {errors.address && (
                                    <div className="text-red-500">
                                        {errors.address}
                                    </div>
                                )}
                            </div>
                            <div className="mb-4">
                                <Label htmlFor="city">City</Label>
                                <Input
                                    id="city"
                                    type="text"
                                    placeholder="Nama Kota"
                                    value={data.city}
                                    onChange={(e) =>
                                        setData("city", e.target.value)
                                    }
                                />
                                {errors.city && (
                                    <div className="text-red-500">
                                        {errors.city}
                                    </div>
                                )}
                            </div>
                            <div className="mb-4">
                                <Label htmlFor="state">State</Label>
                                <Input
                                    id="state"
                                    type="text"
                                    placeholder="Nama Provinsi"
                                    value={data.state}
                                    onChange={(e) =>
                                        setData("state", e.target.value)
                                    }
                                />
                                {errors.state && (
                                    <div className="text-red-500">
                                        {errors.state}
                                    </div>
                                )}
                            </div>
                            <div className="mb-4">
                                <Label htmlFor="phone_number">
                                    Phone number
                                </Label>
                                <Input
                                    id="phone_number"
                                    type="number"
                                    placeholder="Nomor Telepon"
                                    value={data.phone_number}
                                    onChange={(e) =>
                                        setData("phone_number", e.target.value)
                                    }
                                />
                                {errors.phone_number && (
                                    <div className="text-red-500">
                                        {errors.phone_number}
                                    </div>
                                )}
                            </div>
                            <div className="mb-4">
                                <Label htmlFor="name">E-mail</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Alamat Email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />
                                {errors.email && (
                                    <div className="text-red-500">
                                        {errors.email}
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
                                            title: "Update Customer Successfully",
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
