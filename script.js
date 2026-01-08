const countdownEl = document.getElementById("countdown");
const btn = document.getElementById("btn");
const messageEl = document.getElementById("message");

/* ================== SET TANGGAL ULT AH ================== */
/* ⚠️ GANTI SESUAI KEBUTUHAN */
const BIRTH_DAY = 9;      // tanggal ultah
const BIRTH_MONTH = 5;   // bulan (0=Jan, 5=Juni)

/* ================== PESAN ULT AH ================== */
const message = `Selamat ulang tahun Monyet 🎉
Semoga makin sehat,
rezeki makin lancar,
dan jangan lupa traktiran 😹🍑🍆`;

/* ================== COUNTDOWN WIB ================== */
function updateCountdown() {
  const now = new Date();

  // konversi ke WIB
  const wib = new Date(
    now.getTime() + (7 * 60 + now.getTimezoneOffset()) * 60000
  );

  const todayDate = wib.getDate();
  const todayMonth = wib.getMonth();

  // target 00:00 WIB di hari ultah
  const target = new Date(wib);
  target.setMonth(BIRTH_MONTH);
  target.setDate(BIRTH_DAY);
  target.setHours(0, 0, 0, 0);

  /* ===== SEBELUM HARI ULT AH ===== */
  if (
    todayMonth < BIRTH_MONTH ||
    (todayMonth === BIRTH_MONTH && todayDate < BIRTH_DAY)
  ) {
    const diff = target - wib;

    const h = Math.floor(diff / (1000 * 60 * 60));
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    countdownEl.textContent =
      `Menuju Ultah: ${h} jam ${m} menit ${s} detik`;

    btn.disabled = true;
    btn.textContent = "Belum waktunya 😴";
    btn.classList.remove("active");
    return;
  }

  /* ===== PAS HARI ULT AH ===== */
  if (todayDate === BIRTH_DAY && todayMonth === BIRTH_MONTH) {
    countdownEl.textContent = "🎂 SELAMAT ULANG TAHUN NYET 🎂";
    btn.disabled = false;
    btn.textContent = "Buka Pesan Gece 🎁";
    btn.classList.add("active");
    btn.onclick = showMessage;
    return;
  }

  /* ===== SETELAH HARI ULT AH ===== */
  countdownEl.textContent = "⏰ Udah Lewat Tolol";
  btn.disabled = true;
  btn.textContent = "Udah Gak Bisa Dibuka Bego ❌";
  btn.classList.remove("active");
}

setInterval(updateCountdown, 1000);
updateCountdown();

/* ================== CONFETTI ================== */
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.onresize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

const emojis = ["🍆", "🍑", "😹"];

const images = [];
["kepintil.jpg", "monyek.jpg"].forEach(src => {
  const img = new Image();
  img.src = src;
  images.push(img);
});

let particles = [];

function createParticle() {
  const isEmoji = Math.random() < 0.6;

  return {
    x: Math.random() * canvas.width,
    y: -50,
    speed: Math.random() * 20 + 20, // 🔥 SUPER NGENCENG
    gravity: 0.6
    size: Math.random() * 35 + 25,
    type: isEmoji ? "emoji" : "image",
    value: isEmoji
      ? emojis[Math.floor(Math.random() * emojis.length)]
      : images[Math.floor(Math.random() * images.length)],
    rotate: Math.random() * 360
  };
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.y += p.speed;
    p.rotate += 6;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotate * Math.PI / 180);

    if (p.type === "emoji") {
      ctx.font = p.size + "px serif";
      ctx.fillText(p.value, 0, 0);
    } else {
      ctx.drawImage(p.value, -p.size / 2, -p.size / 2, p.size, p.size);
    }

    ctx.restore();
  });

  particles = particles.filter(p => p.y < canvas.height + 100);
  requestAnimationFrame(animate);
}

/* ================== KETIKA TOMBOL DIKLIK ================== */
function showMessage() {
  btn.style.display = "none";
  messageEl.textContent = message;

  // confetti brutal
  setInterval(() => {
    for (let i = 0; i < 15; i++) {
      particles.push(createParticle());
    }
  }, 120);

  animate();
}
