/**
 * ABC Consultancy | Study Abroad & Overseas Education
 * Contact: +91 72919 19145 | gulshanjpg@gmail.com
 * Address: Suite 404, Apex Business Tower, MG Road, Tech City – 110001
 */

document.addEventListener('DOMContentLoaded', () => {
  // Update current copyright year
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuIcon = document.getElementById('menuIcon');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      if (isHidden) {
        mobileMenu.classList.remove('hidden');
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-xmark');
      } else {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('fa-xmark');
        menuIcon.classList.add('fa-bars');
      }
    });

    // Close mobile menu on clicking any link
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('fa-xmark');
        menuIcon.classList.add('fa-bars');
      });
    });
  }

  // Navbar shadow on scroll
  const header = document.getElementById('mainHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('shadow-md');
    } else {
      header.classList.remove('shadow-md');
    }
  });

  // Animate stats counter numbers when in view
  initCounters();
});

// ================= COUNTER ANIMATION =================
function initCounters() {
  const counters = document.querySelectorAll('.count-number');
  let animated = false;

  const runAnimation = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const originalText = counter.innerText;
      let suffix = '+';
      if (originalText.includes('%')) suffix = '%';
      else if (originalText.includes('Cr')) suffix = 'Cr+';
      else if (originalText.includes('k')) suffix = 'k+';

      let current = 0;
      const step = Math.max(1, Math.ceil(target / 45));

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          counter.innerText = target.toLocaleString() + suffix;
          clearInterval(timer);
        } else {
          counter.innerText = current.toLocaleString() + suffix;
        }
      }, 30);
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        runAnimation();
      }
    });
  }, { threshold: 0.4 });

  if (counters.length > 0) {
    observer.observe(counters[0]);
  }
}

// ================= HERO SEARCH & FILTERING =================
function handleHeroSearch(event) {
  event.preventDefault();
  const country = document.getElementById('heroCountry').value.toLowerCase();
  const level = document.getElementById('heroLevel').value;

  // Scroll to programs section
  const programsSec = document.getElementById('programsGrid');
  if (programsSec) {
    programsSec.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  // Filter based on selected destination
  if (country === 'all') {
    filterPrograms('all', document.querySelector('.filter-btn'));
  } else if (country.includes('russia')) {
    filterPrograms('russia');
  } else if (country.includes('uzbekistan')) {
    filterPrograms('uzbekistan');
  } else if (country.includes('kazakhstan')) {
    filterPrograms('kazakhstan');
  } else if (country.includes('georgia')) {
    filterPrograms('georgia');
  } else if (country.includes('kyrgyzstan')) {
    filterPrograms('kyrgyzstan');
  } else {
    filterPrograms('europe');
  }
}

function quickFilter(degree, country) {
  const modalInput = document.getElementById('mProgram');
  if (modalInput) modalInput.value = `${degree} in ${country}`;
  
  const countryLower = country.toLowerCase();
  if (countryLower.includes('russia')) filterPrograms('russia');
  else if (countryLower.includes('uzbekistan')) filterPrograms('uzbekistan');
  else if (countryLower.includes('kazakhstan')) filterPrograms('kazakhstan');
  else if (countryLower.includes('georgia')) filterPrograms('georgia');
  else if (countryLower.includes('kyrgyz')) filterPrograms('kyrgyzstan');
  
  openConsultationModal(`${degree} in ${country}`);
}

// ================= PROGRAM CARDS FILTERING =================
function filterPrograms(category, btnElement) {
  // Update button active state
  if (btnElement) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.remove('bg-brand-orange', 'text-white', 'shadow-sm');
      btn.classList.add('bg-white', 'text-slate-700');
    });
    btnElement.classList.remove('bg-white', 'text-slate-700');
    btnElement.classList.add('bg-brand-orange', 'text-white', 'shadow-sm');
  }

  const cards = document.querySelectorAll('.program-card');
  cards.forEach(card => {
    const cardCountry = card.getAttribute('data-country');
    if (category === 'all' || cardCountry === category) {
      card.style.display = 'flex';
      card.classList.add('chat-bubble-enter');
    } else {
      card.style.display = 'none';
    }
  });
}

// ================= ABC AI COUNSELOR SIMULATION =================
const aiResponses = {
  russia: "🇷🇺 **MBBS in Russia (NMC & WHO Approved):** Top medical universities with 100% English-medium instruction, 6-year clinical program strictly complying with NMC guidelines, Indian mess available, with tuition fees starting around ₹3.2 to ₹4.5 Lakhs/year. Connect with ABC Consultancy for full university profiles!",
  uzbekistan: "🇺🇿 **MBBS in Uzbekistan:** Highly affordable medical education with direct flights from India. Top universities like Samarkand State Medical University offer complete 5.5-year degrees with annual tuition fees starting around ₹2.5 to ₹3.5 Lakhs/year and safe on-campus hostels.",
  kazakhstan: "🇰🇿 **MBBS in Kazakhstan:** Renowned national medical institutions with modern clinical simulation hospitals, English-medium training, and annual packages around ₹3.2 to ₹4.0 Lakhs/year.",
  georgia: "🇬🇪 **MBBS / European MD in Georgia:** European curriculum standard with 100% English-medium coursework, high USMLE/PLAB success rate, and safe student living in Europe.",
  kyrgyzstan: "🇰🇬 **MBBS in Kyrgyzstan:** The most economical medical destination with complete packages starting from ₹16 to ₹18 Lakhs total for the entire degree, with Indian mess and hostel facilities.",
  nmc: "📋 **NMC Gazette Compliance:** All foreign medical universities recommended by ABC Consultancy strictly adhere to the NMC Foreign Medical Graduate Licentiate (FMGL) Regulations: 54+ months academic training, 12 months clinical internship at the same institution, and 100% English-medium teaching.",
  fees: "💰 **Budget & Fees:** ABC Consultancy provides 100% transparent fee breakdowns with zero hidden charges. All tuition fees are directly payable to the university bank account.",
  neet: "🎯 **NEET Qualification:** Qualifying NEET-UG is mandatory for Indian citizens desiring to pursue MBBS abroad. The qualifying score is valid for 3 consecutive years for foreign medical admissions.",
  abroad: "🎓 **Overseas Higher Education:** We also guide students for Master's, Bachelor's, and MBA degrees in the UK, Germany, USA, Canada, and Ireland with generous scholarships and post-study work visas.",
  office: "📍 **ABC Consultancy Office:** We are located at Suite 404, Apex Business Tower, MG Road, Tech City – 110001. Contact our team at +91 72919 19145 or email gulshanjpg@gmail.com!",
  default: "Thank you for reaching out! ABC Consultancy provides premier guidance for MBBS Abroad (Russia, Uzbekistan, Kazakhstan, Georgia, Kyrgyzstan) and Global Higher Education (UK, Germany, USA). All universities are 100% recognized. Click 'Book Free Counseling' or message us on WhatsApp (+91 72919 19145) to connect directly!"
};

function simulateAI(prompt) {
  const input = document.getElementById('aiInput');
  if (input) input.value = prompt;
  handleAIChatSubmit(new Event('submit'));
}

function handleAIChatSubmit(e) {
  if (e && e.preventDefault) e.preventDefault();
  const input = document.getElementById('aiInput');
  const windowEl = document.getElementById('aiChatWindow');
  const query = input ? input.value.trim() : '';
  if (!query) return;

  // Append User message
  const userMsg = document.createElement('div');
  userMsg.className = 'flex items-start justify-end gap-3 chat-bubble-enter';
  userMsg.innerHTML = `
    <div class="bg-brand-orange text-white p-3.5 rounded-2xl rounded-tr-none max-w-lg shadow-sm text-sm">
      ${escapeHtml(query)}
    </div>
  `;
  windowEl.appendChild(userMsg);
  input.value = '';
  windowEl.scrollTop = windowEl.scrollHeight;

  // Determine response
  let answer = aiResponses.default;
  const qLower = query.toLowerCase();

  if (qLower.includes('russia') || qLower.includes('bashkir') || qLower.includes('kazan')) {
    answer = aiResponses.russia;
  } else if (qLower.includes('uzbekistan') || qLower.includes('samarkand') || qLower.includes('tashkent')) {
    answer = aiResponses.uzbekistan;
  } else if (qLower.includes('kazakhstan') || qLower.includes('almaty') || qLower.includes('semey')) {
    answer = aiResponses.kazakhstan;
  } else if (qLower.includes('georgia') || qLower.includes('tbilisi')) {
    answer = aiResponses.georgia;
  } else if (qLower.includes('kyrgyz') || qLower.includes('ksma')) {
    answer = aiResponses.kyrgyzstan;
  } else if (qLower.includes('nmc') || qLower.includes('gazette') || qLower.includes('rule')) {
    answer = aiResponses.nmc;
  } else if (qLower.includes('fee') || qLower.includes('cost') || qLower.includes('budget') || qLower.includes('lakh')) {
    answer = aiResponses.fees;
  } else if (qLower.includes('neet') || qLower.includes('cutoff') || qLower.includes('score')) {
    answer = aiResponses.neet;
  } else if (qLower.includes('uk') || qLower.includes('germany') || qLower.includes('master') || qLower.includes('bachelor') || qLower.includes('mba')) {
    answer = aiResponses.abroad;
  } else if (qLower.includes('office') || qLower.includes('address') || qLower.includes('contact') || qLower.includes('phone') || qLower.includes('email')) {
    answer = aiResponses.office;
  }

  // Simulate typing indicator then answer
  setTimeout(() => {
    const aiMsg = document.createElement('div');
    aiMsg.className = 'flex items-start gap-3 chat-bubble-enter';
    aiMsg.innerHTML = `
      <div class="w-8 h-8 rounded-full bg-brand-orange/20 text-brand-orange flex items-center justify-center text-xs shrink-0 mt-0.5">
        <i class="fa-solid fa-graduation-cap"></i>
      </div>
      <div class="bg-slate-700/60 text-slate-200 p-3.5 rounded-2xl rounded-tl-none max-w-lg border border-slate-600/50 leading-relaxed text-sm">
        ${formatAIAnswer(answer)}
      </div>
    `;
    windowEl.appendChild(aiMsg);
    windowEl.scrollTop = windowEl.scrollHeight;
  }, 400);
}

function formatAIAnswer(text) {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.innerText = text;
  return div.innerHTML;
}

// ================= CONSULTATION MODAL =================
function openConsultationModal(presetProgram = '') {
  const modal = document.getElementById('consultationModal');
  const programInput = document.getElementById('mProgram');
  if (programInput && presetProgram) {
    programInput.value = presetProgram;
  }
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeConsultationModal() {
  const modal = document.getElementById('consultationModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Close on outside backdrop click
window.addEventListener('click', (e) => {
  const modal = document.getElementById('consultationModal');
  if (e.target === modal) {
    closeConsultationModal();
  }
});

function handleModalSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('mName').value;
  const phone = document.getElementById('mPhone').value;
  const email = document.getElementById('mEmail').value;
  const country = document.getElementById('mCountry').value;
  const program = document.getElementById('mProgram').value || 'Higher Education / MBBS';
  const meetingMode = document.querySelector('input[name="mMeeting"]:checked')?.value || 'In-person Office';

  const feedback = document.getElementById('modalFeedback');
  if (feedback) feedback.classList.remove('hidden');

  // Open WhatsApp prefilled with lead data for ABC Consultancy (+91 72919 19145)
  const waMsg = encodeURIComponent(
    `Hello ABC Consultancy!\nI would like to book a free counseling session.\n\n👤 Name: ${name}\n📞 Phone: ${phone}\n✉️ Email: ${email}\n🌍 Target Destination: ${country}\n🎓 Program: ${program}\n📍 Meeting Mode: ${meetingMode}\n🏢 Center: ABC Consultancy (Suite 404, Apex Business Tower)`
  );
  
  setTimeout(() => {
    window.open(`https://wa.me/917291919145?text=${waMsg}`, '_blank');
  }, 900);
}

// ================= CALLBACK FORM =================
function handleGuidanceForm(event) {
  event.preventDefault();
  const name = document.getElementById('gName').value;
  const phone = document.getElementById('gPhone').value;
  const email = document.getElementById('gEmail').value;
  const country = document.getElementById('gCountry').value;
  const stream = document.getElementById('gStream').value;
  const mode = document.querySelector('input[name="consultMode"]:checked')?.value || 'In-person Office';

  const feedback = document.getElementById('guidanceFeedback');
  if (feedback) feedback.classList.remove('hidden');

  const waMsg = encodeURIComponent(
    `Hello ABC Consultancy!\nI requested a callback from your website:\n\n👤 Name: ${name}\n📞 Phone: ${phone}\n✉️ Email: ${email}\n🌍 Country of Interest: ${country}\n🎓 Course/Stream: ${stream}\n📍 Consultation Mode: ${mode}`
  );

  setTimeout(() => {
    window.open(`https://wa.me/917291919145?text=${waMsg}`, '_blank');
  }, 900);
}

// ================= FAQ ACCORDION =================
function toggleFaq(button) {
  const answer = button.nextElementSibling;
  const icon = button.querySelector('i');
  const isHidden = answer.classList.contains('hidden');

  // Close all others
  document.querySelectorAll('.faq-answer').forEach(el => el.classList.add('hidden'));
  document.querySelectorAll('.faq-item button i').forEach(ic => ic.classList.remove('rotate-180'));

  if (isHidden) {
    answer.classList.remove('hidden');
    if (icon) icon.classList.add('rotate-180');
  }
}
