 document.getElementById("flipButton").addEventListener("click", function() {
        window.location.href = "pay.html";
    });

        // Auto flip button every 3 seconds
        const flipButton = document.getElementById('flipButton');
        
        setInterval(() => {
            flipButton.classList.toggle('flipped');
        }, 3000);

        // Optional: Manual click to flip
        flipButton.addEventListener('click', () => {
            flipButton.classList.toggle('flipped');
        });

        // Carousel functionality
        const carouselContainer = document.getElementById('carouselContainer');
        const carouselTrack = document.getElementById('carouselTrack');
        let isScrolling = true;
        let scrollPosition = 0;
        let animationId;

        // Duplicate images for seamless loop
        const originalItems = carouselTrack.innerHTML;
        carouselTrack.innerHTML = originalItems + originalItems + originalItems;

        function scrollCarousel() {
            if (isScrolling) {
                scrollPosition += 1;
                carouselTrack.style.transform = `translateX(-${scrollPosition}px)`;

                // Reset position for seamless loop
                const itemWidth = carouselTrack.firstElementChild.offsetWidth + 24;
                const totalWidth = itemWidth * 7;
                
                if (scrollPosition >= totalWidth) {
                    scrollPosition = 0;
                    carouselTrack.style.transform = `translateX(0)`;
                }
            }
            animationId = requestAnimationFrame(scrollCarousel);
        }

        // Start animation
        scrollCarousel();

        // Pause on click
        carouselContainer.addEventListener('click', () => {
            isScrolling = !isScrolling;
        });

           // Testimonials Data
        const testimonials = [
            {
                name: "Praveen",
                role: "IoT Enthusiast",
                text: "This workshop transformed my understanding of IoT. The hands-on approach and expert guidance made complex concepts easy to grasp. Highly recommended!",
                initial: "P"
            },
            {
                name: "Malaveeka",
                role: "Engineering Student",
                text: "An incredible learning experience! The practical sessions were engaging and the internship opportunity is a game-changer for my career.",
                initial: "M"
            },
            {
                name: "Pandiyaraja",
                role: "Tech Enthusiast",
                text: "Best IoT workshop I've attended. The instructor's expertise and the comprehensive curriculum exceeded my expectations. Worth every moment!",
                initial: "P"
            },
            {
                name: "Vinoth",
                role: "Computer Science Student",
                text: "The workshop provided practical insights into real-world IoT applications. The certification and internship guarantee make it even more valuable.",
                initial: "V"
            },
            {
                name: "Hepziba",
                role: "Innovation Seeker",
                text: "Outstanding workshop! I gained practical skills that I can immediately apply. The instructor's passion for IoT is truly inspiring.",
                initial: "H"
            },
            {
                name: "Akshaya",
                role: "Future Innovator",
                text: "A must-attend workshop for anyone interested in IoT! The blend of theory and practice was perfect, and the support was exceptional.",
                initial: "A"
            }
        ];

        // Generate testimonial cards
        const testimonialsTrack = document.getElementById('testimonialsTrack');
        const originalTestimonials = testimonials.map(t => `
            <div class="testimonial-card">
                <div class="testimonial-header">
                    <div class="testimonial-avatar">${t.initial}</div>
                    <div class="testimonial-info">
                        <div class="testimonial-name">${t.name}</div>
                        <div class="testimonial-role">${t.role}</div>
                    </div>
                    <div class="testimonial-rating">⭐⭐⭐⭐⭐</div>
                </div>
                <p class="testimonial-text">"${t.text}"</p>
            </div>
        `).join('');

        // Duplicate for seamless loop
        testimonialsTrack.innerHTML = originalTestimonials + originalTestimonials + originalTestimonials;

        // Testimonials scroll animation
        let testimonialScrollPosition = 0;
        let isTestimonialScrolling = true;
        let pausedCard = null;

        function scrollTestimonials() {
            if (isTestimonialScrolling) {
                testimonialScrollPosition += 0.5;
                testimonialsTrack.style.transform = `translateY(-${testimonialScrollPosition}px)`;

                const cards = testimonialsTrack.querySelectorAll('.testimonial-card');
                const cardHeight = cards[0].offsetHeight + 20;
                const totalHeight = cardHeight * testimonials.length;

                if (testimonialScrollPosition >= totalHeight) {
                    testimonialScrollPosition = 0;
                    testimonialsTrack.style.transform = `translateY(0)`;
                }
            }
            requestAnimationFrame(scrollTestimonials);
        }

        scrollTestimonials();

        // Pause on hover
        testimonialsTrack.addEventListener('mouseover', (e) => {
            if (e.target.closest('.testimonial-card')) {
                isTestimonialScrolling = false;
                pausedCard = e.target.closest('.testimonial-card');
                pausedCard.classList.add('paused');
            }
        });

        testimonialsTrack.addEventListener('mouseout', (e) => {
            if (e.target.closest('.testimonial-card')) {
                isTestimonialScrolling = true;
                if (pausedCard) {
                    pausedCard.classList.remove('paused');
                    pausedCard = null;
                }
            }
        });

        // College Logos Data with actual images
        const colleges = [
            { name: "Anna University", logo: "image/annaUniv.avif" },
            { name: "SRM University", logo: "image/srm.png" },
            { name: "VIT University", logo: "image/vit.png" },
            { name: "Sathyabama University", logo: "image/sathyabama.jpg" },
            { name: "NIT", logo: "image/nit.png" },
            { name: "IIT", logo: "image/iit.png" },
            { name: "sastra", logo: "image/sastra.png" },
            { name: "KRC", logo: "image/krc.png" },
            { name: "sowdambika", logo: "image/Sowdambikaa.webp" },
            { name: "saranatahn", logo: "image/saranathan.jpeg" },
            { name: "DSU", logo: "image/dsu.jpg" }
        ];

        // Generate college logos
        const collegeTrack = document.getElementById('collegeTrack');
        const originalLogos = colleges.map(c => `
            <div class="college-logo">
                <img src="${c.logo}" alt="${c.name}" title="${c.name}">
            </div>
        `).join('');

        // Duplicate for seamless loop
        collegeTrack.innerHTML = originalLogos + originalLogos + originalLogos;

        // College logos scroll animation (right to left)
        let collegeScrollPosition = 0;

        function scrollColleges() {
            collegeScrollPosition += 1;
            collegeTrack.style.transform = `translateX(-${collegeScrollPosition}px)`;

            const logos = collegeTrack.querySelectorAll('.college-logo');
            const logoWidth = logos[0].offsetWidth + 60;
            const totalWidth = logoWidth * colleges.length;

            if (collegeScrollPosition >= totalWidth) {
                collegeScrollPosition = 0;
                collegeTrack.style.transform = `translateX(0)`;
            }

            requestAnimationFrame(scrollColleges);
        }

        scrollColleges();

         

         // Scroll animation
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        function checkScroll() {
            const triggerBottom = window.innerHeight * 0.8;
            
            timelineItems.forEach(item => {
                const itemTop = item.getBoundingClientRect().top;
                const itemBottom = item.getBoundingClientRect().bottom;
                
                // Animate in when scrolling down
                if (itemTop < triggerBottom && itemBottom > 0) {
                    item.classList.add('animate-in');
                } 
                // Animate out when scrolling up past the item
                else if (itemBottom < 0 || itemTop > window.innerHeight) {
                    item.classList.remove('animate-in');
                }
            });
        }
        
        // Check on scroll
        window.addEventListener('scroll', checkScroll);
        
        // Check on load
        checkScroll();

          function toggleFaq(element) {
            const faqItem = element.parentElement;
            const wasActive = faqItem.classList.contains('active');
            
            // Close all FAQs
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked FAQ if it wasn't already open
            if (!wasActive) {
                faqItem.classList.add('active');
            }
        }

        function openWhatsApp(e) {
  e.preventDefault();

  // Detect if user is on a mobile device
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  const message = encodeURIComponent("Hi Tri Stone Industries, I would like to know more about your IoT workshop.");
  const phone = "918072089889";

  // Open directly inside WhatsApp app for mobile users
  const whatsappURL = isMobile
    ? `whatsapp://send?phone=${phone}&text=${message}`
    : `https://web.whatsapp.com/send?phone=${phone}&text=${message}`;

  window.open(whatsappURL, "_blank");
}