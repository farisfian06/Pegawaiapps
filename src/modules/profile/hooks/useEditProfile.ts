import { useForm } from "react-hook-form";
import { profileSchema, type ProfilePayload } from "../schema/profileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

export const useEditProfile = (
  onClose: () => void,
  initialData: ProfilePayload
) => {
  const form = useForm<ProfilePayload>({
    resolver: zodResolver(profileSchema),
    defaultValues: initialData,
  });

  useEffect(() => {
    form.reset(initialData);
  }, [initialData, form]);

  const onSubmit = (data: ProfilePayload) => {
    console.log(data);
    localStorage.setItem("authUser", JSON.stringify(data));
    onClose();
    window.location.reload();
  };

  return {
    form,
    onSubmit,
  };
};
