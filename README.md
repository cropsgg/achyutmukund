# Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Responsive design
- Dark mode
- Contact form with email functionality
- Project showcase
- Skills section
- Resume download
- Interactive animations

## Prerequisites

- Node.js 18.x or later
- npm or yarn
- Gmail account (for contact form)

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file with your email credentials:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-specific-password
   ```
   Note: For Gmail, you'll need to generate an App Password from your Google Account settings.

## Development

Run the development server:
```bash
npm run dev
```

## Build

Create a production build:
```bash
npm run build
```

## Deployment

The website can be deployed on Vercel:

1. Push your code to a GitHub repository
2. Import the repository on Vercel
3. Add your environment variables in the Vercel dashboard
4. Deploy!

## Environment Variables

- `EMAIL_USER`: Your Gmail address
- `EMAIL_PASS`: Gmail App Password

## License

MIT
