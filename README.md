# The Wild Oasis - Luxury Cabin Hotel Website

A modern, full-stack web application for "The Wild Oasis" - a luxury cabin hotel located in the heart of the Italian Dolomites. This customer-facing website allows guests to explore available cabins, make reservations, and manage their bookings.

![Next.js](https://img.shields.io/badge/Next.js-15.3.8-black)
![React](https://img.shields.io/badge/React-19.0.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8)
![Supabase](https://img.shields.io/badge/Supabase-2.51.0-3ecf8e)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Authentication](#authentication)
- [Database Schema](#database-schema)
- [Deployment](#deployment)
- [Learn More](#learn-more)

## ✨ Features

### Guest Features
- **Browse Cabins**: View all available luxury cabins with details about capacity, pricing, and amenities
- **Cabin Details**: See detailed information about each cabin including images and descriptions
- **Filter Cabins**: Filter cabins by maximum capacity
- **Date Selection**: Interactive date picker to select check-in and check-out dates
- **Make Reservations**: Book cabins for specific date ranges
- **User Authentication**: Secure login via Google OAuth
- **Profile Management**: Update personal information and nationality
- **Reservation Management**: View, edit, and delete existing reservations
- **Responsive Design**: Fully responsive interface that works on all devices

### About Page
- Learn about The Wild Oasis history (family-run since 1962)
- Discover the location in the Italian Dolomites
- View beautiful images of the property

## 🛠 Tech Stack

### Frontend
- **Next.js 15.3.8** - React framework with App Router
- **React 19.0.0** - UI library
- **Tailwind CSS 4** - Utility-first CSS framework
- **Heroicons** - Beautiful hand-crafted SVG icons
- **React Day Picker** - Date selection component
- **date-fns** - Modern JavaScript date utility library

### Backend & Database
- **Supabase** - Backend as a Service (PostgreSQL database, authentication, and storage)
- **NextAuth.js 5** - Authentication for Next.js

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Turbopack** - Fast bundler for development

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun
- A Supabase account
- Google OAuth credentials (for authentication)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd the-wild-oasis-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory and add the following variables (see [Environment Variables](#environment-variables) section for details):
   ```env
   # Supabase
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_KEY=your_supabase_anon_key

   # NextAuth
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret

   # Google OAuth
   AUTH_GOOGLE_ID=your_google_client_id
   AUTH_GOOGLE_SECRET=your_google_client_secret
   ```

4. **Set up Supabase database**
   
   Create the following tables in your Supabase project:
   - `cabins` - Store cabin information
   - `guests` - Store guest profiles
   - `bookings` - Store reservation data
   
   See the [Database Schema](#database-schema) section for detailed table structures.

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

| Variable | Description | Required |
|----------|-------------|----------|
| `SUPABASE_URL` | Your Supabase project URL | Yes |
| `SUPABASE_KEY` | Your Supabase anonymous key | Yes |
| `NEXTAUTH_URL` | The canonical URL of your site (use `http://localhost:3000` for development) | Yes |
| `NEXTAUTH_SECRET` | A random string used to encrypt tokens (generate with `openssl rand -base64 32`) | Yes |
| `AUTH_GOOGLE_ID` | Google OAuth client ID | Yes |
| `AUTH_GOOGLE_SECRET` | Google OAuth client secret | Yes |

### Setting up Google OAuth

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - Development: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://yourdomain.com/api/auth/callback/google`

## 📁 Project Structure

```
the-wild-oasis-website/
├── app/                          # Next.js App Router directory
│   ├── _components/              # Reusable React components
│   │   ├── Cabin.js             # Individual cabin component
│   │   ├── CabinCard.js         # Cabin card for listings
│   │   ├── CabinList.js         # List of cabins
│   │   ├── DateSelector.js      # Date picker for reservations
│   │   ├── Filter.js            # Cabin filter component
│   │   ├── Header.js            # Site header
│   │   ├── Navigation.js        # Main navigation
│   │   ├── ReservationForm.js   # Booking form
│   │   ├── ReservationCard.js   # Reservation display card
│   │   └── ...                  # Other components
│   ├── _lib/                    # Utility functions and configurations
│   │   ├── actions.js           # Server actions
│   │   ├── auth.js              # NextAuth configuration
│   │   ├── data-service.js      # Database queries
│   │   └── supabase.js          # Supabase client
│   ├── _styles/                 # Global styles
│   │   └── globals.css          # Global CSS with Tailwind directives
│   ├── about/                   # About page
│   ├── account/                 # Account management pages
│   │   ├── profile/             # User profile page
│   │   └── reservations/        # User reservations page
│   ├── cabins/                  # Cabin pages
│   │   ├── [cabinId]/          # Dynamic cabin detail page
│   │   └── thankyou/           # Thank you page after booking
│   ├── login/                   # Login page
│   ├── api/                     # API routes
│   │   └── auth/               # NextAuth API routes
│   ├── layout.js               # Root layout
│   ├── page.js                 # Home page
│   ├── loading.js              # Loading UI
│   ├── error.js                # Error UI
│   └── not-found.js            # 404 page
├── public/                      # Static assets
│   ├── about-1.jpg             # About page images
│   ├── about-2.jpg
│   ├── bg.png                  # Background image
│   └── logo.png                # Site logo
├── middleware.js               # Next.js middleware for auth
├── next.config.js              # Next.js configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── package.json                # Project dependencies
└── README.md                   # This file
```

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build the application for production |
| `npm run start` | Start the production server |
| `npm run prod` | Build and start production server |
| `npm run lint` | Run ESLint to check code quality |

## 🔒 Authentication

The application uses **NextAuth.js** with Google OAuth for authentication.

### Protected Routes
- `/account` - User account pages (requires authentication)
- `/account/profile` - User profile management
- `/account/reservations` - User reservations

### Middleware
The `middleware.js` file protects account routes and redirects unauthenticated users to the login page.

## 🗄️ Database Schema

The application uses Supabase (PostgreSQL) with the following main tables:

### Cabins Table
```sql
cabins
├── id (int, primary key)
├── name (text)
├── maxCapacity (int)
├── regularPrice (decimal)
├── discount (decimal)
├── description (text)
└── image (text, URL)
```

### Guests Table
```sql
guests
├── id (int, primary key)
├── email (text, unique)
├── fullName (text)
├── nationality (text)
├── nationalID (text)
└── countryFlag (text)
```

### Bookings Table
```sql
bookings
├── id (int, primary key)
├── guestId (int, foreign key)
├── cabinId (int, foreign key)
├── startDate (date)
├── endDate (date)
├── numNights (int)
├── numGuests (int)
├── cabinPrice (decimal)
├── extraPrice (decimal)
├── totalPrice (decimal)
├── status (text)
├── hasBreakfast (boolean)
├── isPaid (boolean)
├── observations (text)
└── created_at (timestamp)
```

## 🚀 Deployment

### Deploy on Vercel (Recommended)

1. **Push your code to GitHub**

2. **Import project to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your repository

3. **Configure environment variables**
   - Add all required environment variables in the Vercel dashboard
   - Update `NEXTAUTH_URL` to your production domain

4. **Deploy**
   - Vercel will automatically deploy your application
   - Get your production URL

### Other Deployment Options
- **Netlify**: Supports Next.js applications
- **Self-hosted**: Use `npm run build` and `npm run start`

## 📚 Learn More

### Next.js Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Next.js GitHub Repository](https://github.com/vercel/next.js)

### Other Resources
- [Supabase Documentation](https://supabase.com/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Day Picker Documentation](https://react-day-picker.js.org/)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is for educational purposes.

---

**Built with ❤️ using Next.js, React, and Supabase**
