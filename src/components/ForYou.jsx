import { useRef, useState } from "react";
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
  const tabRefs = useRef([]);

  const activateMode = (index) => {
    setActiveModeId(modes[index].id);
    tabRefs.current[index]?.focus();
  };

  const handleTabKeyDown = (event, currentIndex) => {
    let nextIndex;

    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        nextIndex = (currentIndex + 1) % modes.length;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        nextIndex = (currentIndex - 1 + modes.length) % modes.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = modes.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    activateMode(nextIndex);
  };

  return (
    <section className="section for-you" id="for-you">
      <p className="section-title">Built For You</p>
      <div className="for-you-console">
        <h2>Tshepang's Mission Console</h2>
        <p className="for-you-lead">
          A tiny interface tuned to your style: structured, practical, and ready for real use.
        </p>

        <div className="mode-switches" role="tablist" aria-label="Select your mission mode">
          {modes.map((mode, index) => {
            const isActive = activeModeId === mode.id;

            return (
              <button
                key={mode.id}
                ref={(element) => {
                  tabRefs.current[index] = element;
                }}
                id={`mode-${mode.id}-tab`}
                type="button"
                role="tab"
                className={`mode-button ${mode.colorClass} ${isActive ? "active" : ""}`}
                aria-controls={`mode-${mode.id}-panel`}
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveModeId(mode.id)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
              >
                {mode.name}
              </button>
            );
          })}
        </div>

        {modes.map((mode) => (
          <article
            key={mode.id}
            id={`mode-${mode.id}-panel`}
            className={`mode-panel ${mode.colorClass}`}
            role="tabpanel"
            aria-labelledby={`mode-${mode.id}-tab`}
            hidden={activeModeId !== mode.id}
            tabIndex={0}
          >
            <p className="mode-mission">{mode.mission}</p>
            <ul>
              {mode.stack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
