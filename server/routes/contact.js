import express from 'express'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const router = express.Router()

// Create transporter (configure based on your email service)
const createTransporter = () => {
  // Option 1: Gmail (for development)
  if (process.env.EMAIL_SERVICE === 'gmail') {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Use App Password for Gmail
      },
    })
  }

  // Option 2: SMTP (for production)
  if (process.env.SMTP_HOST) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  }

  // Option 3: Resend (recommended for production)
  if (process.env.RESEND_API_KEY) {
    return nodemailer.createTransport({
      host: 'smtp.resend.com',
      port: 465,
      secure: true,
      auth: {
        user: 'resend',
        pass: process.env.RESEND_API_KEY,
      },
    })
  }

  // Fallback: Console log (for development without email setup)
  return {
    sendMail: async (options) => {
      console.log('📧 Email would be sent:', {
        to: options.to,
        subject: options.subject,
        text: options.text,
      })
      return { messageId: 'console-log' }
    },
  }
}

router.post('/', async (req, res) => {
  try {
    const { name, email, phone, datePreference, numberOfGuests, specialRequests } = req.body

    // Validation
    if (!name || !email || !phone || !numberOfGuests) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const transporter = createTransporter()

    // Email to restaurant
    const restaurantEmail = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER || 'noreply@sushichef.com',
      to: process.env.CONTACT_EMAIL || process.env.EMAIL_USER || 'contact@sushichef.com',
      subject: `New Reservation Request from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0f0c07; color: #f5f0e8;">
          <h2 style="color: #d4a017; border-bottom: 2px solid #a1122a; padding-bottom: 10px;">
            New Reservation Request
          </h2>
          
          <div style="margin: 20px 0;">
            <p><strong style="color: #d4a017;">Name:</strong> ${name}</p>
            <p><strong style="color: #d4a017;">Email:</strong> ${email}</p>
            <p><strong style="color: #d4a017;">Phone:</strong> ${phone}</p>
            <p><strong style="color: #d4a017;">Preferred Date:</strong> ${datePreference || 'Not specified'}</p>
            <p><strong style="color: #d4a017;">Number of Guests:</strong> ${numberOfGuests}</p>
            ${specialRequests ? `<p><strong style="color: #d4a017;">Special Requests:</strong><br>${specialRequests}</p>` : ''}
          </div>
          
          <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #a1122a; color: #c7b8a5; font-size: 12px;">
            Please contact the guest to confirm the reservation.
          </p>
        </div>
      `,
      text: `
New Reservation Request

Name: ${name}
Email: ${email}
Phone: ${phone}
Preferred Date: ${datePreference || 'Not specified'}
Number of Guests: ${numberOfGuests}
${specialRequests ? `Special Requests: ${specialRequests}` : ''}
      `,
    }

    // Confirmation email to customer
    const confirmationEmail = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER || 'noreply@sushichef.com',
      to: email,
      subject: 'Reservation Request Received - Tashi Phuri Sushi Chef',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0f0c07; color: #f5f0e8;">
          <h2 style="color: #d4a017; text-align: center; margin-bottom: 20px;">
            TASHI PHURI
          </h2>
          
          <h3 style="color: #d4a017; border-bottom: 2px solid #a1122a; padding-bottom: 10px;">
            Reservation Request Received
          </h3>
          
          <p>Dear ${name},</p>
          
          <p>Thank you for your interest in our omakase experience. We have received your reservation request and will contact you shortly to confirm your booking.</p>
          
          <div style="background-color: #3d2817; padding: 15px; margin: 20px 0; border-left: 3px solid #a1122a;">
            <p style="margin: 5px 0;"><strong>Request Details:</strong></p>
            <p style="margin: 5px 0;">Preferred Date: ${datePreference || 'To be discussed'}</p>
            <p style="margin: 5px 0;">Number of Guests: ${numberOfGuests}</p>
          </div>
          
          <p>We look forward to providing you with an unforgettable dining experience.</p>
          
          <p style="margin-top: 30px; color: #c7b8a5; font-style: italic;">
            「一期一会」<br>
            One encounter, one opportunity
          </p>
          
          <p style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #a1122a; color: #c7b8a5; font-size: 12px; text-align: center;">
            Tashi Phuri - Master Sushi Chef<br>
            14 Avenue Gambetta, 75020 Paris, France<br>
            +33 7 83 57 72 38<br>
            By appointment only
          </p>
        </div>
      `,
      text: `
Reservation Request Received

Dear ${name},

Thank you for your interest in our omakase experience. We have received your reservation request and will contact you shortly to confirm your booking.

Request Details:
Preferred Date: ${datePreference || 'To be discussed'}
Number of Guests: ${numberOfGuests}

We look forward to providing you with an unforgettable dining experience.

一期一会 — One encounter, one opportunity

Tashi Phuri - Master Sushi Chef
14 Avenue Gambetta, 75020 Paris, France
+33 7 83 57 72 38
By appointment only
      `,
    }

    // Send emails
    await transporter.sendMail(restaurantEmail)
    await transporter.sendMail(confirmationEmail)

    res.json({ 
      success: true, 
      message: 'Reservation request submitted successfully' 
    })
  } catch (error) {
    console.error('Error sending email:', error)
    res.status(500).json({ 
      error: 'Failed to send reservation request',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Please try again later'
    })
  }
})

export default router
