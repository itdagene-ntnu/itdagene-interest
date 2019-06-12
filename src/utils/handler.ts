import axios from 'axios';
import { FormValues } from '../components/InterestForm';

export const submitHandler = (values: FormValues): void => {
  axios({
    method: 'post',
    url: 'http://localhost:8000',
    data: { ...values }
  })
    .then(function(res): void {
      console.log(res);
    })
    .catch(function(error): void {
      console.log(error);
    });
};
