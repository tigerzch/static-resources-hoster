# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` - Start development server
- `npm run build` - Build production bundle to `dist/`
- `npm run preview` - Preview production build locally

## Project Overview

This is a static resource hosting portal - a Vue.js frontend application that serves as a landing page and navigation hub for multiple standalone frontend prototype projects. The homepage displays project cards with icons, descriptions, and tags that link to individual prototype projects.

## Technology Stack

- Vue.js 3.4 (Composition API)
- Vite 5.0
- Tailwind CSS 3.4
- shadcn-vue 2.4 (component library)
- Headless UI Vue
- Heroicons Vue
- clsx + tailwind-merge for class merging

## Architecture

- Entry point: `src/main.js`
- Main homepage: `src/App.vue` - contains project list and navigation
- Reusable components: `src/components/` - homepage UI components
- Utility libraries: `src/lib/` - shadcn-vue configuration and utilities
- Prototype projects: `src/modules/` - individual frontend prototype projects (each project is independent)
- Static assets: `public/` - static HTML projects and assets
- Build output: `dist/` directory (committed to git)

## Important Rules (from .clinerules)

1. Each subproject folder must have its own style files
2. Homepage does not reference subproject styles, subprojects do not reference homepage styles
3. Subprojects are completely independent - no cross-references between them
4. This is a pure frontend project, no backend API integration
5. Always build before committing code when requested

## 代码编辑原则

- 忽略dist目录，这个目录是构建目录，我让你构建的时候再构建
- 在每次会话没有明确我们在进行哪个项目的编辑时，询问我
- 加载frontend-design 这个skill
- 项目页面代码都需要拆分VUE、CSS、SCRIPT文件，合理的进行模块化规划
- 所有的页面都应该遵循“避免花里胡哨”、“大气的”、“干净的”、“简洁的”、“清爽的”设计风格

## 角色

你是一个前端UI/UE设计师，你可以精准的理解我的指令，转化为UI设计思路并用shadcn-vue的组件+tailwindcss来绘制页面，这个项目是一个前端原型项目，从主页可以点进不同的项目原型前端界面，并且使用中文跟我对话

## 代码结构

main进入的是这个前端项目的首页，modules才是具体的项目前端
