"use client"

import { useState } from "react"
import { MapPin, Phone, Mail, Send, Loader2, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { countryCodes } from "@/lib/country-codes"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    // Combine country code + phone for submission
    const fullPhone = formData.phone
      ? `${formData.countryCode} ${formData.phone}`
      : ""

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: fullPhone,
          message: formData.message,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        if (result.errors) {
          setErrors(result.errors)
          toast.error("Please fix the errors in the form.")
        } else {
          toast.error(result.message || "Something went wrong.")
        }
        return
      }

      toast.success(result.message || "Message sent successfully!")
      setFormData({ name: "", email: "", countryCode: "+91", phone: "", message: "" })
    } catch (error) {
      toast.error("Network error. Please check your connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Find the selected country for display
  const selectedCountry = countryCodes.find((c) => c.code === formData.countryCode) || countryCodes[0]

  return (
    <section id="contact" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            Contact Us
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mt-3 mb-4 text-balance">
            Get In Touch
          </h2>
          <p className="text-muted-foreground">
            Have questions about our products or need a custom quote? 
            Reach out to us and our team will get back to you promptly.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Info */}
          <div>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-1">Our Location</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    GH-1/145 Paschim Vihar,<br />
                    New Delhi - 110063, India
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-1">Phone Number</h3>
                  <a
                    href="tel:+919211996000"
                    className="text-muted-foreground text-sm hover:text-primary transition-colors"
                  >
                    +91-9211996000
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-1">Email Address</h3>
                  <a
                    href="mailto:ag.anil@yahoo.co.in"
                    className="text-muted-foreground text-sm hover:text-primary transition-colors"
                  >
                    ag.anil@yahoo.co.in
                  </a>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="mt-10 aspect-video rounded-2xl bg-card border border-border overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.5!2d77.0999!3d28.6699!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d03a0e2b55555%3A0x0!2sPaschim%20Vihar%2C%20New%20Delhi!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card rounded-2xl border border-border p-8 md:p-10">
            <h3 className="font-serif text-2xl font-semibold text-foreground mb-6">
              Send us a message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Your Name
                </label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`bg-background border-border ${errors.name ? "border-red-500" : ""}`}
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name[0]}</p>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`bg-background border-border ${errors.email ? "border-red-500" : ""}`}
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email[0]}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                    Phone
                  </label>
                  <div className="flex gap-2">
                    {/* Country Code Selector */}
                    <div className="relative flex-shrink-0">
                      <select
                        id="country-code"
                        value={formData.countryCode}
                        onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                        disabled={isSubmitting}
                        className="appearance-none h-9 w-[110px] rounded-md border border-border bg-background px-3 pr-8 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 cursor-pointer"
                      >
                        {countryCodes.map((cc) => (
                          <option key={`${cc.country}-${cc.code}`} value={cc.code}>
                            {cc.country} {cc.code}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                    </div>
                    {/* Phone Number */}
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`bg-background border-border flex-1 ${errors.phone ? "border-red-500" : ""}`}
                      disabled={isSubmitting}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone[0]}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your requirements..."
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`bg-background border-border resize-none ${errors.message ? "border-red-500" : ""}`}
                  disabled={isSubmitting}
                />
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1">{errors.message[0]}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    Sending...
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
