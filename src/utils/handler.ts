import axios from 'axios';
import { FormValues } from '../components/InterestForm';
import dotenv from 'dotenv';

export enum RequestStatus {
  pending = 'PENDING',
  success = 'SUCCESS',
  failure = 'FAILURE'
}

export const submitHandler = (
  values: FormValues,
  callBack: (status: RequestStatus) => void
): void => {
  dotenv.config();
  const API_LOCATION = process.env.REACT_APP_API_LOCATION;
  callBack(RequestStatus.pending);
  axios({
    method: 'post',
    url: API_LOCATION,
    data: { ...values }
  })
    .then(function(res): void {
      callBack(RequestStatus.success);
    })
    .catch(function(error): void {
      callBack(RequestStatus.failure);
    });
};
