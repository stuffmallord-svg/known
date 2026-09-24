"use client";

import type { KnownMemory } from "./echo";

type EchoPanelProps = {
  memory: KnownMemory;
  reason: string;
  onClose: () => void;
  onTalk: () => void;
};

export default function EchoPanel({
  memory,
  reason,
  onClose,
  onTalk,
}: EchoPanelProps) {
  return (
    <div className="echo-panel">
      <div className="echo-panel__top">
        <div>
          <span className="echo-panel__eyebrow">ECHO / CONNECTION</span>
          <h2>Something from before.</h2>
        </div>

        <button
          type="button"
          className="echo-panel__close"
          onClick={onClose}
          aria-label="Close echo"
        >
          ×
        </button>
      </div>

      <div className="echo-panel__timeline">
        <div className="echo-panel__line" />

        <section className="echo-panel__moment">
          <span className="echo-panel__label">THEN</span>

          <div className="echo-panel__date">
            {memory.date}
          </div>

          <h3>{memory.title}</h3>

          <p>{memory.text}</p>

          <div className="echo-panel__tags">
            {memory.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </section>

        <section className="echo-panel__moment echo-panel__moment--now">
          <span className="echo-panel__label">NOW</span>

          <div className="echo-panel__connection">
            <span />
            <strong>THIS CAME BACK</strong>
          </div>

          <p>{reason}</p>

          <button
            type="button"
            className="echo-panel__talk"
            onClick={onTalk}
          >
            TALK ABOUT THIS
            <span>→</span>
          </button>
        </section>
      </div>
    </div>
  );
}