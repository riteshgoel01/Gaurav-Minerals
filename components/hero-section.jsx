"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ArrowRight, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-minerals.jpg"
          alt="Mineral Mining Operations"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <div
            className={`transition-all duration-1000 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              9+ Years of Excellence in Industrial Supplies
            </span>
          </div>

          <h1
            className={`font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-foreground leading-tight mb-6 text-balance transition-all duration-1000 delay-100 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Premium Industrial
            <span className="block text-primary">Minerals & Chemicals</span>
          </h1>

          <p
            className={`text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty transition-all duration-1000 delay-200 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Leading supplier and exporter of premium industrial products including Red Oxide, 
            Manganese Dioxide, Ferro Manganese Powder and Ferro Chrome Powder from India.
          </p>

          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-300 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8">
              Explore Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-border hover:bg-secondary px-8">
              Contact Us
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className={`absolute bottom-10 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-500 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          <a
            href="#about"
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <span className="text-sm">Scroll to explore</span>
            <ChevronDown className="h-5 w-5 animate-bounce" />
          </a>
        </div>
      </div>

      {/* Stats bar */}
      <div
        className={`absolute bottom-0 left-0 right-0 z-10 transition-all duration-1000 delay-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-3 gap-4 md:gap-8 bg-card/80 backdrop-blur-md rounded-t-2xl p-6 md:p-8 border border-border border-b-0">
            <div className="text-center">
              <div className="font-serif text-3xl md:text-4xl font-semibold text-primary">9+</div>
              <div className="text-sm text-muted-foreground mt-1">Years Experience</div>
            </div>
            <div className="text-center border-x border-border">
              <div className="font-serif text-3xl md:text-4xl font-semibold text-primary">250+</div>
              <div className="text-sm text-muted-foreground mt-1">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="font-serif text-3xl md:text-4xl font-semibold text-primary">100%</div>
              <div className="text-sm text-muted-foreground mt-1">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
