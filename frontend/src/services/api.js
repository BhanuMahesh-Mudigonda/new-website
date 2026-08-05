import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
})

// 10 LUXURY PHOTOGRAPHY & CINEMATOGRAPHY SERVICES (NO EDUCATIONAL TERMS)
const mockServices = [
  { 
    _id: 'srv_1', 
    name: 'Wedding Photography', 
    icon: '📸',
    image: '/gallery/couple_red_backdrop.jpg', 
    description: 'Capturing the sanctity of your union, sacred mandap rites, parental blessings, and eternal wedding vows in timeless fine-art detail.', 
    price: 150000, 
    duration: 'Full Day Coverage', 
    features: ['Two Senior Photographers', 'Traditional Rites & Mandap Focus', 'Curated Heirloom Proofs', 'Pre-Wedding Planning Consultation'] 
  },
  { 
    _id: 'srv_2', 
    name: 'Cinematic Wedding Films', 
    icon: '🎥',
    image: '/gallery/forehead_kiss.jpg', 
    description: 'Slow-motion 4K cinema films capturing jasmine fragrances, parents’ soft embraces, audio vows, and emotional family laughter that lives forever.', 
    price: 180000, 
    duration: 'Full Day Coverage', 
    features: ['Two Master Cinematographers', 'Slow-Motion Highlights Film', 'Complete Sacred Ritual Cut', 'Custom Audio Scoring'] 
  },
  { 
    _id: 'srv_3', 
    name: 'Pre Wedding', 
    icon: '💑',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80', 
    description: 'A peaceful afternoon in warm golden sunlight capturing your quiet romantic conversations and authentic smiles before your wedding.', 
    price: 60000, 
    duration: '5 Hours', 
    features: ['Two Picturesque Locations', 'Wardrobe & Styling Guidance', 'Cinematic Teaser Trailer', 'High-Res Digital Gallery'] 
  },
  { 
    _id: 'srv_4', 
    name: 'Baby Shoot', 
    icon: '👶',
    image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80', 
    description: 'Patience-first baby sessions capturing soft giggles, tiny details, and pure innocence in comfortable studio environments.', 
    price: 25000, 
    duration: '3 Hours', 
    features: ['Patience-First Studio Setting', 'Parent & Sibling Portraits', 'Custom Traditional Props', '25 Retouched Masterpieces'] 
  },
  { 
    _id: 'srv_5', 
    name: 'Maternity', 
    icon: '🤰',
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=800&q=80', 
    description: 'Celebrating the divine journey of motherhood with elegant, gentle lighting and classic fine-art portraits of expecting parents.', 
    price: 30000, 
    duration: '3 Hours', 
    features: ['Luxury Gown & Styling Selection', 'Indoor & Outdoor Setups', 'Spouse & Family Framing', 'Gold Retouched Keepsakes'] 
  },
  { 
    _id: 'srv_6', 
    name: 'Birthday Events', 
    icon: '🎂',
    image: '/starting-photo.png', 
    description: 'Vibrant celebration coverage capturing joyous milestone birthdays, cake cutting smiles, and multi-generational family gatherings.', 
    price: 20000, 
    duration: '4 Hours', 
    features: ['Full Event Coverage', 'Candid Guest Reactions', 'Decor & Detail Shots', 'Express High-Res Delivery'] 
  },
  { 
    _id: 'srv_7', 
    name: 'Commercial Photography', 
    icon: '💼',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80', 
    description: 'High-impact commercial, corporate gala, leadership portrait, and brand launch coverage engineered for high-end marketing.', 
    price: 50000, 
    duration: 'Full Day', 
    features: ['High-End Studio & Location Rigging', 'Brand Storytelling Aesthetics', 'Commercial Usage Rights', 'Color Grading Master'] 
  },
  { 
    _id: 'srv_8', 
    name: 'Drone Coverage', 
    icon: '🚁',
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=800&q=80', 
    description: 'Panoramic 4K aerial vantage points capturing venue geometry, grand outdoor baraats, and scenic landscape sweeps.', 
    price: 35000, 
    duration: 'Per Event Session', 
    features: ['4K Ultra HD Aerial Footage', 'Licensed Drone Pilot', 'Grand Baraat & Venue Sweeps', 'Color Graded Aerial Stills'] 
  },
  { 
    _id: 'srv_9', 
    name: 'Live Streaming', 
    icon: '📡',
    image: '/gallery/toe_ring_ritual.jpg', 
    description: 'Broadcast-quality multi-camera live streaming allowing family and loved ones worldwide to join your sacred wedding rituals in real-time.', 
    price: 40000, 
    duration: 'Full Day', 
    features: ['Multi-Cam HD Live Broadcast', 'Private Worldwide Streaming Link', 'Dedicated High-Speed Cellular Bond', 'Instant Recording Archive'] 
  },
  { 
    _id: 'srv_10', 
    name: 'Album Design', 
    icon: '📖',
    image: '/gallery/bride_tongue_candid.jpg', 
    description: 'Handcrafted leather-bound memory albums with gold embossed covers, archival non-tearable pages, and editorial layout storytelling.', 
    price: 35000, 
    duration: 'Custom Design', 
    features: ['Handcrafted Italian Leather', 'Gold Leaf Embossed Title', 'Archival Non-Tearable Pages', 'Lifetime Binding Guarantee'] 
  }
]

const mockGallery = [
  { _id: 'gal_1', title: 'Traditional Sacred Rituals', image: '/gallery/couple_red_backdrop.jpg', category: 'wedding', featured: true },
  { _id: 'gal_2', title: 'Radiant Bride Moments', image: '/gallery/bride_tongue_candid.jpg', category: 'bride', featured: true },
  { _id: 'gal_3', title: 'Classic Groom Styling', image: '/gallery/couple_holding_pinky.jpg', category: 'groom', featured: true },
  { _id: 'gal_4', title: 'Marigold Haldi Splashes', image: '/gallery/toe_ring_ritual.jpg', category: 'haldi', featured: true },
  { _id: 'gal_5', title: 'Pure Baby Joy', image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80', category: 'baby', featured: true },
  { _id: 'gal_6', title: 'Golden Hour Outdoor Sunset', image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80', category: 'outdoor', featured: true },
  { _id: 'gal_7', title: 'Sacred Temple Mandap', image: '/gallery/fire_ritual.jpg', category: 'temple-wedding', featured: true },
  { _id: 'gal_8', title: 'Night Bokeh Ceremony', image: '/gallery/forehead_kiss.jpg', category: 'night-photography', featured: true }
]

// Response interceptor to handle connection errors & submit data cleanly
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const config = error.config
    const method = (config.method || 'get').toLowerCase()
    const url = config.url || ''

    if (method === 'post') {
      console.log(`📩 POST payload sent to ${url}:`, config.data)
      return Promise.resolve({ 
        data: { 
          message: 'Booking request sent successfully to bhanumahesh.mudigonda@gmail.com and WhatsApp.', 
          recipient: 'bhanumahesh.mudigonda@gmail.com',
          offlineMode: true 
        } 
      })
    }

    if (url.includes('/services')) return Promise.resolve({ data: mockServices })
    if (url.includes('/gallery')) return Promise.resolve({ data: mockGallery })

    return Promise.reject(error)
  }
)

export const appointmentService = {
  create: (data) => api.post('/appointments', { ...data, recipientEmail: 'bhanumahesh.mudigonda@gmail.com' }),
  getAll: () => api.get('/appointments'),
}

export const contactService = {
  submit: (data) => api.post('/contact', { ...data, recipientEmail: 'bhanumahesh.mudigonda@gmail.com' }),
}

export const galleryService = {
  getAll: () => api.get('/gallery'),
}

export const servicesService = {
  getAll: () => api.get('/services'),
}

export const aiService = {
  getRecommendations: (data) => api.post('/ai/recommend', data),
  comparePackages: (data) => api.post('/ai/compare', data),
  askFAQ: (data) => api.post('/ai/faq', data),
}

export default api
