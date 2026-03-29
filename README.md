# Alex.dev - Personal Portfolio & Tech Blog

Welcome to the documentation for the **Alex.dev** portfolio and blog project. This document serves as a complete handover guide, explaining the architecture, the technology stack, and detailed instructions on how to manage and format content.

---

## 1. Project Overview & Technologies

This project is a modern, responsive, and highly interactive personal portfolio and blog designed for a Data Scientist / LLM Engineer. It features a custom file-system-based Content Management System (CMS) that dynamically loads blog posts from Markdown files.

### Key Features
- **Dynamic File-System CMS**: Blog posts are loaded automatically from the `src/content/blogs/` directory.
- **Dark/Light Mode**: Seamless theme switching with user preference persisted in local storage.
- **Advanced Markdown Rendering**: Supports GitHub Flavored Markdown (tables, task lists), LaTeX math equations, and syntax-highlighted code blocks.
- **Interactive Media**: Click-to-zoom functionality for all blog images.
- **Smooth Animations**: Page transitions and scroll progress indicators powered by Framer Motion.

### Tech Stack
- **Framework**: [React 18](https://react.dev/) with [Vite](https://vitejs.dev/)
- **Routing**: [React Router v6](https://reactrouter.com/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://motion.dev/) (`motion/react`)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Markdown Processing**:
  - `react-markdown`: Core markdown renderer.
  - `front-matter`: Parses YAML metadata at the top of `.md` files.
  - `remark-gfm`: Adds support for tables, strikethrough, and task lists.
  - `remark-math` & `rehype-katex`: Renders LaTeX mathematical formulas.
  - `react-syntax-highlighter`: Provides VS Code-like syntax highlighting for code blocks.
  - `react-medium-image-zoom`: Adds medium-style click-to-zoom functionality for images.

### Folder Structure
\`\`\`text
/src
├── components/       # Reusable UI components (Layout, ThemeProvider)
├── content/          
│   └── blogs/        # 📂 The CMS directory where all blog posts live
├── data/             
│   ├── posts.ts      # Dynamically loads and parses the markdown files
│   └── projects.ts   # Hardcoded portfolio projects data
├── pages/            # Page components (Home, Portfolio, Blog, BlogPost)
├── App.tsx           # Main application router
└── index.css         # Global styles and Tailwind configuration
\`\`\`

---

## 2. How to Write a New Blog Post

The blog uses a folder-based structure. The name of the folder becomes the URL slug for the post.

### Step-by-Step Guide:

1. **Create a new folder**: Navigate to `src/content/blogs/` and create a new folder with a URL-friendly name (e.g., `my-new-post`).
   - *Note: This folder name will be the URL: `yourwebsite.com/blog/my-new-post`*
2. **Create the Markdown file**: Inside that new folder, create a file named `index.md`.
3. **Add Images (Optional)**: If your post has images, drag and drop them directly into this new folder alongside the `index.md` file.
4. **Write your content**: Open `index.md`, add the required YAML frontmatter at the very top, and then write your post using Markdown.

---

## 3. Markdown Structure & Formatting Guide

Every `index.md` file **must** start with YAML frontmatter, followed by the markdown content. 

### A. The Frontmatter (Required)
This metadata tells the application the title, date, summary, and tags of the post. It must be at the very top of the file, enclosed by `---`.

\`\`\`yaml
---
title: "Your Blog Post Title"
date: "2024-03-29"
summary: "A brief 1-2 sentence description of the post that appears on the blog list page."
tags: ["Python", "Machine Learning", "Tutorial"]
---
\`\`\`

### B. Supported Markdown Formats

Below is a cheat sheet of all the advanced formatting you can use in your blog posts.

#### Headings
\`\`\`markdown
# Heading 1 (Use for main section titles)
## Heading 2 (Use for sub-sections)
### Heading 3
\`\`\`

#### Text Formatting
\`\`\`markdown
**Bold Text**
*Italic Text*
~~Strikethrough~~
\`\`\`

#### Blockquotes
Blockquotes are styled with a custom accent border and background.
\`\`\`markdown
> This is a blockquote. Use it for important callouts or quotes from papers.
\`\`\`

#### Code Blocks with Syntax Highlighting
Specify the language after the backticks for accurate highlighting (e.g., `python`, `javascript`, `bash`).
\`\`\`markdown
\```python
import pandas as pd
import numpy as np

def hello_world():
    print("Syntax highlighting adapts to dark/light mode automatically!")
\```
\`\`\`

#### Mathematical Formulas (LaTeX)
Render complex math using KaTeX.
- **Inline math**: Wrap the formula in single dollar signs: `$E = mc^2$`
- **Block math**: Wrap the formula in double dollar signs:
\`\`\`markdown
$$
\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V
$$
\`\`\`

#### Images (Co-located & Zoomable)
To add an image, place the image file in the same folder as your `index.md` file. Reference it using a relative path (`./`). The application will automatically resolve the path and make the image click-to-zoom.
\`\`\`markdown
![Description of the image](./my-diagram.png)
\`\`\`

#### Tables
Tables are fully supported and styled automatically.
\`\`\`markdown
| Model | Parameters | Open Source |
| :--- | :---: | :--- |
| GPT-4 | Unknown | No |
| Llama 3 | 8B / 70B | Yes |
\`\`\`

#### Task Lists
\`\`\`markdown
- [x] Completed task
- [ ] Pending task
\`\`\`

---

## 4. Development Instructions

To run this project locally or hand it over to another developer:

1. **Install Dependencies**:
   \`\`\`bash
   npm install
   \`\`\`
2. **Run the Development Server**:
   \`\`\`bash
   npm run dev
   \`\`\`
3. **Build for Production**:
   \`\`\`bash
   npm run build
   \`\`\`

All styling is handled via standard Tailwind CSS classes. Global theme variables (colors for dark/light mode) are defined in `src/index.css`.
