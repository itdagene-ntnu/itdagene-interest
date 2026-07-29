import React from 'react';
import './Submitted.css';
import { RequestStatus } from '../utils/handler';
import { Pending, Success, Failure } from './Animations';
import Container from './Container';

interface Props {
  status: RequestStatus;
  english: boolean;
}

export const Submitted = ({ status, english }: Props): JSX.Element => {
  const content = {
    pending: english
      ? {
          title: 'Sending your interest',
          description: 'Please wait while we securely submit the form.',
        }
      : {
          title: 'Sender interessen deres',
          description:
            'Vent litt mens vi sender inn skjemaet på en trygg måte.',
        },
    success: english
      ? {
          title: 'Thank you',
          description:
            'Your interest has been registered. The company team will follow up using the contact details you provided.',
        }
      : {
          title: 'Takk for interessen',
          description:
            'Interessen er registrert. Bedriftsteamet følger opp kontaktpersonen dere har oppgitt.',
        },
    failure: english
      ? {
          title: 'We could not submit the form',
          description:
            'The error has been logged. Contact web@itdagene.no if the problem continues.',
        }
      : {
          title: 'Vi fikk ikke sendt inn skjemaet',
          description:
            'Feilen er logget. Kontakt web@itdagene.no dersom problemet fortsetter.',
        },
  };
  const activeContent =
    status === RequestStatus.pending
      ? content.pending
      : status === RequestStatus.success
      ? content.success
      : content.failure;

  return (
    <Container
      description={activeContent.description}
      title={activeContent.title}
    >
      <div
        aria-live="polite"
        className="submission-state"
        role={status === RequestStatus.failure ? 'alert' : 'status'}
      >
        {status === RequestStatus.pending && <Pending />}
        {status === RequestStatus.success && <Success />}
        {status === RequestStatus.failure && <Failure />}
        {status === RequestStatus.failure && (
          <a href="mailto:web@itdagene.no">web@itdagene.no</a>
        )}
        <a className="submission-state__back" href="https://itdagene.no">
          {english ? 'Back to itdagene.no' : 'Tilbake til itdagene.no'}
        </a>
      </div>
    </Container>
  );
};
