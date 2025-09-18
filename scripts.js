// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Show loading screen
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading';
    loadingScreen.innerHTML = `
        <div class="loader"></div>
    `;
    document.body.prepend(loadingScreen);

    // Hide loading screen when everything is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            // Remove loading screen after animation completes
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 1000);
    });

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Update URL without page jump
                history.pushState(null, null, targetId);
            }

// Theme toggle with persistence
function initThemeToggle() {
    const html = document.documentElement;
    const key = 'theme';
    const buttons = [
        document.getElementById('theme-toggle'),
        document.getElementById('theme-toggle-mobile'),
    ].filter(Boolean);

    const setIcons = (mode) => {
        const icon = mode === 'light' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        buttons.forEach(btn => (btn.innerHTML = icon));
    };

    const setTheme = (mode) => {
        const themeValue = mode === 'light' ? 'light' : 'aurora';
        html.setAttribute('data-theme', themeValue);
        localStorage.setItem(key, themeValue);
        setIcons(themeValue === 'light' ? 'light' : 'aurora');
    };

    // Initialize from storage (default to aurora)
    const saved = localStorage.getItem(key);
    if (saved === 'light' || saved === 'aurora') {
        html.setAttribute('data-theme', saved);
        setIcons(saved === 'light' ? 'light' : 'aurora');
    } else {
        setTheme('aurora');
    }

    // Wire up both buttons
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const current = html.getAttribute('data-theme') === 'light' ? 'light' : 'aurora';
            setTheme(current === 'light' ? 'aurora' : 'light');
        });
    });
}

// Fetch resume JSON with fallback
async function fetchResume() {
    try {
        const res = await fetch('/api/resume', { cache: 'no-store' });
        if (!res.ok) throw new Error('API failed');
        return await res.json();
    } catch (e) {
        // Fallback to local file for static hosting
        const resLocal = await fetch('resume.json');
        return await resLocal.json();
    }
}

function renderProjects(projects) {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;
    grid.innerHTML = '';
    projects.forEach((p, idx) => {
        const card = document.createElement('div');
        card.className = 'project-card group relative bg-gray-800 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2';
        card.setAttribute('data-aos', 'zoom-in');
        if (idx) card.setAttribute('data-aos-delay', String(idx * 100));
        const image = `https://via.placeholder.com/600x400/0f172a/64748b?text=${encodeURIComponent(p.name || 'Project')}`;
        const desc = Array.isArray(p.description) ? p.description.join(' ') : (p.description || '');
        card.innerHTML = `
            <div class="relative overflow-hidden">
                <img src="${image}" alt="${p.name || 'Project'}" class="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110">
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                    <div>
                        <h3 class="text-xl font-bold text-white mb-2">${p.name || 'Project'}</h3>
                        <p class="text-gray-300 text-sm">${desc.substring(0, 120)}${desc.length > 120 ? '…' : ''}</p>
                    </div>
                </div>
            </div>
            <div class="p-6">
                <div class="flex space-x-4">
                    <a href="#" class="text-cyan-400 hover:text-cyan-300 transition-colors"><i class="fab fa-github text-lg"></i></a>
                    <a href="#" class="text-cyan-400 hover:text-cyan-300 transition-colors"><i class="fas fa-external-link-alt"></i></a>
                </div>
            </div>`;
        grid.appendChild(card);
    });
}

function renderEducation(education) {
    const list = document.getElementById('education-list');
    if (!list) return;
    list.innerHTML = '';
    education.forEach((e, idx) => {
        const item = document.createElement('div');
        item.className = 'relative pl-8 mb-12';
        item.setAttribute('data-aos', idx % 2 === 0 ? 'fade-right' : 'fade-left');
        item.innerHTML = `
            <div class="absolute left-0 top-1 w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center">
                <i class="fas fa-graduation-cap text-white text-xs"></i>
            </div>
            <div class="bg-gray-800 p-6 rounded-lg shadow-lg border-l-4 border-cyan-500">
                <h3 class="text-xl font-bold text-cyan-400">${e.degree || ''}</h3>
                <p class="text-gray-400">${e.institution || ''}</p>
                <p class="text-sm text-gray-500 mb-4">${e.duration || ''} | ${e.score || ''} ${e.location ? '| ' + e.location : ''}</p>
                ${e.coursework ? `<p class="text-gray-300">${e.coursework}</p>` : ''}
            </div>`;
        list.appendChild(item);
    });
}

async function initDynamicContent() {
    try {
        const resume = await fetchResume();
        if (resume.projects) renderProjects(resume.projects);
        if (resume.education) renderEducation(resume.education);
        if (window.AOS && typeof AOS.refresh === 'function') {
            setTimeout(() => AOS.refresh(), 100);
        }
    } catch (e) {
        console.warn('Dynamic content load failed', e);
    }
}

// Header shadow
function initHeaderShadow() {
    const header = document.getElementById('header');
    if (!header) return;
    const toggle = () => {
        if (window.scrollY > 10) {
            header.classList.add('shadow-lg', 'shadow-black/20');
        } else {
            header.classList.remove('shadow-lg', 'shadow-black/20');
        }
    };
    toggle();
    window.addEventListener('scroll', toggle);
}

// Active nav link
function initActiveNav() {
    const links = document.querySelectorAll('.nav-link');
    const sections = Array.from(document.querySelectorAll('section[id]'));
    if (!links.length || !sections.length) return;

    const setActive = () => {
        const pos = window.scrollY + 120; // account for fixed header
        let currentId = sections[0].id;
        sections.forEach(sec => {
            if (sec.offsetTop <= pos) currentId = sec.id;
        });
        links.forEach(a => {
            const href = a.getAttribute('href') || '';
            const id = href.startsWith('#') ? href.substring(1) : '';
            if (id && id === currentId) a.classList.add('text-white'); else a.classList.remove('text-white');
        });
    };
    setActive();
    window.addEventListener('scroll', setActive);
}

// Role rotator
function initRoleRotator() {
    const el = document.getElementById('role-rotator');
    if (!el) return;
    const roles = [
        'Software Engineer',
        'Full-Stack Developer',
        'Systems Programmer',
        'Open Source Contributor',
        'Performance Optimizer'
    ];
    let i = 0;
    setInterval(() => {
        i = (i + 1) % roles.length;
        el.style.opacity = '0';
        setTimeout(() => {
            el.textContent = roles[i];
            el.style.opacity = '1';
        }, 250);
    }, 2500);
}

// Resume download
function initResumeDownload() {
    const btn = document.getElementById('download-cv-btn');
    if (!btn) return;
    btn.addEventListener('click', async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/resume');
            if (!res.ok) throw new Error('Failed to fetch resume');
            const data = await res.json();
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Jitin-Resume.json';
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error(err);
            alert('Could not download resume right now. Please try again later.');
        }
    });
}
        });
    });

    // Initialize Three.js for background (do not let failures break the page)
    try {
        initThreeJS();
    } catch (e) {
        console.warn('Three.js initialization failed:', e);
        const canvas = document.getElementById('bg-canvas');
        if (canvas) canvas.style.display = 'none';
    }
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize interactive elements
    initInteractiveElements();

    // Ensure broken images and backgrounds show placeholders
    initImageFallbacks();

    // Header shadow on scroll
    initHeaderShadow();

    // Active nav highlight
    initActiveNav();

    // Hero role rotator
    initRoleRotator();

    // Download CV button
    initResumeDownload();

    // Theme toggle
    initThemeToggle();

    // Dynamic content from resume
    initDynamicContent();
});

// Three.js Background Animation
function initThreeJS() {
    // Check if WebGL is supported and WEBGL helper exists
    if (typeof WEBGL !== 'undefined' && WEBGL && typeof WEBGL.isWebGLAvailable === 'function') {
        if (!WEBGL.isWebGLAvailable()) {
            document.getElementById('bg-canvas').style.display = 'none';
            return;
        }
    } else {
        // Fallback: basic WebGL capability check
        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            if (!gl) {
                document.getElementById('bg-canvas').style.display = 'none';
                return;
            }
        } catch (_) {
            document.getElementById('bg-canvas').style.display = 'none';
            return;
        }
    }
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
        canvas: document.getElementById('bg-canvas'), 
        alpha: true,
        antialias: true
    });
    
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    // Create particle system
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 1500;
    const posArray = new Float32Array(particleCount * 3);
    const scaleArray = new Float32Array(particleCount);
    const speedArray = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
        // Position particles in a sphere
        const radius = Math.random() * 100 + 50;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        
        posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
        posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
        posArray[i + 2] = radius * Math.cos(phi);
        
        // Random scale and speed
        scaleArray[i/3] = Math.random() * 1.5 + 0.5;
        speedArray[i/3] = Math.random() * 0.002 + 0.001;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('scale', new THREE.BufferAttribute(scaleArray, 1));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 1.5,
        color: 0x00ffcc,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 50;

    // Handle window resize
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', onWindowResize, false);

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Animate particles
        const positions = particlesGeometry.attributes.position.array;
        for (let i = 0; i < particleCount * 3; i += 3) {
            // Move particles in a spiral pattern
            const speed = speedArray[i/3];
            positions[i] += Math.sin(Date.now() * speed) * 0.01;
            positions[i + 1] += Math.cos(Date.now() * speed) * 0.01;
            positions[i + 2] += Math.sin(Date.now() * speed * 0.5) * 0.01;
        }
        particlesGeometry.attributes.position.needsUpdate = true;
        
        // Rotate the entire particle system
        particlesMesh.rotation.x += 0.0005;
        particlesMesh.rotation.y += 0.001;
        
        renderer.render(scene, camera);
    }
    
    animate();
}

// Initialize scroll animations
function initScrollAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('section-title')) {
                    entry.target.classList.add('visible');
                } else if (entry.target.classList.contains('card')) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, entry.target.dataset.delay || 0);
                }
            }
        });
    }, observerOptions);

    // Observe all section titles and cards
    document.querySelectorAll('.section-title, .card').forEach((el, index) => {
        if (el.classList.contains('card')) {
            el.style.transitionDelay = `${index * 0.1}s`;
            el.dataset.delay = index * 100;
        }
        observer.observe(el);
    });
}

// Initialize interactive elements
function initInteractiveElements() {
    // Add hover effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
            
            // Add shine effect
            const shine = card.querySelector('.shine');
            if (shine) {
                const posX = (x / rect.width) * 100;
                const posY = (y / rect.height) * 100;
                shine.style.background = `radial-gradient(circle at ${posX}% ${posY}%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)`;
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            const shine = card.querySelector('.shine');
            if (shine) {
                shine.style.background = 'none';
            }
        });
    });
    
    // Add click effect to buttons
    const buttons = document.querySelectorAll('button, .btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 300);
        });
    });
}

// Add a simple typing effect for the hero section
document.addEventListener('DOMContentLoaded', () => {
    const heroText = document.querySelector('.hero-text');
    if (heroText) {
        const text = heroText.textContent;
        heroText.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        typeWriter();
    }
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Add any additional initialization code here
    initImageFallbacks();
});

// Image and background fallbacks
function initImageFallbacks() {
    const PLACEHOLDER_IMG = 'assets/placeholder-image.svg';
    const PLACEHOLDER_AVATAR = 'assets/placeholder-avatar.svg';

    // Add onerror fallback and lazy loading to all <img>
    document.querySelectorAll('img').forEach(img => {
        // Enable lazy loading for perf
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
        const isAvatar = /profile|avatar|user|photo|headshot/i.test(img.alt || '') || /avatar|profile/i.test(img.src);
        const fallbackSrc = isAvatar ? PLACEHOLDER_AVATAR : PLACEHOLDER_IMG;

        // Prevent infinite loop by marking when we've already swapped
        img.addEventListener('error', function onImgError() {
            if (img.dataset.fallbackApplied === 'true') return;
            img.dataset.fallbackApplied = 'true';
            img.src = fallbackSrc;
        }, { once: true });
    });

    // Background image fallback for the contact section
    const contactBg = document.getElementById('contact-bg');
    if (contactBg) {
        // Extract background-image URL from computed style (tailwind arbitrary value)
        const style = window.getComputedStyle(contactBg);
        const bgImg = style.backgroundImage;
        const match = bgImg && bgImg.match(/url\("?(.*?)"?\)/);
        const url = match && match[1];
        if (url) {
            const img = new Image();
            img.onload = () => {
                // do nothing, it loaded fine
            };
            img.onerror = () => {
                contactBg.style.backgroundImage = `url('${PLACEHOLDER_IMG}')`;
                contactBg.classList.add('opacity-20');
            };
            img.src = url;
        }
    }
}