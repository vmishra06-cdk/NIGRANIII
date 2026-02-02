/* 1. Neural Particle System with Mouse Interaction */
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let mouse = { x: null, y: null };

function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = [];
    for (let i = 0; i < 85; i++) particles.push(new Particle());
}

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.vx = Math.random() * 0.4 - 0.2;
        this.vy = Math.random() * 0.4 - 0.2;
    }
    update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x > canvas.width || this.x < 0) this.vx *= -1;
        if (this.y > canvas.height || this.y < 0) this.vy *= -1;
    }
    draw() {
        ctx.fillStyle = 'rgba(56, 189, 248, 0.3)';
        ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
        p.update(); p.draw();
        for (let j = i; j < particles.length; j++) {
            const dx = p.x - particles[j].x, dy = p.y - particles[j].y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < 150) {
                ctx.strokeStyle = `rgba(56, 189, 248, ${1 - dist/150})`;
                ctx.lineWidth = 0.5; ctx.beginPath();
                ctx.moveTo(p.x, p.y); ctx.lineTo(particles[j].x, particles[j].y); ctx.stroke();
            }
        }
        if (mouse.x) {
            const mdx = p.x - mouse.x, mdy = p.y - mouse.y;
            const mDist = Math.sqrt(mdx*mdx + mdy*mdy);
            if (mDist < 180) {
                ctx.strokeStyle = `rgba(56, 189, 248, ${1 - mDist/180})`;
                ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
            }
        }
    });
    requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', initCanvas);
window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
initCanvas(); animateParticles();

/* 2. Hero Title Typing */
const brandTextStr = "NIGRANIII";
let charIdx = 0;
const brandEl = document.getElementById("brandText");
(function type() {
    if (charIdx < brandTextStr.length) {
        brandEl.textContent += brandTextStr[charIdx++];
        setTimeout(type, 180);
    }
})();

/* 3. Hero Mouse Parallax */
window.addEventListener("mousemove", (e) => {
    const elements = document.querySelectorAll(".parallax-element");
    const x = (window.innerWidth / 2 - e.clientX) / 50;
    const y = (window.innerHeight / 2 - e.clientY) / 50;
    elements.forEach(el => {
        const depth = el.getAttribute("data-depth");
        el.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
    });
});

/* 4. Scroll Spy & Scan-line Collision */
window.addEventListener("scroll", () => {
    const sc = window.scrollY;
    const h = document.documentElement.scrollHeight - window.innerHeight;
    document.getElementById("scrollProgress").style.width = (sc / h) * 100 + "%";

    document.querySelectorAll(".reveal").forEach(s => {
        if (s.getBoundingClientRect().top < window.innerHeight - 100) s.classList.add("active");
    });

    let current = "";
    document.querySelectorAll("section").forEach(sec => {
        if (sc >= sec.offsetTop - 300) current = sec.getAttribute("id");
    });
    document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.remove("active-link");
        if (link.getAttribute("href").includes(current)) link.classList.add("active-link");
    });
});

/* 5. Scan-line "Detection" Logic */
function checkScanDetection() {
    const scanRect = document.querySelector(".scan-line").getBoundingClientRect();
    document.querySelectorAll(".glass-card").forEach(card => {
        const cardRect = card.getBoundingClientRect();
        if (scanRect.top > cardRect.top && scanRect.top < cardRect.bottom) {
            card.classList.add("detected");
        } else {
            card.classList.remove("detected");
        }
    });
    requestAnimationFrame(checkScanDetection);
}
checkScanDetection();

/* 6. Mouse Cursor Glow & Tilt */
document.addEventListener("mousemove", e => {
    const cursor = document.getElementById("cursor");
    cursor.style.left = e.clientX + "px"; cursor.style.top = e.clientY + "px";
});

document.querySelectorAll(".tilt").forEach(card => {
    card.addEventListener("mousemove", e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width/2) / 12;
        const y = (e.clientY - r.top - r.height/2) / -12;
        card.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg) scale(1.05)`;
        card.style.animation = "none";
    });
    card.addEventListener("mouseleave", () => {
        card.style.transform = ""; card.style.animation = "";
    });
});

document.querySelectorAll(".magnetic").forEach(btn => {
    btn.addEventListener("mousemove", e => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width/2)) * 0.4;
        const y = (e.clientY - (r.top + r.height/2)) * 0.4;
        btn.style.transform = `translate(${x}px, ${y}px) scale(1.1)`;
    });
    btn.addEventListener("mouseleave", () => btn.style.transform = "");
});
