import { ApiResponseErrors, FetchApiReponse } from '@/types';
import { isApiReponseError } from '@/utils/callErrorHandling/callErrorHandling';
import { BASE_URL_NEXT, servicesConfig } from '../constants';
import { ServiceProviderOptions } from '../types';

interface FetchAPIprops {
  endpointPath: string;
  opts?: RequestInit;
  apiKey?: string;
  serviceProvider?: ServiceProviderOptions;
}
/**
 * @description a utility wrapper to uniformalize the fetch operations
 */
export const fetchApi = async <TResponse = null>({
  endpointPath,
  opts = {},
  apiKey,
  serviceProvider,
}: FetchAPIprops): Promise<FetchApiReponse<TResponse> | ApiResponseErrors> => {
  try {
    const headers = new Headers(opts?.headers);
    if (!headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }

    let finalUrl = `${BASE_URL_NEXT}/api/${endpointPath}`;

    // If serviceProvider is defined, set Authorization header
    if (serviceProvider) {
      const service = servicesConfig[serviceProvider];
      if (!service) {
        throw new Error(`Unknown service provider: ${serviceProvider}`);
      }

      const { apiKey: providerApiKey, apiEndpoint } = service;
      headers.set('Authorization', `Bearer ${providerApiKey || apiKey}`);
      finalUrl = `${apiEndpoint}/${endpointPath}`;
    }

    //TODO:  Placeholder for server-side logic
    if (typeof window === 'undefined') {
      // to add server side logic
    }

    const response = await fetch(finalUrl, {
      ...opts,
      method: opts?.method ?? 'GET',
      credentials: opts?.credentials ?? 'same-origin',
      headers,
    });
    const contentType = response.headers.get('content-type');

    let data: unknown;

    switch (true) {
      case contentType?.includes('application/json'):
        data = await response
          .json()
          .then((json) => ('data' in json ? json.data : json));
        break;

      case contentType?.includes('text/plain'):
        data = await response.text();
        break;

      case contentType?.includes('application/pdf'):
      case contentType?.includes('image'):
        data = await response.blob();
        break;

      default:
        data = await response.text();
        break;
    }

    if (response.ok) {
      return {
        status: response.status,
        data,
        success: true,
      } as FetchApiReponse<TResponse>;
    }

    return {
      success: false,
      details: `Failed to fetch ${endpointPath}: ${data}`,
      status: response.status,
    };
  } catch (err: unknown) {
    if (isApiReponseError(err)) {
      return { success: false, details: err.details, status: err.status };
    }
    return { success: false, details: String(err), status: 500 };
  }
};
