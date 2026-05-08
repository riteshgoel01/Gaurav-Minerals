/**
 * Knowledge base for Gaurav Minerals chatbot.
 * The chatbot matches user messages against these entries to provide relevant responses.
 */

export const companyInfo = {
  name: "Gaurav Minerals",
  tagline: "Premium Industrial Minerals & Chemicals",
  established: "2017",
  experience: "9+ years",
  location: "GH-1/145 Paschim Vihar, New Delhi - 110063, India",
  phone: "+91-9211996000",
  email: "ag.anil@yahoo.co.in",
  website: "gauravminerals.com",
}

export const products = [
  {
    name: "Red Oxide",
    keywords: ["red oxide", "iron oxide", "red", "oxide", "fe2o3"],
    description:
      "Premium quality red iron oxide powder for paints, coatings, construction, and industrial applications.",
    specs: "Fe2O3 ≥ 95%, Moisture ≤ 1%, pH 5–7",
    applications: "Paints & Coatings, Construction, Ceramics, Concrete Coloring, Rubber & Plastics",
    packaging: "Available in 25kg, 50kg,100kg bags and bulk packaging",
  },
  {
    name: "Manganese Dioxide 30%",
    keywords: ["manganese", "dioxide", "mno2", "manganese dioxide"],
    description:
      "High-grade manganese dioxide (30% MnO2) for batteries, glass, ceramics, and chemical industries.",
    specs: "MnO2 ≥ 30%, Moisture ≤ 5%, Mesh Size 60–200",
    applications: "Battery Manufacturing, Glass & Ceramics, Brick Making, Water Treatment, Chemical Industry",
    packaging: "Available in 25kg, 50kg,100 bags and bulk packaging",
  },
  {
    name: "Medium Carbon Ferro Manganese Powder",
    keywords: ["ferro manganese", "manganese powder", "ferro", "manganese", "mc femn"],
    description:
      "Quality medium carbon ferro manganese powder for steel manufacturing and metallurgical applications.",
    specs: "Mn 65–75%, Carbon 1.0–2.0%, Si ≤ 2.0%, P ≤ 0.35%",
    applications: "Steel Manufacturing, Alloy Production, Welding Electrodes, Foundry, Metallurgy",
    packaging: "Available in 25kg, 50kg,100kg bags and bulk packaging",
  },
  {
    name: "High Carbon Ferro Chrome Powder",
    keywords: ["ferro chrome", "chrome powder", "ferrochrome", "fecr", "chrome"],
    description:
      "Premium high carbon ferro chrome powder for stainless steel production and alloy manufacturing.",
    specs: "Cr 60–65%, Carbon 6–8%, Si ≤ 3.0%, P ≤ 0.03%",
    applications: "Stainless Steel Production, Special Alloys, Welding Materials, Refractory, Casting",
    packaging: "Available in 25kg, 50kg bags and bulk packaging",
  },
]

export const faqs = [
  {
    keywords: ["price", "cost", "rate", "pricing", "how much", "quotation", "quote"],
    response:
      "Pricing depends on the product, quantity, and delivery location. For a custom quote, please share your requirements and we'll get back to you within 24 hours. You can also call us at +91-9211996000 or fill out the contact form on our website.",
  },
  {
    keywords: ["delivery", "shipping", "ship", "deliver", "transport", "logistics"],
    response:
      "We deliver across India and export internationally. Delivery timelines depend on your location and order quantity. For domestic orders, delivery typically takes 3–7 business days. For international shipments, it varies by destination. Contact us for exact timelines.",
  },
  {
    keywords: ["minimum order", "moq", "minimum quantity", "min order"],
    response:
      "Our minimum order quantity varies by product. Generally, we accept orders starting from 1 metric ton for domestic supply. For exports, minimum quantities may differ. Please contact us with your specific requirements.",
  },
  {
    keywords: ["quality", "certificate", "testing", "lab", "standard", "iso", "certification"],
    response:
      "Quality is our top priority. All our products undergo rigorous quality testing before dispatch. We provide test certificates and COA (Certificate of Analysis) with every shipment. Our quality assurance methods ensure the highest grade of minerals for our clients.",
  },
  {
    keywords: ["payment", "pay", "transaction", "bank", "upi"],
    response:
      "We accept payments via bank transfer (NEFT/RTGS), cheque, and UPI. For international orders, we accept wire transfers (T/T) and Letters of Credit (L/C). Payment terms can be discussed based on the order size.",
  },
  {
    keywords: ["sample", "test sample", "trial"],
    response:
      "Yes, we provide product samples for quality evaluation before bulk orders. Sample charges and shipping costs may apply depending on the product and destination. Please contact us to request a sample.",
  },
  {
    keywords: ["bulk", "wholesale", "large order", "large quantity", "tonnage"],
    response:
      "We specialize in bulk supply and can handle large volume orders. We offer competitive pricing for bulk purchases. Our strong supply chain network ensures continuous and consistent supply. Contact us to discuss your bulk requirements.",
  },
  {
    keywords: ["export", "international", "overseas", "abroad", "country", "countries"],
    response:
      "Yes, we export our products internationally. We have experience shipping to various countries and can handle all export documentation. Contact us with your country and requirements for export pricing and logistics details.",
  },
  {
    keywords: ["location", "address", "where", "office", "visit"],
    response:
      "Our office is located at GH-1/145 Paschim Vihar, New Delhi - 110063, India. You are welcome to visit us during business hours (Monday to Saturday, 9 AM to 6 PM IST). Please call ahead at +91-9211996000 to schedule a visit.",
  },
  {
    keywords: ["contact", "phone", "call", "email", "reach", "talk"],
    response:
      "You can reach us through:\n📞 Phone: +91-9211996000\n📧 Email: ag.anil@yahoo.co.in\n📍 Address: GH-1/145 Paschim Vihar, New Delhi - 110063\n\nOur team is available Monday to Saturday, 9 AM to 6 PM IST.",
  },
  {
    keywords: ["about", "company", "who", "history", "background", "established"],
    response:
      "Gaurav Minerals has been in the business of industrial minerals and chemicals for over 9 years (established 2017). We specialize in supplying and exporting premium products like Red Oxide, Manganese Dioxide, Ferro Manganese Powder, and Ferro Chrome Powder. We're known for our quality, reliability, and excellent customer service.",
  },
  {
    keywords: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening", "namaste"],
    response:
      "Hello! 👋 Welcome to Gaurav Minerals. I'm here to help you with information about our industrial minerals and chemicals. How can I assist you today?\n\nYou can ask me about:\n• Our products (Red Oxide, Manganese Dioxide, etc.)\n• Pricing & quotations\n• Delivery & shipping\n• Quality certifications\n• Bulk orders",
  },
  {
    keywords: ["thank", "thanks", "bye", "goodbye", "see you"],
    response:
      "Thank you for your interest in Gaurav Minerals! If you need any further assistance, feel free to ask. You can also reach us directly at +91-9211996000 or ag.anil@yahoo.co.in. Have a great day! 🙏",
  },
]
