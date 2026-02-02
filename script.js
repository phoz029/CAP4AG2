// ================ WORKING VERSION - REPLACE YOUR SCRIPT.JS ================
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Page loaded, setting up events...');
    
    // Get elements
    const loginBtn = document.getElementById('loginBtn');
    const loader = document.getElementById('loader');
    const loginCard = document.getElementById('loginCard');
    const valentine = document.getElementById('valentine');
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const popup = document.getElementById('popup');
    const popupVideo = document.getElementById('popupVideo');
    const popupImg = document.getElementById('popupImg');
    const popupText = document.getElementById('popupText');
    const evilVideo = document.getElementById('evilVideo');
    const invite = document.getElementById('invite');
    const confetti = document.getElementById('confetti');
    const errorMsg = document.getElementById('error');
    
    // Debug: Log what we found
    console.log('Login button:', loginBtn);
    console.log('Valentine section:', valentine);
    console.log('Valentine hidden?', valentine.classList.contains('hidden'));
    
    // === 1. LOGIN FUNCTION ===
    if (loginBtn) {
        loginBtn.onclick = function() {
            console.log('🖱️ Login button clicked');
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Simple validation
            if (!username || !password) {
                if (errorMsg) {
                    errorMsg.textContent = 'Please enter both username and password';
                    errorMsg.style.color = 'red';
                }
                return;
            }
            
            console.log(`📝 Login attempt: ${username}`);
            
            // Show loader, hide login
            if (loginCard) loginCard.style.display = 'none';
            if (loader) loader.classList.remove('hidden');
            
            // Simulate 2-second authentication
            setTimeout(() => {
                if (loader) loader.classList.add('hidden');
                if (valentine) {
                    valentine.classList.remove('hidden');
                    console.log('💖 Now showing Valentine section');
                }
            }, 2000);
        };
    } else {
        console.error('❌ Login button not found!');
    }
    
    // === 2. YES BUTTON ===
    if (yesBtn) {
        yesBtn.onclick = function() {
            console.log('✅ Yes button clicked');
            
            // Hide valentine, show invite
            if (valentine) valentine.classList.add('hidden');
            if (invite) invite.classList.remove('hidden');
            
            // Stop evil video if playing
            if (evilVideo) {
                evilVideo.pause();
                evilVideo.currentTime = 0;
            }
            
            // Launch confetti
            launchConfetti();
        };
    }
    
    // === 3. NO BUTTON ===
    let noCount = 0;
    const noMessages = [
        "💔 Why...",
        "😿 Please...",
        "💔 My heart is breaking...",
        "🥺 Don't do this!",
        "🙏 I'm begging you...",
        "Stop chasing me! 😠"
    ];
    
    if (noBtn) {
        noBtn.onclick = function() {
            noCount++;
            console.log(`❌ No button clicked (${noCount} times)`);
            
            // Update button text
            if (noCount <= noMessages.length) {
                noBtn.textContent = noMessages[noCount - 1];
            }
            
            // Show popups for first 2 clicks
            if (noCount === 1) {
                showPopup("💔 Why...");
            } else if (noCount === 2) {
                showPopup("😿 Please...");
            }
            
            // Make Yes button grow
            if (yesBtn) {
                yesBtn.style.transform = `scale(${1 + (noCount * 0.1)})`;
            }
            
            // After 3rd click, activate repel mode
            if (noCount >= 3) {
                activateRepelMode();
            }
        };
    }
    
    // === 4. POPUP FUNCTIONS ===
    function showPopup(message) {
        console.log('📦 Showing popup:', message);
        if (popupText) popupText.textContent = message;
        if (popup) popup.classList.remove('hidden');
        
        // Auto-close after 2 seconds
        setTimeout(closePopup, 2000);
    }
    
    function closePopup() {
        if (popup) popup.classList.add('hidden');
        if (popupVideo) {
            popupVideo.pause();
            popupVideo.currentTime = 0;
        }
    }
    window.closePopup = closePopup; // Make it global for HTML onclick
    
    // === 5. REPEL MODE ===
    let repelMode = false;
    
    function activateRepelMode() {
        repelMode = true;
        console.log('🌀 Repel mode activated!');
        
        if (noBtn) {
            noBtn.style.position = 'fixed';
            noBtn.style.zIndex = '1000';
        }
        
        // Move button when mouse gets close
        document.addEventListener('mousemove', function(e) {
            if (!repelMode || !noBtn) return;
            
            const rect = noBtn.getBoundingClientRect();
            const btnX = rect.left + rect.width / 2;
            const btnY = rect.top + rect.height / 2;
            
            const distance = Math.sqrt(
                Math.pow(e.clientX - btnX, 2) + 
                Math.pow(e.clientY - btnY, 2)
            );
            
            if (distance < 150) {
                const maxX = window.innerWidth - rect.width;
                const maxY = window.innerHeight - rect.height;
                
                noBtn.style.left = Math.random() * maxX + 'px';
                noBtn.style.top = Math.random() * maxY + 'px';
            }
        });
    }
    
    // === 6. CONFETTI ===
    function launchConfetti() {
        console.log('🎉 Launching confetti!');
        if (!confetti) return;
        
        const colors = ['#ff0000', '#ff6b6b', '#ff9999', '#ff3333'];
        
        for (let i = 0; i < 50; i++) {
            const piece = document.createElement('div');
            piece.style.position = 'absolute';
            piece.style.width = '10px';
            piece.style.height = '10px';
            piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            piece.style.borderRadius = '50%';
            piece.style.left = Math.random() * 100 + 'vw';
            piece.style.top = '-10px';
            piece.style.animation = `fall ${Math.random() * 2 + 2}s linear forwards`;
            
            confetti.appendChild(piece);
            
            setTimeout(() => {
                if (piece.parentNode === confetti) {
                    confetti.removeChild(piece);
                }
            }, 5000);
        }
    }
    
    // Add fall animation to CSS if missing
    if (!document.querySelector('#fall-animation')) {
        const style = document.createElement('style');
        style.id = 'fall-animation';
        style.textContent = `
            @keyframes fall {
                to {
                    transform: translateY(100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    console.log('🎯 All event listeners set up successfully!');
    
    // Pre-fill for testing (optional)
    setTimeout(() => {
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');
        if (usernameInput && passwordInput) {
            usernameInput.value = 'jervinefajardo';
            passwordInput.value = 'test242529';
            console.log('🔑 Pre-filled demo credentials');
        }
    }, 500);
});
