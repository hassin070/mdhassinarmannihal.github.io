// Navigation and section toggle functionality
const navLinks = document.querySelectorAll('nav > a[data-target]');
const sections = document.querySelectorAll('.section-content');
const sectionHeaders = document.querySelectorAll('.section-header');

// Handle navigation clicks
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('data-target');
    const targetSection = document.getElementById(targetId);

    // Remove active class from all nav links
    navLinks.forEach(navLink => navLink.classList.remove('active'));
    
    // Toggle the target section
    if (targetSection.classList.contains('active')) {
      // If section is already active, close it
      targetSection.classList.remove('active');
    } else {
      // Close all other sections
      sections.forEach(section => section.classList.remove('active'));
      // Open the target section
      targetSection.classList.add('active');
      // Add active class to clicked nav link
      link.classList.add('active');
      
      // Smooth scroll to section
      setTimeout(() => {
        targetSection.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest'
        });
      }, 100);
    }
  });
});

// Handle section header clicks (direct clicking on section headers)
sectionHeaders.forEach(header => {
  header.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();
    
    const section = header.closest('.section-content');
    const sectionId = section.id;
    
    // Find corresponding nav link
    const correspondingNavLink = document.querySelector(`nav a[data-target="${sectionId}"]`);
    
    // Remove active from all nav links first
    navLinks.forEach(navLink => navLink.classList.remove('active'));
    
    // Toggle the section
    if (section.classList.contains('active')) {
      section.classList.remove('active');
    } else {
      // Close all sections
      sections.forEach(s => s.classList.remove('active'));
      // Open this section
      section.classList.add('active');
      // Activate corresponding nav link
      if (correspondingNavLink) {
        correspondingNavLink.classList.add('active');
      }
    }
  });
});

// Optional: Close sections when clicking outside
document.addEventListener('click', (e) => {
  const isNavClick = e.target.closest('nav');
  const isSectionClick = e.target.closest('.section-content');
  
  if (!isNavClick && !isSectionClick) {
    sections.forEach(section => section.classList.remove('active'));
    navLinks.forEach(navLink => navLink.classList.remove('active'));
  }
});

// Save teaching content to localStorage
const teachingTextarea = document.getElementById('teaching-content');

// Load saved content on page load
const savedContent = localStorage.getItem('teachingContent');
if (savedContent) {
  teachingTextarea.value = savedContent;
}

// Save content as user types
teachingTextarea.addEventListener('input', () => {
  localStorage.setItem('teachingContent', teachingTextarea.value);
});

// Add smooth hover effects for project items
const projectItems = document.querySelectorAll('.project-item');
projectItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.style.transform = 'translateY(-3px) scale(1.02)';
  });
  
  item.addEventListener('mouseleave', () => {
    item.style.transform = 'translateY(-2px) scale(1)';
  });
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Create mailto link
    const mailtoLink = `mailto:hassin.arman@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    alert('Email client opened! Thank you for your message.');
    
    // Reset form
    contactForm.reset();
  });
}

// Enhanced floating animation for shapes
const shapes = document.querySelectorAll('.shape');
shapes.forEach((shape, index) => {
  shape.style.animationDuration = `${6 + index * 2}s`;
  shape.style.animationDelay = `${index * 1.5}s`;
});

// Parallax effect for background elements
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const gridOverlay = document.querySelector('.grid-overlay');
  const shapes = document.querySelectorAll('.shape');
  
  if (gridOverlay) {
    gridOverlay.style.transform = `translateY(${scrolled * 0.1}px)`;
  }
  
  shapes.forEach((shape, index) => {
    const speed = 0.05 + (index * 0.02);
    shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
  });
});