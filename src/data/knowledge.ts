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
      "Floorplanning",
      "Power Planning",
      "Placement",
      "CTS",
      "Routing",
      "STA",
      "Congestion",
      "IR Drop",
      "Electromigration",
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
    slug: "what-is-floorplanning",
    title: "What is Floorplanning?",
    category: "physical-design",
    topic: "Floorplanning",
    intro:
      "Floorplanning is the first physical step of the backend flow, where the shape of the chip and the position of its big blocks are decided.",
    explanation: [
      "Floorplanning defines the die area, the core area, the placement of macros, and the location of IO ports. Nothing is routed yet, but almost every later problem is decided here.",
      "Core utilization tells the tool how much of the core is filled with standard cells. Too high and there is no room for CTS buffers or detour routing; too low and area is wasted.",
      "Macros are usually pushed towards the boundary with their pins facing the core, and keep-out margins are added so standard cells do not crowd macro pins and create local congestion.",
    ],
    example:
      "If a block has utilization set to 0.85 and is full of macros with narrow channels, placement may pass but routing will show congestion hotspots between the macros. Reducing utilization to ~0.70 and widening the channels usually fixes it without touching the netlist.",
    takeaway:
      "A weak floorplan cannot be repaired by the router. When congestion or timing refuses to close, go back to the floorplan first.",
  },
  {
    slug: "setup-and-hold",
    title: "Setup and Hold, Explained Simply",
    category: "physical-design",
    topic: "STA",
    intro:
      "Setup and hold are the two timing checks that decide whether data is captured correctly by a flip-flop.",
    explanation: [
      "Setup requires data to arrive before the capture clock edge, with some margin. It is a maximum-delay check: the data path must be fast enough.",
      "Hold requires data to stay stable after the capture edge. It is a minimum-delay check: the data path must not be too fast.",
      "Slack is the difference between required time and arrival time. Positive slack means the check passes; negative slack is a violation.",
    ],
    example:
      "A setup violation is usually fixed by upsizing cells, reducing logic depth or improving placement. A hold violation is usually fixed by inserting delay buffers on the short path.",
    takeaway:
      "Setup is about being fast enough; hold is about not being too fast. Frequency scaling helps setup but never helps hold.",
  },
  {
    slug: "understanding-congestion",
    title: "Understanding Congestion",
    category: "physical-design",
    topic: "Congestion",
    intro:
      "Congestion happens when more routing is demanded in a region than the available tracks can supply.",
    explanation: [
      "The tool reports congestion as overflow on global routing cells (GRCs). A small number of scattered overflows is normal; concentrated hotspots are not.",
      "Common causes are high local utilization, high pin density, badly placed macros, and complex logic clusters such as muxes and datapaths packed together.",
      "Fixes range from cell padding and partial placement blockages to spreading cells out or revising the floorplan.",
    ],
    example:
      "After global placement, run a congestion report. If a hotspot sits in a narrow channel between two macros, widening the channel is far more effective than raising router effort.",
    takeaway:
      "Congestion is a placement and floorplan problem that shows up during routing. Fix the cause, not the symptom.",
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
