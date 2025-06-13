let activeWindow = null;
let isDragging = false;
let dragOffset = { x: 0, y: 0 };

document.addEventListener('DOMContentLoaded', function() {
    updateClock();
    setInterval(updateClock, 1000);
    createFallingStars();
    updateCountdown();
    setInterval(updateCountdown, 1000);
});

function updateClock() {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour12: true });
    const date = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    document.getElementById('clock').innerHTML = `<div>${time}</div><div style="font-size: 12px; opacity: 0.8;">${date}</div>`;
}

function createFallingStars() {
    setInterval(() => {
        if (Math.random() < 0.3) {
            const star = document.createElement('div');
            star.className = 'falling-star';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = '-10px';
            document.getElementById('desktop').appendChild(star);
            setTimeout(() => star.remove(), 4000);
        }
    }, 3000);
}

function updateCountdown() {
    const birthday = new Date('2024-07-29');
    const now = new Date();
    if (now > birthday) birthday.setFullYear(birthday.getFullYear() + 1);
    
    const timeDiff = birthday - now;
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    
    document.getElementById('countdownDisplay').innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

function openWindow(windowId) {
    closeAllWindows();
    const window = document.getElementById(windowId);
    window.style.display = 'block';
    
    // Check if mobile
    if (window.innerWidth <= 768) {
        window.style.left = '10px';
        window.style.top = '20px';
        window.style.transform = 'none';
    } else {
        window.style.left = '50%';
        window.style.top = '50%';
        window.style.transform = 'translate(-50%, -50%)';
    }
    
    activeWindow = window;
    makeDraggable(window);
}

function closeWindow(windowId) {
    document.getElementById(windowId).style.display = 'none';
    activeWindow = null;
}

function closeAllWindows() {
    document.querySelectorAll('.window').forEach(w => w.style.display = 'none');
}

function makeDraggable(window) {
    const header = window.querySelector('.window-header');
    header.onmousedown = startDrag;
    
    function startDrag(e) {
        isDragging = true;
        dragOffset.x = e.clientX - window.offsetLeft;
        dragOffset.y = e.clientY - window.offsetTop;
        document.onmousemove = drag;
        document.onmouseup = stopDrag;
    }
    
    function drag(e) {
        if (isDragging) {
            window.style.left = (e.clientX - dragOffset.x) + 'px';
            window.style.top = (e.clientY - dragOffset.y) + 'px';
            window.style.transform = 'none';
        }
    }
    
    function stopDrag() {
        isDragging = false;
        document.onmousemove = null;
        document.onmouseup = null;
    }
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const messages = document.getElementById('chatMessages');
    
    if (input.value.trim()) {
        messages.innerHTML += `<div class="message user-message">${input.value}</div>`;
        
        const responses = [
            "You're absolutely amazing! 💖",
            "Every day with you is a blessing! ✨",
            "You light up every room you enter! 🌟",
            "Your smile could brighten the darkest day! ☀️"
        ];
        
        setTimeout(() => {
            const response = responses[Math.floor(Math.random() * responses.length)];
            messages.innerHTML += `<div class="message bot-message">${response}</div>`;
            messages.scrollTop = messages.scrollHeight;
        }, 1000);
        
        input.value = '';
        messages.scrollTop = messages.scrollHeight;
    }
}

function handleChatKeyPress(event) {
    if (event.key === 'Enter') sendMessage();
}

function createStar(event) {
    const star = document.createElement('div');
    star.style.position = 'absolute';
    star.style.width = '4px';
    star.style.height = '4px';
    star.style.background = 'white';
    star.style.borderRadius = '50%';
    star.style.left = event.offsetX + 'px';
    star.style.top = event.offsetY + 'px';
    star.style.boxShadow = '0 0 10px white';
    event.target.appendChild(star);
}

// Shayari Generator Functions
const shayariDatabase = {
    love: [
        "दिल में बसा है तेरा प्यार,\nहर सांस में है तेरा इंतज़ार।\nतू ही मेरी मंजिल है प्यारे,\nतू ही है मेरा आधार।",
        "इश्क़ में तेरे डूब गए हम,\nतेरे बिना अधूरे हैं हम।\nहर ख्वाब में तू ही आता है,\nतेरे साथ ही पूरे हैं हम।",
        "चाँद सितारे भी शर्माते हैं,\nजब तेरी आँखें मुस्काती हैं।\nहर रात तेरे ख्यालों में,\nमेरी सारी खुशियाँ आती हैं।",
        "तेरे प्यार में पागल हूँ मैं,\nतेरे बिना अकेला हूँ मैं।\nहर लम्हा तुझे सोचता हूँ,\nतेरे इश्क़ में घायल हूँ मैं।"
    ],
    nostalgia: [
        "वो दिन भी क्या दिन थे यारों,\nजब हम सभी निराले थे।\nना कोई गम था ना कोई चिंता,\nबस खुशियों के रंगों में पले थे।",
        "बचपन की वो शामें याद आती हैं,\nमाँ की लोरियाँ सुनाई देती हैं।\nवो मासूम हंसी, वो खेल तमाशे,\nआज भी दिल में समाई देती हैं।",
        "पुराने दिन की बात है कोई,\nजब हर ख्वाब सच लगता था।\nआज जो बीत गया वो वक्त,\nकितना हसीन लगता था।",
        "यादों के इस शहर में आज भी,\nतेरी महक सी आती है।\nजो बीत गया वो कल का सपना,\nआज भी दिल में समाती है।"
    ],
    relationship: [
        "रिश्ते हैं नाज़ुक डोर की तरह,\nसंभाल कर रखना पड़ता है।\nप्यार से बांधे गए बंधन को,\nहर रोज़ सींचना पड़ता है।",
        "तू है तो सब कुछ है मेरे पास,\nतेरे बिना सब सूना है।\nहर रिश्ता अधूरा लगता है,\nजब तक तू न हो साथ, कुछ भी पूरा नहीं है।",
        "साथ चलने का वादा किया था,\nहर खुशी-गम में साझीदार बनने का।\nआज भी वही वादा है कायम,\nजिंदगी भर साथ निभाने का।",
        "दो दिलों का मिलना कोई खेल नहीं,\nये तो सच्चे प्यार की मिसाल है।\nहर रिश्ते में विश्वास का होना,\nसबसे खूबसूरत कमाल है।"
    ],
    trust: [
        "भरोसा है तुझ पर यकीन मेरा,\nतू है तो सब कुछ आसान मेरा।\nआंखों में झांक कर देख ले,\nकितना सच्चा है अरमान मेरा।",
        "विश्वास की डोर से बांधे हैं हम,\nएक दूसरे को समझे हैं हम।\nहर मुश्किल में साथ खड़े हैं,\nसच्ची मुहब्बत को पहचाने हैं हम।",
        "तेरे वादों पर यकीन है मुझे,\nतेरी बातों में जीत है मुझे।\nभरोसे का ये रिश्ता प्यारा,\nहमेशा के लिए प्रीत है मुझे।",
        "ईमान है तुझ पर पूरा मेरा,\nहर कदम पर साथ है तेरा।\nविश्वास के इस पुल पर चलकर,\nमिल जाएगा मंजिल का किनारा।"
    ]
};

let currentShayari = '';

function generateShayari(theme) {
    const shayaris = shayariDatabase[theme];
    const randomShayari = shayaris[Math.floor(Math.random() * shayaris.length)];
    currentShayari = randomShayari;
    
    const display = document.getElementById('shayariDisplay');
    display.innerHTML = `<p style="font-style: italic; font-size: 16px; line-height: 1.8; text-align: center; white-space: pre-line;">${randomShayari}</p>`;
}

function copyShayari() {
    if (currentShayari) {
        navigator.clipboard.writeText(currentShayari).then(() => {
            alert('Shayari copied to clipboard! 📋✨');
        }).catch(() => {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = currentShayari;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert('Shayari copied to clipboard! 📋✨');
        });
    } else {
        alert('Please generate a shayari first! 💝');
    }
}
