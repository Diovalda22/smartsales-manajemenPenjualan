import {
    BanknoteIcon,
    Box,
    CheckSquare,
    DollarSign,
    LayoutDashboard,
    ShoppingBag,
    SquareTerminal,
    Tag,
    User,
} from "lucide-react";
import { Link, usePage } from "@inertiajs/react";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/Components/ui/sidebar";

import { NavMain } from "@/Components/Nav-main";

const data = {
    mainMenu: [
        {
            title: "Dashboard",
            route: "dashboard",
            icon: LayoutDashboard,
        },
        {
            title: "Transactions",
            route: "transaction.index",
            icon: DollarSign,
        },
    ],

    masterMenu: [
        {
            title: "Products",
            route: "product.index",
            icon: Tag,
        },
        {
            title: "Product Categories",
            route: "category.index",
            icon: Box,
        },
        {
            title: "Customers",
            route: "customer.index",
            icon: User,
        },
    ],

    navMain: [
        {
            title: "Products",
            url: "#",
            icon: Tag,
            items: [
                {
                    title: "Product Categories",
                    url: "/category",
                },
                {
                    title: "Products",
                    url: "product",
                },
            ],
        },
    ],
};

export function AppSidebar() {
    const { url } = usePage();

    return (
        <Sidebar collapsible="icon" variant="floating">
            <SidebarHeader>
                <h1 className="p-4 text-2xl font-bold text-primary flex gap-2 justify-center items-center">
                    <ShoppingBag /> SmartSales
                </h1>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {data.mainMenu.map((item) => {
                                const itemPath = new URL(
                                    route(item.route),
                                    window.location.origin
                                ).pathname;
                                const isActive =
                                    url === itemPath ||
                                    url.startsWith(itemPath);

                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <Link
                                                href={route(item.route)}
                                                className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
                                                    isActive
                                                        ? "bg-sidebar-accent font-bold"
                                                        : "text-gray-700 hover:bg-gray-200"
                                                }`}
                                            >
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                        <SidebarGroupLabel>Master Data</SidebarGroupLabel>
                        <SidebarMenu>
                            {data.masterMenu.map((item) => {
                                const itemPath = new URL(
                                    route(item.route),
                                    window.location.origin
                                ).pathname;
                                const isActive =
                                    url === itemPath ||
                                    url.startsWith(itemPath);

                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <Link
                                                href={route(item.route)}
                                                className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
                                                    isActive
                                                        ? "bg-sidebar-accent font-bold"
                                                        : "text-gray-700 hover:bg-gray-200"
                                                }`}
                                            >
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
