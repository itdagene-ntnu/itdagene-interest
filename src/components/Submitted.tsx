import React from 'react';
import './Submitted.css';
import { RequestStatus } from '../utils/handler';
import { Pending, Success, Failure } from './Animations';

interface Props {
  status: RequestStatus;
}

export const Submitted = (props: Props): JSX.Element => {
  return (
    <div className="center">
      {props.status === RequestStatus.pending && (
        <>
          <h1>Pending request!</h1>
          <h3>Thank you for your patience</h3>
          <Pending />
        </>
      )}

      {props.status === RequestStatus.success && (
        <>
          <h1>Thank you!</h1>
          <h3>Your interest is noted!</h3>
          <Success />
        </>
      )}

      {props.status === RequestStatus.failure && (
        <>
          <h1>Something went wrong :( </h1>
          <h3>This error was logged, send a mail to web@itdagene.no</h3>
          <Failure />
        </>
      )}
      <a href="https://www.itdagene.no" className="center">
        Back to www.itdagene.no
      </a>
    </div>
  );
};
