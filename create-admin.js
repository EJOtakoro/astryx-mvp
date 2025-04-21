// A simplified script to create an admin user
const { Pool } = require('@neondatabase/serverless');
const { eq } = require('drizzle-orm');
const crypto = require('crypto');
const { promisify } = require('util');

// Use same DATABASE_URL from environment
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const scryptAsync = promisify(crypto.scrypt);

async function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const buf = await scryptAsync(password, salt, 64);
  return `${buf.toString("hex")}.${salt}`;
}

async function createAdmin() {
  try {
    const username = 'admin';
    const password = 'Astryx@dmin123';
    
    // Check if admin already exists - hacky way to ensure table exists
    const { rows: existingAdmins } = await pool.query(
      'SELECT * FROM admins WHERE username = $1',
      [username]
    );
    
    if (existingAdmins.length > 0) {
      console.log(`Admin user '${username}' already exists. Updating password...`);
      
      const hashedPassword = await hashPassword(password);
      await pool.query(
        'UPDATE admins SET password = $1 WHERE username = $2',
        [hashedPassword, username]
      );
      
      console.log(`Password updated for admin user '${username}'`);
    } else {
      // Create the admin
      const hashedPassword = await hashPassword(password);
      const result = await pool.query(
        'INSERT INTO admins (username, password) VALUES ($1, $2) RETURNING id',
        [username, hashedPassword]
      );
      
      console.log(`Admin user '${username}' created successfully with ID: ${result.rows[0].id}`);
    }
    
    await pool.end();
    return { success: true };
  } catch (error) {
    console.error('Error creating admin:', error);
    return { success: false, error };
  }
}

createAdmin().then(result => {
  if (result.success) {
    console.log('You can now login with:');
    console.log('Username: admin');
    console.log('Password: Astryx@dmin123');
  } else {
    console.log('Failed to create admin user');
  }
});