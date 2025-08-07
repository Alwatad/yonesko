import { type MigrateDownArgs, type MigrateUpArgs, sql } from "@payloadcms/db-postgres";

// Ensure required PostgreSQL extensions exist for UUID generation
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE EXTENSION IF NOT EXISTS pgcrypto;
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Do not drop extensions in down migration to avoid impacting other databases
}
