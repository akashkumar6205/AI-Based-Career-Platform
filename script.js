// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== MOBILE MENU TOGGLE =====
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');

mobileToggle.addEventListener('click', () => {
  mobileToggle.classList.toggle('active');
  navLinks.classList.toggle('active');
  document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileToggle.classList.remove('active');
    navLinks.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// ===== SCROLL REVEAL ANIMATIONS =====
const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.getAttribute('data-delay') || 0;
      setTimeout(() => entry.target.classList.add('visible'), delay);
    }
  });
}, observerOptions);

document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));

// ===== DRAG & DROP UPLOAD ZONE =====
const uploadZone = document.getElementById('uploadZone');
if (uploadZone) {
  ['dragenter', 'dragover'].forEach(evt => {
    uploadZone.addEventListener(evt, (e) => {
      e.preventDefault();
      uploadZone.style.borderColor = '#6C63FF';
      uploadZone.style.background = 'rgba(108,99,255,0.08)';
    });
  });
  ['dragleave', 'drop'].forEach(evt => {
    uploadZone.addEventListener(evt, (e) => {
      e.preventDefault();
      uploadZone.style.borderColor = '';
      uploadZone.style.background = '';
    });
  });
  uploadZone.addEventListener('drop', (e) => {
    const files = e.dataTransfer.files;
    if (files.length) {
      uploadZone.querySelector('p').innerHTML =
        `<strong>📄 ${files[0].name}</strong> ready for analysis!<br><span class="upload-hint">Click "Analyze My First Resume" to continue</span>`;
    }
  });
  uploadZone.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.docx,.doc';
    input.onchange = (e) => {
      if (e.target.files.length) {
        uploadZone.querySelector('p').innerHTML =
          `<strong>📄 ${e.target.files[0].name}</strong> ready for analysis!<br><span class="upload-hint">Click "Analyze My First Resume" to continue</span>`;
      }
    };
    input.click();
  });
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== COUNTER ANIMATION FOR THREAT STATS =====
function animateCounter(el) {
  const text = el.textContent.trim();
  const match = text.match(/^(\d+)/);
  if (!match) return;
  const target = parseInt(match[1]);
  const suffix = text.replace(match[1], '');
  let current = 0;
  const duration = 1500;
  const step = Math.ceil(target / (duration / 16));
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = current + suffix;
  }, 16);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.threat-stat').forEach(el => statObserver.observe(el));

// ===== PARALLAX ORB EFFECT ON MOUSE MOVE =====
const orbs = document.querySelectorAll('.orb');
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 2;
  const y = (e.clientY / window.innerHeight - 0.5) * 2;
  orbs.forEach((orb, i) => {
    const speed = (i + 1) * 12;
    orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
  });
});
