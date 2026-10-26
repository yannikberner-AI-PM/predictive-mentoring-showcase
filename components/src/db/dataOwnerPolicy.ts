export type DataOwnerState = 'initialize' | 'adopt' | 'same' | 'conflict';

export const LOCAL_USER_DATA_TABLES = [
  'goals',
  'data_points',
  'predictions',
  'suggestions',
  'connections',
  'self_messages',
  'vision_board_tiles',
] as const;

export function classifyDataOwner(
  currentOwnerId: string | null,
  signedInUserId: string,
  hasUserData: boolean,
): DataOwnerState {
  if (!currentOwnerId) return hasUserData ? 'adopt' : 'initialize';
  return currentOwnerId === signedInUserId ? 'same' : 'conflict';
}
