export type KnownMemory = {
  id: string;
  title: string;
  text: string;
  type: string;
  date: string;
  tags: string[];
};

export type EchoMatch = {
  memory: KnownMemory;
  reason: string;
  matchedTags: string[];
};

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
]);

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function meaningfulWords(value: string) {
  return normalize(value).filter(
    (word) => word.length >= 4 && !STOP_WORDS.has(word),
  );
}

function getMemoryText(memory: KnownMemory) {
  return [
    memory.title,
    memory.text,
    memory.type,
    ...memory.tags,
  ].join(" ");
}

function scoreMemory(
  currentText: string,
  memory: KnownMemory,
): {
  score: number;
  matchedWords: string[];
  matchedTags: string[];
} {
  const currentWords = new Set(meaningfulWords(currentText));
  const memoryWords = new Set(meaningfulWords(getMemoryText(memory)));

  const matchedWords = [...currentWords].filter((word) =>
    memoryWords.has(word),
  );

  const currentTags = new Set(
    meaningfulWords(currentText).concat(normalize(currentText)),
  );

  const matchedTags = memory.tags.filter((tag) => {
    const tagWords = meaningfulWords(tag);
    return tagWords.some((word) => currentTags.has(word));
  });

  let score = 0;

  score += matchedWords.length * 2;
  score += matchedTags.length * 4;

  if (
    normalize(currentText).some((word) =>
      normalize(memory.title).includes(word),
    )
  ) {
    score += 5;
  }

  return {
    score,
    matchedWords,
    matchedTags,
  };
}

export function findEcho(
  currentText: string,
  memories: KnownMemory[],
): EchoMatch | null {
  const input = currentText.trim();

  if (!input || memories.length === 0) {
    return null;
  }

  const ranked = memories
    .map((memory) => {
      const result = scoreMemory(input, memory);

      return {
        memory,
        ...result,
      };
    })
    .filter((item) => item.score >= 4)
    .sort((a, b) => b.score - a.score);

  const match = ranked[0];

  if (!match) {
    return null;
  }

  const evidence =
    match.matchedTags.length > 0
      ? match.matchedTags.join(", ")
      : match.matchedWords.slice(0, 3).join(", ");

  const reason = evidence
    ? `This connects to something you mentioned earlier around ${evidence}.`
    : "This connects to something you mentioned earlier.";

  return {
    memory: match.memory,
    reason,
    matchedTags: match.matchedTags,
  };
}

export function formatEchoDate(date: string) {
  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsed);
}