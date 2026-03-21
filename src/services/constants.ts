export const BASE_URL_NEXT = 'http://localhost:4000' as const;

export const servicesConfig = {
  imbb: {
    apiKey: process.env.IMBB_API_KEY,
    apiEndpoint: process.env.IMBB_API_ENDPOINT,
  },
};
