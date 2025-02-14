import React, { useEffect, useRef, useState } from "react";
import { Link, useForm } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { Label } from "@/Components/ui/label";
import AppLayout from "@/Layouts/AppLayout";
import { toast } from "@/hooks/use-toast";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        address: "",
        city: "",
        state: "",
        phone_number: "",
        email: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/customer");
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
                        Tambahkan Customer
                    </h2>
                    <h2 className="text-1xl font-normal text-gray-600">
                        Menambahkan Pelanggan
                    </h2>
                </div>
                <Link href="/customer">
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
                            <div className="flex justify-end">
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-xl h-[50px] w-[150px]"
                                    onClick={() => {
                                        toast({
                                            title: "Created Customer Successfully",
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
