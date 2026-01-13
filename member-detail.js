// 成员列表从配置文件加载
const members = typeof membersConfig !== 'undefined' ? membersConfig : [];

// 从URL获取成员信息
function getMemberFromURL() {
    const params = new URLSearchParams(window.location.search);
    return {
        file: params.get('member'),
        name: params.get('name')
    };
}

// 获取当前成员在列表中的索引
function getCurrentMemberIndex() {
    const member = getMemberFromURL();
    return members.findIndex(m => m.file === member.file);
}

// 导航到上一个/下一个成员
function navigateToMember(direction) {
    const currentIndex = getCurrentMemberIndex();
    if (currentIndex === -1) return;
    
    const newIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex >= 0 && newIndex < members.length) {
        const newMember = members[newIndex];
        window.location.href = `member-detail.html?member=${newMember.file}&name=${encodeURIComponent(newMember.name)}`;
    }
}

// 更新导航按钮状态
function updateNavigationButtons() {
    const currentIndex = getCurrentMemberIndex();
    const prevBtn = document.getElementById('prev-member');
    const nextBtn = document.getElementById('next-member');
    
    if (prevBtn && nextBtn) {
        prevBtn.disabled = currentIndex <= 0;
        nextBtn.disabled = currentIndex >= members.length - 1;
        
        prevBtn.onclick = () => navigateToMember('prev');
        nextBtn.onclick = () => navigateToMember('next');
    }
}

// 加载成员详情
async function loadMemberDetail() {
    const member = getMemberFromURL();
    
    if (!member.file || !member.name) {
        document.getElementById('member-name').textContent = '未找到成员信息';
        document.getElementById('member-description').innerHTML = '<p>请从成员列表页面选择成员。</p>';
        return;
    }
    
    // 设置成员名字
    const nameEl = document.getElementById('member-name');
    const isSpecial = member.file === 'member2';
    nameEl.textContent = decodeURIComponent(member.name);
    if (isSpecial) {
        nameEl.classList.add('special-member-name');
    }
    document.title = `${decodeURIComponent(member.name)} - 成员详情`;
    
    // 加载图片（支持jpg和png格式）
    const img = document.getElementById('member-image');
    const loader = document.querySelector('.image-loader');
    
    img.onload = function() {
        this.style.display = 'block';
        if (loader) loader.style.display = 'none';
    };
    
    img.src = `members/${member.file}.jpg`;
    img.alt = decodeURIComponent(member.name);
    img.onerror = function() {
        this.src = `members/${member.file}.png`;
        this.onerror = function() {
            this.src = 'assets/1.png';
        };
    };
    
    // 加载文本介绍（跳过前两行：名字和职位）
    try {
        const response = await fetch(`members/${member.file}.txt`);
        if (response.ok) {
            const text = await response.text();
            const lines = text.split('\n').slice(2).filter(line => line.trim());
            const descEl = document.getElementById('member-description');
            descEl.innerHTML = lines.map(line => `<p>${line}</p>`).join('');
            // 薯薯条专属渐变文字
            if (isSpecial) {
                descEl.classList.add('special-member-description');
            }
        } else {
            document.getElementById('member-description').innerHTML = 
                '<p>暂无个人介绍。</p>';
        }
    } catch (error) {
        document.getElementById('member-description').innerHTML = 
            '<p>加载介绍失败，请稍后再试。</p>';
        console.error('加载成员介绍失败:', error);
    }
    
    // 更新导航按钮
    updateNavigationButtons();
}

// 页面加载时执行
document.addEventListener('DOMContentLoaded', loadMemberDetail);
