// 背景音乐控制
document.addEventListener('DOMContentLoaded', function() {
    const bgm = document.getElementById('bgm');
    const musicBtn = document.getElementById('music-btn');
    const musicIcon = musicBtn.querySelector('.music-icon');
    const musicStatus = musicBtn.querySelector('.music-status');
    
    let isPlaying = false;
    
    // 从localStorage读取播放进度
    const savedTime = localStorage.getItem('bgmTime');
    if (savedTime) {
        bgm.currentTime = parseFloat(savedTime);
    }
    
    // 更新按钮显示
    function updateButton() {
        if (isPlaying) {
            musicIcon.textContent = '🎵';
            musicStatus.textContent = '暂停';
            musicBtn.classList.add('playing');
        } else {
            musicIcon.textContent = '🔇';
            musicStatus.textContent = '播放';
            musicBtn.classList.remove('playing');
        }
    }
    
    // 尝试播放音乐
    function tryPlay() {
        bgm.play().then(() => {
            isPlaying = true;
            updateButton();
        }).catch(() => {
            // 浏览器阻止了自动播放，等待用户交互
            isPlaying = false;
            updateButton();
        });
    }
    
    // 页面加载后立即尝试播放
    tryPlay();
    
    // 如果自动播放失败，用户任意点击页面时开始播放
    function playOnInteraction() {
        if (!isPlaying) {
            tryPlay();
        }
        document.removeEventListener('click', playOnInteraction);
        document.removeEventListener('touchstart', playOnInteraction);
        document.removeEventListener('keydown', playOnInteraction);
    }
    
    document.addEventListener('click', playOnInteraction);
    document.addEventListener('touchstart', playOnInteraction);
    document.addEventListener('keydown', playOnInteraction);
    
    // 点击按钮切换播放状态
    musicBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // 防止触发playOnInteraction
        if (isPlaying) {
            bgm.pause();
            isPlaying = false;
        } else {
            bgm.play();
            isPlaying = true;
        }
        updateButton();
        localStorage.setItem('bgmPlaying', isPlaying);
    });
    
    // 保存播放进度（页面切换时保持进度）
    window.addEventListener('beforeunload', function() {
        localStorage.setItem('bgmTime', bgm.currentTime);
        localStorage.setItem('bgmPlaying', isPlaying);
    });
    
    // 初始化按钮状态
    updateButton();
});
