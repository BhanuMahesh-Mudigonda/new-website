import { useState } from 'react'
import { aiService } from '../services/api'
import './AIFAQSection.css'

const defaultFAQs = [
  {
    id: 1,
    question: 'Which package is best for my budget?',
  },
  {
    id: 2,
    question: 'How early should I book your services?',
  },
  {
    id: 3,
    question: 'Do you provide drone coverage?',
  },
  {
    id: 4,
    question: 'Which rituals are important to capture at a wedding?',
  },
  {
    id: 5,
    question: 'What is included in the Premium package?',
  },
  {
    id: 6,
    question: 'Do you offer same-day editing?',
  },
]

export default function AIFAQSection() {
  const [expandedId, setExpandedId] = useState(null)
  const [answers, setAnswers] = useState({})
  const [loading, setLoading] = useState({})
  const [customQuestion, setCustomQuestion] = useState('')
  const [customAnswer, setCustomAnswer] = useState(null)
  const [customLoading, setCustomLoading] = useState(false)

  const fetchAnswer = async (faqItem) => {
    if (answers[faqItem.id]) {
      setExpandedId(expandedId === faqItem.id ? null : faqItem.id)
      return
    }

    setLoading((prev) => ({ ...prev, [faqItem.id]: true }))
    setExpandedId(faqItem.id)

    try {
      const response = await aiService.answerFaq(faqItem.question)
      setAnswers((prev) => ({
        ...prev,
        [faqItem.id]: response.data.answer,
      }))
    } catch (error) {
      console.error('FAQ error:', error)
      setAnswers((prev) => ({
        ...prev,
        [faqItem.id]: 'Failed to get answer. Please contact us directly.',
      }))
    } finally {
      setLoading((prev) => ({ ...prev, [faqItem.id]: false }))
    }
  }

  const handleCustomQuestion = async (e) => {
    e.preventDefault()
    if (!customQuestion.trim()) return

    setCustomLoading(true)
    setCustomAnswer(null)

    try {
      const response = await aiService.answerFaq(customQuestion)
      setCustomAnswer(response.data.answer)
      setCustomQuestion('')
    } catch (error) {
      console.error('Custom FAQ error:', error)
      setCustomAnswer('Failed to get answer. Please try again.')
    } finally {
      setCustomLoading(false)
    }
  }

  return (
    <div className="ai-faq-section">
      <div className="faq-header">
        <h2>Ask Our AI Assistant</h2>
        <p>Get instant answers to your photography questions</p>
      </div>

      <div className="faq-container">
        {/* Custom Question Form */}
        <div className="custom-question-section">
          <form onSubmit={handleCustomQuestion} className="custom-question-form">
            <div className="input-wrapper">
              <input
                type="text"
                value={customQuestion}
                onChange={(e) => setCustomQuestion(e.target.value)}
                placeholder="Ask your question..."
                disabled={customLoading}
              />
              <button type="submit" disabled={customLoading || !customQuestion.trim()}>
                {customLoading ? (
                  <span className="faq-spinner"></span>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>
                )}
              </button>
            </div>
          </form>

          {customAnswer && (
            <div className="custom-answer-box">
              <h4>Answer</h4>
              <p>{customAnswer}</p>
            </div>
          )}
        </div>

        {/* Suggested FAQs */}
        <div className="suggested-faqs">
          <h3>Common Questions</h3>
          <div className="faq-accordion">
            {defaultFAQs.map((faqItem) => (
              <div key={faqItem.id} className="faq-item">
                <button
                  className="faq-question"
                  onClick={() => fetchAnswer(faqItem)}
                  disabled={loading[faqItem.id]}
                >
                  <span className="question-text">{faqItem.question}</span>
                  <span className={`faq-icon ${expandedId === faqItem.id ? 'expanded' : ''}`}>
                    {loading[faqItem.id] ? (
                      <span className="faq-spinner"></span>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    )}
                  </span>
                </button>

                {expandedId === faqItem.id && (
                  <div className="faq-answer">
                    {loading[faqItem.id] ? (
                      <div className="faq-loading">
                        <span className="faq-spinner"></span>
                        <p>Getting answer...</p>
                      </div>
                    ) : (
                      <p>{answers[faqItem.id]}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="faq-footer">
        <p>
          Can't find your answer? <a href="/contact">Contact us directly</a> or book a consultation.
        </p>
      </div>
    </div>
  )
}
