import { IContactFormData } from "@/interfaces/contact";
import { contactSchema } from "@/schemas/contact";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputWithValidation from "./InputWithValidation";
import TextareaWithValidation from "./TextareaWithValidation";
import { sendContactMail } from "@/apollo/contact";
import BasicCaptcha from "./BasicCaptcha";

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
    if (isBotCheck) {
      if (captchaIsMatching) {
        try {
          const response = await sendContactMail(contactData);
          if (response.sendEmail.sent) {
            router.push("/thank-you");
          }
        } catch (e) {
          setCaptchaError("Sending email failed, please try again!");
        }
      } else {
        setCaptchaError("Captcha mismatch!");
        setCaptchaKey(`${captchaKey}-${Math.random()}`);
      }
    } else {
      setIsBotCheck(true);
    }
  };

  const [isBotCheck, setIsBotCheck] = useState<boolean>(false);
  const [captchaIsMatching, setCaptchaIsMatching] = useState<boolean>(false);
  const [captchaError, setCaptchaError] = useState<string>("");
  const [captchaKey, setCaptchaKey] = useState<string>(
    `captcha-key-${Math.random()}`
  );

  return (
    <>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <InputWithValidation
          label="Name"
          error={errors.name?.message}
          {...register("name")}
        />
        <InputWithValidation
          label="E-mail"
          error={errors.email?.message}
          {...register("email")}
        />
        <InputWithValidation
          label="Subject"
          error={errors.subject?.message}
          {...register("subject")}
        />
        <TextareaWithValidation
          label="Message"
          error={errors.message?.message}
          {...register("message")}
        />

        {isBotCheck && (
          <BasicCaptcha
            key={captchaKey}
            captchaError={captchaError}
            setCaptchaIsMatching={setCaptchaIsMatching}
          />
        )}

        <button type="submit" className="win-primary-button bg-win-primary">
          Send
        </button>
      </form>
    </>
  );
};
export default ContactForm;
