import * as migration_20250803_123701 from './20250803_123701';

export const migrations = [
  {
    up: migration_20250803_123701.up,
    down: migration_20250803_123701.down,
    name: '20250803_123701'
  },
];
