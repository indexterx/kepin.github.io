// ================== SET TANGGAL ULT AH ==================
const BIRTH_DAY = 9;       // tanggal ultah
const BIRTH_MONTH = 5;    // bulan (0=Jan, 5=Juni)

// ================== COUNTDOWN WIB ==================
function updateCountdown() {
  const now = new Date();

  // waktu WIB
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

  // ========= SEBELUM HARI ULTAH =========
  if (
    todayMonth < BIRTH_MONTH ||
    (todayMonth === BIRTH_MONTH && todayDate < BIRTH_DAY)
  ) {
    const diff = target - wib;

    const h = Math.floor(diff / (1000 * 60 * 60));
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    countdownEl.textContent =
      `Otewe Ultah: ${h} jam ${m} menit ${s} detik`;

    btn.disabled = true;
    btn.textContent = "Belum waktunya nyet 😴";
    btn.classList.remove("active");
    return;
  }

  // ========= PAS HARI ULT AH =========
  if (todayDate === BIRTH_DAY && todayMonth === BIRTH_MONTH) {
    countdownEl.textContent = "🎂 SELAMAT ULANG TAHUN MONYET 🎂";
    btn.disabled = false;
    btn.textContent = "Buka Pesan Gece 🎁";
    btn.classList.add("active");
    btn.onclick = showMessage;
    return;
  }

  // ========= SETELAH HARI ULT AH =========
  countdownEl.textContent = "⏰ Udah Lewat Bego, Ngapain Dibuka Lagi";
  btn.disabled = true;
  btn.textContent = "Udh gk bisa dibuka tolol ❌";
  btn.classList.remove("active");
}

setInterval(updateCountdown, 1000);
updateCountdown();
