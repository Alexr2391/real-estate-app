import { endpoints } from './endpoints';
import { buildUrl } from './helpers/buildUrl';
import { fetchApi } from './helpers/fetchApi';
import {
  CallConfig,
  EndpointMap,
  isOptionalConfig,
  ResponseFor,
} from './types';

export const call = async <K extends keyof EndpointMap>(
  key: K,
  ...options: isOptionalConfig<K> extends true
    ? [options?: CallConfig<K>]
    : [options: CallConfig<K>]
) => {
  const config = options[0] ?? ({} as CallConfig<K>);
  const endpoint = endpoints[key];
  const url =
    'params' in config && config.params
      ? `${buildUrl(endpoint.path, config.params)}`
      : `${endpoint.path}`;
  console.log(url);
  const body =
    endpoint.method !== 'GET' && 'body' in config && config?.body
      ? JSON.stringify(config.body)
      : undefined;

  const response = await fetchApi<ResponseFor<K>>({
    endpointPath: url,
    serviceProvider: config?.serviceProvider,
    opts: {
      ...config,
      headers: {},
      method: endpoint.method,
      body,
    },
  });
  return response;
};
