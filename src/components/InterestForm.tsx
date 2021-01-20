import React from 'react';
import dotenv from 'dotenv';

import textarray from '../utils/text.json';

import { Section } from './Section';
import './InterestForm.css';

import { Field, Formik, FormikProps } from 'formik';
import * as Yup from 'yup';

import Recaptcha from 'react-recaptcha';
import { RequestStatus, submitHandler } from '../utils/handler';
dotenv.config();

export interface FormValues {
  companyName: string;
  contactPerson: string;
  contactEmail: string;
  contactTlf: string;
  day: string;
  digital: string;
  marathon: string;
  message: string;
  recaptcha: string;
  confirm: boolean;
  english: boolean;
}

const initialValues: FormValues = {
  companyName: '',
  contactPerson: '',
  contactEmail: '',
  contactTlf: '',
  day: '',
  marathon: '',
  digital: '',
  message: '',
  recaptcha: '',
  confirm: false,
  english: false
};

const regex = /^([A-Z,a-z,0-9,(,),-,_,&,.,.,,!,?])/;

const validationSchema = Yup.object().shape({
  companyName: Yup.string()
    .required('Username is required')
    .matches(regex, 'Illegal characters'),
  contactPerson: Yup.string()
    .required('Contact person is required')
    .matches(regex, 'Illegal characters'),
  contactEmail: Yup.string()
    .required('Email is required')
    .email('Email must be on a vaid format'),
  contactTlf: Yup.string()
    .required('Phone number is required')
    .matches(
      /^([+,-, ,0-9,(,)]){4,15}/,
      'Phone number must be on a valid format'
    ),
  day: Yup.string().required('Required field'),
  digital: Yup.string().required('Required field'),
  marathon: Yup.string().required('Required field'),
  message: Yup.string().max(300, 'Max 300 letters'),
  recaptcha: Yup.string().required('Please do our recaptcha!'),
  confirm: Yup.bool().oneOf(
    [true],
    'Please accept our requierments for submitting'
  )
});

interface Props {
  setStatus: (status: RequestStatus) => void;
  setSubmitting: () => void;
  english: boolean;
}

class InterestForm extends React.Component<Props> {
  // Mount the recaptcha
  public componentDidMount(): void {
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }

  public render(): JSX.Element {
    const SITEKEY = process.env.REACT_APP_RECAPTCHA_SITEKEY;
    const info = this.props.english ? textarray.english : textarray.norwegian;
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={(values): void => {
          // Append English as a key value pair
          values.english = this.props.english;
          // Remove the confirm key/value pair
          delete values.confirm;

          this.props.setSubmitting();
          submitHandler(values, this.props.setStatus);
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
          console.log(values);
          console.log(validationSchema);
          return (
            <form onSubmit={handleSubmit}>
              <Section header={info.company.header} text={info.company.text}>
                <h3>{info.company.field}*</h3>
                <Field
                  id="companyName"
                  type="text"
                  value={values.companyName}
                  name="companyName"
                  placeholder={info.company.placeholder}
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

              <Section header={info.person.header} text={info.person.text}>
                <h3>{info.person.field1}*</h3>
                <Field
                  id="contactPerson"
                  type="text"
                  value={values.contactPerson}
                  name="contactPerson"
                  placeholder={info.person.placeholder1}
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

                <h3>{info.person.field2}*</h3>
                <Field
                  id="contactEmail"
                  type="email"
                  value={values.contactEmail}
                  name="contactEmail"
                  placeholder={info.person.placeholder2}
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

                <h3>{info.person.field3}*</h3>
                <Field
                  id="contactTlf"
                  type="text"
                  value={values.contactTlf}
                  name="contactTlf"
                  placeholder={info.person.placeholder3}
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

              <Section header={info.wishes.header} text={info.wishes.text}>
                <h3>{info.wishes.day.header}*</h3>
                <span className="infoText">{info.wishes.day.text}</span>
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
                    {info.wishes.day.field1}
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
                    {info.wishes.day.field2}
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
                    {info.wishes.day.field3}
                  </label>
                </div>
                <>
                  {touched.day && errors.day && (
                    <div className="input-feedback">{errors.day}</div>
                  )}
                </>

                <h3>{info.wishes.marathon.header}*</h3>
                <span className="infoText">{info.wishes.marathon.text}</span>
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
                    {info.wishes.marathon.field1}
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
                    {info.wishes.marathon.field2}
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
                    {info.wishes.marathon.field3}
                  </label>
                </div>
                <>
                  {touched.marathon && errors.marathon && (
                    <div className="input-feedback">{errors.marathon}</div>
                  )}
                </>

                <h3>{info.wishes.digital.header}*</h3>
                <span className="infoText">{info.wishes.digital.text}</span>
                <div
                  className={
                    errors.digital && touched.digital
                      ? 'divNoError divError'
                      : 'divNoError'
                  }
                >
                  <label className="label">
                    <Field
                      id="digital"
                      value="Ja"
                      type="radio"
                      name="digital"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {info.wishes.digital.field1}
                  </label>
                  <label className="label">
                    <Field
                      id="digital"
                      value="Nei"
                      type="radio"
                      name="digital"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {info.wishes.digital.field2}
                  </label>
                  <label className="label">
                    <Field
                      id="digital"
                      value="Vet ikke"
                      type="radio"
                      name="digital"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {info.wishes.digital.field3}
                  </label>
                </div>
                <>
                  {touched.digital && errors.digital && (
                    <div className="input-feedback">{errors.digital}</div>
                  )}
                </>

                <h3>{info.wishes.other.header}</h3>
                <span className="infoText">{info.wishes.other.text}</span>
                <>
                  <Field
                    id="message"
                    value={values.message}
                    component="textarea"
                    name="message"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={info.wishes.other.placeholder}
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
                <label className="label">
                  <Field
                    id="confirm"
                    value={values.confirm}
                    type="checkbox"
                    name="confirm"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.confirm && touched.confirm
                        ? 'textarea error'
                        : 'textarea'
                    }
                  />
                  {info.confirm}
                  {touched.confirm && errors.confirm && (
                    <div className="input-feedback">{errors.confirm}</div>
                  )}
                </label>
              </div>

              <div className="center">
                <Recaptcha
                  sitekey={SITEKEY}
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
