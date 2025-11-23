"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SliderProps {
    min: number
    max: number
    step?: number
    value: number[]
    onValueChange: (value: number[]) => void
    className?: string
}

export function Slider({ min, max, step = 1, value, onValueChange, className }: SliderProps) {
    const [localValue, setLocalValue] = React.useState(value)

    React.useEffect(() => {
        setLocalValue(value)
    }, [value])

    const handleInputChange = (index: number, newValue: number) => {
        const newValues = [...localValue]
        newValues[index] = Number(newValue)
        newValues.sort((a, b) => a - b) // Ensure values stay ordered
        setLocalValue(newValues)
        onValueChange(newValues)
    }

    // Calculate percentage for track background
    const getPercent = (val: number) => ((val - min) / (max - min)) * 100

    return (
        <div className={cn("relative flex w-full touch-none select-none items-center", className)}>
            <div className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-white/20">
                <div
                    className="absolute h-full bg-gold-400"
                    style={{
                        left: `${getPercent(localValue[0])}%`,
                        right: `${100 - getPercent(localValue[1] || localValue[0])}%`,
                    }}
                />
            </div>
            {/* Range Inputs for Interaction */}
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={localValue[0]}
                onChange={(e) => handleInputChange(0, Number(e.target.value))}
                className="absolute h-full w-full opacity-0 cursor-pointer pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4"
            />
            {localValue.length > 1 && (
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={localValue[1]}
                    onChange={(e) => handleInputChange(1, Number(e.target.value))}
                    className="absolute h-full w-full opacity-0 cursor-pointer pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4"
                />
            )}

            {/* Visual Thumbs */}
            <div
                className="absolute block h-4 w-4 rounded-full border border-gold-400/50 bg-black ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                style={{ left: `calc(${getPercent(localValue[0])}% - 8px)` }}
            />
            {localValue.length > 1 && (
                <div
                    className="absolute block h-4 w-4 rounded-full border border-gold-400/50 bg-black ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                    style={{ left: `calc(${getPercent(localValue[1])}% - 8px)` }}
                />
            )}
        </div>
    )
}
