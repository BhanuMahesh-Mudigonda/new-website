import { Resend } from 'resend'
import nodemailer from 'nodemailer'

export const sendNotificationEmail = async (data) => {
  const activeKey = process.env.RESEND_API_KEY || ''
  const keyPrefix = activeKey && activeKey.length >= 8 ? `${activeKey.slice(0, 8)}...` : 'NONE'

  console.log(`[EMAIL SERVICE] Initializing email dispatch using Resend API Key: ${keyPrefix}`)

  const resendSandboxOwner = process.env.RESEND_SANDBOX_OWNER || 'bhanumahesh.mudigonda@gmail.com'
  const primaryRecipient = 'pbphotography0032@gmail.com'
  const secondaryRecipient = 'pbvideography.0032@gmail.com'

  const subject = `📸 New Wedding Booking - PB Photography (${data.name})`
  const textBody = 
`Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email}
Event: ${data.eventType || data.subject || 'Wedding Inquiry'}
Date: ${data.preferredDate || data.eventDate || 'N/A'}
Location: ${data.location || data.venue || 'N/A'}
Message: ${data.message || 'None'}`

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 24px; background: #081C15; color: #FAF7F2; border-radius: 12px; border: 1px solid #D4AF37;">
      <h2 style="color: #D4AF37; margin-top: 0;">📸 New Wedding Booking - PB Photography</h2>
      <p style="margin: 10px 0;"><strong>Name:</strong> ${data.name}</p>
      <p style="margin: 10px 0;"><strong>Phone:</strong> ${data.phone}</p>
      <p style="margin: 10px 0;"><strong>Email:</strong> ${data.email}</p>
      <p style="margin: 10px 0;"><strong>Event:</strong> ${data.eventType || data.subject || 'Wedding Inquiry'}</p>
      <p style="margin: 10px 0;"><strong>Date:</strong> ${data.preferredDate || data.eventDate || 'N/A'}</p>
      <p style="margin: 10px 0;"><strong>Location:</strong> ${data.location || data.venue || 'N/A'}</p>
      <p style="margin: 10px 0;"><strong>Message:</strong> ${data.message || 'None'}</p>
      
      <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid rgba(212,175,55,0.3);">
        <a href="tel:${data.phone}" style="background: #D4AF37; color: #081C15; padding: 10px 16px; text-decoration: none; font-weight: bold; border-radius: 6px; display: inline-block;">📞 Call Customer</a>
        <a href="https://wa.me/91${(data.phone || '').replace(/\D/g, '')}" style="background: #25D366; color: #FFF; padding: 10px 16px; text-decoration: none; font-weight: bold; border-radius: 6px; display: inline-block; margin-left: 10px;">💬 WhatsApp</a>
      </div>
    </div>
  `

  let resendSuccess = false
  let resendData = null

  // 1. Resend API Dispatch
  if (activeKey) {
    try {
      const resend = new Resend(activeKey)
      console.log(`[EMAIL SERVICE] Sending email via Resend to ${resendSandboxOwner}...`)
      
      const resendResult = await resend.emails.send({
        from: 'PB Photography <onboarding@resend.dev>',
        to: [resendSandboxOwner],
        subject: subject,
        text: textBody,
        html: htmlBody,
      })

      if (resendResult.data?.id || resendResult.id) {
        resendSuccess = true
        resendData = resendResult.data || resendResult
        console.log(`✓ [EMAIL SERVICE] Email sent successfully via Resend! ID:`, resendData.id)
      } else {
        console.warn(`⚠️ [EMAIL SERVICE] Resend returned notice:`, resendResult)
        resendData = resendResult
      }
    } catch (resendError) {
      console.error(`✗ [EMAIL SERVICE] Resend API failed:`, resendError.message)
    }
  }

  // 2. Direct Gmail SMTP Dispatch
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      console.log(`[EMAIL SERVICE] Sending direct email via Gmail SMTP to ${primaryRecipient}, ${secondaryRecipient}...`)
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      })

      const smtpResult = await transporter.sendMail({
        from: `"PB Photography" <${process.env.SMTP_USER}>`,
        to: [primaryRecipient, secondaryRecipient],
        subject: subject,
        text: textBody,
        html: htmlBody,
      })

      console.log(`✓ [EMAIL SERVICE] Email delivered via Gmail SMTP! MessageID:`, smtpResult.messageId)
      return { 
        success: true, 
        provider: resendSuccess ? 'resend' : 'smtp',
        resendKeyPrefix: keyPrefix,
        resendResponse: resendData,
        smtpMessageId: smtpResult.messageId
      }
    } catch (smtpError) {
      console.error(`✗ [EMAIL SERVICE] Gmail SMTP failed:`, smtpError.message)
      return { 
        success: resendSuccess, 
        provider: resendSuccess ? 'resend' : 'none',
        resendKeyPrefix: keyPrefix,
        resendResponse: resendData,
        error: smtpError.message 
      }
    }
  }

  return {
    success: resendSuccess,
    provider: resendSuccess ? 'resend' : 'none',
    resendKeyPrefix: keyPrefix,
    resendResponse: resendData
  }
}
