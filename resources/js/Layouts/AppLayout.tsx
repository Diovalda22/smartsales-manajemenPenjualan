import { SidebarProvider, SidebarTrigger } from "@/Components/ui/sidebar";
import { AppSidebar } from "@/Components/app-sidebar";
import { Toaster } from "@/Components/ui/toaster";
import Dropdown from "@/Components/Dropdown";
import { usePage } from "@inertiajs/react";
import { useState } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { ChevronDown, UserCircle } from "lucide-react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const user = usePage().props.auth.user;

    return (
        <SidebarProvider>
            <AppSidebar />
            <div className="flex-1 overflow-auto">
                <header className="bg-white ">
                    <div className="flex justify-between items-center mx-auto py-4 px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between gap-4">
                            <SidebarTrigger />
                        </div>
                        <div className="sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button
                                            type="button"
                                            className="flex items-center gap-2 rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium text-gray-500 transition hover:text-gray-700 focus:outline-none"
                                        >
                                            {/* Menggunakan ikon Lucide sebagai avatar */}
                                            <UserCircle className="w-8 h-8 text-gray-600" />
                                        </button>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </header>
                <main className="p-4">{children}</main>
                <Toaster />
            </div>
        </SidebarProvider>
    );
}
