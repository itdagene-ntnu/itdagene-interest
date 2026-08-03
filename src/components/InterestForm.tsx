import React, { RefObject, useEffect } from 'react';
import dotenv from 'dotenv';
import textarray from '../utils/text.json';
import { Section } from './Section';
import './InterestForm.css';
import { Field, Formik, FormikProps } from 'formik';
import Recaptcha from 'react-recaptcha';
import { RequestStatus, submitHandler } from '../utils/handler';
import { createValidationSchema } from '../utils/interestValidation';

dotenv.config();

export interface FormValues {
  companyName: string;
  contactPerson: string;
  contactEmail: string;
  contactTlf: string;
  day: string;
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
  message: '',
  recaptcha: '',
  confirm: false,
  english: false,
};

const handleRecaptchaLoad = (): void => undefined;

interface Props {
  setStatus: (status: RequestStatus) => void;
  setSubmitting: () => void;
  english: boolean;
}

type TextFieldProps = {
  id: 'companyName' | 'contactPerson' | 'contactEmail' | 'contactTlf';
  label: string;
  type: 'text' | 'email' | 'tel';
  value: string;
  placeholder: string;
  error?: string;
  touched?: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
};

const FieldError = ({
  id,
  children,
}: {
  id: string;
  children?: string;
}): JSX.Element | null =>
  children ? (
    <p className="input-feedback" id={id} role="alert">
      {children}
    </p>
  ) : null;

const FormErrorFocus = ({
  errors,
  formRef,
  submitCount,
  english,
}: {
  errors: FormikProps<FormValues>['errors'];
  formRef: RefObject<HTMLFormElement>;
  submitCount: number;
  english: boolean;
}): JSX.Element | null => {
  const errorCount = Object.keys(errors).length;

  useEffect(() => {
    if (submitCount === 0 || errorCount === 0) return;

    const target =
      formRef.current &&
      formRef.current.querySelector<HTMLElement>(
        '[aria-invalid="true"], [data-invalid-focus="true"]'
      );
    if (target) target.focus();
  }, [errorCount, formRef, submitCount]);

  if (submitCount === 0 || errorCount === 0) return null;

  return (
    <div className="form-error-summary" role="alert">
      <strong>
        {english
          ? `Check ${errorCount} marked ${
              errorCount === 1 ? 'field' : 'fields'
            }.`
          : `Kontroller ${errorCount} ${
              errorCount === 1 ? 'merket felt' : 'merkede felt'
            }.`}
      </strong>
      <span>
        {english
          ? 'Focus has moved to the first field that needs attention.'
          : 'Fokus er flyttet til det første feltet som må fylles ut.'}
      </span>
    </div>
  );
};

const TextField = ({
  id,
  label,
  type,
  value,
  placeholder,
  error,
  touched,
  onChange,
  onBlur,
}: TextFieldProps): JSX.Element => {
  const hasError = Boolean(error && touched);
  const isComplete = Boolean(touched && value.trim() && !error);
  const errorId = `${id}-error`;
  return (
    <div
      className={`form-field${isComplete ? ' form-field--complete' : ''}`}
      data-complete={isComplete ? 'true' : undefined}
    >
      <label htmlFor={id}>
        {label} <span aria-hidden="true">*</span>
      </label>
      <Field
        aria-describedby={hasError ? errorId : undefined}
        aria-invalid={hasError}
        aria-required="true"
        className={hasError ? 'text-input error' : 'text-input'}
        id={id}
        name={id}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={placeholder}
        required
        type={type}
        value={value}
      />
      <FieldError id={errorId}>{hasError ? error : undefined}</FieldError>
    </div>
  );
};

type RadioOption = {
  label: string;
  value: string;
};

const RadioGroup = ({
  id,
  label,
  description,
  name,
  options,
  value,
  error,
  touched,
  onChange,
  onBlur,
}: {
  id: string;
  label: string;
  description: string;
  name: 'day' | 'marathon';
  options: RadioOption[];
  value: string;
  error?: string;
  touched?: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
}): JSX.Element => {
  const hasError = Boolean(error && touched);
  const isComplete = Boolean(value && !error);
  const descriptionId = `${id}-description`;
  const errorId = `${id}-error`;
  return (
    <fieldset
      aria-describedby={`${descriptionId}${hasError ? ` ${errorId}` : ''}`}
      className={`choice-group${hasError ? ' choice-group--error' : ''}${
        isComplete ? ' choice-group--complete' : ''
      }`}
      data-complete={isComplete ? 'true' : undefined}
    >
      <legend>
        {label} <span aria-hidden="true">*</span>
      </legend>
      <p id={descriptionId}>{description}</p>
      <div className="choice-grid">
        {options.map((option, index) => {
          const optionId = `${id}-${index + 1}`;
          return (
            <label htmlFor={optionId} key={option.value}>
              <Field
                aria-describedby={hasError ? errorId : descriptionId}
                aria-invalid={hasError}
                aria-required="true"
                id={optionId}
                name={name}
                onBlur={onBlur}
                onChange={onChange}
                required
                type="radio"
                value={option.value}
              />
              <span>{option.label}</span>
            </label>
          );
        })}
      </div>
      <FieldError id={errorId}>{hasError ? error : undefined}</FieldError>
    </fieldset>
  );
};

class InterestForm extends React.Component<Props> {
  private formRef = React.createRef<HTMLFormElement>();

  public render(): JSX.Element {
    const siteKey = process.env.REACT_APP_RECAPTCHA_SITEKEY;
    const info = this.props.english ? textarray.english : textarray.norwegian;
    const submitLabel = this.props.english
      ? 'Submit interest'
      : 'Send interesse';

    return (
      <Formik
        initialValues={initialValues}
        onSubmit={(values): void => {
          const submission = { ...values, english: this.props.english };
          delete submission.confirm;
          this.props.setSubmitting();
          submitHandler(submission, this.props.setStatus);
        }}
        validationSchema={createValidationSchema(this.props.english)}
      >
        {({
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          submitCount,
        }: FormikProps<FormValues>): JSX.Element => (
          <form noValidate onSubmit={handleSubmit} ref={this.formRef}>
            <FormErrorFocus
              english={this.props.english}
              errors={errors}
              formRef={this.formRef}
              submitCount={submitCount}
            />
            <Section
              header={info.company.header}
              step="01"
              text={info.company.text}
            >
              <TextField
                error={errors.companyName}
                id="companyName"
                label={info.company.field}
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder={info.company.placeholder}
                touched={touched.companyName}
                type="text"
                value={values.companyName}
              />
            </Section>

            <Section
              header={info.person.header}
              step="02"
              text={info.person.text}
            >
              <div className="contact-field-grid">
                <TextField
                  error={errors.contactPerson}
                  id="contactPerson"
                  label={info.person.field1}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder={info.person.placeholder1}
                  touched={touched.contactPerson}
                  type="text"
                  value={values.contactPerson}
                />
                <TextField
                  error={errors.contactEmail}
                  id="contactEmail"
                  label={info.person.field2}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder={info.person.placeholder2}
                  touched={touched.contactEmail}
                  type="email"
                  value={values.contactEmail}
                />
                <TextField
                  error={errors.contactTlf}
                  id="contactTlf"
                  label={info.person.field3}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder={info.person.placeholder3}
                  touched={touched.contactTlf}
                  type="tel"
                  value={values.contactTlf}
                />
              </div>
            </Section>

            <Section
              header={info.wishes.header}
              step="03"
              text={info.wishes.text}
            >
              <RadioGroup
                description={info.wishes.day.text}
                error={errors.day}
                id="day"
                label={info.wishes.day.header}
                name="day"
                onBlur={handleBlur}
                onChange={handleChange}
                options={[
                  { label: info.wishes.day.field1, value: 'Dag 1' },
                  { label: info.wishes.day.field2, value: 'Dag 2' },
                  { label: info.wishes.day.field3, value: 'Ingen' },
                ]}
                touched={touched.day}
                value={values.day}
              />
              <RadioGroup
                description={info.wishes.marathon.text}
                error={errors.marathon}
                id="marathon"
                label={info.wishes.marathon.header}
                name="marathon"
                onBlur={handleBlur}
                onChange={handleChange}
                options={[
                  { label: info.wishes.marathon.field1, value: 'Ja' },
                  { label: info.wishes.marathon.field2, value: 'Nei' },
                  {
                    label: info.wishes.marathon.field3,
                    value: 'Vet ikke enda',
                  },
                ]}
                touched={touched.marathon}
                value={values.marathon}
              />
              <div
                className={`form-field${
                  touched.message && values.message.trim() && !errors.message
                    ? ' form-field--complete'
                    : ''
                }`}
                data-complete={
                  touched.message && values.message.trim() && !errors.message
                    ? 'true'
                    : undefined
                }
              >
                <label htmlFor="message">{info.wishes.other.header}</label>
                <p className="field-description" id="message-description">
                  {info.wishes.other.text}
                </p>
                <Field
                  aria-describedby={
                    errors.message && touched.message
                      ? 'message-description message-error'
                      : 'message-description'
                  }
                  aria-invalid={Boolean(errors.message && touched.message)}
                  className={
                    errors.message && touched.message
                      ? 'textarea error'
                      : 'textarea'
                  }
                  component="textarea"
                  id="message"
                  maxLength={300}
                  name="message"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder={info.wishes.other.placeholder}
                  value={values.message}
                />
                <div className="textarea-meta">
                  <FieldError id="message-error">
                    {touched.message ? errors.message : undefined}
                  </FieldError>
                  <span aria-live="polite">{values.message.length}/300</span>
                </div>
              </div>
            </Section>

            <section
              className={`form-confirmation${
                values.confirm ? ' form-confirmation--complete' : ''
              }`}
              data-complete={values.confirm ? 'true' : undefined}
            >
              <label htmlFor="confirm">
                <Field
                  aria-describedby={
                    errors.confirm && touched.confirm
                      ? 'confirm-error'
                      : undefined
                  }
                  aria-invalid={Boolean(errors.confirm && touched.confirm)}
                  aria-required="true"
                  checked={values.confirm}
                  id="confirm"
                  name="confirm"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  required
                  type="checkbox"
                />
                <span>{info.confirm}</span>
              </label>
              <FieldError id="confirm-error">
                {touched.confirm ? errors.confirm : undefined}
              </FieldError>
            </section>

            <section className="form-submit">
              <div
                aria-invalid={Boolean(errors.recaptcha && touched.recaptcha)}
                className="recaptcha-container"
                data-invalid-focus={
                  errors.recaptcha && touched.recaptcha ? 'true' : undefined
                }
                tabIndex={
                  errors.recaptcha && touched.recaptcha ? -1 : undefined
                }
              >
                <Recaptcha
                  id="recaptcha"
                  onloadCallback={handleRecaptchaLoad}
                  render="explicit"
                  sitekey={siteKey}
                  size="normal"
                  theme="light"
                  value={values.recaptcha}
                  verifyCallback={(response: string): void => {
                    setFieldValue('recaptcha', response);
                  }}
                />
                <FieldError id="recaptcha-error">
                  {touched.recaptcha ? errors.recaptcha : undefined}
                </FieldError>
              </div>
              <button className="submit" disabled={isSubmitting} type="submit">
                {submitLabel}
              </button>
            </section>
          </form>
        )}
      </Formik>
    );
  }
}

export default InterestForm;
