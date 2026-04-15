"use server";

import { prisma } from "@/lib/prisma";
import * as z from "zod";
import { getSession } from "../auth/server";

const createEventSchema = z.object({
  title: z
    .string()
    .min(3, "Event title must be at least 3 characters.")
    .max(100, "Event title must be at most 100 characters."),
  description: z
    .string()
    .max(500, "Description must be at most 500 characters.")
    .optional(),
  location: z
    .string()
    .max(200, "Location must be at most 200 characters.")
    .optional(),
  eventDate: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Date.parse(val)), "Invalid event date"),
});

export type CreateEventInput = z.infer<typeof createEventSchema>;

export async function createEventAction(data: CreateEventInput) {
  try {
    const validatedData = createEventSchema.parse(data);

    const session = await getSession();
    const userId = session.data?.user.id;

    if (!userId) {
      return {
        success: false,
        error: "User not authenticated",
      };
    }

    const event = await prisma.event.create({
      data: {
        ownerUserId: userId,
        title: validatedData.title,
        description: validatedData.description || null,
        location: validatedData.location || null,
        eventDate: validatedData.eventDate
          ? new Date(validatedData.eventDate)
          : null,
      },
    });

    return {
      success: true,
      data: event,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.flatten().fieldErrors,
      };
    }

    console.error("Error creating event:", error);
    return {
      success: false,
      error: "Failed to create event",
    };
  }
}
