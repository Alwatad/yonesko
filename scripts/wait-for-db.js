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
    
    // Wait for essential tables to be fully created
    let attempts = 0;
    const maxAttempts = 30; // 30 seconds max
    
    while (attempts < maxAttempts) {
      try {
        // Try to query the pages table to see if it's fully ready
        const result = await client.query(`
          SELECT COUNT(*) as count 
          FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name IN ('pages', 'posts', 'media', 'products', 'header', 'footer')
        `);
        
        const essentialTablesCount = parseInt(result.rows[0].count);
        
        if (essentialTablesCount >= 6) {
          console.log('✅ Database schema is ready!');
          break;
        }
        
        console.log(`⏳ Waiting for database schema... (${attempts + 1}/${maxAttempts})`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        attempts++;
        
      } catch (error) {
        console.log(`⏳ Database not ready yet... (${attempts + 1}/${maxAttempts})`);
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