import os

css_to_append = """

/* ─── PREMIUM AI SEARCH ────────────────────────────────────────────── */
.premium-ai-search {
  position: relative;
  max-width: 800px;
  margin: 0 auto 60px auto;
  border-radius: 40px;
  background: rgba(255, 250, 244, 0.05);
  border: 1px solid rgba(196, 156, 86, 0.3);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  transition: all var(--transition);
  display: flex;
  align-items: center;
  padding: 8px 12px;
  backdrop-filter: blur(12px);
}

.premium-ai-search:focus-within {
  border-color: var(--accent);
  box-shadow: 0 15px 50px rgba(196, 156, 86, 0.15);
  background: rgba(255, 250, 244, 0.08);
}

.premium-ai-search input {
  flex: 1;
  background: transparent;
  border: none;
  color: var(--text);
  font-size: 1.15rem;
  padding: 12px 24px;
  font-family: 'Cormorant Garamond', serif;
}

.premium-ai-search input:focus {
  outline: none;
}

.premium-ai-search input::placeholder {
  color: var(--muted);
  opacity: 0.8;
  font-style: italic;
}

.premium-ai-search .spark-icon {
  color: var(--accent);
  margin-left: 16px;
  font-size: 1.2rem;
}

.premium-ai-search button {
  background: linear-gradient(135deg, var(--accent-light), var(--accent), var(--accent-dark));
  color: #19110a;
  border-radius: 30px;
  padding: 12px 32px;
  font-weight: 600;
  cursor: pointer;
  transition: transform var(--transition);
}

.premium-ai-search button:hover {
  transform: scale(1.02);
}


/* ─── ELEGANT AI WEDDING ASSISTANT ─────────────────────────────────── */
#ai-chatbot-widget {
  position: fixed;
  bottom: 40px;
  right: 40px;
  z-index: 9999;
  font-family: 'Poppins', sans-serif;
}

#ai-chatbot-toggle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent-light), var(--accent), var(--accent-dark));
  color: #19110a;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  transition: transform var(--transition), box-shadow var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
}

#ai-chatbot-toggle:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(196, 156, 86, 0.3);
}

#ai-chatbot-window {
  position: absolute;
  bottom: 80px;
  right: 0;
  width: 380px;
  height: 520px;
  background: rgba(14, 11, 9, 0.95);
  border: 1px solid rgba(196, 156, 86, 0.25);
  border-radius: var(--radius);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(20px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
  transform: translateY(20px);
  transition: opacity 0.4s ease, transform 0.4s ease;
}

#ai-chatbot-window.open {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
}

.chat-header {
  padding: 20px 24px;
  background: rgba(255, 250, 244, 0.03);
  border-bottom: 1px solid rgba(255, 250, 244, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-header h3 {
  margin: 0;
  font-family: 'Cormorant Garamond', serif;
  color: var(--accent);
  font-size: 1.4rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
}

.chat-close {
  background: transparent;
  border: none;
  color: var(--muted);
  font-size: 1.8rem;
  cursor: pointer;
  line-height: 1;
  transition: color var(--transition);
}

.chat-close:hover {
  color: var(--text);
}

.chat-messages {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  scrollbar-width: thin;
  scrollbar-color: var(--accent) transparent;
}

.chat-msg {
  max-width: 85%;
  padding: 12px 16px;
  border-radius: 18px;
  font-size: 0.9rem;
  line-height: 1.5;
  animation: fadeInMsg 0.4s ease forwards;
}

@keyframes fadeInMsg {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.chat-msg.ai {
  align-self: flex-start;
  background: rgba(255, 250, 244, 0.06);
  border: 1px solid rgba(255, 250, 244, 0.1);
  color: var(--text);
  border-bottom-left-radius: 4px;
}

.chat-msg.user {
  align-self: flex-end;
  background: var(--accent);
  color: #19110a;
  border-bottom-right-radius: 4px;
  font-weight: 500;
}

.chat-suggestions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}

.chat-suggestion-chip {
  background: rgba(196, 156, 86, 0.1);
  border: 1px solid rgba(196, 156, 86, 0.3);
  color: var(--accent);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.25s ease;
}

.chat-suggestion-chip:hover {
  background: rgba(196, 156, 86, 0.25);
  color: var(--text);
  border-color: var(--accent);
}

.chat-input-area {
  padding: 16px 20px;
  background: rgba(255, 250, 244, 0.02);
  border-top: 1px solid rgba(255, 250, 244, 0.08);
  display: flex;
  gap: 12px;
}

#ai-chat-input {
  flex: 1;
  background: transparent;
  border: none;
  color: var(--text);
  font-size: 0.95rem;
}

#ai-chat-input:focus {
  outline: none;
}

#ai-chat-send {
  background: transparent;
  color: var(--accent);
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  transition: transform 0.2s ease;
}

#ai-chat-send:hover {
  transform: translateX(3px) scale(1.1);
}

.typing-indicator span {
  display: inline-block;
  width: 6px;
  height: 6px;
  background: var(--muted);
  border-radius: 50%;
  margin: 0 2px;
  animation: typingBounce 1.4s infinite ease-in-out both;
}

.typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
.typing-indicator span:nth-child(2) { animation-delay: -0.16s; }

@keyframes typingBounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}

/* ─── DYNAMIC AI RECOMMENDATION CARD ───────────────────────────────── */
.dynamic-ai-card {
  background: linear-gradient(145deg, rgba(14, 11, 9, 0.8), rgba(25, 20, 16, 0.8));
  border: 1px solid rgba(196, 156, 86, 0.4);
  border-radius: var(--radius);
  padding: 24px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(16px);
  display: none;
  animation: slideUpFade 0.5s ease forwards;
  margin-top: 30px;
}

@keyframes slideUpFade {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.dynamic-ai-card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.dynamic-ai-card-header h4 {
  font-family: 'Cormorant Garamond', serif;
  color: var(--accent);
  font-size: 1.4rem;
  margin: 0;
}

.dynamic-ai-card p {
  color: var(--text);
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
}

/* ─── FORM IMPROVEMENTS ────────────────────────────────────────────── */
.form-group label {
  display: block;
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.1rem;
  color: var(--accent-light);
  margin-bottom: 8px;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  background: rgba(255, 250, 244, 0.03);
  border: 1px solid rgba(255, 250, 244, 0.15);
  border-radius: 12px;
  padding: 14px 18px;
  color: var(--text);
  font-size: 0.95rem;
  transition: all var(--transition);
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--accent);
  background: rgba(255, 250, 244, 0.06);
  box-shadow: 0 0 15px rgba(196, 156, 86, 0.1);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}

"""

with open("styles.css", "a") as f:
    f.write(css_to_append)

print("Appended CSS successfully.")
