# -*- coding: utf-8 -*-
"""
成员配置自动生成脚本
使用方法：
1. 在 members 文件夹中添加成员文件（如 member5.txt 和 member5.jpg/png）
2. txt 文件第一行是成员名字，第二行是职位（会长/副会长/成员），后面是介绍
3. 运行此脚本：python generate_members.py
4. 推送到 GitHub：git add . && git commit -m "更新成员" && git push
"""

import os
import re
import json

def scan_members():
    """扫描 members 文件夹，获取所有成员信息"""
    members_dir = 'members'
    members = []
    
    if not os.path.exists(members_dir):
        print(f"错误：找不到 {members_dir} 文件夹")
        return []
    
    # 查找所有 txt 文件
    txt_files = [f for f in os.listdir(members_dir) if f.endswith('.txt')]
    
    for txt_file in txt_files:
        # 提取文件名（不含扩展名）
        file_base = txt_file[:-4]  # 去掉 .txt
        
        # 检查是否有对应的图片
        has_image = False
        for ext in ['.jpg', '.png', '.jpeg', '.gif', '.webp']:
            if os.path.exists(os.path.join(members_dir, file_base + ext)):
                has_image = True
                break
        
        if not has_image:
            print(f"警告：{file_base} 没有对应的图片文件，跳过")
            continue
        
        # 读取 txt 文件获取成员信息
        txt_path = os.path.join(members_dir, txt_file)
        try:
            with open(txt_path, 'r', encoding='utf-8') as f:
                lines = f.readlines()
            
            if len(lines) >= 1:
                name = lines[0].strip()
                # 第二行是职位，默认为"成员"
                role = lines[1].strip() if len(lines) >= 2 else '成员'
                # 验证职位
                if role not in ['会长', '副会长', '成员']:
                    role = '成员'
                
                members.append({
                    'name': name,
                    'file': file_base,
                    'role': role
                })
                print(f"✓ 找到成员：{name} ({role})")
            else:
                print(f"警告：{txt_file} 内容为空，跳过")
        except Exception as e:
            print(f"错误：读取 {txt_file} 失败 - {e}")
    
    # 按文件名中的数字排序
    def get_number(m):
        match = re.search(r'\d+', m['file'])
        return int(match.group()) if match else 0
    
    members.sort(key=get_number)
    
    return members

def generate_config(members):
    """生成 members-config.js 文件"""
    if not members:
        print("没有找到任何成员")
        return
    
    # 生成 JavaScript 配置
    js_content = f"""// 此文件由 generate_members.py 自动生成
// 请勿手动修改，添加成员后运行脚本重新生成

const membersConfig = {json.dumps(members, ensure_ascii=False, indent=4)};
"""
    
    with open('members-config.js', 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    print(f"\n✓ 已生成 members-config.js，共 {len(members)} 位成员")

def main():
    print("=" * 50)
    print("霜降百业 - 成员配置生成器")
    print("=" * 50)
    print()
    
    members = scan_members()
    generate_config(members)
    
    print()
    
    # 自动执行 git 上传
    print("正在上传到 GitHub...")
    os.system('git add .')
    os.system('git commit -m "更新成员配置"')
    result = os.system('git push')
    
    if result == 0:
        print("\n✓ 上传成功！网站将在几分钟后更新。")
    else:
        print("\n✗ 上传失败，请检查网络连接或手动执行 git push")

if __name__ == '__main__':
    main()
