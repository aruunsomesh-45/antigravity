"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Phone, Clock, Send, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-black text-cream-100">
            {/* Hero Section */}
            <div className="relative h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-gold-900/20 to-black z-10" />
                <div className="absolute inset-0 bg-[url('/images/shop-promo.jpg')] bg-cover bg-center opacity-30" /> {/* Fallback or use a gradient if image missing */}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10" />

                <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="block text-gold-400 text-sm tracking-[0.3em] uppercase mb-4"
                    >
                        Get in Touch
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-serif text-cream-100 mb-6"
                    >
                        Contact Us
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed"
                    >
                        We are here to assist you with any inquiries about our fragrances, orders, or bespoke services.
                    </motion.p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div>
                            <h2 className="text-3xl font-serif text-gold-400 mb-4">Send a Message</h2>
                            <p className="text-gray-400">Fill out the form below and our concierge team will get back to you shortly.</p>
                        </div>

                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-xs uppercase tracking-widest text-gold-400/80">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-cream-100 focus:outline-none focus:border-gold-400 focus:bg-white/10 transition-all duration-300"
                                        placeholder="Your Name"
                                        suppressHydrationWarning
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-xs uppercase tracking-widest text-gold-400/80">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-cream-100 focus:outline-none focus:border-gold-400 focus:bg-white/10 transition-all duration-300"
                                        placeholder="your@email.com"
                                        suppressHydrationWarning
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-xs uppercase tracking-widest text-gold-400/80">Subject</label>
                                <select
                                    id="subject"
                                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-cream-100 focus:outline-none focus:border-gold-400 focus:bg-white/10 transition-all duration-300"
                                    suppressHydrationWarning
                                >
                                    <option value="" className="bg-black">Select a Subject</option>
                                    <option value="order" className="bg-black">Order Inquiry</option>
                                    <option value="product" className="bg-black">Product Information</option>
                                    <option value="press" className="bg-black">Press & Media</option>
                                    <option value="other" className="bg-black">Other</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-xs uppercase tracking-widest text-gold-400/80">Message</label>
                                <textarea
                                    id="message"
                                    rows={6}
                                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-cream-100 focus:outline-none focus:border-gold-400 focus:bg-white/10 transition-all duration-300 resize-none"
                                    placeholder="How can we help you?"
                                    suppressHydrationWarning
                                />
                            </div>
                            <button
                                type="submit"
                                className="group w-full bg-gold-400 text-black py-4 font-medium uppercase tracking-widest hover:bg-gold-300 transition-all duration-300 flex items-center justify-center gap-2"
                                suppressHydrationWarning
                            >
                                <span>Send Message</span>
                                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-12 lg:pt-8"
                    >
                        <div className="bg-white/5 border border-white/10 p-8 md:p-10 space-y-8 backdrop-blur-sm">
                            <h3 className="text-xl font-serif text-gold-400 mb-6">Concierge Services</h3>

                            <div className="flex items-start space-x-6 group">
                                <div className="bg-gold-400/10 p-4 rounded-full text-gold-400 group-hover:bg-gold-400 group-hover:text-black transition-colors duration-300">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-sm uppercase tracking-widest text-gray-400 mb-1">Visit Our Boutique</h4>
                                    <p className="text-cream-100 text-lg font-serif">
                                        123 Luxury Avenue<br />
                                        New York, NY 10012
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-6 group">
                                <div className="bg-gold-400/10 p-4 rounded-full text-gold-400 group-hover:bg-gold-400 group-hover:text-black transition-colors duration-300">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-sm uppercase tracking-widest text-gray-400 mb-1">Email Us</h4>
                                    <p className="text-cream-100 text-lg font-serif">
                                        concierge@zokuperfume.com
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-6 group">
                                <div className="bg-gold-400/10 p-4 rounded-full text-gold-400 group-hover:bg-gold-400 group-hover:text-black transition-colors duration-300">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-sm uppercase tracking-widest text-gray-400 mb-1">Call Us</h4>
                                    <p className="text-cream-100 text-lg font-serif">
                                        +1 (800) 123-4567
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-6 group">
                                <div className="bg-gold-400/10 p-4 rounded-full text-gold-400 group-hover:bg-gold-400 group-hover:text-black transition-colors duration-300">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-sm uppercase tracking-widest text-gray-400 mb-1">Opening Hours</h4>
                                    <p className="text-cream-100 text-lg font-serif">
                                        Mon-Fri: 9am - 8pm<br />
                                        Sat-Sun: 10am - 6pm
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* FAQ Teaser */}
                        <div className="space-y-4">
                            <h3 className="text-2xl font-serif text-gold-400">Frequently Asked Questions</h3>
                            <FAQItem question="Do you offer international shipping?" answer="Yes, we ship our luxury fragrances worldwide with secure, tracked delivery." />
                            <FAQItem question="What is your return policy?" answer="We accept returns within 30 days of purchase for unopened products in their original packaging." />
                            <FAQItem question="Are your perfumes cruelty-free?" answer="Absolutely. ZOKU is committed to ethical practices and none of our products are tested on animals." />
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-white/10">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-4 flex items-center justify-between text-left hover:text-gold-400 transition-colors"
            >
                <span className="text-cream-100 font-medium">{question}</span>
                {isOpen ? <ChevronUp className="w-4 h-4 text-gold-400" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <p className="pb-4 text-gray-400 text-sm leading-relaxed">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
