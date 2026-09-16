export type PDStage = {
  id: string;
  title: string;
  summary: string;
  concepts: string[];
  tools: string[];
  detail: string;
};

export const pdStages: PDStage[] = [
  {
    id: "floorplanning",
    title: "Floorplanning",
    summary:
      "Defining the die and core area, placing macros and IO ports, and reserving space so that placement and routing stay feasible.",
    concepts: [
      "Core utilization and aspect ratio",
      "Macro placement and channel spacing",
      "IO port planning",
      "Placement and routing blockages",
      "Halos / keep-out margins",
    ],
    tools: ["ICC2: initialize_floorplan", "ICC2: create_placement_blockage", "ICC2: set_keepout_margin"],
    detail:
      "A good floorplan decides how easy every later stage becomes. Macros are usually pushed to the boundary with their pins facing the core, leaving a clean standard-cell region in the middle. Utilization is chosen so there is room for buffers added during CTS and for detour routing. Keep-out margins around macros prevent cells from crowding macro pins and creating local congestion.",
  },
  {
    id: "power-planning",
    title: "Power Planning",
    summary:
      "Building the power delivery network so every cell receives stable supply with acceptable IR drop and electromigration margin.",
    concepts: [
      "Power rings and straps",
      "Standard cell rails and follow pins",
      "Via stacking between metal layers",
      "IR drop (static and dynamic)",
      "Electromigration limits",
    ],
    tools: ["ICC2: create_pg_ring_pattern", "ICC2: create_pg_mesh_pattern", "ICC2: compile_pg"],
    detail:
      "The PG network is built before placement because it consumes routing resources. Rings surround the core and macros, straps on upper metals carry current across the die, and rails on M1 feed the standard cells. Wider straps and denser via stacks reduce IR drop but take away routing tracks, so power planning is always a trade-off with routability.",
  },
  {
    id: "placement",
    title: "Placement",
    summary:
      "Placing standard cells to optimise timing, congestion and area while keeping the design legal and routable.",
    concepts: [
      "Global vs detailed placement",
      "Congestion and pin density",
      "Timing-driven placement",
      "Scan chain reordering",
      "Legalization",
    ],
    tools: ["ICC2: place_opt", "ICC2: check_legality", "ICC2: report_congestion"],
    detail:
      "Placement is where timing first becomes realistic, because cells now have physical locations and wire delays can be estimated. Congestion maps are reviewed after global placement; hotspots are fixed with cell padding, blockages, or by revisiting the floorplan rather than by forcing the router to solve them later.",
  },
  {
    id: "cts",
    title: "Clock Tree Synthesis",
    summary:
      "Building a balanced clock distribution network that delivers the clock to every sequential element with controlled skew and latency.",
    concepts: [
      "Skew, latency and insertion delay",
      "Clock buffers and inverters",
      "Clock tree exceptions: stop, float, ignore pins",
      "NDR (non-default rules) and shielding",
      "Useful skew",
    ],
    tools: ["ICC2: clock_opt", "ICC2: report_clock_timing", "ICC2: set_clock_tree_options"],
    detail:
      "Before CTS the clock is ideal; after CTS it is a real, buffered network with delay. Hold violations typically appear here because clock paths become unbalanced. Clock nets are often routed on higher metal layers with double spacing and shielding to reduce crosstalk and variation.",
  },
  {
    id: "routing",
    title: "Routing",
    summary:
      "Connecting all signal nets through global, track and detail routing while meeting design rules and timing.",
    concepts: [
      "Global, track, detail routing",
      "Search and repair iterations",
      "Crosstalk and signal integrity",
      "Antenna violations and diodes",
      "Layer assignment and NDRs",
    ],
    tools: ["ICC2: route_auto", "ICC2: route_opt", "ICC2: check_routes"],
    detail:
      "The router first estimates paths globally, then assigns real tracks, then draws actual metal shapes respecting DRC. Post-route optimisation fixes timing that changed once parasitics became accurate. Remaining opens, shorts and antenna violations are cleaned in repair iterations.",
  },
  {
    id: "sta",
    title: "Static Timing Analysis",
    summary:
      "Verifying that every timing path meets setup and hold requirements across corners, without running simulation.",
    concepts: [
      "Setup and hold checks",
      "Slack, WNS and TNS",
      "Clock uncertainty and jitter",
      "Timing exceptions: false path, multicycle",
      "Multi-corner multi-mode analysis",
    ],
    tools: ["PrimeTime: report_timing", "ICC2: report_qor", "ICC2: report_constraint -all_violators"],
    detail:
      "STA checks all paths exhaustively using timing models instead of vectors. Setup failures are fixed by upsizing cells, restructuring logic or improving placement; hold failures are fixed by inserting delay buffers. Analysis is repeated across PVT corners and modes so the design is safe in every operating condition.",
  },
  {
    id: "drc",
    title: "DRC / Physical Verification",
    summary:
      "Checking the final layout against foundry design rules and against the netlist before signoff.",
    concepts: [
      "DRC: spacing, width, density, enclosure",
      "LVS: layout vs schematic",
      "ERC and antenna checks",
      "Metal fill and density requirements",
    ],
    tools: ["ICC2: check_routes", "Signoff: IC Validator / Calibre"],
    detail:
      "Physical verification is the last gate before tapeout. DRC confirms the geometry is manufacturable, LVS confirms the drawn layout matches the intended connectivity, and antenna checks confirm no gate is damaged during fabrication. Violations are traced back to the stage that caused them rather than patched blindly.",
  },
];
