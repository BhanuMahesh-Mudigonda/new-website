import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '../.env') })

const activeResendKey = process.env.RESEND_API_KEY || ''

const keyPrefix = activeResendKey && activeResendKey.length >= 8 
  ? `${activeResendKey.slice(0, 8)}...` 
  : 'NOT_CONFIGURED'

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
console.log('🔍 PB PHOTOGRAPHY BACKEND — Server Startup Audit')
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
console.log(`Loaded Resend API Key: ${keyPrefix}`)
console.log(`Primary Recipient: ${process.env.OWNER_EMAIL || 'pbvideography.0032@gmail.com'}`)
console.log(`Secondary Recipient: pbphotography0032@gmail.com`)
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
