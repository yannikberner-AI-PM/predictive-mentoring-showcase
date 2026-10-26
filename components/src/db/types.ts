export type GoalType = 'fitness' | 'mood' | 'habit' | 'spending' | 'vision' | 'general';

/** Life-domain classification (orthogonal to tracking `type`). */
export type GoalCategory =
  | 'health'
  | 'finance'
  | 'relationships'
  | 'career'
  | 'growth'
  | 'other';

/** Primary horizons — week/day are not main goal intervals. */
export type GoalTimeframe = 'month' | 'quarter' | 'year' | 'custom';

/** How hard MIOVO pushes toward the goal. */
export type GoalIntensity = 'observe' | 'balanced' | 'ideal';

export type GoalLevel = 'vision' | 'milestone' | 'current' | 'action';

export type GoalSource = 'manual' | 'llm_accepted';

export type Goal = {
  id: string;
  title: string;
  type: GoalType;
  category: GoalCategory;
  level: GoalLevel;
  parentId: string | null;
  horizonYears: number | null;
  source: GoalSource;
  body: string | null;
  /** Target value for the horizon (e.g. workouts this month). */
  targetValue: number;
  /** Optional baseline / current pace (e.g. 4 workouts / month). */
  currentValue: number | null;
  timeframe: GoalTimeframe;
  /** Inclusive end of the current horizon (ISO). */
  endsAt: string | null;
  /** Optional label for custom horizons (e.g. "bis Marathon"). */
  timeframeLabel: string | null;
  intensity: GoalIntensity;
  enabled: boolean;
  createdAt: string;
  visionUri?: string | null;
  subtitle?: string | null;
};

export type VisionBoardTile = {
  id: string;
  visionGoalId: string;
  kind: 'text' | 'icon';
  label: string;
  sortOrder: number;
  createdAt: string;
};

export type DataPointSource = 'manual' | 'healthkit' | 'health_connect' | 'calendar';

export type DataPointType = 'mood' | 'habit' | 'steps' | 'workout' | 'sleep' | 'expense';

export type DataPoint = {
  id: string;
  /** Goal this observation can affect. Null entries remain journal-only. */
  goalId: string | null;
  /** Adjustable life-domain label for Journal grouping. */
  category: GoalCategory | null;
  source: DataPointSource;
  type: DataPointType;
  value: number;
  note: string | null;
  recordedAt: string;
  createdAt: string;
};
