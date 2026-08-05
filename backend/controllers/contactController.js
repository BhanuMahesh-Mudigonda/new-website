import ContactRequest from '../models/ContactRequest.js'
import Customer from '../models/Customer.js'
import Notification from '../models/Notification.js'
import { sendNotificationEmail } from '../services/emailService.js'
import { sendWhatsAppNotification } from '../services/whatsappService.js'

export const createContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body

    // Server-side validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' })
    }

    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1'

    // 1. Store/Update Customer Document in 'customers' Collection
    if (phone) {
      let customer = await Customer.findOne({ email: email.toLowerCase().trim() })
      if (customer) {
        customer.phone = phone
        await customer.save()
      } else {
        await Customer.create({
          name,
          phone,
          email: email.toLowerCase().trim(),
          location: 'Vijayawada',
          totalBookings: 1
        })
      }
    }

    // 2. Store Contact Document in 'contactRequests' Collection
    const newContact = await ContactRequest.create({
      name,
      email: email.toLowerCase().trim(),
      phone: phone || 'Not provided',
      subject: subject || 'General Inquiry',
      message,
      ipAddress: clientIp,
      status: 'New Lead'
    })

    // 3. Store Real-Time Notification Document in 'notifications' Collection
    const notification = await Notification.create({
      type: 'NEW_CONTACT',
      title: '🔴 New Contact Inquiry',
      customerName: name,
      phone: phone || 'N/A',
      email: email,
      eventType: subject || 'General Inquiry',
      message: message,
      read: false
    })

    // 4. Send Email & WhatsApp Notifications
    const emailResult = await sendNotificationEmail({
      name,
      email,
      phone: phone || '',
      eventType: subject || 'General Inquiry',
      message
    })

    const whatsappResult = await sendWhatsAppNotification({
      name,
      email,
      phone: phone || '',
      eventType: subject || 'General Inquiry',
      message
    })

    return res.status(201).json({
      message: 'Contact inquiry received successfully!',
      contact: newContact,
      notificationId: notification._id,
      notifications: {
        emailSent: emailResult.success,
        whatsapp: whatsappResult
      }
    })
  } catch (error) {
    console.error('Error creating contact inquiry:', error)
    return res.status(500).json({ error: 'Failed to record inquiry. Please try again.' })
  }
}

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await ContactRequest.find().sort({ createdAt: -1 })
    return res.json(contacts)
  } catch (error) {
    console.error('Error fetching contacts:', error)
    return res.status(500).json({ error: 'Failed to fetch contacts' })
  }
}
