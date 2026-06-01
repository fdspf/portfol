/* ═══════════════════════════════
   MAIN.JS — Портфолио Николая
   ═══════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Custom cursor ──
  const cursor = document.getElementById('cursor');
  if (cursor && window.matchMedia('(hover:hover)').matches) {
    document.addEventListener('mousemove', e => {
      cursor.style.transform = `translate(${e.clientX - 7}px, ${e.clientY - 7}px)`;
    });
    document.querySelectorAll('a, button, .btn, .proj__card, .award__card').forEach(el => {
      el.addEventListener('mouseenter', () => { cursor.style.transform += ' scale(2.5)'; cursor.style.opacity = '.5'; });
      el.addEventListener('mouseleave', () => { cursor.style.opacity = '1'; });
    });
  }

  // ── Mobile nav ──
  const toggle = document.getElementById('nav-toggle');
  const menu   = document.getElementById('nav-menu');
  toggle?.addEventListener('click', () => {
    menu.classList.toggle('open');
    const bars = toggle.querySelectorAll('span');
    if (menu.classList.contains('open')) {
      bars[0].style.transform = 'rotate(45deg) translate(5px,5px)';
      bars[1].style.opacity   = '0';
      bars[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
    } else {
      bars.forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
    }
  });

  // Close nav on link click
  document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.querySelectorAll('span').forEach(b => { b.style.transform=''; b.style.opacity=''; });
    });
  });

  // ── Smooth scroll & active link ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const id = anchor.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
      }
    });
  });

  const updateActive = () => {
    const sections = document.querySelectorAll('section[id]');
    const links    = document.querySelectorAll('.nav__link');
    let current = '';
    sections.forEach(s => {
      if (scrollY >= s.offsetTop - 120) current = s.getAttribute('id');
    });
    links.forEach(l => {
      l.classList.toggle('active-link', l.getAttribute('href') === `#${current}`);
    });
  };

  // ── Scroll reveal ──
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 80}ms`;
    revealObserver.observe(el);
  });

  // ── Skill bar animation ──
  const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill__fill').forEach(bar => {
          bar.style.width = bar.style.getPropertyValue('--w') || bar.dataset.w || '0%';
          // CSS var fallback
          const w = getComputedStyle(bar).getPropertyValue('--w').trim();
          if (w) bar.style.width = w;
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.skill__cat').forEach(cat => skillObserver.observe(cat));

  // ── Contact form ──
  const form = document.getElementById('contact-form');
  form?.addEventListener('submit', e => {
    e.preventDefault();
    const name = form.querySelector('[name="name"]').value || 'пользователь';
    const btn  = form.querySelector('button[type="submit"]');
    btn.innerHTML = '<i class="bx bx-check"></i> Отправлено!';
    btn.style.background = '#22c55e';
    btn.style.borderColor = '#22c55e';
    setTimeout(() => {
      btn.innerHTML = '<i class="bx bx-send"></i> Отправить сообщение';
      btn.style.background = '';
      btn.style.borderColor = '';
      form.reset();
    }, 3000);
  });

  // ── Scroll events ──
  window.addEventListener('scroll', updateActive, { passive: true });

  console.log('✅ Портфолио Николая Бибко — загружено!');
});
