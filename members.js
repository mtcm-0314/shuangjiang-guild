// 成员列表从配置文件加载
// 配置文件由 generate_members.py 自动生成
const members = typeof membersConfig !== 'undefined' ? membersConfig : [];

// 动态生成成员卡片
function loadMembers(filter = '') {
    const grid = document.getElementById('members-grid');
    grid.innerHTML = '';
    
    const filteredMembers = members.filter(member => 
        member.name.toLowerCase().includes(filter.toLowerCase()) ||
        member.role.toLowerCase().includes(filter.toLowerCase())
    );
    
    if (filteredMembers.length === 0) {
        grid.innerHTML = '<p class="no-results">没有找到匹配的成员</p>';
        return;
    }
    
    filteredMembers.forEach(member => {
        const card = document.createElement('div');
        card.className = 'member-card';
        
        const roleClass = member.role === '会长' ? 'role-leader' : 
                         member.role === '副会长' ? 'role-vice' : 'role-member';
        
        card.innerHTML = `
            <div class="member-card-image">
                <img src="members/${member.file}.jpg" alt="${member.name}" 
                     onerror="this.src='members/${member.file}.png'; this.onerror=function(){this.src='assets/1.png'};"
                     onload="this.classList.add('loaded')">
            </div>
            <span class="member-role ${roleClass}">${member.role}</span>
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

// 搜索功能
function initSearch() {
    const searchInput = document.getElementById('member-search');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            loadMembers(this.value);
        });
    }
}

// 页面加载时执行
document.addEventListener('DOMContentLoaded', function() {
    loadMembers();
    initSearch();
});
