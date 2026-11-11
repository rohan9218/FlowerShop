

import FAQ from "../components/FAQ";
import Hero from "../components/Hero";
import HeroTwo from "../components/HeroTwo";
import Services from "../components/Services";

const Home = () => {
    return (
        <main className="w-full min-h-screen overflow-x-hidden">

            {/* Hero Section */}
            <Hero />

            {/* Flower Collection Section */}
            <HeroTwo />

            {/* Services Section */}
            <Services />

            {/* FAQ Section */}
            <FAQ />

        </main>
    );
};

export default Home;
