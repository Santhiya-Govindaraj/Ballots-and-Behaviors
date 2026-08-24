// ===== Header: hide on scroll down, reveal on scroll up or near top =====
(function(){
  var header = document.querySelector('header.ribbon');
  if (!header) return;

  var lastScrollY = window.scrollY;
  var headerHeight = header.offsetHeight;

  function setSpacer(){
    headerHeight = header.offsetHeight;
    document.documentElement.style.setProperty('--header-h', headerHeight + 'px');
  }
  setSpacer();
  window.addEventListener('resize', setSpacer);

  function onScroll(){
    var y = window.scrollY;

    if (y <= 8) {
      // At the very top: always show
      header.classList.remove('header-hidden');
    } else if (y < lastScrollY) {
      // Scrolling up: reveal
      header.classList.remove('header-hidden');
    } else if (y > lastScrollY && y > headerHeight) {
      // Scrolling down past the header: hide
      header.classList.add('header-hidden');
    }
    lastScrollY = y;
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  // Cursor near the very top of the viewport also reveals the header
  document.addEventListener('mousemove', function(e){
    if (e.clientY < 60) {
      header.classList.remove('header-hidden');
    }
  });
})();

// ===== Reveal-on-scroll animation for content blocks =====
(function(){
  var targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  if (!('IntersectionObserver' in window)) {
    targets.forEach(function(el){ el.classList.add('reveal-visible'); });
    return;
  }

  var observer = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(function(el){ observer.observe(el); });
})();

// ===== Footer year =====
(function(){
  var el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
})();
