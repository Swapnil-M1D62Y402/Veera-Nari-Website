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
    where: { id: req.user.id }
  });

//   if (!user || !user.trustedEmail) {
//     return res.status(400).json({ message: 'Trusted contact email not found' });
//   }

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
    // to: user.trustedEmail,
    to: process.env.EMAIL_USER,
    subject: 'Emergency Location Share',
    html: `
      <h2>Emergency Location Alert</h2>
      <p>${user.name} has shared their location with you.</p>
      <p>Location coordinates: ${location.latitude}, ${location.longitude}</p>
      <p>Google Maps Link: https://www.google.com/maps?q=${location.latitude},${location.longitude}</p>
      <p>Shared at: ${new Date().toLocaleString()}</p>
      <p>This is an automated emergency alert.</p>
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
