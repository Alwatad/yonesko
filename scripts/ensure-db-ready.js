#!/usr/bin/env node

import { Client } from 'pg';

async function ensureDatabaseReady() {
  const client = new Client({
    connectionString: process.env.DATABASE_URI,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    await client.connect();
    console.log('🔍 Ensuring database is completely ready for Next.js build...');

    // Step 1: Wait for essential tables to exist
    let attempts = 0;
    const maxAttempts = 60; // 60 seconds max

    while (attempts < maxAttempts) {
      try {
        // Check if essential tables exist
        const tablesResult = await client.query(`
          SELECT COUNT(*) as count
          FROM information_schema.tables
          WHERE table_schema = 'public'
          AND table_name IN ('pages', 'posts', 'media', 'products', 'header', 'footer')
        `);

        const essentialTablesCount = parseInt(tablesResult.rows[0].count);

        if (essentialTablesCount >= 6) {
          console.log(`✅ Found ${essentialTablesCount} essential tables`);
          break;
        }

        console.log(`⏳ Waiting for essential tables... (${attempts + 1}/${maxAttempts}) - Found ${essentialTablesCount}/6 tables`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        attempts++;

      } catch (error) {
        console.log(`⏳ Database not ready yet... (${attempts + 1}/${maxAttempts}) - Error: ${error.message}`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        attempts++;
      }
    }

    if (attempts >= maxAttempts) {
      throw new Error('Essential tables not created within timeout');
    }

    // Step 2: Ensure title columns exist in main tables
    console.log('🔧 Ensuring title columns exist...');
    const tables = ['pages', 'posts', 'products'];

    for (const table of tables) {
      try {
        const result = await client.query(`
          SELECT column_name
          FROM information_schema.columns
          WHERE table_name = '${table}' AND column_name = 'title'
        `);

        if (result.rows.length === 0) {
          await client.query(`ALTER TABLE ${table} ADD COLUMN title TEXT`);
          console.log(`✅ Added title column to ${table} table`);
        } else {
          console.log(`ℹ️  Title column already exists in ${table} table`);
        }
      } catch (error) {
        console.log(`⚠️  Could not add title column to ${table}: ${error.message}`);
      }
    }

    // Step 3: Test actual queries to ensure schema is fully functional
    console.log('🧪 Testing database queries...');
    let queryAttempts = 0;
    const maxQueryAttempts = 30;

    while (queryAttempts < maxQueryAttempts) {
      try {
        // Test if we can actually query the database with all required fields
        const testResult = await client.query(`
          SELECT COUNT(*) as count FROM pages
        `);

        // Also test if title field is accessible
        const titleTestResult = await client.query(`
          SELECT title FROM pages LIMIT 1
        `);

        console.log(`✅ Database queries successful - Pages table has ${testResult.rows[0].count} records`);
        console.log('✅ Title field is accessible');
        console.log('✅ Database schema is completely ready for Next.js build!');
        break;

      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.log(`⏳ Database queries not ready yet... (${queryAttempts + 1}/${maxQueryAttempts}) - ${errorMessage}`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        queryAttempts++;
      }
    }

    if (queryAttempts >= maxQueryAttempts) {
      throw new Error('Database queries failed within timeout');
    }

    console.log('🎉 Database is 100% ready for Next.js build!');

  } catch (error) {
    console.error('❌ Database readiness check failed:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

ensureDatabaseReady(); 