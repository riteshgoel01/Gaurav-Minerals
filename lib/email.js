import nodemailer from "nodemailer"

/**
 * Creates a nodemailer transporter using environment variables.
 * Configure these in your .env.local file:
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM
 *
 * If SMTP credentials are not set, emails will be logged to the console instead.
 */
function getTransporter() {
  const host = process.env.SMTP_HOST
  const port = parseInt(process.env.SMTP_PORT || "587", 10)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (!host || !user || !pass) {
    return null // No email configured — will fall back to console logging
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  })
}

/**
 * Sends a notification email when a new contact form submission is received.
 */
export async function sendContactNotification({ name, email, phone, message }) {
  const transporter = getTransporter()
  const recipient = process.env.NOTIFICATION_EMAIL || process.env.SMTP_USER || "ag.anil@yahoo.co.in"
  const from = process.env.SMTP_FROM || process.env.SMTP_USER || "noreply@gauravminerals.com"

  const mailOptions = {
    from: `"Gaurav Minerals Website" <${from}>`,
    to: recipient,
    subject: `New Contact Inquiry from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1a1a2e; color: #ffffff; padding: 24px; border-radius: 12px 12px 0 0;">
          <h2 style="margin: 0;">📩 New Contact Form Submission</h2>
        </div>
        <div style="background: #f8f9fa; padding: 24px; border: 1px solid #e9ecef;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #dee2e6; font-weight: bold; width: 120px; color: #495057;">Name</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #dee2e6; color: #212529;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #dee2e6; font-weight: bold; color: #495057;">Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #dee2e6;"><a href="mailto:${email}" style="color: #0d6efd;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #dee2e6; font-weight: bold; color: #495057;">Phone</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #dee2e6;"><a href="tel:${phone}" style="color: #0d6efd;">${phone || "Not provided"}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px 0; font-weight: bold; color: #495057; vertical-align: top;">Message</td>
              <td style="padding: 12px 0; color: #212529; white-space: pre-wrap;">${message}</td>
            </tr>
          </table>
        </div>
        <div style="background: #e9ecef; padding: 16px 24px; border-radius: 0 0 12px 12px; text-align: center; color: #6c757d; font-size: 13px;">
          This email was sent from the Gaurav Minerals website contact form.
        </div>
      </div>
    `,
    text: `New Contact Inquiry\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || "Not provided"}\nMessage: ${message}`,
  }

  if (!transporter) {
    console.log("=== EMAIL NOT CONFIGURED — Logging to console ===")
    console.log("To:", recipient)
    console.log("Subject:", mailOptions.subject)
    console.log("From:", name, `<${email}>`)
    console.log("Phone:", phone || "Not provided")
    console.log("Message:", message)
    console.log("=== Configure SMTP_HOST, SMTP_USER, SMTP_PASS in .env.local to send real emails ===")
    return { success: true, method: "console" }
  }

  try {
    await transporter.sendMail(mailOptions)
    return { success: true, method: "email" }
  } catch (error) {
    console.error("Failed to send email:", error)
    return { success: false, error: error.message }
  }
}

/**
 * Sends a notification email when a new quote request is received.
 */
export async function sendQuoteNotification({ name, email, phone, product, quantity, message }) {
  const transporter = getTransporter()
  const recipient = process.env.NOTIFICATION_EMAIL || process.env.SMTP_USER || "ag.anil@yahoo.co.in"
  const from = process.env.SMTP_FROM || process.env.SMTP_USER || "noreply@gauravminerals.com"

  const mailOptions = {
    from: `"Gaurav Minerals Website" <${from}>`,
    to: recipient,
    subject: `New Quote Request from ${name} — ${product}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1a1a2e; color: #ffffff; padding: 24px; border-radius: 12px 12px 0 0;">
          <h2 style="margin: 0;">📋 New Quote Request</h2>
        </div>
        <div style="background: #f8f9fa; padding: 24px; border: 1px solid #e9ecef;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #dee2e6; font-weight: bold; width: 120px; color: #495057;">Name</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #dee2e6; color: #212529;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #dee2e6; font-weight: bold; color: #495057;">Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #dee2e6;"><a href="mailto:${email}" style="color: #0d6efd;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #dee2e6; font-weight: bold; color: #495057;">Phone</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #dee2e6;">${phone || "Not provided"}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #dee2e6; font-weight: bold; color: #495057;">Product</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #dee2e6; color: #212529; font-weight: 600;">${product}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #dee2e6; font-weight: bold; color: #495057;">Quantity</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #dee2e6; color: #212529;">${quantity || "Not specified"}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; font-weight: bold; color: #495057; vertical-align: top;">Message</td>
              <td style="padding: 12px 0; color: #212529; white-space: pre-wrap;">${message || "No additional message"}</td>
            </tr>
          </table>
        </div>
        <div style="background: #e9ecef; padding: 16px 24px; border-radius: 0 0 12px 12px; text-align: center; color: #6c757d; font-size: 13px;">
          This email was sent from the Gaurav Minerals website quote form.
        </div>
      </div>
    `,
    text: `New Quote Request\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || "Not provided"}\nProduct: ${product}\nQuantity: ${quantity || "Not specified"}\nMessage: ${message || "No additional message"}`,
  }

  if (!transporter) {
    console.log("=== EMAIL NOT CONFIGURED — Logging to console ===")
    console.log("To:", recipient)
    console.log("Subject:", mailOptions.subject)
    console.log("Details:", { name, email, phone, product, quantity, message })
    console.log("=== Configure SMTP_HOST, SMTP_USER, SMTP_PASS in .env.local to send real emails ===")
    return { success: true, method: "console" }
  }

  try {
    await transporter.sendMail(mailOptions)
    return { success: true, method: "email" }
  } catch (error) {
    console.error("Failed to send email:", error)
    return { success: false, error: error.message }
  }
}
