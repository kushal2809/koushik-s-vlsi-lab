export type Activity = {
  title: string;
  detail: string;
  status: "In progress" | "Ongoing" | "Planned";
};

/** Add a new entry at the top to keep the timeline in reverse-chronological order. */
export const activities: Activity[] = [
  {
    title: "Learning Physical Design",
    detail: "Working through the complete flow from netlist to routed database.",
    status: "Ongoing",
  },
  {
    title: "Studying Placement and Congestion",
    detail: "Reading congestion maps and understanding how placement choices create hotspots.",
    status: "In progress",
  },
  {
    title: "Exploring Power Planning",
    detail: "Ring and strap construction, IR drop basics and via stacking.",
    status: "In progress",
  },
  {
    title: "Learning CTS and Clock Optimization",
    detail: "Skew, insertion delay, clock tree exceptions and post-CTS hold fixing.",
    status: "In progress",
  },
  {
    title: "Practicing STA",
    detail: "Reading timing reports, understanding slack, and common setup/hold fixes.",
    status: "In progress",
  },
  {
    title: "Learning TCL and Linux for VLSI",
    detail: "Shell basics, file handling and small TCL scripts for flow automation.",
    status: "Ongoing",
  },
];
