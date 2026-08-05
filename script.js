/* ─────────────────────────────────────────────────────────
   PB Photography — Premium Script
   Animations: reveal, image-reveal, testimonials, gallery
   ───────────────────────────────────────────────────────── */

// ─── PAGE LOADER ─────────────────────────────────────────
const loader = document.getElementById('pageLoader');
if (loader) {
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hidden'), 420);
  });
}

// ─── NAV MENU ────────────────────────────────────────────
const navToggle = document.getElementById('navToggle');
const closeNav = document.getElementById('closeNav');
const siteNav = document.getElementById('siteNav');
const overlay = document.getElementById('menuOverlay');

const openMenu = () => {
  siteNav?.classList.add('open');
  overlay?.classList.add('show');
  document.body.style.overflow = 'hidden';
};

const closeMenu = () => {
  siteNav?.classList.remove('open');
  overlay?.classList.remove('show');
  document.body.style.overflow = '';
};

navToggle?.addEventListener('click', openMenu);
closeNav?.addEventListener('click', closeMenu);
overlay?.addEventListener('click', closeMenu);

// Close on ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});

// ─── REVEAL ON SCROLL ────────────────────────────────────
const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Stagger children if they have delay classes
        entry.target.classList.add('show');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

revealItems.forEach((item) => revealObserver.observe(item));

// ─── IMAGE REVEAL (scale + opacity) ──────────────────────
const imgRevealItems = document.querySelectorAll('.img-reveal');
const imgRevealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        imgRevealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

imgRevealItems.forEach((item) => imgRevealObserver.observe(item));

// ─── GALLERY FILTER + LIGHTBOX ───────────────────────────
const galleryGrid = document.getElementById('galleryGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryCards = document.querySelectorAll('.gallery-card');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const closeLightbox = document.getElementById('closeLightbox');

if (filterButtons.length && galleryCards.length) {
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
      const filter = button.getAttribute('data-filter');
      galleryCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        const matches = filter === 'all' || category === filter;
        card.classList.toggle('is-hidden', !matches);
      });
    });
  });
}

if (galleryCards.length && lightbox && lightboxImage && closeLightbox) {
  galleryCards.forEach((card) => {
    card.addEventListener('click', () => {
      const image = card.querySelector('img');
      if (!image) return;
      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt;
      lightbox.classList.add('show');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeLb = () => {
    lightbox.classList.remove('show');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  closeLightbox.addEventListener('click', closeLb);
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLb();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('show')) closeLb();
  });
}

// ─── TESTIMONIAL SLIDER ───────────────────────────────────
const testimonialCards = Array.from(document.querySelectorAll('.testimonial-card'));
const prevButton = document.getElementById('prevTestimonial');
const nextButton = document.getElementById('nextTestimonial');
let activeTestimonial = 0;
let autoSlideInterval = null;

const showTestimonial = (index) => {
  testimonialCards.forEach((card) => {
    card.classList.remove('active');
    card.style.display = 'none';
  });
  testimonialCards[index].style.display = 'block';
  // Force reflow for animation
  void testimonialCards[index].offsetWidth;
  testimonialCards[index].classList.add('active');
  activeTestimonial = index;
};

const startAutoSlide = () => {
  autoSlideInterval = setInterval(() => {
    if (testimonialCards.length) {
      const nextIndex = (activeTestimonial + 1) % testimonialCards.length;
      showTestimonial(nextIndex);
    }
  }, 7000);
};

if (testimonialCards.length && prevButton && nextButton) {
  showTestimonial(0);
  startAutoSlide();

  prevButton.addEventListener('click', () => {
    clearInterval(autoSlideInterval);
    const nextIndex = (activeTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
    showTestimonial(nextIndex);
    startAutoSlide();
  });

  nextButton.addEventListener('click', () => {
    clearInterval(autoSlideInterval);
    const nextIndex = (activeTestimonial + 1) % testimonialCards.length;
    showTestimonial(nextIndex);
    startAutoSlide();
  });
}

// ─── APPOINTMENT CALENDAR ─────────────────────────────────
const calendarGrid = document.getElementById('calendarGrid');
const calendarTitle = document.getElementById('calendarTitle');
const selectedDate = document.getElementById('preferredDate');
const timeGrid = document.getElementById('timeGrid');
const preferredTime = document.getElementById('preferredTime');
const formSuccess = document.getElementById('formSuccess');
const bookingForm = document.getElementById('bookingForm');

const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '04:00 PM', '06:00 PM'];

if (calendarGrid && calendarTitle && selectedDate) {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const weekdayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const current = new Date();
  let monthCursor = new Date(current.getFullYear(), current.getMonth(), 1);

  const renderCalendar = () => {
    calendarGrid.innerHTML = '';
    calendarTitle.textContent = `${monthNames[monthCursor.getMonth()]} ${monthCursor.getFullYear()}`;
    weekdayNames.forEach((day) => {
      const label = document.createElement('div');
      label.className = 'calendar-day';
      label.textContent = day;
      calendarGrid.appendChild(label);
    });
    const firstDay = new Date(monthCursor.getFullYear(), monthCursor.getMonth(), 1);
    const offset = firstDay.getDay();
    for (let i = 0; i < offset; i += 1) {
      const stub = document.createElement('div');
      stub.className = 'calendar-day';
      calendarGrid.appendChild(stub);
    }
    const daysInMonth = new Date(monthCursor.getFullYear(), monthCursor.getMonth() + 1, 0).getDate();
    for (let day = 1; day <= daysInMonth; day += 1) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'calendar-day button';
      button.textContent = day;
      button.addEventListener('click', () => {
        document.querySelectorAll('.calendar-day.active').forEach((cell) => cell.classList.remove('active'));
        button.classList.add('active');
        selectedDate.value = `${monthCursor.getFullYear()}-${String(monthCursor.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      });
      calendarGrid.appendChild(button);
    }
  };

  document.getElementById('prevMonth')?.addEventListener('click', () => {
    monthCursor = new Date(monthCursor.getFullYear(), monthCursor.getMonth() - 1, 1);
    renderCalendar();
  });
  document.getElementById('nextMonth')?.addEventListener('click', () => {
    monthCursor = new Date(monthCursor.getFullYear(), monthCursor.getMonth() + 1, 1);
    renderCalendar();
  });
  renderCalendar();
}

if (timeGrid && preferredTime) {
  timeSlots.forEach((slot) => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'time-chip';
    chip.textContent = slot;
    chip.addEventListener('click', () => {
      timeGrid.querySelectorAll('.time-chip').forEach((item) => item.classList.remove('active'));
      chip.classList.add('active');
      preferredTime.value = slot;
    });
    timeGrid.appendChild(chip);
  });
}

if (bookingForm && formSuccess) {
  bookingForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    // Determine API URL based on environment (local vs production)
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:';
    const apiUrl = isLocal ? 'http://localhost:5003/api/appointments' : '/api/appointments';

    // Gather form data
    const formData = {
      name: document.getElementById('fullName')?.value || '',
      phone: document.getElementById('phoneNumber')?.value || '',
      email: document.getElementById('emailAddress')?.value || '',
      type: document.getElementById('eventType')?.value || '',
      date: document.getElementById('preferredDate')?.value || '',
      location: document.getElementById('location')?.value || '',
      budget: document.getElementById('budget')?.value || '',
      message: `Package: ${document.getElementById('packageType')?.value || ''}\nTime: ${document.getElementById('preferredTime')?.value || ''}\nStyle: ${document.getElementById('photoStyle')?.value || ''}\nRequests: ${document.getElementById('specialRequests')?.value || ''}`
    };

    const submitBtn = bookingForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn ? submitBtn.textContent : 'Request Appointment';
    if (submitBtn) {
      submitBtn.textContent = 'Submitting...';
      submitBtn.disabled = true;
    }

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      formSuccess.classList.add('show');
      bookingForm.reset();
      document.querySelectorAll('.calendar-day.active').forEach((cell) => cell.classList.remove('active'));
      document.querySelectorAll('.time-chip.active').forEach((chip) => chip.classList.remove('active'));
      formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your request. Please try again or contact us via WhatsApp.');
    } finally {
      if (submitBtn) {
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
      }
    }
  });
}

// ─── SUBTLE PARALLAX ON HERO VIDEO REMOVED TO PREVENT SCROLL LAG ───

// ─── STATS COUNT UP ANIMATION ────────────────────────────
const stats = document.querySelectorAll('.hero-meta strong[data-target]');
if (stats.length) {
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const targetNum = parseInt(target.getAttribute('data-target'), 10);
        const suffix = target.getAttribute('data-suffix') || '';
        const duration = 1800; // 1.8 seconds duration
        let startTime = null;

        const animateCount = (timestamp) => {
          if (!startTime) startTime = timestamp;
          const progress = timestamp - startTime;
          const percentage = Math.min(progress / duration, 1);
          
          // Easing out quadratic
          const easeProgress = percentage * (2 - percentage);
          const currentCount = Math.floor(easeProgress * targetNum);
          
          target.textContent = currentCount + suffix;

          if (progress < duration) {
            requestAnimationFrame(animateCount);
          } else {
            target.textContent = targetNum + suffix;
          }
        };

        requestAnimationFrame(animateCount);
        countObserver.unobserve(target);
      }
    });
  }, { threshold: 0.1 });
  
  stats.forEach(stat => countObserver.observe(stat));
}

/* ─── AI FEATURES ───────────────────────────────────────── */

const aiBaseUrl = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:') 
  ? 'http://localhost:5003/api/ai' 
  : '/api/ai';

// 1. AI Chatbot Widget (Global)
const setupAIChatbot = () => {
  // Inject HTML if not present
  if (!document.getElementById('ai-chatbot-widget')) {
    const chatbotHTML = `
      <div id="ai-chatbot-widget">
        <button id="ai-chatbot-toggle" aria-label="Open AI Assistant">✦</button>
        <div id="ai-chatbot-window">
          <div class="chat-header">
            <h3>✨ AI Assistant</h3>
            <button class="chat-close" id="ai-chatbot-close">×</button>
          </div>
          <div class="chat-messages" id="ai-chat-messages">
            <div class="chat-msg ai">Welcome! I'm your PB Photography AI assistant. How can I help you plan your perfect wedding shoot today?</div>
            <div class="chat-suggestions">
              <span class="chat-suggestion-chip">Find the perfect package</span>
              <span class="chat-suggestion-chip">Search the gallery</span>
              <span class="chat-suggestion-chip">Learn about Telugu wedding rituals</span>
              <span class="chat-suggestion-chip">Estimate my budget</span>
              <span class="chat-suggestion-chip">Book a consultation</span>
            </div>
          </div>
          <div class="chat-input-area">
            <input type="text" id="ai-chat-input" placeholder="Type your question..." />
            <button id="ai-chat-send">➤</button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', chatbotHTML);
  }

  const toggle = document.getElementById('ai-chatbot-toggle');
  const chatWindow = document.getElementById('ai-chatbot-window');
  const close = document.getElementById('ai-chatbot-close');
  const input = document.getElementById('ai-chat-input');
  const send = document.getElementById('ai-chat-send');
  const messages = document.getElementById('ai-chat-messages');

  let chatHistory = [];

  const toggleChat = () => chatWindow.classList.toggle('open');
  toggle.addEventListener('click', toggleChat);
  close.addEventListener('click', () => chatWindow.classList.remove('open'));

  const appendMessage = (text, sender) => {
    const msg = document.createElement('div');
    msg.className = `chat-msg ${sender}`;
    msg.textContent = text;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  };

  const showTyping = () => {
    const indicator = document.createElement('div');
    indicator.className = 'chat-msg ai typing';
    indicator.id = 'ai-typing';
    indicator.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';
    messages.appendChild(indicator);
    messages.scrollTop = messages.scrollHeight;
  };

  const removeTyping = () => {
    const indicator = document.getElementById('ai-typing');
    if (indicator) indicator.remove();
  };

  const sendMessage = async (overrideText = null) => {
    const text = overrideText || input.value.trim();
    if (!text) return;

    appendMessage(text, 'user');
    chatHistory.push({ role: 'user', content: text });
    if (!overrideText) input.value = '';

    showTyping();

    try {
      const response = await fetch(`${aiBaseUrl}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: chatHistory })
      });
      const data = await response.json();
      removeTyping();
      
      if (data.reply) {
        appendMessage(data.reply, 'ai');
        chatHistory.push({ role: 'assistant', content: data.reply });
      } else {
        appendMessage('Sorry, I am having trouble connecting right now.', 'ai');
      }
    } catch (err) {
      removeTyping();
      appendMessage('Connection error. Please try again later.', 'ai');
    }
  };

  send.addEventListener('click', () => sendMessage());
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });

  // Handle Suggestion Chips
  document.querySelectorAll('.chat-suggestion-chip').forEach(chip => {
    chip.addEventListener('click', (e) => {
      const suggestionText = e.target.textContent;
      e.target.parentElement.remove(); // Remove suggestions once clicked
      sendMessage(suggestionText);
    });
  });
};

document.addEventListener('DOMContentLoaded', setupAIChatbot);

// 2. Smart Package Recommendation & Comparison
const setupAIRecommendation = () => {
  const recommendBtn = document.getElementById('ai-recommend-btn');
  const compareBtn = document.getElementById('ai-compare-btn');
  const recommendResult = document.getElementById('ai-recommend-result');
  const compareResult = document.getElementById('ai-compare-result');

  if (recommendBtn && recommendResult) {
    recommendBtn.addEventListener('click', async () => {
      const eventDetails = {
        eventType: document.getElementById('ai-event-type')?.value,
        budget: document.getElementById('ai-budget')?.value,
        guestCount: document.getElementById('ai-guest-count')?.value,
        location: document.getElementById('ai-location')?.value,
        indoorOutdoor: document.getElementById('ai-setting')?.value,
        days: document.getElementById('ai-days')?.value,
      };

      recommendBtn.textContent = 'Analyzing...';
      recommendBtn.disabled = true;

      try {
        const response = await fetch(`${aiBaseUrl}/recommend-package`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(eventDetails)
        });
        const data = await response.json();
        
        if (data.recommendation) {
          recommendResult.style.display = 'block';
          recommendResult.innerHTML = `<p>${data.recommendation.replace(/\n/g, '<br>')}</p>`;
        }
      } catch (err) {
        recommendResult.style.display = 'block';
        recommendResult.innerHTML = '<p>Unable to generate recommendation at this time. Please contact us directly.</p>';
      } finally {
        recommendBtn.textContent = 'Get Recommendation';
        recommendBtn.disabled = false;
      }
    });
  }

  if (compareBtn && compareResult) {
    compareBtn.addEventListener('click', async () => {
      compareBtn.textContent = 'Comparing...';
      compareBtn.disabled = true;

      try {
        const response = await fetch(`${aiBaseUrl}/compare-packages`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            packages: 'Silver Package (Basic), Gold Package (Standard), Premium Package (Luxury Cinematic)', 
            userContext: document.getElementById('ai-event-type')?.value || ''
          })
        });
        const data = await response.json();
        
        if (data.comparison) {
          compareResult.style.display = 'block';
          compareResult.innerHTML = `<p>${data.comparison.replace(/\n/g, '<br>')}</p>`;
        }
      } catch (err) {
        compareResult.style.display = 'block';
        compareResult.innerHTML = '<p>Unable to compare packages at this time.</p>';
      } finally {
        compareBtn.textContent = 'Compare Packages Instantly';
        compareBtn.disabled = false;
      }
    });
  }
};

document.addEventListener('DOMContentLoaded', setupAIRecommendation);

// 3. Smart Gallery Search
const setupAIGallerySearch = () => {
  const searchInput = document.getElementById('ai-gallery-search');
  const searchBtn = document.getElementById('ai-search-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');

  if (searchInput && searchBtn && galleryCards.length) {
    // Animated Placeholder Logic
    const placeholders = [
      "Bride Portrait...",
      "Bride Smile...",
      "Father Emotion...",
      "Mangalsutra...",
      "Haldi Ceremony...",
      "Reception Entry...",
      "Family Portrait...",
      "Sunset Couple..."
    ];
    let placeholderIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typePlaceholder = () => {
      const currentWord = placeholders[placeholderIndex];
      
      if (isDeleting) {
        searchInput.setAttribute('placeholder', 'Search ' + currentWord.substring(0, charIndex - 1));
        charIndex--;
      } else {
        searchInput.setAttribute('placeholder', 'Search ' + currentWord.substring(0, charIndex + 1));
        charIndex++;
      }

      let typeSpeed = isDeleting ? 50 : 100;

      if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000; // Pause at end of word
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        placeholderIndex = (placeholderIndex + 1) % placeholders.length;
        typeSpeed = 500; // Pause before next word
      }

      // Stop typing if input is focused
      if (document.activeElement !== searchInput) {
        setTimeout(typePlaceholder, typeSpeed);
      } else {
        searchInput.setAttribute('placeholder', 'Search gallery with AI...');
        setTimeout(typePlaceholder, 2000); // Check again later
      }
    };
    
    // Start typing animation
    setTimeout(typePlaceholder, 1000);

    searchBtn.addEventListener('click', async () => {
      const query = searchInput.value.trim();
      if (!query) return;

      const originalText = searchBtn.textContent;
      searchBtn.textContent = 'Searching...';
      searchBtn.disabled = true;

      // Prepare available images metadata
      const availableImages = Array.from(galleryCards).map((card, index) => {
        const img = card.querySelector('img');
        card.setAttribute('data-ai-id', `img_${index}`);
        return {
          id: `img_${index}`,
          category: card.getAttribute('data-category'),
          alt: img ? img.getAttribute('alt') : '',
          src: img ? img.getAttribute('src') : ''
        };
      });

      try {
        const response = await fetch(`${aiBaseUrl}/search-gallery`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query, availableImages })
        });
        const data = await response.json();
        
        if (data.matchingIds && Array.isArray(data.matchingIds)) {
          // Filter gallery
          galleryCards.forEach(card => {
            const id = card.getAttribute('data-ai-id');
            if (data.matchingIds.includes(id)) {
              card.classList.remove('is-hidden');
            } else {
              card.classList.add('is-hidden');
            }
          });
        }
      } catch (err) {
        console.error('AI Search Error:', err);
        // Fallback: clear search visually
      } finally {
        searchBtn.textContent = originalText;
        searchBtn.disabled = false;
      }
    });

    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') searchBtn.click();
    });
  }
};

document.addEventListener('DOMContentLoaded', setupAIGallerySearch);

// 4. AI Caption Generator
const setupAICaptions = () => {
  const captionBtn = document.getElementById('ai-caption-btn');
  const captionBox = document.getElementById('ai-caption-box');
  const lightboxImage = document.getElementById('lightboxImage');
  const closeLightbox = document.getElementById('closeLightbox');

  if (captionBtn && captionBox && lightboxImage) {
    captionBtn.addEventListener('click', async () => {
      const imageContext = lightboxImage.getAttribute('alt') || 'A beautiful luxury Indian wedding photograph';
      
      const originalText = captionBtn.textContent;
      captionBtn.textContent = '✨ Generating...';
      captionBtn.disabled = true;
      captionBox.style.display = 'none';

      try {
        const response = await fetch(`${aiBaseUrl}/generate-caption`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageContext })
        });
        const data = await response.json();
        
        if (data.captions) {
          captionBox.style.display = 'block';
          captionBox.innerHTML = `
            <h4>Instagram</h4>
            <p>${data.captions.instagram}</p>
            <h4>Facebook</h4>
            <p>${data.captions.facebook}</p>
            <h4>Quote</h4>
            <p><em>"${data.captions.quote}"</em></p>
          `;
        }
      } catch (err) {
        console.error('Caption Error:', err);
      } finally {
        captionBtn.textContent = originalText;
        captionBtn.disabled = false;
      }
    });

    // Reset when lightbox closes
    if (closeLightbox) {
      closeLightbox.addEventListener('click', () => {
        captionBox.style.display = 'none';
        captionBox.innerHTML = '';
      });
    }
  }
};

document.addEventListener('DOMContentLoaded', setupAICaptions);

// 5. AI FAQ
const setupAIFAQ = () => {
  const faqInput = document.getElementById('ai-faq-input');
  const faqBtn = document.getElementById('ai-faq-btn');
  const faqResult = document.getElementById('ai-faq-result');

  if (faqInput && faqBtn && faqResult) {
    const askQuestion = async () => {
      const question = faqInput.value.trim();
      if (!question) return;

      faqBtn.textContent = 'Asking...';
      faqBtn.disabled = true;

      try {
        const response = await fetch(`${aiBaseUrl}/faq`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question })
        });
        const data = await response.json();
        
        if (data.answer) {
          faqResult.style.display = 'block';
          faqResult.innerHTML = `<strong>Q: ${question}</strong><br><br><p>${data.answer.replace(/\n/g, '<br>')}</p>`;
        }
      } catch (err) {
        faqResult.style.display = 'block';
        faqResult.innerHTML = '<p>Unable to answer your question right now.</p>';
      } finally {
        faqBtn.textContent = 'Ask AI';
        faqBtn.disabled = false;
        faqInput.value = '';
      }
    };

    faqBtn.addEventListener('click', askQuestion);
    faqInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') askQuestion();
    });
  }
};

document.addEventListener('DOMContentLoaded', setupAIFAQ);


// 6. Dynamic Booking Recommendation
document.addEventListener('DOMContentLoaded', () => {
  const eventTypeSelect = document.getElementById('eventType');
  const budgetSelect = document.getElementById('budget');
  const guestCountInput = document.getElementById('guestCount');
  const aiCard = document.getElementById('dynamic-ai-recommendation');
  const aiCardText = document.getElementById('dynamic-ai-recommendation-text');
  
  if (eventTypeSelect && budgetSelect && guestCountInput && aiCard && aiCardText) {
    const checkFields = () => {
      const eType = eventTypeSelect.value;
      const budget = budgetSelect.value;
      const guests = guestCountInput.value;
      
      if (eType && budget && guests) {
        let recommendation = "the Premium Package";
        
        if (budget === 'above_2lakhs' || eType === 'Wedding') {
          recommendation = "the Editorial Package for complete luxury cinematic coverage";
        } else if (budget === '1lakh_2lakhs' && parseInt(guests) > 300) {
          recommendation = "the Premium Package to ensure all your guests are captured beautifully";
        } else if (budget === 'under_50k') {
          recommendation = "the Signature Package for an elegant and focused experience";
        } else {
          recommendation = "the Deluxe Package, perfectly balancing candid and traditional moments";
        }
        
        aiCardText.innerHTML = `Based on your event details for a ${eType} with ${guests} guests, our AI recommends <strong>${recommendation}</strong>.`;
        aiCard.style.display = 'block';
      } else {
        aiCard.style.display = 'none';
      }
    };

    eventTypeSelect.addEventListener('change', checkFields);
    budgetSelect.addEventListener('change', checkFields);
    guestCountInput.addEventListener('input', checkFields);
  }
});
