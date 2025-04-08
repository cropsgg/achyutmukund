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
- Optional: Resend.com account (for fallback email service)

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```
3. Create a `.env.local` file with your email credentials:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-specific-password
   RESEND_API_KEY=your-resend-api-key (optional)
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
3. Add your environment variables in the Vercel dashboard:
   - `EMAIL_USER`: Your Gmail address
   - `EMAIL_PASS`: Gmail App Password
   - `RESEND_API_KEY`: Your Resend API key (optional but recommended)
4. Deploy!

### Troubleshooting Deployment Issues

If the contact form doesn't work in production:

1. Check if your environment variables are correctly set in Vercel
2. Visit `/api/env-check` on your deployed site to verify environment variables are loaded
3. Make sure your Gmail account allows "less secure apps" or use an App Password
4. Consider using the Resend.com fallback option for more reliable email delivery:
   - Sign up on [Resend.com](https://resend.com)
   - Create an API key
   - Add it as the `RESEND_API_KEY` environment variable in Vercel

## Gmail Setup for Production

1. Go to your [Google Account](https://myaccount.google.com/)
2. Navigate to Security
3. Enable 2-Step Verification if not already enabled
4. Under "Signing in to Google", click on "App Passwords"
5. Select "Mail" and "Other" for the device, and name it "Portfolio Website"
6. Use the generated 16-character password as your `EMAIL_PASS` environment variable

## Environment Variables

- `EMAIL_USER`: Your Gmail address
- `EMAIL_PASS`: Gmail App Password (not your regular Gmail password)
- `RESEND_API_KEY`: API key from Resend.com (optional fallback email service)

## License

MIT
