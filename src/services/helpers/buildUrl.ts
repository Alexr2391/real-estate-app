import { ParamsObject } from '../types';

export const buildUrl = <TPath extends string>(
  template: TPath,
  params: ParamsObject<TPath>
): string => {
  const [rawPath, rawQuery] = template.split('?');
  let path = rawPath;

  const runtimeParams = params as Record<
    keyof ParamsObject<TPath>,
    string | undefined
  >;

  const pathMatches = rawPath.match(/{(.*?)}/g) ?? [];
  for (const match of pathMatches) {
    const key = match.slice(1, -1);
    const value = runtimeParams[key as keyof typeof runtimeParams];
    if (value === undefined || value === null || value === '') {
      throw new Error(`Missing required path params: ${key}`);
    }
    path = path.replace(match, encodeURIComponent(value));
  }

  if (!rawQuery) return path;

  const queryMatches = rawQuery.match(/{(.*?)}/g) ?? [];
  const searchParams = new URLSearchParams();
  for (const match of queryMatches) {
    const rawKey = match.slice(1, -1);
    const isRequired = rawKey.endsWith('!');
    const key = rawKey.replace('!', '');
    const value = runtimeParams[key as keyof typeof runtimeParams];
    if (value === undefined || value === null || value === '') {
      if (isRequired) throw new Error(`Missing required query param: ${key}`);
      continue;
    }
    searchParams.append(key, value);
  }

  const queryString = searchParams.toString();
  return queryString ? `${path}?${queryString}` : path;
};
