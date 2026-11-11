
import { motion } from "framer-motion";

const Footer = () => {
    const exploreLinks = [
        { name: "Home", href: "#home" },
        { name: "About", href: "#about" },
        { name: "Collections", href: "#collections" },
        { name: "Services", href: "#services" },
        { name: "Gallery", href: "#gallery" },
        { name: "FAQ", href: "#faq" },
        { name: "Contact", href: "#contact" },
    ];

    const legalLinks = [
        { name: "Terms & Conditions", href: "#terms" },
        { name: "Privacy Policy", href: "#privacy" },
        { name: "Shipping Policy", href: "#shipping" },
        { name: "Refund Policy", href: "#refund" },
    ];

    const headingStyle =
        "text-[#edb9c4] text-sm sm:text-base font-semibold tracking-[1.5px] uppercase mb-6";

    const linkStyle =
        "font-sans text-sm md:text-[15px] text-gray-300 hover:text-[#edb9c4] hover:translate-x-1 inline-block transition-all duration-300";

    return (
        <footer className="bg-[#101010] text-white w-full overflow-hidden font-sans">

            <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 py-14 sm:py-16 lg:py-20">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-8">

                    {/* BRAND & CONTACT INFORMATION */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="lg:col-span-4"
                    >

                        {/* BRAND NAME */}
                        <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-wide text-[#edb9c4] mb-5">
                            Bloom & Blossom
                        </h2>

                        {/* BRAND DESCRIPTION */}
                        <p className="text-gray-300 text-sm sm:text-[15px] leading-7 max-w-sm font-normal">
                            Bloom & Blossom exists to celebrate life's
                            beautiful moments, creating floral arrangements
                            that bring happiness, love, and elegance.
                        </p>

                        {/* ADDRESS */}
                        <div className="mt-10">
                            <h3 className="text-white text-sm font-semibold mb-3 tracking-wide">
                                Find us here
                            </h3>

                            <a
                                href="#contact"
                                className="font-serif italic text-xl sm:text-2xl text-[#edb9c4] leading-relaxed hover:text-[#ff6c83] transition-colors duration-300"
                            >
                                Visit Our Flower Studio
                            </a>
                        </div>

                        {/* EMAIL */}
                        <div className="mt-7">
                            <h3 className="text-white text-sm font-semibold mb-3 tracking-wide">
                                Email
                            </h3>

                            <a
                                href="mailto:hello@bloomandblossom.com"
                                className="font-sans text-sm sm:text-base text-[#edb9c4] break-all hover:text-[#ff6c83] transition-colors duration-300"
                            >
                                hello@bloomandblossom.com
                            </a>
                        </div>

                    </motion.div>


                    {/* EXPLORE LINKS */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="lg:col-span-2"
                    >

                        <h3 className={headingStyle}>
                            Explore
                        </h3>

                        <ul className="space-y-4">
                            {exploreLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className={linkStyle}
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>

                    </motion.div>


                    {/* LEGAL LINKS */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="lg:col-span-3"
                    >

                        <h3 className={headingStyle}>
                            Legal
                        </h3>

                        <ul className="space-y-4">
                            {legalLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className={linkStyle}
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>

                    </motion.div>


                    {/* SAY HELLO */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="lg:col-span-3"
                    >

                        <h3 className={headingStyle}>
                            Say Hello
                        </h3>

                        <div className="space-y-5">

                            <a
                                href="mailto:hello@bloomandblossom.com"
                                className={linkStyle}
                            >
                                Email Us
                            </a>

                            <a
                                href="#contact"
                                className={linkStyle}
                            >
                                WhatsApp
                            </a>

                            <a
                                href="#contact"
                                className={linkStyle}
                            >
                                Get in Touch
                            </a>

                        </div>

                        {/* SMALL BRAND MESSAGE */}
                        <p className="mt-8 text-xs text-gray-500 leading-6 max-w-[230px]">
                            Making every occasion more beautiful, one flower at a time.
                        </p>

                    </motion.div>

                </div>


                {/* BOTTOM COPYRIGHT */}
                <div className="mt-14 sm:mt-16 lg:mt-20 pt-7 border-t border-white/15 flex flex-col md:flex-row justify-between items-center gap-5">

                    <p className="font-serif italic text-[#edb9c4] text-xl sm:text-2xl font-medium">
                        Bloom & Blossom
                    </p>

                    <p className="font-sans text-gray-400 text-xs sm:text-sm tracking-wide text-center leading-6">
                        © {new Date().getFullYear()} Bloom & Blossom. All rights reserved.
                    </p>

                    <a
                        href="#home"
                        className="font-sans text-sm font-medium text-gray-300 hover:text-[#edb9c4] transition-colors duration-300"
                    >
                        Back to Top ↑
                    </a>

                </div>

            </div>

        </footer>
    );
};

export default Footer;
