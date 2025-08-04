import { up as up001, down as down001 } from "./001_chunk_1";
import { up as up002, down as down002 } from "./002_chunk_2";
import { up as up003, down as down003 } from "./003_chunk_3";
import { up as up004, down as down004 } from "./004_chunk_4";
import { up as up005, down as down005 } from "./005_chunk_5";
import { up as up006, down as down006 } from "./006_chunk_6";
import { up as up007, down as down007 } from "./007_chunk_7";

export const migrations = [
  {
    name: "chunk_001",
    up: up001,
    down: down001,
  },
  {
    name: "chunk_002",
    up: up002,
    down: down002,
  },
  {
    name: "chunk_003",
    up: up003,
    down: down003,
  },
  {
    name: "chunk_004",
    up: up004,
    down: down004,
  },
  {
    name: "chunk_005",
    up: up005,
    down: down005,
  },
  {
    name: "chunk_006",
    up: up006,
    down: down006,
  },
  {
    name: "chunk_007",
    up: up007,
    down: down007,
  },
];
