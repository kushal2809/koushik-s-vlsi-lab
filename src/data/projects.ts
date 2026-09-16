export type Project = {
  slug: string;
  name: string;
  tagline: string;
  status: string;
  specs: { label: string; value: string }[];
  responsibilities: string[];
  notes: string;
  placeholders: string[];
};

export const projects: Project[] = [
  {
    slug: "raven-wrapper",
    name: "RAVEN WRAPPER",
    tagline: "Full block-level Physical Design implementation in IC Compiler II.",
    status: "Primary project",
    specs: [
      { label: "Tool", value: "IC Compiler II (ICC2)" },
      { label: "Technology", value: "45nm" },
      { label: "Instances", value: "~21K" },
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
    slug: "nand",
    name: "NAND",
    tagline: "Physical Design training / project work.",
    status: "Training project",
    specs: [
      { label: "Tool", value: "To be added" },
      { label: "Technology", value: "To be added" },
      { label: "Instances", value: "To be added" },
      { label: "Frequency", value: "To be added" },
    ],
    responsibilities: ["To be added"],
    notes: "Details for this project have not been documented yet.",
    placeholders: [
      "Design specifications",
      "Flow steps performed",
      "Screenshots and reports",
      "Key learnings",
    ],
  },
  {
    slug: "orca-top",
    name: "ORCA TOP",
    tagline: "Physical Design training / project work.",
    status: "Training project",
    specs: [
      { label: "Tool", value: "To be added" },
      { label: "Technology", value: "To be added" },
      { label: "Instances", value: "To be added" },
      { label: "Frequency", value: "To be added" },
    ],
    responsibilities: ["To be added"],
    notes: "Details for this project have not been documented yet.",
    placeholders: [
      "Design specifications",
      "Flow steps performed",
      "Screenshots and reports",
      "Key learnings",
    ],
  },
];
