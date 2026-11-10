/**
 * ЖҰЛДЫЗДЫ ТАҢДАУ — 20 Тұрақты (Констант) Жұлдыз Жеребесі
 * 16:9 Бір Экрандық, Ноутбукке арналған, Нөлдік лагпен жұмыс істейтін жүйе
 */

// 20 жұлдыздың әрқайсысына бекітілген ТҰРАҚТЫ (констант) бағыттар мен фотолар
// Ешқандай араластырусыз, әр жұлдыз өз орнында тұрақты сақталады!
const CONSTANT_STARS_DATA = [
  { id: 1,  title: 'Өркен TV',               image: 'images/orkentv.jpg' },
  { id: 2,  title: 'Шебер зертханасы',       image: 'images/sheber.jpg' },
  { id: 3,  title: 'Мен зерттеушімін',       image: 'images/zertteushi.jpg' },
  { id: 4,  title: 'Пайдалы таңғы ас',       image: 'images/tanggias.jpg' },
  { id: 5,  title: 'Қыш өнері',              image: 'images/kysh.jpg' },
  { id: 6,  title: 'Құм терапиясы',          image: 'images/kumterapiya.jpg' },
  { id: 7,  title: 'Мен инженермін',         image: 'images/inzhener.jpg' },
  { id: 8,  title: 'Кітап — білім бұлағы',   image: 'images/kitap.jpg' },
  { id: 9,  title: 'Мен дизайнермін',        image: 'images/designer.jpg' },
  { id: 10, title: 'Мен әнші/бишімін',       image: 'images/anshibishi.jpg' },
  { id: 11, title: 'Авиатур',                image: 'images/aviatur.jpg' },
  { id: 12, title: 'Мен зерттеушімін',       image: 'images/zertteushi.jpg' },
  { id: 13, title: 'Өркен TV',               image: 'images/orkentv.jpg' },
  { id: 14, title: 'Шебер зертханасы',       image: 'images/sheber.jpg' },
  { id: 15, title: 'Қыш өнері',              image: 'images/kysh.jpg' },
  { id: 16, title: 'Құм терапиясы',          image: 'images/kumterapiya.jpg' },
  { id: 17, title: 'Мен инженермін',         image: 'images/inzhener.jpg' },
  { id: 18, title: 'Кітап — білім бұлағы',   image: 'images/kitap.jpg' },
  { id: 19, title: 'Мен дизайнермін',        image: 'images/designer.jpg' },
  { id: 20, title: 'Пайдалы таңғы ас',       image: 'images/tanggias.jpg' }
];

// Қосымшаның ағымдағы күйі
const state = {
  stars: [],
  pickedResults: [],
  currentActiveStar: null,
  soundEnabled: true
};

// ==========================================================================
// ЖЕҢІЛДЕТІЛГЕН СИНТЕЗАТОР ДЫБЫСТАРЫ (Лагсыз Web Audio)
// ==========================================================================
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playHoverSound() {
  if (!state.soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800 + Math.random() * 200, ctx.currentTime);
    gain.gain.setValueAtTime(0.03, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.12);
  } catch (e) {}
}

function playRevealSound() {
  if (!state.soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.07);
      gain.gain.setValueAtTime(0.12, ctx.currentTime + idx * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.07 + 0.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.07);
      osc.stop(ctx.currentTime + idx * 0.07 + 0.52);
    });
  } catch (e) {}
}

function playVanishSound() {
  if (!state.soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(580, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.4);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.42);
  } catch (e) {}
}

// ==========================================================================
// ЖҰЛДЫЗ SVG ГРАФИКАСЫ
// ==========================================================================
function getStarSvg() {
  return `
    <svg class="star-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="starRadialGlow" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stop-color="#ffffff" />
          <stop offset="30%" stop-color="#fff176" />
          <stop offset="70%" stop-color="#ffd600" />
          <stop offset="100%" stop-color="#ff8f00" />
        </radialGradient>
      </defs>
      <polygon 
        points="50,5 64,36 98,38 72,60 80,95 50,76 20,95 28,60 2,38 36,36" 
        fill="url(#starRadialGlow)"
        stroke="#ffffff"
        stroke-width="2.2"
      />
      <circle cx="50" cy="52" r="19" fill="#ffffff" opacity="0.9" />
    </svg>
  `;
}

// ==========================================================================
// БАСТАУ ЖӘНЕ ТҰРАҚТЫ 20 ЖҰЛДЫЗДЫ ШЫҒАРУ
// ==========================================================================
function initApp() {
  // Тұрақты деректер негізінде жұлдыздар күйін жасау
  state.stars = CONSTANT_STARS_DATA.map(item => ({
    id: item.id,
    number: item.id,
    title: item.title,
    image: item.image,
    isPicked: false
  }));

  state.pickedResults = [];
  renderStars();
  updateCounters();
  updateResultsTable();
}

function renderStars() {
  const grid = document.getElementById('stars-grid');
  grid.innerHTML = '';

  state.stars.forEach(star => {
    const cell = document.createElement('div');
    cell.className = `star-cell ${star.isPicked ? 'empty-slot' : ''}`;
    cell.id = `star-cell-${star.id}`;

    cell.innerHTML = `
      <div class="star-svg-box">
        ${getStarSvg()}
        <span class="star-number">${star.number}</span>
      </div>
    `;

    cell.addEventListener('mouseenter', () => {
      if (!star.isPicked) playHoverSound();
    });

    cell.addEventListener('click', () => {
      if (!star.isPicked) openStarModal(star);
    });

    grid.appendChild(cell);
  });
}

// ==========================================================================
// ЖҰЛДЫЗДЫ АШУ (Zoom Reveal)
// ==========================================================================
const revealModal = document.getElementById('reveal-modal');
const modalStarNumber = document.getElementById('modal-star-number');
const modalPhoto = document.getElementById('modal-photo');
const btnBack = document.getElementById('btn-back');

function openStarModal(star) {
  state.currentActiveStar = star;
  getAudioContext();
  playRevealSound();

  modalStarNumber.textContent = `⭐ Жұлдыз №${star.number}`;
  modalPhoto.src = star.image;

  revealModal.classList.add('open');
}

// «АРТҚА» БАТЫРМАСЫ ЖӘНЕ ЖҰЛДЫЗДЫ ЖОЮ
btnBack.addEventListener('click', () => {
  if (!state.currentActiveStar) return;
  const star = state.currentActiveStar;

  // Модальді жабу
  revealModal.classList.remove('open');
  playVanishSound();

  // Экрандағы жұлдызды өз орнында анимациямен өшіру (рефлоусыз)
  const cell = document.getElementById(`star-cell-${star.id}`);
  if (cell) {
    cell.classList.add('picked');
    setTimeout(() => {
      cell.classList.add('empty-slot');
    }, 600);
  }

  star.isPicked = true;
  state.pickedResults.push({
    order: state.pickedResults.length + 1,
    starNumber: star.number,
    title: star.title,
    image: star.image
  });

  updateCounters();
  updateResultsTable();
  state.currentActiveStar = null;

  // Егер барлық 20 жұлдыз таңдалса
  const remaining = state.stars.filter(s => !s.isPicked).length;
  if (remaining === 0) {
    setTimeout(() => {
      alert('🎉 Барлық 20 жұлдыз таңдалды! Жеребе сәтті аяқталды.');
      openResults();
    }, 700);
  }
});

function updateCounters() {
  const remaining = state.stars.filter(s => !s.isPicked).length;
  document.getElementById('remaining-count').textContent = remaining;
  document.getElementById('results-count').textContent = state.pickedResults.length;

  const nextPerson = state.pickedResults.length + 1;
  const indicator = document.getElementById('turn-indicator');
  if (remaining > 0) {
    indicator.textContent = `${nextPerson}-ші әдіскер, қалаған жұлдызыңызды таңдаңыз! ✨`;
  } else {
    indicator.textContent = `Жеребе аяқталды! 🌟 Барлық әдіскерлер бағытын анықтады.`;
  }
}

// ==========================================================================
// НӘТИЖЕЛЕР ТАҚТАСЫ
// ==========================================================================
const resultsModal = document.getElementById('results-modal');
const btnResults = document.getElementById('btn-results');
const closeResultsBtn = document.getElementById('close-results-btn');
const resultsOverlay = document.getElementById('results-overlay');

btnResults.addEventListener('click', openResults);
closeResultsBtn.addEventListener('click', closeResults);
resultsOverlay.addEventListener('click', closeResults);

function openResults() {
  updateResultsTable();
  resultsModal.classList.add('open');
}

function closeResults() {
  resultsModal.classList.remove('open');
}

function updateResultsTable() {
  const tbody = document.getElementById('results-tbody');
  tbody.innerHTML = '';

  if (state.pickedResults.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; padding: 18px; color: #8fa0c7;">Әзірге ешбір жұлдыз ашылмады.</td></tr>`;
    return;
  }

  state.pickedResults.forEach(res => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${res.order}</strong></td>
      <td><span style="color:#ffd600; font-weight:800;">⭐ №${res.starNumber}</span></td>
      <td><strong>${res.title}</strong></td>
      <td><img src="${res.image}" class="table-img" alt="${res.title}"></td>
    `;
    tbody.appendChild(tr);
  });
}

// Көшіріп алу
document.getElementById('btn-copy-results').addEventListener('click', () => {
  if (state.pickedResults.length === 0) return;
  let text = '🌟 ӘДІСКЕРЛЕР ЖЕРЕБЕСІНІҢ ҚОРЫТЫНДЫСЫ:\n\n';
  state.pickedResults.forEach(res => {
    text += `${res.order}. ⭐ №${res.starNumber} ➡ ${res.title}\n`;
  });
  navigator.clipboard.writeText(text).then(() => {
    alert('📋 Нәтижелер буферге сәтті көшірілді!');
  }).catch(() => {
    prompt('Нәтижелер:', text);
  });
});

// Қайта бастау
document.getElementById('btn-reset').addEventListener('click', () => {
  if (confirm('Шынымен де барлық 20 жұлдызды қайтарып, басынан бастағыңыз келе ме?')) {
    initApp();
  }
});

// Дыбыс қосу/өшіру
const btnSound = document.getElementById('btn-sound-toggle');
const soundIcon = document.getElementById('sound-icon');
btnSound.addEventListener('click', () => {
  state.soundEnabled = !state.soundEnabled;
  soundIcon.textContent = state.soundEnabled ? '🔊' : '🔇';
  if (state.soundEnabled) {
    getAudioContext();
    playHoverSound();
  }
});

// Іске қосу
window.addEventListener('DOMContentLoaded', () => {
  initApp();
});
