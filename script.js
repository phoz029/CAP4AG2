const VALID_USER = "jervinefajardo";
const VALID_PASS = "test242529";

let noCount = 0;
let repelMode = false;

const loginBtn = document.getElementById("loginBtn");
const loader = document.getElementById("loader");
const loginCard = document.getElementById("loginCard");
const valentine = document.getElementById("valentine");
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const popup = document.getElementById("popup");
const popupVideo = document.getElementById("popupVideo");
const popupImg = document.getElementById("popupImg");
const popupText = document.getElementById("popupText");
const evilVideo = document.getElementById("evilVideo");
const invite = document.getElementById("invite");
const confetti = document.getElementById("confetti");

loginBtn.onclick = () => {
  loginCard.style.display = "none";
  loader.classList.remove("hidden");

  setTimeout(() => {
    loader.classList.add("hidden");
    valentine.classList.remove("hidden");
  }, 1800);
};

function vibrate(ms) {
  if (navigator.vibrate) navigator.vibrate(ms);
}

function shake() {
  document.body.style.animation = "shake 0.4s";
  setTimeout(() => document.body.style.animation = "", 400);
}

noBtn.onclick = () => {
  noCount++;
  vibrate(200);
  shake();

  if (noCount === 1) {
    popupVideo.src = "assets/hamster.mp4";
    popupVideo.style.display = "block";
    popupVideo.play();
    popupText.textContent = "💔 Why...";
    popup.classList.remove("hidden");
  } else if (noCount === 2) {
    popupVideo.style.display = "none";
    popupImg.src = "assets/sad-cat.jpg";
    popupImg.style.display = "block";
    popupText.textContent = "😿 Please...";
    popup.classList.remove("hidden");
  } else {
    repelMode = true;
    evilVideo.src = "assets/muhehehe.mp4";
    evilVideo.loop = true;
    evilVideo.play();
  }
};

document.addEventListener("mousemove", e => repel(e.clientX, e.clientY));
document.addEventListener("touchmove", e => {
  const t = e.touches[0];
  repel(t.clientX, t.clientY);
});

function repel(x, y) {
  if (!repelMode) return;
  const r = noBtn.getBoundingClientRect();
  const d = Math.hypot(x - r.left, y - r.top);
  if (d < 120) {
    noBtn.style.left = Math.random() * (window.innerWidth - 120) + "px";
    noBtn.style.top = Math.random() * (window.innerHeight - 60) + "px";
  }
}

yesBtn.onclick = () => {
  vibrate([200,100,200]);
  evilVideo.pause();
  valentine.classList.add("hidden");
  invite.classList.remove("hidden");
  launchConfetti();
};

function closePopup() {
  popup.classList.add("hidden");
  popupVideo.pause();
}

function launchConfetti() {
  for (let i = 0; i < 40; i++) {
    const c = document.createElement("div");
    c.style.left = Math.random() * 100 + "%";
    c.style.animation = `fall ${Math.random() * 3 + 2}s linear`;
    confetti.appendChild(c);
    setTimeout(() => c.remove(), 5000);
  }
}
