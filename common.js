// 通用功能脚本

// 返回顶部按钮
function initBackToTop() {
    const btn = document.createElement('button');
    btn.className = 'back-to-top';
    btn.innerHTML = '↑';
    btn.title = '返回顶部';
    document.body.appendChild(btn);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });
    
    btn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// 高亮当前页面导航
function highlightCurrentNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// 页面加载动画 - 优化：去掉强制等待
function initPageLoader() {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <h2>霜降百业</h2>
            <div class="loader-spinner"></div>
        </div>
    `;
    document.body.prepend(loader);
    
    // 页面加载完立即隐藏，不再强制等500ms
    window.addEventListener('load', function() {
        loader.classList.add('hidden');
    });
}

// 深色模式 - 放在导航栏里
function initThemeToggle() {
    const nav = document.querySelector('nav');
    if (!nav) return;
    
    const btn = document.createElement('button');
    btn.className = 'theme-btn-nav';
    btn.title = '切换主题';
    btn.textContent = '🌙';
    nav.appendChild(btn);
    
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        btn.textContent = '☀️';
    }
    
    btn.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        btn.textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

// 粒子背景 - 优化版本，减少粒子数量
function initParticles() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particles-canvas';
    document.body.prepend(canvas);
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: -10,
            size: Math.random() * 2 + 1,
            speedY: Math.random() * 0.8 + 0.3,
            speedX: Math.random() * 0.4 - 0.2,
            opacity: Math.random() * 0.4 + 0.2
        };
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 减少粒子数量：最多20个，生成概率降低
        if (particles.length < 20 && Math.random() > 0.98) {
            particles.push(createParticle());
        }
        
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.y += p.speedY;
            p.x += p.speedX;
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
            ctx.fill();
            
            if (p.y > canvas.height) {
                particles.splice(i, 1);
            }
        }
        
        animationId = requestAnimationFrame(animate);
    }
    
    // 页面不可见时暂停动画
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            animate();
        }
    });
    
    resize();
    window.addEventListener('resize', resize);
    animate();
}

// 初始化所有通用功能
document.addEventListener('DOMContentLoaded', function() {
    initBackToTop();
    highlightCurrentNav();
    initThemeToggle();
    initParticles();
    initScrollHeader();
    initRippleEffect();
    initTiltEffect();
});

// 导航栏滚动变化
function initScrollHeader() {
    const header = document.querySelector('header');
    if (!header) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// 按钮点击波纹效果
function initRippleEffect() {
    const buttons = document.querySelectorAll('button, .view-detail-btn, #cta-button, .nav-member-btn, .back-button');
    
    buttons.forEach(btn => {
        btn.classList.add('ripple-btn');
        btn.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// 图片3D倾斜效果
function initTiltEffect() {
    const cards = document.querySelectorAll('.member-card-image');
    
    cards.forEach(card => {
        const img = card.querySelector('img');
        if (!img) return;
        
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            img.style.transform = `scale(1.05) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', function() {
            img.style.transform = 'scale(1) rotateX(0) rotateY(0)';
        });
    });
}
