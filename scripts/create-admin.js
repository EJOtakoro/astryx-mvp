// This script creates an admin user in the database
// Run this script with: node scripts/create-admin.js username password

const { Pool } = require('@neondatabase/serverless');
const { drizzle } = require('drizzle-orm/neon-serverless');
const { admins } = require('../dist/shared/schema.js');
const { eq } = require('drizzle-orm');
const crypto = require('crypto');
const { promisify } = require('util');

const scryptAsync = promisify(crypto.scrypt);

async function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const buf = await scryptAsync(password, salt, 64);
  return `${buf.toString("hex")}.${salt}`;
}

async function createAdmin() {
  if (process.argv.length !== 4) {
    console.error('Usage: node scripts/create-admin.js username password');
    process.exit(1);
  }

  const username = process.argv[2];
  const password = process.argv[3];

  if (!username || !password) {
    console.error('Both username and password are required');
    process.exit(1);
  }

  try {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const db = drizzle(pool);

    const hashedPassword = await hashPassword(password);

    // Check if admin exists
    const existingAdmins = await db.select().from(admins).where(eq(admins.username, username));
    
    if (existingAdmins.length > 0) {
      console.log(`Admin user '${username}' already exists`);
      process.exit(0);
    }

    // Create admin
    const [admin] = await db.insert(admins).values({
      username,
      password: hashedPassword,
    }).returning();

    console.log(`Admin user '${username}' created successfully with ID: ${admin.id}`);
    
    await pool.end();
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
}

createAdmin().catch(console.error);