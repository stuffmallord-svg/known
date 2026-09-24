export type MemoryType =
  | "note"
  | "preference"
  | "milestone"
  | "project"
  | "person"
  | "place"
  | "idea"
  | "observation";

export type Memory = {
  id: string;
  text: string;
  type: MemoryType;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  source: "user" | "known";
  archived: boolean;
};

const STORAGE_KEY = "known:memories";

function isBrowser() {
  return typeof window !== "undefined";
}

function normalizeMemory(value: unknown): Memory | null {
  if (!value || typeof value !== "object") return null;

  const item = value as Partial<Memory>;

  if (
    typeof item.id !== "string" ||
    typeof item.text !== "string" ||
    typeof item.createdAt !== "string"
  ) {
    return null;
  }

  return {
    id: item.id,
    text: item.text,
    type: item.type ?? "note",
    createdAt: item.createdAt,
    updatedAt: item.updatedAt ?? item.createdAt,
    tags: Array.isArray(item.tags)
      ? item.tags.filter((tag): tag is string => typeof tag === "string")
      : [],
    source: item.source === "known" ? "known" : "user",
    archived: Boolean(item.archived),
  };
}

export function getMemories(): Memory[] {
  if (!isBrowser()) return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed: unknown = JSON.parse(raw);

    if (!Array.isArray(parsed)) return [];

    return parsed
      .map(normalizeMemory)
      .filter((memory): memory is Memory => memory !== null)
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() -
          new Date(a.updatedAt).getTime(),
      );
  } catch {
    return [];
  }
}

function saveMemories(memories: Memory[]) {
  if (!isBrowser()) return;

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(memories));
}

export function addMemory(
  input: Omit<Memory, "id" | "createdAt" | "updatedAt" | "source" | "archived"> &
    Partial<Pick<Memory, "source">>,
): Memory {
  const now = new Date().toISOString();

  const memory: Memory = {
    id: crypto.randomUUID(),
    text: input.text.trim(),
    type: input.type,
    createdAt: now,
    updatedAt: now,
    tags: input.tags ?? [],
    source: input.source ?? "user",
    archived: false,
  };

  const memories = getMemories();

  saveMemories([memory, ...memories]);

  return memory;
}

export function updateMemory(
  id: string,
  patch: Partial<Pick<Memory, "text" | "type" | "tags" | "archived">>,
): Memory | null {
  const memories = getMemories();

  const index = memories.findIndex((memory) => memory.id === id);

  if (index === -1) return null;

  const updated: Memory = {
    ...memories[index],
    ...patch,
    updatedAt: new Date().toISOString(),
  };

  memories[index] = updated;

  saveMemories(memories);

  return updated;
}

export function deleteMemory(id: string) {
  const memories = getMemories().filter((memory) => memory.id !== id);

  saveMemories(memories);
}

export function clearMemories() {
  if (!isBrowser()) return;

  window.localStorage.removeItem(STORAGE_KEY);
}

export function searchMemories(query: string): Memory[] {
  const normalized = query.trim().toLowerCase();

  if (!normalized) return getMemories();

  return getMemories().filter((memory) => {
    const haystack = [
      memory.text,
      memory.type,
      ...memory.tags,
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalized);
  });
}

export function getRecentMemories(limit = 5): Memory[] {
  return getMemories()
    .filter((memory) => !memory.archived)
    .slice(0, limit);
}

export function getMemoriesByType(type: MemoryType): Memory[] {
  return getMemories().filter(
    (memory) => memory.type === type && !memory.archived,
  );
}

export function getMemoryCount(): number {
  return getMemories().filter((memory) => !memory.archived).length;
}