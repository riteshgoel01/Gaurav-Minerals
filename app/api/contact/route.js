import { NextResponse } from "next/server"
import { contactSchema } from "@/lib/validations"
import connectDB from "@/lib/mongodb"
import Contact from "@/lib/models/Contact"
import { sendContactNotification } from "@/lib/email"

export async function POST(request) {
  try {
    const body = await request.json()

    // Validate input
    const result = contactSchema.safeParse(body)
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
    const contact = await Contact.create({
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
      status: "new",
    })

    // Send email notification
    const emailResult = await sendContactNotification(data)

    if (!emailResult.success) {
      console.error("Email sending failed, but contact was saved:", emailResult.error)
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for reaching out! We will get back to you soon.",
        id: contact._id,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Contact API error:", error)
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again later." },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    await connectDB()
    const contacts = await Contact.find({}).sort({ createdAt: -1 }).lean()
    return NextResponse.json({ success: true, data: contacts })
  } catch (error) {
    console.error("Failed to fetch contacts:", error)
    return NextResponse.json(
      { success: false, message: "Failed to fetch contacts" },
      { status: 500 }
    )
  }
}
