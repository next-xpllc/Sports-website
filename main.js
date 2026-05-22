gsap.registerPlugin(ScrollTrigger);

const cursor = document.getElementById('custom-cursor');

window.addEventListener('mousemove', (e) => {
  gsap.to(cursor, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.15,
    ease: 'power2.out',
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
