// 百业事件时间轴数据（在这里添加新事件）
const events = [
    {
        date: '2026-01-08',
        title: '百业网站正式上线',
        description: '霜降百业官方网站正式上线，标志着百业迈向数字化管理的新时代。网站包含成员介绍、百业历程等功能，为成员提供更好的交流平台。'
    }
    // 在这里继续添加更多事件
    // {
    //     date: '2026-01-15',
    //     title: '事件标题',
    //     description: '事件描述...'
    // }
];

// 格式化日期显示
function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}年${month}月${day}日`;
}

// 动态生成时间轴
function loadTimeline() {
    const timeline = document.querySelector('.timeline');
    
    // 按日期倒序排列（最新的在上面）
    const sortedEvents = [...events].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    sortedEvents.forEach((event, index) => {
        const eventItem = document.createElement('div');
        eventItem.className = 'timeline-item';
        eventItem.style.animationDelay = `${index * 0.2}s`;
        
        eventItem.innerHTML = `
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <div class="timeline-date">${formatDate(event.date)}</div>
                <h3 class="timeline-title">${event.title}</h3>
                <p class="timeline-description">${event.description}</p>
            </div>
        `;
        
        timeline.appendChild(eventItem);
    });
}

// 页面加载时执行
document.addEventListener('DOMContentLoaded', loadTimeline);
