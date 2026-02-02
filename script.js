const VALID_USER = "jervinefajardo";
const VALID_PASS = "test242529";

let noCount = 0;
let repelMode = false;

loginBtn.onclick = () => {
  const remember = rememberMe.checked;
  loginCard.style.display = "none";
  loader.classList.remove("hidden");

  setTimeout(() => {
    loader.classList.add("hidden");
    if (username.value === VALID_USER && password.value === VALID_PASS) {
      if (remember) {
        localStorage.setItem("savedUser", username.value);
      }
      valentine.style.display = "flex";
    } else {
      error.textContent = "Invalid username or password.";
      loginCard.style.display = "block";
    }
  }, 1800); // fake delay
};

window.onload = () => {
  const saved = localStorage.getItem("savedUser");
  if (saved) {
    username.value = saved;
    rememberMe.checked = true;
  }
};

noBtn.onclick = () => {
  noCount++;
  if (noCount === 1) showPopup("assets/sad-hamster.gif", "💔 That hurt… 😔");
  else if (noCount === 2) showPopup("assets/sad-cat.jpg", "😿 Seriously?");
  else {
    repelMode = true;
    evilAudio.play();
  }
};

document.addEventListener("mousemove", (e) => {
  if (!repelMode) return;
  const r = noBtn.getBoundingClientRect();
  const dx = e.clientX - (r.left + r.width / 2);
  const dy = e.clientY - (r.top + r.height / 2);
  const dist = Math.sqrt(dx*dx + dy*dy);
  if (dist < 100) {
    noBtn.style.left = Math.random() * (window.innerWidth - 100) + "px";
    noBtn.style.top = Math.random() * (window.innerHeight - 50) + "px";
  }
});

yesBtn.onclick = () => {
  evilAudio.pause();
  invite.style.display = "flex";
};

function showPopup(img, text) {
  popupImg.src = img;
  popupText.textContent = text;
  popup.style.display = "flex";
}
function closePopup() { popup.style.display = "none"; }
