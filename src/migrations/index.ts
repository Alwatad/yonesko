import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { up as up20250803_151127 } from './20250803_151127'

export const migrations = [
  {
    name: '20250803_151127',
    up: up20250803_151127,
  },
]
