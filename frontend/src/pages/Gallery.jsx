import { useEffect, useRef, useState, useMemo } from 'react'
import { PageTransition } from '../components/MotionWrapper'
import { galleryService } from '../services/api'
import './Gallery.css'

/* ─────────────────────────────────────────────
   PORTFOLIO DATABASE (Static fallbacks)
   Using the user's actual 5 wedding images
   WITHOUT disturbing them or mixing them in others.
───────────────────────────────────────────── */
const WEDDING_MASTER_PHOTOS = [
  {
    _id: 'couple_red_backdrop',
    title: 'Hero Couple Portrait',
    image: '/gallery/couple_red_backdrop.jpg',
    description: 'Smiling couple with Tirunamam backdrop.',
    tags: 'bride, groom, couple, wedding, red, background, backdrop, flower, garlands, smiles, gold, jewellery, traditional, marriage, portrait'
  },
  {
    _id: 'bride_tongue_candid',
    title: 'Candid Joy',
    image: '/gallery/bride_tongue_candid.jpg',
    description: 'A candid, joyful moment of the bride.',
    tags: 'bride, candid, tongue, fun, laugh, smile, girl, face, happiness, wedding, jewellery, nose ring, eyes'
  },
  {
    _id: 'toe_ring_ritual',
    title: 'Wearing Toe Rings',
    image: '/gallery/toe_ring_ritual.jpg',
    description: 'Sacred ritual of wearing toe rings.',
    tags: 'toe, rings, foot, feet, ritual, ceremony, groom, bride, hands, silver, gold, traditional, wedding, custom'
  },
  {
    _id: 'couple_holding_pinky',
    title: 'Emotional Moment',
    image: '/gallery/couple_holding_pinky.jpg',
    description: 'The couple share an intimate, emotional moment.',
    tags: 'pinky, finger, hand, hold, love, couple, emotional, wedding, traditional, bride, groom, promise, sacred'
  },
  {
    _id: 'forehead_kiss',
    title: 'Grand Couple Portrait',
    image: '/gallery/forehead_kiss.jpg',
    description: 'A timeless forehead kiss grand portrait.',
    tags: 'kiss, forehead, love, bride, groom, couple, wedding, emotional, closeness, romance, smile, portrait'
  }
]

/* ─────────────────────────────────────────────
   DIVERSE CATEGORY DATA (10 Breathtaking Photos each)
   Using curated Unsplash links so it doesn't repeat
   wedding ceremony photos.
───────────────────────────────────────────── */
const CATEGORIES_DATA = {
  'pre-wedding': [
    { _id: 'pw1', title: 'The Golden Embrace', image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80', description: 'A warm hug in the golden sunset glow.', tags: 'couple, pre-wedding, sunset, hug, love, outdoor, romantic' },
    { _id: 'pw2', title: 'Forest Pathway', image: 'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?auto=format&fit=crop&w=800&q=80', description: 'Walking together along a quiet forest lane.', tags: 'couple, walk, forest, woods, hands, green' },
    { _id: 'pw3', title: 'The Gaze of Love', image: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=800&q=80', description: 'Luminous pre-wedding gaze in warm light.', tags: 'gaze, look, portrait, couple, romantic, smile' },
    { _id: 'pw4', title: 'Lakeside Serenade', image: 'https://images.unsplash.com/photo-1464746133101-a2c3f88e0dd9?auto=format&fit=crop&w=800&q=80', description: 'Quiet conversations beside the tranquil lake.', tags: 'lake, water, blue, couple, hug, look' },
    { _id: 'pw5', title: 'Sunset Silhouette', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', description: 'Beautiful pre-wedding portrait on the beach.', tags: 'beach, sunset, silhouette, couple, romantic' },
    { _id: 'pw6', title: 'Picnic Conversations', image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=80', description: 'Cozy picnic date in the countryside.', tags: 'picnic, couple, sit, green, laugh, fun' },
    { _id: 'pw7', title: 'The Warmest Smile', image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80', description: 'Joyful expressions captured during golden hour.', tags: 'smile, happy, couple, love, portrait' },
    { _id: 'pw8', title: 'Holding Close', image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80', description: 'Soft whispers and warm embraces.', tags: 'hug, close, couple, indoor, portrait' },
    { _id: 'pw9', title: 'Walking Away Hand in Hand', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80', description: 'Walking into a beautiful new chapter.', tags: 'walk, back, hands, field, sun' },
    { _id: 'pw10', title: 'Golden Hour Embrace', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80', description: 'Beautiful embrace captured in golden rays.', tags: 'couple, pre-wedding, love, sunset, hug' }
  ],
  candid: [
    { _id: 'cd1', title: 'Laughter at the Mandap', image: 'https://images.unsplash.com/photo-1517355393900-0ab3e3bf7a25?auto=format&fit=crop&w=800&q=80', description: 'Pure, authentic laughter during rituals.', tags: 'candid, laugh, smile, bride, fun, happy' },
    { _id: 'cd2', title: 'Shared Glances', image: 'https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?auto=format&fit=crop&w=800&q=80', description: 'Unscripted smiles captured from a distance.', tags: 'candid, smile, lookup, happy, girl' },
    { _id: 'cd3', title: 'A Tear of Joy', image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80', description: 'Soft emotional tears of happiness.', tags: 'tear, emotional, sad, happy, look, candid' },
    { _id: 'cd4', title: 'Spontaneous Embraces', image: 'https://images.unsplash.com/photo-1488751045188-3c55bbf9a3fa?auto=format&fit=crop&w=800&q=80', description: 'Unrehearsed warmth between two souls.', tags: 'hug, couple, smile, hands, candid' },
    { _id: 'cd5', title: 'Quiet Whispers', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80', description: 'Spontaneous sharing of whispers.', tags: 'whisper, couple, look, close, candid' },
    { _id: 'cd6', title: 'Glimpse of Beauty', image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80', description: 'Looking up with an authentic gaze.', tags: 'look, eyes, face, girl, candid' },
    { _id: 'cd7', title: 'Joyous Cheers', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80', description: 'Laughing and celebrating with friends.', tags: 'dance, happy, group, friends, candid' },
    { _id: 'cd8', title: 'The Sparklers Exit', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80', description: 'Walking hand in hand through warm sparklers.', tags: 'sparkler, night, exit, couple, walk, happy' },
    { _id: 'cd9', title: 'Mandap Blessings', image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80', description: 'Intimate smile shared during rites.', tags: 'bride, groom, wedding, smile, candid' },
    { _id: 'cd10', title: 'Emotional Blessing', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80', description: 'A warm emotional hug between mother and bride.', tags: 'mother, daughter, hug, cry, emotional, candid' }
  ],
  family: [
    { _id: 'fm1', title: 'Blessings of Elders', image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=800&q=80', description: 'Elders placing hands on the couple.', tags: 'family, parents, elder, blessing, hands, wedding' },
    { _id: 'fm2', title: 'Laughter at Dinner', image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80', description: 'Warm family dinner captured with natural smiles.', tags: 'family, dinner, laugh, table, group, home' },
    { _id: 'fm3', title: 'Generations of Love', image: 'https://images.unsplash.com/photo-1609234656388-0ff363383899?auto=format&fit=crop&w=800&q=80', description: 'Grandparents, parents and children portrait.', tags: 'generations, family, group, outdoor, happy' },
    { _id: 'fm4', title: 'The Auspicious Haldi', image: 'https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&w=800&q=80', description: 'Family smeared in haldi yellow color.', tags: 'haldi, yellow, family, ceremony, laugh, fun' },
    { _id: 'fm5', title: 'Warm Outdoor Shoot', image: 'https://images.unsplash.com/photo-1484807352052-23338990c6c6?auto=format&fit=crop&w=800&q=80', description: 'A beautiful outdoor walk with children.', tags: 'kids, family, outdoor, field, walk, smile' },
    { _id: 'fm6', title: 'A Grandmas Warmth', image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=80', description: 'Grandma sharing warm smiles with the bride.', tags: 'grandma, bride, old, young, hug, smile' },
    { _id: 'fm7', title: 'Sisterly Affection', image: 'https://images.unsplash.com/photo-1498673394965-85cb14905c89?auto=format&fit=crop&w=800&q=80', description: 'Sisters sharing a lighthearted moment.', tags: 'sisters, siblings, girl, laugh, family' },
    { _id: 'fm8', title: 'Sunset Family Walk', image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80', description: 'A warm sunset walk along the beach.', tags: 'sunset, walk, beach, parents, kids, family' },
    { _id: 'fm9', title: 'Picnic Fun', image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=80', description: 'Outdoor picnic with family.', tags: 'picnic, outdoor, parents, child, family' },
    { _id: 'fm10', title: 'Sparkling Reunion', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80', description: 'Laughter and dancing with cousins.', tags: 'cousins, dance, reunion, party, family' }
  ],
  'baby-shoot': [
    { _id: 'bb1', title: 'Tiny Little Hands', image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=800&q=80', description: 'Soft focus newborn baby hands.', tags: 'baby, hands, tiny, fingers, newborn' },
    { _id: 'bb2', title: 'Sleeping Angel', image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80', description: 'A peaceful sleepy newborn baby.', tags: 'sleep, newborn, wrap, baby, quiet' },
    { _id: 'bb3', title: 'Smiling Angel', image: 'https://images.unsplash.com/photo-1537673172765-a45f94088892?auto=format&fit=crop&w=800&q=80', description: 'Cute baby looking up with sweet eyes.', tags: 'baby, look, smile, child' },
    { _id: 'bb4', title: 'Playful Giggles', image: 'https://images.unsplash.com/photo-1491013516836-7db643ee125a?auto=format&fit=crop&w=800&q=80', description: 'Toddler laughing and giggling.', tags: 'giggle, laugh, baby, kid' },
    { _id: 'bb5', title: 'Soft Little Feet', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80', description: 'Mother holding tiny soft baby feet.', tags: 'feet, tiny, toes, baby, mom, hold' },
    { _id: 'bb6', title: 'Toddler Joy', image: 'https://images.unsplash.com/photo-1515488042361-404e9250afef?auto=format&fit=crop&w=800&q=80', description: 'Playful toddler enjoying baby toys.', tags: 'play, toddler, toys, happy, child' },
    { _id: 'bb7', title: 'Pure Innocent Eyes', image: 'https://images.unsplash.com/photo-1505816014357-96b5ff457e9a?auto=format&fit=crop&w=800&q=80', description: 'Close-up portrait of baby looking with curious eyes.', tags: 'eyes, face, look, newborn, baby' },
    { _id: 'bb8', title: 'Mothers Care', image: 'https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?auto=format&fit=crop&w=800&q=80', description: 'Mother gently holding her baby.', tags: 'mother, child, baby, hug, care' },
    { _id: 'bb9', title: 'Little Explorer', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80', description: 'Smiling toddler exploring outdoors.', tags: 'smile, happy, baby, kid, walk' },
    { _id: 'bb10', title: 'Innocent Look', image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80', description: 'Newborn baby looking with soft expressions.', tags: 'baby, look, wrap, newborn' }
  ],
  drone: [
    { _id: 'dr1', title: 'Mandap Top View', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80', description: 'A scenic resort and mandap from high above.', tags: 'drone, mandap, venue, aerial, resort, pool' },
    { _id: 'dr2', title: 'Winding Road Couple', image: 'https://images.unsplash.com/photo-1527576539890-dfa815648363?auto=format&fit=crop&w=800&q=80', description: 'Couple walking along the scenic winding pathway.', tags: 'road, winding, couple, walk, drone, aerial' },
    { _id: 'dr3', title: 'Resort Overview', image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80', description: 'Beautiful drone layout of the outdoor wedding resort.', tags: 'pool, resort, drone, overview, resort, green' },
    { _id: 'dr4', title: 'Beach Wedding Venue', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', description: 'Overhead view of beachside wedding setup.', tags: 'beach, coast, drone, aerial, ocean, sand' },
    { _id: 'dr5', title: 'Green Forest Canopy', image: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80', description: 'Forest canopy views from above.', tags: 'forest, canopy, green, trees, drone, landscape' },
    { _id: 'dr6', title: 'Elegant Mandap Geometry', image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80', description: 'A clean geometrical view of the floral mandap.', tags: 'mandap, flowers, drone, top, view' },
    { _id: 'dr7', title: 'Resort Garden Pathway', image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80', description: 'Wide sweep of the lush garden lawns.', tags: 'lawns, resort, grass, drone, view' },
    { _id: 'dr8', title: 'Majestic Mountain Landscape', image: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=800&q=80', description: 'Spectacular mountain peaks overview.', tags: 'mountains, peaks, drone, scenery' },
    { _id: 'dr9', title: 'Sunset Coastline', image: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=800&q=80', description: 'Top view of gentle waves rolling onto the sand.', tags: 'waves, ocean, coast, sunset, drone' },
    { _id: 'dr10', title: 'City Lights Aerial', image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=800&q=80', description: 'Panoramic evening drone view.', tags: 'city, evening, lights, drone' }
  ],
  cinematic: [
    { _id: 'cn1', title: 'Cinematic Mirror reflection', image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80', description: 'Intimate mirror frame reflecting emotional gaze.', tags: 'reflection, mirror, cinematic, gaze, couple, film' },
    { _id: 'cn2', title: 'Bokeh Highlight', image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80', description: 'Soft focus lens flare with bokeh highlight.', tags: 'bokeh, flare, lens, light, cinematic' },
    { _id: 'cn3', title: 'Widescreen Romantic Walk', image: 'https://images.unsplash.com/photo-1464746133101-a2c3f88e0dd9?auto=format&fit=crop&w=800&q=80', description: 'Beautiful widescreen composition of the couple.', tags: 'couple, walk, landscape, scenic, cinematic' },
    { _id: 'cn4', title: 'Soft Lens Flare', image: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&w=800&q=80', description: 'Golden hour flares around the couple.', tags: 'flare, sun, couple, cinematic' },
    { _id: 'cn5', title: 'Emotional Close-up', image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80', description: 'Extreme close up capturing facial details.', tags: 'eyes, face, look, emotion, cinematic' },
    { _id: 'cn6', title: 'Sparkler Bokeh', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80', description: 'Walking through a tunnel of sparklers.', tags: 'sparkler, night, walk, cinematic' },
    { _id: 'cn7', title: 'Slow Motion Smoke Effect', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80', description: 'A dramatic smoke effect backdrop.', tags: 'smoke, couple, walk, dramatic, cinematic' },
    { _id: 'cn8', title: 'Raindrop Lighting', image: 'https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2?auto=format&fit=crop&w=800&q=80', description: 'Reflecting lights through fresh raindrops.', tags: 'rain, water, lights, cinematic' },
    { _id: 'cn9', title: 'Sunset Kiss Silhouette', image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80', description: 'Intimate couple silhouette against the orange sky.', tags: 'kiss, sunset, silhouette, couple, cinematic' },
    { _id: 'cn10', title: 'Cinematic Widescreen Walk', image: 'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?auto=format&fit=crop&w=800&q=80', description: 'Widescreen cinematic composition of the couple walking.', tags: 'couple, walk, widescreen, forest, cinematic' }
  ]
}

/* ─────────────────────────────────────────────
   SCROLL-REVEAL HOOK
───────────────────────────────────────────── */
function useReveal() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.05 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return [ref, visible]
}

/* ─────────────────────────────────────────────
   MINIMAL ENGLISH HEADERS FOR CATEGORIES
   (No Telugu text, clean and professional)
───────────────────────────────────────────── */
const MINI_HEADERS = {
  'pre-wedding': 'Quiet conversations in golden hour rays.',
  candid: 'Fleeting moments caught in beautiful frames.',
  family: 'Laughter, joy, and generations of love.',
  'baby-shoot': 'Purity, innocence, and small details of life.',
  drone: 'Aerial perspective of celebrations and landscapes.',
  cinematic: 'Motion pictures capturing your sweet story.'
}

function CategoryHeaderMini({ catKey }) {
  const [ref, visible] = useReveal()
  const heading = MINI_HEADERS[catKey]
  const title = catKey.replace('-', ' ').toUpperCase()
  if (!heading) return null
  return (
    <div ref={ref} className={`cat-header-mini ${visible ? 'ch-visible' : ''}`}>
      <span className="ch-ornament">✦</span>
      <h3 className="ch-title">{title}</h3>
      <p className="ch-subtitle">"{heading}"</p>
      <div className="ch-line" />
    </div>
  )
}

/* ─────────────────────────────────────────────
   PHOTO CARD FOR GRIDS
───────────────────────────────────────────── */
function PhotoCard({ item, index, onOpen }) {
  const [ref, visible] = useReveal()
  return (
    <div
      ref={ref}
      className={`gc-card ${visible ? 'gc-card-visible' : ''}`}
      style={{ transitionDelay: `${(index % 6) * 0.05}s` }}
      onClick={() => onOpen(index)}
    >
      <div className="gc-img-wrap">
        <img src={item.image} alt={item.title} className="gc-img" loading="lazy" />
        <div className="gc-overlay">
          <div className="gc-overlay-inner">
            <span className="gc-view">View Frame</span>
            <span className="gc-title-text">{item.title}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   PHOTO STORY FOR WEDDING EDITORIAL
───────────────────────────────────────────── */
function PhotoStory({ src, alt, label, teluguText, english, photoSide = 'left', onClick }) {
  const [ref, visible] = useReveal()
  return (
    <div ref={ref} className={`ps-block ps-${photoSide} ${visible ? 'ps-visible' : ''}`}>
      <div className="ps-photo-col">
        <div className="ps-photo-frame" onClick={onClick}>
          <img src={src} alt={alt} className="ps-photo" loading="lazy" />
          <div className="ps-veil"><span className="ps-label">{label}</span></div>
        </div>
      </div>
      <div className="ps-text-col">
        <span className="ps-ornament">✦</span>
        <p className="ps-telugu">{teluguText}</p>
        <div className="ps-divider" />
        <p className="ps-english">{english}</p>
      </div>
    </div>
  )
}

function CenteredQuote({ teluguText, english }) {
  const [ref, visible] = useReveal()
  return (
    <div ref={ref} className={`ps-center-quote ${visible ? 'ps-visible' : ''}`}>
      <span className="ps-ornament">✦</span>
      <p className="ps-telugu">{teluguText}</p>
      <div className="ps-divider" />
      <p className="ps-english">{english}</p>
    </div>
  )
}

/* ─────────────────────────────────────────────
   LIGHTBOX
───────────────────────────────────────────── */
function Lightbox({ items, index, onClose, onPrev, onNext, onOpenCaption }) {
  const img = items[index]
  if (!img) return null
  useEffect(() => {
    const fn = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft') onPrev()
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose, onPrev, onNext])
  return (
    <div className="ex-lightbox" onClick={onClose}>
      <button className="ex-lb-close" onClick={onClose}>×</button>
      <div className="ex-lb-counter">{index + 1} / {items.length}</div>
      <button className="ex-lb-nav ex-lb-prev" onClick={(e) => { e.stopPropagation(); onPrev() }}>‹</button>
      <div className="ex-lb-content" onClick={(e) => e.stopPropagation()}>
        <div className="ex-lb-img-wrap">
          <img key={img.image} src={img.image} alt={img.title} className="ex-lb-img" />
        </div>
        <div className="ex-lb-panel">
          <div className="ex-lb-meta">
            <h3 className="ex-lb-title">{img.title}</h3>
            <p className="ex-lb-desc">{img.description || ''}</p>
            <div className="ex-lb-actions">
              <button
                className="ex-lb-ai-btn"
                onClick={(e) => { e.stopPropagation(); onOpenCaption && onOpenCaption(img) }}
              >
                AI Captions
              </button>
            </div>
          </div>
          <span className="ex-lb-tag">{(img.category || 'wedding').toUpperCase()}</span>
        </div>
      </div>
      <button className="ex-lb-nav ex-lb-next" onClick={(e) => { e.stopPropagation(); onNext() }}>›</button>
    </div>
  )
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function Gallery() {
  const [filter, setFilter] = useState('wedding')
  const [searchQuery, setSearchQuery] = useState('')
  const [lbData, setLbData] = useState(null) // { items, index }
  const [captionGeneratorOpen, setCaptionGeneratorOpen] = useState(false)
  const [selectedImageForCaption, setSelectedImageForCaption] = useState(null)

  const categories = ['all', 'wedding', 'pre-wedding', 'candid', 'family', 'baby-shoot', 'drone', 'cinematic']
  const categoryNames = {
    all: 'All Stories',
    wedding: 'Wedding',
    'pre-wedding': 'Pre-Wedding',
    candid: 'Candid',
    family: 'Family',
    'baby-shoot': 'Baby Shoot',
    drone: 'Drone',
    cinematic: 'Cinematic Films'
  }

  // Unified list for "All Stories" — unique list of images
  const allStoriesPhotos = useMemo(() => {
    // Collect all photos from categories except wedding
    const all = []
    const keys = ['pre-wedding', 'candid', 'family', 'baby-shoot', 'drone', 'cinematic']
    keys.forEach(k => {
      const list = CATEGORIES_DATA[k] || []
      list.forEach(p => {
        // Avoid duplicate images in "All Stories" by checking if we already added this URL
        if (!all.some(item => item.image === p.image)) {
          all.push({
            _id: p._id,
            title: p.title,
            image: p.image,
            description: p.description,
            category: k
          })
        }
      })
    })
    return all
  }, [])

  // Smart Search logic
  const searchActive = searchQuery.trim().length > 0
  const q = searchQuery.toLowerCase()

  const searchResults = useMemo(() => {
    if (!searchActive) return []
    // Search across all non-wedding images
    const allMatches = []
    const keys = ['pre-wedding', 'candid', 'family', 'baby-shoot', 'drone', 'cinematic']
    keys.forEach(k => {
      const list = CATEGORIES_DATA[k] || []
      list.forEach(p => {
        if (!allMatches.some(item => item.image === p.image)) {
          if (p.title.toLowerCase().includes(q) ||
              (p.description || '').toLowerCase().includes(q) ||
              (p.tags || '').toLowerCase().includes(q) ||
              k.toLowerCase().includes(q)) {
            allMatches.push({
              _id: p._id,
              title: p.title,
              image: p.image,
              description: p.description,
              category: k
            })
          }
        }
      })
    })
    return allMatches
  }, [searchActive, q])

  // Get active category photos
  const activeCatPhotos = useMemo(() => {
    const list = CATEGORIES_DATA[filter] || []
    return list.map(p => ({
      _id: p._id,
      title: p.title,
      image: p.image,
      description: p.description,
      category: filter
    }))
  }, [filter])

  // Lightbox handlers
  const openLb = (items, idx) => setLbData({ items, index: idx })
  const closeLb = () => setLbData(null)
  const prevLb = () => setLbData(d => d ? { ...d, index: (d.index - 1 + d.items.length) % d.items.length } : d)
  const nextLb = () => setLbData(d => d ? { ...d, index: (d.index + 1) % d.items.length } : d)

  const isWedding = filter === 'wedding'
  const isAll = filter === 'all'

  return (
    <PageTransition>
      <div className="gallery-page">
        {/* ── Page Header ── */}
      <section className="page-header">
        <div className="container">
          <h1 className="cormorant">Fine Art Gallery</h1>
          <p className="subtitle">A curated journey through sacred traditions and timeless emotions</p>
        </div>
      </section>

      {/* ── Search & Filter Controls ── */}
      <section className="section gallery-section-main">
        <div className="container">
          <div className="gallery-controls-card glass-card reveal-fade show">
            <div className="gc-search-wrap">
              <svg className="gc-search-icon" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <input
                type="text"
                placeholder="Search moments (e.g. bride, smile, hands, rings, saree)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="gc-search-input"
              />
              {searchQuery && (
                <button className="gc-search-clear" onClick={() => setSearchQuery('')}>×</button>
              )}
            </div>
            <div className="gallery-filter-scroll">
              <div className="gallery-filter-buttons">
                {categories.map(cat => (
                  <button
                    key={cat}
                    className={`gallery-filter-btn ${filter === cat && !searchActive ? 'active' : ''}`}
                    onClick={() => { setFilter(cat); setSearchQuery(''); setLbData(null) }}
                  >
                    {categoryNames[cat] || cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ SEARCH RESULTS ══════════ */}
      {searchActive && (
        <section className="section">
          <div className="container">
            <div className="gc-search-heading">
              <p className="gc-search-label">
                Found {searchResults.length} related match{searchResults.length !== 1 ? 'es' : ''} for
                <strong> "{searchQuery}"</strong>
              </p>
            </div>
            {searchResults.length > 0 ? (
              <div className="gc-grid">
                {searchResults.map((item, i) => (
                  <PhotoCard key={item._id} item={item} index={i} onOpen={(idx) => openLb(searchResults, idx)} />
                ))}
              </div>
            ) : (
              <div className="gc-empty">
                <span>🔍</span>
                <p>No exact frames found. Try searching for broader terms like <strong>bride</strong>, <strong>hands</strong>, <strong>love</strong>, or <strong>rings</strong>.</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ══════════ WEDDING EDITORIAL ══════════ */}
      {!searchActive && isWedding && (
        <div className="ps-container">
          <div className="ex-scroll-hint">
            <div className="ex-scroll-arrow-wrap">
              <svg className="ex-scroll-chevron" viewBox="0 0 24 24" fill="none"><path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <svg className="ex-scroll-chevron ex-scroll-chevron-2" viewBox="0 0 24 24" fill="none"><path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <span className="ex-scroll-label">Scroll to Explore</span>
          </div>

          <div className="ps-intro-block">
            <div className="ps-intro-top-line" />
            <div className="ps-intro-ornament-row">
              <span className="ps-intro-diamond">◆</span>
              <span className="ps-intro-line-short" />
              <span className="ps-intro-diamond">◆</span>
            </div>
            <p className="ps-intro-category">Telugu Wedding</p>
            <h2 className="ps-intro-quote">
              వివాహం అంటే కేవలం ఒక రోజు వేడుక కాదు...<br />
              <em>అది రెండు ఆత్మల మధ్య జీవితాంతం నిలిచే వాగ్దానం</em>
            </h2>
            <p className="ps-intro-translation">
              "Marriage is not merely a celebration of one day.<br />
              It is a lifelong promise etched between two souls —<br />
              witnessed by the stars, blessed by generations,<br />
              and carried forward through every breath of a shared life."
            </p>
            <div className="ps-intro-ornament-row">
              <span className="ps-intro-line-short" />
              <span className="ps-intro-diamond ps-intro-diamond-gold">✦</span>
              <span className="ps-intro-line-short" />
            </div>
          </div>

          <PhotoStory
            src={WEDDING_MASTER_PHOTOS[0].image}
            alt={WEDDING_MASTER_PHOTOS[0].title}
            label="The Beginning"
            teluguText="కలిసే రెండు మనసులు... ఒకటయ్యే రెండు కుటుంబాలు"
            english="A Telugu wedding is not merely the union of two hearts. It is the sacred coming together of two families, two histories, and generations of blessings flowing into a single, beautiful beginning."
            photoSide="left"
            onClick={() => openLb(WEDDING_MASTER_PHOTOS.map(p => ({ ...p, category: 'wedding' })), 0)}
          />

          <PhotoStory
            src={WEDDING_MASTER_PHOTOS[1].image}
            alt={WEDDING_MASTER_PHOTOS[1].title}
            label="Pure Joy"
            teluguText="నవ్వుల్లో దాగి ఉన్న జ్ఞాపకాలు... కాలం చెరపలేని క్షణాలు"
            english="Some moments do not need explanation. They speak in the language of joy — unfiltered, unposed, and completely unforgettable. Photography gives them a forever."
            photoSide="right"
            onClick={() => openLb(WEDDING_MASTER_PHOTOS.map(p => ({ ...p, category: 'wedding' })), 1)}
          />

          <PhotoStory
            src={WEDDING_MASTER_PHOTOS[2].image}
            alt={WEDDING_MASTER_PHOTOS[2].title}
            label="Sacred Ritual"
            teluguText="మెట్టెలు అమర్చే ఆ క్షణం... రెండు జీవితాలు ఒకటయ్యే సంధి"
            english="The wearing of toe rings is a moment of profound tenderness. A silent promise placed with gentle hands — symbolising eternal commitment in the most beautiful Telugu tradition."
            photoSide="left"
            onClick={() => openLb(WEDDING_MASTER_PHOTOS.map(p => ({ ...p, category: 'wedding' })), 2)}
          />

          <PhotoStory
            src={WEDDING_MASTER_PHOTOS[3].image}
            alt={WEDDING_MASTER_PHOTOS[3].title}
            label="Infinite Promise"
            teluguText="ప్రేమంటే ఒక మాట కాదు... ఒక జీవితం"
            english="Between the rituals and celebrations, there are quiet moments that carry the entire weight of a lifetime. A gentle touch. Interlocked fingers. A glance that says everything."
            photoSide="right"
            onClick={() => openLb(WEDDING_MASTER_PHOTOS.map(p => ({ ...p, category: 'wedding' })), 3)}
          />

          <PhotoStory
            src={WEDDING_MASTER_PHOTOS[4].image}
            alt={WEDDING_MASTER_PHOTOS[4].title}
            label="Forever Begins Here"
            teluguText="ఇది ఒక ముగింపు కాదు... ఒక అందమైన ప్రారంభం"
            english="Every photograph in this collection is a preserved heartbeat. Long after the garlands fade and the music quiets, these images will carry the warmth of this day into every tomorrow."
            photoSide="left"
            onClick={() => openLb(WEDDING_MASTER_PHOTOS.map(p => ({ ...p, category: 'wedding' })), 4)}
          />

          <CenteredQuote
            teluguText="సంప్రదాయం ఒక వారసత్వం... ప్రతి ఆచారం ఒక దీవెన"
            english="Telugu weddings are woven with rituals that carry the wisdom of generations. Each ceremony is a bridge between what was, what is, and what will always be."
          />
        </div>
      )}

      {/* ══════════ ALL STORIES (Simple unified picture grid, NO quotes/headers) ══════════ */}
      {!searchActive && isAll && (
        <section className="section">
          <div className="container">
            <div className="gc-grid">
              {allStoriesPhotos.map((item, i) => (
                <PhotoCard key={item._id} item={item} index={i} onOpen={(idx) => openLb(allStoriesPhotos, idx)} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════ SINGLE CATEGORY GRID ══════════ */}
      {!searchActive && !isWedding && !isAll && (
        <section className="section">
          <div className="container">
            <CategoryHeaderMini catKey={filter} />
            <div className="gc-grid">
              {activeCatPhotos.map((item, i) => (
                <PhotoCard key={item._id} item={item} index={i} onOpen={(idx) => openLb(activeCatPhotos, idx)} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════ LIGHTBOX ══════════ */}
      {lbData && (
        <Lightbox
          items={lbData.items}
          index={lbData.index}
          onClose={closeLb}
          onPrev={prevLb}
          onNext={nextLb}
        />
      )}
      </div>
    </PageTransition>
  )
}
