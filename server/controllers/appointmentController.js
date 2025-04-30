import prisma from "../config/db.js";
import asyncHandler from 'express-async-handler';

// Book appointment
export const createAppointment = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { consultantId, date, time } = req.body;

  console.log("Consultant ID received:", consultantId);

  // Validate consultantId
  const consultant = await prisma.user.findFirst({
    where: {
      id: parseInt(consultantId),
      userType: 'CONSULTANT'
    },
    include: {
      consultantProfile: true
    }
  });

  if (!consultant || !consultant.consultantProfile) {
    console.error("Consultant not found for ID:", consultantId);
    res.status(404);
    throw new Error("Consultant not found");
  }

  try {
    const appointment = await prisma.appointment.create({
      data: {
        userId,
        consultantId: consultant.consultantProfile.id,
        date: new Date(date),
        time,
        status: "pending",
      },
      include: {
        consultant: true,
        user: true
      }
    });

    res.status(201).json(appointment);
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({
      message: "Failed to create appointment",
      error: error.message,
    });
  }
});

// Get user appointments
export const getUserAppointments = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const appointments = await prisma.appointment.findMany({
    where: { userId },
    include: {
      consultant: {
        include: {
          user: true
        }
      }
    }
  });

  res.json(appointments);
});