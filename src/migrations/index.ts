import * as migration_000_payload_internal from './000_payload_internal';
import * as migration_001_chunk_1 from './001_chunk_1';
import * as migration_002_chunk_2 from './002_chunk_2';
import * as migration_003_chunk_3 from './003_chunk_3';
import * as migration_004_chunk_4 from './004_chunk_4';
import * as migration_005_chunk_5 from './005_chunk_5';
import * as migration_20250806_173340 from './20250806_173340';

export const migrations = [
  {
    up: migration_000_payload_internal.up,
    down: migration_000_payload_internal.down,
    name: '000_payload_internal',
  },
  {
    up: migration_001_chunk_1.up,
    down: migration_001_chunk_1.down,
    name: '001_chunk_1',
  },
  {
    up: migration_002_chunk_2.up,
    down: migration_002_chunk_2.down,
    name: '002_chunk_2',
  },
  {
    up: migration_003_chunk_3.up,
    down: migration_003_chunk_3.down,
    name: '003_chunk_3',
  },
  {
    up: migration_004_chunk_4.up,
    down: migration_004_chunk_4.down,
    name: '004_chunk_4',
  },
  {
    up: migration_005_chunk_5.up,
    down: migration_005_chunk_5.down,
    name: '005_chunk_5',
  },
  {
    up: migration_20250806_173340.up,
    down: migration_20250806_173340.down,
    name: '20250806_173340'
  },
];
