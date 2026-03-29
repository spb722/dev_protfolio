import fm from 'front-matter';

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  summary: string;
  content: string;
  tags: string[];
}

// Dynamically import all markdown files in the blogs directory
const markdownFiles = import.meta.glob('/src/content/blogs/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

export const posts: BlogPost[] = Object.entries(markdownFiles)
  .map(([filepath, rawContent]) => {
    // Extract the folder name as the ID (e.g., /src/content/blogs/my-post/index.md -> my-post)
    const id = filepath.split('/').slice(-2, -1)[0];

    // Parse the YAML frontmatter and the markdown body
    const parsed = fm<{
      title: string;
      date: string;
      summary: string;
      tags?: string[];
    }>(rawContent as string);

    return {
      id,
      title: parsed.attributes.title,
      date: parsed.attributes.date,
      summary: parsed.attributes.summary,
      tags: parsed.attributes.tags || [],
      content: parsed.body,
    };
  })
  // Sort posts by date descending
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
