import { z } from "zod";
export const employeeSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  image: z.union([z.string(), z.instanceof(File)]).optional(),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\d+$/, "Phone number must contain only number"),
  division: z.string().min(1, "Division is required"),
  position: z.string().min(1, "Position is required"),
});

export type EmployeePayload = z.infer<typeof employeeSchema>;
