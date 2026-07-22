// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import ForYou from "./ForYou.jsx";

afterEach(cleanup);

describe("ForYou mode switcher", () => {
  it("links each tab to its labelled panel and uses roving tab stops", () => {
    render(<ForYou />);

    const tabs = screen.getAllByRole("tab");
    const panels = screen.getAllByRole("tabpanel", { hidden: true });

    tabs.forEach((tab, index) => {
      expect(tab.getAttribute("aria-controls")).toBe(panels[index].id);
      expect(panels[index].getAttribute("aria-labelledby")).toBe(tab.id);
      expect(tab.tabIndex).toBe(index === 0 ? 0 : -1);
      expect(panels[index].hidden).toBe(index !== 0);
    });
  });

  it("activates and focuses tabs with arrow, Home, and End keys", () => {
    render(<ForYou />);

    const tabs = screen.getAllByRole("tab");
    const panels = screen.getAllByRole("tabpanel", { hidden: true });

    tabs[0].focus();
    fireEvent.keyDown(tabs[0], { key: "ArrowLeft" });

    expect(document.activeElement).toBe(tabs[2]);
    expect(tabs[2].getAttribute("aria-selected")).toBe("true");
    expect(tabs[2].tabIndex).toBe(0);
    expect(panels[2].hidden).toBe(false);

    fireEvent.keyDown(tabs[2], { key: "Home" });
    expect(document.activeElement).toBe(tabs[0]);
    expect(tabs[0].getAttribute("aria-selected")).toBe("true");

    fireEvent.keyDown(tabs[0], { key: "End" });
    expect(document.activeElement).toBe(tabs[2]);
    expect(tabs[2].getAttribute("aria-selected")).toBe("true");

    fireEvent.keyDown(tabs[2], { key: "ArrowRight" });
    expect(document.activeElement).toBe(tabs[0]);
    expect(tabs[0].getAttribute("aria-selected")).toBe("true");
  });
});
