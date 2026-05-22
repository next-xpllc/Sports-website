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

document.querySelectorAll('a, button, .magnetic-btn, [role="button"], .clickable').forEach((el) => {
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

const bgAudio = document.getElementById('bg-audio');
const audioToggle = document.getElementById('audio-toggle');
const soundBars = document.querySelectorAll('.sound-bar');

const eqTL = gsap.timeline({ paused: true, repeat: -1, yoyo: true });

soundBars.forEach((bar, i) => {
  eqTL.to(bar, {
    scaleY: gsap.utils.random(0.3, 1.8),
    duration: gsap.utils.random(0.3, 0.6),
    ease: 'power1.inOut',
  }, i * 0.1);
});

audioToggle.addEventListener('click', () => {
  if (bgAudio.paused) {
    bgAudio.play();
    audioToggle.classList.add('is-playing');
    eqTL.play();
  } else {
    bgAudio.pause();
    audioToggle.classList.remove('is-playing');
    eqTL.pause();
  }
});

let audioPrimed = false;
document.body.addEventListener('click', () => {
  if (!audioPrimed) {
    audioPrimed = true;
    bgAudio.play().then(() => {
      audioToggle.classList.add('is-playing');
      eqTL.play();
    }).catch(() => {});
  }
}, { once: true });

const playerData = [
  {
    name: 'Ratul',
    position: 'Left Wing',
    jersey: '#26 (Actual #11)',
    form: 'Unstoppable',
    keyAttr: 'Acceleration',
    pace: '94',
    dribbling: '89',
    bio: 'A lightning-fast winger who terrorizes defenses with explosive pace and clinical finishing. Ratul is the heartbeat of Uddam 26\'s attack, cutting inside from the left flank to create scoring opportunities out of nothing.',
  },
  {
    name: 'Mahid',
    position: 'Central Midfield',
    jersey: '#8',
    form: 'Dominant',
    keyAttr: 'Vision',
    pace: '78',
    dribbling: '85',
    bio: 'The midfield engine who dictates tempo and controls the rhythm of every match. Mahid\'s exceptional vision and passing range make him the creative fulcrum of Uddam 26\'s buildup play.',
  },
  {
    name: 'Tasfir Ahmed Shahadat',
    position: 'Central Midfield',
    jersey: '#10',
    form: 'Sharper',
    keyAttr: 'Passing',
    pace: '76',
    dribbling: '82',
    bio: 'A composed and intelligent playmaker who reads the game two steps ahead. Tasfir\'s pinpoint passing and tactical awareness drive Uddam 26 forward with precision and purpose.',
  },
  {
    name: 'Shariar Abid',
    position: 'Right Back',
    jersey: '#2',
    form: 'Solid',
    keyAttr: 'Tackling',
    pace: '82',
    dribbling: '74',
    bio: 'A tenacious defender who combines grit with intelligence. Shariar locks down the right flank and launches counter-attacks with well-timed interceptions and surging overlaps.',
  },
  {
    name: 'Siyad Hasan Nirob',
    position: 'Center Back',
    jersey: '#4',
    form: 'Commanding',
    keyAttr: 'Strength',
    pace: '70',
    dribbling: '68',
    bio: 'The defensive rock of Uddam 26. Siyad dominates aerial duels and organizes the backline with authority. His leadership and physical presence make him indispensable.',
  },
  {
    name: 'Sadiqul Islam',
    position: 'Striker',
    jersey: '#9',
    form: 'Fearless',
    keyAttr: 'Finishing',
    pace: '88',
    dribbling: '80',
    bio: 'A relentless striker who lives for the big moments. Sadiqul\'s fearless mentality and clinical finishing in the box make him Uddam 26\'s most dangerous weapon in front of goal.',
  },
];

const modal = document.getElementById('player-modal');
const modalOverlay = modal.querySelector('.modal-overlay');
const modalCard = modal.querySelector('.modal-card');
const modalContent = document.getElementById('modal-profile-content');
const modalClose = document.getElementById('modal-close');

function openModal(index) {
  const data = playerData[index];
  modalContent.innerHTML = `
    <h2>${data.name}</h2>
    <p class="modal-position">${data.position} &mdash; ${data.jersey}</p>
    <div class="modal-stats">
      <div class="modal-stat">
        <p class="modal-stat-label">Form</p>
        <p class="modal-stat-value">${data.form}</p>
      </div>
      <div class="modal-stat">
        <p class="modal-stat-label">Key Attribute</p>
        <p class="modal-stat-value">${data.keyAttr}</p>
      </div>
      <div class="modal-stat">
        <p class="modal-stat-label">Pace</p>
        <p class="modal-stat-value">${data.pace}</p>
      </div>
      <div class="modal-stat">
        <p class="modal-stat-label">Dribbling</p>
        <p class="modal-stat-value">${data.dribbling}</p>
      </div>
    </div>
    <p class="modal-bio">${data.bio}</p>
  `;

  lenis.stop();
  modal.style.display = 'flex';

  gsap.fromTo(modalOverlay, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' });
  gsap.fromTo(modalCard, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'power4.out', delay: 0.1 });
}

function closeModal() {
  gsap.to(modalCard, { opacity: 0, scale: 0.9, duration: 0.3, ease: 'power3.in' });
  gsap.to(modalOverlay, {
    opacity: 0,
    duration: 0.3,
    ease: 'power2.in',
    delay: 0.1,
    onComplete: () => {
      modal.style.display = 'none';
      lenis.start();
    },
  });
}

document.querySelectorAll('.player-panel.clickable').forEach((panel, i) => {
  panel.addEventListener('click', () => openModal(i));
});

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

const cdDays = document.getElementById('cd-days');
const cdHours = document.getElementById('cd-hours');
const cdMinutes = document.getElementById('cd-minutes');
const cdSeconds = document.getElementById('cd-seconds');

function updateCountdown() {
  const target = new Date('2026-08-01T00:00:00');
  const now = new Date();
  const diff = target - now;

  if (diff <= 0) {
    cdDays.textContent = '00';
    cdHours.textContent = '00';
    cdMinutes.textContent = '00';
    cdSeconds.textContent = '00';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  cdDays.textContent = String(days).padStart(2, '0');
  cdHours.textContent = String(hours).padStart(2, '0');
  cdMinutes.textContent = String(minutes).padStart(2, '0');
  cdSeconds.textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

ScrollTrigger.create({
  trigger: '#countdown-arena',
  start: 'top 85%',
  once: true,
  onEnter: () => {
    gsap.to('#countdown-arena', {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'power2.out',
    });
  },
});

const marqueeWrapper = document.querySelector('.marquee-wrapper');
const marqueeTL = gsap.to(marqueeWrapper, {
  xPercent: -50,
  ease: 'none',
  duration: 20,
  repeat: -1,
});

marqueeWrapper.addEventListener('mouseenter', () => marqueeTL.pause());
marqueeWrapper.addEventListener('mouseleave', () => marqueeTL.play());

const secretCode = ["u", "d", "d", "a", "m"];
let inputBuffer = [];

window.addEventListener("keydown", (e) => {
  inputBuffer.push(e.key.toLowerCase());
  inputBuffer.splice(-secretCode.length - 1, inputBuffer.length - secretCode.length);
  if (inputBuffer.join("") === secretCode.join("")) {
    triggerHypeMode();
    inputBuffer = [];
  }
});

function triggerHypeMode() {
  const overlay = document.getElementById("hype-mode-overlay");
  overlay.style.display = "flex";
  document.body.classList.add("shake-screen");

  gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.1, yoyo: true, repeat: 3 });

  anime({
    targets: ".hype-text",
    translateX: function() { return anime.random(-30, 30); },
    translateY: function() { return anime.random(-20, 20); },
    opacity: [0, 1],
    duration: 200,
    delay: anime.stagger(80),
    easing: "easeOutExpo",
    complete: function() {
      anime({
        targets: ".hype-text",
        translateX: 0,
        translateY: 0,
        opacity: 1,
        duration: 300,
        easing: "easeOutQuad"
      });
    }
  });

  setTimeout(() => {
    gsap.to(overlay, {
      opacity: 0,
      duration: 0.6,
      ease: "power2.in",
      onComplete: () => {
        overlay.style.display = "none";
        document.body.classList.remove("shake-screen");
      }
    });
  }, 4000);
}

document.querySelectorAll(".input-group input").forEach((input) => {
  const line = input.parentElement.querySelector(".line-draw");

  input.addEventListener("focus", () => {
    anime({ targets: line, width: "100%", duration: 400, easing: "easeOutExpo" });
  });

  input.addEventListener("blur", () => {
    if (input.value === "") {
      anime({ targets: line, width: "0%", duration: 400, easing: "easeOutExpo" });
    }
  });
});

const squadForm = document.getElementById("squad-form");
const formSuccess = document.getElementById("form-success");

squadForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const tl = gsap.timeline();
  tl.to(squadForm, { opacity: 0, y: -20, duration: 0.5, ease: "power2.in" });
  tl.set(squadForm, { pointerEvents: "none" });
  tl.fromTo(formSuccess, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
});

ScrollTrigger.create({
  trigger: "#timeline-container",
  start: "top 60%",
  end: "bottom bottom",
  scrub: 1,
  onEnter: () => {
    gsap.to("#timeline-line", { scaleY: 1, ease: "none" });
  },
  onLeaveBack: () => {
    gsap.to("#timeline-line", { scaleY: 0, ease: "none" });
  }
});

gsap.utils.toArray(".timeline-node").forEach((node) => {
  ScrollTrigger.create({
    trigger: node,
    start: "top 80%",
    once: true,
    onEnter: () => {
      gsap.to(node, { opacity: 1, y: 0, duration: 1, ease: "power3.out" });
    }
  });
});
