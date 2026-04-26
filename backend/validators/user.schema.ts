import { z } from "zod";

// Shared route-param schema for user and itinerary modules.
export const idParamSchema = z.object({
  id: z.string().trim().min(1, "id param is required"),
});

export const contactMessageSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address"),
  subject: z.string().trim().min(5, "Subject must be at least 5 characters").max(150, "Subject must be less than 150 characters"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(1000, "Message must be less than 1000 characters"),
});

export const idQuerySchema = z.object({
  id: z.string().trim().min(1, "id query param is required"),
});

export const saveItinerarySchema = z.object({
  name: z.string().min(1, "Itinerary name is required").optional(),
  noOfDays: z.number().optional(),
  distance: z.string().optional(),
  travelTime: z.string().optional(),
  details: z.any().optional(),
}).passthrough();

export const updateProfilePicSchema = z.object({
  imageData: z.string().min(1, "Image data is required"),
});

export type IdParam = z.infer<typeof idParamSchema>;
export type ContactMessage = z.infer<typeof contactMessageSchema>;
