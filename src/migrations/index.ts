import * as migration_20250807_141143_initial_schema from './20250807_141143_initial_schema';

export const migrations = [
  {
    up: migration_20250807_141143_initial_schema.up,
    down: migration_20250807_141143_initial_schema.down,
    name: '20250807_141143_initial_schema'
  },
];
