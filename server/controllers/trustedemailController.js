import prisma from "../config/db.js";
import asyncHandler from 'express-async-handler';

export const updateTrustedEmail = asyncHandler(async (req, res) => {
    const { trustedEmail } = req.body;
  
    if (!trustedEmail) {
      return res.status(400).json({ message: 'Invalid email address' });
    }
  
    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: { trustedEmail },
      select: {
        id: true,
        username: true,
        email: true,
        trustedEmail: true
      }
    });
  
    res.json(updatedUser);
  });