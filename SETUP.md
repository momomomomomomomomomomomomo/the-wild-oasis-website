# Setup Guide for The Wild Oasis

This guide will walk you through setting up The Wild Oasis website from scratch, including Supabase database configuration.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Local Development Setup](#local-development-setup)
- [Supabase Setup](#supabase-setup)
- [Google OAuth Setup](#google-oauth-setup)
- [Environment Configuration](#environment-configuration)
- [Running the Application](#running-the-application)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 18.17 or later)
- **npm** (comes with Node.js) or **yarn** / **pnpm** / **bun**
- A **Supabase account** (free tier available at [supabase.com](https://supabase.com))
- A **Google Cloud account** for OAuth (free)

## Local Development Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd the-wild-oasis-website
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including Next.js, React, Tailwind CSS, and more.

## Supabase Setup

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign in or create an account
3. Click "New Project"
4. Fill in the project details:
   - Project name: `the-wild-oasis`
   - Database password: (create a strong password)
   - Region: (choose closest to your users)
5. Click "Create new project" and wait for it to initialize

### 2. Get API Credentials

1. In your Supabase project dashboard, go to **Settings** > **API**
2. Copy the following:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key (under "Project API keys")

### 3. Create Database Tables

Go to the **SQL Editor** in your Supabase dashboard and run the following SQL commands:

#### Create Cabins Table
```sql
CREATE TABLE cabins (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  name TEXT NOT NULL,
  maxCapacity INTEGER NOT NULL,
  regularPrice DECIMAL NOT NULL,
  discount DECIMAL DEFAULT 0,
  description TEXT,
  image TEXT
);

-- Add some sample data
INSERT INTO cabins (name, maxCapacity, regularPrice, discount, description, image) VALUES
('Cabin 001', 2, 250, 0, 'Cozy cabin perfect for couples', 'https://example.com/cabin1.jpg'),
('Cabin 002', 4, 350, 50, 'Family cabin with beautiful views', 'https://example.com/cabin2.jpg'),
('Cabin 003', 6, 450, 100, 'Large cabin ideal for groups', 'https://example.com/cabin3.jpg');
```

#### Create Guests Table
```sql
CREATE TABLE guests (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  fullName TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  nationalID TEXT,
  nationality TEXT,
  countryFlag TEXT
);
```

#### Create Bookings Table
```sql
CREATE TABLE bookings (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  startDate DATE NOT NULL,
  endDate DATE NOT NULL,
  numNights INTEGER NOT NULL,
  numGuests INTEGER NOT NULL,
  cabinPrice DECIMAL NOT NULL,
  extraPrice DECIMAL DEFAULT 0,
  totalPrice DECIMAL NOT NULL,
  status TEXT DEFAULT 'unconfirmed',
  hasBreakfast BOOLEAN DEFAULT false,
  isPaid BOOLEAN DEFAULT false,
  observations TEXT,
  cabinId BIGINT REFERENCES cabins(id) ON DELETE CASCADE,
  guestId BIGINT REFERENCES guests(id) ON DELETE CASCADE
);

-- Add indexes for better performance
CREATE INDEX idx_bookings_guest ON bookings(guestId);
CREATE INDEX idx_bookings_cabin ON bookings(cabinId);
CREATE INDEX idx_bookings_dates ON bookings(startDate, endDate);
```

#### Create Settings Table (Optional)
```sql
CREATE TABLE settings (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  minBookingLength INTEGER DEFAULT 3,
  maxBookingLength INTEGER DEFAULT 90,
  maxGuestsPerBooking INTEGER DEFAULT 10,
  breakfastPrice DECIMAL DEFAULT 15
);

-- Add default settings
INSERT INTO settings (minBookingLength, maxBookingLength, maxGuestsPerBooking, breakfastPrice)
VALUES (3, 90, 10, 15);
```

### 4. Set Up Row Level Security (RLS)

For production, you should enable RLS policies. Run these commands in the SQL Editor:

```sql
-- Enable RLS on tables
ALTER TABLE cabins ENABLE ROW LEVEL SECURITY;
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Cabins: Everyone can read
CREATE POLICY "Cabins are viewable by everyone"
  ON cabins FOR SELECT
  USING (true);

-- Guests: Users can only read their own data
CREATE POLICY "Users can view their own guest data"
  ON guests FOR SELECT
  USING (auth.jwt() ->> 'email' = email);

CREATE POLICY "Users can update their own guest data"
  ON guests FOR UPDATE
  USING (auth.jwt() ->> 'email' = email);

-- Bookings: Users can only see their own bookings
CREATE POLICY "Users can view their own bookings"
  ON bookings FOR SELECT
  USING (guestId IN (
    SELECT id FROM guests WHERE email = auth.jwt() ->> 'email'
  ));

CREATE POLICY "Users can create their own bookings"
  ON bookings FOR INSERT
  WITH CHECK (guestId IN (
    SELECT id FROM guests WHERE email = auth.jwt() ->> 'email'
  ));

CREATE POLICY "Users can update their own bookings"
  ON bookings FOR UPDATE
  USING (guestId IN (
    SELECT id FROM guests WHERE email = auth.jwt() ->> 'email'
  ));

CREATE POLICY "Users can delete their own bookings"
  ON bookings FOR DELETE
  USING (guestId IN (
    SELECT id FROM guests WHERE email = auth.jwt() ->> 'email'
  ));
```

### 5. Configure Storage (Optional)

If you want to upload cabin images:

1. Go to **Storage** in Supabase dashboard
2. Create a new bucket called `cabin-images`
3. Set it to public
4. Upload your cabin images
5. Use the public URLs in the `cabins` table

## Google OAuth Setup

### 1. Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. In the project dashboard, search for "Google+ API"
4. Enable the **Google+ API**

### 2. Create OAuth Credentials

1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **OAuth client ID**
3. Configure the OAuth consent screen if prompted:
   - User Type: External
   - App name: The Wild Oasis
   - User support email: your-email@example.com
   - Developer contact: your-email@example.com
4. Click **Save and Continue** through the scopes and test users
5. Go back to **Credentials** and create OAuth client ID:
   - Application type: **Web application**
   - Name: The Wild Oasis Web Client
   - Authorized JavaScript origins:
     - `http://localhost:3000` (development)
     - `https://yourdomain.com` (production)
   - Authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google` (development)
     - `https://yourdomain.com/api/auth/callback/google` (production)
6. Click **Create**
7. Copy the **Client ID** and **Client Secret**

## Environment Configuration

### 1. Create Environment File

Copy the `.env.example` file to `.env.local`:

```bash
cp .env.example .env.local
```

### 2. Fill in Environment Variables

Edit `.env.local` with your actual values:

```env
# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key-here

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32

# Google OAuth Configuration
AUTH_GOOGLE_ID=your-google-client-id.apps.googleusercontent.com
AUTH_GOOGLE_SECRET=your-google-client-secret
```

### 3. Generate NextAuth Secret

Run this command to generate a secure secret:

```bash
openssl rand -base64 32
```

Copy the output and use it as your `NEXTAUTH_SECRET`.

## Running the Application

### Development Mode

Start the development server with hot-reload:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### Production Build

Build and run the production version:

```bash
npm run build
npm run start
```

Or use the combined command:

```bash
npm run prod
```

### Linting

Check code quality:

```bash
npm run lint
```

## Troubleshooting

### Common Issues

#### Issue: "Cannot connect to Supabase"
**Solution**: 
- Verify your `SUPABASE_URL` and `SUPABASE_KEY` are correct
- Check if your Supabase project is active
- Ensure you're using the anon/public key, not the service role key

#### Issue: "Google OAuth redirect error"
**Solution**: 
- Verify the redirect URI in Google Cloud Console matches exactly
- Make sure `NEXTAUTH_URL` is set correctly
- Check that Google+ API is enabled

#### Issue: "NEXTAUTH_SECRET is not set"
**Solution**: 
- Generate a secret using `openssl rand -base64 32`
- Add it to your `.env.local` file
- Restart the development server

#### Issue: "Database tables not found"
**Solution**: 
- Run the SQL commands in the Supabase SQL Editor
- Verify tables exist in the Table Editor
- Check for any SQL errors in the Supabase logs

#### Issue: "Module not found" errors
**Solution**: 
```bash
# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Issue: "Port 3000 already in use"
**Solution**: 
```bash
# Find and kill the process
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm run dev
```

### Getting Help

If you encounter issues not covered here:
1. Check the [Next.js documentation](https://nextjs.org/docs)
2. Review [Supabase documentation](https://supabase.com/docs)
3. Check [NextAuth.js documentation](https://next-auth.js.org/)
4. Open an issue on GitHub

## Next Steps

After setup is complete:
1. Customize cabin data with your actual cabins
2. Upload cabin images to Supabase Storage
3. Test the booking flow
4. Configure email notifications (optional)
5. Set up deployment on Vercel or your preferred platform

Happy coding! 🚀
