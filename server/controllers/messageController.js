import prisma from "../config/db.js";
import asyncHandler from 'express-async-handler';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, //SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

export const sendSOS = asyncHandler(async (req, res) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  // Get user with their trusted contact email
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: {
        id: true,
        username: true,
        email: true,
        trustedEmail: true
    }
  });

  if (!user || !user.trustedEmail) {
    return res.status(400).json({ message: 'Trusted contact email not found' });
  }

  // Get latest location
  const location = await prisma.location.findFirst({
    where: { userId: req.user.id },
    orderBy: { createdAt: 'desc' }
  });

  if (!location) {
    return res.status(404).json({ message: 'No location data found' });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: [user.trustedEmail, process.env.POLICE_EMAIL].join(', '),
    subject: '🚨 EMERGENCY: Location Alert from Safety App',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 2px solid #ff0000; border-radius: 10px;">
        <h1 style="color: #ff0000; text-align: center;">🚨 EMERGENCY ALERT 🚨</h1>
        
        <div style="background-color: #fff3f3; padding: 15px; border-radius: 5px; margin: 10px 0;">
          <h2 style="color: #333;">Contact Information</h2>
          <p><strong>From:</strong> ${user.username}</p>
          <p><strong>Contact Email:</strong> ${user.email}</p>
          <p><strong>Alert Time:</strong> ${new Date().toLocaleString()}</p>
          <p style="color: #0066cc;"><strong>Note:</strong> Local Police (${process.env.POLICE_EMAIL}) has been notified and is tracking this location</p>
        </div>
  
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
          <h2 style="color: #333;">Location Details</h2>
          <p><strong>Coordinates:</strong> ${location.latitude}, ${location.longitude}</p>
          <p><strong>Last Updated:</strong> ${new Date(location.createdAt).toLocaleString()}</p>
          <p style="color: #008000;"><strong>Status:</strong> Location is being monitored by law enforcement</p>
          
          <div style="margin: 20px 0;">
            <a href="https://www.google.com/maps?q=${location.latitude},${location.longitude}" 
               style="background-color: #4285f4; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
              🗺️ View on Google Maps
            </a>
          </div>
        </div>
  
        <div style="background-color: #fff3f3; padding: 15px; border-radius: 5px; margin: 10px 0;">
          <h2 style="color: #333;">Emergency Instructions</h2>
          <ul style="list-style-type: none; padding-left: 0;">
            <li>✓ Try to contact the person immediately</li>
            <li>✓ Local police has been automatically notified</li>
            <li>✓ Law enforcement is monitoring this location</li>
            <li>✓ Share any additional information with police if needed</li>
            <li>✓ Keep this email for reference</li>
          </ul>
        </div>
  
        <p style="color: #666; font-size: 12px; text-align: center; margin-top: 20px;">
          This is an automated emergency alert from the Safety App. 
          Local law enforcement has been notified and is tracking this situation.
          Please take immediate action if you receive this message.
        </p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Location sent successfully to trusted contact' });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ message: 'Failed to send location email' });
  }
});
