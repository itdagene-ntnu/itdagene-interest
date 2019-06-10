import { Field, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import './InterestForm.css';
import info from '../utils/text.json';

interface FormValues {
  companyName: string;
  contactPerson: string;
  contactEmail: string;
  contactTlf: string;
  wishes: string;
  message: string;
}

const placeholder: FormValues = {
  companyName: 'Company AS',
  contactPerson: 'John Doe',
  contactEmail: 'name.name@example.com',
  contactTlf: '00 00 00 00',
  wishes: '',
  message: ''
};

interface SectionProps {
  header: string;
  text: string;
  children: JSX.Element[] | JSX.Element;
}

const Section = (props: SectionProps): JSX.Element => (
  <>
    <h2 style={{ marginTop: '50px' }}>{props.header}</h2>
    <p>{props.text}</p>
    <div className="section">{props.children}</div>
  </>
);

const initialValues = {
  companyName: '',
  contactPerson: '',
  contactEmail: '',
  contactTlf: '',
  wishes: '',
  message: ''
};

const validationSchema = Yup.object().shape({
  companyName: Yup.string().required('Bedriftsnavn er påkrevd'),
  contactPerson: Yup.string().required('Kontaktpersonen er påkrevd'),
  contactEmail: Yup.string()
    .required('Epost er påkrevd')
    .email('Epost må være på lovlig format'),
  contactTlf: Yup.string().required('Telefonnummer er påkrevd'),
  wishes: Yup.string().required(),
  marathon: Yup.string().required(),
  message: Yup.string()
});

const InterestForm = (): JSX.Element => (
  <Formik
    initialValues={initialValues}
    onSubmit={(values, { setSubmitting }) => {
      console.log(values);
    }}
    validationSchema={validationSchema}
  >
    {(props: any) => {
      const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit
      } = props;
      return (
        <form onSubmit={handleSubmit}>
          <Section header="Bedriften" text={info.company}>
            <h3>Bedriftsnavn</h3>
            <Field
              id="companyName"
              type="text"
              value={values.companyName}
              name="companyName"
              placeholder={placeholder.companyName}
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
            <h3>Navn</h3>
            <Field
              id="contactPerson"
              type="text"
              value={values.contactPerson}
              name="contactPerson"
              placeholder={placeholder.contactPerson}
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

            <h3>Epost</h3>
            <Field
              id="contactEmail"
              type="email"
              value={values.contactEmail}
              name="contactEmail"
              placeholder={placeholder.contactEmail}
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

            <h3>Telefon</h3>
            <Field
              id="contactTlf"
              type="text"
              value={values.contactTlf}
              name="contactTlf"
              placeholder={placeholder.contactTlf}
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

          <Section header="Ønsker" text={info.wishes}>
            <h3>Ønsket dag</h3>
            <>
              <label>
                <Field
                  id="wishes"
                  value="Dag 1"
                  type="radio"
                  name="wishes"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                Dag 1: Mandag 8.september
              </label>
              <label>
                <Field
                  id="wishes"
                  value="Dag 2"
                  type="radio"
                  name="wishes"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                Dag 2: Tirsdag 9.september
              </label>
              <label>
                <Field
                  id="wishes"
                  value="-"
                  type="radio"
                  name="wishes"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                Ingen prioritering
              </label>
            </>

            <h3>Ønsker dere å delta på sommerjobbmaraton</h3>
            <>
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
            </>

            <h3>Andre henvendelser</h3>
            <>
              <Field
                component="textarea"
                name="message"
                className="textarea"
                placeholder={placeholder.message}
              />
            </>
          </Section>

          <div className="submit-container">
            <button type="submit" disabled={isSubmitting} className="submit">
              Send inn!
            </button>
          </div>
        </form>
      );
    }}
  </Formik>
);

export default InterestForm;
