export const BASE_URL_NEXT =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:4000';

export const servicesConfig = {
  imbb: {
    apiKey: process.env.IMBB_API_KEY,
    apiEndpoint: process.env.IMBB_API_ENDPOINT,
  },
};
