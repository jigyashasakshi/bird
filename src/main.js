// Mobile Navigation Toggle
class MobileNav {
  constructor() {
    this.menuButton = document.getElementById('mobile-menu-button');
    this.menu = document.getElementById('mobile-menu');
    this.closeButton = document.getElementById('mobile-menu-close');
    this.overlay = document.getElementById('mobile-menu-overlay');
    
    if (this.menuButton && this.menu) {
      this.init();
    }
  }
  
  init() {
    this.menuButton.addEventListener('click', () => this.toggleMenu());
    this.closeButton?.addEventListener('click', () => this.closeMenu());
    this.overlay?.addEventListener('click', () => this.closeMenu());
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.menu.classList.contains('open')) {
        this.closeMenu();
      }
    });
  }
  
  toggleMenu() {
    this.menu.classList.toggle('open');
    this.menu.classList.toggle('closed');
    document.body.classList.toggle('overflow-hidden');
  }
  
  closeMenu() {
    this.menu.classList.remove('open');
    this.menu.classList.add('closed');
    document.body.classList.remove('overflow-hidden');
  }
}

// Testimonials Slider
class TestimonialsSlider {
  constructor() {
    this.slider = document.getElementById('testimonials-slider');
    this.track = document.querySelector('.testimonial-track');
    this.slides = document.querySelectorAll('.testimonial-slide');
    this.prevBtn = document.getElementById('testimonials-prev');
    this.nextBtn = document.getElementById('testimonials-next');
    this.indicators = document.querySelectorAll('.testimonial-indicator');
    
    this.currentSlide = 0;
    this.totalSlides = this.slides.length;
    
    if (this.slider && this.totalSlides > 0) {
      this.init();
    }
  }
  
  init() {
    this.prevBtn?.addEventListener('click', () => this.prevSlide());
    this.nextBtn?.addEventListener('click', () => this.nextSlide());
    
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => this.goToSlide(index));
    });
    
    // Auto-play
    this.startAutoPlay();
  }
  
  updateSlider() {
    const translateX = -this.currentSlide * 100;
    this.track.style.transform = `translateX(${translateX}%)`;
    
    // Update indicators
    this.indicators.forEach((indicator, index) => {
      indicator.classList.toggle('bg-navy', index === this.currentSlide);
      indicator.classList.toggle('bg-gray-300', index !== this.currentSlide);
    });
  }
  
  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    this.updateSlider();
  }
  
  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    this.updateSlider();
  }
  
  goToSlide(index) {
    this.currentSlide = index;
    this.updateSlider();
  }
  
  startAutoPlay() {
    setInterval(() => {
      if (!this.slider.matches(':hover')) {
        this.nextSlide();
      }
    }, 5000);
  }
}

// FAQ Accordion
class FAQAccordion {
  constructor() {
    this.faqItems = document.querySelectorAll('.faq-item');
    this.init();
  }
  
  init() {
    this.faqItems.forEach(item => {
      const button = item.querySelector('.faq-button');
      const content = item.querySelector('.faq-content');
      
      button?.addEventListener('click', () => {
        const isOpen = content.classList.contains('open');
        
        // Close all other items
        this.faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.querySelector('.faq-content').classList.remove('open');
            otherItem.querySelector('.faq-button').setAttribute('aria-expanded', 'false');
          }
        });
        
        // Toggle current item
        content.classList.toggle('open', !isOpen);
        button.setAttribute('aria-expanded', !isOpen);
      });
    });
  }
}

// Image Lightbox
class ImageLightbox {
  constructor() {
    this.galleryImages = document.querySelectorAll('.gallery-image');
    this.lightbox = null;
    this.currentIndex = 0;
    this.images = [];
    
    this.init();
  }
  
  init() {
    this.galleryImages.forEach((img, index) => {
      this.images.push({
        src: img.src,
        alt: img.alt
      });
      
      img.addEventListener('click', () => this.openLightbox(index));
    });
  }
  
  openLightbox(index) {
    this.currentIndex = index;
    this.createLightbox();
    this.showImage();
    document.body.classList.add('overflow-hidden');
  }
  
  createLightbox() {
    this.lightbox = document.createElement('div');
    this.lightbox.className = 'lightbox';
    this.lightbox.innerHTML = `
      <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
      <button class="lightbox-nav lightbox-prev" aria-label="Previous image">&#8249;</button>
      <button class="lightbox-nav lightbox-next" aria-label="Next image">&#8250;</button>
      <img class="lightbox-image" src="" alt="">
    `;
    
    document.body.appendChild(this.lightbox);
    
    // Event listeners
    this.lightbox.querySelector('.lightbox-close').addEventListener('click', () => this.closeLightbox());
    this.lightbox.querySelector('.lightbox-prev').addEventListener('click', () => this.prevImage());
    this.lightbox.querySelector('.lightbox-next').addEventListener('click', () => this.nextImage());
    this.lightbox.addEventListener('click', (e) => {
      if (e.target === this.lightbox) {
        this.closeLightbox();
      }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
  }
  
  showImage() {
    const img = this.lightbox.querySelector('.lightbox-image');
    const currentImage = this.images[this.currentIndex];
    img.src = currentImage.src;
    img.alt = currentImage.alt;
  }
  
  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.showImage();
  }
  
  prevImage() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.showImage();
  }
  
  closeLightbox() {
    if (this.lightbox) {
      this.lightbox.remove();
      this.lightbox = null;
      document.body.classList.remove('overflow-hidden');
      document.removeEventListener('keydown', this.handleKeyDown.bind(this));
    }
  }
  
  handleKeyDown(e) {
    if (!this.lightbox) return;
    
    switch(e.key) {
      case 'Escape':
        this.closeLightbox();
        break;
      case 'ArrowRight':
        this.nextImage();
        break;
      case 'ArrowLeft':
        this.prevImage();
        break;
    }
  }
}

// Blog Search and Filter
class BlogSearch {
  constructor() {
    this.searchInput = document.getElementById('blog-search');
    this.categoryFilter = document.getElementById('category-filter');
    this.blogPosts = document.querySelectorAll('.blog-post');
    
    if (this.searchInput && this.blogPosts.length > 0) {
      this.init();
    }
  }
  
  init() {
    this.searchInput.addEventListener('input', () => this.filterPosts());
    this.categoryFilter?.addEventListener('change', () => this.filterPosts());
  }
  
  filterPosts() {
    const searchTerm = this.searchInput.value.toLowerCase();
    const selectedCategory = this.categoryFilter?.value || 'all';
    
    this.blogPosts.forEach(post => {
      const title = post.querySelector('h3').textContent.toLowerCase();
      const excerpt = post.querySelector('p').textContent.toLowerCase();
      const category = post.dataset.category || '';
      
      const matchesSearch = title.includes(searchTerm) || excerpt.includes(searchTerm);
      const matchesCategory = selectedCategory === 'all' || category === selectedCategory;
      
      if (matchesSearch && matchesCategory) {
        post.classList.remove('hidden');
      } else {
        post.classList.add('hidden');
      }
    });
  }
}

// Form Validation
class FormValidator {
  constructor() {
    this.forms = document.querySelectorAll('form');
    this.init();
  }
  
  init() {
    this.forms.forEach(form => {
      form.addEventListener('submit', (e) => this.handleSubmit(e));
      
      // Real-time validation
      const inputs = form.querySelectorAll('input, textarea');
      inputs.forEach(input => {
        input.addEventListener('blur', () => this.validateField(input));
        input.addEventListener('input', () => this.clearError(input));
      });
    });
  }
  
  handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });
    
    if (isValid) {
      this.showSuccess(form);
      form.reset();
    }
  }
  
  validateField(input) {
    const value = input.value.trim();
    const type = input.type;
    const required = input.required;
    
    // Clear previous error
    this.clearError(input);
    
    if (required && !value) {
      this.showError(input, 'This field is required');
      return false;
    }
    
    if (type === 'email' && value && !this.isValidEmail(value)) {
      this.showError(input, 'Please enter a valid email address');
      return false;
    }
    
    if (type === 'tel' && value && !this.isValidPhone(value)) {
      this.showError(input, 'Please enter a valid phone number');
      return false;
    }
    
    return true;
  }
  
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
  }
  
  showError(input, message) {
    input.classList.add('border-red-500');
    
    let errorElement = input.parentNode.querySelector('.error-message');
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.className = 'error-message text-red-500 text-sm mt-1';
      input.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
  }
  
  clearError(input) {
    input.classList.remove('border-red-500');
    const errorElement = input.parentNode.querySelector('.error-message');
    if (errorElement) {
      errorElement.remove();
    }
  }
  
  showSuccess(form) {
    const successMessage = document.createElement('div');
    successMessage.className = 'bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4';
    successMessage.textContent = 'Thank you! Your message has been sent successfully.';
    
    form.insertBefore(successMessage, form.firstChild);
    
    setTimeout(() => {
      successMessage.remove();
    }, 5000);
  }
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
  const anchors = document.querySelectorAll('a[href^="#"]');
  
  anchors.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  new MobileNav();
  new TestimonialsSlider();
  new FAQAccordion();
  new ImageLightbox();
  new BlogSearch();
  new FormValidator();
  initSmoothScrolling();
});