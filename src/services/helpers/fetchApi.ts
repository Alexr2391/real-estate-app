import { ApiResponseErrors, FetchApiReponse } from '@/types';
import { isApiReponseError } from '@/utils/callErrorHandling/callErrorHandling';
import { BASE_URL_NEXT, servicesConfig } from '../constants';
import { ServiceProviderOptions } from '../types';

interface FetchAPIprops {
  endpointPath: string;
  opts?: RequestInit;
  apiKey?: string;
  serviceProvider: ServiceProviderOptions | undefined;
}

export const fetchApi = async <TResponse = null>({
  endpointPath,
  opts,
  serviceProvider,
}: FetchAPIprops): Promise<FetchApiReponse<TResponse> | ApiResponseErrors> => {
  try {
    const headers = new Headers(opts?.headers);
    let finalUrl = `${BASE_URL_NEXT}/api/${endpointPath}`;

    if (headers && headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }

    if (serviceProvider) {
      const service = servicesConfig[serviceProvider];
      if (!service) {
        throw new Error(`Unknown service provider: ${serviceProvider}`);
      }

      const { apiKey, apiEndpoint } = service;

      headers.set('Authorization', `Bearer ${apiKey}`);
      finalUrl = `${apiEndpoint}/${endpointPath}`;
    }

    if (typeof window === 'undefined') {
    }

    const response = await fetch(finalUrl, {
      ...opts,
      method: opts?.method,
      headers,
      credentials: opts?.credentials ?? 'same-origin',
    });

    const isJson = response.headers
      .get('content-type')
      ?.includes('application/json');

    const data = isJson
      ? await response
          .json()
          .then((json) => ('data' in json ? json.data : json))
      : await response.text();

    if (response.ok)
      return {
        status: response.status,
        data,
        success: true,
      } as FetchApiReponse<TResponse>;

    return {
      success: false,
      details: `failed to fetch ${endpointPath}`,
      status: response.status,
    };
  } catch (err: unknown) {
    if (isApiReponseError(err))
      return { success: false, details: err.details, status: err.status };
    return { success: false, details: String(err), status: 500 };
  }
};
