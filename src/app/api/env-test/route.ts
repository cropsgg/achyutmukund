import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check if environment variables are set
    const envStatus = {
      hasEmailUser: !!process.env.EMAIL_USER,
      // Don't expose the full email password, just whether it exists
      hasEmailPass: !!process.env.EMAIL_PASS,
      emailUserMasked: process.env.EMAIL_USER 
        ? `${process.env.EMAIL_USER.split('@')[0].substring(0, 2)}...@${process.env.EMAIL_USER.split('@')[1]}` 
        : null
    };

    return NextResponse.json(
      { 
        status: 'Environment Variables Check', 
        message: 'This endpoint checks if environment variables are properly loaded',
        environment: process.env.NODE_ENV,
        variables: envStatus
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Error checking environment variables', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 