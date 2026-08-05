import { useState } from 'react'
import { aiService } from '../services/api'
import './CaptionGenerator.css'

export default function CaptionGenerator({ imageContext, isOpen, onClose }) {
  const [captions, setCaptions] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(null)

  const generateCaptions = async () => {
    if (!imageContext) return

    setIsLoading(true)
    try {
      const response = await aiService.generateCaption(imageContext)
      setCaptions(response.data.captions)
    } catch (error) {
      console.error('Caption generation error:', error)
      setCaptions({
        instagram: 'Failed to generate Instagram caption',
        facebook: 'Failed to generate Facebook caption',
        quote: 'Failed to generate quote',
        description: 'Failed to generate description',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  if (!isOpen) return null

  return (
    <div className="caption-generator-overlay" onClick={onClose}>
      <div className="caption-generator-modal" onClick={(e) => e.stopPropagation()}>
        <div className="caption-modal-header">
          <h3>AI Caption Generator</h3>
          <button className="caption-close-button" onClick={onClose}>
            ✕
          </button>
        </div>

        {!captions ? (
          <div className="caption-modal-body">
            <p className="caption-description">
              Generate social media captions and emotional descriptions for this image using AI.
            </p>
            <button
              className="generate-captions-button"
              onClick={generateCaptions}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="caption-spinner"></span>
                  Generating...
                </>
              ) : (
                'Generate Captions'
              )}
            </button>
          </div>
        ) : (
          <div className="captions-content">
            <div className="caption-item">
              <div className="caption-label">
                <span className="platform-badge instagram">Instagram</span>
              </div>
              <div className="caption-text-wrapper">
                <p className="caption-text">{captions.instagram}</p>
                <button
                  className="copy-button"
                  onClick={() => copyToClipboard(captions.instagram, 'instagram')}
                  title="Copy to clipboard"
                >
                  {copied === 'instagram' ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            </div>

            <div className="caption-item">
              <div className="caption-label">
                <span className="platform-badge facebook">Facebook</span>
              </div>
              <div className="caption-text-wrapper">
                <p className="caption-text">{captions.facebook}</p>
                <button
                  className="copy-button"
                  onClick={() => copyToClipboard(captions.facebook, 'facebook')}
                  title="Copy to clipboard"
                >
                  {copied === 'facebook' ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            </div>

            <div className="caption-item">
              <div className="caption-label">
                <span className="platform-badge quote">Wedding Quote</span>
              </div>
              <div className="caption-text-wrapper">
                <p className="caption-text quote-text">"{captions.quote}"</p>
                <button
                  className="copy-button"
                  onClick={() => copyToClipboard(captions.quote, 'quote')}
                  title="Copy to clipboard"
                >
                  {copied === 'quote' ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            </div>

            <div className="caption-item">
              <div className="caption-label">
                <span className="platform-badge description">Emotional Description</span>
              </div>
              <div className="caption-text-wrapper">
                <p className="caption-text">{captions.description}</p>
                <button
                  className="copy-button"
                  onClick={() => copyToClipboard(captions.description, 'description')}
                  title="Copy to clipboard"
                >
                  {copied === 'description' ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            </div>

            <button className="generate-again-button" onClick={() => setCaptions(null)}>
              Generate New Captions
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
