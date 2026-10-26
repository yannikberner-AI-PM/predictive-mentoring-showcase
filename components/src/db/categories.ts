import type { GoalCategory, GoalType } from './types';

export const GOAL_CATEGORIES: GoalCategory[] = [
  'health',
  'finance',
  'relationships',
  'career',
  'growth',
  'other',
];

export const CATEGORY_LABELS: Record<GoalCategory, string> = {
  health: 'Gesundheit',
  finance: 'Finanzen',
  relationships: 'Beziehungen',
  career: 'Karriere',
  growth: 'Wachstum',
  other: 'Allgemein',
};

export function isGoalCategory(value: string): value is GoalCategory {
  return (GOAL_CATEGORIES as string[]).includes(value);
}

/** Tracking type → default life domain (used before LLM classification). */
export function categoryFromType(type: GoalType): GoalCategory {
  switch (type) {
    case 'fitness':
      return 'health';
    case 'spending':
      return 'finance';
    case 'mood':
    case 'habit':
      return 'growth';
    default:
      return 'other';
  }
}

/** Keyword fallback when the LLM is unavailable or returns an unknown domain. */
export function classifyHeuristic(text: string): GoalCategory {
  const t = text.toLowerCase();
  if (
    /sport|fit|gesund|körper|laufen|kraft|schlaf|schritt|workout|health|yoga|ernährung|bewegung/.test(
      t,
    )
  ) {
    return 'health';
  }
  if (/geld|spar|finanz|frei|vermögen|budget|money|save|gehalt|invest/.test(t)) {
    return 'finance';
  }
  if (/familie|beziehung|freund|liebe|partner|relationship|sozial/.test(t)) {
    return 'relationships';
  }
  if (/karriere|job|arbeit|beruf|career|work|gründung|unternehmen/.test(t)) {
    return 'career';
  }
  if (
    /lern|wachstum|ruhe|glück|zufrieden|mental|habit|meditation|lesen|achtsamkeit|persönlich/.test(
      t,
    )
  ) {
    return 'growth';
  }
  return 'other';
}

export function categoryTag(category: GoalCategory): { label: string; magenta?: boolean } {
  const label = CATEGORY_LABELS[category];
  if (category === 'growth' || category === 'relationships') {
    return { label, magenta: true };
  }
  return { label };
}
