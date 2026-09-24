import type { KnownMemory } from "./echo";
import { findEcho, formatEchoDate } from "./echo";

export type KnownReply = {
  text: string;
  echo: ReturnType<typeof findEcho>;
};

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function memoryMatches(
  message: string,
  memory: KnownMemory,
) {
  const words = new Set(
    normalize(message).filter((word) => word.length >= 4),
  );

  const haystack = normalize(
    `${memory.title} ${memory.text} ${memory.tags.join(" ")}`,
  );

  return haystack.filter((word) => words.has(word)).length;
}

function findRelevantMemories(
  message: string,
  memories: KnownMemory[],
) {
  return memories
    .map((memory) => ({
      memory,
      score: memoryMatches(message, memory),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

function buildReply(
  message: string,
  relevant: ReturnType<typeof findRelevantMemories>,
) {
  if (relevant.length === 0) {
    return "I'm listening. Tell me more.";
  }

  const memory = relevant[0].memory;

  const lower = message.toLowerCase();

  if (
    lower.includes("remember") ||
    lower.includes("what did i") ||
    lower.includes("what am i") ||
    lower.includes("who am i")
  ) {
    return `I remember this: ${memory.text}`;
  }

  if (
    lower.includes("build") ||
    lower.includes("building") ||
    lower.includes("working") ||
    lower.includes("project")
  ) {
    return `This connects to something you told me before: ${memory.text}`;
  }

  return `This reminds me of something you told me earlier: ${memory.text}`;
}

export function askKnown(
  message: string,
  memories: KnownMemory[],
): KnownReply {
  const relevant = findRelevantMemories(message, memories);

  const echo = findEcho(message, memories);

  return {
    text: buildReply(message, relevant),
    echo,
  };
}

export function describeEcho(
  echo: NonNullable<ReturnType<typeof findEcho>>,
) {
  return {
    title: echo.memory.title,
    date: formatEchoDate(echo.memory.date),
    reason: echo.reason,
    text: echo.memory.text,
    tags: echo.memory.tags,
  };
}