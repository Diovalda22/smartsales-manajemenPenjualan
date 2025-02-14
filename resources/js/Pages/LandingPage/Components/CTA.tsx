import { Button } from "@/Components/ui/button";
import { Link } from "@inertiajs/react";

export default function CTA() {
    return (
        <section className="py-20 px-6 bg-primary text-primary-foreground">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-bold mb-6">
                    Manage Your Sales for Free – Forever!
                </h2>
                <p className="text-xl mb-8 max-w-2xl mx-auto">
                    SmartSales is a 100% free sales management solution – no
                    subscriptions, no hidden fees. Track transactions, monitor
                    reports, and grow your business without spending a dime!
                </p>
                <Link href="/register">
                    <Button size="lg" variant="secondary">
                        Get Started for Free!
                    </Button>
                </Link>
            </div>
        </section>
    );
}
