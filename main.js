        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navMenu = document.getElementById('navMenu');
        const navLinks = document.querySelectorAll('.nav-link');

        if (mobileMenuBtn && navMenu) {
            mobileMenuBtn.addEventListener('click', function() {
                this.classList.toggle('active');
                navMenu.classList.toggle('active');
                document.body.classList.toggle('menu-open');
            });

            // Close menu when clicking on a nav link
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    mobileMenuBtn.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('menu-open');
                });
            });
        }

        // Header scroll effect
        const header = document.getElementById('header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Adjusted for fixed header height
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Enhanced fade-in animation on scroll (both up and down)
        const fadeElements = document.querySelectorAll('.fade-in');
        let lastScrollTop = 0;
        let scrollDirection = 'down';
        
        // Track scroll position and direction
        function getScrollDirection() {
            const st = window.pageYOffset || document.documentElement.scrollTop;
            scrollDirection = st > lastScrollTop ? 'down' : 'up';
            lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
            return scrollDirection;
        }
        
        function checkFade() {
            const direction = getScrollDirection();
            const windowHeight = window.innerHeight;
            
            fadeElements.forEach(element => {
                const elementRect = element.getBoundingClientRect();
                const elementTop = elementRect.top;
                const elementBottom = elementRect.bottom;
                
                // Element is in viewport
                const isVisible = elementTop < windowHeight * 0.85 && elementBottom > 0;
                
                // Element is out of viewport (above the screen)
                const isAboveScreen = elementBottom < 0;
                
                // Element is out of viewport (below the screen)
                const isBelowScreen = elementTop > windowHeight;
                
                if (isVisible) {
                    // Add visible class when element is in viewport
                    element.classList.add('visible');
                } else {
                    // Remove visible class when element is out of viewport
                    // This ensures the animation will play again when scrolling back
                    element.classList.remove('visible');
                }
            });
        }
        
        // Check on load
        window.addEventListener('load', checkFade);
        
        // Check on scroll
        window.addEventListener('scroll', checkFade); 