gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

const cursor = document.getElementById('custom-cursor');

window.addEventListener('mousemove', (e) => {
  gsap.to(cursor, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.15,
    ease: 'power2.out',
  });
});

document.querySelectorAll('a, button, .magnetic-btn, [role="button"]').forEach((el) => {
  el.addEventListener('mouseenter', () => {
    gsap.to(cursor, { scale: 1.5, opacity: 0.7, duration: 0.2 });
  });
  el.addEventListener('mouseleave', () => {
    gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.2 });
  });
});

document.querySelectorAll('.magnetic-btn').forEach((btn) => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    gsap.to(btn, {
      x: offsetX * 0.4,
      y: offsetY * 0.4,
      duration: 0.3,
      ease: 'power2.out',
    });
  });

  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.3)',
    });
  });
});

const loaderCount = document.getElementById('loader-count');
const preloader = document.getElementById('preloader');
const proxy = { val: 0 };

const masterTL = gsap.timeline();

masterTL.to(proxy, {
  val: 100,
  duration: 2,
  ease: 'power2.inOut',
  onUpdate: () => {
    loaderCount.textContent = Math.round(proxy.val) + '%';
  },
});

masterTL.to(preloader, {
  yPercent: -100,
  duration: 0.8,
  ease: 'power4.inOut',
});

masterTL.fromTo('.hero-title',
  { opacity: 0, y: 50 },
  { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' },
  '-=0.3'
);

masterTL.fromTo('.hero-subtitle',
  { opacity: 0, y: 50 },
  { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out', delay: 0.3 },
  '-=1.5'
);

masterTL.set(document.body, { overflowY: 'auto' });

const panels = gsap.utils.toArray('.player-panel');
const totalPanels = panels.length;
const scrollDistance = (totalPanels - 1) * window.innerWidth;

gsap.to('.roster-wrapper', {
  xPercent: -100 * (totalPanels - 1),
  ease: 'none',
  scrollTrigger: {
    trigger: '#roster-arena',
    start: 'top top',
    end: () => `+=${scrollDistance}`,
    pin: true,
    scrub: 0.8,
    invalidateOnRefresh: true,
    anticipatePin: 1,
  },
});

ScrollTrigger.addEventListener('refreshInit', () => {
  gsap.set('.roster-wrapper', { clearProps: 'xPercent' });
});

const tributeTL = anime.timeline({ autoplay: false });

tributeTL.add({
  targets: '#tribute-path',
  strokeDashoffset: [anime.setDashoffset, 0],
  duration: 2000,
  easing: 'easeInOutSine',
});

ScrollTrigger.create({
  trigger: '#tribute-arena',
  start: 'top 80%',
  onEnter: () => tributeTL.play(),
  once: true,
});

const statNumbers = document.querySelectorAll('.stat-number');

ScrollTrigger.create({
  trigger: '#stats-arena',
  start: 'top 80%',
  once: true,
  onEnter: () => {
    statNumbers.forEach((el) => {
      const target = parseInt(el.getAttribute('data-target'), 10);
      anime({
        targets: { value: 0 },
        value: target,
        round: 1,
        duration: 2500,
        easing: 'easeOutExpo',
        update: (anim) => {
          el.textContent = anim.animations[0].currentValue;
        },
      });
    });
  },
});
