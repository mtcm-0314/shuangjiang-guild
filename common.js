// 通用功能脚本

// 返回顶部按钮
function initBackToTop() {
    // 创建按钮
    const btn = document.createElement('button');
    btn.className = 'back-to-top';
    btn.innerHTML = '↑';
    btn.title = '返回顶部';
    document.body.appendChild(btn);
    
    // 滚动显示/隐藏
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });
    
    // 点击返回顶部
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

// 页面加载动画
function initPageLoader() {
    // 创建加载器
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <h2>霜降百业</h2>
            <div class="loader-spinner"></div>
        </div>
    `;
    document.body.prepend(loader);
    
    // 页面加载完成后隐藏
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 500);
    });
}

// 初始化所有通用功能
document.addEventListener('DOMContentLoaded', function() {
    initBackToTop();
    highlightCurrentNav();
});

// 页面加载动画（需要尽早执行）
initPageLoader();
