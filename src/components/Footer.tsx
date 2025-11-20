import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-black text-cream-200 border-t border-white/10 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-serif text-gold-400 tracking-widest">ZOKU</h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Experience the essence of luxury with our handcrafted fragrances.
                            Designed for those who seek elegance in every scent.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="text-gold-400 uppercase tracking-widest text-sm mb-6">Explore</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/shop" className="hover:text-white transition-colors" suppressHydrationWarning>Shop All</Link></li>
                            <li><Link href="/collections" className="hover:text-white transition-colors" suppressHydrationWarning>Collections</Link></li>
                            <li><Link href="/royal-combos" className="hover:text-white transition-colors" suppressHydrationWarning>Royal Combos</Link></li>
                            <li><Link href="/new-arrivals" className="hover:text-white transition-colors" suppressHydrationWarning>New Arrivals</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-gold-400 uppercase tracking-widest text-sm mb-6">Support</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/contact" className="hover:text-white transition-colors" suppressHydrationWarning>Contact Us</Link></li>
                            <li><Link href="/shipping" className="hover:text-white transition-colors" suppressHydrationWarning>Shipping & Returns</Link></li>
                            <li><Link href="/faq" className="hover:text-white transition-colors" suppressHydrationWarning>FAQ</Link></li>
                            <li><Link href="/privacy" className="hover:text-white transition-colors" suppressHydrationWarning>Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-gold-400 uppercase tracking-widest text-sm mb-6">Newsletter</h4>
                        <p className="text-sm text-gray-400 mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
                        <form className="flex flex-col gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-white/5 border border-white/10 px-4 py-2 text-sm focus:outline-none focus:border-gold-400 transition-colors"
                                suppressHydrationWarning
                            />
                            <button className="bg-gold-400 text-black px-4 py-2 text-sm font-medium uppercase tracking-wider hover:bg-gold-300 transition-colors" suppressHydrationWarning>
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-white/10 text-center text-xs text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Zoku Perfume. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
