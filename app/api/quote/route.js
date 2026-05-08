import { NextResponse } from "next/server"
import { quoteSchema } from "@/lib/validations"
import connectDB from "@/lib/mongodb"
import Quote from "@/lib/models/Quote"
import { sendQuoteNotification } from "@/lib/email"

export async function POST(request) {
  try {
    const body = await request.json()

    // Validate input
    const result = quoteSchema.safeParse(body)
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors
      return NextResponse.json(
        { success: false, message: "Validation failed", errors },
        { status: 400 }
      )
    }

    const data = result.data

    // Connect to MongoDB and save
    await connectDB()
    const quote = await Quote.create({
      name: data.name,
      email: data.email,
      phone: data.phone,
      product: data.product,
      quantity: data.quantity,
      message: data.message,
      status: "pending",
    })

    // Send email notification
    const emailResult = await sendQuoteNotification(data)

    if (!emailResult.success) {
      console.error("Email sending failed, but quote was saved:", emailResult.error)
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your quote request has been received! We will respond within 24 hours.",
        id: quote._id,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Quote API error:", error)
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again later." },
      { status: 500 }
    )
  }
}
