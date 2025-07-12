import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { employeeSchema, type EmployeePayload } from "../schema/employeeSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../api/axios";
import { toast } from "react-toastify";

type EditEmployeeResponse = {
  status: string;
  message: string;
};

export const useEditEmployee = (
  onClose: () => void,
  initialData: EmployeePayload
) => {
  const queryClient = useQueryClient();
  const form = useForm<EmployeePayload>({
    resolver: zodResolver(employeeSchema),
    defaultValues: initialData,
  });

  useEffect(() => {
    form.reset({
      ...initialData,
      image: initialData.image,
    });
  }, [initialData, form]);

  const editEmployeeMutation = useMutation({
    mutationFn: async (data: EmployeePayload) => {
      const response = await axiosInstance.post<EditEmployeeResponse>(
        `/employees/${data.id}`,
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
    editEmployeeMutation.mutate(data);
  };

  return {
    form,
    onSubmit,
    isLoading: editEmployeeMutation.isPending,
  };
};
