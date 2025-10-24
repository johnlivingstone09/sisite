 
    // Initialize EmailJS
    emailjs.init("p1LpwogsoxyskriDR");

    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    // Hero Animation
    gsap.from(".hero-text", {
      opacity: 0,
      x: -100,
      duration: 1,
      ease: "power3.out"
    });

    gsap.from(".phone-mockup", {
      opacity: 0,
      scale: 0.8,
      duration: 1,
      delay: 0.3,
      ease: "back.out(1.7)"
    });

    // Stats Counter Animation
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'));
      
      ScrollTrigger.create({
        trigger: stat,
        start: "top 80%",
        onEnter: () => {
          let current = 0;
          const increment = target / 50;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              stat.textContent = target.toLocaleString();
              clearInterval(timer);
            } else {
              stat.textContent = Math.floor(current).toLocaleString();
            }
          }, 30);
        }
      });
    });

    // Flip Cards Animation
    gsap.from(".flip-card", {
      scrollTrigger: {
        trigger: ".flip-section",
        start: "top 70%"
      },
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 0.8
    });

    // Calculator Logic
    const priceInput = document.getElementById('priceInput');
    const priceSlider = document.getElementById('priceSlider');
    const reachOutput = document.getElementById('reachOutput');
    const quoteBox = document.getElementById('quoteBox');

    const quotes = [
      { threshold: 1000, text: "Start small, grow big. Every successful campaign begins with a single step." },
      { threshold: 3000, text: "Your budget can reach thousands of potential customers daily." },
      { threshold: 5000, text: "Great campaigns are built on strategic investments." },
      { threshold: 7000, text: "Scaling your reach to maximize brand visibility and engagement." },
      { threshold: 10000, text: "Enterprise-level campaigns that dominate the market." }
    ];

    function updateCalculator() {
      const price = parseInt(priceInput.value) || 0;
      priceSlider.value = price;
      
      // Calculate reach (5x multiplier)
      const reach = price * 15;
      reachOutput.textContent = reach.toLocaleString();
      
      // Update quote
      const quote = quotes.reverse().find(q => price >= q.threshold) || quotes[0];
      quoteBox.querySelector('p').textContent = `"${quote.text}"`;
    }

    priceInput.addEventListener('input', updateCalculator);
    priceSlider.addEventListener('input', (e) => {
      priceInput.value = e.target.value;
      updateCalculator();
    });

    // Order Modal
    function openOrderModal() {
      document.getElementById('orderModal').style.display = 'block';
    }

    function closeOrderModal() {
      document.getElementById('orderModal').style.display = 'none';
    }

    // Order Form Submission
    document.getElementById('orderForm').addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = {
        name: this.name.value,
        email: this.email.value,
        phone: this.phone.value,
        service: this.service.value
      };

      emailjs.send("service_YOUR_SERVICE_ID", "template_YOUR_TEMPLATE_ID", formData)
        .then(() => {
          alert('Order confirmed! We will contact you shortly.');
          closeOrderModal();
          this.reset();
        })
        .catch(() => {
          alert('Order received! Our team will reach out to you soon.');
          closeOrderModal();
          this.reset();
        });
    });

    // Campaign Form Submission
    document.getElementById('campaignForm').addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = {
        organization: this.organization.value,
        email: this.email.value,
        phone: this.phone.value,
        budget: this.budget.value,
        reach: this.reach.value,
        goals: this.goals.value
      };

      // Send email using EmailJS
      emailjs.send("service_eo2o0dd", "template_campaign", {
        to_email: "your-email@tristone.com",
        organization: formData.organization,
        email: formData.email,
        phone: formData.phone,
        budget: formData.budget,
        reach: formData.reach,
        goals: formData.goals
      })
        .then(() => {
          alert('Campaign details submitted successfully! Our team will contact you within 24 hours.');
          this.reset();
        })
        .catch(() => {
          alert('Thank you for your submission! We have received your campaign request and will get back to you soon.');
          this.reset();
        });
    });

    // Smooth Scroll Animation
    gsap.from(".calculator-container", {
      scrollTrigger: {
        trigger: ".calculator-section",
        start: "top 70%"
      },
      opacity: 0,
      y: 50,
      duration: 0.8
    });

    gsap.from(".form-container", {
      scrollTrigger: {
        trigger: ".form-section",
        start: "top 70%"
      },
      opacity: 0,
      y: 50,
      duration: 0.8
    });

    // Close modal on outside click
    window.onclick = function(event) {
      const modal = document.getElementById('orderModal');
      if (event.target == modal) {
        closeOrderModal();
      }
    }
   const contactBtn = document.getElementById('contactBtn');
  const popup = document.getElementById('popupForm');
  const closeBtn = document.getElementById('closeBtn');

  // Open popup
  contactBtn.addEventListener('click', () => {
    popup.style.display = 'flex';
  });

  // Close popup
  closeBtn.addEventListener('click', () => {
    popup.style.display = 'none';
  });

  // Close when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === popup) {
      popup.style.display = 'none';
    }
  });

  // Handle form submission (example)
  document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you! Your details have been submitted.');
    popup.style.display = 'none';
  });