const endpoint = 'http://localhost:5000';

export const getConfig = () => ({
  authUrl: `${endpoint}/v1/auth`,
  depUrl: `${endpoint}/v1/department`,
  queryUrl: `${endpoint}/v1/query/task`,
  travelUrl: `${endpoint}/v1/travel`,
});
