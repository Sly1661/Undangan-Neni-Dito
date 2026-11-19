
function openInvitation() {
    const cover = document.getElementById("cover");
    const invitation = document.getElementById("invitation");
    const music = document.getElementById("bgMusic");

    cover.style.display = "none";
    invitation.classList.remove("hidden");

    music.loop = true;
    music.play().catch(error => {
        console.log("Musik gagal diputar:", error);
    });

    window.scrollTo(0, 0);
}

// COUNTDOWN PERNIKAHAN NENI & DITO
function updateCountdown() {
    const weddingDate = new Date("2027-01-31T00:00:00").getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance <= 0) {
        document.getElementById("days").textContent = "0";
        document.getElementById("hours").textContent = "0";
        document.getElementById("minutes").textContent = "0";
        document.getElementById("seconds").textContent = "0";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
}

updateCountdown();
setInterval(updateCountdown, 1000);

// KIRIM UCAPAN KE WHATSAPP
function sendWish(event) {
    event.preventDefault();

    const name = document.getElementById("guestName").value.trim();
    const wish = document.getElementById("guestWish").value.trim();
    const recipient = document.getElementById("wishRecipient").value;

    const phoneNumbers = {
        neni: "6283821944890",
        dito: "6283193893080"
    };

    const phone = phoneNumbers[recipient];

    if (!phone) {
        alert("Silakan pilih penerima ucapan.");
        return;
    }

    const message = `Assalamu'alaikum, saya ${name}.\n\n${wish}\n\nSelamat menempuh hidup baru untuk Neni & Dito.`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
}

// ANIMASI SAAT HALAMAN TERLIHAT
const pageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.15
});

document.querySelectorAll(".page").forEach((page) => {
    pageObserver.observe(page);
});

// MEMPERLAMBAT SEMUA VIDEO
document.querySelectorAll("video").forEach((video) => {
    video.defaultPlaybackRate = 0.7;
    video.playbackRate = 0.7;

    video.addEventListener("loadedmetadata", () => {
        video.playbackRate = 0.7;
    });
});

// MUSIK BERULANG
const music = document.getElementById("bgMusic");
music.loop = true;
