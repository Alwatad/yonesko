import * as migration_20250803_142750 from './20250803_142750';

export const migrations = [
  {
    up: migration_20250803_142750.up,
    down: migration_20250803_142750.down,
    name: '20250803_142750'
  },
];
