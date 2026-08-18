// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Intersection observer — section reveals
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Once revealed, unobserve — no re-animation
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

// Apply reveal class + observe
document.querySelectorAll(
  '.section-header, .project-card, .about-bio, .about-meta, .contact-inner'
).forEach((el, i) => {
  el.classList.add('reveal');
  // Stagger cards slightly
  if (el.classList.contains('project-card')) {
    el.style.transitionDelay = `${i * 0.06}s`;
  }
  observer.observe(el);
});

// Subtle parallax on hallway — adds depth to the liminal space
const hallway = document.querySelector('.hallway-svg');
if (hallway && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        const rate = scrolled * 0.04;
        hallway.style.transform = `translateY(${rate}px) scale(1.04)`;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}
