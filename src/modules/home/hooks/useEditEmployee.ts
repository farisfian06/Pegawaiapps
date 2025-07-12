import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { employeeSchema, type EmployeePayload } from "../schema/employeeSchema";

export const useEditEmployee = (
  onClose: () => void,
  initialData: EmployeePayload,
  editEmployee: (data: EmployeePayload) => void
) => {
  const form = useForm<EmployeePayload>({
    resolver: zodResolver(employeeSchema),
    defaultValues: initialData,
  });

  useEffect(() => {
    form.reset(initialData);
  }, [initialData, form]);

  const onSubmit = (data: EmployeePayload) => {
    editEmployee(data);
    form.reset();
    onClose();
  };

  return {
    form,
    onSubmit,
  };
};
