// 成员列表配置（在这里添加你的成员）
const members = [
    { name: '成员1', file: 'member1' },
    { name: '成员2', file: 'member2' },
    { name: '成员3', file: 'member3' },
    { name: '成员4', file: 'member4' }
];

// 动态生成成员卡片
function loadMembers() {
    const grid = document.getElementById('members-grid');
    
    members.forEach(member => {
        const card = document.createElement('div');
        card.className = 'member-card';
        card.innerHTML = `
            <div class="member-card-image">
                <img src="members/${member.file}.jpg" alt="${member.name}" 
                     onerror="this.src='members/${member.file}.png'; this.onerror=function(){this.src='assets/1.png'};"
                     onload="this.classList.add('loaded')">
            </div>
            <h3>${member.name}</h3>
            <button class="view-detail-btn" onclick="viewMember('${member.file}', '${member.name}')">查看详情</button>
        `;
        grid.appendChild(card);
    });
}

// 跳转到成员详情页
function viewMember(file, name) {
    window.location.href = `member-detail.html?member=${file}&name=${encodeURIComponent(name)}`;
}

// 页面加载时执行
document.addEventListener('DOMContentLoaded', loadMembers);
