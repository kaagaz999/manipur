/* ==================================================================
   script.js — Manipur Archive
   Five small, independent behaviors:
   1. Timeline entries fade/rise into view on scroll
   2. Stat numbers count up once, when the masthead stat strip is seen
   3. Nav bar gets a slightly stronger shadow after scrolling past hero
   4. Punch-line statements fade/rise in when scrolled to
   5. Flag stripes unfurl left-to-right when the flag section is seen
   ================================================================== */

// ---- 1. Timeline reveal-on-scroll ----------------------------------
const timelineEntries = document.querySelectorAll('.tl-entry');

const tlObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      tlObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

timelineEntries.forEach((el) => tlObserver.observe(el));

// ---- 2. Stat count-up ------------------------------------------------
const statNumbers = document.querySelectorAll('.stat-num[data-count]');

function animateCount(el) {
  const target = parseInt(el.dataset.count, 10);
  const duration = 1400; // ms
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    // ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(eased * target);
    el.textContent = value.toLocaleString();
    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      el.textContent = target.toLocaleString();
    }
  }
  requestAnimationFrame(tick);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statNumbers.forEach((el) => statObserver.observe(el));

// ---- 3. Nav shadow on scroll ------------------------------------------
const nav = document.getElementById('siteNav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    nav.style.boxShadow = '0 4px 24px rgba(0,0,0,0.35)';
  } else {
    nav.style.boxShadow = 'none';
  }
}, { passive: true });

// ---- 4. Punch-line reveal ------------------------------------------
const punchLines = document.querySelectorAll('.punch-line p');

const punchObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      punchObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

punchLines.forEach((el) => punchObserver.observe(el));

// ---- 5. Flag stripes unfurl ------------------------------------------
const flagGraphic = document.getElementById('flagGraphic');

if (flagGraphic) {
  const flagObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        flagObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  flagObserver.observe(flagGraphic);
}
