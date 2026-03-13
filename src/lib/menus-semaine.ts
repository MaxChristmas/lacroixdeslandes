/**
 * Charge les menus de la semaine courante (numéro ISO).
 *
 * Fichiers attendus : src/data/menus-semaine/menus-{year}-week-{weekNumber}.json
 * Fallback : cherche le fichier avec le numéro de semaine le plus proche (inférieur ou égal).
 */

interface MenuSemaine {
  dayIndex: number;
  label: string;
  description: string;
}

/** Numéro de semaine ISO (lundi = début de semaine) */
function getISOWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

export async function getMenusSemaine(): Promise<MenuSemaine[]> {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentWeek = getISOWeekNumber(now);

  // Import all JSON files from the menus-semaine folder
  const allFiles = import.meta.glob<MenuSemaine[]>('../data/menus-semaine/*.json', { eager: true, import: 'default' });

  // Extract year + week numbers and sort descending (year first, then week)
  const weeks = Object.entries(allFiles)
    .map(([path, data]) => {
      const match = path.match(/menus-(\d{4})-week-(\d+)\.json$/);
      return match ? { year: parseInt(match[1], 10), week: parseInt(match[2], 10), data } : null;
    })
    .filter((entry): entry is { year: number; week: number; data: MenuSemaine[] } => entry !== null)
    .sort((a, b) => b.year - a.year || b.week - a.week);

  if (weeks.length === 0) {
    console.warn('[menus] No weekly menu files found');
    return [];
  }

  // Try exact match first
  const exact = weeks.find(w => w.year === currentYear && w.week === currentWeek);
  if (exact) {
    console.log(`[menus] Loaded ${currentYear} week ${currentWeek}`);
    return exact.data;
  }

  // Fallback: most recent entry <= current year/week, or just the latest
  const closest = weeks.find(w => w.year < currentYear || (w.year === currentYear && w.week <= currentWeek)) || weeks[0];
  console.log(`[menus] ${currentYear} week ${currentWeek} not found, using ${closest.year} week ${closest.week}`);
  return closest.data;
}
