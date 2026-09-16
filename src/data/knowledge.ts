export type ArticleSection = {
  heading: string;
  body?: string[];
  bullets?: string[];
  flow?: string[];
};

export type Article = {
  slug: string;
  title: string;
  category: string;
  topic: string;
  /** Two-digit number, shown on Physical Design cards. */
  num?: string;
  /** One-line explanation used on the knowledge card. */
  short?: string;
  intro: string;
  explanation?: string[];
  sections?: ArticleSection[];
  example?: string;
  takeaway?: string;
};

export type Category = {
  id: string;
  name: string;
  description: string;
  topics: string[];
};

export const categories: Category[] = [
  {
    id: "physical-design",
    name: "Physical Design",
    description: "From floorplan to signoff — the backend implementation flow.",
    topics: [
      "Physical Design Flow",
      "Floorplanning",
      "Power Planning",
      "Placement",
      "CTS",
      "Routing",
      "STA",
      "Physical Verification / DRC",
    ],
  },
  {
    id: "digital-design",
    name: "Digital Design",
    description: "The logic fundamentals every PD engineer keeps coming back to.",
    topics: [
      "Combinational Logic",
      "Sequential Logic",
      "Flip-Flops",
      "Latches",
      "Registers",
      "Timing concepts",
    ],
  },
  {
    id: "tools",
    name: "Tools",
    description: "EDA tools used across design, implementation and verification.",
    topics: ["ICC2", "Cadence Virtuoso", "Vivado", "OpenROAD", "OpenLane"],
  },
  {
    id: "linux-tcl",
    name: "Linux / TCL",
    description: "The scripting layer that holds a Physical Design flow together.",
    topics: ["Linux commands", "TCL scripting", "Useful ICC2 commands"],
  },
];

/**
 * Add a new article by appending an object here.
 * It appears automatically on /knowledge and gets its own page at /knowledge/<slug>.
 */
export const articles: Article[] = [
  {
    slug: "physical-design-flow",
    title: "Physical Design Flow",
    category: "physical-design",
    topic: "PD Flow",
    num: "01",
    short: "Understand how a synthesized RTL design is transformed into a physically implemented layout.",
    intro:
      "Physical Design is the stage where a synthesized gate-level netlist becomes a real layout with geometry, power and metal connections that can be manufactured.",
    sections: [
      {
        heading: "What is Physical Design?",
        body: [
          "Synthesis converts RTL into a netlist of standard cells, but that netlist has no physical meaning yet — no location, no wires, no power. Physical Design gives every cell a position on silicon and every connection a real metal path.",
        ],
      },
      {
        heading: "Why is Physical Design needed?",
        body: [
          "Delay, power and manufacturability all depend on geometry. Two identical netlists can behave very differently depending on where the cells sit and how long the wires are. Physical Design is where those physical effects are controlled.",
        ],
      },
      {
        heading: "Stages of the flow",
        flow: [
          "Netlist",
          "Floorplanning",
          "Power Planning",
          "Placement",
          "CTS",
          "Routing",
          "STA",
          "Physical Verification",
          "Signoff",
        ],
      },
      {
        heading: "What happens at each stage",
        bullets: [
          "Floorplanning — die and core are defined, IOs and macros are placed.",
          "Power Planning — the VDD/VSS distribution network is built.",
          "Placement — standard cells are placed inside the core.",
          "CTS — clocks are distributed from their sources to sequential elements.",
          "Routing — signal connections are made on the metal layers.",
          "STA — setup and hold timing is analysed across the design.",
          "Physical Verification — the layout is checked against design rules and against the schematic.",
          "Signoff — final checks before the database is released.",
        ],
      },
      {
        heading: "Constraints considered throughout",
        bullets: [
          "Timing — every stage changes wire length, and wire length changes delay.",
          "Power — the power network, cell choice and clock tree all affect power.",
          "Area — utilization decides how much room is left for buffers and routing.",
          "Physical rules — spacing, layer direction and via rules apply from the start.",
        ],
      },
    ],
    takeaway:
      "Physical Design is one connected flow: each stage constrains the next, so problems are usually solved upstream rather than at the stage where they appear.",
  },
  {
    slug: "floorplanning",
    title: "Floorplanning",
    category: "physical-design",
    topic: "Floorplanning",
    num: "02",
    short: "Define the physical organization of the chip before detailed implementation begins.",
    intro:
      "Floorplanning decides the shape and size of the chip, where the IOs and macros sit, and how much room is left for standard cells.",
    sections: [
      {
        heading: "What is floorplanning?",
        body: [
          "Floorplanning is the first physical step. Nothing is routed yet, but the area available for every later stage is fixed here.",
        ],
      },
      {
        heading: "Basic terms",
        bullets: [
          "Die — the full silicon area of the block or chip.",
          "Core — the inner region where standard cells and macros are placed.",
          "Core offset — the gap between the die boundary and the core, used for IOs and power rings.",
          "Macro — a large pre-designed block such as a memory, placed manually or semi-automatically.",
          "IO ports — the connection points of the block to the outside world.",
          "Standard-cell region — the rows inside the core where logic cells are placed.",
          "Site rows — the fixed-height rows that standard cells snap into.",
        ],
      },
      {
        heading: "Area and shape",
        bullets: [
          "Core utilization — the fraction of the core occupied by cells and macros.",
          "Aspect ratio — the width-to-height relationship of the core, which affects routing and pin access.",
        ],
      },
      {
        heading: "Why floorplanning matters",
        body: [
          "A weak floorplan shows up later as congestion in narrow channels, long paths that miss timing, detour routing around badly placed macros, and wasted or over-packed area. None of these are fully fixable by the router.",
        ],
      },
    ],
    takeaway:
      "Most downstream problems are floorplan problems. When timing or congestion refuses to improve, look at the floorplan first.",
  },
  {
    slug: "power-planning",
    title: "Power Planning",
    category: "physical-design",
    topic: "Power Planning",
    num: "03",
    short: "Build the power distribution network required to deliver VDD and VSS across the design.",
    intro:
      "Power planning creates the metal network that carries supply and ground to every cell in the design.",
    sections: [
      {
        heading: "VDD and VSS",
        body: [
          "VDD is the supply and VSS is the ground reference. Every standard cell needs both, delivered reliably no matter where the cell sits in the core.",
        ],
      },
      {
        heading: "The power distribution network (PDN)",
        flow: ["VDD", "Power mesh / straps", "Power rails", "Standard cells"],
        body: [
          "The same structure carries VSS back from the cells. The network is built from wide upper-layer metal down to the thin rails that run along the site rows.",
        ],
      },
      {
        heading: "Building blocks",
        bullets: [
          "Power mesh — a grid of horizontal and vertical supply lines across the core.",
          "Power straps — the wide metal lines that form the mesh.",
          "Power rails — the thin lines running along each standard-cell row.",
          "Vias — the vertical connections that stitch the layers of the network together.",
        ],
      },
      {
        heading: "IR drop and electromigration",
        bullets: [
          "IR drop — resistance in the network causes the voltage seen by a cell to be lower than the supply, which slows the cell down.",
          "Electromigration (EM) — sustained high current density can degrade metal over time.",
        ],
        body: [
          "Wider metal, more straps and more via connections lower the effective resistance and give current multiple paths, which helps with both concerns. These are conceptual points — actual results always come from analysis on a specific design.",
        ],
      },
    ],
    takeaway:
      "A good PDN gives every cell a short, low-resistance path to the supply through several parallel routes.",
  },
  {
    slug: "placement",
    title: "Placement",
    category: "physical-design",
    topic: "Placement",
    num: "04",
    short: "Place standard cells within the core while balancing timing, density, and routing resources.",
    intro:
      "Placement assigns a legal physical location inside the core to every standard cell in the netlist.",
    sections: [
      {
        heading: "What is placement?",
        body: [
          "The tool places cells into the site rows, keeping connected cells close together so wires stay short, while respecting blockages, macros and density limits.",
        ],
      },
      {
        heading: "Density and utilization",
        bullets: [
          "Placement density — how tightly cells are packed in a local region.",
          "Cell utilization — the overall fraction of the core occupied by cells.",
          "High-density regions — local hotspots that leave little room for buffers or wires.",
        ],
      },
      {
        heading: "GCells and congestion",
        body: [
          "For routing estimation the core is divided into a grid of small rectangles called GCells. Each GCell has a capacity — the number of routing tracks that cross it. The tool compares the demand in each GCell with that capacity.",
          "When demand is higher than capacity, that GCell is congested and wires must detour around it.",
        ],
        flow: ["Higher cell density", "More routing demand", "Higher congestion risk"],
      },
      {
        heading: "Why placement matters",
        bullets: [
          "Timing — placement sets wire lengths, and wire lengths set delay.",
          "Routing — congested placement makes detailed routing slow or impossible.",
          "Power — long nets and extra buffers increase switching power.",
          "Area — poor spreading wastes the core or over-packs part of it.",
        ],
      },
      {
        heading: "Placement optimization",
        body: [
          "After the initial placement the tool refines it: resizing cells, inserting buffers, restructuring small pieces of logic and spreading dense regions to relieve congestion.",
        ],
      },
    ],
    takeaway:
      "Placement is the balance point of the flow — timing, congestion, power and area all move together when cells move.",
  },
  {
    slug: "clock-tree-synthesis",
    title: "Clock Tree Synthesis (CTS)",
    category: "physical-design",
    topic: "CTS",
    num: "05",
    short: "Distribute clock signals to sequential elements while controlling clock timing characteristics.",
    intro:
      "CTS builds the physical network that carries each clock from its source to every flip-flop that it drives.",
    sections: [
      {
        heading: "What is a clock tree?",
        body: [
          "Before CTS the clock is an ideal signal connected to thousands of sinks. A real clock cannot drive that load from one point, so the tool builds a buffered tree.",
        ],
        flow: ["Clock source", "Clock buffers", "Clock branches", "Sequential elements"],
      },
      {
        heading: "Why clock distribution is required",
        body: [
          "The clock has the largest fanout and the highest switching activity in the design. It needs its own structure so that every flip-flop receives a clean edge at roughly the same time.",
        ],
      },
      {
        heading: "Key terms",
        bullets: [
          "Clock source — the port or generated-clock pin where the clock originates.",
          "Clock buffers — the cells inserted along the tree to drive the load.",
          "Clock sinks — the clock pins of the sequential elements.",
          "Clock latency — the delay from the source to a sink.",
          "Clock skew — the difference in arrival time between two sinks.",
          "Clock uncertainty — the margin reserved for jitter and modelling inaccuracy.",
          "Clock balancing — equalising the delay across branches to control skew.",
        ],
      },
      {
        heading: "Skew, setup and hold",
        bullets: [
          "If the capture clock arrives later than the launch clock, the data path gets extra time — setup becomes easier, hold becomes harder.",
          "If the capture clock arrives earlier, the opposite happens — setup becomes harder, hold becomes easier.",
        ],
        body: [
          "This is why skew is controlled rather than simply minimised everywhere, and why hold fixing usually follows CTS.",
        ],
      },
    ],
    takeaway:
      "CTS turns an ideal clock into a real, buffered network; from this point on, clock arrival times are part of every timing check.",
  },
  {
    slug: "routing",
    title: "Routing",
    category: "physical-design",
    topic: "Routing",
    num: "06",
    short: "Create physical connections between cells, macros, and IOs using available metal layers.",
    intro:
      "Routing builds the actual metal wires that implement every connection in the netlist.",
    sections: [
      {
        heading: "Global and detailed routing",
        bullets: [
          "Global routing — plans the approximate path of each net through the GCell grid and checks whether the resources are sufficient.",
          "Detailed routing — assigns real tracks, layers and vias, following all spacing and width rules.",
        ],
      },
      {
        heading: "Layers, tracks and vias",
        bullets: [
          "Routing layers — the stack of metal layers available in the technology.",
          "Preferred direction — layers alternate between horizontal and vertical routing to reduce conflicts.",
          "Routing tracks — the fixed grid lines on each layer that wires follow.",
          "Via — the connection between two adjacent metal layers.",
        ],
      },
      {
        heading: "Routing congestion",
        body: [
          "Congestion appears when the wires that need to cross a region outnumber the tracks available there. A simple example: a small area packed with high-pin-count cells may need forty connections across a boundary that only has thirty tracks — ten wires must detour, and those detours add delay.",
          "Because demand comes from where the cells sit, congestion is usually relieved by changing placement or the floorplan rather than by pushing the router harder.",
        ],
      },
      {
        heading: "Signal integrity",
        bullets: [
          "Crosstalk — a switching aggressor net couples noise onto a neighbouring victim net through side-wall capacitance.",
          "Effects are reduced by spacing critical nets, shielding them, or moving them to a different layer.",
        ],
      },
    ],
    takeaway:
      "Routing succeeds or fails on the resources left behind by floorplanning and placement.",
  },
  {
    slug: "static-timing-analysis",
    title: "Static Timing Analysis (STA)",
    category: "physical-design",
    topic: "STA",
    num: "07",
    short: "Analyze timing paths to identify setup and hold violations without requiring simulation vectors.",
    intro:
      "STA checks every timing path in the design mathematically, without needing input vectors or simulation.",
    sections: [
      {
        heading: "What is STA?",
        body: [
          "Instead of simulating behaviour, STA computes the earliest and latest possible arrival times on every path and compares them with what the clock requires. Because it is exhaustive, it is the standard way to sign off timing.",
        ],
      },
      {
        heading: "A timing path",
        flow: ["Launch flip-flop", "Combinational logic", "Capture flip-flop"],
        bullets: [
          "Data path — from the launch flip-flop output, through the logic, to the capture flip-flop input.",
          "Clock path — from the clock source to the clock pins of the launch and capture flip-flops.",
        ],
      },
      {
        heading: "Setup and hold",
        bullets: [
          "Setup time — data must be stable for a minimum time before the capture clock edge. It is a maximum-delay check: the path must be fast enough.",
          "Hold time — data must stay stable for a minimum time after the capture clock edge. It is a minimum-delay check: the path must not be too fast.",
        ],
        body: [
          "Conceptually: if logic between two flip-flops is too slow, the new data misses the capture edge — a setup violation. If it is too fast, the new data arrives before the previous value has been captured — a hold violation.",
        ],
      },
      {
        heading: "Slack, WNS and TNS",
        bullets: [
          "Slack — required time minus arrival time for a path.",
          "Positive slack — the timing requirement is satisfied.",
          "Negative slack — the path is violating.",
          "WNS — worst negative slack, the single worst path.",
          "TNS — total negative slack, the sum across all violating paths.",
        ],
        body: [
          "WNS shows how bad the worst path is; TNS shows how widespread the problem is. A large TNS with a small WNS usually points to something systematic rather than one bad path.",
        ],
      },
    ],
    takeaway:
      "STA is about margins: setup asks whether the path is fast enough, hold asks whether it is too fast, and slack is the answer to both.",
  },
  {
    slug: "physical-verification-drc",
    title: "Physical Verification / DRC",
    category: "physical-design",
    topic: "Physical Verification",
    num: "08",
    short: "Verify that the physical layout follows technology and manufacturing design rules.",
    intro:
      "Physical verification checks that the finished layout can actually be manufactured and that it matches the intended design.",
    sections: [
      {
        heading: "What is physical verification?",
        body: [
          "It is the set of checks run on the layout geometry near the end of the flow, before the database is handed over. Timing tells you whether the design works; physical verification tells you whether it can be built.",
        ],
      },
      {
        heading: "What is DRC?",
        body: [
          "Design Rule Checking compares the layout against the rules of the technology — the geometric limits the foundry guarantees it can print reliably. A layout that breaks them may fail during manufacturing even if the logic is perfect.",
        ],
      },
      {
        heading: "Common rule categories",
        bullets: [
          "Spacing violations — two shapes on the same layer are closer than the minimum allowed.",
          "Width violations — a wire is narrower than the minimum width for that layer.",
          "Minimum area — a metal shape is smaller than the minimum permitted area.",
          "Via rules — incorrect via size, enclosure or spacing between stacked vias.",
          "Connectivity checks — opens and shorts in the routed nets.",
        ],
      },
      {
        heading: "DRC vs LVS",
        bullets: [
          "DRC — does the layout follow the physical design rules?",
          "LVS — does the layout connectivity match the intended design netlist?",
        ],
        body: [
          "A layout can be perfectly DRC clean and still be wrong, if a net was connected to the wrong pin. Both checks are needed.",
        ],
      },
    ],
    takeaway:
      "DRC answers 'can it be manufactured?' and LVS answers 'is it the circuit we designed?' — a block is only clean when both pass.",
  },
  {
    slug: "flip-flop-vs-latch",
    title: "Flip-Flop vs Latch",
    category: "digital-design",
    topic: "Flip-Flops",
    intro:
      "Both store one bit, but they differ in when they become transparent to their input.",
    explanation: [
      "A latch is level-sensitive: while the enable is active, the output follows the input. A flip-flop is edge-sensitive: it samples the input only at a clock edge.",
      "Latches are smaller and faster and allow time borrowing across cycles, but they make timing analysis harder.",
      "Most synchronous digital designs use edge-triggered flip-flops because their timing behaviour is predictable and easy to constrain.",
    ],
    example:
      "A D flip-flop built from two latches in a master-slave configuration captures data on one clock edge and holds it stable for the whole cycle.",
    takeaway:
      "Use flip-flops for predictable synchronous timing; latch-based design buys performance at the cost of analysis complexity.",
  },
  {
    slug: "useful-linux-commands-vlsi",
    title: "Useful Linux Commands for VLSI Work",
    category: "linux-tcl",
    topic: "Linux commands",
    intro:
      "A PD engineer spends most of the day in a terminal reading logs and reports. A few commands cover most of it.",
    explanation: [
      "`grep` finds patterns in large reports, `less` reads them without loading the whole file, and `tail -f` watches a running tool log.",
      "`find` locates files across a run directory, and `du -sh` shows which run is filling the disk.",
      "Redirecting output with `>` and `|` lets you chain small commands into quick checks.",
    ],
    example:
      "grep -n \"VIOLATED\" timing.rpt | head -20 — pull the first violating paths out of a large timing report.",
    takeaway:
      "You do not need advanced Linux. Being fluent with grep, less, find and pipes already saves hours every week.",
  },
  {
    slug: "tcl-basics-for-pd",
    title: "TCL Basics for Physical Design",
    category: "linux-tcl",
    topic: "TCL scripting",
    intro:
      "TCL is the scripting language behind most EDA tools, so even small scripting skills make the flow repeatable.",
    explanation: [
      "Everything in TCL is a string. Variables are set with `set`, and substituted with `$`.",
      "Commands in square brackets are executed and replaced by their result, which is how tool queries get chained.",
      "Loops and procedures let you apply the same constraint or check across many objects instead of by hand.",
    ],
    example:
      "foreach_in_collection cell [get_cells -hier *] { echo [get_object_name $cell] } — iterate over a collection returned by the tool.",
    takeaway:
      "Write every manual tool step into a script. A flow you can rerun is worth far more than a result you cannot reproduce.",
  },
];

export const categoryById = (id: string) => categories.find((c) => c.id === id);
