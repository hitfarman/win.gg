import { gql } from "@apollo/client";
import { client } from "@/apollo/init";
import {
  IContactEmailResponse,
  IContactFormData,
  IContactFormInputVariable
} from "@/interfaces/contact";
import { CONTACT_EMAIL_TO } from "@/constants/contact";

const SEND_CONTACT_MAIL = gql`
  mutation sendContactEmail($input: SendEmailInput = {}) {
    sendEmail(input: $input) {
      origin
      sent
      message
    }
  }
`;

export const sendContactMail = async (contactForm: IContactFormData) => {
  const input: IContactFormInputVariable = {
    body: `
    Name: ${contactForm.name}
    <br>
    <br>
    Message: ${contactForm.message}
    `,
    from: contactForm.email,
    subject: contactForm.subject,
    to: CONTACT_EMAIL_TO
  };
  const response = await client.query<IContactEmailResponse>({
    query: SEND_CONTACT_MAIL,
    variables: { input }
  });
  return response.data;
};
