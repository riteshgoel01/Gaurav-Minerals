"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Red Oxide",
    description: "Premium quality red iron oxide powder for paints, coatings, construction, and industrial applications.",
    image: "/images/red-oxide.jpg",
  },
  {
    id: 2,
    name: "Manganese Dioxide 30%",
    description: "High-grade manganese dioxide (30% MnO2) for batteries, glass, ceramics, and chemical industries.",
    image: "/images/manganese-dioxide.jpg",
  },
  {
    id: 3,
    name: "Medium Carbon Ferro Manganese Powder",
    description: "Quality medium carbon ferro manganese powder for steel manufacturing and metallurgical applications.",
    image: "/images/ferro-manganese.jpg",
  },
  {
    id: 4,
    name: "High Carbon Ferro Chrome Powder",
    description: "Premium high carbon ferro chrome powder for stainless steel production and alloy manufacturing.",
    image: "/images/ferro-chrome.jpg",
  },
]

export function ProductsSection() {
  const [hoveredId, setHoveredId] = useState(null)

  return (
    <section id="products" className="py-24 md:py-32 bg-card">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            Our Products
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mt-3 mb-4 text-balance">
            Premium Industrial Products
          </h2>
          <p className="text-muted-foreground">
            We manufacture, supply and export a wide range of high-quality industrial 
            minerals and ferro alloy powders to meet diverse industrial requirements.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative rounded-2xl overflow-hidden bg-background border border-border hover:border-primary/50 transition-all duration-300 cursor-pointer"
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image */}
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className={`object-cover transition-transform duration-500 ${
                    hoveredId === product.id ? "scale-110" : "scale-100"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                  <div
                    className={`w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      hoveredId === product.id ? "bg-primary" : ""
                    }`}
                  >
                    <ArrowUpRight
                      className={`h-5 w-5 transition-colors duration-300 ${
                        hoveredId === product.id ? "text-primary-foreground" : "text-primary"
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
