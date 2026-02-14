const envelope = document.getElementById("envelope");
const letter = document.getElementById("letter");
const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");
const celebrate = document.getElementById("celebrate");
const music = document.getElementById("bg-music");
const flash = document.getElementById("flash-overlay");

// Sound files from your folder
const clickSound = new Audio('button_click.mp3');
const noSound = new Audio('NO_button_click.mp3');

/* ================= CURSOR TRAIL ================= */
document.addEventListener("mousemove", (e) => {
    const trail = document.createElement("div");
    trail.className = "trail";
    trail.style.left = e.pageX + "px";
    trail.style.top = e.pageY + "px";
    document.body.appendChild(trail);
    setTimeout(() => trail.remove(), 800);
});

/* ================= ENVELOPE OPENING ================= */
envelope.addEventListener("click", () => {
    clickSound.play();
    envelope.style.opacity = "0";
    music.play().catch(e => console.log("Music blocked"));

    setTimeout(() => {
        envelope.classList.add("hidden");
        letter.classList.remove("hidden");
        document.body.classList.add("dimmed");

        setTimeout(() => {
            letter.classList.add("show");
            yesBtn.classList.remove("hidden");
            noBtn.classList.remove("hidden");
        }, 100);
    }, 500);
});

/* ================= YES CLICK ================= */
yesBtn.addEventListener("click", () => {
    clickSound.play();

    // Pink Flash
    flash.classList.remove("hidden");
    flash.classList.add("flash-anim");
    setTimeout(() => flash.classList.add("hidden"), 600);

    // Celebration Mode
    yesBtn.classList.add("btn-click-fx");
    document.body.classList.add("celebration-mode");
    
    // FIXED: Changed to .PNG (uppercase) to match your folder
    letter.src = "letter3.PNG";
    letter.classList.add("pop-in", "letter-glow");

    setTimeout(() => {
        yesBtn.classList.add("hidden");
        noBtn.classList.add("hidden");
    }, 300);

    // Triple GIFs
    celebrate.classList.remove("hidden");
    celebrate.classList.add("moving-gif", "gif-1");
    for (let i = 2; i <= 3; i++) {
        const extraGif = celebrate.cloneNode(true);
        extraGif.classList.remove("gif-1");
        extraGif.classList.add(`gif-${i}`);
        document.body.appendChild(extraGif);
    }

    // Heart Explosion
    for (let i = 0; i < 35; i++) createHeart();
});

function createHeart() {
    const heart = document.createElement("div");
    heart.innerHTML = "❤️";
    heart.className = "heart";
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 400 + 100;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    const tr = Math.random() * 360;
    heart.style.setProperty('--tx', `${tx}px`);
    heart.style.setProperty('--ty', `${ty}px`);
    heart.style.setProperty('--tr', `${tr}deg`);
    heart.style.left = "50%";
    heart.style.top = "50%";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1500);
}

/* ================= NO BUTTON DODGE ================= */
const moveNoButton = () => {
    noSound.currentTime = 0;
    noSound.play();
    const randomX = Math.floor(Math.random() * 300) - 150;
    const randomY = Math.floor(Math.random() * 200) - 100;
    noBtn.style.left = `calc(50% + ${randomX}px)`;
    noBtn.style.bottom = `calc(18% + ${randomY}px)`;
};
noBtn.addEventListener("mouseover", moveNoButton);
noBtn.addEventListener("click", moveNoButton);

