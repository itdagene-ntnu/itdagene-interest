import { Field, Formik, FormikProps } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import './InterestForm.css';
import info from '../utils/text.json';
import keys from '../utils/keys.json';
import { submitHandler } from '../utils/handler';
import { Section } from './Section';
import Recaptcha from 'react-recaptcha';

export interface FormValues {
  companyName: string;
  contactPerson: string;
  contactEmail: string;
  contactTlf: string;
  day: string;
  marathon: string;
  message: string;
  recaptcha: string;
}

const initialValues: FormValues = {
  companyName: '',
  contactPerson: '',
  contactEmail: '',
  contactTlf: '',
  day: '',
  marathon: '',
  message: '',
  recaptcha: ''
};

const regex = /^([A-Z,a-z,0-9,(,),-,_,&,.,.,,!,?])/;

const validationSchema = Yup.object().shape({
  companyName: Yup.string()
    .required('Bedriftsnavn er påkrevd')
    .matches(regex, 'Ugyldig karakterer'),
  contactPerson: Yup.string()
    .required('Kontaktpersonen er påkrevd')
    .matches(regex, 'Ugyldig karakterer'),
  contactEmail: Yup.string()
    .required('Epost er påkrevd')
    .email('Epost må være på lovlig format'),
  contactTlf: Yup.string()
    .required('Telefonnummer er påkrevd')
    .matches(
      /^([+,-, ,0-9,(,)]){4,15}/,
      'Telefonnummer må være på lovlig format'
    ),
  day: Yup.string()
    .required('Påkrevd felt')
    .matches(regex, 'Ugyldig karakterer'),
  marathon: Yup.string()
    .required('Påkrevd felt')
    .matches(regex, 'Ugyldig karakterer'),
  message: Yup.string().max(300, 'Max 300 bokstaver'),
  recaptcha: Yup.string().required('Vennligst bekreft vår recaptcha')
});

interface Props {
  handleSubmit: (success: boolean) => void;
}

class InterestForm extends React.Component<Props> {
  public componentDidMount(): void {
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }

  public render(): JSX.Element {
    console.log(this.props);
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }): void => {
          submitHandler(values, this.props.handleSubmit);
          setSubmitting(false);
        }}
        validationSchema={validationSchema}
      >
        {(props: FormikProps<FormValues>): JSX.Element => {
          const {
            values,
            touched,
            errors,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue
          } = props;
          return (
            <form onSubmit={handleSubmit}>
              <Section header="Bedriften" text={info.company}>
                <h3>Bedriftsnavn*</h3>
                <Field
                  id="companyName"
                  type="text"
                  value={values.companyName}
                  name="companyName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.companyName && touched.companyName
                      ? 'text-input error'
                      : 'text-input'
                  }
                />
                <>
                  {touched.companyName && errors.companyName && (
                    <div className="input-feedback">{errors.companyName}</div>
                  )}
                </>
              </Section>

              <Section header="Kontaktpersonen" text={info.person}>
                <h3>Navn*</h3>
                <Field
                  id="contactPerson"
                  type="text"
                  value={values.contactPerson}
                  name="contactPerson"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.contactPerson && touched.contactPerson
                      ? 'text-input error'
                      : 'text-input'
                  }
                />
                <>
                  {touched.contactPerson && errors.contactPerson && (
                    <div className="input-feedback">{errors.contactPerson}</div>
                  )}
                </>

                <h3>Epost*</h3>
                <Field
                  id="contactEmail"
                  type="email"
                  value={values.contactEmail}
                  name="contactEmail"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.contactEmail && touched.contactEmail
                      ? 'text-input error'
                      : 'text-input'
                  }
                />
                <>
                  {touched.contactEmail && errors.contactEmail && (
                    <div className="input-feedback">{errors.contactEmail}</div>
                  )}
                </>

                <h3>Telefon*</h3>
                <Field
                  id="contactTlf"
                  type="text"
                  value={values.contactTlf}
                  name="contactTlf"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.contactTlf && touched.contactTlf
                      ? 'text-input error'
                      : 'text-input'
                  }
                />
                <>
                  {touched.contactTlf && errors.contactTlf && (
                    <div className="input-feedback">{errors.contactTlf}</div>
                  )}
                </>
              </Section>

              <Section header="Ønsker" text={info.day}>
                <h3>Ønsket dag*</h3>
                <span className="infoText">{info.day}</span>
                <div
                  className={
                    errors.day && touched.day
                      ? 'divNoError divError'
                      : 'divNoError'
                  }
                >
                  <label>
                    <Field
                      id="day"
                      value="Dag 1"
                      type="radio"
                      name="day"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    Mandag 9.september
                  </label>
                  <label>
                    <Field
                      id="day"
                      value="Dag 2"
                      type="radio"
                      name="day"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    Tirsdag 10.september
                  </label>
                  <label>
                    <Field
                      id="day"
                      value="Ingen"
                      type="radio"
                      name="day"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    Ingen prioritering
                  </label>
                </div>
                <>
                  {touched.day && errors.day && (
                    <div className="input-feedback">{errors.day}</div>
                  )}
                </>

                <h3>Ønsker dere å delta på sommerjobbmaraton*</h3>
                <span className="infoText">{info.marathon}</span>
                <div
                  className={
                    errors.marathon && touched.marathon
                      ? 'divNoError divError'
                      : 'divNoError'
                  }
                >
                  <label className="label">
                    <Field
                      id="marathon"
                      value="Ja"
                      type="radio"
                      name="marathon"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    Ja
                  </label>
                  <label className="label">
                    <Field
                      id="marathon"
                      value="Nei"
                      type="radio"
                      name="marathon"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    Nei
                  </label>
                  <label className="label">
                    <Field
                      id="marathon"
                      value="Vet ikke enda"
                      type="radio"
                      name="marathon"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    Vet ikke enda
                  </label>
                </div>
                <>
                  {touched.marathon && errors.marathon && (
                    <div className="input-feedback">{errors.marathon}</div>
                  )}
                </>

                <h3>Andre henvendelser</h3>
                <span className="infoText">{info.other}</span>
                <>
                  <Field
                    id="message"
                    value={values.message}
                    component="textarea"
                    name="message"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Frivillig felt..."
                    className={
                      errors.message && touched.message
                        ? 'textarea error'
                        : 'textarea'
                    }
                  />

                  {touched.message && errors.message && (
                    <div className="input-feedback">{errors.message}</div>
                  )}
                </>
              </Section>

              <div className="center">
                <Recaptcha
                  sitekey={keys.SITEKEY}
                  id="recaptcha"
                  render="explicit"
                  theme="light"
                  size="normal"
                  value={values.recaptcha}
                  verifyCallback={(response: string): void => {
                    setFieldValue('recaptcha', response);
                  }}
                  onloadCallback={(): void => {
                    console.log('reCAPTCHA loaded');
                  }}
                />

                {touched.recaptcha && errors.recaptcha && (
                  <div className="input-feedback">{errors.recaptcha}</div>
                )}
              </div>

              <div className="center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="submit"
                >
                  Send inn!
                </button>
              </div>
            </form>
          );
        }}
      </Formik>
    );
  }
}

export default InterestForm;
