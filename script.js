// Elements
const loginBtn = document.getElementById('loginBtn');
const loginCard = document.getElementById('loginCard');
const loader = document.getElementById('loader');
const valentine = document.getElementById('valentine');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const invite = document.getElementById('invite');
const popup = document.getElementById('popup');
const popupText = document.getElementById('popupText');
const confetti = document.getElementById('confetti');

// State
let noCount = 0;
let noBtnMoving = false;
const messages = [
    "Are you sure? 😢",
    "Really sure? 💔",
    "Please? 🥺",
    "Don't do this! 😭",
    "I'm begging you... 🙏",
    "Last chance! ❤️‍🩹"
];

// Login Simulation
loginBtn.addEventListener('click', function() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Simple validation
    if (!username || !password) {
        showError('Please enter both username and password');
        return;
    }
    
    // Show loader
    loginCard.classList.add('hidden');
    loader.classList.remove('hidden');
    
    // Simulate authentication delay
    setTimeout(() => {
        loader.classList.add('hidden');
        valentine.classList.remove('hidden');
    }, 1800);
});

// Yes Button - Accept
yesBtn.addEventListener('click', function() {
    // Vibrate if supported
    if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
    
    // Hide valentine, show invite
    valentine.classList.add('hidden');
    invite.classList.remove('hidden');
    
    // Launch confetti
    launchConfetti();
});

// No Button - Reject
noBtn.addEventListener('click', function() {
    // Increment count
    noCount++;
    
    // Vibrate if supported
    if (navigator.vibrate) navigator.vibrate(200);
    
    // Shake animation
    document.body.style.animation = 'shake 0.5s';
    setTimeout(() => {
        document.body.style.animation = '';
    }, 500);
    
    // Change button text with messages
    if (noCount <= messages.length) {
        noBtn.textContent = messages[noCount - 1];
    }
    
    // Make button run away after 3rd click
    if (noCount >= 3) {
        noBtnMoving = true;
        moveNoButton();
    }
    
    // Show popup messages
    if (noCount === 1) {
        showPopup("💔 Why...");
    } else if (noCount === 2) {
        showPopup("😿 Please...");
    } else if (noCount === 4) {
        showPopup("💔 My heart is breaking...");
    }
    
    // Make Yes button bigger
    yesBtn.style.transform = `scale(${1 + (noCount * 0.1)})`;
    yesBtn.style.transition = 'transform 0.3s';
});

// Move No button away from cursor
function moveNoButton() {
    if (!noBtnMoving) return;
    
    const maxX = window.innerWidth - noBtn.offsetWidth;
    const maxY = window.innerHeight - noBtn.offsetHeight;
    
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    noBtn.style.transition = 'left 0.5s, top 0.5s';
}

// Track mouse to move No button
document.addEventListener('mousemove', function(e) {
    if (!noBtnMoving || noCount < 3) return;
    
    const btnRect = noBtn.getBoundingClientRect();
    const btnCenterX = btnRect.left + btnRect.width / 2;
    const btnCenterY = btnRect.top + btnRect.height / 2;
    
    const distance = Math.sqrt(
        Math.pow(e.clientX - btnCenterX, 2) + 
        Math.pow(e.clientY - btnCenterY, 2)
    );
    
    // If cursor is within 100px of button, move it
    if (distance < 100) {
        moveNoButton();
    }
});

// Show popup message
function showPopup(message) {
    popupText.textContent = message;
    popup.classList.remove('hidden');
    
    // Auto-close after 2 seconds
    setTimeout(closePopup, 2000);
}

// Close popup
function closePopup() {
    popup.classList.add('hidden');
}

// Confetti effect
function launchConfetti() {
    const colors = ['#ff0000', '#8b0000', '#ff6b6b', '#ff9999'];
    
    for (let i = 0; i < 150; i++) {
        const confettiPiece = document.createElement('div');
        confettiPiece.style.left = Math.random() * 100 + 'vw';
        confettiPiece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confettiPiece.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
        
        confetti.appendChild(confettiPiece);
        
        // Remove after animation
        setTimeout(() => {
            confettiPiece.remove();
        }, 5000);
    }
}

// Error display
function showError(message) {
    const errorEl = document.getElementById('error');
    errorEl.textContent = message;
    errorEl.style.color = '#ff0000';
    errorEl.style.marginTop = '10px';
    
    setTimeout(() => {
        errorEl.textContent = '';
    }, 3000);
}

// Pre-fill with demo credentials
window.addEventListener('DOMContentLoaded', function() {
    console.log('Capstone Login System Ready');
    console.log('Demo Credentials:');
    console.log('Username: jervinefajardo');
    console.log('Password: test242529');
});
