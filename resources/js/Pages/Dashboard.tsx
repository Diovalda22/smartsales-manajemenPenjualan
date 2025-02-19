import { usePage } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import {
    CheckCircle,
    TrendingUp,
    XCircle,
    DollarSign,
    ShoppingCart,
} from "lucide-react";

interface SalesSummary {
    total_sales: number;
    total_paid: number;
    total_unpaid: number;
}

interface Transaction {
    id: number;
    customer: {
        name: string;
    };
    total_price: number;
    payment_status: string;
    sales_date: string;
}

interface TopProduct {
    name: string;
    total_sold: number;
}

interface DashboardResponse {
    salesSummary?: SalesSummary;
    totalRevenue?: number;
    latestTransactions?: Transaction[];
    topProducts?: TopProduct[];
}

export default function Dashboard({
    salesSummary = { total_sales: 0, total_paid: 0, total_unpaid: 0 },
    totalRevenue = 0,
    latestTransactions = [],
    topProducts = [],
}: DashboardResponse) {
    const user = usePage().props.auth.user;

    return (
        <AppLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="bg-white shadow-md p-4 rounded-xl">
                    <h1 className="text-2xl font-bold">Hi, {user.name}</h1>
                    <h2 className="text-gray-400">
                        Welcome to SmartSales Dashboard
                    </h2>
                </div>

                {/* Sales Summary */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card className="bg-blue-50 border-blue-300">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0">
                            <CardTitle>Total Sales</CardTitle>
                            <TrendingUp className="h-6 w-6 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">
                                {salesSummary.total_sales}
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-green-50 border-green-300">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0">
                            <CardTitle>Paid Sales</CardTitle>
                            <CheckCircle className="h-6 w-6 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">
                                {salesSummary.total_paid}
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-red-50 border-red-300">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0">
                            <CardTitle>Unpaid Sales</CardTitle>
                            <XCircle className="h-6 w-6 text-red-600" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">
                                {salesSummary.total_unpaid}
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-yellow-50 border-yellow-300">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0">
                            <CardTitle>Total Revenue</CardTitle>
                            <DollarSign className="h-6 w-6 text-yellow-600" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">
                                {new Intl.NumberFormat("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                    minimumFractionDigits: 0,
                                }).format(totalRevenue)}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Latest Transactions */}
                <div className="bg-white shadow-md p-4 rounded-xl">
                    <h2 className="text-xl font-semibold mb-2">
                        Latest Transactions
                    </h2>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[20%]">
                                    Sales Date
                                </TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Total Price</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {latestTransactions.map((transaction) => (
                                <TableRow key={transaction.id}>
                                    <TableCell>
                                        {transaction.sales_date}
                                    </TableCell>
                                    <TableCell>
                                        {transaction.customer.name}
                                    </TableCell>
                                    <TableCell>
                                        {new Intl.NumberFormat("id-ID", {
                                            style: "currency",
                                            currency: "IDR",
                                            minimumFractionDigits: 0,
                                        }).format(transaction.total_price)}
                                    </TableCell>
                                    <TableCell
                                        className={
                                            transaction.payment_status ===
                                            "Paid"
                                                ? "text-green-600 font-semibold"
                                                : "text-red-600 font-semibold"
                                        }
                                    >
                                        {transaction.payment_status}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Top Selling Products */}
                <div className="bg-white shadow-md p-4 rounded-xl">
                    <h2 className="text-xl font-semibold mb-2">
                        Top Selling Products
                    </h2>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Product Name</TableHead>
                                <TableHead>Total Sold</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {topProducts.map((product, index) => (
                                <TableRow key={index}>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.total_sold}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
