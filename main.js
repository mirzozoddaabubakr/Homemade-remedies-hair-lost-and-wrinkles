/* ==============================================================
   HOMEMADE REMEDIES — INVESTOR PRESENTATION
   Advanced Motion Choreography System
   
   7 Motion Types:
   A. Hero Cinematic Reveal (word-by-word with blur decompression)
   B. Editorial Heading Slide-Up (staggered by line)
   C. Body Text Soft Fade (gentle rise with opacity)
   D. Media Scale Entrance (scale + subtle shadow bloom)
   E. Card Slide-In (horizontal stagger from left)
   F. Counter Roll-Up (precision number animation)
   G. Chart Line Draw (progressive path animation)
   ============================================================== */

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initHeroReveal();
    initHeadingReveals();
    initBodyReveals();
    initMediaReveals();
    initCardReveals();
    initCounters();
    initFinancialChart();
    initScrollProgress();
    initImageParallax();
});

/* ==============================================================
   THEME MANAGEMENT
   ============================================================== */

function initTheme() {
    const toggle = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);

    toggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        const next = current === 'light' ? 'dark' : 'light';

        // Professional crossfade
        gsap.timeline()
            .to(body, { opacity: 0, duration: 0.3, ease: "power3.in",
                onComplete: () => setTheme(next) })
            .to(body, { opacity: 1, duration: 0.6, ease: "power3.out" });
    });

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        sunIcon.style.display = theme === 'dark' ? 'none' : 'block';
        moonIcon.style.display = theme === 'dark' ? 'block' : 'none';
    }
}

/* ==============================================================
   TYPE A: HERO CINEMATIC REVEAL
   Word-by-word with blur decompression + tracking shift
   ============================================================== */

function initHeroReveal() {
    const heading = document.getElementById('hero-heading');
    const eyebrow = document.getElementById('hero-eyebrow');
    const subtitle = document.getElementById('hero-subtitle');
    if (!heading) return;

    // Split words
    const text = heading.textContent;
    heading.textContent = '';
    heading.style.visibility = 'visible';
    
    const words = text.split(' ');
    words.forEach((word, i) => {
        const span = document.createElement('span');
        span.textContent = word;
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.style.transform = 'translateY(40px)';
        span.style.filter = 'blur(8px)';
        span.style.marginRight = '0.3em';
        span.classList.add('hero-word');
        heading.appendChild(span);
    });

    const tl = gsap.timeline({ delay: 0.6 });

    // Eyebrow fades in first
    tl.to(eyebrow, {
        opacity: 1, duration: 0.8, ease: "power2.out"
    });

    // Words reveal with stagger
    tl.to('.hero-word', {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.08
    }, "-=0.3");

    // Subtitle fades in last
    tl.to(subtitle, {
        opacity: 0.7, y: 0, duration: 1,
        ease: "power3.out"
    }, "-=0.5");

    // Hero background slow zoom
    gsap.to('.hero-bg img', {
        scale: 1.0,
        duration: 8,
        ease: "none",
        delay: 0.3
    });
}

/* ==============================================================
   TYPE B: EDITORIAL HEADING SLIDE-UP
   Strong vertical rise with slight overshoot
   ============================================================== */

function initHeadingReveals() {
    document.querySelectorAll('.anim-heading').forEach(el => {
        gsap.fromTo(el,
            { opacity: 0, y: 60, letterSpacing: '0.02em' },
            {
                opacity: 1, y: 0, letterSpacing: '-0.035em',
                duration: 1.4,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 82%",
                    toggleActions: "play none none none"
                }
            }
        );
    });
}

/* ==============================================================
   TYPE C: BODY TEXT SOFT FADE
   Gentle vertical rise
   ============================================================== */

function initBodyReveals() {
    document.querySelectorAll('.anim-body').forEach((el, i) => {
        gsap.fromTo(el,
            { opacity: 0, y: 25 },
            {
                opacity: parseFloat(getComputedStyle(el).opacity) || 0.85,
                y: 0,
                duration: 1.2,
                ease: "power4.out",
                delay: i * 0.05,
                scrollTrigger: {
                    trigger: el,
                    start: "top 88%",
                    toggleActions: "play none none none"
                }
            }
        );
    });
}

/* ==============================================================
   TYPE D: MEDIA SCALE ENTRANCE
   Scale from 94% with shadow bloom
   ============================================================== */

function initMediaReveals() {
    document.querySelectorAll('.anim-media').forEach(el => {
        gsap.fromTo(el,
            { opacity: 0, scale: 0.92, boxShadow: "0 0 0 rgba(0,0,0,0)" },
            {
                opacity: 1, scale: 1,
                boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 12px 40px rgba(0,0,0,0.06)",
                duration: 1.8,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            }
        );
    });
}

/* ==============================================================
   TYPE E: CARD SLIDE-IN
   Staggered horizontal entrance from left
   ============================================================== */

function initCardReveals() {
    // Group cards by parent section
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const cards = section.querySelectorAll('.anim-card');
        if (cards.length === 0) return;

        gsap.fromTo(cards,
            { opacity: 0, x: -40 },
            {
                opacity: 1, x: 0,
                duration: 1.2,
                ease: "expo.out",
                stagger: 0.15,
                scrollTrigger: {
                    trigger: cards[0],
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            }
        );
    });
}

/* ==============================================================
   TYPE F: COUNTER ROLL-UP
   Precision number animation for stats
   ============================================================== */

function initCounters() {
    // Research stat (80%)
    const researchStat = document.getElementById('research-stat');
    if (researchStat) {
        ScrollTrigger.create({
            trigger: researchStat,
            start: "top 80%",
            onEnter: () => {
                const obj = { val: 0 };
                gsap.to(obj, {
                    val: 80,
                    duration: 2.5,
                    ease: "expo.out",
                    onUpdate: () => {
                        researchStat.innerText = Math.round(obj.val) + "%";
                    },
                    onComplete: () => {
                        researchStat.innerText = "80%";
                    }
                });
            }
        });
    }

    // Financial stat cards
    document.querySelectorAll('.stat-value[data-count]').forEach(el => {
        const target = parseInt(el.dataset.count);
        ScrollTrigger.create({
            trigger: el,
            start: "top 85%",
            onEnter: () => {
                const obj = { val: 0 };
                gsap.to(obj, {
                    val: target,
                    duration: 2.5,
                    ease: "expo.out",
                    onUpdate: () => {
                        el.innerText = Math.round(obj.val).toLocaleString();
                    },
                    onComplete: () => {
                        el.innerText = target.toLocaleString();
                    }
                });
            }
        });
    });
}

/* ==============================================================
   IMAGE PARALLAX — Subtle depth movement
   ============================================================== */

function initImageParallax() {
    document.querySelectorAll('.media img').forEach(img => {
        gsap.fromTo(img,
            { yPercent: -5, scale: 1.08 },
            {
                yPercent: 5, scale: 1.0,
                ease: "none",
                scrollTrigger: {
                    trigger: img.closest('.media'),
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5
                }
            }
        );
    });
}

/* ==============================================================
   SCROLL PROGRESS BAR
   ============================================================== */

function initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;

    gsap.to(bar, {
        width: "100%",
        ease: "none",
        scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.3
        }
    });
}

/* ==============================================================
   TYPE G: FINANCIAL CHART — Progressive Line Draw
   ============================================================== */

function initFinancialChart() {
    const canvas = document.getElementById('financial-chart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Data from presentation
    const incomeData = [
        { year: 0, val: 11000 },
        { year: 1, val: 24800 },
        { year: 2, val: 54000 }
    ];
    const revenueData = [
        { year: 0, val: 30000 },
        { year: 2, val: 81000 }
    ];

    let progress = { value: 0 };

    function resize() {
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.parentElement.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
        draw();
    }

    ScrollTrigger.create({
        trigger: canvas,
        start: "top 80%",
        onEnter: () => {
            gsap.to(progress, {
                value: 1,
                duration: 3.5,
                ease: "expo.inOut",
                onUpdate: draw
            });
        }
    });

    function draw() {
        const dpr = window.devicePixelRatio || 1;
        const w = canvas.width / dpr;
        const h = canvas.height / dpr;
        const pad = 50;
        ctx.clearRect(0, 0, w, h);

        const style = getComputedStyle(document.documentElement);
        const accent = style.getPropertyValue('--accent').trim();
        const text = style.getPropertyValue('--text').trim();
        const border = style.getPropertyValue('--border').trim();

        // Grid lines
        ctx.strokeStyle = border;
        ctx.lineWidth = 1;
        for (let i = 0; i <= 2; i++) {
            const x = pad + ((w - pad * 2) / 2) * i;
            ctx.beginPath();
            ctx.moveTo(x, pad);
            ctx.lineTo(x, h - pad);
            ctx.stroke();

            ctx.fillStyle = text;
            ctx.globalAlpha = 0.4;
            ctx.font = '600 13px Inter';
            ctx.textAlign = 'center';
            ctx.fillText('YEAR ' + (i + 1), x, h - 15);
        }
        ctx.globalAlpha = 1;

        // Revenue (dashed, lighter)
        drawCurve(revenueData, accent, 0.25, 2.5, true, pad, w, h);
        // Income (solid, prominent)
        drawCurve(incomeData, accent, 1, 4, false, pad, w, h);
    }

    function drawCurve(data, color, alpha, thickness, dashed, pad, w, h) {
        const max = 90000;
        const chartW = w - pad * 2;
        const chartH = h - pad * 2;
        
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.globalAlpha = alpha * progress.value;
        ctx.lineWidth = thickness;
        if (dashed) ctx.setLineDash([12, 8]);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        data.forEach((pt, i) => {
            const x = pad + (chartW / 2) * pt.year;
            const y = (pad + chartH) - (pt.val / max) * chartH;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.stroke();

        // Markers
        data.forEach(pt => {
            const x = pad + (chartW / 2) * pt.year;
            const y = (pad + chartH) - (pt.val / max) * chartH;
            ctx.beginPath();
            ctx.fillStyle = color;
            ctx.arc(x, y, thickness * 1.8, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.restore();
    }

    window.addEventListener('resize', resize);
    resize();
}
