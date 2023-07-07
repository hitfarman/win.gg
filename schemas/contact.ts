import * as yup from "yup";

export const emailValidation = yup.string().email().required();

export const contactSchema = yup
  .object({
    name: yup.string().required(),
    email: emailValidation,
    subject: yup.string().required(),
    message: yup.string().required()
  })
  .required();
