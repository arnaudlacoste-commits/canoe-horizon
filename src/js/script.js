document.addEventListener('DOMContentLoaded', () => {

  /* ===== Mobile nav toggle ===== */
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isOpen));
      mainNav.classList.toggle('is-open');
    });

    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.setAttribute('aria-expanded', 'false');
        mainNav.classList.remove('is-open');
      });
    });
  }

  /* ===== Testimonials carousel ===== */
  const track = document.getElementById('testi-track');
  const prevBtn = document.getElementById('testi-prev');
  const nextBtn = document.getElementById('testi-next');
  const dotsWrap = document.getElementById('testi-dots');

  if (track) {
    const slides = Array.from(track.children);
    let index = 0;
    let autoplayId = null;

    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.setAttribute('aria-label', `Aller à l'avis ${i + 1}`);
      if (i === 0) dot.classList.add('is-active');
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });
    const dots = Array.from(dotsWrap.children);

    function getVisible() { return window.innerWidth >= 900 ? 3 : 1; }

    function update() {
      const visible = getVisible();
      const maxIndex = Math.max(0, slides.length - visible);
      index = Math.max(0, Math.min(maxIndex, index));
      const step = 100 / visible;
      track.style.transform = `translateX(-${index * step}%)`;
      dots.forEach((d, i) => d.classList.toggle('is-active', i === index));
    }

    function goTo(i) {
      const visible = getVisible();
      const maxIndex = Math.max(0, slides.length - visible);
      index = (i + slides.length) % (maxIndex + 1);
      update();
    }

    function next() { goTo(index + 1); }
    function prev() { goTo(index - 1); }

    window.addEventListener('resize', update);

    nextBtn.addEventListener('click', next);
    prevBtn.addEventListener('click', prev);

    function startAutoplay() {
      autoplayId = setInterval(next, 6000);
    }
    function stopAutoplay() {
      clearInterval(autoplayId);
    }

    const carousel = document.getElementById('testi-carousel');
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
    carousel.addEventListener('focusin', stopAutoplay);
    carousel.addEventListener('focusout', startAutoplay);

    startAutoplay();
    update();
  }

  /* ===== Scroll reveal animations ===== */
  const revealTargets = document.querySelectorAll(
    '.course-card, .discover-card, .timeline-step, .faq-item, .testi-card, .poster-wrap, .contact-card'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealTargets.forEach(el => observer.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('is-visible'));
  }

  /* ===== Contact form → mailto (site statique, pas de backend) ===== */
  /* Adresse assemblée à l'exécution pour ne pas être moissonnable dans le HTML.
     Temporaire : à remplacer par contact@canoehorizon.fr quand le domaine existera. */
  const CONTACT_TO = ['paulinedmg', 'icloud.com'].join('@');
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    const formLoadedAt = Date.now();
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      /* Antispam : honeypot rempli ou soumission trop rapide = robot */
      if (contactForm.elements.website.value) return;
      if (Date.now() - formLoadedAt < 3000) return;
      if (!contactForm.reportValidity()) return;

      const name = contactForm.elements.name.value.trim();
      const email = contactForm.elements.email.value.trim();
      const phone = contactForm.elements.phone.value.trim();
      const subjectSelect = contactForm.elements.subject;
      const subjectLabel = subjectSelect.options[subjectSelect.selectedIndex].textContent;
      const message = contactForm.elements.message.value.trim();

      const subject = '[Site] ' + subjectLabel + ' — ' + name;
      const body = message + '\n\n—\n' + name + '\n' + email + (phone ? '\n' + phone : '');
      window.location.href = 'mailto:' + CONTACT_TO
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(body);

      const hint = document.getElementById('cf-hint');
      const confirmMsg = document.getElementById('cf-confirm');
      if (hint) hint.hidden = true;
      if (confirmMsg) confirmMsg.hidden = false;
    });
  }

  /* ===== Hide sticky CTA near footer ===== */
  const stickyCta = document.getElementById('sticky-cta');
  const footer = document.querySelector('.site-footer');

  if (stickyCta && footer && 'IntersectionObserver' in window) {
    const footerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        stickyCta.style.transform = entry.isIntersecting ? 'translateY(100%)' : 'translateY(0)';
      });
    }, { threshold: 0.05 });
    footerObserver.observe(footer);
  }

});
