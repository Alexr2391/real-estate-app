import { ApiResponseErrors } from '@/types';

export const isApiReponseError = (
  error: unknown
): error is ApiResponseErrors => {
  return typeof error === 'object' && error !== null && 'details' in error;
};
