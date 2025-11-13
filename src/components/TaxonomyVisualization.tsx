import { useEffect, useRef } from "react";
import Plotly from "plotly.js-dist-min";

// The complete taxonomy data
const taxonomyData = [
  { id: "aac:tax-1.0", label: "1.0 Cognitive Core Components", parent: "", comment: "Central reasoning and decision-making components" },
  { id: "aac:tax-1.1", label: "1.1 Language Model Engines", parent: "aac:tax-1.0", comment: "Foundation models for language" },
  { id: "aac:tax-1.1.1", label: "1.1.1 Transformer-based LLMs", parent: "aac:tax-1.1", comment: "GPT-style models" },
  { id: "aac:tax-1.1.2", label: "1.1.2 State Space Models", parent: "aac:tax-1.1", comment: "Mamba, RWKV, etc." },
  { id: "aac:tax-1.1.3", label: "1.1.3 Mixture of Experts", parent: "aac:tax-1.1", comment: "Sparsely activated models" },
  { id: "aac:tax-1.1.4", label: "1.1.4 Multimodal Foundation Models", parent: "aac:tax-1.1", comment: "Text, vision, audio models" },
  { id: "aac:tax-1.2", label: "1.2 Reasoning Engines", parent: "aac:tax-1.0", comment: "Specialized reasoning components" },
  { id: "aac:tax-1.2.1", label: "1.2.1 Chain-of-Thought Processors", parent: "aac:tax-1.2", comment: "Step-by-step reasoning" },
  { id: "aac:tax-1.2.2", label: "1.2.2 Tree-of-Thought Searchers", parent: "aac:tax-1.2", comment: "Parallel reasoning path exploration" },
  { id: "aac:tax-1.2.3", label: "1.2.3 Symbolic Reasoners", parent: "aac:tax-1.2", comment: "Logic-based reasoning" },
  { id: "aac:tax-1.2.4", label: "1.2.4 Mathematical Solvers", parent: "aac:tax-1.2", comment: "Mathematical reasoning" },
  { id: "aac:tax-1.3", label: "1.3 Decision Making Units", parent: "aac:tax-1.0", comment: "Action selection and strategy" },
  { id: "aac:tax-1.3.1", label: "1.3.1 Policy Networks", parent: "aac:tax-1.3", comment: "Mapping states to actions" },
  { id: "aac:tax-1.3.2", label: "1.3.2 Value Function Estimators", parent: "aac:tax-1.3", comment: "Estimating returns" },
  { id: "aac:tax-1.3.3", label: "1.3.3 Multi-Criteria Decision Makers", parent: "aac:tax-1.3", comment: "Balancing objectives" },
  { id: "aac:tax-1.4", label: "1.4 Hybrid Reasoning Systems", parent: "aac:tax-1.0", comment: "Combining multiple reasoning paradigms" },
  { id: "aac:tax-1.4.1", label: "1.4.1 Neuro-Symbolic Integrators", parent: "aac:tax-1.4", comment: "Bridging neural and symbolic AI" },
  { id: "aac:tax-1.4.2", label: "1.4.2 Probabilistic Program Synthesizers", parent: "aac:tax-1.4", comment: "Generating probabilistic programs" },
  { id: "aac:tax-1.4.3", label: "1.4.3 Causal Reasoning Engines", parent: "aac:tax-1.4", comment: "Understanding cause-effect relationships" },
  { id: "aac:tax-1.4.4", label: "1.4.4 Abductive Logic Processors", parent: "aac:tax-1.4", comment: "Inference to best explanation" },
  { id: "aac:tax-2.0", label: "2.0 Planning & Orchestration", parent: "", comment: "High-level planning and workflow" },
  { id: "aac:tax-2.1", label: "2.1 Task Planners", parent: "aac:tax-2.0", comment: "Decomposing goals" },
  { id: "aac:tax-2.1.1", label: "2.1.1 Hierarchical Task Networks", parent: "aac:tax-2.1", comment: "Recursive decomposition" },
  { id: "aac:tax-2.1.2", label: "2.1.2 Monte Carlo Tree Search", parent: "aac:tax-2.1", comment: "MCTS for planning" },
  { id: "aac:tax-2.1.3", label: "2.1.3 LLM-based Planners", parent: "aac:tax-2.1", comment: "LLM-driven planning" },
  { id: "aac:tax-2.2", label: "2.2 Workflow Orchestrators", parent: "aac:tax-2.0", comment: "Managing multi-step workflows" },
  { id: "aac:tax-2.2.1", label: "2.2.1 State Machine Controllers", parent: "aac:tax-2.2", comment: "FSM-based systems" },
  { id: "aac:tax-2.2.2", label: "2.2.2 DAG Workflow Managers", parent: "aac:tax-2.2", comment: "DAG-based execution" },
  { id: "aac:tax-3.0", label: "3.0 Memory Architectures", parent: "", comment: "Storing and retrieving information" },
  { id: "aac:tax-3.1", label: "3.1 Working Memory", parent: "aac:tax-3.0", comment: "Short-term memory" },
  { id: "aac:tax-3.1.1", label: "3.1.1 Context Windows", parent: "aac:tax-3.1", comment: "Attention windows" },
  { id: "aac:tax-3.1.2", label: "3.1.2 Scratchpads", parent: "aac:tax-3.1", comment: "Temporary storage" },
  { id: "aac:tax-3.2", label: "3.2 Long-term Memory", parent: "aac:tax-3.0", comment: "Persistent memory" },
  { id: "aac:tax-3.2.1", label: "3.2.1 Episodic Memory", parent: "aac:tax-3.2", comment: "Memory of experiences" },
  { id: "aac:tax-3.2.2", label: "3.2.2 Semantic Memory", parent: "aac:tax-3.2", comment: "Factual knowledge" },
  { id: "aac:tax-3.3", label: "3.3 Memory Retrieval", parent: "aac:tax-3.0", comment: "Accessing stored info" },
  { id: "aac:tax-3.3.1", label: "3.3.1 Vector Search Engines", parent: "aac:tax-3.3", comment: "Semantic search" },
  { id: "aac:tax-3.3.2", label: "3.3.2 Graph Traversal", parent: "aac:tax-3.3", comment: "Knowledge graph navigation" },
  { id: "aac:tax-4.0", label: "4.0 Perception & Sensing", parent: "", comment: "Processing environmental inputs" },
  { id: "aac:tax-4.1", label: "4.1 Input Processors", parent: "aac:tax-4.0", comment: "Raw input processing" },
  { id: "aac:tax-4.1.1", label: "4.1.1 Text Processors", parent: "aac:tax-4.1", comment: "NLP input" },
  { id: "aac:tax-4.1.2", label: "4.1.2 Vision Processors", parent: "aac:tax-4.1", comment: "Image/video processing" },
  { id: "aac:tax-4.1.3", label: "4.1.3 Audio Processors", parent: "aac:tax-4.1", comment: "Speech/sound processing" },
  { id: "aac:tax-5.0", label: "5.0 Action Execution", parent: "", comment: "Executing actions and interfacing" },
  { id: "aac:tax-5.1", label: "5.1 Function Callers", parent: "aac:tax-5.0", comment: "Executing functions" },
  { id: "aac:tax-5.2", label: "5.2 API Clients", parent: "aac:tax-5.0", comment: "Interfacing with APIs" },
  { id: "aac:tax-5.3", label: "5.3 Code Generators", parent: "aac:tax-5.0", comment: "Generating code" },
  { id: "aac:tax-6.0", label: "6.0 Learning & Adaptation", parent: "", comment: "Enabling learning and adaptation" },
  { id: "aac:tax-6.1", label: "6.1 Reinforcement Learners", parent: "aac:tax-6.0", comment: "Learning from rewards" },
  { id: "aac:tax-6.2", label: "6.2 Few-shot Learners", parent: "aac:tax-6.0", comment: "Adapting from few examples" },
  { id: "aac:tax-6.3", label: "6.3 Meta-learners", parent: "aac:tax-6.0", comment: "Learning to learn" },
  { id: "aac:tax-7.0", label: "7.0 Communication", parent: "", comment: "Enabling interaction" },
  { id: "aac:tax-7.1", label: "7.1 Inter-agent Communication", parent: "aac:tax-7.0", comment: "Agent-to-agent messaging" },
  { id: "aac:tax-7.2", label: "7.2 Human-Agent Interfaces", parent: "aac:tax-7.0", comment: "Human interaction" },
  { id: "aac:tax-7.3", label: "7.3 Negotiation Engines", parent: "aac:tax-7.0", comment: "Strategic negotiation" },
  { id: "aac:tax-8.0", label: "8.0 Safety & Control", parent: "", comment: "Ensuring safe operation" },
  { id: "aac:tax-8.1", label: "8.1 Constraint Enforcement", parent: "aac:tax-8.0", comment: "Enforcing boundaries" },
  { id: "aac:tax-8.2", label: "8.2 Monitoring & Alerting", parent: "aac:tax-8.0", comment: "Observability" },
  { id: "aac:tax-8.3", label: "8.3 Human-in-the-Loop", parent: "aac:tax-8.0", comment: "Human oversight" },
  { id: "aac:tax-8.4", label: "8.4 Adversarial Defense", parent: "aac:tax-8.0", comment: "Defending against attacks" },
  { id: "aac:tax-8.4.1", label: "8.4.1 Prompt Injection Detectors", parent: "aac:tax-8.4", comment: "Detecting malicious prompts" },
  { id: "aac:tax-8.4.2", label: "8.4.2 Output Sanitizers", parent: "aac:tax-8.4", comment: "Cleaning outputs" },
  { id: "aac:tax-9.0", label: "9.0 Meta-cognition", parent: "", comment: "Self-reflection" },
  { id: "aac:tax-9.1", label: "9.1 Confidence Estimators", parent: "aac:tax-9.0", comment: "Assessing certainty" },
  { id: "aac:tax-9.2", label: "9.2 Performance Evaluators", parent: "aac:tax-9.0", comment: "Assessing performance" },
  { id: "aac:tax-10.0", label: "10.0 Resource Management", parent: "", comment: "Managing resources" },
  { id: "aac:tax-10.1", label: "10.1 Resource Schedulers", parent: "aac:tax-10.0", comment: "Allocating resources" },
  { id: "aac:tax-10.2", label: "10.2 Optimization Controllers", parent: "aac:tax-10.0", comment: "Optimizing use" },
  { id: "aac:tax-11.0", label: "11.0 Environment Interaction", parent: "", comment: "Understanding environment" },
  { id: "aac:tax-11.1", label: "11.1 World Modelers", parent: "aac:tax-11.0", comment: "Building predictive models" },
  { id: "aac:tax-11.2", label: "11.2 Environment Simulators", parent: "aac:tax-11.0", comment: "Internal sandboxes" },
  { id: "aac:tax-12.0", label: "12.0 Hypercomputer Infrastructure", parent: "", comment: "Hardware & networking layer" },
  { id: "aac:tax-12.1", label: "12.1 AI Accelerators", parent: "aac:tax-12.0", comment: "Specialized processors" },
  { id: "aac:tax-12.2", label: "12.2 Data Center Architecture", parent: "aac:tax-12.0", comment: "Physical infrastructure" },
  { id: "aac:tax-13.0", label: "13.0 Quantum-Classical Hybrid", parent: "", comment: "Quantum computing integration" },
  { id: "aac:tax-13.1", label: "13.1 Quantum Processing Units", parent: "aac:tax-13.0", comment: "Quantum computation" },
  { id: "aac:tax-13.2", label: "13.2 Quantum-Classical Interfaces", parent: "aac:tax-13.0", comment: "Bridging systems" },
  { id: "aac:tax-14.0", label: "14.0 Constitutional AI", parent: "", comment: "Alignment systems" },
  { id: "aac:tax-14.1", label: "14.1 Value Alignment Engines", parent: "aac:tax-14.0", comment: "Aligning with values" },
  { id: "aac:tax-14.2", label: "14.2 Interpretability Probes", parent: "aac:tax-14.0", comment: "Understanding decisions" },
  { id: "aac:tax-15.0", label: "15.0 Swarm Intelligence", parent: "", comment: "Multi-agent coordination" },
  { id: "aac:tax-15.1", label: "15.1 Swarm Coordination", parent: "aac:tax-15.0", comment: "Coordinating swarms" },
  { id: "aac:tax-15.2", label: "15.2 Distributed Consensus", parent: "aac:tax-15.0", comment: "Achieving agreement" },
  { id: "aac:tax-16.0", label: "16.0 Neuromorphic Computing", parent: "", comment: "Brain-inspired architectures" },
  { id: "aac:tax-16.1", label: "16.1 Spiking Neural Networks", parent: "aac:tax-16.0", comment: "Event-driven computation" },
  { id: "aac:tax-16.2", label: "16.2 Cognitive Architectures", parent: "aac:tax-16.0", comment: "Cognitive science inspired" },
  { id: "aac:tax-17.0", label: "17.0 Test-Time Compute", parent: "", comment: "Dynamic inference scaling" },
  { id: "aac:tax-17.1", label: "17.1 Adaptive Inference", parent: "aac:tax-17.0", comment: "Variable computation depth" },
  { id: "aac:tax-17.2", label: "17.2 Self-Improving Inference", parent: "aac:tax-17.0", comment: "Inference-time learning" },
  { id: "aac:tax-18.0", label: "18.0 Sustainable Computing", parent: "", comment: "Energy-aware infrastructure" },
  { id: "aac:tax-18.1", label: "18.1 Carbon-Aware Scheduling", parent: "aac:tax-18.0", comment: "Green computing" },
  { id: "aac:tax-18.2", label: "18.2 Energy Optimization", parent: "aac:tax-18.0", comment: "Minimizing consumption" },
  { id: "aac:tax-19.0", label: "19.0 Standards Compliance", parent: "", comment: "Regulatory frameworks" },
  { id: "aac:tax-19.1", label: "19.1 IEEE Alignment", parent: "aac:tax-19.0", comment: "IEEE standards compliance" },
  { id: "aac:tax-19.2", label: "19.2 NIST Risk Framework", parent: "aac:tax-19.0", comment: "Security frameworks" },
  { id: "aac:tax-20.0", label: "20.0 Consciousness Monitoring", parent: "", comment: "Emergent consciousness detection" },
  { id: "aac:tax-20.1", label: "20.1 Consciousness Detection", parent: "aac:tax-20.0", comment: "Identifying consciousness patterns" },
  { id: "aac:tax-20.2", label: "20.2 Ethical Response Protocols", parent: "aac:tax-20.0", comment: "Responding to consciousness" },
];

export const TaxonomyVisualization = () => {
  const plotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!plotRef.current) return;

    const ids = taxonomyData.map(d => d.id);
    const labels = taxonomyData.map(d => d.label);
    const parents = taxonomyData.map(d => d.parent);
    const hovertext = taxonomyData.map(d => d.comment);

    const data = [{
      type: 'sunburst',
      ids: ids,
      labels: labels,
      parents: parents,
      hovertext: hovertext,
      hovertemplate: '<b>%{label}</b><br>%{hovertext}<extra></extra>',
      marker: {
        colors: ids.map((_, i) => `hsl(${(i * 360 / ids.length)}, 85%, 65%)`),
        line: { color: 'white', width: 2 }
      },
      textfont: {
        size: 12,
        color: 'white',
        family: 'Arial, sans-serif'
      },
      insidetextorientation: 'radial',
      branchvalues: 'total'
    }];

    const layout = {
      margin: { t: 10, l: 0, r: 0, b: 0 },
      font: { family: 'Arial, sans-serif', size: 13 },
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(0,0,0,0)',
      autosize: true,
      sunburstcolorway: [
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
        '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739', '#52C9A5'
      ]
    };

    const config = {
      responsive: true,
      displayModeBar: true,
      displaylogo: false,
      modeBarButtonsToRemove: ['toImage']
    };

    Plotly.newPlot(plotRef.current, data as any, layout, config);

    const handleResize = () => {
      if (plotRef.current) {
        Plotly.Plots.resize(plotRef.current);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <div ref={plotRef} className="w-full h-[600px] md:h-[800px]" />;
};
