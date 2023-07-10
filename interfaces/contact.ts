export interface IContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface IContactFormInputVariable {
  body: string;
  from: string;
  to: string;
  subject: string;
}

export interface IContactEmailResponse {
  sendEmail: {
    message: string;
    origin: string;
    sent: boolean;
  };
}
