import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../api/axios";
import { toast } from "react-toastify";

type DeleteEmployeePayload = {
  id: string;
};

type DeleteEmployeeResponse = {
  status: string;
  message: string;
};

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  const DeleteEmployeeMutation = useMutation({
    mutationFn: async (data: DeleteEmployeePayload) => {
      const response = await axiosInstance.delete<DeleteEmployeeResponse>(
        `/employees/${data.id}`
      );
      console.log("respons", response.data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["employees"],
      });
      toast.success("Success delete employee", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
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

  const onSubmit = (data: DeleteEmployeePayload) => {
    DeleteEmployeeMutation.mutate(data);
  };

  return {
    onSubmit,
    isDeleteLoading: DeleteEmployeeMutation.isPending,
  };
};
