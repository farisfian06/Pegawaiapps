import { useForm } from "react-hook-form";
import { loginSchema, type LoginPayload } from "../schema/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { USERS } from "../data/users";
import { toast } from "react-toastify";

const useLogin = () => {
  const navigate = useNavigate();
  const form = useForm<LoginPayload>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginPayload) => {
    const user = USERS.find(
      (u) => u.email === data.email && u.password === data.password
    );

    if (user) {
      localStorage.setItem("authUser", JSON.stringify(user));
      navigate("/");
    } else {
      toast.error("Invalid email or password", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return {
    form,
    onSubmit,
  };
};

export default useLogin;
