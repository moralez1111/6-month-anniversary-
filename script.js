// ==========================================
// 1. ტაიმერი (15 თებერვლიდან დღემდე)
// ==========================================
const startDate = new Date(2026, 1, 15, 0, 0); 

function updateCounter() {
  const now = new Date();
  const diff = now - startDate;

  if (diff < 0) return;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  if (daysEl) daysEl.innerText = days;
  if (hoursEl) hoursEl.innerText = String(hours).padStart(2, '0');
  if (minutesEl) minutesEl.innerText = String(minutes).padStart(2, '0');
  if (secondsEl) secondsEl.innerText = String(seconds).padStart(2, '0');
}

setInterval(updateCounter, 1000);
updateCounter();

// ==========================================
// 2. ფონური მფრინავი გულები
// ==========================================
const bgHeartsContainer = document.getElementById('bgHearts');
const heartSymbols = ['❤️','💘', '💖', '💗', '💕', '✨', '🌸', '💜'];

function createAmbientHeart() {
  if (!bgHeartsContainer) return;
  const heart = document.createElement('div');
  heart.className = 'ambient-heart';
  heart.innerText = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.animationDuration = (Math.random() * 4 + 6) + 's';
  heart.style.fontSize = (Math.random() * 1 + 1) + 'rem';
  heart.style.pointerEvents = 'none';
  
  bgHeartsContainer.appendChild(heart);

  setTimeout(() => { heart.remove(); }, 10000);
}

setInterval(createAmbientHeart, 800);

// ==========================================
// 3. ეკრანზე დაჭერისას გულების ეფექტი
// ==========================================
window.addEventListener('click', (e) => {
  if (e.target.closest('#map') || e.target.closest('.leaflet-container')) return;

  for (let i = 0; i < 4; i++) {
    const heart = document.createElement('div');
    heart.className = 'click-heart';
    heart.innerText = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    heart.style.left = e.clientX + 'px';
    heart.style.top = e.clientY + 'px';
    heart.style.pointerEvents = 'none';
    
    const dx = (Math.random() - 0.5) * 80;
    heart.style.setProperty('--dx', `${dx}px`);

    document.body.appendChild(heart);

    setTimeout(() => { heart.remove(); }, 1200);
  }
});

// ==========================================
// 4. რუკა & კროსვორდის უჯრების ლოგიკა
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // --- რუკის ინიციალიზაცია ---
  const mapElement = document.getElementById('map');
  
  if (mapElement) {
    const map = L.map('map').setView([41.7400, 44.8100], 12);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap © CARTO'
    }).addTo(map);

    const purpleHeartIcon = L.divIcon({
      className: 'purple-heart-pin',
      html: '<div style="font-size: 2.2rem; filter: drop-shadow(0 3px 6px rgba(0,0,0,0.3)); cursor: pointer;">💜</div>',
      iconSize: [35, 35],
      iconAnchor: [17, 17],
      popupAnchor: [0, -15]
    });

    const marker1 = L.marker([41.787280, 44.742267], { icon: purpleHeartIcon }).addTo(map);
    marker1.bindPopup('<b>First Kiss💋 And First "I Love You"💗</b><br>Nikos Home');

    const marker2 = L.marker([41.692565, 44.869013], { icon: purpleHeartIcon }).addTo(map);
    marker2.bindPopup('<b>Our First Hug🫂</b><br>The Bench in Varketili');

    const marker3 = L.marker([41.705122, 44.848967], { icon: purpleHeartIcon }).addTo(map);
    marker3.bindPopup('<b>Eating Snow❄️, Getting To Know Each Other💫, And Your First "I Love You"💘</b><br>Vazisubani Park');

    const marker4 = L.marker([41.68913717600892, 44.89677776971187], { icon: purpleHeartIcon }).addTo(map);
    marker4.bindPopup('<b>Our First Ever Hangout👫</b><br>East Point');

    const marker5 = L.marker([41.718450643566676, 44.74203481510847], { icon: purpleHeartIcon }).addTo(map);
    marker5.bindPopup('<b>Our First Date⛸️🍟</b><br>We went ice skating and then to McDonalds');

    const marker6 = L.marker([41.690514823870025, 44.85884743962028], { icon: purpleHeartIcon }).addTo(map);
    marker6.bindPopup('<b>We Did a Lot of Stuff Here🏠💜</b><br>Our Home Date Spot');

    const marker7 = L.marker([41.6889590471452, 44.92456496946135], { icon: purpleHeartIcon }).addTo(map);
    marker7.bindPopup('<b>We Often Hangout Here🍟</b><br>McDonald');

    const group = new L.featureGroup([
      marker1, marker2, marker3, marker4, marker5, marker6, marker7
    ]);
    map.fitBounds(group.getBounds().pad(0.2));

    setTimeout(() => {
      map.invalidateSize();
    }, 200);
  }

  // --- კროსვორდის უჯრების ავტო-გადაყვანა & CAPITAL LETTERS ---
  const boxes = Array.from(document.querySelectorAll('.cw-box'));

  boxes.forEach((box, index) => {
    box.addEventListener('input', (e) => {
      e.target.value = e.target.value.toUpperCase();

      if (e.target.value.length === 1) {
        const nextBox = boxes[index + 1];
        if (nextBox) nextBox.focus();
      }
    });

    box.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !e.target.value && index > 0) {
        boxes[index - 1].focus();
      }
    });
  });
});

// ==========================================
// 5. საიდუმლო წერილის გახსნა (Lockbox)
// ==========================================
function unlockLetter() {
  const pinInput = document.getElementById('pinInput').value;
  const secretLetter = document.getElementById('secretLetter');
  const pinError = document.getElementById('pinError');

  if (pinInput === '1602') {
    secretLetter.style.display = 'block';
    pinError.style.display = 'none';
  } else {
    pinError.style.display = 'block';
  }
}

// ==========================================
// 6. კროსვორდის შემოწმება & ფხაჭნის ბარათი
// ==========================================
function checkCrossword() {
  const boxes = document.querySelectorAll('.cw-box');
  let allCorrect = true;

  boxes.forEach(box => {
    const correctLetter = box.getAttribute('data-letter').trim().toUpperCase();
    const userLetter = box.value.trim().toUpperCase();

    if (userLetter === correctLetter) {
      box.style.borderColor = '#2ecc71';
      box.style.backgroundColor = '#e8f8f0';
    } else {
      box.style.borderColor = '#e74c3c';
      box.style.backgroundColor = '#fdeaea';
      allCorrect = false;
    }
  });

  if (allCorrect) {
    const voucherContainer = document.getElementById('voucherContainer');
    voucherContainer.style.display = 'block';
    initScratchCard();
  }
}

function initScratchCard() {
  const canvas = document.getElementById('scratchCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // 💡 ტილოს შიდა რეზოლუციის დაყენება 380x180-ზე
  canvas.width = 380;
  canvas.height = 180;

  // ზედაპირის შეღებვა
  ctx.fillStyle = '#c8b6e2';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // ტექსტი ზედაპირზე
  ctx.fillStyle = '#6b4c9a';
  ctx.font = 'bold 16px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('✨ Scratch Here ✨', canvas.width / 2, canvas.height / 2 + 6);

  let isDrawing = false;

  function scratch(e) {
    if (!isDrawing) return;
    
    if (e.type.startsWith('touch')) {
      e.preventDefault();
    }

    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);

    // 💡 კოორდინატების სწორი მასშტაბირება მობილურისთვის და პატარა ეკრანებისთვის
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2); // გადაჩხაპნის რადიუსი
    ctx.fill();
  }

  canvas.addEventListener('mousedown', () => isDrawing = true);
  canvas.addEventListener('mouseup', () => isDrawing = false);
  canvas.addEventListener('mouseleave', () => isDrawing = false);
  canvas.addEventListener('mousemove', scratch);

  canvas.addEventListener('touchstart', (e) => { isDrawing = true; scratch(e); }, { passive: false });
  canvas.addEventListener('touchend', () => isDrawing = false);
  canvas.addEventListener('touchcancel', () => isDrawing = false);
  canvas.addEventListener('touchmove', scratch, { passive: false });
}
