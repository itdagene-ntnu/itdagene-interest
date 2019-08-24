import React, { useState, useCallback } from 'react';
import './index.css';
import Container from './components/Container';
import InterestForm from './components/InterestForm';
import { Submitted } from './components/Submitted';
import dotenv from 'dotenv';
import Switch from 'react-switch';
import { RequestStatus } from './utils/handler';
dotenv.config();

const Render = (): JSX.Element => {
  const [status, setStatus] = useState<RequestStatus>(RequestStatus.pending);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [english, setEnglish] = useState<boolean>(false);
  const setSubmittingTrue = useCallback((): void => setSubmitting(true), []);

  const YEAR = process.env.REACT_APP_YEAR;
  const TITLE = english ? 'Interest form' : 'Interesseskjema';

  return (
    <div className="App">
      <header className="header">
        <img
          src="https://cdn.itdagene.no/itdagene.svg"
          className="logo"
          alt="logo"
        />
      </header>
      {submitting ? (
        <Submitted status={status} />
      ) : (
        <Container title={`${TITLE} ${YEAR}`}>
          <label className="english">
            <span>Do you want this form in english?</span>
            <Switch
              onChange={(): void => setEnglish(!english)}
              checked={english}
              onColor="#037bb4"
              handleDiameter={25}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              height={20}
              width={48}
            />
          </label>
          <InterestForm
            setStatus={setStatus}
            setSubmitting={setSubmittingTrue}
            english={english}
          />
        </Container>
      )}
    </div>
  );
};

export default Render;
