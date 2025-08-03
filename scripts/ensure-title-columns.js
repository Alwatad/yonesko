#!/usr/bin/env node

import { Client } from 'pg';

async function ensureTitleColumns() {
  const client = new Client({
    connectionString: process.env.DATABASE_URI,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    await client.connect();
    console.log('🔧 Ensuring title columns exist in all tables...');
    
    const tables = ['pages', 'posts', 'products'];
    
    for (const table of tables) {
      try {
        // Check if title column exists
        const result = await client.query(`
          SELECT column_name 
          FROM information_schema.columns 
          WHERE table_name = '${table}' AND column_name = 'title'
        `);
        
        if (result.rows.length === 0) {
          // Add title column if it doesn't exist
          await client.query(`ALTER TABLE ${table} ADD COLUMN title TEXT`);
          console.log(`✅ Added title column to ${table} table`);
        } else {
          console.log(`ℹ️  Title column already exists in ${table} table`);
        }
      } catch (error) {
        console.log(`⚠️  Could not add title column to ${table}: ${error.message}`);
      }
    }
    
    console.log('✅ Title columns verification complete');
    
  } catch (error) {
    console.error('❌ Error ensuring title columns:', error.message);
  } finally {
    await client.end();
  }
}

ensureTitleColumns(); 