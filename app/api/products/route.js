import { NextResponse } from "next/server"

const products = [
  {
    id: 1,
    name: "Red Oxide",
    slug: "red-oxide",
    description:
      "Premium quality red iron oxide powder for paints, coatings, construction, and industrial applications.",
    longDescription:
      "Our Red Oxide (Iron Oxide Red) is a high-grade pigment extensively used in the paint, construction, and coatings industries. It offers excellent weather resistance, UV stability, and superior tinting strength. Available in various mesh sizes and grades to meet specific industrial requirements.",
    image: "/images/red-oxide.jpg",
    applications: [
      "Paints & Coatings",
      "Construction",
      "Ceramics",
      "Concrete Coloring",
      "Rubber & Plastics",
    ],
    specifications: {
      "Fe2O3 Content": "≥ 95%",
      "Moisture": "≤ 1%",
      "Oil Absorption": "20-30 g/100g",
      "pH Value": "5-7",
    },
  },
  {
    id: 2,
    name: "Manganese Dioxide 30%",
    slug: "manganese-dioxide",
    description:
      "High-grade manganese dioxide (30% MnO2) for batteries, glass, ceramics, and chemical industries.",
    longDescription:
      "Our Manganese Dioxide (MnO2 30%) is carefully processed and graded for use in a wide range of industrial applications. It is a key component in dry cell batteries, glass decolourization, brick manufacturing, and chemical synthesis. We provide consistent quality with strict adherence to specifications.",
    image: "/images/manganese-dioxide.jpg",
    applications: [
      "Battery Manufacturing",
      "Glass & Ceramics",
      "Brick Making",
      "Water Treatment",
      "Chemical Industry",
    ],
    specifications: {
      "MnO2 Content": "≥ 30%",
      "Moisture": "≤ 5%",
      "Mesh Size": "60-200 mesh",
      "Form": "Powder",
    },
  },
  {
    id: 3,
    name: "Medium Carbon Ferro Manganese Powder",
    slug: "ferro-manganese-powder",
    description:
      "Quality medium carbon ferro manganese powder for steel manufacturing and metallurgical applications.",
    longDescription:
      "Medium Carbon Ferro Manganese Powder is an essential alloy additive in steel production. It acts as a deoxidizer and desulfurizer during steel making, improving the strength and hardness of steel products. Our powder is manufactured to precise carbon and manganese specifications for consistent metallurgical performance.",
    image: "/images/ferro-manganese.jpg",
    applications: [
      "Steel Manufacturing",
      "Alloy Production",
      "Welding Electrodes",
      "Foundry Applications",
      "Metallurgy",
    ],
    specifications: {
      "Mn Content": "65-75%",
      "Carbon": "1.0-2.0%",
      "Si Content": "≤ 2.0%",
      "P Content": "≤ 0.35%",
    },
  },
  {
    id: 4,
    name: "High Carbon Ferro Chrome Powder",
    slug: "ferro-chrome-powder",
    description:
      "Premium high carbon ferro chrome powder for stainless steel production and alloy manufacturing.",
    longDescription:
      "High Carbon Ferro Chrome Powder is a critical raw material for the production of stainless steel and special alloys. It provides the essential chromium content needed for corrosion resistance. Our product meets stringent quality standards and is available in various mesh sizes for different industrial applications.",
    image: "/images/ferro-chrome.jpg",
    applications: [
      "Stainless Steel Production",
      "Special Alloys",
      "Welding Materials",
      "Refractory Applications",
      "Casting Industry",
    ],
    specifications: {
      "Cr Content": "60-65%",
      "Carbon": "6-8%",
      "Si Content": "≤ 3.0%",
      "P Content": "≤ 0.03%",
    },
  },
]

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get("slug")

    if (slug) {
      const product = products.find((p) => p.slug === slug)
      if (!product) {
        return NextResponse.json(
          { success: false, message: "Product not found" },
          { status: 404 }
        )
      }
      return NextResponse.json({ success: true, data: product })
    }

    return NextResponse.json({ success: true, data: products })
  } catch (error) {
    console.error("Products API error:", error)
    return NextResponse.json(
      { success: false, message: "Failed to fetch products" },
      { status: 500 }
    )
  }
}
