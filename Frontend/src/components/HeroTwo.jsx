
import { motion } from "framer-motion";

// ==========================================
// FLOWER BOUQUETS DATA
// ==========================================

const bouquets = [
    {
        id: 1,
        name: "Romantic Roses",
        category: "LOVE & ROMANCE",
        price: "₹1,499",
        image:
            "https://images.unsplash.com/photo-1494972308805-463bc619d34e?w=900&q=90",
        description: "Express your love with beautiful red roses.",
        rotate: -10,
    },
    {
        id: 2,
        name: "Pink Blossom",
        category: "SPECIAL MOMENTS",
        price: "₹1,899",
        image:
            "https://images.unsplash.com/photo-1520763185298-1b434c919102?w=900&q=90",
        description: "Soft pink flowers for unforgettable moments.",
        rotate: -5,
    },
    {
        id: 3,
        name: "Luxury Bouquet",
        category: "PREMIUM COLLECTION",
        price: "₹2,499",
        image:
            "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=900&q=90",
        description: "A luxurious arrangement made with love.",
        rotate: 0,
    },
    {
        id: 4,
        name: "Spring Garden",
        category: "FRESH FLOWERS",
        price: "₹1,699",
        image:
            "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=900&q=90",
        description: "Bring the freshness of spring to your day.",
        rotate: 5,
    },
    {
        id: 5,
        name: "White Elegance",
        category: "ELEGANT COLLECTION",
        price: "₹2,199",
        image:
            "https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=900&q=90",
        description: "Elegant white flowers for beautiful memories.",
        rotate: 10,
    },
];

// ==========================================
// ANNOUNCEMENT DATA
// ==========================================

const announcements = [
    "We Celebrate",
    "We Don't Follow, We Create",
    "We Make It Personal",
    "We Create Style",
];

// ==========================================
// HERO TWO COMPONENT
// ==========================================

const HeroTwo = () => {
    return (
        <main className="w-full overflow-hidden">

            {/* ==================================
                SECTION 1 - FLOWER COLLECTION
            ================================== */}

            <section
                id="collections"
                className="relative overflow-hidden bg-[#fffaf7] py-24 md:py-32"
            >
                {/* BACKGROUND DECORATION */}
                <div className="absolute top-20 left-[-100px] w-72 h-72 bg-[#f8dce3]/50 rounded-full blur-3xl pointer-events-none" />

                <div className="absolute bottom-10 right-[-100px] w-80 h-80 bg-[#e7eee5]/70 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

                    {/* SECTION HEADING */}
                    <div className="text-center max-w-3xl mx-auto">

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-[#d77b91] text-xs md:text-sm font-semibold tracking-[4px] uppercase"
                        >
                            Made with love, designed with flowers
                        </motion.p>

                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="mt-5 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif italic text-[#315c45] leading-tight"
                        >
                            Flowers That
                            <span className="text-[#e77b91]"> Speak </span>
                            Your Heart
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="mt-6 text-gray-500 text-base md:text-lg leading-8"
                        >
                            Every bouquet tells a beautiful story. Discover our
                            handpicked floral collections, thoughtfully arranged
                            to make every moment unforgettable.
                        </motion.p>
                    </div>

                    {/* BOUQUET CARDS */}
                    <div className="mt-16 md:mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-5 items-center">

                        {bouquets.map((bouquet, index) => (
                            <motion.div
                                key={bouquet.id}
                                initial={{
                                    opacity: 0,
                                    y: 70,
                                    rotate: bouquet.rotate,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                    rotate: 0,
                                }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{
                                    duration: 0.8,
                                    delay: index * 0.12,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                whileHover={{
                                    y: -14,
                                    rotate: bouquet.rotate,
                                    scale: 1.035,
                                    transition: { duration: 0.3 },
                                }}
                                className="group relative"
                            >
                                {/* IMAGE CARD */}
                                <div className="relative h-[390px] sm:h-[360px] lg:h-[390px] overflow-hidden rounded-t-[150px] rounded-b-[28px] bg-[#f5e8e9] shadow-[0_15px_45px_rgba(90,60,60,0.10)]">

                                    <img
                                        src={bouquet.image}
                                        alt={bouquet.name}
                                        loading="eager"
                                        decoding="async"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />

                                    {/* IMAGE OVERLAY */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                                    {/* NUMBER */}
                                    <span className="absolute top-5 left-5 text-white/90 text-sm tracking-widest">
                                        0{bouquet.id}
                                    </span>

                                    {/* CATEGORY */}
                                    <span className="absolute top-5 right-4 bg-white/90 backdrop-blur-sm text-[#315c45] text-[9px] tracking-widest font-semibold px-3 py-2 rounded-full">
                                        {bouquet.category}
                                    </span>

                                    {/* IMAGE TEXT */}
                                    <div className="absolute bottom-6 left-5 right-5 text-white">
                                        <h3 className="text-2xl font-serif italic">
                                            {bouquet.name}
                                        </h3>

                                        <p className="text-sm text-white/85 mt-2 leading-6">
                                            {bouquet.description}
                                        </p>

                                        <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/40">
                                            <span className="text-lg font-semibold">
                                                {bouquet.price}
                                            </span>

                                            <span className="text-sm tracking-wide">
                                                Discover →
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* BOTTOM CONTENT */}
                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="mt-16 text-center"
                    >
                        <p className="text-[#315c45] font-serif italic text-xl md:text-2xl">
                            A little flower can make a big difference.
                        </p>

                        <a
                            href="#shop"
                            className="inline-flex items-center justify-center mt-7 px-9 py-4 rounded-full bg-[#f4c4ce] border border-[#315c45] text-[#263f32] font-semibold shadow-[4px_5px_0px_#315c45] hover:translate-y-1 hover:shadow-none transition-all duration-300"
                        >
                            Explore All Bouquets →
                        </a>
                    </motion.div>
                </div>
            </section>


            {/* ==================================
                SECTION 2 - ANNOUNCEMENT MARQUEE
            ================================== */}

            <section className="bg-[#eca9b5] py-5 overflow-hidden">

                <motion.div
                    className="flex w-max items-center"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    {[
                        ...announcements,
                        ...announcements,
                        ...announcements,
                        ...announcements,
                    ].map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-7 px-5 whitespace-nowrap"
                        >
                            <span className="text-[#e66d83] text-lg">
                                ✿
                            </span>

                            <span className="font-serif italic text-sm md:text-base text-[#382e2d] tracking-wide">
                                {item}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </section>


            {/* ==================================
                SECTION 3 - BRAND PHILOSOPHY
            ================================== */}

            <section className="relative bg-[#fffdfb] min-h-[620px] md:min-h-[720px] flex items-center justify-center px-6 py-28">

                {/* SMALL DECORATIVE TEXT */}
                <div className="absolute top-12 left-1/2 -translate-x-1/2">
                    <span className="text-[10px] tracking-[5px] uppercase text-[#d77b91]">
                        Our Philosophy
                    </span>
                </div>

                {/* DECORATIVE FLOWER */}
                <motion.span
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 35,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute top-24 right-[12%] text-4xl text-[#edb8c3]/50 hidden md:block"
                >
                    ✿
                </motion.span>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.4 }}
                    className="max-w-3xl text-center"
                >
                    <motion.p
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: { opacity: 1, y: 0 },
                        }}
                        transition={{ duration: 0.9 }}
                        className="font-serif italic text-2xl sm:text-3xl md:text-4xl lg:text-[42px] leading-[1.5] text-[#292625]"
                    >
                        We create with flowers, feeling & intention.

                        <span className="text-[#d5c9c5]">
                            {" "}From intimate gatherings to unforgettable weddings,
                        </span>

                        <span className="text-[#d5c9c5]">
                            {" "}we create floral experiences that feel personal,
                        </span>

                        <span className="text-[#d5c9c5]">
                            {" "}effortless, and beautifully considered.
                        </span>
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="mt-10"
                    >
                        <p className="font-serif italic text-sm text-[#e4778d]">
                            — Bloom & Blossom, Founder —
                        </p>
                    </motion.div>
                </motion.div>

            </section>

        </main>
    );
};

export default HeroTwo;
