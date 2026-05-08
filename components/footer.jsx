import Link from "next/link"
import { MapPin, Phone, Mail } from "lucide-react"

const products = [
  "Red Oxide",
  "Manganese Dioxide 30%",
  "Medium Carbon Ferro Manganese Powder",
  "High Carbon Ferro Chrome Powder",
]

const quickLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About Us" },
  { href: "#products", label: "Products" },
  { href: "#why-us", label: "Why Us" },
  { href: "#contact", label: "Contact" },
]

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-serif font-bold text-lg">G</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg font-semibold text-foreground">
                  Gaurav Minerals
                </span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Leading supplier and exporter of premium industrial minerals and ferro alloy 
              powders from India. 9+ years of excellence in the industry.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Our Products</h3>
            <ul className="space-y-3">
              {products.slice(0, 5).map((product) => (
                <li key={product}>
                  <a
                    href="#products"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {product}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">
                  GH-1/145 Paschim Vihar, New Delhi - 110063, India
                </span>
              </li>
              <li className="flex gap-3 text-sm">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <a
                  href="tel:+919211996000"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  +91-9211996000
                </a>
              </li>
              <li className="flex gap-3 text-sm">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <a
                  href="mailto:ag.anil@yahoo.co.in"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  ag.anil@yahoo.co.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Gaurav Minerals. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
