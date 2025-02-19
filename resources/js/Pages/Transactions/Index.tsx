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
import {
    CreditCard,
    Wallet,
    Banknote,
    CheckCircle,
    XCircle,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";
import { ClipboardList, Trash } from "lucide-react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/Components/ui/pagination";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Input } from "@/Components/ui/input";
import { DatePicker } from "@/Components/DatePicker";

interface SalesDetail {
    product: { id: number; name: string };
    quantity: number;
    unit_price: number;
    subtotal: number;
}

interface Sales {
    id: number;
    customer: { name: string };
    sales_date: string;
    payment_method: string;
    payment_status: string;
    total_price: number;
    details: SalesDetail[];
}

interface SalesResponse {
    data: Sales[];
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
    sales,
    filters,
}: {
    sales: SalesResponse;
    filters: {
        search?: string;
        payment_status?: string;
        sales_date?: string;
    };
}) {
    const [search, setSearch] = useState(filters.search || "");
    const [payment_status, setPaymentStatus] = useState(
        filters.payment_status || ""
    );
    const [sales_date, setSalesDate] = useState(filters.sales_date || "");

    const handleSearch = () => {
        router.get(
            "/transaction",
            { search, payment_status, sales_date },
            { preserveState: true }
        );
    };

    const resetFilters = () => {
        setSearch("");
        setPaymentStatus("");
        setSalesDate("");
        router.get("/transaction", {}, { preserveState: true });
    };

    const deleteTransaction = (id: number) => {
        if (confirm("Are you sure?")) {
            router.delete(`/transaction/${id}`);
            toast({
                title: "Delete Transaksi Successfully",
                variant: "destructive",
            });
        }
    };

    const updatePaymentStatus = (id: number, newStatus: string) => {
        router.patch(`/transaction/${id}`, { payment_status: newStatus });
        toast({
            title: "Update Payment Status Successfully",
            variant: "secondary",
        });
    };

    return (
        <AppLayout>
            <div className="p-2 m-2 flex flex-col md:flex-row justify-center md:justify-between items-center">
                <div className="header mb-4 md:mb-0 text-center md:text-left">
                    <h2 className="text-2xl font-semibold">Transactions</h2>
                    <h2 className="text-1xl font-normal text-gray-600">
                        Menampilkan list transaksi
                    </h2>
                </div>
                <div className="flex gap-4">
                    <Link href="/transaction/create">
                        <Button className="p-6">Create Transaction + </Button>
                    </Link>
                    <a href="/export-transactions">
                        <Button className="p-6" variant={"primary_outlined"}>
                            Export Transactions
                        </Button>
                    </a>
                </div>
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
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <Select
                                    value={payment_status}
                                    onValueChange={setPaymentStatus}
                                >
                                    <SelectTrigger className="w-full h-[50px] rounded-xl lg:w-[300px]">
                                        <SelectValue placeholder="Filter status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="all">
                                                Semua
                                            </SelectItem>
                                            <SelectItem value="paid">
                                                Paid
                                            </SelectItem>
                                            <SelectItem value="unpaid">
                                                Unpaid
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <DatePicker
                                    date={
                                        sales_date
                                            ? new Date(sales_date)
                                            : undefined
                                    }
                                    onChange={(date) =>
                                        setSalesDate(
                                            date
                                                ? format(date, "yyyy-MM-dd")
                                                : ""
                                        )
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
                            <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Product</TableHead>
                                <TableHead>Payment Method</TableHead>
                                <TableHead>Payment Status</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sales?.data?.length > 0 ? (
                                sales.data.map((sale, index) => (
                                    <TableRow key={sale.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>
                                            {sale.customer.name}
                                        </TableCell>

                                        <TableCell>
                                            {sale.details.map((detail) => (
                                                <div
                                                    key={detail.product.name}
                                                    className="flex items-center gap-2 bg-gray-100 px-3 py-2 my-2 rounded-md"
                                                >
                                                    <span className="font-medium text-gray-700">
                                                        {detail.product.name}
                                                    </span>
                                                    <span className="bg-primary text-white text-xs font-semibold px-2 py-1 rounded-full">
                                                        {detail.quantity}x
                                                    </span>
                                                </div>
                                            ))}
                                        </TableCell>
                                        <TableCell className="flex items-center gap-2">
                                            {sale.payment_method ===
                                                "Credit Card" && (
                                                <CreditCard className="w-4 h-4 text-blue-500" />
                                            )}
                                            {sale.payment_method === "Cash" && (
                                                <Wallet className="w-4 h-4 text-green-500" />
                                            )}
                                            {sale.payment_method ===
                                                "Bank Transfer" && (
                                                <Banknote className="w-4 h-4 text-purple-500" />
                                            )}
                                            <span className="text-gray-700 font-medium">
                                                {sale.payment_method}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <Select
                                                value={sale.payment_status}
                                                onValueChange={(newStatus) =>
                                                    updatePaymentStatus(
                                                        sale.id,
                                                        newStatus
                                                    )
                                                }
                                            >
                                                <SelectTrigger className="w-[120px]">
                                                    <SelectValue placeholder="Status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Paid">
                                                        <span className="flex items-center gap-2">
                                                            <CheckCircle className="w-4 h-4 text-green-600" />
                                                            Paid
                                                        </span>
                                                    </SelectItem>
                                                    <SelectItem value="Unpaid">
                                                        <span className="flex items-center gap-2">
                                                            <XCircle className="w-4 h-4 text-red-600" />
                                                            Unpaid
                                                        </span>
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                        <TableCell>{sale.sales_date}</TableCell>
                                        <TableCell>
                                            <Link
                                                href={`/transaction/${sale.id}`}
                                            >
                                                <Button
                                                    variant="outline"
                                                    className="mr-2"
                                                >
                                                    <ClipboardList />
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="destructive"
                                                onClick={() =>
                                                    deleteTransaction(sale.id)
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
                                        colSpan={7}
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
                                    href={sales.prev_page_url || "#"}
                                    onClick={(e) => {
                                        if (!sales.prev_page_url) {
                                            e.preventDefault();
                                        } else {
                                            router.get(
                                                sales.prev_page_url,
                                                {},
                                                { preserveState: true }
                                            );
                                        }
                                    }}
                                />
                            </PaginationItem>

                            {/* Tautan Halaman */}
                            {sales.links.map((link, index) => (
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
                                            .replace("&laquo; Previous", "«")
                                            .replace("Next &raquo;", "»")}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}

                            {/* Tombol Next */}
                            <PaginationItem>
                                <PaginationNext
                                    href={sales.next_page_url || "#"}
                                    onClick={(e) => {
                                        if (!sales.next_page_url) {
                                            e.preventDefault();
                                        } else {
                                            router.get(
                                                sales.next_page_url,
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
        </AppLayout>
    );
}
