// 打字机效果
const typewriterText = '团结、荣耀、共同成长';
let typewriterIndex = 0;

function typeWriter() {
    const element = document.getElementById('typewriter');
    if (!element) return;
    
    if (typewriterIndex < typewriterText.length) {
        element.textContent += typewriterText.charAt(typewriterIndex);
        typewriterIndex++;
        setTimeout(typeWriter, 150);
    } else {
        element.classList.add('done');
    }
}

// 主页按钮跳转到时间轴页面
const ctaButton = document.getElementById('cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', function() {
        window.location.href = 'timeline.html';
    });
}

// 公告数据
const announcements = [
    { date: '2026-01-13', content: '网站新增深色模式、成员搜索等功能' },
    { date: '2026-01-08', content: '霜降百业官方网站正式上线！' }
];

// 加载公告
function loadAnnouncements() {
    const list = document.getElementById('announcement-list');
    if (!list) return;
    
    announcements.forEach(item => {
        const li = document.createElement('li');
        li.className = 'announcement-item';
        li.innerHTML = `
            <span>${item.content}</span>
            <span class="announcement-date">${item.date}</span>
        `;
        list.appendChild(li);
    });
}

// 图片画廊数据（放在 assets/gallery/ 文件夹）
const galleryImages = [
    { src: 'assets/1.png', caption: '活动截图1' },
    { src: 'assets/2.jpg', caption: '活动截图2' }
];

// 加载画廊
function loadGallery() {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;
    
    galleryImages.forEach(img => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `
            <img src="${img.src}" alt="${img.caption}">
            <div class="caption">${img.caption}</div>
        `;
        item.onclick = () => openLightbox(img.src);
        grid.appendChild(item);
    });
}

// 灯箱功能
function openLightbox(src) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <span class="lightbox-close">&times;</span>
        <img src="${src}">
    `;
    document.body.appendChild(lightbox);
    
    setTimeout(() => lightbox.classList.add('active'), 10);
    
    lightbox.onclick = () => {
        lightbox.classList.remove('active');
        setTimeout(() => lightbox.remove(), 300);
    };
}

// 页面加载
document.addEventListener('DOMContentLoaded', function() {
    loadAnnouncements();
    loadGallery();
    setTimeout(typeWriter, 800);
});