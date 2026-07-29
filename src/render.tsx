import React, { useCallback, useEffect, useState } from 'react';
import './index.css';
import Container from './components/Container';
import InterestForm from './components/InterestForm';
import { Submitted } from './components/Submitted';
import dotenv from 'dotenv';
import { RequestStatus } from './utils/handler';

dotenv.config();

const Render = (): JSX.Element => {
  const [status, setStatus] = useState<RequestStatus>(RequestStatus.pending);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [english, setEnglish] = useState<boolean>(false);
  const showSubmission = useCallback((): void => setSubmitted(true), []);
  const year = process.env.REACT_APP_YEAR;

  useEffect(() => {
    document.documentElement.lang = english ? 'en' : 'nb';
    document.title = english ? 'Company interest' : 'Interesseskjema';
  }, [english]);

  const copy = english
    ? {
        eyebrow: `itDAGENE ${year || ''}`,
        title: 'Register company interest',
        description:
          'Tell us that your company is interested in itDAGENE. The form is not a binding registration. Our company team will contact you about the next steps.',
        process: 'What happens next',
        steps: [
          'We review your company and preferences.',
          'The company team contacts your listed person.',
          'Participation is confirmed in a separate process.',
        ],
        formTitle: 'Company details',
        formDescription:
          'Fields marked with an asterisk are required. We only use the information to follow up your request.',
        language: 'Bytt til norsk',
        back: 'Back to itdagene.no',
      }
    : {
        eyebrow: `itDAGENE ${year || ''}`,
        title: 'Meld interesse som bedrift',
        description:
          'Fortell oss at bedriften deres er interessert i itDAGENE. Skjemaet er ikke en bindende påmelding. Bedriftsteamet tar kontakt om neste steg.',
        process: 'Dette skjer videre',
        steps: [
          'Vi vurderer bedriften og ønskene dere har meldt inn.',
          'Bedriftsteamet kontakter personen som står oppført.',
          'Deltakelse bekreftes i en egen prosess.',
        ],
        formTitle: 'Opplysninger om bedriften',
        formDescription:
          'Felt merket med stjerne er obligatoriske. Opplysningene brukes kun til å følge opp henvendelsen.',
        language: 'Switch to English',
        back: 'Tilbake til itdagene.no',
      };

  return (
    <div className="App">
      <a className="skip-link" href="#main-content">
        {english ? 'Skip to main content' : 'Hopp til hovedinnhold'}
      </a>
      <header className="interest-header">
        <div className="interest-header__inner">
          <a aria-label={copy.back} href="https://itdagene.no">
            <img
              alt="itDAGENE"
              className="logo"
              src="https://cdn.itdagene.no/itdagene.svg"
            />
          </a>
          <a className="back-link" href="https://itdagene.no">
            {copy.back}
          </a>
        </div>
      </header>

      <main className="interest-page" id="main-content" tabIndex={-1}>
        <section className="interest-intro">
          <p className="interest-eyebrow">{copy.eyebrow}</p>
          <h1>{copy.title}</h1>
          <p className="interest-intro__lead">{copy.description}</p>
          <div className="interest-process">
            <h2>{copy.process}</h2>
            <ol>
              {copy.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
          <p className="interest-contact">
            {english ? 'Questions?' : 'Har dere spørsmål?'}{' '}
            <a href="mailto:bedrift@itdagene.no">bedrift@itdagene.no</a>
          </p>
        </section>

        <div className="interest-form-column">
          <button
            aria-pressed={english}
            className="language-toggle"
            onClick={(): void => setEnglish(!english)}
            type="button"
          >
            <span aria-hidden="true">NO / EN</span>
            <strong>{copy.language}</strong>
          </button>

          {submitted ? (
            <Submitted english={english} status={status} />
          ) : (
            <Container
              description={copy.formDescription}
              title={copy.formTitle}
            >
              <InterestForm
                english={english}
                setStatus={setStatus}
                setSubmitting={showSubmission}
              />
            </Container>
          )}
        </div>
      </main>
    </div>
  );
};

export default Render;
