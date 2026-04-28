import { useMemo, useState } from "react";
import "./ForYou.css";

const modes = [
  {
    id: "pilot",
    name: "Pilot Mode",
    colorClass: "is-blue",
    mission: "Scan first, then execute. Always fly the checklist before the sprint.",
    stack: ["Safety-first decisions", "Step-by-step execution", "Clear go/no-go criteria"],
  },
  {
    id: "engineer",
    name: "Engineer Mode",
    colorClass: "is-green",
    mission: "Translate complexity into systems that survive real-world pressure.",
    stack: ["Design with margins", "Track constraints early", "Prototype before perfection"],
  },
  {
    id: "builder",
    name: "Builder Mode",
    colorClass: "is-yellow",
    mission: "Ship small, learn fast, compound every week.",
    stack: ["One user problem", "One useful release", "One measurable improvement"],
  },
];

export default function ForYou() {
  const [activeModeId, setActiveModeId] = useState(modes[0].id);

  const activeMode = useMemo(
    () => modes.find((mode) => mode.id === activeModeId) ?? modes[0],
    [activeModeId]
  );

  return (
    <section className="section for-you" id="for-you">
      <p className="section-title">Built For You</p>
      <div className="for-you-console">
        <h2>Tshepang's Mission Console</h2>
        <p className="for-you-lead">
          A tiny interface tuned to your style: structured, practical, and ready for real use.
        </p>

        <div className="mode-switches" role="tablist" aria-label="Select your mission mode">
          {modes.map((mode) => (
            <button
              key={mode.id}
              type="button"
              role="tab"
              className={`mode-button ${mode.colorClass} ${activeMode.id === mode.id ? "active" : ""}`}
              aria-selected={activeMode.id === mode.id}
              onClick={() => setActiveModeId(mode.id)}
            >
              {mode.name}
            </button>
          ))}
        </div>

        <article className={`mode-panel ${activeMode.colorClass}`} role="tabpanel">
          <p className="mode-mission">{activeMode.mission}</p>
          <ul>
            {activeMode.stack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
