// Intersection Observer for scroll animations on sections
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -120px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.classList.remove('hidden');
        } else {
            entry.target.classList.remove('visible');
            entry.target.classList.add('hidden');
        }
    });
}, observerOptions);

// Image Fade-In Observer for scroll animation
const imageObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, imageObserverOptions);

// Initialize observers
document.addEventListener('DOMContentLoaded', () => {
    // Observe all service sections for text animations
    const sections = document.querySelectorAll('.service-section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Observe all service images for fade-in animation
    const images = document.querySelectorAll('.service-image');
    images.forEach(image => {
        imageObserver.observe(image);
    });
});



    // Zoom Animation Logic

    gsap.registerPlugin(ScrollTrigger);

        const panels = document.querySelectorAll('.service-panel');
        const progressBar = document.querySelector('.progress-bar');
        const counter = document.querySelector('.service-counter');
        const totalPanels = panels.length;

        // Create main timeline
        const mainTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: '.scroll-container',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1,
                onUpdate: (self) => {
                    // Update progress bar
                    progressBar.style.width = (self.progress * 100) + '%';
                    
                    // Update counter
                    const currentIndex = Math.min(Math.floor(self.progress * totalPanels) + 1, totalPanels);
                    counter.textContent = `${currentIndex} / ${totalPanels}`;
                }
            }
        });

        // Animate each panel
        panels.forEach((panel, index) => {
            const icon = panel.querySelector('.service-icon');
            const title = panel.querySelector('.service-title');
            const description = panel.querySelector('.service-description');
            const tags = panel.querySelectorAll('.tag');
            
            // Calculate timing for each panel
            const panelDuration = 1;
            const startTime = index * panelDuration;
            
            // Entry animations
            mainTimeline
                .set(panel, { visibility: 'visible' }, startTime)
                .fromTo(panel, 
                    { opacity: 0 },
                    { opacity: 1, duration: 0.3, ease: 'power2.out' },
                    startTime
                )
                .fromTo(icon,
                    { scale: 0, rotation: -180, y: -100 },
                    { scale: 1, rotation: 0, y: 0, duration: 0.5, ease: 'back.out(1.7)' },
                    startTime + 0.1
                )
                .fromTo(title,
                    { y: 100, opacity: 0, scale: 0.8 },
                    { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out' },
                    startTime + 0.2
                )
                .fromTo(description,
                    { y: 50, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
                    startTime + 0.3
                );
            
            // Tags stagger animation
            tags.forEach((tag, tagIndex) => {
                mainTimeline.fromTo(tag,
                    { x: -50, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.3, ease: 'power2.out' },
                    startTime + 0.4 + (tagIndex * 0.1)
                );
            });
            
            // Exit animations (except for last panel)
            if (index < panels.length - 1) {
                mainTimeline
                    .to(tags,
                        { x: 50, opacity: 0, duration: 0.3, ease: 'power2.in', stagger: 0.05 },
                        startTime + 0.7
                    )
                    .to(description,
                        { y: -50, opacity: 0, duration: 0.3, ease: 'power2.in' },
                        startTime + 0.7
                    )
                    .to(title,
                        { y: -100, opacity: 0, scale: 0.8, duration: 0.4, ease: 'power3.in' },
                        startTime + 0.75
                    )
                    .to(icon,
                        { scale: 0, rotation: 180, y: 100, duration: 0.4, ease: 'back.in(1.7)' },
                        startTime + 0.8
                    )
                    .to(panel,
                        { opacity: 0, duration: 0.2, ease: 'power2.in' },
                        startTime + 0.9
                    )
                    .set(panel, { visibility: 'hidden' }, startTime + 1);
            }
        });

        // Grid background animation
        gsap.to('.grid-background', {
            scrollTrigger: {
                trigger: '.scroll-container',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1
            },
            rotation: 5,
            scale: 1.2,
            opacity: 0.3
        });

function showDetail(phaseId) {
  // Hide the main workflow view
  document.getElementById("workflowView").style.display = "none";

  // Show the selected phase detail
  const selected = document.getElementById(phaseId);
  if (selected) {
    selected.classList.add("active");
  }
  
  // Scroll to top for better UX
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function hideDetail() {
  // Show the main workflow again
  document.getElementById("workflowView").style.display = "flex";

  // Hide all detail views
  const details = document.querySelectorAll(".detail-view");
  details.forEach(d => d.classList.remove("active"));
}
      

//contact form

(function() {
  // Initialize EmailJS only once globally
  emailjs.init("p1LpwogsoxyskriDR");
})();

document.addEventListener("DOMContentLoaded", function () {
  const serviceForm = document.getElementById("serviceContactForm");
  const serviceStatus = document.getElementById("serviceFormStatus");

  if (serviceForm) {
    serviceForm.addEventListener("submit", function (event) {
      event.preventDefault();

      // Get Form Data
      const name = document.getElementById("service-name").value.trim();
      const email = document.getElementById("service-email").value.trim();
      const countryCode = document.getElementById("country-code").value.trim();
      const mobile = document.getElementById("service-mobile").value.trim();
      const message = document.getElementById("service-message").value.trim();

      // Basic Validation
      if (!name || !email || !mobile || !countryCode) {
        serviceStatus.textContent = "Please fill all required fields!";
        serviceStatus.style.color = "#d11717";
        return;
      }

      if (!email.includes("@")) {
        serviceStatus.textContent = "Enter a valid email!";
        serviceStatus.style.color = "#d11717";
        return;
      }

      if (mobile.length !== 10) {
        serviceStatus.textContent = "Mobile number must be 10 digits!";
        serviceStatus.style.color = "#d11717";
        return;
      }

      // Prepare Template Data
      const templateParams = {
        name: name,
        email: email,
        country_code: countryCode,
        mobile: mobile,
        message: message
      };

      // Send Email via EmailJS
      emailjs
        .send("service_tsikr", "template_0uvxn0e", templateParams)
        .then(
          () => {
            serviceStatus.textContent = "Message sent successfully!";
            serviceStatus.style.color = "#108010";
            serviceForm.reset();
            document.getElementById("country-code").value = "+91";
          },
          (error) => {
            console.error("EmailJS Error:", error);
            serviceStatus.textContent = "Oops! Something went wrong. Try again!";
            serviceStatus.style.color = "#d11717";
          }
        );
    });
  }
});