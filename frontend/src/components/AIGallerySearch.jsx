import { useState, useEffect, useRef } from 'react'
import { aiService, galleryService } from '../services/api'
import './AIGallerySearch.css'

const ROTATING_PLACEHOLDERS = [
  'Bride Smile',
  'Father Emotion',
  'Mangalsutra Moment',
  'Golden Saree',
  'Family Hug',
  'Sunset Couple Portrait',
  'Reception Entry',
  'Haldi Ceremony',
]

const SEMANTIC_SUGGESTIONS = [
  'Bride Portrait',
  'Couple',
  'Haldi',
  'Mehendi',
  'Reception',
  'Candid Moments',
  'Pre-Wedding',
  'Family',
  'Emotional',
  'Sunset',
]

export default function AIGallerySearch({ onResultsChange }) {
  const [searchQuery,  setSearchQuery]  = useState('')
  const [placeholder,  setPlaceholder]  = useState(ROTATING_PLACEHOLDERS[0])
  const [isLoading,    setIsLoading]    = useState(false)
  const [hasSearched,  setHasSearched]  = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const placeholderIdx = useRef(0)

  // Rotating placeholder animation
  useEffect(() => {
    const id = setInterval(() => {
      placeholderIdx.current = (placeholderIdx.current + 1) % ROTATING_PLACEHOLDERS.length
      setPlaceholder(ROTATING_PLACEHOLDERS[placeholderIdx.current])
    }, 2800)
    return () => clearInterval(id)
  }, [])

  const runSearch = async (query) => {
    if (!query.trim()) return
    setIsLoading(true)
    setHasSearched(true)

    try {
      const galleryRes = await galleryService.getAll()
      const images = galleryRes.data || []
      const metadata = images.map(img => ({
        id: img._id, title: img.title,
        category: img.category, description: img.description, tags: img.tags || '',
      }))

      const searchRes = await aiService.searchGallery(query, metadata)
      const matchingIds = searchRes.data.matchingIds || []
      const results = images.filter(img => matchingIds.includes(img._id))

      setSearchResults(results)
      onResultsChange?.(results)
    } catch {
      setSearchResults([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e) => { e.preventDefault(); runSearch(searchQuery) }

  const handleSuggestion = (s) => {
    setSearchQuery(s)
    runSearch(s)
  }

  const clearSearch = () => {
    setSearchQuery('')
    setSearchResults([])
    setHasSearched(false)
    onResultsChange?.([])
  }

  return (
    <div className="ai-gallery-search">
      {/* Search Header */}
      <div className="ags-header">
        <span className="ags-spark">✦</span>
        <div>
          <h3>AI Gallery Search</h3>
          <p>Describe what you're looking for — an emotion, a moment, a ritual.</p>
        </div>
      </div>

      {/* Search Input */}
      <form className="ags-form" onSubmit={handleSubmit}>
        <div className="ags-input-wrap">
          <svg className="ags-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={searchQuery ? '' : `e.g. "${placeholder}"`}
            className="ags-input"
            disabled={isLoading}
          />
          {searchQuery && (
            <button type="button" className="ags-clear-btn" onClick={clearSearch}>✕</button>
          )}
        </div>
        <button
          type="submit"
          className="ags-search-btn"
          disabled={isLoading || !searchQuery.trim()}
        >
          {isLoading ? <span className="ags-spinner" /> : 'Search'}
        </button>
      </form>

      {/* Suggestion Chips (shown before search) */}
      {!hasSearched && (
        <div className="ags-suggestions">
          <p className="ags-suggestions-label">Try searching for:</p>
          <div className="ags-chips">
            {SEMANTIC_SUGGESTIONS.map(s => (
              <button key={s} className="ags-chip" onClick={() => handleSuggestion(s)}>
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {hasSearched && (
        <div className="ags-results-section">
          <div className="ags-results-header">
            <h4>
              {searchResults.length > 0
                ? `Found ${searchResults.length} photograph${searchResults.length !== 1 ? 's' : ''} for "${searchQuery}"`
                : ''}
            </h4>
            <button className="ags-clear-search" onClick={clearSearch}>Clear Search</button>
          </div>

          {searchResults.length > 0 ? (
            <div className="ags-results-grid">
              {searchResults.map(image => (
                <div key={image._id} className="ags-result-card">
                  <div className="ags-result-img-wrap">
                    <img src={image.image} alt={image.title} />
                    <div className="ags-result-overlay">
                      <h5>{image.title}</h5>
                      <span className="ags-category-badge">{image.category}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* ── Smart No-Results ── */
            <div className="ags-no-results">
              <div className="ags-no-results-icon">✦</div>
              <h4>No exact match found</h4>
              <p>
                I couldn't find a perfect match for "<strong>{searchQuery}</strong>", but here are some photographs you might love:
              </p>
              <div className="ags-similar-chips">
                {SEMANTIC_SUGGESTIONS.slice(0, 6).map(s => (
                  <button key={s} className="ags-chip" onClick={() => handleSuggestion(s)}>{s}</button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
