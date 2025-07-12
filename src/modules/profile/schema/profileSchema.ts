import { z } from "zod";
export const profileSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Name is required"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\d+$/, "Phone number must contain only number"),
  division: z.string().min(1, "Division is required"),
  position: z.string().min(1, "Position is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
});

export type ProfilePayload = z.infer<typeof profileSchema>;
