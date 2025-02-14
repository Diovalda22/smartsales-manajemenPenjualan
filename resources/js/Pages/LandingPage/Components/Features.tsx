import { ShoppingCart, BarChart2, Package } from "lucide-react";

const features = [
    {
        icon: <ShoppingCart className="h-10 w-10 text-primary" />,
        title: "Easy Transactions",
        description:
            "Process sales quickly and efficiently with our intuitive interface.",
    },
    {
        icon: <BarChart2 className="h-10 w-10 text-primary" />,
        title: "Insightful Analytics",
        description:
            "Get valuable insights into your sales and inventory with detailed reports.",
    },
    {
        icon: <Package className="h-10 w-10 text-primary" />,
        title: "Inventory Management",
        description:
            "Keep track of your products and stock levels in real-time.",
    },
];

export default function Features() {
    return (
        <section id="features" className="py-20 px-6 bg-muted/50">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12">
                    Key Features
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-card text-card-foreground rounded-lg p-6 shadow-md"
                        >
                            <div className="mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-semibold mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-muted-foreground">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
