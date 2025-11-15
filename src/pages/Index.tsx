import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, Check, Sparkles, Code2, Layers, Eye } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { toast } from "sonner";
import { TaxonomyVisualization } from "@/components/TaxonomyVisualization";
import { TaxonomySearch } from "@/components/TaxonomySearch";

const pythonCode = `import json
import pandas as pd
import plotly.graph_objects as go
import plotly.colors

# The complete component taxonomy data
component_taxonomy_data = [
    # ... (Python code continues)
]

df = pd.DataFrame(component_taxonomy_data)
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

fig.update_layout(
    autosize=True,
    margin=dict(t=80, l=25, r=25, b=25),
    title=dict(
        text="Agentic AI Architectural Component Taxonomy v3.0",
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
  const [showCode, setShowCode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(pythonCode);
    setCopied(true);
    toast.success("Code copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      toast.info(`Searching for: ${query}`);
    }
  };

  return (
    <div className="min-h-screen bg-background font-khand">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-5xl mx-auto text-center space-y-6 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 border-2 border-foreground bg-background">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold font-array uppercase tracking-wider">v3.0 • 900+ Components</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight font-array uppercase">
            Agentic AI Component
            <br />
            <span className="text-foreground">Taxonomy</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A comprehensive, interactive guide to cutting-edge AI architectural components—from cognitive cores to quantum computing and consciousness monitoring.
          </p>

          <div className="flex gap-4 justify-center flex-wrap pt-4">
            <Button
              size="lg"
              onClick={() => setShowCode(!showCode)}
              className="gap-2 font-array uppercase tracking-wider border-2 border-foreground bg-foreground text-background hover:bg-background hover:text-foreground transition-all"
            >
              <Eye className="w-5 h-5" />
              {showCode ? "Hide Code" : "View Source"}
            </Button>
          </div>
        </div>
      </header>

      {/* Visualization Section */}
      {!showCode && (
        <section className="container mx-auto px-4 pb-12">
          {/* Search Panel */}
          <TaxonomySearch onSearch={handleSearch} searchQuery={searchQuery} />
          
          <Card className="max-w-7xl mx-auto overflow-hidden border-2 border-foreground shadow-xl bg-background">
            <div className="p-6 border-b-2 border-foreground bg-background">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold font-array uppercase tracking-wider">Interactive Taxonomy</h2>
                  <p className="text-sm text-muted-foreground font-khand">
                    Click to explore • Hover for details • 900+ components
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-background">
              <TaxonomyVisualization />
            </div>
          </Card>
        </section>
      )}

      {/* Code Section */}
      {showCode && (
        <section className="container mx-auto px-4 pb-12">
        <Card className="max-w-7xl mx-auto overflow-hidden border-2 border-foreground shadow-xl bg-foreground animate-scale-in">
          <div className="p-4 border-b-2 border-background bg-foreground flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Code2 className="w-5 h-5 text-background" />
              <span className="font-semibold text-background font-array uppercase tracking-wider">Python Source Code</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="text-background hover:text-background hover:bg-background/10 font-khand"
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
        </section>
      )}

        {/* Features Grid */}
        <section className="container mx-auto px-4 pb-12">
        <div className="max-w-6xl mx-auto mt-12 grid md:grid-cols-3 gap-6">
          <Card className="p-6 space-y-3 hover:shadow-medium transition-all duration-300 hover:-translate-y-1 border-2 border-foreground bg-background">
            <div className="w-12 h-12 bg-foreground flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-background" />
            </div>
            <h3 className="text-xl font-semibold font-array uppercase">Comprehensive Coverage</h3>
            <p className="text-muted-foreground font-khand">
              From cognitive cores to quantum computing, consciousness monitoring, and regulatory compliance—everything in one taxonomy.
            </p>
          </Card>

          <Card className="p-6 space-y-3 hover:shadow-medium transition-all duration-300 hover:-translate-y-1 border-2 border-foreground bg-background">
            <div className="w-12 h-12 bg-foreground flex items-center justify-center">
              <Code2 className="w-6 h-6 text-background" />
            </div>
            <h3 className="text-xl font-semibold font-array uppercase">Interactive Visualization</h3>
            <p className="text-muted-foreground font-khand">
              Black and white sunburst chart with hover tooltips, powered by Plotly for seamless exploration.
            </p>
          </Card>

          <Card className="p-6 space-y-3 hover:shadow-medium transition-all duration-300 hover:-translate-y-1 border-2 border-foreground bg-background">
            <div className="w-12 h-12 bg-foreground flex items-center justify-center">
              <Layers className="w-6 h-6 text-background" />
            </div>
            <h3 className="text-xl font-semibold font-array uppercase">Future-Ready Architecture</h3>
            <p className="text-muted-foreground font-khand">
              Includes emerging technologies like neuromorphic computing, test-time optimization, and swarm intelligence.
            </p>
          </Card>
        </div>
        </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center border-t-2 border-foreground">
        <p className="text-sm text-muted-foreground font-khand mb-2">
          Built with Python, Plotly, and Pandas • Interactive AI Taxonomy v3.0
        </p>
        <p className="text-xs font-array uppercase tracking-wider">
          <a 
            href="https://www.linktr.ee/artifexlabs" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-foreground hover:underline font-bold transition-all"
          >
            CREATED BY TUESDAY - DIRECTOR OF RESEARCH @ ARTIFEX LABS
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Index;
