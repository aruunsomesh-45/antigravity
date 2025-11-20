"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState, useEffect } from "react";

interface SplitTextProps {
    text: string;
    className?: string;
    delay?: number;
    duration?: number;
    stagger?: number;
}

export function SplitTextAnimation({
    text,
    className = "",
    delay = 0,
    duration = 0.05,
    stagger = 0.1,
}: SplitTextProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useGSAP(
        () => {
            if (!isMounted || !containerRef.current) return;

            const letters = containerRef.current.querySelectorAll(".split-char");

            gsap.fromTo(
                letters,
                {
                    opacity: 0,
                    y: 40,
                    rotateX: -90,
                },
                {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    duration: duration,
                    stagger: stagger,
                    ease: "back.out(1.7)",
                    delay: delay,
                }
            );
        },
        { scope: containerRef, dependencies: [isMounted, text] }
    );

    return (
        <div ref={containerRef} className={`inline-block overflow-hidden ${className}`}>
            {text.split("").map((char, i) => (
                <span
                    key={i}
                    className="split-char inline-block transform-style-3d"
                    style={{ whiteSpace: "pre" }}
                >
                    {char}
                </span>
            ))}
        </div>
    );
}
