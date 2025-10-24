//mobile animation

document.addEventListener('DOMContentLoaded', function () {
    const config = {
        android: { count: 76, path: 'frames/android/samsung' },
        iphone: { count: 78, path: 'frames/iphone/iPhone Mockup' },
        ipad: { count: 28, path: 'frames/ipad/iPad Pro 11-Inch' }
    };

    const totalFrames = config.android.count + config.iphone.count + config.ipad.count;
    const animationProgress = 0.9;

    const frame = document.getElementById('deviceFrame');
    const container = document.getElementById('animationContainer');
    if (!frame || !container) return;

    let currentFrame = 1;
    let currentDevice = 'android';
    let lastDevice = 'android';
    const imageCache = {};
    let imagesLoaded = 0;
    let animationCompleted = false; // 🔒 New state to detect when done

    function preloadImages() {
        Object.keys(config).forEach(device => {
            const { count, path } = config[device];
            for (let i = 1; i <= count; i++) {
                const img = new Image();
                img.src = `${path}${i}.png`;
                img.onload = () => { imagesLoaded++; };
                imageCache[`${device}-${i}`] = img;
            }
        });
    }

    function getFrameInfo(progress) {
        const frameIndex = Math.floor(progress * totalFrames);
        if (frameIndex < config.android.count) {
            return { device: 'android', frame: frameIndex + 1, path: config.android.path };
        } else if (frameIndex < config.android.count + config.iphone.count) {
            return { device: 'iphone', frame: frameIndex - config.android.count + 1, path: config.iphone.path };
        } else {
            return { device: 'ipad', frame: frameIndex - config.android.count - config.iphone.count + 1, path: config.ipad.path };
        }
    }

    let smoothScroll = 0;
    let targetScroll = 0;
    const smoothnessFactor = 0.5;
    const frameSpeedFactor = 0.5;

    function smoothLoop() {
        smoothScroll += (targetScroll - smoothScroll) * smoothnessFactor;
        updateFrame(smoothScroll);
        requestAnimationFrame(smoothLoop);
    }

    function playZoomInEffect() {
        frame.style.transition = 'transform 0.6s ease-out, opacity 0.6s ease-out';
        frame.style.transform = 'scale(0.5)';
        frame.style.opacity = '0';
        setTimeout(() => {
            frame.style.transform = 'scale(1)';
            frame.style.opacity = '1';
        }, 60);
    }

    function updateFrame(scrollY) {
        const containerTop = container.offsetTop;
        const containerHeight = container.offsetHeight;
        const windowHeight = window.innerHeight;

        const startTrigger = containerTop + windowHeight;
        const endTrigger = containerTop + containerHeight;

        if (scrollY < startTrigger) {
            frame.style.opacity = '0';
            return;
        }

        const totalScrollProgress = (scrollY - startTrigger) / (endTrigger - startTrigger);
        const clamped = Math.min(Math.max(totalScrollProgress, 0), 1);

        if (clamped <= animationProgress) {
            const animProgress = clamped / animationProgress;
            const frameInfo = getFrameInfo(animProgress);

            // Zoom + fade transition between devices
            if (frameInfo.device !== lastDevice) {
                if (
                    (lastDevice === 'android' && frameInfo.device === 'iphone') ||
                    (lastDevice === 'iphone' && frameInfo.device === 'ipad')
                ) {
                    playZoomInEffect();
                }
                lastDevice = frameInfo.device;
            }

            if (frameInfo.frame !== currentFrame || frameInfo.device !== currentDevice) {
                currentFrame = frameInfo.frame;
                currentDevice = frameInfo.device;
                const cachedImg = imageCache[`${currentDevice}-${currentFrame}`];

                if (currentFrame === 1) {
                    frame.style.opacity = '0';
                    frame.src = cachedImg && cachedImg.complete ? cachedImg.src : `${frameInfo.path}${currentFrame}.png`;
                    frame.style.transition = 'opacity 0.8s ease-in-out';
                    requestAnimationFrame(() => {
                        frame.style.opacity = '1';
                    });
                } else {
                    frame.src = cachedImg && cachedImg.complete ? cachedImg.src : `${frameInfo.path}${currentFrame}.png`;
                    frame.style.opacity = '1';
                }
            }

            frame.style.opacity = '1';
        } else {
            // ✅ Lock scroll until animation is done
            if (!animationCompleted) {
                animationCompleted = true;
                document.body.style.overflow = 'hidden'; // stop scroll
                setTimeout(() => {
                    document.body.style.overflow = 'auto'; // allow scroll again
                }, 1000); // 1s delay after animation end
            }

            const lastFrameInfo = getFrameInfo(0.999);
            frame.src = `${lastFrameInfo.path}${lastFrameInfo.frame}.png`;
        }
    }

    window.addEventListener('scroll', () => {
        targetScroll = window.scrollY;
    });

    preloadImages();
    frame.src = `${config.android.path}1.png`;
    frame.style.opacity = '0';
    frame.addEventListener('load', () => (frame.style.opacity = '1'));
    smoothLoop();
});





// feature text animation
 
// Feature text animation - Add this to serv-app.js
// IMPORTANT: Add this code AFTER your mobile animation code

(function() {
    const featureSection = document.getElementById('featureScrollSection');
    const featureItems = document.querySelectorAll('.feature-content-item');
    const featureIndicator = document.getElementById('featureScrollIndicator');
    
    
    // Safety check
    if (!featureSection || !featureItems.length) {
        console.warn('Feature section elements not found');
        return;
    }
    
    let featureCurrentIndex = 0;
    let featureIsAnimating = false;
    let featureSectionInView = false;
    let scrollAccumulator = 0;
    const scrollThreshold = 50; // Normal user scroll amount to trigger one item

    // Intersection Observer
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            featureSectionInView = entry.isIntersecting;
            // Reset animation when leaving section
            if (!entry.isIntersecting) {
                featureCurrentIndex = 0;
                scrollAccumulator = 0;
                featureItems.forEach(function(item) {
                    item.classList.remove('feature-visible');
                });
                if (featureIndicator) {
                    featureIndicator.style.opacity = '0.9';
                }
            }
        });
    }, { threshold: 0.3 });

    observer.observe(featureSection);

    function showNextFeatureItem() {
        if (featureCurrentIndex < featureItems.length) {
            featureItems[featureCurrentIndex].classList.add('feature-visible');
            featureCurrentIndex++;
            
            if (featureCurrentIndex >= featureItems.length && featureIndicator) {
                featureIndicator.style.opacity = '0';
            }
        }
    }

    function hideLastFeatureItem() {
        if (featureCurrentIndex > 0) {
            featureCurrentIndex--;
            featureItems[featureCurrentIndex].classList.remove('feature-visible');
            if (featureIndicator) {
                featureIndicator.style.opacity = '0.9';
            }
        }
    }

    function handleFeatureScroll(e) {
        // Only work when feature section is in view
        if (!featureSectionInView || featureIsAnimating) {
            return;
        }

        const delta = e.deltaY;
        
        // Accumulate scroll amount
        scrollAccumulator += Math.abs(delta);

        // Check if accumulated scroll crosses threshold
        if (scrollAccumulator >= scrollThreshold) {
            scrollAccumulator = 0; // Reset accumulator

            // Scroll down - show next item
            if (delta > 0 && featureCurrentIndex < featureItems.length) {
                e.preventDefault();
                featureIsAnimating = true;
                showNextFeatureItem();
                setTimeout(function() { 
                    featureIsAnimating = false; 
                }, 1100);
            } 
            // Scroll up - hide last item
            else if (delta < 0 && featureCurrentIndex > 0) {
                e.preventDefault();
                featureIsAnimating = true;
                hideLastFeatureItem();
                setTimeout(function() { 
                    featureIsAnimating = false; 
                }, 1100);
            } else {
                // All items shown or hidden, allow normal scroll
                scrollAccumulator = 0;
            }
        } else {
            // Still accumulating, block scroll if not all items shown
            if (featureCurrentIndex < featureItems.length || 
                (delta < 0 && featureCurrentIndex > 0)) {
                e.preventDefault();
            }
        }
    }

    // Touch handling for mobile
    let featureTouchStartY = 0;
    let featureTouchEndY = 0;
    let featureTouchActive = false;

    function handleFeatureTouchStart(e) {
        const target = e.target.closest('.feature-scroll-section');
        if (!target) return;
        featureTouchActive = true;
        featureTouchStartY = e.touches[0].clientY;
    }

    function handleFeatureTouchMove(e) {
        if (!featureTouchActive) return;
        featureTouchEndY = e.touches[0].clientY;
    }

    function handleFeatureTouchEnd(e) {
        if (!featureTouchActive || !featureSectionInView || featureIsAnimating) {
            featureTouchActive = false;
            return;
        }

        const delta = featureTouchStartY - featureTouchEndY;

        // Touch needs bigger threshold (80px)
        if (Math.abs(delta) < 80) {
            featureTouchActive = false;
            return;
        }

        // Swipe up (scroll down)
        if (delta > 0 && featureCurrentIndex < featureItems.length) {
            e.preventDefault();
            featureIsAnimating = true;
            showNextFeatureItem();
            setTimeout(function() { 
                featureIsAnimating = false;
                featureTouchActive = false;
            }, 1100);
        } 
        // Swipe down (scroll up)
        else if (delta < 0 && featureCurrentIndex > 0) {
            e.preventDefault();
            featureIsAnimating = true;
            hideLastFeatureItem();
            setTimeout(function() { 
                featureIsAnimating = false;
                featureTouchActive = false;
            }, 1100);
        } else {
            featureTouchActive = false;
        }
    }

    // Reset accumulator after inactivity
    let scrollTimeout;
    function resetAccumulator() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function() {
            scrollAccumulator = 0;
        }, 200);
    }

    // Add event listeners on window for proper scroll blocking
    window.addEventListener('wheel', function(e) {
        handleFeatureScroll(e);
        resetAccumulator();
    }, { passive: false });
    
    window.addEventListener('touchstart', handleFeatureTouchStart, { passive: true });
    window.addEventListener('touchmove', handleFeatureTouchMove, { passive: true });
    window.addEventListener('touchend', handleFeatureTouchEnd, { passive: false });
    
    console.log('Feature animation initialized successfully');
})();



// GSAP + ScrollTrigger: feature cards pin-and-reveal animation
document.addEventListener('DOMContentLoaded', () => {
  // Ensure GSAP + ScrollTrigger are available
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('GSAP or ScrollTrigger not found. Make sure scripts are loaded.');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const section = document.querySelector('.feature-scroll-section');
  const cards = gsap.utils.toArray('.feature-content-item');
  if (!section || cards.length === 0) return;

  // total scroll distance allocated for the whole reveal:
  // each card gets one viewport-height chunk (adjust multiplier to taste)
  const endDistance = window.innerHeight * cards.length * 0.5; // less scroll space


  // master timeline: pinned while revealing cards one-by-one
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: () => `+=${endDistance}`,
      scrub: 0.1,          // smooth scrub to feel like a video
      pin: true,           // pin the whole section
      pinSpacing: true,
      anticipatePin: 1,
      invalidateOnRefresh: true
    }
  });

  // animate cards sequentially: each card occupies ~1 unit of the timeline
  // from y:40 / opacity:0 -> y:0 / opacity:1
  cards.forEach((card, i) => {
    // each animation will be placed sequentially, so one-by-one on scroll
    tl.fromTo(card,
      { y: 40, opacity: 0, scale: 0.995 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        ease: 'power3.out',
        duration: 1
      },
      i // place at incremental positions (0,1,2,...)
    );
  });

  // Hide indicator when the timeline progress > 0.95 (last card visible)
  ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: () => `+=${endDistance}`,
    onUpdate: self => {
      const indicator = section.querySelector('.feature-scroll-indicator');
      if (!indicator) return;
      if (self.progress > 0.94) {
        gsap.to(indicator, { opacity: 0, duration: 0.35, pointerEvents: 'none' });
      } else {
        gsap.to(indicator, { opacity: 0.95, duration: 0.35, pointerEvents: '' });
      }
    }
  });

  // Refresh on resize (recompute end distance)
  ScrollTrigger.addEventListener('refreshInit', () => {
    // nothing extra required but this ensures end function recalculates
  });
  ScrollTrigger.refresh();
});



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

//

