export type StaInput = {
  period: number; // clock period
  tclkq: number; // launch clock-to-Q
  comb: number; // combinational / data path delay
  setup: number; // capture flop setup time
  hold: number; // capture flop hold time
  launchLatency: number; // launch clock latency
  captureLatency: number; // capture clock latency
  uncertainty: number; // clock uncertainty (jitter + margin)
};

export function computeSta(i: StaInput) {
  const skew = i.captureLatency - i.launchLatency;
  const arrival = i.launchLatency + i.tclkq + i.comb;
  const setupRequired = i.period + i.captureLatency - i.setup - i.uncertainty;
  const holdRequired = i.captureLatency + i.hold + i.uncertainty;
  const setupSlack = setupRequired - arrival;
  const holdSlack = arrival - holdRequired;
  const maxFreqMHz = (() => {
    const minPeriod = i.period - setupSlack;
    return minPeriod > 0 ? 1000 / minPeriod : null; // assumes ns
  })();
  return { skew, arrival, setupRequired, holdRequired, setupSlack, holdSlack, maxFreqMHz };
}
