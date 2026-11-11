import { describe, it, expect } from "vitest";
import { computeSta } from "./sta";
const base = { period: 4, tclkq: 0.2, comb: 3, setup: 0.1, hold: 0.05, launchLatency: 0, captureLatency: 0, uncertainty: 0.1 };
describe("computeSta", () => {
  it("setup slack = T + Lcap - Tsu - U - (Llaunch + Tcq + Tcomb)", () => {
    expect(computeSta(base).setupSlack).toBeCloseTo(0.6);
  });
  it("hold slack = (Llaunch + Tcq + Tcomb) - (Lcap + Th + U)", () => {
    expect(computeSta(base).holdSlack).toBeCloseTo(3.05);
  });
  it("positive skew helps setup and hurts hold", () => {
    const r = computeSta({ ...base, captureLatency: 0.5 });
    expect(r.skew).toBeCloseTo(0.5);
    expect(r.setupSlack).toBeCloseTo(1.1);
    expect(r.holdSlack).toBeCloseTo(2.55);
  });
});
