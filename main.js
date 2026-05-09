// --- Animations ---
const revealElements = document.querySelectorAll('.reveal');

const showReveal = () => {
    revealElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('active');
        }, index * 150);
    });
};

window.addEventListener('load', showReveal);

// --- Download Logic ---
const deviceList = document.getElementById('device-list');
const downloadBtn = document.getElementById('download-btn');

deviceList.addEventListener('change', (e) => {
    if (e.target.value) {
        downloadBtn.classList.add('active');
    } else {
        downloadBtn.classList.remove('active');
    }
});

downloadBtn.addEventListener('click', () => {
    const url = deviceList.value;
    if (url) {
        downloadBtn.textContent = 'Redirecting...';
        setTimeout(() => {
            window.location.href = url;
            downloadBtn.textContent = 'Initiate Download';
        }, 1500);
    }
});

// --- Modal Logic ---
const deviceModal = document.getElementById('device-modal');
const advantagesModal = document.getElementById('advantages-modal');

const closeDeviceBtn = document.getElementById('close-device');
const closeAdvantagesBtn = document.getElementById('close-advantages');

const innovationLink = document.getElementById('innovation-link');
const deviceCards = document.querySelectorAll('.device-card');

// Open Device Details
deviceCards.forEach(card => {
    card.addEventListener('click', () => {
        const name = card.getAttribute('data-name');
        const codename = card.getAttribute('data-codename');
        
        document.getElementById('modal-device-name').textContent = name;
        document.getElementById('modal-device-codename').textContent = codename;
        
        const specs = [
            { label: 'CPU', value: card.getAttribute('data-cpu') },
            { label: 'Cores', value: card.getAttribute('data-cores') },
            { label: 'Peak Clock', value: card.getAttribute('data-clock') },
            { label: 'GPU Engine', value: card.getAttribute('data-gpu') },
            { label: 'Display', value: card.getAttribute('data-screen') },
            { label: 'Power', value: card.getAttribute('data-battery') },
            { label: 'Camera', value: card.getAttribute('data-camera') }
        ];
        
        const specsList = document.getElementById('modal-specs-list');
        specsList.innerHTML = specs.map(spec => `
            <div class="spec-item">
                <span class="spec-label">${spec.label}</span>
                <span class="spec-value">${spec.value}</span>
            </div>
        `).join('');
        
        deviceModal.style.display = 'flex';
    });
});

// Open Innovation Hub
innovationLink.addEventListener('click', (e) => {
    e.preventDefault();
    advantagesModal.style.display = 'flex';
});

// Close Modals
[closeDeviceBtn, closeAdvantagesBtn].forEach(btn => {
    btn.addEventListener('click', () => {
        deviceModal.style.display = 'none';
        advantagesModal.style.display = 'none';
    });
});

window.addEventListener('click', (e) => {
    if (e.target === deviceModal || e.target === advantagesModal) {
        deviceModal.style.display = 'none';
        advantagesModal.style.display = 'none';
    }
});

// --- Parallax Effect ---
document.addEventListener('mousemove', (e) => {
    // Skip parallax on mobile to prevent lag
    if (window.innerWidth < 768) return;

    const x = (window.innerWidth / 2 - e.pageX) / 60;
    const y = (window.innerHeight / 2 - e.pageY) / 60;

    const hero = document.querySelector('.hero');
    const cards = document.querySelectorAll('.device-card');

    if (hero) hero.style.transform = `translate(${x}px, ${y}px)`;
    cards.forEach(card => {
        card.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
    });
});
