"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Loader2, Code, Trash2, Play, AlertCircle, CheckCircle2 } from "lucide-react";

const LANGUAGES = [
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
    { value: "typescript", label: "TypeScript" },
    { value: "java", label: "Java" },
    { value: "cpp", label: "C++" },
    { value: "php", label: "PHP" },
    { value: "sql", label: "SQL" },
];

export default function CodeReviewPage() {
    const [code, setCode] = useState("");
    const [language, setLanguage] = useState("javascript");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleReview = async () => {
        if (!code.trim()) {
            setError("Please enter some code to review.");
            return;
        }

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await fetch("/api/code-review", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    source_code: code,
                    language: language,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Something went wrong");
            }

            // Assuming the API returns the review content in a specific field, e.g., 'review' or 'message'.
            // Adjust based on actual API response structure. 
            // If the user didn't specify the exact response key, we'll assume it might be in 'review' or just the whole body if it's text.
            // For now, let's dump the JSON if it's an object, or show the text.
            // Based on typical AI APIs, it might be `data.review` or `data.choices[0].message.content`.
            // Since the prompt didn't specify the RESPONSE structure, I will handle a generic text field or stringify the data.

            // Heuristic: Check for common fields
            const reviewContent = data.review || data.message || data.output || JSON.stringify(data, null, 2);

            if (!reviewContent) {
                setResult("No issues found.");
            } else {
                setResult(reviewContent);
            }

        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleClear = () => {
        setCode("");
        setResult(null);
        setError(null);
    };

    return (
        <div className="min-h-screen bg-black text-cream-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto space-y-8">

                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center p-3 bg-gold-400/10 rounded-full mb-4">
                        <Code className="w-8 h-8 text-gold-400" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif text-gold-400">
                        AI Code Review
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Powered by CodeRabbit. Paste your code below for an instant professional review.
                    </p>
                </div>

                {/* Main Input Area */}
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 md:p-8 space-y-6 backdrop-blur-sm">

                    {/* Controls */}
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                        <div className="w-full md:w-64">
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                                Language
                            </label>
                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="w-full bg-black/50 border border-white/20 rounded-md px-4 py-2.5 text-cream-100 focus:border-gold-400 focus:ring-1 focus:ring-gold-400 outline-none transition-colors"
                            >
                                {LANGUAGES.map((lang) => (
                                    <option key={lang.value} value={lang.value}>
                                        {lang.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex gap-3 w-full md:w-auto mt-4 md:mt-0">
                            <button
                                onClick={handleClear}
                                className="flex-1 md:flex-none px-6 py-2.5 border border-white/20 rounded-md text-gray-300 hover:bg-white/5 hover:text-white transition-colors flex items-center justify-center gap-2"
                            >
                                <Trash2 className="w-4 h-4" />
                                Clear
                            </button>
                            <button
                                onClick={handleReview}
                                disabled={loading}
                                className="flex-1 md:flex-none px-8 py-2.5 bg-gold-400 text-black font-medium rounded-md hover:bg-gold-300 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Reviewing...
                                    </>
                                ) : (
                                    <>
                                        <Play className="w-4 h-4" />
                                        Run Code Review
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Code Input */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-400">
                            Source Code
                        </label>
                        <textarea
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="// Paste your code here..."
                            className="w-full h-80 bg-black/50 border border-white/20 rounded-md p-4 font-mono text-sm text-gray-300 focus:border-gold-400 focus:ring-1 focus:ring-gold-400 outline-none transition-colors resize-y"
                            spellCheck="false"
                        />
                    </div>
                </div>

                {/* Error Display */}
                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-start gap-3 text-red-200">
                        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                        <p>{error}</p>
                    </div>
                )}

                {/* Output Display */}
                {result && (
                    <div className="bg-white/5 border border-white/10 rounded-lg p-6 md:p-8 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-2 text-gold-400 mb-4">
                            <CheckCircle2 className="w-6 h-6" />
                            <h2 className="text-xl font-serif">Review Results</h2>
                        </div>

                        <div className="prose prose-invert prose-gold max-w-none">
                            <ReactMarkdown
                                components={{
                                    code({ node, inline, className, children, ...props }: React.ComponentPropsWithoutRef<'code'> & { inline?: boolean; node?: any }) {
                                        return (
                                            <code className={`${className} bg-black/50 px-1.5 py-0.5 rounded text-gold-200 font-mono text-sm`} {...props}>
                                                {children}
                                            </code>
                                        )
                                    },
                                    pre({ node, children, ...props }: React.ComponentPropsWithoutRef<'pre'> & { node?: any }) {
                                        return (
                                            <pre className="bg-black/50 p-4 rounded-lg overflow-x-auto border border-white/10 my-4" {...props}>
                                                {children}
                                            </pre>
                                        )
                                    }
                                }}
                            >
                                {result}
                            </ReactMarkdown>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
