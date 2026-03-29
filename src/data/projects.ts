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
    id: "aarya-ai-chatbot",
    title: "Aarya — Multi-Agent AI Chatbot",
    description: "Production multi-agent chatbot powered by a custom embedded RAG pipeline (LangChain + Redis Stack vector store + OpenAI/Llama) with a FastAPI serving layer. Automated over 80% of internal onboarding workflows and external customer queries, reducing manual intervention from 15 minutes to under 2 minutes. Includes GRPO fine-tuning with LLM-as-a-Judge reward and Llama Guard for enterprise compliance.",
    technologies: ["LangChain", "LangGraph", "Redis Stack", "FastAPI", "Llama 3", "OpenAI API", "GRPO", "Llama Guard"],
    year: "2023"
  },
  {
    id: "langgraph-multi-agent",
    title: "LangGraph Multi-Agent Orchestration",
    description: "Architected multi-agent orchestration systems using LangGraph with supervisor and handoff patterns, enabling complex multi-step workflows — including automated product creation via text/voice prompts and a market analysis bot. Reduced execution time from 10 minutes to under 2 minutes. Built MCP servers using FastAPI for tool-use integrations with OpenAI SDK and Anthropic SDK.",
    technologies: ["LangGraph", "LangChain", "FastAPI", "MCP", "OpenAI SDK", "Anthropic SDK", "Phi-4"],
    year: "2024"
  },
  {
    id: "llm-inference-infra",
    title: "High-Throughput LLM Inference Infrastructure",
    description: "Engineered a scalable hybrid serving infrastructure using vLLM and SGLang with optimized model quantization (AWQ/INT4) and KV cache management, processing 2B–10B tokens at a sustained 8–20 TPS. Implemented continuous batching and model sharding to maximize GPU utilization for concurrent inference across multiple model variants on Docker + Kubernetes with AWS.",
    technologies: ["vLLM", "SGLang", "AWQ/INT4", "Docker", "Kubernetes", "AWS", "Python"],
    year: "2024"
  },
  {
    id: "visual-search-system",
    title: "Visual Search System",
    description: "Designed and deployed a visual search system using representation learning: trained CNN/ViT-based encoders with contrastive loss (SimCLR-style) to produce image embeddings, enabling similarity-based retrieval via cosine similarity and ANN indexing across 100K+ product images. Integrated Faiss/ScaNN for sub-100ms p95 retrieval latency.",
    technologies: ["PyTorch", "SimCLR", "ViT", "Faiss", "ScaNN", "Python", "FastAPI"],
    year: "2023"
  },
  {
    id: "harmful-content-detection",
    title: "Harmful Content Detection System",
    description: "Built a harmful content detection system using a multi-task DNN with multimodal feature fusion — combining text embeddings (BERT/DistilBERT) and image embeddings (CLIP/SimCLR). Integrated violation enforcement and content demoting services with confidence-based routing for automated moderation at scale.",
    technologies: ["PyTorch", "BERT", "DistilBERT", "CLIP", "Multi-Task DNN", "Python", "FastAPI"],
    year: "2023"
  },
  {
    id: "recommendation-engine",
    title: "Content Recommendation Engine",
    description: "Architected a content recommendation engine using a two-tower neural network (user encoder + item encoder) with dot-product similarity scoring. Implemented candidate generation via approximate nearest neighbor (ANN) search followed by a multi-stage re-ranking pipeline. Also developed a People You May Know (PYMK) system using Graph Neural Networks for social graph edge prediction.",
    technologies: ["PyTorch", "Two-Tower Network", "GNN", "Faiss", "Apache Spark", "Airflow"],
    year: "2022"
  }
];
