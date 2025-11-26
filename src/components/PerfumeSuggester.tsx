"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles, ShoppingCart, ExternalLink, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";

// Product data structure
interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    notes: string;
    gender: string;
    longevity?: string;
    story: string;
    stock?: number;
}

// All products with their stories
const PRODUCTS: Product[] = [
    { id: "1", name: "Midnight Oud", price: 10500, image: "/midnight-oud.jpg", category: "Signature Collection", notes: "Oud, Rose, Amber", gender: "Men", longevity: "8-10 hours", story: "Inspired by Arabian nights under starlit skies, Midnight Oud captures the mystique of ancient traditions. Crafted with rare oud wood aged for 30 years, blended with damascene roses and amber resin. A fragrance for the modern gentleman who carries timeless elegance." },
    { id: "2", name: "Royal Rose", price: 12000, image: "/royal-rose.jpg", category: "Floral Collection", notes: "Rose, Peony, Musk", gender: "Women", longevity: "6-8 hours", story: "Born from the royal gardens of Rajasthan, Royal Rose celebrates the grace of Indian royalty. Each bottle contains essences from 1,000 hand-picked roses at dawn. A tribute to queens who wore confidence like a crown." },
    { id: "3", name: "Golden Amber", price: 15000, image: "/golden-amber-new.jpg", category: "Oud Collection", notes: "Amber, Vanilla, Sandalwood", gender: "Men", longevity: "10-12 hours", story: "Forged in the warmth of ancient amber mines, this scent tells the story of traders who crossed deserts for precious resins. Blended with Mysore sandalwood and Madagascar vanilla, it's luxury bottled for the modern explorer." },
    { id: "4", name: "Velvet Santal", price: 12500, image: "/velvet-santal.jpg", category: "Signature Collection", notes: "Sandalwood, Cedar, Leather", gender: "Men", longevity: "8-10 hours", story: "A tribute to master craftsmen, Velvet Santal combines the richness of aged leather with the smoothness of sandalwood. Inspired by gentlemen's clubs where deals were sealed with a handshake and a cigar." },
    { id: "5", name: "Imperial Citrus", price: 9500, image: "/imperial-citrus.jpg", category: "Fresh Collection", notes: "Bergamot, Lemon, Neroli", gender: "Kids", longevity: "4-6 hours", story: "Crafted for young spirits who dream big. Imperial Citrus captures the freshness of Mediterranean mornings with sun-kissed bergamot and neroli blossoms. A scent of pure joy and endless possibilities." },
    { id: "6", name: "Mystic Musk", price: 11000, image: "/mystic-musk.jpg", category: "Signature Collection", notes: "Musk, Iris, Tonka", gender: "Women", longevity: "6-8 hours", story: "A mysterious creation inspired by moonlit gardens. Mystic Musk weaves together the softness of iris petals with warm tonka bean and ethereal white musk. For women who leave an unforgettable impression." },
    { id: "7", name: "Noir Leather", price: 16000, image: "/noir-leather.jpg", category: "Signature Collection", notes: "Leather, Tobacco, Vetiver", gender: "Men", longevity: "10-12 hours", story: "Born from the finest Italian leather workshops, Noir Leather speaks of rebellion and sophistication. Infused with Cuban tobacco leaves and Haitian vetiver, it's for men who write their own rules." },
    { id: "8", name: "Azure Dreams", price: 11500, image: "/azure-dreams.jpg", category: "Fresh Collection", notes: "Sea Salt, Jasmine, Driftwood", gender: "Women", longevity: "6-8 hours", story: "Imagine waves crashing on Mediterranean shores at sunset. Azure Dreams captures that moment with sea salt minerals, jasmine blooms, and weathered driftwood. A scent for free spirits who dance with the ocean." },
    { id: "9", name: "Crimson Velvet", price: 14000, image: "/crimson-velvet.jpg", category: "Floral Collection", notes: "Red Rose, Patchouli, Vanilla", gender: "Women", longevity: "8-10 hours", story: "A love letter in a bottle. Crimson Velvet tells the tale of passionate romance with deep red roses, sensual patchouli, and sweet vanilla. For women who love deeply and live boldly." },
    { id: "10", name: "Platinum Essence", price: 17500, image: "/platinum-essence.jpg", category: "Oud Collection", notes: "Oud, Saffron, Ambergris", gender: "Men", longevity: "12+ hours", story: "The crown jewel of Zoku. Platinum Essence combines the world's rarest ingredients: Cambodian oud, Persian saffron threads, and genuine ambergris. A masterpiece for connoisseurs who demand the extraordinary." },
    { id: "11", name: "Silk Gardenia", price: 13000, image: "/silk-gardenia.jpg", category: "Floral Collection", notes: "Gardenia, White Tea, Cashmere", gender: "Women", longevity: "6-8 hours", story: "Inspired by Japanese tea ceremonies, Silk Gardenia blends delicate gardenia petals with white tea leaves and cashmere wood. A serene fragrance for women who find beauty in simplicity." },
    { id: "12", name: "Spiced Ember", price: 12500, image: "/spiced-ember.jpg", category: "Spice Collection", notes: "Cardamom, Cinnamon, Incense", gender: "Men", longevity: "8-10 hours", story: "A journey through ancient spice routes. Spiced Ember ignites with Indian cardamom, Ceylon cinnamon, and temple incense. For men who carry warmth wherever they go." },
    { id: "13", name: "Ocean Mist", price: 10800, image: "/ocean-mist.jpg", category: "Fresh Collection", notes: "Marine Accord, Mint, Cedar", gender: "Kids", longevity: "4-6 hours", story: "Adventure awaits! Ocean Mist captures the thrill of seaside exploration with fresh marine notes, cool mint, and cedarwood. Perfect for young dreamers ready to conquer the world." },
    { id: "14", name: "Black Orchid", price: 16800, image: "/black-orchid.jpg", category: "Oriental Collection", notes: "Black Orchid, Plum, Dark Chocolate", gender: "Women", longevity: "10-12 hours", story: "Dark, mysterious, irresistible. Black Orchid blooms at midnight with rare black orchid extract, succulent plum, and dark chocolate. A seductive scent for women who command attention." },
    { id: "15", name: "Desert Rose", price: 14500, image: "/desert-rose.jpg", category: "Oriental Collection", notes: "Damask Rose, Myrrh, Frankincense", gender: "Women", longevity: "8-10 hours", story: "A pilgrimage through ancient lands. Desert Rose honors nomadic tribes with Damascus roses, sacred myrrh, and frankincense resin. For women who carry wisdom and wonder in their hearts." },
];

interface Message {
    id: string;
    type: "user" | "bot";
    content: string;
    products?: Product[];
    quickReplies?: string[];
}

interface UserPreferences {
    gender?: string;
    budget?: number;
    taste?: string[];
    occasion?: string;
}

export function PerfumeSuggester() {
    const [isOpen, setIsOpen] = useState(false);
    const [conversationStep, setConversationStep] = useState(0);
    const [userPreferences, setUserPreferences] = useState<UserPreferences>({});
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            type: "bot",
            content: "Welcome to Zoku Perfumes! ✨\n\nI'm here to help you find your perfect scent. Let's start with a few questions.\n\nWho is this perfume for?",
            quickReplies: ["For Me (Men)", "For Me (Women)", "For Kids", "As a Gift"],
        },
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { addToCart } = useCart();
    const [addedToCart, setAddedToCart] = useState<string[]>([]);
    const [storyModal, setStoryModal] = useState<Product | null>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const addMessage = (content: string, type: "user" | "bot", products?: Product[], quickReplies?: string[]) => {
        const newMessage: Message = {
            id: Date.now().toString(),
            type,
            content,
            products,
            quickReplies,
        };
        setMessages((prev) => [...prev, newMessage]);
    };

    const getRecommendations = (): Product[] => {
        let filtered = [...PRODUCTS];

        // Filter by gender
        if (userPreferences.gender) {
            filtered = filtered.filter((p) => p.gender === userPreferences.gender);
        }

        // Filter by budget
        if (userPreferences.budget !== undefined) {
            filtered = filtered.filter((p) => p.price <= userPreferences.budget!);
        }

        // Filter by taste/notes
        if (userPreferences.taste && userPreferences.taste.length > 0) {
            filtered = filtered.filter((p) =>
                userPreferences.taste!.some((taste) =>
                    p.notes.toLowerCase().includes(taste.toLowerCase()) ||
                    p.category.toLowerCase().includes(taste.toLowerCase())
                )
            );
        }

        return filtered.slice(0, 3);
    };

    const handleUserInput = (userInput: string) => {
        addMessage(userInput, "user");
        setIsTyping(true);

        setTimeout(() => {
            let botMessage = "";
            let quickReplies: string[] = [];
            let products: Product[] | undefined;

            // Step 0: Gender
            if (conversationStep === 0) {
                if (userInput.toLowerCase().includes("men")) {
                    setUserPreferences((prev) => ({ ...prev, gender: "Men" }));
                    botMessage = "Great choice! Now, what's your budget range?";
                    quickReplies = ["Under ₹10,000", "₹10,000 - ₹15,000", "Above ₹15,000", "No Budget Limit"];
                } else if (userInput.toLowerCase().includes("women")) {
                    setUserPreferences((prev) => ({ ...prev, gender: "Women" }));
                    botMessage = "Perfect! What's your budget range?";
                    quickReplies = ["Under ₹10,000", "₹10,000 - ₹15,000", "Above ₹15,000", "No Budget Limit"];
                } else if (userInput.toLowerCase().includes("kid")) {
                    setUserPreferences((prev) => ({ ...prev, gender: "Kids" }));
                    botMessage = "Lovely! What's your budget range?";
                    quickReplies = ["Under ₹10,000", "₹10,000 - ₹12,000"];
                } else if (userInput.toLowerCase().includes("gift")) {
                    botMessage = "Wonderful! Is this gift for him or her?";
                    quickReplies = ["For Him", "For Her"];
                    setConversationStep(-1); // Gift flow
                }
                setConversationStep(1);
            }
            // Step 1: Budget
            else if (conversationStep === 1) {
                if (userInput.includes("10,000") && userInput.toLowerCase().includes("under")) {
                    setUserPreferences((prev) => ({ ...prev, budget: 10000 }));
                } else if (userInput.includes("10,000") && userInput.includes("15,000")) {
                    setUserPreferences((prev) => ({ ...prev, budget: 15000 }));
                } else if (userInput.toLowerCase().includes("above") || userInput.toLowerCase().includes("no budget")) {
                    setUserPreferences((prev) => ({ ...prev, budget: 999999 }));
                }
                botMessage = "Excellent! What scent profile do you prefer?\n\nChoose all that apply:";
                quickReplies = ["Fresh & Citrus", "Floral & Romantic", "Oud & Woody", "Spicy & Warm", "Show Me All"];
                setConversationStep(2);
            }
            // Step 2: Taste/Scent Profile
            else if (conversationStep === 2) {
                const selectedTastes: string[] = [];
                if (userInput.toLowerCase().includes("fresh") || userInput.toLowerCase().includes("citrus")) {
                    selectedTastes.push("fresh", "citrus", "bergamot", "lemon");
                }
                if (userInput.toLowerCase().includes("floral") || userInput.toLowerCase().includes("romantic")) {
                    selectedTastes.push("floral", "rose", "jasmine", "gardenia");
                }
                if (userInput.toLowerCase().includes("oud") || userInput.toLowerCase().includes("woody")) {
                    selectedTastes.push("oud", "sandalwood", "cedar", "leather");
                }
                if (userInput.toLowerCase().includes("spicy") || userInput.toLowerCase().includes("warm")) {
                    selectedTastes.push("spice", "cardamom", "cinnamon", "amber");
                }

                setUserPreferences((prev) => ({ ...prev, taste: selectedTastes.length > 0 ? selectedTastes : undefined }));

                // Get recommendations
                const recommendations = getRecommendations();
                if (recommendations.length > 0) {
                    botMessage = "Perfect! Based on your preferences, here are my top recommendations:";
                    products = recommendations;
                } else {
                    // Fallback to best sellers
                    botMessage = "Based on your taste, let me show you our best-selling fragrances:";
                    products = [PRODUCTS[0], PRODUCTS[6], PRODUCTS[1]];
                }
                setConversationStep(3);
            }
            // General query after flow complete
            else {
                // Handle general queries
                const input = userInput.toLowerCase();
                if (input.includes("more") || input.includes("other") || input.includes("different")) {
                    const recommendations = getRecommendations();
                    botMessage = "Here are more options for you:";
                    products = recommendations.length > 0 ? recommendations : PRODUCTS.slice(3, 6);
                } else {
                    botMessage = "Anything else I can help you with?";
                    quickReplies = ["Start Over", "View All Perfumes", "Visit Shop"];
                }
            }

            setIsTyping(false);
            addMessage(botMessage, "bot", products, quickReplies);
        }, 1000);
    };

    const handleSend = (messageText?: string) => {
        const textToSend = messageText || input;
        if (!textToSend.trim()) return;

        if (!messageText) setInput("");
        handleUserInput(textToSend);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleAddToCart = (product: Product) => {
        addToCart({
            product: {
                id: product.id,
                name: product.name,
                slug: product.name.toLowerCase().replace(/\s+/g, '-'),
                price: product.price,
                images: [product.image],
                description: product.notes,
                stock: product.stock ?? 100,
                category: {
                    id: product.category,
                    name: product.category,
                    slug: product.category.toLowerCase().replace(/\s+/g, '-'),
                },
            },
        }); setAddedToCart((prev) => [...prev, product.id]);

        setTimeout(() => {
            setAddedToCart((prev) => prev.filter((id) => id !== product.id));
        }, 2000);
    };

    return (
        <>
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-gold-400 to-gold-600 text-black p-4 rounded-full shadow-2xl hover:shadow-gold-400/50 transition-all hover:scale-110 group"
                    >
                        <MessageCircle className="w-6 h-6" />
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                        <span className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-black/90 text-cream-100 text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                            Find Your Perfect Scent
                        </span>
                    </motion.button>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.8 }}
                        className="fixed bottom-6 right-6 z-50 w-[420px] h-[680px] bg-black/95 backdrop-blur-xl border border-gold-400/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                    >
                        <div className="bg-gradient-to-r from-gold-400 to-gold-600 p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="bg-black/20 p-2 rounded-full">
                                    <Sparkles className="w-5 h-5 text-black" />
                                </div>
                                <div>
                                    <h3 className="text-black font-semibold">Zoku AI Consultant</h3>
                                    <p className="text-black/70 text-xs">Your fragrance expert</p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-black hover:bg-black/10 p-1 rounded-full transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((msg) => (
                                <div key={msg.id}>
                                    <div className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                                        <div className={`max-w-[85%] ${msg.type === "user" ? "bg-gold-400 text-black" : "bg-white/5 text-cream-100"} p-3 rounded-2xl`}>
                                            <p className="text-sm whitespace-pre-line">{msg.content}</p>
                                        </div>
                                    </div>

                                    {msg.products && msg.products.length > 0 && (
                                        <div className="mt-3 space-y-3">
                                            {msg.products.map((product) => (
                                                <div key={product.id} className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl p-3 border border-gold-400/10 hover:border-gold-400/30 transition-all">
                                                    <div className="flex gap-3">
                                                        <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-white/5 flex-shrink-0">
                                                            <Image src={product.image} alt={product.name} fill className="object-cover" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h4 className="text-gold-400 font-semibold text-sm truncate">{product.name}</h4>
                                                            <p className="text-gray-400 text-xs mt-0.5 line-clamp-1">{product.notes}</p>
                                                            <p className="text-cream-100 font-bold text-sm mt-1">₹{product.price.toLocaleString()}</p>

                                                            <div className="flex gap-1 mt-2">
                                                                <button
                                                                    onClick={() => handleAddToCart(product)}
                                                                    className={`flex-1 ${addedToCart.includes(product.id) ? 'bg-green-600' : 'bg-gold-400'} text-black text-xs font-medium px-2 py-1.5 rounded-lg hover:bg-gold-500 transition-all flex items-center justify-center gap-1`}
                                                                    disabled={addedToCart.includes(product.id)}
                                                                >
                                                                    <ShoppingCart className="w-3 h-3" />
                                                                    {addedToCart.includes(product.id) ? "Added!" : "Add"}
                                                                </button>
                                                                <button
                                                                    onClick={() => setStoryModal(product)}
                                                                    className="bg-purple-600/80 text-white text-xs font-medium px-2 py-1.5 rounded-lg hover:bg-purple-700 transition-all flex items-center gap-1"
                                                                >
                                                                    <BookOpen className="w-3 h-3" />
                                                                    Story
                                                                </button>
                                                                <Link href={`/product/${product.id}`} className="bg-white/10 text-cream-100 text-xs font-medium px-2 py-1.5 rounded-lg hover:bg-white/20 transition-all flex items-center gap-1">
                                                                    <ExternalLink className="w-3 h-3" />
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {msg.quickReplies && msg.quickReplies.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-3">
                                            {msg.quickReplies.map((reply, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => handleSend(reply)}
                                                    className="bg-gold-400/10 text-gold-400 text-xs px-3 py-1.5 rounded-full border border-gold-400/30 hover:bg-gold-400/20 transition-all"
                                                >
                                                    {reply}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}

                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white/5 p-3 rounded-2xl">
                                        <div className="flex gap-1">
                                            <span className="w-2 h-2 bg-gold-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                            <span className="w-2 h-2 bg-gold-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                            <span className="w-2 h-2 bg-gold-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="p-4 border-t border-white/10">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Type your answer..."
                                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-cream-100 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400/50 placeholder-gray-500"
                                />
                                <button
                                    onClick={() => handleSend()}
                                    disabled={!input.trim()}
                                    className="bg-gold-400 text-black p-2.5 rounded-xl hover:bg-gold-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Story Modal */}
            <AnimatePresence>
                {storyModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
                        onClick={() => setStoryModal(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-gradient-to-br from-black via-gray-900 to-black border border-gold-400/30 rounded-2xl max-w-md w-full overflow-hidden"
                        >
                            <div className="relative h-48">
                                <Image src={storyModal.image} alt={storyModal.name} fill className="object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                                <button
                                    onClick={() => setStoryModal(null)}
                                    className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm p-2 rounded-full hover:bg-black/70 transition-colors"
                                >
                                    <X className="w-5 h-5 text-white" />
                                </button>
                            </div>
                            <div className="p-6">
                                <h2 className="text-2xl font-serif text-gold-400 mb-2">{storyModal.name}</h2>
                                <p className="text-gray-400 text-sm mb-4">{storyModal.notes}</p>
                                <div className="bg-white/5 border border-gold-400/20 rounded-lg p-4 mb-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <BookOpen className="w-4 h-4 text-gold-400" />
                                        <h3 className="text-gold-400 text-sm font-semibold">The Story</h3>
                                    </div>
                                    <p className="text-cream-100 text-sm leading-relaxed">{storyModal.story}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => {
                                            handleAddToCart(storyModal);
                                            setStoryModal(null);
                                        }}
                                        className="flex-1 bg-gold-400 text-black font-medium py-3 rounded-lg hover:bg-gold-500 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <ShoppingCart className="w-4 h-4" />
                                        Add to Cart - ₹{storyModal.price.toLocaleString()}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
