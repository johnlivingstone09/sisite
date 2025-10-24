// Hero Animation
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // Reset initial state for all parts
  gsap.set(".part", { x: 0, y: 0, scale: 0, opacity: 0 });
  gsap.set(".hero-text span", { opacity: 0, y: 30 });

  // Create separate timelines for better control
  const logoTimeline = gsap.timeline({
    defaults: { ease: "power3.out", duration: 1 }
  });

  const textTimeline = gsap.timeline({
    defaults: { ease: "power2.out", duration: 0.8 }
  });

  // Logo animation timeline
  logoTimeline.fromTo(".part1", { x: -10, y: -50, scale: 0 }, { x: 0, y: 0, scale: 1.5, opacity: 1 }, 0);
  logoTimeline.fromTo(".part2", { x: 0, y: 0, scale: 4 }, { x: 0, y: -10, scale: 0.9, opacity: 1 }, "-=0.8");

  // Other parts
  const parts = [
    { sel: ".part3", x: 0, y: -95, s: 0.75 },
    { sel: ".part4", x: -55, y: -88, s: 0.4 },
    { sel: ".part5", x: 59, y: -88, s: 0.4 },
    { sel: ".part6", x: -81, y: -40, s: 0.42 },
    { sel: ".part7", x: -60, y: 13, s: 0.84 },
    { sel: ".part8", x: -27, y: 60, s: 0.4 },
    { sel: ".part9", x: 24, y: 60, s: 0.4 },
    { sel: ".part10", x: 57, y: 15, s: 0.82 },
    { sel: ".part11", x: 80, y: -40, s: 0.4 }
  ];

  parts.forEach(p => {
    logoTimeline.fromTo(p.sel, 
      { x: p.x * 10, y: p.y * 10, scale: 0, opacity: 0 }, 
      { x: p.x, y: p.y, scale: p.s, opacity: 1, duration: 0.5 }, "-=0.6");
  });

  // Text animation timeline - starts after logo animation
  textTimeline.fromTo(".hero-text span", 
    { opacity: 0, y: 30 }, 
    { opacity: 1, y: 0, duration: 1, stagger: 0.4 }, 
    0.5
  );

  // Logo ScrollTrigger - First 40% of scroll
  ScrollTrigger.create({
    trigger: ".hero",
    start: "top top",
    end: "40% top",
    animation: logoTimeline,
    scrub: 1.5,
    markers: false
  });

  // Text ScrollTrigger - Next 30% of scroll (ensures text is fully visible)
  ScrollTrigger.create({
    trigger: ".hero",
    start: "40% top",
    end: "70% top",
    animation: textTimeline,
    scrub: 1,
    markers: false
  });

  // Hold text visible - Last 30% of scroll (text stays visible)
  ScrollTrigger.create({
    trigger: ".hero",
    start: "70% top",
    end: "bottom top",
    onEnter: () => {
      gsap.set(".hero-text span", { opacity: 1, y: 0 });
    },
    onLeaveBack: () => {
      gsap.set(".hero-text span", { opacity: 1, y: 0 });
    },
    markers: false
  });
});



//nav logo

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const logo = document.querySelector(".nav-logo");
  const body = document.body;

  if (body.classList.contains('home-page')) {
    // Home page: logo appears after hero
    gsap.set(logo, { opacity: 0, y: -10, visibility: "hidden" });
    ScrollTrigger.create({
      trigger: ".hero-block",
      start: "bottom bottom",   // when hero bottom reaches viewport bottom
      end: "bottom top",        // when hero bottom reaches viewport top
      onEnter: () => {
        // Fade in logo after hero
        gsap.to(logo, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", onStart: () => logo.style.visibility = "visible" });
      },
      onLeaveBack: () => {
        // Hide logo when scrolling back to hero
        gsap.to(logo, { opacity: 0, y: -10, duration: 0.5, ease: "power2.in", onComplete: () => logo.style.visibility = "hidden" });
      },
      scrub: false
    });
  } else {
    // Other pages: logo always visible
    if (logo) {
      gsap.set(logo, { opacity: 1, y: 0, visibility: "visible" });
    }
  }



//toggle menu

const MOBILE_BREAKPOINT = 1024;
const toggle = document.getElementById("nav-toggle");
const menu = document.getElementById("nav-menu");
const dropdownSelector = ".dropdown";
const dropdowns = menu.querySelectorAll(dropdownSelector);

// Toggle menu open/close
toggle.addEventListener("click", (e) => {
  e.stopPropagation();
  const isOpen = menu.classList.toggle("active");
  toggle.classList.toggle("open");

  // if menu closed, also close dropdowns
  if (!isOpen) {
    dropdowns.forEach(d => {
      d.classList.remove("active");
      const sm = d.querySelector(".dropdown-menu");
      if (sm) sm.style.maxHeight = null;
    });
  }
});

// Use event delegation on the menu to handle dropdown-toggle clicks
menu.addEventListener("click", (e) => {
  const link = e.target.closest(".dropdown-toggle");
  if (!link) return; // not a dropdown-toggle click

  // Find the dropdown element
  const dropdown = link.closest(".dropdown");
  if (!dropdown) return;

  // Check if we're on mobile or desktop
  const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
  
  if (isMobile) {
    // Mobile behavior: toggle dropdown
    const submenu = dropdown.querySelector(".dropdown-menu");
    e.preventDefault();        // stop navigation so toggle works
    e.stopPropagation();

    const wasOpen = dropdown.classList.contains("active");

    // Close all other dropdowns first
    dropdowns.forEach(d => {
      if (d !== dropdown) {
        d.classList.remove("active");
        const sm = d.querySelector(".dropdown-menu");
        if (sm) sm.style.maxHeight = null;
      }
    });

    // Toggle the clicked dropdown
    if (wasOpen) {
      dropdown.classList.remove("active");
      if (submenu) {
        submenu.style.maxHeight = "0px";
        submenu.style.opacity = "0";
        submenu.style.visibility = "hidden";
        submenu.style.padding = "0px 0px";
        submenu.style.gap = "0px";
        submenu.style.marginBottom = "0px";
        setTimeout(() => {
          submenu.style.maxHeight = null;
          submenu.style.opacity = null;
          submenu.style.visibility = null;
          submenu.style.padding = null;
          submenu.style.gap = null;
          submenu.style.marginBottom = null;
        }, 300);
      }
    } else {
      dropdown.classList.add("active");
      if (submenu) {
        submenu.style.maxHeight = (submenu.scrollHeight + 40) + "px";
        submenu.style.opacity = "1";
        submenu.style.visibility = "visible";
        submenu.style.padding = "15px 0px";
        submenu.style.gap = "12px";
        submenu.style.marginBottom = "20px";
      }
    }
  } else {
    // Desktop behavior: allow navigation to service.html
    // Don't prevent default, let it navigate
  }
});

// Click outside closes everything
document.addEventListener("click", (e) => {
  if (!menu.contains(e.target) && !toggle.contains(e.target)) {
    menu.classList.remove("active");
    toggle.classList.remove("open");
    dropdowns.forEach(d => {
      d.classList.remove("active");
      const sm = d.querySelector(".dropdown-menu");
      if (sm) {
        sm.style.maxHeight = "0px";
        sm.style.opacity = "0";
        sm.style.visibility = "hidden";
        sm.style.padding = "0px 0px";
        sm.style.gap = "0px";
        sm.style.marginBottom = "0px";
        setTimeout(() => {
          sm.style.maxHeight = null;
          sm.style.opacity = null;
          sm.style.visibility = null;
          sm.style.padding = null;
          sm.style.gap = null;
          sm.style.marginBottom = null;
        }, 300);
      }
    });
  }
});

// Desktop hover behavior
if (window.innerWidth > MOBILE_BREAKPOINT) {
  dropdowns.forEach(dropdown => {
    const dropdownMenu = dropdown.querySelector(".dropdown-menu");
    
    // Add hover event listeners for desktop
    dropdown.addEventListener("mouseenter", () => {
      dropdown.classList.add("active");
      if (dropdownMenu) {
        dropdownMenu.style.maxHeight = dropdownMenu.scrollHeight + "px";
      }
    });
    
    dropdown.addEventListener("mouseleave", () => {
      dropdown.classList.remove("active");
      if (dropdownMenu) {
        dropdownMenu.style.maxHeight = null;
      }
    });
  });
}

// Optional: on window resize remove inline heights and active classes if going desktop
window.addEventListener("resize", () => {
  if (window.innerWidth > MOBILE_BREAKPOINT) {
    dropdowns.forEach(d => {
      const sm = d.querySelector(".dropdown-menu");
      if (sm) sm.style.maxHeight = null;
      d.classList.remove("active");
    });
    
    // Re-add desktop hover behavior
    dropdowns.forEach(dropdown => {
      const dropdownMenu = dropdown.querySelector(".dropdown-menu");
      
      dropdown.addEventListener("mouseenter", () => {
        dropdown.classList.add("active");
        if (dropdownMenu) {
          dropdownMenu.style.maxHeight = dropdownMenu.scrollHeight + "px";
        }
      });
      
      dropdown.addEventListener("mouseleave", () => {
        dropdown.classList.remove("active");
        if (dropdownMenu) {
          dropdownMenu.style.maxHeight = null;
        }
      });
    });
  }
});




  
  // ==============================
  // FEATURE BOXES ANIMATION
  // ==============================
  gsap.utils.toArray(".feature-item").forEach((item, index) => {
    gsap.set(item, { opacity: 0, x: 100 });
    gsap.to(item, {
      scrollTrigger: {
        trigger: item,
        start: "top 85%",
        end: "top 20%",
        toggleActions: "play reverse play reverse",
      },
      opacity: 1, x: 0, duration: 1,
      ease: "power3.out",
      delay: index * 0.2
    });
  });







  // ==============================
  // TECH HERO SECTION
  // ==============================
    // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);

        // Professional bidirectional animation for heading
        gsap.fromTo(".hero-title", 
            {
                scale: 0.6,
                opacity: 0,
                y: 100,
                rotationX: 15
            },
            {
                scale: 1,
                opacity: 1,
                y: 0,
                rotationX: 0,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: "#tech-hero",
                    start: "top 85%",
                    end: "top 25%",
                    scrub: 1,
                    toggleActions: "play reverse play reverse"
                }
            }
        );

        // Professional bidirectional animation for paragraph
        gsap.fromTo(".hero-para", 
            {
                scale: 0.8,
                opacity: 0,
                y: 80,
                rotationX: 10
            },
            {
                scale: 1,
                opacity: 1,
                y: 0,
                rotationX: 0,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: "#tech-hero",
                    start: "top 80%",
                    end: "top 20%",
                    scrub: 1,
                    toggleActions: "play reverse play reverse"
                }
            }
        );

        // Set smooth transform origin
        gsap.set(".hero-title, .hero-para", {
            transformOrigin: "center center",
            transformStyle: "preserve-3d"
        });

        // Enhanced GSAP configuration for smooth performance
        gsap.config({
            autoSleep: 60,
            force3D: true,
            nullTargetWarn: false
        });

        // Add smooth scroll behavior
        gsap.registerPlugin(ScrollTrigger);
        
        // Optional: Add parallax effect to background
        gsap.to("#tech-hero::before", {
            yPercent: -50,
            ease: "none",
            scrollTrigger: {
                trigger: "#tech-hero",
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });

        // Refresh ScrollTrigger on window resize
        window.addEventListener("resize", () => {
            ScrollTrigger.refresh();
        });

  

 // ==============================
  // IMAGE SLICE ANIMATION + JOIN
  // ==============================
  // Create timeline but don't run it automatically
// Timeline for image + button
// Timeline for image + button
// Timeline for image + button
let tl = gsap.timeline({
  scrollTrigger: { 
    trigger: ".image-section",      
    start: "top 70%",               
    toggleActions: "play reverse play reverse", 
    markers: false
  }
});

// Initial state for image slices
gsap.set(".image-slice", { rotateY: 90 });

// Image slice animation (loop mode on scroll up/down)
tl.to(".image-slice", {
  rotateY: 0, 
  duration: 2.5, 
  ease: "power4.out",
  stagger: 0.2
});

// Button fade in (stays visible after appearing)
gsap.to(".join-btn", { 
  scrollTrigger: { 
    trigger: ".image-section",
    start: "top 70%",
    toggleActions: "play none none none"  // only play once, no reverse
  },
  opacity: 1, 
  duration: 0.8, 
  ease: "power2.out"
});

// Text section animation (loop mode on scroll up/down)
 // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);

        // Professional right-to-center animation
        gsap.fromTo(".text-section h4", 
            {
                x: "50%",          // Start from 50% right
                opacity: 0,
                scale: 1.1,
                rotationY: 15      // Add 3D perspective
            },
            {
                x: "0%",           // Move to center position
                opacity: 1,
                scale: 1,
                rotationY: 0,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".text-section",
                    start: "top 80%",
                    end: "top 30%",
                    scrub: 1,
                    toggleActions: "play reverse play reverse"
                }
            }
        );

        // Set transform origin for smooth scaling
        gsap.set(".text-section h4", {
            transformOrigin: "center center",
            transformStyle: "preserve-3d"
        });

        // Enhanced GSAP configuration
        gsap.config({
            force3D: true,
            autoSleep: 60
        });

        // Refresh ScrollTrigger on resize
        window.addEventListener("resize", () => {
            ScrollTrigger.refresh();
        });


// ==============================
// Join Us Popup JS
// ==============================
// Elements
const joinBtn = document.querySelector(".join-btn");
const popup = document.getElementById("popup");
const closeBtn = popup.querySelector(".close-btn");
const submitBtn = document.getElementById("submitBtn");
const joinForm = document.getElementById("joinForm");

// Open popup
joinBtn.onclick = () => {
  popup.style.display = "flex";
  joinForm.reset();
  document.getElementById("joinCountryCode").value = "+91"; // Default country code
};

// Close popup
closeBtn.onclick = () => {
  popup.style.display = "none";
  joinForm.reset();
  document.getElementById("joinCountryCode").value = "+91";
};

// Close on outside click
window.onclick = (e) => {
  if (e.target === popup) {
    popup.style.display = "none";
    joinForm.reset();
    document.getElementById("joinCountryCode").value = "+91";
  }
};

// Submit form using EmailJS
submitBtn.onclick = () => {
  const name = document.getElementById("joinName").value.trim();
  const email = document.getElementById("joinEmail").value.trim();
  const countryCode = document.getElementById("joinCountryCode").value.trim();
  const mobile = document.getElementById("joinMobile").value.trim();
  const message = document.getElementById("joinMessage").value.trim();

  // Validation
  if (!name || !email || !mobile || !countryCode) {
    alert("Please fill all required fields!");
    return;
  }
  if (!email.includes("@")) {
    alert("Enter a valid email!");
    return;
  }
  if (mobile.length !== 10 || isNaN(mobile)) {
    alert("Mobile number must be 10 digits!");
    return;
  }
  if (!countryCode.startsWith("+")) {
    alert("Country code must start with + (e.g., +91)");
    return;
  }

  // Prepare EmailJS template parameters
  const templateParams = {
    name: name,
    email: email,
    mobile: `${countryCode} ${mobile}`,
    message: message
  };

  // Send email using EmailJS
  emailjs.send("service_joinbtn", "template_7e0w4vr", templateParams)
    .then(() => {
      alert("Message Sent Successfully!");
      joinForm.reset();
      popup.style.display = "none";
    })
    .catch((err) => {
      alert("Failed to send message. Please try again!");
      console.error("EmailJS Error:", err);
    });
};







//blog


(function() {
    const blogTitle = document.getElementById('blogSectionTitle');
    
    // Create observer for scroll animation
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                blogTitle.classList.add('zoom-in');
            } else {
                blogTitle.classList.remove('zoom-in');
            }
        });
    }, observerOptions);
    
    observer.observe(blogTitle);
})();
(function() {
    let blogCurrentIndex = 0;
    const blogTrack = document.getElementById('blogCarouselTrack');
    const blogCards = document.querySelectorAll('.blog-card:not(.duplicate)');
    const blogTotalCards = blogCards.length;
    let blogIsAnimating = false;
    let blogAutoScrollEnabled = true;

    function moveBlogCarousel(direction) {
        if (blogIsAnimating) return;
        
        // Stop auto scroll when using buttons
        blogAutoScrollEnabled = false;
        blogTrack.classList.remove('auto-scroll');
        
        blogIsAnimating = true;

        if (direction === 'next') {
            blogCurrentIndex = (blogCurrentIndex + 1) % blogTotalCards;
        } else {
            blogCurrentIndex = (blogCurrentIndex - 1 + blogTotalCards) % blogTotalCards;
        }

        const cardWidth = 100 / blogTotalCards;
        const translateX = -blogCurrentIndex * cardWidth;
        blogTrack.style.transform = `translateX(${translateX}%)`;
        
        setTimeout(() => {
            blogIsAnimating = false;
        }, 500);

        // Resume auto scroll after 5 seconds of inactivity
        setTimeout(() => {
            if (!blogAutoScrollEnabled) {
                blogAutoScrollEnabled = true;
                blogTrack.classList.add('auto-scroll');
                // Reset position for seamless auto scroll
                blogTrack.style.transform = 'translateX(0%)';
                blogCurrentIndex = 0;
            }
        }, 5000);
    }

    document.getElementById('blogNextBtn').addEventListener('click', () => moveBlogCarousel('next'));
    document.getElementById('blogPrevBtn').addEventListener('click', () => moveBlogCarousel('prev'));

    // Add click functionality to all cards
    const allBlogCards = document.querySelectorAll('.blog-card');
    allBlogCards.forEach(card => {
        card.addEventListener('click', () => {
            window.location.href = 'blog.html';
        });
    });

    // Pause animation on hover (only when auto scroll is enabled)
    blogTrack.addEventListener('mouseenter', () => {
        if (blogAutoScrollEnabled) {
            blogTrack.style.animationPlayState = 'paused';
        }
    });

    blogTrack.addEventListener('mouseleave', () => {
        if (blogAutoScrollEnabled) {
            blogTrack.style.animationPlayState = 'running';
        }
    });

    // Handle animation iteration
    blogTrack.addEventListener('animationiteration', () => {
        if (blogAutoScrollEnabled) {
            blogCurrentIndex = 0;
        }
    });
})();


// clients

// <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js"></script>

const track = document.querySelector('.clients-track');

// Duplicate logos for seamless loop
track.innerHTML += track.innerHTML;

// Create infinite loop animation
const loopAnim = gsap.to(track, {
  xPercent: -50,
  ease: "linear",
  repeat: -1,
  duration: 35,
  paused: false
});

// Select all logos
const logos = document.querySelectorAll('.client-logo');

// Add hover/touch listeners
logos.forEach(logo => {
  logo.addEventListener("mouseenter", () => {
    loopAnim.pause();               // stop scrolling
    gsap.to(logo, { scale: 1.2, duration: 0.3, ease: "power2.out" }); // zoom in
  });
  
  logo.addEventListener("mouseleave", () => {
    gsap.to(logo, { scale: 1, duration: 0.3, ease: "power2.out" });   // zoom out
    loopAnim.resume();              // continue scrolling
  });

  // For mobile touch
  logo.addEventListener("touchstart", () => {
    loopAnim.pause();
    gsap.to(logo, { scale: 1.2, duration: 0.3, ease: "power2.out" });
  });

  logo.addEventListener("touchend", () => {
    gsap.to(logo, { scale: 1, duration: 0.3, ease: "power2.out" });
    loopAnim.resume();
  });
});
});



// Popup logic


document.addEventListener("DOMContentLoaded", function() {
  var popup = document.getElementById("popupForm");
  var closeBtn = document.getElementById("closePopup");
  var contactForm = document.getElementById("contactForm");

  // Open popup for all triggers
  document.querySelectorAll('#openPopup, .openPopup').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      if (popup) popup.style.display = "flex";
      if (contactForm) contactForm.reset();
      var cc = document.getElementById("countryCode");
      if (cc) cc.value = "+91";
    });
  });

  // Close popup
  if (closeBtn && popup) {
    closeBtn.onclick = function() {
      popup.style.display = "none";
      if (contactForm) contactForm.reset();
      var cc = document.getElementById("countryCode");
      if (cc) cc.value = "+91";
    };
    window.onclick = function(event) {
      if (event.target === popup) {
        popup.style.display = "none";
        if (contactForm) contactForm.reset();
        var cc = document.getElementById("countryCode");
        if (cc) cc.value = "+91";
      }
    };
  }

  // Form submit handler (only one!)
  if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault();

      // Get Form Data
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const countryCode = document.getElementById("countryCode").value.trim();
      const mobile = document.getElementById("mobile").value.trim();
      const message = document.getElementById("message").value.trim();

      // Basic Validation
      if (!name || !email || !mobile || !countryCode) {
        alert("Please fill all required fields!");
        return;
      }
      if (!email.includes("@")) {
        alert("Enter a valid email!");
        return;
      }
      if (mobile.length !== 10) {
        alert("Mobile number must be 10 digits!");
        return;
      }

      // Prepare EmailJS Template Params
      const templateParams = {
        name: name,
        email: email,
        mobile: `${countryCode} ${mobile}`,
        message: message
      };

      // Send Email via EmailJS
      emailjs.send("service_tsikr", "template_0uvxn0e", templateParams)
        .then(() => {
          alert("Message Sent Successfully!");
          contactForm.reset();
          popup.style.display = "none";
        })
        .catch((err) => {
          alert("Failed to send message. Try again!");
          console.error("EmailJS Error:", err);
        });
    });
  }
});


