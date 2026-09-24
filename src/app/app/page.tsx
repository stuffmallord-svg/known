"use client";

import type { FormEvent, ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";

type View = "now" | "talk" | "memory" | "chapters" | "world";

type Memory = {
  id: string;
  title: string;
  text: string;
  date: string;
  type: string;
  tags: string[];
};

type Observation = {
  id: string;
  title: string;
  text: string;
  tag: string;
  strength: number;
  evidence: string;
};

type WorldItem = {
  id: string;
  label: string;
  x: number;
  y: number;
  size: number;
  description: string;
};

type Chapter = {
  id: string;
  title: string;
  period: string;
  subtitle: string;
  description: string;
  signals: string[];
};

type Message = {
  role: "known" | "user";
  text: string;
};

type EchoMatch = {
  memory: Memory;
  reason: string;
  matchedTags: string[];
};

const STORAGE_KEY = "known:memories";

const NAV: {
  id: View;
  label: string;
  description: string;
}[] = [
  { id: "now", label: "HOME", description: "Your field" },
  { id: "talk", label: "TALK", description: "Conversation" },
  { id: "memory", label: "MEMORY", description: "What remains" },
  { id: "chapters", label: "CHAPTERS", description: "Periods" },
  { id: "world", label: "WORLD", description: "Your universe" },
];

const initialMemories: Memory[] = [
  {
    id: "memory-silver",
    title: "The silver direction",
    text:
      "You wanted KNOWN to move toward silver, graphite and black — closer to the feeling of a physical product than a typical AI interface.",
    date: "Sep 2026",
    type: "OBSERVATION",
    tags: ["design", "silver", "black", "known"],
  },
  {
    id: "memory-shape",
    title: "The project changed shape",
    text:
      "The concept started as MIRROR. You renamed it KNOWN because the idea became less about reflection and more about being known.",
    date: "Sep 2026",
    type: "MILESTONE",
    tags: ["known", "product", "identity"],
  },
  {
    id: "memory-friend",
    title: "You wanted a digital friend",
    text:
      "The goal was not another AI dashboard. You wanted something that gradually gets to know your world and brings things back at the right moment.",
    date: "Sep 2026",
    type: "FOUNDATION",
    tags: ["known", "friend", "ai", "product"],
  },
  {
    id: "memory-contrast",
    title: "You keep returning to contrast",
    text:
      "Dark and light keep appearing together across music, visuals, interfaces and the things you choose to build.",
    date: "Sep 2026",
    type: "PATTERN",
    tags: ["visuals", "design", "contrast", "music"],
  },
  {
    id: "memory-building",
    title: "You are building, not collecting",
    text:
      "A lot of what you save eventually turns into something tangible: a project, a visual system, a track or a prototype.",
    date: "Sep 2026",
    type: "PATTERN",
    tags: ["building", "projects", "design", "music"],
  },
];

const observations: Observation[] = [
  {
    id: "observation-contrast",
    title: "You keep returning to contrast.",
    text:
      "Across music, visual references and interfaces, dark and light keep appearing together.",
    tag: "AESTHETIC",
    strength: 91,
    evidence: "14 connected signals",
  },
  {
    id: "observation-building",
    title: "You are building, not collecting.",
    text:
      "A lot of what you save eventually becomes something — a project, visual, track or prototype.",
    tag: "BEHAVIOR",
    strength: 84,
    evidence: "9 active threads",
  },
  {
    id: "observation-cars",
    title: "Cars keep becoming visual language.",
    text:
      "They appear less as objects and more as atmosphere: chrome, interiors, speed, night and movement.",
    tag: "WORLD",
    strength: 76,
    evidence: "23 related signals",
  },
  {
    id: "observation-discovered",
    title: "You prefer things that feel discovered.",
    text:
      "When something feels too obvious or conventionally polished, you tend to move away from it.",
    tag: "PREFERENCE",
    strength: 72,
    evidence: "6 recent decisions",
  },
];

const worldItems: WorldItem[] = [
  {
    id: "known",
    label: "KNOWN",
    x: 52,
    y: 50,
    size: 1.28,
    description:
      "The meeting point between the things you make, notice and return to.",
  },
  {
    id: "music",
    label: "MUSIC",
    x: 48,
    y: 24,
    size: 1,
    description:
      "Music, sound, artists, tracks and the atmosphere around them.",
  },
  {
    id: "visuals",
    label: "VISUALS",
    x: 22,
    y: 45,
    size: 0.96,
    description:
      "Images, references, visual language and things that shape the aesthetic field.",
  },
  {
    id: "design",
    label: "DESIGN",
    x: 72,
    y: 38,
    size: 1.04,
    description:
      "Interfaces, typography, products and systems you keep shaping.",
  },
  {
    id: "night",
    label: "NIGHT",
    x: 38,
    y: 72,
    size: 0.86,
    description:
      "A recurring atmosphere around cities, music, light and movement.",
  },
  {
    id: "cars",
    label: "CARS",
    x: 78,
    y: 67,
    size: 0.94,
    description:
      "Cars as objects, environments and visual language.",
  },
  {
    id: "tech",
    label: "TECH",
    x: 16,
    y: 71,
    size: 0.82,
    description:
      "Tools, software, interfaces and the desire to make things work.",
  },
  {
    id: "identity",
    label: "IDENTITY",
    x: 84,
    y: 20,
    size: 0.82,
    description:
      "Names, direction, presentation and what something should become.",
  },
];

const chapters: Chapter[] = [
  {
    id: "chapter-01",
    title: "Building a new direction",
    period: "NOW",
    subtitle: "ACTIVE",
    description:
      "Scattered ideas are becoming one clearer system with its own identity.",
    signals: ["known", "design", "product", "building"],
  },
  {
    id: "chapter-02",
    title: "The visual search",
    period: "RECENT",
    subtitle: "AESTHETIC",
    description:
      "Dark visuals, silver surfaces, music and the search for a visual language that feels personal.",
    signals: ["visuals", "silver", "music", "contrast"],
  },
  {
    id: "chapter-03",
    title: "Finding the shape",
    period: "EARLIER",
    subtitle: "EXPLORING",
    description:
      "Ideas changed names and forms until the direction started feeling more specific.",
    signals: ["identity", "ideas", "experiments"],
  },
];

const STOP_WORDS = new Set([
  "the",
  "and",
  "that",
  "this",
  "with",
  "from",
  "into",
  "your",
  "you",
  "are",
  "was",
  "were",
  "have",
  "has",
  "will",
  "want",
  "just",
  "about",
  "what",
  "when",
  "where",
  "then",
  "than",
  "they",
  "them",
  "their",
  "there",
  "here",
  "like",
  "feel",
  "really",
  "very",
  "something",
  "keep",
  "keeps",
  "does",
  "doing",
  "been",
]);

function words(value: string) {
  return value
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .split(/\s+/)
    .filter(
      (word) =>
        word.length >= 4 && !STOP_WORDS.has(word),
    );
}

function findEcho(
  message: string,
  memories: Memory[],
): EchoMatch | null {
  if (!message.trim() || memories.length === 0) {
    return null;
  }

  const currentWords = new Set(words(message));

  const ranked = memories
    .map((memory) => {
      const memoryWords = new Set(
        words(
          [
            memory.title,
            memory.text,
            memory.type,
            ...memory.tags,
          ].join(" "),
        ),
      );

      const matchedWords = [...currentWords].filter(
        (word) => memoryWords.has(word),
      );

      const lowered = message.toLowerCase();

      const matchedTags = memory.tags.filter(
        (tag) => lowered.includes(tag.toLowerCase()),
      );

      let score = 0;

      score += matchedWords.length * 2;
      score += matchedTags.length * 6;

      if (
        lowered.includes(
          memory.title.toLowerCase().slice(0, 10),
        )
      ) {
        score += 5;
      }

      return {
        memory,
        matchedWords,
        matchedTags,
        score,
      };
    })
    .filter((item) => item.score >= 4)
    .sort((a, b) => b.score - a.score);

  const best = ranked[0];

  if (!best) {
    return null;
  }

  const evidence =
    best.matchedTags.length > 0
      ? best.matchedTags.join(", ")
      : best.matchedWords
          .slice(0, 3)
          .join(", ");

  return {
    memory: best.memory,
    matchedTags: best.matchedTags,
    reason: evidence
      ? `This connects to something you mentioned earlier around ${evidence}.`
      : "This connects to something you mentioned earlier.",
  };
}

function buildKnownReply(
  message: string,
  memories: Memory[],
) {
  const echo = findEcho(message, memories);
  const lower = message.toLowerCase();

  if (echo) {
    return {
      echo,
      text: `This came back from something you told me before: ${echo.memory.text}`,
    };
  }

  if (
    lower.includes("who am i") ||
    lower.includes("do you know me") ||
    lower.includes("what do you know about me")
  ) {
    return {
      echo: null,
      text:
        "I only know what you choose to leave here. So far, your world looks like a mix of making things, shaping identity and returning to very specific visual signals.",
    };
  }

  if (
    lower.includes("what am i building") ||
    lower.includes("what am i making") ||
    lower.includes("what am i working on")
  ) {
    return {
      echo: null,
      text:
        "You are turning scattered ideas into one clearer system. KNOWN is the strongest expression of that direction right now.",
    };
  }

  if (
    lower.includes("design") ||
    lower.includes("visual") ||
    lower.includes("look") ||
    lower.includes("style")
  ) {
    return {
      echo: null,
      text:
        "Your visual choices keep getting more specific: black, graphite, silver, contrast and very small moments of signal color instead of loud decoration.",
    };
  }

  return {
    echo: null,
    text:
      "I’m listening. Keep going. What matters is usually what keeps returning.",
  };
}

function ArrowIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 12H18M13 6L19 12L13 18"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlusIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 5V19M5 12H19"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SearchIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="10.8"
        cy="10.8"
        r="5.8"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M15.2 15.2L20 20"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 6L18 18M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EqualizerIcon() {
  return (
    <span className="eq-icon" aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  );
}

function SignalArtwork({
  compact = false,
  interactive = false,
  accent = false,
}: {
  compact?: boolean;
  interactive?: boolean;
  accent?: boolean;
}) {
  const content = (
    <>
      <div className="artwork__grid" />
      <div className="artwork__cross artwork__cross--x" />
      <div className="artwork__cross artwork__cross--y" />

      <div className="artwork__rings artwork__rings--one" />
      <div className="artwork__rings artwork__rings--two" />
      <div className="artwork__rings artwork__rings--three" />

      <div className="artwork__line artwork__line--one" />
      <div className="artwork__line artwork__line--two" />
      <div className="artwork__line artwork__line--three" />

      <span className="artwork__node artwork__node--one" />
      <span className="artwork__node artwork__node--two" />
      <span className="artwork__node artwork__node--three" />
      <span className="artwork__node artwork__node--four" />

      <div
        className={`artwork__signal ${
          accent ? "artwork__signal--accent" : ""
        }`}
      />

      <div className="artwork__core">
        <div className="artwork__core-inner" />
      </div>

      <div className="artwork__label artwork__label--top">
        FIELD / 01
      </div>

      <div className="artwork__label artwork__label--bottom">
        KNOWN / ACTIVE
      </div>
    </>
  );

  if (interactive) {
    return (
      <button
        type="button"
        className={`artwork artwork--interactive ${
          compact ? "artwork--compact" : ""
        }`}
        aria-label="Open signal field"
      >
        {content}
      </button>
    );
  }

  return (
    <div
      className={`artwork ${
        compact ? "artwork--compact" : ""
      }`}
    >
      {content}
    </div>
  );
}

function Modal({
  title,
  eyebrow,
  children,
  onClose,
  wide = false,
}: {
  title: string;
  eyebrow?: string;
  children: ReactNode;
  onClose: () => void;
  wide?: boolean;
}) {
  return (
    <div
      className="modal-backdrop"
      onMouseDown={onClose}
    >
      <div
        className={`modal ${
          wide ? "modal--wide" : ""
        }`}
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >
        <div className="modal__head">
          <div>
            {eyebrow ? (
              <span className="section-kicker">
                {eyebrow}
              </span>
            ) : null}

            <h2>{title}</h2>
          </div>

          <button
            type="button"
            className="icon-button"
            onClick={onClose}
            aria-label="Close"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="modal__body">
          {children}
        </div>
      </div>
    </div>
  );
}

function EchoModal({
  echo,
  onClose,
  onTalk,
}: {
  echo: EchoMatch;
  onClose: () => void;
  onTalk: () => void;
}) {
  return (
    <div
      className="modal-backdrop"
      onMouseDown={onClose}
    >
      <div
        className="echo-modal"
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >
        <div className="echo-modal__top">
          <div>
            <span className="echo-modal__eyebrow">
              ECHO / CONNECTION
            </span>
            <h2>Something came back.</h2>
          </div>

          <button
            type="button"
            className="icon-button"
            onClick={onClose}
            aria-label="Close"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="echo-modal__body">
          <div className="echo-flow">
            <div className="echo-flow__side">
              <span className="echo-flow__label">
                THEN
              </span>
              <span className="echo-flow__date">
                {echo.memory.date}
              </span>
              <h3>{echo.memory.title}</h3>
              <p>{echo.memory.text}</p>

              <div className="tag-row">
                {echo.memory.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>

            <div className="echo-flow__center">
              <div className="echo-flow__axis" />
              <span className="echo-flow__dot" />
              <strong>THIS CAME BACK</strong>
              <small>
                {echo.matchedTags.length
                  ? echo.matchedTags.join(" · ")
                  : "CONNECTED SIGNAL"}
              </small>
            </div>

            <div className="echo-flow__side echo-flow__side--now">
              <span className="echo-flow__label">
                NOW
              </span>

              <span className="echo-flow__date">
                JUST NOW
              </span>

              <h3>
                The same signal
                <br />
                is visible again.
              </h3>

              <p>{echo.reason}</p>

              <button
                type="button"
                className="pill-button pill-button--silver"
                onClick={onTalk}
              >
                TALK ABOUT THIS
                <ArrowIcon size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function KnownApp() {
  const [view, setView] = useState<View>("now");
  const [memories, setMemories] =
    useState<Memory[]>(initialMemories);
  const [memoriesReady, setMemoriesReady] =
    useState(false);

  const [activeObservation, setActiveObservation] =
    useState<Observation | null>(null);
  const [activeMemory, setActiveMemory] =
    useState<Memory | null>(null);
  const [activeChapter, setActiveChapter] =
    useState<Chapter | null>(null);
  const [activeWorld, setActiveWorld] =
    useState<WorldItem | null>(null);
  const [activeEcho, setActiveEcho] =
    useState<EchoMatch | null>(null);

  const [showAddMemory, setShowAddMemory] =
    useState(false);
  const [showSearch, setShowSearch] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [messages, setMessages] =
    useState<Message[]>([
      {
        role: "known",
        text:
          "I know a few things about your world already. Tell me what’s on your mind.",
      },
    ]);

  const [memoryTitle, setMemoryTitle] =
    useState("");
  const [memoryText, setMemoryText] =
    useState("");

  useEffect(() => {
    try {
      const stored =
        window.localStorage.getItem(
          STORAGE_KEY,
        );

      if (stored) {
        const parsed: unknown =
          JSON.parse(stored);

        if (Array.isArray(parsed)) {
          const valid = parsed.filter(
            (item): item is Memory =>
              Boolean(item) &&
              typeof item === "object" &&
              typeof (
                item as Record<string, unknown>
              ).id === "string" &&
              typeof (
                item as Record<string, unknown>
              ).title === "string" &&
              typeof (
                item as Record<string, unknown>
              ).text === "string" &&
              typeof (
                item as Record<string, unknown>
              ).date === "string" &&
              typeof (
                item as Record<string, unknown>
              ).type === "string" &&
              Array.isArray(
                (item as Record<string, unknown>)
                  .tags,
              ),
          );

          if (valid.length) {
            setMemories(valid);
          }
        }
      }
    } catch (error) {
      console.error(
        "KNOWN memory load failed:",
        error,
      );
    } finally {
      setMemoriesReady(true);
    }
  }, []);

  useEffect(() => {
    if (!memoriesReady) return;

    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(memories),
      );
    } catch (error) {
      console.error(
        "KNOWN memory save failed:",
        error,
      );
    }
  }, [memories, memoriesReady]);

  useEffect(() => {
    const onKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (
        (event.metaKey || event.ctrlKey) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();
        setShowSearch(true);
      }

      if (event.key === "Escape") {
        setShowSearch(false);
        setShowAddMemory(false);
        setActiveObservation(null);
        setActiveMemory(null);
        setActiveChapter(null);
        setActiveWorld(null);
        setActiveEcho(null);
      }
    };

    window.addEventListener(
      "keydown",
      onKeyDown,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        onKeyDown,
      );
    };
  }, []);

  const navigate = (nextView: View) => {
    setView(nextView);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const worldCounts = useMemo(() => {
    const counts: Record<
      string,
      number
    > = {};

    memories.forEach((memory) => {
      memory.tags.forEach((tag) => {
        const key =
          tag.toLowerCase();

        counts[key] =
          (counts[key] ?? 0) + 1;
      });
    });

    return counts;
  }, [memories]);

  const searchResults = useMemo(() => {
    const query =
      search.trim().toLowerCase();

    const observationResults =
      observations
        .filter((item) => {
          if (!query) return true;

          return (
            item.title
              .toLowerCase()
              .includes(query) ||
            item.text
              .toLowerCase()
              .includes(query) ||
            item.tag
              .toLowerCase()
              .includes(query)
          );
        })
        .map((item) => ({
          kind: "observation" as const,
          id: item.id,
          title: item.title,
          subtitle: item.tag,
        }));

    const memoryResults =
      memories
        .filter((item) => {
          if (!query) return true;

          return (
            item.title
              .toLowerCase()
              .includes(query) ||
            item.text
              .toLowerCase()
              .includes(query) ||
            item.type
              .toLowerCase()
              .includes(query) ||
            item.tags.some((tag) =>
              tag
                .toLowerCase()
                .includes(query),
            )
          );
        })
        .map((item) => ({
          kind: "memory" as const,
          id: item.id,
          title: item.title,
          subtitle: item.type,
        }));

    return [
      ...observationResults,
      ...memoryResults,
    ].slice(0, 10);
  }, [memories, search]);

  const submitMessage = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const value =
      message.trim();

    if (!value) return;

    const result =
      buildKnownReply(
        value,
        memories,
      );

    setMessages((current) => [
      ...current,
      {
        role: "user",
        text: value,
      },
      {
        role: "known",
        text: result.text,
      },
    ]);

    if (result.echo) {
      setActiveEcho(result.echo);
    }

    setMessage("");
  };

  const saveMemory = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const title =
      memoryTitle.trim();

    const text =
      memoryText.trim();

    if (!title || !text) return;

    const newMemory: Memory = {
      id:
        typeof crypto !== "undefined" &&
        "randomUUID" in crypto
          ? crypto.randomUUID()
          : String(Date.now()),
      title,
      text,
      date: "Just now",
      type: "PERSONAL",
      tags: ["manual"],
    };

    setMemories((current) => [
      newMemory,
      ...current,
    ]);

    setMemoryTitle("");
    setMemoryText("");
    setShowAddMemory(false);
  };

  const openBestEcho = () => {
    const selected =
      findEcho(
        "design silver black known music visual",
        memories,
      );

    if (selected) {
      setActiveEcho(selected);
      return;
    }

    if (memories[0]) {
      setActiveEcho({
        memory: memories[0],
        matchedTags: [],
        reason:
          "This is one of the signals that currently sits closest to the center of your field.",
      });
    }
  };

  const surpriseMe = () => {
    const index =
      Math.floor(
        Math.random() *
          observations.length,
      );

    setActiveObservation(
      observations[index],
    );
  };

  const renderSidebar = () => (
    <aside className="sidebar">
      <div>
        <button
          type="button"
          className="sidebar-logo"
          onClick={() => navigate("now")}
        >
          <span className="sidebar-logo__mark">
            <span />
          </span>

          <span className="sidebar-logo__name">
            KNOWN
          </span>
        </button>

        <nav className="sidebar-nav">
          {NAV.map((item, index) => (
            <button
              type="button"
              key={item.id}
              className={`sidebar-nav__item ${
                view === item.id
                  ? "sidebar-nav__item--active"
                  : ""
              }`}
              onClick={() =>
                navigate(item.id)
              }
            >
              <span className="sidebar-nav__icon">
                {String(index + 1).padStart(
                  2,
                  "0",
                )}
              </span>

              <span className="sidebar-nav__copy">
                <strong>
                  {item.label}
                </strong>
                <small>
                  {item.description}
                </small>
              </span>

              <span className="sidebar-nav__active" />
            </button>
          ))}
        </nav>
      </div>

      <div className="sidebar-library">
        <div className="sidebar-library__head">
          RECENT SIGNALS
        </div>

        {memories
          .slice(0, 2)
          .map((memory, index) => (
            <button
              type="button"
              className="sidebar-library__item"
              key={memory.id}
              onClick={() =>
                setActiveMemory(
                  memory,
                )
              }
            >
              <span
                className={`sidebar-library__art sidebar-library__art--${
                  index === 0
                    ? "a"
                    : "b"
                }`}
              />

              <span>
                <strong>
                  {memory.title}
                </strong>

                <small>
                  {memory.type}
                </small>
              </span>
            </button>
          ))}

        <div className="sidebar-footer">
          <span>PERSONAL FIELD</span>
          <span>2026</span>
        </div>
      </div>
    </aside>
  );

  const renderTopbar = () => (
    <header className="topbar">
      <div className="topbar__mobile-brand">
        KNOWN
      </div>

      <button
        type="button"
        className="search-bar"
        onClick={() =>
          setShowSearch(true)
        }
      >
        <SearchIcon size={17} />

        <span>
          Search your world
        </span>

        <kbd>⌘ K</kbd>
      </button>

      <div className="topbar__right">
        <span className="topbar__live">
          <span />
          FIELD ONLINE
        </span>

        <div className="topbar-avatar">
          K
        </div>
      </div>
    </header>
  );

  const renderHome = () => (
    <div className="home">
      <section className="home-hero">
        <div className="home-hero__text">
          <div className="home-hero__eyebrow">
            <span />
            KNOWN / PRESENT
          </div>

          <h1>
            Someone who
            <br />
            <em>knows your world.</em>
          </h1>

          <p>
            I remember what you tell me.
            I notice what keeps
            returning.
          </p>

          <div className="home-hero__buttons">
            <button
              type="button"
              className="pill-button pill-button--silver"
              onClick={() =>
                navigate("talk")
              }
            >
              TALK TO KNOWN
              <ArrowIcon size={14} />
            </button>

            <button
              type="button"
              className="ghost-button"
              onClick={surpriseMe}
            >
              SHOW ME A SIGNAL
            </button>
          </div>

          <div className="hero-microcopy">
            <span>
              LIVE MEMORY SYSTEM
            </span>
            <span>
              {String(
                memories.length,
              ).padStart(2, "0")}{" "}
              MEMORIES
            </span>
          </div>
        </div>

        <div className="home-hero__art">
          <SignalArtwork
            compact
            interactive
            accent
          />

          <div className="home-hero__art-meta">
            <span>FIELD 01</span>
            <strong>
              ACTIVE
            </strong>
          </div>
        </div>
      </section>

      <section className="shelf-section">
        <div className="shelf-header">
          <div>
            <span className="section-kicker">
              I NOTICED
            </span>

            <h2>
              Something keeps
              <br className="desktop-only" />
              returning.
            </h2>
          </div>

          <button
            type="button"
            className="shelf-link"
            onClick={() =>
              navigate("talk")
            }
          >
            TALK ABOUT IT
            <ArrowIcon size={13} />
          </button>
        </div>

        <div className="observation-shelf">
          {observations.map(
            (item, index) => (
              <button
                type="button"
                className={`observation-card ${
                  index === 0
                    ? "observation-card--featured"
                    : ""
                }`}
                key={item.id}
                onClick={() =>
                  setActiveObservation(
                    item,
                  )
                }
              >
                <div className="observation-card__art">
                  <span className="observation-card__orb" />
                  <span className="observation-card__wire" />
                  <span className="observation-card__scan" />
                  <span className="observation-card__code">
                    {String(
                      index + 1,
                    ).padStart(
                      2,
                      "0",
                    )}
                  </span>
                </div>

                <div className="observation-card__content">
                  <div className="observation-card__type">
                    {item.tag}
                  </div>

                  <h3>{item.title}</h3>

                  <p>{item.text}</p>

                  <div className="observation-card__bottom">
                    <span>
                      {item.evidence}
                    </span>
                    <ArrowIcon size={12} />
                  </div>
                </div>
              </button>
            ),
          )}
        </div>
      </section>

      <section className="shelf-section">
        <div className="shelf-header">
          <div>
            <span className="section-kicker">
              ECHO
            </span>

            <h2>
              The past can show up
              <br className="desktop-only" />
              again.
            </h2>
          </div>
        </div>

        <div className="echo-feature">
          <div className="echo-feature__art">
            <SignalArtwork accent />
            <div className="echo-feature__signal">
              <span />
              LIVE CONNECTION
            </div>
          </div>

          <div className="echo-feature__copy">
            <span className="section-kicker">
              ECHO / CONNECTION
            </span>

            <h3>
              Something you said
              <br />
              before is still here.
            </h3>

            <p>
              KNOWN looks across your
              memories for a signal that
              suddenly becomes relevant
              again.
            </p>

            <button
              type="button"
              className="text-arrow"
              onClick={openBestEcho}
            >
              OPEN AN ECHO
              <ArrowIcon size={14} />
            </button>
          </div>
        </div>
      </section>

      <section className="shelf-section">
        <div className="shelf-header">
          <div>
            <span className="section-kicker">
              YOUR WORLD
            </span>

            <h2>
              The things around you.
            </h2>
          </div>

          <button
            type="button"
            className="shelf-link"
            onClick={() =>
              navigate("world")
            }
          >
            OPEN WORLD
            <ArrowIcon size={13} />
          </button>
        </div>

        <div className="world-shelf">
          {[
            "MUSIC",
            "VISUALS",
            "CARS",
            "DESIGN",
            "NIGHT",
          ].map((item, index) => {
            const world =
              worldItems.find(
                (worldItem) =>
                  worldItem.label ===
                  item,
              );

            const fallbackCount =
              index + 3;

            const count =
              worldCounts[
                item.toLowerCase()
              ] ??
              fallbackCount;

            return (
              <button
                type="button"
                key={item}
                className="world-tile"
                onClick={() => {
                  if (world) {
                    setActiveWorld(
                      world,
                    );
                  }
                }}
              >
                <div
                  className={`world-tile__art tile-${index + 1}`}
                >
                  <span />
                  <i />
                </div>

                <div className="world-tile__copy">
                  <strong>
                    {item}
                  </strong>

                  <small>
                    {count} connected
                    signals
                  </small>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="shelf-section shelf-section--last">
        <div className="shelf-header">
          <div>
            <span className="section-kicker">
              MEMORY
            </span>

            <h2>
              What remains.
            </h2>
          </div>

          <button
            type="button"
            className="shelf-link"
            onClick={() =>
              navigate("memory")
            }
          >
            OPEN MEMORY
            <ArrowIcon size={13} />
          </button>
        </div>

        <div className="memory-shelf">
          {memories
            .slice(0, 3)
            .map((memory, index) => (
              <button
                type="button"
                key={memory.id}
                className="memory-card"
                onClick={() =>
                  setActiveMemory(
                    memory,
                  )
                }
              >
                <span className="memory-card__number">
                  {String(
                    index + 1,
                  ).padStart(2, "0")}
                </span>

                <div>
                  <span className="memory-card__type">
                    {memory.type}
                  </span>

                  <h3>
                    {memory.title}
                  </h3>

                  <p>
                    {memory.text}
                  </p>
                </div>

                <ArrowIcon size={13} />
              </button>
            ))}
        </div>
      </section>
    </div>
  );

  const renderTalk = () => (
    <div className="inner-page">
      <div className="inner-page__head">
        <div>
          <span className="section-kicker">
            TALK / LIVE
          </span>

          <h1>
            Tell me what’s
            happening.
          </h1>

          <p>
            No structure needed.
            Just say what is on your
            mind.
          </p>
        </div>

        <div className="status-chip">
          <span />
          KNOWN IS LISTENING
        </div>
      </div>

      <div className="talk-layout">
        <div className="talk-feed">
          {messages.map(
            (item, index) => (
              <div
                key={`${item.role}-${index}`}
                className={`talk-message ${
                  item.role === "known"
                    ? "talk-message--known"
                    : "talk-message--you"
                }`}
              >
                <div className="talk-message__meta">
                  <span>
                    {item.role === "known"
                      ? "KNOWN"
                      : "YOU"}
                  </span>

                  <span>
                    {String(
                      index + 1,
                    ).padStart(
                      2,
                      "0",
                    )}
                  </span>
                </div>

                <p>
                  {item.text}
                </p>
              </div>
            ),
          )}

          <form
            className="talk-box"
            onSubmit={
              submitMessage
            }
          >
            <textarea
              value={message}
              onChange={(event) =>
                setMessage(
                  event.target.value,
                )
              }
              rows={5}
              placeholder="Say anything..."
            />

            <div className="talk-box__footer">
              <span>
                LIVE / MEMORY AWARE
              </span>

              <button
                type="submit"
                className="pill-button pill-button--silver"
              >
                SEND
                <ArrowIcon size={14} />
              </button>
            </div>
          </form>
        </div>

        <aside className="talk-aside">
          <SignalArtwork
            compact
            accent
          />

          <div className="aside-section">
            <span className="section-kicker">
              CURRENT SIGNAL
            </span>

            <h3>
              Building something new.
            </h3>

            <p>
              Your recent activity
              keeps converging around
              making, design,
              technology and a clearer
              direction.
            </p>
          </div>

          <div className="aside-section">
            <span className="section-kicker">
              REMEMBER
            </span>

            {memories[0] ? (
              <button
                type="button"
                className="aside-memory"
                onClick={() =>
                  setActiveMemory(
                    memories[0],
                  )
                }
              >
                <span>
                  01
                </span>

                <strong>
                  {memories[0].title}
                </strong>

                <ArrowIcon
                  size={13}
                />
              </button>
            ) : null}
          </div>
        </aside>
      </div>
    </div>
  );

  const renderMemory = () => (
    <div className="inner-page">
      <div className="inner-page__head inner-page__head--split">
        <div>
          <span className="section-kicker">
            MEMORY / ARCHIVE
          </span>

          <h1>
            What I remember.
          </h1>

          <p>
            Not everything. Just the
            things that may matter
            later.
          </p>
        </div>

        <button
          type="button"
          className="pill-button pill-button--outline"
          onClick={() =>
            setShowAddMemory(true)
          }
        >
          ADD MEMORY
          <PlusIcon size={15} />
        </button>
      </div>

      <div className="memory-stats">
        <div>
          <span>TOTAL</span>
          <strong>
            {String(
              memories.length,
            ).padStart(
              2,
              "0",
            )}
          </strong>
        </div>

        <div>
          <span>THREADS</span>
          <strong>
            {String(
              new Set(
                memories.flatMap(
                  (memory) =>
                    memory.tags,
                ),
              ).size,
            ).padStart(
              2,
              "0",
            )}
          </strong>
        </div>

        <div>
          <span>CHAPTERS</span>
          <strong>
            {String(
              chapters.length,
            ).padStart(
              2,
              "0",
            )}
          </strong>
        </div>
      </div>

      <div className="full-list">
        {memories.map(
          (memory, index) => (
            <button
              type="button"
              className="full-list__row"
              key={memory.id}
              onClick={() =>
                setActiveMemory(
                  memory,
                )
              }
            >
              <span className="full-list__index">
                {String(
                  index + 1,
                ).padStart(
                  2,
                  "0",
                )}
              </span>

              <div>
                <span className="full-list__meta">
                  {memory.type} ·{" "}
                  {memory.date}
                </span>

                <h3>
                  {memory.title}
                </h3>

                <p>
                  {memory.text}
                </p>

                <div className="tag-row">
                  {memory.tags.map(
                    (tag) => (
                      <span
                        key={tag}
                      >
                        {tag}
                      </span>
                    ),
                  )}
                </div>
              </div>

              <ArrowIcon size={14} />
            </button>
          ),
        )}
      </div>
    </div>
  );

  const renderChapters = () => (
    <div className="inner-page">
      <div className="inner-page__head">
        <div>
          <span className="section-kicker">
            CHAPTERS / TIME
          </span>

          <h1>
            Your life is not
            one timeline.
          </h1>

          <p>
            Chapters appear when
            enough signals start
            behaving like a period.
          </p>
        </div>
      </div>

      <div className="chapters">
        {chapters.map(
          (chapter, index) => (
            <button
              type="button"
              key={chapter.id}
              className={`chapter ${
                index === 0
                  ? "chapter--active"
                  : ""
              }`}
              onClick={() =>
                setActiveChapter(
                  chapter,
                )
              }
            >
              <div className="chapter__art">
                <span className="chapter__art-number">
                  {String(
                    index + 1,
                  ).padStart(
                    2,
                    "0",
                  )}
                </span>

                <span className="chapter__art-ring chapter__art-ring--one" />
                <span className="chapter__art-ring chapter__art-ring--two" />
                <span className="chapter__art-ring chapter__art-ring--three" />

                <span className="chapter__art-dot" />
              </div>

              <div className="chapter__content">
                <span className="chapter__period">
                  {chapter.period}{" "}
                  ·{" "}
                  {chapter.subtitle}
                </span>

                <h2>
                  {chapter.title}
                </h2>

                <p>
                  {
                    chapter.description
                  }
                </p>

                <div className="tag-row">
                  {chapter.signals.map(
                    (signal) => (
                      <span
                        key={signal}
                      >
                        {signal}
                      </span>
                    ),
                  )}
                </div>
              </div>

              <ArrowIcon size={14} />
            </button>
          ),
        )}
      </div>
    </div>
  );

  const renderWorld = () => (
    <div className="inner-page">
      <div className="inner-page__head">
        <div>
          <span className="section-kicker">
            WORLD / CONSTELLATION
          </span>

          <h1>
            The things that
            make up your world.
          </h1>

          <p>
            Interests overlap,
            influence each other
            and create new
            directions.
          </p>
        </div>
      </div>

      <div className="world-page">
        <div className="world-field">
          <div className="world-field__grid" />

          <svg
            className="world-field__connections"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <line
              x1="52"
              y1="50"
              x2="48"
              y2="24"
            />
            <line
              x1="52"
              y1="50"
              x2="22"
              y2="45"
            />
            <line
              x1="52"
              y1="50"
              x2="72"
              y2="38"
            />
            <line
              x1="52"
              y1="50"
              x2="38"
              y2="72"
            />
            <line
              x1="52"
              y1="50"
              x2="78"
              y2="67"
            />
            <line
              x1="52"
              y1="50"
              x2="16"
              y2="71"
            />
            <line
              x1="52"
              y1="50"
              x2="84"
              y2="20"
            />
          </svg>

          {worldItems.map(
            (item) => (
              <button
                type="button"
                key={item.id}
                className={`world-point ${
                  item.id ===
                  "known"
                    ? "world-point--primary"
                    : ""
                }`}
                style={{
                  left: `${item.x}%`,
                  top: `${item.y}%`,
                  transform: `translate(-50%, -50%) scale(${item.size})`,
                }}
                onClick={() =>
                  setActiveWorld(
                    item,
                  )
                }
              >
                <span />
                <strong>
                  {item.label}
                </strong>
              </button>
            ),
          )}

          <div className="world-field__readout world-field__readout--top">
            <span>
              FIELD DENSITY
            </span>

            <strong>
              0.78
            </strong>
          </div>

          <div className="world-field__readout world-field__readout--bottom">
            <span>
              CONNECTIONS
            </span>

            <strong>
              {String(
                new Set(
                  memories.flatMap(
                    (memory) =>
                      memory.tags,
                  ),
                ).size,
              ).padStart(
                2,
                "0",
              )}
            </strong>
          </div>
        </div>

        <aside className="world-aside">
          <div className="aside-section">
            <span className="section-kicker">
              CENTER OF GRAVITY
            </span>

            <h3>KNOWN</h3>

            <p>
              A meeting point for
              design, technology,
              music, identity and
              the things you are
              becoming interested
              in.
            </p>
          </div>

          <div className="aside-section">
            <span className="section-kicker">
              ACTIVE NODES
            </span>

            {[
              "MUSIC",
              "DESIGN",
              "TECH",
            ].map(
              (item, index) => (
                <button
                  type="button"
                  className="world-aside__row"
                  key={item}
                  onClick={() => {
                    const world =
                      worldItems.find(
                        (entry) =>
                          entry.label ===
                          item,
                      );

                    if (world) {
                      setActiveWorld(
                        world,
                      );
                    }
                  }}
                >
                  <span>
                    {String(
                      index + 1,
                    ).padStart(
                      2,
                      "0",
                    )}
                  </span>

                  <strong>
                    {item}
                  </strong>

                  <ArrowIcon size={12} />
                </button>
              ),
            )}
          </div>
        </aside>
      </div>
    </div>
  );

  const renderView = () => {
    switch (view) {
      case "talk":
        return renderTalk();
      case "memory":
        return renderMemory();
      case "chapters":
        return renderChapters();
      case "world":
        return renderWorld();
      case "now":
      default:
        return renderHome();
    }
  };

  return (
    <main className="known-shell">
      <div className="ambient ambient--one" />
      <div className="ambient ambient--two" />
      <div className="noise" />

      {renderSidebar()}

      <div className="main-shell">
        {renderTopbar()}

        <div className="main-content">
          {renderView()}
        </div>
      </div>

      <div className="bottom-player">
        <div className="bottom-player__track">
          <div className="bottom-player__art">
            <SignalArtwork compact />
          </div>

          <div className="bottom-player__copy">
            <span>KNOWN / ACTIVE</span>
            <strong>
              Building a new direction
            </strong>
          </div>
        </div>

        <div className="bottom-player__center">
          <button
            type="button"
            className="player-button"
            onClick={openBestEcho}
            aria-label="Previous signal"
          >
            ↶
          </button>

          <button
            type="button"
            className="player-main"
            onClick={() =>
              navigate("talk")
            }
            aria-label="Talk to KNOWN"
          >
            <EqualizerIcon />
          </button>

          <button
            type="button"
            className="player-button"
            onClick={openBestEcho}
            aria-label="Next signal"
          >
            ↷
          </button>
        </div>

        <button
          type="button"
          className="bottom-player__right"
          onClick={() =>
            setShowAddMemory(true)
          }
        >
          ADD MEMORY
          <PlusIcon size={13} />
        </button>
      </div>

      <div className="mobile-nav">
        {NAV.map((item) => (
          <button
            type="button"
            key={item.id}
            className={
              view === item.id
                ? "is-active"
                : ""
            }
            onClick={() =>
              navigate(item.id)
            }
          >
            {item.label}
          </button>
        ))}
      </div>

      {activeObservation ? (
        <Modal
          title={
            activeObservation.title
          }
          eyebrow={
            activeObservation.tag
          }
          onClose={() =>
            setActiveObservation(null)
          }
        >
          <div className="modal-observation__score">
            <span>
              CONFIDENCE
            </span>

            <strong>
              {activeObservation.strength}%
            </strong>
          </div>

          <p className="modal-paragraph">
            {activeObservation.text}
          </p>

          <div className="modal-rule" />

          <div className="modal-grid">
            <div>
              <span>
                EVIDENCE
              </span>

              <strong>
                {
                  activeObservation.evidence
                }
              </strong>
            </div>

            <div>
              <span>
                STATUS
              </span>

              <strong>
                EMERGING
              </strong>
            </div>
          </div>
        </Modal>
      ) : null}

      {activeMemory ? (
        <Modal
          title={activeMemory.title}
          eyebrow={activeMemory.type}
          onClose={() =>
            setActiveMemory(null)
          }
        >
          <div className="modal-detail">
            <span>
              {activeMemory.date}
            </span>

            <p>
              {activeMemory.text}
            </p>

            <div className="tag-row">
              {activeMemory.tags.map(
                (tag) => (
                  <span key={tag}>
                    {tag}
                  </span>
                ),
              )}
            </div>
          </div>
        </Modal>
      ) : null}

      {activeChapter ? (
        <Modal
          title={activeChapter.title}
          eyebrow={
            activeChapter.period
          }
          onClose={() =>
            setActiveChapter(null)
          }
        >
          <div className="modal-detail">
            <span>
              {activeChapter.subtitle}
            </span>

            <p>
              {
                activeChapter.description
              }
            </p>

            <div className="tag-row">
              {activeChapter.signals.map(
                (signal) => (
                  <span key={signal}>
                    {signal}
                  </span>
                ),
              )}
            </div>
          </div>
        </Modal>
      ) : null}

      {activeWorld ? (
        <Modal
          title={activeWorld.label}
          eyebrow="WORLD SIGNAL"
          onClose={() =>
            setActiveWorld(null)
          }
        >
          <div className="modal-world">
            <SignalArtwork
              compact
              accent
            />

            <p className="modal-paragraph">
              {
                activeWorld.description
              }
            </p>

            <div className="modal-grid">
              <div>
                <span>
                  MEMORY SIGNAL
                </span>

                <strong>
                  {worldCounts[
                    activeWorld.label.toLowerCase()
                  ] ?? 0}
                </strong>
              </div>

              <div>
                <span>
                  STATUS
                </span>

                <strong>
                  ACTIVE
                </strong>
              </div>
            </div>
          </div>
        </Modal>
      ) : null}

      {activeEcho ? (
        <EchoModal
          echo={activeEcho}
          onClose={() =>
            setActiveEcho(null)
          }
          onTalk={() => {
            setActiveEcho(null);
            navigate("talk");
          }}
        />
      ) : null}

      {showAddMemory ? (
        <Modal
          title="Add something worth remembering."
          eyebrow="MEMORY / NEW"
          onClose={() =>
            setShowAddMemory(
              false,
            )
          }
        >
          <form
            className="add-memory"
            onSubmit={saveMemory}
          >
            <label>
              <span>TITLE</span>

              <input
                value={memoryTitle}
                onChange={(event) =>
                  setMemoryTitle(
                    event.target.value,
                  )
                }
                placeholder="Something I want KNOWN to remember"
              />
            </label>

            <label>
              <span>MEMORY</span>

              <textarea
                value={memoryText}
                onChange={(event) =>
                  setMemoryText(
                    event.target.value,
                  )
                }
                placeholder="Write it naturally..."
                rows={7}
              />
            </label>

            <button
              type="submit"
              className="pill-button pill-button--silver"
            >
              SAVE MEMORY
              <ArrowIcon size={14} />
            </button>
          </form>
        </Modal>
      ) : null}

      {showSearch ? (
        <div
          className="search-overlay"
          onMouseDown={() =>
            setShowSearch(false)
          }
        >
          <div
            className="search-panel"
            onMouseDown={(event) =>
              event.stopPropagation()
            }
          >
            <div className="search-panel__top">
              <div className="search-input">
                <SearchIcon size={18} />

                <input
                  autoFocus
                  value={search}
                  onChange={(event) =>
                    setSearch(
                      event.target.value,
                    )
                  }
                  placeholder="Search your world..."
                />
              </div>

              <button
                type="button"
                className="icon-button"
                onClick={() =>
                  setShowSearch(false)
                }
                aria-label="Close"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="search-panel__meta">
              <span>
                YOUR FIELD
              </span>

              <span>
                {searchResults.length}{" "}
                RESULTS
              </span>
            </div>

            <div className="search-results">
              {searchResults.length >
              0 ? (
                searchResults.map(
                  (result) => (
                    <button
                      type="button"
                      className="search-result"
                      key={`${result.kind}-${result.id}`}
                      onClick={() => {
                        setShowSearch(
                          false,
                        );

                        if (
                          result.kind ===
                          "observation"
                        ) {
                          const observation =
                            observations.find(
                              (item) =>
                                item.id ===
                                result.id,
                            );

                          if (
                            observation
                          ) {
                            setActiveObservation(
                              observation,
                            );
                          }
                        } else {
                          const memory =
                            memories.find(
                              (item) =>
                                item.id ===
                                result.id,
                            );

                          if (memory) {
                            setActiveMemory(
                              memory,
                            );
                          }
                        }
                      }}
                    >
                      <span>
                        {result.kind}
                      </span>

                      <div>
                        <strong>
                          {result.title}
                        </strong>

                        <small>
                          {
                            result.subtitle
                          }
                        </small>
                      </div>

                      <ArrowIcon size={13} />
                    </button>
                  ),
                )
              ) : (
                <div className="search-empty">
                  <span>
                    NO SIGNAL FOUND
                  </span>

                  <p>
                    Nothing in your field
                    matches that search.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}