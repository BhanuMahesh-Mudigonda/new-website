import axios from 'axios'

/**
 * Format Indian 10-digit phone number to standard 91XXXXXXXXXX
 */
function formatPhoneNumber(phone) {
  if (!phone) return ''
  let cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 10) {
    return '91' + cleaned
  }
  if (cleaned.startsWith('0')) {
    cleaned = cleaned.substring(1)
  }
  if (cleaned.length === 10) {
    return '91' + cleaned
  }
  return cleaned
}

/**
 * Sends WhatsApp notification via Meta Cloud API / Callmebot fallback
 */
async function sendWhatsAppMessage(recipientPhone, textMessage) {
  const formattedPhone = formatPhoneNumber(recipientPhone)
  if (!formattedPhone) return { success: false, reason: 'Invalid phone number' }

  // 1. Meta Cloud API (Official Business Cloud API)
  const metaToken = process.env.WHATSAPP_ACCESS_TOKEN || process.env.META_WHATSAPP_TOKEN
  const metaPhoneId = process.env.WHATSAPP_PHONE_NUMBER_ID || process.env.META_PHONE_NUMBER_ID
  const apiVersion = process.env.WHATSAPP_VERSION || 'v18.0'

  if (metaToken && metaPhoneId && !metaToken.includes('YOUR_')) {
    try {
      const metaRes = await axios.post(
        `https://graph.facebook.com/${apiVersion}/${metaPhoneId}/messages`,
        {
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to: formattedPhone,
          type: 'text',
          text: { body: textMessage },
        },
        {
          headers: {
            Authorization: `Bearer ${metaToken}`,
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        }
      )
      console.log(`✓ Meta WhatsApp Cloud API sent to ${formattedPhone}:`, metaRes.data)
      return { success: true, provider: 'meta', data: metaRes.data }
    } catch (err) {
      console.warn(`⚠️ Meta WhatsApp Cloud API failed for ${formattedPhone}:`, err.response?.data || err.message)
    }
  }

  // 2. Callmebot Secondary Gateway Fallback
  const callmebotApiKey = process.env.CALLMEBOT_API_KEY
  if (callmebotApiKey) {
    try {
      const url = `https://api.callmebot.com/whatsapp.php?phone=${formattedPhone}&text=${encodeURIComponent(textMessage)}&apikey=${callmebotApiKey}`
      await axios.get(url, { timeout: 8000 })
      console.log(`✓ Callmebot WhatsApp sent to ${formattedPhone}`)
      return { success: true, provider: 'callmebot' }
    } catch (err) {
      console.warn(`⚠️ Callmebot WhatsApp failed for ${formattedPhone}:`, err.message)
    }
  }

  console.log(`ℹ️ WhatsApp API notification logged for ${formattedPhone}`)
  return { success: false, reason: 'Meta token verification in progress' }
}

/**
 * Dispatch booking notifications to Manager 1 (9642534945) and Manager 2 (8008360032)
 */
export async function sendWhatsAppNotification(data) {
  const manager1 = '919642534945'
  const manager2 = '918008360032'

  // Manager Message Payload
  const managerMsg = 
`📸 PB Photography

A new client inquiry has been received.

Customer: ${data.name}
Phone: ${data.phone}
Email: ${data.email}
Event: ${data.eventType || data.subject || 'Wedding Inquiry'}
Date: ${data.preferredDate || data.eventDate || 'N/A'}
Venue: ${data.location || data.venue || 'N/A'}
Message: ${data.message || 'No additional notes'}

Please contact the client immediately.`

  // Execute dispatches to Manager 1 and Manager 2
  const results = await Promise.allSettled([
    sendWhatsAppMessage(manager1, managerMsg),
    sendWhatsAppMessage(manager2, managerMsg)
  ])

  return {
    manager1Sent: results[0].status === 'fulfilled' && results[0].value.success,
    manager2Sent: results[1].status === 'fulfilled' && results[1].value.success
  }
}
