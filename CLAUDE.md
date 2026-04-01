# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` - Start development server
- `npm run build` - Build production bundle to `dist/`
- `npm run preview` - Preview production build locally

## Project Overview

This is a static resource hosting portal - a Vue.js frontend application that serves as a landing page and navigation hub for multiple standalone static HTML projects. The application displays project cards with icons, descriptions, and tags that link directly to static HTML applications hosted in the `public/` directory.

## Technology Stack

- Vue.js 3.4 (Composition API)
- Vite 5.0
- Tailwind CSS 3.4
- Headless UI Vue
- Heroicons Vue

## Architecture

- Main app: `src/App.vue` - contains the project list and navigation
- Project cards: `src/components/ProjectCard.vue` - reusable card component
- Static projects: hosted in `public/` directory (e.g., `public/XTALE/`)
- Build output: `dist/` directory (committed to git)

## Important Rules (from .clinerules)

1. Each subproject folder must have its own style files
2. Homepage does not reference subproject styles, subprojects do not reference homepage styles
3. Subprojects are completely independent - no cross-references between them
4. This is a pure frontend project
5. Always build before committing code

## 代码编辑原则
- 忽略dist目录，这个目录是构建目录，我让你构建的时候再构建
- 在每次会话没有明确我们在进行哪个项目的编辑时，询问我
- 尽量用shadcn-vue的组件+tailwindcss来绘制页面
- 加载frontend-design 这个skill