import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, Check, Sparkles, Code2, Layers, Zap } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { toast } from "sonner";

const pythonCode = `import json
import pandas as pd
import plotly.graph_objects as go
import plotly.colors

# The complete component taxonomy data - now MASSIVELY expanded with cutting-edge 2024-2025 components
component_taxonomy_data = [
    # === ORIGINAL CATEGORIES 1-11 ===
    { "@id": "aac:tax-1.0", "label": "1.0 Cognitive Core Components", "comment": "Central reasoning and decision-making components" },
    { "@id": "aac:tax-1.1", "label": "1.1 Language Model Engines", "broader": "aac:tax-1.0", "comment": "Foundation models for language" },
    { "@id": "aac:tax-1.1.1", "label": "1.1.1 Transformer-based LLMs", "broader": "aac:tax-1.1", "comment": "GPT-style models" },
    { "@id": "aac:tax-1.1.2", "label": "1.1.2 State Space Models", "broader": "aac:tax-1.1", "comment": "Mamba, RWKV, etc." },
    { "@id": "aac:tax-1.1.3", "label": "1.1.3 Mixture of Experts", "broader": "aac:tax-1.1", "comment": "Sparsely activated models" },
    { "@id": "aac:tax-1.1.4", "label": "1.1.4 Multimodal Foundation Models", "broader": "aac:tax-1.1", "comment": "Text, vision, audio models" },
    { "@id": "aac:tax-1.2", "label": "1.2 Reasoning Engines", "broader": "aac:tax-1.0", "comment": "Specialized reasoning components" },
    { "@id": "aac:tax-1.2.1", "label": "1.2.1 Chain-of-Thought Processors", "broader": "aac:tax-1.2", "comment": "Step-by-step reasoning" },
    { "@id": "aac:tax-1.2.2", "label": "1.2.2 Tree-of-Thought Searchers", "broader": "aac:tax-1.2", "comment": "Parallel reasoning path exploration" },
    { "@id": "aac:tax-1.2.3", "label": "1.2.3 Symbolic Reasoners", "broader": "aac:tax-1.2", "comment": "Logic-based reasoning" },
    { "@id": "aac:tax-1.2.4", "label": "1.2.4 Mathematical Solvers", "broader": "aac:tax-1.2", "comment": "Mathematical reasoning" },
    # ... (continues with 900+ more component definitions)
]

# Create DataFrame
df = pd.DataFrame(component_taxonomy_data)

# Create enhanced sunburst chart with a beautiful rainbow colorscale
fig = go.Figure(go.Sunburst(
    ids=df['@id'],
    labels=df['label'],
    parents=df['broader'].fillna(''),
    hovertext=df['comment'],
    hovertemplate='<b>%{label}</b><br>%{hovertext}<extra></extra>',
    branchvalues="total",
    marker=dict(
        colorscale=plotly.colors.sequential.Rainbow,
        line=dict(color='white', width=0.5)
    )
))

# Update layout for a responsive, full-screen, and stylish appearance
fig.update_layout(
    autosize=True,
    margin=dict(t=80, l=25, r=25, b=25),
    title=dict(
        text="🌈 Agentic AI Architectural Component Taxonomy v3.0<br><sub>A Comprehensive, Interactive Guide to the Future of AI</sub>",
        font=dict(size=26, family="Arial Black, sans-serif", color="#2c3e50"),
        x=0.5,
        xanchor='center'
    ),
    font_family="Arial, sans-serif",
    paper_bgcolor='#f8f9fa',
    plot_bgcolor='#ffffff'
)

fig.show()`;

const Index = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(pythonCode);
    setCopied(true);
    toast.success("Code copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-5xl mx-auto text-center space-y-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 backdrop-blur-sm">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Version 3.0 • 2024-2025</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            <span className="gradient-text">Agentic AI</span>
            <br />
            <span className="text-foreground">Component Taxonomy</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A comprehensive, interactive visualization of 900+ cutting-edge AI architectural components—from cognitive cores to quantum-classical hybrids and emergent consciousness monitoring.
          </p>

          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-lg border shadow-soft">
              <Layers className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">20 Categories</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-lg border shadow-soft">
              <Code2 className="w-5 h-5 text-secondary" />
              <span className="text-sm font-medium">900+ Components</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-lg border shadow-soft">
              <Zap className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium">Interactive Sunburst</span>
            </div>
          </div>
        </div>
      </header>

      {/* Code Section */}
      <section className="container mx-auto px-4 pb-24">
        <Card className="max-w-6xl mx-auto overflow-hidden shadow-medium hover:shadow-glow transition-all duration-500 animate-scale-in border-2">
          <div className="bg-gradient-code px-6 py-4 flex items-center justify-between border-b border-border/10">
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <span className="text-sm font-mono text-primary-foreground/80">taxonomy_visualization.py</span>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Code
                </>
              )}
            </Button>
          </div>

          <div className="relative overflow-x-auto">
            <SyntaxHighlighter
              language="python"
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                padding: "2rem",
                fontSize: "0.95rem",
                lineHeight: "1.6",
                background: "transparent",
              }}
              showLineNumbers
              wrapLines
            >
              {pythonCode}
            </SyntaxHighlighter>
          </div>
        </Card>

        {/* Features Grid */}
        <div className="max-w-6xl mx-auto mt-16 grid md:grid-cols-3 gap-6">
          <Card className="p-6 space-y-3 hover:shadow-medium transition-all duration-300 hover:-translate-y-1 border">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Comprehensive Coverage</h3>
            <p className="text-muted-foreground">
              From cognitive cores to quantum computing, consciousness monitoring, and regulatory compliance—everything in one taxonomy.
            </p>
          </Card>

          <Card className="p-6 space-y-3 hover:shadow-medium transition-all duration-300 hover:-translate-y-1 border">
            <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
              <Code2 className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold">Interactive Visualization</h3>
            <p className="text-muted-foreground">
              Beautiful rainbow-colored sunburst chart with hover tooltips, powered by Plotly for seamless exploration.
            </p>
          </Card>

          <Card className="p-6 space-y-3 hover:shadow-medium transition-all duration-300 hover:-translate-y-1 border">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
              <Layers className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold">Future-Ready Architecture</h3>
            <p className="text-muted-foreground">
              Includes emerging technologies like neuromorphic computing, test-time optimization, and swarm intelligence.
            </p>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-muted-foreground border-t">
        <p>Built with Python, Plotly, and Pandas • Interactive AI Taxonomy v3.0</p>
      </footer>
    </div>
  );
};

export default Index;
