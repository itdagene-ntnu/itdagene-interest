import axios from 'axios';
import { FormValues } from '../components/InterestForm';

interface Response {
  data: string;
  status: number;
  statusText: string;
  headers: object;
  request: object;
  config: object;
}

export const submitHandler = (
  values: FormValues,
  callBack: (success: boolean) => void
): void => {
  axios({
    method: 'post',
    url: 'http://localhost:8000',
    data: { ...values }
  })
    .then(function(res): void {
      console.log(res);
      callBack(true);
    })
    .catch(function(error): void {
      console.log(error);
      callBack(false);
    });
};
