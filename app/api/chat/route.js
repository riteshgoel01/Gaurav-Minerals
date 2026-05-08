import { NextResponse } from "next/server"
import { companyInfo, products, faqs } from "@/lib/chatbot-knowledge"

function findBestResponse(message) {
  const msg = message.toLowerCase().trim()

  // 1. Check if asking about a specific product
  for (const product of products) {
    const matched = product.keywords.some((kw) => msg.includes(kw))
    if (matched) {
      // Check if asking about price specifically
      const askingPrice = ["price", "cost", "rate", "how much", "quote"].some((w) => msg.includes(w))
      if (askingPrice) {
        return `**${product.name}**\n\n${product.description}\n\n📋 **Specs:** ${product.specs}\n\nPricing depends on the quantity and delivery location. For a custom quote on ${product.name}, please:\n• Call us: ${companyInfo.phone}\n• Email: ${companyInfo.email}\n• Or fill the contact form on our website.\n\nWe'll respond within 24 hours!`
      }

      // Check if asking about specs
      const askingSpecs = ["spec", "specification", "detail", "composition", "grade", "purity"].some((w) => msg.includes(w))
      if (askingSpecs) {
        return `**${product.name} — Specifications**\n\n📊 ${product.specs}\n\n🏭 **Applications:** ${product.applications}\n\n📦 **Packaging:** ${product.packaging}\n\nWould you like a detailed test report or a custom quote?`
      }

      // General product info
      return `**${product.name}**\n\n${product.description}\n\n📊 **Specs:** ${product.specs}\n🏭 **Applications:** ${product.applications}\n📦 **Packaging:** ${product.packaging}\n\nWould you like to know about pricing, or request a sample?`
    }
  }

  // 2. Check FAQs by keyword matching
  let bestMatch = null
  let bestScore = 0

  for (const faq of faqs) {
    let score = 0
    for (const keyword of faq.keywords) {
      if (msg.includes(keyword)) {
        score += keyword.length // longer keyword matches are more relevant
      }
    }
    if (score > bestScore) {
      bestScore = score
      bestMatch = faq
    }
  }

  if (bestMatch && bestScore > 0) {
    return bestMatch.response
  }

  // 3. Check if asking about all products
  if (msg.includes("product") || msg.includes("what do you sell") || msg.includes("what do you offer") || msg.includes("catalog")) {
    const productList = products.map((p) => `• **${p.name}** — ${p.description}`).join("\n")
    return `We offer the following premium industrial products:\n\n${productList}\n\nWhich product would you like to know more about?`
  }

  // 4. Default fallback
  return `Thank you for your message! I can help you with:\n\n• **Product Information** — Red Oxide, Manganese Dioxide, Ferro Manganese, Ferro Chrome\n• **Pricing & Quotes** — Ask for a custom quote\n• **Delivery & Shipping** — Domestic & international\n• **Quality & Certifications** — Test reports & COA\n• **Company Info** — About us, location, contact\n\nCould you try rephrasing your question? Or you can contact us directly:\n📞 ${companyInfo.phone}\n📧 ${companyInfo.email}`
}

export async function POST(request) {
  try {
    const { message } = await request.json()

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json(
        { success: false, message: "Message is required" },
        { status: 400 }
      )
    }

    if (message.length > 500) {
      return NextResponse.json(
        { success: false, message: "Message is too long (max 500 characters)" },
        { status: 400 }
      )
    }

    // Small delay to feel natural
    await new Promise((resolve) => setTimeout(resolve, 300 + Math.random() * 700))

    const reply = findBestResponse(message)

    return NextResponse.json({
      success: true,
      reply,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}
