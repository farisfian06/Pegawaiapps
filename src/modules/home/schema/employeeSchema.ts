import { z } from "zod";
export const employeeSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Name is required"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\d+$/, "Phone number must contain only number"),
  divisi: z.string().min(1, "Division is required"),
  posisi: z.string().min(1, "Position is required"),
});

export type EmployeePayload = z.infer<typeof employeeSchema>;
