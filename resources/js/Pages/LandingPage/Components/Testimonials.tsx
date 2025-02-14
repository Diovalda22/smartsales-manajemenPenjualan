import { Card, CardContent } from "@/Components/ui/card";

export default function Testimonials() {
    const testimonials = [
        {
            name: "Budi",
            review: "SmartSales helped me increase my business efficiency by 40%!",
        },
        {
            name: "Siti",
            review: "The system is very easy to use, and the customer support is responsive!",
        },
        {
            name: "Andi",
            review: "The automated reports are extremely helpful for sales analysis.",
        },
    ];

    return (
        <section className="p-12 mx-14 text-center">
            <h2 className="text-3xl font-bold mb-6">What Our Users Say</h2>
            <div className="grid md:grid-cols-3 gap-4">
                {testimonials.map((t, index) => (
                    <Card key={index} className="shadow-md">
                        <CardContent className="p-4">
                            <p className="italic">"{t.review}"</p>
                            <h3 className="mt-4 font-semibold">{t.name}</h3>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}
