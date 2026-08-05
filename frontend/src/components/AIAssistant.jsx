import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { aiService } from '../services/api'
import './AIAssistant.css'

const QUICK_ACTIONS = [
  { label: 'Recommend Package',  query: 'Which photography package do you recommend for a Telugu wedding?' },
  { label: 'Search Gallery',     query: 'Show me the best wedding photographs in your gallery.' },
  { label: 'Wedding Planning',   query: 'Can you help me plan the photography for my Telugu wedding day?' },
  { label: 'Budget Estimate',    query: 'What is a reasonable budget for wedding photography in Vijayawada?' },
  { label: 'Book Consultation',  query: 'I would like to book a consultation with PB Photography.' },
  { label: 'Talk to Studio',     query: 'How can I reach the PB Photography studio directly?' },
]

const WELCOME_MESSAGE = {
  id: 'welcome',
  text: "Welcome to PB AI. I'm your personal wedding planning concierge.\n\nI can help you plan your wedding, recommend packages, explain Telugu wedding rituals, estimate budgets, and guide your booking. How can I assist you today?",
  isBot: true,
  timestamp: new Date(),
  isError: false,
}

export default function AIAssistant() {
  const [isOpen,          setIsOpen]          = useState(false)
  const [messages,        setMessages]        = useState([WELCOME_MESSAGE])
  const [input,           setInput]           = useState('')
  const [isLoading,       setIsLoading]       = useState(false)
  const [showQuickActions, setShowQuickActions] = useState(true)
  const messagesEndRef = useRef(null)
  const inputRef       = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const sendMessage = async (text) => {
    if (!text.trim() || isLoading) return

    setShowQuickActions(false)

    const userMsg = {
      id:        Date.now(),
      text,
      isBot:     false,
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsLoading(true)

    try {
      const history = messages
        .filter(m => m.id !== 'welcome')
        .map(m => ({ role: m.isBot ? 'assistant' : 'user', content: m.text }))
        .concat([{ role: 'user', content: text }])

      const response = await aiService.chat(history)
      setMessages(prev => [...prev, {
        id:        Date.now() + 1,
        text:      response.data.reply,
        isBot:     true,
        timestamp: new Date(),
        isError:   false,
      }])
    } catch {
      setMessages(prev => [...prev, {
        id:        Date.now() + 1,
        text:      null,
        isBot:     true,
        timestamp: new Date(),
        isError:   true,
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e) => { e.preventDefault(); sendMessage(input) }
  const handleChip   = (query) => sendMessage(query)
  const handleRetry  = () => {
    const lastUser = [...messages].reverse().find(m => !m.isBot)
    if (lastUser) {
      setMessages(prev => prev.filter(m => !(m.isError)))
      sendMessage(lastUser.text)
    }
  }

  return (
    <>
      {/* ── Floating Button ── */}
      <button
        id="ai-assistant-toggle"
        className={`ai-assistant-button ${isOpen ? 'ai-btn-open' : ''}`}
        onClick={() => setIsOpen(o => !o)}
        title="PB AI Wedding Concierge"
        aria-label="Open AI Wedding Concierge"
      >
        {isOpen ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6"  y2="18" />
            <line x1="6"  y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span className="ai-btn-label">PB AI</span>
          </>
        )}
      </button>

      {/* ── Chat Window ── */}
      {isOpen && (
        <div className="ai-assistant-window" role="dialog" aria-label="PB AI Wedding Concierge">

          {/* Header */}
          <div className="ai-assistant-header">
            <div className="ai-header-info">
              <div className="ai-header-avatar">✦</div>
              <div>
                <h3>PB AI Concierge</h3>
                <span className={`ai-status-pill ${isLoading ? 'thinking' : 'online'}`}>
                  {isLoading ? 'Thinking...' : 'Online — Here to help'}
                </span>
              </div>
            </div>
            <button className="ai-close-button" onClick={() => setIsOpen(false)} aria-label="Close">✕</button>
          </div>

          {/* Quick Actions */}
          {showQuickActions && (
            <div className="ai-quick-actions">
              <p className="ai-quick-label">Quick actions</p>
              <div className="ai-quick-chips">
                {QUICK_ACTIONS.map(a => (
                  <button
                    key={a.label}
                    className="ai-quick-chip"
                    onClick={() => handleChip(a.query)}
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="ai-messages">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`ai-msg ${msg.isBot ? 'bot' : 'user'}`}
              >
                {msg.isBot && <div className="ai-avatar">✦</div>}

                <div className="ai-msg-body">
                  {msg.isError ? (
                    /* ── Error Message with Fallback Actions ── */
                    <div className="ai-error-card">
                      <p className="ai-error-title">I'm having a little trouble connecting right now.</p>
                      <p className="ai-error-sub">Meanwhile, I can still help you:</p>
                      <div className="ai-error-actions">
                        <a href="tel:+919642534945" className="ai-error-btn">📞 Call Studio</a>
                        <a href="https://wa.me/919642534945" target="_blank" rel="noopener noreferrer" className="ai-error-btn">💬 WhatsApp</a>
                        <Link to="/booking" onClick={() => setIsOpen(false)} className="ai-error-btn">📅 Book Consultation</Link>
                        <button className="ai-error-btn ai-retry-btn" onClick={handleRetry}>🔄 Try Again</button>
                      </div>
                    </div>
                  ) : (
                    <div className="ai-bubble">
                      <p>{msg.text}</p>
                    </div>
                  )}
                  <span className="ai-msg-time">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="ai-msg bot">
                <div className="ai-avatar">✦</div>
                <div className="ai-msg-body">
                  <div className="ai-bubble ai-typing-bubble">
                    <span /><span /><span />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form className="ai-input-row" onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask about packages, rituals, budgets..."
              disabled={isLoading}
            />
            <button
              type="submit"
              className="ai-send-btn"
              disabled={isLoading || !input.trim()}
              aria-label="Send"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  )
}
