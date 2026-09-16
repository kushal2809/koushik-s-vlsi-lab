export function ChipFloorplan() {
  return (
    <figure className="chip-figure" aria-label="Simplified physical design floorplan">
      <div className="chip-frame">
        <div className="chip-die">
          <div className="chip-macro chip-macro-a">
            <span>SRAM_0</span>
          </div>
          <div className="chip-macro chip-macro-b">
            <span>SRAM_1</span>
          </div>
          <div className="chip-core">
            <span>CORE</span>
            <div className="chip-cells" aria-hidden="true" />
          </div>
          <div className="chip-macro chip-macro-c">
            <span>PLL</span>
          </div>
          <div className="chip-io chip-io-top" aria-hidden="true" />
          <div className="chip-io chip-io-bottom" aria-hidden="true" />
          <svg className="chip-routes" viewBox="0 0 400 320" aria-hidden="true">
            <path d="M22 58H94V94H198V48H366" />
            <path d="M38 268H128V226H282V286H374" />
            <path d="M112 22V78H316V148H378" />
            <path d="M24 178H76V126H148V302" />
            <path d="M244 20V82H342V234H386" />
            <circle cx="94" cy="58" r="3" />
            <circle cx="198" cy="94" r="3" />
            <circle cx="128" cy="268" r="3" />
            <circle cx="282" cy="226" r="3" />
            <circle cx="316" cy="78" r="3" />
          </svg>
        </div>
        <div className="chip-meta" aria-hidden="true">
          <span>DIE 4.80 × 4.20</span>
          <span>UTIL 72%</span>
          <span>METAL 1–8</span>
        </div>
      </div>
      <figcaption className="sr-only">
        A top-down chip floorplan showing the core, memory macros, standard cells and routed metal
        connections.
      </figcaption>
    </figure>
  );
}