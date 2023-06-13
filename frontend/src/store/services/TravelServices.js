import axios from 'axios';
import { getConfig } from '../../config/config';

const { travelUrl } = getConfig();

const config = token => {
  return {
    headers: {
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  };
};

export const createTravelService = (token, formValues) =>
  axios.post(`${travelUrl}/create`, formValues, config(token));
export const editMyTravels = (token, formValues, id) =>
  axios.patch(`${travelUrl}/edit/${id}`, formValues, config(token));

export const getOtherTravels = token => axios.get(`${travelUrl}/get/other`, config(token));
export const getRequestedTravels = token =>
  axios.get(`${travelUrl}/request/received`, config(token));
export const getMyTravels = token => axios.get(`${travelUrl}/get/my`, config(token));
export const deleteMyTravels = (token, id) =>
  axios.delete(`${travelUrl}/delete/${id}`, config(token));
export const getSingleTravels = (token, id) =>
  axios.get(`${travelUrl}/single/${id}`, config(token));
export const postSendTravelRequest = (token, values) =>
  axios.post(`${travelUrl}/request`, values, config(token));
export const editMyTravelStatus = (token, values, id) =>
  axios.patch(`${travelUrl}/request/update/${id}`, values, config(token));
