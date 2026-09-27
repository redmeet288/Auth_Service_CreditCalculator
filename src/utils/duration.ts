const UNIT_MS: Record<string, number> = {
  s: 1000,
  m: 60 * 1000,
  h: 60 * 60 * 1000,
  d: 24 * 60 * 60 * 1000,
};

export function parseDurationToMs(duration: string): number {
  const match = /^(\d+)\s*(s|m|h|d)$/i.exec(duration.trim());
  if (!match) {
    throw new Error(
      `Некорректный формат длительности: "${duration}". Ожидается число + единица (s|m|h|d), например "15m".`
    );
  }
  const value = parseInt(match[1], 10);
  const unit = match[2].toLowerCase();
  return value * UNIT_MS[unit];
}

export function addDuration(from: Date, duration: string): Date {
  return new Date(from.getTime() + parseDurationToMs(duration));
}
