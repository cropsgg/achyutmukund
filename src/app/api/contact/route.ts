import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
// Remove the direct Resend import to prevent build failures
// import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Validate the input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check if environment variables are set
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Missing environment variables:', {
        hasEmailUser: !!process.env.EMAIL_USER,
        hasEmailPass: !!process.env.EMAIL_PASS
      });
      return NextResponse.json(
        { error: 'Email configuration is missing' },
        { status: 500 }
      );
    }

    // Try sending with Gmail first
    try {
      // Create a more secure transporter using TLS settings
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        tls: {
          // do not fail on invalid certs
          rejectUnauthorized: false
        }
      });

      // Email content
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Your email where you want to receive messages
        subject: `New Contact Form Submission from ${name}`,
        text: `
          Name: ${name}
          Email: ${email}
          Message: ${message}
        `,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      };

      // Try sending the email
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully via Gmail');
      
      return NextResponse.json(
        { message: 'Email sent successfully' },
        { status: 200 }
      );
    } catch (gmailError) {
      console.error('Failed to send email via Gmail:', gmailError);
      
      // Use a simpler fallback method without requiring Resend
      try {
        // Try an alternative nodemailer configuration as fallback
        const fallbackTransporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          }
        });
        
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_USER,
          subject: `New Contact Form Submission from ${name} (Fallback)`,
          html: `
            <h2>New Contact Form Submission (Sent via fallback method)</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          `,
        };
        
        await fallbackTransporter.sendMail(mailOptions);
        console.log('Email sent successfully via fallback method');
        
        return NextResponse.json(
          { message: 'Email sent successfully (via fallback method)' },
          { status: 200 }
        );
      } catch (fallbackError) {
        console.error('Failed to send email via fallback method:', fallbackError);
        return NextResponse.json(
          { error: 'Failed to send email via all methods', details: 'Both primary and fallback email methods failed' },
          { status: 500 }
        );
      }
    }
  } catch (error) {
    console.error('Error in contact form processing:', error);
    return NextResponse.json(
      { error: 'Failed to process request', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 