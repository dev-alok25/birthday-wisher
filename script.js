/**
 * Happy Birthday Didi - 12th November
 * Developer Chhota Bhai Alok Edition & Sibling Teasing Matrix
 */

// ================= Background Birthday Music Controller =================
class BirthdayAudioController {
  constructor() {
    this.audio = new Audio('media/Birthday Song.mp3');
    this.audio.loop = true;
    this.audio.volume = 0.85;
    this.isPlaying = false;
    this.autoPauseTimer = null;
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  play() {
    stopDoraemonSong();
    this.clearAutoPauseTimer();
    this.audio.play().then(() => {
      this.isPlaying = true;
      this.updateUI(true);

      // Automatically pause happy birthday song after 20 seconds
      this.autoPauseTimer = setTimeout(() => {
        if (this.isPlaying) {
          this.pause();
          console.log('Happy birthday song automatically paused after 20 seconds');
        }
      }, 20000);
    }).catch(err => {
      console.log('Autoplay interaction needed:', err);
    });
  }

  pause() {
    this.clearAutoPauseTimer();
    this.audio.pause();
    this.isPlaying = false;
    this.updateUI(false);
  }

  clearAutoPauseTimer() {
    if (this.autoPauseTimer) {
      clearTimeout(this.autoPauseTimer);
      this.autoPauseTimer = null;
    }
  }

  updateUI(playing) {
    const musicBtn = document.getElementById('btn-music');
    const playIcon = document.getElementById('musicPlayIcon');
    const playText = document.getElementById('musicPlayText');
    const pill = document.getElementById('musicStatusPill');

    if (playing) {
      if (musicBtn) musicBtn.classList.add('playing');
      if (playIcon) playIcon.textContent = '⏸️';
      if (playText) playText.textContent = 'Pause Music';
      if (pill) pill.classList.add('playing');
    } else {
      if (musicBtn) musicBtn.classList.remove('playing');
      if (playIcon) playIcon.textContent = '🎵';
      if (playText) playText.textContent = 'Play Birthday Song';
      if (pill) pill.classList.remove('playing');
    }
  }
}

const bdayMusic = new BirthdayAudioController();

// ================= Doraemon Theme Song Global Manager =================
let doraThemeAudio = null;

function playDoraemonSong() {
  stopDoraemonSong();
  try {
    doraThemeAudio = new Audio('media/Zindagi Sawar Do Ek Nahi Bahar Do - Doraemon.mp3');
    doraThemeAudio.volume = 0.85;
    doraThemeAudio.play().catch(() => {});
  } catch (e) {}
}

function stopDoraemonSong() {
  if (doraThemeAudio) {
    try {
      doraThemeAudio.pause();
      doraThemeAudio.currentTime = 0;
    } catch (e) {}
    doraThemeAudio = null;
  }
}

// ================= Sibling Teasing & Unexpected Audio Matrix =================
let activeTeaseAudio = null;

function stopCurrentTeaseAudio() {
  if (activeTeaseAudio) {
    try {
      activeTeaseAudio.pause();
      activeTeaseAudio.currentTime = 0;
    } catch (e) {}
    activeTeaseAudio = null;
  }
}

function playTeaseTrack(filePath, volume = 0.9) {
  stopDoraemonSong(); // Stop Doraemon song immediately when any other audio plays
  stopCurrentTeaseAudio();
  activeTeaseAudio = new Audio(filePath);
  activeTeaseAudio.volume = volume;
  activeTeaseAudio.play().catch(e => console.log('Audio playback:', e));
  return activeTeaseAudio;
}

// Master Tease Handler for Unexpected Audio & Dialogs
function triggerTease(type) {
  const dialog = document.getElementById('teaseDialog');
  const icon = document.getElementById('tdIcon');
  const title = document.getElementById('tdTitle');
  const msg = document.getElementById('tdMsg');

  switch (type) {
    // ------------------------------------------------------------------
    // TRAP 1: Claim Brother's Cash Gift ₹50,000 -> Khatam! Tata! Goodbye!
    // ------------------------------------------------------------------
    case 'cash': {
      playTeaseTrack('media/khatam goodbye.mp3', 0.95);
      icon.textContent = '💸';
      title.textContent = 'Aaye Haaye! 50 Hazaar Lene Aayi Thi Didi? 😂';
      msg.textContent = 'Khatam! Tata! Bye-Bye! Gaya! Paisa khatam! Chhote bhai ka bank account empty ho gaya! Only unlimited brotherly love & blessings available for Didi! 😜';
      shakeScreen();
      break;
    }

    // ------------------------------------------------------------------
    // TRAP 2: Forbidden Dev Button -> Uthale Re Deva!
    // ------------------------------------------------------------------
    case 'deva': {
      playTeaseTrack('media/Uthale re deva uthale re baba.mp3', 0.95);
      icon.textContent = '🤦‍♂️';
      title.textContent = 'Mana Kiya Tha Na Didi Mat Dabao?! 😂';
      msg.textContent = "Babu Bhaiya reaction: 'Uthale re deva uthale re baba, mereko nahi re, isko uthale!' Curiously clicking forbidden buttons will alert the whole family! Happy Birthday Didi! 🚨";
      shakeScreen();
      break;
    }

    // ------------------------------------------------------------------
    // TRAP 3: Sister Beauty Compliment -> Just Looking Like a WOW!
    // ------------------------------------------------------------------
    case 'wow': {
      playTeaseTrack('media/Voicy_So Beatiful just looking like a woow.mp3', 0.95);
      icon.textContent = '🌟';
      title.textContent = 'So Beautiful, So Elegant... Just Looking Like a WOW! ✨';
      msg.textContent = 'The ONLY day of the entire year your developer chhota bhai will officially admit this in writing! Take a screenshot right now before the system reboots! 📸💖';
      if (particleSystem) {
        particleSystem.createConfettiBurst(window.innerWidth / 2, window.innerHeight / 2, 80);
      }
      break;
    }

    // ------------------------------------------------------------------
    // TRAP 4: Apology Request -> G Galti Ho Gayi + I Am Joking!
    // ------------------------------------------------------------------
    case 'galti': {
      playTeaseTrack('media/G ghalti hogai.mp3', 0.95);
      setTimeout(() => {
        playTeaseTrack('media/I am joking.mp3', 0.95);
      }, 1600);
      icon.textContent = '🥺';
      title.textContent = 'G Galti Ho Gayi Didi...';
      msg.textContent = 'G ghalti ho gayi... I AM JOKING! Developer brother is always right! Sibling rules say chhota bhai is a genius! 😜';
      break;
    }

    // ------------------------------------------------------------------
    // TRAP 5: Snack Peace Treaty -> I Am Joking!
    // ------------------------------------------------------------------
    case 'snack': {
      playTeaseTrack('media/I am joking.mp3', 0.95);
      icon.textContent = '🍕';
      title.textContent = 'Snack Treaty Rejected by Developer! 😂';
      msg.textContent = 'I AM JOKING! All Maggi, ice-cream, chocolates, and pastries in the fridge by default belong to the developer chhota bhai! Sibling tax applicable for life! 🍫😋';
      break;
    }

    // ------------------------------------------------------------------
    // TRAP 6: Brother Smart IQ Verified -> Gotilo Victory Song!
    // ------------------------------------------------------------------
    case 'brother_smart': {
      playTeaseTrack('media/Gotilo song.mp3', 0.9);
      icon.textContent = '🏆';
      title.textContent = 'System Verified: Chhota Bhai is 200% Smarter! 🎓';
      msg.textContent = 'Honest answer recorded in the database! Chhota bhai IQ level: Genius! Victory dance party mode activated! Kudos for admitting the truth, Didi! 💃🕺';
      launchFireworksShow();
      break;
    }
  }

  dialog.classList.remove('hidden');
}

function closeTeaseDialog() {
  const dialog = document.getElementById('teaseDialog');
  dialog.classList.add('hidden');
  stopCurrentTeaseAudio();
}

// Shake screen effect for hilarious feedback
function shakeScreen() {
  document.body.style.animation = 'screenShake 0.4s ease-in-out';
  setTimeout(() => {
    document.body.style.animation = '';
  }, 450);
}

// Runaway Button: Didi option escapes when hovered/clicked/touched
function runawayButton(btn) {
  if (!btn) return;
  const isMobile = window.innerWidth < 680;
  const spreadX = isMobile ? 80 : 160;
  const spreadY = isMobile ? 45 : 100;
  const randomX = (Math.random() - 0.5) * spreadX;
  const randomY = (Math.random() - 0.5) * spreadY;
  btn.style.transform = `translate(${randomX}px, ${randomY}px)`;

  const hints = [
    "Oops, too slow Didi! 😂",
    "Can't click it, Didi! 😜",
    "The button is dodging you! 🏃‍♀️",
    "Accept it: Chhota bhai is smarter! 👨‍💻",
    "Nice try Didi! Still impossible! 🚀"
  ];
  const hintEl = document.getElementById('runawayHint');
  if (hintEl) {
    hintEl.textContent = hints[Math.floor(Math.random() * hints.length)];
  }
}

// ================= 12th November Security Vault & Lock Screen =================
let vaultCountdownInterval = null;

function initVaultLock() {
  const vault = document.getElementById('birthdayVaultLock');
  if (!vault) return;

  const isUnlocked = sessionStorage.getItem('didi_vault_unlocked') === 'true';
  const now = new Date();
  const currentYear = now.getFullYear();

  // 12th November 00:00:00 Midnight IST
  const unlockDate = new Date(currentYear, 10, 12, 0, 0, 0);

  if (isUnlocked || now >= unlockDate) {
    vault.style.display = 'none';
    return;
  }

  // Vault is ACTIVE
  vault.style.display = 'flex';

  function updateVaultCountdown() {
    const currentTime = new Date();
    const remaining = unlockDate.getTime() - currentTime.getTime();

    if (remaining <= 0) {
      clearInterval(vaultCountdownInterval);
      unlockVault(true);
      return;
    }

    const totalSeconds = Math.floor(remaining / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = Math.floor(totalSeconds % 60);

    const dEl = document.getElementById('vDays');
    const hEl = document.getElementById('vHours');
    const mEl = document.getElementById('vMins');
    const sEl = document.getElementById('vSecs');

    if (dEl) dEl.textContent = String(days).padStart(2, '0');
    if (hEl) hEl.textContent = String(hours).padStart(2, '0');
    if (mEl) mEl.textContent = String(mins).padStart(2, '0');
    if (sEl) sEl.textContent = String(secs).padStart(2, '0');
  }

  updateVaultCountdown();
  vaultCountdownInterval = setInterval(updateVaultCountdown, 1000);
}

function unlockVault(isAuto = false) {
  const vault = document.getElementById('birthdayVaultLock');
  if (!vault) return;

  sessionStorage.setItem('didi_vault_unlocked', 'true');
  vault.classList.add('unlocked');

  // Play celebration sounds & fireworks
  try {
    const fwSound = new Audio('media/firework sound.mp3');
    fwSound.volume = 0.85;
    fwSound.play().catch(() => {});
  } catch (e) {}

  if (particleSystem) {
    particleSystem.createConfettiBurst(window.innerWidth / 2, window.innerHeight / 2, 140);
    launchFireworksShow();
  }

  setTimeout(() => {
    vault.style.display = 'none';
  }, 800);
}

function trySneakPeek() {
  playTeaseTrack('media/khatam goodbye.mp3', 0.95);

  if (particleSystem) {
    particleSystem.createConfettiBurst(window.innerWidth / 2, window.innerHeight * 0.4, 30);
  }

  alert("🚫 SNEAK PEEK FAILED! 😂\n\nKhatam! Tata! Goodbye! Gaya!\n\nNice try Didi, but Doraemon's 4D Security Lock is active until 12:00 AM Midnight on 12th November!\nPlease wait for your big birthday surprise! 🎂🎁");
}

function openPasscodePrompt() {
  const area = document.getElementById('passcodeArea');
  if (!area) return;
  area.classList.toggle('hidden');
  const input = document.getElementById('passcodeInput');
  if (!area.classList.contains('hidden') && input) {
    input.focus();
  }
}

function checkPasskey(event) {
  if (event.key === 'Enter') {
    submitPasscode();
  }
}

function submitPasscode() {
  const input = document.getElementById('passcodeInput');
  const errorEl = document.getElementById('passcodeError');
  if (!input) return;
  const val = input.value.trim().toLowerCase();

  const validKeys = ['12nov', '12thnov', 'didi', 'sister', 'brother', 'alok', 'secret'];

  if (validKeys.includes(val)) {
    if (errorEl) errorEl.textContent = '';
    unlockVault(false);
  } else {
    if (errorEl) errorEl.textContent = '❌ Incorrect code! Only brother Alok has the master key! 😜';
    playTeaseTrack('media/I am joking.mp3', 0.95);
  }
}

// ================= Developer Brother Feedback System =================
let selectedRatingText = '⭐⭐⭐⭐⭐ 10/10 Best Chhota Bhai in the Universe! 🥹💖';

function initFeedbackSystem() {
  const reactionCards = document.querySelectorAll('.reaction-card');
  reactionCards.forEach(card => {
    card.addEventListener('click', () => {
      reactionCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      selectedRatingText = card.getAttribute('data-rating') || '';
    });
  });
}

function addFeedbackTag(text) {
  const textarea = document.getElementById('fbMessage');
  if (!textarea) return;
  if (textarea.value.trim().length > 0) {
    textarea.value += ' ' + text;
  } else {
    textarea.value = text;
  }
  textarea.focus();
}

function copyBrotherEmail(btn) {
  const email = 'yadavalok7114@gmail.com';
  navigator.clipboard.writeText(email).then(() => {
    if (btn) {
      const originalText = btn.innerHTML;
      btn.innerHTML = '✅ Copied!';
      btn.style.background = '#2e7d32';
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
      }, 2000);
    }
  }).catch(() => {
    prompt('Copy brother email:', email);
  });
}

function sendFeedbackEmail(e) {
  e.preventDefault();
  const senderName = document.getElementById('fbSenderName')?.value || 'Didi';
  const message = document.getElementById('fbMessage')?.value || '';
  const brotherEmail = 'yadavalok7114@gmail.com';

  const subject = encodeURIComponent(`🎂 Birthday Surprise Feedback from ${senderName}! 🎉`);
  const bodyText = `Hi Alok (Chhote)! 👋\n\nHere is my feedback for the Birthday Website:\n\n⭐ My Reaction: ${selectedRatingText}\n\n💌 My Message:\n${message}\n\n---\nSent with love from Didi 🎂✨`;
  const mailtoUrl = `mailto:${brotherEmail}?subject=${subject}&body=${encodeURIComponent(bodyText)}`;

  // Trigger celebration confetti burst
  if (particleSystem) {
    particleSystem.createConfettiBurst(window.innerWidth / 2, window.innerHeight * 0.6, 60);
  }

  // Open user's email client
  window.open(mailtoUrl, '_blank');

  // Show celebratory confirmation notice
  const notice = document.getElementById('fbSuccessNotice');
  if (notice) {
    notice.classList.remove('hidden');
  }
}

function dismissFeedbackNotice() {
  const notice = document.getElementById('fbSuccessNotice');
  if (notice) {
    notice.classList.add('hidden');
  }
}

// ================= Confetti & Fireworks Canvas Engine =================
class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  // Create burst of celebratory confetti
  createConfettiBurst(x, y, count = 70) {
    const colors = ['#ff4081', '#0288d1', '#f39c12', '#2ecc71', '#9b59b6', '#ffeb3b', '#e91e63'];
    const shapes = ['circle', 'rect', 'star'];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 9 + 4;
      this.particles.push({
        x: x || window.innerWidth / 2,
        y: y || window.innerHeight / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        size: Math.random() * 8 + 6,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 12,
        alpha: 1,
        life: 1,
        decay: Math.random() * 0.012 + 0.008,
        gravity: 0.16
      });
    }
  }

  // Launch rocket firework
  launchRocket() {
    const startX = Math.random() * (this.canvas.width * 0.8) + this.canvas.width * 0.1;
    const targetY = Math.random() * (this.canvas.height * 0.45) + 60;
    const colors = ['#ff0055', '#00d2ff', '#ffea00', '#00ff88', '#ff7700', '#bf55ec'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    let currentY = this.canvas.height;
    const rocketInterval = setInterval(() => {
      currentY -= 18;
      this.particles.push({
        x: startX + (Math.random() - 0.5) * 4,
        y: currentY,
        vx: (Math.random() - 0.5) * 1,
        vy: 2,
        color: '#fffae6',
        shape: 'circle',
        size: 3,
        rotation: 0,
        rotSpeed: 0,
        alpha: 0.8,
        life: 1,
        decay: 0.08,
        gravity: 0.05
      });

      if (currentY <= targetY) {
        clearInterval(rocketInterval);
        this.createFireworkExplosion(startX, targetY, color);
      }
    }, 16);
  }

  createFireworkExplosion(x, y, color) {
    const count = 90;
    try {
      const fw = new Audio('media/firework sound.mp3');
      fw.volume = 0.45;
      fw.play().catch(() => {});
    } catch (e) {}

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 / count) * i + (Math.random() * 0.2);
      const speed = Math.random() * 6 + 2;
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: color,
        shape: 'circle',
        size: Math.random() * 4 + 2,
        rotation: 0,
        rotSpeed: 0,
        alpha: 1,
        life: 1,
        decay: Math.random() * 0.015 + 0.012,
        gravity: 0.07
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.rotation += p.rotSpeed;
      p.life -= p.decay;

      if (p.life <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = p.life;
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.fillStyle = p.color;

      if (p.shape === 'circle') {
        this.ctx.beginPath();
        this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        this.ctx.fill();
      } else if (p.shape === 'rect') {
        this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      } else if (p.shape === 'star') {
        this.drawStar(0, 0, 5, p.size, p.size / 2);
      }
      this.ctx.restore();
    }

    requestAnimationFrame(this.animate);
  }

  drawStar(cx, cy, spikes, outerRadius, innerRadius) {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / spikes;

    this.ctx.beginPath();
    this.ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      this.ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      this.ctx.lineTo(x, y);
      rot += step;
    }
    this.ctx.lineTo(cx, cy - outerRadius);
    this.ctx.closePath();
    this.ctx.fill();
  }
}

let particleSystem;

// ================= DOM Ready Initializer =================
window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('fireworks-canvas');
  particleSystem = new ParticleSystem(canvas);

  // Setup ambient balloon generator
  initAmbientBalloons();

  // Setup 12th November Birthday Countdown Timer
  initBirthdayCountdown();

  // Setup 12th November Security Vault Lock
  initVaultLock();

  // Setup Feedback System
  initFeedbackSystem();

  // Auto-start 20s Birthday Music preview on first user touch / click
  let hasAutoStarted = false;
  const startOnFirstGesture = () => {
    if (!hasAutoStarted && !bdayMusic.isPlaying) {
      hasAutoStarted = true;
      bdayMusic.play();
    }
  };
  document.addEventListener('click', startOnFirstGesture, { once: true });
  document.addEventListener('touchstart', startOnFirstGesture, { once: true });

  // Setup Samosa Arena Interactivity
  initArenaControls();

  // Setup Music Toggle (Plays only media/Birthday Song.mp3)
  const musicBtn = document.getElementById('btn-music');
  if (musicBtn) {
    musicBtn.addEventListener('click', () => {
      const isPlaying = bdayMusic.toggle();
      if (isPlaying && particleSystem) {
        particleSystem.createConfettiBurst(window.innerWidth / 2, 80, 45);
      }
    });
  }

  // Setup Fireworks button
  const fwBtn = document.getElementById('btn-fireworks');
  if (fwBtn) {
    fwBtn.addEventListener('click', () => {
      launchFireworksShow();
    });
  }

  // Welcome explosion after 800ms
  setTimeout(() => {
    if (particleSystem) {
      particleSystem.createConfettiBurst(window.innerWidth / 2, window.innerHeight / 3, 100);
    }
  }, 800);
});

// ================= 12th November Live Birthday Countdown =================
function initBirthdayCountdown() {
  function updateCountdown() {
    const now = new Date();
    const currentYear = now.getFullYear();

    // 12th November of current year (Month index 10 is November)
    let target = new Date(currentYear, 10, 12, 0, 0, 0);
    let endOfBday = new Date(currentYear, 10, 12, 23, 59, 59);

    const statusEl = document.getElementById('countdownStatus');
    const daysEl = document.getElementById('timeDays');
    const hoursEl = document.getElementById('timeHours');
    const minsEl = document.getElementById('timeMins');
    const secsEl = document.getElementById('timeSecs');

    if (!statusEl || !daysEl || !hoursEl || !minsEl || !secsEl) return;

    const diff = target.getTime() - now.getTime();

    if (now >= target && now <= endOfBday) {
      statusEl.textContent = "🎉 TODAY IS DIDI'S BIRTHDAY! HAPPY BIRTHDAY! 🎂💖";
      daysEl.textContent = "00";
      hoursEl.textContent = "PARTY";
      hoursEl.style.fontSize = "1.05rem";
      minsEl.textContent = "TIME";
      minsEl.style.fontSize = "1.05rem";
      secsEl.textContent = "✨";
    } else if (diff > 0) {
      statusEl.textContent = "Counting down to Didi's 12th November Celebration! 🎈";
      const totalSecs = Math.floor(diff / 1000);
      const days = Math.floor(totalSecs / (3600 * 24));
      const hours = Math.floor((totalSecs % (3600 * 24)) / 3600);
      const mins = Math.floor((totalSecs % 3600) / 60);
      const secs = Math.floor(totalSecs % 60);

      daysEl.textContent = String(days).padStart(2, '0');
      hoursEl.textContent = String(hours).padStart(2, '0');
      minsEl.textContent = String(mins).padStart(2, '0');
      secsEl.textContent = String(secs).padStart(2, '0');
      hoursEl.style.fontSize = "";
      minsEl.style.fontSize = "";
    } else {
      statusEl.textContent = "🌟 Celebrating Didi's Birthday! Wishing Endless Joy! 🌟";
      daysEl.textContent = "365";
      hoursEl.textContent = "DAYS";
      hoursEl.style.fontSize = "0.9rem";
      minsEl.textContent = "OF";
      minsEl.style.fontSize = "0.9rem";
      secsEl.textContent = "JOY";
      secsEl.style.fontSize = "0.9rem";
    }
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// Arena pointer move for interactive catching
function initArenaControls() {
  const arena = document.getElementById('gameArena');
  const motuCatcher = document.getElementById('catcherMotu');
  if (!arena || !motuCatcher) return;

  const moveHandler = (clientX) => {
    const rect = arena.getBoundingClientRect();
    const relX = clientX - rect.left;
    const clampedX = Math.max(30, Math.min(arena.clientWidth - 30, relX));
    motuCatcher.style.left = `${clampedX}px`;
  };

  arena.addEventListener('pointermove', (e) => {
    moveHandler(e.clientX);
  });

  arena.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) {
      moveHandler(e.touches[0].clientX);
    }
  }, { passive: true });
}

// Grand fireworks show
function launchFireworksShow() {
  try {
    const fw = new Audio('media/firework sound.mp3');
    fw.volume = 0.8;
    fw.play().catch(() => {});
  } catch (e) {}

  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      if (particleSystem) particleSystem.launchRocket();
    }, i * 450);
  }
}

// ================= Ambient Floating Balloons =================
function initAmbientBalloons() {
  const container = document.getElementById('balloon-container');
  if (!container) return;
  const balloonEmojis = ['🎈', '💖', '🎂', '⭐', '✨', '🎁', '🎉'];

  function spawnBalloon() {
    const balloon = document.createElement('div');
    balloon.className = 'ambient-balloon';
    balloon.textContent = balloonEmojis[Math.floor(Math.random() * balloonEmojis.length)];
    balloon.style.left = `${Math.random() * 92}vw`;
    balloon.style.fontSize = `${Math.random() * 22 + 28}px`;
    balloon.style.animationDuration = `${Math.random() * 6 + 10}s`;

    // Click to pop with real balloon burst audio
    balloon.addEventListener('click', (e) => {
      const rect = balloon.getBoundingClientRect();
      if (particleSystem) {
        particleSystem.createConfettiBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 25);
      }
      try {
        const popAudio = new Audio('media/Rapid burst ofa balloon sound.mp3');
        popAudio.volume = 0.8;
        popAudio.play().catch(() => {});
      } catch (err) {}
      balloon.remove();
    });

    container.appendChild(balloon);

    setTimeout(() => {
      if (balloon.parentNode) balloon.remove();
    }, 16000);
  }

  setInterval(spawnBalloon, 2200);
  for (let i = 0; i < 4; i++) {
    setTimeout(spawnBalloon, i * 400);
  }
}

// ================= Birthday Cake & Candles =================
let candlesBlown = false;

function blowCandles() {
  stopDoraemonSong(); // Stop Doraemon theme when moving to candle blowing
  if (candlesBlown) {
    document.querySelectorAll('.flame').forEach(f => f.classList.remove('blown-out'));
    document.getElementById('wish-message').style.display = 'none';
    document.getElementById('btn-blow-candles').textContent = '💨 Blow the Candles & Make a Wish!';
    candlesBlown = false;
    return;
  }

  const flames = document.querySelectorAll('.flame');
  flames.forEach(f => {
    f.classList.add('blown-out');

    const smoke = document.createElement('div');
    smoke.className = 'smoke-puff';
    f.parentElement.appendChild(smoke);
    setTimeout(() => smoke.remove(), 1200);
  });

  try {
    const fw = new Audio('media/firework sound.mp3');
    fw.volume = 0.85;
    fw.play().catch(() => {});
  } catch (e) {}

  if (particleSystem) {
    particleSystem.createConfettiBurst(window.innerWidth / 2, window.innerHeight * 0.45, 120);
  }
  launchFireworksShow();

  const wishMsg = document.getElementById('wish-message');
  wishMsg.style.display = 'block';

  document.getElementById('btn-blow-candles').textContent = '🔥 Relight Candles for Another Wish!';
  candlesBlown = true;
}

// ================= Doraemon Anywhere Door =================
function openAnywhereDoor() {
  stopCurrentTeaseAudio();
  const modal = document.getElementById('anywhereDoorModal');
  modal.classList.remove('hidden');
  setTimeout(() => {
    toggleDoorOpen();
  }, 400);
}

function closeAnywhereDoor() {
  const modal = document.getElementById('anywhereDoorModal');
  const door = document.getElementById('pinkDoor');
  door.classList.remove('door-open');
  modal.classList.add('hidden');
  stopDoraemonSong(); // Stop Doraemon song immediately when door is closed or moving away
}

function toggleDoorOpen() {
  const door = document.getElementById('pinkDoor');
  door.classList.toggle('door-open');
  if (door.classList.contains('door-open')) {
    playDoraemonSong();
    if (particleSystem) {
      particleSystem.createConfettiBurst(window.innerWidth / 2, window.innerHeight / 2, 80);
    }
  } else {
    stopDoraemonSong(); // Stop immediately if toggled shut
  }
}

function celebrateFromDoor() {
  stopDoraemonSong(); // Stop song when moving forward with Celebrate button
  closeAnywhereDoor();
  launchFireworksShow();
  if (particleSystem) {
    particleSystem.createConfettiBurst(window.innerWidth / 2, window.innerHeight / 2, 120);
  }
}

// ================= Mystery Gift Box =================
let giftOpened = false;

function openGiftBox() {
  stopDoraemonSong(); // Stop Doraemon song when moving forward with Gift Box
  const box = document.getElementById('giftBox');
  const letter = document.getElementById('surpriseLetter');

  if (!giftOpened) {
    box.classList.add('gift-opened');
    letter.classList.remove('hidden');

    try {
      const fw = new Audio('media/firework sound.mp3');
      fw.volume = 0.85;
      fw.play().catch(() => {});
    } catch (e) {}

    if (particleSystem) {
      particleSystem.createConfettiBurst(window.innerWidth / 2, window.innerHeight * 0.65, 90);
    }
    giftOpened = true;
  } else {
    letter.scrollIntoView({ behavior: 'smooth' });
  }
}

// ================= Character Interaction Buttons =================
const motuQuotes = [
  "Crunch, crunch, yum! 🥟 Garam samosa kha ke Motu ka dimaag chalu ho gaya! Happy Birthday Didi! 🎉",
  "Didi, aap jiyo hazaro saal! Aur har saal mujhe party me aise hi crunchy samosay khilao! 🥳",
  "Khaike samosa, Motu ka dil garden garden ho gaya! Keep shining always Didi! 💖",
  "Patlu ko bolo cake khaye, main toh Didi ke naam ka samosa hi todunga! 🥟✨"
];
let motuQuoteIndex = 0;

function feedMotu() {
  playTeaseTrack('media/chewing.mp3', 0.95);

  const bubble = document.querySelector('.motu-bubble');
  motuQuoteIndex = (motuQuoteIndex + 1) % motuQuotes.length;
  bubble.textContent = motuQuotes[motuQuoteIndex];

  const motuAvatar = document.querySelector('.motu-anim');
  motuAvatar.style.transform = 'scale(1.2) rotate(-8deg)';
  setTimeout(() => {
    motuAvatar.style.transform = '';
  }, 400);

  if (particleSystem) {
    particleSystem.createConfettiBurst(window.innerWidth * 0.25, window.innerHeight * 0.4, 35);
  }
}

const patluQuotes = [
  "Aaj kamayenga to kal baithkar khayenga! 💼💰 Scientific rule for Didi's golden future!",
  "Idea! Didi ke 12th November par hum sab milkar universe ka sabse bada party karenge! 🚀",
  "Meri calculation ke mutabiq: Didi's future is filled with 100% success & joy! 🌟",
  "Dimaag ki batti keh rahi hai: Didi is born to conquer her dreams! 🌈"
];
let patluQuoteIndex = 0;

function triggerPatluIdea() {
  playTeaseTrack('media/Voicy_Aaj kamayenga to kal baithkar khayenga.mp3', 0.95);

  const bubble = document.querySelector('.patlu-bubble');
  patluQuoteIndex = (patluQuoteIndex + 1) % patluQuotes.length;
  bubble.textContent = patluQuotes[patluQuoteIndex];

  const patluAvatar = document.querySelector('.patlu-anim');
  patluAvatar.style.transform = 'scale(1.15) rotate(6deg)';
  setTimeout(() => {
    patluAvatar.style.transform = '';
  }, 400);

  if (particleSystem) {
    particleSystem.createConfettiBurst(window.innerWidth * 0.75, window.innerHeight * 0.4, 35);
  }
}

// Global listener: Stop Doraemon song whenever moving forward with any other tag or button
document.addEventListener('click', (e) => {
  const doorModal = document.getElementById('anywhereDoorModal');
  const clickedInsideDoor = doorModal && doorModal.contains(e.target);
  const clickedOpenBtn = e.target.closest && e.target.closest('.pocket-btn');

  // If clicked on any other button or tag outside the Anywhere door modal, stop the Doraemon song
  if (!clickedInsideDoor && !clickedOpenBtn && doraThemeAudio) {
    stopDoraemonSong();
  }
});

// ================= Motu's Samosa Catch Minigame =================
let samosaScore = 0;

function startSamosaRain() {
  const arena = document.getElementById('gameArena');
  const motuCatcher = document.getElementById('catcherMotu');
  if (!arena || !motuCatcher) return;

  for (let i = 0; i < 12; i++) {
    setTimeout(() => {
      createFallingSamosa(arena, motuCatcher);
    }, i * 400);
  }
}

function createFallingSamosa(arena, motuCatcher) {
  const samosa = document.createElement('div');
  samosa.className = 'falling-samosa';
  samosa.textContent = '🥟';
  samosa.style.left = `${Math.random() * (arena.clientWidth - 45)}px`;
  samosa.style.top = '0px';

  arena.appendChild(samosa);

  let currentTop = 0;
  const speed = Math.random() * 2.5 + 2.5;

  const fallTimer = setInterval(() => {
    currentTop += speed;
    samosa.style.top = `${currentTop}px`;

    const motuLeft = parseFloat(motuCatcher.style.left) || (arena.clientWidth / 2);
    const samosaLeft = parseFloat(samosa.style.left) || 0;

    if (currentTop >= arena.clientHeight - 75 && currentTop <= arena.clientHeight - 20) {
      if (Math.abs(motuLeft - samosaLeft) < 55) {
        clearInterval(fallTimer);
        samosaScore += 1;
        document.getElementById('scoreDisplay').textContent = samosaScore;

        try {
          const popAudio = new Audio('media/Rapid burst ofa balloon sound.mp3');
          popAudio.volume = 0.5;
          popAudio.play().catch(() => {});
        } catch (e) {}

        const rect = samosa.getBoundingClientRect();
        if (particleSystem) {
          particleSystem.createConfettiBurst(rect.left, rect.top, 16);
        }
        if (samosa.parentNode) samosa.remove();
        return;
      }
    }

    if (currentTop >= arena.clientHeight - 40) {
      clearInterval(fallTimer);
      if (samosa.parentNode) samosa.remove();
    }
  }, 25);

  samosa.addEventListener('pointerdown', (e) => {
    clearInterval(fallTimer);
    samosaScore += 1;
    document.getElementById('scoreDisplay').textContent = samosaScore;

    try {
      const popAudio = new Audio('media/Rapid burst ofa balloon sound.mp3');
      popAudio.volume = 0.5;
      popAudio.play().catch(() => {});
    } catch (e) {}

    motuCatcher.style.left = samosa.style.left;

    const rect = samosa.getBoundingClientRect();
    if (particleSystem) {
      particleSystem.createConfettiBurst(rect.left, rect.top, 15);
    }
    samosa.remove();
  });
}
