const menu=document.querySelector('.menu-toggle');const nav=document.querySelector('.site-nav');menu?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'✕':'☰'});nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu?.setAttribute('aria-expanded','false');if(menu)menu.textContent='☰'}));const gallery=document.querySelector('#gallery');document.querySelector('#next')?.addEventListener('click',()=>gallery.scrollBy({left:250,behavior:'smooth'}));document.querySelector('#prev')?.addEventListener('click',()=>gallery.scrollBy({left:-250,behavior:'smooth'}));

// Scroll reveal: progressive enhancement with reduced-motion support.
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || !('IntersectionObserver' in window)) return;
  const selectors = [
    '.hero-copy > *', '.hero-art', '.strip-inner > span',
    '.section-heading', '.feature-card', '.screen-card',
    '.why-art', '.why-copy > *', '.developer-card',
    '.faq-list > details', '.download-panel', '.footer-inner'
  ];
  const targets = document.querySelectorAll(selectors.join(','));
  if (!targets.length) return;
  targets.forEach((el, index) => {
    el.classList.add('reveal');
    if (el.matches('.why-art')) el.classList.add('from-left');
    if (el.matches('.why-copy')) el.classList.add('from-right');
    // Short stagger within each sibling group, never long cumulative delays.
    const siblingIndex = Array.prototype.indexOf.call(el.parentElement.children, el);
    el.style.setProperty('--reveal-delay', `${Math.min(siblingIndex % 4, 3) * 85}ms`);
  });
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -35px 0px' });
  targets.forEach(el => observer.observe(el));
  document.documentElement.classList.add('motion-ready');
  // Keep elements visible for users printing the page.
  window.addEventListener('beforeprint', () => document.documentElement.classList.remove('motion-ready'));
})();
