import { Field, Form, FormikErrors, FormikProps, withFormik } from "formik";
import React from "react";
import "./InterestForm.css";
import info from "../text.json";

interface FormValues {
  companyName: string;
  companyType: string;
  contactPerson: string;
  contactEmail: string;
  contactTlf: string;
  message: string;
}

const placeholder: FormValues = {
  companyName: "Staten AS",
  companyType: "Tomt",
  contactPerson: "Ola/Nora Nordmann",
  contactEmail: "navn.navnesen@epost.no",
  contactTlf: "00 00 00 00",
  message: "Helt uformell text..."
};

const InnerForm = (props: FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting } = props;
  return (
    <Form>
      <h2 style={{ marginTop: "50px" }}>Om Bedriften</h2>
      {info.company}
      <div className="aside">
        <div className="aside-half">
          <h3>Bedriftsnavn</h3>
          <Field
            type="text"
            name="companyName"
            placeholder={placeholder.companyName}
            className="formInput"
          />
          {touched.companyName && errors.companyName && (
            <div>{errors.companyName}</div>
          )}
        </div>

        <div className="aside-half">
          <h3>Bedriftstype</h3>
          <div className="label-select">
            <span>Primærtype</span>
            <Field
              component="select"
              name="companyPrimaryType"
              placeholder={placeholder.companyType}
              className="formSelect"
            >
              <option value="" label={placeholder.companyType} />
              <option value="consultant">Konsulent</option>
              <option value="in-house">In-House</option>
              <option value="public">Offentlig</option>
              <option value="startup">Oppstartsbedrift</option>
              <option value="other">Annet</option>
            </Field>
            {touched.companyType && errors.companyType && (
              <div>{errors.companyType}</div>
            )}
          </div>

          <div className="label-select">
            <span>Sekundærtype</span>
            <Field
              component="select"
              name="companySecondaryType"
              placeholder={placeholder.companyType}
              className="formSelect"
              label="test"
            >
              <option
                value=""
                disabled
                selected
                label={placeholder.companyType}
              />
              <option value="consultant">Konsulent</option>
              <option value="in-house">In-House</option>
              <option value="public">Offentlig</option>
              <option value="startup">Oppstartsbedrift</option>
              <option value="other">Annet</option>
            </Field>
            {touched.companyType && errors.companyType && (
              <div>{errors.companyType}</div>
            )}
          </div>
        </div>
      </div>
      <h2 style={{ marginTop: "50px" }}>Om Kontaktpersonen</h2>
      <div className="aside">
        <div className="aside-third">
          <h3>Kontaktperson</h3>
          <Field
            type="text"
            name="contactPerson"
            placeholder={placeholder.contactPerson}
            className="formInput"
          />
          {touched.contactPerson && errors.contactPerson && (
            <div>{errors.contactPerson}</div>
          )}
        </div>

        <div className="aside-third">
          <h3>Epost</h3>
          <Field
            type="email"
            name="contantEmail"
            placeholder={placeholder.contactEmail}
            className="formInput"
          />
          {touched.contactEmail && errors.contactEmail && (
            <div>{errors.contactEmail}</div>
          )}
        </div>

        <div className="aside-third">
          <h3>Telefon</h3>
          <Field
            type="text"
            name="email"
            placeholder={placeholder.contactTlf}
            className="formInput"
          />
          {touched.contactTlf && errors.contactTlf && (
            <div>{errors.contactTlf}</div>
          )}
        </div>
      </div>
      <h2 style={{ marginTop: "50px" }}>Bedriftens ønsker</h2>
      {info.wishes}
      <div className="aside">
        <div className="aside-half">
          <h3>Prioritering dag</h3>
          <label className="label">
            <Field type="radio" name="wishes" />
            Stand Dag 1
          </label>
          <label className="label">
            <Field type="radio" name="wishes" />
            Stand Dag 2
          </label>

          <h3>Type deltagelse</h3>
          <label className="label">
            <Field type="checkbox" name="wishes" />
            Hovedsammarbeidspartner
          </label>
          <label className="label">
            <Field type="checkbox" name="wishes" />
            Sammarbeidspartner
          </label>
          <label className="label">
            <Field type="checkbox" name="wishes" />
            Ordinær deltagelse
          </label>
        </div>
        <div className="aside-half">
          <h3>Uformell melding</h3>
          <Field
            component="textarea"
            name="message"
            className="textarea"
            placeholder={placeholder.message}
          />
        </div>
      </div>
      <div className="submit-container">
        <button type="submit" disabled={isSubmitting} className="submit">
          Send inn!
        </button>
      </div>
    </Form>
  );
};

interface InterestFormProps {}

const InterestForm = withFormik<InterestFormProps, FormValues>({
  validate: (values: FormValues) => {
    let errors: FormikErrors<FormValues> = {};
    if (!values.contactEmail) {
      errors.contactEmail = "Required";
    }
    return errors;
  },

  handleSubmit: values => {
    console.log("SUBMIT");
  }
})(InnerForm);

const OuterForm = () => <InterestForm />;

export default OuterForm;
