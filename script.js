// ======================
// CONFIG
// ======================
const VALID_USER = "jervinefajardo";
const VALID_PASS = "test242529";

// ======================
// STATE
// ======================
let noCount = 0;
let repelMode = false;

// ======================
// ELEMENTS
// ======================
const loginCard = document.getElementById("loginCard");
const valentine = document.getElementById("valentine");
const popup = document.getElementById("popup");
const popupImg = document.getElementById("popupImg");
const popupVideo = document.getElementById("popupVideo");
const popupText = document.getElementById("popupText");
const invite = document.getElementById("invite");
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const evilVideo = document.getElementById("evilVideo");
const loader = document.getElementById("loader");

// ======================
// LOGIN WITH FAKE LOADER
// ======================
loginBtn.onclick = () => {
  loginCard.style.display = "none";
  loader.classList.remove("hidden");

  setTimeout(() => {
    loader.classList.add("hidden");

    if (
      username.value === VALID_USER &&
      password.value === VALID_PASS
    ) {
      valentine.style.display = "flex";
    } else {
      loginCard.style.display = "block";
      error.textContent = "Invalid username or password.";
    }
  }, 1800);
};

// ======================
// SCREEN SHAKE
// ======================
function shakeScreen() {
  document.body.style.animation = "shake 0.4s";
  setTimeout(() => {
    document.body.style.animation = "";
  }, 400);
}

// ======================
// NO BUTTON LOGIC
// ======================
evilVideo.src = "assets/muhehehe.mp4";
evilVideo.loop = true;

noBtn.onclick = () => {
  noCount++;
  shakeScreen();

  if (noCount === 1) {
    popupImg.style.display = "none";
    popupVideo.style.display = "block";
    popupVideo.src = "assets/hamster.mp4";
    popupVideo.currentTime = 0;
    popupVideo.play();

    popupText.textContent = "💔 Why would you say no...";
    popup.style.display = "flex";
  }

  else if (noCount === 2) {
    popupVideo.pause();
    popupVideo.style.display = "none";

    popupImg.style.display = "block";
    popupImg.src = "assets/sad-cat.jpg";
    popupText.textContent = "😿 Please reconsider...";
    popup.style.display = "flex";
  }

  else {
    repelMode = true;
    evilVideo.style.display = "block";
    evilVideo.muted = false;
    evilVideo.play();
  }
};

// ======================
// CURSOR REPEL (DESKTOP)
// ======================
document.addEventListener("mousemove", (e) => {
  if (!repelMode) return;
  repel(e.clientX, e.clientY);
});

// ======================
// TOUCH REPEL (MOBILE)
// ======================
document.addEventListener("touchmove", (e) => {
  if (!repelMode) return;
  const touch = e.touches[0];
  repel(touch.clientX, touch.clientY);
});

// ======================
// REPEL FUNCTION
// ======================
function repel(x, y) {
  const rect = noBtn.getBoundingClientRect();
  const dx = x - (rect.left + rect.width / 2);
  const dy = y - (rect.top + rect.height / 2);
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < 120) {
    noBtn.style.left =
      Math.random() * (window.innerWidth - 120) + "px";
    noBtn.style.top =
      Math.random() * (window.innerHeight - 60) + "px";
  }
}

// ======================
// YES BUTTON (DRAMATIC)
// ======================
yesBtn.onclick = () => {
  repelMode = false;

  evilVideo.pause();
  evilVideo.style.display = "none";

  document.body.style.transition = "opacity 0.6s";
  document.body.style.opacity = "0";

  setTimeout(() => {
    document.body.style.opacity = "1";
    invite.style.display = "flex";
  }, 600);
};

// ======================
// POPUP CLOSE
// ======================
function closePopup() {
  popup.style.display = "none";
  popupVideo.pause();
}
