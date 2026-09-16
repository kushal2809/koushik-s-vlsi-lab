export type Project = {
  slug: string;
  name: string;
  subtitle: string;
  tool: string;
  status: string;
  highlights: string[];
  description: string;
  specs: { label: string; value: string }[];
  responsibilities: string[];
  notes: string;
  placeholders: string[];
};

export const projects: Project[] = [
  {
    slug: "raven-wrapper",
    name: "RAVEN WRAPPER",
    subtitle: "45nm Physical Design Implementation",
    tool: "Synopsys IC Compiler II (ICC2)",
    status: "Physical Design project",
    highlights: [
      "45nm",
      "~21K Instances",
      "1 Macro",
      "10 Metal Layers",
      "250 MHz",
      "3 Clocks",
    ],
    description:
      "45nm Physical Design implementation project covering floorplanning, power planning, placement, CTS, routing, DRC checks, and static timing analysis using Synopsys ICC2.",
    specs: [
      { label: "Tool", value: "Synopsys IC Compiler II (ICC2)" },
      { label: "Technology", value: "45nm" },
      { label: "Instances", value: "~21K" },
      { label: "Macro", value: "1" },
      { label: "Metal Layers", value: "10" },
      { label: "Frequency", value: "250 MHz" },
      { label: "Clocks", value: "3" },
    ],
    responsibilities: [
      "Floorplanning",
      "IO port placement",
      "Power planning",
      "Placement",
      "CTS reviews",
      "Routing",
      "DRC checks",
      "Timing analysis and reviews",
    ],
    notes:
      "Block taken through the complete Physical Design flow, from floorplan definition to routed database with DRC and timing reviews at each stage.",
    placeholders: [
      "Floorplan and power plan screenshots",
      "Congestion and placement density maps",
      "CTS and timing reports",
      "Observations and learning points",
    ],
  },
  {
    slug: "orca-top",
    name: "ORCA TOP",
    subtitle: "Physical Design Project",
    tool: "Synopsys IC Compiler II (ICC2)",
    status: "Training project",
    highlights: ["ICC2"],
    description:
      "Physical Design implementation project completed as part of my VLSI training, with hands-on exposure to the backend implementation flow.",
    specs: [{ label: "Tool", value: "Synopsys IC Compiler II (ICC2)" }],
    responsibilities: ["To be documented"],
    notes:
      "Case study details will be added here as the project is documented.",
    placeholders: [
      "Design specifications",
      "Flow steps performed",
      "Screenshots and reports",
      "Key learnings",
    ],
  },
];
