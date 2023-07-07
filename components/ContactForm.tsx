import { IContactFormData } from "@/interfaces/contact";
import { contactSchema } from "@/schemas/contact";
import { useRouter } from "next/router";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputWithValidation from "./InputWithValidation";

const ContactForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IContactFormData>({
    resolver: yupResolver(contactSchema)
  });

  const onSubmit: SubmitHandler<IContactFormData> = async (contactData) => {
    console.log(contactData);
    const response = await "";
  };

  return (
    <>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <InputWithValidation
          label="Name"
          error={errors.name?.message}
          {...register("name")}
        />
        <InputWithValidation
          label="Email"
          error={errors.email?.message}
          {...register("email")}
        />
        <InputWithValidation
          label="Subject"
          error={errors.subject?.message}
          {...register("subject")}
        />
        <InputWithValidation
          label="Message"
          error={errors.message?.message}
          {...register("message")}
        />
        <button type="submit" className="win-primary-button bg-win-primary">
          Send
        </button>
      </form>
    </>
  );
};
export default ContactForm;
