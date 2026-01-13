// 主页按钮跳转到时间轴页面
const ctaButton = document.getElementById('cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', function() {
        window.location.href = 'timeline.html';
    });
}