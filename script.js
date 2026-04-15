document.addEventListener('DOMContentLoaded', () => {
    // Force reveal elements visible immediately
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => el.classList.add('active'));

    // Reveal animations on scroll (enhance)
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing once revealed
                // revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.background = 'rgba(0, 0, 0, 0.3)';
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.3)';
        } else {
            header.style.padding = '20px 0';
            header.style.background = 'rgba(0, 0, 0, 0.1)';
            header.style.boxShadow = 'none';
        }
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
            // Close mobile menu on link click
            const navLinks = document.querySelector('.nav-links');
            const hamburger = document.querySelector('.hamburger');
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Image Modal Functionality
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.modal-close');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const counter = document.getElementById('imageCounter');

    const galleryImages = Array.from(document.querySelectorAll('.gallery-item img'));
    const allImages = galleryImages.map(img => img.src);
    let currentIndex = 0;

    // Open modal
    galleryImages.forEach((img, index) => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', () => {
            currentIndex = index;
            modalImg.src = allImages[currentIndex];
            counter.textContent = `${currentIndex + 1} / ${allImages.length}`;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Keyboard ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Navigation
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + allImages.length) % allImages.length;
        modalImg.src = allImages[currentIndex];
        counter.textContent = `${currentIndex + 1} / ${allImages.length}`;
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % allImages.length;
        modalImg.src = allImages[currentIndex];
        counter.textContent = `${currentIndex + 1} / ${allImages.length}`;
    });

    // Mouse parallax for Hero portrait
    const hero = document.querySelector('.hero');
    const portrait = document.querySelector('.hero-portrait');
    
    if (hero && portrait) {
        hero.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            
            const xPos = (clientX / innerWidth - 0.5) * 20;
            const yPos = (clientY / innerHeight - 0.5) * 20;
            
            portrait.style.transform = `translate(${xPos}px, ${yPos}px) rotateY(${xPos * 0.5}deg) rotateX(${-yPos * 0.5}deg)`;
        });

        hero.addEventListener('mouseleave', () => {
            portrait.style.transform = `translate(0, 0) rotateY(0) rotateX(0)`;
        });
    }
});
