import { type MigrateUpArgs, type MigrateDownArgs } from "@payloadcms/db-postgres";

import * as migration_000_payload_internal from "./000_payload_internal";
import * as migration_001_chunk_1 from "./001_chunk_1";
import * as migration_002_chunk_2 from "./002_chunk_2";
import * as migration_003_chunk_3 from "./003_chunk_3";
import * as migration_004_chunk_4 from "./004_chunk_4";
import * as migration_005_chunk_5 from "./005_chunk_5";

type Migration = {
  name: string;
  up: (args: MigrateUpArgs) => Promise<void>;
  down: (args: MigrateDownArgs) => Promise<void>;
};

export const migrations: Migration[] = [
  {
    up: migration_000_payload_internal.up as (args: MigrateUpArgs) => Promise<void>,
    down: migration_000_payload_internal.down as (args: MigrateDownArgs) => Promise<void>,
    name: "000_payload_internal",
  },
  {
    up: migration_001_chunk_1.up as (args: MigrateUpArgs) => Promise<void>,
    down: migration_001_chunk_1.down as (args: MigrateDownArgs) => Promise<void>,
    name: "001_chunk_1",
  },
  {
    up: migration_002_chunk_2.up as (args: MigrateUpArgs) => Promise<void>,
    down: migration_002_chunk_2.down as (args: MigrateDownArgs) => Promise<void>,
    name: "002_chunk_2",
  },
  {
    up: migration_003_chunk_3.up as (args: MigrateUpArgs) => Promise<void>,
    down: migration_003_chunk_3.down as (args: MigrateDownArgs) => Promise<void>,
    name: "003_chunk_3",
  },
  {
    up: migration_004_chunk_4.up as (args: MigrateUpArgs) => Promise<void>,
    down: migration_004_chunk_4.down as (args: MigrateDownArgs) => Promise<void>,
    name: "004_chunk_4",
  },
  {
    up: migration_005_chunk_5.up as (args: MigrateUpArgs) => Promise<void>,
    down: migration_005_chunk_5.down as (args: MigrateDownArgs) => Promise<void>,
    name: "005_chunk_5",
  },
];
