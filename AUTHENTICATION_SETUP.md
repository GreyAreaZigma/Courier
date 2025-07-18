# FedEx Authentication System Setup

This document provides instructions for setting up and testing the authentication system for the FedEx tracking application.

## Database Setup

### 1. Environment Variables

Make sure you have the following environment variables set in your `.env` file:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/feddex"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

### 2. Database Migration

Run the following commands to set up your database:

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed the database with sample data
npx prisma db seed
```

## Authentication Features

### Login System

- **Email/User ID Login**: Users can log in using their email address
- **Password Security**: Passwords are hashed using bcrypt with 12 salt rounds
- **Session Management**: JWT-based sessions with 30-day expiration
- **Role-Based Access**: Support for 'user' and 'admin' roles

### Signup System

- **Multi-step Form**: Contact details and account creation
- **Password Requirements**:
  - 12-25 characters
  - At least one number
  - At least one uppercase letter
  - At least one lowercase letter
  - No consecutive repeated characters
  - No special characters: spaces, ~, ', ", <, >
  - Cannot contain email, name, or user ID
- **Form Validation**: Client-side and server-side validation
- **Database Integration**: Stores user data securely

## Test Users

After running the seed script, you'll have these test accounts:

### Admin User

- **Email**: admin@fedex.com
- **Password**: admin123
- **Role**: admin

### Regular User

- **Email**: user@example.com
- **Password**: user123456
- **Role**: user

## Testing the Authentication System

### 1. Manual Testing

1. Start the development server: `npm run dev`
2. Navigate to `/signup` to test user registration
3. Navigate to `/login` to test user authentication
4. Try logging in with the test accounts above

### 2. Automated Testing

Run the authentication test script:

```bash
# Run the test script
npx tsx src/lib/test-auth.ts
```

### 3. API Testing

Test the signup API endpoint:

```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "TestPassword123",
    "firstName": "Test",
    "lastName": "User",
    "country": "United States",
    "address": "123 Test St",
    "countryCode": "+1",
    "phone": "555-1234",
    "marketingUpdates": false
  }'
```

## Security Features

### Password Security

- Passwords are hashed using bcrypt with 12 salt rounds
- Password requirements are enforced both client-side and server-side
- Passwords are never stored in plain text

### Session Security

- JWT tokens with 30-day expiration
- Secure session management through NextAuth.js
- Automatic session cleanup

### Input Validation

- Email format validation
- Password strength requirements
- Required field validation
- SQL injection prevention through Prisma ORM

## Error Handling

The authentication system includes comprehensive error handling:

### Login Errors

- Invalid credentials
- Missing fields
- Network errors
- Server errors

### Signup Errors

- Email already exists
- Invalid email format
- Password requirements not met
- Missing required fields
- Database errors

## Database Schema

The User model includes:

```prisma
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  password      String?
  role          String    @default("user")
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  accounts      Account[]
  sessions      Session[]
  shipments     Shipment[]
}
```

## Troubleshooting

### Common Issues

1. **Database Connection Error**

   - Check your DATABASE_URL in .env
   - Ensure PostgreSQL is running
   - Verify database exists

2. **Authentication Fails**

   - Check if user exists in database
   - Verify password hashing is working
   - Check NextAuth configuration

3. **Signup Fails**
   - Check email format validation
   - Verify password requirements
   - Check for duplicate emails

### Debug Mode

Enable debug mode by setting `NODE_ENV=development` in your environment. This will provide detailed error messages and logging.

## Next Steps

### Future Enhancements

1. **Custom User IDs**: Add support for custom user IDs separate from email
2. **Email Verification**: Implement email verification for new accounts
3. **Password Reset**: Add forgot password functionality
4. **Two-Factor Authentication**: Implement 2FA for enhanced security
5. **User Profiles**: Add user profile management
6. **Activity Logging**: Track user login/logout activity

### User Profile Extension

Consider extending the User model to include:

- Phone number
- Address information
- Preferences
- Account settings

This would require creating a separate UserProfile model or extending the existing User model with additional fields.
