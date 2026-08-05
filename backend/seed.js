import './config/env.js'
import mongoose from 'mongoose'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import Service from './models/Service.js'
import Gallery from './models/Gallery.js'
import Event from './models/Event.js'
import Album from './models/Album.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const LOCAL_DB_PATH = path.join(__dirname, 'data/local_db.json')
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pb-photography'

const servicesData = [
  {
    name: 'Sacred Wedding Stories',
    image: '/gallery/couple_red_backdrop.jpg',
    description: 'Capturing the pure sanctity of your union, from the soft morning temple bells to the emotional tears of parents and the sacred tie of the Mangalsutra.',
    price: 150000,
    duration: '8-10 Hours',
    features: ['Two Senior Photographers', 'Heritage Style Storytelling', 'Curated Heirloom Proofs', 'Pre-Wedding Consultation']
  },
  {
    name: 'Traditional Ceremony Stories',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
    description: 'Documenting the timeless rituals, vibrant marigold details, and Telugu customs with deep respect for ancestral warmth and heritage.',
    price: 50000,
    duration: 'Full Day Coverage',
    features: ['Cultural Custom Focus', 'Classical Heritage Portraits', 'Printed Keepsake Proof Book', 'All Sacred Ceremonies']
  },
  {
    name: 'Candid Moments & Emotions',
    image: '/gallery/bride_tongue_candid.jpg',
    description: 'Unobtrusive, documentary-style photography capturing fleeting glances, natural smiles, and raw, quiet emotions as they happen.',
    price: 75000,
    duration: '6-8 Hours',
    features: ['Documentary Style Coverage', 'Artistic Retouched Highlights', 'Natural Light Storytelling', 'Digital Heirloom Archive']
  },
  {
    name: 'Films That Keep Memories Alive',
    image: '/gallery/forehead_kiss.jpg',
    description: 'Slow-motion 4K cinematic wedding films capturing the fragrance of jasmine, parents’ soft blessings, and family laughter that lives forever.',
    price: 180000,
    duration: 'Full Day Coverage',
    features: ['Two Cinematographers', 'Slow-Motion Highlights Reel', 'Complete Sacred Ritual Film', 'Custom Sound Design']
  },
  {
    name: 'Generations Together',
    image: '/starting-photo.png',
    description: 'Preserving the laughter, warm embraces, and quiet wisdom of your family reunions so they remain an heirloom for generations to come.',
    price: 15000,
    duration: '2 Hours',
    features: ['Multi-Generational Sessions', 'Location Design Coaching', 'Classic Fine-Art Composites', 'Heirloom Printing Discounts']
  },
  {
    name: 'Little Moments of Joy',
    image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80',
    description: 'Delicate, patience-first baby sessions capturing soft giggles, tiny details, and pure innocence in comfortable settings.',
    price: 25000,
    duration: '3 Hours',
    features: ['Patience-First Studio Setting', 'Parent & Sibling Portraits', 'Custom Traditional Props', '25 Retouched Masterpieces']
  },
  {
    name: 'Romantic Journeys (Pre-Wedding)',
    image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80',
    description: 'A peaceful afternoon in warm golden sunlight capturing your quiet conversations and authentic, natural smiles before your wedding.',
    price: 60000,
    duration: '5 Hours',
    features: ['Two Picturesque Locations', 'Wardrobe & Style Guidance', 'Cinematic Portrait Selection', 'Storytelling Teaser Frame']
  }
]

const galleryData = [
  {
    title: 'Bride Portrait — Silk Saree',
    image: '/gallery/bride_prep.jpg',
    category: 'wedding',
    description: 'Classic Telugu bridal portrait highlighting traditional gold jewelry and silk saree.',
    featured: true
  },
  {
    title: 'Couple Portrait — The Eternal Gaze',
    image: '/gallery/couple_red_backdrop.jpg',
    category: 'wedding',
    description: 'Luminous portrait of bride and groom sharing a smile during the wedding rituals.',
    featured: true
  },
  {
    title: 'Sacred Ritual — Mangalsutra Muhurtham',
    image: '/gallery/hands_holding_coconut.jpg',
    category: 'traditional',
    description: 'Intimate capture of the auspicious Mangalsutra tying ceremony.',
    featured: true
  },
  {
    title: 'Telugu Heritage Bride',
    image: '/gallery/bride_bangles.jpg',
    category: 'wedding',
    description: 'Telugu bridal glow in traditional attire.',
    featured: false
  },
  {
    title: 'Mandap Ceremony',
    image: '/gallery/talambralu.jpg',
    category: 'wedding',
    description: 'Mandap setup under soft floral decorations.',
    featured: false
  },
  {
    title: 'Sacred Haldi Splendor',
    image: '/gallery/pouring_water.jpg',
    category: 'traditional',
    description: 'Joyous traditional Haldi ceremony splashed in warm golden yellow hues.',
    featured: true
  },
  {
    title: 'The Art of Mehendi',
    image: '/gallery/henna_palms.jpg',
    category: 'traditional',
    description: 'Close up detail of intricate traditional bridal mehendi patterns.',
    featured: false
  },
  {
    title: 'Romantic Journeys (Pre-Wedding)',
    image: '/gallery/couple_holding_hands.jpg',
    category: 'pre-wedding',
    description: 'A peaceful afternoon in warm golden sunlight capturing quiet conversations.',
    featured: true
  },
  {
    title: 'Golden Hour Embrace',
    image: '/gallery/couple_holding_pinky.jpg',
    category: 'pre-wedding',
    description: 'Romantic outdoor pre-wedding couple portrait captured in warm sunset rays.',
    featured: true
  },
  {
    title: 'Outdoor Pre-Wedding Editorial',
    image: '/gallery/foot_on_stone.jpg',
    category: 'pre-wedding',
    description: 'Couple walking along the scenic landscape.',
    featured: false
  },
  {
    title: 'Candid Laughter',
    image: '/gallery/bride_tongue_candid.jpg',
    category: 'candid',
    description: 'Pure, authentic laughter captured during Telugu wedding customs.',
    featured: true
  },
  {
    title: 'Family Candid Celebrations',
    image: '/gallery/toe_ring_ritual.jpg',
    category: 'candid',
    description: 'Unscripted family smiles full of life and warmth.',
    featured: false
  },
  {
    title: 'Sunset Family Portrait',
    image: 'starting-photo.png',
    category: 'family',
    description: 'Beautiful sunset family silhouette portrait capturing raw emotion.',
    featured: true
  },
  {
    title: 'Generations Together',
    image: '/gallery/bride_henna_hands.jpg',
    category: 'family',
    description: 'Warm outdoor family portrait capturing multi-generational union.',
    featured: false
  },
  {
    title: 'Baby Shoot — Studio Light',
    image: '/gallery/henna_feet.jpg',
    category: 'baby',
    description: 'Artistic baby shoot styled with soft props and warm background glows.',
    featured: true
  },
  {
    title: 'Newborn Precious Moments',
    image: '/gallery/henna_ring.jpg',
    category: 'baby',
    description: 'Delicate close-up newborn baby shoot.',
    featured: false
  },
  {
    title: 'Drone View of Wedding Venue',
    image: '/gallery/fire_ritual.jpg',
    category: 'drone',
    description: 'Spectacular aerial perspective of traditional heritage resort.',
    featured: true
  },
  {
    title: 'Resort Mandap Drone Landscape',
    image: '/gallery/foot_on_rice.jpg',
    category: 'drone',
    description: 'Wide aerial sweep of outdoor wedding scenery.',
    featured: false
  },
  {
    title: 'Cinematic Storytelling Highlight',
    image: 'starting-photo.png',
    category: 'cinematic',
    description: 'Stunning frame from our cinematic Telugu wedding films.',
    featured: true
  },
  {
    title: 'Dramatic Light Temple Portrait',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
    category: 'cinematic',
    description: 'Intimate couple portrait at a historic temple backdrop.',
    featured: false
  }
]

const eventsData = [
  {
    title: 'Luxe Bridal Showcase 2026',
    date: new Date('2026-08-15'),
    type: 'Exhibition',
    location: 'PB Photography Studio, Vijayawada, AP, India',
    description: 'A curated visual showcase of our premium wedding films and customized album designs.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Fine-Art Portrait Workshop',
    date: new Date('2026-09-10'),
    type: 'Workshop',
    location: 'PB Photography Studio, Vijayawada',
    description: 'Learn the nuances of candid lighting, storytelling postures, and traditional styling.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Client Appreciation Evening',
    date: new Date('2026-10-05'),
    type: 'Gala Dinner',
    location: 'Crystal Ballroom, Vijayawada',
    description: 'An elegant evening celebrating our patrons with high-quality prints and live jazz.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80'
  }
]

const albumsData = [
  {
    title: 'Traditional Indian Elegance',
    description: 'A rich leather-bound album reflecting the deep colors and emotions of Indian rituals.',
    coverImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
    date: new Date('2026-04-15'),
    photoCount: 450,
    photos: [
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    title: 'Whispering Winds Candid Collection',
    description: 'Custom fine-art photo book displaying unscripted laughs, tears, and spontaneous embraces.',
    coverImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
    date: new Date('2026-05-20'),
    photoCount: 280,
    photos: [
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1492681290082-e932832941e6?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    title: 'The Modern Editorial Portrait Folio',
    description: 'Gold-leafed layout portfolio showcasing fashion-driven portraiture and studio work.',
    coverImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    date: new Date('2026-06-10'),
    photoCount: 150,
    photos: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80'
    ]
  }
]

const seedDatabase = async () => {
  try {
    console.log('🌱 Seeding database...');

    // 1. Seed the local JSON fallback file database
    console.log('✓ Seeding local database JSON file fallback...');
    const dir = path.dirname(LOCAL_DB_PATH)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    const localDbStructure = {
      services: servicesData.map((s, idx) => ({ ...s, _id: `srv_${idx + 1}`, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() })),
      gallery: galleryData.map((g, idx) => ({ ...g, _id: `gal_${idx + 1}`, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() })),
      events: eventsData.map((e, idx) => ({ ...e, _id: `evt_${idx + 1}`, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() })),
      albums: albumsData.map((a, idx) => ({ ...a, _id: `alb_${idx + 1}`, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() })),
      appointments: [],
      contacts: []
    }
    fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(localDbStructure, null, 2))
    console.log('✓ Local database JSON file fallback seeded successfully!')

    // 2. Try seeding MongoDB if it is reachable
    console.log(`✓ Connecting to MongoDB at ${MONGODB_URI}...`)
    
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 3000,
    })
    console.log('✓ Connected to MongoDB')

    // Clear existing data
    await Service.deleteMany({})
    await Gallery.deleteMany({})
    await Event.deleteMany({})
    await Album.deleteMany({})
    console.log('✓ Cleared existing MongoDB collections')

    // Seed MongoDB
    const services = await Service.insertMany(servicesData)
    console.log(`✓ Added ${services.length} services to MongoDB`)

    const gallery = await Gallery.insertMany(galleryData)
    console.log(`✓ Added ${gallery.length} gallery items to MongoDB`)

    const events = await Event.insertMany(eventsData)
    console.log(`✓ Added ${events.length} events to MongoDB`)

    const albums = await Album.insertMany(albumsData)
    console.log(`✓ Added ${albums.length} albums to MongoDB`)

    console.log('✅ MongoDB database seeding completed successfully!')
    process.exit(0)
  } catch (error) {
    console.log(`⚠️  MongoDB connection failed: ${error.message}. Database seeding skipped. Fallback JSON database is ready.`)
    process.exit(0)
  }
}

seedDatabase()
