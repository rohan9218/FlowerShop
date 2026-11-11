
export default function Hero() {
    return (
        <section
            id="home"
            className="relative w-full min-h-screen overflow-hidden bg-[#FAF0F3] flex items-center pt-[76px] md:pt-[84px]"
        >
            {/* BACKGROUND DECORATION */}
            <div className="absolute top-20 left-0 w-64 h-64 bg-[#F5C5CE]/30 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#D77B91]/15 rounded-full blur-[110px] pointer-events-none" />

            {/* HERO CONTENT */}
            <div className="relative z-10 w-full px-6 md:px-12 lg:px-16 py-12 md:py-16">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* LEFT CONTENT */}
                    <div className="text-center md:text-left">

                        {/* SUB HEADING */}
                        <div className="flex items-center justify-center md:justify-start gap-3 mb-7">
                            <span className="w-10 h-[1px] bg-[#D77B91]" />
                            <p className="text-[#D77B91] uppercase tracking-[4px] text-[11px] sm:text-xs font-semibold">
                                Welcome to Bloom & Blossom
                            </p>
                        </div>

                        {/* MAIN HEADING */}
                        <h1 className="font-serif text-[43px] sm:text-[55px] lg:text-[65px] xl:text-[76px] leading-[1.08] tracking-[-1.5px] text-[#202020]">
                            Flowers that
                            <br />
                            speak the language
                            <br />
                            of{" "}
                            <span className="relative inline-block italic text-[#FF637D]">
                                Love & Beauty
                                <span className="absolute -bottom-2 left-0 w-full h-[3px] bg-[#F5C5CE] rounded-full" />
                            </span>
                        </h1>

                        {/* DESCRIPTION */}
                        <p className="text-gray-600 text-sm sm:text-base lg:text-[17px] leading-7 sm:leading-8 mt-8 max-w-[490px] mx-auto md:mx-0">
                            Thoughtfully designed floral arrangements,
                            wedding styling, and event decorations made
                            to bring beauty, happiness and warmth.
                        </p>

                        {/* BUTTON */}
                        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-5">
                            <a
                                href="#services"
                                className="group inline-flex items-center gap-4 px-8 py-4 rounded-full bg-[#F5C5CE] border border-[#333] shadow-[4px_5px_0px_#333] text-black text-sm font-semibold hover:translate-y-1 hover:shadow-none transition-all duration-300"
                            >
                                Explore our services
                                <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">
                                    →
                                </span>
                            </a>

                            <span className="text-sm text-gray-500 font-serif italic">
                                Every flower tells a story.
                            </span>
                        </div>

                        {/* BOTTOM DETAILS */}
                        <div className="mt-12 pt-7 border-t border-[#D77B91]/25 flex flex-wrap justify-center md:justify-start gap-x-10 gap-y-5">

                            <div>
                                <h3 className="text-xl font-semibold text-[#315C45]">
                                    Fresh
                                </h3>
                                <p className="text-[10px] uppercase tracking-[2px] text-gray-500 mt-1">
                                    Flower Selection
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-[#315C45]">
                                    Unique
                                </h3>
                                <p className="text-[10px] uppercase tracking-[2px] text-gray-500 mt-1">
                                    Floral Designs
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-[#315C45]">
                                    Beautiful
                                </h3>
                                <p className="text-[10px] uppercase tracking-[2px] text-gray-500 mt-1">
                                    Every Occasion
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* RIGHT IMAGE DESIGN */}
                    <div className="relative w-full max-w-[520px] mx-auto md:ml-auto">

                        {/* BACKGROUND SHAPE */}
                        <div className="absolute top-5 right-0 w-[85%] h-[90%] rounded-t-full rounded-b-[45%] bg-[#F5C5CE]/50 rotate-6" />

                        {/* OUTER FRAME */}
                        <div className="relative w-[90%] mx-auto h-[390px] sm:h-[490px] lg:h-[550px]">

                            {/* IMAGE */}
                            <div className="absolute inset-0 overflow-hidden rounded-t-full rounded-b-[46%] border-[7px] border-white shadow-[0_25px_60px_rgba(80,40,50,0.16)]">
                                <img
                                    src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1200&q=90"
                                    alt="Beautiful fresh flower arrangement"
                                    loading="eager"
                                    fetchPriority="high"
                                    decoding="async"
                                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                                />
                            </div>

                            {/* IMAGE OVERLAY */}
                            <div className="absolute inset-0 rounded-t-full rounded-b-[46%] bg-gradient-to-t from-[#251b20]/30 via-transparent to-transparent pointer-events-none" />

                            {/* TOP DECORATIVE CIRCLE */}
                            <div className="absolute -top-5 -right-5 sm:-right-8 w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-[#D77B91]/60 flex items-center justify-center bg-[#FAF0F3]/80 backdrop-blur-sm">
                                <div className="text-center">
                                    <span className="block text-[#D77B91] text-3xl">
                                        ✿
                                    </span>
                                    <span className="text-[8px] uppercase tracking-widest text-[#315C45]">
                                        Bloom
                                    </span>
                                </div>
                            </div>

                            {/* FLOATING CARD */}
                            <div className="absolute -bottom-5 -left-5 sm:-left-12 bg-white rounded-2xl shadow-[0_12px_35px_rgba(0,0,0,0.12)] p-4 sm:p-5 flex items-center gap-4 border border-[#F5C5CE]/60">
                                <div className="w-12 h-12 rounded-full bg-[#FAF0F3] flex items-center justify-center text-2xl text-[#D77B91]">
                                    ❀
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-[2px] text-[#D77B91] font-semibold">
                                        Made with love
                                    </p>
                                    <h3 className="font-serif italic text-lg sm:text-xl text-[#315C45]">
                                        Naturally Beautiful
                                    </h3>
                                </div>
                            </div>

                            {/* SIDE DECORATION */}
                            <div className="absolute top-[35%] -left-9 hidden sm:block text-[#D77B91] text-5xl opacity-70">
                                ✿
                            </div>

                        </div>

                        {/* BOTTOM DECORATIVE TEXT */}
                        <p className="text-center text-[#D77B91] font-serif italic text-sm tracking-widest mt-12">
                            A little beauty in every bloom
                        </p>

                    </div>

                </div>
            </div>
        </section>
    );
}
