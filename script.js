/* =============================================
   CIA DOS VENTOS - LANDING PAGE PÁSCOA 2026
   JavaScript - Interatividade
   ============================================= */

// --- NAVBAR SCROLL ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// --- HAMBURGER MENU ---
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
});

// Fechar menu ao clicar num link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
    });
});

// --- FAQ ACCORDION ---
document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const answer = item.querySelector('.faq-answer');
        const isOpen = item.classList.contains('open');

        // Fechar todos
        document.querySelectorAll('.faq-item').forEach(i => {
            i.classList.remove('open');
            i.querySelector('.faq-answer').classList.remove('open');
            i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        });

        // Abrir o clicado (se estava fechado)
        if (!isOpen) {
            item.classList.add('open');
            answer.classList.add('open');
            btn.setAttribute('aria-expanded', 'true');
        }
    });
});

// --- SCROLL REVEAL ---
const reveals = document.querySelectorAll(
    '.feature-card, .diferencial-item, .sobre-card, .faq-item, .sinopse-card, .info-card, .urgency-box, .gallery-main, .gallery-side'
);

reveals.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, (entry.target.dataset.delay || 0) * 1);
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
);

reveals.forEach((el, i) => {
    el.dataset.delay = i * 80;
    observer.observe(el);
});

// --- CONTACT FORM (WhatsApp) ---
const form = document.getElementById('contactForm');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nome = document.getElementById('nome').value.trim();
        const cidade = document.getElementById('cidade').value.trim();
        const email = document.getElementById('email').value.trim();
        const interesse = document.getElementById('interesse');
        const interesseText = interesse.options[interesse.selectedIndex].text;
        const mensagem = document.getElementById('mensagem').value.trim();

        if (!nome || !cidade || !email || !interesse.value) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        const text = `🐰 *Olá, Cia dos Ventos!*\n\nMeu nome é *${nome}* e estou entrando em contato pela landing page.\n\n📍 *Cidade:* ${cidade}\n📧 *E-mail:* ${email}\n🎯 *Interesse:* ${interesseText}\n\n${mensagem ? `💬 *Mensagem:*\n${mensagem}` : ''}`;

        const whatsappURL = `https://wa.me/55?text=${encodeURIComponent(text)}`;
        window.open(whatsappURL, '_blank');
    });
}

// --- ACTIVE NAV LINK ---
const sections = document.querySelectorAll('section[id]');

const navObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                document.querySelectorAll('.nav-links a').forEach(a => {
                    a.style.color = '';
                    if (a.getAttribute('href') === `#${id}`) {
                        a.style.color = 'var(--orange)';
                    }
                });
            }
        });
    },
    { threshold: 0.5 }
);

sections.forEach(s => navObserver.observe(s));
