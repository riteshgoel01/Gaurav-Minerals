"use client"

import Image from "next/image"
import { Shield, Factory, Award } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Quality Assurance",
    description:
      "Quality has always been our asset of special worth. We practice strict quality assurance methods to ensure that we provide our clients with the highest grade of minerals.",
  },
  {
    icon: Factory,
    title: "Infrastructure",
    description:
      "We have invested in elaborate infrastructure to ensure that only products of the finest quality roll out of Gaurav Minerals and Chemicals.",
  },
  {
    icon: Award,
    title: "Why Us?",
    description:
      "Backed by our pioneering spirit, highly customer oriented values and sophisticated production process, we have moved from strength to strength as a company.",
  },
]

export function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-24">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* About Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/about-mining.jpg"
                alt="Industrial Operations"
                fill
                className="object-cover"
              />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-6 -right-6 md:bottom-8 md:-right-8 bg-primary text-primary-foreground p-6 rounded-2xl shadow-2xl">
              <div className="font-serif text-4xl font-bold">9+</div>
              <div className="text-sm opacity-90">Years of Excellence</div>
            </div>
          </div>

          {/* Text */}
          <div>
            <span className="text-primary text-sm font-medium tracking-wider uppercase">
              About Us
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mt-3 mb-6 text-balance">
              Gaurav Minerals
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                We would like to introduce our company Gaurav Minerals that has been in 
                business of industrial minerals and chemicals for the past 9 years. The company 
                is active in the business of supplying and exporting of premium industrial 
                products like Red Oxide, Manganese Dioxide, Medium Carbon Ferro Manganese 
                Powder, and High Carbon Ferro Chrome Powder.
              </p>
              <p>
                We have been an established and popular company with an excellent track 
                record for the best customer satisfaction. We have never compromised on 
                the quality and the services provided to the customer.
              </p>
              <p>
                Our strong supply chain network and quality sourcing ensures continuous 
                and consistent supply of materials to meet all your industrial requirements.
              </p>
            </div>

            {/* Key points */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-sm text-foreground">Quality Sourcing</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-sm text-foreground">Global Exports</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-sm text-foreground">Quality Certified</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-sm text-foreground">Competitive Pricing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
