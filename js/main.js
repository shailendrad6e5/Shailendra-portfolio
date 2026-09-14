/* =============================================================
   main.js — Portfolio Interactions
   Laboratory Notebook identity. No external dependencies.
   ============================================================= */

(function () {
  'use strict';

  // ─── DOM refs ─────────────────────────────────────────────
  const introScreen    = document.getElementById('introScreen');
  const siteHeader     = document.getElementById('siteHeader');
  const menuBtn        = document.getElementById('menuBtn');
  const navOverlay     = document.getElementById('fullscreenNav');
  const scrollProgress = document.getElementById('scrollProgress');
  const heroCanvas     = document.getElementById('heroCanvas');
  const heroNameEl     = document.getElementById('heroName');
  const heroStatement  = document.getElementById('heroStatement');
  const skillListEl    = document.getElementById('skillList');
  const workBandsEl    = document.getElementById('workBands');
  const journeyListEl  = document.getElementById('journeyList');
  const contactLinksEl = document.getElementById('contactLinks');
  const contactForm    = document.getElementById('contactForm');
  const caseOverlay    = document.getElementById('caseOverlay');
  const caseContent    = document.getElementById('caseContent');
  const caseCloseBtn   = document.getElementById('caseCloseBtn');
  const backTopBtn     = document.getElementById('backToTop');
  const footerYear     = document.getElementById('footerYear');
  const cursorEl       = document.getElementById('cursor');

  // ─── Helpers ──────────────────────────────────────────────
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const reduced = () => false; // window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const touch   = () => window.matchMedia('(hover: none)').matches;

  // ─── Boot ─────────────────────────────────────────────────
  function init() {
    footerYear.textContent = new Date().getFullYear();
    renderSkills();
    renderProjects();
    renderJourney();
    renderContactLinks();
    setHeroFontSize();
    runIntro();
    initNav();
    initScrollProgress();
    initScrollReveal();
    initProjectImageReveal();
    initCanvas();
    initCursor();
    initContactForm();
    initBackTop();
    initFocusTrap();
    window.addEventListener('resize', debounce(setHeroFontSize, 200));
  }

  // ─── HERO: fluid name fills viewport width ─────────────────
  // Measures via an off-screen clone so clip-path never interferes.
  function setHeroFontSize() {
    if (!heroNameEl) return;

    const band  = heroNameEl.parentElement;
    // Read the resolved padding from the element itself (avoids clamp() parse issues)
    const computedPx = parseFloat(getComputedStyle(heroNameEl).paddingLeft) || 0;
    const avail = band.clientWidth - computedPx * 2;
    if (avail <= 0) return;

    // Clone into a measurement node that is out of flow
    const probe = heroNameEl.cloneNode(true);
    probe.style.cssText = [
      'position:absolute',
      'visibility:hidden',
      'pointer-events:none',
      'white-space:nowrap',
      'font-size:100px',
      'clip-path:none',
      'transform:none',
      'left:-9999px',
      'top:0'
    ].join(';');
    document.body.appendChild(probe);
    const probeW = probe.scrollWidth; // width at 100px
    document.body.removeChild(probe);

    if (probeW === 0) return;
    const newSize = Math.floor((avail / probeW) * 100);
    heroNameEl.style.fontSize = Math.min(newSize, 220) + 'px';
  }

  // ─── INTRO ────────────────────────────────────────────────
  function runIntro() {
    if (!introScreen || reduced()) {
      if (introScreen) introScreen.style.display = 'none';
      revealHero();
      return;
    }
    setTimeout(() => {
      introScreen.classList.add('is-exiting');
      setTimeout(() => {
        introScreen.style.display = 'none';
        revealHero();
      }, 600);
    }, 1900);
  }

  function revealHero() {
    // Re-measure font size now that intro has exited
    setHeroFontSize();
    // Small rAF delay ensures browser has painted before we trigger transitions
    requestAnimationFrame(() => {
      heroNameEl?.classList.add('is-visible');
      heroStatement?.classList.add('is-visible');
      $('.hero-cta-group')?.classList.add('is-visible');
      $('.hero-scroll-hint')?.classList.add('is-visible');
    });
  }

  // ─── NAVIGATION ───────────────────────────────────────────
  function initNav() {
    if (!menuBtn || !navOverlay) return;

    menuBtn.addEventListener('click', () => {
      const open = navOverlay.getAttribute('aria-hidden') === 'false';
      open ? closeNav() : openNav();
    });

    $$('.nav-big-link').forEach(link =>
      link.addEventListener('click', closeNav)
    );

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        if (navOverlay.getAttribute('aria-hidden') === 'false') closeNav();
        if (caseOverlay.getAttribute('aria-hidden') === 'false') closeCaseStudy();
      }
    });

    // Hide/show header on scroll direction
    let lastY = window.scrollY;
    let ticking = false;

    window.addEventListener('scroll', () => {
      // Do not hide header or process scroll if menu is open
      if (navOverlay.getAttribute('aria-hidden') === 'false') return;

      if (!ticking) {
        requestAnimationFrame(() => {
          if (navOverlay.getAttribute('aria-hidden') === 'false') {
            siteHeader.classList.remove('nav-hidden');
            ticking = false;
            return;
          }
          const y = window.scrollY;
          // Only hide if scrolling DOWN and past 120px from top
          // Always show if scrolling UP
          if (y > lastY && y > 120) {
            siteHeader.classList.add('nav-hidden');
          } else {
            siteHeader.classList.remove('nav-hidden');
          }
          lastY = y;
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  function preventScroll(e) {
    e.preventDefault();
  }

  function openNav() {
    navOverlay.setAttribute('aria-hidden', 'false');
    menuBtn.setAttribute('aria-expanded', 'true');
    document.documentElement.classList.add('menu-open');
    document.body.classList.add('menu-open');
    // Prevent mouse wheel and touch scroll on background page
    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });
    // Always show header when menu is open
    siteHeader.classList.remove('nav-hidden');
    // Focus first link for keyboard users
    setTimeout(() => navOverlay.querySelector('a')?.focus(), 80);
  }

  function closeNav() {
    navOverlay.setAttribute('aria-hidden', 'true');
    menuBtn.setAttribute('aria-expanded', 'false');
    document.documentElement.classList.remove('menu-open');
    document.body.classList.remove('menu-open');
    window.removeEventListener('wheel', preventScroll);
    window.removeEventListener('touchmove', preventScroll);
    // Keep header visible after closing menu
    siteHeader.classList.remove('nav-hidden');
    lastY = window.scrollY;
    menuBtn.focus();
  }

  // ─── SCROLL PROGRESS ──────────────────────────────────────
  function initScrollProgress() {
    if (!scrollProgress) return;
    window.addEventListener('scroll', () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    }, { passive: true });
  }

  // ─── SCROLL REVEAL (clip-path and translateX variety) ─────
  function initScrollReveal() {
    if (reduced()) {
      $$('.av, .journey-item, .cs-line, .section-rule').forEach(el => {
        el.classList.add('is-visible');
      });
      return;
    }

    // Lower threshold + zero rootMargin so items in partial view still reveal.
    // Using 'any visible pixel' (threshold 0) for robustness.
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -20px 0px' });

    // About verbs — transition-delay drives stagger (CSS)
    $$('.av').forEach(el => obs.observe(el));

    // Journey items — translateX stagger
    $$('.journey-item').forEach((el, i) => {
      el.style.transitionDelay = `${i * 80}ms`;
      obs.observe(el);
    });

    $$('.cs-line').forEach(el => obs.observe(el));
    $$('.section-rule').forEach(el => obs.observe(el));
  }

  // ─── PROJECT IMAGE CLIP-PATH REVEAL ───────────────────────
  function initProjectImageReveal() {
    const imgObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('img-visible');
          imgObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.2 });

    $$('.work-band').forEach(band => imgObs.observe(band));
  }

  // ─── HERO CANVAS (cursor-reactive network) ────────────────
  function initCanvas() {
    if (!heroCanvas || reduced()) return;

    const ctx = heroCanvas.getContext('2d');
    let W, H, particles = [];
    const COUNT = 55;
    const LINK_DIST = 110;
    let mouse = { x: -999, y: -999 };

    function resize() {
      W = heroCanvas.width  = heroCanvas.offsetWidth;
      H = heroCanvas.height = heroCanvas.offsetHeight;
    }

    function spawn() {
      particles = Array.from({ length: COUNT }, () => ({
        x:  Math.random() * W,
        y:  Math.random() * H,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r:  Math.random() * 1.2 + 0.4
      }));
    }

    function tick() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p, i) => {
        // Mouse repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const md = Math.hypot(dx, dy);
        if (md < 70) { p.vx += (dx / md) * 0.07; p.vy += (dy / md) * 0.07; }

        p.vx *= 0.985; p.vy *= 0.985;
        p.x = (p.x + p.vx + W) % W;
        p.y = (p.y + p.vy + H) % H;

        // Particle connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2  = particles[j];
          const d   = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (d < LINK_DIST) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(200,241,53,${(1 - d / LINK_DIST) * 0.09})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }

        // Mouse connections
        const cm = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (cm < LINK_DIST) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(200,241,53,${(1 - cm / LINK_DIST) * 0.45})`;
          ctx.lineWidth = 0.7; ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(234,232,227,0.4)';
        ctx.fill();
      });
      requestAnimationFrame(tick);
    }

    // Track mouse over the parent hero section
    const heroSection = heroCanvas.closest('.hero-section');
    heroSection?.addEventListener('mousemove', e => {
      const r = heroCanvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    });
    heroSection?.addEventListener('mouseleave', () => { mouse.x = -999; mouse.y = -999; });

    window.addEventListener('resize', debounce(() => { resize(); spawn(); }, 200));
    resize(); spawn(); tick();
  }

  // ─── CUSTOM CURSOR ────────────────────────────────────────
  function initCursor() {
    if (!cursorEl || touch()) return;

    const dot   = $('.cursor-dot',   cursorEl);
    const ring  = $('.cursor-ring',  cursorEl);
    const label = $('.cursor-label', cursorEl);
    let cx = 0, cy = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
      cx = e.clientX; cy = e.clientY;
      dot.style.left = cx + 'px'; dot.style.top = cy + 'px';
    });

    function trackRing() {
      rx += (cx - rx) * 0.11; ry += (cy - ry) * 0.11;
      ring.style.left  = rx + 'px'; ring.style.top  = ry + 'px';
      label.style.left = rx + 'px'; label.style.top = ry + 'px';
      requestAnimationFrame(trackRing);
    }
    trackRing();

    document.addEventListener('mouseover', e => {
      const el = e.target;
      cursorEl.className = 'cursor';
      label.textContent = '';

      if (el.closest('a') || el.closest('button') || el.closest('[role="button"]')) {
        cursorEl.classList.add('on-link');
      }
      if (el.closest('.work-band')) {
        cursorEl.classList.add('on-project');
        label.textContent = 'View →';
      }
    });
  }

  // ─── RENDER: SKILLS (expandable list) ─────────────────────
  function renderSkills() {
    if (!skillListEl) return;

    portfolioData.skills.forEach((skill, i) => {
      const li = document.createElement('li');
      li.className = 'skill-item';

      const idx = String(i + 1).padStart(2, '0');
      li.innerHTML = `
        <div class="skill-item-header" role="button" tabindex="0"
             aria-expanded="false" aria-controls="sk-body-${i}">
          <span class="skill-num mono">${idx}</span>
          <span class="skill-name">${skill.name}</span>
          <span class="skill-cat mono">${skill.category}</span>
          <span class="skill-toggle" aria-hidden="true">+</span>
        </div>
        <div class="skill-item-body" id="sk-body-${i}" role="region">
          <div class="skill-body-inner">
            <span class="skill-desc">${skill.desc}</span>
            <span class="skill-tag">${skill.tag}</span>
          </div>
        </div>
      `;

      const header = li.querySelector('.skill-item-header');
      const toggle = () => {
        const open = li.classList.toggle('is-open');
        header.setAttribute('aria-expanded', open);
      };

      header.addEventListener('click', toggle);
      header.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
      });

      skillListEl.appendChild(li);
    });
  }

  // ─── RENDER: PROJECTS ─────────────────────────────────────
  function renderProjects() {
    if (!workBandsEl) return;

    portfolioData.projects.forEach(proj => {
      const band = document.createElement('article');
      band.className = 'work-band';
      band.setAttribute('role', 'button');
      band.setAttribute('tabindex', '0');
      band.setAttribute('aria-label', `Open case study: ${proj.name}`);
      band.dataset.id = proj.id;

      const tagsHtml = proj.tags.map(t => `<span class="work-tag">${t}</span>`).join('');

      band.innerHTML = `
        <div class="work-band-info">
          <div class="work-band-top">
            <span class="work-band-num mono">${proj.num}</span>
            <h3 class="work-band-title">${proj.name}</h3>
            <p class="work-band-desc">${proj.shortDesc}</p>
            <div class="work-band-tags">${tagsHtml}</div>
          </div>
          <div class="work-band-action">
            <span>View case study</span>
            <span class="work-action-arrow" aria-hidden="true">→</span>
          </div>
        </div>
        <div class="work-band-image-wrap">
          <img class="work-band-image"
               src="${proj.image}"
               alt="${proj.name} preview"
               loading="lazy"
               width="800" height="450">
        </div>
      `;

      const openStudy = () => openCaseStudy(proj.id);
      band.addEventListener('click', openStudy);
      band.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openStudy(); }
      });

      workBandsEl.appendChild(band);
    });
  }

  // ─── CASE STUDY ───────────────────────────────────────────
  function openCaseStudy(id) {
    const proj = portfolioData.projects.find(p => p.id === id);
    if (!proj || !caseOverlay || !caseContent) return;

    const tagsHtml = proj.tags.map(t => `<span class="case-tag">${t}</span>`).join('');

    caseContent.innerHTML = `
      <div class="case-eyebrow">
        <span class="case-num-label mono">${proj.num} / ${String(portfolioData.projects.length).padStart(2, '0')}</span>
        <span class="case-divider" aria-hidden="true"></span>
      </div>
      <h2 class="case-title" id="caseTitle">${proj.name}</h2>
      <img class="case-image" src="${proj.image}" alt="${proj.name} preview" loading="lazy">
      <span class="case-label">The Idea</span>
      <p class="case-body">${proj.idea}</p>
      <span class="case-label">The Build</span>
      <p class="case-body">${proj.build}</p>
      <span class="case-label">Technology</span>
      <div class="case-tags">${tagsHtml}</div>
      <div class="case-links">
        <a href="${proj.github}" class="btn-ghost" target="_blank" rel="noopener noreferrer">Source Code</a>
        <a href="${proj.demo}"   class="btn-primary" target="_blank" rel="noopener noreferrer">Live Demo</a>
      </div>
    `;

    caseOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    // Scroll the overlay back to top
    caseOverlay.querySelector('.case-scroll-area').scrollTop = 0;
    caseCloseBtn?.focus();
  }

  function closeCaseStudy() {
    caseOverlay?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  caseCloseBtn?.addEventListener('click', closeCaseStudy);

  // ─── RENDER: JOURNEY ──────────────────────────────────────
  function renderJourney() {
    if (!journeyListEl) return;

    portfolioData.journey.forEach((item, i) => {
      const li = document.createElement('li');
      li.className = 'journey-item';
      li.innerHTML = `
        <span class="journey-date mono">${item.date}</span>
        <h3 class="journey-title">${item.title}</h3>
        <p class="journey-desc">${item.desc}</p>
      `;
      journeyListEl.appendChild(li);
    });
  }

  // ─── RENDER: CONTACT LINKS ────────────────────────────────
  function renderContactLinks() {
    if (!contactLinksEl) return;

    const rows = [
      { label: 'Email',    value: portfolioData.social.email,    action: 'Copy to clipboard', type: 'copy' },
      { label: 'GitHub',   value: 'github.com',                  action: 'Open link',         type: 'link', href: portfolioData.social.github },
      { label: 'LinkedIn', value: 'linkedin.com',                action: 'Open link',         type: 'link', href: portfolioData.social.linkedin }
    ];

    rows.forEach(row => {
      const div = document.createElement('div');
      div.className = 'contact-link-item';
      div.setAttribute('role', 'button');
      div.setAttribute('tabindex', '0');
      div.setAttribute('aria-label', `${row.label}: ${row.action}`);

      div.innerHTML = `
        <span class="cli-label mono">${row.label}</span>
        <span class="cli-value">${row.value}</span>
        <span class="cli-action mono">${row.action} →</span>
      `;

      const handle = () => {
        if (row.type === 'copy') {
          navigator.clipboard.writeText(portfolioData.social.email).then(() => {
            const actionEl = div.querySelector('.cli-action');
            const prev = actionEl.textContent;
            actionEl.textContent = 'Copied ✓';
            div.querySelector('.cli-value').style.color = 'var(--accent)';
            setTimeout(() => {
              actionEl.textContent = prev;
              div.querySelector('.cli-value').style.color = '';
            }, 2200);
          }).catch(() => { window.location.href = `mailto:${portfolioData.social.email}`; });
        } else {
          window.open(row.href, '_blank', 'noopener,noreferrer');
        }
      };

      div.addEventListener('click', handle);
      div.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handle(); }
      });

      contactLinksEl.appendChild(div);
    });
  }

  // ─── CONTACT FORM ─────────────────────────────────────────
  function initContactForm() {
    if (!contactForm) return;

    const btn    = contactForm.querySelector('.form-submit-btn');
    const text   = contactForm.querySelector('.submit-text');
    const status = contactForm.querySelector('.submit-status');

    const fields = [
      { el: document.getElementById('cf-name'),    err: null },
      { el: document.getElementById('cf-email'),   err: null },
      { el: document.getElementById('cf-message'), err: null }
    ].map(f => ({ ...f, err: f.el?.nextElementSibling }));

    const validateField = f => {
      if (!f.el || !f.err) return true;
      let msg = '';
      if (!f.el.value.trim()) msg = 'Required.';
      else if (f.el.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.el.value))
        msg = 'Enter a valid email.';
      f.el.classList.toggle('is-invalid', !!msg);
      f.err.textContent = msg;
      return !msg;
    };

    fields.forEach(f => f.el?.addEventListener('blur', () => validateField(f)));

    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      if (!fields.map(f => validateField(f)).every(Boolean)) return;

      btn.disabled = true;
      text.textContent = 'Sending…';

      setTimeout(() => {
        text.textContent = 'Sent';
        status.textContent = ' ✓';
        contactForm.reset();
        setTimeout(() => {
          text.textContent = 'Send message';
          status.textContent = '';
          btn.disabled = false;
        }, 3000);
      }, 1500);
    });
  }

  // ─── BACK TO TOP ──────────────────────────────────────────
  function initBackTop() {
    backTopBtn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ─── FOCUS TRAP (overlays) ────────────────────────────────
  function initFocusTrap() {
    [navOverlay, caseOverlay].forEach(overlay => {
      if (!overlay) return;
      overlay.addEventListener('keydown', e => {
        if (e.key !== 'Tab') return;
        const foc = Array.from(
          overlay.querySelectorAll('a[href],button,[tabindex]:not([tabindex="-1"])')
        ).filter(el => !el.disabled && getComputedStyle(el).display !== 'none');
        if (!foc.length) return;
        const first = foc[0], last = foc[foc.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      });
    });
  }

  // ─── DEBOUNCE ─────────────────────────────────────────────
  function debounce(fn, ms) {
    let t;
    return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
  }

  // ─── Boot ─────────────────────────────────────────────────
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

})();
