 
 
 
 // left side logo right side tsi
        document.addEventListener('DOMContentLoaded', function() {
            
            // About Section Animation
            const observerOptions = {
                threshold: [0.1, 0.5, 0.9],
                rootMargin: '0px 0px -100px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    const logoImg = document.getElementById('logoImg');
                    const aboutContent = document.getElementById('aboutContent');
                    
                    if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
                        // Scrolling into view - animate in
                        logoImg.classList.add('animate-in');
                        logoImg.classList.remove('animate-out');
                        aboutContent.classList.add('animate-in');
                        aboutContent.classList.remove('animate-out');
                    } else if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
                        // Scrolled past (going down) - animate out to right
                        logoImg.classList.remove('animate-in');
                        logoImg.classList.add('animate-out');
                        aboutContent.classList.remove('animate-in');
                        aboutContent.classList.add('animate-out');
                    } else if (!entry.isIntersecting && entry.boundingClientRect.top > 0) {
                        // Scrolled back up - reset to initial state
                        logoImg.classList.remove('animate-in');
                        logoImg.classList.remove('animate-out');
                        aboutContent.classList.remove('animate-in');
                        aboutContent.classList.remove('animate-out');
                    }
                });
            }, observerOptions);

            // Start observing the about container
            const container = document.getElementById('aboutContainer');
            if (container) {
                observer.observe(container);
                
                // Check if initially in view
                const rect = container.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                
                if (rect.top < windowHeight * 0.7) {
                    const logoImg = document.getElementById('logoImg');
                    const aboutContent = document.getElementById('aboutContent');
                    
                    setTimeout(() => {
                        logoImg.classList.add('animate-in');
                        aboutContent.classList.add('animate-in');
                    }, 100);
                }
            }

            // Enhanced hover effect for logo
            const logoImg = document.getElementById('logoImg');
            if (logoImg) {
                logoImg.addEventListener('mouseenter', function() {
                    if (this.classList.contains('animate-in')) {
                        this.style.transform = 'translateX(0) rotateY(360deg) scale(1.05)';
                    }
                });

                logoImg.addEventListener('mouseleave', function() {
                    if (this.classList.contains('animate-in')) {
                        this.style.transform = 'translateX(0) rotateY(360deg) scale(1)';
                    }
                });
            }



            
            // Four boxes dropdown functionality
            const boxes = document.querySelectorAll('.box');
            const dropdown = document.getElementById('globalDropdown');
            const contents = {
                1: document.getElementById('tech-content'),
                2: document.getElementById('team-content'),
                3: document.getElementById('project-content'),
                4: document.getElementById('policy-content')
            };

            let hideTimeout;
            let isMobile = window.innerWidth <= 768;
            let activeBox = null;

            // Update mobile detection on resize
            window.addEventListener('resize', () => {
                isMobile = window.innerWidth <= 768;
            });

            if (boxes.length > 0 && dropdown) {
                boxes.forEach(box => {
                    // Desktop hover events
                    box.addEventListener('mouseenter', function() {
                        if (!isMobile) {
                            clearTimeout(hideTimeout);
                            
                            const boxNumber = parseInt(this.getAttribute('data-box'));
                            
                            // Show dropdown with correct arrow position
                            dropdown.classList.add('show');
                            dropdown.className = `global-dropdown show box${boxNumber}`;
                            
                            // Hide all content first
                            Object.values(contents).forEach(content => {
                                if (content) content.classList.remove('active');
                            });
                            
                            // Show current content
                            if (contents[boxNumber]) {
                                contents[boxNumber].classList.add('active');
                            }
                        }
                    });

                    box.addEventListener('mouseleave', function() {
                        if (!isMobile) {
                            // Delay hiding to allow moving to dropdown
                            hideTimeout = setTimeout(() => {
                                if (!dropdown.matches(':hover')) {
                                    dropdown.classList.remove('show');
                                    Object.values(contents).forEach(content => {
                                        if (content) content.classList.remove('active');
                                    });
                                }
                            }, 150);
                        }
                    });

                    // Mobile click events
                    box.addEventListener('click', function(e) {
                        if (isMobile) {
                            e.preventDefault();
                            const boxNumber = parseInt(this.getAttribute('data-box'));
                            
                            // If clicking the same box, toggle dropdown
                            if (activeBox === boxNumber) {
                                dropdown.classList.remove('show');
                                activeBox = null;
                                Object.values(contents).forEach(content => {
                                    if (content) content.classList.remove('active');
                                });
                            } else {
                                // Show dropdown for new box
                                activeBox = boxNumber;
                                
                                // Position dropdown relative to clicked box
                                const boxRect = this.getBoundingClientRect();
                                const containerRect = document.querySelector('.boxes-container').getBoundingClientRect();
                                
                                // Calculate position relative to the boxes container
                                const relativeTop = boxRect.bottom - containerRect.top;
                                
                                dropdown.style.top = relativeTop + 'px';
                                dropdown.classList.add('show');
                                dropdown.className = `global-dropdown show box${boxNumber}`;
                                
                                // Hide all content first
                                Object.values(contents).forEach(content => {
                                    if (content) content.classList.remove('active');
                                });
                                
                                // Show current content
                                if (contents[boxNumber]) {
                                    contents[boxNumber].classList.add('active');
                                }
                            }
                        }
                    });
                });

                // Desktop hover events for dropdown
                if (!isMobile) {
                    dropdown.addEventListener('mouseenter', function() {
                        clearTimeout(hideTimeout);
                        this.classList.add('show');
                    });

                    dropdown.addEventListener('mouseleave', function() {
                        this.classList.remove('show');
                        Object.values(contents).forEach(content => {
                            if (content) content.classList.remove('active');
                        });
                    });
                }

                // Mobile: Close dropdown when clicking outside
                if (isMobile) {
                    document.addEventListener('click', function(e) {
                        if (!dropdown.contains(e.target) && !Array.from(boxes).some(box => box.contains(e.target))) {
                            dropdown.classList.remove('show');
                            activeBox = null;
                            Object.values(contents).forEach(content => {
                                if (content) content.classList.remove('active');
                            });
                        }
                    });
                }
            }

        });





// blog box and imaeg

   document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const blogModal = document.getElementById('blogModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    const modalContent = document.getElementById('modalContent');

    // Open blog function
    window.openBlog = function(blogId) {
        if (!blogModal || !modalTitle || !modalImage || !modalContent) return;

        const blog = blogData[blogId]; // Make sure blogData exists

        if (blog) {
            modalTitle.textContent = blog.title;
            modalImage.src = blog.image; // Use src for images
            modalContent.innerHTML = blog.content;
            blogModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    };

    // Close blog function
    window.closeBlog = function() {
        if (!blogModal) return;
        blogModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    };

    // Close modal when clicking outside content
    if (blogModal) {
        blogModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeBlog();
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && blogModal && blogModal.classList.contains('show')) {
            closeBlog();
        }
    });
});


        
// from the foundr
// Intersection Observer Options
const ioOptions = { root: null, rootMargin: '0px', threshold: 0.28 };

// Function to create observer safely
function createObserver(el) {
    if (!el) return; // Skip if element doesn't exist
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const target = entry.target;
            if (entry.isIntersecting) {
                target.classList.add('in-view');
                if (target.id === 'founderPhoto') target.classList.add('glow');
            } else {
                target.classList.remove('in-view');
                if (target.id === 'founderPhoto') target.classList.remove('glow');
            }
        });
    }, ioOptions);
    obs.observe(el);
}

document.addEventListener('DOMContentLoaded', () => {
    const photo = document.getElementById('founderPhoto');
    const content = document.getElementById('founderContent');

    // Only create observers if elements exist
    if (!photo) console.warn('Warning: #founderPhoto not found on this page.');
    if (!content) console.warn('Warning: #founderContent not found on this page.');

    createObserver(photo);
    createObserver(content);

    if (photo) {
        const img = photo.querySelector('img'); // Cache the inner img
        if (!img) console.warn('Warning: No <img> found inside #founderPhoto.');

        // Mouse move effect
        photo.addEventListener('mousemove', (e) => {
            photo.classList.add('hover-highlight');
            if (!img) return; // skip if no img
            const rect = photo.getBoundingClientRect();
            const mx = (e.clientX - rect.left) / rect.width - 0.5;
            const my = (e.clientY - rect.top) / rect.height - 0.5;
            const tx = mx * 10;
            const ty = my * 6;
            const rot = mx * 2;
            img.style.transform = `translate(${tx}px, ${ty}px) scale(1.05) rotate(${rot}deg)`;
        });

        // Mouse leave effect
        photo.addEventListener('mouseleave', () => {
            photo.classList.remove('hover-highlight');
            if (img) img.style.transform = '';
        });

        // Keyboard focus effect
        photo.tabIndex = 0;
        photo.addEventListener('focus', () => {
            if (img) img.style.transform = 'scale(1.08)';
        });
        photo.addEventListener('blur', () => {
            if (img) img.style.transform = '';
        });
    }
});
