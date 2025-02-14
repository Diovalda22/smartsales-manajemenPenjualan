import Hero from "./Components/Hero";
import Header from "./Components/Header";
import Features from "./Components/Features";
import CTA from "./Components/CTA";
import Testimonials from "./Components/Testimonials";
import Pricing from "./Components/Pricing";
import FAQ from "./Components/FAQ";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main>
                <Hero />
                <Features />
                <Testimonials />
                <FAQ />
                <CTA />
            </main>
        </div>
    );
}
