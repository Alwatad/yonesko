#!/usr/bin/env node

import { Client } from 'pg';

async function waitForDatabase() {
  const client = new Client({
    connectionString: process.env.DATABASE_URI,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    await client.connect();
    console.log('✅ Database connected successfully');
    
    // Wait for essential tables to be fully created and queryable
    let attempts = 0;
    const maxAttempts = 30; // 30 seconds max
    
    while (attempts < maxAttempts) {
      try {
        // Test 1: Check if essential tables exist
        const tablesResult = await client.query(`
          SELECT COUNT(*) as count 
          FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name IN ('pages', 'posts', 'media', 'products', 'header', 'footer')
        `);
        
        const essentialTablesCount = parseInt(tablesResult.rows[0].count);
        
        if (essentialTablesCount >= 6) {
          // Test 2: Actually try to query the pages table
          const pagesResult = await client.query(`
            SELECT COUNT(*) as count FROM pages
          `);
          
          console.log(`✅ Found ${essentialTablesCount} essential tables`);
          console.log(`✅ Pages table has ${pagesResult.rows[0].count} records`);
          console.log('✅ Database schema is ready!');
          break;
        }
        
        console.log(`⏳ Waiting for database schema... (${attempts + 1}/${maxAttempts}) - Found ${essentialTablesCount}/6 tables`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        attempts++;
        
      } catch (error) {
        console.log(`⏳ Database not ready yet... (${attempts + 1}/${maxAttempts}) - Error: ${error.message}`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        attempts++;
      }
    }
    
    if (attempts >= maxAttempts) {
      console.log('⚠️  Database schema may not be fully ready, but continuing...');
    }
    
  } catch (error) {
    console.error('❌ Error waiting for database:', error.message);
  } finally {
    await client.end();
  }
}

waitForDatabase(); 