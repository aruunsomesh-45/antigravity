import * as React from "react"
import { cn } from "@/lib/utils"

const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "default" | "outline" | "ghost" | "secondary" }>(
    ({ className, variant = "default", ...props }, ref) => {
        const variants = {
            default: "bg-gold-400 text-black hover:bg-gold-300",
            outline: "border border-white/20 bg-transparent hover:bg-white/10 text-cream-100",
            ghost: "hover:bg-white/10 text-cream-100",
            secondary: "bg-white/10 text-cream-100 hover:bg-white/20",
        }

        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-400 disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2",
                    variants[variant],
                    className
                )}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
