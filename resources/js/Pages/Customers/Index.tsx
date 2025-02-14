import React, { useState } from "react";
import { Link, router } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Edit, Trash } from "lucide-react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/Components/ui/pagination";

interface Customers {
    id: number;
    name: string;
    address: string;
    city: string;
    state: string;
    phone_number: number;
    email: string;
}

interface CustomersResponse {
    data: Customers[];
    links: Pagination["links"];
    current_page: number;
    last_page: number;
    next_page_url: string | null;
    prev_page_url: string | null;
}

interface Pagination {
    current_page: number;
    last_page: number;
    next_page_url: string | null;
    prev_page_url: string | null;
    links: { url: string | null; label: string; active: boolean }[];
}

export default function Index({
    customers,
    filters,
}: {
    customers: CustomersResponse;
    filters: { search?: string };
}) {
    const [search, setSearch] = useState(filters.search || "");

    const handleSearch = () => {
        router.get("/customer", { search }, { preserveState: true });
    };

    const resetFilters = () => {
        setSearch("");
        router.get("/customer", {}, { preserveState: true });
    };

    const deleteCategory = (id: number) => {
        if (confirm("Are you sure?")) {
            router.delete(`/customer/${id}`);
            toast({
                title: "Delete Customer Successfully",
                variant: "destructive",
            });
        }
    };

    return (
        <AppLayout>
            <>
                <div className="p-2 m-2 flex flex-col md:flex-row justify-center md:justify-between items-center">
                    <div className="header mb-4 md:mb-0 text-center md:text-left">
                        <h2 className="text-2xl font-semibold">Customers</h2>
                        <h2 className="text-1xl font-normal text-gray-600">
                            Menampilkan list pelanggan anda
                        </h2>
                    </div>
                    <Link href="/customer/create">
                        <Button className="p-6">Create Customer + </Button>
                    </Link>
                </div>
                <div className="border border-gray-200 bg-white overflow-hidden shadow-sm sm:rounded-xl">
                    <div className="py-4">
                        <div className="flex justify-between items-center mb-8 mx-4 border border-primary shadow-md rounded-xl">
                            <div className="space-x-2 m-4">
                                <h1 className="text-gray-500 m-4">
                                    Pencarian Data
                                </h1>
                                <div className="flex flex-col gap-4 mb-4 md:flex-col lg:flex-row">
                                    <Input
                                        type="text"
                                        placeholder="Mulai Pencarian..."
                                        className="h-[50px] rounded-xl w-full lg:w-[350px]"
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                    />
                                </div>

                                <Button
                                    className="rounded-xl h-[45px] w-[150px] mb-4"
                                    type="button"
                                    onClick={handleSearch}
                                >
                                    Search
                                </Button>
                                <Button
                                    variant="destructive_outlined"
                                    className="rounded-xl h-[45px] w-[150px]"
                                    type="button"
                                    onClick={resetFilters}
                                >
                                    Reset
                                </Button>
                            </div>
                        </div>
                        <Table className="w-full">
                            <TableHeader>
                                <TableRow className="w-full">
                                    <TableHead className="p-6 w-[5%]">
                                        #
                                    </TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Address</TableHead>
                                    <TableHead>City</TableHead>
                                    <TableHead>State</TableHead>
                                    <TableHead>Phone Number</TableHead>
                                    <TableHead>E-mail</TableHead>
                                    <TableHead className="w-[25%]">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {customers?.data?.length > 0 ? (
                                    customers.data.map((customer, index) => (
                                        <TableRow
                                            key={customer.id}
                                            className="w-full"
                                        >
                                            <TableCell className="p-6 w-[5%]">
                                                {index + 1}
                                            </TableCell>
                                            <TableCell>
                                                {customer.name}
                                            </TableCell>
                                            <TableCell>
                                                {customer.address}
                                            </TableCell>
                                            <TableCell>
                                                {customer.city}
                                            </TableCell>
                                            <TableCell>
                                                {customer.state}
                                            </TableCell>
                                            <TableCell>
                                                {customer.phone_number}
                                            </TableCell>
                                            <TableCell>
                                                {customer.email}
                                            </TableCell>
                                            <TableCell className="w-[25%]">
                                                <Link
                                                    href={`/customer/${customer.id}/edit`}
                                                >
                                                    <Button
                                                        variant="outline"
                                                        className="mr-2 mb-2"
                                                    >
                                                        <Edit />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="destructive"
                                                    onClick={() =>
                                                        deleteCategory(
                                                            customer.id
                                                        )
                                                    }
                                                >
                                                    <Trash />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={8}
                                            className="text-2xl text-center p-6 text-gray-500"
                                        >
                                            Data tidak ditemukan 😢
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>

                        <Pagination className="flex justify-center items-center py-4">
                            <PaginationContent>
                                {/* Tombol Previous */}
                                <PaginationItem>
                                    <PaginationPrevious
                                        href={customers.prev_page_url || "#"}
                                        onClick={(e) => {
                                            if (!customers.prev_page_url) {
                                                e.preventDefault();
                                            } else {
                                                router.get(
                                                    customers.prev_page_url,
                                                    {},
                                                    { preserveState: true }
                                                );
                                            }
                                        }}
                                    />
                                </PaginationItem>

                                {/* Tautan Halaman */}
                                {customers.links.map((link, index) => (
                                    <PaginationItem key={index}>
                                        <PaginationLink
                                            href={link.url || "#"}
                                            onClick={(e) => {
                                                if (!link.url || link.active) {
                                                    e.preventDefault();
                                                } else {
                                                    router.get(
                                                        link.url,
                                                        {},
                                                        { preserveState: true }
                                                    );
                                                }
                                            }}
                                            isActive={link.active}
                                        >
                                            {link.label
                                                .replace(
                                                    "&laquo; Previous",
                                                    "«"
                                                )
                                                .replace("Next &raquo;", "»")}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}

                                {/* Tombol Next */}
                                <PaginationItem>
                                    <PaginationNext
                                        href={customers.next_page_url || "#"}
                                        onClick={(e) => {
                                            if (!customers.next_page_url) {
                                                e.preventDefault();
                                            } else {
                                                router.get(
                                                    customers.next_page_url,
                                                    {},
                                                    { preserveState: true }
                                                );
                                            }
                                        }}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </div>
            </>
        </AppLayout>
    );
}
