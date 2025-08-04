
-- Drop all tables script
-- Run this in your Supabase SQL editor or PostgreSQL client

-- Disable foreign key checks temporarily
SET session_replication_role = replica;

-- Drop all tables (this will drop everything)
DO $$ 
DECLARE 
    r RECORD;
BEGIN
    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
        EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE';
    END LOOP;
END $$;

-- Drop all types
DO $$ 
DECLARE 
    r RECORD;
BEGIN
    FOR r IN (SELECT typname FROM pg_type WHERE typnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')) LOOP
        EXECUTE 'DROP TYPE IF EXISTS ' || quote_ident(r.typname) || ' CASCADE';
    END LOOP;
END $$;

-- Re-enable foreign key checks
SET session_replication_role = DEFAULT;

-- Clear migration tracking table if it exists
DROP TABLE IF EXISTS "__drizzle_migrations" CASCADE;
