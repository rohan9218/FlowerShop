
import { motion } from "framer-motion";

const services = [
    {
        id: "01",
        title: "Weddings and",
        highlight: "Event Planning",
        description:
            "From bridal bouquets to ceremony installations and reception florals, we design every detail to complement your love story.",
        button: "Explore weddings",
        image:
            "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=90",
        alt: "Beautiful wedding floral decoration",
        imagePosition: "right",
    },
    {
        id: "02",
        title: "Private",
        highlight: "Events and",
        secondLine: "Party",
        description:
            "Beautiful flowers for birthdays, anniversaries, dinner parties, showers, and every special moment worth celebrating.",
        button: "Explore events",
        image:
            "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=90",
        alt: "Elegant private event table with floral decorations",
        imagePosition: "left",
    },
    {
        id: "03",
        title: "Corporate",
        highlight: "Event",
        secondLine: "Planning",
        description:
            "We've picked a few favourites within each reach of the venue. Book early — June is peak season!",
        button: "Explore corporate",
        image:
            "https://images.unsplash.com/photo-1507504031003-b417219a0fde?w=1200&q=90",
        alt: "Luxury corporate event floral table decoration",
        imagePosition: "right",
    },
];

const Services = () => {
    return (
        <main className="w-full overflow-hidden bg-[#f9eff2]">

            {/* =================================
                SERVICES INTRO
            ================================= */}

            <section className="px-6 pt-20 pb-10 md:pt-28 md:pb-16">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-6xl mx-auto"
                >
                    <p className="text-[#d77b91] uppercase tracking-[4px] text-[10px] md:text-xs mb-5">
                        What We Do
                    </p>

                    <h1 className="font-serif italic text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#252020] leading-tight">
                        Our Services
                    </h1>

                    <p className="font-serif italic text-2xl md:text-4xl mt-3 text-[#252020]">
                        Kind of{" "}
                        <span className="text-[#ef7188]">
                            Celebration.
                        </span>
                    </p>
                </motion.div>
            </section>

            {/* =================================
                SERVICES ROWS
            ================================= */}

            <section className="px-6 pb-24 md:pb-32">
                <div className="max-w-6xl mx-auto space-y-20 md:space-y-28">

                    {services.map((service, index) => (
                        <div
                            key={service.id}
                            className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center ${
                                service.imagePosition === "left"
                                    ? "md:[&>*:first-child]:order-2"
                                    : ""
                            }`}
                        >

                            {/* TEXT CONTENT */}
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    x: service.imagePosition === "left" ? 50 : -50,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    x: 0,
                                }}
                                viewport={{ once: true, amount: 0.25 }}
                                transition={{
                                    duration: 0.8,
                                    ease: "easeOut",
                                }}
                                className="max-w-md mx-auto md:mx-0 w-full"
                            >
                                <span className="text-[#d77b91] text-[10px] tracking-[3px] uppercase">
                                    Service {service.id}
                                </span>

                                <h2 className="font-serif italic text-3xl sm:text-4xl lg:text-5xl text-[#211d1d] leading-[1.2] mt-5">
                                    {service.title}{" "}
                                    <span className="text-[#f06480]">
                                        {service.highlight}
                                    </span>

                                    {service.secondLine && (
                                        <>
                                            <br />
                                            {service.secondLine}
                                        </>
                                    )}
                                </h2>

                                <p className="text-[#696064] text-sm md:text-base leading-7 mt-5 max-w-sm">
                                    {service.description}
                                </p>

                                <motion.a
                                    href="#contact"
                                    whileHover={{
                                        y: -3,
                                        boxShadow: "4px 6px 0px #333",
                                    }}
                                    whileTap={{ scale: 0.96 }}
                                    className="inline-flex items-center mt-7 px-5 py-3 rounded-full bg-[#f3bdc8] border border-[#333] shadow-[3px_4px_0px_#333] text-[#252020] text-xs font-semibold transition-all duration-300"
                                >
                                    {service.button}
                                    <span className="ml-2">→</span>
                                </motion.a>
                            </motion.div>

                            {/* IMAGE CONTENT */}
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    x: service.imagePosition === "left" ? -50 : 50,
                                    y: 30,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    x: 0,
                                    y: 0,
                                }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{
                                    duration: 0.9,
                                    delay: 0.1,
                                }}
                                className={`w-full flex ${
                                    service.imagePosition === "left"
                                        ? "justify-start"
                                        : "justify-end"
                                }`}
                            >
                                <div className="w-full max-w-[390px] h-[380px] sm:h-[430px] md:h-[470px] rounded-[100px] border border-[#bcb1b4] p-2">
                                    <div className="w-full h-full overflow-hidden rounded-[95px]">
                                        <img
                                            src={service.image}
                                            alt={service.alt}
                                            loading="lazy"
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                </div>
                            </motion.div>

                        </div>
                    ))}

                </div>
            </section>

            {/* =================================
                FLORAL QUOTE
            ================================= */}

            <section className="bg-[#fffdfb] px-6 pt-24 pb-16 md:pt-32 md:pb-24">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9 }}
                    className="max-w-3xl mx-auto text-center"
                >
                    <p className="font-serif italic text-xl sm:text-2xl md:text-3xl leading-[1.5] text-[#292323]">
                        “If I had a single flower for every time I think about you,
                        I could walk forever in my garden.”
                    </p>

                    <p className="mt-5 font-serif italic text-sm text-[#e4778d]">
                        — Samy Islam —
                    </p>
                </motion.div>

                {/* WIDE FLORAL IMAGE */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="max-w-4xl mx-auto mt-12"
                >
                    <div className="w-full h-[280px] sm:h-[380px] md:h-[470px] rounded-[55px] border border-[#bcb1b4] p-2">
                        <div className="w-full h-full overflow-hidden rounded-[48px]">
                            <img
                                src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1600&q=90"
                                alt="Beautiful outdoor wedding floral arch by the sea"
                                loading="lazy"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </div>
                </motion.div>

            </section>

        </main>
    );
};

export default Services;
