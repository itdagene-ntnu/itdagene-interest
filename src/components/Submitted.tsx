import React from 'react';
import './Submitted.css';
import { RequestStatus } from '../utils/handler';

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
          <svg
            width="100px"
            height="100px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
            className="lds-ripple"
          >
            <circle
              cx="50"
              cy="50"
              r="35.4977"
              fill="none"
              ng-attr-stroke="{{config.c1}}"
              ng-attr-stroke-width="{{config.width}}"
              stroke="#037bb4"
              strokeWidth="4"
            >
              <animate
                attributeName="r"
                calcMode="spline"
                values="0;50"
                keyTimes="0;1"
                dur="1"
                keySplines="0 0.2 0.8 1"
                begin="-0.5s"
                repeatCount="indefinite"
              ></animate>
              <animate
                attributeName="opacity"
                calcMode="spline"
                values="1;0"
                keyTimes="0;1"
                dur="1"
                keySplines="0.2 0 0.8 1"
                begin="-0.5s"
                repeatCount="indefinite"
              ></animate>
            </circle>
            <circle
              cx="50"
              cy="50"
              r="7.67462"
              fill="none"
              ng-attr-stroke="{{config.c2}}"
              ng-attr-stroke-width="{{config.width}}"
              stroke="#037bb4"
              strokeWidth="4"
            >
              <animate
                attributeName="r"
                calcMode="spline"
                values="0;50"
                keyTimes="0;1"
                dur="1"
                keySplines="0 0.2 0.8 1"
                begin="0s"
                repeatCount="indefinite"
              ></animate>
              <animate
                attributeName="opacity"
                calcMode="spline"
                values="1;0"
                keyTimes="0;1"
                dur="1"
                keySplines="0.2 0 0.8 1"
                begin="0s"
                repeatCount="indefinite"
              ></animate>
            </circle>
          </svg>
        </>
      )}

      {props.status === RequestStatus.success && (
        <>
          <h1>Tusen takk!</h1>
          <h3>Deres interesse er notert</h3>
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 130.2 130.2"
          >
            <circle
              className="path circle"
              fill="none"
              stroke="#73AF55"
              strokeWidth="6"
              strokeMiterlimit="10"
              cx="65.1"
              cy="65.1"
              r="62.1"
            />
            <polyline
              className="path check"
              fill="none"
              stroke="#73AF55"
              strokeWidth="6"
              strokeLinecap="round"
              strokeMiterlimit="10"
              points="100.2,40.2 51.5,88.8 29.8,67.5 "
            />
          </svg>
        </>
      )}

      {props.status === RequestStatus.failure && (
        <>
          <h1>Noe gikk feil :( </h1>
          <h3>Denne feilen er loggført, prøv på nytt</h3>
          <h3>Send mail til bedrift@itdagene.no</h3>
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 130.2 130.2"
          >
            <circle
              className="path circle"
              fill="none"
              stroke="#D06079"
              strokeWidth="6"
              strokeMiterlimit="10"
              cx="65.1"
              cy="65.1"
              r="62.1"
            />
            <line
              className="path line"
              fill="none"
              stroke="#D06079"
              strokeWidth="6"
              strokeLinecap="round"
              strokeMiterlimit="10"
              x1="34.4"
              y1="37.9"
              x2="95.8"
              y2="92.3"
            />
            <line
              className="path line"
              fill="none"
              stroke="#D06079"
              strokeWidth="6"
              strokeLinecap="round"
              strokeMiterlimit="10"
              x1="95.8"
              y1="38"
              x2="34.4"
              y2="92.2"
            />
          </svg>
        </>
      )}
      <a href="https://www.itdagene.no" className="center">
        Til itdagene.no
      </a>
    </div>
  );
};
