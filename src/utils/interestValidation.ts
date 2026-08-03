import * as Yup from 'yup';

const supportedCharacters = /^([ÆØÅæøåA-Z,a-z,0-9,(,),-,_,&,.,.,,!,?])/;

export const createValidationSchema = (
  english: boolean
): Yup.ObjectSchema<any> => {
  const messages = english
    ? {
        required: 'This field is required.',
        characters: 'The value contains unsupported characters.',
        email: 'Enter a valid email address.',
        phone: 'Enter a valid phone number.',
        message: 'Use no more than 300 characters.',
        recaptcha: 'Complete the reCAPTCHA.',
        confirm: 'Confirm that you understand how the form is used.',
      }
    : {
        required: 'Dette feltet er obligatorisk.',
        characters: 'Verdien inneholder tegn som ikke støttes.',
        email: 'Skriv inn en gyldig e-postadresse.',
        phone: 'Skriv inn et gyldig telefonnummer.',
        message: 'Bruk maksimalt 300 tegn.',
        recaptcha: 'Fullfør reCAPTCHA-kontrollen.',
        confirm: 'Bekreft at dere forstår hvordan skjemaet brukes.',
      };

  return Yup.object().shape({
    companyName: Yup.string()
      .required(messages.required)
      .matches(supportedCharacters, messages.characters),
    contactPerson: Yup.string()
      .required(messages.required)
      .matches(supportedCharacters, messages.characters),
    contactEmail: Yup.string()
      .required(messages.required)
      .email(messages.email),
    contactTlf: Yup.string()
      .required(messages.required)
      .matches(/^([+,-, ,0-9,(,)]){4,15}/, messages.phone),
    day: Yup.string().required(messages.required),
    marathon: Yup.string().required(messages.required),
    message: Yup.string().max(300, messages.message),
    recaptcha: Yup.string().required(messages.recaptcha),
    confirm: Yup.bool().oneOf([true], messages.confirm),
  });
};
