import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { employeeSchema, type EmployeePayload } from "../schema/employeeSchema";

export const useAddEmployee = (
  onClose: () => void,
  addEmployeeFromForm: (data: EmployeePayload) => void
) => {
  const form = useForm<EmployeePayload>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      divisi: "",
      posisi: "",
      name: "",
      phone: "",
    },
  });

  const onSubmit = (data: EmployeePayload) => {
    addEmployeeFromForm(data);
    form.reset();
    onClose();
  };

  return {
    form,
    onSubmit,
  };
};
