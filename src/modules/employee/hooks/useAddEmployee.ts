import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { employeeSchema, type EmployeePayload } from "../schema/employeeSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../api/axios";
import { toast } from "react-toastify";

type AddEmployeeResponse = {
  status: string;
  message: string;
  data: {
    token: string;
    admin: {
      name: string;
      email: string;
      phone: string;
    };
  };
};

export const useAddEmployee = (onClose: () => void) => {
  const queryClient = useQueryClient();
  const form = useForm<EmployeePayload>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      division: "",
      position: "",
      name: "",
      phone: "",
    },
  });

  const addEmployeeMutation = useMutation({
    mutationFn: async (data: EmployeePayload) => {
      const response = await axiosInstance.post<AddEmployeeResponse>(
        "/employees",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("respons", response.data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["employees"],
      });
      toast.success("Success add employee", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      form.reset();
      onClose();
    },
    onError: (error) => {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    },
  });

  const onSubmit = (data: EmployeePayload) => {
    addEmployeeMutation.mutate(data);
  };

  return {
    form,
    onSubmit,
    isLoading: addEmployeeMutation.isPending,
  };
};
