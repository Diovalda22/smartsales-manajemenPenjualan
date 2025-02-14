import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/Components/ui/accordion";

export default function FAQ() {
    const faqs = [
        {
            question: "How do I sign up?",
            answer: "Click the 'Sign up' button above and fill out the form.",
        },
        {
            question: "Is there a free version?",
            answer: "Yes! This platform is 100% free to use.",
        },
        {
            question: "How can I contact support?",
            answer: "You can reach us via email at support@smartsales.com.",
        },
    ];

    return (
        <section className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-6">
                Frequently Asked Questions
            </h2>
            <Accordion
                type="single"
                collapsible
                className="w-full max-w-2xl mx-auto text-left"
            >
                {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`faq-${index}`}>
                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                        <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    );
}
