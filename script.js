// --- 1. ตั้งค่าเริ่มต้นเมื่อเปิดเว็บ (ให้โชว์หน้าล็อกอินก่อน) ---
window.onload = () => {
    // ซ่อนทุกอย่าง ยกเว้นหน้าใส่รหัส
    document.getElementById('password-screen').style.display = 'block';
    document.getElementById('main-menu').style.display = 'none';
    document.querySelectorAll('.content-view').forEach(el => el.style.display = 'none');
    
    // เริ่มเอฟเฟกต์หัวใจลอย
    setInterval(createFloatingHeart, 300);
};

// --- 2. ฟังก์ชันตรวจรหัสผ่าน ---
function checkPassword() {
    const input = document.getElementById('pass-input').value;
    const correctPass = "1008"; // คุณเปลี่ยนรหัสตรงนี้ได้เลย
    
    if (input === correctPass) {
        // ถ้ารหัสถูก -> สลับหน้าจอ
        document.getElementById('password-screen').style.display = 'none';
        document.getElementById('main-menu').style.display = 'block';
        
        // เล่นเพลงอัตโนมัติ
        if (!isPlaying) toggleMusic(); 
    } else {
        // ถ้ารหัสผิด -> สั่นและโชว์ Error
        const errorMsg = document.getElementById('error-msg');
        errorMsg.style.display = 'block';
        document.getElementById('pass-input').value = '';
        
        document.getElementById('password-screen').classList.add('shake');
        setTimeout(() => {
            document.getElementById('password-screen').classList.remove('shake');
        }, 500);
    }
}

// --- 3. ฟังก์ชันควบคุมการเปลี่ยนหน้าเมนู ---
function showContent(view) {
    document.getElementById('main-menu').style.display = 'none';
    document.querySelectorAll('.content-view').forEach(el => {
        el.style.display = 'none';
        const vids = el.querySelectorAll('video');
        vids.forEach(v => { v.pause(); v.currentTime = 0; });
    });

    const targetView = document.getElementById('view-' + view);
    if (targetView) {
        targetView.style.display = 'block';
        if (view === 'videos') {
            const activeVideo = targetView.querySelector('.video-slide.active video');
            if (activeVideo) activeVideo.play().catch(() => {});
        }
    }
}

function goHome() {
    document.querySelectorAll('.content-view').forEach(el => {
        el.style.display = 'none';
        const vids = el.querySelectorAll('video');
        vids.forEach(v => v.pause());
    });
    document.getElementById('main-menu').style.display = 'block';
}

// --- 4. ระบบเพลง ---
const song = document.getElementById('love-song');
const statusIcon = document.getElementById('music-status');
let isPlaying = false;

function toggleMusic() {
    if (!isPlaying) {
        song.play();
        statusIcon.innerText = '🎵';
        isPlaying = true;
    } else {
        song.pause();
        statusIcon.innerText = '🔇';
        isPlaying = false;
    }
}

// --- 5. ระบบวิดีโอสไลด์ ---
let currentVideoIndex = 0;
function changeVideo(direction) {
    const slides = document.querySelectorAll('.video-slide');
    if (slides.length === 0) return;

    const currentVid = slides[currentVideoIndex].querySelector('video');
    if (currentVid) { currentVid.pause(); currentVid.currentTime = 0; }
    
    slides[currentVideoIndex].classList.remove('active');
    currentVideoIndex = (currentVideoIndex + direction + slides.length) % slides.length;
    
    const nextSlide = slides[currentVideoIndex];
    nextSlide.classList.add('active');
    const nextVid = nextSlide.querySelector('video');
    if (nextVid) nextVid.play().catch(() => {});
}

// --- 6. เอฟเฟกต์หัวใจ ---
function createFloatingHeart() {
    const heartBg = document.getElementById('heart-bg');
    if (!heartBg) return;
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = (Math.random() * 10 + 15) + 'px';
    heartBg.appendChild(heart);
    setTimeout(() => heart.remove(), 4000);
}