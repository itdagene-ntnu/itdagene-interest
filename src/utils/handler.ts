import axios from 'axios';
import { FormValues } from '../components/InterestForm';
import dotenv from 'dotenv';

export const submitHandler = (
  values: FormValues,
  callBack: (success: boolean) => void
): void => {
  dotenv.config();
  const API_LOCATION = process.env.REACT_APP_API_LOCATION;
  axios({
    method: 'post',
    url: API_LOCATION,
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
