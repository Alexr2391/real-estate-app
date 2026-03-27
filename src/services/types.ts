import { servicesConfig } from './constants';
import { endpoints } from './endpoints';

type SplitPath<S extends string> = S extends `${infer Path}?${infer Query}`
  ? { path: Path; query: Query }
  : { path: S; query: never };

type ExtractParams<S extends string> =
  S extends `${string}{${infer Param}}${infer Rest}`
    ? Param | ExtractParams<Rest>
    : never;

type StripRequiredMark<T> = T extends `${infer Param}!` ? Param : T;

type PathParams<S extends string> = {
  [K in StripRequiredMark<ExtractParams<SplitPath<S>['path']>>]-?: string;
};

type QueryParams<S extends string> = SplitPath<S>['query'] extends string
  ? {
      [K in StripRequiredMark<ExtractParams<SplitPath<S>['query']>>]-?: string;
    } & {
      [K in StripRequiredMark<
        Exclude<ExtractParams<SplitPath<S>['query']>, `${string}!`>
      >]?: string;
    }
  : object;

export type ParamsObject<S extends string> = PathParams<S> & QueryParams<S>;

export type EndpointLookup = keyof typeof endpoints;

export type EndpointHeaders<RequiredKeys extends string = never> = {
  [K in RequiredKeys]: string; //required
} & {
  [K: string]: string | undefined; //optional
};
export type EndpointMap = typeof endpoints;

export type ParamsPerEndPoint = {
  [K in keyof EndpointMap]: EndpointMap[K] extends { path: infer P }
    ? P extends string
      ? ParamsObject<P>
      : never
    : never;
};

export type RequireHeaders<K extends keyof EndpointMap> =
  EndpointMap[K] extends { headers: infer H }
    ? keyof H extends never
      ? Record<string, string | undefined>
      : H & Record<string, string | undefined>
    : Record<string, string | undefined>;

export type HeadersOption<K extends keyof EndpointMap> =
  EndpointMap[K] extends {
    headers: infer H;
  }
    ? keyof H extends never
      ? { headers?: Record<string, string | undefined> }
      : { headers: RequireHeaders<K> }
    : { headers?: Record<string, string | undefined> };

export type isOptionalConfig<K extends keyof EndpointMap> =
  keyof ParamsPerEndPoint[K] extends never
    ? 'body' extends keyof EndpointMap[K]
      ? false
      : true
    : false;

export type ServiceProviderOptions = keyof typeof servicesConfig;

export type CallConfig<K extends keyof EndpointMap> = EndpointMap[K] extends {
  method: 'GET';
}
  ? keyof ParamsPerEndPoint[K] extends never
    ? HeadersOption<K> &
        CacheOptions & { serviceProvider?: ServiceProviderOptions }
    : {
        params: ParamsPerEndPoint[K];
      } & HeadersOption<K> &
        CacheOptions & { serviceProvider?: ServiceProviderOptions }
  : 'body' extends keyof EndpointMap[K]
    ? {
        params?: ParamsPerEndPoint[K];
        body: EndpointMap[K]['body'];
        serviceProvider?: ServiceProviderOptions;
      } & HeadersOption<K> &
        CacheOptions
    : keyof ParamsPerEndPoint[K] extends never
      ? HeadersOption<K> &
          CacheOptions & { serviceProvider?: ServiceProviderOptions }
      : { params?: ParamsPerEndPoint[K] } & HeadersOption<K> &
          CacheOptions & { serviceProvider?: ServiceProviderOptions };

export interface CacheOptions {
  next?: RequestInit['next'];
  cache?: RequestInit['cache'];
}

export type ResponseFor<K extends keyof EndpointMap> = EndpointMap[K] extends {
  response: infer R;
}
  ? R
  : null;
