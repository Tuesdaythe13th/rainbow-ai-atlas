import { useEffect, useRef } from "react";
import Plotly from "plotly.js-dist-min";

type Node = { id: string; label: string; parent: string; comment: string };

const benchmarkData: Node[] = [
  { id: "bms:root", label: "Automotive Benchmark Suite v1.0 Models", parent: "", comment: "Comprehensive model set for AV evaluation." },

  { id: "bms:1.0", label: "1.0 Perception Systems", parent: "bms:root", comment: "Models for environmental sensing and object identification." },
  { id: "bms:2.0", label: "2.0 Prediction & Forecasting", parent: "bms:root", comment: "Models for forecasting dynamic agent trajectories." },
  { id: "bms:3.0", label: "3.0 Assistant / Foundation Models", parent: "bms:root", comment: "General-purpose LLMs/VLMs adapted as building blocks." },
  { id: "bms:4.0", label: "4.0 Vision-Language-Action (VLA)", parent: "bms:root", comment: "End-to-end systems integrating perception, reasoning, and action." },
  { id: "bms:5.0", label: "5.0 Specialized & Foundational", parent: "bms:root", comment: "Classic techniques and specialized auxiliary components." },

  { id: "bms:1.1", label: "1.1 Object & Instance Detection", parent: "bms:1.0", comment: "Identifying and bounding 2D/3D objects." },
  { id: "bms:1.2", label: "1.2 Segmentation & Mapping", parent: "bms:1.0", comment: "Pixel-level classification and Bird's-Eye-View (BEV) representation." },
  { id: "bms:1.3", label: "1.3 Lane & Structure Detection", parent: "bms:1.0", comment: "Specialized detection of road markings." },

  { id: "model:detr", label: "DETR", parent: "bms:1.1", comment: "End-to-end object detector via set prediction." },
  { id: "model:mlc_ssd", label: "MLC-SSD-ResNet50-MP", parent: "bms:1.1", comment: "Real-time SSD baseline for automotive vision." },
  { id: "model:yolov7mask", label: "YOLOv7-mask", parent: "bms:1.1", comment: "Real-time instance segmentation extension of YOLOv7." },
  { id: "model:yoloworld", label: "YOLO-World", parent: "bms:1.1", comment: "Real-time open-vocabulary zero-shot object detector." },
  { id: "model:detr3d", label: "DETR3D", parent: "bms:1.1", comment: "Extends DETR to 3D detection from multi-view images." },
  { id: "model:pointpainting", label: "PointPainting", parent: "bms:1.1", comment: "Sensor fusion: Paints LiDAR points with semantic vision scores." },

  { id: "model:sam", label: "SAM", parent: "bms:1.2", comment: "Promptable, zero-shot general image segmentation model." },
  { id: "model:panoptic_deeplab", label: "Panoptic-DeepLab", parent: "bms:1.2", comment: "Unified panoptic segmentation with dual-decoder." },
  { id: "model:mask2former", label: "Mask2Former", parent: "bms:1.2", comment: "Unified model for panoptic, instance, and semantic segmentation." },
  { id: "model:unet", label: "U-Net", parent: "bms:1.2", comment: "Landmark U-shaped architecture for semantic segmentation." },
  { id: "model:petrv2", label: "PETRv2", parent: "bms:1.2", comment: "Unified 3D perception with 3D Position Embedding for temporal alignment." },
  { id: "model:bevformer_tiny", label: "BEVFormer-Tiny", parent: "bms:1.2", comment: "Efficient, smaller variant of BEVFormer." },
  { id: "model:bevformer_full", label: "BEVFormer (Full)", parent: "bms:1.2", comment: "Generates unified BEV via spatiotemporal transformers." },
  { id: "model:fb_occ", label: "FB-OCC", parent: "bms:1.2", comment: "3D occupancy prediction via forward-backward view transformation." },
  { id: "model:tempbev", label: "TempBEV", parent: "bms:1.2", comment: "Temporal aggregation in both image and BEV spaces." },
  { id: "model:cvt", label: "CVT", parent: "bms:1.2", comment: "BEV fusion using camera-aware attention mechanism." },
  { id: "model:bevfusion", label: "BEVFusion", parent: "bms:1.2", comment: "Multi-modal framework fusing camera and LiDAR features in BEV space." },
  { id: "model:fastbev", label: "FastBEV", parent: "bms:1.2", comment: "Camera-only 3D perception optimized for real-time speed." },
  { id: "model:bevcar", label: "BEVCar", parent: "bms:1.2", comment: "Camera-radar fusion for joint BEV segmentation." },
  { id: "model:bevsensegmentformer", label: "BEVSegFormer", parent: "bms:1.2", comment: "Transformer-based BEV segmentation robust to arbitrary camera rigs." },
  { id: "model:tpvformer", label: "TPVFormer", parent: "bms:1.2", comment: "Occupancy prediction using a novel Tri-Perspective View representation." },
  { id: "model:lss", label: "Lift-Splat-Shoot (LSS)", parent: "bms:1.2", comment: "Vision-only BEV maps via lifting features with learned depth distributions." },
  { id: "model:bevdepth", label: "BEVDepth", parent: "bms:1.2", comment: "Camera 3D detection integrating depth estimation with strong supervision." },
  { id: "model:oft", label: "OFT", parent: "bms:1.2", comment: "Monocular detection using Orthographic Feature Transform." },
  { id: "model:fb_bev", label: "FB-BEV", parent: "bms:1.2", comment: "BEV perception combining forward and backward view transformations." },

  { id: "model:lanenet", label: "LaneNet", parent: "bms:1.3", comment: "End-to-end lane detection using instance segmentation." },
  { id: "model:ultrafast_lane_v2", label: "Ultra-Fast Lane Detection v2", parent: "bms:1.3", comment: "Optimized for high-FPS lane detection via row-wise classification." },

  { id: "model:hivt", label: "HiVT", parent: "bms:2.0", comment: "Hierarchical transformer for multi-agent motion prediction." },
  { id: "model:lanegcn", label: "LaneGCN", parent: "bms:2.0", comment: "Graph Neural Network for trajectory prediction modeling lane topology." },

  { id: "bms:3.1", label: "3.1 Large Language Models (LLMs)", parent: "bms:3.0", comment: "Text-only foundational models." },
  { id: "bms:3.2", label: "3.2 Vision-Language Models (VLMs)", parent: "bms:3.0", comment: "Multimodal foundational models." },

  { id: "model:mistral7b", label: "Mistral 7B", parent: "bms:3.1", comment: "Efficient LLM used for specific AD tasks like misbehavior detection." },
  { id: "model:llama3_1_8b", label: "Llama 3.1 8B", parent: "bms:3.1", comment: "Versatile LLM for decision-making and conversational agents." },
  { id: "model:phi3", label: "Phi-3", parent: "bms:3.1", comment: "Small-scale, highly capable LLMs suitable for on-device use." },

  { id: "model:qwen25vl", label: "Qwen 2.5-VL", parent: "bms:3.2", comment: "LVLM for VLM-based agent tasks like object localization and video analysis." },
  { id: "model:visionllama3_2_11b", label: "Vision Llama 3.2 11b", parent: "bms:3.2", comment: "Multimodal Llama for visual recognition and scene understanding." },

  { id: "model:opendrivevla", label: "OpenDriveVLA", parent: "bms:4.0", comment: "End-to-end VLA conditioned on 3D perception and language commands." },
  { id: "model:univad", label: "UniAD", parent: "bms:4.0", comment: "Unified framework integrating perception, prediction, and planning." },
  { id: "model:drivelm", label: "DriveLM", parent: "bms:4.0", comment: "VLM agent framework using Graph VQA to enforce multi-step reasoning." },

  { id: "model:sfm", label: "Structure from Motion (SfM)", parent: "bms:5.0", comment: "Classic technique for 3D structure reconstruction from images." },
  { id: "model:realtime_stereo", label: "Real-time Stereo", parent: "bms:5.0", comment: "Lightweight systems for fast disparity/depth estimation." },
  { id: "model:crfnet", label: "CRF-Net", parent: "bms:5.0", comment: "Early learned camera-radar fusion for 2D object detection." },
  { id: "model:f2bev", label: "F2BEV", parent: "bms:5.0", comment: "BEV segmentation from fisheye cameras by modeling radial distortion." },
];

const colorLookup: Record<string, string> = {
  "bms:root": "#2c3e50",
  "bms:1.0": "#1abc9c", "bms:1.1": "#48c9b0", "bms:1.2": "#2ecc71", "bms:1.3": "#16a085",
  "bms:2.0": "#f39c12",
  "bms:3.0": "#9b59b6", "bms:3.1": "#c084e4", "bms:3.2": "#8e44ad",
  "bms:4.0": "#e74c3c",
  "bms:5.0": "#34495e",
};

const getColor = (node: Node): string => {
  if (colorLookup[node.id]) return colorLookup[node.id];
  if (colorLookup[node.parent]) return colorLookup[node.parent];
  const gp = benchmarkData.find(n => n.id === node.parent);
  if (gp && colorLookup[gp.parent]) return colorLookup[gp.parent];
  return "#ecf0f1";
};

export const AutomotiveBenchmarkVisualization = () => {
  const plotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!plotRef.current) return;

    const data = [{
      type: 'sunburst',
      ids: benchmarkData.map(d => d.id),
      labels: benchmarkData.map(d => d.label),
      parents: benchmarkData.map(d => d.parent),
      hovertext: benchmarkData.map(d => d.comment),
      hovertemplate: '<b>%{label}</b><br>%{hovertext}<extra></extra>',
      marker: {
        colors: benchmarkData.map(getColor),
        line: { color: 'white', width: 1.5 },
      },
      textfont: {
        size: 13,
        color: 'white',
        family: 'Space Grotesk, system-ui, -apple-system, sans-serif',
        weight: 900,
      },
      insidetextorientation: 'radial',
    }];

    const layout = {
      margin: { t: 10, l: 0, r: 0, b: 0 },
      font: { family: 'Space Grotesk, system-ui, -apple-system, sans-serif', size: 13, weight: 900 },
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(0,0,0,0)',
      autosize: true,
    };

    Plotly.newPlot(plotRef.current, data as any, layout, {
      responsive: true,
      displayModeBar: true,
      displaylogo: false,
      modeBarButtonsToRemove: ['toImage'],
    });

    const handleResize = () => {
      if (plotRef.current) Plotly.Plots.resize(plotRef.current);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <div ref={plotRef} className="w-full h-[600px] md:h-[800px]" />;
};
