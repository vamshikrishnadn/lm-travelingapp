import axios from 'axios';
import { getConfig } from '../../config/config';

const { authUrl } = getConfig();

const config = token => {
  return {
    headers: {
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  };
};

export const signupService = formValues => axios.post(`${authUrl}/register`, formValues);
export const signinService = formValues => axios.post(`${authUrl}/login`, formValues);
export const updateUserPassword = (formValues, token) =>
  axios.put(`${authUrl}/password/update`, formValues, config(token));
export const updateUserProfile = (formValues, token) =>
  axios.put(`${authUrl}/me/update`, formValues, config(token));
export const getUserDetails = token => axios.get(`${authUrl}/me`, config(token));
