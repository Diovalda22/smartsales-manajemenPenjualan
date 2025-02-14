import { Button } from "@/Components/ui/button";
// import Image from "next/image";
import HeroImage from "../Assets/charts.svg";
import { Link } from "@inertiajs/react";

export default function Hero() {
    return (
        <section className="py-20 px-6">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-around">
                <div className="md:w-1/2 mb-10 md:mb-0">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        Manage Your Store with Ease
                    </h1>
                    <p className="text-xl text-muted-foreground mb-8">
                        Streamline your transactions and inventory management
                        with our powerful web application.
                    </p>
                    <Link href="/register">
                        <Button size="lg">Get Started</Button>
                    </Link>
                </div>
                <div className="">
                    <img src={HeroImage} alt="" width={500} height={400} />
                </div>
            </div>
        </section>
    );
}
