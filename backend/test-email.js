import './config/env.js';
import { sendNotificationEmail } from './services/emailService.js';

const details = {
  name: 'Test Name',
  phone: '1234567890',
  email: 'test@example.com',
  type: 'wedding',
  date: new Date(),
  location: 'Test Location',
  budget: '1000',
  message: 'Test message',
  ipAddress: '127.0.0.1'
};

async function test() {
  try {
    const result = await sendNotificationEmail(details, 'booking');
    console.log('Result:', result);
  } catch (error) {
    console.error('Error:', error);
  }
}

test();
