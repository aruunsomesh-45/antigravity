"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-black text-cream-100 pt-10 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-serif text-gold-400 mb-6"
                    >
                        Contact Us
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "6rem" }}
                        transition={{ delay: 0.3 }}
                        className="h-[1px] bg-cream-100 mx-auto mb-6"
                    />
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-gray-300 max-w-2xl mx-auto"
                    >
                        We are here to assist you. Whether you have a question about our fragrances or need help with an order, our team is ready to help.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-white/5 p-8 md:p-10 border border-white/10"
                    >
                        <h2 className="text-2xl font-serif text-gold-400 mb-8">Send us a Message</h2>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm uppercase tracking-widest text-gray-400">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="w-full bg-black border border-white/10 px-4 py-3 text-cream-100 focus:outline-none focus:border-gold-400 transition-colors"
                                        placeholder="Your Name"
                                        suppressHydrationWarning
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm uppercase tracking-widest text-gray-400">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full bg-black border border-white/10 px-4 py-3 text-cream-100 focus:outline-none focus:border-gold-400 transition-colors"
                                        placeholder="Your Email"
                                        suppressHydrationWarning
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-sm uppercase tracking-widest text-gray-400">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    className="w-full bg-black border border-white/10 px-4 py-3 text-cream-100 focus:outline-none focus:border-gold-400 transition-colors"
                                    placeholder="Subject"
                                    suppressHydrationWarning
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm uppercase tracking-widest text-gray-400">Message</label>
                                <textarea
                                    id="message"
                                    rows={5}
                                    className="w-full bg-black border border-white/10 px-4 py-3 text-cream-100 focus:outline-none focus:border-gold-400 transition-colors resize-none"
                                    placeholder="How can we help you?"
                                    suppressHydrationWarning
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-gold-400 text-black py-4 font-medium uppercase tracking-widest hover:bg-gold-300 transition-colors"
                                suppressHydrationWarning
                            >
                                Send Message
                            </button>
                        </form>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="space-y-12"
                    >
                        <div>
                            <h2 className="text-2xl font-serif text-gold-400 mb-8">Get in Touch</h2>
                            <p className="text-gray-300 leading-relaxed mb-8">
                                Our customer service team is available Monday through Friday, 9am to 6pm EST.
                                We strive to respond to all inquiries within 24 hours.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div className="flex items-start space-x-6">
                                <div className="bg-white/5 p-4 rounded-full text-gold-400">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-serif text-cream-100 mb-2">Visit Us</h3>
                                    <p className="text-gray-400">
                                        123 Luxury Avenue<br />
                                        New York, NY 10012
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-6">
                                <div className="bg-white/5 p-4 rounded-full text-gold-400">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-serif text-cream-100 mb-2">Email Us</h3>
                                    <p className="text-gray-400">
                                        concierge@zokuperfume.com<br />
                                        press@zokuperfume.com
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-6">
                                <div className="bg-white/5 p-4 rounded-full text-gold-400">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-serif text-cream-100 mb-2">Call Us</h3>
                                    <p className="text-gray-400">
                                        +1 (800) 123-4567<br />
                                        Mon-Fri, 9am-6pm EST
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
