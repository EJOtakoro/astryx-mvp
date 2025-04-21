# Admin Setup Instructions

This document explains how to set up an admin user for the Nuuron application.

## Creating an Admin User

1. Make sure the application has been built:
   ```
   npm run build
   ```

2. Run the admin setup script:
   ```
   ./scripts/setup-admin.sh [username] [password]
   ```

   - If you don't provide a username and password, the defaults will be:
     - Username: `admin`
     - Password: `Astryx@dmin123`

   - Example with custom credentials:
     ```
     ./scripts/setup-admin.sh yourusername yourpassword
     ```

3. Once the admin user is created, you can log in at:
   ```
   /admin/login
   ```

## Admin Dashboard Features

The admin dashboard allows you to:

1. View user feedback submissions
   - Email addresses
   - User types (roles)
   - Feedback ratings
   - Additional comments

2. View user question responses
   - Email addresses
   - Responses to all three AI-generated questions

## Security Notes

- The admin login uses secure password hashing with scrypt
- Authentication is required to access user data
- Consider changing the default admin password immediately after setup

## Troubleshooting

If you encounter issues creating an admin user:

1. Make sure your database is properly configured
2. Check that the DATABASE_URL environment variable is set correctly
3. Ensure the application has been built with `npm run build`