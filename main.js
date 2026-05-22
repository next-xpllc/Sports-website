gsap.registerPlugin(ScrollTrigger);

gsap.fromTo('.hero-title',
  { opacity: 0, y: 50 },
  { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' }
);

gsap.fromTo('.hero-subtitle',
  { opacity: 0, y: 50 },
  { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out', delay: 0.3 }
);

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
