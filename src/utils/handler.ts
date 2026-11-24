import axios from 'axios';
import { FormValues } from '../components/InterestForm';

export enum RequestStatus {
  pending = 'PENDING',
  success = 'SUCCESS',
  failure = 'FAILURE',
}

export const submitHandler = (
  values: Omit<FormValues, 'confirm'>,
  callBack: (status: RequestStatus) => void
): void => {
  const API_LOCATION = import.meta.env.REACT_APP_API_LOCATION;
  callBack(RequestStatus.pending);
  axios({
    method: 'post',
    url: API_LOCATION,
    data: { ...values },
  })
    .then((): void => callBack(RequestStatus.success))
    .catch((): void => callBack(RequestStatus.failure));
};
