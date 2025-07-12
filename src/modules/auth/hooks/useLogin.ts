import { useForm } from "react-hook-form";
import { loginSchema, type LoginPayload } from "../schema/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../api/axios";

type LoginResponse = {
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

const useLogin = () => {
  const navigate = useNavigate();
  const form = useForm<LoginPayload>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginPayload) => {
      const response = await axiosInstance.post<LoginResponse>("/login", data);
      console.log("respons", response.data);
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("authUser", JSON.stringify(data.data.admin));
      localStorage.setItem("token", data.data.token);
      navigate("/");
    },
    onError: () => {
      toast.error("Invalid email or password", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    },
  });

  const onSubmit = (data: LoginPayload) => {
    loginMutation.mutate(data);
  };

  return {
    form,
    onSubmit,
    isLoading: loginMutation.isPending,
  };
};

export default useLogin;
