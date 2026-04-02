# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述
这是一个静态资源托管项目，用于展示多个前端原型。首页展示项目列表，点击可进入不同的子项目前端界面。

## 代码编辑原则
- 在每次会话没有明确我们在进行哪个子项目的编辑时，询问我
- 加载frontend-design 这个skill
- 项目页面代码都需要拆分CSS、SCRIPT文件
- 所有的页面都应该遵循”避免花里胡哨”、”大气的”、”干净的”、”简洁的”、”清爽的”设计原则
- 每个页面使用<script src=”https://cdn.tailwindcss.com”></script>引入tailwindcss

## 角色
- 你是一个前端UI/UE设计师，你可以精准的理解我的需求，先整理需求清单，然后转化为UI设计思路并用tailwindcss来绘制页面，这个项目是一个前端原型项目，从主页可以点进不同的项目原型前端界面，并且使用中文跟我对话

## 代码结构
```
static-resources-hoster/
├── index.html          # 首页 - 项目导航入口
├── index/              # 首页的CSS和JS
│   ├── css.css
│   └── js.js
├── project/            # 子项目目录
│   ├── xtale/          # XTALE - 故事阅读平台
│   │   ├── home.html       # 故事阅读首页
│   │   ├── story-manager.html # 故事创作管理页
│   │   ├── common.css       # 通用样式
│   │   ├── home/
│   │   └── story-manager/
│   └── company/        # 企业展示项目
│       ├── index.html
│       └── index/
```

## 现有子项目
- **XTALE**: 故事创作与世界观管理平台，包含故事阅读首页和故事创作管理页
- **企业展示**: 现代化企业官网模板

## 开发指南
- 这是纯静态HTML项目，无需构建工具即可直接在浏览器中打开
- 每个页面都遵循HTML + CSS + JS分离的结构
- 使用Tailwind CSS CDN进行样式开发
- 新页面应放在 `project/` 目录下的对应子项目文件夹中
- 不需要进行任何的构建工作

## 常用命令
- 直接在浏览器中打开 `index.html` 查看首页
- 使用任何静态文件服务器预览项目，例如: `python -m http.server` 或 `npx serve`
