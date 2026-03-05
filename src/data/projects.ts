export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  year: string;
}

export const projects: Project[] = [
  {
    id: "llm-agent-framework",
    title: "Autonomous LLM Agent Framework",
    description: "A lightweight Python framework for building autonomous agents that can plan, use tools, and execute complex multi-step tasks using Gemini API.",
    technologies: ["Python", "Gemini API", "LangChain", "Docker"],
    githubUrl: "https://github.com",
    year: "2024"
  },
  {
    id: "predictive-maintenance",
    title: "Predictive Maintenance Model",
    description: "An end-to-end machine learning pipeline that predicts equipment failure in manufacturing plants using sensor data, reducing downtime by 25%.",
    technologies: ["Python", "scikit-learn", "XGBoost", "FastAPI", "React"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    year: "2023"
  },
  {
    id: "semantic-search-engine",
    title: "Semantic Document Search",
    description: "A search engine for internal company documents using vector embeddings and a custom retrieval-augmented generation (RAG) pipeline.",
    technologies: ["TypeScript", "Next.js", "Pinecone", "OpenAI API"],
    liveUrl: "https://example.com",
    year: "2023"
  }
];
