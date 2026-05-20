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

const today = new Date();

// Reset time to midnight
today.setHours(0, 0, 0, 0);

const dateSchema =(isEdit: boolean) =>{
  if (isEdit) {
    return z.coerce
    .date()
  } else {
    return z.coerce
    .date()
    .min( today , "Date cannot be in the past");
  }
} 

export const ItinerarySchema = (isEdit: boolean) => z.object({
  userId: z.string().min(1, "userId is required"),
  name: z.string().min(1, "Itinerary name is required"),
  itinerary: z.record(
    z.string(),
    z.object({
      day: z.number(),
      date: dateSchema(isEdit),
      startingPoint: z.string(),
      endPoint: z.string(),
      todo: z.array(
        z.object({
          time: z.string(),
          activity: z.string(),
          isChecked: z.boolean(),
        })
      ),
      notes: z.string(),
    })
  ),
  places: z.object({
    startingPoint: z.object({ latitude: z.number(), longitude: z.number() }).optional(),
    endPoint: z.object({ latitude: z.number(), longitude: z.number() }).optional(),
    selectedPlaces: z.record(
      z.string(),
      z.object({
        place: z.object({
          _id: z.string(),
          siteLabel: z.string(),
          typeLabel: z.string(),
          location: z.object({
            type: z.string().optional(),
            coordinates: z.tuple([z.number(), z.number()]),
          }),
          site: z.string().optional(),
        }),
        index: z.number(),
        distFromStart: z.number(),
      })
    ).optional(),
  }),
  distance: z.string().optional(),
  travelTime: z.string().optional(),
  noOfDays: z.number().optional(),
  coordinates: z.array(z.tuple([z.number(), z.number()])).optional(),
  details: z.object({
    destination: z.string(),
    startDate: dateSchema(isEdit),
    endDate: dateSchema(isEdit),
    budget: z.union([z.number(), z.string()]),
    currency: z.string(),
    transportation: z.string(),
    activities: z.object({
      sightseeing: z.boolean(),
      adventure: z.boolean(),
      shopping: z.boolean(),
      relaxation: z.boolean(),
      cultural: z.boolean(),
      others: z.boolean(),
    }),
    notes: z.string(),
    numPeople: z.union([z.number(), z.string()]),
    startingPoint: z.string(),
  }).refine(
    (data) => data?.startDate && data?.endDate && data?.startDate <= data?.endDate,
    {
      message: "End date must be after or equal to start date",
      path: ["endDate"], // error appears on endDate field
    }
  ),
  createdAt: z.union([z.string(), z.date()]).optional(),
});


export const updateProfilePicSchema = z.object({
  imageData: z.string().min(1, "Image data is required"),
});

export type IdParam = z.infer<typeof idParamSchema>;
export type ContactMessage = z.infer<typeof contactMessageSchema>;
export type ItineraryData = z.infer<ReturnType<typeof ItinerarySchema>>;
