import './InfiniteMarquee.css'

export default function InfiniteMarquee() {
  const marqueeItems = [
    { title: 'Sacred Telugu Mandap', image: '/gallery/couple_red_backdrop.jpg', tag: 'Traditional Wedding' },
    { title: 'Golden Hour Embrace', image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80', tag: 'Pre Wedding' },
    { title: 'Radiant Bride Moments', image: '/gallery/bride_tongue_candid.jpg', tag: 'Bridal Heritage' },
    { title: 'Marigold Haldi Splashes', image: '/gallery/toe_ring_ritual.jpg', tag: 'Haldi Rituals' },
    { title: 'Sacred Vows & Blessings', image: '/gallery/fire_ritual.jpg', tag: 'Mandap Rites' },
    { title: 'Night Bokeh Ceremony', image: '/gallery/forehead_kiss.jpg', tag: 'Reception' },
    { title: 'Sweet Baby Innocence', image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80', tag: 'Baby Portrait' }
  ]

  // Duplicate for smooth seamless loop
  const list = [...marqueeItems, ...marqueeItems]

  return (
    <section className="marquee-section section">
      <div className="container">
        <div className="section-title-wrap">
          <h2 className="section-title cormorant">Featured Wedding Moments</h2>
          <p className="section-subtitle">An Infinite Gallery of Sacred Celebrations & Emotion</p>
        </div>
      </div>

      <div className="marquee-wrapper">
        <div className="marquee-track">
          {list.map((item, idx) => (
            <div key={idx} className="marquee-card glass-card">
              <img src={item.image} alt={item.title} className="marquee-img" />
              <div className="marquee-overlay">
                <span className="marquee-tag">{item.tag}</span>
                <h3 className="marquee-title cormorant">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
