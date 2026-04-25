import { z } from "zod";

const coordinateSchema = z.array(z.coerce.number()).length(2).refine(
  ([lat, lng]) =>
    lat >= -90 && lat <= 90 &&
    lng >= -180 && lng <= 180,
  "Invalid latitude or longitude"
);

const booleanRecordSchema = z.record(
  z.string(),
  z.preprocess((val) => {
    if (val === "true") return true;
    if (val === "false") return false;
    return val; // let Zod fail
  }, z.boolean())
).default({})



export const searchAlongQuerySchema = z.object({
  coordinates: z.array(coordinateSchema),
  distance: z.coerce.string("Distance must be a valid number"),
  activities: booleanRecordSchema
});

export const getDestinationsQuerySchema = z.object({
  coordinates: coordinateSchema,
  distance: z.coerce.string("Distance must be a valid number"),
  type: booleanRecordSchema,
  activities: booleanRecordSchema
});

export type SearchAlongQuery = z.infer<typeof searchAlongQuerySchema>;
export type GetDestinationsQuery = z.infer<typeof getDestinationsQuerySchema>;
