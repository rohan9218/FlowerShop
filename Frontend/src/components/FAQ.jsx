
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const faqs = [
    {
        question: "Do you offer wedding floral design?",
        answer:
            "Yes. We create bespoke wedding flowers including bridal bouquets, ceremony arrangements, table flowers, installations, and reception styling.",
    },
    {
        question: "How far in advance should I book?",
        answer:
            "For weddings and large events, we recommend booking 2–3 months in advance. For regular bouquets and smaller arrangements, 2–3 days' notice is usually sufficient.",
    },
    {
        question: "Can I request a custom floral arrangement?",
        answer:
            "Absolutely! We love creating personalized floral arrangements. Share your preferred flowers, colours, style, and budget, and our team will design something special for you.",
    },
    {
        question: "Do you provide event setup and styling?",
        answer:
            "Yes. Depending on your package, we can deliver, install, style, and remove floral arrangements after your event.",
    },
    {
        question: "Do you offer same-day flower delivery?",
        answer:
            "Yes, same-day delivery may be available for selected bouquets and locations. Please contact us early to check availability.",
    },
    {
        question: "Can I choose specific flowers and colours?",
        answer:
            "Of course! You can select your preferred flowers, colours, and bouquet style. Our team will help you choose the best seasonal flowers.",
    },
    {
        question: "How can I place an order?",
        answer:
            "You can contact us through our website, phone, or WhatsApp. Share your requirements and we will help you select the perfect floral arrangement.",
    },
    {
        question: "What payment methods do you accept?",
        answer:
            "We accept popular payment methods including UPI, bank transfers, and other available online payment options. Payment details are shared during order confirmation.",
    },
];

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <main className="w-full bg-white overflow-hidden">

            {/* FAQ SECTION */}
            <section
                id="faq"
                className="px-5 sm:px-8 pt-20 pb-24 md:pt-24 md:pb-32"
            >
                <div className="max-w-5xl mx-auto">

                    {/* HEADING */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16 md:mb-20"
                    >
                        <p className="text-[#ff5d72] text-xs md:text-sm tracking-[3px] uppercase font-medium mb-6">
                            FAQ
                        </p>

                        <h1 className="font-serif italic text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.15] text-[#171313]">
                            Your{" "}
                            <span className="text-[#ff6075]">
                                Questions,
                            </span>
                            <br />
                            Beautifully Answer.
                        </h1>
                    </motion.div>

                    {/* FAQ ACCORDION */}
                    <div className="max-w-3xl mx-auto space-y-5">

                        {faqs.map((faq, index) => {
                            const isOpen = activeIndex === index;

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 25 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.06,
                                    }}
                                    className="bg-[#fbf0f3] rounded-[30px] overflow-hidden"
                                >
                                    {/* QUESTION */}
                                    <button
                                        type="button"
                                        onClick={() => toggleFAQ(index)}
                                        aria-expanded={isOpen}
                                        className="w-full flex items-center justify-between gap-5 text-left px-5 sm:px-7 py-5 sm:py-6"
                                    >
                                        <span className="font-serif italic text-xl sm:text-2xl md:text-[27px] leading-snug text-[#ff6075]">
                                            {faq.question}
                                        </span>

                                        <span className="shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#ff6075] text-white flex items-center justify-center transition-transform duration-300 hover:scale-105">
                                            {isOpen ? (
                                                <ChevronUp size={21} />
                                            ) : (
                                                <ChevronDown size={21} />
                                            )}
                                        </span>
                                    </button>

                                    {/* ANSWER */}
                                    <AnimatePresence initial={false}>
                                        {isOpen && (
                                            <motion.div
                                                initial={{
                                                    height: 0,
                                                    opacity: 0,
                                                }}
                                                animate={{
                                                    height: "auto",
                                                    opacity: 1,
                                                }}
                                                exit={{
                                                    height: 0,
                                                    opacity: 0,
                                                }}
                                                transition={{
                                                    duration: 0.35,
                                                    ease: "easeInOut",
                                                }}
                                                className="overflow-hidden"
                                            >
                                                <p className="px-5 sm:px-7 pb-6 text-[#555052] text-sm sm:text-base leading-7">
                                                    {faq.answer}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}

                    </div>

                    {/* BOTTOM CONTENT */}
                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="text-center mt-16"
                    >
                        <p className="font-serif italic text-xl md:text-2xl text-[#315c45]">
                            Still have a question?
                        </p>

                        <p className="text-gray-500 text-sm mt-3">
                            We would love to help you make every moment beautiful.
                        </p>

                        <a
                            href="#contact"
                            className="inline-flex items-center justify-center mt-7 px-8 py-4 rounded-full bg-[#f4c4ce] border border-[#315c45] text-[#263f32] font-semibold shadow-[4px_5px_0px_#315c45] hover:translate-y-1 hover:shadow-none transition-all duration-300"
                        >
                            Contact Our Team →
                        </a>
                    </motion.div>

                </div>
            </section>

        </main>
    );
};

export default FAQ;
