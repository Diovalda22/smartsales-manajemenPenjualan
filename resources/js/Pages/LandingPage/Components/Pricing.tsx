import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";

export default function Pricing() {
    const plans = [
        {
            name: "Gratis",
            price: "Rp 0",
            features: ["10 transaksi/bulan", "Basic Reports"],
        },
        {
            name: "Basic",
            price: "Rp 50.000/bulan",
            features: ["Unlimited transaksi", "Laporan bulanan"],
        },
        {
            name: "Pro",
            price: "Rp 150.000/bulan",
            features: ["Semua fitur + API Integration"],
        },
    ];

    return (
        <section className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-6">Pilih Paket yang Sesuai</h2>
            <div className="grid md:grid-cols-3 gap-4">
                {plans.map((plan, index) => (
                    <Card key={index} className="shadow-md border">
                        <CardHeader>
                            <CardTitle>{plan.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">{plan.price}</p>
                            <ul className="mt-2 space-y-1">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="text-gray-600">
                                        ✔ {feature}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}
