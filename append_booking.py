js_to_append = """

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
"""

with open("script.js", "a") as f:
    f.write(js_to_append)

print("Appended JS successfully.")
