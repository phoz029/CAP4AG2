let noCount = 0;
let repelMode = false;

const loginBtn = document.getElementById("loginBtn");
const loginCard = document.getElementById("loginCard");
const valentine = document.getElementById("valentine");
const page = document.getElementById("page");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const popup = document.getElementById("popup");
const popupVideo = document.getElementById("popupVideo");
const popupImg = document.getElementById("popupImg");
const popupText = document.getElementById("popupText");

const evilVideo = document.getElementById("evilVideo");
const invite = document.getElementById("invite");
const confetti = document.getElementById("confetti");

/* ================= LOGIN TRANSITION ================= */

loginBtn.onclick = () => {
  loginCard.style.display = "none";
  page.classList.add("valentine-theme");
  valentine.style.display = "block";
};


/* ================= NO BUTTON LOGIC ================= */

noBtn.onclick = () => {
  noCount++;

  popupVideo.pause();
  popupVideo.style.display = "none";
  popupImg.style.display = "none";

  if (noCount === 1) {
    popupVideo.src = "assets/hamster.mp4";
    popupVideo.style.display = "block";
    popupVideo.play();
    popupText.textContent = "";
    popup.classList.remove("hidden");

  } else if (noCount === 2) {
    popupImg.src = "assets/sad-cat.jpg";
    popupImg.style.display = "block";
    popupText.textContent = "";
    popup.classList.remove("hidden");

  } else {
    popup.classList.add("hidden");

    repelMode = true;
    evilVideo.src = "assets/muhehehe.mp4";
    evilVideo.loop = true;
    evilVideo.play();
  }
};

/* ================= REPELLING NO ================= */

document.addEventListener("mousemove", e => repel(e.clientX, e.clientY));
document.addEventListener("touchmove", e => {
  const t = e.touches[0];
  repel(t.clientX, t.clientY);
});

function repel(x, y) {
  if (!repelMode) return;

  const r = noBtn.getBoundingClientRect();
  const dist = Math.hypot(x - r.left, y - r.top);

  if (dist < 120) {
    noBtn.style.left =
      Math.random() * (window.innerWidth - 140) + "px";
    noBtn.style.top =
      Math.random() * (window.innerHeight - 140) + "px";
  }
}

/* ================= YES BUTTON ================= */

yesBtn.onclick = () => {
  repelMode = false;

  evilVideo.pause();
  evilVideo.style.display = "none";

  valentine.classList.add("hidden");
  invite.classList.remove("hidden");

  launchConfetti();
};

/* ================= POPUP CLOSE ================= */

function closePopup() {
  popup.classList.add("hidden");
  popupVideo.pause();
}

/* ================= CONFETTI ================= */

function launchConfetti() {
  for (let i = 0; i < 40; i++) {
    const c = document.createElement("div");
    c.className = "confetti";
    c.style.left = Math.random() * 100 + "%";
    c.style.animationDuration = Math.random() * 3 + 2 + "s";
    confetti.appendChild(c);
    setTimeout(() => c.remove(), 5000);
  }
}
