import type { GoalCategory } from '../../db/types';

/** Shared types for the pluggable LLM layer (on-device OS models or in-app local helper). */

export type LlmProviderId = 'local' | 'apple' | 'android';

/** Readiness of the resolved provider. */
export type LlmCapabilityState = 'available' | 'downloading' | 'unsupported';

export type ChatMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

/** Classical probability + goal context → positive suggestion wording. */
export type SuggestWordingInput = {
  probabilityPercent: number;
  goalTitle: string;
  category?: GoalCategory;
  trend?: 'up' | 'flat' | 'down';
  coldStart?: boolean;
  /** Optional short context (recent logs, category). */
  context?: string;
};

export type ClassifyGoalInput = {
  title: string;
  body?: string;
};

export type DailyActionSuggestion = {
  title: string;
};

export type StructuredVisionTree = {
  vision: {
    title: string;
    body: string;
    horizonYears: 5 | 10 | 15;
  };
  milestones: {
    title: string;
    body: string;
    /** ISO date hint or null */
    endsAt: string | null;
  }[];
  currentGoals: {
    title: string;
    parentMilestoneIndex: number;
    timeframe: 'month' | 'quarter' | 'year' | 'custom';
    endsAt: string | null;
    type: 'fitness' | 'mood' | 'habit' | 'spending' | 'general';
    category: GoalCategory;
    targetValue: number | null;
    intensity?: 'observe' | 'balanced' | 'ideal';
    subtitle?: string;
    dailyActions: DailyActionSuggestion[];
  }[];
};

export type VisionBreakdownResult = {
  tree: StructuredVisionTree;
  markdown: string;
};

export type BreakDownVisionInput = {
  freeText: string;
  horizonYears: 5 | 10 | 15;
};

export interface LlmProvider {
  id: LlmProviderId;
  getCapability(): Promise<LlmCapabilityState>;
  breakDownVision(input: BreakDownVisionInput): Promise<StructuredVisionTree>;
  classifyGoal(input: ClassifyGoalInput): Promise<GoalCategory>;
  chat(messages: ChatMessage[]): Promise<string>;
  suggestWording(input: SuggestWordingInput): Promise<string>;
}
