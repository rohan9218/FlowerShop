
import { AnimatePresence, motion } from "framer-motion";
import {
    ChevronDown,
    Flower2,
    Heart,
    Menu,
    Search,
    ShoppingBag,
    User,
    X
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [shopOpen, setShopOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 30);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const links = [
        { name: "Home", href: "#home" },
        { name: "About", href: "#about" },
        { name: "Contact", href: "#contact" }
    ];

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
                scrolled
                    ? "bg-white/95 shadow-lg backdrop-blur-md"
                    : "bg-[#fffaf5]"
            }`}
        >
            {/* NAVBAR MAIN CONTAINER */}
            <div className="max-w-7xl mx-auto px-5 lg:px-10">

                <div className="h-[76px] md:h-[84px] flex items-center justify-between">

                    {/* LOGO */}
                    <motion.a
                        href="#home"
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2 shrink-0"
                    >
                        <motion.div
                            animate={{ rotate: [0, 12, -12, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        >
                            <Flower2
                                size={35}
                                className="text-[#d77b91]"
                            />
                        </motion.div>

                        <div>
                            <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#315c45]">
                                Bloom & Blossom
                            </h1>

                            <p className="text-[8px] sm:text-[9px] tracking-[3px] text-gray-500">
                                FLOWERS & HAPPINESS
                            </p>
                        </div>
                    </motion.a>

                    {/* DESKTOP NAVIGATION */}
                    <nav className="hidden lg:flex items-center gap-9">

                        <motion.a
                            href="#home"
                            whileHover={{ y: -3 }}
                            className="relative text-gray-700 hover:text-[#d77b91] font-medium group"
                        >
                            Home

                            <span className="absolute left-0 -bottom-2 w-0 h-[2px] bg-[#d77b91] group-hover:w-full transition-all duration-300" />
                        </motion.a>

                        {/* SHOP DROPDOWN */}
                        <div
                            className="relative"
                            onMouseEnter={() => setShopOpen(true)}
                            onMouseLeave={() => setShopOpen(false)}
                        >
                            <button
                                onClick={() => setShopOpen(!shopOpen)}
                                className="flex items-center gap-1 text-gray-700 hover:text-[#d77b91]"
                            >
                                Shop
                                <ChevronDown size={16} />
                            </button>

                            <AnimatePresence>
                                {shopOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 15 }}
                                        className="absolute top-10 left-0 bg-white shadow-xl rounded-xl p-5 w-56"
                                    >
                                        {[
                                            "Roses",
                                            "Wedding Flowers",
                                            "Birthday Bouquets",
                                            "Luxury Flowers",
                                            "Indoor Plants"
                                        ].map((item) => (
                                            <a
                                                key={item}
                                                href="#shop"
                                                className="block py-2 text-gray-600 hover:text-[#d77b91] hover:translate-x-2 transition-all"
                                            >
                                                {item}
                                            </a>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {links.slice(1).map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="relative text-gray-700 hover:text-[#d77b91] font-medium group"
                            >
                                {link.name}

                                <span className="absolute left-0 -bottom-2 w-0 h-[2px] bg-[#d77b91] group-hover:w-full transition-all duration-300" />
                            </a>
                        ))}
                    </nav>

                    {/* ACTION ICONS */}
                    <div className="hidden lg:flex items-center gap-5">

                        <motion.button whileHover={{ scale: 1.2, rotate: -10 }}>
                            <Search size={21} className="text-gray-700" />
                        </motion.button>

                        <motion.button whileHover={{ scale: 1.2, color: "#d77b91" }}>
                            <Heart size={21} className="text-gray-700" />
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            className="relative"
                        >
                            <ShoppingBag
                                size={22}
                                className="text-[#315c45]"
                            />

                            <span className="absolute -top-2 -right-2 bg-[#d77b91] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                                0
                            </span>
                        </motion.button>

                        <Link
                            to="/admin/login"
                            className="ml-2 px-3.5 py-1.5 text-xs font-semibold rounded-full bg-[#0d5c3a] text-white hover:bg-[#09472c] transition-all shadow-sm flex items-center gap-1.5"
                        >
                            <User size={14} />
                            <span>Admin Portal</span>
                        </Link>

                    </div>

                    {/* MOBILE MENU BUTTON */}
                    <button
                        onClick={() => {
                            setMobileOpen(!mobileOpen);
                            setShopOpen(false);
                        }}
                        className="lg:hidden text-[#315c45]"
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X size={27} /> : <Menu size={27} />}
                    </button>

                </div>
            </div>

            {/* MOBILE MENU */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="lg:hidden overflow-hidden bg-[#fffaf5] shadow-lg"
                    >
                        <div className="px-7 py-5 flex flex-col gap-5">

                            <a
                                href="#home"
                                onClick={() => setMobileOpen(false)}
                                className="text-gray-700 hover:text-[#d77b91]"
                            >
                                Home
                            </a>

                            {/* MOBILE SHOP */}
                            <button
                                onClick={() => setShopOpen(!shopOpen)}
                                className="flex items-center justify-between text-gray-700"
                            >
                                Shop
                                <ChevronDown
                                    size={17}
                                    className={`transition-transform ${
                                        shopOpen ? "rotate-180" : ""
                                    }`}
                                />
                            </button>

                            <AnimatePresence>
                                {shopOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="pl-5 flex flex-col gap-3 text-gray-500 overflow-hidden"
                                    >
                                        <a href="#shop" onClick={() => setMobileOpen(false)}>Roses</a>
                                        <a href="#shop" onClick={() => setMobileOpen(false)}>Wedding Flowers</a>
                                        <a href="#shop" onClick={() => setMobileOpen(false)}>Birthday Bouquets</a>
                                        <a href="#shop" onClick={() => setMobileOpen(false)}>Luxury Flowers</a>
                                        <a href="#shop" onClick={() => setMobileOpen(false)}>Indoor Plants</a>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <a
                                href="#about"
                                onClick={() => setMobileOpen(false)}
                                className="text-gray-700 hover:text-[#d77b91]"
                            >
                                About
                            </a>

                            <a
                                href="#contact"
                                onClick={() => setMobileOpen(false)}
                                className="text-gray-700 hover:text-[#d77b91]"
                            >
                                Contact
                            </a>

                            <Link
                                to="/admin/login"
                                onClick={() => setMobileOpen(false)}
                                className="w-full py-2.5 px-4 bg-[#0d5c3a] text-white text-center text-xs font-semibold rounded-xl flex items-center justify-center gap-2"
                            >
                                <User size={15} />
                                <span>Admin Portal</span>
                            </Link>

                            <div className="flex gap-6 pt-3 border-t">
                                <Search />
                                <Heart />
                                <ShoppingBag />
                            </div>

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </motion.header>
    );
};

export default Navbar;
