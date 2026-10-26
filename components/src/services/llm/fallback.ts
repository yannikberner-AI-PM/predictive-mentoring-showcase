import { CATEGORY_LABELS } from '../../db/categories';
import type { GoalCategory } from '../../db/types';
import type { SuggestWordingInput } from './types';

const CATEGORY_STEP: Record<GoalCategory, string> = {
  health: 'ein kurzer Spaziergang oder eine kleine Bewegungseinheit',
  finance: 'ein Blick auf eine Ausgabe, die du heute bewusst weglässt oder umwidmest',
  relationships: 'eine kurze, freundliche Nachricht an jemanden, der dir wichtig ist',
  career: 'ein 15-Minuten-Fokusblock für den nächsten sichtbaren Schritt',
  growth: 'ein ruhiger Check-in: was hat heute gut geklappt?',
  other: 'ein kleiner, konkreter Schritt, den du in unter zehn Minuten schaffen kannst',
};

/** German copy for the in-app local helper (no network). */
export function templateSuggestion(input: SuggestWordingInput): string {
  const p = Math.round(Number.isFinite(input.probabilityPercent) ? input.probabilityPercent : 0);
  const title = input.goalTitle.trim() || 'dein Ziel';
  const category = input.category ?? 'other';
  const step = CATEGORY_STEP[category];
  const domain = CATEGORY_LABELS[category];

  if (input.coldStart) {
    return (
      `Für „${title}" (${domain}) ist die Zahl noch eine erste Schätzung — ca. ${p}%. ` +
      `Heute hilft ${step}, damit die Vorhersage eine echte Spur von dir bekommt.`
    );
  }
  if (input.trend === 'down' || p < 55) {
    return (
      `Deine Erfolgswahrscheinlichkeit für „${title}" liegt bei ${p}%. ` +
      `Ein sanfter Impuls bringt dich zurück in Bewegung: ${step}.`
    );
  }
  if (p >= 70) {
    return (
      `Deine Erfolgswahrscheinlichkeit für „${title}" liegt bei ${p}%. ` +
      `Du bist auf einem guten Weg — ${step} hält den Schwung lebendig.`
    );
  }
  return (
    `Deine Erfolgswahrscheinlichkeit für „${title}" liegt bei ${p}%. ` +
    `Ein kleiner Schritt heute kann dich spürbar nach oben bringen: ${step}.`
  );
}

export function templateChatReply(lastUserText: string): string {
  const raw = lastUserText.trim() || 'dein Anliegen';
  const snippet = raw.length > 60 ? `${raw.slice(0, 57)}…` : raw;
  return (
    `Ich höre dich zu „${snippet}". ` +
    'Ein kleiner nächster Schritt bringt dich weiter — worauf möchtest du dich heute konzentrieren?'
  );
}
