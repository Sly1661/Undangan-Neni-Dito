
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

// COUNTDOWN PERNIKAHAN
function updateCountdown() {
    const weddingDate = new Date("2027-01-31T00:00:00").getTime();
    const now = Date.now();
    const distance = weddingDate - now;

    const days = Math.max(0, Math.floor(distance / 86400000));
    const hours = Math.max(0, Math.floor((distance % 86400000) / 3600000));
    const minutes = Math.max(0, Math.floor((distance % 3600000) / 60000));
    const seconds = Math.max(0, Math.floor((distance % 60000) / 1000));

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

// MEMUAT VIDEO SAAT MENDEKATI LAYAR
const videos = document.querySelectorAll(".page video");

if ("IntersectionObserver" in window) {
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;

            if (entry.isIntersecting) {
                if (video.dataset.loaded !== "true") {
                    const source = video.querySelector("source");

                    if (source && source.dataset.src) {
                        source.src = source.dataset.src;
                        video.load();
                        video.dataset.loaded = "true";
                    }
                }

                video.playbackRate = 0.7;

                video.play().catch(error => {
                    console.log("Video belum bisa diputar:", error);
                });
            } else {
                video.pause();
            }
        });
    }, {
        rootMargin: "300px 0px",
        threshold: 0.1
    });

    videos.forEach(video => {
        videoObserver.observe(video);
    });

} else {
    videos.forEach(video => {
        const source = video.querySelector("source");

        if (source && source.dataset.src) {
            source.src = source.dataset.src;
            video.load();
        }
    });
}

// MUSIK BERULANG
const music = document.getElementById("bgMusic");
music.loop = true;
