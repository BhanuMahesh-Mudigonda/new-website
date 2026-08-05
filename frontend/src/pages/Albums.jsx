import { useEffect, useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import { albumsService } from '../services/api'
import './Albums.css'

export default function Albums() {
  const ref = useReveal()
  const [albums, setAlbums] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadAlbums = async () => {
      try {
        const res = await albumsService.getAll()
        setAlbums(res.data)
      } catch (error) {
        console.error('Error loading albums:', error)
      } finally {
        setLoading(false)
      }
    }
    loadAlbums()
  }, [])

  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>Photo Albums</h1>
          <p>Collections from our finest moments</p>
        </div>
      </section>

      <section className="section albums-list">
        <div className="container">
          {!loading && albums.length > 0 ? (
            <div className="albums-grid">
              {albums.map((album) => (
                <div key={album._id} className="album-card reveal" ref={ref}>
                  <div className="album-image">
                    <img src={album.coverImage} alt={album.title} />
                    <div className="album-overlay">
                      <p className="photo-count">{album.photoCount || 0} Photos</p>
                    </div>
                  </div>
                  <div className="album-info">
                    <h3>{album.title}</h3>
                    <p className="album-date">
                      {new Date(album.date).toLocaleDateString()}
                    </p>
                    <p className="album-description">{album.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="albums-empty">
              <p>{loading ? 'Loading albums...' : 'No albums available'}</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
