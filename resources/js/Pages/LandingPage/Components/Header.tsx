import { Button } from "@/Components/ui/button";
import { Link, usePage } from "@inertiajs/react";
import { ShoppingBag } from "lucide-react";

interface HeaderProps {
    auth?: {
        user?: {
            name: string;
        } | null;
    };
}

export default function Header({ auth = { user: null } }: HeaderProps) {
    const user = usePage().props.auth.user;
    return (
        <header className="py-4 px-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b border-border/40">
            <div className="container mx-auto flex justify-between items-center">
                <Link
                    href="/"
                    className="text-2xl font-bold text-primary flex gap-2 justify-center items-center"
                >
                    <ShoppingBag /> SmartSales
                </Link>
                <div className="flex space-x-2">
                    {user ? (
                        <Link
                            href={route("dashboard")}
                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                        >
                            <Button variant={"default"}>Dashboard</Button>
                        </Link>
                    ) : (
                        <>
                            <Link href={route("login")}>
                                <Button variant="outline">Log in</Button>
                            </Link>
                            <Link href={route("register")}>
                                <Button>Sign up</Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
